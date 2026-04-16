/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ArticleCard from './components/ArticleCard';
import RaceSection from './components/RaceSection';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import BrandMarquee from './components/BrandMarquee';
import ArticlePage from './components/ArticlePage';
import { Article } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { HelmetProvider } from 'react-helmet-async';
import SEO from './components/SEO';
import LegalPages from './components/LegalPages';
import ArticleForm from './components/ArticleForm';
import CookieConsent from './components/CookieConsent';

export default function App() {
  const [view, setView] = useState<'home' | 'article' | 'legal' | 'admin'>('home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const { t, i18n } = useTranslation();

  const MOCK_ARTICLES: Article[] = useMemo(() => [
    {
      id: 'porsche-gt3-rs',
      title: i18n.language.startsWith('uk') ? 'Фізика швидкості: GT3 RS' : i18n.language.startsWith('de') ? 'Die Physik der Geschwindigkeit: GT3 RS' : 'The Physics of Speed: GT3 RS',
      category: t('article.deepDive'),
      image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=2070',
      excerpt: i18n.language.startsWith('uk') ? 'Porsche 911 GT3 RS: Коли межа між дорожнім авто та гоночним GT3 стає формальністю.' : i18n.language.startsWith('de') ? 'Porsche 911 GT3 RS: Wenn die Linie zwischen Straßenauto und GT3-Renner zur reinen Formsache wird.' : 'Porsche 911 GT3 RS: When the line between a road car and a GT3 racer becomes a mere formality.',
      date: 'April 15, 2026',
      author: 'James Sterling',
      fullTitle: i18n.language.startsWith('uk') ? 'Фізика швидкості' : i18n.language.startsWith('de') ? 'Die Physik der Geschwindigkeit' : 'The Physics of Speed',
      subtitle: i18n.language.startsWith('uk') ? 'Porsche 911 GT3 RS: Коли межа між дорожнім авто та гоночним GT3 стає формальністю.' : i18n.language.startsWith('de') ? 'Porsche 911 GT3 RS: Wenn die Linie zwischen Straßenauto und GT3-Renner zur reinen Formsache wird.' : 'Porsche 911 GT3 RS: When the line between a road car and a GT3 racer becomes a mere formality.',
      heroImage: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=2070',
      stats: [
        { label: 'Power', value: '525 HP / 465 NM', icon: 'power' },
        { label: '0-100 KM/H', value: '3.2 SECONDS', icon: 'speed' },
        { label: 'Downforce', value: '860 KG @ 285 KM/H', icon: 'wind' }
      ],
      content: {
        intro: i18n.language.startsWith('uk') ? 'Потрібен певний вид божевілля, щоб подивитися на і без того чудовий 911 GT3 і вирішити, що йому потрібно більше. Більше крил, більше вентиляційних отворів, більше агресії. Але для інженерів у Вайссаху поняття "достатньо" не існує. Новий 911 GT3 RS (992) є фізичним втіленням цієї одержимості.' : i18n.language.startsWith('de') ? 'Es bedarf einer gewissen Art von Wahnsinn, um den ohnehin schon grandiosen 911 GT3 zu betrachten und zu entscheiden, dass er noch mehr braucht. Mehr Flügel, mehr Belüftungsöffnungen, mehr Aggression. Aber für die Ingenieure in Weissach existiert der Begriff "genug" nicht. Der neue 911 GT3 RS (992) ist die physische Manifestation dieser Obsession.' : 'There is a specific kind of madness required to look at the already-sublime 911 GT3 and decide it needs more. More wings, more vents, more aggression. But for the engineers at Weissach, "enough" is a concept that doesn\'t exist. The new 911 GT3 RS (992) is the physical manifestation of that obsession.',
        sections: [
          {
            title: i18n.language.startsWith('uk') ? 'Мистецтво аеродинаміки' : i18n.language.startsWith('de') ? 'Die Kunst der Aero' : 'The Art of Aero',
            text: i18n.language.startsWith('uk') ? 'Перше, що вражає вас — метафорично і буквально — це крило. Це не просто спойлер; це заява. Вперше на серійному Porsche верхній край заднього крила вищий за лінію даху.' : i18n.language.startsWith('de') ? 'Das Erste, was einen trifft – metaphorisch und buchstäblich – ist der Flügel. Es ist nicht nur ein Spoiler; es ist ein Statement. Zum ersten Mal bei einem Serien-Porsche liegt die Oberkante des Heckflügels höher als die Dachlinie.' : 'The first thing that hits you—metaphorically and literally—is the wing. It\'s not just a spoiler; it\'s a statement. For the first time on a production Porsche, the top edge of the rear wing is higher than the roofline.',
            image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2070'
          }
        ],
        quote: i18n.language.startsWith('uk') ? 'Він не просто прискорюється; він розриває атмосферу, залишаючи за собою шлейф розбитих очікувань.' : i18n.language.startsWith('de') ? 'Er beschleunigt nicht nur; er reißt durch die Atmosphäre und hinterlässt eine Spur erschütterter Erwartungen.' : 'It doesn\'t just accelerate; it tears through the atmosphere, leaving a wake of shattered expectations behind it.'
      }
    },
    {
      id: 'dtm-legends',
      title: i18n.language.startsWith('uk') ? 'DTM: Повернення легенд' : i18n.language.startsWith('de') ? 'DTM: Die Rückkehr der Legenden' : 'DTM: The Return of the Legends',
      category: t('nav.racing'),
      image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=2070',
      excerpt: i18n.language.startsWith('uk') ? 'Дослідження нової ери Deutsche Tourenwagen Masters та пілотів, які переосмислюють гонки турингових автомобілів.' : i18n.language.startsWith('de') ? 'Erkundung der neuen Ära der Deutschen Tourenwagen Masters und der Fahrer, die den Tourenwagenrennsport neu definieren.' : 'Exploring the new era of the Deutsche Tourenwagen Masters and the drivers who are redefining touring car racing.',
      date: 'April 18, 2026',
      author: 'Marcus Vane',
      fullTitle: i18n.language.startsWith('uk') ? 'Повернення легенд' : i18n.language.startsWith('de') ? 'Die Rückkehr der Legenden' : 'The Return of the Legends',
      subtitle: i18n.language.startsWith('uk') ? 'DTM 2026: Де спадщина зустрічається з високими технологіями.' : i18n.language.startsWith('de') ? 'DTM 2026: Wo Tradition auf Hightech trifft.' : 'DTM 2026: Where heritage meets high-tech in the world\'s most competitive touring car series.',
      heroImage: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=2070',
      stats: [
        { label: 'Top Speed', value: '300+ KM/H', icon: 'speed' },
        { label: 'Engine', value: 'V8 / 600+ HP', icon: 'power' },
        { label: 'Weight', value: '1280 KG', icon: 'wind' }
      ],
      content: {
        intro: i18n.language.startsWith('uk') ? 'DTM завжди був чимось більшим, ніж просто гоночна серія; це поле битви для найпрестижніших виробників світу.' : i18n.language.startsWith('de') ? 'Die DTM war schon immer mehr als nur eine Rennserie; sie ist ein Schlachtfeld für die prestigeträchtigsten Hersteller der Welt.' : 'The DTM has always been more than just a race series; it\'s a battleground for the world\'s most prestigious manufacturers.',
        sections: [
          {
            title: i18n.language.startsWith('uk') ? 'Нова решітка' : i18n.language.startsWith('de') ? 'Das neue Grid' : 'The New Grid',
            text: i18n.language.startsWith('uk') ? 'З поверненням культових брендів та впровадженням регламенту GT3+ наступного покоління, сезон DTM 2026 обіцяє бути найконкурентнішим за останні десятиліття.' : i18n.language.startsWith('de') ? 'Mit der Rückkehr ikonischer Marken und der Einführung des GT3+-Reglements der nächsten Generation verspricht die DTM-Saison 2026 die wettbewerbsfähigste seit Jahrzehnten zu werden.' : 'With the return of iconic brands and the introduction of next-generation GT3+ regulations, the 2026 DTM season promises to be the most competitive in decades.',
            image: 'https://images.unsplash.com/photo-1530681954419-7979fa474556?auto=format&fit=crop&q=80&w=2070'
          }
        ],
        quote: i18n.language.startsWith('uk') ? 'DTM — це місце, де відбуваються справжні гонки. Це близько, це голосно і це особисто.' : i18n.language.startsWith('de') ? 'DTM ist der Ort, an dem echtes Racing stattfindet. Es ist nah, es ist laut und es ist persönlich.' : 'DTM is where the real racing happens. It\'s close, it\'s loud, and it\'s personal.'
      }
    },
    {
      id: '1',
      title: i18n.language.startsWith('uk') ? 'Електрична революція: Lotus Emira' : i18n.language.startsWith('de') ? 'Die elektrische Revolution: Lotus Emira' : 'The Electric Revolution: Lotus Emira',
      category: 'Review',
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=2070',
      excerpt: i18n.language.startsWith('uk') ? 'Lotus прощається з двигунами внутрішнього згоряння з моделлю Emira.' : i18n.language.startsWith('de') ? 'Lotus verabschiedet sich mit dem Emira vom Verbrennungsmotor.' : 'Lotus bids farewell to internal combustion with the Emira, a mid-engine masterpiece that balances heritage with modern performance.',
      date: 'April 12, 2026',
      author: 'James Sterling'
    },
    {
      id: '2',
      title: i18n.language.startsWith('uk') ? 'F1 2026: Нові правила' : i18n.language.startsWith('de') ? 'F1 2026: Neue Regeln erklärt' : 'F1 2026: New Regulations Explained',
      category: t('nav.racing'),
      image: 'https://images.unsplash.com/photo-1530681954419-7979fa474556?auto=format&fit=crop&q=80&w=2070',
      excerpt: i18n.language.startsWith('uk') ? 'Все, що вам потрібно знати про радикальні зміни у Формулі-1.' : i18n.language.startsWith('de') ? 'Alles, was Sie über die radikalen Änderungen in der Formel 1 wissen müssen.' : 'Everything you need to know about the radical changes coming to Formula 1, from active aerodynamics to sustainable fuels.',
      date: 'March 28, 2026',
      author: 'Elena Rossi'
    }
  ], [i18n.language, t]);

  // Save mock articles to localStorage for search functionality
  useEffect(() => {
    localStorage.setItem('mockArticles', JSON.stringify(MOCK_ARTICLES));
  }, [MOCK_ARTICLES]);

  // Sort articles by date (newest first)
  const sortedArticles = useMemo(() => {
    return [...MOCK_ARTICLES].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA; // newest first
    });
  }, [MOCK_ARTICLES]);

  const handleOpenArticle = (article: Article) => {
    setSelectedArticle(article);
    setView('article');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <HelmetProvider>
      <div className="min-h-screen selection:bg-racing-red selection:text-white">
        <SEO />
        <CustomCursor />
        <CookieConsent />
        
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Navbar onArticleClick={handleOpenArticle} />
              <main>
                <Hero onReadMore={() => {
                  const journalSection = document.getElementById('journal');
                  if (journalSection) {
                    journalSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }} />
                <BrandMarquee />
                
                <section className="py-24 bg-racing-black" id="journal">
                  <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                      <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                      >
                        <span className="text-racing-red text-sm font-bold uppercase tracking-[0.3em] mb-4 block">
                          {t('journal.latest')}
                        </span>
                        <h2 className="text-5xl md:text-7xl font-bold uppercase italic">
                          {t('race.title1', { defaultValue: 'The' })} <span className="text-stroke">{t('journal.title')}</span>
                        </h2>
                      </motion.div>
                      <motion.button
                        onClick={() => handleOpenArticle(sortedArticles[0])}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group btn-racing btn-racing-outline flex items-center gap-4"
                      >
                        <span className="relative z-10">{t('journal.exploreAll')}</span>
                        <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                      {sortedArticles.map((article, idx) => (
                        <div key={article.id} onClick={() => handleOpenArticle(article)}>
                          <ArticleCard article={article} index={idx} />
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <RaceSection />

                {/* Garage Section - Placeholder */}
                <section id="garage" className="py-24 bg-racing-black">
                  <div className="container mx-auto px-6">
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      <span className="text-racing-red text-sm font-bold uppercase tracking-[0.3em] mb-4 block">
                        {t('nav.garage', { defaultValue: 'Garage' })}
                      </span>
                      <h2 className="text-5xl md:text-7xl font-bold uppercase italic mb-8">
                        {t('garage.title', { defaultValue: 'Coming Soon' })}
                      </h2>
                      <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        {t('garage.description', { defaultValue: 'Exclusive car reviews, technical deep-dives, and garage tours.' })}
                      </p>
                    </motion.div>
                  </div>
                </section>

                {/* Shop Section - Placeholder */}
                <section id="shop" className="py-24 bg-gradient-to-b from-racing-black to-black">
                  <div className="container mx-auto px-6">
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      <span className="text-racing-red text-sm font-bold uppercase tracking-[0.3em] mb-4 block">
                        {t('nav.shop', { defaultValue: 'Shop' })}
                      </span>
                      <h2 className="text-3xl md:text-7xl font-bold uppercase italic mb-8 break-words">
                        {t('shop.title', { defaultValue: 'Merchandise' })}
                      </h2>
                      <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        {t('shop.description', { defaultValue: 'Premium apparel and accessories for automotive enthusiasts.' })}
                      </p>
                    </motion.div>
                  </div>
                </section>

                {/* About Section - Placeholder */}
                <section id="about" className="py-24 bg-black">
                  <div className="container mx-auto px-6">
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      className="max-w-4xl mx-auto"
                    >
                      <span className="text-racing-red text-sm font-bold uppercase tracking-[0.3em] mb-4 block">
                        {t('nav.about', { defaultValue: 'About' })}
                      </span>
                      <h2 className="text-5xl md:text-7xl font-bold uppercase italic mb-8">
                        {t('about.title', { defaultValue: 'About APEX' })}
                      </h2>
                      <p className="text-xl text-gray-400 leading-relaxed mb-6">
                        {t('about.description1', { defaultValue: 'APEX Magazine is the ultimate destination for automotive enthusiasts who demand more than surface-level content.' })}
                      </p>
                      <p className="text-xl text-gray-400 leading-relaxed">
                        {t('about.description2', { defaultValue: 'We dive deep into the engineering, design, and culture that makes the automotive world extraordinary.' })}
                      </p>
                    </motion.div>
                  </div>
                </section>

                {/* Newsletter Section */}
                <section className="py-32 relative overflow-hidden">
                  <div className="absolute inset-0 z-0">
                    <img 
                      src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=2070" 
                      alt="Racing Track"
                      className="w-full h-full object-cover opacity-20 grayscale"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      className="max-w-3xl mx-auto"
                    >
                      <h2 className="text-4xl md:text-6xl font-bold uppercase italic mb-8">
                        {t('newsletter.title')} <span className="text-racing-red">{t('newsletter.accent')}</span>
                      </h2>
                      <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                        {t('newsletter.description')}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto items-stretch">
                        <input 
                          type="email" 
                          placeholder={t('newsletter.placeholder')}
                          className="flex-1 bg-white/10 border border-white/20 px-6 py-4 focus:outline-none focus:border-racing-red transition-colors font-medium text-white placeholder:text-gray-500"
                        />
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="group btn-racing btn-racing-primary flex items-center justify-center gap-4"
                        >
                          <span className="relative z-10">{t('newsletter.subscribe')}</span>
                          <div className="btn-racing-fill" />
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>
                </section>
              </main>
              <Footer onLegalClick={() => setView('legal')} onAdminClick={() => setView('admin')} />
            </motion.div>
          )}

          {view === 'article' && selectedArticle && (
            <ArticlePage 
              key="article"
              article={selectedArticle} 
              onBack={() => setView('home')} 
            />
          )}

          {view === 'legal' && (
            <motion.div
              key="legal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="pt-20">
                <button 
                  onClick={() => setView('home')}
                  className="fixed top-24 left-8 z-50 btn-racing btn-racing-outline flex items-center gap-2"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  <span>Back</span>
                </button>
                <LegalPages />
              </div>
            </motion.div>
          )}

          {view === 'admin' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="pt-32 pb-20 px-6"
            >
              <button 
                onClick={() => setView('home')}
                className="fixed top-24 left-8 z-50 btn-racing btn-racing-outline flex items-center gap-2"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                <span>Back</span>
              </button>
              <ArticleForm />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </HelmetProvider>
  );
}
