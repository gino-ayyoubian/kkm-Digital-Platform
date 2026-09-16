const fs = require('fs');
let content = fs.readFileSync('pages/ProjectDetailModal.tsx', 'utf8');

const newContent = `
                <ImageGallery images={project.gallery} altText={name} />
        <div className="p-8">
            <h1 id="modal-title" className="text-3xl md:text-4xl font-display font-extrabold text-primary dark:text-white mb-2">{name}</h1>
            <p className="text-lg text-text-light dark:text-slate-300 mb-8">{description}</p>
            
            {/* Case Study Details */}
            {(project.client || project.location) && (
                <div className="mb-8 grid md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <div>
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Project Parameters</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between"><span className="font-semibold text-slate-700 dark:text-slate-300">Client / Partner</span> <span className="text-slate-900 dark:text-white text-right">{project.client}</span></div>
                            <div className="flex justify-between"><span className="font-semibold text-slate-700 dark:text-slate-300">Location</span> <span className="text-slate-900 dark:text-white text-right">{project.location}</span></div>
                            <div className="flex justify-between"><span className="font-semibold text-slate-700 dark:text-slate-300">KKM Role</span> <span className="text-slate-900 dark:text-white text-right">{project.role}</span></div>
                            <div className="flex justify-between"><span className="font-semibold text-slate-700 dark:text-slate-300">Project Stage</span> <span className="text-slate-900 dark:text-white text-right">{project.stage}</span></div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Technical & Deliverables</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex flex-col"><span className="font-semibold text-slate-700 dark:text-slate-300">Technology</span> <span className="text-slate-900 dark:text-white">{project.technology}</span></div>
                            <div className="flex flex-col"><span className="font-semibold text-slate-700 dark:text-slate-300">Scope</span> <span className="text-slate-900 dark:text-white">{project.scope}</span></div>
                            {project.deliverables && (
                                <div className="flex flex-col"><span className="font-semibold text-slate-700 dark:text-slate-300">Deliverables</span> 
                                <ul className="list-disc pl-4 text-slate-900 dark:text-white mt-1">
                                    {project.deliverables.map((d, i) => <li key={i}>{d}</li>)}
                                </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {(project.results || project.nextPhase) && (
                <div className="mb-8 grid md:grid-cols-2 gap-6">
                    <div className="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
                        <h3 className="text-emerald-800 dark:text-emerald-400 font-bold mb-2">Results & Impact</h3>
                        <p className="text-emerald-950 dark:text-emerald-200 text-sm">{project.results}</p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                        <h3 className="text-blue-800 dark:text-blue-400 font-bold mb-2">Next Phase</h3>
                        <p className="text-blue-950 dark:text-blue-200 text-sm">{project.nextPhase}</p>
                    </div>
                </div>
            )}
`;

content = content.replace(/<ImageGallery images=\{project\.gallery\} altText=\{name\} \/>[\s\S]*?<div className="mt-6">/, newContent + '\n<div className="mt-6">');

fs.writeFileSync('pages/ProjectDetailModal.tsx', content);
