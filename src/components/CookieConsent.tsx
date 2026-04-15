import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X, Check } from 'lucide-react';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-8 left-8 right-8 md:left-auto md:right-8 md:w-96 z-100"
        >
          <div className="bg-racing-black/90 backdrop-blur-2xl border border-white/10 p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-racing-red/10 rounded-2xl">
                <Cookie className="w-6 h-6 text-racing-red" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-black uppercase tracking-widest text-white mb-2">Cookie Consent</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">
                  We use cookies to enhance your experience, analyze site traffic, and serve high-performance content. By clicking "Accept", you agree to our use of cookies.
                </p>
                <div className="flex gap-3">
                  <button 
                    onClick={handleAccept}
                    className="flex-1 bg-white text-black text-[10px] font-black uppercase tracking-widest py-3 rounded-xl hover:bg-racing-red hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <Check className="w-3 h-3" />
                    Accept
                  </button>
                  <button 
                    onClick={() => setIsVisible(false)}
                    className="p-3 border border-white/10 rounded-xl hover:bg-white/5 transition-colors"
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
