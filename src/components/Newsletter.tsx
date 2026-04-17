import { motion } from 'motion/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { db } from '../lib/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function Newsletter() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setMessage(t('newsletter.invalidEmail', { defaultValue: 'Please enter a valid email address' }));
      return;
    }

    setStatus('loading');

    try {
      // Check if email already exists
      const subscribersRef = collection(db, 'subscribers');
      const q = query(subscribersRef, where('email', '==', email.toLowerCase()));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        setStatus('error');
        setMessage(t('newsletter.alreadySubscribed', { defaultValue: 'This email is already subscribed' }));
        return;
      }

      // Add subscriber to Firestore
      await addDoc(subscribersRef, {
        email: email.toLowerCase(),
        subscribedAt: new Date(),
        status: 'pending', // pending until they connect Telegram
        telegramChatId: null,
        source: 'website'
      });

      setStatus('success');
      setMessage(
        t('newsletter.successMessage', {
          defaultValue: 'Success! Check your email for Telegram bot link to complete subscription.'
        })
      );
      setEmail('');

      // Send welcome email with Telegram bot link (you'll need to implement this)
      // For now, we'll just show success message

      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);

    } catch (error) {
      console.error('Subscription error:', error);
      setStatus('error');
      setMessage(t('newsletter.errorMessage', { defaultValue: 'Something went wrong. Please try again.' }));
    }
  };

  return (
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

          <form onSubmit={handleSubscribe} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 items-stretch">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('newsletter.placeholder')}
                disabled={status === 'loading'}
                className="flex-1 bg-white/10 border border-white/20 px-6 py-4 focus:outline-none focus:border-racing-red transition-colors font-medium text-white placeholder:text-gray-500 disabled:opacity-50"
              />
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                className="group btn-racing btn-racing-primary flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10">
                  {status === 'loading' ? t('newsletter.subscribing', { defaultValue: 'Subscribing...' }) : t('newsletter.subscribe')}
                </span>
                <Send className="relative z-10 w-4 h-4" />
                <div className="btn-racing-fill" />
              </motion.button>
            </div>

            {/* Status Messages */}
            {status !== 'idle' && status !== 'loading' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-6 p-4 rounded-lg flex items-center gap-3 ${
                  status === 'success'
                    ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                    : 'bg-red-500/10 border border-red-500/20 text-red-400'
                }`}
              >
                {status === 'success' ? (
                  <CheckCircle className="w-5 h-5 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 shrink-0" />
                )}
                <p className="text-sm font-medium">{message}</p>
              </motion.div>
            )}
          </form>

          {/* Telegram Bot Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 p-6 bg-white/5 border border-white/10 rounded-xl"
          >
            <p className="text-sm text-gray-400 mb-4">
              {t('newsletter.telegramInfo', {
                defaultValue: 'Get instant notifications via Telegram! After subscribing, you\'ll receive a link to connect our bot.'
              })}
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.121.099.155.232.171.326.016.093.036.306.02.472z"/>
              </svg>
              <span>{t('newsletter.telegramSecure', { defaultValue: 'Secure & instant notifications' })}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
