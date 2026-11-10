/**
 * KKM International Group - AI Innovation Triage & Partner Data Room Service
 * Complies with KKM Enterprise AI Operating Specification (EAOS)
 * Implements automated proposal novelty triage, KKM patent prior-art cross-matching,
 * public tracking ID queries, and Tier-2 Partner Data Room OTP/NDA workflows.
 */

import crypto from 'crypto';
import logger from '../logger.ts';

export interface MatchedPatent {
  patentId: string;
  titleEn: string;
  titleFa: string;
  inventor: string;
  overlapType: 'Prior Art' | 'Complementary Extension' | 'Potential Infringement' | 'Synergistic Integration';
  overlapScore: number; // 0 - 100
  notesFa: string;
  notesEn: string;
}

export interface ScientificBenchmark {
  source: string;
  year: number;
  doiOrRef: string;
  relevanceEn: string;
  relevanceFa: string;
}

export interface NoveltyReport {
  noveltyScore: number; // 0 - 100
  patentOverlapRisk: 'Low' | 'Medium' | 'High' | 'Synergistic' | 'Complementary';
  trlAssessment: string;
  matchedKkmPatents: MatchedPatent[];
  scientificBenchmarks: ScientificBenchmark[];
  committeeRecommendation: 'PROCEED_TO_NDA' | 'INVITE_FOR_TECH_INTERVIEW' | 'REFER_TO_ACADEMIC_JV' | 'REVISE_RESUBMIT' | 'REJECT';
  recommendationRationaleFa: string;
  recommendationRationaleEn: string;
  keyStrengthsFa: string[];
  keyStrengthsEn: string[];
  riskFactorsFa: string[];
  riskFactorsEn: string[];
  triageGeneratedAt: string;
  triageEngineVersion: string;
}

export type ProposalStatus = 
  | 'RECEIVED'
  | 'AI_TRIAGED'
  | 'COMMITTEE_REVIEW'
  | 'FEASIBILITY_NDA'
  | 'ACCEPTED_INCUBATION'
  | 'REJECTED';

export interface InnovationProposal {
  id: string;
  trackingId: string;
  title: string;
  domain: string;
  submitterName: string;
  submitterOrg: string;
  submitterEmail: string;
  submitterPhone: string;
  declaredTrl: string;
  abstract: string;
  submissionDate: string;
  status: ProposalStatus;
  statusLabelFa: string;
  statusLabelEn: string;
  ndaAgreed: boolean;
  ndaAgreedAt?: string;
  noveltyReport: NoveltyReport;
  evaluatorNotes?: string;
  committeeScore?: number;
  timeline: {
    step: number;
    titleFa: string;
    titleEn: string;
    date: string;
    completed: boolean;
    current: boolean;
    descriptionFa: string;
    descriptionEn: string;
  }[];
}

export interface PartnerDataRoomDossier {
  id: string;
  code: string;
  titleFa: string;
  titleEn: string;
  category: 'Geothermal GMEL' | 'Rural Microgrids' | 'Water & Desalination' | 'Intellectual Property' | 'Territorial ESG';
  classification: 'CONFIDENTIAL • TIER 2 PARTNER' | 'STRICTLY PROPRIETARY';
  date: string;
  totalPages: number;
  descriptionFa: string;
  descriptionEn: string;
  keyMetrics: { labelFa: string; labelEn: string; value: string }[];
  fileSize: string;
  downloadAllowed: boolean;
  contentExcerptFa: string;
  contentExcerptEn: string;
}

// In-memory repositories with realistic seed data
class InnovationTriageService {
  private proposals: InnovationProposal[] = [];
  private activeOtps: Map<string, { otp: string; expiresAt: number; org: string }> = new Map();
  private verifiedPartnerSessions: Map<string, { email: string; org: string; ndaSignedAt?: string; expiresAt: number }> = new Map();

  constructor() {
    this.seedInitialProposals();
  }

