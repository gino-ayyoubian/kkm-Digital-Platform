import { StaffExtension, StaffExtensionStatus } from '../types';

export const INITIAL_STAFF_EXTENSIONS: StaffExtension[] = [
  {
    id: 'ext-101',
    name: 'Gino Ayyoubian',
    nameFa: 'سید ژینو ایوبیان مرکزی',
    extensionNumber: '101',
    department: 'Executive Leadership',
    departmentFa: 'دفتر مدیر ارشد اجرایی و هیئت مدیره',
    status: StaffExtensionStatus.Active,
    role: 'CEO & Chairman',
    roleFa: 'مدیر ارشد اجرایی و رئیس هیئت مدیره',
    directPhone: '+98 21 9103 0830 (Ext 101)',
    mobileForward: '+98 912 000 0101',
    forwardEnabled: true,
    email: 'g.ayyoubian@kkm-intl.org',
    lastStatusChange: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
  },
  {
    id: 'ext-102',
    name: 'Khosro Jarrahian',
    nameFa: 'خسرو جراحیان',
    extensionNumber: '102',
    department: 'Technology Directorate',
    departmentFa: 'معاونت فناوری و توسعه سیستم‌ها',
    status: StaffExtensionStatus.Active,
    role: 'Chief Technology Officer (CTO)',
    roleFa: 'معاونت فناوری (CTO)',
    directPhone: '+98 21 9103 0831 (Ext 102)',
    mobileForward: '+98 912 000 0102',
    forwardEnabled: true,
    email: 'k.jarrahian@kkm-intl.org',
    lastStatusChange: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: 'ext-103',
    name: 'Heydar Yarveisi',
    nameFa: 'حیدر یارویسی',
    extensionNumber: '103',
    department: 'Operations & EPC',
    departmentFa: 'معاونت اجرایی و مگاپروژه‌های EPC',
    status: StaffExtensionStatus.Active,
    role: 'Chief Operating Officer (COO)',
    roleFa: 'معاونت اجرایی و EPC (COO)',
    directPhone: '+98 21 9103 0832 (Ext 103)',
    mobileForward: '+98 912 000 0103',
    forwardEnabled: true,
    email: 'h.yarveicy@kkm-intl.org',
    lastStatusChange: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'ext-104',
    name: 'Farid Imani',
    nameFa: 'فرید ایمانی',
    extensionNumber: '104',
    department: 'Finance & Capital',
    departmentFa: 'معاونت مالی، دارایی و سرمایه‌گذاری',
    status: StaffExtensionStatus.Active,
    role: 'Chief Financial Officer (CFO)',
    roleFa: 'معاونت مالی و دارایی (CFO)',
    directPhone: '+98 21 9103 0833 (Ext 104)',
    mobileForward: '+98 912 000 0104',
    forwardEnabled: false,
    email: 'f.imani@kkm-intl.org',
    lastStatusChange: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
  },
  {
    id: 'ext-105',
    name: 'Reza Baghdadchi',
    nameFa: 'رضا بغدادچی',
    extensionNumber: '105',
    department: 'Human Capital & Governance',
    departmentFa: 'دفتر سرمایه انسانی و اختیار قراردادها',
    status: StaffExtensionStatus.Active,
    role: 'Director of Human Capital & Contracts',
    roleFa: 'مدیر دفتر سرمایه انسانی و اختیار قراردادها',
    directPhone: '+98 21 9103 0834 (Ext 105)',
    mobileForward: '+98 912 000 0105',
    forwardEnabled: true,
    email: 'r.baghdadchi@kkm-intl.org',
    lastStatusChange: new Date(Date.now() - 1000 * 60 * 22).toISOString(),
  },
  {
    id: 'ext-106',
    name: 'Reza Asakereh',
    nameFa: 'رضا عساکره',
    extensionNumber: '106',
    department: 'AI & Data Directorate',
    departmentFa: 'واحد هوش مصنوعی و داده (معاونت فناوری)',
    status: StaffExtensionStatus.Busy,
    role: 'Head of AI & Cognitive Telemetry',
    roleFa: 'مدیر هوش مصنوعی و داده',
    directPhone: '+98 21 9103 0835 (Ext 106)',
    mobileForward: '+98 912 000 0106',
    forwardEnabled: true,
    email: 'r.asakereh@kkm-intl.org',
    lastStatusChange: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
  },
  {
    id: 'ext-107',
    name: 'Ashkan Tofangchiha',
    nameFa: 'اشکان تفنگچی‌ها',
    extensionNumber: '107',
    department: 'Open Innovation Directorate',
    departmentFa: 'واحد نوآوری باز و تفکر طراحی (معاونت فناوری)',
    status: StaffExtensionStatus.Active,
    role: 'Head of Open Innovation & Design Thinking',
    roleFa: 'مدیر واحد نوآوری باز و تفکر طراحی',
    directPhone: '+98 21 9103 0836 (Ext 107)',
    mobileForward: '+98 912 000 0107',
    forwardEnabled: true,
    email: 'a.tofangchiha@kkm-intl.org',
    lastStatusChange: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
  },
  {
    id: 'ext-108',
    name: 'Pedram Abdarzadeh',
    nameFa: 'پدرام آبدارزاده',
    extensionNumber: '108',
    department: 'Corporate Governance & Risk',
    departmentFa: 'حاکمیت شرکتی، ریسک و بیمه (معاونت مالی)',
    status: StaffExtensionStatus.Away,
    role: 'Head of Corporate Governance, Risk & Insurance',
    roleFa: 'مدیر حاکمیت شرکتی، ریسک و بیمه',
    directPhone: '+98 21 9103 0837 (Ext 108)',
    mobileForward: '+98 912 000 0108',
    forwardEnabled: true,
    email: 'p.abdarzadeh@kkm-intl.org',
    lastStatusChange: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: 'ext-109',
    name: 'Seyed Jassem Hosseini',
    nameFa: 'سید جاسم حسینی',
    extensionNumber: '109',
    department: 'HSE & Environmental Management',
    departmentFa: 'مدیریت بهداشت، ایمنی و محیط زیست',
    status: StaffExtensionStatus.Active,
    role: 'Head of HSE & Environmental Management',
    roleFa: 'مدیر بهداشت، ایمنی و محیط زیست (HSE)',
    directPhone: '+98 21 9103 0838 (Ext 109)',
    mobileForward: '+98 912 000 0109',
    forwardEnabled: true,
    email: 'j.hosseini@kkm-intl.org',
    lastStatusChange: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
  },
  {
    id: 'ext-200',
    name: 'Corporate Central Reception',
    nameFa: 'میز پذیرش و اپراتور مرکزی ۲۴ ساعته',
    extensionNumber: '200',
    department: 'Corporate Administration',
    departmentFa: 'امور اداری و دبیرخانه مرکزی',
    status: StaffExtensionStatus.Active,
    role: 'Central Dispatch & Operator',
    roleFa: 'مسئول دبیرخانه و هدایت تماس‌ها',
    directPhone: '+98 21 9103 0830 (Ext 200)',
    mobileForward: '+98 21 9103 0830',
    forwardEnabled: false,
    email: 'reception@kkm-intl.org',
    lastStatusChange: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: 'ext-201',
    name: 'Salar Hasheminasab',
    nameFa: 'سید سالار هاشمی‌نسب',
    extensionNumber: '201',
    department: 'Nanomaterials & Sensors',
    departmentFa: 'نانومواد و سنسورها (معاونت فناوری)',
    status: StaffExtensionStatus.Active,
    role: 'Head of Nanomaterials & Sensors',
    roleFa: 'مدیر واحد نانومواد و سنسورها',
    directPhone: '+98 21 9103 0840 (Ext 201)',
    mobileForward: '+98 912 000 0201',
    forwardEnabled: true,
    email: 's.hashemi@kkm-intl.org',
    lastStatusChange: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
  },
  {
    id: 'ext-202',
    name: 'Mahdi Ghiasy',
    nameFa: 'مهدی غیاثی',
    extensionNumber: '202',
    department: 'Automation Systems',
    departmentFa: 'اتوماسیون، شبکه و شبیه‌سازی BIM',
    status: StaffExtensionStatus.Active,
    role: 'Director of Automation & BIM Simulation',
    roleFa: 'مدیر اتوماسیون، شبکه و مدل‌سازی BIM',
    directPhone: '+98 21 9103 0841 (Ext 202)',
    mobileForward: '+98 912 000 0202',
    forwardEnabled: false,
    email: 'm.ghiasy@kkm-intl.org',
    lastStatusChange: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: 'ext-204',
    name: 'Masoumeh Moshar',
    nameFa: 'معصومه مشار',
    extensionNumber: '204',
    department: 'Public Relations & Media',
    departmentFa: 'معاونت ارتباطات و ذینفعان',
    status: StaffExtensionStatus.Active,
    role: 'Director of Communications & Stakeholders',
    roleFa: 'معاونت ارتباطات و ذینفعان',
    directPhone: '+98 21 9103 0845 (Ext 204)',
    mobileForward: '+98 912 000 0204',
    forwardEnabled: false,
    email: 'm.moshar@kkm-intl.org',
    lastStatusChange: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: 'ext-205',
    name: 'Hamed Zatajam',
    nameFa: 'حامد ذات‌عجم',
    extensionNumber: '205',
    department: 'Legal & Intellectual Property',
    departmentFa: 'دفتر IP و امور حقوقی (گزارش به مدیرعامل)',
    status: StaffExtensionStatus.Active,
    role: 'Director of IP HoldCo & Legal Affairs',
    roleFa: 'مدیر دفتر IP و امور حقوقی',
    directPhone: '+98 21 9103 0846 (Ext 205)',
    mobileForward: '+98 912 000 0205',
    forwardEnabled: false,
    email: 'h.zatajam@kkm-intl.org',
    lastStatusChange: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
  },
  {
    id: 'ext-208',
    name: 'Sina Ayyoubian',
    nameFa: 'سینا ایوبیان',
    extensionNumber: '208',
    department: 'Automation & Robotics',
    departmentFa: 'اتوماسیون، شبکه و رباتیک',
    status: StaffExtensionStatus.Active,
    role: 'Robotics, Automation & R&D Specialist',
    roleFa: 'متخصص اتوماسیون، شبکه و رباتیک',
    directPhone: '+98 21 9103 0848 (Ext 208)',
    mobileForward: '+98 912 000 0208',
    forwardEnabled: true,
    email: 's.ayyoubian@kkm-intl.org',
    lastStatusChange: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
  },
  {
    id: 'ext-209',
    name: 'Mostafa Sharifi',
    nameFa: 'مصطفی شریفی',
    extensionNumber: '209',
    department: 'Independent QA/QC',
    departmentFa: 'بازرسی فنی و کنترل کیفیت (مستقل)',
    status: StaffExtensionStatus.Active,
    role: 'Director of QA/QC',
    roleFa: 'مدیر بازرسی فنی و کنترل کیفیت (QA/QC)',
    directPhone: '+98 21 9103 0849 (Ext 209)',
    mobileForward: '+98 912 000 0209',
    forwardEnabled: true,
    email: 'm.sharifi@kkm-intl.org',
    lastStatusChange: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
  },
  {
    id: 'ext-911',
    name: 'HSE Incident Command (*9111)',
    nameFa: 'ستاد فوریت‌ها و ایمنی HSE (*9111)',
    extensionNumber: '911',
    department: 'Health, Safety & Environment',
    departmentFa: 'ایمنی کارگاه‌ها و واکنش اضطراری',
    status: StaffExtensionStatus.Active,
    role: 'Safety Lead & Rapid Dispatch',
    roleFa: 'فرمانده شیفت ایمنی کارگاه‌های EPC (سید جاسم حسینی)',
    directPhone: '+98 21 9103 0838 (Ext 109)',
    mobileForward: '+98 912 000 0109',
    forwardEnabled: true,
    email: 'j.hosseini@kkm-intl.org',
    lastStatusChange: new Date(Date.now() - 1000 * 60 * 1).toISOString(),
  },
];

