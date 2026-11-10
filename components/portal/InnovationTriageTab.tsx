import * as React from 'react';
import { 
  Sparkles, 
  Search, 
  Filter, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  ChevronRight, 
  ExternalLink, 
  BookOpen, 
  Lock, 
  Award,
  Layers,
  Building,
  User,
  Phone,
  Mail,
  Send,
  Eye,
  RefreshCw
} from 'lucide-react';
import { useLanguage } from '../../LanguageContext';
import type { InnovationProposal, ProposalStatus } from '../../backend/innovationTriageService';

export const InnovationTriageTab: React.FC = () => {
  const { isFa } = useLanguage();
  const [proposals, setProposals] = React.useState<InnovationProposal[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [selectedDomain, setSelectedDomain] = React.useState<string>('all');
  const [selectedStatus, setSelectedStatus] = React.useState<string>('all');
  const [selectedProposal, setSelectedProposal] = React.useState<InnovationProposal | null>(null);
  const [actionLoading, setActionLoading] = React.useState<boolean>(false);
  const [newStatus, setNewStatus] = React.useState<ProposalStatus>('COMMITTEE_REVIEW');
  const [evaluatorNotes, setEvaluatorNotes] = React.useState<string>('');
  const [committeeScore, setCommitteeScore] = React.useState<number>(85);
  const [actionFeedback, setActionFeedback] = React.useState<string | null>(null);

  const fetchProposals = React.useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/innovation/proposals');
      if (res.ok) {
        const data = await res.json();
        if (data.proposals) {
          setProposals(data.proposals);
          if (!selectedProposal && data.proposals.length > 0) {
            setSelectedProposal(data.proposals[0]);
          }
        }
      }
    } catch (err) {
      console.error('Failed to fetch proposals:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedProposal]);

  React.useEffect(() => {
    fetchProposals();
  }, [fetchProposals]);

  const handleUpdateStatus = async () => {
    if (!selectedProposal) return;
    try {
      setActionLoading(true);
      setActionFeedback(null);
      const res = await fetch(`/api/innovation/proposals/${selectedProposal.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          evaluatorNotes: evaluatorNotes || selectedProposal.evaluatorNotes,
          committeeScore
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.proposal) {
          setSelectedProposal(data.proposal);
          setProposals(prev => prev.map(p => p.id === data.proposal.id ? data.proposal : p));
          setActionFeedback(isFa ? 'وضعیت پرونده نوآوری با موفقیت به‌روزرسانی شد.' : 'Proposal status updated successfully.');
          setTimeout(() => setActionFeedback(null), 4000);
        }
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setActionLoading(false);
    }
  };

  const filteredProposals = proposals.filter(p => {
    const matchesSearch = 
      p.trackingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.submitterOrg.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.submitterName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDomain = selectedDomain === 'all' || p.domain === selectedDomain;
    const matchesStatus = selectedStatus === 'all' || p.status === selectedStatus;

    return matchesSearch && matchesDomain && matchesStatus;
  });

  const domains = Array.from(new Set(proposals.map(p => p.domain)));

  // KPI calculations
  const totalCount = proposals.length;
  const avgNovelty = totalCount > 0 
    ? Math.round(proposals.reduce((sum, p) => sum + (p.noveltyReport?.noveltyScore || 0), 0) / totalCount)
    : 0;
  const underNdaCount = proposals.filter(p => p.status === 'FEASIBILITY_NDA').length;
  const acceptedCount = proposals.filter(p => p.status === 'ACCEPTED_INCUBATION').length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-slate-700/80 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 end-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-400/30">
              <Sparkles className="w-3.5 h-3.5 text-sky-300 animate-pulse" />
              <span>{isFa ? 'سامانه تریاژ هوشمند ایده‌ها و تطبیق پتنت KKM (EAOS v3.4)' : 'AI Innovation Triage & Patent Match Engine'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold">
              {isFa ? 'کارتابل تریاژ و ارزیابی نوآوری باز گروه KKM' : 'KKM Innovation Triage & Novelty Cartable'}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              {isFa 
                ? 'پایپ‌لاین خودکار ارزیابی پروپوزال‌های فناورانه، مقایسه متن با سبد اختراعات ثبتی مهندس ژینو ایوبیان و مراجع علمی معتبر جهت تدوین گزارش تازگی (Novelty Report).'
                : 'Automated evaluation pipeline assessing inbound technical proposals against KKM patent portfolios and scientific literature benchmarks.'}
            </p>
          </div>

          <button 
            onClick={fetchProposals}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-bold text-white transition-colors flex items-center gap-2 self-start md:self-auto cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>{isFa ? 'تازه‌سازی کارتابل' : 'Refresh Cartable'}</span>
          </button>
        </div>

        {/* Metric Badges Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10">
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <span className="text-xs text-slate-400 block">{isFa ? 'کل پروپوزال‌ها' : 'Total Proposals'}</span>
            <span className="text-2xl font-bold font-mono text-white mt-1 block">{totalCount}</span>
          </div>
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <span className="text-xs text-slate-400 block">{isFa ? 'میانگین شاخص تازگی' : 'Avg Novelty Score'}</span>
            <span className="text-2xl font-bold font-mono text-sky-400 mt-1 block">{avgNovelty}%</span>
          </div>
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <span className="text-xs text-slate-400 block">{isFa ? 'در مرحله NDA و شبیه‌سازی' : 'Under NDA Staging'}</span>
            <span className="text-2xl font-bold font-mono text-amber-400 mt-1 block">{underNdaCount}</span>
          </div>
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <span className="text-xs text-slate-400 block">{isFa ? 'پذیرش در شتاب‌دهنده' : 'Incubation Cohort'}</span>
            <span className="text-2xl font-bold font-mono text-emerald-400 mt-1 block">{acceptedCount}</span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Proposals List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Search & Filters */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute top-3 start-3" />
              <input 
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={isFa ? 'جستجو بر اساس کد رهگیری، عنوان یا دانشگاه...' : 'Search by tracking ID, title, org...'}
                className="w-full ps-9 pe-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <select 
                value={selectedDomain}
                onChange={e => setSelectedDomain(e.target.value)}
                className="w-full py-1.5 px-2.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
              >
                <option value="all">{isFa ? 'تمام حوزه‌ها' : 'All Domains'}</option>
                {domains.map(d => <option key={d} value={d}>{d}</option>)}
              </select>

              <select 
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value)}
                className="w-full py-1.5 px-2.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
              >
                <option value="all">{isFa ? 'تمام وضعیت‌ها' : 'All Statuses'}</option>
                <option value="AI_TRIAGED">{isFa ? 'تریاژ هوش مصنوعی' : 'AI Triaged'}</option>
                <option value="COMMITTEE_REVIEW">{isFa ? 'در حال داوری کمیته' : 'Committee Review'}</option>
                <option value="FEASIBILITY_NDA">{isFa ? 'مذاکره NDA' : 'NDA Feasibility'}</option>
                <option value="ACCEPTED_INCUBATION">{isFa ? 'پذیرش نهایی' : 'Accepted'}</option>
              </select>
            </div>
          </div>

          {/* Proposals List Items */}
          <div className="space-y-3">
            {filteredProposals.map(prop => {
              const isSelected = selectedProposal?.id === prop.id;
              const novelty = prop.noveltyReport?.noveltyScore || 0;

              return (
                <div 
                  key={prop.id}
                  onClick={() => setSelectedProposal(prop)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-primary/5 dark:bg-primary/10 border-primary shadow-md' 
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-900 font-mono text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      {prop.trackingId}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400">
                        {novelty}% {isFa ? 'تازگی' : 'Novelty'}
                      </span>
                      <span className={`w-2 h-2 rounded-full ${
                        novelty >= 90 ? 'bg-emerald-500' : novelty >= 80 ? 'bg-amber-500' : 'bg-slate-400'
                      }`} />
                    </div>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 mb-1.5">
                    {prop.title}
                  </h4>

                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700/60">
                    <span className="truncate max-w-[200px]">{prop.submitterOrg}</span>
                    <span className="font-mono text-[11px]">{prop.submissionDate.split('T')[0]}</span>
                  </div>
                </div>
              );
            })}

            {filteredProposals.length === 0 && !loading && (
              <div className="p-8 text-center bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-500">
                {isFa ? 'پروپوزالی منطبق بر معیارهای جستجو یافت نشد.' : 'No proposals found matching criteria.'}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Detailed Proposal & AI Novelty Report (7 cols) */}
        <div className="lg:col-span-7">
          {selectedProposal ? (
            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-sm space-y-8">
              {/* Proposal Header */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 font-mono font-bold text-xs border border-sky-200 dark:border-sky-800">
                      {selectedProposal.trackingId}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold">
                      {selectedProposal.domain}
                    </span>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    selectedProposal.status === 'ACCEPTED_INCUBATION'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : selectedProposal.status === 'FEASIBILITY_NDA'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                      : 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300'
                  }`}>
                    {isFa ? selectedProposal.statusLabelFa : selectedProposal.statusLabelEn}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white leading-snug">
                  {selectedProposal.title}
                </h3>

                <div className="grid sm:grid-cols-2 gap-3 text-xs bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <User className="w-4 h-4 text-primary" />
                    <span>{selectedProposal.submitterName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <Building className="w-4 h-4 text-primary" />
                    <span className="truncate">{selectedProposal.submitterOrg}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <Mail className="w-4 h-4 text-primary" />
                    <span>{selectedProposal.submitterEmail}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <Layers className="w-4 h-4 text-primary" />
                    <span>{selectedProposal.declaredTrl}</span>
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    {isFa ? 'خلاصه فنی پروپوزال (Technical Abstract)' : 'Technical Abstract'}
                  </h5>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700/80">
                    {selectedProposal.abstract}
                  </p>
                </div>
              </div>

              {/* AI Novelty & Prior-Art Report Section */}
              <div className="rounded-2xl bg-gradient-to-br from-sky-50 via-indigo-50/30 to-white dark:from-slate-900 dark:via-indigo-950/20 dark:to-slate-900 p-6 border border-sky-200 dark:border-sky-900/50 space-y-6">
                <div className="flex items-center justify-between border-b border-sky-100 dark:border-slate-800 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-md">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {isFa ? 'گزارش تازگی و تریاژ هوش مصنوعی (AI Novelty & Prior-Art Report)' : 'AI Novelty & Prior-Art Report'}
                      </h4>
                      <span className="text-[11px] font-mono text-slate-500">
                        Engine: {selectedProposal.noveltyReport?.triageEngineVersion || 'EAOS-v3.4'}
                      </span>
                    </div>
                  </div>

                  <div className="text-end">
                    <span className="text-2xl font-bold font-mono text-sky-600 dark:text-sky-400">
                      {selectedProposal.noveltyReport?.noveltyScore}%
                    </span>
                    <span className="block text-[10px] text-slate-400 uppercase font-mono">{isFa ? 'شاخص نوآوری' : 'Novelty Index'}</span>
                  </div>
                </div>

                {/* Overlap & Recommendation Cards */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700">
                    <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                      {isFa ? 'ریسک تعارض یا پتانسیل هم‌افزایی با پتنت‌های KKM' : 'Patent Overlap & FTO Classification'}
                    </span>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                        {selectedProposal.noveltyReport?.patentOverlapRisk === 'Synergistic' ? (isFa ? 'هم‌افزا با سبد اختراعات KKM (Synergistic)' : 'Synergistic with KKM Portfolio') : selectedProposal.noveltyReport?.patentOverlapRisk}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700">
                    <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                      {isFa ? 'توصیه موتور هوش مصنوعی به کمیته' : 'Engine Recommendation'}
                    </span>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-500" />
                      <span className="text-sm font-bold text-amber-700 dark:text-amber-300 font-mono">
                        {selectedProposal.noveltyReport?.committeeRecommendation}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Matched KKM Patents */}
                {selectedProposal.noveltyReport?.matchedKkmPatents && selectedProposal.noveltyReport.matchedKkmPatents.length > 0 && (
                  <div className="space-y-2.5">
                    <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-primary" />
                      <span>{isFa ? 'پتنت‌های مرتبط ثبت‌شده گروه KKM (Prior Art Match)' : 'Matched KKM Patents'}</span>
                    </h5>
                    <div className="space-y-2">
                      {selectedProposal.noveltyReport.matchedKkmPatents.map((pat, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5">
                          <div className="flex items-center justify-between font-mono font-bold text-[11px]">
                            <span className="text-primary dark:text-secondary">{pat.patentId}</span>
                            <span className="text-slate-500">{pat.overlapType}</span>
                          </div>
                          <p className="font-semibold text-slate-800 dark:text-slate-200">
                            {isFa ? pat.titleFa : pat.titleEn}
                          </p>
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                            {isFa ? pat.notesFa : pat.notesEn}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Strengths & Risk Factors */}
                <div className="grid sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-2 bg-emerald-50/50 dark:bg-emerald-950/20 p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-800/40">
                    <span className="font-bold text-emerald-800 dark:text-emerald-300 block">
                      {isFa ? 'نقاط قوت و ارزش‌افزوده فنی' : 'Key Technical Strengths'}
                    </span>
                    <ul className="space-y-1 text-slate-700 dark:text-slate-300 text-[11px]">
                      {(isFa ? selectedProposal.noveltyReport?.keyStrengthsFa : selectedProposal.noveltyReport?.keyStrengthsEn)?.map((s, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 bg-amber-50/50 dark:bg-amber-950/20 p-3.5 rounded-xl border border-amber-200 dark:border-amber-800/40">
                    <span className="font-bold text-amber-800 dark:text-amber-300 block">
                      {isFa ? 'ریسک‌ها و نیازمندی‌های صحه‌گذاری' : 'Risks & Validation Hurdles'}
                    </span>
                    <ul className="space-y-1 text-slate-700 dark:text-slate-300 text-[11px]">
                      {(isFa ? selectedProposal.noveltyReport?.riskFactorsFa : selectedProposal.noveltyReport?.riskFactorsEn)?.map((r, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <AlertCircle className="w-3 h-3 text-amber-500 mt-0.5 flex-shrink-0" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Committee Actions & Review Panel */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {isFa ? 'اقدامات کارتابل داوری کمیته نوآوری KKM' : 'Innovation Committee Evaluation Action'}
                  </h4>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {isFa ? 'تغییر وضعیت مرحله ارزیابی' : 'Update Review Stage'}
                    </label>
                    <select
                      value={newStatus}
                      onChange={e => setNewStatus(e.target.value as ProposalStatus)}
                      className="w-full py-2 px-3 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    >
                      <option value="COMMITTEE_REVIEW">{isFa ? 'در حال ارزیابی کمیته تخصصی' : 'Under Committee Review'}</option>
                      <option value="FEASIBILITY_NDA">{isFa ? 'امکان‌سنجی اولیه و مذاکره NDA' : 'Feasibility & NDA Staging'}</option>
                      <option value="ACCEPTED_INCUBATION">{isFa ? 'پذیرش نهایی در شتاب‌دهنده / سرمایه‌گذاری' : 'Accepted for Incubation / JV'}</option>
                      <option value="REJECTED">{isFa ? 'عدم پذیرش / مختومه' : 'Close / Rejected'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {isFa ? 'امتیاز ممیزی کمیته (۰ تا ۱۰۰)' : 'Committee Audit Score (0-100)'}
                    </label>
                    <input 
                      type="number"
                      min={0}
                      max={100}
                      value={committeeScore}
                      onChange={e => setCommitteeScore(Number(e.target.value))}
                      className="w-full py-2 px-3 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {isFa ? 'یادداشت ارزیابی کارگروه (جهت ثبت در کارتابل و رهگیری متقاضی)' : 'Evaluator Notes (Recorded in audit trail)'}
                  </label>
                  <textarea 
                    rows={3}
                    value={evaluatorNotes}
                    onChange={e => setEvaluatorNotes(e.target.value)}
                    placeholder={isFa ? 'نظرات داوران در خصوص تناسب با خط مشی مهندسی KKM و مراحل بعدی...' : 'Enter committee notes and directive...'}
                    className="w-full p-3 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {actionFeedback && (
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>{actionFeedback}</span>
                  </div>
                )}

                <button
                  onClick={handleUpdateStatus}
                  disabled={actionLoading}
                  className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{actionLoading ? (isFa ? 'در حال ثبت...' : 'Updating...') : (isFa ? 'ثبت تصمیم کمیته و به‌روزرسانی کد رهگیری' : 'Submit Decision & Update Tracking')}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-16 text-center bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 text-slate-500">
              {isFa ? 'لطفاً یک پروپوزال را از ستون کناری جهت مشاهده گزارش تریاژ انتخاب فرمایید.' : 'Select a proposal to view its AI Novelty Report.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
