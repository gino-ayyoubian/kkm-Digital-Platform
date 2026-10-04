import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../LanguageContext';
import { 
  PhoneCall, Network, GitBranch, Radio, ShieldCheck, 
  Settings, ExternalLink, Download, Clock, Sliders, CheckCircle2, 
  AlertTriangle, Key, Layers, Server, Activity, Users, PhoneForwarded,
  ArrowRight, ArrowLeft, RefreshCw, FileCode, Check, Copy
} from 'lucide-react';
import { DAFTARE_SHOMA_CONFIG, IVR_DIAL_TREE } from '../ivr/IvrCommunicationsConsole';
import { INITIAL_ORG_MEMBERS } from '../../data/orgMembers';

interface InternalCommunicationTabProps {
  onOpenSoftphone?: (extension?: string) => void;
}

export const InternalCommunicationTab: React.FC<InternalCommunicationTabProps> = ({
  onOpenSoftphone
}) => {
  const { isFa } = useLanguage();
  const [activeSubTab, setActiveSubTab] = React.useState<'architecture' | 'routingLogic' | 'settings' | 'huntGroups'>('architecture');
  const [isDaySchedule, setIsDaySchedule] = React.useState<boolean>(true);
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = React.useState<string | null>(null);

  // Settings State
  const [settings, setSettings] = React.useState({
    primaryLine: '+98 21 9103 0830',
    workingHoursStart: '08:00',
    workingHoursEnd: '17:00',
    timezone: 'Asia/Tehran (GMT+3:30)',
    vipCode: '*8888',
    hseEmergencyCode: '*9111',
    voicemailCode: '*99',
    ringTimeoutSeconds: 20,
    mobileForwardAfterHours: true,
    webhookEnabled: true,
    webhookUrl: '/api/telephony/webhook'
  });

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownloadFullPackage = () => {
    const pkg = {
      system: 'KKM International Group - Daftare Shoma IVR Architecture',
      version: '2.0.0',
      activeLine: settings.primaryLine,
      portalUrl: 'https://portal.daftareshoma.com',
      gitHubRepository: 'https://github.com/gino-ayyoubian/kkm-ivr-daftareshoma',
      designer: 'Gino Ayyoubian (سید ژینو ایوبیان)',
      architecture: {
        layer1_strategic: {
          name: 'Strategic Directorate & Board Members',
          vipCode: settings.vipCode,
          routing: 'Simultaneous mobile ring + C-Suite priority queue'
        },
        layer2_operations: {
          name: 'Operations & Mega-Projects EPC',
          hseCode: settings.hseEmergencyCode,
          routing: 'Direct field dispatch + Emergency safety broadcast'
        },
        layer3_support: {
          name: 'Support, Legal, PR & Finance',
          voicemail: settings.voicemailCode,
          routing: 'Department hunt groups + Digital voicemail'
        }
      },
      ivrTree: IVR_DIAL_TREE,
      schedule: {
        workingDays: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'],
        hours: `${settings.workingHoursStart} - ${settings.workingHoursEnd}`,
        timezone: settings.timezone
      }
    };

    const blob = new Blob([JSON.stringify(pkg, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kkm-daftareshoma-ivr-architecture-91030830.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess('pkg');
    setTimeout(() => setDownloadSuccess(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Conceptual Architecture Summary & Direct Portal Link */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-950/40">
              <Network className="w-6 h-6 text-white" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/40 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {isFa ? 'معماری و یکپارچه‌سازی تلفن ابری «دفتر شما»' : 'Daftare Shoma Cloud PBX & IVR Architecture'}
                </span>
                <span className="text-slate-400 text-xs font-mono font-bold">
                  خط اختصاصی: {settings.primaryLine}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold font-display mt-0.5">
                {isFa ? 'مدیریت ارتباطات سازمانی و معماری تلفن گویا (IVR)' : 'Internal Communication & IVR Architecture Hub'}
              </h2>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="https://portal.daftareshoma.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
              title="ورود به پرتال دفتر شما (portal.daftareshoma.com)"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{isFa ? 'پرتال دفتر شما' : 'portal.daftareshoma.com'}</span>
            </a>

            <a
              href="https://my.dartamas.com/directLink/61be6882-8824-4c31-8903-aaf074248aa5"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
              title="تماس اینترنتی مستقیم درتماس"
            >
              <Radio className="w-4 h-4" />
              <span>{isFa ? 'تماس اینترنتی درتماس' : 'Dartamas Web Call'}</span>
            </a>

            <button
              onClick={() => onOpenSoftphone?.('101')}
              className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{isFa ? 'شماره‌گیر تلفن گویا' : 'Launch Softphone'}</span>
            </button>
          </div>
        </div>

        {/* Sub-Tabs Switcher */}
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-slate-800">
          <button
            onClick={() => setActiveSubTab('architecture')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'architecture'
                ? 'bg-primary text-white shadow-md'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isFa ? 'معماری مفهومی سه‌لایه (Conceptual Architecture)' : '3-Layer Architecture'}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('routingLogic')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'routingLogic'
                ? 'bg-primary text-white shadow-md'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>{isFa ? 'نقشه شماره‌ها و منطق مسیریابی داخلی‌ها' : 'Number Mapping & Routing'}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('huntGroups')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'huntGroups'
                ? 'bg-primary text-white shadow-md'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{isFa ? 'گروه‌های پاسخگویی (Hunt Groups) و پروتکل HSE' : 'Hunt Groups & HSE'}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('settings')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'settings'
                ? 'bg-primary text-white shadow-md'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>{isFa ? 'تنظیمات سانترال و وب‌هوک دفتر شما' : 'PBX Settings & Webhooks'}</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: CONCEPTUAL ARCHITECTURE */}
      {activeSubTab === 'architecture' && (
        <div className="space-y-6">
          {/* Visual Architecture Diagram */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
            <div className="border-b dark:border-slate-700 pb-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary dark:text-secondary" />
                  <span>{isFa ? 'دیاگرام مفهومی جریان تماس‌های ورودی گروه بین‌المللی کیمیا کاران ماد' : 'KKM Inbound Call Flow & Architectural Schema'}</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {isFa 
                    ? 'طراحی و مستندسازی شده توسط مهندس سید ژینو ایوبیان (معماری سه‌لایه تلفن گویا بر روی پلتفرم ابری دفتر شما)'
                    : 'Designed and implemented by Gino Ayyoubian on Daftare Shoma cloud platform.'}
                </p>
              </div>

              {/* Day / Night Toggle */}
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                <button
                  onClick={() => setIsDaySchedule(true)}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    isDaySchedule ? 'bg-primary text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {isFa ? 'ساعات اداری (شنبه تا چهارشنبه ۸-۱۷)' : 'Day Shift (08:00 - 17:00)'}
                </button>
                <button
                  onClick={() => setIsDaySchedule(false)}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    !isDaySchedule ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {isFa ? 'شیفت شب / روزهای تعطیل' : 'Night Shift / Holidays'}
                </button>
              </div>
            </div>

            {/* Architecture Flow Visualizer */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
              {/* Step 1: Inbound Gateway */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
                <div>
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 font-bold text-[10px] uppercase">
                    Stage 1: PSTN Inbound
                  </span>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mt-2">
                    {settings.primaryLine}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-sans mt-1">
                    {isFa ? 'دروازه مخابراتی ثابت تهران (دفتر شما)' : 'Direct Inbound DID via Daftare Shoma'}
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-400">
                  ۳۰ کانال همزمان &bull; 14ms Latency
                </div>
              </div>

              {/* Step 2: Cloud PBX & Schedule */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
                <div>
                  <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 font-bold text-[10px] uppercase">
                    Stage 2: PBX Engine
                  </span>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mt-2">
                    ext.daftareshoma.com
                  </h4>
                  <p className="text-[11px] text-slate-500 font-sans mt-1">
                    {isDaySchedule
                      ? (isFa ? 'اعمال پیام روزانه و فعال‌سازی کلیدهای ۱ تا ۹' : 'Working hours IVR tree active')
                      : (isFa ? 'پیام شیفت شب و هدایت مستقیم به صندوق صوتی (*99)' : 'After-hours voicemail routing active')}
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-400">
                  UDP 7104 &bull; TCP 7103 &bull; WSS 4443
                </div>
              </div>

              {/* Step 3: Layered IVR Router */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
                <div>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 font-bold text-[10px] uppercase">
                    Stage 3: 3-Layer IVR
                  </span>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mt-2">
                    {isFa ? 'هدایت هوشمند لایه‌ها' : 'Layered Decision Tree'}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-sans mt-1">
                    {isFa ? 'تفکیک استراتژیک، عملیاتی و پشتیبانی با کدهای میانبر VIP و HSE' : 'Strategic, Operations & Support routing'}
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-400">
                  VIP: *8888 &bull; HSE: *9111 &bull; VM: *99
                </div>
              </div>

              {/* Step 4: Endpoint Distribution */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
                <div>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 font-bold text-[10px] uppercase">
                    Stage 4: Endpoints
                  </span>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mt-2">
                    {isFa ? 'داخلی‌ها و دایورت همراه' : 'Softphone & Mobile'}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-sans mt-1">
                    {isFa ? 'زنگ همزمان سافت‌فون و تلفن همراه مدیران در صورت عدم پاسخ' : 'Simultaneous ring and mobile forward'}
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-400">
                  ۱۴ داخلی فعال &bull; ترتیبی / همزمان
                </div>
              </div>
            </div>

            {/* Detailed 3-Layer Description Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              {/* Layer 1: Strategic */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    Layer 1: Strategic
                  </span>
                  <Key className="w-4 h-4 text-amber-500" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  {isFa ? 'لایه راهبردی: هیئت مدیره و مدیرعامل' : 'Strategic Directorate (C-Suite)'}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {isFa 
                    ? 'شامل دفتر مدیرعامل (داخلی ۱۰۱) و اعضای هیئت مدیره. مجهز به کد دسترسی ویژه VIP (*8888) جهت عبور از صف‌های عمومی و برقراری ارتباط فوری مستقیم با شماره همراه.'
                    : 'Board of Directors & CEO Directorate with VIP code bypass (*8888) for direct mobile call routing.'}
                </p>
              </div>

              {/* Layer 2: Operations */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-600/5 border border-emerald-500/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Layer 2: Operations
                  </span>
                  <Activity className="w-4 h-4 text-emerald-500" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  {isFa ? 'لایه عملیات: پروژه‌ها، کارگاه‌ها و ایمنی HSE' : 'Operations & Project Teams'}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {isFa 
                    ? 'شامل مدیران ارشد عملیات (داخلی ۱۰۶)، علوم زمین و انرژی GMEL (داخلی ۱۰۳) و فناوری و هوش مصنوعی (داخلی ۱۰۲). مجهز به پروتکل فوریت‌های اضطراری HSE (*9111).'
                    : 'EPC Mega-Projects, Drilling Rigs, and Earth Sciences with emergency HSE incident command protocol (*9111).'}
                </p>
              </div>

              {/* Layer 3: Support */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-600/5 border border-blue-500/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Layer 3: Support
                  </span>
                  <Users className="w-4 h-4 text-blue-500" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  {isFa ? 'لایه پشتیبانی: امور مالی، حقوقی و پذیرش' : 'Support, Legal & Administration'}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {isFa 
                    ? 'شامل امور مالی (داخلی ۱۰۵)، امور حقوقی و پتنت‌ها (داخلی ۲۰۵)، روابط عمومی (داخلی ۲۰۴)، پذیرش مرکزی (داخلی ۲۰۰) و صندوق پیام‌های صوتی خودکار (*99).'
                    : 'Finance, Treasury, Legal Directorate, Intellectual Property, PR and corporate voicemail box (*99).'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: NUMBER MAPPING & ROUTING LOGIC */}
      {activeSubTab === 'routingLogic' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {isFa ? 'جدول تناظر کلیدهای تلفن گویا و مقصدهای هدایت تماس' : 'IVR Key Mapping & Target Destinations'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {isFa ? 'تنظیمات تخصیص کلیدهای ورودی خط اصلی +98 21 9103 0830 به داخلی‌های پرسنل' : 'Key allocation for incoming calls on +98 21 9103 0830'}
              </p>
            </div>

            <button
              onClick={handleDownloadFullPackage}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloadSuccess === 'pkg' ? (isFa ? 'پکیج دانلود شد!' : 'Downloaded!') : (isFa ? 'دانلود بسته پیکربندی دفتر شما (JSON)' : 'Download JSON')}</span>
            </button>
          </div>

          {/* Mapping Table */}
          <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-4 text-center">{isFa ? 'کلید شماره‌گیری' : 'Dial Key'}</th>
                  <th className="p-4">{isFa ? 'دپارتمان و واحد سازمانی' : 'Department & Unit'}</th>
                  <th className="p-4">{isFa ? 'مسئول پاسخگویی' : 'Designated Officer'}</th>
                  <th className="p-4">{isFa ? 'شماره داخلی' : 'Extension'}</th>
                  <th className="p-4">{isFa ? 'استراتژی هدایت تماس' : 'Routing Strategy'}</th>
                  <th className="p-4">{isFa ? 'ساعات غیراداری' : 'After Hours'}</th>
                  <th className="p-4 text-center">{isFa ? 'تست شماره‌گیری' : 'Action'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                {IVR_DIAL_TREE.map(node => (
                  <tr key={`map-row-${node.key}`} className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors">
                    <td className="p-4 text-center">
                      <span className={`w-8 h-8 rounded-xl font-mono font-bold text-sm inline-flex items-center justify-center shadow-xs ${
                        node.isSpecialProtocol ? 'bg-red-600 text-white' : 'bg-primary text-white'
                      }`}>
                        {node.key}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="font-bold text-slate-900 dark:text-white">
                        {isFa ? node.titleFa : node.titleEn}
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        {node.layer}
                      </span>
                    </td>

                    <td className="p-4 text-slate-700 dark:text-slate-200 font-medium">
                      {isFa ? node.targetLeaderFa : node.targetLeaderEn}
                    </td>

                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-mono font-bold text-xs">
                        {node.targetExtension}
                      </span>
                    </td>

                    <td className="p-4 font-mono text-[11px] text-slate-500">
                      {node.key === '1' ? (isFa ? 'همزمان داخلی و تلفن همراه' : 'Simultaneous Mobile Ring') :
                       node.key === '9' ? (isFa ? 'هشدار فوری و فراخوان شیفت کارگاه' : 'Emergency Priority Broadcast') :
                       node.key === '0' ? (isFa ? 'صف صفوف اپراتور و نوبت‌دهی' : 'Operator Queue') :
                       (isFa ? 'ترتیبی با ۵ ثانیه تاخیر' : 'Sequential Ring (5s Delay)')}
                    </td>

                    <td className="p-4 text-[11px] text-slate-500">
                      {node.key === '1' ? (isFa ? 'دایورت مستقیم به همراه' : 'Direct Mobile Ring') :
                       node.key === '9' ? (isFa ? 'شیفت ۲۴ ساعته HSE' : '24/7 HSE Dispatch') :
                       (isFa ? 'انتقال به صندوق صوتی (*99)' : 'Voicemail (*99)')}
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() => onOpenSoftphone?.(node.targetExtension)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors inline-flex items-center gap-1"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>{isFa ? 'شماره‌گیری' : 'Dial'}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: HUNT GROUPS & HSE PROTOCOL */}
      {activeSubTab === 'huntGroups' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* HSE Emergency Command */}
          <div className="p-6 rounded-3xl bg-red-950/20 border border-red-500/40 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-red-500 text-white font-mono text-xs font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>پروتکل فوریت‌های HSE (*9111)</span>
              </span>
              <span className="font-mono text-xs text-red-400 font-bold">Priority: Tier-0</span>
            </div>

            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              {isFa ? 'ستاد واکنش اضطراری و حوادث کارگاه‌های حفاری و صنعتی' : 'HSE Emergency Incident Command Protocol'}
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {isFa
                ? 'در صورت شماره‌گیری کلید ۹ یا کد *9111، سیستم تلفن ابری دفتر شما بدون معطلی و خارج از نوبت کلیه خطوط را متوقف کرده و به طور خودکار تلفن همراه کارشناس ایمنی شیفت در سایت قشم، سرخس و دفتر تهران را به صورت همزمان شماره‌گیری می‌نماید.'
                : 'Immediate broadcast to on-duty safety commanders at project sites with zero delay.'}
            </p>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-red-500/20 text-xs font-mono space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">کد میانبر:</span>
                <span className="font-bold text-red-400">*9111</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">اعضای گروه واکنش:</span>
                <span className="text-slate-200">فرمانده شیفت ایمنی، COO، سرپرست کارگاه</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">روش زنگ‌خوردن:</span>
                <span className="text-emerald-400 font-bold">Blast Ring (زنگ همزمان کلیه اعضا)</span>
              </div>
            </div>
          </div>

          {/* VIP Access Code (*8888) */}
          <div className="p-6 rounded-3xl bg-amber-950/20 border border-amber-500/40 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-mono text-xs font-bold flex items-center gap-1.5">
                <Key className="w-4 h-4" />
                <span>کد دسترسی اختصاصی VIP (*8888)</span>
              </span>
              <span className="font-mono text-xs text-amber-400 font-bold">C-Suite Bypass</span>
            </div>

            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              {isFa ? 'گذرگاه اختصاصی سرمایه‌گذاران، سهامداران و شرکای استراتژیک' : 'Executive Priority Direct Routing'}
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {isFa
                ? 'با شماره‌گیری کد محرمانه *8888 توسط مخاطبان خاص، تماس بدون پخش پیام‌های عمومی تلفن گویا مستقیماً به تلفن همراه رئیس هیئت مدیره و مدیران ارشد اجرایی وصل می‌گردد.'
                : 'Bypasses the public IVR greeting and establishes priority mobile connections with the Board.'}
            </p>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-amber-500/20 text-xs font-mono space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">کد میانبر:</span>
                <span className="font-bold text-amber-400">*8888</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">مقصد اولویت ۱:</span>
                <span className="text-slate-200">مدیرعامل و رئیس هیئت مدیره (سید ژینو ایوبیان)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">مقصد پشتیبان:</span>
                <span className="text-slate-200">اعضای هیئت مدیره (رضا بغدادچی، اشکان تفنگچی‌ها)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: PBX SETTINGS & WEBHOOK CONFIGURATION */}
      {activeSubTab === 'settings' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="border-b dark:border-slate-700 pb-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                {isFa ? 'تنظیمات یکپارچه‌سازی و ارتباط با پرتال دفتر شما (portal.daftareshoma.com)' : 'Daftare Shoma Portal Integration Parameters'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {isFa ? 'آدرس صحیح ورود به پرتال دفتر شما: portal.daftareshoma.com' : 'Correct portal endpoint: portal.daftareshoma.com'}
              </p>
            </div>

            <a
              href="https://portal.daftareshoma.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{isFa ? 'ورود به portal.daftareshoma.com' : 'portal.daftareshoma.com'}</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: General PBX Parameters */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isFa ? 'شماره خط اصلی خریداری‌شده' : 'Primary Purchased Line'}
                </label>
                <input
                  type="text"
                  value={settings.primaryLine}
                  disabled
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-700 dark:text-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isFa ? 'شروع ساعات اداری' : 'Workday Start'}
                  </label>
                  <input
                    type="time"
                    value={settings.workingHoursStart}
                    onChange={(e) => setSettings({ ...settings, workingHoursStart: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isFa ? 'پایان ساعات اداری' : 'Workday End'}
                  </label>
                  <input
                    type="time"
                    value={settings.workingHoursEnd}
                    onChange={(e) => setSettings({ ...settings, workingHoursEnd: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isFa ? 'محدوده زمانی و تقویم' : 'Timezone'}
                </label>
                <input
                  type="text"
                  value={settings.timezone}
                  disabled
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-500"
                />
              </div>
            </div>

            {/* Right: Codes & Webhook */}
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isFa ? 'کد VIP' : 'VIP Code'}
                  </label>
                  <input
                    type="text"
                    value={settings.vipCode}
                    onChange={(e) => setSettings({ ...settings, vipCode: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isFa ? 'کد HSE' : 'HSE Code'}
                  </label>
                  <input
                    type="text"
                    value={settings.hseEmergencyCode}
                    onChange={(e) => setSettings({ ...settings, hseEmergencyCode: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-red-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {isFa ? 'صندوق صوتی' : 'Voicemail'}
                  </label>
                  <input
                    type="text"
                    value={settings.voicemailCode}
                    onChange={(e) => setSettings({ ...settings, voicemailCode: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isFa ? 'آدرس وب‌هوک ثبت گزارش تماس‌ها (CRM Webhook)' : 'Call Event Webhook URL'}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={settings.webhookUrl}
                    disabled
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-600 dark:text-slate-300"
                  />
                  <button
                    onClick={() => copyToClipboard(settings.webhookUrl, 'webhook')}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-200 transition-colors shrink-0"
                    title={isFa ? 'کپی آدرس وب‌هوک' : 'Copy Webhook'}
                  >
                    {copiedKey === 'webhook' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={settings.mobileForwardAfterHours}
                    onChange={(e) => setSettings({ ...settings, mobileForwardAfterHours: e.target.checked })}
                    className="w-4 h-4 rounded text-primary focus:ring-primary"
                  />
                  <span>{isFa ? 'فعال بودن دایورت خودکار به همراه مدیران در ساعات غیراداری' : 'Auto-forward to mobile during after-hours'}</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
