import React, { useState } from 'react';
import { useLanguage } from '../../LanguageContext';
import { useAuth } from '../../AuthContext';
import { 
  GitBranch, GitPullRequest, GitCommit, ShieldCheck, CheckCircle2, 
  Clock, AlertCircle, ExternalLink, RefreshCw, FolderGit2,
  Layers, Search, FileCode, Check, Award, Lock, Sparkles, User
} from 'lucide-react';

interface GitHubRepo {
  name: string;
  descriptionEn: string;
  descriptionFa: string;
  branch: string;
  latestCommit: string;
  commitAuthor: string;
  commitTime: string;
  ciStatus: 'success' | 'running' | 'failed';
  openPRs: number;
  openIssues: number;
  coverage: string;
}

interface PatentPipelineItem {
  id: string;
  patentTitleEn: string;
  patentTitleFa: string;
  docketNumber: string;
  filingType: 'PCT' | 'US_PATENT' | 'EPO' | 'NATIONAL';
  jurisdiction: string;
  stage: 'Priority Filed' | 'International Search (ISA)' | 'National Phase Entry' | 'Office Action Response' | 'Granted';
  examinerDeadline?: string;
  leadInventor: string;
  legalCounsel: string;
  statusColor: string;
  claimsCount: number;
}

interface CohortProject {
  id: string;
  nameEn: string;
  nameFa: string;
  stage: string;
  trl: string;
  assignedLead: string;
  activeSprint: string;
  completionRate: number;
  criticalPathItem: string;
  nextMilestoneDeadline: string;
}

const GITHUB_REPOSITORIES: GitHubRepo[] = [
  {
    name: 'kkm-group/gmel-subsurface-thermo',
    descriptionEn: 'Thermodynamic modeling & sCO2 closed-loop simulation engine (Rust/Python)',
    descriptionFa: 'موتور شبیه‌سازی ترمودینامیکی و سیکل بسته CO2 فوق‌بحرانی (Rust/Python)',
    branch: 'main',
    latestCommit: 'fix(exergy): optimize sORC pressure ratio for 175C reservoir',
    commitAuthor: 'K. Karami',
    commitTime: '2 hours ago',
    ciStatus: 'success',
    openPRs: 2,
    openIssues: 3,
    coverage: '94.2%',
  },
  {
    name: 'kkm-group/edo-ai-microgrid-controller',
    descriptionEn: 'Edge Reinforcement Learning agent for rural hybrid dispatch (C++/PyTorch)',
    descriptionFa: 'عامل یادگیری تقویتی لبه برای دیسپاچینگ هیبریدی روستایی (C++/PyTorch)',
    branch: 'release/v2.4',
    latestCommit: 'feat(policy): enforce nomadic peak demand constraint clipping',
    commitAuthor: 'A. Soleimani',
    commitTime: '5 hours ago',
    ciStatus: 'success',
    openPRs: 1,
    openIssues: 1,
    coverage: '91.8%',
  },
  {
    name: 'kkm-group/smart-casing-telemetry-firmware',
    descriptionEn: 'Embedded fiber-optic acoustic telemetry demodulator firmware (C/RTOS)',
    descriptionFa: 'فریم‌ور دمدولاتور تله‌متری فیبر نوری آکوستیک درون چاهی (C/RTOS)',
    branch: 'main',
    latestCommit: 'refactor(fft): reduce downhole DSP latency to 38ms',
    commitAuthor: 'N. Afshar',
    commitTime: '1 day ago',
    ciStatus: 'success',
    openPRs: 0,
    openIssues: 2,
    coverage: '89.5%',
  },
  {
    name: 'kkm-group/kkm-eaos-portal',
    descriptionEn: 'Enterprise AI Operating System & Multi-portal headless frontend (Next.js/React)',
    descriptionFa: 'پرتال یکپارچه سیستم عامل سازمانی هوش مصنوعی KKM (Next.js/React)',
    branch: 'main',
    latestCommit: 'feat(nav): unified drawer & 48px touch-target mobile optimization',
    commitAuthor: 'EAOS System',
    commitTime: 'Just now',
    ciStatus: 'success',
    openPRs: 1,
    openIssues: 0,
    coverage: '96.1%',
  },
];

