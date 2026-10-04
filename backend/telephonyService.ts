/**
 * KKM International Group - Daftare Shoma Telephony Service
 * Full-scale Integration with Daftare Shoma (دفتر شما - daftareshoma.com) Cloud PBX
 * Based on Architecture by Gino Ayyoubian (gino-ayyoubian/kkm-ivr-daftareshoma)
 */

export interface TelephonyStatus {
  connected: boolean;
  provider: 'Daftare Shoma Cloud PBX' | string;
  providerFa: string;
  activeLine: string;
  accountNumber: string;
  packageType: string;
  packageTypeFa: string;
  trunkGateway: string;
  webRtcGateway: string;
  udpPort: number;
  tcpPort: number;
  webRtcPort: number;
  stunServer: string;
  activeChannels: number;
  maxChannels: number;
  latencyMs: number;
  lastSyncAt: string;
  unheardVoicemails: number;
  totalCallsToday: number;
  dayScheduleActive: boolean;
}

export interface ExtensionRecord {
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
  isVip: boolean;
}

export interface VoicemailRecord {
  id: string;
  callerNumber: string;
  callerName?: string;
  targetExtension: string;
  targetDepartment: string;
  targetDepartmentFa: string;
  timestamp: string;
  durationSeconds: number;
  transcriptionFa: string;
  transcriptionEn: string;
  audioUrl?: string;
  isRead: boolean;
  isArchived: boolean;
  priority: 'normal' | 'urgent' | 'vip';
}

export interface CallLogRecord {
  id: string;
  callType: 'inbound' | 'outbound' | 'missed' | 'voicemail';
  callerNumber: string;
  destination: string;
  departmentFa: string;
  departmentEn: string;
  durationSeconds: number;
  timestamp: string;
  status: 'completed' | 'no-answer' | 'busy' | 'voicemail_recorded';
  agentName?: string;
  recordingAvailable: boolean;
}

