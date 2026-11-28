"""Buildless GitHub Pages checks. Run: python scripts/check-site.py"""
from html.parser import HTMLParser
import json
from pathlib import Path
from urllib.parse import unquote, urlsplit
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent.parent
ORIGIN = "https://aleksandrkatilov.com"


class Page(HTMLParser):
    def __init__(self, filename):
        super().__init__(convert_charrefs=True)
        self.filename = filename
        self.ids = set()
        self.links = []
        self.metas = {}
        self.canonicals = []
        self.h1 = 0
        self.titles = 0
        self.in_json = False
        self.json_text = ""
        self.schemas = []
        self.feed(filename.read_text(encoding="utf-8"))

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            self.ids.add(attrs["id"])
        if tag == "h1":
            self.h1 += 1
        if tag == "title":
            self.titles += 1
        if tag == "meta":
            key = attrs.get("name", attrs.get("property"))
            if key:
                self.metas.setdefault(key, []).append(attrs.get("content", ""))
        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonicals.append(attrs.get("href"))
        for key in ("href", "src"):
            if key in attrs:
                self.links.append(attrs[key])
        if tag == "script" and attrs.get("type") == "application/ld+json":
            self.in_json = True
            self.json_text = ""

    def handle_data(self, data):
        if self.in_json:
            self.json_text += data

    def handle_endtag(self, tag):
        if tag == "script" and self.in_json:
            self.schemas.append(json.loads(self.json_text))
            self.in_json = False


def local_target(link, source):
    url = urlsplit(link)
    if url.scheme not in ("", "https", "http"):
        return None
    if url.netloc and url.netloc != "aleksandrkatilov.com":
        return None
    path = unquote(url.path)
    target = ROOT / path.lstrip("/") if path.startswith("/") else source.parent / path
    if not path:
        target = source
    target = target.resolve()
    if target.is_dir():
        target /= "index.html"
    return target, url.fragment


pages = {filename.resolve(): Page(filename) for filename in ROOT.rglob("*.html") if ".git" not in filename.parts}
failures = []
for filename, page in pages.items():
    name = filename.relative_to(ROOT)
    if filename.name != "404.html":
        if page.h1 != 1 or page.titles != 1:
            failures.append(f"{name}: expected one H1 and title")
        if len(page.metas.get("description", [])) != 1:
            failures.append(f"{name}: expected one meta description")
        if len(page.canonicals) != 1 or not page.canonicals[0].startswith(ORIGIN + "/"):
            failures.append(f"{name}: canonical must use the HTTPS domain")
    for link in page.links:
        result = local_target(link, filename)
        if result is None:
            continue
        target, fragment = result
        if not target.is_file():
            failures.append(f"{name}: missing local target {link}")
        elif fragment and target in pages and fragment not in pages[target].ids:
            failures.append(f"{name}: missing anchor {link}")

namespace = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
locations = [node.text for node in ET.parse(ROOT / "sitemap.xml").findall("s:url/s:loc", namespace)]
if len(set(locations)) != len(locations):
    failures.append("Sitemap contains duplicate locations")
for location in locations:
    target, _ = local_target(location, ROOT / "index.html")
    page = pages.get(target)
    if not page or page.canonicals != [location]:
        failures.append(f"Sitemap target/canonical mismatch: {location}")
if f"Sitemap: {ORIGIN}/sitemap.xml" not in (ROOT / "robots.txt").read_text(encoding="utf-8"):
    failures.append("robots.txt must advertise the sitemap")
if (ROOT / "app-ads.txt").read_text(encoding="utf-8").strip() != "google.com, pub-7552451207852698, DIRECT, f08c47fec0942fa0":
    failures.append("Unexpected app-ads.txt publisher record")

if failures:
    raise SystemExit("\n".join(failures))
print(f"PASS: {len(pages)} HTML pages, {len(locations)} sitemap entries, local links/anchors, JSON-LD and app-ads.txt.")
