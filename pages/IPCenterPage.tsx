import * as React from 'react';
import { Page } from '../types';
import { useLanguage } from '../LanguageContext';
import { motion } from 'motion/react';
import { Lock, FileText, Search } from 'lucide-react';

interface IPCenterPageProps {
  setPage: (page: Page) => void;
}

const IPCenterPage: React.FC<IPCenterPageProps> = ({ setPage }) => {
  const { direction } = useLanguage();

  const ipData = [
    { tech: 'GMEL-CLG (Closed-Loop)', inventor: 'KKM Engineering Core', owner: 'KKM International', jurisdiction: 'US, EU, Global PCT', appNumber: 'PCT/IB2024/059XXX', date: '2024-03-12', status: 'Pending / Published', area: 'Geothermal Energy', commStatus: 'Licensing Phase' },
    { tech: 'ThermoFluid Heat Transfer Agent', inventor: 'KKM R&D', owner: 'KKM International', jurisdiction: 'US, Global PCT', appNumber: 'US 18/456,XXX', date: '2024-01-20', status: 'Granted', area: 'Materials Science', commStatus: 'Pilot Deployed' },
    { tech: 'Smart-Casing Subsurface Module', inventor: 'KKM Systems', owner: 'KKM International', jurisdiction: 'EU', appNumber: 'EP 2415XXXX.X', date: '2023-11-05', status: 'Under Examination', area: 'Infrastructure Hardware', commStatus: 'Prototype Validated' },
    { tech: 'Self-Healing Bio-Concrete Mix', inventor: 'KKM Materials Lab', owner: 'KKM International', jurisdiction: 'Trade Secret', appNumber: 'N/A', date: 'N/A', status: 'Protected Asset', area: 'Construction Tech', commStatus: 'R&D / Stealth' },
  ];

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen pt-24 pb-16" dir={direction}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 dark:text-white mb-4">
              KKM IP & Technology Center
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl">
              Registry of KKM International's proprietary patents, technologies, and intellectual assets.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800">
            <Search className="w-5 h-5 text-slate-400" />
            <input type="text" placeholder="Search IP registry..." className="bg-transparent border-none outline-none text-slate-900 dark:text-white w-full sm:w-64" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-6">Technology</th>
                  <th className="p-6">Filing Jurisdiction</th>
                  <th className="p-6">App / Pub Number</th>
                  <th className="p-6">Status</th>
                  <th className="p-6">Comm. Status</th>
                  <th className="p-6">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {ipData.map((ip, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="p-6">
                      <p className="font-bold text-slate-900 dark:text-white">{ip.tech}</p>
                      <p className="text-sm text-slate-500">{ip.area}</p>
                    </td>
                    <td className="p-6 text-slate-700 dark:text-slate-300">{ip.jurisdiction}</td>
                    <td className="p-6 text-slate-700 dark:text-slate-300 font-mono text-sm">{ip.appNumber}</td>
                    <td className="p-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        ip.status.includes('Granted') ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                        ip.status.includes('Protected') ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
                        'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                      }`}>
                        {ip.status}
                      </span>
                    </td>
                    <td className="p-6 text-slate-700 dark:text-slate-300 text-sm">{ip.commStatus}</td>
                    <td className="p-6">
                      <button onClick={() => setPage(Page.TechnologyTemplate)} className="text-primary hover:text-primary-dark dark:hover:text-secondary font-bold flex items-center gap-1 text-sm">
                        <FileText className="w-4 h-4" /> Specs
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 flex items-start gap-4 p-6 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/50 rounded-2xl">
          <Lock className="w-6 h-6 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-amber-900 dark:text-amber-500 mb-1">Confidential Information</h4>
            <p className="text-amber-800 dark:text-amber-400/80 text-sm">
              Detailed patent filings, system architectures, and proprietary material formulations are confidential. Access is provided strictly under a Non-Disclosure Agreement (NDA).
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default IPCenterPage;