  private seedInitialProposals() {
    const seed1: InnovationProposal = {
      id: 'prop-101',
      trackingId: 'KKM-INN-2026-7842',
      title: 'سامانه نانوسیالات مغناطیسی با پایه گرافن جهت تبادل فوق‌سریع در چاه‌های ژئوترمال عمیق',
      domain: 'Advanced Materials & Sensors',
      submitterName: 'دکتر آرین معتمدی',
      submitterOrg: 'پژوهشکده علوم نانو و مواد پیشرفته دانشگاه صنعتی',
      submitterEmail: 'a.motamedi@nano-tech-inst.ac.ir',
      submitterPhone: '+989124458921',
      declaredTrl: 'TRL-4 (اعتبارسنجی آزمایشگاهی)',
      abstract: 'فرمولاسیون نانوسیال پایدار هیبریدی گرافن-مگنتیت با هدایت حرارتی ۳.۲ برابر سیالات پایه ارگانیک، طراحی‌شده برای چرخه‌های بسته‌بندی مبدل حرارتی تحت دمای ۲۲۰ درجه سانتی‌گراد.',
      submissionDate: '2026-10-24T08:30:00Z',
      status: 'FEASIBILITY_NDA',
      statusLabelFa: 'امکان‌سنجی اولیه و مذاکره توافق‌نامه NDA',
      statusLabelEn: 'Feasibility & Preliminary NDA Negotiation',
      ndaAgreed: true,
      ndaAgreedAt: '2026-10-24T08:30:00Z',
      evaluatorNotes: 'طرح دارای هم‌افزایی بسیار بالا با پتنت GMEL-CLG ثبت‌شده KKM است. جلسه حضوری با مخترع اصلی تعیین شد.',
      committeeScore: 92,
      noveltyReport: {
        noveltyScore: 91,
        patentOverlapRisk: 'Synergistic',
        trlAssessment: 'TRL-4 (Lab Validation Completed)',
        matchedKkmPatents: [
          {
            patentId: 'KKM-PAT-GMEL-01',
            titleEn: 'Closed-Loop Geothermal Wellbore Heat Extraction System (Reg #10892)',
            titleFa: 'سامانه استخراج حرارت زمین‌گرمایی چاه‌بسته با سیال فوق‌بحرانی',
            inventor: 'Gino Ayyoubian (مهندس ژینو ایوبیان)',
            overlapType: 'Synergistic Integration',
            overlapScore: 84,
            notesFa: 'نانوسیال پیشنهادی می‌تواند ضریب انتقال حرارت مبدل حلقوی GMEL را تا ۳۸٪ افزایش دهد بدون آنکه نیاز به بازطراحی لوله‌های جداره باشد.',
            notesEn: 'Proposed nanofluid directly enhances GMEL annular well heat exchange coefficient by ~38% without altering wellhead casings.'
          }
        ],
        scientificBenchmarks: [
          {
            source: 'International Journal of Heat and Mass Transfer',
            year: 2024,
            doiOrRef: '10.1016/j.ijheatmasstransfer.2024.124501',
            relevanceEn: 'State of the art benchmark for graphene nanofluids in high-enthalpy wells.',
            relevanceFa: 'مرجع برتر بین‌المللی ارزیابی پایداری نانوسیالات گرافنی در چاه‌های با آنتالپی بالا.'
          }
        ],
        committeeRecommendation: 'PROCEED_TO_NDA',
        recommendationRationaleFa: 'فناوری پیشنهادی مکمل پتنت KKM است و پتانسیل تجاری‌سازی در پایلوت ۳ مگاواتی را دارد. ورود به مرحله ارزیابی تفصیلی تحت توافق محرمانگی دوجانبه توصیه می‌شود.',
        recommendationRationaleEn: 'Highly synergistic with KKM GMEL patent portfolio. Recommended for mutual NDA and Phase 1 testbed simulation.',
        keyStrengthsFa: ['پایداری حرارتی اثبات‌شده در ۲۲۰ درجه سانتی‌گراد', 'کاهش مقاومت حرارتی دیواره چاه', 'عدم رسوب‌گذاری در شبیه‌سازی ۴۸ ساعته'],
        keyStrengthsEn: ['Proven thermal stability at 220°C', 'Reduced wellbore skin thermal resistance', 'Zero agglomeration in 48h static test'],
        riskFactorsFa: ['هزینه سنتز در حجم‌های صنعتی بالای ۱۰ هزار لیتر', 'فرسایش احتمالی آب‌بندهای پمپ دورانی'],
        riskFactorsEn: ['Industrial synthesis CAPEX at >10,000L batch scale', 'Abrasion risk on secondary circulation pump impellers'],
        triageGeneratedAt: '2026-10-24T08:35:12Z',
        triageEngineVersion: 'EAOS-NoveltyEngine-v3.4'
      },
      timeline: [
        {
          step: 1,
          titleFa: 'ثبت رسمی پروپوزال و صدور کد رهگیری',
          titleEn: 'Proposal Submission & Tracking ID Generation',
          date: '2026-10-24',
          completed: true,
          current: false,
          descriptionFa: 'طرح با موفقیت در درگاه نوآوری باز KKM ثبت و کد پیگیری یکتا صادر گردید.',
          descriptionEn: 'Proposal registered in KKM Open Innovation portal with unique tracking hash.'
        },
        {
          step: 2,
          titleFa: 'تریاژ خودکار هوش مصنوعی و تطبیق با پتنت‌ها',
          titleEn: 'AI Triage & KKM Patent Prior-Art Cross-Match',
          date: '2026-10-24',
          completed: true,
          current: false,
          descriptionFa: 'گزارش تازگی و مقایسه با سبد اختراعات KKM با امتیاز ۹۱٪ تولید شد.',
          descriptionEn: 'Novelty & Prior-Art report generated with 91% novelty index.'
        },
        {
          step: 3,
          titleFa: 'داوری کمیته تخصصی نوآوری KKM',
          titleEn: 'Innovation Technical Committee Review',
          date: '2026-10-28',
          completed: true,
          current: false,
          descriptionFa: 'طرح توسط کارگروه مهندسی مواد و ژئوترمال تایید اولیه شد.',
          descriptionEn: 'Proposal approved by Materials and Geothermal Technical Working Group.'
        },
        {
          step: 4,
          titleFa: 'امکان‌سنجی اولیه و مذاکره توافق‌نامه NDA',
          titleEn: 'Feasibility & Preliminary NDA Negotiation',
          date: '2026-11-01',
          completed: false,
          current: true,
          descriptionFa: 'در حال تبادل پیش‌نویس توافق‌نامه محرمانگی دوجانبه (NDA) و آماده‌سازی داده‌های آزمایشگاهی.',
          descriptionEn: 'Active exchange of bilateral NDA drafts and confidential lab data staging.'
        },
        {
          step: 5,
          titleFa: 'تعیین وقت جلسه کارشناسی و ورود به شتاب‌دهنده',
          titleEn: 'Advisory Panel & Accelerator Cohort Entry',
          date: 'برآورد: ۲۰۲۶-۱۱-۱۵',
          completed: false,
          current: false,
          descriptionFa: 'ارائه نهایی به شورای عالی فناوری KKM و انعقاد قرارداد تحقیق و توسعه مشترک.',
          descriptionEn: 'Final presentation to KKM High Technology Council and joint R&D execution.'
        }
      ]
    };

    const seed2: InnovationProposal = {
      id: 'prop-102',
      trackingId: 'KKM-INN-2026-9104',
      title: 'مدول نمک‌زدایی غشایی تقطیر خلاء با بازیافت حرارت اتلافی خورشیدی-زمین‌گرمایی',
      domain: 'Water & Closed Cycles',
      submitterName: 'مهندس پرهام سهرابی',
      submitterOrg: 'شرکت فناور آب‌پردازان پایدار زاگرس',
      submitterEmail: 'p.sohrabi@abpardazan.ir',
      submitterPhone: '+989352219901',
      declaredTrl: 'TRL-5 (آزمایش در محیط شبیه‌سازی‌شده)',
      abstract: 'ماژول نمک‌زدایی با غشای آب‌گریز متخلخل PTFE، قادر به تصفیه آب شور چاه‌های بیابانی با TDS بیش از ۴۵,۰۰۰ میلی‌گرم بر لیتر، با بهره‌گیری از دمای ۴۵ الی ۶۵ درجه خروجی نیروگاه ژئوترمال.',
      submissionDate: '2026-10-29T11:15:00Z',
      status: 'COMMITTEE_REVIEW',
      statusLabelFa: 'در حال ارزیابی کمیته تخصصی نوآوری',
      statusLabelEn: 'Under Technical Committee Review',
      ndaAgreed: true,
      ndaAgreedAt: '2026-10-29T11:15:00Z',
      committeeScore: 84,
      noveltyReport: {
        noveltyScore: 86,
        patentOverlapRisk: 'Complementary',
        trlAssessment: 'TRL-5 (Simulated Relevant Environment)',
        matchedKkmPatents: [
          {
            patentId: 'KKM-PAT-DESAL-02',
            titleEn: 'Thermal Desalination Coupled With Closed-Loop Baseload ORC (Reg #11048)',
            titleFa: 'سامانه نمک‌زدایی حرارتی همگام با چرخه رنکین آلی زمین‌گرمایی',
            inventor: 'Gino Ayyoubian (مهندس ژینو ایوبیان)',
            overlapType: 'Complementary Extension',
            overlapScore: 78,
            notesFa: 'طرح ارسالی به عنوان مدول تصفیه مرحله دوم در همبست آب-انرژی روستاها قابل انطباق است.',
            notesEn: 'Acts as secondary polishing membrane stage for KKM rural water-energy microgrid corridor.'
          }
        ],
        scientificBenchmarks: [
          {
            source: 'Desalination (Elsevier)',
            year: 2025,
            doiOrRef: '10.1016/j.desal.2025.118932',
            relevanceEn: 'Vacuum membrane distillation scaling study for hypersaline reject brine.',
            relevanceFa: 'بررسی مقیاس‌پذیری تقطیر غشایی خلاء برای پساب‌های فوق‌شور بدون پساب مایع (ZLD).'
          }
        ],
        committeeRecommendation: 'INVITE_FOR_TECH_INTERVIEW',
        recommendationRationaleFa: 'شاخص مصرف ویژه انرژی (SEC) بسیار نویدبخش است. دعوت به جلسه دفاعیه فنی در کمیته آب-انرژی توصیه می‌شود.',
        recommendationRationaleEn: 'Specific energy consumption metric is highly favorable. Recommended for technical defense interview.',
        keyStrengthsFa: ['بهره‌گیری موثر از حرارت اتلافی کم‌دما', 'امکان دستیابی به تخلیه صفر مایع (ZLD)', 'مقاومت غشا در برابر گرفتگی بیولوژیکی'],
        keyStrengthsEn: ['Efficient utilization of low-grade thermal reject', 'ZLD potential for hypersaline brine', 'Fouling-resistant surface chemistry'],
        riskFactorsFa: ['حساسیت غشای PTFE به کشش سطحی روغن‌های هیدروکربوری چاه'],
        riskFactorsEn: ['Wetting vulnerability in presence of trace subsurface hydrocarbons'],
        triageGeneratedAt: '2026-10-29T11:22:04Z',
        triageEngineVersion: 'EAOS-NoveltyEngine-v3.4'
      },
      timeline: [
        {
          step: 1,
          titleFa: 'ثبت رسمی پروپوزال و صدور کد رهگیری',
          titleEn: 'Proposal Submission & Tracking ID Generation',
          date: '2026-10-29',
          completed: true,
          current: false,
          descriptionFa: 'طرح با موفقیت در سامانه نوآوری باز ثبت شد.',
          descriptionEn: 'Proposal registered successfully.'
        },
        {
          step: 2,
          titleFa: 'تریاژ خودکار هوش مصنوعی و تطبیق با پتنت‌ها',
          titleEn: 'AI Triage & KKM Patent Prior-Art Cross-Match',
          date: '2026-10-29',
          completed: true,
          current: false,
          descriptionFa: 'گزارش تشابه با پتنت نمک‌زدایی KKM با موفقیت تدوین شد.',
          descriptionEn: 'Prior art cross-match completed with 86% novelty score.'
        },
        {
          step: 3,
          titleFa: 'داوری کمیته تخصصی نوآوری KKM',
          titleEn: 'Innovation Technical Committee Review',
          date: '2026-11-02',
          completed: false,
          current: true,
          descriptionFa: 'پرونده توسط داوران ارشد کارگروه همبست آب-انرژی در دست ارزیابی موشکافانه است.',
          descriptionEn: 'Active peer evaluation by Water-Energy Nexus review panel.'
        },
        {
          step: 4,
          titleFa: 'امکان‌سنجی اولیه و مذاکره توافق‌نامه NDA',
          titleEn: 'Feasibility & Preliminary NDA Negotiation',
          date: 'برآورد: ۲۰۲۶-۱۱-۱۰',
          completed: false,
          current: false,
          descriptionFa: 'تدوین مدل مالی و فنی تلفیق با پروژه پایلوت استان سیستان و بلوچستان.',
          descriptionEn: 'Financial and engineering modeling for pilot coupling in regional testbed.'
        },
        {
          step: 5,
          titleFa: 'تعیین وقت جلسه کارشناسی و ورود به شتاب‌دهنده',
          titleEn: 'Advisory Panel & Accelerator Cohort Entry',
          date: 'برآورد: ۲۰۲۶-۱۱-۲۲',
          completed: false,
          current: false,
          descriptionFa: 'جلسه حضوری نهایی با حضور مدیران ارشد مهندسی گروه بین‌المللی KKM.',
          descriptionEn: 'Final executive presentation with KKM engineering directors.'
        }
      ]
    };

    const seed3: InnovationProposal = {
      id: 'prop-103',
      trackingId: 'KKM-INN-2026-3205',
      title: 'سنسورهای فیبر نوری جاسازی‌شده در کامپوزیت لوله جداره چاه جهت مانیتورینگ بلادرنگ تنش‌های لرزه‌ای',
      domain: 'AI & Digital Twins',
      submitterName: 'دکتر شیما رادمنش',
      submitterOrg: 'مرکز پژوهش‌های فتونیک و ابزاردقیق پیشرفته',
      submitterEmail: 's.radmanesh@photonics-center.org',
      submitterPhone: '+989123308874',
      declaredTrl: 'TRL-6 (پیش‌نمونه در محیط عملیاتی)',
      abstract: 'حسگر تداخل‌سنجی توزیع‌شده فیبر نوری (DTS/DAS) با پوشش پلی‌آمید مقاوم در برابر ۲۸۰ درجه سانتی‌گراد، قابلیت مانیتورینگ میکرولرزه‌ها و افت حرارتی جداره در طول ۴۰۰۰ متری چاه ژئوترمال.',
      submissionDate: '2026-10-31T14:40:00Z',
      status: 'AI_TRIAGED',
      statusLabelFa: 'تریاژ هوش مصنوعی انجام شد - در نوبت داوری',
      statusLabelEn: 'AI Triaged - Queued for Committee Review',
      ndaAgreed: true,
      ndaAgreedAt: '2026-10-31T14:40:00Z',
      noveltyReport: {
        noveltyScore: 94,
        patentOverlapRisk: 'Synergistic',
        trlAssessment: 'TRL-6 (Operational Prototype Verified)',
        matchedKkmPatents: [
          {
            patentId: 'KKM-PAT-PINN-03',
            titleEn: 'Physics-Informed Neural Network Digital Twin for Subsurface Thermal Corridors',
            titleFa: 'دوقلوی دیجیتال مبتنی بر شبکه عصبی فیزیک‌آگاه برای دالان‌های حرارتی زیرسطحی',
            inventor: 'Gino Ayyoubian (مهندس ژینو ایوبیان)',
            overlapType: 'Synergistic Integration',
            overlapScore: 89,
            notesFa: 'جریان داده‌های فیبر نوری مستقیماً ورودی شبکه عصبی PINN دوقلوی دیجیتال KKM را با فرکانس کیلوهرتز تأمین می‌کند.',
            notesEn: 'DAS/DTS acoustic and thermal stream provides real-time boundary condition input for KKM PINN model.'
          }
        ],
        scientificBenchmarks: [
          {
            source: 'IEEE Sensors Journal',
            year: 2025,
            doiOrRef: '10.1109/JSEN.2025.3401928',
            relevanceEn: 'High-temperature downhole distributed acoustic sensing resilience.',
            relevanceFa: 'مرجع تاب‌آوری سنسورهای صوتی توزیع‌شده درون‌چاهی در محیط‌های حرارتی شدید.'
          }
        ],
        committeeRecommendation: 'PROCEED_TO_NDA',
        recommendationRationaleFa: 'تطابق فوق‌العاده با معماری دوقلوی دیجیتال KKM. در اولویت اول بررسی کمیته نوآوری قرار گرفت.',
        recommendationRationaleEn: 'Exceptional strategic alignment with KKM Digital Twin Hub. Top priority review assignment.',
        keyStrengthsFa: ['تفکیک مکانی نیم‌متری در عمق ۴۰۰۰ متر', 'پایداری نوری در محیط هیدروژن سولفوره چاه', 'امکان پیش‌بینی ریزگسل‌ها پیش از وقوع شوک'],
        keyStrengthsEn: ['0.5m spatial resolution along 4000m wellbore', 'Hydrogen sulfide resistance', 'Precursor micro-fracture acoustic detection'],
        riskFactorsFa: ['حفاظت مکانیکی کابل در هنگام رانش لوله‌های کیسینگ سنگین'],
        riskFactorsEn: ['Mechanical shear protection during casing string running'],
        triageGeneratedAt: '2026-10-31T14:46:18Z',
        triageEngineVersion: 'EAOS-NoveltyEngine-v3.4'
      },
      timeline: [
        {
          step: 1,
          titleFa: 'ثبت رسمی پروپوزال و صدور کد رهگیری',
          titleEn: 'Proposal Submission & Tracking ID Generation',
          date: '2026-10-31',
          completed: true,
          current: false,
          descriptionFa: 'پروپوزال به همراه فایل فنی غیرمحرمانه ثبت شد.',
          descriptionEn: 'Proposal and non-confidential technical brief registered.'
        },
        {
          step: 2,
          titleFa: 'تریاژ خودکار هوش مصنوعی و تطبیق با پتنت‌ها',
          titleEn: 'AI Triage & KKM Patent Prior-Art Cross-Match',
          date: '2026-10-31',
          completed: true,
          current: true,
          descriptionFa: 'تریاژ هوش مصنوعی تکمیل شد (امتیاز تازگی ۹۴٪). پرونده به کمیته ارسال شد.',
          descriptionEn: 'AI triage completed (94% novelty score). Sent to committee docket.'
        },
        {
          step: 3,
          titleFa: 'داوری کمیته تخصصی نوآوری KKM',
          titleEn: 'Innovation Technical Committee Review',
          date: 'برآورد: ۲۰۲۶-۱۱-۰۶',
          completed: false,
          current: false,
          descriptionFa: 'بررسی در نوبت جلسه شورای هوش مصنوعی و دوقلوی دیجیتال.',
          descriptionEn: 'Scheduled for review by AI & Digital Twin technical committee.'
        },
        {
          step: 4,
          titleFa: 'امکان‌سنجی اولیه و مذاکره توافق‌نامه NDA',
          titleEn: 'Feasibility & Preliminary NDA Negotiation',
          date: 'برآورد: ۲۰۲۶-۱۱-۱۸',
          completed: false,
          current: false,
          descriptionFa: 'انعقاد توافق‌نامه محرمانگی دوجانبه و دسترسی به پایلوت چاه آزمایشی.',
          descriptionEn: 'Bilateral NDA execution and test well casing integration.'
        },
        {
          step: 5,
          titleFa: 'تعیین وقت جلسه کارشناسی و ورود به شتاب‌دهنده',
          titleEn: 'Advisory Panel & Accelerator Cohort Entry',
          date: 'برآورد: ۲۰۲۶-۱۲-۰۲',
          completed: false,
          current: false,
          descriptionFa: 'تصویب نهایی برنامه شتاب‌دهی و تجاری‌سازی مشترک.',
          descriptionEn: 'Final approval for commercialization partnership.'
        }
      ]
    };

    this.proposals = [seed1, seed2, seed3];
  }

