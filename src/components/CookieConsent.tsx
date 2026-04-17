import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CookieConsentProps {
  onLegalClick?: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onLegalClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-8 left-8 right-8 md:left-auto md:right-8 md:w-[480px] z-[100]"
        >
          <div className="bg-racing-black/95 backdrop-blur-2xl border border-white/10 p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-racing-red/10 rounded-xl shrink-0">
                <Cookie className="w-6 h-6 text-racing-red" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-black uppercase tracking-widest text-white mb-3">
                  {t('cookies.title', { defaultValue: 'Cookie Notice' })}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-3">
                  {t('cookies.intro', { defaultValue: 'We use cookies to improve your experience.' })}
                </p>
                <p className="text-xs text-gray-400 leading-relaxed mb-2">
                  {t('cookies.essential', { defaultValue: 'Essential cookies are required for the website to function properly.' })}
                </p>
                <p className="text-xs text-gray-400 leading-relaxed mb-3">
                  {t('cookies.nonEssential', { defaultValue: 'Non-essential cookies (analytics, marketing) are used only with your consent.' })}
                </p>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">
                  {t('cookies.withdraw', { defaultValue: 'By clicking "Accept", you agree to the use of cookies. You can withdraw your consent at any time.' })}
                </p>
                <button
                  onClick={onLegalClick}
                  className="text-xs text-racing-red hover:underline mb-4 block"
                >
                  {t('cookies.privacyLink', { defaultValue: 'For more details, see our Privacy Policy.' })}
                </button>
                <div className="flex gap-3">
                  <button
                    onClick={handleAccept}
                    className="flex-1 bg-racing-red text-white text-[10px] font-black uppercase tracking-widest py-3 rounded-xl hover:bg-racing-red/80 transition-all flex items-center justify-center gap-2"
                  >
                    <Check className="w-3 h-3" />
                    {t('cookies.accept', { defaultValue: 'Accept' })}
                  </button>
                  <button
                    onClick={handleDecline}
                    className="flex-1 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest py-3 rounded-xl hover:bg-white/5 transition-all"
                  >
                    {t('cookies.decline', { defaultValue: 'Decline' })}
                  </button>
                  <button
                    onClick={handleDecline}
                    className="p-3 border border-white/10 rounded-xl hover:bg-white/5 transition-colors shrink-0"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;

