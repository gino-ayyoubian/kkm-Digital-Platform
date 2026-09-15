import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useLanguage } from '../LanguageContext';

const milestones = [
  { year: "2015", title: "Conceptualization", desc: "Initial theoretical modeling for closed-loop geothermal gradients." },
  { year: "2017", title: "REE Prototype", desc: "First scaled deployment of the River Energy Ecosystem in test waters." },
  { year: "2019", title: "GMEL Subsurface Tests", desc: "Successful drilling and thermal extraction proof of concept." },
  { year: "2021", title: "Digital Twin Integration", desc: "Launch of the real-time simulation lab for predictive maintenance." },
  { year: "2023", title: "Commercial Scaling", desc: "Full-scale multi-MW deployment of hybrid GMEL/REE systems." },
  { year: "2025", title: "Global Ecosystem", desc: "Expanding operational sites across the Middle East and beyond." }
];

const InnovationMilestones: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <div ref={containerRef} className="py-24 bg-slate-900 overflow-hidden relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Innovation Milestones</h2>
        <p className="text-slate-400 max-w-2xl">The chronological journey of KKM's core technology development, from theoretical modeling to global deployment.</p>
      </div>

      <div className="relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2 z-0"></div>
        <motion.div style={{ x }} className="flex gap-12 px-8 w-max relative z-10">
          {milestones.map((m, i) => (
            <div key={i} className="flex flex-col items-center w-72">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center font-display font-bold text-white text-xl border-4 border-slate-900 shadow-xl mb-6 relative z-10">
                {m.year}
              </div>
              <div className="bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-700 w-full text-center">
                <h3 className="text-xl font-bold text-white mb-2">{m.title}</h3>
                <p className="text-slate-400 text-sm">{m.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default InnovationMilestones;
