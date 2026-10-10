import * as React from 'react';
import { Page } from '../types';
import { useLanguage } from '../LanguageContext';
import { Helmet } from 'react-helmet-async';
import { RuralHero } from '../components/rural/RuralHero';
import { RuralModelDiagram } from '../components/rural/RuralModelDiagram';
import { RuralPillars } from '../components/rural/RuralPillars';
import { RuralDedicatedDomains } from '../components/rural/RuralDedicatedDomains';
import { EnergyVillageSection } from '../components/rural/EnergyVillageSection';
import { InvestmentGovernanceSection } from '../components/rural/InvestmentGovernanceSection';
import { PilotIntakeForm } from '../components/rural/PilotIntakeForm';
import { RuralProjectExplorer } from '../components/rural/RuralProjectExplorer';
import { ExhibitionDossierSection } from '../components/rural/ExhibitionDossierSection';
import { RuralTransformationIntelligenceSection } from '../components/rural/RuralTransformationIntelligenceSection';

interface RuralDevelopmentPageProps {
  setPage: (page: Page) => void;
}

const RuralDevelopmentPage: React.FC<RuralDevelopmentPageProps> = ({ setPage }) => {
  const { language, direction } = useLanguage();
  const isFa = language === 'FA';

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full bg-slate-950 text-slate-100 min-h-screen selection:bg-emerald-500 selection:text-slate-950" dir={direction}>
      
      {/* SEO & Meta Tags */}
      <Helmet>
        <title>
          {isFa 
            ? 'پلتفرم توسعه روستایی و عشایری KKM | راهکارهای یکپارچه فناوری، مهندسی و سرمایه‌گذاری' 
            : 'KKM Rural & Nomadic Development Platform | Integrated Technology & Investment'}
        </title>
        <meta 
          name="description" 
          content={isFa 
            ? 'پلتفرم راهبردی KKM برای توسعه پایدار روستایی و عشایری با یکپارچه‌سازی انرژی‌های تجدیدپذیر، امنیت آب، کشاورزی مولد، صنایع فرآوری و تأمین مالی پروژه‌محور.' 
            : 'KKM Rural & Nomadic Development Platform: Integrated technology, engineering and investment solutions for sustainable rural and nomadic prosperity.'} 
        />
        <link rel="canonical" href="https://www.kkm-intl.com/rural-development" />
        <meta property="og:title" content={isFa ? 'پلتفرم توسعه روستایی و عشایری KKM' : 'KKM Rural & Nomadic Development Platform'} />
        <meta property="og:description" content={isFa ? 'راهکارهای یکپارچه فناوری، مهندسی و سرمایه‌گذاری برای توسعه پایدار روستایی و عشایری' : 'Integrated Technology, Engineering and Investment Solutions for Sustainable Rural and Nomadic Development'} />
        <meta property="og:url" content="https://www.kkm-intl.com/rural-development" />
      </Helmet>

      {/* Sub-navigation Sticky Anchor Bar */}
      <div className="sticky top-16 z-30 bg-slate-950/85 backdrop-blur-md border-b border-slate-800 text-xs py-2 px-4 shadow-sm overflow-x-auto">
        <div className="container mx-auto flex items-center justify-between gap-4 max-w-6xl">
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <span className="font-bold text-emerald-400 font-mono tracking-wider hidden sm:inline">
              KKM RURAL PLATFORM
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0 overflow-x-auto py-1">
            <button
              onClick={() => scrollToSection('rural-transformation-intelligence')}
              className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 transition-colors whitespace-nowrap cursor-pointer font-bold"
            >
              {isFa ? 'رصدخانه و آینده‌پژوهی روستایی' : 'Foresight & 4 Pillars'}
            </button>
            <button
              onClick={() => scrollToSection('integrated-model')}
              className="px-2.5 py-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer"
            >
              {isFa ? 'مدل یکپارچه (۱۰ گام)' : '10-Stage Model'}
            </button>
            <button
              onClick={() => scrollToSection('rural-energy')}
              className="px-2.5 py-1 rounded-lg text-amber-300 hover:text-amber-200 hover:bg-amber-500/10 transition-colors whitespace-nowrap cursor-pointer"
            >
              {isFa ? 'انرژی پاک' : 'Energy'}
            </button>
            <button
              onClick={() => scrollToSection('rural-water')}
              className="px-2.5 py-1 rounded-lg text-sky-300 hover:text-sky-200 hover:bg-sky-500/10 transition-colors whitespace-nowrap cursor-pointer"
            >
              {isFa ? 'امنیت آب' : 'Water'}
            </button>
            <button
              onClick={() => scrollToSection('rural-infrastructure')}
              className="px-2.5 py-1 rounded-lg text-emerald-300 hover:text-emerald-200 hover:bg-emerald-500/10 transition-colors whitespace-nowrap cursor-pointer"
            >
              {isFa ? 'زیرساخت و زنجیره سرد' : 'Infrastructure'}
            </button>
            <button
              onClick={() => scrollToSection('rural-value-creation')}
              className="px-2.5 py-1 rounded-lg text-purple-300 hover:text-purple-200 hover:bg-purple-500/10 transition-colors whitespace-nowrap cursor-pointer"
            >
              {isFa ? 'خلق ارزش بومی' : 'Value Creation'}
            </button>
            <button
              onClick={() => scrollToSection('rural-pillars')}
              className="px-2.5 py-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer"
            >
              {isFa ? '۶ ستون اصلی' : '6 Core Pillars'}
            </button>
            <button
              onClick={() => scrollToSection('energy-village')}
              className="px-2.5 py-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer"
            >
              {isFa ? 'دهکده انرژی و GMEL' : 'Energy Village & GMEL'}
            </button>
            <button
              onClick={() => scrollToSection('investment-governance')}
              className="px-2.5 py-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer"
            >
              {isFa ? 'سرمایه‌گذاری بانکی' : 'Bankable Investment'}
            </button>
            <button
              onClick={() => scrollToSection('pilot-intake-form')}
              className="px-3 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 transition-colors whitespace-nowrap cursor-pointer font-bold"
            >
              {isFa ? 'ثبت پایلوت' : 'Propose Pilot'}
            </button>
            <button
              onClick={() => scrollToSection('project-explorer')}
              className="px-2.5 py-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer"
            >
              {isFa ? 'کاوشگر پروژه‌ها' : 'Project Types'}
            </button>
            <button
              onClick={() => scrollToSection('exhibition-hub')}
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-amber-300 hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer"
            >
              {isFa ? 'رویداد و مستندات' : 'Exhibition Dossier'}
            </button>
          </div>
        </div>
      </div>

      {/* 1. Hero Section (Architecture Specification 10.1, 10.2, 10.3) */}
      <RuralHero setPage={setPage} onScrollTo={scrollToSection} />

      {/* 1.5. Deep-Search Rural Transformation & Foresight Intelligence Observatory (4 Core Pillars & Scenario Simulation) */}
      <RuralTransformationIntelligenceSection />

      {/* 2. Integrated Rural Development Model (10-Stage Diagram 10.4, 10.5) */}
      <RuralModelDiagram />

      {/* 3. Dedicated Sections: Energy, Water, Infrastructure, and Local Value Creation */}
      <RuralDedicatedDomains 
        setPage={setPage} 
        onNavigatePilot={() => scrollToSection('pilot-intake-form')} 
      />

      {/* 4. Six Core Pillars & Agro-Livestock Value Chains (Sections 10.6, 10.7, 10.8, 10.9, 10.10) */}
      <div id="rural-pillars">
        <RuralPillars />
      </div>

      {/* 4. Productive Energy Village, GMEL, Water-Energy Nexus & Nomadic Systems (Sections 10.11 - 10.16) */}
      <div id="energy-village">
        <EnergyVillageSection />
      </div>

      {/* 5. Investment Architecture, 8-Stage Bankable Lifecycle & PPP Governance (Sections 10.19, 10.21) */}
      <InvestmentGovernanceSection onScrollTo={scrollToSection} />

      {/* 6. Pilot Programs & 7-Stage Intake Form (Sections 10.17, 10.18) */}
      <PilotIntakeForm />

      {/* 7. Rural Project Types Explorer at Bottom of Page (Section 10.22) */}
      <RuralProjectExplorer onSelectForPilot={(title) => {
        scrollToSection('pilot-intake-form');
      }} />

      {/* 8. Exhibition Strategic Presence & Official Registration Copy Toolkit (Sections 10.24 - 10.27) */}
      <ExhibitionDossierSection setPage={setPage} onScrollTo={scrollToSection} />

    </div>
  );
};

export default RuralDevelopmentPage;
