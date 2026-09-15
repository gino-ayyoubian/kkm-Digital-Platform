
import * as React from 'react';
import { NEWS_ITEMS } from '../constants';
import type { NewsItem } from '../types';
import { Page } from '../types';
import PageHeader from '../components/PageHeader';
import { useLanguage } from '../LanguageContext';
import NewsCard from '../components/NewsCard';
import { motion, AnimatePresence } from 'motion/react';
import type { TranslationKey } from '../translations';

interface NewsPageProps {
    onSelectArticle: (article: NewsItem) => void;
}

const BATCH_SIZE = 4;

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 50 } }
};

const NewsSkeleton = () => (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden flex flex-col h-full animate-pulse border border-gray-100 dark:border-slate-700">
        <div className="h-64 bg-gray-200 dark:bg-slate-700 w-full"></div>
        <div className="p-6 flex flex-col flex-grow">
            <div className="h-3 bg-gray-200 dark:bg-slate-700 w-1/3 rounded mb-4"></div>
            <div className="h-6 bg-gray-300 dark:bg-slate-600 w-3/4 rounded mb-4"></div>
            <div className="space-y-2 flex-grow mb-6">
                <div className="h-3 bg-gray-200 dark:bg-slate-700 w-full rounded"></div>
                <div className="h-3 bg-gray-200 dark:bg-slate-700 w-full rounded"></div>
                <div className="h-3 bg-gray-200 dark:bg-slate-700 w-2/3 rounded"></div>
            </div>
            <div className="h-4 bg-gray-200 dark:bg-slate-700 w-24 rounded mt-auto"></div>
        </div>
    </div>
);

const NewsPage: React.FC<NewsPageProps> = ({ onSelectArticle }) => {
    const [sortOrder, setSortOrder] = React.useState<'newest' | 'oldest'>('newest');
    const [filterCategory, setFilterCategory] = React.useState<string>('All');
    const [visibleCount, setVisibleCount] = React.useState(BATCH_SIZE);
    const [isLoading, setIsLoading] = React.useState(true);
    const { t } = useLanguage();
    
    const categories = ['All', ...Array.from(new Set(NEWS_ITEMS.map(item => item.category)))];

    const filteredAndSortedNews = React.useMemo(() => {
        let items = [...NEWS_ITEMS];

        if (filterCategory !== 'All') {
            items = items.filter(item => item.category === filterCategory);
        }

        items.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
        });

        return items;
    }, [sortOrder, filterCategory]);

    // Simulate loading delay for better UX feeling of "fetching"
    React.useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800); // 0.8s fake loading time
        
        setVisibleCount(BATCH_SIZE);
        
        return () => clearTimeout(timer);
    }, [sortOrder, filterCategory]);
    
    const visibleNewsItems = React.useMemo(() => {
        return filteredAndSortedNews.slice(0, visibleCount);
    }, [filteredAndSortedNews, visibleCount]);

    const handleLoadMore = () => {
        setVisibleCount(prevCount => prevCount + BATCH_SIZE);
    };

    // Create a wrapper article object that has translated content for the card
    const getTranslatedArticle = (item: NewsItem) => ({
        ...item,
        title: t(item.title as TranslationKey),
        excerpt: t(item.excerpt as TranslationKey),
        content: t(item.content as TranslationKey),
    });

    return (
        <div>
            <PageHeader title={t(Page.News)} subtitle={t('NewsPageSubtitle')}/>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16">
                <div className="flex flex-col sm:flex-row gap-4 mb-8 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                    <div className="flex-1">
                        <label htmlFor="category-filter" className="block text-sm font-medium text-text-dark dark:text-slate-300">Filter by Category</label>
                        <select 
                            id="category-filter" 
                            value={filterCategory}
                            onChange={e => setFilterCategory(e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-slate-200 focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm rounded-md"
                        >
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                    <div className="flex-1">
                        <label htmlFor="sort-order" className="block text-sm font-medium text-text-dark dark:text-slate-300">Sort by</label>
                        <select 
                            id="sort-order"
                            value={sortOrder}
                            onChange={e => setSortOrder(e.target.value as 'newest' | 'oldest')}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-slate-200 focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm rounded-md"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                        </select>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div 
                            key="skeleton"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
                        >
                            {[...Array(4)].map((_, i) => <NewsSkeleton key={i} />)}
                        </motion.div>
                    ) : (
                        <motion.div 
                            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            key={filterCategory + sortOrder} // Force re-animation on filter change
                        >
                            {visibleNewsItems.length > 0 ? visibleNewsItems.map(item => (
                               <motion.div
                                    key={item.title}
                                    variants={itemVariants}
                               >
                                    <NewsCard 
                                        item={getTranslatedArticle(item)} 
                                        onSelectArticle={() => onSelectArticle(getTranslatedArticle(item))}
                                        imageHeight="h-64"
                                        showCategory={true}
                                    />
                               </motion.div>
                            )) : (
                                <p className="md:col-span-2 text-center text-text-light dark:text-slate-400">No news articles match the current filters.</p>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {!isLoading && visibleCount < filteredAndSortedNews.length && (
                    <div className="mt-12 text-center">
                        <button 
                            onClick={handleLoadMore}
                            className="px-8 py-3 font-bold text-white bg-primary rounded-full hover:bg-secondary transition-colors duration-300"
                        >
                           {t('LoadMore')}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsPage;
