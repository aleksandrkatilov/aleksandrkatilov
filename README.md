# Aleksandr Katilov

[English](README.md) · [Русский](README.ru.md)

Personal portfolio of Aleksandr Katilov.

[Website](https://aleksandrkatilov.com/) · [Mobile apps](https://aleksandrkatilov.com/apps/) · [Desktop software](https://aleksandrkatilov.com/software/)

## Software catalog

- Mobile: FastStock, BetterSet, DebtExit, ActivityTracker and Dufli (Android + Windows).
- Desktop: Rilvo Office (RWrite + RSheets), Dufli and PauseCut.
- Download buttons link only to verified public GitHub assets or Google Play listings. ActivityTracker and DebtExit currently have public project information, not public installers. PauseCut retains its existing product page.

## Updating and checking

This is a buildless GitHub Pages site. Keep existing `/apps/...` URLs, legal-page URLs, `CNAME` and `app-ads.txt` intact.

After product changes, update the bilingual metadata in `scripts/update-seo.mjs` and run `node scripts/update-seo.mjs`. It maintains page titles, descriptions, Open Graph/Twitter previews, JSON-LD and sitemap entries. Keep sitemap modification dates truthful when updating content.

Run `python scripts/check-site.py` and `node --check apps/app.js` before publishing. Check English/Russian switching and mobile layouts in a browser. English remains the default; Russian is a client-side translation, not a separate indexed URL, so no artificial `hreflang` alternatives are declared. Do not invent prices or ratings for rich results.

Content follow-up: BetterSet's legacy Privacy Policy must be reviewed against its current Google Mobile Ads implementation. The catalog update does not certify legal/data-safety compliance.
