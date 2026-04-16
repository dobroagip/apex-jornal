import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Menu, Search, User, X, Globe, ChevronDown, LogOut, Heart } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { auth, loginWithGoogle, logout, db } from '../lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { Article } from '../types';

interface NavbarProps {
  onArticleClick?: (article: Article) => void;
}

export default function Navbar({ onArticleClick }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();
  const { scrollY } = useScroll();
  
  const navBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(10, 10, 10, 0)', 'rgba(10, 10, 10, 0.8)']
  );
  
  const navBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(12px)']
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search functionality
  useEffect(() => {
    const searchArticles = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const articlesRef = collection(db, 'articles');
        const q = query(
          articlesRef,
          where('published', '==', true),
          orderBy('createdAt', 'desc'),
          limit(50)
        );

        const snapshot = await getDocs(q);
        let articles = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Article[];

        // If no articles in Firestore, search in localStorage mock data
        if (articles.length === 0) {
          const mockArticlesStr = localStorage.getItem('mockArticles');
          if (mockArticlesStr) {
            articles = JSON.parse(mockArticlesStr);
          }
        }

        // Client-side filtering by title, excerpt, category, author
        const searchLower = searchQuery.toLowerCase();
        const filtered = articles.filter(article => {
          const titleMatch = article.title?.toLowerCase().includes(searchLower);
          const excerptMatch = article.excerpt?.toLowerCase().includes(searchLower);
          const categoryMatch = article.category?.toLowerCase().includes(searchLower);
          const authorMatch = article.author?.toLowerCase().includes(searchLower);
          return titleMatch || excerptMatch || categoryMatch || authorMatch;
        });

        setSearchResults(filtered.slice(0, 5));
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(searchArticles, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const menuVariants = {
    closed: { x: -100, transition: { type: "spring" as const, stiffness: 300, damping: 30 } },
    open: { x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 30 } }
  };

  const navLinks = [
    { name: t('nav.magazine'), href: '#journal' },
    { name: t('nav.racing'), href: '#racing' },
    { name: t('nav.garage'), href: '#garage' },
    { name: t('nav.shop'), href: '#shop' },
    { name: t('nav.about'), href: '#about' }
  ];

  const languages = [
    { code: 'en', name: 'English', short: 'EN' },
    { code: 'uk', name: 'Українська', short: 'UA' },
    { code: 'de', name: 'Deutsch', short: 'DE' }
  ];

  const currentLang = languages.find(l => i18n.language.startsWith(l.code)) || languages[0];

  return (
    <>
      <motion.nav 
        style={{ 
          backgroundColor: typeof window !== 'undefined' && window.innerWidth < 768 ? 'rgba(10, 10, 10, 1)' : navBg, 
          backdropFilter: typeof window !== 'undefined' && window.innerWidth < 768 ? 'blur(12px)' : navBlur 
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-4 border-b border-white/0 transition-colors duration-300"
      >
        <div className="flex items-center gap-4 md:gap-12">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors group"
          >
            <Menu className="w-6 h-6 group-hover:text-racing-red transition-colors" />
          </button>
          <div className="hidden lg:flex gap-8 text-[11px] font-bold tracking-[0.2em] uppercase">
            {navLinks.slice(0, 3).map(link => (
              <a key={link.name} href={link.href} className="hover:text-racing-red transition-colors relative group">
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-racing-red transition-all group-hover:w-full" />
              </a>
            ))}
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 z-0">
          <a href="/" className="flex flex-col items-center gap-0">
            <img
              src="/logo_apex.jpeg"
              alt="APEX Magazine"
              className="h-8 md:h-10 w-auto object-contain"
            />
            <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase italic -mt-1">
              APEX<span className="text-racing-red">.</span>
            </span>
          </a>
        </div>

        <div className="flex items-center gap-2 md:gap-6 relative z-10">
          <div className="relative" ref={langRef}>
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 rounded-full transition-colors text-[10px] font-bold group"
            >
              <Globe className="w-4 h-4 text-gray-400 group-hover:text-racing-red transition-colors" />
              <span className="hidden sm:inline tracking-widest">{currentLang.short}</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-48 bg-racing-black/95 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)] z-100"
                >
                  <div className="py-3">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          i18n.changeLanguage(lang.code);
                          setIsLangOpen(false);
                        }}
                        className={`w-full text-left px-5 py-3 text-[11px] font-bold uppercase tracking-widest transition-all hover:bg-white/10 flex items-center justify-between ${
                          i18n.language.startsWith(lang.code) ? 'text-racing-red bg-white/5' : 'text-gray-400'
                        }`}
                      >
                        <span>{lang.name}</span>
                        {i18n.language.startsWith(lang.code) && (
                          <motion.div layoutId="activeLang" className="w-1.5 h-1.5 bg-racing-red rounded-full shadow-[0_0_8px_#E31837]" />
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-80 md:w-[480px] bg-racing-black/95 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)] z-100 max-h-[500px] flex flex-col"
                  >
                    <div className="p-4 border-b border-white/10">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t('nav.searchPlaceholder', { defaultValue: 'Search articles...' })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-racing-red transition-colors"
                        autoFocus
                      />
                    </div>

                    <div className="overflow-y-auto flex-1">
                      {isSearching ? (
                        <div className="p-8 text-center">
                          <div className="inline-block w-6 h-6 border-2 border-racing-red border-t-transparent rounded-full animate-spin" />
                          <p className="text-xs text-gray-500 mt-3">{t('nav.searching', { defaultValue: 'Searching...' })}</p>
                        </div>
                      ) : searchQuery.trim().length < 2 ? (
                        <div className="p-8 text-center">
                          <Search className="w-8 h-8 text-gray-600 mx-auto mb-3" />
                          <p className="text-xs text-gray-500">{t('nav.searchHint', { defaultValue: 'Type at least 2 characters to search' })}</p>
                        </div>
                      ) : searchResults.length === 0 ? (
                        <div className="p-8 text-center">
                          <p className="text-sm text-gray-400">{t('nav.noResults', { defaultValue: 'No articles found' })}</p>
                        </div>
                      ) : (
                        <div className="py-2">
                          {searchResults.map((article) => (
                            <button
                              key={article.id}
                              onClick={() => {
                                if (onArticleClick) {
                                  onArticleClick(article);
                                }
                                setIsSearchOpen(false);
                                setSearchQuery('');
                              }}
                              className="w-full text-left block px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                            >
                              <div className="flex gap-3">
                                {article.image && (
                                  <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-16 h-16 object-cover rounded-lg shrink-0"
                                    referrerPolicy="no-referrer"
                                  />
                                )}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[9px] font-bold uppercase tracking-wider text-racing-red">
                                      {article.category}
                                    </span>
                                  </div>
                                  <h4 className="text-sm font-bold text-white mb-1 line-clamp-1">
                                    {article.title}
                                  </h4>
                                  <p className="text-xs text-gray-400 line-clamp-2">
                                    {article.excerpt}
                                  </p>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative" ref={userRef}>
              <button 
                onClick={() => user ? setIsUserMenuOpen(!isUserMenuOpen) : loginWithGoogle()}
                className="p-2 hover:bg-white/10 rounded-full transition-colors group overflow-hidden"
              >
                {user?.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || 'User'} className="w-6 h-6 rounded-full object-cover" />
                ) : (
                  <User className="w-5 h-5 group-hover:text-racing-red transition-colors" />
                )}
              </button>

              <AnimatePresence>
                {isUserMenuOpen && user && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-64 bg-racing-black/95 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)] z-100"
                  >
                    <div className="p-5 border-b border-white/10">
                      <p className="text-[11px] font-black uppercase tracking-widest text-white truncate">{user.displayName}</p>
                      <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
                    </div>
                    <div className="py-2">
                      <button className="w-full text-left px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/10 flex items-center gap-3 transition-all">
                        <Heart className="w-4 h-4" />
                        <span>{t('nav.favorites', { defaultValue: 'Favorites' })}</span>
                      </button>
                      <button 
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-racing-red hover:bg-racing-red/10 flex items-center gap-3 transition-all"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{t('nav.logout', { defaultValue: 'Logout' })}</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-racing-black/80 backdrop-blur-md z-60"
            />
            <motion.div 
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-racing-black border-r border-white/10 z-70 p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-16">
                <a href="/" className="flex flex-col items-center gap-0">
                  <img
                    src="/logo_apex.jpeg"
                    alt="APEX Magazine"
                    className="h-8 w-auto object-contain"
                  />
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase italic -mt-1">
                    APEX<span className="text-racing-red">.</span>
                  </span>
                </a>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-10">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 + 0.3 }}
                    className="text-4xl md:text-5xl font-black uppercase italic hover:text-racing-red transition-all duration-300 relative group w-fit"
                  >
                    <span className="relative z-10">{link.name}</span>
                    <motion.span
                      className="absolute -bottom-1 left-0 w-0 h-1 bg-racing-red group-hover:w-full transition-all duration-500"
                    />
                  </motion.a>
                ))}
              </div>

              <div className="mt-auto pt-12 border-t border-white/10">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold mb-4">{t('nav.followUs')}</p>
                <div className="flex gap-6">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-sm font-bold uppercase hover:text-racing-red transition-colors">Instagram</a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-sm font-bold uppercase hover:text-racing-red transition-colors">Twitter</a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-sm font-bold uppercase hover:text-racing-red transition-colors">Youtube</a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
