import * as React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({title, subtitle}) => (
    <div className="bg-primary/10 dark:bg-slate-800/50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-display font-extrabold text-primary dark:text-secondary">{title}</h1>
            <p className="mt-4 text-lg text-text-light dark:text-slate-300 max-w-3xl mx-auto">{subtitle}</p>
        </div>
    </div>
);

export default PageHeader;