import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, 
  ShieldCheck, 
  KeyRound, 
  Mail, 
  Building2, 
  FileText, 
  Eye, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  Layers, 
  FileCheck,
  Sparkles,
  LogOut,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import PageHeader from '../components/PageHeader';
import type { PartnerDataRoomDossier } from '../backend/innovationTriageService';

export const PartnerDataRoomPage: React.FC = () => {
  const { isFa } = useLanguage();

  // Authentication State
  const [sessionToken, setSessionToken] = React.useState<string | null>(() => {
    return sessionStorage.getItem('kkm_data_room_token');
  });

  // Step state: 'OTP_REQUEST' | 'OTP_VERIFY' | 'NDA_SIGN' | 'EXPLORER'
  const [step, setStep] = React.useState<'OTP_REQUEST' | 'OTP_VERIFY' | 'NDA_SIGN' | 'EXPLORER'>('OTP_REQUEST');

  // Form inputs
  const [email, setEmail] = React.useState<string>('');
  const [organization, setOrganization] = React.useState<string>('');
  const [otp, setOtp] = React.useState<string>('');
  const [demoOtpHint, setDemoOtpHint] = React.useState<string | null>(null);
  const [signerName, setSignerName] = React.useState<string>('');
  const [signerTitle, setSignerTitle] = React.useState<string>('مدیر سرمایه‌گذاری / ارزیاب ارشد فنی');
  const [ndaAgreed, setNdaAgreed] = React.useState<boolean>(false);

  // Data Room Content
  const [dossiers, setDossiers] = React.useState<PartnerDataRoomDossier[]>([]);
  const [selectedDossier, setSelectedDossier] = React.useState<PartnerDataRoomDossier | null>(null);
  const [partnerInfo, setPartnerInfo] = React.useState<{ email?: string; org?: string; ndaSignedAt?: string }>({});
  const [categoryFilter, setCategoryFilter] = React.useState<string>('all');

  // Loading & error
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [auditLogs, setAuditLogs] = React.useState<string[]>([]);
  const [sessionTimeLeft, setSessionTimeLeft] = React.useState<number>(1800); // 30 mins

  // Load documents if token exists
  const loadDocuments = React.useCallback(async (token: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/data-room/documents?token=${encodeURIComponent(token)}`);
      const json = await res.json();

      if (res.ok && json.authorized) {
        setDossiers(json.dossiers || []);
        if (json.dossiers && json.dossiers.length > 0) {
          setSelectedDossier(json.dossiers[0]);
        }
        setPartnerInfo({
          email: json.partnerEmail,
          org: json.partnerOrg,
          ndaSignedAt: json.ndaSignedAt
        });
        setStep('EXPLORER');
        addAuditLog(`دسترسی تایید شد. مدارک محرمانه سطح ۲ برای ${json.partnerOrg} بارگذاری گردید.`);
      } else if (res.status === 403) {
        // Needs NDA sign
        setStep('NDA_SIGN');
      } else {
        sessionStorage.removeItem('kkm_data_room_token');
        setSessionToken(null);
        setStep('OTP_REQUEST');
      }
    } catch (err) {
      setError(isFa ? 'خطا در بارگذاری مدارک اتاق داده' : 'Error loading data room dossiers.');
    } finally {
      setLoading(false);
    }
  }, [isFa]);

  React.useEffect(() => {
    if (sessionToken) {
      loadDocuments(sessionToken);
    }
  }, [sessionToken, loadDocuments]);

  // Session timer countdown
  React.useEffect(() => {
    if (step === 'EXPLORER') {
      const interval = setInterval(() => {
        setSessionTimeLeft(prev => {
          if (prev <= 1) {
            handleLogout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step]);

  const addAuditLog = (msg: string) => {
    const time = new Date().toLocaleTimeString('fa-IR');
    setAuditLogs(prev => [`[${time}] ${msg}`, ...prev.slice(0, 9)]);
  };

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !organization.trim()) {
      setError(isFa ? 'ایمیل سازمانی و نام شرکت/صندوق الزامی است.' : 'Email and organization are required.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/data-room/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, organization })
      });
      const json = await res.json();
      if (res.ok && json.success) {
        if (json.demoOtp) {
          setDemoOtpHint(json.demoOtp);
        }
        setStep('OTP_VERIFY');
      } else {
        setError(json.error || 'خطا در صدور کد تایید');
      }
    } catch {
      setError(isFa ? 'خطای شبکه' : 'Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/data-room/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      const json = await res.json();
      if (res.ok && json.success && json.token) {
        sessionStorage.setItem('kkm_data_room_token', json.token);
        setSessionToken(json.token);
        setStep('NDA_SIGN');
        addAuditLog(`کد تایید OTP با موفقیت احراز شد. ورود به مرحله امضای تعهدنامه NDA.`);
      } else {
        setError(json.error || (isFa ? 'کد تایید نامعتبر است.' : 'Invalid OTP code.'));
      }
    } catch {
      setError(isFa ? 'خطای شبکه' : 'Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleSignNda = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionToken || !signerName.trim() || !ndaAgreed) {
      setError(isFa ? 'لطفاً نام امضاکننده را وارد کرده و توافق‌نامه را تایید نمایید.' : 'Please sign and accept NDA terms.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/data-room/accept-nda', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: sessionToken,
          signerName,
          title: signerTitle
        })
      });
      const json = await res.json();
      if (res.ok && json.success) {
        addAuditLog(`توافق‌نامه محرمانگی دوجانبه توسط ${signerName} (${signerTitle}) امضا شد.`);
        loadDocuments(sessionToken);
      } else {
        setError(json.error || 'خطا در ثبت NDA');
      }
    } catch {
      setError(isFa ? 'خطای شبکه' : 'Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('kkm_data_room_token');
    setSessionToken(null);
    setStep('OTP_REQUEST');
    setDossiers([]);
    setSelectedDossier(null);
    setOtp('');
    setDemoOtpHint(null);
  };

  const filteredDossiers = dossiers.filter(d => {
    return categoryFilter === 'all' || d.category === categoryFilter;
  });

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <PageHeader 
        title={isFa ? 'اتاق داده امن شرکا و سرمایه‌گذاران (Tier 2 Data Room)' : 'Tier 2 Partner Data Room'} 
        subtitle={isFa ? 'محیط فوق‌امنیتی دسترسی به اسناد ممیزی، تله‌متری پایلوت‌ها و مدل‌های مالی تحت توافق‌نامه محرمانگی دیجیتال (NDA)' : 'Confidential repository of detailed engineering blueprints, pilot telemetry logs & financial models'}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {step !== 'EXPLORER' ? (
          /* Authentication & NDA Signing Card */
          <div className="max-w-xl mx-auto bg-slate-800/90 rounded-3xl border border-slate-700 p-8 sm:p-10 shadow-2xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-700/80 pb-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shadow-inner">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
                  EAOS Tier-2 Gated Access
                </span>
                <h3 className="text-xl font-display font-bold text-white">
                  {step === 'OTP_REQUEST' && (isFa ? 'احراز هویت اولیه شریک تجاری' : 'Partner Identification')}
                  {step === 'OTP_VERIFY' && (isFa ? 'ورود رمز یک‌بارمصرف (OTP)' : 'Enter One-Time Password')}
                  {step === 'NDA_SIGN' && (isFa ? 'انعقاد توافق‌نامه محرمانگی دیجیتال (NDA)' : 'Digital NDA Execution')}
                </h3>
              </div>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-800 text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Step 1: Request OTP */}
            {step === 'OTP_REQUEST' && (
              <form onSubmit={handleRequestOtp} className="space-y-4">
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isFa 
                    ? 'دسترسی به داده‌های سطح ۲ منحصراً ویژه شرکت‌های مهندسی همکار، مشاوران بین‌المللی و صندوق‌های سرمایه‌گذاری تاییدصلاحیت‌شده است.'
                    : 'Tier 2 access is strictly restricted to verified corporate EPC contractors and accredited institutional investors.'}
                </p>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {isFa ? 'ایمیل سازمانی معتبر *' : 'Corporate Email Address *'}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute top-3 start-3" />
                    <input 
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="investor@cleanenergy-fund.com"
                      className="w-full ps-9 pe-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {isFa ? 'نام سازمان / هلدینگ / صندوق سرمایه‌گذاری *' : 'Organization / Fund Name *'}
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute top-3 start-3" />
                    <input 
                      type="text"
                      required
                      value={organization}
                      onChange={e => setOrganization(e.target.value)}
                      placeholder={isFa ? 'مثال: صندوق سرمایه‌گذاری زیرساخت‌های نوین' : 'e.g. Clean Infrastructure Partners'}
                      className="w-full ps-9 pe-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>{loading ? (isFa ? 'در حال صدور رمز...' : 'Requesting OTP...') : (isFa ? 'درخواست رمز یک‌بارمصرف (OTP)' : 'Request Access OTP')}</span>
                </button>
              </form>
            )}

            {/* Step 2: Verify OTP */}
            {step === 'OTP_VERIFY' && (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isFa
                    ? `کد تایید ۶ رقمی به آدرس ${email} ارسال شد (اعتبار: ۱۰ دقیقه).`
                    : `6-digit security code dispatched to ${email}.`}
                </p>

                {demoOtpHint && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-center justify-between">
                    <span>{isFa ? 'کد تایید شبیه‌ساز امن (Sandbox):' : 'Sandbox Demo OTP:'}</span>
                    <span className="font-mono font-bold tracking-widest text-sm text-white bg-slate-900 px-2 py-0.5 rounded">
                      {demoOtpHint}
                    </span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {isFa ? 'رمز یک‌بارمصرف (OTP) *' : 'One-Time Password *'}
                  </label>
                  <input 
                    type="text"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    placeholder="749201"
                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-center font-mono text-lg font-bold text-amber-400 tracking-widest focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep('OTP_REQUEST')}
                    className="w-1/3 py-2.5 rounded-xl border border-slate-700 text-xs font-bold text-slate-400 hover:bg-slate-700 transition-colors"
                  >
                    {isFa ? 'بازگشت' : 'Back'}
                  </button>
                  <button
                    type="submit"
                    disabled={loading || otp.length < 6}
                    className="w-2/3 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>{loading ? (isFa ? 'در حال بررسی...' : 'Verifying...') : (isFa ? 'تایید و ادامه' : 'Verify & Continue')}</span>
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Digital NDA Execution */}
            {step === 'NDA_SIGN' && (
              <form onSubmit={handleSignNda} className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs space-y-2 max-h-48 overflow-y-auto font-mono text-slate-300 leading-relaxed">
                  <span className="font-bold text-white block text-sm border-b border-slate-800 pb-1">
                    KKM BILATERAL MUTUAL NON-DISCLOSURE AGREEMENT (SCHEDULE D - EAOS)
                  </span>
                  <p>
                    این توافق‌نامه میان گروه بین‌المللی کیمیا کاران ماد (KKM) و شریک تجاری منعقد می‌گردد. کلیه اسناد فنی، داده‌های تله‌متری چاه‌های عمیق GMEL، مدل‌های مالی و ادعانامه‌های اختراع محرمانه تلقی شده و هرگونه دانلود، تکثیر، عکس‌برداری یا انتقال به اشخاص ثالث پیگرد قانونی بین‌المللی دارد.
                  </p>
                  <p>
                    تمامی اسناد با واتر‌مارک نام شریک، آدرس IP و شناسه زمانی علامت‌گذاری می‌شوند.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {isFa ? 'نام و نام‌خانوادگی امضاکننده مجاز *' : 'Authorized Signatory Full Name *'}
                  </label>
                  <input 
                    type="text"
                    required
                    value={signerName}
                    onChange={e => setSignerName(e.target.value)}
                    placeholder={isFa ? 'مثال: مهندس کامران باقری' : 'e.g. Kamran Bagheri'}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {isFa ? 'سمت سازمانی امضاکننده *' : 'Signatory Corporate Title *'}
                  </label>
                  <input 
                    type="text"
                    required
                    value={signerTitle}
                    onChange={e => setSignerTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs">
                  <input 
                    type="checkbox"
                    id="ndaAgree"
                    required
                    checked={ndaAgreed}
                    onChange={e => setNdaAgreed(e.target.checked)}
                    className="mt-0.5 rounded text-amber-500 focus:ring-amber-400"
                  />
                  <label htmlFor="ndaAgree" className="text-slate-300 leading-relaxed cursor-pointer">
                    {isFa
                      ? 'مفاد توافق‌نامه محرمانگی دوجانبه فوق را مطالعه نموده و متعهد به حفظ اسرار فنی می‌باشم.'
                      : 'I hereby accept and digitally execute the KKM Bilateral Mutual NDA.'}
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading || !ndaAgreed || !signerName.trim()}
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>{loading ? (isFa ? 'در حال ثبت امضا...' : 'Executing NDA...') : (isFa ? 'امضای دیجیتال و ورود به اتاق داده' : 'Sign NDA & Unlock Data Room')}</span>
                </button>
              </form>
            )}
          </div>
        ) : (
          /* Step 4: Tier-2 Watermarked Data Room Explorer */
          <div className="space-y-8 animate-fadeIn">
            {/* Control Strip & Partner Badge */}
            <div className="rounded-2xl bg-slate-800 border border-slate-700 p-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-emerald-400 font-bold block">
                    {isFa ? 'احراز هویت شده تحت توافق‌نامه NDA' : 'Authenticated under Bilateral NDA'}
                  </span>
                  <span className="text-sm font-bold text-white">
                    {partnerInfo.org} ({partnerInfo.email})
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>{isFa ? 'اعتبار نشست:' : 'Session Timeout:'} {formatTimer(sessionTimeLeft)}</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{isFa ? 'خروج امن' : 'Lock Session'}</span>
                </button>
              </div>
            </div>

            {/* Main Data Room Grid */}
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Dossiers List (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
                    {isFa ? 'پرونده‌های ممیزی مهندسی (Tier 2)' : 'Confidential Dossiers'}
                  </h4>
                  <span className="text-xs font-mono text-slate-500">{filteredDossiers.length} Records</span>
                </div>

                <div className="space-y-3">
                  {filteredDossiers.map(dossier => {
                    const isSelected = selectedDossier?.id === dossier.id;

                    return (
                      <div
                        key={dossier.id}
                        onClick={() => {
                          setSelectedDossier(dossier);
                          addAuditLog(`مشاهده پرونده ${dossier.code} توسط ${partnerInfo.org}`);
                        }}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500/10 border-amber-500 shadow-md'
                            : 'bg-slate-800/80 border-slate-700 hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-2 font-mono text-[11px]">
                          <span className="text-amber-400 font-bold">{dossier.code}</span>
                          <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 text-[10px]">
                            {dossier.category}
                          </span>
                        </div>

                        <h5 className="text-sm font-bold text-white mb-2 leading-snug">
                          {isFa ? dossier.titleFa : dossier.titleEn}
                        </h5>

                        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-700/60 font-mono">
                          <span>{dossier.totalPages} Pages • {dossier.fileSize}</span>
                          <span className="text-amber-300/80">{dossier.date}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Watermarked Document Viewer (7 cols) */}
              <div className="lg:col-span-7">
                {selectedDossier ? (
                  <div className="relative bg-slate-800 rounded-3xl border border-slate-700 p-6 sm:p-8 space-y-6 shadow-xl overflow-hidden">
                    {/* Security Watermark Background Stamping */}
                    <div className="absolute inset-0 pointer-events-none select-none flex flex-col justify-between p-6 opacity-[0.04] rotate-[-12deg] scale-125 z-0 font-mono text-xs font-bold leading-relaxed overflow-hidden">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="whitespace-nowrap">
                          CONFIDENTIAL • KKM PARTNER DATA ROOM • {partnerInfo.org?.toUpperCase()} • {partnerInfo.email?.toUpperCase()} • DO NOT COPY •
                        </div>
                      ))}
                    </div>

                    {/* Viewer Content in Foreground */}
                    <div className="relative z-10 space-y-6">
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 pb-4">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 font-mono text-xs font-bold border border-amber-500/30">
                            {selectedDossier.classification}
                          </span>
                          <span className="text-xs font-mono text-slate-400">{selectedDossier.code}</span>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                          <ShieldAlert className="w-4 h-4 text-amber-400" />
                          <span>{isFa ? 'حفاظت‌شده در برابر دانلود مستقیم' : 'Download Protected'}</span>
                        </div>
                      </div>

                      <h3 className="text-lg sm:text-xl font-display font-bold text-white leading-snug">
                        {isFa ? selectedDossier.titleFa : selectedDossier.titleEn}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-700/60">
                        {isFa ? selectedDossier.descriptionFa : selectedDossier.descriptionEn}
                      </p>

                      {/* Key Engineering Metrics Strip */}
                      <div>
                        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                          {isFa ? 'شاخص‌های کلیدی ممیزی فنی و عملکردی' : 'Audited Empirical Performance Metrics'}
                        </h5>
                        <div className="grid grid-cols-2 gap-3">
                          {selectedDossier.keyMetrics.map((metric, i) => (
                            <div key={i} className="p-3.5 rounded-xl bg-slate-900 border border-slate-700/80">
                              <span className="text-[11px] text-slate-400 block mb-1">
                                {isFa ? metric.labelFa : metric.labelEn}
                              </span>
                              <span className="text-base sm:text-lg font-bold font-mono text-amber-400">
                                {metric.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Excerpt Telemetry Box */}
                      <div className="space-y-2">
                        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          {isFa ? 'گزیده محتوای فنی پرونده' : 'Technical Dossier Excerpt'}
                        </h5>
                        <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed border border-slate-800">
                          {isFa ? selectedDossier.contentExcerptFa : selectedDossier.contentExcerptEn}
                        </div>
                      </div>

                      {/* Security Warning Notice */}
                      <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2.5">
                        <Lock className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span>
                          {isFa
                            ? 'این سند حاوی حقوق معنوی اختصاصی گروه KKM است. جلسه حضوری بررسی کامل دیاگرام‌های تفصیلی CAD/BIM با هماهنگی دبیرخانه قابل برگزاری است.'
                            : 'This dossier constitutes trade secrets of KKM. Full CAD/BIM models can be viewed in an on-premise review session.'}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Access Audit Trail Log (Security Requirement) */}
            <div className="rounded-2xl bg-slate-950 border border-slate-800 p-5 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
                <span className="font-bold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  {isFa ? 'لاگ زنده ممیزی دسترسی به اسناد اتاق داده (Audit Trail):' : 'Live Data Room Access Audit Trail:'}
                </span>
                <span className="text-[10px] text-slate-500">Tamper-Evident SHA-256</span>
              </div>
              <div className="space-y-1 text-slate-400 text-[11px] max-h-32 overflow-y-auto">
                {auditLogs.map((log, i) => (
                  <div key={i} className="text-emerald-400/80">{log}</div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerDataRoomPage;
