import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  Layers, 
  FileText, 
  Copy, 
  Check, 
  ArrowRight,
  Lock
} from 'lucide-react';
import { useLanguage } from '../../LanguageContext';

export interface InnovationProposalIntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessTrackingId?: (trackingId: string) => void;
}

export const InnovationProposalIntakeModal: React.FC<InnovationProposalIntakeModalProps> = ({
  isOpen,
  onClose,
  onSuccessTrackingId
}) => {
  const { isFa } = useLanguage();
  const [formData, setFormData] = React.useState({
    title: '',
    domain: 'Energy & Geothermal Systems',
    submitterName: '',
    submitterOrg: '',
    submitterEmail: '',
    submitterPhone: '',
    declaredTrl: 'TRL-4 (آزمایش در محیط آزمایشگاهی / Lab Validation)',
    abstract: '',
    ndaAgreed: true,
    _gotcha: ''
  });

  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [issuedTrackingId, setIssuedTrackingId] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState<boolean>(false);

  const resetForm = () => {
    setFormData({
      title: '',
      domain: 'Energy & Geothermal Systems',
      submitterName: '',
      submitterOrg: '',
      submitterEmail: '',
      submitterPhone: '',
      declaredTrl: 'TRL-4 (آزمایش در محیط آزمایشگاهی / Lab Validation)',
      abstract: '',
      ndaAgreed: true,
      _gotcha: ''
    });
    setIssuedTrackingId(null);
    setError(null);
    setCopied(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData._gotcha) return; // Honeypot spam defense

    if (!formData.title.trim() || !formData.submitterName.trim() || !formData.submitterEmail.trim() || !formData.abstract.trim()) {
      setError(isFa ? 'لطفاً تمامی فیلدهای ستاره‌دار الزامی را تکمیل فرمایید.' : 'Please fill all required fields.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch('/api/innovation/proposals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const json = await res.json();
      if (res.ok && json.trackingId) {
        setIssuedTrackingId(json.trackingId);
        if (onSuccessTrackingId) {
          onSuccessTrackingId(json.trackingId);
        }
      } else {
        setError(json.error || (isFa ? 'خطا در ثبت پروپوزال' : 'Failed to submit proposal'));
      }
    } catch (err) {
      setError(isFa ? 'خطا در اتصال به سرور پذیرش پروپوزال' : 'Network error during submission.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (issuedTrackingId) {
      navigator.clipboard.writeText(issuedTrackingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8"
        >
          {/* Header Strip */}
          <div className="flex items-center justify-between p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5 text-accent-yellow" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-display font-bold text-slate-900 dark:text-white">
                  {isFa ? 'ثبت طرح و پروپوزال در مرکز نوآوری باز KKM' : 'Submit Innovation Proposal to KKM Hub'}
                </h3>
                <span className="text-xs text-slate-500 font-mono">
                  EAOS Protocol • Bilateral Preliminary NDA
                </span>
              </div>
            </div>

            <button 
              onClick={handleClose}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {issuedTrackingId ? (
              /* Success & Tracking Screen */
              <div className="text-center space-y-6 py-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h4 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white">
                    {isFa ? 'پروپوزال شما با موفقیت ثبت گردید' : 'Proposal Successfully Logged'}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                    {isFa
                      ? 'کد پیگیری اختصاصی زیر برای طرح شما صادر شد. فرآیند ارزیابی هوش مصنوعی و انطباق با سبد اختراعات KKM آغاز گردیده است.'
                      : 'Your unique Tracking ID has been issued. Automated AI novelty evaluation and KKM patent cross-matching is now initiated.'}
                  </p>
                </div>

                {/* Tracking ID Badge Box */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-primary/40 max-w-md mx-auto flex items-center justify-between gap-3">
                  <div className="text-start">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      {isFa ? 'کد رهگیری رسمی KKM' : 'Official Tracking ID'}
                    </span>
                    <span className="text-lg sm:text-xl font-mono font-bold text-primary dark:text-secondary tracking-wider">
                      {issuedTrackingId}
                    </span>
                  </div>

                  <button
                    onClick={handleCopy}
                    className="px-4 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-500" />
                        <span>{isFa ? 'کپی شد' : 'Copied'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-slate-400" />
                        <span>{isFa ? 'کپی کد' : 'Copy'}</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-xs text-sky-800 dark:text-sky-300 leading-relaxed text-start max-w-md mx-auto flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 flex-shrink-0 text-sky-500 mt-0.5" />
                  <div>
                    <span className="font-bold block mb-1">
                      {isFa ? 'راهنمای مرحله بعدی و عدم نیاز به پیگیری تلفنی:' : 'Next Step & Communication Protocol:'}
                    </span>
                    <span>
                      {isFa
                        ? 'می‌توانید هر لحظه وضعیت پرونده خود را در ویجت پیگیری صفحه مرکز نوآوری بررسی کنید. نتیجه داوری اولیه ظرف ۷ الی ۱۰ روز کاری در همین سامانه درج خواهد شد.'
                        : 'Track review progress anytime via the Innovation Hub tracker widget. Initial committee determination will be posted within 7-10 business days.'}
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={handleClose}
                    className="px-8 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer shadow-md"
                  >
                    {isFa ? 'مشاهده در ویجت پیگیری' : 'View in Tracker Widget'}
                  </button>
                </div>
              </div>
            ) : (
              /* Input Form */
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot field for anti-spam */}
                <input 
                  type="text" 
                  name="_gotcha" 
                  value={formData._gotcha} 
                  onChange={e => setFormData({ ...formData, _gotcha: e.target.value })} 
                  className="hidden" 
                  tabIndex={-1} 
                  autoComplete="off" 
                />

                {/* Proposal Title */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    {isFa ? 'عنوان طرح یا ایده فناورانه *' : 'Proposal / Technology Title *'}
                  </label>
                  <input 
                    type="text"
                    required
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    placeholder={isFa ? 'مثال: سامانه نانوسیالات مغناطیسی جهت بهبود انتقال حرارت در چرخه‌های ORC' : 'e.g. Magnetic Nanofluids for High-Enthalpy Geothermal ORC Heat Exchangers'}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Domain & Declared TRL */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      {isFa ? 'حوزه تخصصی KKM *' : 'Technology Domain *'}
                    </label>
                    <select
                      value={formData.domain}
                      onChange={e => setFormData({ ...formData, domain: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                    >
                      <option value="Energy & Geothermal Systems">{isFa ? 'انرژی و سامانه‌های زمین‌گرمایی (GMEL)' : 'Energy & Geothermal Systems'}</option>
                      <option value="Water & Closed Cycles">{isFa ? 'آب و چرخه‌های بسته / نمک‌زدایی ZLD' : 'Water & Closed Cycles (ZLD Desalination)'}</option>
                      <option value="Advanced Materials & Sensors">{isFa ? 'مواد پیشرفته، نانوسیالات و سنسورها' : 'Advanced Materials & Sensors'}</option>
                      <option value="AI & Digital Twins">{isFa ? 'هوش مصنوعی و دوقلوهای دیجیتال (PINN)' : 'AI & Digital Twins'}</option>
                      <option value="Resilient Infrastructure">{isFa ? 'زیرساخت‌های مقاوم اقلیمی' : 'Resilient Infrastructure'}</option>
                      <option value="Rural Microgrids & Value Chains">{isFa ? 'ریزشبکه‌های پاک روستایی' : 'Rural Microgrids & Value Chains'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      {isFa ? 'سطح آمادگی فناوری خوداظهاری (TRL) *' : 'Declared TRL Level *'}
                    </label>
                    <select
                      value={formData.declaredTrl}
                      onChange={e => setFormData({ ...formData, declaredTrl: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                    >
                      <option value="TRL-3 (اثبات مفهومی / Proof of Concept)">TRL-3 (اثبات مفهومی / Proof of Concept)</option>
                      <option value="TRL-4 (آزمایشگاهی / Lab Validation)">TRL-4 (آزمایشگاهی / Lab Validation)</option>
                      <option value="TRL-5 (شبیه‌سازی محیط عملیاتی / Relevant Env)">TRL-5 (شبیه‌سازی محیط عملیاتی / Relevant Env)</option>
                      <option value="TRL-6 (پیش‌نمونه پایلوت / Prototype Demonstration)">TRL-6 (پیش‌نمونه پایلوت / Prototype Demo)</option>
                      <option value="TRL-7 (سیستم عملیاتی واقعی / Operational Validation)">TRL-7 (سیستم عملیاتی واقعی / Operational)</option>
                    </select>
                  </div>
                </div>

                {/* Submitter Info */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      {isFa ? 'نام و نام‌خانوادگی مسئول طرح *' : 'Lead Innovator / Submitter Name *'}
                    </label>
                    <input 
                      type="text"
                      required
                      value={formData.submitterName}
                      onChange={e => setFormData({ ...formData, submitterName: e.target.value })}
                      placeholder={isFa ? 'مثال: دکتر علیرضا ناصری' : 'e.g. Dr. Alireza Naseri'}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      {isFa ? 'دانشگاه، پژوهشگاه یا شرکت دانش‌بنیان *' : 'Affiliation / Institution *'}
                    </label>
                    <input 
                      type="text"
                      required
                      value={formData.submitterOrg}
                      onChange={e => setFormData({ ...formData, submitterOrg: e.target.value })}
                      placeholder={isFa ? 'مثال: دانشکده مهندسی مکانیک دانشگاه صنعتی' : 'e.g. Faculty of Mechanical Engineering'}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      {isFa ? 'ایمیل رسمی جهت مکاتبات *' : 'Corporate / Academic Email *'}
                    </label>
                    <input 
                      type="email"
                      required
                      value={formData.submitterEmail}
                      onChange={e => setFormData({ ...formData, submitterEmail: e.target.value })}
                      placeholder="innovator@university.ac.ir"
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      {isFa ? 'تلفن تماس مستقیم متقاضی' : 'Contact Phone'}
                    </label>
                    <input 
                      type="tel"
                      value={formData.submitterPhone}
                      onChange={e => setFormData({ ...formData, submitterPhone: e.target.value })}
                      placeholder="+98912..."
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Technical Abstract */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    {isFa ? 'چکیده فنی غیرمحرمانه طرح (حداکثر ۵۰۰ کلمه) *' : 'Non-Confidential Technical Abstract *'}
                  </label>
                  <textarea 
                    required
                    rows={4}
                    value={formData.abstract}
                    onChange={e => setFormData({ ...formData, abstract: e.target.value })}
                    placeholder={isFa ? 'شرح مبانی علمی، نوآوری کلیدی، نتایج آزمون‌های تجربی و نحوه انطباق با نیازمندی‌های صنعتی KKM...' : 'Summarize theoretical novelty, empirical test results, and alignment with KKM infrastructure...'}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary leading-relaxed"
                  />
                </div>

                {/* NDA & IP Checkbox */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
                  <input 
                    type="checkbox"
                    id="ndaCheckbox"
                    required
                    checked={formData.ndaAgreed}
                    onChange={e => setFormData({ ...formData, ndaAgreed: e.target.checked })}
                    className="mt-1 rounded text-primary focus:ring-primary"
                  />
                  <label htmlFor="ndaCheckbox" className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed cursor-pointer">
                    {isFa ? (
                      <span>
                        تأیید می‌نمایم که اطلاعات ارسالی در این مرحله <strong>غیرمحرمانه</strong> بوده و این ارسال ایجاد تعهد مالکیت فکری برای KKM نمی‌نماید. در صورت پذیرش اولیه، تبادل داده‌های تفصیلی منحصراً ذیل <strong>توافق‌نامه رسمی محرمانگی (NDA)</strong> صورت خواهد پذیرفت.
                      </span>
                    ) : (
                      <span>
                        I confirm this initial submission is <strong>non-confidential</strong>. In case of positive triage, detailed schematics will be exchanged under formal bilateral NDA.
                      </span>
                    )}
                  </label>
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300">
                    {error}
                  </div>
                )}

                {/* Submit Buttons */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    {isFa ? 'انصراف' : 'Cancel'}
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{isFa ? 'ثبت نهایی و دریافت کد رهگیری' : 'Submit & Generate Tracking ID'}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
