import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../LanguageContext';
import { useAuth } from '../../AuthContext';
import { 
  ShieldCheck, AlertTriangle, Key, Globe, Radio, CheckCircle2, 
  Clock, Plus, RefreshCw, Mail, Hash, UserCheck, Lock, ExternalLink,
  ChevronRight, ArrowUpRight, Search, Filter
} from 'lucide-react';
import type { 
  AutomationRequest, 
  ExecutiveAuditLogEntry, 
  ProductionChangeCategory 
} from '../../types';
import { ExecutiveSignOffModal } from './ExecutiveSignOffModal';
import { ProposeProductionChangeModal } from './ProposeProductionChangeModal';
import { KeyRotationSecurityPanel } from './KeyRotationSecurityPanel';

interface EmailDispatchRecord {
  id: string;
  recipient: string;
  subject: string;
  timestamp: string;
  requestId: string;
  status: 'DELIVERED_TO_INBOX' | 'QUEUED';
  bodyExcerpt: string;
}

export const ExecutiveGovernanceQueue: React.FC = () => {
  const { isFa } = useLanguage();
  const { userProfile, isSuperAdmin } = useAuth();

  const [activeTab, setActiveTab] = useState<'pending' | 'audit' | 'emails' | 'key_rotation'>('pending');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [queue, setQueue] = useState<AutomationRequest[]>([]);
  const [auditLogs, setAuditLogs] = useState<ExecutiveAuditLogEntry[]>([]);
  const [emailDispatches, setEmailDispatches] = useState<EmailDispatchRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExecutiveSigner, setIsExecutiveSigner] = useState(false);

  // Modals
  const [signOffModalRequest, setSignOffModalRequest] = useState<AutomationRequest | null>(null);
  const [isProposeModalOpen, setIsProposeModalOpen] = useState(false);

  const isCeo = userProfile?.email?.toLowerCase() === 'g.ayyoubian@kkm-intl.org' || isSuperAdmin;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // 1. Fetch Executive Queue
      const qRes = await fetch('/api/governance/production-change/queue');
      if (qRes.ok) {
        const qData = await qRes.json();
        setQueue(qData.queue || []);
        setIsExecutiveSigner(qData.isExecutiveSigner || isCeo);
      }

      // 2. Fetch Audit Logs
      const aRes = await fetch('/api/governance/production-change/audit-log');
      if (aRes.ok) {
        const aData = await aRes.json();
        setAuditLogs(aData.logs || []);
      }

      // 3. Fetch Email Dispatches
      const eRes = await fetch('/api/governance/production-change/email-dispatches');
      if (eRes.ok) {
        const eData = await eRes.json();
        setEmailDispatches(eData.dispatches || []);
      }
    } catch (err) {
      console.error('Error fetching governance queue:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const pendingRequests = queue.filter(r => r.status === 'pending_executive_signoff');
  const executedRequests = queue.filter(r => r.status === 'approved');

  const filteredPending = pendingRequests.filter(r => {
    if (filterCategory !== 'all' && r.productionChange?.category !== filterCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = r.title.toLowerCase().includes(q);
      const matchResource = r.productionChange?.targetResource.toLowerCase().includes(q);
      const matchId = r.id.toLowerCase().includes(q);
      if (!matchTitle && !matchResource && !matchId) return false;
    }
    return true;
  });

  const getCategoryBadge = (category?: ProductionChangeCategory) => {
    switch (category) {
      case 'dns_modification':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/15 text-sky-400 border border-sky-500/30">
            <Globe className="w-3.5 h-3.5" />
            {isFa ? 'رکوردهای DNS' : 'Live DNS'}
          </span>
        );
      case 'telecom_trunk_routing':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <Radio className="w-3.5 h-3.5" />
            {isFa ? 'ترانک دفتر شما' : 'Daftare Shoma PBX'}
          </span>
        );
      case 'cryptographic_key_rotation':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <Key className="w-3.5 h-3.5" />
            {isFa ? 'چرخش کلیدها' : 'Key Rotation'}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6" dir={isFa ? 'rtl' : 'ltr'}>
      {/* Principle 4 Strategic Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-950/70 via-slate-900 to-slate-900 border border-amber-500/30 p-6 shadow-xl">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-2xl">
              <ShieldCheck className="w-8 h-8 text-amber-400" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 text-xs font-bold font-mono rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  KKM Corporate Governance Principle 4
                </span>
                <span className="text-xs text-amber-200/80 font-mono">
                  Executive Authorization Protocol
                </span>
              </div>
              <h1 className="text-xl font-bold text-white tracking-tight">
                {isFa 
                  ? 'کارتابل تاییدات راهبردی مدیرعامل و هیئت مدیره' 
                  : 'Executive Authorization & Production Governance Queue'}
              </h1>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                {isFa 
                  ? 'بر اساس اصل ۴ حاکمیت شرکتی KKM، هرگونه تغییر در رکوردهای زنده DNS، مسیریابی ترانک‌های مخابراتی خارجی یا چرخش کلیدهای رمزنگاری مستلزم امضای رسمی مدیرعامل (g.ayyoubian@kkm-intl.org) بوده و تا زمان تایید در این صف مسدود می‌ماند.'
                  : 'In accordance with KKM Governance Principle 4, any modification to live DNS records, external telecommunication trunk routing, or cryptographic key rotation strictly requires signed executive authorization from the CEO.'}
              </p>
            </div>
          </div>

          {/* Quick Actions & Propose Button */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsProposeModalOpen(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-950/50 flex items-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{isFa ? 'پیشنهاد تغییر زیرساخت' : 'Propose Production Change'}</span>
            </button>
            <button
              onClick={fetchData}
              disabled={isLoading}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl border border-slate-700 transition-colors"
              title={isFa ? 'به‌روزرسانی داده‌ها' : 'Refresh'}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Governance Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-800/80">
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <div className="text-[11px] text-slate-400 font-medium">
              {isFa ? 'در انتظار تایید مدیرعامل' : 'Pending Executive Sign-off'}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xl font-bold font-mono text-amber-400">
                {pendingRequests.length}
              </span>
              {pendingRequests.length > 0 && (
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              )}
            </div>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <div className="text-[11px] text-slate-400 font-medium">
              {isFa ? 'تایید و اجرا شده' : 'Authorized & Executed'}
            </div>
            <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
              {executedRequests.length}
            </div>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <div className="text-[11px] text-slate-400 font-medium">
              {isFa ? 'سوابق لاگ تغییرات زنجیره‌ای' : 'Chained Audit Records'}
            </div>
            <div className="text-xl font-bold font-mono text-cyan-400 mt-1">
              {auditLogs.length}
            </div>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <div className="text-[11px] text-slate-400 font-medium">
              {isFa ? 'اعلان‌های ایمیلی مدیرعامل' : 'CEO Email Dispatches'}
            </div>
            <div className="text-xl font-bold font-mono text-purple-400 mt-1">
              {emailDispatches.length}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs & Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'pending'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{isFa ? 'درخواست‌های در انتظار امضا' : 'Pending Executive Queue'}</span>
            {pendingRequests.length > 0 && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                activeTab === 'pending' ? 'bg-slate-950 text-amber-400' : 'bg-amber-500/20 text-amber-300'
              }`}>
                {pendingRequests.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'audit'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Hash className="w-3.5 h-3.5" />
            <span>{isFa ? 'دفتر کل ممیزی امنیتی' : 'Immutable Audit Trail'}</span>
            <span className="text-[10px] text-slate-500 font-mono">({auditLogs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('emails')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'emails'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{isFa ? 'اعلان‌های ارسالی به مدیرعامل' : 'CEO Email Dispatches'}</span>
            <span className="text-[10px] text-slate-500 font-mono">({emailDispatches.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('key_rotation')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'key_rotation'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>{isFa ? 'چرخه ۹۰ روزه کلیدها و Vault' : 'Key Rotation & Vault'}</span>
          </button>
        </div>

        {/* Filter & Search */}
        {activeTab === 'pending' && (
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isFa ? 'جستجو در درخواست‌ها...' : 'Search requests...'}
                className="pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-amber-500"
            >
              <option value="all">{isFa ? 'تمامی دسته‌ها' : 'All Categories'}</option>
              <option value="dns_modification">{isFa ? 'رکوردهای DNS' : 'Live DNS'}</option>
              <option value="telecom_trunk_routing">{isFa ? 'ترانک تلفنی دفتر شما' : 'Daftare Shoma PBX'}</option>
              <option value="cryptographic_key_rotation">{isFa ? 'چرخش کلیدها' : 'Key Rotation'}</option>
            </select>
          </div>
        )}
      </div>

      {/* TAB 1: PENDING EXECUTIVE QUEUE */}
      {activeTab === 'pending' && (
        <div className="space-y-4">
          {filteredPending.length === 0 ? (
            <div className="p-12 text-center bg-slate-900/60 border border-slate-800 rounded-2xl">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3 opacity-80" />
              <h3 className="text-sm font-bold text-white">
                {isFa ? 'هیچ درخواست معلقی وجود ندارد' : 'No Pending Executive Authorizations'}
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                {isFa 
                  ? 'تمامی تغییرات حساس زیرساخت ارزیابی و تعیین تکلیف شده‌اند. سیستم در حالت پایدار عملیاتی است.' 
                  : 'All sensitive infrastructure operations have been authorized or reviewed. System is stable.'}
              </p>
            </div>
          ) : (
            filteredPending.map((req) => {
              const change = req.productionChange;
              return (
                <div
                  key={req.id}
                  className="p-5 bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 rounded-2xl shadow-lg transition-all space-y-4"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 bg-slate-800 border border-slate-700/60 rounded-xl mt-0.5">
                        {change?.category === 'dns_modification' ? (
                          <Globe className="w-5 h-5 text-sky-400" />
                        ) : change?.category === 'telecom_trunk_routing' ? (
                          <Radio className="w-5 h-5 text-amber-400" />
                        ) : (
                          <Key className="w-5 h-5 text-emerald-400" />
                        )}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-slate-300">
                            {req.id}
                          </span>
                          {getCategoryBadge(change?.category)}
                          <span className="px-2 py-0.2 rounded text-[10px] font-bold uppercase bg-rose-500/15 text-rose-300 border border-rose-500/30">
                            {change?.riskLevel}
                          </span>
                          <span className="px-2 py-0.2 rounded text-[10px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                            {isFa ? 'نیازمند امضای مدیرعامل' : 'Pending CEO Sign-off'}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-white mt-1">
                          {req.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {req.description}
                        </p>
                      </div>
                    </div>

                    {/* Sign-off Action Button */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSignOffModalRequest(req)}
                        className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-950/40 flex items-center gap-2 transition-all"
                      >
                        <Lock className="w-4 h-4" />
                        <span>{isFa ? 'بررسی و امضای رسمی' : 'Review & Sign Off'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Target Resource & Diff Preview */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl text-xs font-mono">
                    <div className="p-2.5 bg-rose-950/20 border border-rose-900/30 rounded-lg">
                      <div className="text-[10px] text-rose-400 font-semibold mb-1 uppercase">
                        - {isFa ? 'مقدار فعلی' : 'Current Value'}:
                      </div>
                      <div className="text-rose-200 truncate">{change?.currentValue}</div>
                    </div>
                    <div className="p-2.5 bg-emerald-950/20 border border-emerald-900/30 rounded-lg">
                      <div className="text-[10px] text-emerald-400 font-semibold mb-1 uppercase">
                        + {isFa ? 'مقدار جدید پیشنهادی' : 'Proposed Value'}:
                      </div>
                      <div className="text-emerald-200 truncate">{change?.proposedValue}</div>
                    </div>
                  </div>

                  {/* Metadata Footer */}
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 pt-2 border-t border-slate-800/60">
                    <div className="flex items-center gap-3">
                      <span>
                        {isFa ? 'پیشنهاددهنده:' : 'Requester:'}{' '}
                        <span className="text-slate-300 font-medium">{req.requesterName}</span> ({req.department})
                      </span>
                      <span>•</span>
                      <span>
                        {isFa ? 'امضاکننده الزامی:' : 'Required Signatory:'}{' '}
                        <span className="font-mono text-amber-300">g.ayyoubian@kkm-intl.org</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{req.createdAt.replace('T', ' ').substring(0, 16)}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* TAB 2: IMMUTABLE AUDIT TRAIL */}
      {activeTab === 'audit' && (
        <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Hash className="w-4 h-4 text-cyan-400" />
                {isFa ? 'دفتر کل تغییرات زیرساخت با امضای دیجیتال' : 'Cryptographic Governance Audit Log'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {isFa 
                  ? 'سوابق ثبت‌شده در این بخش به صورت هش‌های SHA-256 رمزنگاری‌شده و غیرقابل تغییر نگهداری می‌شوند.' 
                  : 'Immutable SHA-256 audit log proving compliance with KKM Corporate Governance Principle 4.'}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-950/80 text-slate-400 font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-3">{isFa ? 'شناسه لاگ' : 'Audit ID'}</th>
                  <th className="p-3">{isFa ? 'عملیات' : 'Action'}</th>
                  <th className="p-3">{isFa ? 'دسته‌بندی' : 'Category'}</th>
                  <th className="p-3">{isFa ? 'منبع تحت تاثیر' : 'Target Resource'}</th>
                  <th className="p-3">{isFa ? 'امضاکننده / کاربر' : 'Actor'}</th>
                  <th className="p-3">{isFa ? 'وضعیت' : 'Status'}</th>
                  <th className="p-3">{isFa ? 'هش رمزنگاری' : 'Hash / Digest'}</th>
                  <th className="p-3">{isFa ? 'زمان' : 'Timestamp'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-mono text-slate-400">{log.id}</td>
                    <td className="p-3 font-bold">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${
                        log.action === 'EXECUTIVE_SIGNOFF'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : log.action === 'REJECT'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                      }`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="p-3 text-slate-300 font-mono text-[11px]">{log.category}</td>
                    <td className="p-3 text-cyan-300 font-mono text-[11px] max-w-xs truncate">
                      {log.targetResource}
                    </td>
                    <td className="p-3 text-slate-200">
                      <div>{log.actorName}</div>
                      <div className="font-mono text-[10px] text-slate-500">{log.actorEmail}</div>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        log.status === 'EXECUTED'
                          ? 'text-emerald-400'
                          : log.status === 'REJECTED'
                          ? 'text-rose-400'
                          : 'text-amber-400'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-[10px] text-slate-400 max-w-[140px] truncate" title={log.cryptographicHash}>
                      {log.cryptographicHash}
                    </td>
                    <td className="p-3 text-slate-400 whitespace-nowrap">
                      {log.timestamp.replace('T', ' ').substring(0, 16)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: EMAIL DISPATCH LOG */}
      {activeTab === 'emails' && (
        <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-400" />
                {isFa ? 'گزارش ارسال اعلان‌های فوری به مدیرعامل' : 'Executive Email Notification Dispatch Log'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {isFa 
                  ? 'اعلان‌های ایمیلی ارسال‌شده به g.ayyoubian@kkm-intl.org هنگام ثبت تغییرات لایو' 
                  : 'Direct notifications dispatched to CEO Gino Ayyoubian per Principle 4 requirements.'}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {emailDispatches.map((disp) => (
              <div 
                key={disp.id} 
                className="p-4 bg-slate-950/70 border border-slate-800/80 rounded-xl space-y-2 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-purple-400 font-bold">{disp.id}</span>
                    <span className="px-2 py-0.2 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold">
                      {disp.status}
                    </span>
                    <span className="text-slate-300">
                      {isFa ? 'گیرنده:' : 'To:'}{' '}
                      <span className="font-mono text-amber-300 font-bold">{disp.recipient}</span>
                    </span>
                  </div>
                  <span className="text-slate-500 font-mono text-[11px]">
                    {disp.timestamp.replace('T', ' ').substring(0, 16)}
                  </span>
                </div>

                <div className="font-semibold text-white">
                  {disp.subject}
                </div>

                <div className="text-slate-400 text-[11px] leading-relaxed p-2 bg-slate-900/60 rounded-lg border border-slate-800">
                  {disp.bodyExcerpt}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: 90-DAY KEY ROTATION & CLOUD VAULT */}
      {activeTab === 'key_rotation' && (
        <KeyRotationSecurityPanel />
      )}

      {/* Modals */}
      <ExecutiveSignOffModal
        isOpen={Boolean(signOffModalRequest)}
        request={signOffModalRequest}
        onClose={() => setSignOffModalRequest(null)}
        onSignOffSuccess={() => {
          fetchData();
        }}
        onRejectSuccess={() => {
          fetchData();
        }}
      />

      <ProposeProductionChangeModal
        isOpen={isProposeModalOpen}
        onClose={() => setIsProposeModalOpen(false)}
        onSuccess={() => {
          fetchData();
          setActiveTab('pending');
        }}
      />
    </div>
  );
};
