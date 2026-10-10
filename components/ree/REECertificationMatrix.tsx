import React, { useState } from 'react';
import { Award, FileText, CheckCircle2, ShieldCheck, Download, ExternalLink, ChevronRight, Layers } from 'lucide-react';

interface REECertificationMatrixProps {
  isFa: boolean;
}

export const REECertificationMatrix: React.FC<REECertificationMatrixProps> = ({ isFa }) => {
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const standards = [
    {
      code: 'IEC 62600-100',
      title: isFa ? 'ارزیابی توان و عملکرد الکتریکی توربین‌های انرژی رودخانه‌ای' : 'Marine & River Energy - Electricity Producing Turbines Power Assessment',
      scope: 'Standardized measurement of power curve, electrical output, and water current velocity profiles.',
      status: 'Fully Compliant Protocol',
      scopeFa: 'اندازه‌گیری استاندارد منحنی توان، خروجی الکتریکی و پروفایل سرعت جریان آب.'
    },
    {
      code: 'IEC 62600-200',
      title: isFa ? 'الزامات طراحی سامانه‌های هیدروکینتیکی و جریان آزاد' : 'Design Requirements for Hydrokinetic Converters in River Channels',
      scope: 'Structural design, blade fatigue life under turbulent river flow, and flood surge resistance.',
      status: 'Safety Baseline Certified',
      scopeFa: 'طراحی سازه‌ای، طول عمر خستگی پره‌ها در جریان مغشوش رودخانه‌ای و مقاومت در برابر سیلاب.'
    },
    {
      code: 'IEC 61400-22 / ISO 19011',
      title: isFa ? 'تست انطباق و بازرسی فنی ژنراتورهای الکترومکانیکی' : 'Conformity Testing & Technical Audit for Submersible PMG Generators',
      scope: 'Submersible sealing IP68, electromagnetic insulation class H, and harmonic distortion < 2.5%.',
      status: 'Factory Acceptance Ready',
      scopeFa: 'آب‌بندی غوطه‌ور IP68، کلاس عایق‌بندی مغناطیسی H و اعوجاج هارمونیکی کمتر از ۲.۵٪.'
    },
    {
      code: 'WFD 2000/60/EC & Eco-Flows',
      title: isFa ? 'دستورالعمل چارچوب آب اروپا و حفاظت از زیست‌بوم آبزیان' : 'EU Water Framework Directive & Non-Traumatic Fish Passage Safety',
      scope: 'Low blade tip speed (< 4.5 m/s), absence of rapid pressure drops, and non-traumatic fish bypass index > 98%.',
      status: 'Eco-Certified Architecture',
      scopeFa: 'سرعت نوک پره پایین، فقدان افت ناگهانی فشار و شاخص عبور بدون آسیب ماهیان بالای ۹۸٪.'
    }
  ];

  const testMatrix = [
    {
      phase: isFa ? 'فاز ۱: آزمون فلوم هیدرولیکی (مقیاس ۱:۵)' : 'Phase 1: Flume Hydrodynamic Testing (1:5 Scale)',
      facility: isFa ? 'فلوم آب دانشگاهی / آزمایشگاه دینامیک سیالات' : 'Hydraulic Wave-Current Flume Facility',
      instruments: '2D/3D Particle Image Velocimetry (PIV), Laser Doppler Velocimetry (LDV), Torque Transducer',
      deliverables: isFa ? 'کالیبراسیون زاویه پره‌ها، اعتبارسنجی شعاع هسته ورتکس و ضریب بازیافت توان روتور ثانویه' : 'Vane angle calibration, vortex core radius validation, and S-5 swirl recovery measurement',
      status: 'Validated (TRL 5)'
    },
    {
      phase: isFa ? 'فاز ۲: آزمون تزریق رسوب و سایش پره‌ها' : 'Phase 2: Sediment Injection & Purge Optimization',
      facility: isFa ? 'کانال رسوب‌گذاری با تزریق ماسه سیلیسی و رس' : 'Sediment Recirculation Flume (0.05 - 4.0 mm quartz injection)',
      instruments: 'Laser Turbidity Profiler, Acoustic Doppler Current Profiler (ADCP), Purge Valve dP Transmitters',
      deliverables: isFa ? 'تأیید زاویه شیار ۳–۸ درجه، تخلیه ۹۲٪ بار بستر بدون گرفتگی، و آزمون آشغال‌گیر خودفعال' : 'Confirmation of 3°–8° spiral slope, 92% bedload purge efficiency, and passive rotary screen verification',
      status: 'Validated (TRL 6)'
    },
    {
      phase: isFa ? 'فاز ۳: پایلوت صنعتی میدانی در رودخانه واقعی (۱:۱)' : 'Phase 3: Full-Scale Industrial River Pilot (1:1 Scale)',
      facility: isFa ? 'سایت پایلوت رودخانه کارون / ارس (ظرفیت ۲۵۰ کیلووات)' : 'Field Demonstration Site (250 kW nominal unit)',
      instruments: 'SCADA Telemetry, Smart Grid Sync Unit, Environmental Acoustic Fish Tag Receivers',
      deliverables: isFa ? 'بهره‌برداری مستمر ۶ ماهه در فصول کم‌آبی و سیلاب، اتصال به ریزشبکه روستایی، اخذ گواهی تجاری' : 'Continuous 6-month seasonal operation, rural microgrid tie-in, full commercial readiness',
      status: 'Pilot Ready (TRL 7-8)'
    }
  ];

  const handleExportDossier = () => {
    const report = {
      project: "KKM-REE (kkm-River Energy Ecosystem)",
      inventor: {
        en: "Gino Ayyoubain",
        fa: "سیدژینو ایوبیان"
      },
      patents: [
        { id: "PCT/IB2025/081944", title: "Modular Adaptive Vortex-Hydrokinetic River Energy System with Multi-Regime Flow Reconfiguration" },
        { id: "PCT/IB2025/081945", title: "Self-Cleaning Sediment & Debris Management Equipment for Low-Head Vortex Systems" },
        { id: "PCT/IB2025/081946", title: "AI-Driven Predictive Flow Control & Digital Twin for Distributed River Energy" }
      ],
      standardsCompliance: standards.map(s => ({ code: s.code, title: s.title, status: s.status })),
      experimentalMatrix: testMatrix,
      generatedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `KKM-REE-Engineering-Dossier-Gino-Ayyoubain-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xl md:text-2xl font-bold font-display text-slate-900 dark:text-white">
              {isFa
                ? 'ماتریس آزمون آزمایشگاهی، استانداردهای بین‌المللی و برنامه پایلوت'
                : 'Experimental Test Matrix, IEC Standards & Pilot Roadmap'}
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isFa
              ? 'انطباق با استانداردهای IEC 62600 و پروتکل‌های اعتبارسنجی تجاری TRL 4 تا TRL 8'
              : 'IEC 62600 compliance and rigorous TRL 4 through TRL 8 validation protocols'}
          </p>
        </div>

        <button
          onClick={handleExportDossier}
          className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors shadow-sm"
        >
          <Download className="w-4 h-4" />
          {downloadSuccess
            ? (isFa ? 'پرونده صادر شد!' : 'Dossier Exported!')
            : (isFa ? 'دانلود پرونده مشخصات مهندسی (JSON)' : 'Export Engineering Dossier')}
        </button>
      </div>

      {/* 1. International Standards Compliance */}
      <div className="space-y-4">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <Award className="w-4 h-4 text-primary" />
          {isFa ? 'استانداردهای بین‌المللی مرجع (Certification & Compliance):' : 'International Reference Standards:'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {standards.map((std, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="font-mono font-bold text-xs text-primary dark:text-cyan-400 px-2 py-0.5 rounded bg-primary/10">
                  {std.code}
                </span>
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {std.status}
                </span>
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                {isFa ? std.title : std.title}
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {isFa ? std.scopeFa : std.scope}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Experimental Test Matrix (Flume & Field Pilot) */}
      <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-500" />
          {isFa ? 'ماتریس مراحل آزمون آزمایشگاهی و میدانی (Experimental Test Matrix):' : 'Experimental Flume & Field Pilot Testing Matrix:'}
        </h3>
        <div className="space-y-3">
          {testMatrix.map((tm, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {tm.phase}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold">
                    {tm.status}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {isFa ? 'تجهیزات سنجش:' : 'Instrumentation:'}
                  </span>{' '}
                  {tm.instruments}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {isFa ? 'اهداف و نتایج:' : 'Deliverables:'}
                  </span>{' '}
                  {tm.deliverables}
                </p>
              </div>
              <div className="text-xs font-mono text-slate-500 shrink-0 self-start md:self-center">
                {tm.facility}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
