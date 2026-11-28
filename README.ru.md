# Aleksandr Katilov

[English](README.md) · [Русский](README.ru.md)

Персональное портфолио Александра Катилова.

[Сайт](https://aleksandrkatilov.com/) · [Мобильные приложения](https://aleksandrkatilov.com/apps/) · [Программы для Windows](https://aleksandrkatilov.com/software/)

## Каталог программ

- Android: FastStock, BetterSet, DebtExit, ActivityTracker и Dufli (Android + Windows).
- Windows: Rilvo Office (RWrite + RSheets), Dufli и PauseCut.
- Кнопки скачивания ведут только на проверенные публичные файлы GitHub или страницы Google Play. Для ActivityTracker и DebtExit пока опубликовано описание без публичного установщика.

## Проверка перед публикацией

Сайт работает на GitHub Pages без сборки. Сохраняйте старые адреса `/apps/...`, юридические страницы, `CNAME` и `app-ads.txt`.

После обновления описаний проверьте двуязычные метаданные в `scripts/update-seo.mjs` и выполните `node scripts/update-seo.mjs`. Скрипт согласует title/description, превью ссылок, JSON-LD и sitemap. Даты sitemap должны соответствовать реальным изменениям содержимого.

Проверки: `python scripts/check-site.py` и `node --check apps/app.js`, затем просмотр мобильной вёрстки и переключения EN/RU. По умолчанию используется английский; русский перевод работает на той же странице через JavaScript. Отдельных русских URL нет, поэтому фиктивные `hreflang` не добавлены. Цены и рейтинги в SEO-разметке не выдумываются.

Отдельная задача: сверить старую Privacy Policy BetterSet с фактической реализацией Google Mobile Ads. Обновление каталога не подтверждает юридическое соответствие и настройки Data Safety.