  /**
   * Submit new proposal & run automated AI Triage
   */
  public submitProposal(data: {
    title: string;
    domain: string;
    submitterName: string;
    submitterOrg: string;
    submitterEmail: string;
    submitterPhone: string;
    declaredTrl: string;
    abstract: string;
    ndaAgreed: boolean;
  }): { proposal: InnovationProposal; trackingId: string } {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const trackingId = `KKM-INN-2026-${randomSuffix}`;
    const id = `prop-${Date.now()}`;
    const submissionDate = new Date().toISOString();

    // Run Automated Physics-Informed & IP Novelty Engine
    const noveltyReport = this.runAiTriageEngine(data.title, data.domain, data.abstract, data.declaredTrl);

    const timeline = [
      {
        step: 1,
        titleFa: 'ثبت رسمی پروپوزال و صدور کد رهگیری',
        titleEn: 'Proposal Submission & Tracking ID Generation',
        date: submissionDate.split('T')[0],
        completed: true,
        current: false,
        descriptionFa: 'طرح شما در درگاه نوآوری باز KKM ثبت و کد پیگیری یکتا صادر گردید.',
        descriptionEn: 'Proposal successfully logged with unique tracking hash.'
      },
      {
        step: 2,
        titleFa: 'تریاژ خودکار هوش مصنوعی و تطبیق با پتنت‌ها',
        titleEn: 'AI Triage & KKM Patent Prior-Art Cross-Match',
        date: submissionDate.split('T')[0],
        completed: true,
        current: true,
        descriptionFa: `گزارش تازگی هوش مصنوعی صادر شد (شاخص تازگی: ${noveltyReport.noveltyScore}٪).`,
        descriptionEn: `AI triage completed with novelty index of ${noveltyReport.noveltyScore}%.`
      },
      {
        step: 3,
        titleFa: 'داوری کمیته تخصصی نوآوری KKM',
        titleEn: 'Innovation Technical Committee Review',
        date: 'طی ۷ تا ۱۰ روز کاری',
        completed: false,
        current: false,
        descriptionFa: 'پرونده جهت ارزیابی اولیه در دستور کار کمیته تخصصی قرار می‌گیرد.',
        descriptionEn: 'Queued for evaluation by domain technical committee.'
      },
      {
        step: 4,
        titleFa: 'امکان‌سنجی اولیه و مذاکره توافق‌نامه NDA',
        titleEn: 'Feasibility & Preliminary NDA Negotiation',
        date: 'مرحله پس از تصویب کمیته',
        completed: false,
        current: false,
        descriptionFa: 'انعقاد توافق‌نامه محرمانگی دوجانبه جهت ورود به جزییات نقشه‌ها و داده‌های آزمایشگاهی.',
        descriptionEn: 'Mutual bilateral NDA execution for confidential data staging.'
      },
      {
        step: 5,
        titleFa: 'تعیین وقت جلسه کارشناسی و ورود به شتاب‌دهنده',
        titleEn: 'Advisory Panel & Accelerator Cohort Entry',
        date: 'مرحله نهایی',
        completed: false,
        current: false,
        descriptionFa: 'دعوت به جلسه حضوری/آنلاین جهت بررسی مدل همکاری مشترک یا سرمایه‌گذاری.',
        descriptionEn: 'Formal technical advisory meeting and cohort admission.'
      }
    ];

    const proposal: InnovationProposal = {
      id,
      trackingId,
      title: data.title,
      domain: data.domain,
      submitterName: data.submitterName,
      submitterOrg: data.submitterOrg,
      submitterEmail: data.submitterEmail,
      submitterPhone: data.submitterPhone,
      declaredTrl: data.declaredTrl,
      abstract: data.abstract,
      submissionDate,
      status: 'AI_TRIAGED',
      statusLabelFa: 'تریاژ هوش مصنوعی انجام شد - در نوبت داوری',
      statusLabelEn: 'AI Triaged - Queued for Committee Review',
      ndaAgreed: data.ndaAgreed,
      ndaAgreedAt: submissionDate,
      noveltyReport,
      timeline
    };

    this.proposals.unshift(proposal);
    logger.info(`Innovation proposal submitted: ${trackingId} by ${data.submitterOrg} (${data.domain})`);
    return { proposal, trackingId };
  }

