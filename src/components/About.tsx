import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Award, Users, Target, TrendingUp } from 'lucide-react';

export default function About() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Award,
      title: t('about.features.technical.title'),
      description: t('about.features.technical.description')
    },
    {
      icon: Users,
      title: t('about.features.interviews.title'),
      description: t('about.features.interviews.description')
    },
    {
      icon: Target,
      title: t('about.features.business.title'),
      description: t('about.features.business.description')
    },
    {
      icon: TrendingUp,
      title: t('about.features.culture.title'),
      description: t('about.features.culture.description')
    }
  ];

  const readers = [
    t('about.readers.engineers'),
    t('about.readers.collectors'),
    t('about.readers.professionals'),
    t('about.readers.enthusiasts')
  ];

  return (
    <section id="about" className="py-32 bg-zinc-950 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 4px)',
          transform: 'rotate(-45deg) scale(2)'
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <span className="text-racing-red text-sm font-bold uppercase tracking-[0.3em] mb-4 block">
            {t('about.label')}
          </span>
          <h2 className="text-fluid-h2 font-bold uppercase italic mb-8">
            {t('about.title')} <span className="text-racing-red">{t('about.titleAccent')}</span>
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed mb-6">
            {t('about.intro')}
          </p>
          <p className="text-lg text-gray-400 leading-relaxed">
            {t('about.mission')}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-8 group hover:border-racing-red transition-all duration-500"
            >
              <div className="p-4 bg-racing-red/10 rounded-xl inline-block mb-6 group-hover:bg-racing-red group-hover:scale-110 transition-all duration-500">
                <feature.icon className="w-6 h-6 text-racing-red group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold uppercase mb-3 group-hover:text-racing-red transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Why APEX Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="glass-card p-12">
            <h3 className="text-3xl font-bold uppercase italic mb-6 text-center">
              {t('about.why.title')} <span className="text-racing-red">{t('about.why.titleAccent')}</span>
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed text-center">
              {t('about.why.description')}
            </p>
          </div>
        </motion.div>

        {/* Our Readers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold uppercase italic mb-8 text-center">
            {t('about.readers.title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {readers.map((reader, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-lg hover:border-racing-red transition-colors group"
              >
                <div className="w-2 h-2 bg-racing-red rounded-full group-hover:scale-150 transition-transform" />
                <p className="text-gray-300 font-medium">{reader}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-5xl mx-auto"
        >
          {[
            { value: '2024', label: t('about.stats.founded') },
            { value: '100+', label: t('about.stats.articles') },
            { value: '50K+', label: t('about.stats.readers') },
            { value: '15+', label: t('about.stats.countries') }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-black text-racing-red mb-2 italic">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
