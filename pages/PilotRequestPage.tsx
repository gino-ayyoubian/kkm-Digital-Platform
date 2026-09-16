import * as React from 'react';
import { Page } from '../types';
import { useLanguage } from '../LanguageContext';
import { motion } from 'motion/react';
import { MapPin, Users, AlertCircle, FileText, Send } from 'lucide-react';

interface PilotRequestPageProps {
  setPage: (page: Page) => void;
}

const PilotRequestPage: React.FC<PilotRequestPageProps> = ({ setPage }) => {
  const { t, direction } = useLanguage();
  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen pt-24 pb-16" dir={direction}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 dark:text-white mb-4">
            Propose a Pilot Project
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Submit genuine project leads for rural and nomadic development integration.
          </p>
        </div>

        {status === 'success' ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center shadow-xl border border-emerald-100 dark:border-emerald-900/30">
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Proposal Submitted</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Our business development team will review the parameters and contact you shortly.
            </p>
            <button onClick={() => setPage(Page.Home)} className="px-8 py-3 bg-primary text-white font-bold rounded-full">
              Return Home
            </button>
          </motion.div>
        ) : (
          <motion.form 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            onSubmit={handleSubmit}
            className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 dark:border-slate-800 space-y-8"
          >
            {/* Location Data */}
            <section>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                <MapPin className="text-primary w-5 h-5" /> Location Profile
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Province</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary outline-none text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">County</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary outline-none text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Village / Nomadic Area</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary outline-none text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Population</label>
                  <input required type="number" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary outline-none text-slate-900 dark:text-white" />
                </div>
              </div>
            </section>

            {/* Problem Space */}
            <section>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                <AlertCircle className="text-red-500 w-5 h-5" /> Primary Problem
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {['Energy', 'Water', 'Agriculture', 'Infrastructure', 'Employment'].map(prob => (
                  <label key={prob} className="flex items-center gap-3 p-4 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                    <input type="checkbox" className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{prob}</span>
                  </label>
                ))}
              </div>
              <textarea 
                placeholder="Elaborate on the specific challenges..."
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary outline-none text-slate-900 dark:text-white h-32 resize-none"
              ></textarea>
            </section>

            {/* Logistics & Funding */}
            <section>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                <FileText className="text-emerald-500 w-5 h-5" /> Logistics & Contact
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Available Land</label>
                  <select className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white">
                    <option>Yes - State Owned</option>
                    <option>Yes - Privately Owned</option>
                    <option>No / Needs Allocation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Existing Infrastructure</label>
                  <select className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white">
                    <option>None</option>
                    <option>Basic (Roads only)</option>
                    <option>Partial (Grid/Water access)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Funding Availability</label>
                  <select className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white">
                    <option>Seeking Full Funding (KKM/Investors)</option>
                    <option>Partial Government Grant</option>
                    <option>Fully Funded (Seeking EPC/Tech)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Contact Email / Phone</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary outline-none text-slate-900 dark:text-white" />
                </div>
              </div>
            </section>

            <button 
              type="submit" 
              disabled={status === 'submitting'}
              className="w-full py-4 bg-primary-dark dark:bg-secondary text-white dark:text-primary-dark font-bold rounded-xl text-lg hover:bg-primary transition-colors disabled:opacity-50"
            >
              {status === 'submitting' ? 'Submitting...' : 'Submit Pilot Request'}
            </button>
          </motion.form>
        )}
      </div>
    </div>
  );
};

export default PilotRequestPage;