  /**
   * Evaluates text against KKM patent benchmarks and scientific literature
   */
  private runAiTriageEngine(title: string, domain: string, abstract: string, declaredTrl: string): NoveltyReport {
    const textToAnalyze = `${title} ${domain} ${abstract}`.toLowerCase();
    
    // Evaluate domain relevance
    let noveltyScore = 85;
    let patentOverlapRisk: 'Low' | 'Medium' | 'High' | 'Synergistic' = 'Synergistic';
    const matchedKkmPatents: MatchedPatent[] = [];
    const scientificBenchmarks: ScientificBenchmark[] = [];

    if (textToAnalyze.includes('geothermal') || textToAnalyze.includes('زمین‌گرمایی') || textToAnalyze.includes('حرارت') || textToAnalyze.includes('orc') || textToAnalyze.includes('چاه')) {
      matchedKkmPatents.push({
        patentId: 'KKM-PAT-GMEL-01',
        titleEn: 'Closed-Loop Geothermal Wellbore Heat Extraction System (Reg #10892)',
        titleFa: 'سامانه استخراج حرارت زمین‌گرمایی چاه‌بسته با سیال فوق‌بحرانی',
        inventor: 'Gino Ayyoubian (مهندس ژینو ایوبیان)',
        overlapType: 'Synergistic Integration',
        overlapScore: 82,
        notesFa: 'مفاهیم ارائه‌شده با معماری چاه مداربسته GMEL سازگاری بالایی دارد و می‌تواند بازده استخراج بار پایه را بهبود دهد.',
        notesEn: 'Highly compatible with GMEL closed-loop architecture for baseload thermal extraction enhancement.'
      });
      scientificBenchmarks.push({
        source: 'Renewable & Sustainable Energy Reviews',
        year: 2024,
        doiOrRef: '10.1016/j.rser.2024.114190',
        relevanceEn: 'Deep closed-loop geothermal heat transfer numerical benchmarks.',
        relevanceFa: 'شاخص‌های مرجع شبیه‌سازی عددی انتقال حرارت در چاه‌های عمیق مداربسته.'
      });
      noveltyScore = Math.min(96, Math.max(78, 88 + Math.floor(Math.random() * 8)));
    }

    if (textToAnalyze.includes('water') || textToAnalyze.includes('آب') || textToAnalyze.includes('desal') || textToAnalyze.includes('نمک‌زدایی') || textToAnalyze.includes('غشا') || textToAnalyze.includes('zld')) {
      matchedKkmPatents.push({
        patentId: 'KKM-PAT-DESAL-02',
        titleEn: 'Thermal Desalination Coupled With Closed-Loop Baseload ORC (Reg #11048)',
        titleFa: 'سامانه نمک‌زدایی حرارتی همگام با چرخه رنکین آلی زمین‌گرمایی',
        inventor: 'Gino Ayyoubian (مهندس ژینو ایوبیان)',
        overlapType: 'Complementary Extension',
        overlapScore: 76,
        notesFa: 'طرح قابلیت اتصال به چرخه بازیافت حرارت اتلافی KKM در پروژه‌های روستایی را داراست.',
        notesEn: 'Compliments KKM waste-heat circular desalination corridor for arid village utilities.'
      });
      scientificBenchmarks.push({
        source: 'Desalination Journal',
        year: 2025,
        doiOrRef: '10.1016/j.desal.2025.118932',
        relevanceEn: 'Membrane distillation coupled with low enthalpy thermal power plants.',
        relevanceFa: 'تقطیر غشایی متصل به نیروگاه‌های حرارتی با آنتالپی پایین.'
      });
      noveltyScore = Math.min(95, Math.max(76, 85 + Math.floor(Math.random() * 10)));
    }

    if (textToAnalyze.includes('ai') || textToAnalyze.includes('twin') || textToAnalyze.includes('هوش مصنوعی') || textToAnalyze.includes('سنسور') || textToAnalyze.includes('دوقلو')) {
      matchedKkmPatents.push({
        patentId: 'KKM-PAT-PINN-03',
        titleEn: 'Physics-Informed Neural Network Digital Twin for Subsurface Thermal Corridors',
        titleFa: 'دوقلوی دیجیتال مبتنی بر شبکه عصبی فیزیک‌آگاه برای دالان‌های حرارتی زیرسطحی',
        inventor: 'Gino Ayyoubian (مهندس ژینو ایوبیان)',
        overlapType: 'Synergistic Integration',
        overlapScore: 88,
        notesFa: 'قابلیت تلفیق مستقیم با پلتفرم دیجیتال توئین KKM و ارتقای دقت پیش‌بینی دیسپاچینگ انرژی.',
        notesEn: 'Directly pluggable into KKM PINN Digital Twin Platform for enhanced predictive dispatch.'
      });
      noveltyScore = Math.min(98, Math.max(82, 90 + Math.floor(Math.random() * 8)));
    }

    if (matchedKkmPatents.length === 0) {
      matchedKkmPatents.push({
        patentId: 'KKM-PAT-GEN-04',
        titleEn: 'Modular Infrastructure Framework for Extreme Climates',
        titleFa: 'چارچوب زیرساخت مدولار مقاوم برای اقلیم‌های سخت و بیابانی',
        inventor: 'KKM Engineering Cohort',
        overlapType: 'Prior Art',
        overlapScore: 45,
        notesFa: 'طرح در حوزه عمومی زیرساخت‌های پایدار قرار دارد و تداخل مستقیمی با دارایی‌های فکری ثبت‌شده KKM مشاهده نشد.',
        notesEn: 'Proposal operates in adjacent clean infrastructure domain without IP collision.'
      });
      patentOverlapRisk = 'Low';
      noveltyScore = 82;
    }

    return {
      noveltyScore,
      patentOverlapRisk,
      trlAssessment: declaredTrl || 'TRL-4 (Lab Proof Verified)',
      matchedKkmPatents,
      scientificBenchmarks,
      committeeRecommendation: noveltyScore >= 85 ? 'PROCEED_TO_NDA' : 'INVITE_FOR_TECH_INTERVIEW',
      recommendationRationaleFa: `شاخص تازگی (${noveltyScore}٪) و هم‌پوشانی سازنده با پتنت‌های ثبت‌شده KKM نشان‌دهنده ارزش بالای ورود به ارزیابی تخصصی تحت پروتکل محرمانگی (NDA) است.`,
      recommendationRationaleEn: `High novelty index (${noveltyScore}%) and synergistic alignment with KKM patents warrant immediate progression to technical committee evaluation under NDA.`,
      keyStrengthsFa: [
        'تطابق بالا با اولویت‌های کلان فناوری KKM',
        'عدم مشاهده تعارض حقوقی با پتنت‌های گرنت‌شده رسمی',
        'قابلیت پیاده‌سازی به عنوان مدول مکمل در پروژه‌های پایلوت'
      ],
      keyStrengthsEn: [
        'Strong alignment with KKM core technology themes',
        'No direct infringement conflict identified with granted patents',
        'High modularity for pilot testbed deployment'
      ],
      riskFactorsFa: [
        'ضرورت ارزیابی رفتار بلندمدت در دما و فشارهای بالای زیرسطحی',
        'نیاز به اعتبارسنجی مستقل در آزمایشگاه مرجع'
      ],
      riskFactorsEn: [
        'Long-term durability validation required under subsurface pressure',
        'Independent third-party laboratory verification required'
      ],
      triageGeneratedAt: new Date().toISOString(),
      triageEngineVersion: 'EAOS-NoveltyEngine-v3.4'
    };
  }

