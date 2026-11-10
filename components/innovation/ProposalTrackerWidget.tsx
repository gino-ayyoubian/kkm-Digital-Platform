import * as React from 'react';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  ArrowRight, 
  AlertCircle,
  Copy,
  Check,
  Calendar,
  Lock
} from 'lucide-react';
import { useLanguage } from '../../LanguageContext';

export interface TrackingData {
  found: boolean;
  trackingId?: string;
  title?: string;
  domain?: string;
  submissionDate?: string;
  status?: string;
  statusLabelFa?: string;
  statusLabelEn?: string;
  currentStep?: number;
  timeline?: {
    step: number;
    titleFa: string;
    titleEn: string;
    date: string;
    completed: boolean;
    current: boolean;
    descriptionFa: string;
    descriptionEn: string;
  }[];
  noveltyScore?: number;
  estimatedCompletionDate?: string;
  summaryNotesFa?: string;
  summaryNotesEn?: string;
}

export const ProposalTrackerWidget: React.FC<{ initialTrackingId?: string }> = ({ initialTrackingId }) => {
  const { isFa } = useLanguage();
  const [trackingIdInput, setTrackingIdInput] = React.useState<string>(initialTrackingId || '');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [trackingResult, setTrackingResult] = React.useState<TrackingData | null>(null);
  const [searchError, setSearchError] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState<boolean>(false);

  const handleTrack = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanId = trackingIdInput.trim();
    if (!cleanId) return;

    try {
      setLoading(true);
      setSearchError(null);
      const res = await fetch(`/api/innovation/track/${encodeURIComponent(cleanId)}`);
      const json = await res.json();

      if (res.ok && json.data) {
        setTrackingResult(json.data);
      } else {
        setTrackingResult(null);
        setSearchError(
          isFa 
            ? (json.error || 'پروپوزالی با این کد رهگیری یافت نشد. لطفاً ساختار کد (مثلاً KKM-INN-2026-7842) را بازبینی فرمایید.')
            : (json.errorEn || 'Proposal not found with specified tracking ID.')
        );
      }
    } catch (err) {
      setSearchError(isFa ? 'خطا در برقراری ارتباط با سرور پیگیری.' : 'Network error querying tracking status.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (initialTrackingId) {
      handleTrack();
    }
  }, [initialTrackingId]);

  const handleCopy = () => {
    if (trackingResult?.trackingId) {
      navigator.clipboard.writeText(trackingResult.trackingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div id="proposal-tracker" className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-lg">
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 mb-3">
          <Clock className="w-3.5 h-3.5" />
          <span>{isFa ? 'سامانه استعلام و پیگیری برخط پروپوزال‌های نوآوری' : 'Online Innovation Proposal Tracker'}</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
          {isFa ? 'پیگیری زنده وضعیت ارزیابی طرح شما' : 'Track Your Proposal Evaluation Status'}
        </h3>
        <p className="mt-2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
          {isFa 
            ? 'متقاضیان، اساتید دانشگاه و شرکت‌های دانش‌بنیان می‌توانند با وارد کردن کد رهگیری یکتا، آخرین وضعیت بررسی در کمیته نوآوری، گزارش تریاژ و گام بعدی را بدون نیاز به تماس تلفنی مشاهده نمایند.'
            : 'Enter your unique Tracking ID to inspect real-time evaluation milestones, AI triage progress, and committee directives.'}
        </p>
      </div>

      {/* Input Search Form */}
      <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3 max-w-2xl mb-8">
        <div className="relative flex-grow">
          <Search className="w-5 h-5 text-slate-400 absolute top-3.5 start-4" />
          <input 
            type="text"
            value={trackingIdInput}
            onChange={e => setTrackingIdInput(e.target.value)}
            placeholder={isFa ? 'کد رهگیری را وارد کنید (مثال: KKM-INN-2026-7842)' : 'Enter tracking code (e.g. KKM-INN-2026-7842)'}
            className="w-full ps-11 pe-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary uppercase"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !trackingIdInput.trim()}
          className="px-6 py-3 rounded-2xl bg-primary hover:bg-primary-dark text-white text-xs sm:text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>{isFa ? 'استعلام وضعیت' : 'Check Status'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </>
          )}
        </button>
      </form>

      {/* Quick Demo Code Pills */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-8">
        <span>{isFa ? 'کدهای نمونه جهت بررسی:' : 'Quick sample tracking codes:'}</span>
        {['KKM-INN-2026-7842', 'KKM-INN-2026-9104', 'KKM-INN-2026-3205'].map(code => (
          <button
            key={code}
            type="button"
            onClick={() => {
              setTrackingIdInput(code);
              const cleanId = code.trim();
              fetch(`/api/innovation/track/${cleanId}`)
                .then(r => r.json())
                .then(res => { if (res.data) setTrackingResult(res.data); });
            }}
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[11px] font-mono text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
          >
            {code}
          </button>
        ))}
      </div>

      {searchError && (
        <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-800 dark:text-red-300 flex items-center gap-2.5 mb-8">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{searchError}</span>
        </div>
      )}

      {/* Tracking Results Card */}
      {trackingResult && trackingResult.found && (
        <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 p-6 sm:p-8 space-y-8 animate-fadeIn">
          {/* Status Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <span className="text-sm font-mono font-bold text-primary dark:text-secondary">
                  {trackingResult.trackingId}
                </span>
                <button 
                  onClick={handleCopy}
                  className="p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  title={isFa ? 'کپی کد رهگیری' : 'Copy code'}
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <span className="text-xs px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                  {trackingResult.domain}
                </span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {trackingResult.title}
              </h4>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300 border border-sky-300/40">
                {isFa ? trackingResult.statusLabelFa : trackingResult.statusLabelEn}
              </span>
              {trackingResult.noveltyScore && (
                <div className="text-end px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
                  <span className="font-mono font-bold text-sky-500 text-sm block">{trackingResult.noveltyScore}%</span>
                  <span className="text-[10px] text-slate-400">{isFa ? 'شاخص تازگی' : 'Novelty Score'}</span>
                </div>
              )}
            </div>
          </div>

          {/* Multi-Step Timeline */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">
              {isFa ? 'مراحل گردش کار و ارزیابی در کمیته تخصصی KKM' : 'Evaluation Milestones & Workflow Progress'}
            </h5>

            <div className="relative space-y-6 sm:space-y-8 before:absolute before:inset-0 before:start-4 sm:before:start-5 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
              {trackingResult.timeline?.map(step => (
                <div key={step.step} className="relative flex items-start gap-4 sm:gap-6">
                  {/* Step Marker */}
                  <div className={`relative z-10 flex items-center justify-center w-8 sm:w-10 h-8 sm:h-10 rounded-full text-xs font-bold font-mono transition-all ${
                    step.completed 
                      ? 'bg-emerald-500 text-white shadow-md' 
                      : step.current 
                      ? 'bg-primary text-white ring-4 ring-primary/20 animate-pulse' 
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                  }`}>
                    {step.completed ? <Check className="w-4 h-4" /> : step.step}
                  </div>

                  {/* Step Content Card */}
                  <div className={`flex-grow p-4 rounded-2xl border transition-all ${
                    step.current 
                      ? 'bg-white dark:bg-slate-900 border-primary/50 shadow-md' 
                      : 'bg-white/60 dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-700/60'
                  }`}>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <h6 className="text-sm font-bold text-slate-900 dark:text-white">
                        {isFa ? step.titleFa : step.titleEn}
                      </h6>
                      <span className="text-[11px] font-mono text-slate-400">
                        {step.date}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {isFa ? step.descriptionFa : step.descriptionEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Committee Summary Notes */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>{isFa ? 'یادداشت راهبردی دبیرخانه کمیته نوآوری KKM:' : 'KKM Innovation Secretariat Public Directive:'}</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed ps-6">
              {isFa ? trackingResult.summaryNotesFa : trackingResult.summaryNotesEn}
            </p>
            <div className="ps-6 pt-1 text-[11px] text-slate-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{isFa ? 'زمان‌بندی برآوردی مرحله بعدی:' : 'Estimated completion horizon:'} {trackingResult.estimatedCompletionDate}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
