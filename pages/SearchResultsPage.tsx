import * as React from 'react';
import { Page } from '../types';
import type { GeminiSearchResult, SearchMatchedItem, NewsItem, Project } from '../types';
import { useLanguage } from '../LanguageContext';
import SimpleMarkdown from '../components/SimpleMarkdown';

interface SearchResultsPageProps {
  result: GeminiSearchResult | null;
  query: string;
  onSearch?: (query: string) => void;
  onSelectArticle?: (article: NewsItem) => void;
  onNavigatePage?: (page: Page) => void;
  onSelectProject?: (project: Project) => void;
}

const SearchResultSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-md border border-gray-100 dark:border-slate-700 animate-pulse space-y-6">
    <div className="flex items-center gap-3">
      <div className="h-5 w-5 bg-gray-200 dark:bg-slate-700 rounded-full" />
      <div className="h-4 w-48 bg-gray-200 dark:bg-slate-700 rounded" />
    </div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-full" />
      <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-5/6" />
      <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-4/6" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-slate-700">
      <div className="h-28 bg-gray-200 dark:bg-slate-700 rounded-xl" />
      <div className="h-28 bg-gray-200 dark:bg-slate-700 rounded-xl" />
    </div>
  </div>
);

const getHostname = (url: string) => {
  try {
    return new URL(url).hostname;
  } catch (e) {
    return '';
  }
};

const SUGGESTED_TOPICS = [
  'Geothermal GMEL-CLG',
  'Qeshm Green Energy',
  'Biomedical',
  'Desalination',
  'Sarakhs Upstream',
  'Drilling Technologies',
  'Assaluyeh Green Chem',
  'Careers & Jobs',
];