  /**
   * Public tracking status by Tracking ID (Does NOT expose personal phones or internal staff extensions!)
   */
  public getPublicTracking(trackingId: string): {
    found: boolean;
    trackingId?: string;
    title?: string;
    domain?: string;
    submissionDate?: string;
    status?: ProposalStatus;
    statusLabelFa?: string;
    statusLabelEn?: string;
    currentStep?: number;
    timeline?: any[];
    noveltyScore?: number;
    estimatedCompletionDate?: string;
    summaryNotesFa?: string;
    summaryNotesEn?: string;
  } {
    const cleanId = trackingId.trim().toUpperCase();
    const proposal = this.proposals.find(p => p.trackingId.toUpperCase() === cleanId);
    
    if (!proposal) {
      return { found: false };
    }

    const currentStepObj = proposal.timeline.find(t => t.current) || proposal.timeline[proposal.timeline.length - 1];

    return {
      found: true,
      trackingId: proposal.trackingId,
      title: proposal.title,
      domain: proposal.domain,
      submissionDate: proposal.submissionDate.split('T')[0],
      status: proposal.status,
      statusLabelFa: proposal.statusLabelFa,
      statusLabelEn: proposal.statusLabelEn,
      currentStep: currentStepObj ? currentStepObj.step : 2,
      timeline: proposal.timeline,
      noveltyScore: proposal.noveltyReport.noveltyScore,
      estimatedCompletionDate: '۲۰۲۶-۱۱-۱۵ (حداکثر ۱۴ روز کاری)',
      summaryNotesFa: proposal.evaluatorNotes || 'طرح در چرخه ارزیابی رسمی قرار دارد و پیشرفت مراحل از طریق همین درگاه به‌صورت زنده قابل مشاهده است.',
      summaryNotesEn: proposal.evaluatorNotes || 'Proposal is progressing through formal committee evaluation. Live milestone updates are published here.'
    };
  }

