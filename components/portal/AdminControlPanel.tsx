import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../LanguageContext';
import { useAuth } from '../../AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, Activity, Cpu, Sliders, RefreshCw, Flame, 
  Layers, CheckCircle2, AlertTriangle, FileText, UserCheck, 
  Calendar, Award, Save, Plus, Trash2, Edit3, Lock, Eye, 
  Send, ExternalLink, Zap, Radio, Globe, BarChart3, ChevronRight
} from 'lucide-react';
import { db } from '../../firebase';
import { collection, getDocs, doc, updateDoc, setDoc } from 'firebase/firestore';

interface TelemetryNode {
  nodeId: string;
  name: string;
  nameFa: string;
  status: string;
  wellheadTempC: number;
  downholeTempC: number;
  wellheadPressureBar: number;
  massFlowRateKgS: number;
  targetMassFlowRateKgS: number;
  sorcRpm: number;
  sorcEfficiencyPercent: number;
  powerOutputMWe: number;
  thermalOutputMWth: number;
  co2AvoidedPerHourTons: number;
  microSeismicRichter: number;
  secondaryExchangerActive: boolean;
  emergencyBypassActive: boolean;
  digitalTwinLatencyMs: number;
  neuralNetworkConvergence: number;
}

interface TelemetryResponse {
  success: boolean;
  timestamp: string;
  systemStatus: string;
  metrics: {
    totalPowerMWe: number;
    totalThermalMWth: number;
    totalCo2AvoidedPerHourTons: number;
    activeNodeCount: number;
    totalNodeCount: number;
    networkLatencyMs: number;
    telemetrySamplingRateHz: number;
  };
  nodes: TelemetryNode[];
}

interface AnnouncementItem {
  id: string;
  title: string;
  titleEn?: string;
  category: string;
  author: string;
  date: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  content: string;
}

interface MilestoneItem {
  id: string;
  projectId: string;
  projectTitle: string;
  milestoneCode: string;
  title: string;
  titleFa?: string;
  targetDate: string;
  completionDate?: string;
  status: 'planned' | 'in_progress' | 'completed' | 'verification_phase';
  evidenceLevelRequired?: string;
  assignedLead?: string;
  department?: string;
}

