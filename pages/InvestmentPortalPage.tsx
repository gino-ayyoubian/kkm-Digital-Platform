import * as React from 'react';
import { Page } from '../types';
import { useLanguage } from '../LanguageContext';
import { motion } from 'motion/react';
import { Briefcase, Landmark, Handshake, FileCode2, Network, ShieldCheck } from 'lucide-react';

interface InvestmentPortalPageProps {
  setPage: (page: Page) => void;
}

const InvestmentPortalPage: React.FC<InvestmentPortalPageProps> = ({ setPage }) => {
  const { direction } = useLanguage();

  const categories = [
    { id: 'Tech', title: 'Technology Investment', icon: CpuIcon, desc: 'Invest directly in KKM proprietary IP, R&D labs, and upcoming patents.' },
    { id: 'Proj', title: 'Project Investment', icon: Landmark, desc: 'Fund specific infrastructure, energy, or rural development pilots.' },
    { id: 'Partner', title: 'Strategic Partnership', icon: Handshake, desc: 'Joint ventures, market expansion, and co-development programs.' },
    { id: 'License', title: 'Technology Licensing', icon: FileCode2, desc: 'License our technologies (e.g. GMEL) for deployment in your jurisdictions.' },
    { id: 'PPP', title: 'PPP (Public-Private)', icon: Network, desc: 'Collaborate on state-level infrastructure and master-planned projects.' },
    { id: 'EPC', title: 'EPC / EPCM', icon: ShieldCheck, desc: 'Engage KKM as the prime contractor for complex technical deployments.' },
  ];

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen pt-24 pb-16" dir={direction}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 dark:text-white mb-6">
            Invest in KKM
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Strategic capital deployment opportunities across our technology ecosystem and infrastructure pipeline.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <motion.div 
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-shadow group cursor-pointer"
              onClick={() => setPage(Page.Contact)}
            >
              <div className="w-14 h-14 bg-primary/10 dark:bg-secondary/10 text-primary-dark dark:text-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <cat.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{cat.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">{cat.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-primary-dark text-white rounded-3xl p-10 text-center">
          <h2 className="text-2xl font-bold mb-4">Request the Data Room</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Institutional investors and qualified partners may request access to our secure data room containing financial models, patent filings, and technical feasibility studies.
          </p>
          <button onClick={() => setPage(Page.Contact)} className="px-8 py-4 bg-white text-primary-dark font-bold rounded-full hover:bg-gray-100 transition-colors">
            Contact Investor Relations
          </button>
        </div>
      </div>
    </div>
  );
};

// Simple wrapper icon
function CpuIcon(props: any) {
  return <Briefcase {...props} />;
}

export default InvestmentPortalPage;
