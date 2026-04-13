import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import React, { useRef } from 'react';

interface HeroProps {
  onReadMore?: () => void;
}

export default function Hero({ onReadMore }: HeroProps) {
  const { t, i18n } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const title1 = t('hero.title1');
  const title2 = t('hero.title2');
  const maxLength = Math.max(title1.length, title2.length);
  const isWideLang = ['uk', 'de'].includes(i18n.language);
  
  // Dynamic scaling: reduce font size if words are too long
  // Cyrillic and German words are often wider or have taller glyphs
  const baseScale = isWideLang ? 0.85 : 1;
  const fontScale = maxLength > 8 
    ? Math.max(0.3, baseScale - (maxLength - 8) * (isWideLang ? 0.06 : 0.04)) 
    : baseScale;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <section ref={containerRef} className="relative h-[85vh] md:h-screen w-full overflow-hidden flex items-center justify-center bg-racing-black">
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y, scale, opacity }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2070" 
          alt="Porsche 911"
          className="w-full h-full object-cover object-[center_30%] md:object-center brightness-[0.4] contrast-125"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-racing-black via-transparent to-racing-black/20 md:to-racing-black/40" />
      </motion.div>

      {/* Animated Speed Streaks */}
      <div className="absolute inset-0 z-1 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: '200%', opacity: [0, 0.5, 0] }}
            transition={{ 
              duration: 1.5 + Math.random(), 
              repeat: Infinity, 
              delay: Math.random() * 2,
              ease: "linear"
            }}
            className="absolute h-[1px] bg-gradient-to-r from-transparent via-racing-red to-transparent w-full"
            style={{ top: `${20 + i * 15}%` }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-24 md:pt-40">
        <div className="max-w-5xl">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 mb-8 md:mb-12"
            >
              <span className="w-12 h-[2px] bg-racing-red" />
              <span className="text-racing-red text-[10px] md:text-xs font-bold uppercase tracking-[0.4em]">
                {t('hero.volume')}
              </span>
            </motion.div>

            <h2 
              className="text-fluid-hero font-black leading-[0.95] md:leading-[1] mb-12 md:mb-16 uppercase italic tracking-tighter [hyphens:auto] [overflow-wrap:anywhere]"
              style={{ '--font-scale': fontScale } as React.CSSProperties}
            >
              <span className="block">{title1}</span>
              <span className="block text-stroke">{title2}</span>
            </h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 md:mt-16"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-end">
                <div className="lg:col-span-2">
                  <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl leading-relaxed border-l border-racing-red pl-6 font-medium italic [hyphens:auto]">
                    {t('hero.description')}
                  </p>
                </div>
                
              <div className="flex justify-start lg:justify-end">
                <motion.button
                  onClick={onReadMore}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group btn-racing btn-racing-primary flex items-center gap-6 flex-shrink-0"
                >
                  <span className="relative z-10 whitespace-nowrap">{t('hero.explore')}</span>
                  <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-all duration-300" />
                  <div className="btn-racing-fill" />
                </motion.button>
              </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 hidden xl:flex flex-col gap-20 items-center">
        <div className="writing-vertical text-[10px] uppercase tracking-[0.5em] text-gray-500 font-bold">
          Aerodynamics / Performance / Heritage
        </div>
        <div className="w-[1px] h-32 bg-gradient-to-b from-racing-red to-transparent" />
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-2 bg-racing-red rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
