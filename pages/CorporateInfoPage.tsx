import * as React from 'react';
import { Page } from '../types';
import { useLanguage } from '../LanguageContext';
import { motion } from 'motion/react';
import { Building2, FileCheck, MapPin, Phone, Globe, Briefcase, Mail } from 'lucide-react';

interface CorporateInfoPageProps {
  setPage: (page: Page) => void;
}

const CorporateInfoPage: React.FC<CorporateInfoPageProps> = ({ setPage }) => {
  const { direction } = useLanguage();

  const InfoRow = ({ label, value }: { label: string, value: string }) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-gray-100 dark:border-slate-800">
      <span className="font-bold text-slate-500 w-1/3">{label}</span>
      <span className="font-semibold text-slate-900 dark:text-white w-2/3">{value}</span>
    </div>
  );

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen pt-24 pb-16" dir={direction}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 dark:text-white mb-4">
            Corporate Information
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Official registration, structure, and due diligence information.
          </p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 md:p-12">
          
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary-dark">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Kimia Karan Mâd</h2>
              <p className="text-slate-500">Private Joint Stock Company</p>
            </div>
          </div>

          <div className="space-y-2 mb-12">
             <InfoRow label="Official Name" value="Kimia Karan Mâd Private Joint Stock Company" />
             <InfoRow label="Trading Name" value="KKM International Group" />
             <InfoRow label="Registration Number" value="384054" />
             <InfoRow label="Legal Structure" value="Private Joint Stock (Consortium)" />
             <InfoRow label="Primary Industry" value="Engineering, Energy, & Infrastructure" />
             <InfoRow label="Management" value="Board of Directors" />
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <MapPin className="text-primary w-5 h-5" /> Official Locations
          </h3>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Headquarters (Tehran)</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Building No. 101, Sarv Avenue, Nelson Mandela Boulevard, Tehran, Iran.</p>
              <p className="text-sm text-slate-500 mt-2">Postal Code: 1968945741</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Branch Office (Qeshm)</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Unit 2, Innovation Tower, Qeshm Free Zone, Iran</p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Phone className="text-primary w-5 h-5" /> Contact & Domains
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300">
               <Phone className="w-5 h-5 text-slate-400" />
               <span>+98 21 9103 0830</span>
            </div>
            <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300">
               <Mail className="w-5 h-5 text-slate-400" />
               <span>info@kkm-intl.com</span>
            </div>
            <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300">
               <Globe className="w-5 h-5 text-slate-400" />
               <span>www.kkm-intl.com</span>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default CorporateInfoPage;
