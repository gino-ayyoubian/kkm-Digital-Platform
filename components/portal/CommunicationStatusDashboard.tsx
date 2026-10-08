import * as React from 'react';
import { 
  Phone, PhoneCall, Activity, Server, Voicemail, RefreshCw, 
  Search, Filter, Clock3, ArrowUpRight, CheckCircle2, AlertCircle, 
  ExternalLink, PhoneForwarded, Radio, Shield, Check, Volume2, User
} from 'lucide-react';
import { useLanguage } from '../../LanguageContext';
import { StaffExtension, StaffExtensionStatus } from '../../types';
import { 
  daftareShomaMockService, 
  DAFTARE_SHOMA_ACTIVE_ROUTES, 
  type VoicemailSummary, 
  type DaftareShomaIvrRoute 
} from '../../data/staffExtensions';
import { CommunicationStatusLegend } from './CommunicationStatusLegend';

interface CommunicationStatusDashboardProps {
  onDialExtension?: (extensionNumber: string, staffName?: string) => void;
  className?: string;
  condensed?: boolean;
}

export const CommunicationStatusDashboard: React.FC<CommunicationStatusDashboardProps> = ({
  onDialExtension,
  className = '',
  condensed = false,
}) => {
  const { isFa, direction } = useLanguage();
  const isRtl = direction === 'rtl';

  const [extensions, setExtensions] = React.useState<StaffExtension[]>([]);
  const [voicemailData, setVoicemailData] = React.useState<VoicemailSummary | null>(null);
  const [routes, setRoutes] = React.useState<DaftareShomaIvrRoute[]>(DAFTARE_SHOMA_ACTIVE_ROUTES);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const [lastSyncAt, setLastSyncAt] = React.useState<string>(new Date().toISOString());
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [statusFilter, setStatusFilter] = React.useState<'ALL' | StaffExtensionStatus>('ALL');
  const [selectedDept, setSelectedDept] = React.useState<string>('ALL');
  const [activeTabSection, setActiveTabSection] = React.useState<'extensions' | 'voicemail' | 'routing'>('extensions');

  // Load and subscribe to real-time mock service
  const loadData = React.useCallback(async (isSilent = false) => {
    if (!isSilent) setRefreshing(true);
    try {
      // 1. Try real backend extensions endpoint first, fallback to mock service
      let fetchedExt = false;
      try {
        const res = await fetch('/api/telephony/extensions');
        if (res.ok) {
          const payload = await res.json();
          if (Array.isArray(payload?.data) && payload.data.length > 0) {
            const mapped: StaffExtension[] = payload.data.map((rec: any) => ({
              id: `ext-${rec.extension}`,
              name: rec.name,
              nameFa: rec.nameFa,
              extensionNumber: rec.extension,
              department: rec.department,
              departmentFa: rec.departmentFa,
              role: rec.role,
              roleFa: rec.roleFa || rec.role,
              directPhone: rec.directPhone,
              mobileForward: rec.mobileForward,
              forwardEnabled: Boolean(rec.forwardEnabled),
              status: rec.status === 'available' || rec.status === 'Active'
                ? StaffExtensionStatus.Active
                : rec.status === 'busy' || rec.status === 'Busy'
                  ? StaffExtensionStatus.Busy
                  : StaffExtensionStatus.Away,
            }));
            setExtensions(mapped);
            fetchedExt = true;
          }
        }
      } catch {
        // Fallback to mock service
      }

      if (!fetchedExt) {
        const extRes = await daftareShomaMockService.getStaffExtensions();
        setExtensions(extRes.data);
      }

      // 2. Try real backend voicemails endpoint, fallback to mock service
      let fetchedVm = false;
      try {
        const vmFetch = await fetch('/api/telephony/voicemails');
        if (vmFetch.ok) {
          const payload = await vmFetch.json();
          if (Array.isArray(payload?.data)) {
            const list = payload.data;
            const unread = list.filter((v: any) => !v.isRead).length;
            setVoicemailData({
              total: list.length,
              unread,
              urgentCount: list.filter((v: any) => v.priority === 'urgent').length,
              recentMessages: list.slice(0, 6).map((v: any) => ({
                id: v.id,
                callerNumber: v.callerNumber,
                targetExtension: v.targetExtension,
                receivedAt: v.timestamp ? new Date(v.timestamp).toLocaleTimeString() : '10:45 AM',
                duration: `${v.durationSeconds || 32}s`,
                preview: isFa ? (v.transcriptionFa || v.preview || '') : (v.transcriptionEn || v.preview || ''),
                isRead: Boolean(v.isRead),
                priority: v.priority === 'urgent' ? 'urgent' : 'normal',
              })),
            });
            fetchedVm = true;
          }
        }
      } catch {
        // Fallback to mock service
      }

      if (!fetchedVm) {
        const vmRes = await daftareShomaMockService.getVoicemailSummary();
        setVoicemailData(vmRes.data);
      }

      setRoutes(daftareShomaMockService.getIvrRoutes());
      setLastSyncAt(new Date().toISOString());
    } catch (err) {
      console.warn('Communication dashboard sync error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [isFa]);

  React.useEffect(() => {
    void loadData();

    // Subscribe to mock service state updates (e.g. from user toggles)
    const unsubscribe = daftareShomaMockService.subscribe((updated) => {
      setExtensions(updated);
      setLastSyncAt(new Date().toISOString());
    });

    // Simulated heartbeat poll every 30 seconds
    const interval = window.setInterval(() => {
      void loadData(true);
    }, 30_000);

    return () => {
      unsubscribe();
      window.clearInterval(interval);
    };
  }, [loadData]);

  // Handle interactive status toggle
  const handleToggleStatus = async (extId: string, current: StaffExtensionStatus) => {
    const nextStatus = 
      current === StaffExtensionStatus.Active ? StaffExtensionStatus.Busy :
      current === StaffExtensionStatus.Busy ? StaffExtensionStatus.Away :
      StaffExtensionStatus.Active;

    try {
      await daftareShomaMockService.updateExtensionStatus(extId, nextStatus);
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleForward = async (extId: string) => {
    try {
      await daftareShomaMockService.toggleForward(extId);
    } catch (e) {
      console.error(e);
    }
  };

  const handleMarkVoicemailRead = async (msgId: string) => {
    await daftareShomaMockService.markVoicemailAsRead(msgId);
    const vmRes = await daftareShomaMockService.getVoicemailSummary();
    setVoicemailData(vmRes.data);
  };

  // Metrics computation
  const activeCount = extensions.filter(e => e.status === StaffExtensionStatus.Active).length;
  const busyCount = extensions.filter(e => e.status === StaffExtensionStatus.Busy).length;
  const awayCount = extensions.filter(e => e.status === StaffExtensionStatus.Away).length;
  const totalExtensions = extensions.length;
  const unreadVoicemails = voicemailData?.unread ?? 0;

  // Filtered extensions
  const filteredExtensions = React.useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return extensions.filter(item => {
      // 1. Status Filter
      if (statusFilter !== 'ALL' && item.status !== statusFilter) return false;

      // 2. Department Filter
      if (selectedDept !== 'ALL') {
        const d = item.departmentFa || item.department;
        if (d !== selectedDept && item.department !== selectedDept) return false;
      }

      // 3. Search Query
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        (item.nameFa && item.nameFa.toLowerCase().includes(q)) ||
        item.extensionNumber.includes(q) ||
        item.department.toLowerCase().includes(q) ||
        (item.departmentFa && item.departmentFa.toLowerCase().includes(q)) ||
        (item.role && item.role.toLowerCase().includes(q)) ||
        (item.roleFa && item.roleFa.toLowerCase().includes(q))
      );
    });
  }, [extensions, searchQuery, statusFilter, selectedDept]);

  // Unique departments for filter dropdown
  const departmentsList = React.useMemo(() => {
    const set = new Set<string>();
    extensions.forEach(e => {
      if (isFa && e.departmentFa) set.add(e.departmentFa);
      else set.add(e.department);
    });
    return Array.from(set);
  }, [extensions, isFa]);

  return (
    <section 
      className={`rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-sm transition-all ${className}`}
      aria-label={isFa ? 'داشبورد وضعیت ارتباطات سازمانی و داخلی‌ها' : 'Communication Status Dashboard'}
    >
      {/* 1. Header Bar: System Identity & Sync Controls */}
      <div className="border-b border-slate-100 p-5 dark:border-slate-800 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {isFa ? 'سانترال دفتر شما متصل است' : 'Daftar-e-Shoma Cloud PBX Live'}
              </span>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                +98 21 9103 0830
              </span>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <span className="font-mono text-[11px] text-slate-400">
                ext.daftareshoma.com
              </span>
            </div>

            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
              {isFa ? 'داشبورد ارتباطات سازمانی و وضعیت خطوط داخلی' : 'Communication Status Dashboard'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isFa 
                ? 'پایش بلادرنگ وضعیت خطوط داخلی پرسنل (فعال، مشغول، دور از میز)، صندوق پیام‌های صوتی و مسیرهای تلفن گویا'
                : 'Real-time telemetry of staff extension states (Active, Busy, Away), voicemail queue, and active IVR routing synchronized with Daftar-e-Shoma platform.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
              <Clock3 className="h-3.5 w-3.5" />
              <span>{new Date(lastSyncAt).toLocaleTimeString()}</span>
            </div>

            <button
              type="button"
              onClick={() => void loadData()}
              disabled={refreshing}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-750 transition-colors"
              title={isFa ? 'همگام‌سازی بلادرنگ با دفتر شما' : 'Refresh live status from Daftar-e-Shoma'}
            >
              <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              <span>{isFa ? 'همگام‌سازی' : 'Sync'}</span>
            </button>

            <a
              href="https://portal.daftareshoma.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-colors"
              title="پرتال مدیریت دفتر شما"
            >
              <span>{isFa ? 'پرتال دفتر شما' : 'Daftar-e-Shoma Portal'}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* 2. Top Metric Cards: 4 Key Health Indicators */}
        <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {/* Card 1: Extension Status Summary */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/40">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold">{isFa ? 'داخلی‌های ثبت‌شده' : 'Staff Extensions'}</span>
              <Server className="h-4 w-4 text-primary dark:text-secondary" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-mono text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                {totalExtensions}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {isFa ? 'خط فعال' : 'lines configured'}
              </span>
            </div>
            <div className="mt-2.5 flex items-center gap-2 text-[11px] font-mono text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {activeCount} {isFa ? 'فعال' : 'Active'}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                {busyCount} {isFa ? 'مشغول' : 'Busy'}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                {awayCount} {isFa ? 'دور' : 'Away'}
              </span>
            </div>
          </div>

          {/* Card 2: Trunk Channels & Network Latency */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/40">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold">{isFa ? 'ظرفیت ترانک و تاخیر' : 'SIP Trunk & Latency'}</span>
              <Activity className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-mono text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                14 <span className="text-xs font-normal text-slate-500">ms</span>
              </span>
              <span className="text-xs text-emerald-600 font-semibold">
                {isFa ? 'پایدار' : 'Optimal'}
              </span>
            </div>
            <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
              <span>{isFa ? 'کانال‌های همزمان:' : 'Channels in use:'}</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 tabular-nums">
                {busyCount + 1} / 30
              </span>
            </div>
          </div>

          {/* Card 3: Voicemails Status */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/40">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold">{isFa ? 'صندوق صوتی (*99)' : 'Voicemail Queue'}</span>
              <Voicemail className="h-4 w-4 text-blue-500" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-mono text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                {unreadVoicemails}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {isFa ? 'پیام خوانده‌نشده' : 'unread messages'}
              </span>
            </div>
            <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span>{isFa ? 'مجموع پیام‌های سرور:' : 'Total archived:'}</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200 tabular-nums">
                {voicemailData?.total ?? 6}
              </span>
            </div>
          </div>

          {/* Card 4: Active IVR Routing Tree */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/40">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold">{isFa ? 'وضعیت هدایت IVR' : 'Active Routing Mode'}</span>
              <Phone className="h-4 w-4 text-primary" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-mono text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                {routes.length}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {isFa ? 'مسیر فعال' : 'active keys'}
              </span>
            </div>
            <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span>{isFa ? 'برنامه زمانی جاری:' : 'Current shift:'}</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {isFa ? 'ساعات اداری (۸-۱۷)' : 'Day Shift (8-17)'}
              </span>
            </div>
          </div>
        </div>

        {/* 3. Section Switcher: Extensions, Voicemail Queue, Routing Map */}
        <div className="mt-5 flex items-center gap-1 border-t border-slate-100 pt-4 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTabSection('extensions')}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition-colors ${
              activeTabSection === 'extensions'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
            }`}
          >
            {isFa ? 'وضعیت خطوط داخلی پرسنل' : 'Staff Extension Status'}
          </button>

          <button
            type="button"
            onClick={() => setActiveTabSection('voicemail')}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeTabSection === 'voicemail'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
            }`}
          >
            <span>{isFa ? 'صندوق پیام‌های صوتی' : 'Voicemail Queue'}</span>
            {unreadVoicemails > 0 && (
              <span className="font-mono text-[10px] rounded-full px-1.5 py-0.2 bg-rose-500 text-white font-bold">
                {unreadVoicemails}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTabSection('routing')}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition-colors ${
              activeTabSection === 'routing'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
            }`}
          >
            {isFa ? 'پیکربندی کلیدهای تلفن گویا' : 'IVR Key Mapping'}
          </button>
        </div>
      </div>

      {/* SECTION 1: EXTENSIONS DIRECTORY & LIVE STATUS */}
      {activeTabSection === 'extensions' && (
        <div className="p-5 sm:p-6 space-y-4">
          {/* Descriptive Legend Component for Staff Extension Statuses */}
          <CommunicationStatusLegend
            activeFilter={statusFilter}
            onSelectStatus={(st) => setStatusFilter(prev => prev === st ? 'ALL' : st)}
          />

          {/* Filter & Search Bar */}
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className={`absolute top-3 h-4 w-4 text-slate-400 ${isRtl ? 'right-3.5' : 'left-3.5'}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isFa 
                    ? 'جستجو بر اساس نام پرسنل، سمت، شماره داخلی (مثلاً: ۱۰۱، ۱۰۲، ۱۰۶)...' 
                    : 'Search staff by name, title, or extension number (e.g. 101, 102, 106)...'
                }
                className={`w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-secondary transition-all ${
                  isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'
                }`}
              />
            </div>

            {/* Status Filter Tabs (Clean Segmented Buttons) */}
            <div className="flex flex-wrap items-center gap-1.5">
              <div className="flex items-center rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
                <button
                  type="button"
                  onClick={() => setStatusFilter('ALL')}
                  className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                    statusFilter === 'ALL'
                      ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-700 dark:text-white'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  {isFa ? 'همه' : 'All'} ({totalExtensions})
                </button>
                <button
                  type="button"
                  onClick={() => setStatusFilter(StaffExtensionStatus.Active)}
                  className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors flex items-center gap-1 ${
                    statusFilter === StaffExtensionStatus.Active
                      ? 'bg-white text-emerald-700 shadow-xs dark:bg-slate-700 dark:text-emerald-300'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {isFa ? 'فعال' : 'Active'} ({activeCount})
                </button>
                <button
                  type="button"
                  onClick={() => setStatusFilter(StaffExtensionStatus.Busy)}
                  className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors flex items-center gap-1 ${
                    statusFilter === StaffExtensionStatus.Busy
                      ? 'bg-white text-rose-700 shadow-xs dark:bg-slate-700 dark:text-rose-300'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                  {isFa ? 'مشغول' : 'Busy'} ({busyCount})
                </button>
                <button
                  type="button"
                  onClick={() => setStatusFilter(StaffExtensionStatus.Away)}
                  className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors flex items-center gap-1 ${
                    statusFilter === StaffExtensionStatus.Away
                      ? 'bg-white text-amber-700 shadow-xs dark:bg-slate-700 dark:text-amber-300'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  {isFa ? 'دور' : 'Away'} ({awayCount})
                </button>
              </div>

              {/* Department Dropdown */}
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 focus:outline-hidden"
              >
                <option value="ALL">{isFa ? 'تمامی دپارتمان‌ها' : 'All Departments'}</option>
                {departmentsList.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Extension Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredExtensions.map((item) => {
              const isActive = item.status === StaffExtensionStatus.Active;
              const isBusy = item.status === StaffExtensionStatus.Busy;
              const isAway = item.status === StaffExtensionStatus.Away;

              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs hover:border-slate-300 dark:border-slate-800 dark:bg-slate-850 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Name and Extension Number */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                            {isFa && item.nameFa ? item.nameFa : item.name}
                          </h4>
                        </div>
                        <p className="text-xs text-primary dark:text-secondary font-medium truncate">
                          {isFa && item.roleFa ? item.roleFa : item.role}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                          {isFa && item.departmentFa ? item.departmentFa : item.department}
                        </p>
                      </div>

                      {/* Prominent Extension Pill */}
                      <span className="font-mono text-sm font-bold px-2.5 py-1 rounded-xl bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 shrink-0 tabular-nums">
                        {item.extensionNumber}
                      </span>
                    </div>

                    {/* Status Badge & Interactive Toggle Button */}
                    <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800/80">
                      {/* Visual Status Indicator: Dot + Accessible Text Label */}
                      <div className="flex items-center gap-1.5">
                        <span 
                          className={`inline-block h-2 w-2 rounded-full ${
                            isActive ? 'bg-emerald-500' :
                            isBusy ? 'bg-rose-500' :
                            'bg-amber-500'
                          }`}
                          aria-hidden="true"
                        />
                        <span className={`text-xs font-semibold ${
                          isActive ? 'text-emerald-700 dark:text-emerald-400' :
                          isBusy ? 'text-rose-700 dark:text-rose-400' :
                          'text-amber-700 dark:text-amber-400'
                        }`}>
                          {isActive ? (isFa ? 'آماده پاسخگویی (Active)' : 'Active') :
                           isBusy ? (isFa ? 'در حال مکالمه (Busy)' : 'Busy') :
                           (isFa ? 'دور از میز (Away)' : 'Away')}
                        </span>
                      </div>

                      {/* Interactive Status Switcher (Allows testing dynamic states) */}
                      <button
                        type="button"
                        onClick={() => void handleToggleStatus(item.id, item.status)}
                        className="text-[10px] font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white underline underline-offset-2"
                        title={isFa ? 'تغییر وضعیت شبیه‌سازی' : 'Cycle simulated status'}
                      >
                        {isFa ? 'تغییر وضعیت' : 'Change Status'}
                      </button>
                    </div>

                    {/* Desk Phone & Mobile Forward Information */}
                    <div className="mt-2 text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center justify-between">
                      <span className="truncate">{item.directPhone}</span>
                      {item.mobileForward && (
                        <button
                          type="button"
                          onClick={() => void handleToggleForward(item.id)}
                          className={`flex items-center gap-1 text-[10px] font-semibold transition-colors ${
                            item.forwardEnabled 
                              ? 'text-emerald-600 dark:text-emerald-400' 
                              : 'text-slate-400 hover:text-slate-600'
                          }`}
                          title={isFa ? 'دایورت به همراه در غیاب' : 'Mobile forward'}
                        >
                          <PhoneForwarded className="h-3 w-3" />
                          <span>{item.forwardEnabled ? (isFa ? 'دایورت فعال' : 'Forward on') : (isFa ? 'دایورت خاموش' : 'Forward off')}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Action Row */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    <span className="text-[10px] text-slate-400 font-mono">
                      {isFa ? 'پروتکل SIP UDP 7104' : 'SIP Trunk 7104'}
                    </span>

                    <button
                      type="button"
                      onClick={() => onDialExtension?.(item.extensionNumber, item.name)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors shadow-2xs"
                    >
                      <PhoneCall className="h-3.5 w-3.5" />
                      <span>{isFa ? `تماس با داخلی ${item.extensionNumber}` : `Dial Ext ${item.extensionNumber}`}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredExtensions.length === 0 && (
            <div className="text-center py-12 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
              <Phone className="h-8 w-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {isFa ? 'هیچ شماره داخلی با این مشخصات یافت نشد' : 'No staff extensions match the criteria'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('ALL');
                  setSelectedDept('ALL');
                }}
                className="mt-3 text-xs font-semibold text-primary dark:text-secondary hover:underline"
              >
                {isFa ? 'پاک کردن فیلترها' : 'Reset filters'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* SECTION 2: VOICEMAIL QUEUE (*99) */}
      {activeTabSection === 'voicemail' && (
        <div className="p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                {isFa ? 'صندوق پیام‌های صوتی ابری دفتر شما (کد میانبر *99)' : 'Daftar-e-Shoma Cloud Voicemail Repository (*99)'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isFa ? 'پیام‌های صوتی ضبط‌شده در ساعات غیراداری یا زمان اشغال خطوط' : 'Recorded voice memos received during after-hours or busy extension lines'}
              </p>
            </div>
            <span className="font-mono text-xs font-bold text-primary dark:text-secondary">
              {unreadVoicemails} {isFa ? 'خوانده‌نشده' : 'Unread'}
            </span>
          </div>

          <div className="space-y-3">
            {voicemailData?.recentMessages.map((msg) => (
              <div
                key={msg.id}
                className={`rounded-2xl border p-4 transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${
                  msg.isRead
                    ? 'border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-850/50'
                    : 'border-blue-200 bg-blue-50/40 dark:border-blue-900/40 dark:bg-blue-950/20'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-900 dark:text-white tabular-nums">
                      {msg.callerNumber}
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">·</span>
                    <span className="text-xs font-semibold text-primary dark:text-secondary">
                      {isFa ? `مقصد: داخلی ${msg.targetExtension}` : `Target Ext: ${msg.targetExtension}`}
                    </span>
                    {msg.priority === 'urgent' && (
                      <span className="rounded-md bg-rose-100 px-1.5 py-0.5 text-[10px] font-bold text-rose-800 dark:bg-rose-950/60 dark:text-rose-300">
                        {isFa ? 'فوری' : 'Urgent'}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300">
                    «{msg.preview}»
                  </p>

                  <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
                    <span>{isFa ? 'مدت:' : 'Duration:'} {msg.duration}</span>
                    <span>·</span>
                    <span>{msg.receivedAt}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => onDialExtension?.(msg.targetExtension)}
                    className="inline-flex items-center gap-1 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                    <span>{isFa ? 'شنیدن پیام' : 'Listen'}</span>
                  </button>

                  {!msg.isRead && (
                    <button
                      type="button"
                      onClick={() => void handleMarkVoicemailRead(msg.id)}
                      className="inline-flex items-center gap-1 rounded-xl bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary-dark transition-colors"
                    >
                      <Check className="h-3.5 w-3.5" />
                      <span>{isFa ? 'ثبت به عنوان خوانده‌شده' : 'Mark as Read'}</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: IVR KEY ROUTING CONFIGURATION */}
      {activeTabSection === 'routing' && (
        <div className="p-5 sm:p-6 space-y-4">
          <div className="border-b border-slate-100 pb-3 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              {isFa ? 'درخت شماره‌گیری و هدایت تماس‌های تلفن گویای خط ۹۱۰۳۰۸۳۰' : 'IVR Key Allocation & Call Flow Routing on +98 21 9103 0830'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isFa ? 'پیکربندی کلیدهای تلفن گویا بر روی پلتفرم دفتر شما' : 'Key routing rules configured on Daftar-e-Shoma cloud platform'}
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 font-semibold text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3.5 text-center">{isFa ? 'کلید' : 'Key'}</th>
                  <th className="p-3.5">{isFa ? 'عنوان دپارتمان / مقصد' : 'Department & Route Title'}</th>
                  <th className="p-3.5">{isFa ? 'داخلی مقصد' : 'Target Ext'}</th>
                  <th className="p-3.5">{isFa ? 'برنامه زمانی' : 'Schedule Policy'}</th>
                  <th className="p-3.5 text-center">{isFa ? 'تست شماره‌گیری' : 'Test Call'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {routes.map((route) => (
                  <tr key={route.key} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 text-center">
                      <span className={`inline-flex h-7 w-7 items-center justify-center rounded-lg font-mono font-bold text-xs ${
                        route.isEmergency 
                          ? 'bg-rose-600 text-white' 
                          : route.isVip 
                          ? 'bg-amber-600 text-white' 
                          : 'bg-slate-900 text-white dark:bg-slate-700'
                      }`}>
                        {route.key}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900 dark:text-white">
                        {isFa ? route.titleFa : route.titleEn}
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">{route.department}</span>
                    </td>
                    <td className="p-3.5">
                      <span className="font-mono font-bold text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white tabular-nums">
                        {route.targetExtension}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                      {route.schedule === 'all-hours' ? (isFa ? '۲۴ ساعته (All Hours)' : '24/7 All Hours') :
                       (isFa ? 'ساعات اداری ۸ تا ۱۷' : 'Workday Shift 08:00 - 17:00')}
                    </td>
                    <td className="p-3.5 text-center">
                      <button
                        type="button"
                        onClick={() => onDialExtension?.(route.targetExtension)}
                        className="rounded-lg bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors"
                      >
                        {isFa ? 'شماره‌گیری' : 'Dial'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

export default CommunicationStatusDashboard;
