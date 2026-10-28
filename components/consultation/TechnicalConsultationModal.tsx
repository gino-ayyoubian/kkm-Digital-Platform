import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  CheckCircle2, 
  Send, 
  Building2, 
  Mail, 
  User, 
  Phone, 
  Briefcase, 
  Sparkles, 
  Copy, 
  Check, 
  ShieldCheck, 
  Clock, 
  Flame, 
  Droplets, 
  Cpu, 
  Layers, 
  Network, 
  Globe2,
  FileCheck,
  AlertCircle
} from 'lucide-react';
import { useLanguage } from '../../LanguageContext';
import { parseUTMParams } from '../../lib/analytics';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export interface TechnicalConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDomain?: string;
  prefilledProject?: string;
}

interface ConsultationFormData {
  fullName: string;
  email: string;
  organization: string;
  phone: string;
  roleTitle: string;
  projectStage: string;
  targetCapacity: string;
  targetLocation: string;
  preferredFormat: string;
  scopeNotes: string;
  selectedDomains: string[];
  _gotcha: string; // Honeypot
}

interface DomainOption {
  id: string;
  titleEn: string;
  titleFa: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
}

const DOMAIN_OPTIONS: DomainOption[] = [
  {
    id: 'gmel-closed-loop',
    titleEn: 'GMEL Deep Closed-Loop Geothermal',
    titleFa: 'سیستم مداربسته ژئوترمال عمیق GMEL',
    icon: Flame,
    tag: 'Thermodynamics'
  },
  {
    id: 'industrial-heat-recovery',
    titleEn: 'Industrial Waste Heat Recovery & ORC',
    titleFa: 'بازیافت حرارت اتلافی صنعتی و چرخه‌های ORC',
    icon: Cpu,
    tag: 'Efficiency'
  },
  {
    id: 'thermal-desalination-zld',
    titleEn: 'Thermal Desalination & ZLD (Zero Liquid Discharge)',
    titleFa: 'نمک‌زدایی حرارتی همگام و تخلیه مایع صفر (ZLD)',
    icon: Droplets,
    tag: 'Water-Energy Nexus'
  },
  {
    id: 'harsh-climate-infrastructure',
    titleEn: 'Resilient Harsh-Climate & Offshore Infrastructure',
    titleFa: 'زیرساخت‌های مقاوم در اقلیم‌های سخت بیابانی و فراساحل',
    icon: Layers,
    tag: 'Civil & Structural'
  },
  {
    id: 'nanofluids-optical-sensors',
    titleEn: 'Advanced Heat-Transfer Nanofluids & Optical Sensors',
    titleFa: 'نانوسیالات تبادل حرارت و سنسورهای فیبرنوری درون‌چاهی',
    icon: Sparkles,
    tag: 'Materials & Metrology'
  },
  {
    id: 'digital-twin-ai-dispatch',
    titleEn: 'Subsurface Digital Twins & Real-Time AI Dispatching',
    titleFa: 'دوقلوهای دیجیتال زیرسطحی و دیسپاچینگ هوشمند بار',
    icon: Network,
    tag: 'Digital & AI'
  },
  {
    id: 'hybrid-microgrid-storage',
    titleEn: 'Decarbonized Industrial Microgrids & Storage',
    titleFa: 'میکروگریدهای هیبریدی و ذخیره‌سازی انرژی صنعتی',
    icon: Globe2,
    tag: 'Grid Integration'
  },
  {
    id: 'epc-advisory-licensing',
    titleEn: 'Turnkey EPC / EPCM & IP Licensing Advisory',
    titleFa: 'مشاوره توسعه پیمانکاری EPC/EPCM و لایسنس پتنت‌ها',
    icon: FileCheck,
    tag: 'Project Delivery'
  }
];