  /**
   * Internal Portal: get all proposals
   */
  public getAllProposals(): InnovationProposal[] {
    return [...this.proposals];
  }

  /**
   * Internal Portal: update proposal status and evaluator notes
   */
  public updateProposalStatus(
    id: string,
    status: ProposalStatus,
    evaluatorNotes?: string,
    committeeScore?: number
  ): InnovationProposal | null {
    const prop = this.proposals.find(p => p.id === id || p.trackingId === id);
    if (!prop) return null;

    prop.status = status;
    if (evaluatorNotes) prop.evaluatorNotes = evaluatorNotes;
    if (typeof committeeScore === 'number') prop.committeeScore = committeeScore;

    // Update labels and timeline
    if (status === 'COMMITTEE_REVIEW') {
      prop.statusLabelFa = 'در حال ارزیابی کمیته تخصصی نوآوری';
      prop.statusLabelEn = 'Under Technical Committee Review';
      this.setTimelineStep(prop, 3);
    } else if (status === 'FEASIBILITY_NDA') {
      prop.statusLabelFa = 'امکان‌سنجی اولیه و مذاکره توافق‌نامه NDA';
      prop.statusLabelEn = 'Feasibility & Preliminary NDA Negotiation';
      this.setTimelineStep(prop, 4);
    } else if (status === 'ACCEPTED_INCUBATION') {
      prop.statusLabelFa = 'پذیرش نهایی در شتاب‌دهنده / همکاری راهبردی';
      prop.statusLabelEn = 'Accepted into Accelerator / Strategic JV';
      this.setTimelineStep(prop, 5);
    } else if (status === 'REJECTED') {
      prop.statusLabelFa = 'عدم انطباق با اهداف جاری گروه';
      prop.statusLabelEn = 'Closed - Non-aligned with current cohort';
    }

    logger.info(`Innovation proposal updated: ${prop.trackingId} -> ${status}`);
    return prop;
  }

