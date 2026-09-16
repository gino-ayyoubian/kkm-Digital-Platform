const fs = require('fs');
let content = fs.readFileSync('pages/HomePage.tsx', 'utf8');

const statsSection = `
      {/* SECTION: STRATEGIC FOCUS (STATISTICS REFORM) */}
      <section className="py-16 bg-primary-dark dark:bg-slate-900 border-y border-primary/20 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x rtl:divide-x-reverse divide-primary/30 dark:divide-slate-700">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="py-6 md:py-0">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-secondary mb-2 uppercase tracking-wide">
                {t('Stat_BuildingCapability') || 'Building Capability'}
              </h3>
              <p className="text-slate-300 dark:text-slate-400">Engineering future-ready infrastructure and fostering world-class talent.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="py-6 md:py-0">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-secondary mb-2 uppercase tracking-wide">
                {t('Stat_DevelopingTech') || 'Developing Technology'}
              </h3>
              <p className="text-slate-300 dark:text-slate-400">Pioneering proprietary IP in AI, energy, and sustainable materials.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="py-6 md:py-0">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-secondary mb-2 uppercase tracking-wide">
                {t('Stat_CreatingProjects') || 'Creating Projects'}
              </h3>
              <p className="text-slate-300 dark:text-slate-400">Executing integrated, scalable solutions across global markets.</p>
            </motion.div>
          </div>
        </div>
      </section>
`;

content = content.replace(/(\{\/\* SECTION 2: WHAT KKM DOES \*\/}\n      <section className="py-24 bg-white dark:bg-slate-950">[\s\S]*?<\/section>)/, "$1\n" + statsSection);

fs.writeFileSync('pages/HomePage.tsx', content);
