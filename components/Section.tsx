import * as React from 'react';

interface SectionProps {
  title: string;
  id?: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({title, id, children, className = ''}) => (
    <section className={`py-12 ${className}`} id={id}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-display font-bold text-primary dark:text-white mb-6">{title}</h2>
            <div className="prose dark:prose-invert max-w-none text-text-light dark:text-slate-300">{children}</div>
        </div>
    </section>
);

export default Section;