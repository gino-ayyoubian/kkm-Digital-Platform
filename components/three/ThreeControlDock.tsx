import * as React from 'react';
import { 
  Layers, 
  Eye, 
  RotateCw, 
  Zap, 
  Thermometer, 
  Maximize2, 
  ChevronDown, 
  ChevronUp, 
  Box, 
  Activity, 
  ShieldCheck,
  Compass,
  Sliders
} from 'lucide-react';
import { useLanguage } from '../../LanguageContext';

export interface ThreeSceneControls {
  showSubsurface: boolean;
  showSurfaceIsland: boolean;
  showFluidParticles: boolean;
  showWireframe: boolean;
  explodedOffset: number; // 0 to 1
  flowSpeedMultiplier: number; // 0.5 to 2.5
  activeCameraPreset: 'isometric' | 'subsurface' | 'turbine' | 'topDown';
  activeComponentInfo: string | null;
}

interface ThreeControlDockProps {
  controls: ThreeSceneControls;
  onChangeControls: (updater: (prev: ThreeSceneControls) => ThreeSceneControls) => void;
  onResetCamera: () => void;
  onSelectPreset: (preset: 'isometric' | 'subsurface' | 'turbine' | 'topDown') => void;
}

export const ThreeControlDock: React.FC<ThreeControlDockProps> = ({
  controls,
  onChangeControls,
  onResetCamera,
  onSelectPreset,
}) => {
  const { isFa } = useLanguage();
  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState<'layers' | 'kinematics' | 'telemetry'>('layers');

  return (
    <aside 
      aria-label={isFa ? 'کنترل‌های تعاملی مدل سه‌بعدی' : '3D Model Interactive Controls'}
      className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-4xl transition-transform duration-300 pointer-events-auto"
      style={{
        transform: isCollapsed 
          ? 'translate(-50%, calc(100% - 38px))' 
          : 'translate(-50%, 0)',
      }}
    >
      {/* Collapse/Expand Dock Toggle */}
      <div className="flex justify-center -mb-px">
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-t-xl bg-slate-900/95 border-t border-x border-cyan-500/40 text-cyan-300 text-xs font-semibold shadow-lg hover:text-white transition-colors cursor-pointer select-none"
          title={isCollapsed ? (isFa ? 'نمایش کنترل‌های ۳ بعدی' : 'Show 3D Controls') : (isFa ? 'حالت سینما / تمام صفحه' : 'Cinema / Zen View')}
        >
          {isCollapsed ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" />
              <span>{isFa ? 'کنترل‌های سه‌بعدی دیجیتال توئین' : '3D Digital Twin Controls'}</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" />
              <span>{isFa ? 'حالت سینما (بستن پنل)' : 'Cinema Mode (Hide Dock)'}</span>
            </>
          )}
        </button>
      </div>

      {/* Main Dock Container - Solid Dark / Cyber Industrial backing (No backdrop-filter over WebGL) */}
      <div className="bg-slate-950/95 border border-cyan-500/30 rounded-2xl p-3 sm:p-4 shadow-2xl shadow-cyan-950/40 text-slate-200">
        
        {/* Top Control Bar: Tabs & Quick Presets */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-800">
          
          {/* Functional Navigation Tabs */}
          <div className="flex items-center gap-1 p-0.5 bg-slate-900 rounded-lg border border-slate-800">
            <button
              type="button"
              onClick={() => setActiveTab('layers')}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'layers' 
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isFa ? 'لایه‌ها و برش‌ها' : 'Layers & Slices'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('kinematics')}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'kinematics' 
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{isFa ? 'دینامیک سیال' : 'Fluid Kinematics'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('telemetry')}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'telemetry' 
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>{isFa ? 'تله‌متری مهندسی' : 'Engineering Telemetry'}</span>
            </button>
          </div>

          {/* Camera View Angle Presets */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-mono text-slate-400 me-1 hidden sm:inline">
              {isFa ? 'دیدگاه دوربین:' : 'Camera:'}
            </span>
            
            <button
              type="button"
              onClick={() => onSelectPreset('isometric')}
              className={`px-2.5 py-1 text-xs font-mono font-medium rounded-md border transition-colors ${
                controls.activeCameraPreset === 'isometric'
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-500'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
              title={isFa ? 'نمای ایزومتریک استاندارد' : 'Isometric Power Island View'}
            >
              ISO
            </button>

            <button
              type="button"
              onClick={() => onSelectPreset('subsurface')}
              className={`px-2.5 py-1 text-xs font-mono font-medium rounded-md border transition-colors ${
                controls.activeCameraPreset === 'subsurface'
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-500'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
              title={isFa ? 'چاه عمیق و مخزن ژئوترمال' : 'Subsurface Deep Loop View'}
            >
              DEEP
            </button>

            <button
              type="button"
              onClick={() => onSelectPreset('turbine')}
              className={`px-2.5 py-1 text-xs font-mono font-medium rounded-md border transition-colors ${
                controls.activeCameraPreset === 'turbine'
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-500'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
              title={isFa ? 'سالن توربین و تبادل حرارت سطحی' : 'Turbine Hall & Heat Exchangers'}
            >
              TURBINE
            </button>

            <button
              type="button"
              onClick={() => onSelectPreset('topDown')}
              className={`px-2.5 py-1 text-xs font-mono font-medium rounded-md border transition-colors ${
                controls.activeCameraPreset === 'topDown'
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-500'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
              title={isFa ? 'دید از بالا به پایین' : 'Top-Down Architectural Layout'}
            >
              TOP
            </button>

            <button
              type="button"
              onClick={onResetCamera}
              className="p-1.5 text-slate-400 hover:text-cyan-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-md transition-colors"
              title={isFa ? 'بازنشانی زاویه پیش‌فرض' : 'Reset Camera Angle'}
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tab 1: Layers & Exploded View Slices */}
        {activeTab === 'layers' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 items-center">
            
            {/* Toggle: Subterranean Well */}
            <button
              type="button"
              onClick={() => onChangeControls(prev => ({ ...prev, showSubsurface: !prev.showSubsurface }))}
              className={`flex items-center justify-between p-2.5 rounded-xl border transition-colors ${
                controls.showSubsurface 
                  ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-200' 
                  : 'bg-slate-900/60 border-slate-800 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-medium">{isFa ? 'مخزن زیرسطحی' : 'Subsurface Well'}</span>
              </div>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800">
                {controls.showSubsurface ? (isFa ? 'فعال' : 'ON') : (isFa ? 'خاموش' : 'OFF')}
              </span>
            </button>

            {/* Toggle: Surface Power Island */}
            <button
              type="button"
              onClick={() => onChangeControls(prev => ({ ...prev, showSurfaceIsland: !prev.showSurfaceIsland }))}
              className={`flex items-center justify-between p-2.5 rounded-xl border transition-colors ${
                controls.showSurfaceIsland 
                  ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-200' 
                  : 'bg-slate-900/60 border-slate-800 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-medium">{isFa ? 'نیروگاه سطحی' : 'Surface Island'}</span>
              </div>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800">
                {controls.showSurfaceIsland ? (isFa ? 'فعال' : 'ON') : (isFa ? 'خاموش' : 'OFF')}
              </span>
            </button>

            {/* Toggle: Wireframe Blueprint Mode */}
            <button
              type="button"
              onClick={() => onChangeControls(prev => ({ ...prev, showWireframe: !prev.showWireframe }))}
              className={`flex items-center justify-between p-2.5 rounded-xl border transition-colors ${
                controls.showWireframe 
                  ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-200' 
                  : 'bg-slate-900/60 border-slate-800 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-2">
                <Box className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-medium">{isFa ? 'طرح بلوپرینت / سیمی' : 'Wireframe Mode'}</span>
              </div>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800">
                {controls.showWireframe ? (isFa ? 'فعال' : 'ON') : (isFa ? 'خاموش' : 'OFF')}
              </span>
            </button>

            {/* Exploded View Slider */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-2.5">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-400">{isFa ? 'تفکیک انفجاری لایه‌ها' : 'Exploded View'}</span>
                <span className="font-mono text-cyan-400 font-bold">{Math.round(controls.explodedOffset * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={controls.explodedOffset}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  onChangeControls(prev => ({ ...prev, explodedOffset: val }));
                }}
                className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Tab 2: Fluid Kinematics & Particle Loop */}
        {activeTab === 'kinematics' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            {/* Particle Loop Toggle */}
            <button
              type="button"
              onClick={() => onChangeControls(prev => ({ ...prev, showFluidParticles: !prev.showFluidParticles }))}
              className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
                controls.showFluidParticles 
                  ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-200' 
                  : 'bg-slate-900/60 border-slate-800 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Activity className="w-4 h-4 text-cyan-400" />
                <div>
                  <span className="text-xs font-semibold block">{isFa ? 'جریان نانوسیال مغناطیسی sCO2' : 'Supercritical Fluid Flow'}</span>
                  <span className="text-[10px] text-slate-400">{isFa ? 'شبیه‌سازی ذرات حرارتی در مدار بسته' : 'Kinetic particle simulation in closed loop'}</span>
                </div>
              </div>
              <span className="text-[10px] font-mono uppercase px-2 py-1 rounded bg-slate-950 border border-slate-800">
                {controls.showFluidParticles ? (isFa ? 'پویا' : 'ACTIVE') : (isFa ? 'متوقف' : 'PAUSED')}
              </span>
            </button>

            {/* Velocity Multiplier */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="text-slate-300 font-medium">{isFa ? 'سرعت گردش سیال کاری (m/s)' : 'Flow Velocity Multiplier'}</span>
                <span className="font-mono text-cyan-400 font-bold">{controls.flowSpeedMultiplier.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.1"
                value={controls.flowSpeedMultiplier}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  onChangeControls(prev => ({ ...prev, flowSpeedMultiplier: val }));
                }}
                className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>0.5x (آرام)</span>
                <span>1.0x (نامی)</span>
                <span>2.5x (بیشینه)</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Engineering Telemetry & Specs */}
        {activeTab === 'telemetry' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2.5">
              <span className="text-[10px] font-mono text-slate-400 block">{isFa ? 'عمق مخزن حرارتی' : 'Thermal Reservoir Depth'}</span>
              <span className="text-sm font-mono font-bold text-cyan-300 mt-0.5 block tabular-nums">3,850 m</span>
              <span className="text-[9px] text-slate-400 mt-0.5 block">{isFa ? 'فشار: ۴۲۰ بار' : 'Pressure: 420 Bar'}</span>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2.5">
              <span className="text-[10px] font-mono text-slate-400 block">{isFa ? 'دمای سیال برگشتی' : 'Loop Fluid Delta-T'}</span>
              <span className="text-sm font-mono font-bold text-amber-400 mt-0.5 block tabular-nums">224 °C</span>
              <span className="text-[9px] text-slate-400 mt-0.5 block">{isFa ? 'سیال sCO2 هیبریدی' : 'Pure sCO2 Fluid'}</span>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2.5">
              <span className="text-[10px] font-mono text-slate-400 block">{isFa ? 'توان الکتریکی نامی' : 'Net Power Output'}</span>
              <span className="text-sm font-mono font-bold text-emerald-400 mt-0.5 block tabular-nums">48.5 MWe</span>
              <span className="text-[9px] text-slate-400 mt-0.5 block">{isFa ? 'راندمان ORC: ۳۱٪' : 'ORC Efficiency: 31%'}</span>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2.5">
              <span className="text-[10px] font-mono text-slate-400 block">{isFa ? 'پیکربندی چاه' : 'Well Architecture'}</span>
              <span className="text-sm font-mono font-bold text-slate-200 mt-0.5 block">Closed-Loop U</span>
              <span className="text-[9px] text-cyan-400 mt-0.5 block">{isFa ? 'بدون فرکیگ یا هدررفت' : 'Zero Fracking / Leakage'}</span>
            </div>
          </div>
        )}

      </div>
    </aside>
  );
};