export interface DaftareShomaApiResponse<T> {
  success: boolean;
  provider: string;
  source: string;
  timestamp: string;
  data: T;
  meta?: {
    activeLine: string;
    accountNumber: string;
    totalChannels: number;
    usedChannels: number;
    latencyMs: number;
  };
}

export interface DaftareShomaIvrRoute {
  key: string;
  targetExtension: string;
  titleFa: string;
  titleEn: string;
  department: string;
  schedule: 'all-hours' | 'day-hours' | 'after-hours-vm';
  isEmergency?: boolean;
  isVip?: boolean;
}

export const DAFTARE_SHOMA_ACTIVE_ROUTES: DaftareShomaIvrRoute[] = [
  { key: '1', targetExtension: '101', titleFa: 'دفتر مدیر ارشد اجرایی و هیئت مدیره', titleEn: 'Executive Board & CEO Directorate', department: 'Executive', schedule: 'all-hours', isVip: true },
  { key: '2', targetExtension: '102', titleFa: 'معاونت فناوری (CTO)', titleEn: 'Technology Directorate (CTO)', department: 'Technology', schedule: 'day-hours' },
  { key: '3', targetExtension: '103', titleFa: 'معاونت اجرایی و EPC (COO)', titleEn: 'Operations & EPC Directorate (COO)', department: 'Operations', schedule: 'day-hours' },
  { key: '4', targetExtension: '104', titleFa: 'معاونت مالی و دارایی (CFO)', titleEn: 'Finance & Capital Directorate (CFO)', department: 'Finance', schedule: 'day-hours' },
  { key: '5', targetExtension: '105', titleFa: 'دفتر سرمایه انسانی و اختیار قراردادها', titleEn: 'Human Capital & Contract Authorization', department: 'Human Capital', schedule: 'day-hours' },
  { key: '6', targetExtension: '106', titleFa: 'واحد هوش مصنوعی و داده', titleEn: 'AI & Cognitive Telemetry', department: 'Technology', schedule: 'day-hours' },
  { key: '7', targetExtension: '107', titleFa: 'واحد نوآوری باز و تفکر طراحی', titleEn: 'Open Innovation & Design Thinking', department: 'Technology', schedule: 'day-hours' },
  { key: '8', targetExtension: '108', titleFa: 'حاکمیت شرکتی، ریسک و بیمه', titleEn: 'Corporate Governance, Risk & Insurance', department: 'Finance', schedule: 'day-hours' },
  { key: '9', targetExtension: '109', titleFa: 'مدیریت بهداشت، ایمنی و محیط زیست (HSE و *9111)', titleEn: 'HSE Safety & Emergency Incident Command', department: 'HSE', schedule: 'all-hours', isEmergency: true },
  { key: '0', targetExtension: '200', titleFa: 'اپراتور و پذیرش مرکزی ۲۴ ساعته', titleEn: 'Central Receptionist & Operator', department: 'Administration', schedule: 'day-hours' },
];

