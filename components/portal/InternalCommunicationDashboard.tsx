import * as React from 'react';
import { Activity, Clock3, Phone, RefreshCw, Server, Voicemail } from 'lucide-react';
import { useLanguage } from '../../LanguageContext';
import { IVR_DIAL_TREE } from '../ivr/IvrCommunicationsConsole';

interface TelephonyStatus {
  connected: boolean;
  provider: string;
  activeLine: string;
  activeChannels: number;
  maxChannels: number;
  latencyMs: number;
  lastSyncAt: string;
  unheardVoicemails: number;
  dayScheduleActive: boolean;
}

interface ExtensionSnapshot {
  extension: string;
  name: string;
  status: 'available' | 'busy' | 'away';
}

interface VoicemailSnapshot {
  isRead: boolean;
}

const REFRESH_INTERVAL_MS = 30_000;

const InternalCommunicationDashboard: React.FC = () => {
  const { isFa } = useLanguage();
  const [status, setStatus] = React.useState<TelephonyStatus | null>(null);
  const [extensions, setExtensions] = React.useState<ExtensionSnapshot[]>([]);
  const [voicemails, setVoicemails] = React.useState<VoicemailSnapshot[]>([]);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [lastRefresh, setLastRefresh] = React.useState<string | null>(null);
  const [syncError, setSyncError] = React.useState(false);

  const refresh = React.useCallback(async () => {
    setIsRefreshing(true);
    const fetchData = async <T,>(url: string): Promise<T> => {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to load ${url}`);
      const payload = await response.json();
      if (!payload?.success) throw new Error(`Invalid response from ${url}`);
      return payload.data as T;
    };

    const [statusResult, extensionsResult, voicemailsResult] = await Promise.allSettled([
      fetchData<TelephonyStatus>('/api/telephony/status'),
      fetchData<ExtensionSnapshot[]>('/api/telephony/extensions'),
      fetchData<VoicemailSnapshot[]>('/api/telephony/voicemails'),
    ]);

    const hasFailure = [statusResult, extensionsResult, voicemailsResult].some(result => result.status === 'rejected');
    if (statusResult.status === 'fulfilled') setStatus(statusResult.value);
    if (extensionsResult.status === 'fulfilled' && Array.isArray(extensionsResult.value)) {
      setExtensions(extensionsResult.value);
    }
    if (voicemailsResult.status === 'fulfilled' && Array.isArray(voicemailsResult.value)) {
      setVoicemails(voicemailsResult.value);
    }
    setSyncError(hasFailure);
    setLastRefresh(new Date().toISOString());
    setIsRefreshing(false);
  }, []);

  React.useEffect(() => {
    void refresh();
    const interval = window.setInterval(() => void refresh(), REFRESH_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [refresh]);

  const availableCount = extensions.filter(extension => extension.status === 'available').length;
  const busyCount = extensions.filter(extension => extension.status === 'busy').length;
  const awayCount = extensions.filter(extension => extension.status === 'away').length;
  const unreadCount = voicemails.filter(voicemail => !voicemail.isRead).length;
  const isConnected = status?.connected === true && !syncError;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800" aria-label={isFa ? 'داشبورد ارتباطات داخلی' : 'Internal communication dashboard'}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary dark:text-secondary" />
            <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              {isFa ? 'داشبورد ارتباطات داخلی' : 'Internal Communication Dashboard'}
            </h3>
            <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${isConnected ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'}`}>
              {isConnected ? (isFa ? 'متصل' : 'Connected') : (isFa ? 'همگام‌سازی در دسترس نیست' : 'Sync unavailable')}
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {status?.provider || 'Daftare Shoma Cloud PBX'} · {status?.activeLine || '+98 21 9103 0830'}
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400">
          <Clock3 className="h-3.5 w-3.5" />
          <span>{lastRefresh ? new Date(lastRefresh).toLocaleTimeString() : (isFa ? 'در انتظار همگام‌سازی' : 'Waiting for sync')}</span>
          <button type="button" onClick={() => void refresh()} disabled={isRefreshing} className="rounded-lg p-2 hover:bg-slate-100 disabled:opacity-50 dark:hover:bg-slate-700" aria-label={isFa ? 'همگام‌سازی مجدد' : 'Refresh communication status'}>
            <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {syncError && (
        <p className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200" role="status">
          {isFa ? 'بخشی از داده‌های تلفنی همگام نشد؛ وضعیت آخرین پاسخ معتبر نمایش داده می‌شود.' : 'Some telephony data could not be synchronized; showing the latest available snapshot.'}
        </p>
      )}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/60">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400"><Server className="h-4 w-4" />{isFa ? 'خطوط داخلی' : 'Extensions'}</div>
          <p className="text-xl font-black text-slate-900 dark:text-white">{extensions.length}</p>
          <p className="mt-1 text-[10px] text-slate-500">{availableCount} {isFa ? 'فعال' : 'available'} · {busyCount} {isFa ? 'مشغول' : 'busy'} · {awayCount} {isFa ? 'دور' : 'away'}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/60">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400"><Voicemail className="h-4 w-4" />{isFa ? 'صندوق صوتی' : 'Voicemail'}</div>
          <p className="text-xl font-black text-slate-900 dark:text-white">{unreadCount} <span className="text-xs font-semibold">{isFa ? 'خوانده‌نشده' : 'unread'}</span></p>
          <p className="mt-1 text-[10px] text-slate-500">{voicemails.length} {isFa ? 'پیام ثبت‌شده' : 'messages total'}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/60">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400"><Phone className="h-4 w-4" />{isFa ? 'مسیریابی فعال' : 'Active routing'}</div>
          <p className="text-xl font-black text-slate-900 dark:text-white">{IVR_DIAL_TREE.length} <span className="text-xs font-semibold">{isFa ? 'مسیر' : 'routes'}</span></p>
          <p className="mt-1 text-[10px] text-slate-500">{status?.dayScheduleActive ? (isFa ? 'برنامه روزانه' : 'Day schedule') : (isFa ? 'برنامه خارج از ساعات' : 'After-hours schedule')}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/60">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400"><Activity className="h-4 w-4" />{isFa ? 'سلامت سانترال' : 'PBX health'}</div>
          <p className="text-xl font-black text-slate-900 dark:text-white">{status ? `${status.latencyMs} ms` : '—'}</p>
          <p className="mt-1 text-[10px] text-slate-500">{status ? `${status.activeChannels}/${status.maxChannels} ${isFa ? 'کانال فعال' : 'channels active'}` : (isFa ? 'در انتظار داده' : 'Waiting for data')}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2" aria-label={isFa ? 'تنظیمات مسیریابی' : 'Routing configurations'}>
        {IVR_DIAL_TREE.map(route => (
          <span key={`${route.key}-${route.targetExtension}`} className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-[10px] text-slate-600 dark:border-slate-700 dark:text-slate-300">
            {isFa ? `کلید ${route.key} ← داخلی ${route.targetExtension}` : `Key ${route.key} → Ext ${route.targetExtension}`}
          </span>
        ))}
      </div>
    </section>
  );
};

export default InternalCommunicationDashboard;