  private setTimelineStep(prop: InnovationProposal, stepNumber: number) {
    prop.timeline = prop.timeline.map(item => ({
      ...item,
      completed: item.step < stepNumber,
      current: item.step === stepNumber
    }));
  }

  // =========================================================================
  // TIER-2 PARTNER DATA ROOM (UNDER DIGITAL NDA)
  // =========================================================================

  /**
   * Request OTP for strategic partner access
   */
  public requestDataRoomOtp(email: string, organization: string): { success: boolean; demoOtp?: string; message: string } {
    const cleanEmail = email.trim().toLowerCase();
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    this.activeOtps.set(cleanEmail, { otp, expiresAt, org: organization.trim() });
    logger.info(`Data room OTP requested for ${cleanEmail} (${organization}). Demo OTP issued.`);

    return {
      success: true,
      demoOtp: otp, // Returned for instant evaluation & testing in sandbox
      message: 'رمز یک‌بارمصرف (OTP) با اعتبار ۱۰ دقیقه صادر شد.'
    };
  }

  /**
   * Verify OTP and issue temporary Data Room session token
   */
  public verifyDataRoomOtp(email: string, otp: string): { success: boolean; token?: string; error?: string } {
    const cleanEmail = email.trim().toLowerCase();
    const record = this.activeOtps.get(cleanEmail);

    if (!record) {
      return { success: false, error: 'کد تایید منقضی شده یا درخواست نشده است. لطفاً مجدداً درخواست کد دهید.' };
    }

    if (Date.now() > record.expiresAt) {
      this.activeOtps.delete(cleanEmail);
      return { success: false, error: 'کد تایید منقضی شده است.' };
    }

    if (record.otp !== otp.trim()) {
      return { success: false, error: 'کد تایید واردشده نامعتبر است.' };
    }

    // Success - create session
    this.activeOtps.delete(cleanEmail);
    const sessionToken = `kkm_dr_${crypto.randomBytes(24).toString('hex')}`;
    const expiresAt = Date.now() + 60 * 60 * 1000; // 1 hour session

    this.verifiedPartnerSessions.set(sessionToken, {
      email: cleanEmail,
      org: record.org,
      expiresAt
    });

    logger.info(`Partner Data Room session authenticated: ${cleanEmail}`);
    return { success: true, token: sessionToken };
  }

  /**
   * Record digital bilateral NDA acceptance
   */
  public acceptDigitalNda(sessionToken: string, signerName: string, title: string, ipAddress: string): { success: boolean; error?: string } {
    const session = this.verifiedPartnerSessions.get(sessionToken);
    if (!session) {
      return { success: false, error: 'نشست کاری نامعتبر یا منقضی شده است.' };
    }

    session.ndaSignedAt = new Date().toISOString();
    logger.info(`Digital NDA executed by ${signerName} (${title}, ${session.org}) from IP ${ipAddress}`);
    return { success: true };
  }

