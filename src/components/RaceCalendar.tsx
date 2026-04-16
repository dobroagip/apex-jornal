import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, MapPin, Clock, Trophy } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface Race {
  round: number;
  raceName: string;
  circuit: {
    circuitName: string;
    location: {
      locality: string;
      country: string;
    };
  };
  date: string;
  time?: string;
  winner?: string;
  status?: string;
}

interface RaceCalendarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RaceCalendar({ isOpen, onClose }: RaceCalendarProps) {
  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFetch, setLastFetch] = useState<number>(0);
  const { t } = useTranslation();

  useEffect(() => {
    const now = Date.now();
    const cacheTime = 30 * 60 * 1000; // 30 minutes cache

    // Only fetch if calendar is open AND (no data OR cache expired)
    if (isOpen && (races.length === 0 || now - lastFetch > cacheTime)) {
      fetchRaces();
    }

    // Auto-refresh every 30 minutes when calendar is open (to stay within free tier limits)
    let refreshInterval: NodeJS.Timeout | null = null;
    if (isOpen) {
      refreshInterval = setInterval(() => {
        fetchRaces();
      }, 30 * 60 * 1000); // 30 minutes
    }

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [isOpen]);

  const fetchRaces = async () => {
    setLoading(true);
    setError(null);

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
        throw new Error(`Failed to fetch races: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data); // Debug log

      // Convert object with date keys to array of races
      let raceData: Race[] = [];
      let raceIndex = 0;

      if (typeof data === 'object' && data !== null) {
        // If data is an object with date keys (like 20260305: Array(1))
        Object.keys(data).forEach(dateKey => {
          const racesOnDate = data[dateKey];
          if (Array.isArray(racesOnDate) && racesOnDate.length > 0) {
            racesOnDate.forEach(race => {
              raceIndex++;

              // Extract location from circuit name (e.g., "Melbourne Grand Prix Circuit" -> "Melbourne")
              const circuitName = race.crct || race.circuit || 'Unknown Circuit';
              const locality = circuitName.split(' ')[0]; // First word is usually the city

              raceData.push({
                round: raceIndex,
                raceName: race.gPrx || race.name || race.title || `Race ${raceIndex}`,
                circuit: {
                  circuitName: circuitName,
                  location: {
                    locality: locality,
                    country: 'Formula 1'
                  }
                },
                date: race.startDate ? race.startDate.split('T')[0] : (dateKey.slice(0, 4) + '-' + dateKey.slice(4, 6) + '-' + dateKey.slice(6, 8)),
                time: race.startDate ? race.startDate.split('T')[1] : undefined,
                winner: race.winner,
                status: race.isPostponedOrCanceled ? 'canceled' : (race.status?.state || (race.completed ? 'post' : 'pre'))
              });
            });
          }
        });
      }

      // Sort by date
      raceData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      console.log('Processed races:', raceData.length, raceData[0]); // Log processed data

      if (raceData.length === 0) {
        console.warn('No races found in response:', data);
      }

      setRaces(raceData);
      setLastFetch(Date.now()); // Update last fetch timestamp
    } catch (err) {
      console.error('Error fetching races:', err);
      setError('Failed to load race calendar. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getRaceStatus = (race: Race) => {
    // Check if race is canceled
    if (race.status === 'canceled') {
      return { status: 'canceled', color: 'text-orange-500' };
    }

    // Use API status if available
    if (race.status === 'post' || race.status === 'finished') {
      return { status: 'finished', color: 'text-gray-500' };
    }

    const raceDate = new Date(race.date);
    const now = new Date();

    if (raceDate < now) {
      return { status: 'finished', color: 'text-gray-500' };
    } else if (raceDate.toDateString() === now.toDateString()) {
      return { status: 'live', color: 'text-racing-red' };
    } else {
      return { status: 'upcoming', color: 'text-green-500' };
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-racing-black border border-white/10 rounded-2xl z-[101] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 md:p-8 border-b border-white/10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold uppercase italic mb-2">
                  {t('race.title', { defaultValue: 'Race Calendar' })} <span className="text-racing-red">{new Date().getFullYear()}</span>
                </h2>
                <p className="text-sm text-gray-400">
                  {t('race.subtitle', { defaultValue: 'Full F1 Season Schedule' })}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-3 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <div className="inline-block w-12 h-12 border-4 border-racing-red border-t-transparent rounded-full animate-spin mb-4" />
                    <p className="text-gray-400">{t('race.loading', { defaultValue: 'Loading calendar...' })}</p>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <p className="text-red-500 mb-4">{error}</p>
                    <button
                      onClick={fetchRaces}
                      className="px-6 py-3 bg-racing-red hover:bg-racing-red/80 transition-colors rounded-lg font-bold uppercase text-sm"
                    >
                      {t('race.retry', { defaultValue: 'Retry' })}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {races.map((race, index) => {
                    const { status, color } = getRaceStatus(race);

                    return (
                      <motion.div
                        key={`${race.date}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all group"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                            Round {race.round}
                          </span>
                          <span className={`text-xs font-bold uppercase tracking-wider ${color}`}>
                            {t(`race.status.${status}`, { defaultValue: status })}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold uppercase mb-3 group-hover:text-racing-red transition-colors">
                          {race.raceName}
                        </h3>

                        <div className="space-y-2 text-sm text-gray-400">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-racing-red shrink-0" />
                            <span className="truncate">
                              {race.circuit.location.locality}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-racing-red shrink-0" />
                            <span>{formatDate(race.date)}</span>
                          </div>

                          {race.time && (
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-racing-red shrink-0" />
                              <span>{race.time.replace('Z', ' UTC')}</span>
                            </div>
                          )}

                          {race.winner && status === 'finished' && (
                            <div className="flex items-center gap-2">
                              <Trophy className="w-4 h-4 text-yellow-500 shrink-0" />
                              <span className="text-white font-bold">{race.winner}</span>
                            </div>
                          )}
                        </div>

                        <div className="mt-4 pt-4 border-t border-white/10">
                          <p className="text-xs text-gray-500 truncate">
                            {race.circuit.circuitName}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
