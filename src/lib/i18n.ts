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
        title: "Race Calendar",
        subtitle: "Full F1 Season Schedule",
        loading: "Loading calendar...",
        retry: "Retry",
        status: {
          upcoming: "upcoming",
          live: "live",
          finished: "finished",
          canceled: "canceled"
        }
      },
      newsletter: {
        title: "Join the",
        accent: "Inner Circle",
        description: "Get exclusive access to behind-the-scenes content, early race reports, and member-only events.",
        placeholder: "Enter your email",
        subscribe: "Subscribe",
        subscribing: "Subscribing...",
        invalidEmail: "Please enter a valid email address",
        alreadySubscribed: "This email is already subscribed",
        successMessage: "Success! Check your email for Telegram bot link to complete subscription.",
        errorMessage: "Something went wrong. Please try again.",
        telegramInfo: "Get instant notifications via Telegram! After subscribing, you'll receive a link to connect our bot.",
        telegramSecure: "Secure & instant notifications"
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
      },
      about: {
        label: "Who We Are",
        title: "About",
        titleAccent: "APEX",
        intro: "APEX Magazine is the ultimate destination for automotive enthusiasts who demand more than surface-level content. We dive deep into the engineering, design, and culture that makes the automotive world extraordinary.",
        mission: "Founded in 2024, APEX exists for those who see cars not just as transportation—but as art, technology, and passion. We explore the intersection of performance, innovation, and design through the eyes of people who truly understand.",
        features: {
          technical: {
            title: "Technical Analysis",
            description: "In-depth technical analysis and engineering deep-dives"
          },
          interviews: {
            title: "Exclusive Interviews",
            description: "Exclusive interviews with designers, engineers, and visionaries"
          },
          business: {
            title: "Business Insights",
            description: "The business behind the brands"
          },
          culture: {
            title: "Cultural Movements",
            description: "Cultural movements shaping automotive future"
          }
        },
        why: {
          title: "Why",
          titleAccent: "APEX?",
          description: "While others chase trends, we chase truth. Every article is researched, fact-checked, and written by people who live and breathe automotive culture. We don't do clickbait. We do clarity."
        },
        readers: {
          title: "Our Readers",
          engineers: "Engineers curious about design",
          collectors: "Collectors seeking knowledge",
          professionals: "Professionals in the industry",
          enthusiasts: "Enthusiasts who want to understand why a car matters—not just how fast it goes"
        },
        stats: {
          founded: "Founded",
          articles: "Articles",
          readers: "Readers",
          countries: "Countries"
        }
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
        title: "Календар гонок",
        subtitle: "Повний розклад сезону F1",
        loading: "Завантаження календаря...",
        retry: "Повторити",
        status: {
          upcoming: "майбутні",
          live: "наживо",
          finished: "завершено",
          canceled: "скасовано"
        }
      },
      newsletter: {
        title: "Приєднуйтесь до",
        accent: "Внутрішнього кола",
        description: "Отримайте ексклюзивний доступ до залаштункового контенту, звітів про перегони та подій лише для учасників.",
        placeholder: "Введіть ваш email",
        subscribe: "Підписатися",
        subscribing: "Підписка...",
        invalidEmail: "Будь ласка, введіть дійсну адресу email",
        alreadySubscribed: "Цей email вже підписаний",
        successMessage: "Успіх! Перевірте email для посилання на Telegram бота.",
        errorMessage: "Щось пішло не так. Спробуйте ще раз.",
        telegramInfo: "Отримуйте миттєві сповіщення через Telegram! Після підписки ви отримаєте посилання для підключення нашого бота.",
        telegramSecure: "Безпечні та миттєві сповіщення"
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
      },
      about: {
        label: "Хто ми",
        title: "Про",
        titleAccent: "APEX",
        intro: "APEX Magazine — це головний напрямок для автомобільних ентузіастів, які вимагають більше, ніж поверхневий контент. Ми заглиблюємося в інженерію, дизайн та культуру, які роблять автомобільний світ надзвичайним.",
        mission: "Заснований у 2024 році, APEX існує для тих, хто бачить автомобілі не просто як транспорт — а як мистецтво, технологію та пристрасть. Ми досліджуємо перетин продуктивності, інновацій та дизайну очима людей, які справді розуміються.",
        features: {
          technical: {
            title: "Технічний аналіз",
            description: "Глибокий технічний аналіз та інженерні дослідження"
          },
          interviews: {
            title: "Ексклюзивні інтерв'ю",
            description: "Ексклюзивні інтерв'ю з дизайнерами, інженерами та візіонерами"
          },
          business: {
            title: "Бізнес-аналітика",
            description: "Бізнес за брендами"
          },
          culture: {
            title: "Культурні рухи",
            description: "Культурні рухи, що формують автомобільне майбутнє"
          }
        },
        why: {
          title: "Чому",
          titleAccent: "APEX?",
          description: "Поки інші ганяються за трендами, ми ганяємося за правдою. Кожна стаття досліджена, перевірена фактами та написана людьми, які живуть і дихають автомобільною культурою. Ми не робимо клікбейт. Ми робимо ясність."
        },
        readers: {
          title: "Наші читачі",
          engineers: "Інженери, які цікавляться дизайном",
          collectors: "Колекціонери, які шукають знання",
          professionals: "Професіонали в індустрії",
          enthusiasts: "Ентузіасти, які хочуть зрозуміти, чому автомобіль важливий — а не лише наскільки він швидкий"
        },
        stats: {
          founded: "Заснований",
          articles: "Статей",
          readers: "Читачів",
          countries: "Країн"
        }
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
        title: "Rennkalender",
        subtitle: "Vollständiger F1-Saisonplan",
        loading: "Kalender wird geladen...",
        retry: "Wiederholen",
        status: {
          upcoming: "bevorstehend",
          live: "live",
          finished: "beendet",
          canceled: "abgesagt"
        }
      },
      newsletter: {
        title: "Treten Sie dem",
        accent: "Inneren Kreis bei",
        description: "Erhalten Sie exklusiven Zugang zu Inhalten hinter den Kulissen, frühen Rennberichten und Veranstaltungen nur für Mitglieder.",
        placeholder: "E-Mail eingeben",
        subscribe: "Abonnieren",
        subscribing: "Abonnieren...",
        invalidEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein",
        alreadySubscribed: "Diese E-Mail ist bereits abonniert",
        successMessage: "Erfolg! Überprüfen Sie Ihre E-Mail für den Telegram-Bot-Link.",
        errorMessage: "Etwas ist schief gelaufen. Bitte versuchen Sie es erneut.",
        telegramInfo: "Erhalten Sie sofortige Benachrichtigungen über Telegram! Nach dem Abonnieren erhalten Sie einen Link zu unserem Bot.",
        telegramSecure: "Sichere und sofortige Benachrichtigungen"
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
      },
      about: {
        label: "Wer wir sind",
        title: "Über",
        titleAccent: "APEX",
        intro: "APEX Magazine ist das ultimative Ziel für Automobilenthusiasten, die mehr als oberflächliche Inhalte verlangen. Wir tauchen tief in die Technik, das Design und die Kultur ein, die die Automobilwelt außergewöhnlich machen.",
        mission: "Gegründet im Jahr 2024, existiert APEX für diejenigen, die Autos nicht nur als Transportmittel sehen — sondern als Kunst, Technologie und Leidenschaft. Wir erforschen die Schnittstelle von Leistung, Innovation und Design durch die Augen von Menschen, die es wirklich verstehen.",
        features: {
          technical: {
            title: "Technische Analyse",
            description: "Tiefgehende technische Analysen und technische Einblicke"
          },
          interviews: {
            title: "Exklusive Interviews",
            description: "Exklusive Interviews mit Designern, Ingenieuren und Visionären"
          },
          business: {
            title: "Business-Einblicke",
            description: "Das Geschäft hinter den Marken"
          },
          culture: {
            title: "Kulturelle Bewegungen",
            description: "Kulturelle Bewegungen, die die automobile Zukunft prägen"
          }
        },
        why: {
          title: "Warum",
          titleAccent: "APEX?",
          description: "Während andere Trends jagen, jagen wir die Wahrheit. Jeder Artikel wird recherchiert, faktengeprüft und von Menschen geschrieben, die Automobilkultur leben und atmen. Wir machen keinen Clickbait. Wir machen Klarheit."
        },
        readers: {
          title: "Unsere Leser",
          engineers: "Ingenieure, die sich für Design interessieren",
          collectors: "Sammler, die Wissen suchen",
          professionals: "Fachleute in der Branche",
          enthusiasts: "Enthusiasten, die verstehen wollen, warum ein Auto wichtig ist — nicht nur wie schnell es fährt"
        },
        stats: {
          founded: "Gegründet",
          articles: "Artikel",
          readers: "Leser",
          countries: "Länder"
        }
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