export interface VoicemailSummary {
  total: number;
  unread: number;
  urgentCount: number;
  lastMessageTimestamp?: string;
  recentMessages: Array<{
    id: string;
    callerNumber: string;
    targetExtension: string;
    duration: string;
    receivedAt: string;
    isRead: boolean;
    preview: string;
    priority: 'normal' | 'urgent';
  }>;
}

export const INITIAL_VOICEMAIL_SUMMARY: VoicemailSummary = {
  total: 6,
  unread: 2,
  urgentCount: 1,
  lastMessageTimestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
  recentMessages: [
    {
      id: 'vm-101',
      callerNumber: '+98 21 8876 5432',
      targetExtension: '101',
      duration: '0:42',
      receivedAt: '35m ago',
      isRead: false,
      preview: 'تماس از شرکت توسعه انرژی پیرامون قرارداد فاز ۲ قشم',
      priority: 'urgent',
    },
    {
      id: 'vm-102',
      callerNumber: '+98 912 345 6789',
      targetExtension: '104',
      duration: '1:15',
      receivedAt: '2h ago',
      isRead: false,
      preview: 'استعلام پیرامون واریز ضمانت‌نامه بانکی پروژه خط انتقال',
      priority: 'normal',
    },
    {
      id: 'vm-103',
      callerNumber: '+98 21 2233 4455',
      targetExtension: '205',
      duration: '0:58',
      receivedAt: '4h ago',
      isRead: true,
      preview: 'تاییدیه ارسال ضمائم لایحه استعلام ثبت علامت تجاری',
      priority: 'normal',
    },
  ],
};

