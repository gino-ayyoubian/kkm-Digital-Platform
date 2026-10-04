import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, PhoneCall, PhoneForwarded, PhoneOff, Mic, MicOff, Volume2, 
  VolumeX, Radio, ShieldCheck, Download, Copy, Check, ExternalLink, 
  User, Search, Activity, Sparkles, Server, Globe, Key, FileCode,
  Info, HelpCircle, X, Voicemail, Clock, Play, Pause, AlertTriangle,
  History, Sliders, ListFilter, RefreshCw, Send, CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../../LanguageContext';
import { OrgMemberProfile } from '../../types';
import { INITIAL_ORG_MEMBERS } from '../../data/orgMembers';
import { ExecutiveMemberIdentity } from '../common/ExecutiveMemberIdentity';

interface IvrCommunicationsConsoleProps {
  isOpen?: boolean;
  onClose?: () => void;
  initialExtension?: string;
  initialMember?: OrgMemberProfile | null;
}

// Official Daftare Shoma (دفتر شما) Cloud PBX Configuration Specs
export const DAFTARE_SHOMA_CONFIG = {
  accountName: 'گروه بین‌المللی کیمیا کاران ماد (KKM International Group)',
  accountLine: '+98 21 9103 0830',
  backupLines: ['+98 21 2842 4430', '+98 21 9103 0822'],
  defaultUsername: '206962',
  domainUdp: 'ext.daftareshoma.com:7104',
  domainTcp: 'ext.daftareshoma.com:7103',
  domainWebRtc: 'ext.daftareshoma.com:4443',
  webRtcWssUrl: 'wss://ext.daftareshoma.com:4443',
  stunServer: 'stun:ext.daftareshoma.com:3478',
  panelLoginUrl: 'https://portal.daftareshoma.com',
  dartamasDirectCallUrl: 'https://my.dartamas.com/directLink/61be6882-8824-4c31-8903-aaf074248aa5',
  gitHubRepo: 'https://github.com/gino-ayyoubian/kkm-ivr-daftareshoma',
  architect: 'Gino Ayyoubian (سید ژینو ایوبیان)',
  codecs: ['PCMA (G.711a)', 'PCMU (G.711u)', 'Opus (HD Voice)', 'GSM'],
  vipAccessCode: '*8888',
  hseEmergencyCode: '*9111',
  voicemailCode: '*99'
};

// 3-Layer Organizational IVR Architecture
export interface IvrNode {
  key: string;
  layer: 'Layer 1: Strategic' | 'Layer 2: Operations' | 'Layer 3: Support';
  titleEn: string;
  titleFa: string;
  targetExtension: string;
  targetDepartmentEn: string;
  targetDepartmentFa: string;
  targetLeaderEn: string;
  targetLeaderFa: string;
  announcementEn: string;
  announcementFa: string;
  isSpecialProtocol?: boolean;
}

export const IVR_DIAL_TREE: IvrNode[] = [
  {
    key: '1',
    layer: 'Layer 1: Strategic',
    titleEn: 'Executive Board & CEO Directorate',
    titleFa: 'دفتر مدیرعامل و هیئت مدیره',
    targetExtension: '101',
    targetDepartmentEn: 'Executive Board',
    targetDepartmentFa: 'دفتر مدیرعامل و هیئت مدیره',
    targetLeaderEn: 'Gino Ayyoubian (CEO & Chairman)',
    targetLeaderFa: 'سید ژینو ایوبیان (مدیرعامل و رئیس هیئت مدیره)',
    announcementEn: 'Connecting to the Office of the Chief Executive Officer and Executive Board...',
    announcementFa: 'در حال انتقال به دفتر مدیرعامل و رئیس هیئت مدیره، لطفاً منتظر بمانید...'
  },
  {
    key: '2',
    layer: 'Layer 2: Operations',
    titleEn: 'AI Systems, R&D & Cognitive Engineering',
    titleFa: 'فناوری، هوش مصنوعی و تحقیق و توسعه',
    targetExtension: '102',
    targetDepartmentEn: 'R&D & AI Systems',
    targetDepartmentFa: 'تحقیق و توسعه، هوش مصنوعی و سامانه‌های شناختی',
    targetLeaderEn: 'Dr. Reza Asakereh (CTO)',
    targetLeaderFa: 'دکتر رضا عساکره (مدیر ارشد فناوری)',
    announcementEn: 'Connecting to AI Systems, Cognitive Technologies, and R&D Directorate...',
    announcementFa: 'در حال اتصال به معاونت فناوری اطلاعات، هوش مصنوعی و تحقیق و توسعه...'
  },
  {
    key: '3',
    layer: 'Layer 2: Operations',
    titleEn: 'Earth Science, GMEL Energy & Sustainability',
    titleFa: 'علوم زمین، سامانه‌های انرژی GMEL و پایداری',
    targetExtension: '103',
    targetDepartmentEn: 'Science & Sustainability',
    targetDepartmentFa: 'علوم پایه، پایداری و اکوسیستم‌ها',
    targetLeaderEn: 'Dr. Khosro Jarrahian (CSO)',
    targetLeaderFa: 'دکتر خسرو جراحیان (مدیر ارشد علوم و پایداری)',
    announcementEn: 'Connecting to Earth Sciences and Subsurface Geothermal Engineering...',
    announcementFa: 'در حال اتصال به مدیریت علوم زمین، انرژی‌های پاک و پایایی زیست‌محیطی...'
  },
  {
    key: '4',
    layer: 'Layer 3: Support',
    titleEn: 'Investment, Enterprise IT & Infrastructure Security',
    titleFa: 'سرمایه‌گذاری، شبکه و امنیت زیرساخت',
    targetExtension: '104',
    targetDepartmentEn: 'Finance & Investments',
    targetDepartmentFa: 'سرمایه‌گذاری و امنیت شبکه سازمانی',
    targetLeaderEn: 'Farid Imani (CIO)',
    targetLeaderFa: 'مهندس فرید ایمانی (مدیر ارشد سرمایه‌گذاری و زیرساخت)',
    announcementEn: 'Connecting to Enterprise Systems and Investment Management...',
    announcementFa: 'در حال انتقال به مدیریت سرمایه‌گذاری و امنیت زیرساخت شبکه...'
  },
  {
    key: '5',
    layer: 'Layer 3: Support',
    titleEn: 'Finance, Treasury & Sovereign Capital',
    titleFa: 'امور مالی، حسابداری و اعتبارات بین‌المللی',
    targetExtension: '105',
    targetDepartmentEn: 'Finance & Accounting',
    targetDepartmentFa: 'امور مالی، حسابداری و بودجه‌ریزی',
    targetLeaderEn: 'Dr. Pedram Abdarzadeh (CFO)',
    targetLeaderFa: 'دکتر پدرام آبدارزاده (مدیر ارشد مالی و بودجه)',
    announcementEn: 'Connecting to Financial Affairs and Corporate Treasury...',
    announcementFa: 'در حال انتقال به مدیریت امور مالی، بودجه و اعتبارات...'
  },
  {
    key: '6',
    layer: 'Layer 2: Operations',
    titleEn: 'Field Operations, Rigs & Mega-Projects EPC',
    titleFa: 'عملیات اجرایی، حفاری و مگاپروژه‌ها',
    targetExtension: '106',
    targetDepartmentEn: 'Operations & Logistics',
    targetDepartmentFa: 'عملیات اجرایی، لجستیک و پروژه‌ها',
    targetLeaderEn: 'Heidar Yarveicy (COO)',
    targetLeaderFa: 'مهندس حیدر یارویسی (مدیر ارشد عملیات)',
    announcementEn: 'Connecting to Drilling Operations and Turnkey Project Logistics...',
    announcementFa: 'در حال اتصال به مدیریت عملیات اجرایی، حفاری و لجستیک مگاپروژه‌ها...'
  },
  {
    key: '7',
    layer: 'Layer 3: Support',
    titleEn: 'Public Relations, Media & International Diplomacy',
    titleFa: 'روابط عمومی، رسانه و امور بین‌الملل',
    targetExtension: '204',
    targetDepartmentEn: 'Public Relations',
    targetDepartmentFa: 'روابط عمومی و برندینگ سازمانی',
    targetLeaderEn: 'Masoumeh Moshar',
    targetLeaderFa: 'معصومه مشار (مدیر روابط عمومی و بین‌الملل)',
    announcementEn: 'Connecting to International Communications and Media Relations...',
    announcementFa: 'در حال اتصال به مدیریت روابط عمومی و ارتباطات بین‌الملل...'
  },
  {
    key: '8',
    layer: 'Layer 3: Support',
    titleEn: 'Legal Directorate, Patents & WIPO Affairs',
    titleFa: 'امور حقوقی، قراردادها و مالکیت فکری IP',
    targetExtension: '205',
    targetDepartmentEn: 'Legal & Intellectual Property',
    targetDepartmentFa: 'امور حقوقی و مالکیت فکری',
    targetLeaderEn: 'Hamed Zatajam',
    targetLeaderFa: 'حامد ذات‌عجم (مدیر حقوقی و پتنت‌ها)',
    announcementEn: 'Connecting to Corporate Legal Directorate and Intellectual Property Office...',
    announcementFa: 'در حال انتقال به مدیریت امور حقوقی، قراردادها و مالکیت فکری...'
  },
  {
    key: '9',
    layer: 'Layer 2: Operations',
    titleEn: 'HSE Emergency Incident & Site Safety Protocol (*9111)',
    titleFa: 'مرکز فوریت‌های HSE و ایمنی کارگاه‌ها (*9111)',
    targetExtension: '*9111',
    targetDepartmentEn: 'HSE Emergency Command',
    targetDepartmentFa: 'ستاد واکنش اضطراری و ایمنی پروژه‌ها',
    targetLeaderEn: 'On-Duty Safety Commander',
    targetLeaderFa: 'فرمانده شیفت ایمنی و بهداشت صنعتی',
    announcementEn: 'Connecting to HSE Emergency Command Protocol. All available officers alerted.',
    announcementFa: 'پروتکل شرایط اضطراری HSE فعال گردید. در حال برقراری تماس دارای اولویت اضطراری...',
    isSpecialProtocol: true
  },
  {
    key: '0',
    layer: 'Layer 3: Support',
    titleEn: 'Central Operator & 24/7 Corporate Reception',
    titleFa: 'اپراتور مرکزی و پذیرش شبانه‌روزی سازمان',
    targetExtension: '200',
    targetDepartmentEn: 'Central Dispatch',
    targetDepartmentFa: 'مرکز پذیرش و هدایت تماس‌های سازمانی',
    targetLeaderEn: 'Corporate Receptionist',
    targetLeaderFa: 'میز خدمت و اپراتور پذیرش',
    announcementEn: 'Connecting to the central operator, please hold...',
    announcementFa: 'در حال انتقال به اپراتور مرکزی گروه بین‌المللی کیمیا کاران ماد...'
  }
];

