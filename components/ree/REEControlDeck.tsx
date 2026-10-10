import React from 'react';
import { Sliders, RotateCcw, Play, Pause, RefreshCw, Droplets, ShieldCheck, Activity } from 'lucide-react';
import type { FlowRegime } from './REEFlowCanvas';

export interface RiverPreset {
  id: string;
  name: string;
  nameFa: string;
  flow: number;
  vane: number;
  orifice: number;
  regime: FlowRegime;
  secondary: boolean;
  turbidity: number;
  description: string;
  descriptionFa: string;
}

export const RIVER_PRESETS: RiverPreset[] = [
  {
    id: 'karun',
    name: 'Karun River Basin (Flood & Sediment)',
    nameFa: 'حوضه رودخانه کارون (نوسان فصلی و رسوب بالا)',
    flow: 26.5,
    vane: 45,
    orifice: 1.45,
    regime: 'HYBRID',
    secondary: true,
    turbidity: 320,
    description: 'High flow seasonal discharge with active sediment purge and dual-stage energy recovery.',
    descriptionFa: 'دبی فصلی بالا با شست‌وشوی خودکار رسوبات و بازیابی دو مرحله‌ای انرژی پسا.'
  },
  {
    id: 'dez',
    name: 'Dez River (Stable Head & Clear Flow)',
    nameFa: 'رودخانه دز (جریان پایدار و زلال کوهستانی)',
    flow: 11.2,
    vane: 55,
    orifice: 0.85,
    regime: 'VORTEX',
    secondary: false,
    turbidity: 45,
    description: 'High vortex circulation regime optimized for maximum gravitational water head conversion.',
    descriptionFa: 'رژیم گردابه‌ای متمرکز بهینه‌سازی‌شده برای بیشینه راندمان ارتفاع مؤثر ثقلی.'
  },
  {
    id: 'aras',
    name: 'Aras Transboundary River (Moderate Flow)',
    nameFa: 'رودخانه مرزی ارس (دبی متوسط و پالس‌های بهاری)',
    flow: 17.8,
    vane: 40,
    orifice: 1.15,
    regime: 'HYBRID',
    secondary: true,
    turbidity: 140,
    description: 'Balanced hybrid regime with automated guide vane adjustment under seasonal hydrograph.',
    descriptionFa: 'رژیم هیبریدی متعادل با تنظیم خودکار پره‌ها بر اساس هیدروگراف فصلی.'
  },
  {
    id: 'alpine',
    name: 'Alpine Tributary (Eco & Fish-Passage Safe)',
    nameFa: 'رودخانه آلپاین (حفاظت اکولوژیک و عبور ایمن ماهیان)',
    flow: 7.5,
    vane: 65,
    orifice: 0.70,
    regime: 'VORTEX',
    secondary: false,
    turbidity: 20,
    description: 'Low-shear vortex rotation with guaranteed non-traumatic fish and macroinvertebrate bypass.',
    descriptionFa: 'سرعت برشی بسیار پایین با تضمین عبور بدون آسیب زیستی ماهیان و بی‌مهرگان رودخانه‌ای.'
  }
];

interface REEControlDeckProps {
  regime: FlowRegime;
  setRegime: (r: FlowRegime) => void;
  flowRate: number;
  setFlowRate: (q: number) => void;
  vaneAngle: number;
  setVaneAngle: (deg: number) => void;
  orificeDiameter: number;
  setOrificeDiameter: (d: number) => void;
  primaryRpm: number;
  setPrimaryRpm: (rpm: number) => void;
  secondaryDeployed: boolean;
  setSecondaryDeployed: (d: boolean) => void;
  autoMppt: boolean;
  setAutoMppt: (m: boolean) => void;
  sedimentPurgeActive: boolean;
  triggerSedimentPurge: () => void;
  autoPurgeEnabled: boolean;
  setAutoPurgeEnabled: (a: boolean) => void;
  isPaused: boolean;
  setIsPaused: (p: boolean) => void;
  applyPreset: (preset: RiverPreset) => void;
  resetToDefaults: () => void;
  isFa: boolean;
}

