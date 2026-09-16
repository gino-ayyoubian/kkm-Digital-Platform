const fs = require('fs');
let content = fs.readFileSync('pages/AboutUsPage.tsx', 'utf8');

const trustLayer = `
            {/* Trust Layer / Corporate Governance */}
            <section className="py-20 bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-display font-bold text-primary-dark dark:text-white mb-4">
                            Corporate Registration & Trust Layer
                        </h2>
                        <p className="text-text-light dark:text-slate-400 max-w-2xl mx-auto">
                            Kimia Karan Mâd Private Joint Stock Company maintains the highest standards of international engineering compliance and corporate governance.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                            <h3 className="text-sm font-bold text-primary dark:text-secondary mb-3 uppercase tracking-wider">Certifications & Standards</h3>
                            <ul className="space-y-2 text-sm text-text-dark dark:text-slate-300 font-medium">
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> ISO 9001:2015 (QMS)</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> ISO 14001:2015 (EMS)</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> ISO 45001:2018 (OH&S)</li>
                            </ul>
                        </div>
                        
                        <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                            <h3 className="text-sm font-bold text-primary dark:text-secondary mb-3 uppercase tracking-wider">Industrial Partners</h3>
                            <ul className="space-y-2 text-sm text-text-dark dark:text-slate-300 font-medium">
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-secondary" /> Mâd Energy Infrastructure</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-secondary" /> Parsian Geothermal Tech</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-secondary" /> Kavir Advanced Materials</li>
                            </ul>
                        </div>

                        <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                            <h3 className="text-sm font-bold text-primary dark:text-secondary mb-3 uppercase tracking-wider">Academic Consortia</h3>
                            <ul className="space-y-2 text-sm text-text-dark dark:text-slate-300 font-medium">
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Sharif University of Technology</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> University of Tehran</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Research Institute of Petroleum</li>
                            </ul>
                        </div>

                        <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                            <h3 className="text-sm font-bold text-primary dark:text-secondary mb-3 uppercase tracking-wider">Technical Publications</h3>
                            <ul className="space-y-2 text-sm text-text-dark dark:text-slate-300 font-medium">
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> IEEE Xplore: GMEL Network</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Journal of Geothermal Research</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Springer: Water-Energy Nexus</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
`;

content = content.replace(/(<GlobalCTA setPage=\{setPage\} \/>)/, trustLayer + "\n      $1");

fs.writeFileSync('pages/AboutUsPage.tsx', content);
