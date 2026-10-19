import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../LanguageContext';
import { useAuth } from '../../AuthContext';
import { 
  Key, ShieldCheck, RefreshCw, AlertTriangle, CheckCircle2, 
  Lock, Clock, Fingerprint, Cloud, Hash, ChevronRight, Zap
} from 'lucide-react';
import type { KeyRotationStatus, KeyRotationRecord } from '../../backend/secretsManager';

export const KeyRotationSecurityPanel: React.FC = () => {
  const { isFa } = useLanguage();
  const { userProfile, isSuperAdmin } = useAuth();

  const [status, setStatus] = useState<KeyRotationStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isExecutive = isSuperAdmin || userProfile?.role === 'super_admin' || userProfile?.role === 'executive';

  const fetchKeyStatus = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/security/key-status');
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setStatus(json.data);
        }
      }
    } catch (err: any) {
      console.warn('Failed to fetch key rotation status:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchKeyStatus();
  }, []);

  const handleManualRotate = async () => {
    if (!window.confirm(isFa 
      ? 'آیا از چرخش کلیدهای رمزنگاری سرور اطمینان دارید؟ کلید قبلی به مدت ۲۴ ساعت جهت جلوگیری از قطعی نشست‌ها فعال خواهد ماند.' 
      : 'Are you sure you want to rotate cryptographic keys? The previous key will remain valid for 24h to avoid session disruption.')) {
      return;
    }

    setIsRotating(true);
    setError(null);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/security/rotate-keys-now', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reason: 'Manual executive key rotation initiated from Security Console'
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.messageFa || data.message || 'Key rotation failed');
      }

      setMessage(isFa ? data.messageFa : data.message);
      fetchKeyStatus();
    } catch (err: any) {
      setError(err?.message || 'Error executing key rotation');
    } finally {
      setIsRotating(false);
    }
  };

  if (!status) {
    return (
      <div className="p-8 text-center text-slate-400">
        <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-primary" />
        <span className="text-xs">{isFa ? 'در حال بارگذاری وضعیت کلیدها...' : 'Loading key rotation status...'}</span>
      </div>
    );
  }

  const daysProgress = Math.max(0, Math.min(100, Math.round(((90 - status.daysRemaining) / 90) * 100)));

  return (
    <div className="space-y-6" dir={isFa ? 'rtl' : 'ltr'}>
      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: 90-Day Key Rotation Lifecycle */}
        <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Key className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-bold text-white">
                {isFa ? 'چرخش دوره‌ای ۹۰ روزه کلیدها' : '90-Day Key Rotation'}
              </h3>
            </div>
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {status.currentGeneration}
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">{isFa ? 'روزهای باقیمانده تا چرخش بعدی:' : 'Days Remaining:'}</span>
              <span className="font-mono font-bold text-amber-400 text-base">{status.daysRemaining} {isFa ? 'روز' : 'days'}</span>
            </div>

            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-emerald-500 via-amber-500 to-amber-400 h-full transition-all duration-500" 
                style={{ width: `${daysProgress}%` }}
              />
            </div>

            <div className="flex justify-between text-[10px] text-slate-500 font-mono pt-1">
              <span>{status.lastRotatedAt.split('T')[0]}</span>
              <span>{status.nextRotationDueAt.split('T')[0]}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">{isFa ? 'وضعیت چرخش خودکار:' : 'Auto Rotation Policy:'}</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {isFa ? 'فعال (چرخه ۹۰ روزه)' : 'Active (90d Cycle)'}
            </span>
          </div>
        </div>

        {/* Card 2: Dual-Key Verification Grace Period */}
        <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">
                {isFa ? 'تأییدیه دوکلیدی (Dual-Key)' : 'Dual-Key Verification'}
              </h3>
            </div>
            <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded border ${
              status.dualKeyGraceActive 
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' 
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}>
              {status.dualKeyGraceActive ? (isFa ? 'پنجره فعال' : 'Grace Window Active') : (isFa ? 'حالت پایدار' : 'Steady State')}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {isFa 
              ? 'در هنگام چرخش کلیدها، کلید قبلی به مدت ۲۴ ساعت در حافظه نگه داشته می‌شود تا نشست‌های معتبر پرسنل بدون نیاز به ورود مجدد حفظ شوند.' 
              : 'During key rotation, the previous cryptographic secret is retained for 24h to ensure active sessions remain valid without disruption.'}
          </p>

          <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>{isFa ? 'پنجره انتقال نشست‌ها:' : 'Transition Window:'}</span>
            <span className="font-mono text-cyan-300 font-bold">24 Hours (86,400s)</span>
          </div>
        </div>

        {/* Card 3: Cloud Secrets Vault Status */}
        <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cloud className="w-5 h-5 text-sky-400" />
              <h3 className="text-sm font-bold text-white">
                {isFa ? 'پایگاه اسرار ابری (Cloud Vault)' : 'Cloud Secrets Vault'}
              </h3>
            </div>
            <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
              {status.environmentSource}
            </span>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-mono text-[11px]">JWT_SECRET</span>
              <span className="flex items-center gap-1 text-emerald-400 font-semibold text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {isFa ? 'پیکربندی‌شده در Vault' : 'Vault Verified'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-mono text-[11px]">GEMINI_API_KEY</span>
              <span className="flex items-center gap-1 text-emerald-400 font-semibold text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {isFa ? 'فعال' : 'Active'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-mono text-[11px]">KKM_CORPORATE_AUTH_JSON</span>
              <span className="flex items-center gap-1 text-emerald-400 font-semibold text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {isFa ? 'هش‌شده در رم' : 'Hashed PBKDF2'}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500">
            {isFa ? 'محافظت در برابر Fallback در حالت Production فعال است.' : 'Strict production startup gating enabled.'}
          </div>
        </div>
      </div>

      {/* Manual Rotation Action & Feedback */}
      {isExecutive && (
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-xs font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-400" />
              {isFa ? 'عملیات راهبردی: چرخش فوری کلیدهای رمزنگاری' : 'Executive Action: Immediate Cryptographic Rotation'}
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {isFa 
                ? 'تولید کلید ۳۸۴ بیتی جدید و فعال‌سازی پنجره انتقال دوکلیدی ۲۴ ساعته' 
                : 'Generate a new 384-bit cryptographic entropy seed and activate dual-key grace transition.'}
            </p>
          </div>

          <button
            onClick={handleManualRotate}
            disabled={isRotating}
            className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-all disabled:opacity-50 shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
            <span>{isFa ? 'چرخش کلیدها در این لحظه' : 'Rotate Keys Now'}</span>
          </button>
        </div>
      )}

      {message && (
        <div className="p-3 bg-emerald-950/40 border border-emerald-800 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="p-3 bg-rose-950/40 border border-rose-800 rounded-xl text-xs text-rose-300 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Historical Rotation Records Table */}
      <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-3">
        <h3 className="text-xs font-bold text-white flex items-center gap-2">
          <Hash className="w-4 h-4 text-cyan-400" />
          {isFa ? 'تاریخچه چرخه‌های رمزنگاری سرور' : 'Cryptographic Generation History'}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-950/80 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="p-2.5">{isFa ? 'شناسه نسل' : 'Generation'}</th>
                <th className="p-2.5">{isFa ? 'تاریخ چرخش' : 'Rotated At'}</th>
                <th className="p-2.5">{isFa ? 'عامل تحریک' : 'Triggered By'}</th>
                <th className="p-2.5">{isFa ? 'علت' : 'Reason'}</th>
                <th className="p-2.5">{isFa ? 'هش امنیتی SHA-256' : 'SHA-256 Digest'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {status.history.map((rec) => (
                <tr key={rec.generationId} className="hover:bg-slate-800/30">
                  <td className="p-2.5 font-mono font-bold text-amber-300">{rec.generationId}</td>
                  <td className="p-2.5 text-slate-300 whitespace-nowrap">{rec.rotatedAt.replace('T', ' ').substring(0, 16)}</td>
                  <td className="p-2.5 font-mono text-[11px] text-slate-400">{rec.triggeredBy}</td>
                  <td className="p-2.5 text-slate-300 text-[11px]">{rec.reason}</td>
                  <td className="p-2.5 font-mono text-[10px] text-cyan-400 truncate max-w-[150px]" title={rec.sha256Digest}>
                    {rec.sha256Digest}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
