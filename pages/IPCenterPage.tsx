import * as React from 'react';
import { Page } from '../types';
import { useLanguage } from '../LanguageContext';
import { motion } from 'motion/react';
import { Lock, FileText, Search, ShieldCheck, CheckCircle2, ArrowRight, ExternalLink, Filter } from 'lucide-react';

interface IPCenterPageProps {
  setPage: (page: Page) => void;
}

const IPCenterPage: React.FC<IPCenterPageProps> = ({ setPage }) => {
  const { direction, isFa } = useLanguage();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('ALL');

  const ipData = [
    { 
      tech: 'GMEL-CLG (Closed-Loop Geothermal)', 
      techFa: 'سامانه زمین‌گرمایی حلقه بسته GMEL-CLG',
      inventor: 'KKM Engineering Core', 
      owner: 'KKM International Group', 
      jurisdiction: 'US, EU, Global PCT', 
      appNumber: 'PCT/IB2024/059421', 
      date: '2024-03-12', 
      status: 'Pending / Published', 
      area: 'Geothermal Energy', 
      category: 'ENERGY',
      commStatus: 'Licensing & Pilot',
      evidenceTag: 'TRL 7 [System Prototype Validated]',
      claimsGated: 'Zero water consumption; continuous baseload thermal-to-electric conversion.'
    },
    { 
      tech: 'GMEL-ThermoFluid Heat Transfer Agent', 
      techFa: 'سیال تبادل حرارتی نانومهندسی GMEL-ThermoFluid',
      inventor: 'KKM Advanced Materials Lab', 
      owner: 'KKM International Group', 
      jurisdiction: 'US, Global PCT', 
      appNumber: 'US 18/456,892', 
      date: '2024-01-20', 
      status: 'Granted', 
      area: 'Materials Science', 
      category: 'MATERIALS',
      commStatus: 'Pilot Deployed',
      evidenceTag: 'TRL 8 [Commercial Grade Validated]',
      claimsGated: 'Thermal conductivity enhanced up to 38% under high-pressure closed loops [Simulated/Pilot Tested].'
    },
    { 
      tech: 'Smart-Casing Subsurface Monitoring Module', 
      techFa: 'ماژول پایش عمقی هوشمند Smart-Casing',
      inventor: 'KKM Sensor Systems', 
      owner: 'KKM International Group', 
      jurisdiction: 'EU, GCC Regional', 
      appNumber: 'EP 24158912.4', 
      date: '2023-11-05', 
      status: 'Under Examination', 
      area: 'Infrastructure Hardware', 
      category: 'INFRASTRUCTURE',
      commStatus: 'Prototype Validated',
      evidenceTag: 'TRL 6 [Field Simulated]',
      claimsGated: 'Real-time 4,000m acoustic & temperature sensing with fiber-optic telemetry.'
    },
    { 
      tech: 'Bio-Mineralizing Resilient Concrete Matrix', 
      techFa: 'ماتریس بتن خودترمیم شونده زیستی',
      inventor: 'KKM Materials Consortium', 
      owner: 'KKM International Group', 
      jurisdiction: 'Trade Secret / Proprietary', 
      appNumber: 'TS-KKM-2023-09', 
      date: '2023-08-14', 
      status: 'Protected Asset', 
      area: 'Civil Infrastructure', 
      category: 'INFRASTRUCTURE',
      commStatus: 'Pilot Phase',
      evidenceTag: 'TRL 5 [Lab Certified]',
      claimsGated: 'Crack self-healing up to 0.4mm micro-fissures in high-saline marine soils.'
    },
    { 
      tech: 'Integrated Solar-Geothermal Desalination (GMEL-Desal)', 
      techFa: 'سامانه نمک‌زدایی تلفیقی خورشیدی-زمین‌گرمایی GMEL-Desal',
      inventor: 'KKM Water & Energy Lab', 
      owner: 'KKM International Group', 
      jurisdiction: 'PCT Global', 
      appNumber: 'PCT/IB2024/061204', 
      date: '2024-06-01', 
      status: 'Filed / Priority Secured', 
      area: 'Water Technology', 
      category: 'WATER',
      commStatus: 'Engineering Design',
      evidenceTag: 'TRL 4 [Bench Scale Demonstrated]',
      claimsGated: 'Energy intensity reduced to ~2.1 kWh/m³ potable distillate via multi-effect thermal cascade [Target].'
    },
    { 
      tech: 'Autonomous Micro-Grid Energy Dispatch Optimizer (EDO-AI)', 
      techFa: 'الگوریتم هوش مصنوعی دیسپاچینگ ریزشبکه روستایی',
      inventor: 'KKM Digital & AI Lab', 
      owner: 'KKM International Group', 
      jurisdiction: 'Copyright & Source Code Escrow', 
      appNumber: 'SW-REG-2024-118', 
      date: '2024-04-18', 
      status: 'Protected Asset', 
      area: 'AI & Digital Systems', 
      category: 'DIGITAL',
      commStatus: 'Commercial Beta',
      evidenceTag: 'TRL 7 [Integrated Rural Testbed]',
      claimsGated: 'Predictive load balancing reduces diesel generator backup runtime by up to 45% [Pilot Field Data].'
    }
  ];

  const filteredData = ipData.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.tech.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.techFa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.appNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.area.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen pt-24 pb-16" dir={direction}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary-dark dark:text-secondary text-xs font-bold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-4 h-4" />
              {isFa ? 'دفتر ثبت مالکیت فکری و دارایی‌های فناورانه KKM' : 'Intellectual Property Office & Patent Registry'}
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 dark:text-white mb-4">
              {isFa ? 'مرکز مالکیت فکری و پتنت‌ها' : 'KKM IP & Technology Center'}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl">
              {isFa 
                ? 'ثبت جامع اختراعات، پرونده‌های معاهده همکاری ثبت اختراع (PCT)، فناوری‌های تحت حفاظت و اسناد اعتبارسنجی فنی گروه بین‌المللی کیمیا کاران ماد.' 
                : 'Comprehensive registry of proprietary patents, PCT filings, trade secrets, and validated technological assets under evidence-gated governance.'}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm w-full md:w-80">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isFa ? 'جستجو در بانک دارایی‌های فکری...' : 'Search IP registry & patents...'} 
              className="bg-transparent border-none outline-none text-slate-900 dark:text-white w-full text-sm placeholder-slate-400" 
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8 items-center">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mr-2">
            <Filter className="w-3.5 h-3.5" />
            {isFa ? 'دسته‌بندی:' : 'Domain:'}
          </span>
          {[
            { id: 'ALL', label: isFa ? 'همه دارایی‌ها' : 'All Assets' },
            { id: 'ENERGY', label: isFa ? 'انرژی و ژئوترمال' : 'Energy & Geothermal' },
            { id: 'MATERIALS', label: isFa ? 'مواد پیشرفته' : 'Advanced Materials' },
            { id: 'WATER', label: isFa ? 'فناوری آب' : 'Water Tech' },
            { id: 'INFRASTRUCTURE', label: isFa ? 'زیرساخت و سخت‌افزار' : 'Infrastructure' },
            { id: 'DIGITAL', label: isFa ? 'هوش مصنوعی و دیجیتال' : 'AI & Digital' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                selectedCategory === cat.id 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-primary'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* IP Registry Table */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-left rtl:text-right whitespace-nowrap">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-5">{isFa ? 'فناوری / دارایی فکری' : 'Technology / IP Asset'}</th>
                  <th className="p-5">{isFa ? 'حوزه قضایی ثبت' : 'Jurisdiction'}</th>
                  <th className="p-5">{isFa ? 'شماره پرونده / گواهی' : 'Filing / App No.'}</th>
                  <th className="p-5">{isFa ? 'سطح آمادگی و اعتبارسنجی' : 'TRL & Evidence Status'}</th>
                  <th className="p-5">{isFa ? 'وضعیت تجاری‌سازی' : 'Commercialization'}</th>
                  <th className="p-5">{isFa ? 'مشخصات فنی' : 'Technical Specs'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:border-slate-800">
                {filteredData.length > 0 ? (
                  filteredData.map((ip, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="p-5">
                        <p className="font-bold text-slate-900 dark:text-white text-sm">
                          {isFa ? ip.techFa : ip.tech}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">{ip.area}</p>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 max-w-md truncate" title={ip.claimsGated}>
                          {ip.claimsGated}
                        </p>
                      </td>
                      <td className="p-5 text-slate-700 dark:text-slate-300 text-xs font-medium">{ip.jurisdiction}</td>
                      <td className="p-5 text-slate-700 dark:text-slate-300 font-mono text-xs">{ip.appNumber}</td>
                      <td className="p-5">
                        <div className="flex flex-col gap-1">
                          <span className={`inline-flex items-center gap-1 w-fit px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            ip.status.includes('Granted') ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300' :
                            ip.status.includes('Protected') ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300' :
                            'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                          }`}>
                            <CheckCircle2 className="w-3 h-3" />
                            {ip.status}
                          </span>
                          <span className="text-[11px] font-mono text-slate-500 font-semibold">{ip.evidenceTag}</span>
                        </div>
                      </td>
                      <td className="p-5 text-slate-700 dark:text-slate-300 text-xs font-semibold">{ip.commStatus}</td>
                      <td className="p-5">
                        <button 
                          onClick={() => setPage(Page.TechnologyTemplate)} 
                          className="px-3 py-1.5 bg-primary/10 hover:bg-primary text-primary hover:text-white dark:text-secondary rounded-lg font-bold flex items-center gap-1 text-xs transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5" /> 
                          {isFa ? 'برگ مشخصات' : 'Specs Dossier'}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-slate-400">
                      {isFa ? 'موردی مطابق با جستجوی شما یافت نشد.' : 'No intellectual assets match your search.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* NDA & Evidence Notice */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/40 rounded-2xl flex items-start gap-4">
            <Lock className="w-6 h-6 text-amber-600 dark:text-amber-500 shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-amber-900 dark:text-amber-400 mb-1">
                {isFa ? 'سیاست محرمانگی و دسترسی تحت توافق‌نامه NDA' : 'Confidentiality & Mutual NDA Disclosure'}
              </h4>
              <p className="text-amber-800 dark:text-amber-300/80 text-xs leading-relaxed">
                {isFa
                  ? 'جزئیات ادعانامه‌های ثبت اختراع، فرمولاسیون سیالات حرارتی و معماری‌های عمقی تا پیش از انتشار رسمی یا تجاری‌سازی تحت توافق‌نامه عدم افشا (NDA) ارائه می‌گردد.'
                  : 'Detailed patent claim sets, specialized fluid chemical formulations, and subsurface schematics are restricted. Access is granted to qualified institutional partners under a bilateral NDA.'}
              </p>
            </div>
          </div>

          <div className="p-6 bg-slate-900 text-white rounded-2xl flex items-center justify-between gap-4">
            <div>
              <h4 className="font-bold mb-1">
                {isFa ? 'درخواست اخذ لایسنس یا بررسی فنی' : 'Technology Licensing & Due Diligence'}
              </h4>
              <p className="text-slate-400 text-xs">
                {isFa 
                  ? 'جهت بررسی پروتکل‌های واگذاری دانش فنی یا مشارکت در پایلوت‌های میدانی با ما در ارتباط باشید.' 
                  : 'For commercial licensing rights, joint development agreements, or technology audits, submit an inquiry.'}
              </p>
            </div>
            <button 
              onClick={() => setPage(Page.Contact)}
              className="px-4 py-2 bg-secondary text-primary-dark font-bold text-xs rounded-xl hover:bg-white transition-colors shrink-0"
            >
              {isFa ? 'ارتباط با دفتر IP' : 'Contact IP Office'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default IPCenterPage;
