import { motion } from 'motion/react';
import { Race } from '../types';
import { Calendar, MapPin, Trophy, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import RaceCalendar from './RaceCalendar';

interface ApiRace {
  gPrx: string;
  crct: string;
  startDate: string;
  winner?: string;
  completed: boolean;
  isPostponedOrCanceled: boolean;
  status?: {
    state: string;
    detail: string;
  };
}

export default function RaceSection() {
  const { t } = useTranslation();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastFetch, setLastFetch] = useState<number>(0);

  useEffect(() => {
    const now = Date.now();
    const cacheTime = 30 * 60 * 1000; // 30 minutes cache

    // Only fetch if no data OR cache expired
    if (races.length === 0 || now - lastFetch > cacheTime) {
      fetchRaces();
    }
  }, []);

  const fetchRaces = async () => {
    try {
      const apiKey = import.meta.env.VITE_F1_API_KEY;
      const apiHost = import.meta.env.VITE_F1_API_HOST || 'f1-motorsport-data.p.rapidapi.com';

      if (!apiKey) {
        throw new Error('F1 API key is not configured');
      }
      const currentYear = new Date().getFullYear();

      const response = await fetch(`https://f1-motorsport-data.p.rapidapi.com/schedule?year=${currentYear}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-host': apiHost,
          'x-rapidapi-key': apiKey
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch races');
      }

      const data = await response.json();

      // Convert to array and sort by date
      const allRaces: Race[] = [];
      Object.keys(data).forEach(dateKey => {
        const racesOnDate = data[dateKey];
        if (Array.isArray(racesOnDate) && racesOnDate.length > 0) {
          racesOnDate.forEach((race: ApiRace) => {
            const circuitName = race.crct || 'Unknown Circuit';
            const locality = circuitName.split(' ')[0];

            allRaces.push({
              id: dateKey,
              name: race.gPrx || 'Unknown Race',
              location: locality,
              date: new Date(race.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              status: race.isPostponedOrCanceled ? 'canceled' : (race.completed || race.status?.state === 'post' ? 'finished' : 'upcoming'),
              circuit: circuitName,
              winner: race.winner
            });
          });
        }
      });

      // Sort by date
      allRaces.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      const now = new Date();

      // Find last finished race and next 2 upcoming races
      const finishedRaces = allRaces.filter(r => r.status === 'finished' && new Date(r.date) < now);
      const upcomingRaces = allRaces.filter(r => r.status === 'upcoming' && new Date(r.date) >= now);

      const selectedRaces = [
        ...finishedRaces.slice(-1), // Last finished race
        ...upcomingRaces.slice(0, 2)  // Next 2 upcoming races
      ];

      setRaces(selectedRaces);
      setLastFetch(Date.now()); // Update last fetch timestamp
    } catch (error) {
      console.error('Error fetching races:', error);
      // Fallback to mock data on error
      setRaces([
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
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section id="racing" className="py-24 bg-zinc-950">
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
              onClick={() => setIsCalendarOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group btn-racing btn-racing-outline flex items-center gap-4 relative z-10"
            >
            <span className="relative z-10">{t('race.viewCalendar')}</span>
            <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {loading ? (
            <div className="col-span-full flex justify-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-racing-red border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            races.map((race, idx) => (
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
                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 border ${
                    race.status === 'finished' ? 'border-gray-500 text-gray-500' :
                    race.status === 'canceled' ? 'border-orange-500 text-orange-500' :
                    'border-racing-red text-racing-red'
                  }`}>
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
                  {race.winner && race.status === 'finished' && (
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-1 font-black">Winner</p>
                      <p className="text-sm font-bold text-yellow-500 flex items-center gap-2">
                        <Trophy className="w-4 h-4" />
                        {race.winner}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>

    <RaceCalendar isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
  </>
  );
}