// Audio prompt texts for playback simulation
const AUDIO_PROMPT_SCRIPTS = {
  farsi_main: {
    title: 'پیام اصلی تلفن گویا (فارسی - ساعات اداری)',
    speaker: 'ElevenLabs Studio HD / Persian Voice',
    text: 'سلام. شما با گروه بین‌المللی کیمیا کاران ماد تماس گرفته‌اید. جهت ارتباط با دفتر مدیرعامل و هیئت مدیره عدد ۱، فناوری و هوش مصنوعی عدد ۲، علوم زمین و انرژی‌های پاک عدد ۳، سرمایه‌گذاری و شبکه عدد ۴، امور مالی و حسابداری عدد ۵، عملیات اجرایی و پروژه‌ها عدد ۶، روابط عمومی عدد ۷، امور حقوقی و پتنت‌ها عدد ۸، فوریت‌های HSE عدد ۹ و جهت ارتباط با اپراتور یا صندوق صوتی عدد ۰ را شماره‌گیری فرمایید. همچنین می‌توانید شماره داخلی مورد نظر را مستقیماً وارد کنید.'
  },
  english_main: {
    title: 'Main Gateway Announcement (English - International)',
    speaker: 'ElevenLabs Studio HD / English Voice',
    text: 'Welcome to KKM International Group. For CEO & Executive Directorate press 1, for AI & Technology press 2, for Earth Sciences press 3, for Investments press 4, for Finance press 5, for Operations press 6, for PR press 7, for Legal press 8, for HSE Emergency press 9, or press 0 for operator.'
  },
  after_hours: {
    title: 'پیام شیفت شب و روزهای تعطیل (انتقال به صندوق صوتی)',
    speaker: 'Daftare Shoma Automated System',
    text: 'با سپاس از تماس شما با کیمیا کاران ماد. ساعات کاری شرکت شنبه تا چهارشنبه از ساعت ۸ الی ۱۷ می‌باشد. لطفاً پس از شنیدن بوق، پیام صوتی و شماره تماس خود را بگذارید تا در اولین فرصت با شما تماس گرفته شود.'
  },
  hse_emergency: {
    title: 'پیام هشدار فوری HSE و ایمنی کارگاه‌ها (*9111)',
    speaker: 'Emergency Broadcast System',
    text: 'پروتکل فوریت‌های HSE فعال شد. تماس شما با بالاترین اولویت به تلفن همراه کارشناس ایمنی شیفت در سایت عملیاتی هدایت می‌گردد.'
  }
};

// Extension definition with routing rules
interface LocalExtension {
  extension: string;
  sipUsername: string;
  name: string;
  nameFa: string;
  role: string;
  department: string;
  departmentFa: string;
  directPhone: string;
  mobileForward: string;
  forwardEnabled: boolean;
  ringStrategy: 'simultaneous' | 'sequential' | 'softphone_only';
  status: 'available' | 'busy' | 'away';
}

