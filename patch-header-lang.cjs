const fs = require('fs');
let content = fs.readFileSync('components/Header.tsx', 'utf8');

const regex = /<div className=\{`flex items-center rounded-full p-1 border \$\{isScrolled \? 'border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-800' : 'border-white\/20 bg-white\/10'\}[\s\S]*?FA\s*<\/button>\s*<\/div>/;

const dropdown = `
            {/* Language Selector Dropdown */}
            <div className="relative group">
                <button 
                    className={\`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 border \${isScrolled ? 'border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-800 text-primary dark:text-white' : 'border-white/20 bg-white/10 text-white hover:bg-white/20'}\`}
                    aria-label="Select Language"
                    aria-haspopup="true"
                >
                    {language}
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div className="absolute top-full right-0 mt-2 w-24 bg-white dark:bg-slate-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden ring-1 ring-black/5">
                    {['EN', 'FA', 'AR', 'KU', 'RU'].map(lang => (
                        <button
                            key={lang}
                            onClick={() => setLanguage(lang as any)}
                            className={\`block w-full text-left px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-slate-700 \${language === lang ? 'text-primary dark:text-secondary bg-gray-50 dark:bg-slate-700/50' : 'text-slate-700 dark:text-slate-300'}\`}
                        >
                            {lang}
                        </button>
                    ))}
                </div>
            </div>
`;

content = content.replace(regex, dropdown);
fs.writeFileSync('components/Header.tsx', content);