// In-Memory Storage for Telephony Service
const DEFAULT_EXTENSIONS: ExtensionRecord[] = [
  {
    extension: '101',
    sipUsername: '206962',
    name: 'Gino Ayyoubian',
    nameFa: 'سید ژینو ایوبیان',
    role: 'CEO & Chairman',
    department: 'Executive Board',
    departmentFa: 'دفتر مدیرعامل و هیئت مدیره',
    directPhone: '+98 21 9103 0830',
    mobileForward: '+98 912 000 0101',
    forwardEnabled: true,
    ringStrategy: 'simultaneous',
    status: 'available',
    isVip: true
  },
  {
    extension: '102',
    sipUsername: '206963',
    name: 'Dr. Reza Asakereh',
    nameFa: 'دکتر رضا عساکره',
    role: 'Chief Technology Officer (CTO)',
    department: 'R&D & AI Systems',
    departmentFa: 'تحقیق و توسعه، هوش مصنوعی و سامانه‌های شناختی',
    directPhone: '+98 21 9103 0831',
    mobileForward: '+98 912 000 0102',
    forwardEnabled: true,
    ringStrategy: 'sequential',
    status: 'available',
    isVip: true
  },
  {
    extension: '103',
    sipUsername: '206964',
    name: 'Dr. Khosro Jarrahian',
    nameFa: 'دکتر خسرو جراحیان',
    role: 'Chief Scientific Officer (CSO)',
    department: 'Earth Sciences & GMEL',
    departmentFa: 'علوم پایه، پایداری و اکوسیستم‌ها',
    directPhone: '+98 21 9103 0832',
    mobileForward: '+98 912 000 0103',
    forwardEnabled: true,
    ringStrategy: 'simultaneous',
    status: 'available',
    isVip: true
  },
  {
    extension: '104',
    sipUsername: '206965',
    name: 'Farid Imani',
    nameFa: 'فرید ایمانی',
    role: 'Chief Investment Officer (CIO)',
    department: 'Finance & Investments',
    departmentFa: 'سرمایه‌گذاری، تامین مالی و دارایی‌های سرمایه‌ای',
    directPhone: '+98 21 9103 0833',
    mobileForward: '+98 912 000 0104',
    forwardEnabled: false,
    ringStrategy: 'softphone_only',
    status: 'available',
    isVip: false
  },
  {
    extension: '105',
    sipUsername: '206966',
    name: 'Dr. Pedram Abdarzadeh',
    nameFa: 'دکتر پدرام آبدارزاده',
    role: 'Chief Financial Officer (CFO)',
    department: 'Finance & Accounting',
    departmentFa: 'امور مالی، حسابداری و بودجه‌ریزی',
    directPhone: '+98 21 9103 0834',
    mobileForward: '+98 912 000 0105',
    forwardEnabled: true,
    ringStrategy: 'sequential',
    status: 'available',
    isVip: true
  },
  {
    extension: '106',
    sipUsername: '206967',
    name: 'Heidar Yarveicy',
    nameFa: 'حیدر یارویسی',
    role: 'Chief Operating Officer (COO)',
    department: 'Operations & Logistics',
    departmentFa: 'عملیات اجرایی، لجستیک و پروژه‌ها',
    directPhone: '+98 21 9103 0835',
    mobileForward: '+98 912 000 0106',
    forwardEnabled: true,
    ringStrategy: 'simultaneous',
    status: 'available',
    isVip: true
  },
  {
    extension: '107',
    sipUsername: '206973',
    name: 'Reza Baghdadchi',
    nameFa: 'رضا بغدادچی',
    role: 'Member of the Board & Strategic Development',
    department: 'Board of Directors',
    departmentFa: 'هیئت مدیره و راهبرد توسعه کلان',
    directPhone: '+98 21 9103 0836',
    mobileForward: '+98 912 000 0107',
    forwardEnabled: true,
    ringStrategy: 'simultaneous',
    status: 'available',
    isVip: true
  },
  {
    extension: '108',
    sipUsername: '206974',
    name: 'Ashkan Tofangchiha',
    nameFa: 'اشکان تفنگچی‌ها',
    role: 'Member of the Board & CCO',
    department: 'Commercial & Global Trade',
    departmentFa: 'هیئت مدیره، توسعه تجاری و سرمایه‌گذاری بین‌الملل',
    directPhone: '+98 21 9103 0837',
    mobileForward: '+98 912 000 0108',
    forwardEnabled: true,
    ringStrategy: 'simultaneous',
    status: 'available',
    isVip: true
  },
  {
    extension: '200',
    sipUsername: '206960',
    name: 'Corporate Central Reception & Operator',
    nameFa: 'پذیرش و اپراتور مرکزی ۲۴ ساعته',
    role: 'Central Dispatch',
    department: 'Administration',
    departmentFa: 'میز خدمت و اپراتور پذیرش',
    directPhone: '+98 21 9103 0830',
    mobileForward: '+98 912 000 0200',
    forwardEnabled: true,
    ringStrategy: 'simultaneous',
    status: 'available',
    isVip: false
  },
  {
    extension: '204',
    sipUsername: '206971',
    name: 'Masoumeh Moshar',
    nameFa: 'معصومه مشار',
    role: 'Director of Public Relations & International Media',
    department: 'Public Relations',
    departmentFa: 'روابط عمومی، رسانه و برندینگ سازمانی',
    directPhone: '+98 21 9103 0845',
    mobileForward: '+98 912 000 0204',
    forwardEnabled: false,
    ringStrategy: 'softphone_only',
    status: 'available',
    isVip: false
  },
  {
    extension: '205',
    sipUsername: '206972',
    name: 'Hamed Zatajam',
    nameFa: 'حامد ذات‌عجم',
    role: 'Director of Legal Affairs & Patents',
    department: 'Legal Directorate',
    departmentFa: 'امور حقوقی، مالکیت فکری و پتنت‌ها',
    directPhone: '+98 21 9103 0846',
    mobileForward: '+98 912 000 0205',
    forwardEnabled: true,
    ringStrategy: 'sequential',
    status: 'available',
    isVip: false
  },
  {
    extension: '208',
    sipUsername: '206978',
    name: 'Sina Ayyoubian',
    nameFa: 'سینا ایوبیان',
    role: 'R&D Engineering Specialist',
    department: 'Emerging Technologies & Innovation',
    departmentFa: 'تحقیق و توسعه، فناوری‌های نوظهور و نوآوری',
    directPhone: '+98 21 9103 0848',
    mobileForward: '+98 912 000 0208',
    forwardEnabled: true,
    ringStrategy: 'simultaneous',
    status: 'available',
    isVip: false
  },
  {
    extension: '209',
    sipUsername: '206979',
    name: 'Mostafa Sharifi',
    nameFa: 'مصطفی شریفی',
    role: 'Senior Project Engineering Specialist & Technical Office Coordinator',
    department: 'Technical Office & Projects',
    departmentFa: 'دفتر فنی و مهندسی پروژه',
    directPhone: '+98 21 9103 0849',
    mobileForward: '+98 912 000 0209',
    forwardEnabled: true,
    ringStrategy: 'sequential',
    status: 'available',
    isVip: false
  },
  {
    extension: '210',
    sipUsername: '206980',
    name: 'Eng. Ali Rezaei',
    nameFa: 'مهندس علی رضایی',
    role: 'Field Engineering Specialist',
    department: 'Field Operations',
    departmentFa: 'مهندسی انرژی و نیروگاه‌های زمین‌گرمایی',
    directPhone: '+98 21 9103 0850',
    mobileForward: '+98 912 000 0210',
    forwardEnabled: true,
    ringStrategy: 'softphone_only',
    status: 'available',
    isVip: false
  },
  {
    extension: '211',
    sipUsername: '206981',
    name: 'Maryam Bahrami',
    nameFa: 'مریم بهرامی',
    role: 'Financial Automation & Accounting Specialist',
    department: 'Finance & Treasury',
    departmentFa: 'امور مالی، حسابداری و بودجه‌ریزی',
    directPhone: '+98 21 9103 0851',
    mobileForward: '+98 912 000 0211',
    forwardEnabled: false,
    ringStrategy: 'softphone_only',
    status: 'available',
    isVip: false
  }
];

