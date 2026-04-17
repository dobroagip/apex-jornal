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
          title: "Privacy Policy",
          updated: "Last updated: April 17, 2026",
          intro: "At APEX Magazine, we respect your privacy and are committed to protecting your personal data in accordance with the General Data Protection Regulation (GDPR).",
          section1: {
            title: "1. Data Controller",
            content: "Private Enterprise \"Dobrobut\"\n4 V. Chornovola St.\nOdesa, 65012\nUkraine\nEDRPOU: 30587493\nEmail: dobrocreate@gmail.com"
          },
          section2: {
            title: "2. Personal Data We Collect",
            content: "We may collect the following personal data: Name, Email address, IP address, Usage data (e.g., pages visited, interactions)."
          },
          section3: {
            title: "3. Legal Basis for Processing",
            content: "We process personal data based on: Art. 6(1)(a) GDPR – your consent (e.g. newsletter), Art. 6(1)(b) GDPR – performance of a contract, Art. 6(1)(f) GDPR – legitimate interests (security, analytics, website improvement)."
          },
          section4: {
            title: "4. How We Use Your Data",
            content: "We use your data to: Provide and maintain our website, Communicate with you, Improve user experience, Send updates and marketing (only with consent)."
          },
          section5: {
            title: "5. Cookies and Tracking Technologies",
            content: "We use cookies and similar technologies to operate the website and analyze traffic. Non-essential cookies are used only with your consent."
          },
          section6: {
            title: "6. Data Sharing",
            content: "We may share your data with: Hosting providers, Analytics services, Email service providers. All third parties are required to protect your data."
          },
          section7: {
            title: "7. International Data Transfers",
            content: "As our company is based in Ukraine, your data may be transferred outside the European Economic Area (EEA). We ensure appropriate safeguards in accordance with GDPR."
          },
          section8: {
            title: "8. Data Retention",
            content: "We retain personal data only as long as necessary or required by law."
          },
          section9: {
            title: "9. Your Rights",
            content: "You have the right to: Access your data, Rectify inaccurate data, Request erasure, Restrict processing, Data portability, Object to processing. You also have the right to lodge a complaint with a supervisory authority in the EU."
          },
          section10: {
            title: "10. Contact",
            content: "For privacy-related requests, contact us at: dobrocreate@gmail.com"
          }
        },
        impressum: {
          title: "Impressum / Legal Notice",
          company: "Private Enterprise \"Dobrobut\"",
          edrpou: "EDRPOU Code: 30587493",
          addressTitle: "Registered Address:",
          address1: "4 V. Chornovola St.",
          address2: "Odesa, 65012, Ukraine",
          represented: "Represented by:",
          ceo: "S. Kyslytsyn – Editor-in-Chief",
          contactTitle: "Contact:",
          email: "Email: dobrocreate@gmail.com",
          phone: "Phone: +380674862117",
          responsibleTitle: "Responsible for content:",
          responsible: "S. Kyslytsyn, Odesa, Ukraine",
          disclaimerTitle: "Disclaimer",
          disclaimer: "The content of our website has been created with great care. However, we do not guarantee the accuracy, completeness or timeliness of the content.",
          linksTitle: "External Links",
          links: "Our website contains links to external websites. We have no influence on their content and assume no liability for such external content. If we become aware of any legal violations, we will remove such links immediately."
        },
        terms: {
          title: "Terms of Service",
          updated: "Last updated: April 17, 2026",
          intro: "By accessing and using APEX Magazine (the \"Site\"), you agree to these Terms of Service.",
          section1: {
            title: "1. Use of the Website",
            content: "You agree to use the Site only for lawful purposes."
          },
          section2: {
            title: "2. Intellectual Property",
            content: "All content (texts, images, logos, graphics) is the property of APEX Magazine and protected by copyright laws. Unauthorized use is prohibited."
          },
          section3: {
            title: "3. External Links",
            content: "The Site may contain links to third-party websites. We are not responsible for their content or practices."
          },
          section4: {
            title: "4. Advertising and Sponsored Content",
            content: "We offer advertising and sponsored content. All such content will be clearly marked as \"Sponsored\" or \"Advertisement\"."
          },
          section5: {
            title: "5. Disclaimer of Liability",
            content: "The content is provided for informational purposes only. We are liable for damages only in cases of intent or gross negligence. This does not apply to damages resulting from injury to life, body, or health."
          },
          section6: {
            title: "6. Governing Law",
            content: "These Terms are governed by the laws of Ukraine. If you are a consumer residing in the European Union, mandatory consumer protection laws of your country of residence remain unaffected."
          },
          section7: {
            title: "7. Changes to Terms",
            content: "We reserve the right to update these Terms at any time."
          }
        }
      },
      cookies: {
        title: "Cookie Notice",
        intro: "We use cookies to improve your experience.",
        essential: "Essential cookies are required for the website to function properly.",
        nonEssential: "Non-essential cookies (analytics, marketing) are used only with your consent.",
        withdraw: "By clicking \"Accept\", you agree to the use of cookies. You can withdraw your consent at any time.",
        privacyLink: "For more details, see our Privacy Policy.",
        accept: "Accept",
        decline: "Decline"
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
          intro: "Отримуючи доступ та використовуючи APEX Magazine (\"Сайт\"), ви погоджуєтесь дотримуватися цих Умов використання. Якщо ви не згодні, будь ласка, утримайтесь від використання Сайту.",
          section1: {
            title: "1. Прийняття умов",
            content: "Отримуючи доступ та використовуючи APEX Magazine, ви погоджуєтесь дотримуватися цих Умов використання. Якщо ви не згодні, будь ласка, утримайтесь від використання Сайту."
          },
          section2: {
            title: "2. Інтелектуальна власність",
            content: "Весь контент, опублікований на цьому Сайті, включаючи, але не обмежуючись статтями, фотографіями, логотипами та графічним дизайном, є власністю APEX Magazine та захищений міжнародними законами про авторське право. Несанкціоноване відтворення або розповсюдження будь-яких матеріалів суворо заборонено."
          },
          section3: {
            title: "3. Зовнішні посилання та контент третіх сторін",
            content: "Сайт містить посилання на зовнішні веб-сайти, включаючи платформи електронної комерції, такі як Bardahl Ukraine та Automall. APEX Magazine не контролює, не схвалює та не несе відповідальності за контент, політику конфіденційності або практики будь-яких сторонніх веб-сайтів. Будь-які транзакції або взаємодії між вами та стороннім сайтом здійснюються виключно між вами та цією третьою стороною."
          },
          section4: {
            title: "4. Рекламні послуги та розміщення посилань",
            content: "APEX Magazine пропонує платну рекламу, спонсорований контент та послуги розміщення посилань. Спонсорований контент та платні посилання будуть чітко позначені як \"Спонсоровано\" або \"Реклама\". Включення платного посилання не є гарантією продуктів або послуг третьої сторони."
          },
          section5: {
            title: "5. Відмова від відповідальності",
            content: "Контент на APEX Magazine призначений виключно для інформаційних та розважальних цілей. Хоча ми прагнемо до точності, ми не несемо відповідальності за будь-які технічні неточності або за будь-які збитки, що виникають внаслідок використання автомобільних порад або підказок з обслуговування, наданих у наших статтях."
          },
          section6: {
            title: "6. Застосовне право",
            content: "Ці Умови регулюються законодавством України. Будь-які спори вирішуються в судах міста Києва, Україна."
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
          intro: "Durch den Zugriff auf und die Nutzung von APEX Magazine (die \"Website\") erklären Sie sich mit diesen Nutzungsbedingungen einverstanden. Wenn Sie nicht einverstanden sind, verzichten Sie bitte auf die Nutzung der Website.",
          section1: {
            title: "1. Geltungsbereich",
            content: "Durch den Zugriff auf und die Nutzung von APEX Magazine erklären Sie sich mit diesen Nutzungsbedingungen einverstanden. Wenn Sie nicht einverstanden sind, verzichten Sie bitte auf die Nutzung der Website."
          },
          section2: {
            title: "2. Urheberrecht und geistiges Eigentum",
            content: "Sämtliche auf dieser Website veröffentlichten Inhalte (Texte, Fotos, Grafiken, Logos) sind urheberrechtlich geschützt und Eigentum von APEX Magazine. Jede Verwertung außerhalb der Grenzen des Urheberrechtsgesetzes ohne schriftliche Zustimmung von APEX ist unzulässig. Eine unbefugte Vervielfältigung oder Verbreitung von Materialien ist strengstens untersagt."
          },
          section3: {
            title: "3. Externe Links und Haftungsausschluss",
            content: "Unsere Website enthält Verknüpfungen zu Websites Dritter (z. B. Bardahl Ukraine, Automall). Da wir auf deren Inhalte keinen Einfluss haben, übernehmen wir für die fremden Inhalte keine Gewähr. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Eine permanente inhaltliche Kontrolle ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Alle Transaktionen oder Interaktionen zwischen Ihnen und einer Drittanbieter-Website erfolgen ausschließlich zwischen Ihnen und diesem Dritten."
          },
          section4: {
            title: "4. Werbung und gesponserte Inhalte",
            content: "APEX bietet kostenpflichtige Werbeflächen, gesponserte Inhalte und Linkplatzierungen an. Solche Inhalte werden gemäß den gesetzlichen Bestimmungen deutlich als \"Anzeige\" oder \"Sponsored\" gekennzeichnet. Die Platzierung eines bezahlten Links stellt keine ausdrückliche Empfehlung der beworbenen Produkte oder Dienstleistungen durch die Redaktion dar."
          },
          section5: {
            title: "5. Haftungsbeschränkung",
            content: "Die Informationen in diesem Magazin dienen der allgemeinen Information und Unterhaltung. Obwohl wir uns um Genauigkeit bemühen, übernehmen wir keine Haftung für technische Ungenauigkeiten oder für Schäden an Fahrzeugen oder Personen, die durch die Umsetzung von technischen Tipps oder Berichten aus unseren Artikeln entstehen."
          },
          section6: {
            title: "6. Rechtswahl und Gerichtsstand",
            content: "Es gilt das Recht der Ukraine. Gerichtsstand ist Kiew, Ukraine. Weitere Informationen finden Sie in unserem Impressum."
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
