const translations = {
  en: {
    name: "Aleksandr Katilov",
    navigation: "Navigation",
    navApps: "Apps", navProjects: "Projects", navDirections: "Focus", navContact: "Contact",
    aboutTitle: "About",
    aboutLead: "I build my own brands, sell products on eBay, and develop AI tools for business automation.",
    aboutText: "My current focus is PUFFLY and ZERMOK, e-commerce, and practical artificial intelligence solutions.",
    projectsTitle: "Projects", now: "Present",
    pufflySubtitle: "Baby products brand",
    pufflyText: "Building a baby products brand through product development, assortment planning, quality control, positioning, and e-commerce.",
    zermokSubtitle: "Automotive parts brand",
    zermokText: "Creating and developing an automotive parts brand focused on in-demand categories, reliable products, and an easier buying experience.",
    trackerName: "Better Each Set: Gym Tracker",
    trackerSubtitle: "Independent AI development",
    trackerText: "A mobile Android app for planning and logging workouts. Users select a gym, start a workout, mark completed exercises, and record weight and repetitions for every set. Results are saved to workout history and a calendar, making it easy to track progress and adjust the training program over time.",
    debtExitName: "DebtExit — A Clear Path Out of Debt",
    debtExitSubtitle: "Private debt payoff planner",
    debtExitText: "A private Android app that turns credit card balances, APRs, minimum payments, and a monthly budget into a clear payoff forecast. It compares avalanche and snowball strategies, creates a simple monthly action plan, and keeps financial data locally on the device with optional PIN protection and encrypted backups.",
    currentTitle: "Current focus", brandsSubtitle: "Independent brands", direction1: "Focus 01",
    brandsText: "I create products, develop assortments, and build brands in the baby products and automotive parts categories.",
    ebaySubtitle: "E-commerce", direction2: "Focus 02",
    ebayText: "I sell products on eBay and continuously improve the process of creating, presenting, and managing listings.",
    aiSubtitle: "Tools and automation", direction3: "Focus 03",
    aiText: "I develop AI solutions that reduce manual work and make online sales operations more efficient.",
    skillsTitle: "Skills", brandsSkill: "Brands", brandsSkillText: "Products, positioning, e-commerce",
    ebaySkillText: "Sales, listings, photography, assortment",
    aiSkill: "AI Development", aiSkillText: "Python, APIs, AI models, automation",
    contactTitle: "Contact", backToTop: "Back to top ↑"
  },
  ru: {
    name: "Александр Катилов",
    navigation: "Навигация",
    navApps: "Приложения", navProjects: "Проекты", navDirections: "Направления", navContact: "Контакты",
    aboutTitle: "Обо мне",
    aboutLead: "Развиваю собственные бренды, продаю товары на eBay и создаю AI‑инструменты для автоматизации бизнеса.",
    aboutText: "Мои текущие направления — PUFFLY и ZERMOK, электронная коммерция и разработка практичных решений с искусственным интеллектом.",
    projectsTitle: "Проекты", now: "Сейчас",
    pufflySubtitle: "Бренд детских товаров",
    pufflyText: "Развитие собственного бренда детских товаров: работа с продуктами, ассортиментом, качеством, позиционированием и электронной коммерцией.",
    zermokSubtitle: "Бренд автомобильных запчастей",
    zermokText: "Создание и развитие бренда автозапчастей с фокусом на востребованные категории, надёжность продукции и удобство выбора для покупателей.",
    trackerName: "Better Each Set: Gym Tracker",
    trackerSubtitle: "Собственная AI‑разработка",
    trackerText: "Мобильное Android‑приложение для планирования и записи тренировок. Пользователь выбирает зал, запускает тренировку, отмечает выполненные упражнения и записывает вес и количество повторений в каждом подходе. После завершения результаты сохраняются в истории и календаре, позволяя отслеживать прогресс и постепенно корректировать тренировочную программу.",
    debtExitName: "DebtExit — понятный путь к жизни без долгов",
    debtExitSubtitle: "Приватный планировщик погашения долгов",
    debtExitText: "Приватное Android‑приложение, которое превращает остатки по кредитным картам, процентные ставки, минимальные платежи и месячный бюджет в понятный прогноз погашения. Оно сравнивает стратегии «лавина» и «снежный ком», составляет простой план на месяц и хранит финансовые данные локально на устройстве с дополнительной PIN‑защитой и зашифрованными резервными копиями.",
    currentTitle: "Сейчас", brandsSubtitle: "Собственные бренды", direction1: "Направление 01",
    brandsText: "Создаю продукты, развиваю ассортимент и формирую бренды в категориях детских товаров и автозапчастей.",
    ebaySubtitle: "Электронная коммерция", direction2: "Направление 02",
    ebayText: "Продаю товары на eBay и совершенствую процесс создания, оформления и управления объявлениями.",
    aiSubtitle: "Инструменты и автоматизация", direction3: "Направление 03",
    aiText: "Разрабатываю AI‑решения, которые сокращают ручную работу и помогают эффективнее управлять онлайн‑продажами.",
    skillsTitle: "Навыки", brandsSkill: "Бренды", brandsSkillText: "Продукты, позиционирование, электронная коммерция",
    ebaySkillText: "Продажи, листинги, фотографии, ассортимент",
    aiSkill: "AI‑разработка", aiSkillText: "Python, API, AI‑модели, автоматизация",
    contactTitle: "Контакты", backToTop: "Наверх ↑"
  }
};

function setLanguage(language) {
  const dictionary = translations[language];
  document.documentElement.lang = language;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = dictionary[element.dataset.i18n];
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    element.setAttribute("aria-label", dictionary[element.dataset.i18nAria]);
  });
  document.querySelectorAll("[data-lang]").forEach((button) => {
    const selected = button.dataset.lang === language;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  document.title = language === "en" ? "Aleksandr Katilov" : "Александр Катилов";
  document.getElementById("meta-description").content = language === "en"
    ? "Aleksandr Katilov — founder of PUFFLY and ZERMOK, eBay seller and AI developer."
    : "Александр Катилов — основатель брендов PUFFLY и ZERMOK, eBay seller и AI-разработчик.";
  localStorage.setItem("portfolio-language", language);
}

document.getElementById("year").textContent = new Date().getFullYear();
document.querySelectorAll("[data-lang]").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});
setLanguage(localStorage.getItem("portfolio-language") || "en");