const PATENT_PIPELINE: PatentPipelineItem[] = [
  {
    id: 'pat-01',
    patentTitleEn: 'Closed-Loop Coaxial Subsurface Geothermal Exergy Harvesting Network',
    patentTitleFa: 'شبکه مداربسته کواکسیال بازیافت انرژی اگزرژی زمین‌گرمایی اعماق',
    docketNumber: 'KKM-IP-2024-001',
    filingType: 'PCT',
    jurisdiction: 'WIPO / Global PCT (PCT/IB2024/059421)',
    stage: 'International Search (ISA)',
    examinerDeadline: '2026-11-15',
    leadInventor: 'KKM Core Engineering',
    legalCounsel: 'Zatajam & Global IP Partners',
    statusColor: 'text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20',
    claimsCount: 28,
  },
  {
    id: 'pat-02',
    patentTitleEn: 'High-Pressure Stabilized Nano-Engineered Dielectric Heat Transfer Fluid',
    patentTitleFa: 'سیال نانومهندسی تبادل حرارتی پایدارشده در فشارهای لیتواستاتیک بالا',
    docketNumber: 'KKM-IP-2024-002',
    filingType: 'US_PATENT',
    jurisdiction: 'USPTO (US 18/456,892)',
    stage: 'Granted',
    leadInventor: 'Dr. S. Kiani',
    legalCounsel: 'US Patent Bar Specialist',
    statusColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    claimsCount: 34,
  },
  {
    id: 'pat-03',
    patentTitleEn: 'Edge-Constrained Neural Dispatch Optimizer for Multi-Energy Islanded Grids',
    patentTitleFa: 'بهینه‌ساز عصبی مقید لبه برای ریزشبکه‌های ایزوله چندحاملی',
    docketNumber: 'KKM-IP-2024-003',
    filingType: 'NATIONAL',
    jurisdiction: 'National Registry & WIPO Priority Escrow',
    stage: 'Priority Filed',
    examinerDeadline: '2026-12-01',
    leadInventor: 'A. Soleimani',
    legalCounsel: 'KKM Legal Directorate',
    statusColor: 'text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20',
    claimsCount: 19,
  },
  {
    id: 'pat-04',
    patentTitleEn: 'Thermally Cascaded Vacuum Evaporation for High-Salinity Energy Well Co-generation',
    patentTitleFa: 'تبخیر تحت خلأ آبشار حرارتی جهت هم‌تولیدی آب شیرین از چاه‌های انرژی شور',
    docketNumber: 'KKM-IP-2024-004',
    filingType: 'PCT',
    jurisdiction: 'WIPO / GCC Regional (PCT/IB2024/061204)',
    stage: 'Office Action Response',
    examinerDeadline: '2026-10-30',
    leadInventor: 'H. Zatajam',
    legalCounsel: 'GCC IP Bureau',
    statusColor: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20',
    claimsCount: 22,
  },
];

