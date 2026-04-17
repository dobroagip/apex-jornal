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
      },
      legal: {
        gdpr: {
          title: "GDPR / Privacy Policy",
          updated: "Last updated: April 17, 2026",
          intro: "At APEX Magazine, we take your privacy seriously. This policy explains how we collect, use, and protect your personal data in compliance with the General Data Protection Regulation (GDPR).",
          section1: {
            title: "1. Data Collection",
            content: "We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us. This may include your name, email address, and IP address."
          },
          section2: {
            title: "2. Use of Data",
            content: "We use your data to provide our services, personalize your experience, and communicate with you about updates and promotions."
          },
          section3: {
            title: "3. Your Rights",
            content: "Under GDPR, you have the right to access, rectify, or erase your personal data. You can also object to processing and request data portability."
          }
        },
        impressum: {
          title: "Impressum / Legal Notice",
          tmg: "Information according to § 5 TMG:",
          company: "APEX Media Group GmbH",
          address1: "Nürburgring Boulevard 1",
          address2: "53520 Nürburg, Germany",
          represented: "Represented by:",
          ceo: "Max Verstappen, CEO",
          contactTitle: "Contact:",
          email: "Email: dobrocreate@gmail.com",
          phone: "Phone: +49 (0) 2691 302-0",
          registerTitle: "Register Entry:",
          registerEntry: "Entry in the Handelsregister.",
          registerCourt: "Registering court: Amtsgericht Koblenz",
          registerNumber: "Registration number: HRB 12345"
        },
        terms: {
          title: "Terms of Service",
          updated: "Last updated: April 17, 2026",
          intro: "Welcome to APEX Magazine. By accessing our website, you agree to these terms of service and our privacy policy.",
          section1: {
            title: "1. Acceptance of Terms",
            content: "By using this website, you accept these terms in full. If you disagree with any part of these terms, you must not use our website."
          },
          section2: {
            title: "2. Intellectual Property",
            content: "All content on this website, including text, graphics, logos, and images, is the property of APEX Magazine and protected by copyright laws."
          },
          section3: {
            title: "3. Limitation of Liability",
            content: "APEX Magazine will not be liable for any damages arising from the use of this website or inability to use it."
          }
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
      },
      legal: {
        gdpr: {
          title: "GDPR / Політика конфіденційності",
          updated: "Останнє оновлення: 17 квітня 2026",
          intro: "У APEX Magazine ми серйозно ставимося до вашої конфіденційності. Ця політика пояснює, як ми збираємо, використовуємо та захищаємо ваші персональні дані відповідно до Загального регламенту захисту даних (GDPR).",
          section1: {
            title: "1. Збір даних",
            content: "Ми збираємо інформацію, яку ви надаєте нам безпосередньо, наприклад, коли ви створюєте обліковий запис, підписуєтесь на нашу розсилку або зв'язуєтесь з нами. Це може включати ваше ім'я, адресу електронної пошти та IP-адресу."
          },
          section2: {
            title: "2. Використання даних",
            content: "Ми використовуємо ваші дані для надання наших послуг, персоналізації вашого досвіду та спілкування з вами про оновлення та акції."
          },
          section3: {
            title: "3. Ваші права",
            content: "Відповідно до GDPR, ви маєте право на доступ, виправлення або видалення ваших персональних даних. Ви також можете заперечувати проти обробки та запитувати переносимість даних."
          }
        },
        impressum: {
          title: "Impressum / Юридична інформація",
          tmg: "Інформація відповідно до § 5 TMG:",
          company: "APEX Media Group GmbH",
          address1: "Nürburgring Boulevard 1",
          address2: "53520 Nürburg, Germany",
          represented: "Представлений:",
          ceo: "Max Verstappen, CEO",
          contactTitle: "Контакти:",
          email: "Email: dobrocreate@gmail.com",
          phone: "Телефон: +49 (0) 2691 302-0",
          registerTitle: "Реєстраційний запис:",
          registerEntry: "Запис у Handelsregister.",
          registerCourt: "Реєстраційний суд: Amtsgericht Koblenz",
          registerNumber: "Реєстраційний номер: HRB 12345"
        },
        terms: {
          title: "Умови використання",
          updated: "Останнє оновлення: 17 квітня 2026",
          intro: "Ласкаво просимо до APEX Magazine. Отримуючи доступ до нашого веб-сайту, ви погоджуєтесь з цими умовами обслуговування та нашою політикою конфіденційності.",
          section1: {
            title: "1. Прийняття умов",
            content: "Використовуючи цей веб-сайт, ви повністю приймаєте ці умови. Якщо ви не згодні з будь-якою частиною цих умов, ви не повинні використовувати наш веб-сайт."
          },
          section2: {
            title: "2. Інтелектуальна власність",
            content: "Весь вміст цього веб-сайту, включаючи текст, графіку, логотипи та зображення, є власністю APEX Magazine та захищений законами про авторське право."
          },
          section3: {
            title: "3. Обмеження відповідальності",
            content: "APEX Magazine не несе відповідальності за будь-які збитки, що виникають внаслідок використання цього веб-сайту або неможливості його використання."
          }
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
      },
      legal: {
        gdpr: {
          title: "DSGVO / Datenschutzerklärung",
          updated: "Zuletzt aktualisiert: 17. April 2026",
          intro: "Bei APEX Magazine nehmen wir Ihre Privatsphäre ernst. Diese Richtlinie erklärt, wie wir Ihre personenbezogenen Daten in Übereinstimmung mit der Datenschutz-Grundverordnung (DSGVO) sammeln, verwenden und schützen.",
          section1: {
            title: "1. Datenerfassung",
            content: "Wir sammeln Informationen, die Sie uns direkt zur Verfügung stellen, z. B. wenn Sie ein Konto erstellen, unseren Newsletter abonnieren oder uns kontaktieren. Dies kann Ihren Namen, Ihre E-Mail-Adresse und Ihre IP-Adresse umfassen."
          },
          section2: {
            title: "2. Verwendung von Daten",
            content: "Wir verwenden Ihre Daten, um unsere Dienste bereitzustellen, Ihr Erlebnis zu personalisieren und mit Ihnen über Updates und Werbeaktionen zu kommunizieren."
          },
          section3: {
            title: "3. Ihre Rechte",
            content: "Gemäß DSGVO haben Sie das Recht auf Zugang, Berichtigung oder Löschung Ihrer personenbezogenen Daten. Sie können auch der Verarbeitung widersprechen und Datenübertragbarkeit verlangen."
          }
        },
        impressum: {
          title: "Impressum / Rechtliche Hinweise",
          tmg: "Angaben gemäß § 5 TMG:",
          company: "APEX Media Group GmbH",
          address1: "Nürburgring Boulevard 1",
          address2: "53520 Nürburg, Deutschland",
          represented: "Vertreten durch:",
          ceo: "Max Verstappen, Geschäftsführer",
          contactTitle: "Kontakt:",
          email: "E-Mail: dobrocreate@gmail.com",
          phone: "Telefon: +49 (0) 2691 302-0",
          registerTitle: "Registereintrag:",
          registerEntry: "Eintragung im Handelsregister.",
          registerCourt: "Registergericht: Amtsgericht Koblenz",
          registerNumber: "Registernummer: HRB 12345"
        },
        terms: {
          title: "Nutzungsbedingungen",
          updated: "Zuletzt aktualisiert: 17. April 2026",
          intro: "Willkommen bei APEX Magazine. Durch den Zugriff auf unsere Website stimmen Sie diesen Nutzungsbedingungen und unserer Datenschutzrichtlinie zu.",
          section1: {
            title: "1. Annahme der Bedingungen",
            content: "Durch die Nutzung dieser Website akzeptieren Sie diese Bedingungen vollständig. Wenn Sie mit einem Teil dieser Bedingungen nicht einverstanden sind, dürfen Sie unsere Website nicht nutzen."
          },
          section2: {
            title: "2. Geistiges Eigentum",
            content: "Alle Inhalte auf dieser Website, einschließlich Text, Grafiken, Logos und Bilder, sind Eigentum von APEX Magazine und durch Urheberrechtsgesetze geschützt."
          },
          section3: {
            title: "3. Haftungsbeschränkung",
            content: "APEX Magazine haftet nicht für Schäden, die durch die Nutzung dieser Website oder die Unmöglichkeit ihrer Nutzung entstehen."
          }
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