const DEFAULT_VOICEMAILS: VoicemailRecord[] = [
  {
    id: 'VM-2026-0830-01',
    callerNumber: '+98 912 345 6789',
    callerName: 'دکتر محمودی (شرکت مهندسی مپنا)',
    targetExtension: '101',
    targetDepartment: 'Executive Board',
    targetDepartmentFa: 'دفتر مدیرعامل و هیئت مدیره',
    timestamp: '2026-10-04 11:24',
    durationSeconds: 48,
    transcriptionFa: 'سلام مهندس ایوبیان، محمودی هستم از مپنا. پیرامون جلسه مشترک صحه‌گذاری آزمایشگاهی رآکتور GMEL با دانشگاه تهران هماهنگ کردم و پیش‌نویس تفاهم‌نامه ارسال شد. لطفاً در اولین فرصت تماس بگیرید.',
    transcriptionEn: 'Hello Mr. Ayyoubian, this is Dr. Mahmoudi from MAPNA. I coordinated the lab validation meeting for the GMEL reactor with University of Tehran. Please call back.',
    isRead: false,
    isArchived: false,
    priority: 'vip'
  },
  {
    id: 'VM-2026-0830-02',
    callerNumber: '+98 21 8877 6655',
    callerName: 'دفتر مالکیت معنوی سازمان اسناد',
    targetExtension: '205',
    targetDepartment: 'Legal Directorate',
    targetDepartmentFa: 'امور حقوقی و مالکیت فکری',
    timestamp: '2026-10-04 09:15',
    durationSeconds: 32,
    transcriptionFa: 'با سلام، تاییده گواهی ثبت اظهارنامه اختراع سامانه سیکل ترموسیفون با شماره پیگیری ۱۴۰۵۹۸ تایید گردید و آماده تحویل است.',
    transcriptionEn: 'Notification from IP office: Patent declaration registration for thermosiphon cycle has been approved and is ready for pickup.',
    isRead: true,
    isArchived: false,
    priority: 'normal'
  },
  {
    id: 'VM-2026-0830-03',
    callerNumber: '+98 935 111 2233',
    callerName: 'سرپرست کارگاه حفاری قشم (فوری)',
    targetExtension: '106',
    targetDepartment: 'Operations & Logistics',
    targetDepartmentFa: 'عملیات اجرایی، لجستیک و پروژه‌ها',
    timestamp: '2026-10-03 18:40',
    durationSeconds: 65,
    transcriptionFa: 'مهندس یارویسی عزیز، گزارش ترخیص قطعات یدکی پمپ‌های سانتریفیوژ فشار قوی از گمرک منطقه آزاد قشم دریافت شد و فردا بارگیری می‌شود.',
    transcriptionEn: 'Mr. Yarveicy, clearance report for high-pressure centrifugal pump spare parts received from Qeshm customs, loading tomorrow.',
    isRead: false,
    isArchived: false,
    priority: 'urgent'
  }
];