export const REEControlDeck: React.FC<REEControlDeckProps> = ({
  regime,
  setRegime,
  flowRate,
  setFlowRate,
  vaneAngle,
  setVaneAngle,
  orificeDiameter,
  setOrificeDiameter,
  primaryRpm,
  setPrimaryRpm,
  secondaryDeployed,
  setSecondaryDeployed,
  autoMppt,
  setAutoMppt,
  sedimentPurgeActive,
  triggerSedimentPurge,
  autoPurgeEnabled,
  setAutoPurgeEnabled,
  isPaused,
  setIsPaused,
  applyPreset,
  resetToDefaults,
  isFa
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
      {/* Deck Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-primary dark:text-cyan-400" />
            <h2 className="text-xl md:text-2xl font-bold font-display text-slate-900 dark:text-white">
              {isFa ? 'کنسول کنترل تطبیقی و شبیه‌ساز KKM-REE' : 'KKM-REE Adaptive Simulation Deck'}
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isFa
              ? 'پیکربندی بلادرنگ ۶ زیرسامانه (S1 تا S6) و ۳ رژیم هیدرولیکی اختراع'
              : 'Real-time multi-regime reconfiguration of the 6 patented sub-systems (S1 to S6)'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-sm ${
              isPaused
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-amber-600 hover:bg-amber-700 text-white'
            }`}
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            {isPaused ? (isFa ? 'ادامه شبیه‌سازی' : 'Resume Engine') : (isFa ? 'توقف موقت' : 'Pause Engine')}
          </button>
          <button
            onClick={resetToDefaults}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            title={isFa ? 'بازنشانی به مقادیر کالیبره' : 'Reset to calibrated state'}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 1. REGIME SELECTOR CARDS */}
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
          {isFa ? 'انتخاب رژیم هیدرولیکی سامانه (Invention Claim 1):' : 'Hydraulic Flow Regime (Patent Claim 1):'}
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Regime A: Vortex */}
          <button
            onClick={() => {
              setRegime('VORTEX');
              if (orificeDiameter > 1.2) setOrificeDiameter(0.85);
            }}
            className={`p-4 rounded-2xl border text-left rtl:text-right transition-all relative overflow-hidden ${
              regime === 'VORTEX'
                ? 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-500 ring-2 ring-cyan-500/30'
                : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 hover:border-cyan-400'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-900/60 text-cyan-800 dark:text-cyan-300">
                REGIME A
              </span>
              <span className="text-[11px] text-slate-400 font-mono">Q: 2–14 m³/s</span>
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              {isFa ? 'رژیم گردابه‌ای گرانشی' : 'Gravitational Vortex'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              {isFa
                ? 'کف بسته، تشکیل قیف ورتکس پایدار، روتور عمودی در هسته جریان کم‌ارتفاع.'
                : 'Closed panel floor, stable vortex core formation, direct PMG drive.'}
            </p>
          </button>

          {/* Regime B: Hydrokinetic */}
          <button
            onClick={() => {
              setRegime('HYDROKINETIC');
              setSecondaryDeployed(false);
            }}
            className={`p-4 rounded-2xl border text-left rtl:text-right transition-all relative overflow-hidden ${
              regime === 'HYDROKINETIC'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/30'
                : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 hover:border-emerald-400'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                REGIME B
              </span>
              <span className="text-[11px] text-slate-400 font-mono">Q: 15–40 m³/s</span>
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              {isFa ? 'رژیم هیدروکینتیکی جریان آزاد' : 'Free-Stream Hydrokinetic'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              {isFa
                ? 'کف پنلی باز، تخلیه سیلابی بدون پس‌زدگی، استخراج مستقیم انرژی جنبشی.'
                : 'Retracted floor panels, unrestricted flood discharge, kinetic kinetic power.'}
            </p>
          </button>

          {/* Regime C: Hybrid Dual-Stage */}
          <button
            onClick={() => {
              setRegime('HYBRID');
              setSecondaryDeployed(true);
            }}
            className={`p-4 rounded-2xl border text-left rtl:text-right transition-all relative overflow-hidden ${
              regime === 'HYBRID'
                ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-500 ring-2 ring-purple-500/30'
                : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 hover:border-purple-400'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300">
                REGIME C (HYBRID)
              </span>
              <span className="text-[11px] text-slate-400 font-mono">Q: 10–25 m³/s</span>
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              {isFa ? 'رژیم ترکیبی با روتور ثانویه' : 'Dual-Stage Swirl Recovery'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              {isFa
                ? 'استخراج ورتکس اولیه + درگیرسازی روتور ثانویه S-5 جهت بازیافت ۱۲-۱۸٪ انرژی پسا.'
                : 'Vortex primary + S-5 secondary rotor captures downstream swirl momentum.'}
            </p>
          </button>
        </div>
      </div>

      {/* 2. RIVER PROFILE PRESETS */}
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
          {isFa ? 'پروفایل‌های هیدرولوژیکی پیش‌فرض (سناریوهای میدانی):' : 'Hydrological River Basin Presets (Field Scenarios):'}
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {RIVER_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => applyPreset(preset)}
              className="p-3 text-left rtl:text-right rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 hover:border-primary transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                  {isFa ? preset.nameFa.split('(')[0] : preset.name.split('(')[0]}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                {preset.flow} m³/s • {preset.regime}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* 3. DYNAMIC ACTUATOR SLIDERS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
        {/* River Inflow Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              {isFa ? 'دبی جریان رودخانه (River Inflow Q)' : 'River Inflow Rate (Q)'}
            </span>
            <span className="font-mono font-bold text-primary dark:text-cyan-400 text-sm">
              {flowRate.toFixed(1)} m³/s
            </span>
          </div>
          <input
            type="range"
            min="2.0"
            max="40.0"
            step="0.5"
            value={flowRate}
            onChange={(e) => setFlowRate(parseFloat(e.target.value))}
            className="w-full accent-primary h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>2.0 m³/s (خشکسالی)</span>
            <span>20.0 m³/s (نرمال)</span>
            <span>40.0 m³/s (سیلاب)</span>
          </div>
        </div>

        {/* Guide Vane Angle (S-2) */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              {isFa ? 'زاویه پره‌های راهنمای ورودی S-2 (Vane Angle)' : 'S-2 Guide Vane Angle (θ)'}
            </span>
            <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400 text-sm">
              {vaneAngle}°
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="90"
            step="5"
            value={vaneAngle}
            onChange={(e) => setVaneAngle(parseInt(e.target.value))}
            className="w-full accent-cyan-500 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>0° (بسته / انحراف کامل)</span>
            <span>50° (بیشینه تکانه زاویه‌ای)</span>
            <span>90° (مستقیم / جریان آزاد)</span>
          </div>
        </div>

        {/* Telescopic Orifice Diameter (S-3) */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              {isFa ? 'قطر آستین تلسکوپی خروجی S-3 (Orifice D_out)' : 'S-3 Telescopic Orifice Diameter'}
            </span>
            <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-sm">
              {orificeDiameter.toFixed(2)} m
            </span>
          </div>
          <input
            type="range"
            min="0.40"
            max="1.80"
            step="0.05"
            value={orificeDiameter}
            onChange={(e) => setOrificeDiameter(parseFloat(e.target.value))}
            className="w-full accent-amber-500 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>0.40 m (تنگ / سرعت بالا)</span>
            <span>1.10 m (طراحی پایه)</span>
            <span>1.80 m (تخلیه حداکثری)</span>
          </div>
        </div>

        {/* Primary Rotor RPM & MPPT Toggle */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              {isFa ? 'سرعت دورانی ژنراتور PMG اولیه (S-4 RPM)' : 'S-4 PMG Generator Speed (RPM)'}
              <button
                onClick={() => setAutoMppt(!autoMppt)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors ${
                  autoMppt
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400'
                    : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                }`}
              >
                {autoMppt ? 'AI MPPT Active' : 'Manual RPM'}
              </button>
            </span>
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
              {primaryRpm.toFixed(1)} RPM
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="120"
            step="1"
            value={primaryRpm}
            disabled={autoMppt}
            onChange={(e) => setPrimaryRpm(parseFloat(e.target.value))}
            className={`w-full accent-emerald-500 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg ${
              autoMppt ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
            }`}
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>10 RPM</span>
            <span>65 RPM (بهینه دبی نرمال)</span>
            <span>120 RPM</span>
          </div>
        </div>
      </div>

      {/* 4. TOGGLES & AUTOMATION CONTROLS (Invention 2 & Invention 3) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        {/* S-5 Secondary Rotor Deployment */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {isFa ? 'روتور ثانویه پایین‌دست S-5' : 'S-5 Downstream Swirl Rotor'}
              </span>
              <span className={`w-2.5 h-2.5 rounded-full ${secondaryDeployed ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              {isFa
                ? 'استقرار در کانال خروجی جهت جذب گشتاور چرخشی پسا (+۱۲ تا ۱۸٪ توان).'
                : 'Extract residual angular swirl momentum from tailrace flow.'}
            </p>
          </div>
          <button
            onClick={() => setSecondaryDeployed(!secondaryDeployed)}
            className={`mt-3 w-full py-2 rounded-xl text-xs font-bold transition-colors ${
              secondaryDeployed
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200'
            }`}
          >
            {secondaryDeployed
              ? (isFa ? 'مستقر و فعال (Engaged)' : 'Deployed & Engaged')
              : (isFa ? 'جمع‌شده (Retracted)' : 'Retracted')}
          </button>
        </div>

        {/* Sediment Purge Trigger (Invention 2) */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-amber-500" />
                {isFa ? 'شست‌وشوی خودکار رسوب' : 'Sediment Purge Valve'}
              </span>
              <span className={`w-2.5 h-2.5 rounded-full ${sedimentPurgeActive ? 'bg-amber-500 animate-ping' : 'bg-slate-400'}`}></span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              {isFa
                ? 'تخلیه گرانشی بار بستر محیطی شیار مارپیچ ۳–۸ درجه با کمترین افت تراز آب.'
                : 'Spiral groove 3°–8° bedload purge through gravity valve.'}
            </p>
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={triggerSedimentPurge}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-colors ${
                sedimentPurgeActive
                  ? 'bg-amber-500 text-white'
                  : 'bg-amber-100 hover:bg-amber-200 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300'
              }`}
            >
              {isFa ? 'تخلیه دستی (Flush)' : 'Manual Flush'}
            </button>
            <button
              onClick={() => setAutoPurgeEnabled(!autoPurgeEnabled)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                autoPurgeEnabled
                  ? 'bg-primary text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
              title={isFa ? 'فعال‌سازی تخلیه خودکار بر مبنای سنسور کدورت' : 'Auto purge on turbidity / dP trigger'}
            >
              {autoPurgeEnabled ? (isFa ? 'خودکار: روشن' : 'Auto: ON') : (isFa ? 'خودکار: خاموش' : 'Auto: OFF')}
            </button>
          </div>
        </div>

        {/* Fish & Ecological Bypass Safety Index */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                {isFa ? 'شاخص عبور ایمن ماهیان' : 'Fish Passage Index'}
              </span>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                98.4% Safe
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              {isFa
                ? 'فشار کمینه بدون برش مکانیکی؛ گذر آرام از میان پره‌ها و سرریز سطحی.'
                : 'Zero cavitation shear zones; non-traumatic fish safe design.'}
            </p>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '98.4%' }}></div>
            </div>
            <span className="text-[10px] font-mono text-slate-500 font-bold">IEC 62600-200</span>
          </div>
        </div>
      </div>
    </div>
  );
};
