import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        magazine: "Magazine",
        racing: "Racing",
        garage: "Garage",
        shop: "Shop",
        about: "About",
        followUs: "Follow Us"
      },
      hero: {
        volume: "Volume 01 / Issue 2026",
        title1: "The Soul",
        title2: "of Speed",
        description: "A deep dive into the engineering marvels that define the modern era of high-performance racing. From Weissach to the world.",
        explore: "Explore Story",
        scroll: "Scroll"
      },
      journal: {
        latest: "Latest Stories",
        title: "The Journal",
        exploreAll: "Explore All Articles"
      },
      race: {
        timing: "Live Timing & Schedule",
        grid: "The Grid",
        viewCalendar: "View Full Calendar",
        circuit: "Circuit",
        status: {
          upcoming: "upcoming",
          live: "live",
          finished: "finished"
        }
      },
      newsletter: {
        title: "Join the",
        accent: "Inner Circle",
        description: "Get exclusive access to behind-the-scenes content, early race reports, and member-only events.",
        placeholder: "Enter your email",
        subscribe: "Subscribe"
      },
      article: {
        back: "Back to Journal",
        backShort: "Back",
        deepDive: "Deep Dive",
        authorNote: "Author's Note",
        expert: "Expert Contributor",
        nextStory: "Next Story",
        power: "Power",
        speed: "0-100 KM/H",
        downforce: "Downforce",
        topSpeed: "Top Speed",
        engine: "Engine",
        weight: "Weight"
      }
    }
  },
  uk: {
    translation: {
      nav: {
        magazine: "Журнал",
        racing: "Перегони",
        garage: "Гараж",
        shop: "Магазин",
        about: "Про нас",
        followUs: "Слідкуйте за нами"
      },
      hero: {
        volume: "Том 01 / Випуск 2026",
        title1: "Душа",
        title2: "Швидкості",
        description: "Глибоке занурення в інженерні дива, що визначають сучасну еру високопродуктивних перегонів. Від Вайссаха до всього світу.",
        explore: "Дослідити історію",
        scroll: "Прокрутити"
      },
      journal: {
        latest: "Останні історії",
        title: "Журнал",
        exploreAll: "Всі статті"
      },
      race: {
        timing: "Хронометраж та розклад",
        grid: "Стартова решітка",
        viewCalendar: "Повний календар",
        circuit: "Траса",
        status: {
          upcoming: "майбутні",
          live: "наживо",
          finished: "завершено"
        }
      },
      newsletter: {
        title: "Приєднуйтесь до",
        accent: "Внутрішнього кола",
        description: "Отримайте ексклюзивний доступ до залаштункового контенту, звітів про перегони та подій лише для учасників.",
        placeholder: "Введіть ваш email",
        subscribe: "Підписатися"
      },
      article: {
        back: "Назад до журналу",
        backShort: "Назад",
        deepDive: "Глибокий аналіз",
        authorNote: "Примітка автора",
        expert: "Експертний дописувач",
        nextStory: "Наступна історія",
        power: "Потужність",
        speed: "0-100 КМ/ГОД",
        downforce: "Притискна сила",
        topSpeed: "Макс. швидкість",
        engine: "Двигун",
        weight: "Вага"
      }
    }
  },
  de: {
    translation: {
      nav: {
        magazine: "Magazin",
        racing: "Rennsport",
        garage: "Garage",
        shop: "Shop",
        about: "Über uns",
        followUs: "Folgen Sie uns"
      },
      hero: {
        volume: "Band 01 / Ausgabe 2026",
        title1: "Die Seele",
        title2: "der Geschwindigkeit",
        description: "Ein tiefer Einblick in die technischen Wunderwerke, die die moderne Ära des Hochleistungsrennsports definieren. Von Weissach in die Welt.",
        explore: "Geschichte entdecken",
        scroll: "Scrollen"
      },
      journal: {
        latest: "Neueste Geschichten",
        title: "Das Journal",
        exploreAll: "Alle Artikel entdecken"
      },
      race: {
        timing: "Live-Timing & Zeitplan",
        grid: "Startaufstellung",
        viewCalendar: "Vollständiger Kalender",
        circuit: "Rennstrecke",
        status: {
          upcoming: "bevorstehend",
          live: "live",
          finished: "beendet"
        }
      },
      newsletter: {
        title: "Treten Sie dem",
        accent: "Inneren Kreis bei",
        description: "Erhalten Sie exklusiven Zugang zu Inhalten hinter den Kulissen, frühen Rennberichten und Veranstaltungen nur für Mitglieder.",
        placeholder: "E-Mail eingeben",
        subscribe: "Abonnieren"
      },
      article: {
        back: "Zurück zum Journal",
        backShort: "Zurück",
        deepDive: "Tiefer Einblick",
        authorNote: "Anmerkung des Autors",
        expert: "Experte",
        nextStory: "Nächste Geschichte",
        power: "Leistung",
        speed: "0-100 KM/H",
        downforce: "Abtrieb",
        topSpeed: "Höchstgeschwindigkeit",
        engine: "Motor",
        weight: "Gewicht"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
