import * as React from 'react';
import { useLanguage } from '../../LanguageContext';
import { Page } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Handshake, 
  Calendar, 
  FileText, 
  Copy, 
  Check, 
  Download, 
  ArrowRight, 
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Send,
  X
} from 'lucide-react';

interface ExhibitionDossierSectionProps {
  setPage: (page: Page) => void;
  onScrollTo: (elementId: string) => void;
}

export const ExhibitionDossierSection: React.FC<ExhibitionDossierSectionProps> = ({ setPage, onScrollTo }) => {
  const { language, direction } = useLanguage();
  const isFa = language === 'FA';

  const [activeDossierTab, setActiveDossierTab] = React.useState<'full' | 'short' | 'micro' | 'formula'>('full');
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);
  const [showMeetingModal, setShowMeetingModal] = React.useState<boolean>(false);
  const [meetingSubmitted, setMeetingSubmitted] = React.useState<boolean>(false);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // Section 10.24 Full Text
  const fullOfficialTextFa = `گروه بین‌المللی KKM، به‌عنوان یک مجموعه فعال در حوزه فناوری، مهندسی و توسعه یکپارچه، در ششمین نمایشگاه بین‌المللی توانمندی‌ها و ظرفیت‌های روستایی و عشایری با رویکرد ارائه «راهکارهای یکپارچه انرژی، آب، زیرساخت و اقتصاد مولد» حضور دارد.

KKM توسعه مناطق روستایی و عشایری را فراتر از اجرای پروژه‌های منفرد، و در قالب «اکوسیستم‌های توسعه منطقه‌ای» دنبال می‌کند. در این الگو، تلفیق انرژی‌های تجدیدپذیر، امنیت و تأمین آب، کشاورزی و دامداری دانش‌بنیان، صنایع فرآوری و تبدیلی، فناوری‌های دیجیتال و مدل‌های نوین تأمین مالی، بستری برای ایجاد ارزش افزوده محلی، اشتغال پایدار و مهاجرت معکوس فراهم می‌آورد.

حوزه‌های تمرکز KKM در این رویداد شامل موارد زیر است:
۱. سیستم‌های انرژی نامتمرکز، ریزشبکه‌ها و راهکارهای هیبریدی برای مناطق روستایی و عشایری
۲. راهکارهای پایدار تأمین، تصفیه، بازچرخانی و نمک‌زدایی آب در بخش‌های شرب و کشاورزی
۳. زیرساخت‌های مهندسی و تأسیساتی متناسب با اقلیم و فعالیت‌های تولیدی مناطق
۴. مدل‌های نوین زنجیره ارزش کشاورزی، فرآوری، صنایع تبدیلی و کاهش ضایعات
۵. راهکارهای فناورانه و سیار متناسب با زندگی و اقتصاد جامعه عشایری
۶. فناوری‌های داده‌محور، هوش مصنوعی و پایش منابع در مدیریت زیرساخت‌های محلی
۷. ساختاردهی مدل‌های سرمایه‌گذاری، مشارکت عمومی-خصوصی (PPP) و توسعه پایدار

KKM آمادگی دارد با دستگاه‌های اجرایی، مدیریت‌های محلی، تعاونی‌ها، فعالان اقتصادی و سرمایه‌گذاران در جهت شناسایی ظرفیت‌ها، تعریف پروژه‌های پایلوت و اجرای طرح‌های جامع توسعه روستایی و عشایری همکاری نماید.`;

  const fullOfficialTextEn = `KKM International Group participates in the 6th International Exhibition of Rural & Nomadic Capacities with an integrated strategic focus on "Integrated Technology, Engineering and Investment Solutions for Sustainable Rural and Nomadic Development."

KKM approaches rural and nomadic development not as fragmented single interventions, but as an integrated regional economic and infrastructure system. By coupling distributed renewable generation, water security, productive agricultural techniques, decentralized agro-processing, digital intelligence and bankable investment structures, the platform enables retained local value creation and generational resilience.

Core exhibition focus themes:
1. Distributed renewable microgrids & hybrid power for rural and nomadic clusters
2. Sustainable water purification, solar desalination (BWRO), and aquifer management
3. Resilient civil & mechanical infrastructure customized to harsh microclimates
4. Post-harvest value addition, agro-processing, and solar cold chain storage
5. Mobile off-grid infrastructure kits for pastoral nomadic communities
6. Data-driven IoT telemetry, AI, and digital twin resource optimization
7. Bankable Public-Private Partnerships (PPP) and green climate project finance

KKM invites regional administrators, local cooperatives, agricultural producers, and infrastructure investors to collaborate on defining pilot programs and bankable regional masterplans.`;

  // Section 10.25 Short Text
  const shortTextFa = `گروه بین‌المللی KKM با رویکرد «راهکارهای یکپارچه فناوری، مهندسی و سرمایه‌گذاری برای توسعه پایدار روستایی و عشایری» در این نمایشگاه حضور یافته است. تمرکز این مجموعه بر تلفیق انرژی‌های تجدیدپذیر، امنیت آب، کشاورزی مولد، صنایع فرآوری و تبدیلی، زیرساخت‌های سیار عشایری، فناوری‌های دیجیتال و مدل‌های تأمین مالی پروژه‌محور است تا ظرفیت‌های بومی مناطق به ارزش افزوده اقتصادی، اشتغال پایدار و توسعه ماندگار تبدیل شوند. KKM آماده همکاری در تعریف پروژه‌های پایلوت و طرح‌های سرمایه‌گذاری مشترک با نهادها و فعالان این حوزه می‌باشد.`;

  const shortTextEn = `KKM International Group presents its strategic platform "Integrated Technology, Engineering and Investment Solutions for Sustainable Rural & Nomadic Development." By coupling clean energy, water security, productive agriculture, localized processing, mobile nomadic systems, and bankable project finance, KKM transforms raw regional endowments into permanent economic prosperity. KKM invites public agencies, agricultural cooperatives, and institutional investors to initiate pilot deployments and joint development projects.`;

  // Section 10.26 Micro Text
  const microTextFa = `ارائه راهکارهای یکپارچه در حوزه‌های انرژی، آب، کشاورزی مولد، صنایع فرآوری، زیرساخت، فناوری دیجیتال و مدل‌های سرمایه‌گذاری برای ایجاد ارزش افزوده و اشتغال پایدار در مناطق روستایی و عشایری.`;

  const microTextEn = `Integrated technology, engineering and investment solutions in clean energy, water, precision agriculture, agro-processing, digital telemetry, and PPP infrastructure to generate lasting local economic value and livelihoods in rural and nomadic territories.`;

  // Section 10.27 Positioning Formula
  const formulaPillars = [
    { titleEn: 'Local Endowments', titleFa: 'ظرفیت‌های محلی', descEn: 'Sun, wind, groundwater, soil, and human skills.', descFa: 'خورشید، باد، آب، زمین و نیروی انسانی منطقه.' },
    { titleEn: 'Engineering Layer', titleFa: 'لایه مهندسی و فناوری', descEn: 'Decentralized energy, water desalination, and resilient civil sheds.', descFa: 'انرژی نامتمرکز، نمک‌زدایی آب، و زیرساخت کالبدی تاب‌آور.' },
    { titleEn: 'Value Addition', titleFa: 'صنایع تبدیلی و ارزش محلی', descEn: 'Halting raw commodity export through cold chain storage and sorting.', descFa: 'توقف خام‌فروشی با سردخانه، سورتینگ و بسته‌بندی در مبدأ.' },
    { titleEn: 'Bankable Finance', titleFa: 'ساختاردهی مالی و سرمایه‌گذاری', descEn: 'Converting needs into bankable PPP project packages.', descFa: 'تبدیل نیازمندی‌ها به پروژه‌های دارای توجیه بانکی و مشارکت.' }
  ];

  return (
    <section id="exhibition-hub" className="py-20 bg-slate-950 text-white relative border-b border-slate-800">
      {/* Background Ambience */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-mono font-bold text-amber-400 mb-2 block">
            {isFa ? 'مستندات راهبردی و محتوای رسمی نمایشگاه (۱۰.۲۴ تا ۱۰.۲۷)' : 'STRATEGIC EXHIBITION DOSSIER & REGISTRATION COPY TOOLKIT'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white mb-4">
            {isFa 
              ? 'محتوای رسمی KKM در ششمین رویداد بین‌المللی توانمندی‌های روستایی و عشایری' 
              : 'KKM Strategic Presence & Registration Dossier'}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {isFa 
              ? 'متون استاندارد ثبت‌نام در کاتالوگ رسمی رویداد، بیانیه‌های مطبوعاتی، فرمول پوزیشنینگ و هماهنگی جلسات کاری غرفه KKM.' 
              : 'Standardized official registration copy for catalog listings, press releases, strategic positioning formulas, and direct executive meeting reservations.'}
          </p>
        </div>

        {/* Booth Focus Sessions & Meeting Booking Banner */}
        <div className="mb-14 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold">
              <Calendar className="w-3.5 h-3.5" />
              <span>{isFa ? 'جلسات تخصصی غرفه KKM در نمایشگاه' : 'Official KKM Exhibition Pavilion'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {isFa ? 'هماهنگی جلسات کاری و مذاکرات دوجانبه در محل رویداد' : 'Schedule a Bilateral Session with KKM Senior Architects'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {isFa 
                ? 'مدیران استانی، مسئولان مناطق، سرمایه‌گذاران و رؤسای تعاونی‌ها می‌توانند جهت بررسی پایلوت‌های منطقه‌ای وقت جلسه اختصاصی رزرو نمایند.' 
                : 'Regional directors, municipal water boards, investors and cooperative leaders are invited to reserve a dedicated executive session at our pavilion.'}
            </p>
          </div>

          <button
            onClick={() => setShowMeetingModal(true)}
            className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <Handshake className="w-4 h-4" />
            <span>{isFa ? 'رزرو جلسه در غرفه KKM' : 'Book Pavilion Meeting'}</span>
          </button>
        </div>

        {/* Official Registration Copy Toolkit (Section 10.24 - 10.27) */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                {isFa ? 'کیت متون استاندارد نمایشگاهی' : 'OFFICIAL REGISTRATION COPY TOOLKIT'}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {isFa ? 'متون رسمی ثبت در کاتالوگ، کتاب نمایشگاه و پرتال‌ها' : 'Official Texts for Directories, Portals & Media'}
              </h3>
            </div>

            {/* Tab Selector */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveDossierTab('full')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeDossierTab === 'full' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {isFa ? 'متن کامل (۱۰.۲۴)' : 'Full (10.24)'}
              </button>
              <button
                onClick={() => setActiveDossierTab('short')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeDossierTab === 'short' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {isFa ? 'متن کوتاه (۱۰.۲۵)' : 'Short (10.25)'}
              </button>
              <button
                onClick={() => setActiveDossierTab('micro')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeDossierTab === 'micro' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {isFa ? 'میکرو (۱۰.۲۶)' : 'Micro (10.26)'}
              </button>
              <button
                onClick={() => setActiveDossierTab('formula')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeDossierTab === 'formula' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {isFa ? 'فرمول (۱۰.۲۷)' : 'Formula (10.27)'}
              </button>
            </div>
          </div>

          {/* Tab Content Display */}
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-5 relative text-start">
            {activeDossierTab === 'full' && (
              <div>
                <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono text-slate-400">
                    {isFa ? 'متن کامل برای بروشور، کاتالوگ رسمی و معرفی جامع در پرتال نمایشگاه' : 'Full length copy for directory profiles, official catalog & website'}
                  </span>
                  <button
                    onClick={() => copyToClipboard(isFa ? fullOfficialTextFa : fullOfficialTextEn, 'full')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-emerald-400 transition-colors cursor-pointer"
                  >
                    {copiedKey === 'full' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'full' ? (isFa ? 'کپی شد!' : 'Copied!') : (isFa ? 'کپی متن' : 'Copy Text')}</span>
                  </button>
                </div>
                <div className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line font-sans font-normal">
                  {isFa ? fullOfficialTextFa : fullOfficialTextEn}
                </div>
              </div>
            )}

            {activeDossierTab === 'short' && (
              <div>
                <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono text-slate-400">
                    {isFa ? 'متن خلاصه (یک پاراگراف) برای فرم‌های ثبت‌نام و کاتالوگ غرفه‌داران' : 'Single paragraph summary for registration forms and brief listings'}
                  </span>
                  <button
                    onClick={() => copyToClipboard(isFa ? shortTextFa : shortTextEn, 'short')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-emerald-400 transition-colors cursor-pointer"
                  >
                    {copiedKey === 'short' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'short' ? (isFa ? 'کپی شد!' : 'Copied!') : (isFa ? 'کپی متن' : 'Copy Text')}</span>
                  </button>
                </div>
                <div className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans font-normal">
                  {isFa ? shortTextFa : shortTextEn}
                </div>
              </div>
            )}

            {activeDossierTab === 'micro' && (
              <div>
                <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono text-slate-400">
                    {isFa ? 'متن میکرو (یک جمله‌ای) مناسب برای شبکه‌های اجتماعی، زیرنویس‌ها و پیامک' : 'Single sentence micro copy for badges, social media and short descriptors'}
                  </span>
                  <button
                    onClick={() => copyToClipboard(isFa ? microTextFa : microTextEn, 'micro')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-emerald-400 transition-colors cursor-pointer"
                  >
                    {copiedKey === 'micro' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'micro' ? (isFa ? 'کپی شد!' : 'Copied!') : (isFa ? 'کپی متن' : 'Copy Text')}</span>
                  </button>
                </div>
                <div className="text-sm sm:text-base font-semibold text-emerald-300 leading-relaxed font-sans">
                  "{isFa ? microTextFa : microTextEn}"
                </div>
              </div>
            )}

            {activeDossierTab === 'formula' && (
              <div>
                <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono text-slate-400">
                    {isFa ? 'فرمول چهارسطحی پوزیشنینگ استراتژیک KKM (بخش ۱۰.۲۷)' : 'The 4-Tier Strategic Positioning Equation'}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {formulaPillars.map((p, idx) => (
                    <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-3.5">
                      <span className="text-[10px] font-mono text-emerald-400 block mb-1">TIER 0{idx + 1}</span>
                      <h4 className="text-xs sm:text-sm font-bold text-white mb-1.5">{isFa ? p.titleFa : p.titleEn}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{isFa ? p.descFa : p.descEn}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Meeting Booking Modal */}
        <AnimatePresence>
          {showMeetingModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-start"
              >
                <button
                  onClick={() => setShowMeetingModal(false)}
                  className="absolute top-5 ltr:right-5 rtl:left-5 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <h3 className="text-xl font-bold text-white mb-2">
                  {isFa ? 'رزرو جلسه در غرفه KKM' : 'Book an Executive Pavilion Session'}
                </h3>
                <p className="text-xs text-slate-300 mb-6">
                  {isFa 
                    ? 'لطفاً اطلاعات سازمان و موضوع پیشنهادی خود را ثبت کنید تا هماهنگی‌های لازم با شما صورت پذیرد.' 
                    : 'Please provide your details to schedule a bilateral session during the exhibition days.'}
                </p>

                {meetingSubmitted ? (
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 text-center space-y-3">
                    <Check className="w-10 h-10 text-emerald-400 mx-auto" />
                    <h4 className="text-base font-bold text-white">
                      {isFa ? 'درخواست شما با موفقیت ثبت شد' : 'Reservation Request Received'}
                    </h4>
                    <p className="text-xs text-slate-300">
                      {isFa 
                        ? 'تیم تشریفات KKM ظرف کمتر از ۲۴ ساعت برای هماهنگی ساعت دقیق با شما تماس خواهد گرفت.' 
                        : 'Our delegation team will contact you shortly to confirm your scheduled slot.'}
                    </p>
                    <button
                      onClick={() => { setShowMeetingModal(false); setMeetingSubmitted(false); }}
                      className="px-4 py-2 bg-emerald-500 text-slate-950 text-xs font-bold rounded-lg cursor-pointer mt-2"
                    >
                      {isFa ? 'تایید و بستن' : 'Close'}
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setMeetingSubmitted(true);
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1">
                        {isFa ? 'نام و نام خانوادگی' : 'Full Name'} *
                      </label>
                      <input
                        required
                        type="text"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                        placeholder={isFa ? 'مثال: مهندس احمدی' : 'e.g. John Doe'}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium text-slate-300 block mb-1">
                          {isFa ? 'سازمان / تعاونی / شرکت' : 'Organization'} *
                        </label>
                        <input
                          required
                          type="text"
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                          placeholder={isFa ? 'نام نهاد یا تشکل' : 'Agency / Company'}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-slate-300 block mb-1">
                          {isFa ? 'شماره تماس مستقیم' : 'Phone / Mobile'} *
                        </label>
                        <input
                          required
                          type="tel"
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                          placeholder="+98 ..."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1">
                        {isFa ? 'موضوع مورد علاقه برای مذاکره' : 'Primary Topic'}
                      </label>
                      <select className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400">
                        <option>{isFa ? 'طرح دهکده انرژی و ریزشبکه روستایی' : 'Productive Energy Village & Microgrid'}</option>
                        <option>{isFa ? 'شیرین‌سازی خورشیدی و امنیت آب (BWRO)' : 'Solar Brackish Water Desalination (BWRO)'}</option>
                        <option>{isFa ? 'صنایع تبدیلی، سورتینگ و سردخانه خورشیدی' : 'Agro-Processing & Solar Cold Storage'}</option>
                        <option>{isFa ? 'بسته‌های سیار و فناورانه جامعه عشایری' : 'Nomadic Mobile Infrastructure Kits'}</option>
                        <option>{isFa ? 'ساختاردهی مالی و سرمایه‌گذاری مشترک (PPP)' : 'Bankable PPP Project Finance'}</option>
                      </select>
                    </div>

                    <div className="pt-2 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setShowMeetingModal(false)}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 rounded-xl cursor-pointer"
                      >
                        {isFa ? 'انصراف' : 'Cancel'}
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{isFa ? 'ارسال و ثبت نهایی' : 'Submit Reservation'}</span>
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
