import React, { useState } from 'react';
import { useLanguage } from '../../LanguageContext';
import { useAuth } from '../../AuthContext';
import { 
  ShieldAlert, Globe, Radio, Key, X, AlertTriangle, Send, 
  Layers, Lock, CheckCircle2, ArrowRight
} from 'lucide-react';
import type { ProductionChangeCategory, AutomationRequest } from '../../types';

interface ProposeProductionChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newRequest: AutomationRequest) => void;
}

export const ProposeProductionChangeModal: React.FC<ProposeProductionChangeModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { isFa } = useLanguage();
  const { userProfile } = useAuth();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ProductionChangeCategory>('telecom_trunk_routing');
  const [targetResource, setTargetResource] = useState('');
  const [currentValue, setCurrentValue] = useState('');
  const [proposedValue, setProposedValue] = useState('');
  const [description, setDescription] = useState('');
  const [riskLevel, setRiskLevel] = useState<'critical' | 'high'>('critical');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Preset templates for quick standard operation drafting
  const handleSelectTemplate = (cat: ProductionChangeCategory) => {
    setCategory(cat);
    if (cat === 'dns_modification') {
      setTitle(isFa ? 'به‌روزرسانی رکوردهای DNS دامنه بین‌المللی' : 'Update Live DNS Records for International Domain');
      setTargetResource('DNS zone: kkm-intl.org (Apex & www)');
      setCurrentValue('A 185.190.22.10 (Legacy IP)');
      setProposedValue('CNAME ais-pre-xanxwmnrlqcha3dmitndeg-18505331559.europe-west2.run.app');
      setDescription(isFa 
        ? 'انتقال روتینگ دامنه رسمی kkm-intl.org به زیرساخت جدید ابری با پایداری ۹۹.۹۹٪' 
        : 'Migration of apex DNS routing to global cloud cluster with 99.99% SLA.');
    } else if (cat === 'telecom_trunk_routing') {
      setTitle(isFa ? 'تغییر مسیر ترانک تلفنی دفتر شما و افزودن گیت‌وی رزرو' : 'Reroute Daftare Shoma Telephony Trunk to Failover Gateway');
      setTargetResource('Daftare Shoma Cloud PBX (+98 21 9103 0830)');
      setCurrentValue('Gateway: wss://ext.daftareshoma.com:4443');
      setProposedValue('Active-Active Trunk: wss://ext.daftareshoma.com:4443 & wss://ext2.daftareshoma.com:4443');
      setDescription(isFa 
        ? 'فعال‌سازی خطوط ترانک رزرو برای جلوگیری از قطعی در ساعات اوج بار تماس‌های سازمانی' 
        : 'Deploy secondary failover SIP trunk gateway for +98 21 9103 0830 to prevent downtime.');
    } else if (cat === 'cryptographic_key_rotation') {
      setTitle(isFa ? 'چرخش دوره‌ای کلیدهای رمزنگاری نشست‌ها و JWT' : 'Quarterly Cryptographic Key Rotation (JWT & Core Secrets)');
      setTargetResource('Server Core: JWT_SECRET & PBKDF2 Salt');
      setCurrentValue('Generation 2026-Q3 (Active)');
      setProposedValue('Generation 2026-Q4 (Cryptographically refreshed 384-bit seed)');
      setDescription(isFa 
        ? 'چرخش فصلی کلیدهای امنیتی سرور مطابق با الزامات ISO 27001 و انطباق با اصل ۴ حاکمیت شرکتی' 
        : 'Quarterly cryptographic key rotation under ISO 27001 standards and KKM Governance Principle 4.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !targetResource.trim() || !proposedValue.trim()) {
      setError(isFa ? 'لطفاً تمامی فیلدهای الزامی را تکمیل نمایید.' : 'Please fill all required fields.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/governance/production-change/propose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          category,
          targetResource: targetResource.trim(),
          currentValue: currentValue.trim() || '(Active Value)',
          proposedValue: proposedValue.trim(),
          description: description.trim(),
          riskLevel
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.messageFa || data.message || 'خطا در ثبت پیشنهاد');
      }

      onSuccess(data.request);
      onClose();
    } catch (err: any) {
      setError(err?.message || 'خطا در برقراری ارتباط با سرور.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8"
        dir={isFa ? 'rtl' : 'ltr'}
      >
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/80 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl">
              <ShieldAlert className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {isFa ? 'ثبت پیشنهاد تغییر در زیرساخت‌های لایو سازمان' : 'Propose Production Change (Principle 4)'}
              </h2>
              <p className="text-xs text-slate-400">
                {isFa 
                  ? 'ارسال مستقیم به کارتابل مدیرعامل جهت اخذ امضا و تاییدیه رسمی' 
                  : 'Requires signed executive authorization from CEO before execution'}
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

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Principle 4 Compliance Callout */}
          <div className="p-3 bg-amber-950/30 border border-amber-500/30 rounded-xl flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-amber-200/90 leading-relaxed">
              <span className="font-bold text-amber-300">
                {isFa ? 'اصل ۴ حاکمیت شرکتی KKM:' : 'KKM Governance Principle 4:'}
              </span>{' '}
              {isFa 
                ? 'هرگونه تغییر در رکوردهای لایو DNS، مسیر ترانک‌های مخابراتی یا چرخش کلیدهای رمزنگاری مستلزم امضای دیجیتال مدیرعامل (g.ayyoubian@kkm-intl.org) بوده و تا زمان تایید اجرا مسدود خواهد ماند.'
                : 'Any modification to live DNS records, external telecommunication trunk routing, or cryptographic key rotation requires signed executive authorization from the CEO.'}
            </div>
          </div>

          {/* Preset Template Selector */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              {isFa ? 'انتخاب دسته‌بندی عملیات:' : 'Select Operation Category:'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleSelectTemplate('telecom_trunk_routing')}
                className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  category === 'telecom_trunk_routing'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-200'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-white'
                }`}
              >
                <Radio className="w-5 h-5" />
                <span className="text-[11px] font-semibold">{isFa ? 'ترانک تلفنی' : 'Telecom Trunk'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectTemplate('dns_modification')}
                className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  category === 'dns_modification'
                    ? 'bg-sky-500/20 border-sky-500 text-sky-200'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-white'
                }`}
              >
                <Globe className="w-5 h-5" />
                <span className="text-[11px] font-semibold">{isFa ? 'رکوردهای DNS' : 'Live DNS'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectTemplate('cryptographic_key_rotation')}
                className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  category === 'cryptographic_key_rotation'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-white'
                }`}
              >
                <Key className="w-5 h-5" />
                <span className="text-[11px] font-semibold">{isFa ? 'چرخش کلیدها' : 'Key Rotation'}</span>
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              {isFa ? 'عنوان رسمی پیشنهاد تغییر:' : 'Change Proposal Title:'}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={isFa ? 'عنوان مشخص عملیات زیرساختی...' : 'Formal title of production change...'}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              required
            />
          </div>

          {/* Target Resource */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              {isFa ? 'شناسه منبع هدف (Target Resource URI/Zone):' : 'Target Resource URI/Zone:'}
            </label>
            <input
              type="text"
              value={targetResource}
              onChange={(e) => setTargetResource(e.target.value)}
              placeholder="e.g. Daftare Shoma Trunk (+98 21 9103 0830) / DNS zone: kkm-intl.org"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-cyan-300 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
              required
            />
          </div>

          {/* Current vs Proposed Diff */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                {isFa ? 'مقدار یا پیکربندی فعلی:' : 'Current Value / Config:'}
              </label>
              <textarea
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
                placeholder="Current config..."
                rows={2}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-rose-300 placeholder-slate-600 focus:outline-none focus:border-slate-600 resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-emerald-400 mb-1">
                {isFa ? 'مقدار جدید پیشنهادی:' : 'Proposed Value / Config:'}
              </label>
              <textarea
                value={proposedValue}
                onChange={(e) => setProposedValue(e.target.value)}
                placeholder="New proposed config..."
                rows={2}
                className="w-full px-3 py-2 bg-slate-950 border border-emerald-900/50 rounded-xl text-xs font-mono text-emerald-300 placeholder-slate-600 focus:outline-none focus:border-emerald-500 resize-none"
                required
              />
            </div>
          </div>

          {/* Rationale & Description */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              {isFa ? 'توجیه فنی و دلایل تغییر (Rationale):' : 'Technical Justification & Rationale:'}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={isFa ? 'دلیل عملیاتی، ممیزی یا امنیتی تغییر...' : 'Provide background, risk mitigation, and verification criteria...'}
              rows={3}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>

          {/* Risk Level */}
          <div className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
            <span className="text-xs font-medium text-slate-300">
              {isFa ? 'طبقه‌بندی ریسک:' : 'Risk Level:'}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setRiskLevel('critical')}
                className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                  riskLevel === 'critical'
                    ? 'bg-rose-500 text-white'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                CRITICAL
              </button>
              <button
                type="button"
                onClick={() => setRiskLevel('high')}
                className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                  riskLevel === 'high'
                    ? 'bg-amber-500 text-slate-900'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                HIGH
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-950/50 border border-rose-800 rounded-xl text-xs text-rose-200">
              {error}
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              {isFa ? 'انصراف' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-950/50 flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                  <span>{isFa ? 'در حال ارسال...' : 'Dispatching...'}</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{isFa ? 'ارسال به کارتابل مدیرعامل و هیئت مدیره' : 'Submit to Executive Queue'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