const INITIAL_EXTENSIONS: LocalExtension[] = [
  { extension: '101', sipUsername: '206962', name: 'Gino Ayyoubian', nameFa: 'سید ژینو ایوبیان', role: 'CEO & Chairman', department: 'Executive Board', departmentFa: 'دفتر مدیرعامل و هیئت مدیره', directPhone: '+98 21 9103 0830', mobileForward: '+98 912 000 0101', forwardEnabled: true, ringStrategy: 'simultaneous', status: 'available' },
  { extension: '102', sipUsername: '206963', name: 'Dr. Reza Asakereh', nameFa: 'دکتر رضا عساکره', role: 'Chief Technology Officer (CTO)', department: 'R&D & AI Systems', departmentFa: 'تحقیق و توسعه، هوش مصنوعی و سامانه‌های شناختی', directPhone: '+98 21 9103 0831', mobileForward: '+98 912 000 0102', forwardEnabled: true, ringStrategy: 'sequential', status: 'available' },
  { extension: '103', sipUsername: '206964', name: 'Dr. Khosro Jarrahian', nameFa: 'دکتر خسرو جراحیان', role: 'Chief Scientific Officer (CSO)', department: 'Earth Sciences & GMEL', departmentFa: 'علوم پایه، پایداری و اکوسیستم‌ها', directPhone: '+98 21 9103 0832', mobileForward: '+98 912 000 0103', forwardEnabled: true, ringStrategy: 'simultaneous', status: 'available' },
  { extension: '104', sipUsername: '206965', name: 'Farid Imani', nameFa: 'فرید ایمانی', role: 'Chief Investment Officer (CIO)', department: 'Finance & Investments', departmentFa: 'سرمایه‌گذاری، تامین مالی و دارایی‌های سرمایه‌ای', directPhone: '+98 21 9103 0833', mobileForward: '+98 912 000 0104', forwardEnabled: false, ringStrategy: 'softphone_only', status: 'available' },
  { extension: '105', sipUsername: '206966', name: 'Dr. Pedram Abdarzadeh', nameFa: 'دکتر پدرام آبدارزاده', role: 'Chief Financial Officer (CFO)', department: 'Finance & Accounting', departmentFa: 'امور مالی، حسابداری و بودجه‌ریزی', directPhone: '+98 21 9103 0834', mobileForward: '+98 912 000 0105', forwardEnabled: true, ringStrategy: 'sequential', status: 'available' },
  { extension: '106', sipUsername: '206967', name: 'Heidar Yarveicy', nameFa: 'حیدر یارویسی', role: 'Chief Operating Officer (COO)', department: 'Operations & Logistics', departmentFa: 'عملیات اجرایی، لجستیک و پروژه‌ها', directPhone: '+98 21 9103 0835', mobileForward: '+98 912 000 0106', forwardEnabled: true, ringStrategy: 'simultaneous', status: 'available' },
  { extension: '107', sipUsername: '206973', name: 'Reza Baghdadchi', nameFa: 'رضا بغدادچی', role: 'Member of the Board & Strategic Development', department: 'Board of Directors', departmentFa: 'هیئت مدیره و راهبرد توسعه کلان', directPhone: '+98 21 9103 0836', mobileForward: '+98 912 000 0107', forwardEnabled: true, ringStrategy: 'simultaneous', status: 'available' },
  { extension: '108', sipUsername: '206974', name: 'Ashkan Tofangchiha', nameFa: 'اشکان تفنگچی‌ها', role: 'Member of the Board & CCO', department: 'Commercial & Global Trade', departmentFa: 'هیئت مدیره، توسعه تجاری و سرمایه‌گذاری بین‌الملل', directPhone: '+98 21 9103 0837', mobileForward: '+98 912 000 0108', forwardEnabled: true, ringStrategy: 'simultaneous', status: 'available' },
  { extension: '200', sipUsername: '206960', name: 'Corporate Central Reception', nameFa: 'پذیرش و اپراتور مرکزی ۲۴ ساعته', role: 'Central Dispatch', department: 'Administration', departmentFa: 'میز خدمت و اپراتور پذیرش', directPhone: '+98 21 9103 0830', mobileForward: '+98 912 000 0200', forwardEnabled: true, ringStrategy: 'simultaneous', status: 'available' },
  { extension: '204', sipUsername: '206971', name: 'Masoumeh Moshar', nameFa: 'معصومه مشار', role: 'Director of Public Relations', department: 'Public Relations', departmentFa: 'روابط عمومی، رسانه و برندینگ سازمانی', directPhone: '+98 21 9103 0845', mobileForward: '+98 912 000 0204', forwardEnabled: false, ringStrategy: 'softphone_only', status: 'available' },
  { extension: '205', sipUsername: '206972', name: 'Hamed Zatajam', nameFa: 'حامد ذات‌عجم', role: 'Director of Legal Affairs & Patents', department: 'Legal Directorate', departmentFa: 'امور حقوقی، مالکیت فکری و پتنت‌ها', directPhone: '+98 21 9103 0846', mobileForward: '+98 912 000 0205', forwardEnabled: true, ringStrategy: 'sequential', status: 'available' },
  { extension: '208', sipUsername: '206978', name: 'Sina Ayyoubian', nameFa: 'سینا ایوبیان', role: 'R&D Engineering Specialist', department: 'Emerging Tech', departmentFa: 'تحقیق و توسعه، فناوری‌های نوظهور و نوآوری', directPhone: '+98 21 9103 0848', mobileForward: '+98 912 000 0208', forwardEnabled: true, ringStrategy: 'simultaneous', status: 'available' },
  { extension: '209', sipUsername: '206979', name: 'Mostafa Sharifi', nameFa: 'مصطفی شریفی', role: 'Senior Project Engineering Specialist', department: 'Technical Office', departmentFa: 'دفتر فنی و مهندسی پروژه', directPhone: '+98 21 9103 0849', mobileForward: '+98 912 000 0209', forwardEnabled: true, ringStrategy: 'sequential', status: 'available' },
  { extension: '210', sipUsername: '206980', name: 'Eng. Ali Rezaei', nameFa: 'مهندس علی رضایی', role: 'Field Engineering Specialist', department: 'Field Operations', departmentFa: 'مهندسی انرژی و نیروگاه‌های زمین‌گرمایی', directPhone: '+98 21 9103 0850', mobileForward: '+98 912 000 0210', forwardEnabled: true, ringStrategy: 'softphone_only', status: 'available' },
  { extension: '211', sipUsername: '206981', name: 'Maryam Bahrami', nameFa: 'مریم بهرامی', role: 'Financial Automation Specialist', department: 'Finance & Treasury', departmentFa: 'امور مالی، حسابداری و بودجه‌ریزی', directPhone: '+98 21 9103 0851', mobileForward: '+98 912 000 0211', forwardEnabled: false, ringStrategy: 'softphone_only', status: 'available' }
];

interface VoicemailItem {
  id: string;
  callerNumber: string;
  callerName?: string;
  targetExtension: string;
  targetDepartmentFa: string;
  timestamp: string;
  durationSeconds: number;
  transcriptionFa: string;
  transcriptionEn: string;
  isRead: boolean;
  priority: 'normal' | 'urgent' | 'vip';
}

const INITIAL_VOICEMAILS: VoicemailItem[] = [
  {
    id: 'VM-2026-0830-01',
    callerNumber: '+98 912 345 6789',
    callerName: 'دکتر محمودی (شرکت مهندسی مپنا)',
    targetExtension: '101',
    targetDepartmentFa: 'دفتر مدیرعامل و هیئت مدیره',
    timestamp: '2026-10-04 11:24',
    durationSeconds: 48,
    transcriptionFa: 'سلام جناب مهندس ایوبیان، محمودی هستم از مپنا. پیرامون جلسه مشترک صحه‌گذاری آزمایشگاهی رآکتور GMEL با دانشگاه تهران هماهنگ کردم و پیش‌نویس تفاهم‌نامه ارسال شد. لطفاً در اولین فرصت تماس بگیرید.',
    transcriptionEn: 'Hello Mr. Ayyoubian, this is Dr. Mahmoudi from MAPNA. I coordinated the lab validation meeting for the GMEL reactor with University of Tehran. Please call back.',
    isRead: false,
    priority: 'vip'
  },
  {
    id: 'VM-2026-0830-02',
    callerNumber: '+98 21 8877 6655',
    callerName: 'دفتر مالکیت معنوی سازمان اسناد',
    targetExtension: '205',
    targetDepartmentFa: 'امور حقوقی و مالکیت فکری',
    timestamp: '2026-10-04 09:15',
    durationSeconds: 32,
    transcriptionFa: 'با سلام، تاییده گواهی ثبت اظهارنامه اختراع سامانه سیکل ترموسیفون با شماره پیگیری ۱۴۰۵۹۸ تایید گردید و آماده تحویل است.',
    transcriptionEn: 'Notification from IP office: Patent declaration registration for thermosiphon cycle has been approved and is ready for pickup.',
    isRead: true,
    priority: 'normal'
  },
  {
    id: 'VM-2026-0830-03',
    callerNumber: '+98 935 111 2233',
    callerName: 'سرپرست کارگاه حفاری قشم (فوری)',
    targetExtension: '106',
    targetDepartmentFa: 'عملیات اجرایی، لجستیک و پروژه‌ها',
    timestamp: '2026-10-03 18:40',
    durationSeconds: 65,
    transcriptionFa: 'مهندس یارویسی عزیز، گزارش ترخیص قطعات یدکی پمپ‌های سانتریفیوژ فشار قوی از گمرک منطقه آزاد قشم دریافت شد و فردا بارگیری می‌شود.',
    transcriptionEn: 'Mr. Yarveicy, clearance report for high-pressure centrifugal pump spare parts received from Qeshm customs, loading tomorrow.',
    isRead: false,
    priority: 'urgent'
  }
];

interface CallRecord {
  id: string;
  callType: 'inbound' | 'outbound' | 'missed' | 'voicemail';
  callerNumber: string;
  destination: string;
  departmentFa: string;
  durationSeconds: number;
  timestamp: string;
  status: string;
}

