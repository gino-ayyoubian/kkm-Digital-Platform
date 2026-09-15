import * as React from 'react';
import { NEWS_ITEMS } from '../constants';
import type { NewsItem } from '../types';
import { Page } from '../types';
import { useLanguage } from '../LanguageContext';
import { motion, AnimatePresence } from 'motion/react';

interface OfflinePageProps {
  setPage: (page: Page) => void;
  onSelectArticle?: (article: NewsItem) => void;
  onRetryConnection?: () => void;
}

export const OfflinePage: React.FC<OfflinePageProps> = ({
  setPage,
  onSelectArticle,
  onRetryConnection
}) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');
  const [readingArticle, setReadingArticle] = React.useState<NewsItem | null>(null);
  const [isChecking, setIsChecking] = React.useState(false);
  const [checkResult, setCheckResult] = React.useState<string | null>(null);

  // Cached articles filter
  const filteredArticles = React.useMemo(() => {
    return NEWS_ITEMS.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleTestConnection = async () => {
    setIsChecking(true);
    setCheckResult(null);
    try {
      if (onRetryConnection) {
        onRetryConnection();
      }
      // Simple probe check
      if (typeof window !== 'undefined' && navigator.onLine) {
        setCheckResult('Connection restored! You can now navigate freely.');
      } else {
        setCheckResult('Still offline. Cached contents remain fully available.');
      }
    } catch {
      setCheckResult('Unable to reach server. Operating in offline cache.');
    } finally {
      setTimeout(() => setIsChecking(false), 800);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl">
        {/* Offline Status Alert Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-transparent border-l-4 border-amber-500 dark:border-amber-400 p-6 rounded-2xl mb-10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-2xl">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 4.243a9 9 0 01-12.728 0m0 0l2.829-2.829m-2.829 2.829L3 21m2.829-15.364a9 9 0 0112.728 0M3 3l18 18" />
              </svg>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 text-xs font-bold uppercase tracking-wide">
                Offline Mode Active
              </div>
              <h1 className="text-2xl font-display font-black text-slate-900 dark:text-white mt-1">
                You are currently disconnected
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
                KKM's offline engine has preserved core corporate publications, technology briefings, and emergency contacts for continuous offline reading.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={handleTestConnection}
              disabled={isChecking}
              className="px-5 py-2.5 rounded-xl font-bold text-sm bg-primary text-white hover:bg-primary-dark transition shadow flex items-center justify-center gap-2"
            >
              {isChecking ? (
                <span className="inline-block animate-spin">⏳</span>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              )}
              <span>{isChecking ? 'Checking...' : 'Check Connection'}</span>
            </button>
            <button
              onClick={() => setPage(Page.Home)}
              className="px-5 py-2.5 rounded-xl font-bold text-sm bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition"
            >
              Return to Cached Home
            </button>
          </div>
        </motion.div>

        {checkResult && (
          <div className="mb-8 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-sm text-blue-800 dark:text-blue-300">
            {checkResult}
          </div>
        )}

        {/* Section 1: Cached News Browser */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-xl border border-slate-200 dark:border-slate-800 mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-display font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>📰 Offline News & Insights Archive</span>
                <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                  {filteredArticles.length} Cached Articles
                </span>
              </h2>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
                All articles below are cached locally in your session and can be read in full without network connectivity.
              </p>
            </div>

            {/* Search & Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Search cached articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="All">All Categories</option>
                <option value="Technology">Technology</option>
                <option value="Projects">Projects</option>
                <option value="Corporate">Corporate</option>
              </select>
            </div>
          </div>

          {/* Grid of Cached Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, idx) => (
              <div
                key={idx}
                className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-40 object-cover"
                  loading="lazy"
                />
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                    <span className="px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-[10px] uppercase">
                      {article.category}
                    </span>
                    <span>{article.date}</span>
                  </div>
                  <h3 className="font-display font-bold text-base text-slate-900 dark:text-white line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-3 leading-relaxed flex-grow">
                    {article.excerpt}
                  </p>
                  <button
                    onClick={() => setReadingArticle(article)}
                    className="mt-4 w-full py-2 rounded-xl text-xs font-bold text-primary dark:text-secondary bg-primary/10 hover:bg-primary/20 transition flex items-center justify-center gap-1.5"
                  >
                    <span>Read Offline</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400 text-sm">
              No cached articles match your search filter.
            </div>
          )}
        </div>

        {/* Section 2: Cached Core Emergency Contacts & Technology Guide */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Quick Technology Reference */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <span>⚡ GMEL Ecosystem Summary</span>
              <span className="text-xs bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 px-2 py-0.5 rounded-full">
                Cached Offline
              </span>
            </h3>
            <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <li className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                <strong className="text-slate-900 dark:text-white block font-semibold">GMEL CLG (Closed-Loop Geothermal):</strong>
                Zero aquifer fracking. Subsurface coaxial heat exchangers recovering supercritical thermal energy without venting.
              </li>
              <li className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                <strong className="text-slate-900 dark:text-white block font-semibold">GMEL EHS (Extended Heat System):</strong>
                Co-generation infrastructure converting secondary thermodynamic fluid into district heating, desalination, and green hydrogen.
              </li>
              <li className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                <strong className="text-slate-900 dark:text-white block font-semibold">GMEL DrillX (Thermal Spallation):</strong>
                High-penetration non-contact borehole drilling down to 7,000 meters through ultra-hard igneous and granitic formations.
              </li>
            </ul>
          </div>

          {/* Emergency & Key Corporate Coordinates */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <span>📍 Key Corporate Locations</span>
                <span className="text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                  Offline Records
                </span>
              </h3>
              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-900 dark:text-white">Head Office — Tehran</div>
                  <div>No. 12, West Taban St., Africa Blvd., Tehran, Iran</div>
                  <div className="text-primary mt-1 font-mono">+98 21 8877 6655</div>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-900 dark:text-white">Branch Office — Qeshm Island Free Zone</div>
                  <div>Commercial Tower, Unit 402, Qeshm Island, Iran</div>
                  <div className="text-primary mt-1 font-mono">+98 76 3522 1100</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500">
              For priority inquiries: <span className="font-mono text-slate-700 dark:text-slate-300">info@kkm-international.org</span>
            </div>
          </div>
        </div>

        {/* Offline Article Reading Modal */}
        <AnimatePresence>
          {readingArticle && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-slate-900 max-w-3xl w-full max-h-[85vh] rounded-3xl p-6 sm:p-8 overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800"
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase">
                    Offline Reader • {readingArticle.category}
                  </span>
                  <button
                    onClick={() => setReadingArticle(null)}
                    className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition"
                  >
                    ✕
                  </button>
                </div>

                <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 dark:text-white mb-2">
                  {readingArticle.title}
                </h2>
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                  Published: {readingArticle.date}
                </div>

                <img
                  src={readingArticle.image}
                  alt={readingArticle.title}
                  className="w-full h-64 object-cover rounded-2xl mb-6 shadow"
                />

                <div
                  className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: readingArticle.content }}
                />

                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                  <button
                    onClick={() => setReadingArticle(null)}
                    className="px-6 py-2.5 rounded-xl font-bold text-sm bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 transition"
                  >
                    Close Offline Reader
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OfflinePage;
