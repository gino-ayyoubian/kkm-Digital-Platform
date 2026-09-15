import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface AccordionProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);

    return (
        <div className="border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden mb-4 last:mb-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center px-6 py-4 text-left bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary dark:focus:ring-secondary"
                aria-expanded={isOpen}
            >
                <span className="font-display font-bold text-primary-dark dark:text-white text-lg">{title}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-primary dark:text-secondary"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: 'auto' },
                            collapsed: { opacity: 0, height: 0 }
                        }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="overflow-hidden bg-white dark:bg-slate-800 border-t border-gray-100 dark:border-slate-700"
                    >
                        <div className="px-6 py-6 text-text-light dark:text-slate-300 leading-relaxed">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Accordion;