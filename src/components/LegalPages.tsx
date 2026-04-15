import React from 'react';
import { useTranslation } from 'react-i18next';

const LegalPages: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-racing-black text-white min-h-screen pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-4xl space-y-20">
        {/* GDPR Section */}
        <section id="gdpr" className="space-y-8">
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter border-l-4 border-racing-red pl-6">
            GDPR / Privacy Policy
          </h1>
          <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
            <p>Last updated: April 13, 2026</p>
            <p>
              At APEX Magazine, we take your privacy seriously. This policy explains how we collect, use, and protect your personal data in compliance with the General Data Protection Regulation (GDPR).
            </p>
            <h2 className="text-white font-bold text-xl mt-8">1. Data Collection</h2>
            <p>We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us. This may include your name, email address, and IP address.</p>
            
            <h2 className="text-white font-bold text-xl mt-8">2. Use of Data</h2>
            <p>We use your data to provide our services, personalize your experience, and communicate with you about updates and promotions.</p>
            
            <h2 className="text-white font-bold text-xl mt-8">3. Your Rights</h2>
            <p>Under GDPR, you have the right to access, rectify, or erase your personal data. You can also object to processing and request data portability.</p>
          </div>
        </section>

        {/* Impressum Section */}
        <section id="impressum" className="space-y-8">
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter border-l-4 border-racing-red pl-6">
            Impressum / Legal Notice
          </h1>
          <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
            <p>Information according to § 5 TMG:</p>
            <div className="space-y-2">
              <p className="font-bold text-white">APEX Media Group GmbH</p>
              <p>Nürburgring Boulevard 1</p>
              <p>53520 Nürburg, Germany</p>
            </div>
            
            <h2 className="text-white font-bold text-xl mt-8">Represented by:</h2>
            <p>Max Verstappen, CEO</p>
            
            <h2 className="text-white font-bold text-xl mt-8">Contact:</h2>
            <p>Email: legal@apex-magazine.com</p>
            <p>Phone: +49 (0) 2691 302-0</p>
            
            <h2 className="text-white font-bold text-xl mt-8">Register Entry:</h2>
            <p>Entry in the Handelsregister.</p>
            <p>Registering court: Amtsgericht Koblenz</p>
            <p>Registration number: HRB 12345</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LegalPages;
