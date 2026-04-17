import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LegalPages: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // Update page title and meta description for SEO
    document.title = 'Legal Information - APEX Magazine';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Privacy Policy, Impressum, and Terms of Service for APEX Magazine - Automotive Culture & High-Performance Engineering');
    }

    // Cleanup on unmount
    return () => {
      document.title = 'APEX Magazine - Automotive Culture & High-Performance Engineering';
      if (metaDescription) {
        metaDescription.setAttribute('content', 'The definitive source for automotive culture, high-performance engineering, and the pursuit of speed.');
      }
    };
  }, []);

  return (
    <div className="bg-racing-black text-white min-h-screen pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-4xl space-y-20">
        {/* GDPR Section */}
        <section id="gdpr" className="space-y-8">
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter border-l-4 border-racing-red pl-6">
            {t('legal.gdpr.title')}
          </h1>
          <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
            <p>{t('legal.gdpr.updated')}</p>
            <p>{t('legal.gdpr.intro')}</p>

            <h2 className="text-white font-bold text-xl mt-8">{t('legal.gdpr.section1.title')}</h2>
            <p>{t('legal.gdpr.section1.content')}</p>

            <h2 className="text-white font-bold text-xl mt-8">{t('legal.gdpr.section2.title')}</h2>
            <p>{t('legal.gdpr.section2.content')}</p>

            <h2 className="text-white font-bold text-xl mt-8">{t('legal.gdpr.section3.title')}</h2>
            <p>{t('legal.gdpr.section3.content')}</p>
          </div>
        </section>

        {/* Impressum Section */}
        <section id="impressum" className="space-y-8">
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter border-l-4 border-racing-red pl-6">
            {t('legal.impressum.title')}
          </h1>
          <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
            <p>{t('legal.impressum.tmg')}</p>
            <div className="space-y-2">
              <p className="font-bold text-white">{t('legal.impressum.company')}</p>
              <p>{t('legal.impressum.address1')}</p>
              <p>{t('legal.impressum.address2')}</p>
            </div>

            <h2 className="text-white font-bold text-xl mt-8">{t('legal.impressum.represented')}</h2>
            <p>{t('legal.impressum.ceo')}</p>

            <h2 className="text-white font-bold text-xl mt-8">{t('legal.impressum.contactTitle')}</h2>
            <p>{t('legal.impressum.email')}</p>
            <p>{t('legal.impressum.phone')}</p>

            <h2 className="text-white font-bold text-xl mt-8">{t('legal.impressum.registerTitle')}</h2>
            <p>{t('legal.impressum.registerEntry')}</p>
            <p>{t('legal.impressum.registerCourt')}</p>
            <p>{t('legal.impressum.registerNumber')}</p>
          </div>
        </section>

        {/* Terms of Service Section */}
        <section id="terms" className="space-y-8">
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter border-l-4 border-racing-red pl-6">
            {t('legal.terms.title')}
          </h1>
          <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
            <p>{t('legal.terms.updated')}</p>
            <p>{t('legal.terms.intro')}</p>

            <h2 className="text-white font-bold text-xl mt-8">{t('legal.terms.section1.title')}</h2>
            <p>{t('legal.terms.section1.content')}</p>

            <h2 className="text-white font-bold text-xl mt-8">{t('legal.terms.section2.title')}</h2>
            <p>{t('legal.terms.section2.content')}</p>

            <h2 className="text-white font-bold text-xl mt-8">{t('legal.terms.section3.title')}</h2>
            <p>{t('legal.terms.section3.content')}</p>

            <h2 className="text-white font-bold text-xl mt-8">{t('legal.terms.section4.title')}</h2>
            <p>{t('legal.terms.section4.content')}</p>

            <h2 className="text-white font-bold text-xl mt-8">{t('legal.terms.section5.title')}</h2>
            <p>{t('legal.terms.section5.content')}</p>

            <h2 className="text-white font-bold text-xl mt-8">{t('legal.terms.section6.title')}</h2>
            <p>{t('legal.terms.section6.content')}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LegalPages;

