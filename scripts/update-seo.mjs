// Run with Node.js after changing product content. No packages or build step required.
// This keeps the existing GitHub Pages URLs, metadata, schemas and sitemap aligned.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const origin = 'https://aleksandrkatilov.com';
const personId = origin + '/#person';
const social = '/assets/social/portfolio.png';
const pages = [
  {url:'/', title:'Aleksandr Katilov — Windows Software & Android Apps', ruTitle:'Александр Катилов — программы для Windows и Android',
    desc:'Windows software and Android apps by Aleksandr Katilov: FastStock, BetterSet, DebtExit, Dufli, ActivityTracker, Rilvo Office and PauseCut.',
    ruDesc:'Программы Александра Катилова для Windows и Android: FastStock, BetterSet, DebtExit, Dufli, ActivityTracker, Rilvo Office и PauseCut.'},
  {url:'/apps/', title:'Android Apps — FastStock, BetterSet, DebtExit & More', ruTitle:'Приложения для Android — Александр Катилов',
    desc:'Explore Android apps by Aleksandr Katilov: FastStock inventory, BetterSet gym tracking, DebtExit debt planning, Dufli file transfer and ActivityTracker.',
    ruDesc:'Android-приложения Александра Катилова: учёт товаров FastStock, тренировки BetterSet, план долгов DebtExit, передача файлов Dufli и дневник ActivityTracker.',
    collection:'Mobile Apps', items:['/apps/faststock/','/apps/better-each-set/','/apps/debtexit/','/apps/dufli/','/apps/activity-tracker/']},
  {url:'/software/', title:'Windows Software — Rilvo Office, Dufli & PauseCut', ruTitle:'Программы для Windows — Rilvo Office, Dufli и PauseCut',
    desc:'Download Rilvo Office for documents and spreadsheets, transfer files with Dufli and explore PauseCut video editing. Independent Windows software.',
    ruDesc:'Скачайте Rilvo Office для документов и таблиц, передавайте файлы с Dufli и изучите видеоредактор PauseCut. Независимые программы для Windows.',
    collection:'Desktop Software', items:['/apps/rilvo-office/','/apps/dufli/','/software/pausecut/']},
  {url:'/apps/faststock/', name:'FastStock: Inventory & Storage', title:'FastStock: Inventory & Storage for Android', ruTitle:'FastStock — учёт товаров и мест хранения для Android',
    desc:'Organize personal and company inventory with photos, storage locations, employee roles, company sync, box QR labels and XLSX/CSV exports on Android.',
    ruDesc:'Учёт личных и корпоративных запасов на Android: фото товаров, места хранения, роли сотрудников, синхронизация, QR-этикетки коробок и экспорт XLSX/CSV.',
    image:'/apps/faststock/assets/icon.png', screenshots:['/apps/faststock/assets/home.jpg','/apps/faststock/assets/boxes.jpg'], parent:'/apps/', repo:'FastStock-App'},
  {url:'/apps/better-each-set/', name:'BetterSet: Gym Workout Tracker', title:'BetterSet — Gym Workout Tracker for Android', ruTitle:'BetterSet — дневник тренировок для Android',
    desc:'Track gym sets, reps and weight with BetterSet for Android. Review workout history, body-weight charts and progress photos, and set training reminders.',
    ruDesc:'BetterSet для Android: подходы, повторения и рабочий вес, история тренировок, график веса тела, фото прогресса и напоминания о занятиях.',
    image:'/apps/better-each-set/assets/screenshot-home.jpg', screenshots:['/apps/better-each-set/assets/screenshot-home.jpg','/apps/better-each-set/assets/screenshot-awards.jpg'], parent:'/apps/', repo:'BetterSet-App'},
  {url:'/apps/debtexit/', name:'DebtExit', title:'DebtExit — Credit Card Payoff Planner for Android', ruTitle:'DebtExit — план погашения кредитных карт для Android',
    desc:'Estimate credit card payoff with avalanche and snowball strategies, review imported statements and manage reminders with DebtExit. Records stay local.',
    ruDesc:'DebtExit: расчёт погашения кредитных карт стратегиями «лавина» и «снежный ком», проверка выписок и напоминания. Записи хранятся локально.',
    image:'/apps/debtexit/assets/forecast.png', screenshots:['/apps/debtexit/assets/forecast.png','/apps/debtexit/assets/plan.png'], parent:'/apps/', repo:'DebtExit-App'},
  {url:'/apps/activity-tracker/', name:'ActivityTracker', title:'ActivityTracker — Completed Work Journal for Android', ruTitle:'ActivityTracker — дневник выполненной работы для Android',
    desc:'Record completed work by project with ActivityTracker for Android: text and voice input, a calendar, daily and weekly summaries, and manual JSON backups.',
    ruDesc:'ActivityTracker для Android: дневник выполненной работы по проектам, ввод текстом и голосом, календарь, сводки дня и недели и ручные JSON-копии.',
    parent:'/apps/', repo:'ActivityTracker-App'},
  {url:'/apps/dufli/', name:'Dufli', title:'Dufli — Local File Transfer for Android & Windows', ruTitle:'Dufli — передача файлов между Android и Windows',
    desc:'Transfer original photos, videos and documents between Android and Windows over your local network with Dufli. QR pairing and verified delivery.',
    ruDesc:'Dufli передаёт оригиналы фото, видео и документов между Android и Windows по локальной сети. Сопряжение по QR и проверка доставки файлов.',
    image:'/apps/dufli/dufli.png', parent:'/software/', repo:'Dufli-App'},
  {url:'/apps/rilvo-office/', name:'Rilvo Office', title:'Rilvo Office — Word & Excel Editors for Windows', ruTitle:'Rilvo Office — редакторы Word и Excel для Windows',
    desc:'Download Rilvo Office for Windows: edit DOCX documents in RWrite and Excel spreadsheets in RSheets, with offline editing, formulas and local backups.',
    ruDesc:'Скачайте Rilvo Office для Windows: документы DOCX в RWrite и таблицы Excel в RSheets, работа офлайн, формулы и локальные резервные копии.',
    image:'/apps/rilvo-office/rilvo-office.png', parent:'/software/', repo:'Rilvo-Office-App'},
  {url:'/software/pausecut/', name:'PauseCut', title:'PauseCut 2.1 — Pause Removal & Shorts Editor for Windows', ruTitle:'PauseCut 2.1 — монтаж пауз и Shorts для Windows',
    desc:'Edit talking-head videos on Windows with PauseCut 2.1. Merge clips, speed up or cut pauses, preview edits and export vertical Shorts in batches.',
    ruDesc:'PauseCut 2.1 для Windows: склейка разговорных видео, ускорение или удаление пауз, предпросмотр, ручная резка и пакетный экспорт вертикальных Shorts.',
    parent:'/software/'}
];

