import React, { useState } from 'react';
import { useLanguage } from '../../LanguageContext';
import { useAuth } from '../../AuthContext';
import { 
  ShieldCheck, AlertTriangle, Key, Globe, Radio, CheckCircle2, 
  X, Lock, Hash, ArrowRight, UserCheck, FileText, Send
} from 'lucide-react';
import type { AutomationRequest } from '../../types';

interface ExecutiveSignOffModalProps {
  isOpen: boolean;
  request: AutomationRequest | null;
  onClose: () => void;
  onSignOffSuccess: (updatedRequest: AutomationRequest) => void;
  onRejectSuccess: () => void;
}

export const ExecutiveSignOffModal: React.FC<ExecutiveSignOffModalProps> = ({
  isOpen,
  request,
  onClose,
  onSignOffSuccess,
  onRejectSuccess,
}) => {
  const { isFa } = useLanguage();
  const { userProfile, isSuperAdmin } = useAuth();

  const [notes, setNotes] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmedGovernance, setConfirmedGovernance] = useState(false);
  const [activeAction, setActiveAction] = useState<'sign' | 'reject'>('sign');

  if (!isOpen || !request || !request.productionChange) return null;

  const change = request.productionChange;
  const isCeo = userProfile?.email?.toLowerCase() === 'g.ayyoubian@kkm-intl.org' || isSuperAdmin;

  const getCategoryIcon = () => {
    switch (change.category) {
      case 'dns_modification':
        return <Globe className="w-5 h-5 text-sky-400" />;
      case 'telecom_trunk_routing':
        return <Radio className="w-5 h-5 text-amber-400" />;
      case 'cryptographic_key_rotation':
        return <Key className="w-5 h-5 text-emerald-400" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-cyan-400" />;
    }
  };

  const handleSignOff = async () => {
    if (!confirmedGovernance) {
      setError(isFa 
        ? 'جهت ثبت امضای رسمی، تأیید انطباق با اصل ۴ حاکمیت شرکتی الزامی است.' 
        : 'Confirmation of compliance with Principle 4 is required.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/governance/production-change/sign-off', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId: request.id,
          notes: notes.trim() || 'Approved by Executive CEO under KKM Principle 4.'
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.messageFa || data.message || 'خطا در ثبت امضای راهبردی');
      }

      onSignOffSuccess(data.request || request);
      onClose();
    } catch (err: any) {
      setError(err?.message || 'خطا در ارتباط با سرور.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      setError(isFa ? 'ذکر دلیل رد تغییرات الزامی است.' : 'Reason for rejection is required.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/governance/production-change/reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId: request.id,
          reason: rejectReason.trim()
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.messageFa || data.message || 'خطا در رد درخواست');
      }

      onRejectSuccess();
      onClose();
    } catch (err: any) {
      setError(err?.message || 'خطا در ارتباط با سرور.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8"
        dir={isFa ? 'rtl' : 'ltr'}
      >
        {/* Governance Principle Header */}
        <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border-b border-amber-500/30 p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                <ShieldCheck className="w-7 h-7 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    KKM Principle 4
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {request.id}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-white mt-1">
                  {isFa ? 'تأیید و امضای راهبردی تغییرات لایو زیرساخت' : 'Executive Production Authorization Sign-off'}
                </h2>
                <p className="text-xs text-amber-200/80 mt-0.5">
                  {isFa 
                    ? 'الزام حاکمیت شرکتی KKM: تایید کتبی و امضای مدیرعامل (g.ayyoubian@kkm-intl.org) یا هیئت مدیره'
                    : 'Mandate: Signed executive authorization from CEO / Board of Directors required'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Target Resource & Classification */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-800/60 border border-slate-700/60 rounded-xl">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-1">
                {getCategoryIcon()}
                <span>{isFa ? 'دسته‌بندی عملیات' : 'Operation Category'}</span>
              </div>
              <p className="text-sm font-semibold text-white">
                {isFa ? change.categoryFa : change.category}
              </p>
            </div>

            <div className="p-4 bg-slate-800/60 border border-slate-700/60 rounded-xl">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-1">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>{isFa ? 'سطح حساسیت و ریسک' : 'Risk Classification'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  {change.riskLevel}
                </span>
                <span className="text-xs text-slate-300">
                  {isFa ? 'مسدودسازی خودکار تا تایید امضا' : 'Automated Block Active'}
                </span>
              </div>
            </div>
          </div>

          {/* Target Resource Identifier */}
          <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl">
            <div className="text-xs text-slate-400 mb-1 font-mono">
              {isFa ? 'منبع تحت تأثیر (Target Resource):' : 'Target Resource:'}
            </div>
            <div className="text-sm font-mono text-cyan-300 font-bold break-all">
              {change.targetResource}
            </div>
            <div className="text-xs text-slate-400 mt-2 font-medium">
              {request.description}
            </div>
          </div>

          {/* Configuration Diff (Before vs After) */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-400" />
              {isFa ? 'مقایسه تغییرات فنی (Configuration Diff)' : 'Technical Configuration Diff'}
            </h3>

            <div className="space-y-2 text-xs font-mono">
              <div className="p-3 bg-rose-950/30 border border-rose-900/50 rounded-lg text-rose-200">
                <div className="text-[10px] text-rose-400 uppercase font-semibold mb-1">
                  - {isFa ? 'مقدار فعلی فعال (Current Active)' : 'Current Active Value'}:
                </div>
                <div className="break-all">{change.currentValue}</div>
              </div>

              <div className="p-3 bg-emerald-950/30 border border-emerald-900/50 rounded-lg text-emerald-200">
                <div className="text-[10px] text-emerald-400 uppercase font-semibold mb-1">
                  + {isFa ? 'مقدار جدید پیشنهادی (Proposed Value)' : 'Proposed Value'}:
                </div>
                <div className="break-all">{change.proposedValue}</div>
              </div>
            </div>

            {change.sha256DiffDigest && (
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono mt-1">
                <Hash className="w-3.5 h-3.5 text-slate-500" />
                <span>SHA-256 Digest:</span>
                <span className="text-slate-300 truncate">{change.sha256DiffDigest}</span>
              </div>
            )}
          </div>

          {/* Signer Identity Information */}
          <div className="p-4 bg-slate-800/40 border border-slate-700/50 rounded-xl space-y-2">
            <div className="text-xs font-semibold text-slate-300 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              {isFa ? 'مشخصات امضاکننده رسمی هیئت مدیره:' : 'Authorized Executive Signatory:'}
            </div>
            <div className="flex items-center justify-between text-xs text-slate-300 pt-1 border-t border-slate-700/40">
              <span>{isFa ? 'مقام امضاکننده:' : 'Signatory Title:'}</span>
              <span className="font-semibold text-white">
                {isCeo ? 'Gino Ayyoubian — CEO / Chairman' : userProfile?.displayName}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>{isFa ? 'ایمیل رسمی:' : 'Corporate Email:'}</span>
              <span className="font-mono text-cyan-300">
                {isCeo ? 'g.ayyoubian@kkm-intl.org' : userProfile?.email}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>{isFa ? 'سطح دسترسی:' : 'Clearance Level:'}</span>
              <span className="font-semibold text-amber-300">Top Secret / Strategic Clearance</span>
            </div>
          </div>

          {/* Action Tabs: Sign or Reject */}
          <div className="flex gap-2 border-b border-slate-800 pb-2">
            <button
              type="button"
              onClick={() => { setActiveAction('sign'); setError(null); }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeAction === 'sign'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {isFa ? 'تأیید و امضای دیجیتال' : 'Sign & Authorize'}
            </button>
            <button
              type="button"
              onClick={() => { setActiveAction('reject'); setError(null); }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeAction === 'reject'
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/30'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {isFa ? 'رد پیشنهاد تغییر' : 'Reject Proposal'}
            </button>
          </div>

          {activeAction === 'sign' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  {isFa ? 'دستورات و یادداشت رسمی مدیرعامل (اختیاری):' : 'Executive Directive & Remarks (Optional):'}
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={isFa 
                    ? 'مثال: تغییرات پس از تست پایداری شبکه و انطباق با پروتکل‌های فنی مورد تایید است.' 
                    : 'e.g. Approved following telemetry verification and ISO 14001 compliance.'}
                  className="w-full h-20 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none font-sans"
                />
              </div>

              {/* Confirmation Checkbox */}
              <label className="flex items-start gap-3 p-3 bg-slate-950/60 border border-slate-800 rounded-xl cursor-pointer hover:bg-slate-950 transition-colors">
                <input
                  type="checkbox"
                  checked={confirmedGovernance}
                  onChange={(e) => setConfirmedGovernance(e.target.checked)}
                  className="mt-0.5 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-900"
                />
                <span className="text-xs text-slate-300 leading-relaxed">
                  {isFa 
                    ? 'اینجانب با اختیارات مدیرعامل / هیئت مدیره گروه KKM، تغییرات لایو فوق را ارزیابی نموده و انطباق آن را با اصل ۴ حاکمیت شرکتی تایید و دستور اجرای مستقیم آن را صادر می‌نمایم.'
                    : 'I hereby confirm, in my executive capacity as CEO/Board Director, that this production change complies with KKM enterprise stability protocols and authorize execution.'}
                </span>
              </label>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-rose-300 mb-1.5">
                  {isFa ? 'دلیل رد پیشنهاد (الزامی):' : 'Reason for Rejection (Required):'}
                </label>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder={isFa 
                    ? 'علت رد یا لزوم انجام تست‌های بیشتر در محیط استیجینگ را شرح دهید...' 
                    : 'Detail the governance rationale or technical objections...'}
                  className="w-full h-24 px-3 py-2 bg-slate-950 border border-rose-900/60 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 resize-none font-sans"
                />
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 bg-rose-950/50 border border-rose-800 rounded-xl text-xs text-rose-200 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950/80 border-t border-slate-800 p-4 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            {isFa ? 'انصراف' : 'Cancel'}
          </button>

          {activeAction === 'sign' ? (
            <button
              type="button"
              onClick={handleSignOff}
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-950/50 flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{isFa ? 'در حال ثبت امضا...' : 'Signing...'}</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>{isFa ? 'تایید، امضای رسمی و اجرای تغییر' : 'Sign & Authorize Execution'}</span>
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleReject}
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-rose-950/50 flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{isFa ? 'در حال ثبت...' : 'Rejecting...'}</span>
                </>
              ) : (
                <>
                  <X className="w-4 h-4" />
                  <span>{isFa ? 'ثبت رد درخواست' : 'Confirm Rejection'}</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
