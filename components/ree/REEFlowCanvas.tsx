import React, { useRef, useEffect } from 'react';

export type FlowRegime = 'VORTEX' | 'HYDROKINETIC' | 'HYBRID';

interface REEFlowCanvasProps {
  regime: FlowRegime;
  flowRate: number; // m^3/s
  vaneAngle: number; // 0 to 90 degrees
  orificeDiameter: number; // 0.4 to 1.8 m
  primaryRpm: number;
  secondaryDeployed: boolean;
  sedimentPurgeActive: boolean;
  isPaused: boolean;
  theme?: 'dark' | 'light';
  isFa: boolean;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  angle: number;
  speed: number;
  distance: number;
  type: 'water' | 'sediment' | 'debris';
  alpha: number;
}

export const REEFlowCanvas: React.FC<REEFlowCanvasProps> = ({
  regime,
  flowRate,
  vaneAngle,
  orificeDiameter,
  primaryRpm,
  secondaryDeployed,
  sedimentPurgeActive,
  isPaused,
  theme = 'dark',
  isFa,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const rotorAngleRef = useRef<number>(0);
  const secondaryRotorAngleRef = useRef<number>(0);

  // Initialize particles
  useEffect(() => {
    const p: Particle[] = [];
    const count = 180;
    for (let i = 0; i < count; i++) {
      const isSediment = i % 7 === 0;
      const isDebris = i % 19 === 0;
      p.push({
        x: Math.random() * 800,
        y: Math.random() * 500,
        radius: isDebris ? 3.5 : isSediment ? 2.0 : 1.6,
        angle: Math.random() * Math.PI * 2,
        speed: 0.8 + Math.random() * 1.5,
        distance: 20 + Math.random() * 120,
        type: isDebris ? 'debris' : isSediment ? 'sediment' : 'water',
        alpha: 0.4 + Math.random() * 0.6,
      });
    }
    particlesRef.current = p;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      const width = canvas.width;
      const height = canvas.height;

      // Dark / light mode backgrounds
      const isDark = theme === 'dark';
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      if (isDark) {
        bgGrad.addColorStop(0, '#090d16');
        bgGrad.addColorStop(0.5, '#0b1329');
        bgGrad.addColorStop(1, '#050914');
      } else {
        bgGrad.addColorStop(0, '#f1f5f9');
        bgGrad.addColorStop(0.5, '#e2e8f0');
        bgGrad.addColorStop(1, '#cbd5e1');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // System Layout Coordinates
      const basinCenterX = width * 0.42;
      const basinCenterY = height * 0.52;
      const basinRadius = Math.min(width, height) * 0.32;
      const outletRadius = (orificeDiameter / 2.0) * (basinRadius * 0.5);

      // 1. Draw Inflow Channel (Top Left to Basin)
      const inletWidth = 75;
      ctx.save();
      ctx.fillStyle = isDark ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.85)';
      ctx.strokeStyle = isDark ? '#1e293b' : '#94a3b8';
      ctx.lineWidth = 3;

      // Inlet Channel Path
      ctx.beginPath();
      ctx.moveTo(20, basinCenterY - basinRadius - inletWidth);
      ctx.lineTo(basinCenterX, basinCenterY - basinRadius - inletWidth);
      ctx.lineTo(basinCenterX + 20, basinCenterY - basinRadius);
      ctx.lineTo(20, basinCenterY - basinRadius);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Inlet Guide Vane (S-2)
      const vaneRad = (vaneAngle * Math.PI) / 180;
      const vaneX = basinCenterX - 60;
      const vaneY = basinCenterY - basinRadius - inletWidth / 2;
      const vaneLen = 42;

      ctx.beginPath();
      ctx.moveTo(vaneX, vaneY);
      ctx.lineTo(vaneX + Math.cos(vaneRad) * vaneLen, vaneY + Math.sin(vaneRad) * vaneLen);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Guide vane pivot dot
      ctx.beginPath();
      ctx.arc(vaneX, vaneY, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#0284c7';
      ctx.fill();

      // Rotary self-cleaning inlet screen (Invention 2)
      ctx.beginPath();
      ctx.ellipse(80, basinCenterY - basinRadius - inletWidth / 2, 10, inletWidth / 2 - 4, 0, 0, Math.PI * 2);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Floating debris weir bypass
      ctx.fillStyle = isDark ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.3)';
      ctx.fillRect(20, basinCenterY - basinRadius - inletWidth - 14, 120, 12);
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(20, basinCenterY - basinRadius - inletWidth - 14, 120, 12);

      ctx.restore();

      // 2. Draw Tailrace Channel (Basin right to exit)
      ctx.save();
      ctx.fillStyle = isDark ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.85)';
      ctx.strokeStyle = isDark ? '#1e293b' : '#94a3b8';
      ctx.lineWidth = 3;

      ctx.beginPath();
      ctx.moveTo(basinCenterX + basinRadius * 0.7, basinCenterY + basinRadius * 0.5);
      ctx.lineTo(width - 20, basinCenterY + basinRadius * 0.5);
      ctx.lineTo(width - 20, basinCenterY + basinRadius * 0.5 + inletWidth);
      ctx.lineTo(basinCenterX + basinRadius * 0.3, basinCenterY + basinRadius * 0.5 + inletWidth);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // 3. Draw Adaptive Basin (S-3)
      ctx.save();
      // Outer basin boundary
      const basinGrad = ctx.createRadialGradient(
        basinCenterX, basinCenterY, outletRadius,
        basinCenterX, basinCenterY, basinRadius
      );
      if (isDark) {
        basinGrad.addColorStop(0, '#0284c7');
        basinGrad.addColorStop(0.5, '#0369a1');
        basinGrad.addColorStop(0.85, '#075985');
        basinGrad.addColorStop(1, '#0c4a6e');
      } else {
        basinGrad.addColorStop(0, '#38bdf8');
        basinGrad.addColorStop(0.5, '#0ea5e9');
        basinGrad.addColorStop(0.85, '#0284c7');
        basinGrad.addColorStop(1, '#0369a1');
      }

      ctx.beginPath();
      ctx.arc(basinCenterX, basinCenterY, basinRadius, 0, Math.PI * 2);
      ctx.fillStyle = basinGrad;
      ctx.fill();
      ctx.lineWidth = 5;
      ctx.strokeStyle = isDark ? '#334155' : '#64748b';
      ctx.stroke();

      // Peripheral Bedload Spiral Grooves (Invention 2: 3°-8° inclination)
      ctx.save();
      ctx.strokeStyle = isDark ? 'rgba(245, 158, 11, 0.45)' : 'rgba(217, 119, 6, 0.6)';
      ctx.lineWidth = 2;
      for (let s = 0; s < 6; s++) {
        const startAng = (s * Math.PI) / 3 + (time * 0.0003);
        ctx.beginPath();
        for (let r = basinRadius - 6; r >= basinRadius * 0.65; r -= 4) {
          const theta = startAng + ((basinRadius - r) / basinRadius) * 1.8;
          const sx = basinCenterX + Math.cos(theta) * r;
          const sy = basinCenterY + Math.sin(theta) * r;
          if (r === basinRadius - 6) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.stroke();
      }
      ctx.restore();

      // Adaptive Floor Panels (S-3)
      if (regime === 'HYDROKINETIC') {
        // Floor retracted: show flat open channel grid
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.5)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 6]);
        for (let lx = basinCenterX - basinRadius * 0.7; lx <= basinCenterX + basinRadius * 0.7; lx += 24) {
          ctx.beginPath();
          ctx.moveTo(lx, basinCenterY - basinRadius * 0.7);
          ctx.lineTo(lx, basinCenterY + basinRadius * 0.7);
          ctx.stroke();
        }
        ctx.setLineDash([]);
      }

      // Variable Orifice Sleeve (Telescopic S-3)
      ctx.beginPath();
      ctx.arc(basinCenterX, basinCenterY, outletRadius, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? '#020617' : '#0f172a';
      ctx.fill();
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Air Core Funnel Center (Eye of the vortex)
      if (regime !== 'HYDROKINETIC') {
        const coreGrad = ctx.createRadialGradient(
          basinCenterX, basinCenterY, 0,
          basinCenterX, basinCenterY, outletRadius * 0.6
        );
        coreGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        coreGrad.addColorStop(0.3, 'rgba(56, 189, 248, 0.7)');
        coreGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(basinCenterX, basinCenterY, outletRadius * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      // 4. Update and Draw Fluid Particles
      if (!isPaused) {
        const speedMultiplier = (primaryRpm / 50.0) * (flowRate / 15.0);
        rotorAngleRef.current += (primaryRpm * (Math.PI / 30)) * dt;
        secondaryRotorAngleRef.current -= (primaryRpm * 0.85 * (Math.PI / 30)) * dt;

        particlesRef.current.forEach(p => {
          if (p.type === 'sediment') {
            // Migrates along spiral grooves toward the periphery and drops through purge conduit
            p.distance += 0.3 * speedMultiplier;
            p.angle += (p.speed * 0.035 * speedMultiplier) / (p.distance / 50);
            if (p.distance > basinRadius - 8) {
              p.distance = 25 + Math.random() * 50;
              p.angle = Math.random() * Math.PI * 2;
            }
          } else if (p.type === 'debris') {
            // Deflected by rotary screen
            p.x += 1.2 * speedMultiplier;
            if (p.x > 180) {
              p.x = 20;
              p.y = basinCenterY - basinRadius - inletWidth / 2 + (Math.random() * 30 - 15);
            }
          } else {
            // Water streamlines
            if (regime === 'HYDROKINETIC') {
              // Linear flow across basin
              p.x += 2.8 * speedMultiplier;
              if (p.x > width - 30) {
                p.x = 20;
                p.y = basinCenterY - basinRadius * 0.5 + Math.random() * basinRadius;
              }
            } else {
              // Swirling vortex flow
              p.distance -= 0.65 * speedMultiplier;
              // tangential velocity increases as radius decreases (free vortex: v_theta ~ 1/r)
              const angularVel = Math.min(0.2, (0.04 * speedMultiplier) * (basinRadius / Math.max(outletRadius * 0.8, p.distance)));
              p.angle += angularVel;
              if (p.distance <= outletRadius * 0.4) {
                // exits or respawns at inlet
                p.distance = basinRadius * 0.95;
                p.angle = Math.PI * 1.5 + (Math.random() * 0.4 - 0.2);
              }
            }
          }
        });
      }

      // Draw Particles
      particlesRef.current.forEach(p => {
        let px = 0;
        let py = 0;

        if (regime === 'HYDROKINETIC' && p.type === 'water') {
          px = p.x;
          py = p.y;
        } else if (p.type === 'debris') {
          px = p.x;
          py = p.y;
        } else {
          px = basinCenterX + Math.cos(p.angle) * p.distance;
          py = basinCenterY + Math.sin(p.angle) * p.distance;
        }

        ctx.beginPath();
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        if (p.type === 'sediment') {
          ctx.fillStyle = `rgba(245, 158, 11, ${p.alpha})`; // Amber sediment
        } else if (p.type === 'debris') {
          ctx.fillStyle = `rgba(239, 68, 68, ${p.alpha})`; // Red/orange debris
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.85})`; // Water bubble / tracer
        }
        ctx.fill();
      });

      // 5. Draw Primary Rotor (S-4) in center
      ctx.save();
      ctx.translate(basinCenterX, basinCenterY);
      ctx.rotate(rotorAngleRef.current);

      const bladeCount = 4;
      const rotorRadius = Math.max(28, outletRadius * 1.15);
      for (let b = 0; b < bladeCount; b++) {
        const bladeAng = (b * Math.PI * 2) / bladeCount;
        ctx.save();
        ctx.rotate(bladeAng);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(rotorRadius * 0.4, 12, rotorRadius * 0.8, 8, rotorRadius, 0);
        ctx.bezierCurveTo(rotorRadius * 0.7, -10, rotorRadius * 0.3, -8, 0, 0);
        ctx.fillStyle = isDark ? '#38bdf8' : '#0284c7';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();
      }

      // Hub & PMG Center
      ctx.beginPath();
      ctx.arc(0, 0, 14, 0, Math.PI * 2);
      ctx.fillStyle = '#0f172a';
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.fill();
      ctx.restore();

      // 6. Draw Downstream Secondary Rotor (S-5)
      const secX = width * 0.82;
      const secY = basinCenterY + basinRadius * 0.5 + inletWidth / 2;

      ctx.save();
      if (secondaryDeployed) {
        ctx.translate(secX, secY);
        ctx.rotate(secondaryRotorAngleRef.current);

        const secBladeCount = 3;
        const secRadius = 32;
        for (let sb = 0; sb < secBladeCount; sb++) {
          const sAng = (sb * Math.PI * 2) / secBladeCount;
          ctx.save();
          ctx.rotate(sAng);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(secRadius * 0.5, 8, secRadius * 0.8, 4, secRadius, 0);
          ctx.bezierCurveTo(secRadius * 0.7, -6, secRadius * 0.4, -4, 0, 0);
          ctx.fillStyle = '#10b981';
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.2;
          ctx.stroke();
          ctx.restore();
        }

        ctx.beginPath();
        ctx.arc(0, 0, 10, 0, Math.PI * 2);
        ctx.fillStyle = '#064e3b';
        ctx.fill();
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2.5;
        ctx.stroke();
      } else {
        // Retracted indicator
        ctx.beginPath();
        ctx.arc(secX, secY, 18, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = 'rgba(148, 163, 184, 0.6)';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('S-5 RETRACTED', secX, secY + 3);
      }
      ctx.restore();

      // 7. Sediment Purge Active Conduit (Invention 2)
      if (sedimentPurgeActive) {
        ctx.save();
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(basinCenterX, basinCenterY, basinRadius + 6, Math.PI * 0.2, Math.PI * 0.5);
        ctx.stroke();

        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText(isFa ? 'تخلیه فعال رسوب (Purge Active)' : 'SEDIMENT PURGE ACTIVE', basinCenterX + basinRadius * 0.3, basinCenterY + basinRadius + 22);
        ctx.restore();
      }

      // 8. Visual HUD Labels
      ctx.save();
      ctx.fillStyle = isDark ? '#f8fafc' : '#0f172a';
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'left';

      // Title & Subsystem Badges
      ctx.fillText(
        isFa ? 'ورودی مماسی و پره‌های S-2' : 'S-2 TANGENTIAL INLET',
        30,
        basinCenterY - basinRadius - inletWidth - 25
      );
      ctx.fillText(
        isFa ? 'حوضچه تطبیقی گردابه‌ای S-3' : 'S-3 ADAPTIVE BASIN',
        basinCenterX - 65,
        basinCenterY - basinRadius - 12
      );
      ctx.fillText(
        isFa ? 'روتور عمودی اولیه S-4' : 'S-4 PMG PRIMARY ROTOR',
        basinCenterX - 65,
        basinCenterY + basinRadius + 24
      );
      if (secondaryDeployed) {
        ctx.fillText(
          isFa ? 'روتور ثانویه S-5 فعال' : 'S-5 SECONDARY ROTOR (DEPLOYED)',
          secX - 80,
          secY + 45
        );
      }

      ctx.restore();

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [regime, flowRate, vaneAngle, orificeDiameter, primaryRpm, secondaryDeployed, sedimentPurgeActive, isPaused, theme, isFa]);

  return (
    <div className="relative w-full h-[420px] md:h-[500px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 shadow-inner">
      <canvas
        ref={canvasRef}
        width={920}
        height={500}
        className="w-full h-full object-cover block"
      />

      {/* Mode & Telemetry HUD Overlay in Top Right */}
      <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 bg-slate-900/85 backdrop-blur-md px-4 py-3 rounded-xl border border-slate-700/70 text-white shadow-lg space-y-1.5 text-xs font-mono">
        <div className="flex items-center justify-between gap-4">
          <span className="text-slate-400">{isFa ? 'رژیم فعال:' : 'Active Regime:'}</span>
          <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
            regime === 'VORTEX' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' :
            regime === 'HYDROKINETIC' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
            'bg-purple-500/20 text-purple-400 border border-purple-500/40'
          }`}>
            {regime}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-slate-400">{isFa ? 'گردش ورتکس Γ:' : 'Circulation Γ:'}</span>
          <span className="text-cyan-300 font-bold">
            {regime === 'HYDROKINETIC' ? '0.00 m²/s' : `${(flowRate * 0.42 * Math.sin((vaneAngle * Math.PI) / 180)).toFixed(2)} m²/s`}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-slate-400">{isFa ? 'قطر خروجی D_out:' : 'Orifice D_out:'}</span>
          <span className="text-amber-300 font-bold">{orificeDiameter.toFixed(2)} m</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-slate-400">{isFa ? 'دور روتور S-4:' : 'Rotor S-4 RPM:'}</span>
          <span className="text-emerald-300 font-bold">{primaryRpm.toFixed(1)} RPM</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-slate-400">{isFa ? 'روتور ثانویه S-5:' : 'S-5 Rotor:'}</span>
          <span className={secondaryDeployed ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
            {secondaryDeployed ? (isFa ? 'درگیر (+15% پسا)' : 'ENGAGED (+15%)') : (isFa ? 'جمع‌شده' : 'RETRACTED')}
          </span>
        </div>
      </div>

      {/* Legend Badge in Bottom Left */}
      <div className="absolute bottom-3 left-3 rtl:left-auto rtl:right-3 flex flex-wrap gap-2 text-[11px] font-sans">
        <span className="bg-slate-900/80 backdrop-blur px-2.5 py-1 rounded-md text-slate-300 border border-slate-700/50 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          {isFa ? 'خطوط جریان آب' : 'Water Streamlines'}
        </span>
        <span className="bg-slate-900/80 backdrop-blur px-2.5 py-1 rounded-md text-slate-300 border border-slate-700/50 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          {isFa ? 'رسوبات بار بستر (حلزونی)' : 'Bedload Sediment'}
        </span>
        <span className="bg-slate-900/80 backdrop-blur px-2.5 py-1 rounded-md text-slate-300 border border-slate-700/50 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-400"></span>
          {isFa ? 'آشغال‌های شناور (سرریز)' : 'Surface Debris'}
        </span>
      </div>
    </div>
  );
};