const COHORT_PROJECTS: CohortProject[] = [
  {
    id: 'proj-sarakhs-pilot',
    nameEn: 'Sarakhs Rural Closed-Loop Geothermal & Microgrid Pilot',
    nameFa: 'پایلوت زمین‌گرمایی مداربسته و ریزشبکه روستایی سرخس',
    stage: 'Phase 2: Downhole Casing & Skid Coupling',
    trl: 'TRL 7',
    assignedLead: 'K. Karami / Eng. Team (4 Staff)',
    activeSprint: 'Sprint 28 · Exchanger Assembly',
    completionRate: 74,
    criticalPathItem: 'Surface skid pressure hydro-test (350 bar certification)',
    nextMilestoneDeadline: '2026-10-24',
  },
  {
    id: 'proj-qeshm-desal',
    nameEn: 'Qeshm Island GMEL-Desal Co-generation Demonstration Unit',
    nameFa: 'واحد پایلوت هم‌تولیدی آب شیرین و توان GMEL-Desal در قشم',
    stage: 'Phase 1: Multi-Effect Vacuum Column Fabrication',
    trl: 'TRL 6',
    assignedLead: 'H. Zatajam / Water Lab (3 Staff)',
    activeSprint: 'Sprint 14 · Evaporator Tray Seal',
    completionRate: 58,
    criticalPathItem: 'Titanium plate exchanger delivery & corrosion test',
    nextMilestoneDeadline: '2026-11-05',
  },
  {
    id: 'proj-edo-ai-deployment',
    nameEn: 'EDO-AI Commercial Edge Deployment on Rural Feeder 3',
    nameFa: 'پیاده‌سازی تجاری کنترلر لبه EDO-AI روی فیدر ۳ روستایی',
    stage: 'Phase 3: Grid Interconnection Commissioning',
    trl: 'TRL 8',
    assignedLead: 'A. Soleimani / AI Lab (3 Staff)',
    activeSprint: 'Sprint 09 · SCADA Protocol Gateway',
    completionRate: 88,
    criticalPathItem: 'DNP3/Modbus telemetry compliance test with regional grid',
    nextMilestoneDeadline: '2026-10-18',
  },
];

