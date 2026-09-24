import * as React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import PageHeader from '../components/PageHeader';
import GlobalCTA from '../components/GlobalCTA';
import { Page } from '../types';

import { trackDownload } from '../lib/analytics';
interface DocumentInfo {
    title: string;
    version: string;
    date: string;
    category: string;
    icon: React.ReactNode;
}

const DOCUMENTS: DocumentInfo[] = [
    { title: 'KKM Corporate Profile', version: 'v1.2', date: 'September 2026', category: 'Corporate', icon: <DocIcon /> },
    { title: 'Technology Portfolio Overview', version: 'v2.0', date: 'August 2026', category: 'Technology', icon: <TechIcon /> },
    { title: 'GMEL Technical Brochure', version: 'v1.1', date: 'July 2026', category: 'Product', icon: <TechIcon /> },
    { title: 'Rural Development Platform Profile', version: 'v3.0', date: 'September 2026', category: 'Initiative', icon: <DocIcon /> },
    { title: 'Giga-Project Case Sheets', version: 'v1.0', date: 'June 2026', category: 'Projects', icon: <ProjectIcon /> },
    { title: 'KKM Investor Master Deck', version: 'v2.4', date: 'September 2026', category: 'Investor Relations', icon: <InvestIcon /> },
    { title: 'Closed-Loop Geothermal Technical Paper', version: 'v1.0', date: 'May 2026', category: 'Research', icon: <TechIcon /> },
    { title: 'Patent & IP Portfolio Summary', version: 'v1.5', date: 'August 2026', category: 'Legal / IP', icon: <InvestIcon /> },
    { title: 'Annual ESG & Sustainability Report', version: 'v2.1', date: 'January 2026', category: 'Sustainability', icon: <DocIcon /> }
];

function DocIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary dark:text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
}

function TechIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary dark:text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>;
}

function ProjectIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary dark:text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>;
}

function InvestIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary dark:text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
}

const DownloadsPage: React.FC<{ setPage: (p: Page) => void }> = ({ setPage }) => {
    const [downloadedDoc, setDownloadedDoc] = React.useState<string | null>(null);

    const handleDownload = (doc: DocumentInfo) => {
        trackDownload(doc.title, doc.version);
        const content = `========================================================================\n` +
          `  KKM INTERNATIONAL GROUP - OFFICIAL PUBLICATION\n` +
          `  گروه بین‌المللی کیمیا کاران ماد\n` +
          `========================================================================\n` +
          `Document Title : ${doc.title}\n` +
          `Category       : ${doc.category}\n` +
          `Version        : ${doc.version}\n` +
          `Date of Issue  : ${doc.date}\n` +
          `Digital Status : Verified & Authentic Publication\n` +
          `Publisher      : KKM Executive Board & Directorate of Public Relations\n` +
          `Contact        : info@kkm-intl.org | https://kkm-intl.org\n` +
          `------------------------------------------------------------------------\n` +
          `This document package contains the authorized corporate overview,\n` +
          `engineering frameworks, and intellectual property specifications of KKM.\n` +
          `========================================================================\n`;
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${doc.title.replace(/[^a-zA-Z0-9]/g, '_')}_${doc.version}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        setDownloadedDoc(doc.title);
        setTimeout(() => setDownloadedDoc(null), 3500);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <PageHeader title="KKM Documents" subtitle="Download official corporate profiles, technical brochures, and investor decks." />
            
            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {DOCUMENTS.map((doc, idx) => (
                        <div key={idx} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-slate-700 hover:shadow-lg transition-all duration-300 group">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-primary/10 dark:bg-secondary/10 rounded-lg">
                                    {doc.icon}
                                </div>
                                <span className="text-xs font-bold px-2 py-1 bg-gray-100 dark:bg-slate-700 text-text-light dark:text-slate-300 rounded-full">
                                    {doc.category}
                                </span>
                            </div>
                            <h3 className="text-lg font-display font-bold text-primary-dark dark:text-white mb-2 line-clamp-2">
                                {doc.title}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-text-light dark:text-slate-400 font-mono mb-6">
                                <span>{doc.version}</span>
                                <span>•</span>
                                <span>{doc.date}</span>
                            </div>
                            
                            <button 
                                className={`w-full flex items-center justify-center gap-2 px-4 py-2 font-semibold rounded-lg transition-colors border ${
                                    downloadedDoc === doc.title 
                                        ? 'bg-green-600 text-white border-green-600'
                                        : 'bg-gray-50 dark:bg-slate-700 hover:bg-primary hover:text-white dark:hover:bg-secondary dark:hover:text-primary-dark text-text-dark dark:text-slate-200 border-gray-200 dark:border-slate-600'
                                }`}
                                onClick={() => handleDownload(doc)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                {downloadedDoc === doc.title ? 'Downloaded ✓' : 'Download Document'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <GlobalCTA setPage={setPage} />
        </motion.div>
    );
};

export default DownloadsPage;