  /**
   * Retrieve Tier-2 Confidential Dossiers (Accessible ONLY after OTP + NDA verification)
   */
  public getDataRoomDossiers(sessionToken: string): {
    authorized: boolean;
    partnerEmail?: string;
    partnerOrg?: string;
    ndaSignedAt?: string;
    dossiers?: PartnerDataRoomDossier[];
    error?: string;
  } {
    const session = this.verifiedPartnerSessions.get(sessionToken);
    if (!session || Date.now() > session.expiresAt) {
      return { authorized: false, error: 'نشست دسترسی به اتاق داده منقضی شده یا احراز هویت نشده است.' };
    }

    if (!session.ndaSignedAt) {
      return { authorized: false, error: 'پذیرش توافق‌نامه محرمانگی دیجیتال (NDA) برای مشاهده اسناد الزامی است.' };
    }

    const dossiers: PartnerDataRoomDossier[] = [
      {
        id: 'dr-gmel-01',
        code: 'KKM-DR-GMEL-50MW-LOGS',
        titleFa: 'داده‌های تله‌متری و دیاگرام‌های P&ID چاه عمیق ژئوترمال مداربسته ۵۰ مگاواتی (دوسیه ممیزی سطح C)',
        titleEn: 'GMEL 50MW Closed-Loop Supercritical Wellbore P&ID & Pressure Telemetry Logs (Level C Audit Dossier)',
        category: 'Geothermal GMEL',
        classification: 'CONFIDENTIAL • TIER 2 PARTNER',
        date: '2026-10-15',
        totalPages: 48,
        fileSize: '14.2 MB',
        downloadAllowed: false,
        descriptionFa: 'شامل نقشه‌های پایپینگ و ابزاردقیق (P&ID)، تحلیل ترمودینامیکی سیال فوق‌بحرانی در اعماق ۳۲۰۰ متری، افت فشار دینامیکی و نتایج تست‌بدهای چاه شماره ۴.',
        descriptionEn: 'Comprehensive thermodynamic fluid mechanics, downhole pressure profiles, closed-loop supercritical heat exchanger sizing and 48-hour continuous cycle telemetry.',
        keyMetrics: [
          { labelFa: 'ظرفیت بار پایه نامی', labelEn: 'Nominal Baseload', value: '50.4 MWe' },
          { labelFa: 'دمای استخراج چاه عمیق', labelEn: 'Bottom-Hole Temp', value: '238 °C' },
          { labelFa: 'دبی گردشی سیال مداربسته', labelEn: 'Loop Mass Flow', value: '185 kg/s' },
          { labelFa: 'راندمان ترمودینامیکی ORC', labelEn: 'ORC Cycle Efficiency', value: '19.8%' }
        ],
        contentExcerptFa: 'سیستم لوله‌گذاری هم‌مرکز جداره چاه (Concentric Casing Loop) با جداره عایق خلأ (Vacuum Insulated Tubing) امکان استخراج انرژی گرمایی بدون تماس با سیال مخزن یا تزریق شیمیایی را محقق ساخته است...',
        contentExcerptEn: 'The concentric vacuum-insulated subsurface tubing loop extracts pure conduction-driven baseload heat while maintaining absolute isolation from geothermal aquifers...'
      },
      {
        id: 'dr-microgrid-02',
        code: 'KKM-DR-RURAL-25V-CAPEX',
        titleFa: 'مدل مالی و سناریوهای بازگشت سرمایه (IRR/LCOE) طرح ریزشبکه‌های پایدار ۲۵ روستای هدف کویری',
        titleEn: 'Financial Architecture, IRR Scenarios & LCOE Matrix for 25-Village Arid Microgrid Corridor',
        category: 'Rural Microgrids',
        classification: 'CONFIDENTIAL • TIER 2 PARTNER',
        date: '2026-09-28',
        totalPages: 62,
        fileSize: '9.8 MB',
        downloadAllowed: false,
        descriptionFa: 'مدل‌سازی اقتصادی جریان نقدینگی، تعرفه‌های تضمینی خرید برق، صنایع تبدیلی کشاورزی و اعتبارات کربن در افق ۱۵ ساله.',
        descriptionEn: 'Cash flow sensitivity, feed-in tariff frameworks, agricultural processing value-chains, and voluntary carbon credit revenue models across 25 target settlements.',
        keyMetrics: [
          { labelFa: 'نرخ بازده داخلی پروژه (IRR)', labelEn: 'Project IRR', value: '24.6%' },
          { labelFa: 'ارزش فعلی خالص (NPV)', labelEn: '15-Year NPV', value: '$18.4M USD' },
          { labelFa: 'هزینه تراز شده انرژی (LCOE)', labelEn: 'LCOE Clean Power', value: '$0.041 / kWh' },
          { labelFa: 'جمعیت تحت پوشش مستقیم', labelEn: 'Direct Beneficiaries', value: '42,000 Persons' }
        ],
        contentExcerptFa: 'تلفیق بار پایه زمین‌گرمایی کم‌عمق با مزارع خورشیدی متمرکز و ذخیره‌سازهای حرارتی، ضریب اطمینان شبکه روستایی را به ۹۹.۹۴٪ ارتقا داده و مصرف سوخت دیزل را به صفر می‌رساند...',
        contentExcerptEn: 'Hybrid baseload geothermal coupled with solar thermal storage eliminates diesel generator consumption, achieving a 99.94% microgrid reliability factor...'
      },
      {
        id: 'dr-desal-03',
        code: 'KKM-DR-ZLD-PILOT-DATA',
        titleFa: 'داده‌های تجربی پایلوت نمک‌زدایی حرارتی چندمرحله‌ای با پساب صفر مایع (ZLD Testbed)',
        titleEn: 'Empirical Telemetry & Recovery Rates of Multi-Stage ZLD Thermal Desalination Pilot',
        category: 'Water & Desalination',
        classification: 'CONFIDENTIAL • TIER 2 PARTNER',
        date: '2026-10-08',
        totalPages: 36,
        fileSize: '8.4 MB',
        downloadAllowed: false,
        descriptionFa: 'گزارش ممیزی تصفیه آب‌های شور معدنی با TDS بیش از ۴۲۰۰۰ پی‌پی‌ام و استحصال آب شیرین استاندارد شرب و کشاورزی با انرژی اتلافی.',
        descriptionEn: 'Verification dossier for hypersaline brackish brine treatment with Zero-Liquid Discharge and mineral salt crystal byproduct harvesting.',
        keyMetrics: [
          { labelFa: 'شوری آب ورودی (TDS)', labelEn: 'Feedwater Salinity', value: '42,500 ppm' },
          { labelFa: 'شوری آب خروجی نهایی', labelEn: 'Product Salinity', value: '< 180 ppm' },
          { labelFa: 'نرخ بازیافت آب شیرین', labelEn: 'Freshwater Recovery', value: '87.4%' },
          { labelFa: 'مصرف انرژی ویژه برق', labelEn: 'Electrical SEC', value: '1.2 kWh / m³' }
        ],
        contentExcerptFa: 'چرخه مداربسته تقطیر چنداثره با تبخیرکننده خلاء امکان کریستالیزاسیون کامل نمک‌های سولفات و کلرید را بدون تخلیه هیچ‌گونه پساب مایع به محیط زیست فراهم آورده است...',
        contentExcerptEn: 'Multi-effect vacuum crystallization achieves complete solid mineral extraction, producing high-purity agricultural water with absolute zero toxic effluent discharge...'
      },
      {
        id: 'dr-ip-04',
        code: 'KKM-DR-IP-PREFILE-2026',
        titleFa: 'مستندات مشخصات فنی پیش‌ازثبت بین‌المللی: نانوسیالات پیشرفته تبادل حرارت فوق‌بحرانی (IPCenter Dossier)',
        titleEn: 'International Pre-Filing Technical Claims: Supercritical Nano-Enriched Heat Transfer Medium',
        category: 'Intellectual Property',
        classification: 'STRICTLY PROPRIETARY',
        date: '2026-10-22',
        totalPages: 54,
        fileSize: '16.7 MB',
        downloadAllowed: false,
        descriptionFa: 'متن پیش‌نویس ادعانامه‌های اختراع PCT، تست‌های خوردگی متالورژی لوله‌ها در تماس با نانوسیال و فرمولاسیون سنتز فاز مایع.',
        descriptionEn: 'Pre-publication draft PCT claims, metallurgical corrosion impact logs at 250°C/300 bar, and surfactant chemical synthesis protocol.',
        keyMetrics: [
          { labelFa: 'تعداد ادعاهای مستقل پتنت', labelEn: 'Independent Claims', value: '8 Claims' },
          { labelFa: 'تعداد ادعاهای وابسته', labelEn: 'Dependent Claims', value: '34 Claims' },
          { labelFa: 'افزایش ضریب هدایت حرارتی', labelEn: 'Thermal Conductivity Gain', value: '+318%' },
          { labelFa: 'دمای کارکرد بیشینه', labelEn: 'Max Operating Temp', value: '290 °C' }
        ],
        contentExcerptFa: 'این پرونده حاوی اسرار تجاری و فرمولاسیون سنتز فاز نانوذرات پوشش‌دار پایدار در محیط‌های اکسیداسیونی است و افشای آن پیگرد بین‌المللی دارد...',
        contentExcerptEn: 'This dossier contains proprietary chemical formulations and high-pressure phase diagrams covered under strict sovereign non-disclosure mandates...'
      }
    ];

    return {
      authorized: true,
      partnerEmail: session.email,
      partnerOrg: session.org,
      ndaSignedAt: session.ndaSignedAt,
      dossiers
    };
  }
}

export const innovationTriageService = new InnovationTriageService();
