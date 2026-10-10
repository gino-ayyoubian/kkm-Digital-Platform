import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import { useTheme } from '../ThemeContext';
import { Page } from '../types';
import {
  Activity,
  Award,
  Zap,
  Droplets,
  Waves,
  CheckCircle2,
  FileText,
  ArrowRight,
  Sparkles,
  Sliders,
  ShieldCheck,
  Download,
  Share2,
  RefreshCw,
  Layers,
  Cpu,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

import { REEFlowCanvas, FlowRegime } from '../components/ree/REEFlowCanvas';
import { REEControlDeck, RIVER_PRESETS, RiverPreset } from '../components/ree/REEControlDeck';
import { REESubsystemsDetail } from '../components/ree/REESubsystemsDetail';
import { REEDigitalTwinMPC } from '../components/ree/REEDigitalTwinMPC';
import { REECertificationMatrix } from '../components/ree/REECertificationMatrix';
import GlobalCTA from '../components/GlobalCTA';

interface REETwinPageProps {
  setPage?: (page: Page) => void;
}

export const REETwinPage: React.FC<REETwinPageProps> = ({ setPage }) => {
  const { direction, isFa } = useLanguage();
  const { theme } = useTheme();

  // Navigation tab across the KKM-REE module
  const [activeModuleTab, setActiveModuleTab] = useState<'simulator' | 'patents' | 'ai_twin' | 'testing_matrix'>('simulator');

  // Simulation Physical State
  const [regime, setRegime] = useState<FlowRegime>('HYBRID');
  const [flowRate, setFlowRate] = useState<number>(18.5); // m³/s
  const [vaneAngle, setVaneAngle] = useState<number>(45); // degrees (0 to 90)
  const [orificeDiameter, setOrificeDiameter] = useState<number>(1.20); // m
  const [primaryRpm, setPrimaryRpm] = useState<number>(68.0);
  const [secondaryDeployed, setSecondaryDeployed] = useState<boolean>(true);
  const [autoMppt, setAutoMppt] = useState<boolean>(true);
  const [sedimentPurgeActive, setSedimentPurgeActive] = useState<boolean>(false);
  const [autoPurgeEnabled, setAutoPurgeEnabled] = useState<boolean>(true);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Time-series telemetry buffer for live charts
  const [telemetryHistory, setTelemetryHistory] = useState<any[]>([]);

  // Physics Power Calculation Engine
  const physicsOutputs = useMemo(() => {
    const rho = 1000; // kg/m³
    const g = 9.81; // m/s²
    const baseHead = 2.2; // meters

    // 1. Regime A: Gravitational Vortex
    const vortexVaneFactor = Math.sin((vaneAngle * Math.PI) / 180);
    const vortexOrificeFactor = Math.max(0.4, 1.0 - Math.abs(orificeDiameter - 1.0) * 0.4);
    const effectiveVortexFlow = Math.min(flowRate, 14.5);
    const vortexEff = 0.84 * vortexVaneFactor * vortexOrificeFactor;
    const powerVortexKw = (effectiveVortexFlow * rho * g * baseHead * vortexEff) / 1000;

    // 2. Regime B: Hydrokinetic Kinetic Energy
    const channelArea = 6.8; // m²
    const flowVelocity = flowRate / channelArea; // m/s
    const cp = 0.43; // Power coefficient
    const kineticEff = 0.88;
    const powerHydroKw = (0.5 * cp * rho * channelArea * Math.pow(flowVelocity, 3) * kineticEff) / 1000;

    // 3. Regime C: Hybrid Dual-Stage Mode
    let netPowerKw = 0;
    let swirlBoostKw = 0;
    let totalEff = 0;

    if (regime === 'VORTEX') {
      netPowerKw = powerVortexKw;
      totalEff = vortexEff * 100;
    } else if (regime === 'HYDROKINETIC') {
      netPowerKw = powerHydroKw;
      totalEff = (cp / 0.593) * 100; // Betz efficiency percentage
    } else {
      // Hybrid
      const primaryKw = powerVortexKw * 0.85 + powerHydroKw * 0.35;
      swirlBoostKw = secondaryDeployed ? primaryKw * 0.16 : 0;
      netPowerKw = primaryKw + swirlBoostKw;
      totalEff = 89.4;
    }

    // Auto-calculate MPPT RPM if enabled
    const optimalRpm = regime === 'HYDROKINETIC'
      ? flowVelocity * 18.5
      : 30 + (flowRate * 1.8) + (vaneAngle * 0.25);

    // Capacity factor based on 500 kW rated nominal turbine
    const capacityFactor = Math.min(98.5, Math.max(15, (netPowerKw / 500) * 100));

    // CO2 Offset rate: ~0.72 kg CO2 per kWh clean generation
    const co2OffsetPerHour = (netPowerKw * 0.72).toFixed(1);

    return {
      netPowerKw: Math.max(5.0, netPowerKw),
      optimalRpm: Math.min(125, optimalRpm),
      swirlBoostKw,
      totalEff: Math.min(94, Math.max(50, totalEff)),
      capacityFactor: capacityFactor.toFixed(1),
      co2OffsetPerHour,
      flowVelocity: flowVelocity.toFixed(2),
      waterHead: baseHead.toFixed(2)
    };
  }, [flowRate, vaneAngle, orificeDiameter, regime, secondaryDeployed]);

  // Keep RPM in sync with MPPT if enabled
  useEffect(() => {
    if (autoMppt) {
      setPrimaryRpm(physicsOutputs.optimalRpm);
    }
  }, [autoMppt, physicsOutputs.optimalRpm]);

  // Telemetry loop
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const nowStr = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const jitter = (Math.random() - 0.5) * 1.5;
      const currentKw = +(physicsOutputs.netPowerKw + jitter).toFixed(1);

      setTelemetryHistory((prev) => {
        const next = [
          ...prev,
          {
            time: nowStr,
            power: currentKw,
            rpm: +(primaryRpm + (Math.random() - 0.5) * 0.8).toFixed(1),
            flow: flowRate,
            efficiency: +(physicsOutputs.totalEff + (Math.random() - 0.5) * 0.4).toFixed(1),
          }
        ];
        if (next.length > 25) next.shift();
        return next;
      });

      // Auto purge simulation: randomly trigger briefly if high flow and auto enabled
      if (autoPurgeEnabled && flowRate > 22.0 && Math.random() < 0.08 && !sedimentPurgeActive) {
        setSedimentPurgeActive(true);
        setTimeout(() => setSedimentPurgeActive(false), 3500);
      }
    }, 1800);

    return () => clearInterval(interval);
  }, [isPaused, physicsOutputs, primaryRpm, flowRate, autoPurgeEnabled, sedimentPurgeActive]);

  // Manual sediment purge trigger
  const triggerSedimentPurge = useCallback(() => {
    setSedimentPurgeActive(true);
    setTimeout(() => {
      setSedimentPurgeActive(false);
    }, 4000);
  }, []);

  // Apply a river basin preset
  const applyPreset = useCallback((preset: RiverPreset) => {
    setFlowRate(preset.flow);
    setVaneAngle(preset.vane);
    setOrificeDiameter(preset.orifice);
    setRegime(preset.regime);
    setSecondaryDeployed(preset.secondary);
    if (preset.turbidity > 200) {
      setSedimentPurgeActive(true);
      setTimeout(() => setSedimentPurgeActive(false), 3000);
    }
  }, []);

  // Reset to default state
  const resetToDefaults = useCallback(() => {
    setRegime('HYBRID');
    setFlowRate(18.5);
    setVaneAngle(45);
    setOrificeDiameter(1.20);
    setSecondaryDeployed(true);
    setAutoMppt(true);
    setSedimentPurgeActive(false);
  }, []);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pt-8 pb-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300" dir={direction}>
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HERO EXECUTIVE HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-10 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden"
        >
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-primary/10 dark:bg-cyan-950/60 text-primary dark:text-cyan-400 border border-primary/20 dark:border-cyan-800 text-xs font-mono font-bold rounded-full flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                  KKM International Group • KKM-REE
                </span>
                <span className="px-3 py-1 bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold rounded-full">
                  {isFa ? 'مالکیت و ثبت اختراع: سیدژینو ایوبیان' : 'Inventions & Patents by Gino Ayyoubain'}
                </span>
                <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 text-xs font-mono font-bold rounded-full">
                  TRL 6-7 Validated
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
                {isFa
                  ? 'اکوسیستم انرژی رودخانه‌ای KKM-REE'
                  : 'KKM-REE River Energy Ecosystem'}
              </h1>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {isFa
                  ? 'سامانه تبدیل انرژی رودخانه‌ای گردابه‌ای–هیدروکینتیکی ماژولار و تطبیقی با پیکربندی مجدد ۳ رژیم جریان، تجهیزات خودتمیزشونده بار بستر و آشغال، و دوقلوی دیجیتال مبتنی بر هوش مصنوعی (AI MPC).'
                  : 'Modular & adaptive vortex-hydrokinetic river energy conversion system with multi-regime flow reconfiguration, self-cleaning bedload sediment apparatus, and AI-driven predictive digital twin.'}
              </p>
            </div>

            {/* Quick Actions & Status */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full sm:w-auto">
              <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 font-mono text-xs">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Telemetry State</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {isPaused ? 'ENGINE PAUSED' : 'CFD TWIN STREAMING'}
                  </span>
                </div>
              </div>

              {setPage && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(Page.IPCenter)}
                    className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    {isFa ? 'مرکز پتنت‌ها (IP)' : 'IP Dossier'}
                  </button>
                  <button
                    onClick={() => setPage(Page.PilotRequest)}
                    className="flex-1 px-4 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    {isFa ? 'درخواست پایلوت' : 'Request Pilot'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Module Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
            {[
              { id: 'simulator', label: isFa ? 'شبیه‌ساز ۳ رژیم و دوقلو' : 'Interactive 3-Regime Simulator', icon: Sliders },
              { id: 'patents', label: isFa ? 'اختراعات و ۶ زیرسامانه (S1-S6)' : 'Patents & 6 Subsystems (S1-S6)', icon: Layers },
              { id: 'ai_twin', label: isFa ? 'هوش مصنوعی MPC و ناوگان VPP' : 'AI MPC & Virtual Power Plant', icon: Cpu },
              { id: 'testing_matrix', label: isFa ? 'ماتریس آزمون آزمایشگاهی و استانداردهای IEC' : 'Testing Matrix & Standards', icon: ShieldCheck },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveModuleTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                    activeModuleTab === tab.id
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* TAB 1: INTERACTIVE SIMULATOR & CONTROL DECK */}
        {activeModuleTab === 'simulator' && (
          <div className="space-y-8">
            {/* Visualizer Canvas & Live KPI Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left 2 Cols: Dynamic Canvas */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex justify-between items-center px-1">
                  <div className="flex items-center gap-2">
                    <Waves className="w-5 h-5 text-cyan-500" />
                    <h2 className="text-lg md:text-xl font-bold font-display text-slate-900 dark:text-white">
                      {isFa ? 'شبیه‌ساز جریان هیدرودینامیکی و گردابه‌ای' : 'Hydrodynamic & Vortex Flow Cutaway Simulator'}
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    {isFa ? 'دینامیک سیالات تعاملی' : 'Interactive 2D CFD Vector Engine'}
                  </span>
                </div>

                <REEFlowCanvas
                  regime={regime}
                  flowRate={flowRate}
                  vaneAngle={vaneAngle}
                  orificeDiameter={orificeDiameter}
                  primaryRpm={primaryRpm}
                  secondaryDeployed={secondaryDeployed}
                  sedimentPurgeActive={sedimentPurgeActive}
                  isPaused={isPaused}
                  theme={theme}
                  isFa={isFa}
                />
              </div>

              {/* Right Col: Instant Telemetry & Power Yield Cards */}
              <div className="space-y-4">
                <div className="flex justify-between items-center px-1">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-emerald-500" />
                    <h2 className="text-lg md:text-xl font-bold font-display text-slate-900 dark:text-white">
                      {isFa ? 'خروجی‌های بلادرنگ سامانه' : 'Instantaneous Telemetry'}
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Power Output */}
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm col-span-2">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs text-slate-500 font-medium">
                        {isFa ? 'توان تولیدی لحظه‌ای' : 'Simulated Power Output'}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                        {regime}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold font-mono text-primary dark:text-cyan-400">
                        {physicsOutputs.netPowerKw.toFixed(1)}
                      </span>
                      <span className="text-xs font-bold text-slate-400">kW</span>
                    </div>
                    {physicsOutputs.swirlBoostKw > 0 && (
                      <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
                        +{physicsOutputs.swirlBoostKw.toFixed(1)} kW from S-5 Swirl Rotor
                      </p>
                    )}
                  </div>

                  {/* RPM */}
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-xs text-slate-500 block mb-1">
                      {isFa ? 'سرعت دورانی S-4' : 'Primary PMG RPM'}
                    </span>
                    <span className="text-xl font-bold font-mono text-slate-900 dark:text-white">
                      {primaryRpm.toFixed(1)}
                    </span>
                    <span className="text-[10px] text-slate-400 block font-mono">RPM</span>
                  </div>

                  {/* Capacity Factor */}
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-xs text-slate-500 block mb-1">
                      {isFa ? 'ضریب ظرفیت (Cf)' : 'Capacity Factor'}
                    </span>
                    <span className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                      {physicsOutputs.capacityFactor}%
                    </span>
                    <span className="text-[10px] text-slate-400 block font-mono">vs 48% traditional</span>
                  </div>

                  {/* Total Efficiency */}
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-xs text-slate-500 block mb-1">
                      {isFa ? 'راندمان کل سامانه' : 'System Efficiency'}
                    </span>
                    <span className="text-xl font-bold font-mono text-cyan-600 dark:text-cyan-400">
                      {physicsOutputs.totalEff.toFixed(1)}%
                    </span>
                    <span className="text-[10px] text-slate-400 block font-mono">Combined Eff</span>
                  </div>

                  {/* CO2 Offset */}
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-xs text-slate-500 block mb-1">
                      {isFa ? 'کاهش CO2 ساعتی' : 'CO₂ Offset Rate'}
                    </span>
                    <span className="text-xl font-bold font-mono text-purple-600 dark:text-purple-400">
                      {physicsOutputs.co2OffsetPerHour}
                    </span>
                    <span className="text-[10px] text-slate-400 block font-mono">kg CO₂/hr</span>
                  </div>
                </div>

                {/* Live Real-time Chart */}
                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {isFa ? 'روند پایش توان خروجی' : 'Power Trend Stream'}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-500 font-bold">LIVE TELEMETRY</span>
                  </div>
                  <div className="h-36 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={telemetryHistory} margin={{ top: 5, right: 10, bottom: 0, left: -25 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.15} />
                        <XAxis dataKey="time" stroke="#64748b" fontSize={9} />
                        <YAxis stroke="#64748b" fontSize={9} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', color: '#f8fafc', fontSize: '11px' }}
                        />
                        <Line type="monotone" dataKey="power" name="Power (kW)" stroke="#0ea5e9" strokeWidth={2.5} dot={false} isAnimationActive={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* Comprehensive Interactive Control Deck */}
            <REEControlDeck
              regime={regime}
              setRegime={setRegime}
              flowRate={flowRate}
              setFlowRate={setFlowRate}
              vaneAngle={vaneAngle}
              setVaneAngle={setVaneAngle}
              orificeDiameter={orificeDiameter}
              setOrificeDiameter={setOrificeDiameter}
              primaryRpm={primaryRpm}
              setPrimaryRpm={setPrimaryRpm}
              secondaryDeployed={secondaryDeployed}
              setSecondaryDeployed={setSecondaryDeployed}
              autoMppt={autoMppt}
              setAutoMppt={setAutoMppt}
              sedimentPurgeActive={sedimentPurgeActive}
              triggerSedimentPurge={triggerSedimentPurge}
              autoPurgeEnabled={autoPurgeEnabled}
              setAutoPurgeEnabled={setAutoPurgeEnabled}
              isPaused={isPaused}
              setIsPaused={setIsPaused}
              applyPreset={applyPreset}
              resetToDefaults={resetToDefaults}
              isFa={isFa}
            />
          </div>
        )}

        {/* TAB 2: PATENTS & 6 SUBSYSTEMS ARCHITECTURE */}
        {activeModuleTab === 'patents' && (
          <REESubsystemsDetail isFa={isFa} />
        )}

        {/* TAB 3: AI MPC DIGITAL TWIN & VPP FLEET */}
        {activeModuleTab === 'ai_twin' && (
          <REEDigitalTwinMPC
            currentFlow={flowRate}
            currentPowerKw={physicsOutputs.netPowerKw}
            regime={regime}
            isFa={isFa}
          />
        )}

        {/* TAB 4: CERTIFICATION MATRIX & EXPERIMENTAL ROADMAP */}
        {activeModuleTab === 'testing_matrix' && (
          <REECertificationMatrix isFa={isFa} />
        )}

        {/* BOTTOM CALL TO ACTION */}
        {setPage && (
          <div className="pt-6">
            <GlobalCTA setPage={setPage} />
          </div>
        )}

      </div>
    </div>
  );
};

export default REETwinPage;
