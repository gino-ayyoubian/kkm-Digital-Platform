import { StaffExtension, StaffExtensionStatus } from '../types';

export const INITIAL_STAFF_EXTENSIONS: StaffExtension[] = [
  {
    id: 'ext-101',
    name: 'Gino Ayyoubian',
    nameFa: 'سید ژینو ایوبیان',
    extensionNumber: '101',
    department: 'Executive Directorate',
    departmentFa: 'دفتر مدیرعامل و هیئت مدیره',
    status: StaffExtensionStatus.Active,
    role: 'CEO & Chairman',
    roleFa: 'مدیرعامل و رئیس هیئت مدیره',
    directPhone: '+98 21 9103 0830 (Ext 101)',
    mobileForward: '+98 912 000 0101',
    forwardEnabled: true,
    email: 'g.ayyoubian@kkm-intl.org',
    lastStatusChange: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
  },
  {
    id: 'ext-102',
    name: 'Dr. Reza Asakereh',
    nameFa: 'دکتر رضا عساکره',
    extensionNumber: '102',
    department: 'Technology & AI',
    departmentFa: 'معاونت فناوری و هوش مصنوعی',
    status: StaffExtensionStatus.Busy,
    role: 'CTO & VP Technology',
    roleFa: 'معاونت فناوری و نوآوری',
    directPhone: '+98 21 9103 0830 (Ext 102)',
    mobileForward: '+98 912 000 0102',
    forwardEnabled: true,
    email: 'r.asakereh@kkm-intl.org',
    lastStatusChange: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: 'ext-103',
    name: 'Dr. Khosro Jarrahian',
    nameFa: 'دکتر خسرو جراحیان',
    extensionNumber: '103',
    department: 'GMEL Earth Sciences',
    departmentFa: 'مرکز علوم زمین و ذخایر معدنی',
    status: StaffExtensionStatus.Active,
    role: 'CSO & VP Science',
    roleFa: 'معاونت علوم پایه و اکتشاف',
    directPhone: '+98 21 9103 0830 (Ext 103)',
    mobileForward: '+98 912 000 0103',
    forwardEnabled: false,
    email: 'k.jarrahian@kkm-intl.org',
    lastStatusChange: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'ext-104',
    name: 'Farid Imani',
    nameFa: 'فرید ایمانی',
    extensionNumber: '104',
    department: 'Digital Systems & Cloud',
    departmentFa: 'مدیریت سامانه‌های دیجیتال و کلاود',
    status: StaffExtensionStatus.Active,
    role: 'CIO & VP Digital',
    roleFa: 'معاونت فناوری اطلاعات و زیرساخت',
    directPhone: '+98 21 9103 0830 (Ext 104)',
    mobileForward: '+98 912 000 0104',
    forwardEnabled: false,
    email: 'f.imani@kkm-intl.org',
    lastStatusChange: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
  },
  {
    id: 'ext-105',
    name: 'Dr. Pedram Abdarzadeh',
    nameFa: 'دکتر پدرام آبدارزاده',
    extensionNumber: '105',
    department: 'Finance & Treasury',
    departmentFa: 'مدیریت مالی، سرمایه‌گذاری و خزانه',
    status: StaffExtensionStatus.Away,
    role: 'CFO & VP Finance',
    roleFa: 'معاونت مالی و تامین سرمایه',
    directPhone: '+98 21 9103 0830 (Ext 105)',
    mobileForward: '+98 912 000 0105',
    forwardEnabled: true,
    email: 'p.abdarzadeh@kkm-intl.org',
    lastStatusChange: new Date(Date.now() - 1000 * 60 * 22).toISOString(),
  },
  {
    id: 'ext-106',
    name: 'Heidar Yarveicy',
    nameFa: 'حیدر یارویسی',
    extensionNumber: '106',
    department: 'Mega-Projects Operations',
    departmentFa: 'معاونت عملیات و مگاپروژه‌ها',
    status: StaffExtensionStatus.Active,
    role: 'COO & VP Operations',
    roleFa: 'معاونت اجرایی و عملیات EPC',
    directPhone: '+98 21 9103 0830 (Ext 106)',
    mobileForward: '+98 912 000 0106',
    forwardEnabled: true,
    email: 'h.yarveicy@kkm-intl.org',
    lastStatusChange: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
  },
  {
    id: 'ext-107',
    name: 'Dr. Salar Hashemi',
    nameFa: 'دکتر سالار هاشمی',
    extensionNumber: '107',
    department: 'Energy & Infrastructure',
    departmentFa: 'دپارتمان سیستم‌های نوین انرژی',
    status: StaffExtensionStatus.Busy,
    role: 'Director of Energy Systems',
    roleFa: 'مدیر دپارتمان سیستم‌های انرژی',
    directPhone: '+98 21 9103 0830 (Ext 107)',
    mobileForward: '+98 912 000 0107',
    forwardEnabled: true,
    email: 's.hashemi@kkm-intl.org',
    lastStatusChange: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
  },
  {
    id: 'ext-108',
    name: 'Mahdi Ghiasy',
    nameFa: 'مهدی غیاثی',
    extensionNumber: '108',
    department: 'BIM & Digital Twin',
    departmentFa: 'دپارتمان مدلسازی BIM و دوقلوی دیجیتال',
    status: StaffExtensionStatus.Active,
    role: 'Director of BIM & Modeling',
    roleFa: 'مدیر دپارتمان مدلسازی اطلاعات ساخت (BIM)',
    directPhone: '+98 21 9103 0830 (Ext 108)',
    mobileForward: '+98 912 000 0108',
    forwardEnabled: false,
    email: 'm.ghiasy@kkm-intl.org',
    lastStatusChange: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: 'ext-109',
    name: 'Ashkan Tofangchiha',
    nameFa: 'اشکان تفنگچی‌ها',
    extensionNumber: '109',
    department: 'Quality & Compliance',
    departmentFa: 'مدیریت کنترل کیفی و استانداردهای مهندسی',
    status: StaffExtensionStatus.Away,
    role: 'QA/QC & Standards Director',
    roleFa: 'مدیر تضمین کیفیت و استانداردهای صنعتی',
    directPhone: '+98 21 9103 0830 (Ext 109)',
    mobileForward: '+98 912 000 0109',
    forwardEnabled: true,
    email: 'a.tofangchiha@kkm-intl.org',
    lastStatusChange: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
  },
  {
    id: 'ext-204',
    name: 'Masoumeh Moshar',
    nameFa: 'معصومه مشار',
    extensionNumber: '204',
    department: 'Public Relations & Media',
    departmentFa: 'مدیریت روابط عمومی و ارتباطات بین‌الملل',
    status: StaffExtensionStatus.Active,
    role: 'Director of PR & Media',
    roleFa: 'مدیر روابط عمومی و رسانه',
    directPhone: '+98 21 9103 0830 (Ext 204)',
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
    departmentFa: 'مدیریت حقوقی، قراردادها و مالکیت فکری',
    status: StaffExtensionStatus.Active,
    role: 'Director of Legal & IP',
    roleFa: 'مدیر امور حقوقی، دعاوی و پتنت',
    directPhone: '+98 21 9103 0830 (Ext 205)',
    mobileForward: '+98 912 000 0205',
    forwardEnabled: false,
    email: 'h.zatajam@kkm-intl.org',
    lastStatusChange: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
  },
  {
    id: 'ext-200',
    name: 'Central Switchboard',
    nameFa: 'میز پذیرش و اپراتور مرکزی',
    extensionNumber: '200',
    department: 'Corporate Administration',
    departmentFa: 'امور اداری و دبیرخانه مرکزی',
    status: StaffExtensionStatus.Active,
    role: 'Chief Operator & Reception',
    roleFa: 'مسئول دبیرخانه و هدایت تماس‌ها',
    directPhone: '+98 21 9103 0830 (Ext 200)',
    mobileForward: '+98 21 9103 0830',
    forwardEnabled: false,
    email: 'reception@kkm-intl.org',
    lastStatusChange: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: 'ext-911',
    name: 'HSE Incident Commander',
    nameFa: 'ستاد فوریت‌ها و ایمنی HSE',
    extensionNumber: '911',
    department: 'Health, Safety & Environment',
    departmentFa: 'ایمنی کارگاه‌ها و واکنش اضطراری',
    status: StaffExtensionStatus.Active,
    role: 'Safety Lead & Rapid Dispatch',
    roleFa: 'فرمانده شیفت ایمنی کارگاه‌های EPC',
    directPhone: '+98 21 9103 0830 (Ext 911)',
    mobileForward: '+98 912 911 0000',
    forwardEnabled: true,
    email: 'hse-emergency@kkm-intl.org',
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
  { key: '1', targetExtension: '101', titleFa: 'دفتر مدیرعامل و هیئت مدیره', titleEn: 'Executive Board & CEO Directorate', department: 'Executive', schedule: 'all-hours', isVip: true },
  { key: '2', targetExtension: '102', titleFa: 'معاونت فناوری، نوآوری و هوش مصنوعی', titleEn: 'Technology & AI Directorate', department: 'Technology', schedule: 'day-hours' },
  { key: '3', targetExtension: '103', titleFa: 'مرکز علوم زمین و ژئوماتیک GMEL', titleEn: 'GMEL Earth Sciences & Geomatics', department: 'Earth Sciences', schedule: 'day-hours' },
  { key: '4', targetExtension: '108', titleFa: 'دپارتمان مدلسازی BIM و دوقلوی دیجیتال', titleEn: 'BIM & Digital Twin Directorate', department: 'Engineering', schedule: 'day-hours' },
  { key: '5', targetExtension: '105', titleFa: 'امور مالی، حسابداری و بودجه', titleEn: 'Finance, Investment & Treasury', department: 'Finance', schedule: 'day-hours' },
  { key: '6', targetExtension: '106', titleFa: 'معاونت عملیات و پروژه‌های EPC', titleEn: 'Operations & EPC Mega-Projects', department: 'Operations', schedule: 'day-hours' },
  { key: '7', targetExtension: '205', titleFa: 'امور حقوقی، قراردادها و مالکیت فکری', titleEn: 'Legal Affairs, Contracts & Patents', department: 'Legal', schedule: 'day-hours' },
  { key: '8', targetExtension: '204', titleFa: 'روابط عمومی و امور بین‌الملل', titleEn: 'Public Relations & Global Media', department: 'PR', schedule: 'day-hours' },
  { key: '9', targetExtension: '911', titleFa: 'ستاد حوادث و فوریت‌های اضطراری HSE', titleEn: 'HSE Safety & Emergency Incident Command', department: 'HSE', schedule: 'all-hours', isEmergency: true },
  { key: '0', targetExtension: '200', titleFa: 'اپراتور و دبیرخانه مرکزی', titleEn: 'Central Receptionist & Operator', department: 'Administration', schedule: 'day-hours' },
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
      targetExtension: '105',
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
    // Attempt to load cached state from localStorage if available in browser
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
    // Simulate lightweight network roundtrip
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
