import { motion } from 'motion/react';
import { Race } from '../types';
import { Calendar, MapPin, Trophy, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const MOCK_RACES: Race[] = [
  {
    id: '1',
    name: 'Monaco Grand Prix',
    location: 'Monte Carlo',
    date: 'May 25, 2026',
    status: 'upcoming',
    circuit: 'Circuit de Monaco'
  },
  {
    id: '2',
    name: '24 Hours of Le Mans',
    location: 'Le Mans, France',
    date: 'June 13, 2026',
    status: 'upcoming',
    circuit: 'Circuit de la Sarthe'
  },
  {
    id: '3',
    name: 'Nürburgring 24 Hours',
    location: 'Nürburg, Germany',
    date: 'May 30, 2026',
    status: 'upcoming',
    circuit: 'Nordschleife'
  }
];

export default function RaceSection() {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="text-racing-red text-sm font-bold uppercase tracking-[0.3em] mb-4 block">
              {t('race.timing')}
            </span>
            <h2 className="text-fluid-h2 font-bold uppercase italic">
              {t('race.title1', { defaultValue: 'The' })} <span className="text-stroke">{t('race.grid')}</span>
            </h2>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group btn-racing btn-racing-outline flex items-center gap-4"
          >
            <span className="relative z-10">{t('race.viewCalendar')}</span>
            <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {MOCK_RACES.map((race, idx) => (
            <motion.div
              key={race.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="glass-card p-8 md:p-10 group hover:border-racing-red transition-all duration-700 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-racing-red/5 blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-racing-red/10 transition-colors" />
              
              <div className="flex justify-between items-start mb-10">
                <div className="p-4 bg-racing-red/10 rounded-xl group-hover:bg-racing-red group-hover:text-white transition-all duration-500">
                  <Trophy className="w-6 h-6 text-racing-red group-hover:text-white transition-colors" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 border border-racing-red text-racing-red">
                  {t(`race.status.${race.status}`)}
                </span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold uppercase italic mb-8 group-hover:translate-x-2 transition-transform duration-500 leading-tight">
                {race.name}
              </h3>
              
              <div className="space-y-5">
                <div className="flex items-center gap-4 text-gray-400 text-xs md:text-sm font-medium">
                  <MapPin className="w-4 h-4 text-racing-red" />
                  <span className="truncate">{race.location}</span>
                </div>
                <div className="flex items-center gap-4 text-gray-400 text-xs md:text-sm font-medium">
                  <Calendar className="w-4 h-4 text-racing-red" />
                  <span className="whitespace-nowrap">{race.date}</span>
                </div>
              </div>

              <div className="mt-10 pt-10 border-t border-white/5">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-2 font-black">{t('race.circuit')}</p>
                <p className="text-sm md:text-base font-bold italic group-hover:text-racing-red transition-colors">{race.circuit}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