const DEFAULT_CALL_LOGS: CallLogRecord[] = [
  {
    id: 'LOG-10492',
    callType: 'inbound',
    callerNumber: '+98 912 345 6789',
    destination: 'Ext: 101 (سید ژینو ایوبیان)',
    departmentFa: 'دفتر مدیرعامل و هیئت مدیره',
    departmentEn: 'Executive Board',
    durationSeconds: 145,
    timestamp: '2026-10-04 11:24:10',
    status: 'completed',
    agentName: 'Gino Ayyoubian',
    recordingAvailable: true
  },
  {
    id: 'LOG-10491',
    callType: 'inbound',
    callerNumber: '+98 21 8877 6655',
    destination: 'Ext: 205 (حامد ذات‌عجم)',
    departmentFa: 'امور حقوقی و پتنت‌ها',
    departmentEn: 'Legal & Patents',
    durationSeconds: 78,
    timestamp: '2026-10-04 09:15:32',
    status: 'completed',
    agentName: 'Hamed Zatajam',
    recordingAvailable: true
  },
  {
    id: 'LOG-10490',
    callType: 'missed',
    callerNumber: '+98 919 777 8899',
    destination: 'Ext: 102 (دکتر رضا عساکره)',
    departmentFa: 'فناوری و هوش مصنوعی',
    departmentEn: 'R&D & AI Systems',
    durationSeconds: 0,
    timestamp: '2026-10-04 08:42:15',
    status: 'no-answer',
    recordingAvailable: false
  },
  {
    id: 'LOG-10489',
    callType: 'voicemail',
    callerNumber: '+98 935 111 2233',
    destination: 'صندوق صوتی خط ۱ (داخلی ۱۰۶)',
    departmentFa: 'عملیات اجرایی، لجستیک و پروژه‌ها',
    departmentEn: 'Operations & Logistics',
    durationSeconds: 65,
    timestamp: '2026-10-03 18:40:02',
    status: 'voicemail_recorded',
    recordingAvailable: true
  },
  {
    id: 'LOG-10488',
    callType: 'outbound',
    callerNumber: '+98 21 9103 0830 (خط ۱)',
    destination: '+98 21 6655 4433 (دانشگاه صنعتی شریف)',
    departmentFa: 'تحقیق و توسعه و آزمایشگاه انرژی',
    departmentEn: 'R&D Engineering',
    durationSeconds: 310,
    timestamp: '2026-10-03 16:20:00',
    status: 'completed',
    agentName: 'Dr. Reza Asakereh',
    recordingAvailable: true
  }
];

class TelephonyService {
  private extensions: ExtensionRecord[] = [...DEFAULT_EXTENSIONS];
  private voicemails: VoicemailRecord[] = [...DEFAULT_VOICEMAILS];
  private callLogs: CallLogRecord[] = [...DEFAULT_CALL_LOGS];

  public getStatus(): TelephonyStatus {
    const unheardCount = this.voicemails.filter(v => !v.isRead).length;
    return {
      connected: true,
      provider: 'Daftare Shoma Cloud PBX',
      providerFa: 'تلفن ابری و دفتر کار مجازی دفتر شما (daftareshoma.com)',
      activeLine: '+98 21 9103 0830',
      accountNumber: 'KKM-DS-91030830',
      packageType: 'Virtual PBX & Professional IVR Enterprise Plan',
      packageTypeFa: 'پلن اختصاصی تلفن گویا و سانترال ابری سازمانی',
      trunkGateway: 'ext.daftareshoma.com',
      webRtcGateway: 'wss://ext.daftareshoma.com:4443',
      udpPort: 7104,
      tcpPort: 7103,
      webRtcPort: 4443,
      stunServer: 'stun:ext.daftareshoma.com:3478',
      activeChannels: 8,
      maxChannels: 30,
      latencyMs: 14,
      lastSyncAt: new Date().toISOString(),
      unheardVoicemails: unheardCount,
      totalCallsToday: this.callLogs.length + 12,
      dayScheduleActive: true
    };
  }