const INITIAL_CALL_LOGS: CallRecord[] = [
  { id: 'LOG-10492', callType: 'inbound', callerNumber: '+98 912 345 6789', destination: 'Ext: 101 (سید ژینو ایوبیان)', departmentFa: 'دفتر مدیرعامل و هیئت مدیره', durationSeconds: 145, timestamp: '2026-10-04 11:24:10', status: 'موفق (Completed)' },
  { id: 'LOG-10491', callType: 'inbound', callerNumber: '+98 21 8877 6655', destination: 'Ext: 205 (حامد ذات‌عجم)', departmentFa: 'امور حقوقی و پتنت‌ها', durationSeconds: 78, timestamp: '2026-10-04 09:15:32', status: 'موفق (Completed)' },
  { id: 'LOG-10490', callType: 'missed', callerNumber: '+98 919 777 8899', destination: 'Ext: 102 (دکتر رضا عساکره)', departmentFa: 'فناوری و هوش مصنوعی', durationSeconds: 0, timestamp: '2026-10-04 08:42:15', status: 'بی‌پاسخ (Missed)' },
  { id: 'LOG-10489', callType: 'voicemail', callerNumber: '+98 935 111 2233', destination: 'صندوق صوتی خط ۱ (داخلی ۱۰۶)', departmentFa: 'عملیات اجرایی و پروژه‌ها', durationSeconds: 65, timestamp: '2026-10-03 18:40:02', status: 'پیام ضبط شد' },
  { id: 'LOG-10488', callType: 'outbound', callerNumber: '+98 21 9103 0830 (خط ۱)', destination: '+98 21 6655 4433 (دانشگاه صنعتی شریف)', departmentFa: 'تحقیق و توسعه و آزمایشگاه انرژی', durationSeconds: 310, timestamp: '2026-10-03 16:20:00', status: 'موفق (Completed)' }
];

