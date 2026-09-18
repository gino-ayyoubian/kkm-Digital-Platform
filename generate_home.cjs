const fs = require('fs');

const content = `import * as React from 'react';
import { Page } from '../types';
import { useLanguage } from '../LanguageContext';
import { motion, Variants } from 'motion/react';
import { 
  ArrowRight, ChevronRight, MapPin, Zap, Droplets, Building2, Cpu, Globe, 
  ArrowDown, ShieldCheck, Factory, Lightbulb, Leaf, Activity, FileText,
  Search, Users, Link as LinkIcon
} from 'lucide-react';
import GlobalCTA from '../components/GlobalCTA';

interface HomePageProps {
  setPage: (page: Page) => void;
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const HomePage: React.FC<HomePageProps> = ({ setPage }) => {
  const { t, direction } = useLanguage();

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-900" dir={direction}>
      
      {/* 8.2 HERO */}
      <section className="relative min-h-[95vh] flex items-center pt-24 pb-16 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30">
          {/* Dynamic systems visualization placeholder (SVG) */}
          <svg viewBox="0 0 1000 1000" className="w-full h-full max-w-5xl opacity-50 text-secondary">
             <path d="M500 200 L700 800 L300 800 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
             <circle cx="500" cy="200" r="20" fill="currentColor" />
             <circle cx="700" cy="800" r="20" fill="currentColor" />
             <circle cx="300" cy="800" r="20" fill="currentColor" />
             <path d="M500 200 C 800 400, 200 600, 500 800" fill="none" stroke="#0ea5e9" strokeWidth="4" />
          </svg>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
              <motion.span variants={fadeUpVariants} className="text-sm font-bold tracking-widest text-secondary uppercase bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                KKM INTERNATIONAL GROUP
              </motion.span>
              <motion.h1 variants={fadeUpVariants} className="text-5xl md:text-7xl font-display font-extrabold text-white leading-tight tracking-tight mt-6">
                Technology. Engineering.<br/>Infrastructure. Innovation.
              </motion.h1>
              <motion.p variants={fadeUpVariants} className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed mt-6">
                We develop, integrate and commercialize technology-driven solutions across energy, water, infrastructure, industrial systems, AI and sustainable development.
              </motion.p>
              <motion.p variants={fadeUpVariants} className="text-lg text-secondary font-medium mt-4">
                From Evidence to Technology, Projects and Scalable Impact.
              </motion.p>
              <motion.div variants={fadeUpVariants} className="flex flex-wrap justify-center gap-4 pt-8">
                <button onClick={() => setPage(Page.CoreTechnologies)} className="px-8 py-4 bg-secondary text-primary-dark font-bold rounded-full hover:bg-secondary/90 transition-all flex items-center gap-2">
                  Explore KKM <ArrowRight className="w-5 h-5 rtl:rotate-180" />
                </button>
                <button onClick={() => setPage(Page.ProjectDevelopment)} className="px-8 py-4 bg-transparent text-white border-2 border-white/20 font-bold rounded-full hover:bg-white/10 transition-all">
                  Start a Project
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8.3 WHO WE ARE */}
      <section className="py-24 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-slate-900 dark:text-white mb-8">
              Engineering and Technology for Complex Challenges
            </h2>
            <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400">
              <p>KKM International Group, operating through Kimia Karan Mâd, is an engineering and technology group focused on developing, integrating and commercializing solutions for complex energy, infrastructure, water, industrial and digital challenges.</p>
              <p>Our approach connects engineering, research and development, intellectual property, pilot projects and commercialization into one continuous development pathway.</p>
              <p>We combine technology development with practical project execution to move promising ideas toward validated applications, scalable projects and long-term value creation.</p>
            </div>
            <button onClick={() => setPage(Page.AboutUs)} className="mt-10 px-8 py-4 bg-primary-dark dark:bg-slate-800 text-white font-bold rounded-full hover:bg-primary transition-all">
              About KKM
            </button>
          </div>
        </div>
      </section>

      {/* 8.4 TECHNOLOGY DOMAINS */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 dark:text-white mb-4">Our Technology & Engineering Domains</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">Multidisciplinary capabilities across critical infrastructure and technology sectors.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Energy', desc: 'Geothermal, renewable, distributed and integrated energy systems.', icon: Zap },
              { title: 'Water', desc: 'Water supply, treatment, desalination, storage and water-energy systems.', icon: Droplets },
              { title: 'Infrastructure', desc: 'Civil, industrial, utility and resilient infrastructure.', icon: Building2 },
              { title: 'Industrial Technology', desc: 'Engineering systems, materials, equipment and process technologies.', icon: Factory },
              { title: 'AI & Digital', desc: 'AI, IoT, monitoring, optimization and digital engineering.', icon: Cpu },
              { title: 'Agriculture & Productive Systems', desc: 'Technology-enabled agriculture, processing and local value chains.', icon: Leaf }
            ].map((domain, i) => (
              <div key={i} className="p-8 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                <domain.icon className="w-10 h-10 text-primary mb-6" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{domain.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{domain.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8.5 VALUE CHAIN */}
      <section className="py-24 bg-primary-dark text-white overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block">KKM DEVELOPMENT MODEL</span>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold">From Evidence to Impact</h2>
          </div>
          
          <div className="flex flex-nowrap overflow-x-auto pb-12 gap-4 snap-x items-center max-w-6xl mx-auto">
            {['EVIDENCE', 'TECHNOLOGY', 'IP', 'PROTOTYPE', 'PILOT', 'PRODUCT', 'PROJECT', 'PLATFORM', 'SCALE', 'INTERNATIONALIZATION'].map((step, i) => (
              <div key={i} className="flex items-center snap-center shrink-0">
                <div className="bg-white/10 backdrop-blur px-6 py-4 rounded-xl border border-white/20 font-bold whitespace-nowrap">
                  {step}
                </div>
                {i < 9 && <ArrowRight className="w-6 h-6 mx-4 text-secondary/50" />}
              </div>
            ))}
          </div>
          
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              KKM connects knowledge, engineering, intellectual property and project development to create a structured pathway from evidence to scalable impact.
            </p>
            <button className="px-8 py-4 bg-secondary text-primary-dark font-bold rounded-full hover:bg-white transition-all">
              Explore Our Approach
            </button>
          </div>
        </div>
      </section>

      {/* 8.7 GMEL FEATURE (Ecosystem priority) */}
      <section className="py-24 bg-slate-950 text-white relative border-b-4 border-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-extrabold mb-4">The GMEL Ecosystem</h2>
            <h3 className="text-2xl text-secondary mb-6 font-medium">From geothermal resources to integrated multi-energy infrastructure.</h3>
            <p className="text-lg text-slate-300">GMEL is KKM’s geothermal technology ecosystem for developing integrated energy, thermal, water and productive applications.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {[
              { name: 'GMEL-CLG', desc: 'Closed-Loop Geothermal' },
              { name: 'GMEL-EHS', desc: 'Energy / System Layer' },
              { name: 'GMEL-DrillX', desc: 'Drilling Technology' },
              { name: 'GMEL-ThermoFluid', desc: 'Thermal-Fluid Systems' },
              { name: 'GMEL-ORC Compact', desc: 'Power Conversion' },
              { name: 'GMEL-Desal', desc: 'Desalination Integration' },
              { name: 'GMEL-H₂Cell', desc: 'Hydrogen Applications' }
            ].map((tile, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                <h4 className="font-bold text-secondary mb-1 text-sm">{tile.name}</h4>
                <p className="text-xs text-slate-400">{tile.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white/5 p-6 rounded-xl border border-white/10">
            <p className="text-sm text-slate-400 flex-1">
              <strong className="text-white">IP Notice:</strong> Technology and intellectual-property status varies by asset and development stage. See individual technology records for details.
            </p>
            <button onClick={() => setPage(Page.GMELHub)} className="px-6 py-3 bg-secondary text-primary-dark font-bold rounded-full whitespace-nowrap">
              Explore the GMEL Ecosystem
            </button>
          </div>
        </div>
      </section>

      {/* 8.8 & 8.9 RURAL & NOMADIC DEVELOPMENT */}
      <section className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary tracking-widest font-bold uppercase text-sm mb-4 block">STRATEGIC PLATFORM</span>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-slate-900 dark:text-white mb-6">KKM Rural & Nomadic Development Platform</h2>
            <h3 className="text-2xl text-slate-700 dark:text-slate-300 font-medium max-w-3xl mx-auto">From Technology to Rural Prosperity</h3>
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-4xl mx-auto">
              We integrate energy, water, infrastructure, agriculture, productive value chains, digital systems and investment models to support sustainable rural and nomadic development.
            </p>
          </div>
          
          {/* Vertical Flow Diagram for Integrated Rural Model */}
          <div className="max-w-2xl mx-auto bg-slate-50 dark:bg-slate-800 p-8 rounded-3xl border border-gray-100 dark:border-slate-700 mb-12 shadow-sm">
            <h4 className="text-xl font-bold text-center mb-8">One Village. One Integrated System.</h4>
            <div className="flex flex-col items-center gap-2">
              {['LOCAL RESOURCES', 'ENERGY + WATER', 'INFRASTRUCTURE', 'AGRICULTURE / LIVESTOCK', 'PROCESSING', 'AI + DIGITAL', 'INVESTMENT', 'EMPLOYMENT', 'LOCAL VALUE CREATION', 'SUSTAINABLE RURAL ECONOMY'].map((step, i) => (
                <React.Fragment key={i}>
                  <div className="w-full text-center py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg font-bold text-sm text-slate-800 dark:text-slate-200 shadow-sm">
                    {step}
                  </div>
                  {i < 9 && <ArrowDown className="w-5 h-5 text-primary/50" />}
                </React.Fragment>
              ))}
            </div>
            <p className="text-center text-sm text-slate-500 mt-8 italic">Infrastructure creates lasting development when it increases productive capacity, local value creation and economic resilience.</p>
          </div>
          
          <div className="flex justify-center gap-4">
            <button onClick={() => setPage(Page.RuralStudies)} className="px-8 py-4 bg-primary-dark text-white font-bold rounded-full hover:bg-primary transition-all">
              Explore Rural Development
            </button>
            <button onClick={() => setPage(Page.PilotRequest)} className="px-8 py-4 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 font-bold rounded-full hover:border-primary transition-all">
              Propose a Pilot
            </button>
          </div>
        </div>
      </section>

      {/* 8.10 SELECTED PROJECTS */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 dark:text-white">Selected Projects & Development Initiatives</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Qeshm Green Energy & Biotech Hub",
                location: "Qeshm",
                sector: "Energy / Infrastructure / Innovation",
                role: "Technology Developer / EPC",
                status: "Development",
                desc: "An integrated development concept connecting renewable energy, technology infrastructure and productive applications."
              },
              {
                name: "ICOFC Sarakhs",
                location: "Sarakhs",
                sector: "Energy / Infrastructure",
                role: "Engineering & Integration",
                status: "Pilot",
                desc: "Integrated infrastructure addressing critical local operational needs with advanced technological oversight."
              },
              {
                name: "Tehran Advanced Life Sciences Park",
                location: "Tehran",
                sector: "Infrastructure / Innovation",
                role: "Design & Technology Partner",
                status: "Concept",
                desc: "A specialized technological infrastructure supporting advanced research and commercialization pathways."
              }
            ].map((p, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl overflow-hidden flex flex-col shadow-sm">
                <div className="p-6 flex-1 border-b border-gray-100 dark:border-slate-800">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold px-3 py-1 bg-primary/10 text-primary-dark dark:text-secondary rounded-full">{p.status}</span>
                    <span className="text-xs text-slate-500">{p.sector}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{p.name}</h3>
                  <div className="flex items-center text-sm text-slate-500 mb-4">
                    <MapPin className="w-4 h-4 mr-1" /> {p.location}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{p.desc}</p>
                  <div className="text-xs font-semibold text-slate-500">
                    KKM Role: <span className="text-slate-900 dark:text-white">{p.role}</span>
                  </div>
                </div>
                <button onClick={() => setPage(Page.Projects)} className="w-full py-4 text-center font-bold text-primary hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  Explore Project
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8.16 WHY KKM */}
      <section className="py-24 bg-white dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-center mb-16 text-slate-900 dark:text-white">Why KKM</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { title: 'Engineering-led', desc: 'Practical engineering capability.' },
              { title: 'Technology-focused', desc: 'Technology development and integration.' },
              { title: 'IP-aware', desc: 'Structured intellectual-property approach.' },
              { title: 'Project-oriented', desc: 'From concept to pilot and deployment.' },
              { title: 'International', desc: 'Designed for partnerships and transfer.' }
            ].map((reason, i) => (
              <div key={i} className="text-center p-6 bg-slate-50 dark:bg-slate-950 rounded-xl">
                <h4 className="font-bold text-lg mb-2 text-primary-dark dark:text-white">{reason.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8.19 FINAL CTA */}
      <section className="py-24 bg-slate-950 text-white text-center">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-6">Have a Challenge Worth Solving?</h2>
          <p className="text-xl text-slate-400 mb-10 leading-relaxed">
            Whether you are developing a project, evaluating a technology, exploring a partnership or looking for an integrated rural development solution, KKM can help structure the next step.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setPage(Page.ProjectDevelopment)} className="px-8 py-4 bg-secondary text-primary-dark font-bold rounded-full hover:bg-white transition-all">Start a Project</button>
            <button onClick={() => setPage(Page.Invest)} className="px-8 py-4 bg-transparent border-2 border-white/20 font-bold rounded-full hover:border-secondary transition-all">Partner With KKM</button>
            <button onClick={() => setPage(Page.PilotRequest)} className="px-8 py-4 bg-transparent border-2 border-white/20 font-bold rounded-full hover:border-secondary transition-all">Propose a Pilot</button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
`

fs.writeFileSync('pages/HomePage.tsx', content);
