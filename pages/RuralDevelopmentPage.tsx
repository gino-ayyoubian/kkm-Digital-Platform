import * as React from 'react';
import { Page } from '../types';
import { useLanguage } from '../LanguageContext';
import { Helmet } from 'react-helmet-async';
import { RuralHero } from '../components/rural/RuralHero';
import { RuralModelDiagram } from '../components/rural/RuralModelDiagram';
import { RuralPillars } from '../components/rural/RuralPillars';
import { EnergyVillageSection } from '../components/rural/EnergyVillageSection';
import { PilotIntakeForm } from '../components/rural/PilotIntakeForm';
import { ExhibitionDossierSection } from '../components/rural/ExhibitionDossierSection';
import { 
  Layers, 
  Droplets, 
  Zap, 
  Sprout, 
  Calendar, 
  Send, 
  Compass, 
  FileText 
} from 'lucide-react';

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
        <meta property="og:title" content={isFa ? 'پلتفرم توسعه روستایی و عشایری KKM' : 'KKM Rural & Nomadic Development Platform'} />
        <meta property="og:description" content={isFa ? 'راهکارهای یکپارچه فناوری، مهندسی و سرمایه‌گذاری برای توسعه پایدار روستایی و عشایری' : 'Integrated Technology, Engineering and Investment Solutions for Sustainable Rural and Nomadic Development'} />
      </Helmet>

      {/* Sub-navigation Anchor Bar */}
      <div className="sticky top-16 z-30 bg-slate-950/85 backdrop-blur-md border-b border-slate-800 text-xs py-2 px-4 shadow-sm overflow-x-auto">
        <div className="container mx-auto flex items-center justify-between gap-4 max-w-6xl">
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <span className="font-bold text-emerald-400 font-mono tracking-wider hidden sm:inline">
              KKM RURAL HUB
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0 overflow-x-auto py-1">
            <button
              onClick={() => scrollToSection('integrated-model')}
              className="px-2.5 py-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer"
            >
              {isFa ? 'مدل یکپارچه (۱۰ گام)' : '10-Stage Model'}
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
              onClick={() => scrollToSection('pilot-intake-form')}
              className="px-3 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 transition-colors whitespace-nowrap cursor-pointer font-bold"
            >
              {isFa ? 'ثبت پایلوت' : 'Propose Pilot'}
            </button>
            <button
              onClick={() => scrollToSection('exhibition-banner')}
              className="px-3 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500/25 transition-colors whitespace-nowrap cursor-pointer font-bold"
            >
              {isFa ? 'نمایشگاه بین‌المللی' : '6th Exhibition'}
            </button>
          </div>
        </div>
      </div>

      {/* 1. Hero Section (Sections 10.1, 10.2, 10.3) */}
      <RuralHero setPage={setPage} onScrollTo={scrollToSection} />

      {/* 2. Integrated Model & Strategic Principle (Sections 10.4, 10.5) */}
      <RuralModelDiagram />

      {/* 3. Six Core Pillars & Value Chains (Sections 10.6, 10.7, 10.8, 10.9, 10.10) */}
      <div id="rural-pillars">
        <RuralPillars />
      </div>

      {/* 4. Energy Village, GMEL, Water-Energy Nexus, Productive Industries & Nomadic Tech (Sections 10.11, 10.12, 10.13, 10.14, 10.15, 10.16) */}
      <div id="energy-village">
        <EnergyVillageSection />
      </div>

      {/* 5. Pilot Program 7 Stages & Intake Form (Sections 10.17, 10.18) */}
      <PilotIntakeForm />

      {/* 6. Exhibition Connection, Institutional Partnership, Project Explorer, Dossier Toolkit & Final CTA (Sections 10.19, 10.20, 10.21, 10.22, 10.23, 10.24-10.27) */}
      <ExhibitionDossierSection setPage={setPage} onScrollTo={scrollToSection} />

    </div>
  );
};

export default RuralDevelopmentPage;
