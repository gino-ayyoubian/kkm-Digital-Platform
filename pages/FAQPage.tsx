import * as React from 'react';
import PageHeader from '../components/PageHeader';
import { useLanguage } from '../LanguageContext';
import { Page } from '../types';
import { HelpCircle, ChevronDown, Cpu, ShieldCheck, TrendingUp, Compass, Search } from 'lucide-react';

interface FAQPageProps {
  setPage?: (page: Page) => void;
}

interface FAQItem {
  id: string;
  category: 'tech' | 'evidence' | 'invest' | 'rural' | 'gov';
  qEn: string;
  qFa: string;
  aEn: string;
  aFa: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    category: "tech",
    qEn: "What is the GeoMeta Energy Layer (GMEL) and how does closed-loop geothermal work?",
    qFa: "لایه انرژی ژئومتا (GMEL) چیست و سیکل بسته زمین‌گرمایی چگونه عمل می‌کند؟",
    aEn: "GMEL is KKM's proprietary subsurface thermodynamic architecture that circulates specialized engineered working fluids within closed cased wells without fracturing rock or extracting underground water. Heat is harvested via downhole conduction and converted to electricity using high-efficiency Organic Rankine Cycle (ORC) power units.",
    aFa: "سامانه GMEL معماری اختصاصی ترمودینامیکی KKM برای استخراج حرارت زمین‌گرمایی در سیکل کاملاً بسته است. در این شیوه هیچ سیالی به سفره‌های زیرزمینی تزریق نشده و هیدرولیک شکاف ایجاد نمی‌شود؛ بلکه حرارت به وسیله نانوسیالات مهندسی‌شده به سطح منتقل و در توربین‌های ORC به الکتریسیته تبدیل می‌شود."
  },
  {
    id: "faq-2",
    category: "tech",
    qEn: "Can depleted oil or gas wells be converted to GMEL geothermal stations?",
    qFa: "آیا چاه‌های نفت و گاز متروکه را می‌توان به نیروگاه زمین‌گرمایی GMEL تبدیل کرد؟",
    aEn: "Yes. One of GMEL's flagship applications is retrofitting depleted or abandoned hydrocarbon wells into baseload, zero-emission geothermal generation stations, drastically reducing drilling CAPEX while eliminating methane leaks.",
    aFa: "بله. یکی از برجسته‌ترین کاربردهای GMEL، احیا و تغییر کاربری چاه‌های متروکه هیدروکربوری به نیروگاه‌های تولید برق بدون آلایندگی است که هزینه‌های حفاری سنگین را کاهش داده و نشت گازهای گلخانه‌ای را متوقف می‌کند."
  },
  {
    id: "faq-3",
    category: "evidence",
    qEn: "What is the KKM Evidence Registry and what do Levels A through G represent?",
    qFa: "رجیستری شواهد KKM چیست و سطوح هفت‌گانه A تا G چه معنایی دارند؟",
    aEn: "The Evidence Registry is our immutable transparency layer. Every technical metric, patent claim, and emission offset is categorized from Level A (PCT Patents & International Certifications) down to Level G (Binding Consortium & Financial Charters). Each item is backed by cryptographic hashes and verified third-party audit reports.",
    aFa: "رجیستری شواهد چارچوب تغییرناپذیر شفافیت فنی ماست. هر ادعای عملکردی، حق ثبت اختراع و شاخص کاهش کربن در سطوح A (ثبت بین‌المللی PCT) تا G (اسناد مالی و قراردادهای راهبردی) دسته‌بندی شده و مجهز به هش رمزنگاری‌شده و گزارش ممیزی شخص ثالث است."
  },
  {
    id: "faq-4",
    category: "evidence",
    qEn: "How can institutional partners verify official PDF test reports?",
    qFa: "شرکای سازمانی چگونه می‌توانند گزارش‌های رسمی آزمون‌ها را استعلام و دانلود کنند؟",
    aEn: "Authorized partners and public auditors can download certified PDF artifacts directly via the Evidence Registry portal (/evidence-registry) or API (/api/evidence/:id/download). Each PDF carries official certification metadata and cryptographic audit hashes.",
    aFa: "شرکا و حسابرسان می‌توانند مستقیماً اسناد رسمی تأییدیه را از طریق پورتال رجیستری شواهد یا اندپوینت /api/evidence/:id/download در قالب فایل معتبر PDF دریافت نمایند."
  },
  {
    id: "faq-5",
    category: "invest",
    qEn: "What commercial frameworks are available for infrastructure investment?",
    qFa: "چه چارچوب‌های تجاری برای سرمایه‌گذاری در طرح‌های زیرساختی KKM وجود دارد؟",
    aEn: "KKM engages through EPC+F (Engineering, Procurement, Construction + Financing), Joint-Venture Consortia, and IP Technology Licensing agreements across Europe, the Middle East, and Eurasia.",
    aFa: "گروه KKM در چارچوب مدل‌های EPC+F، سرمایه‌گذاری مشترک کنسرسیومی (JV) و اعطای لایسنس انتقال فناوری در خاورمیانه و اوراسیا فعالیت می‌نماید."
  },
  {
    id: "faq-6",
    category: "rural",
    qEn: "How does the Rural & Nomadic Development initiative operate?",
    qFa: "پلتفرم توسعه پایدار مناطق روستایی و عشایری چگونه عمل می‌کند؟",
    aEn: "Through micro-hydrokinetics (REE turbines), decentralized solar/battery microgrids, and mobile water desalination units, KKM equips remote and nomadic communities with self-sustaining energy and potable water.",
    aFa: "این پلتفرم با به‌کارگیری میکروتوربین‌های رودخانه‌ای REE، میکروگریدهای خورشیدی و واحدهای پرتابل تصفیه آب، زیرساخت انرژی و آب پایدار را برای سکونتگاه‌های دورافتاده عشایری و روستایی فراهم می‌آورد."
  },
  {
    id: "faq-7",
    category: "gov",
    qEn: "What is KKM's AI Governance and Data Protection posture?",
    qFa: "رویکرد KKM در حوزه حاکمیت هوش مصنوعی و حفاظت از داده‌ها چیست؟",
    aEn: "In accordance with our Enterprise AI Operating Specification (EAOS), all computational models enforce strict Five-Layer Enterprise Memory isolation, GDPR/ISO 27001 data governance, and Zero Trust security protocols.",
    aFa: "بر اساس مشخصات اجرایی EAOS، کلیه مدل‌های هوش مصنوعی ما ملزم به رعایت جداسازی حافظه ۵ لایه سازمانی، انطباق با استانداردهای GDPR و ISO 27001 و معماری امنیت اعتماد صفر (Zero Trust) هستند."
  }
];