class DaftareShomaMockService {
  private extensions: StaffExtension[] = [...INITIAL_STAFF_EXTENSIONS];
  private voicemails: VoicemailSummary = { ...INITIAL_VOICEMAIL_SUMMARY };
  private listeners: Array<(extensions: StaffExtension[]) => void> = [];

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('kkm_daftareshoma_extensions');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            this.extensions = parsed;
          }
        }
      } catch {
        // use initial
      }
    }
  }

  public subscribe(listener: (extensions: StaffExtension[]) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('kkm_daftareshoma_extensions', JSON.stringify(this.extensions));
      } catch {
        // ignore
      }
    }
    this.listeners.forEach(l => l([...this.extensions]));
  }

  public async getStaffExtensions(): Promise<DaftareShomaApiResponse<StaffExtension[]>> {
    await new Promise(r => setTimeout(r, 120));
    return {
      success: true,
      provider: 'Daftare Shoma Cloud PBX (ext.daftareshoma.com)',
      source: 'Mock Telephony Gateway',
      timestamp: new Date().toISOString(),
      data: [...this.extensions],
      meta: {
        activeLine: '+98 21 9103 0830',
        accountNumber: 'DS-206962',
        totalChannels: 30,
        usedChannels: this.extensions.filter(e => e.status === StaffExtensionStatus.Busy).length + 1,
        latencyMs: 14,
      },
    };
  }

  public async updateExtensionStatus(
    extensionId: string,
    newStatus: StaffExtensionStatus,
  ): Promise<DaftareShomaApiResponse<StaffExtension>> {
    await new Promise(r => setTimeout(r, 80));
    const index = this.extensions.findIndex(e => e.id === extensionId || e.extensionNumber === extensionId);
    if (index === -1) {
      throw new Error(`Extension ${extensionId} not found in Daftar-e-Shoma registry`);
    }

    this.extensions[index] = {
      ...this.extensions[index],
      status: newStatus,
      lastStatusChange: new Date().toISOString(),
    };

    this.notify();

    return {
      success: true,
      provider: 'Daftare Shoma Cloud PBX',
      source: 'IVR State Synchronizer',
      timestamp: new Date().toISOString(),
      data: this.extensions[index],
    };
  }

  public async toggleForward(extensionId: string): Promise<StaffExtension> {
    const index = this.extensions.findIndex(e => e.id === extensionId || e.extensionNumber === extensionId);
    if (index === -1) throw new Error('Extension not found');
    this.extensions[index] = {
      ...this.extensions[index],
      forwardEnabled: !this.extensions[index].forwardEnabled,
      lastStatusChange: new Date().toISOString(),
    };
    this.notify();
    return this.extensions[index];
  }

  public async getVoicemailSummary(): Promise<DaftareShomaApiResponse<VoicemailSummary>> {
    await new Promise(r => setTimeout(r, 80));
    return {
      success: true,
      provider: 'Daftare Shoma Cloud PBX',
      source: 'Voicemail Server',
      timestamp: new Date().toISOString(),
      data: { ...this.voicemails },
    };
  }

  public async markVoicemailAsRead(messageId: string): Promise<void> {
    const msg = this.voicemails.recentMessages.find(m => m.id === messageId);
    if (msg && !msg.isRead) {
      msg.isRead = true;
      this.voicemails.unread = Math.max(0, this.voicemails.unread - 1);
    }
  }

  public getIvrRoutes(): DaftareShomaIvrRoute[] {
    return DAFTARE_SHOMA_ACTIVE_ROUTES;
  }
}

export const daftareShomaMockService = new DaftareShomaMockService();