export const AdminControlPanel: React.FC = () => {
  const { t, isFa } = useLanguage();
  const { userProfile, isSuperAdmin, isAdmin } = useAuth();

  const [activeSubTab, setActiveSubTab] = useState<'telemetry' | 'cms_announcements' | 'cms_milestones' | 'cms_members'>('telemetry');
  
  // Telemetry State
  const [telemetryData, setTelemetryData] = useState<TelemetryResponse | null>(null);
  const [isLoadingTelemetry, setIsLoadingTelemetry] = useState(false);
  const [telemetryAutoRefresh, setTelemetryAutoRefresh] = useState(true);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Content Management State
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [milestones, setMilestones] = useState<MilestoneItem[]>([]);
  const [editingAnnouncement, setEditingAnnouncement] = useState<AnnouncementItem | null>(null);
  const [isSavingContent, setIsSavingContent] = useState(false);

  // Fetch Telemetry Data
  const fetchTelemetry = async () => {
    try {
      const res = await fetch('/api/admin/telemetry');
      if (res.ok) {
        const data = await res.json();
        setTelemetryData(data);
      }
    } catch (err) {
      console.warn('Telemetry fetch error:', err);
    }
  };

  // Fetch Content Data
  const fetchContent = async () => {
    try {
      const res = await fetch('/api/admin/content');
      if (res.ok) {
        const data = await res.json();
        if (data.announcements) setAnnouncements(data.announcements);
        if (data.milestones) setMilestones(data.milestones);
      }
    } catch (err) {
      console.warn('CMS content fetch error:', err);
    }
  };

  useEffect(() => {
    fetchTelemetry();
    fetchContent();
  }, []);

  // Live Auto-Refresh polling
  useEffect(() => {
    if (!telemetryAutoRefresh) return;
    const interval = setInterval(() => {
      fetchTelemetry();
    }, 4000);
    return () => clearInterval(interval);
  }, [telemetryAutoRefresh]);

  // Handle SCADA Control Actions
  const handleControlCommand = async (nodeId: string, command: string, parameterValue: any) => {
    setIsLoadingTelemetry(true);
    try {
      const res = await fetch('/api/admin/telemetry/control', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodeId, command, parameterValue })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setActionMessage(isFa ? 'دستور عملیاتی با موفقیت به سامانه SCADA اعمال شد.' : 'Directive successfully dispatched to SCADA controller.');
        fetchTelemetry();
      } else {
        setActionMessage(data.message || 'Operation failed');
      }
    } catch (e: any) {
      setActionMessage(e.message || 'Error dispatching directive');
    } finally {
      setIsLoadingTelemetry(false);
      setTimeout(() => setActionMessage(null), 4000);
    }
  };

  // Save Announcement
  const handleSaveAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAnnouncement) return;
    setIsSavingContent(true);

    try {
      const res = await fetch('/api/admin/content/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentType: 'announcement',
          itemData: editingAnnouncement
        })
      });

      if (res.ok) {
        // Also persist to Firestore if available
        if (db) {
          try {
            await setDoc(doc(db, 'announcements', editingAnnouncement.id || `ANN-${Date.now()}`), {
              ...editingAnnouncement,
              updatedAt: new Date().toISOString()
            });
          } catch (fErr) {
            console.warn('Firestore announcement sync notice:', fErr);
          }
        }

        setActionMessage(isFa ? 'بخشنامه با موفقیت ثبت و در پرتال منتشر شد.' : 'Announcement published to enterprise portal.');
        setEditingAnnouncement(null);
        fetchContent();
      }
    } catch (err: any) {
      setActionMessage(err.message || 'Error saving announcement');
    } finally {
      setIsSavingContent(false);
      setTimeout(() => setActionMessage(null), 4000);
    }
  };

  // Update Milestone Status
  const handleUpdateMilestoneStatus = async (milestoneId: string, newStatus: string) => {
    setIsSavingContent(true);
    try {
      const res = await fetch('/api/admin/content/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentType: 'milestone',
          itemData: { id: milestoneId, status: newStatus }
        })
      });

      if (res.ok) {
        setMilestones(prev => prev.map(m => m.id === milestoneId ? { ...m, status: newStatus as any } : m));
        setActionMessage(isFa ? 'وضعیت مایلستون پروژه به‌روزرسانی شد.' : 'Project milestone status updated.');
      }
    } catch (err: any) {
      setActionMessage(err.message || 'Error updating milestone');
    } finally {
      setIsSavingContent(false);
      setTimeout(() => setActionMessage(null), 4000);
    }
  };

  if (!isAdmin && !isSuperAdmin) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-red-200 dark:border-red-900/50 text-center max-w-xl mx-auto my-12 shadow-lg">
        <Lock className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
          {isFa ? 'دسترسی محدود به مدیران ارشد' : 'Administrative Access Restricted'}
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          {isFa 
            ? 'این پنل انحصاری ویژه اعضای هیئت مدیره و مدیران ارشد با سطح دسترسی محرمانه / استراتژیک جهت نظارت بر تله‌متری بلادرنگ GMEL و مدیریت محتوای پرتال می‌باشد.'
            : 'This module is restricted to authorized Executive Board members and System Administrators for real-time GMEL telemetry control and portal CMS.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6" dir={isFa ? 'rtl' : 'ltr'}>
      {/* Top Banner: Clearance & Security Status */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-primary-dark p-6 rounded-2xl border border-slate-700/80 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {isFa ? 'اتصال زنده به شبکه SCADA و دوقلوی دیجیتال' : 'LIVE SCADA & DIGITAL TWIN TELEMETRY'}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold uppercase tracking-wider">
              {userProfile?.clearanceLevel || 'Top Secret / Strategic'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-black tracking-tight flex items-center gap-2">
            <Cpu className="w-6 h-6 text-secondary" />
            <span>{isFa ? 'مرکز فرماندهی تله‌متری GMEL و مدیریت پرتال سازمانی' : 'GMEL Ecosystem Command Console & Portal CMS'}</span>
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            {isFa 
              ? 'پایش بلادرنگ پارامترهای ترمودینامیکی چاه‌های ژرف زمین‌گرمایی، توان نیروگاه‌های sORC، تزریق سیال مداربسته و مدیریت محتوای پرتال سازمانی KKM.'
              : 'Real-time telemetry oversight of deep closed-loop subsurface enthalpy, supercritical ORC power blocks, and centralized portal content administration.'}
          </p>
        </div>

        {/* Action Controls & Refresh */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setTelemetryAutoRefresh(!telemetryAutoRefresh)}
            className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 border ${
              telemetryAutoRefresh 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            <Radio className={`w-3.5 h-3.5 ${telemetryAutoRefresh ? 'animate-pulse text-emerald-400' : ''}`} />
            <span>{telemetryAutoRefresh ? (isFa ? 'پایش زنده فعال (۴ ثانیه)' : 'Auto-Poll (4s)') : (isFa ? 'پایش متوقف' : 'Paused')}</span>
          </button>

          <button
            onClick={() => {
              fetchTelemetry();
              fetchContent();
            }}
            disabled={isLoadingTelemetry}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors"
            title={isFa ? 'به‌روزرسانی داده‌ها' : 'Refresh Telemetry'}
          >
            <RefreshCw className={`w-4 h-4 ${isLoadingTelemetry ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Action Notification Alert */}
      <AnimatePresence>
        {actionMessage && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="p-3.5 rounded-xl bg-primary/10 border border-primary/30 text-primary dark:text-secondary text-xs font-bold flex items-center gap-2 shadow-sm"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{actionMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 dark:border-slate-800 pb-3">
        {[
          { id: 'telemetry', labelFa: 'تله‌متری و فرماندهی چاه‌های ژرف GMEL', labelEn: 'GMEL Thermodynamic Telemetry', icon: Flame },
          { id: 'cms_announcements', labelFa: 'مدیریت بخشنامه‌ها و اطلاعیه‌ها', labelEn: 'Portal Announcements CMS', icon: FileText },
          { id: 'cms_milestones', labelFa: 'کنترل مایلستون‌های پروژه‌های کلان', labelEn: 'Project Milestones CMS', icon: BarChart3 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{isFa ? tab.labelFa : tab.labelEn}</span>
            </button>
          );
        })}
      </div>

      {/* SUB-TAB 1: REAL-TIME GMEL TELEMETRY */}
      {activeSubTab === 'telemetry' && (
        <div className="space-y-6">
          {/* Global Aggregated Metrics Bar */}
          {telemetryData?.metrics && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <span className="text-[10px] font-mono text-slate-400 block mb-1">
                  {isFa ? 'توان الکتریکی تجمعی خروجی' : 'NET ELECTRICAL GENERATION'}
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black font-display text-primary dark:text-secondary">
                    {telemetryData.metrics.totalPowerMWe}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">MWe</span>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <span className="text-[10px] font-mono text-slate-400 block mb-1">
                  {isFa ? 'ظرفیت حرارتی بازیافتی' : 'NET THERMAL CASCADE'}
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black font-display text-amber-500">
                    {telemetryData.metrics.totalThermalMWth}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">MWth</span>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <span className="text-[10px] font-mono text-slate-400 block mb-1">
                  {isFa ? 'کربن جذب/اجتناب‌شده ساعتی' : 'CO2 AVOIDED RATE'}
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black font-display text-emerald-500">
                    {telemetryData.metrics.totalCo2AvoidedPerHourTons}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">t/hr</span>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <span className="text-[10px] font-mono text-slate-400 block mb-1">
                  {isFa ? 'وضعیت گره‌های فعال شبکه' : 'NETWORK TELEMETRY STATUS'}
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black font-display text-blue-500">
                    {telemetryData.metrics.activeNodeCount} / {telemetryData.metrics.totalNodeCount}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-500 ml-1">OPTIMAL</span>
                </div>
              </div>
            </div>
          )}

          {/* Individual Telemetry Nodes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {telemetryData?.nodes?.map((node) => (
              <div
                key={node.nodeId}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-md p-5 flex flex-col justify-between space-y-4"
              >
                <div>
                  {/* Node Header */}
                  <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-700">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <span className="text-[10px] font-mono font-bold text-primary dark:text-secondary uppercase">
                          {node.nodeId}
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white mt-0.5">
                        {isFa ? node.nameFa : node.name}
                      </h4>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                      {node.status}
                    </span>
                  </div>

                  {/* Thermodynamic Live Readouts */}
                  <div className="grid grid-cols-2 gap-3 mt-4 text-xs font-mono">
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block">{isFa ? 'دمای سرچاهی' : 'Wellhead Temp'}</span>
                      <span className="text-base font-black text-amber-500">{node.wellheadTempC}°C</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block">{isFa ? 'دمای عمق ۴,۲۰۰م' : 'Downhole Temp'}</span>
                      <span className="text-base font-black text-rose-500">{node.downholeTempC}°C</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block">{isFa ? 'فشار سرچاهی' : 'Wellhead Pressure'}</span>
                      <span className="text-base font-black text-blue-500">{node.wellheadPressureBar} bar</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block">{isFa ? 'دبی جرمی سیال' : 'Mass Flow Rate'}</span>
                      <span className="text-base font-black text-emerald-500">{node.massFlowRateKgS} kg/s</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block">{isFa ? 'دور توربین sORC' : 'Turbine RPM'}</span>
                      <span className="text-base font-black text-purple-400">{node.sorcRpm.toLocaleString()} RPM</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block">{isFa ? 'راندمان آیزنتروپیک' : 'Isentropic Eff.'}</span>
                      <span className="text-base font-black text-teal-400">{node.sorcEfficiencyPercent}%</span>
                    </div>
                  </div>

                  {/* Digital Twin Convergence */}
                  <div className="mt-3.5 p-3 rounded-xl bg-slate-900 text-white text-[11px] font-mono flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 block text-[9px]">PIN-PINN DIGITAL TWIN SYNC</span>
                      <span className="text-secondary font-bold">Latency: {node.digitalTwinLatencyMs}ms &bull; Acc: {(node.neuralNetworkConvergence * 100).toFixed(2)}%</span>
                    </div>
                    <button
                      onClick={() => handleControlCommand(node.nodeId, 'RECALIBRATE_SENSORS', null)}
                      className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-[10px] transition-colors"
                      title="Sync & Recalibrate Sensors"
                    >
                      {isFa ? 'همگام‌سازی سنسور' : 'Recalibrate'}
                    </button>
                  </div>
                </div>

                {/* SCADA Operational Controls */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-700/80 space-y-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block flex items-center gap-1">
                    <Sliders className="w-3 h-3 text-secondary" />
                    {isFa ? 'فرمان‌های عملیاتی SCADA' : 'SCADA Control Directives'}
                  </span>

                  {/* Target Flow Rate Slider */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-slate-600 dark:text-slate-300 font-medium">
                        {isFa ? 'تنظیم هدف دبی جرمی:' : 'Target Mass Flow:'}
                      </span>
                      <span className="font-mono font-bold text-primary dark:text-secondary">
                        {node.targetMassFlowRateKgS} kg/s
                      </span>
                    </div>
                    <input
                      type="range"
                      min={40}
                      max={120}
                      step={1}
                      value={node.targetMassFlowRateKgS}
                      onChange={(e) => handleControlCommand(node.nodeId, 'SET_MASS_FLOW', Number(e.target.value))}
                      className="w-full accent-primary dark:accent-secondary cursor-pointer"
                    />
                  </div>

                  {/* Toggles: Secondary Exchanger & Bypass */}
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <button
                      onClick={() => handleControlCommand(node.nodeId, 'TOGGLE_SECONDARY_EXCHANGER', !node.secondaryExchangerActive)}
                      className={`flex-1 py-1.5 px-2 rounded-xl text-[10px] font-bold transition-all border ${
                        node.secondaryExchangerActive 
                          ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30' 
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-500 border-slate-200 dark:border-slate-600'
                      }`}
                    >
                      {isFa 
                        ? (node.secondaryExchangerActive ? 'مبدل ثانویه: فعال' : 'مبدل ثانویه: خاموش') 
                        : (node.secondaryExchangerActive ? 'Sec Exchanger: ON' : 'Sec Exchanger: OFF')}
                    </button>

                    <button
                      onClick={() => handleControlCommand(node.nodeId, 'TOGGLE_EMERGENCY_BYPASS', !node.emergencyBypassActive)}
                      className={`flex-1 py-1.5 px-2 rounded-xl text-[10px] font-bold transition-all border ${
                        node.emergencyBypassActive 
                          ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500/40 animate-pulse' 
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-500 border-slate-200 dark:border-slate-600'
                      }`}
                    >
                      {isFa 
                        ? (node.emergencyBypassActive ? 'بای‌پس اضطراری: فعال' : 'بای‌پس: غیرفعال') 
                        : (node.emergencyBypassActive ? 'Bypass: ACTIVE' : 'Bypass: Standby')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: PORTAL ANNOUNCEMENTS CMS */}
      {activeSubTab === 'cms_announcements' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-700">
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                {isFa ? 'مدیریت بخشنامه‌ها و اعلانات پرتال' : 'Enterprise Announcements & Directives CMS'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {isFa 
                  ? 'انتشار، ویرایش و آرشیو بخشنامه‌ها و هشدارهای حاکمیتی در داشبورد کلیه پرسنل سازمان.' 
                  : 'Publish, edit, and organize corporate governance directives across internal workstations.'}
              </p>
            </div>

            <button
              onClick={() => setEditingAnnouncement({
                id: '',
                title: '',
                titleEn: '',
                category: 'Executive Directive',
                author: userProfile?.displayName || 'Executive Board',
                date: new Date().toISOString().split('T')[0],
                priority: 'high',
                content: ''
              })}
              className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>{isFa ? 'افزودن بخشنامه جدید' : 'New Directive'}</span>
            </button>
          </div>

          {/* Edit Form Modal/Drawer */}
          {editingAnnouncement && (
            <form onSubmit={handleSaveAnnouncement} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-4">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-primary dark:text-secondary" />
                <span>{editingAnnouncement.id ? (isFa ? 'ویرایش بخشنامه' : 'Edit Directive') : (isFa ? 'صدور بخشنامه سازمانی جدید' : 'Issue New Directive')}</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-slate-300">
                    {isFa ? 'عنوان بخشنامه (فارسی)' : 'Title (Farsi)'}
                  </label>
                  <input
                    type="text"
                    required
                    value={editingAnnouncement.title}
                    onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-slate-300">
                    {isFa ? 'عنوان انگلیسی (اختیاری)' : 'Title (English)'}
                  </label>
                  <input
                    type="text"
                    value={editingAnnouncement.titleEn || ''}
                    onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, titleEn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-slate-300">
                    {isFa ? 'دسته‌بندی' : 'Category'}
                  </label>
                  <select
                    value={editingAnnouncement.category}
                    onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                  >
                    <option value="Executive Directive">Executive Directive</option>
                    <option value="Scientific & QA">Scientific & QA</option>
                    <option value="HSE & Safety">HSE & Safety</option>
                    <option value="Financial & Budget">Financial & Budget</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-slate-300">
                    {isFa ? 'سطح اولویت' : 'Priority'}
                  </label>
                  <select
                    value={editingAnnouncement.priority}
                    onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, priority: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                  >
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-slate-300">
                  {isFa ? 'متن کامل بخشنامه سازمانی' : 'Directive Full Text'}
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingAnnouncement.content}
                  onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingAnnouncement(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  {isFa ? 'انصراف' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={isSavingContent}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSavingContent ? (isFa ? 'در حال ذخیره...' : 'Saving...') : (isFa ? 'ثبت و انتشار' : 'Save & Publish')}</span>
                </button>
              </div>
            </form>
          )}

          {/* Announcements List */}
          <div className="space-y-3">
            {announcements.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-primary/10 text-primary dark:text-secondary uppercase">
                      {item.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      item.priority === 'urgent' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {item.priority.toUpperCase()}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{item.date}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                    {item.content}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setEditingAnnouncement(item)}
                    className="p-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-primary hover:text-white text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs transition-colors"
                    title="Edit Directive"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: PROJECT MILESTONES CMS */}
      {activeSubTab === 'cms_milestones' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-100 dark:border-slate-700">
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
              {isFa ? 'کنترل و به‌روزرسانی مایلستون‌های پروژه‌های مگااستراکچر' : 'Mega-Infrastructure Project Milestones & Verification'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {isFa 
                ? 'مدیریت وضعیت مایلستون‌ها، انطباق با سطوح شواهد (Levels A-G) و اتصال به رجیستری KKM.' 
                : 'Manage target dates, EPC verification stages, and evidence level alignments.'}
            </p>
          </div>

          <div className="space-y-3">
            {milestones.map((m) => (
              <div
                key={m.id}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-primary dark:text-secondary">
                      {m.milestoneCode}
                    </span>
                    <span className="text-xs text-slate-400">&bull;</span>
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                      {m.projectTitle}
                    </span>
                    {m.evidenceLevelRequired && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                        {m.evidenceLevelRequired}
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {isFa && m.titleFa ? m.titleFa : m.title}
                  </h4>
                  <p className="text-[11px] font-mono text-slate-500">
                    {isFa ? 'مسئول پروژه:' : 'Lead:'} {m.assignedLead} &bull; {isFa ? 'موعد تحویل:' : 'Target:'} {m.targetDate}
                  </p>
                </div>

                {/* Status Dropdown */}
                <div className="flex items-center gap-2 shrink-0">
                  <select
                    value={m.status}
                    onChange={(e) => handleUpdateMilestoneStatus(m.id, e.target.value)}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300"
                  >
                    <option value="planned">Planned (برنامه‌ریزی‌شده)</option>
                    <option value="in_progress">In Progress (در حال اجرا)</option>
                    <option value="verification_phase">Verification (مرحله صحه‌گذاری)</option>
                    <option value="completed">Completed (تکمیل و تأییدشده)</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminControlPanel;