export const IvrCommunicationsConsole: React.FC<IvrCommunicationsConsoleProps> = ({
  isOpen = true,
  onClose,
  initialExtension,
  initialMember
}) => {
  const { isFa } = useLanguage();
  const [activeTab, setActiveTab] = React.useState<'dialer' | 'ivrTree' | 'voicemail' | 'extensions' | 'callLogs' | 'daftareshoma'>('dialer');
  
  // Dialer State
  const [dialedNumber, setDialedNumber] = React.useState<string>(initialExtension || '');
  const [callState, setCallState] = React.useState<'idle' | 'calling' | 'connected' | 'ended'>('idle');
  const [callDuration, setCallDuration] = React.useState<number>(0);
  const [isMuted, setIsMuted] = React.useState<boolean>(false);
  const [isSpeakerOn, setIsSpeakerOn] = React.useState<boolean>(true);
  const [activeCallTarget, setActiveCallTarget] = React.useState<{ name: string; dept: string; ext: string } | null>(null);

  // Mode toggles
  const [isDaySchedule, setIsDaySchedule] = React.useState<boolean>(true);
  const [playingPromptKey, setPlayingPromptKey] = React.useState<string | null>(null);

  // Data states
  const [extensions, setExtensions] = React.useState<LocalExtension[]>(INITIAL_EXTENSIONS);
  const [voicemails, setVoicemails] = React.useState<VoicemailItem[]>(INITIAL_VOICEMAILS);
  const [callLogs, setCallLogs] = React.useState<CallRecord[]>(INITIAL_CALL_LOGS);
  const [activeVoicemailPlaying, setActiveVoicemailPlaying] = React.useState<string | null>(null);

  // Search & Copy feedback
  const [directorySearch, setDirectorySearch] = React.useState<string>('');
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = React.useState<string | null>(null);

  // Sync with initialExtension if changed
  React.useEffect(() => {
    if (initialExtension) {
      setDialedNumber(initialExtension);
    }
  }, [initialExtension]);

  // Call duration counter
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callState === 'connected') {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [callState]);

  // Load backend data if available
  React.useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const [resStatus, resExts, resVm, resLogs] = await Promise.allSettled([
          fetch('/api/telephony/status').then(r => r.json()),
          fetch('/api/telephony/extensions').then(r => r.json()),
          fetch('/api/telephony/voicemails').then(r => r.json()),
          fetch('/api/telephony/call-logs').then(r => r.json()),
        ]);

        if (resExts.status === 'fulfilled' && resExts.value?.data) {
          setExtensions(resExts.value.data);
        }
        if (resVm.status === 'fulfilled' && resVm.value?.data) {
          setVoicemails(resVm.value.data);
        }
        if (resLogs.status === 'fulfilled' && resLogs.value?.data) {
          setCallLogs(resLogs.value.data);
        }
      } catch {
        // Fallback to initial local data
      }
    };
    fetchBackendData();
  }, []);

  // Web Audio DTMF tone generator
  const playDtmfTone = (digit: string) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const dtmfFrequencies: Record<string, [number, number]> = {
        '1': [697, 1209], '2': [697, 1336], '3': [697, 1477],
        '4': [770, 1209], '5': [770, 1336], '6': [770, 1477],
        '7': [852, 1209], '8': [852, 1336], '9': [852, 1477],
        '*': [941, 1209], '0': [941, 1336], '#': [941, 1477],
      };

      const freqs = dtmfFrequencies[digit] || [700, 1200];
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.frequency.value = freqs[0];
      osc2.frequency.value = freqs[1];
      gain.gain.value = 0.08;

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();

      setTimeout(() => {
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
        setTimeout(() => {
          osc1.stop();
          osc2.stop();
          ctx.close();
        }, 60);
      }, 120);
    } catch {
      // AudioContext not permitted without user gesture, safe to ignore
    }
  };

  const handleKeyPress = (char: string) => {
    playDtmfTone(char);
    setDialedNumber(prev => prev + char);

    // If in call, simulate IVR interactive navigation
    if (callState === 'connected') {
      const match = IVR_DIAL_TREE.find(node => node.key === char);
      if (match) {
        setActiveCallTarget({
          name: isFa ? match.targetLeaderFa : match.targetLeaderEn,
          dept: isFa ? match.targetDepartmentFa : match.targetDepartmentEn,
          ext: match.targetExtension
        });
      }
    }
  };

  const handleStartCall = (targetExt?: string) => {
    const ext = targetExt || dialedNumber.trim();
    if (!ext) return;

    setDialedNumber(ext);
    setCallState('calling');

    // Check special codes: VIP access (*8888) or HSE emergency (*9111)
    if (ext === '*8888') {
      setActiveCallTarget({
        name: isFa ? 'صف اولویت VIP هیئت مدیره' : 'C-Suite VIP Priority Queue',
        dept: 'Direct Executive Line',
        ext: '*8888'
      });
    } else if (ext === '*9111') {
      setActiveCallTarget({
        name: isFa ? 'ستاد واکنش اضطراری HSE' : 'HSE Emergency Incident Command',
        dept: 'Operational Priority Broadcast',
        ext: '*9111'
      });
    } else if (ext === '*99') {
      setActiveCallTarget({
        name: isFa ? 'صندوق صوتی سازمان' : 'Corporate Voicemail Box',
        dept: 'Daftare Shoma Voicemail Service',
        ext: '*99'
      });
    } else {
      // Resolve member or IVR node
      const extMatch = extensions.find(e => e.extension === ext || e.sipUsername === ext);
      const ivrMatch = IVR_DIAL_TREE.find(n => n.targetExtension === ext || n.key === ext);

      if (extMatch) {
        setActiveCallTarget({
          name: isFa ? extMatch.nameFa : extMatch.name,
          dept: isFa ? extMatch.departmentFa : extMatch.department,
          ext: extMatch.extension
        });
      } else if (ivrMatch) {
        setActiveCallTarget({
          name: isFa ? ivrMatch.targetLeaderFa : ivrMatch.targetLeaderEn,
          dept: isFa ? ivrMatch.targetDepartmentFa : ivrMatch.targetDepartmentEn,
          ext: ivrMatch.targetExtension
        });
      } else {
        setActiveCallTarget({
          name: isFa ? 'خط داخلی سازمانی KKM' : 'KKM Corporate Extension',
          dept: 'Daftare Shoma Cloud PBX (+98 21 9103 0830)',
          ext: ext
        });
      }
    }

    // Connect call via WebRTC simulated handshake
    setTimeout(() => {
      setCallState('connected');
    }, 1600);
  };

  const handleEndCall = () => {
    setCallState('ended');
    setTimeout(() => {
      setCallState('idle');
      setActiveCallTarget(null);
    }, 1200);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Toggle Extension Call Forwarding
  const handleToggleForward = async (extNumber: string) => {
    setExtensions(prev => prev.map(e => {
      if (e.extension === extNumber) {
        return { ...e, forwardEnabled: !e.forwardEnabled };
      }
      return e;
    }));

    try {
      await fetch(`/api/telephony/extensions/${extNumber}/toggle-forward`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
    } catch {
      // handled locally
    }
  };

  // Play audio announcement simulation
  const handlePlayPromptAudio = (key: string, scriptText: string, lang = 'fa-IR') => {
    if (playingPromptKey === key) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setPlayingPromptKey(null);
      return;
    }

    setPlayingPromptKey(key);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(scriptText);
      utterance.lang = lang;
      utterance.rate = 0.95;
      utterance.onend = () => setPlayingPromptKey(null);
      utterance.onerror = () => setPlayingPromptKey(null);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setPlayingPromptKey(null), 6000);
    }
  };

  // Download Daftare Shoma Export Package
  const handleDownloadDaftareShomaPackage = () => {
    const exportConfig = {
      platform: 'Daftare Shoma Cloud PBX (daftareshoma.com)',
      accountNumber: 'KKM-DS-91030830',
      activeLine: DAFTARE_SHOMA_CONFIG.accountLine,
      exportedAt: new Date().toISOString(),
      architect: DAFTARE_SHOMA_CONFIG.architect,
      trunkSettings: {
        server: 'ext.daftareshoma.com',
        udpPort: 7104,
        tcpPort: 7103,
        webRtcWss: 'wss://ext.daftareshoma.com:4443',
        stun: 'stun:ext.daftareshoma.com:3478'
      },
      ivrTree: IVR_DIAL_TREE,
      extensions: extensions
    };

    const blob = new Blob([JSON.stringify(exportConfig, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kkm-daftareshoma-export-91030830.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess('package');
    setTimeout(() => setDownloadSuccess(null), 2500);
  };

  // Download Zoiper Profile
  const handleDownloadZoiper = () => {
    const xmlConfig = `<?xml version="1.0" encoding="utf-8"?>
<ZoiperProfile version="2.0">
  <Account>
    <Name>KKM International Group — Daftare Shoma</Name>
    <Domain>${DAFTARE_SHOMA_CONFIG.domainUdp}</Domain>
    <UserName>${DAFTARE_SHOMA_CONFIG.defaultUsername}</UserName>
    <CallerID>KKM Corporate Line (+98 21 9103 0830)</CallerID>
    <OutboundProxy>${DAFTARE_SHOMA_CONFIG.domainUdp}</OutboundProxy>
    <Transport>UDP</Transport>
    <AlternativeTransport>TCP</AlternativeTransport>
    <TCPDomain>${DAFTARE_SHOMA_CONFIG.domainTcp}</TCPDomain>
    <WebRTCGateway>${DAFTARE_SHOMA_CONFIG.domainWebRtc}</WebRTCGateway>
    <StunServer>${DAFTARE_SHOMA_CONFIG.stunServer}</StunServer>
    <Codecs>
      <Codec priority="1">PCMA</Codec>
      <Codec priority="2">PCMU</Codec>
      <Codec priority="3">Opus</Codec>
      <Codec priority="4">GSM</Codec>
    </Codecs>
  </Account>
</ZoiperProfile>`;

    const blob = new Blob([xmlConfig], { type: 'application/xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kkm-daftareshoma-zoiper-${DAFTARE_SHOMA_CONFIG.defaultUsername}.xml`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess('zoiper');
    setTimeout(() => setDownloadSuccess(null), 2500);
  };

  // Download Extensions CSV
  const handleDownloadCsv = () => {
    const headers = 'Extension,SIP_Username,Name,Name_FA,Department,Direct_Phone,Mobile_Forward,Strategy\n';
    const rows = extensions.map(e => 
      `"${e.extension}","${e.sipUsername}","${e.name}","${e.nameFa}","${e.departmentFa}","${e.directPhone}","${e.mobileForward}","${e.ringStrategy}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kkm-extensions-directory.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess('csv');
    setTimeout(() => setDownloadSuccess(null), 2500);
  };

  // Filtered members for directory tab
  const filteredExtensions = extensions.filter(e => {
    const q = directorySearch.toLowerCase().trim();
    if (!q) return true;
    return (
      e.name.toLowerCase().includes(q) ||
      e.nameFa.toLowerCase().includes(q) ||
      e.extension.includes(q) ||
      e.departmentFa.toLowerCase().includes(q) ||
      e.directPhone.includes(q)
    );
  });

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Banner: Daftare Shoma Platform Telemetry & Official Links */}
      <div className="p-6 bg-slate-900 text-white border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-950/50">
              <PhoneCall className="w-6 h-6 text-white" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/40 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {isFa ? 'متصل به تلفن ابری دفتر شما' : 'Connected: Daftare Shoma PBX'}
                </span>
                <span className="text-slate-400 text-xs font-mono font-bold">
                  {DAFTARE_SHOMA_CONFIG.accountLine}
                </span>
              </div>
              
              <h2 className="text-lg font-bold font-display mt-0.5 flex items-center gap-2">
                <span>{isFa ? 'سامانه تلفن ابری و گویا سازمانی (Daftare Shoma Cloud PBX & IVR)' : 'KKM Corporate Cloud Telephony & IVR Hub'}</span>
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Direct Link to Daftare Shoma Panel */}
            <a
              href={DAFTARE_SHOMA_CONFIG.panelLoginUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
              title="ورود به پرتال دفتر شما (portal.daftareshoma.com)"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{isFa ? 'پرتال دفتر شما' : 'Daftare Shoma Portal'}</span>
            </a>

            {/* Direct Link to Dartamas Web Call */}
            <a
              href={DAFTARE_SHOMA_CONFIG.dartamasDirectCallUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
              title="تماس اینترنتی مستقیم از طریق افزونه درتماس"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{isFa ? 'تماس اینترنتی درتماس' : 'Dartamas Web Call'}</span>
            </a>

            {/* GitHub Repo by Gino Ayyoubian */}
            <a
              href={DAFTARE_SHOMA_CONFIG.gitHubRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-mono transition-colors flex items-center gap-1.5 border border-slate-700"
              title="گیت‌هاب: kkm-ivr-daftareshoma طراحی‌شده توسط Gino Ayyoubian"
            >
              <FileCode className="w-3.5 h-3.5 text-secondary" />
              <span>kkm-ivr-daftareshoma</span>
            </a>

            {onClose && (
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title={isFa ? 'بستن' : 'Close'}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Live Metrics Row */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-3 font-mono">
          <div className="flex flex-wrap items-center gap-4">
            <span>خط اصلی: <strong className="text-white">{DAFTARE_SHOMA_CONFIG.accountLine}</strong></span>
            <span>ترانک: <strong className="text-emerald-400">ext.daftareshoma.com</strong></span>
            <span>WebRTC WSS: <strong className="text-slate-300">4443</strong></span>
            <span>پینگ ترانک: <strong className="text-emerald-400">14 ms</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 font-sans">
              {isFa ? 'طراح معماری و توسعه‌دهنده:' : 'Architect & Developer:'}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-slate-800 text-secondary text-xs font-semibold">
              {DAFTARE_SHOMA_CONFIG.architect}
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-800/80">
          <button
            onClick={() => setActiveTab('dialer')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'dialer'
                ? 'bg-primary text-white shadow-md'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{isFa ? 'شماره‌گیر و تلفن نرم‌افزاری' : 'Softphone Dialer'}</span>
          </button>

          <button
            onClick={() => setActiveTab('ivrTree')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'ivrTree'
                ? 'bg-primary text-white shadow-md'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>{isFa ? 'سلسله‌مراتب تلفن گویا و شبیه‌ساز صوتی' : 'IVR Flow & Audio'}</span>
          </button>

          <button
            onClick={() => setActiveTab('voicemail')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'voicemail'
                ? 'bg-primary text-white shadow-md'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <Voicemail className="w-3.5 h-3.5" />
            <span>{isFa ? 'صندوق صوتی سازمانی' : 'Corporate Voicemail'}</span>
            {voicemails.filter(v => !v.isRead).length > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('extensions')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'extensions'
                ? 'bg-primary text-white shadow-md'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>{isFa ? 'دفترچه داخلی‌ها و دایورت' : 'Extensions & Forwarding'}</span>
          </button>

          <button
            onClick={() => setActiveTab('callLogs')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'callLogs'
                ? 'bg-primary text-white shadow-md'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>{isFa ? 'گزارش و لاگ تماس‌ها' : 'Call Records'}</span>
          </button>

          <button
            onClick={() => setActiveTab('daftareshoma')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'daftareshoma'
                ? 'bg-primary text-white shadow-md'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>{isFa ? 'تنظیمات و خروجی پرتال دفتر شما' : 'Daftare Shoma Cloud Hub'}</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="p-6">
        {/* TAB 1: WEBRTC SOFTPHONE DIALER */}
        {activeTab === 'dialer' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Phone Hardware Unit */}
            <div className="lg:col-span-6 bg-slate-950 rounded-3xl p-6 text-white shadow-xl border border-slate-800 flex flex-col justify-between">
              <div>
                {/* Status Bar */}
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-slate-300">
                      SIP: <strong className="text-white">{DAFTARE_SHOMA_CONFIG.defaultUsername}</strong>
                    </span>
                  </div>
                  <div className="font-mono text-[11px] text-slate-400">
                    ext.daftareshoma.com:4443
                  </div>
                </div>

                {/* LCD Display */}
                <div className="my-5 p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center relative overflow-hidden">
                  {callState === 'idle' && (
                    <div className="py-2">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">
                        {isFa ? 'آماده شماره‌گیری - ترانک ابری فعال' : 'Ready to Dial - Cloud Trunk Active'}
                      </span>
                      <div className="text-2xl font-mono font-bold tracking-widest text-emerald-400 min-h-[36px] flex items-center justify-center">
                        {dialedNumber || (
                          <span className="text-slate-600 text-base font-normal">
                            {isFa ? 'شماره داخلی، VIP (*8888) یا اضطراری (*9111)...' : 'Enter extension or VIP code...'}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {callState === 'calling' && (
                    <div className="py-2">
                      <span className="text-xs font-mono text-amber-400 animate-pulse block mb-1">
                        {isFa ? 'در حال برقراری تماس با سرور دفتر شما...' : 'Connecting Daftare Shoma Gateway...'}
                      </span>
                      <div className="text-xl font-bold text-white">
                        {activeCallTarget?.name || dialedNumber}
                      </div>
                      <span className="text-xs font-mono text-slate-400">
                        {activeCallTarget?.ext ? `داخلی: ${activeCallTarget.ext}` : dialedNumber} &bull; WebRTC WSS
                      </span>
                    </div>
                  )}

                  {callState === 'connected' && (
                    <div className="py-2">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <span className="text-xs font-mono font-bold text-emerald-400">
                          {isFa ? 'مکالمه برقرار است' : 'In Call'} &bull; {formatDuration(callDuration)}
                        </span>
                      </div>
                      <div className="text-lg font-bold text-white">
                        {activeCallTarget?.name}
                      </div>
                      <p className="text-xs text-secondary font-medium">
                        {activeCallTarget?.dept}
                      </p>
                      
                      {/* Audio visualizer waveform */}
                      <div className="flex items-center justify-center gap-1 mt-3 h-5">
                        {[40, 75, 100, 50, 85, 30, 95, 60, 45, 90, 65, 35].map((height, i) => (
                          <motion.span
                            key={i}
                            animate={{ scaleY: [0.3, 1, 0.4] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.05 }}
                            style={{ height: `${height}%` }}
                            className="w-1 bg-emerald-400 rounded-full"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {callState === 'ended' && (
                    <div className="py-2">
                      <span className="text-xs font-mono text-red-400 block mb-1">
                        {isFa ? 'تماس خاتمه یافت' : 'Call Ended'}
                      </span>
                      <div className="text-base font-bold text-slate-300">
                        {formatDuration(callDuration)}
                      </div>
                    </div>
                  )}
                </div>

                {/* Keypad */}
                <div className="grid grid-cols-3 gap-3 max-w-[280px] mx-auto">
                  {[
                    { key: '1', sub: '.,-' },
                    { key: '2', sub: 'ABC' },
                    { key: '3', sub: 'DEF' },
                    { key: '4', sub: 'GHI' },
                    { key: '5', sub: 'JKL' },
                    { key: '6', sub: 'MNO' },
                    { key: '7', sub: 'PQRS' },
                    { key: '8', sub: 'TUV' },
                    { key: '9', sub: 'WXYZ' },
                    { key: '*', sub: 'TONE' },
                    { key: '0', sub: '+' },
                    { key: '#', sub: 'SEND' },
                  ].map(btn => (
                    <button
                      key={btn.key}
                      onClick={() => handleKeyPress(btn.key)}
                      className="p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700 active:bg-primary active:text-white transition-all text-center border border-slate-700/60 shadow-xs group"
                    >
                      <span className="block text-lg font-bold font-mono group-hover:scale-110 transition-transform">
                        {btn.key}
                      </span>
                      <span className="block text-[8px] font-mono text-slate-400 uppercase tracking-wider">
                        {btn.sub}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Call Controls Bar */}
              <div className="mt-6 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-center gap-4">
                  {/* Mute */}
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`p-3 rounded-2xl border transition-all ${
                      isMuted 
                        ? 'bg-amber-500/20 border-amber-500 text-amber-400' 
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>

                  {/* Call / End Button */}
                  {callState === 'idle' ? (
                    <button
                      onClick={() => handleStartCall()}
                      className="px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all flex items-center gap-2 shadow-lg shadow-emerald-900/40 hover:scale-105"
                    >
                      <Phone className="w-5 h-5" />
                      <span>{isFa ? 'برقراری تماس' : 'Call'}</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleEndCall}
                      className="px-8 py-3.5 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-bold transition-all flex items-center gap-2 shadow-lg shadow-red-900/40 hover:scale-105"
                    >
                      <PhoneOff className="w-5 h-5" />
                      <span>{isFa ? 'قطع تماس' : 'End Call'}</span>
                    </button>
                  )}

                  {/* Speaker */}
                  <button
                    onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                    className={`p-3 rounded-2xl border transition-all ${
                      !isSpeakerOn 
                        ? 'bg-amber-500/20 border-amber-500 text-amber-400' 
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                    title={isSpeakerOn ? 'Mute Speaker' : 'Speaker On'}
                  >
                    {isSpeakerOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                  </button>

                  {/* Clear */}
                  <button
                    onClick={() => setDialedNumber('')}
                    className="p-3 rounded-2xl bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 transition-all text-xs font-mono"
                    title={isFa ? 'پاک کردن' : 'Clear'}
                  >
                    CLR
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Access & Direct Extensions */}
            <div className="lg:col-span-6 space-y-4">
              {/* Special Dial Shortcuts (VIP & HSE) */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleStartCall('*8888')}
                  className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 to-amber-600/20 border border-amber-500/40 hover:border-amber-500 text-left transition-all group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-bold text-amber-400 text-sm">*8888</span>
                    <Key className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {isFa ? 'کد اولویت VIP هیئت مدیره' : 'C-Suite VIP Access Code'}
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {isFa ? 'انتقال با اولویت بالا به تلفن همراه' : 'Bypass queue to mobile phone'}
                  </p>
                </button>

                <button
                  onClick={() => handleStartCall('*9111')}
                  className="p-3.5 rounded-2xl bg-gradient-to-r from-red-500/10 to-red-600/20 border border-red-500/40 hover:border-red-500 text-left transition-all group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-bold text-red-400 text-sm">*9111</span>
                    <AlertTriangle className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {isFa ? 'فوریت‌های HSE و ایمنی کارگاه‌ها' : 'HSE Emergency Protocol'}
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {isFa ? 'هشدار فوری به مسئولین ایمنی' : 'Emergency safety broadcast'}
                  </p>
                </button>
              </div>

              {/* Speed Dial Grid */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between mb-3">
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    {isFa ? 'شماره‌گیری سریع داخلی‌های کلیدی دفتر شما' : 'Speed Dial Key Extensions'}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    خط ۱: +98 21 9103 0830
                  </span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
                  {extensions.slice(0, 8).map(item => (
                    <div
                      key={item.extension}
                      onClick={() => handleStartCall(item.extension)}
                      className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-primary cursor-pointer transition-all hover:shadow-md flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-xs text-primary dark:text-secondary shrink-0">
                          {item.extension}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-primary transition-colors">
                            {isFa ? item.nameFa : item.name}
                          </h4>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                            {isFa ? item.departmentFa : item.department}
                          </p>
                        </div>
                      </div>

                      <span className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 font-mono text-xs font-bold shrink-0 flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {item.extension}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MULTI-LAYER IVR FLOW & AUDIO SIMULATOR */}
        {activeTab === 'ivrTree' && (
          <div className="space-y-6">
            {/* Header with Day/Night Schedule Switcher */}
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-amber-900 dark:text-amber-200">
                    {isFa ? 'معماری سه‌لایه تلفن گویای سازمانی کیمیا کاران ماد (طراحی: ژینو ایوبیان)' : '3-Layer KKM IVR Architecture (Designed by Gino Ayyoubian)'}
                  </h4>
                  <p className="text-[11px] text-amber-800/90 dark:text-amber-300/90 mt-0.5">
                    {isFa 
                      ? 'مبتنی بر خط خریداری‌شده +98 21 9103 0830 در پلتفرم ابری «دفتر شما» با پشتیبانی از صف‌های موازی، کد VIP و پروتکل اضطراری HSE'
                      : 'Configured for official line +98 21 9103 0830 on Daftare Shoma cloud platform.'}
                  </p>
                </div>
              </div>

              {/* Day / Night Shift Mode Toggle */}
              <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-1.5 rounded-xl border border-amber-200 dark:border-amber-800">
                <button
                  onClick={() => setIsDaySchedule(true)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    isDaySchedule ? 'bg-primary text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {isFa ? 'ساعات اداری (۸-۱۷)' : 'Working Hours'}
                </button>
                <button
                  onClick={() => setIsDaySchedule(false)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    !isDaySchedule ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {isFa ? 'شیفت شب و تعطیلات' : 'After Hours'}
                </button>
              </div>
            </div>

            {/* Audio Prompts Player Bar */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  {isFa ? 'پخش آزمایشی پیام‌های صوتی تلفن گویا (ElevenLabs / Audio Prompts)' : 'IVR Audio Prompts Player'}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  فرمت تلفنی استاندارد: WAV, 8kHz, Mono
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {Object.entries(AUDIO_PROMPT_SCRIPTS).map(([key, item]) => {
                  const isPlaying = playingPromptKey === key;
                  return (
                    <div
                      key={key}
                      className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="font-bold text-white truncate">{item.title}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 line-clamp-2 mt-1">
                          &ldquo;{item.text}&rdquo;
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-700/60 flex items-center justify-between">
                        <span className="text-[9px] font-mono text-slate-500">
                          {item.speaker}
                        </span>
                        <button
                          onClick={() => handlePlayPromptAudio(key, item.text, key.includes('english') ? 'en-US' : 'fa-IR')}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 ${
                            isPlaying
                              ? 'bg-amber-500 text-slate-950 animate-pulse'
                              : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                          }`}
                        >
                          {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                          <span>{isPlaying ? (isFa ? 'توقف' : 'Stop') : (isFa ? 'پخش صوت' : 'Play')}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tree Nodes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {IVR_DIAL_TREE.map(node => (
                <div
                  key={node.key}
                  className={`p-4 rounded-2xl bg-white dark:bg-slate-800 border transition-all flex flex-col justify-between ${
                    node.isSpecialProtocol
                      ? 'border-red-300 dark:border-red-900/60 bg-red-50/20 dark:bg-red-950/20'
                      : 'border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className={`w-8 h-8 rounded-xl font-mono font-bold text-sm flex items-center justify-center shadow-xs ${
                        node.isSpecialProtocol
                          ? 'bg-red-600 text-white'
                          : 'bg-primary text-white'
                      }`}>
                        {node.key}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                        {isFa ? `داخلی ${node.targetExtension}` : `Ext: ${node.targetExtension}`}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-slate-400 block mb-0.5">
                      {node.layer}
                    </span>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {isFa ? node.titleFa : node.titleEn}
                    </h4>

                    <p className="text-xs text-secondary font-semibold mt-1">
                      {isFa ? node.targetLeaderFa : node.targetLeaderEn}
                    </p>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 italic bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                      &ldquo;{isFa ? node.announcementFa : node.announcementEn}&rdquo;
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400 truncate max-w-[140px]">
                      {isFa ? node.targetDepartmentFa : node.targetDepartmentEn}
                    </span>

                    <button
                      onClick={() => {
                        setActiveTab('dialer');
                        handleStartCall(node.targetExtension);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold transition-colors flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{isFa ? 'تست شماره‌گیری' : 'Dial'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CORPORATE VOICEMAIL BOX */}
        {activeTab === 'voicemail' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold">
                  <Voicemail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {isFa ? 'صندوق پیام‌های صوتی خط +98 21 9103 0830' : 'Digital Voicemail Box (+98 21 9103 0830)'}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {isFa ? 'پیام‌های ضبط‌شده در ساعات غیراداری یا در صورت عدم پاسخگویی داخلی‌ها' : 'Recorded messages left by clients and partners'}
                  </p>
                </div>
              </div>

              <span className="px-3 py-1 rounded-xl bg-primary/10 text-primary dark:text-secondary font-mono text-xs font-bold">
                {voicemails.filter(v => !v.isRead).length} {isFa ? 'پیام شنیده نشده' : 'Unheard Messages'}
              </span>
            </div>

            {/* Voicemails List */}
            <div className="space-y-3">
              {voicemails.map(vm => (
                <div
                  key={vm.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    !vm.isRead
                      ? 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800/60 shadow-xs'
                      : 'bg-white dark:bg-slate-800/70 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${!vm.isRead ? 'bg-amber-500 animate-ping' : 'bg-slate-400'}`} />
                      <strong className="text-xs font-bold text-slate-900 dark:text-white">
                        {vm.callerName || vm.callerNumber}
                      </strong>
                      <span className="text-[10px] font-mono text-slate-400">
                        ({vm.callerNumber})
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{vm.timestamp}</span>
                      <span>&bull;</span>
                      <span>{vm.durationSeconds} {isFa ? 'ثانیه' : 'sec'}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 leading-relaxed">
                    {isFa ? vm.transcriptionFa : vm.transcriptionEn}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-2">
                    <div className="text-[10px] text-slate-500 font-mono">
                      مقصد: داخلی {vm.targetExtension} ({vm.targetDepartmentFa})
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Playback Simulation */}
                      <button
                        onClick={() => {
                          if (activeVoicemailPlaying === vm.id) {
                            setActiveVoicemailPlaying(null);
                          } else {
                            setActiveVoicemailPlaying(vm.id);
                            // Mark read
                            setVoicemails(prev => prev.map(v => v.id === vm.id ? { ...v, isRead: true } : v));
                          }
                        }}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center gap-1"
                      >
                        {activeVoicemailPlaying === vm.id ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        <span>{activeVoicemailPlaying === vm.id ? (isFa ? 'توقف' : 'Pause') : (isFa ? 'شنیدن پیام' : 'Play Audio')}</span>
                      </button>

                      {/* Direct Call-Back */}
                      <button
                        onClick={() => {
                          setActiveTab('dialer');
                          handleStartCall(vm.callerNumber);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors flex items-center gap-1 border border-slate-700"
                      >
                        <Phone className="w-3.5 h-3.5 text-secondary" />
                        <span>{isFa ? 'تماس متقابل' : 'Call Back'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: EXTENSIONS DIRECTORY & FORWARDING */}
        {activeTab === 'extensions' && (
          <div className="space-y-4">
            {/* Search and summary */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="w-4 h-4 absolute top-3.5 right-3 text-slate-400" />
                <input
                  type="text"
                  value={directorySearch}
                  onChange={(e) => setDirectorySearch(e.target.value)}
                  placeholder={isFa ? 'جستجو نام همکار، دپارتمان، شماره داخلی یا تلفن مستقیم...' : 'Search name, department or extension...'}
                  className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-primary focus:outline-hidden"
                />
              </div>

              <button
                onClick={handleDownloadCsv}
                className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1.5 border border-slate-200 dark:border-slate-700"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{downloadSuccess === 'csv' ? (isFa ? 'دانلود شد!' : 'Downloaded!') : (isFa ? 'خروجی اکسل / CSV' : 'Export CSV')}</span>
              </button>
            </div>

            {/* Extensions Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3.5">{isFa ? 'همکار سازمانی' : 'Personnel'}</th>
                    <th className="p-3.5">{isFa ? 'دپارتمان' : 'Department'}</th>
                    <th className="p-3.5">{isFa ? 'داخلی تلفن' : 'Extension'}</th>
                    <th className="p-3.5">{isFa ? 'تلفن مستقیم تهران' : 'Direct Line'}</th>
                    <th className="p-3.5">{isFa ? 'دایورت به همراه' : 'Mobile Forward'}</th>
                    <th className="p-3.5">{isFa ? 'استراتژی زنگ' : 'Ring Strategy'}</th>
                    <th className="p-3.5 text-center">{isFa ? 'اقدام' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                  {filteredExtensions.map((member) => (
                    <tr key={`ext-${member.extension}`} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900 dark:text-white">
                          {isFa ? member.nameFa : member.name}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">
                          {member.role}
                        </div>
                      </td>

                      <td className="p-3.5 text-slate-600 dark:text-slate-400">
                        {isFa ? member.departmentFa : member.department}
                      </td>

                      <td className="p-3.5">
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-mono font-bold text-xs">
                          {member.extension}
                        </span>
                      </td>

                      <td className="p-3.5 font-mono text-[11px] text-slate-600 dark:text-slate-300" dir="ltr">
                        {member.directPhone}
                      </td>

                      <td className="p-3.5">
                        <button
                          onClick={() => handleToggleForward(member.extension)}
                          className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold flex items-center gap-1.5 transition-colors ${
                            member.forwardEnabled
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300'
                              : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 border border-slate-300 dark:border-slate-700'
                          }`}
                        >
                          <PhoneForwarded className="w-3 h-3" />
                          <span>{member.forwardEnabled ? (isFa ? 'فعال (دایورت)' : 'Active') : (isFa ? 'غیرفعال' : 'Off')}</span>
                        </button>
                      </td>

                      <td className="p-3.5 font-mono text-[10px] text-slate-500">
                        {member.ringStrategy === 'simultaneous' ? (isFa ? 'همزمان داخلی و موبایل' : 'Simultaneous') :
                         member.ringStrategy === 'sequential' ? (isFa ? 'ترتیبی با تاخیر ۵ ثانیه' : 'Sequential') :
                         (isFa ? 'فقط نرم‌افزار VoIP' : 'Softphone Only')}
                      </td>

                      <td className="p-3.5 text-center">
                        <button
                          onClick={() => {
                            setActiveTab('dialer');
                            handleStartCall(member.extension);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5 mx-auto"
                        >
                          <Phone className="w-3 h-3" />
                          <span>{isFa ? 'تماس' : 'Call'}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: CALL RECORDS & TELEMETRY */}
        {activeTab === 'callLogs' && (
          <div className="space-y-4">
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3.5">{isFa ? 'نوع تماس' : 'Type'}</th>
                    <th className="p-3.5">{isFa ? 'شماره تماس‌گیرنده' : 'Caller ID'}</th>
                    <th className="p-3.5">{isFa ? 'مقصد / داخلی' : 'Destination'}</th>
                    <th className="p-3.5">{isFa ? 'مدت مکالمه' : 'Duration'}</th>
                    <th className="p-3.5">{isFa ? 'زمان ثبت' : 'Timestamp'}</th>
                    <th className="p-3.5">{isFa ? 'وضعیت' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                  {callLogs.map(log => (
                    <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold ${
                          log.callType === 'inbound' ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300' :
                          log.callType === 'outbound' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' :
                          log.callType === 'missed' ? 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300' :
                          'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                        }`}>
                          {log.callType.toUpperCase()}
                        </span>
                      </td>

                      <td className="p-3.5 font-mono font-bold text-slate-900 dark:text-white" dir="ltr">
                        {log.callerNumber}
                      </td>

                      <td className="p-3.5 text-slate-700 dark:text-slate-300">
                        {log.destination}
                      </td>

                      <td className="p-3.5 font-mono text-slate-500">
                        {log.durationSeconds > 0 ? `${log.durationSeconds} s` : '-'}
                      </td>

                      <td className="p-3.5 font-mono text-slate-400 text-[11px]">
                        {log.timestamp}
                      </td>

                      <td className="p-3.5">
                        <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400">
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: DAFTARE SHOMA CLOUD HUB & PROVISIONING */}
        {activeTab === 'daftareshoma' && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30">
              <h4 className="font-bold text-sm text-emerald-900 dark:text-emerald-300 flex items-center gap-2 mb-1">
                <Globe className="w-4 h-4 text-emerald-600" />
                {isFa ? 'یکپارچه‌سازی رسمی با پرتال ابری «دفتر شما» (daftareshoma.com)' : 'Daftare Shoma Cloud PBX Integration'}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {isFa
                  ? 'گروه بین‌المللی کیمیا کاران ماد دارای حساب کاربری فعال و شماره اختصاصی +۹۸۲۱۹۱۰۳۰۸۳۰ در پرتال دفتر شما است. تمام تنظیمات زیر مطابق معماری استاندارد دفتر شما و گیت‌هاب kkm-ivr-daftareshoma تنظیم گردیده است.'
                  : 'All credentials and profiles are configured for the active KKM account on Daftare Shoma platform.'}
              </p>
            </div>

            {/* Parameters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {[
                { label: isFa ? 'شماره خط اختصاصی دفتر شما' : 'Purchased Line Number', value: DAFTARE_SHOMA_CONFIG.accountLine, key: 'line' },
                { label: isFa ? 'شناسه کاربری ترانک (Username)' : 'SIP Username', value: DAFTARE_SHOMA_CONFIG.defaultUsername, key: 'user' },
                { label: isFa ? 'درگاه پروتکل UDP' : 'UDP Domain', value: DAFTARE_SHOMA_CONFIG.domainUdp, key: 'udp' },
                { label: isFa ? 'درگاه پروتکل TCP' : 'TCP Domain', value: DAFTARE_SHOMA_CONFIG.domainTcp, key: 'tcp' },
                { label: isFa ? 'درگاه تماس تحت وب WebRTC WSS' : 'WebRTC WSS Gateway', value: DAFTARE_SHOMA_CONFIG.domainWebRtc, key: 'webrtc' },
                { label: isFa ? 'سرور STUN' : 'STUN Server', value: DAFTARE_SHOMA_CONFIG.stunServer, key: 'stun' }
              ].map(item => (
                <div
                  key={item.key}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between"
                >
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 block mb-0.5">
                      {item.label}
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-900 dark:text-white truncate block">
                      {item.value}
                    </span>
                  </div>

                  <button
                    onClick={() => copyToClipboard(item.value, item.key)}
                    className="p-2 rounded-xl bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 transition-colors shrink-0 shadow-2xs"
                    title={isFa ? 'کپی' : 'Copy'}
                  >
                    {copiedKey === item.key ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* Direct Portal Actions */}
            <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-sm">
                  {isFa ? 'ورود مستقیم و بارگیری بسته‌های پیکربندی آماده' : 'Daftare Shoma Deployment Packages'}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  {isFa 
                    ? 'فایل‌های استاندارد برای وارد کردن به پرتال دفتر شما یا بارگذاری در نرم‌افزارهای تلفن همراه زویپر'
                    : 'Download ready-to-import configuration files for Daftare Shoma and Zoiper.'}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={DAFTARE_SHOMA_CONFIG.panelLoginUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center gap-2 shadow-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{isFa ? 'ورود به پرتال portal.daftareshoma.com' : 'Open portal.daftareshoma.com'}</span>
                </a>

                <button
                  onClick={handleDownloadDaftareShomaPackage}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>{downloadSuccess === 'package' ? (isFa ? 'پکیج بارگیری شد!' : 'Downloaded!') : (isFa ? 'دانلود پکیج JSON دفتر شما' : 'Download JSON Config')}</span>
                </button>

                <button
                  onClick={handleDownloadZoiper}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors flex items-center gap-2 border border-slate-700"
                >
                  <Download className="w-4 h-4" />
                  <span>{downloadSuccess === 'zoiper' ? (isFa ? 'پروفایل بارگیری شد!' : 'Downloaded!') : (isFa ? 'دانلود پروفایل Zoiper (XML)' : 'Download Zoiper XML')}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