export const TeamOperationsConsole: React.FC = () => {
  const { isFa, direction } = useLanguage();
  const { userProfile } = useAuth();
  const [activeSection, setActiveSection] = useState<'projects' | 'github' | 'patents'>('projects');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <div className="w-full space-y-6 text-start" dir={direction}>
      {/* Header Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>OPERATIONAL COHORT DASHBOARD</span>
            <span>&bull;</span>
            <span>15-20 MANAGEMENT & ENG MEMBERS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-black">
            {isFa ? 'میز کار عملیات اجرایی، نظارت بر گیت‌هاب و مدیریت پتنت‌ها' : 'Cohort Operations: Project Tracking, GitHub & IP Oversight'}
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            {isFa 
              ? 'داشبورد متمرکز و بدون بار اضافی برای تیم ۱۵ تا ۲۰ نفره مدیران و مهندسان ارشد KKM با دسترسی سریع به وضعیت پروژه‌ها، مخازن کد و فرآیند ثبت اختراعات.'
              : 'Streamlined, high-speed workstation stripped of mass-consumer bloat, tailored for rapid project tracking, GitHub repository health, and active patent docketing.'}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <button
            type="button"
            onClick={handleRefresh}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1.5 text-xs font-bold min-h-[44px]"
            title={isFa ? 'بروزرسانی داده‌ها' : 'Refresh data'}
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
            <span>{isFa ? 'همگام‌سازی' : 'Sync'}</span>
          </button>
        </div>
      </div>

      {/* Segmented Control Bar */}
      <div className="flex items-center gap-1 p-1 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs">
        <button
          type="button"
          onClick={() => setActiveSection('projects')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 min-h-[48px] active:scale-[0.98] ${
            activeSection === 'projects'
              ? 'bg-primary text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>{isFa ? 'پیگیری چابک پروژه‌ها' : 'Rapid Project Tracking'}</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20">3</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('github')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 min-h-[48px] active:scale-[0.98] ${
            activeSection === 'github'
              ? 'bg-primary text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <FolderGit2 className="w-4 h-4" />
          <span>{isFa ? 'نظارت بر مخازن گیت‌هاب' : 'GitHub Repository Oversight'}</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20">4</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('patents')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 min-h-[48px] active:scale-[0.98] ${
            activeSection === 'patents'
              ? 'bg-primary text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>{isFa ? 'پایپ‌لاین مدیریت پتنت‌ها' : 'Patent Management Docket'}</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20">4</span>
        </button>
      </div>

      {/* SECTION 1: RAPID PROJECT TRACKING */}
      {activeSection === 'projects' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {COHORT_PROJECTS.map((proj) => (
              <div
                key={proj.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-mono font-bold text-primary dark:text-secondary">{proj.trl}</span>
                    <span className="font-mono text-slate-400 text-[11px]">Due: {proj.nextMilestoneDeadline}</span>
                  </div>

                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
                    {isFa ? proj.nameFa : proj.nameEn}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {proj.stage}
                  </p>

                  <div className="mt-3 text-xs">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">مسئول اجرایی / تیم:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{proj.assignedLead}</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                      <span className="text-slate-500">{proj.activeSprint}</span>
                      <span className="font-bold text-slate-900 dark:text-white">{proj.completionRate}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${proj.completionRate}%` }}
                      />
                    </div>
                  </div>

                  {/* Critical Path Item */}
                  <div className="mt-3.5 p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-xs">
                    <span className="block text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase">
                      {isFa ? 'آیتم مسیر بحرانی (Critical Path):' : 'Critical Path Block:'}
                    </span>
                    <p className="text-slate-800 dark:text-slate-200 text-[11px] mt-0.5">
                      {proj.criticalPathItem}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">Sprint Review: Mon</span>
                  <span className="font-bold text-primary dark:text-secondary">Active Sprint</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: GITHUB REPOSITORY OVERSIGHT */}
      {activeSection === 'github' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <FolderGit2 className="w-5 h-5 text-slate-800 dark:text-slate-200" />
              <div>
                <span className="font-bold text-slate-900 dark:text-white">GitHub Organization: @kkm-group</span>
                <span className="text-slate-500 block text-[11px]">Active Continuous Integration & Semantic Release Pipelines</span>
              </div>
            </div>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              All 4 Builds Passing
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {GITHUB_REPOSITORIES.map((repo) => (
              <div
                key={repo.name}
                className="p-5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-mono font-bold text-slate-900 dark:text-white truncate">
                      {repo.name}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                      CI: {repo.ciStatus}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                    {isFa ? repo.descriptionFa : repo.descriptionEn}
                  </p>

                  <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 font-mono text-xs">
                    <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
                      <span className="flex items-center gap-1">
                        <GitBranch className="w-3 h-3" />
                        {repo.branch}
                      </span>
                      <span>{repo.commitTime}</span>
                    </div>
                    <div className="text-slate-800 dark:text-slate-200 truncate font-semibold">
                      {repo.latestCommit}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">
                      Author: {repo.commitAuthor} &bull; Coverage: <span className="text-emerald-600 dark:text-emerald-400 font-bold">{repo.coverage}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3 text-slate-500">
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <GitPullRequest className="w-3.5 h-3.5" />
                      {repo.openPRs} PRs
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {repo.openIssues} Issues
                    </span>
                  </div>

                  <span className="text-[11px] font-bold text-primary dark:text-secondary">
                    GitHub Enterprise Synced
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: PATENT MANAGEMENT PIPELINE */}
      {activeSection === 'patents' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-start text-xs whitespace-nowrap">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-4">{isFa ? 'عنوان پرونده و شناسه' : 'Patent Title & Docket'}</th>
                    <th className="p-4">{isFa ? 'مرجع ثبت و شماره' : 'Jurisdiction'}</th>
                    <th className="p-4">{isFa ? 'مرحله دادرسی' : 'Pipeline Stage'}</th>
                    <th className="p-4">{isFa ? 'مخترع مسئول' : 'Lead Inventor'}</th>
                    <th className="p-4">{isFa ? 'مهلت اقدام بعدی' : 'Next Legal Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {PATENT_PIPELINE.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-slate-900 dark:text-white max-w-sm truncate">
                          {isFa ? item.patentTitleFa : item.patentTitleEn}
                        </div>
                        <div className="font-mono text-[10px] text-slate-400 mt-0.5">
                          {item.docketNumber} &bull; {item.claimsCount} Claims Drafted
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                          {item.jurisdiction}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold border ${item.statusColor}`}>
                          <ShieldCheck className="w-3.5 h-3.5" />
                          {item.stage}
                        </span>
                      </td>
                      <td className="p-4 text-slate-700 dark:text-slate-300">
                        {item.leadInventor}
                      </td>
                      <td className="p-4 font-mono text-[11px]">
                        {item.examinerDeadline ? (
                          <span className="text-amber-600 dark:text-amber-400 font-bold">
                            {item.examinerDeadline}
                          </span>
                        ) : (
                          <span className="text-slate-400">Docket Secured</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
