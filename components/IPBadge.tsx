import * as React from 'react';

export type IPStatus = 'Invented by' | 'Developed by' | 'Patent Filed' | 'Patent Granted' | 'Under Examination' | 'Licensed' | 'Owned' | 'Commercialization Rights';

const ipConfig: Record<IPStatus, string> = {
    'Invented by': 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700',
    'Developed by': 'bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-900 dark:text-cyan-300 dark:border-cyan-700',
    'Patent Filed': 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900 dark:text-amber-300 dark:border-amber-700',
    'Patent Granted': 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900 dark:text-emerald-300 dark:border-emerald-700',
    'Under Examination': 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900 dark:text-purple-300 dark:border-purple-700',
    'Licensed': 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-900 dark:text-indigo-300 dark:border-indigo-700',
    'Owned': 'bg-primary/10 text-primary-dark border-primary/30 dark:bg-secondary/20 dark:text-secondary dark:border-secondary/30',
    'Commercialization Rights': 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-900 dark:text-rose-300 dark:border-rose-700'
};

export const IPBadge: React.FC<{ status: IPStatus; text?: string }> = ({ status, text }) => {
    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-sm ${ipConfig[status]}`} title={status}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            {status}
            {text && <span className="font-medium opacity-80 ml-1">| {text}</span>}
        </span>
    );
};

export default IPBadge;