export const FAQPage: React.FC<FAQPageProps> = ({ setPage }) => {
  const { direction, isFa } = useLanguage();
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [expandedId, setExpandedId] = React.useState<string | null>('faq-1');

  const filteredFaqs = React.useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const q = isFa ? item.qFa : item.qEn;
      const a = isFa ? item.aFa : item.aEn;
      const matchSearch =
        searchQuery.trim() === '' ||
        q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery, isFa]);

  return (
    <div dir={direction} className="pb-20">
      <PageHeader
        title={isFa ? 'پرسش‌های متداول و مرجع پاسخ‌های فنی' : 'Frequently Asked Questions'}
        subtitle={
          isFa
            ? 'پاسخ‌های شفاف و مستند به پرسش‌های رایج در زمینه فناوری‌ها، رجیستری شواهد، سرمایه‌گذاری و حاکمیت KKM.'
            : 'Authoritative answers regarding GMEL technology, Evidence Registry, investment models, and corporate governance.'
        }
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16 max-w-4xl">
        {/* Search & Category Filter */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-800 mb-10">
          <div className="relative mb-6">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 rtl:left-auto rtl:right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isFa ? 'جستجو در پرسش‌ها و پاسخ‌ها...' : 'Search questions, keywords, or topics...'}
              className="w-full pl-12 pr-4 rtl:pl-4 rtl:pr-12 py-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: isFa ? 'همه موضوعات' : 'All Topics' },
              { id: 'tech', label: isFa ? 'فناوری و GMEL' : 'Technology & GMEL' },
              { id: 'evidence', label: isFa ? 'شواهد و ممیزی (A-G)' : 'Evidence Registry' },
              { id: 'invest', label: isFa ? 'سرمایه‌گذاری و شراکت' : 'Investment & Consortia' },
              { id: 'rural', label: isFa ? 'توسعه روستایی' : 'Rural Initiatives' },
              { id: 'gov', label: isFa ? 'حاکمیت داده و امنیت' : 'Security & Governance' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                  className="w-full p-6 text-start flex items-center justify-between gap-4 font-bold text-slate-900 dark:text-white hover:text-primary transition-colors cursor-pointer"
                  aria-expanded={isExpanded}
                >
                  <span className="text-sm sm:text-base leading-snug">
                    {isFa ? faq.qFa : faq.qEn}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isExpanded ? 'rotate-180 text-primary' : ''
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                    <p>{isFa ? faq.aFa : faq.aEn}</p>
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <HelpCircle className="w-10 h-10 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                {isFa ? 'پرسشی متناسب با جستجوی شما یافت نشد.' : 'No matching questions found.'}
              </p>
              <button
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                className="mt-3 text-xs text-primary font-bold hover:underline"
              >
                {isFa ? 'بازنشانی فیلترها' : 'Clear search and filters'}
              </button>
            </div>
          )}
        </div>

        {/* Contact fallback */}
        <div className="mt-12 text-center p-8 bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-200 dark:border-slate-800">
          <h3 className="font-bold text-slate-900 dark:text-white mb-2">
            {isFa ? 'پرسش دیگری دارید که در اینجا ذکر نشده است؟' : 'Have a question that is not covered here?'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
            {isFa
              ? 'تیم مهندسی و دبیرخانه سازمانی KKM آماده پاسخگویی دقیق و ارائه اسناد تکمیلی می‌باشند.'
              : 'Our engineering desk and corporate secretariat provide documented responses within 24 hours.'}
          </p>
          {setPage && (
            <button
              onClick={() => setPage(Page.Contact)}
              className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
            >
              {isFa ? 'ارسال پرسش به دبیرخانه' : 'Submit Direct Inquiry'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