const SearchResultsPage: React.FC<SearchResultsPageProps> = ({
  result,
  query,
  onSearch,
  onSelectArticle,
  onNavigatePage,
  onSelectProject,
}) => {
  const { t } = useLanguage();
  const [searchInput, setSearchInput] = React.useState(query);
  const [activeCategory, setActiveCategory] = React.useState<string>('all');

  // Keep search input synced with query prop
  React.useEffect(() => {
    setSearchInput(query);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim() && onSearch) {
      onSearch(searchInput.trim());
    }
  };

  const handleTopicClick = (topic: string) => {
    setSearchInput(topic);
    if (onSearch) {
      onSearch(topic);
    }
  };

  const handleCardClick = (item: SearchMatchedItem) => {
    if (item.type === 'news' && item.rawItem && onSelectArticle) {
      onSelectArticle(item.rawItem as NewsItem);
      return;
    }
    if (item.type === 'project' && item.rawItem && onSelectProject) {
      onSelectProject(item.rawItem as Project);
      return;
    }
    if (item.linkPage && onNavigatePage) {
      onNavigatePage(item.linkPage);
    }
  };

  const displayedItems = React.useMemo(() => {
    if (!result?.matchedItems) return [];
    if (activeCategory === 'all') return result.matchedItems;
    return result.matchedItems.filter((i) => {
      if (activeCategory === 'projects') return i.type === 'project';
      if (activeCategory === 'technologies') return i.type === 'technology';
      if (activeCategory === 'news') return i.type === 'news';
      if (activeCategory === 'innovations') return i.type === 'innovation';
      if (activeCategory === 'jobs') return i.type === 'job';
      return true;
    });
  }, [result, activeCategory]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[75vh]">
      {/* Search Header Banner */}
      <div className="max-w-4xl mx-auto mb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-extrabold text-primary dark:text-white">
              {t('SearchDeepTitle')}
            </h1>
            <p className="mt-1 text-sm text-text-light dark:text-slate-400">
              {t('SearchFoundCount', { count: result?.totalMatchesCount ?? 0 })}
            </p>
          </div>
        </div>

        {/* In-page Search Bar */}
        <form onSubmit={handleSubmit} className="relative flex items-center shadow-lg rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
          <div className="pl-4 pr-3 py-3 text-primary dark:text-secondary flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={t('SearchPlaceholderRefine')}
            className="w-full py-3.5 pr-4 bg-transparent outline-none text-text-dark dark:text-white placeholder-gray-400 text-base"
          />
          <button
            type="submit"
            className="px-6 py-3.5 bg-primary hover:bg-secondary text-white font-bold transition-colors shrink-0 flex items-center gap-2"
          >
            <span>{t('Search')}</span>
          </button>
        </form>

        {/* Suggested Topic Chips */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-text-light dark:text-slate-400">
            {t('SearchRelatedQueries')}:
          </span>
          {SUGGESTED_TOPICS.map((topic) => (
            <button
              key={topic}
              type="button"
              onClick={() => handleTopicClick(topic)}
              className="px-3 py-1 text-xs rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-primary/10 hover:text-primary dark:hover:bg-slate-700 dark:text-slate-300 text-text-dark border border-gray-200 dark:border-slate-700 transition-colors"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Main Results Container */}
      <div className="max-w-4xl mx-auto space-y-8">
        {!result ? (
          <SearchResultSkeleton />
        ) : (
          <>
            {/* AI / System Synthesis Box */}
            <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-md border border-gray-100 dark:border-slate-700">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 dark:border-slate-700 pb-4">
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-primary/5 dark:bg-secondary/10 text-primary dark:text-secondary rounded-lg text-xs font-bold uppercase tracking-wider border border-primary/20 dark:border-secondary/20">
                  {result.sourceType === 'internal' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 9a9 9 0 019-9" />
                    </svg>
                  )}
                  <span>
                    {result.sourceType === 'internal'
                      ? 'KKM Verified Knowledge Base'
                      : 'Web Grounded Synthesis'}
                  </span>
                </div>

                <div className="text-xs text-text-light dark:text-slate-400">
                  {t('ShowingResultsFor', { query })}
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none text-text-dark dark:text-slate-200 leading-relaxed text-base">
                <SimpleMarkdown text={result.summary} />
              </div>

              {/* Web Grounding Sources if present */}
              {result.sources && result.sources.filter((s) => s.web?.uri).length > 0 && (
                <div className="mt-8 border-t border-gray-100 dark:border-slate-700 pt-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-primary dark:text-secondary mb-3">
                    Grounding Sources
                  </h3>
                  <ul className="space-y-2">
                    {result.sources
                      .filter((s) => s.web?.uri)
                      .map((source, index) => {
                        const hostname = getHostname(source.web!.uri!);
                        return (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <img
                              src={`https://www.google.com/s2/favicons?sz=16&domain_url=${hostname}`}
                              alt="favicon"
                              className="w-4 h-4 shrink-0"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                            <a
                              href={source.web!.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary dark:text-secondary hover:underline break-all"
                            >
                              {source.web!.title || source.web!.uri}
                            </a>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              )}
            </div>

            {/* Category Filter Tabs */}
            {result.categories && result.categories.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                {result.categories.map((cat) => {
                  const isActive = activeCategory === cat.category;
                  return (
                    <button
                      key={cat.category}
                      type="button"
                      onClick={() => setActiveCategory(cat.category)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                        isActive
                          ? 'bg-primary text-white shadow-md'
                          : 'bg-white dark:bg-slate-800 text-text-dark dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-gray-100 dark:bg-slate-700 text-text-light dark:text-slate-400'
                        }`}
                      >
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Matched Entities Interactive Grid */}
            {displayedItems.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-display font-bold text-text-dark dark:text-white flex items-center gap-2">
                  <span>{t('SearchDirectNavigation')}</span>
                  <span className="text-sm font-normal text-text-light dark:text-slate-400">
                    ({displayedItems.length})
                  </span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {displayedItems.map((item) => {
                    const badgeColor =
                      item.type === 'project'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                        : item.type === 'technology'
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                        : item.type === 'news'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                        : item.type === 'innovation'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';

                    return (
                      <div
                        key={item.id}
                        onClick={() => handleCardClick(item)}
                        className="group bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-200 dark:border-slate-700 transition-all cursor-pointer flex flex-col justify-between hover:border-primary/50 dark:hover:border-secondary/50"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${badgeColor}`}>
                              {item.type}
                            </span>
                            {item.subtitle && (
                              <span className="text-xs text-text-light dark:text-slate-400 line-clamp-1">
                                {item.subtitle}
                              </span>
                            )}
                          </div>
                          <h4 className="font-display font-bold text-base text-text-dark dark:text-white group-hover:text-primary dark:group-hover:text-secondary transition-colors mb-2">
                            {item.title}
                          </h4>
                          <p className="text-xs text-text-light dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                            {item.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-slate-700 text-xs font-semibold text-primary dark:text-secondary group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                          <span>{t('ViewDetails')}</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
