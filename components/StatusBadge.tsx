import * as React from 'react';

export type TechStatus = 'Concept' | 'R&D' | 'Prototype' | 'Pilot' | 'Validated' | 'Commercial';

const statusConfig: Record<TechStatus, string> = {
    'Concept': 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600',
    'R&D': 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700',
    'Prototype': 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900 dark:text-purple-300 dark:border-purple-700',
    'Pilot': 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900 dark:text-amber-300 dark:border-amber-700',
    'Validated': 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900 dark:text-emerald-300 dark:border-emerald-700',
    'Commercial': 'bg-primary/10 text-primary-dark border-primary/30 dark:bg-secondary/20 dark:text-secondary dark:border-secondary/30'
};

export const StatusBadge: React.FC<{ status: TechStatus }> = ({ status }) => {
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${statusConfig[status]}`}>
            {status}
        </span>
    );
};

export default StatusBadge;