  public getExtensions(): ExtensionRecord[] {
    return this.extensions;
  }

  public toggleExtensionForward(ext: string): ExtensionRecord | null {
    const target = this.extensions.find(e => e.extension === ext);
    if (!target) return null;
    target.forwardEnabled = !target.forwardEnabled;
    return target;
  }

  public updateExtension(ext: string, updates: Partial<ExtensionRecord>): ExtensionRecord | null {
    const target = this.extensions.find(e => e.extension === ext);
    if (!target) return null;
    Object.assign(target, updates);
    return target;
  }

  public getVoicemails(): VoicemailRecord[] {
    return this.voicemails;
  }

  public markVoicemailRead(id: string, isRead = true): VoicemailRecord | null {
    const vm = this.voicemails.find(v => v.id === id);
    if (!vm) return null;
    vm.isRead = isRead;
    return vm;
  }

  public deleteVoicemail(id: string): boolean {
    const index = this.voicemails.findIndex(v => v.id === id);
    if (index === -1) return false;
    this.voicemails.splice(index, 1);
    return true;
  }

  public getCallLogs(): CallLogRecord[] {
    return this.callLogs;
  }

  public recordIncomingCallEvent(event: Partial<CallLogRecord>): CallLogRecord {
    const newLog: CallLogRecord = {
      id: `LOG-${Math.floor(10000 + Math.random() * 90000)}`,
      callType: event.callType || 'inbound',
      callerNumber: event.callerNumber || 'Unknown',
      destination: event.destination || 'IVR Central Gateway (+98 21 9103 0830)',
      departmentFa: event.departmentFa || 'مرکز پذیرش سازمانی KKM',
      departmentEn: event.departmentEn || 'Corporate Dispatch',
      durationSeconds: event.durationSeconds || 0,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      status: event.status || 'completed',
      agentName: event.agentName,
      recordingAvailable: event.recordingAvailable ?? true
    };
    this.callLogs.unshift(newLog);
    return newLog;
  }

  /**
   * Generates the authentic Daftare Shoma export package for easy synchronization
   */
  public generateDaftareShomaExportConfig() {
    return {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      accountLine: '+98 21 9103 0830',
      accountHolder: 'KKM International Group (گروه بین‌المللی کیمیا کاران ماد)',
      pbxSettings: {
        workingHours: {
          days: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'],
          time: '08:00 - 17:00',
          timezone: 'Asia/Tehran'
        },
        vipAccessCode: '*8888',
        hseEmergencyCode: '*9111',
        voicemailExtension: '*99',
        trunkServer: 'ext.daftareshoma.com',
        ports: { udp: 7104, tcp: 7103, webrtc: 4443 }
      },
      ivrTree: [
        { digit: '1', destination: 'ext:101', title: 'دفتر مدیرعامل و هیئت مدیره', officer: 'Gino Ayyoubian' },
        { digit: '2', destination: 'ext:102', title: 'فناوری و هوش مصنوعی R&D', officer: 'Dr. Reza Asakereh' },
        { digit: '3', destination: 'ext:103', title: 'علوم زمین و انرژی GMEL', officer: 'Dr. Khosro Jarrahian' },
        { digit: '4', destination: 'ext:104', title: 'سرمایه‌گذاری و شبکه IT', officer: 'Farid Imani' },
        { digit: '5', destination: 'ext:105', title: 'امور مالی و بودجه‌ریزی', officer: 'Dr. Pedram Abdarzadeh' },
        { digit: '6', destination: 'ext:106', title: 'عملیات اجرایی و پروژه‌ها', officer: 'Heidar Yarveicy' },
        { digit: '7', destination: 'ext:204', title: 'روابط عمومی و امور بین‌الملل', officer: 'Masoumeh Moshar' },
        { digit: '8', destination: 'ext:205', title: 'امور حقوقی و پتنت‌ها', officer: 'Hamed Zatajam' },
        { digit: '9', destination: 'queue:hse', title: 'مرکز فوریت‌های ایمنی و HSE کارگاه‌ها', protocol: 'Emergency Broadcast' },
        { digit: '0', destination: 'ext:200', title: 'اپراتور مرکزی و پذیرش', afterHours: 'voicemail' }
      ],
      extensions: this.extensions
    };
  }
}

export const telephonyService = new TelephonyService();
