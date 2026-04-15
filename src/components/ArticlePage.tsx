import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowLeft, Share2, Bookmark, Clock, Gauge, Wind, Zap } from 'lucide-react';
import React, { useRef } from 'react';
import { Article } from '../types';
import { useTranslation } from 'react-i18next';

interface ArticlePageProps {
  article: Article;
  onBack: () => void;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ article, onBack }) => {
  const { t, i18n } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'power': return <Gauge className="w-6 h-6 text-racing-red" />;
      case 'speed': return <Zap className="w-6 h-6 text-racing-red" />;
      case 'wind': return <Wind className="w-6 h-6 text-racing-red" />;
      default: return <Gauge className="w-6 h-6 text-racing-red" />;
    }
  };

  const getStatLabel = (label: string) => {
    const lowerLabel = label.toLowerCase();
    if (lowerLabel.includes('power')) return t('article.power');
    if (lowerLabel.includes('speed')) return t('article.topSpeed');
    if (lowerLabel.includes('0-100')) return t('article.speed');
    if (lowerLabel.includes('downforce')) return t('article.downforce');
    if (lowerLabel.includes('engine')) return t('article.engine');
    if (lowerLabel.includes('weight')) return t('article.weight');
    return label;
  };

  const fullTitle = article.fullTitle || article.title;
  const isWideLang = ['uk', 'de'].includes(i18n.language);
  const baseScale = isWideLang ? 0.85 : 1;
  const titleScale = fullTitle.length > 12 
    ? Math.max(0.3, baseScale - (fullTitle.length - 12) * (isWideLang ? 0.05 : 0.03)) 
    : baseScale;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-racing-black min-h-screen text-white selection:bg-racing-red"
      ref={containerRef}
    >
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-racing-red z-60 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-6 py-4 md:py-6 mix-blend-difference">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest hover:text-racing-red transition-colors"
        >
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-2 transition-transform" />
          <span className="hidden sm:inline">{t('article.back')}</span>
          <span className="sm:hidden">{t('article.backShort')}</span>
        </button>
        <div className="flex gap-2 md:gap-4">
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Bookmark className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Share2 className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="relative h-[70vh] md:h-[120vh] w-full overflow-hidden flex items-center md:items-end pb-12 md:pb-24">
        <motion.div 
          style={{ opacity, scale }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={article.heroImage || article.image} 
            alt={article.title}
            className="w-full h-full object-cover object-[center_30%] md:object-center brightness-[0.6]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-t from-racing-black via-transparent to-racing-black/20 md:to-racing-black/40" />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10 pt-24 md:pt-48">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-5xl"
          >
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <span className="w-12 h-px bg-racing-red" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-racing-red">
                {article.category}
              </span>
            </div>
            <h1 
              className="text-fluid-hero font-bold uppercase italic leading-[0.95] md:leading-none mb-8 md:mb-12 tracking-tighter [hyphens:auto] wrap-anywhere"
              style={{ '--font-scale': titleScale } as React.CSSProperties}
            >
              {fullTitle}
            </h1>
            <p className="text-lg md:text-3xl text-gray-300 font-medium max-w-3xl leading-relaxed italic border-l-2 border-racing-red pl-6 md:pl-10 [hyphens:auto] wrap-anywhere">
              {article.subtitle || article.excerpt}
            </p>
          </motion.div>
        </div>
      </header>

      {/* Article Content */}
      <article className="container mx-auto px-6 py-16 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Sidebar Info */}
          <aside className="lg:col-span-4 order-2 lg:order-1">
            <div className="lg:sticky lg:top-32 space-y-12 md:space-y-16">
              {article.stats && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8 md:gap-10">
                  {article.stats.map((stat, idx) => (
                    <div key={idx} className="flex items-center gap-6 group">
                      <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-racing-red/10 transition-colors">
                        {getIcon(stat.icon)}
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-black mb-1">{getStatLabel(stat.label)}</p>
                        <p className="text-xl md:text-2xl font-bold italic">{stat.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="p-8 md:p-10 glass-card relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-racing-red/5 blur-3xl -translate-y-1/2 translate-x-1/2" />
                <h4 className="text-sm font-black uppercase tracking-[0.3em] mb-6 text-racing-red">{t('article.authorNote')}</h4>
                <p className="text-base text-gray-400 leading-relaxed italic mb-8">
                  "Driving the {article.title} isn't just about speed; it's about a dialogue with physics. Every vibration tells a story of mechanical perfection."
                </p>
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-racing-red to-racing-black border border-white/10" />
                  <div>
                    <p className="text-sm font-black uppercase tracking-wider">{article.author}</p>
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{t('article.expert')}</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Text */}
          <div className="lg:col-span-8 order-1 lg:order-2 space-y-12 md:space-y-20">
            <div className="prose prose-invert prose-lg md:prose-2xl max-w-none">
              {article.content && (
                <>
                  <p className="text-xl md:text-4xl font-light leading-[1.6] text-gray-200 first-letter:text-7xl md:first-letter:text-9xl first-letter:font-black first-letter:text-racing-red first-letter:mr-4 first-letter:float-left first-letter:leading-[0.8]">
                    {article.content.intro}
                  </p>
                  
                  {article.content.sections.map((section, idx) => (
                    <React.Fragment key={idx}>
                      <h2 className="text-3xl md:text-6xl font-black uppercase italic mt-16 md:mt-24 mb-8 md:mb-12 tracking-tight">
                        {section.title.split(' ').map((word, i) => i === section.title.split(' ').length - 1 ? <span key={i} className="text-racing-red">{word}</span> : word + ' ')}
                      </h2>
                      
                      <p className="text-gray-400 leading-relaxed mb-8 md:mb-12 font-medium [hyphens:auto]">
                        {section.text}
                      </p>

                      {section.image && (
                        <div className="my-16 md:my-24 aspect-video overflow-hidden rounded-sm relative group">
                          <img 
                            src={section.image} 
                            alt={section.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-racing-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      )}
                    </React.Fragment>
                  ))}

                  {article.content.quote && (
                    <blockquote className="border-l-8 border-racing-red pl-8 md:pl-12 my-16 md:my-24 italic relative">
                      <span className="absolute -top-10 -left-4 text-9xl text-racing-red/10 font-black leading-none">"</span>
                      <p className="text-2xl md:text-5xl font-bold text-white mb-4 leading-tight">
                        {article.content.quote}
                      </p>
                    </blockquote>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* Footer Article Navigation */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="group cursor-pointer">
              <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 font-bold">{t('article.nextStory')}</p>
              <h3 className="text-3xl font-bold uppercase italic group-hover:text-racing-red transition-colors">The Evolution of Le Mans</h3>
            </div>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-4 border border-white/10 rounded-full hover:bg-racing-red hover:border-racing-red transition-all"
            >
              <Clock className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ArticlePage;