const escape = value => String(value).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const absolute = value => new URL(value, origin).href;
const author = {'@type':'Person','@id':personId,name:'Aleksandr Katilov',url:origin+'/'};
const jsonScripts = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>\s*/gi;
const flatten = data => Array.isArray(data) ? data.flatMap(flatten) : data['@graph'] ? data['@graph'].flatMap(flatten) : [data];

function meta(head, key, value, ru, property=false) {
  const attr=property?'property':'name';
  const tag=`<meta ${attr}="${key}" content="${escape(value)}"${ru?` data-content-en="${escape(value)}" data-content-ru="${escape(ru)}"`:''}>`;
  const re=new RegExp(`<meta\\b[^>]*\\b${attr}=["']${key.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}["'][^>]*>`, 'i');
  return re.test(head) ? head.replace(re,tag) : head.replace(/<\/head>/i,tag+'\n</head>');
}

function breadcrumb(page) {
  const links=[{name:'Home',item:origin+'/'}];
  if(page.parent) links.push({name:page.parent==='/apps/'?'Mobile Apps':'Desktop Software',item:absolute(page.parent)});
  links.push({name:page.name || page.collection,item:absolute(page.url)});
  return {'@type':'BreadcrumbList','@id':absolute(page.url)+'#breadcrumbs',itemListElement:links.map((link,index)=>({'@type':'ListItem',position:index+1,...link}))};
}

