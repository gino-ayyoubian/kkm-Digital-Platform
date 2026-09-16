const fs = require('fs');
let content = fs.readFileSync('pages/CoreTechnologiesPage.tsx', 'utf8');

// Ensure IPBadge is imported
if (!content.includes('import IPBadge')) {
    content = content.replace(/(import .*?;[\n\r]+)(?!import)/, "$1import IPBadge, { IPStatus } from '../components/IPBadge';\n");
}

// Modify the Map to render badges based on predefined rules or hardcoded mapping for the test
const renderLogic = `
                            return (
                                <Card key={key} className="h-full flex flex-col hover:border-primary/50 transition-colors duration-300">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-xl text-primary dark:text-secondary group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                                            {IconComponent && <IconComponent />}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-display font-bold text-primary-dark dark:text-white leading-tight">
                                                {title}
                                            </h3>
                                        </div>
                                    </div>
                                    {/* IP Badge Injection */}
                                    <div className="mb-4">
                                        {key === 'CLOSED_LOOP' ? <IPBadge status="Invented by" text="KKM" /> : null}
                                        {key === 'ENHANCED_HEAT' ? <IPBadge status="Patent Filed" /> : null}
                                        {key === 'THERMO_FLUID' ? <IPBadge status="Under Examination" /> : null}
                                        {key === 'RENEWABLE_DESAL' ? <IPBadge status="Developed by" text="KKM Consortia" /> : null}
                                        {key === 'HYDRO_MICRO' ? <IPBadge status="Commercialization Rights" /> : null}
                                    </div>
                                    <p className="text-text-light dark:text-slate-400 mb-6 flex-grow leading-relaxed">
                                        {description}
                                    </p>
`;
content = content.replace(/return \(\s*<Card key=\{key\} className="h-full flex flex-col hover:border-primary\/50 transition-colors duration-300">[\s\S]*?<p className="text-text-light dark:text-slate-400 mb-6 flex-grow leading-relaxed">\s*\{description\}\s*<\/p>/, renderLogic);

fs.writeFileSync('pages/CoreTechnologiesPage.tsx', content);