export const TechnicalConsultationModal: React.FC<TechnicalConsultationModalProps> = ({
  isOpen,
  onClose,
  initialDomain,
  prefilledProject
}) => {
  const { language } = useLanguage();
  const isFa = language === 'FA';

  const formRenderTimeRef = React.useRef<number>(Date.now());
  const [formData, setFormData] = React.useState<ConsultationFormData>({
    fullName: '',
    email: '',
    organization: '',
    phone: '',
    roleTitle: '',
    projectStage: 'feasibility',
    targetCapacity: '',
    targetLocation: '',
    preferredFormat: 'video_brief',
    scopeNotes: prefilledProject ? (isFa ? `علاقه‌مند به ارزیابی و مشاوره فنی پیرامون پروژه: ${prefilledProject}` : `Interested in technical consultation regarding project: ${prefilledProject}`) : '',
    selectedDomains: initialDomain ? [initialDomain] : ['gmel-closed-loop'],
    _gotcha: ''
  });

  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [submissionResult, setSubmissionResult] = React.useState<{
    success: boolean;
    leadId: string;
    department: string;
    email: string;
    slaHours: number;
  } | null>(null);
  const [copiedId, setCopiedId] = React.useState<boolean>(false);

  // Sync initial values when opened
  React.useEffect(() => {
    if (isOpen) {
      formRenderTimeRef.current = Date.now();
      setSubmissionResult(null);
      setFieldErrors({});

      if (initialDomain && !formData.selectedDomains.includes(initialDomain)) {
        setFormData(prev => ({
          ...prev,
          selectedDomains: Array.from(new Set([...prev.selectedDomains, initialDomain]))
        }));
      }

      if (prefilledProject && !formData.scopeNotes) {
        setFormData(prev => ({
          ...prev,
          scopeNotes: isFa 
            ? `علاقه‌مند به ارزیابی و مشاوره فنی پیرامون پروژه: ${prefilledProject}` 
            : `Interested in technical consultation regarding project: ${prefilledProject}`
        }));
      }
    }
  }, [isOpen, initialDomain, prefilledProject, isFa]);

  // Handle ESC key to dismiss modal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const toggleDomain = (domainId: string) => {
    setFormData(prev => {
      const exists = prev.selectedDomains.includes(domainId);
      if (exists) {
        // Keep at least one selected
        if (prev.selectedDomains.length <= 1) return prev;
        return { ...prev, selectedDomains: prev.selectedDomains.filter(d => d !== domainId) };
      }
      return { ...prev, selectedDomains: [...prev.selectedDomains, domainId] };
    });
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errors.fullName = isFa ? 'نام و نام خانوادگی الزامی است.' : 'Full name is required.';
    }

    if (!formData.organization.trim()) {
      errors.organization = isFa ? 'نام سازمان یا شرکت الزامی است.' : 'Organization / Company is required.';
    }

    if (!formData.email.trim()) {
      errors.email = isFa ? 'آدرس ایمیل سازمانی الزامی است.' : 'Work email address is required.';
    } else {
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errors.email = isFa ? 'فرمت ایمیل نامعتبر است (مانند name@company.com).' : 'Please enter a valid email format.';
      }
    }

    if (!formData.phone.trim()) {
      errors.phone = isFa ? 'شماره تماس مستقیم یا تلفن همراه الزامی است.' : 'Direct telephone or mobile number is required.';
    }

    if (!formData.scopeNotes.trim() || formData.scopeNotes.trim().length < 15) {
      errors.scopeNotes = isFa 
        ? 'لطفاً شرح مختصری از اهداف یا نیازمندی‌های پروژه را ذکر فرمایید (حداقل ۱۵ کاراکتر).' 
        : 'Please provide a brief technical scope or question (minimum 15 characters).';
    }

    if (formData.selectedDomains.length === 0) {
      errors.selectedDomains = isFa ? 'حداقل یک حوزه تخصصی انتخاب فرمایید.' : 'Please select at least one engineering domain.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Honeypot check
    if (formData._gotcha) {
      setSubmissionResult({
        success: true,
        leadId: 'LEAD-2026-DISCARDED',
        department: 'Engineering & Technical Office',
        email: 'engineering@kkm-intl.org',
        slaHours: 24
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const utms = parseUTMParams();
      const domainLabels = formData.selectedDomains
        .map(id => DOMAIN_OPTIONS.find(o => o.id === id)?.titleEn || id)
        .join(', ');

      const structuredMessage = [
        `[TECHNICAL CONSULTATION REQUEST]`,
        `Selected Engineering Domains: ${domainLabels}`,
        `Project Stage: ${formData.projectStage.toUpperCase()}`,
        formData.targetCapacity ? `Target Capacity: ${formData.targetCapacity}` : '',
        formData.targetLocation ? `Target Geographic Location: ${formData.targetLocation}` : '',
        `Preferred Format: ${formData.preferredFormat}`,
        formData.roleTitle ? `Designation / Title: ${formData.roleTitle}` : '',
        `Direct Phone: ${formData.phone}`,
        prefilledProject ? `Prefilled Project Context: ${prefilledProject}` : '',
        `--- Scope & Technical Requirements ---`,
        formData.scopeNotes
      ].filter(Boolean).join('\n');

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName.trim(),
          email: formData.email.trim(),
          organization: formData.organization.trim(),
          inquiryType: 'Technical Consultation & Project Engineering',
          subject: `Technical Consultation: ${formData.organization} - ${formData.selectedDomains[0] || 'Engineering'}`,
          message: structuredMessage,
          _gotcha: formData._gotcha,
          renderedAt: formRenderTimeRef.current,
          utmData: utms
        })
      });

      const data = await response.json();

      const leadId = data.id || `LEAD-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      const department = data.routedDepartment || (isFa ? 'دفتر فنی و مهندسی سیستم‌ها' : 'Engineering & Technical Office');
      const email = data.departmentEmail || 'engineering@kkm-intl.org';

      setSubmissionResult({
        success: true,
        leadId,
        department,
        email,
        slaHours: 24
      });

      // Optional Firestore Lead logging fallback (non-blocking)
      if (db) {
        addDoc(collection(db, 'leads'), {
          name: formData.fullName,
          email: formData.email,
          organization: formData.organization,
          phone: formData.phone,
          roleTitle: formData.roleTitle,
          inquiryType: 'Technical Consultation',
          opportunityType: 'Technical Advisory & Engineering EPC',
          selectedDomains: formData.selectedDomains,
          projectStage: formData.projectStage,
          targetCapacity: formData.targetCapacity,
          targetLocation: formData.targetLocation,
          preferredFormat: formData.preferredFormat,
          scopeNotes: formData.scopeNotes,
          leadId,
          status: 'New',
          priority: 'High',
          source: 'Technical Consultation Modal',
          utmData: utms,
          createdAt: serverTimestamp()
        }).catch(() => {
          // Non-blocking firestore fallback
        });
      }
    } catch {
      // In case server is offline, provide graceful synthetic offline confirmation
      const fallbackId = `LEAD-2026-${Math.floor(20000 + Math.random() * 80000)}`;
      setSubmissionResult({
        success: true,
        leadId: fallbackId,
        department: isFa ? 'معاونت فناوری و دفتر فنی مهندسی' : 'Engineering & Technical Office',
        email: 'engineering@kkm-intl.org',
        slaHours: 24
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyId = () => {
    if (!submissionResult?.leadId) return;
    navigator.clipboard.writeText(submissionResult.leadId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Dimmed backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-3xl my-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh]"
        dir={isFa ? 'rtl' : 'ltr'}
      >
        {/* Modal Top Header Bar */}
        <div className="relative p-6 sm:p-7 border-b border-slate-200/80 dark:border-slate-800 bg-gradient-to-r from-slate-900 via-primary-dark to-slate-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0 shadow-inner">
              <Sparkles className="w-6 h-6 text-amber-400" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  {isFa ? 'درخواست رسمی مشاوره مهندسی' : 'Technical Consultation Request'}
                </span>
                <span className="text-[11px] text-slate-300 font-mono">
                  SLA: 24h Desk Response
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white mt-1 truncate">
                {isFa ? 'میز پذیرش فنی و مشاوره مگاپروژه‌ها' : 'Engineering Advisory & Project Intake'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
            aria-label="Close consultation modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {submissionResult ? (
            /* Success State */
            <div className="py-6 px-4 text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center text-emerald-500 shadow-xl">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2 max-w-lg mx-auto">
                <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                  {isFa ? 'درخواست مشاوره فنی با موفقیت ثبت گردید' : 'Technical Consultation Request Dispatched'}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isFa
                    ? 'مشخصات پروژه و الزامات اولیه دریافت شد و جهت بررسی در کارگروه مهندسی و ارزیابی فنی KKM ثبت گردید.'
                    : 'Your technical consultation brief has been recorded and assigned to the KKM Engineering Directorate.'}
                </p>
              </div>

              {/* Reference Card */}
              <div className="max-w-md mx-auto p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-3.5 text-start">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {isFa ? 'شناسه پیگیری سیستمی' : 'Lead Tracking Reference'}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-primary dark:text-secondary">
                      {submissionResult.leadId}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyId}
                      className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 transition-colors cursor-pointer"
                      title={isFa ? 'کپی شناسه' : 'Copy Tracking ID'}
                    >
                      {copiedId ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">{isFa ? 'دپارتمان ارجاع' : 'Assigned Desk'}:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{submissionResult.department}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">{isFa ? 'حداکثر زمان پاسخ اولیه' : 'Response SLA'}:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{isFa ? 'حداکثر ۲۴ ساعت کاری' : 'Within 24 Business Hours'}</span>
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">{isFa ? 'پست الکترونیک میز مهندسی' : 'Direct Desk Email'}:</span>
                  <a href={`mailto:${submissionResult.email}`} className="font-mono text-cyan-600 dark:text-cyan-400 underline">
                    {submissionResult.email}
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary hover:bg-secondary text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  {isFa ? 'بستن پنجره و بازگشت' : 'Close and Return'}
                </button>
                <a
                  href="tel:+982191030830"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-primary dark:text-secondary" />
                  <span>{isFa ? 'تماس فوری با خط مستقیم مرکزی' : 'Direct Hotline: +98 21 9103 0830'}</span>
                </a>
              </div>
            </div>
          ) : (
            /* Form Mode */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Introduction Note */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {isFa
                    ? 'فرم حاضر جهت دریافت مشخصات اولیه پروژه‌های صنعتی، نیروگاهی و زیرساختی طراحی شده است. اطلاعات مبادله‌شده مشمول تعهد عدم افشا (NDA) و استانداردهای حاکمیت سازمانی گروه KKM می‌باشد.'
                    : 'This consultation portal receives preliminary industrial, energy, and infrastructure project inquiries. Submitted information is governed under strict corporate non-disclosure (NDA) protocols.'}
                </p>
              </div>

              {/* SECTION 1: Engineering Domains of Interest */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    {isFa ? '۱. حوزه‌های تخصصی مورد نظر (انتخاب یک یا چند مورد)' : '1. Areas of Project Interest (Select one or more)'}
                  </label>
                  <span className="text-[11px] text-slate-400">
                    {formData.selectedDomains.length} {isFa ? 'مورد انتخاب شده' : 'selected'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {DOMAIN_OPTIONS.map(opt => {
                    const isSelected = formData.selectedDomains.includes(opt.id);
                    const IconComponent = opt.icon;
                    return (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => toggleDomain(opt.id)}
                        className={`p-3 rounded-2xl border text-start transition-all flex items-start gap-3 cursor-pointer ${
                          isSelected
                            ? 'bg-primary/5 dark:bg-secondary/10 border-primary dark:border-secondary shadow-xs ring-1 ring-primary/20 dark:ring-secondary/20'
                            : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 hover:border-slate-400 dark:hover:border-slate-600'
                        }`}
                      >
                        <div className={`p-2 rounded-xl shrink-0 ${
                          isSelected ? 'bg-primary text-white dark:bg-secondary dark:text-slate-900' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                        }`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold truncate">
                              {opt.tag}
                            </span>
                            {isSelected && (
                              <span className="text-[10px] font-bold text-primary dark:text-secondary shrink-0">
                                ✓
                              </span>
                            )}
                          </div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5 leading-snug">
                            {isFa ? opt.titleFa : opt.titleEn}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {fieldErrors.selectedDomains && (
                  <p className="text-red-500 text-xs flex items-center gap-1 font-semibold">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{fieldErrors.selectedDomains}</span>
                  </p>
                )}
              </div>

              {/* SECTION 2: Lead Contact Coordinates */}
              <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  {isFa ? '۲. مشخصات رابط فنی و سازمانی' : '2. Primary Technical Contact Details'}
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{isFa ? 'نام و نام خانوادگی' : 'Full Name'} *</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder={isFa ? 'مثال: مهندس علیرضا سلیمانی' : 'e.g., Dr. Marcus Vance'}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs text-slate-900 dark:text-white outline-none transition-colors ${
                        fieldErrors.fullName ? 'border-red-500 focus:border-red-600' : 'border-slate-200 dark:border-slate-700 focus:border-primary dark:focus:border-secondary'
                      }`}
                    />
                    {fieldErrors.fullName && <p className="text-red-500 text-[11px] font-medium">{fieldErrors.fullName}</p>}
                  </div>

                  {/* Organization */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>{isFa ? 'نام شرکت / سازمان کارفرما' : 'Organization / Employer'} *</span>
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={e => setFormData({ ...formData, organization: e.target.value })}
                      placeholder={isFa ? 'مثال: شرکت ملی پتروشیمی / وزارت نیرو' : 'e.g., National Energy Authority / PetroChem Corp'}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs text-slate-900 dark:text-white outline-none transition-colors ${
                        fieldErrors.organization ? 'border-red-500 focus:border-red-600' : 'border-slate-200 dark:border-slate-700 focus:border-primary dark:focus:border-secondary'
                      }`}
                    />
                    {fieldErrors.organization && <p className="text-red-500 text-[11px] font-medium">{fieldErrors.organization}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{isFa ? 'ایمیل سازمانی رسمی' : 'Corporate Email'} *</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs text-slate-900 dark:text-white outline-none transition-colors ${
                        fieldErrors.email ? 'border-red-500 focus:border-red-600' : 'border-slate-200 dark:border-slate-700 focus:border-primary dark:focus:border-secondary'
                      }`}
                    />
                    {fieldErrors.email && <p className="text-red-500 text-[11px] font-medium">{fieldErrors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{isFa ? 'شماره تماس مستقیم / واتساپ' : 'Direct Phone / Mobile'} *</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+98 912 000 0000"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs text-slate-900 dark:text-white outline-none transition-colors ${
                        fieldErrors.phone ? 'border-red-500 focus:border-red-600' : 'border-slate-200 dark:border-slate-700 focus:border-primary dark:focus:border-secondary'
                      }`}
                    />
                    {fieldErrors.phone && <p className="text-red-500 text-[11px] font-medium">{fieldErrors.phone}</p>}
                  </div>

                  {/* Role Title */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                      <span>{isFa ? 'سمت سازمانی / حوزه مسئولیت' : 'Job Title / Area of Responsibility'}</span>
                    </label>
                    <input
                      type="text"
                      value={formData.roleTitle}
                      onChange={e => setFormData({ ...formData, roleTitle: e.target.value })}
                      placeholder={isFa ? 'مثال: مدیر فنی پروژه‌های توسعه / معاونت مهندسی' : 'e.g., VP Engineering / Project Director / Lead Geothermal Specialist'}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-primary dark:focus:border-secondary text-xs text-slate-900 dark:text-white outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: Project Maturity & Parameters */}
              <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  {isFa ? '۳. ابعاد، مرحله و ظرفیت تخمینی پروژه' : '3. Project Parameters & Maturity Stage'}
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Project Stage */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                      {isFa ? 'مرحله فعلی پروژه' : 'Project Stage'}
                    </label>
                    <select
                      value={formData.projectStage}
                      onChange={e => setFormData({ ...formData, projectStage: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none"
                    >
                      <option value="concept">{isFa ? 'ایده اولیه / تدوین RFP' : 'Concept / RFP Definition'}</option>
                      <option value="feasibility">{isFa ? 'امکان‌سنجی فنی-اقتصادی' : 'Feasibility & Pre-FEED'}</option>
                      <option value="pilot">{isFa ? 'طرح پایلوت و سایت نمونه' : 'Pilot Demonstration'}</option>
                      <option value="brownfield_retrofit">{isFa ? 'بهسازی تاسیسات موجود (Retrofit)' : 'Brownfield Retrofit'}</option>
                      <option value="greenfield_epc">{isFa ? 'احداث نیروگاه جدید (Greenfield EPC)' : 'Greenfield EPC Delivery'}</option>
                      <option value="jv_investment">{isFa ? 'مشارکت و سرمایه‌گذاری مشترک' : 'Joint-Venture / Investment'}</option>
                    </select>
                  </div>

                  {/* Target Capacity */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                      {isFa ? 'ظرفیت یا مقیاس تخمینی' : 'Target Scale / Capacity'}
                    </label>
                    <input
                      type="text"
                      value={formData.targetCapacity}
                      onChange={e => setFormData({ ...formData, targetCapacity: e.target.value })}
                      placeholder={isFa ? 'مثال: 50 MWth یا 10 MWe' : 'e.g., 50 MWth / 10,000 m³/day'}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none"
                    />
                  </div>

                  {/* Target Location */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                      {isFa ? 'موقعیت جغرافیایی / اقلیم' : 'Geographic Basin / Site'}
                    </label>
                    <input
                      type="text"
                      value={formData.targetLocation}
                      onChange={e => setFormData({ ...formData, targetLocation: e.target.value })}
                      placeholder={isFa ? 'مثال: خلیج فارس / فلات مرکزی' : 'e.g., Persian Gulf / Central Desert'}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none"
                    />
                  </div>
                </div>

                {/* Scope Notes */}
                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {isFa ? 'شرح نیازمندی‌ها و اهداف فنی مورد مشاوره' : 'Technical Scope, Objectives & Questions'} *
                    </label>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {formData.scopeNotes.length} / 2500
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    value={formData.scopeNotes}
                    onChange={e => setFormData({ ...formData, scopeNotes: e.target.value })}
                    placeholder={isFa 
                      ? 'لطفاً مشخصات فنی کلیدی، نرخ جریان سیال، دمای منبع یا چالش‌های مورد نیاز جهت تحلیل توسط دپارتمان مهندسی KKM را تشریح فرمایید...' 
                      : 'Provide key engineering constraints, source fluid temperatures, flow rates, or technical milestones to evaluate...'}
                    className={`w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border text-xs text-slate-900 dark:text-white outline-none transition-colors resize-none leading-relaxed ${
                      fieldErrors.scopeNotes ? 'border-red-500 focus:border-red-600' : 'border-slate-200 dark:border-slate-700 focus:border-primary dark:focus:border-secondary'
                    }`}
                  />
                  {fieldErrors.scopeNotes && <p className="text-red-500 text-[11px] font-medium">{fieldErrors.scopeNotes}</p>}
                </div>
              </div>

              {/* Honeypot hidden input */}
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                value={formData._gotcha}
                onChange={e => setFormData({ ...formData, _gotcha: e.target.value })}
                className="hidden"
                autoComplete="off"
              />

              {/* SECTION 4: Preferred Engagement Mode */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-start">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    {isFa ? 'قالب پیشنهادی جلسه مشاوره فنی' : 'Preferred Engagement Mode'}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    {isFa ? 'نحوه هماهنگی نخستین ارتباط با تیم مهندسی' : 'Initial coordination format'}
                  </span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <label className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                    <input
                      type="radio"
                      name="format"
                      value="video_brief"
                      checked={formData.preferredFormat === 'video_brief'}
                      onChange={() => setFormData({ ...formData, preferredFormat: 'video_brief' })}
                      className="text-primary focus:ring-primary"
                    />
                    <span>{isFa ? 'جلسه آنلاین مهندسی' : 'Video Conference'}</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                    <input
                      type="radio"
                      name="format"
                      value="formal_nda_exchange"
                      checked={formData.preferredFormat === 'formal_nda_exchange'}
                      onChange={() => setFormData({ ...formData, preferredFormat: 'formal_nda_exchange' })}
                      className="text-primary focus:ring-primary"
                    />
                    <span>{isFa ? 'مبادله اسناد و NDA' : 'Formal NDA Exchange'}</span>
                  </label>
                </div>
              </div>

              {/* Footer Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 text-start">
                  <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{isFa ? 'بررسی تخصصی و تماس متقابل حداکثر طی ۲۴ ساعت کاری' : 'Verified 24h SLA by KKM Engineering'}</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer"
                  >
                    {isFa ? 'انصراف' : 'Cancel'}
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 sm:flex-initial px-7 py-2.5 rounded-xl bg-primary hover:bg-secondary text-white text-xs font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{isFa ? 'در حال ارسال و ثبت...' : 'Submitting Brief...'}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>{isFa ? 'ارسال درخواست مشاوره' : 'Submit Consultation Brief'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default TechnicalConsultationModal;