for(const page of pages) {
  const filename=path.join(root,page.url,'index.html');
  let html=fs.readFileSync(filename,'utf8');
  const parts=html.match(/^([\s\S]*?<head\b[^>]*>)([\s\S]*?<\/head>)([\s\S]*)$/i);
  if(!parts) throw new Error('Missing head: '+filename);
  let head=parts[2];
  const oldNodes=[...head.matchAll(jsonScripts)].flatMap(match=>flatten(JSON.parse(match[1])));
  head=head.replace(jsonScripts,'');
  const title=`<title data-en="${escape(page.title)}" data-ru="${escape(page.ruTitle)}">${escape(page.title)}</title>`;
  head=head.replace(/<title\b[^>]*>[\s\S]*?<\/title>/i,title);
  head=meta(head,'description',page.desc,page.ruDesc);
  head=meta(head,'author','Aleksandr Katilov');
  head=meta(head,'og:type','website',null,true);
  head=meta(head,'og:site_name','Aleksandr Katilov',null,true);
  head=meta(head,'og:title',page.title,page.ruTitle,true);
  head=meta(head,'og:description',page.desc,page.ruDesc,true);
  head=meta(head,'og:url',absolute(page.url),null,true);
  head=meta(head,'og:locale','en_US','ru_RU',true);
  head=meta(head,'og:image',absolute(page.image || social),null,true);
  head=meta(head,'og:image:alt',page.image?`${page.name} app preview`:'Software by Aleksandr Katilov',page.image?`${page.name} — изображение приложения`:'Программы Александра Катилова',true);
  head=meta(head,'twitter:card',page.image?'summary':'summary_large_image');
  head=meta(head,'twitter:title',page.title,page.ruTitle);
  head=meta(head,'twitter:description',page.desc,page.ruDesc);
  head=meta(head,'twitter:image',absolute(page.image || social));
  let graph;
  if(page.url==='/') {
    const person=oldNodes.find(node=>node['@type']==='Person') || author;
    graph=[{...person,...author,knowsAbout:[...new Set([...(person.knowsAbout||[]),'Windows software development','Android app development'])]},
      {'@type':'WebSite','@id':origin+'/#website',url:origin+'/',name:'Aleksandr Katilov',description:page.desc,inLanguage:['en','ru'],publisher:{'@id':personId}},
      {'@type':'WebPage','@id':origin+'/#webpage',url:origin+'/',name:page.title,description:page.desc,isPartOf:{'@id':origin+'/#website'},mainEntity:{'@id':personId},hasPart:[{'@id':origin+'/apps/#collection'},{'@id':origin+'/software/#collection'}]}];
  } else if(page.collection) {
    graph=[{'@type':'CollectionPage','@id':absolute(page.url)+'#collection',url:absolute(page.url),name:page.collection,description:page.desc,isPartOf:{'@id':origin+'/#website'},author:{'@id':personId},breadcrumb:{'@id':absolute(page.url)+'#breadcrumbs'},mainEntity:{'@type':'ItemList',numberOfItems:page.items.length,itemListElement:page.items.map((url,index)=>({'@type':'ListItem',position:index+1,name:pages.find(item=>item.url===url).name,url:absolute(url)}))}},breadcrumb(page)];
  } else {
    const app=oldNodes.find(node=>node['@type']==='SoftwareApplication');
    if(!app) throw new Error('Missing app schema: '+filename);
    graph=[{...app,'@id':absolute(page.url)+'#app',url:absolute(page.url),name:page.name,description:page.desc,author,image:absolute(page.image||social),mainEntityOfPage:absolute(page.url)},breadcrumb(page)];
    if(page.repo) graph[0].sameAs='https://github.com/aleksandrkatilov/'+page.repo;
    if(page.screenshots) graph[0].screenshot=page.screenshots.map(absolute);
  }
  for(const node of graph) delete node['@context'];
  const script='<script type="application/ld+json">'+JSON.stringify({'@context':'https://schema.org','@graph':graph}).replaceAll('<','\\u003c')+'</script>\n';
  head=head.replace(/<\/head>/i,script+'</head>');
  html=parts[1]+head+parts[3];
  fs.writeFileSync(filename,html);
}

// Preserve legal-page dates; only the content-bearing pages above changed today.
const sitemapFile=path.join(root,'sitemap.xml');
let sitemap=fs.readFileSync(sitemapFile,'utf8');
const modified=new Date().toISOString().slice(0,10);
for(const page of pages) {
  const location=absolute(page.url);
  const escapedLocation=location.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const re=new RegExp(`<url>\\s*<loc>${escapedLocation}<\\/loc>[\\s\\S]*?<\\/url>`);
  const entry=`<url><loc>${location}</loc><lastmod>${modified}</lastmod></url>`;
  sitemap=re.test(sitemap)?sitemap.replace(re,entry):sitemap.replace('</urlset>','  '+entry+'\n</urlset>');
}
fs.writeFileSync(sitemapFile,sitemap);
console.log(`Updated metadata, structured data and sitemap for ${pages.length} pages.`);
