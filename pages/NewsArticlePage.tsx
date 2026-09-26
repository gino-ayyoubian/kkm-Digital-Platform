import * as React from 'react';
import type { NewsItem } from '../types';
import { useLanguage } from '../LanguageContext';
import { NEWS_ITEMS } from '../constants';
import { motion } from 'motion/react';
import { sanitizeHtml } from '../utils/sanitizeHtml';

interface NewsArticlePageProps {
    article: NewsItem;
    onBack: () => void;
    onSelectArticle?: (article: NewsItem) => void;
}

const NewsArticlePage: React.FC<NewsArticlePageProps> = ({ article, onBack, onSelectArticle }) => {
    const { t } = useLanguage();

    // Suggest 3 other news posts, ensuring it doesn't show the currently active article
    const relatedArticles = React.useMemo(() => {
        const others = NEWS_ITEMS.filter((item) => item.title !== article.title);
        // Prioritize same category first if available
        const sameCategory = others.filter((item) => item.category === article.category);
        const differentCategory = others.filter((item) => item.category !== article.category);
        return [...sameCategory, ...differentCategory].slice(0, 3);
    }, [article]);

    const handleSelectRelated = (item: NewsItem) => {
        if (onSelectArticle) {
            onSelectArticle(item);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 transition-colors">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <button 
                    onClick={onBack} 
                    className="font-bold text-accent-dark dark:text-accent-yellow hover:underline mb-8 inline-flex items-center gap-2 group"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">&larr;</span>
                    <span>{t('BackToNews')}</span>
                </button>

                <article className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary dark:text-secondary text-xs font-bold uppercase tracking-wider">
                            {article.category}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                            {article.date}
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-900 dark:text-white leading-tight">
                        {article.title}
                    </h1>

                    <div className="mt-8 overflow-hidden rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800">
                        <img 
                            src={article.image} 
                            alt={article.title} 
                            loading="lazy" 
                            className="w-full h-80 sm:h-[450px] object-cover" 
                        />
                    </div>

                    <div 
                        className="mt-10 prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed text-base sm:text-lg" 
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(article.content) }}
                    />
                </article>

                {/* Related Articles Section */}
                <section className="mt-24 pt-16 border-t border-slate-200 dark:border-slate-800">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-primary dark:text-secondary">
                                    Related Publications
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 dark:text-white mt-1">
                                    Recommended Reading
                                </h2>
                            </div>
                            <button
                                onClick={onBack}
                                className="text-xs sm:text-sm font-bold text-primary dark:text-secondary hover:underline"
                            >
                                View All News &rarr;
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedArticles.map((relItem, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="bg-slate-50 dark:bg-slate-800/70 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                                >
                                    <div>
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={relItem.image}
                                                alt={relItem.title}
                                                loading="lazy"
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute top-3 left-3">
                                                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 text-white backdrop-blur-sm">
                                                    {relItem.category}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <span className="text-xs text-slate-400 dark:text-slate-500 block mb-2">
                                                {relItem.date}
                                            </span>
                                            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-secondary transition-colors line-clamp-2">
                                                {relItem.title}
                                            </h3>
                                            <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                                                {relItem.excerpt}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="px-6 pb-6 pt-2">
                                        <button
                                            onClick={() => handleSelectRelated(relItem)}
                                            className="w-full py-2.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-700 text-primary dark:text-white border border-slate-200 dark:border-slate-600 hover:bg-primary hover:text-white dark:hover:bg-primary transition-all duration-300 shadow-sm flex items-center justify-center gap-1.5"
                                        >
                                            <span>Read Article</span>
                                            <span>&rarr;</span>
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default NewsArticlePage;
