import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import { Page } from '../types';
import PageHeader from '../components/PageHeader';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

import { trackFormSubmission, parseUTMParams } from '../lib/analytics';
const ExhibitionPage: React.FC<{ setPage: (p: Page) => void }> = ({ setPage }) => {
    const { t } = useLanguage();
    const [formData, setFormData] = React.useState({
        name: '', organization: '', position: '', country: '', category: 'Government', preferredDate: '', message: ''
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            
            const utms = parseUTMParams();
            const leadData = {
                name: formData.name,
                organization: formData.organization,
                country: formData.country,
                category: formData.category,
                status: 'New',
                source: 'Exhibition Page QR',
                message: `Position: ${formData.position}\nPreferred Date: ${formData.preferredDate}\nMessage: ${formData.message}`,
                utmData: utms,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            };
            await addDoc(collection(db, 'leads'), leadData);
            trackFormSubmission('exhibition_booking', formData.category, utms);

            setIsSuccess(true);
            setFormData({ name: '', organization: '', position: '', country: '', category: 'Government', preferredDate: '', message: '' });
        } catch (error) {
            console.error("Failed to book meeting", error);
            alert("Failed to submit request. Please try again or contact us directly.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <PageHeader 
                title="KKM at the 6th International Exhibition of Rural & Nomadic Capabilities" 
                subtitle="Join us as we showcase our transformative GeoMeta Energy Layer (GMEL) and Sustainable Infrastructure Solutions." 
            />

            <div className="container mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
                    {/* Content Side */}
                    <div className="space-y-12">
                        <section>
                            <h2 className="text-3xl font-display font-bold text-primary-dark dark:text-white mb-6">Who We Are & What We Bring</h2>
                            <p className="text-lg text-text-light dark:text-slate-300 leading-relaxed mb-4">
                                KKM International Group is an engineering and technology powerhouse dedicated to the development and commercialization of solutions spanning energy, infrastructure, water, and digital systems.
                            </p>
                            <p className="text-lg text-text-light dark:text-slate-300 leading-relaxed">
                                At this exhibition, we are introducing our highly scalable <strong>Rural Model</strong>, engineered specifically to establish energy independence, clean water access, and industrial micro-economies in remote and nomadic regions.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-2xl font-bold text-primary-dark dark:text-secondary mb-6">Technology Portfolio</h3>
                            <ul className="space-y-4">
                                <li className="flex gap-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-xl">
                                    <div className="text-primary dark:text-secondary mt-1">✓</div>
                                    <div>
                                        <h4 className="font-bold text-text-dark dark:text-white">GeoMeta Energy Layer (GMEL)</h4>
                                        <p className="text-sm text-text-light dark:text-slate-400">Integrated multi-source geothermal power and heating networks.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-xl">
                                    <div className="text-primary dark:text-secondary mt-1">✓</div>
                                    <div>
                                        <h4 className="font-bold text-text-dark dark:text-white">River Energy Ecosystem (REE)</h4>
                                        <p className="text-sm text-text-light dark:text-slate-400">Micro-hydro generation paired with AI-driven resource distribution.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-xl">
                                    <div className="text-primary dark:text-secondary mt-1">✓</div>
                                    <div>
                                        <h4 className="font-bold text-text-dark dark:text-white">Modular Water-Energy Nexus</h4>
                                        <p className="text-sm text-text-light dark:text-slate-400">Packaged desalination and purification units powered entirely by renewable off-grid sources.</p>
                                    </div>
                                </li>
                            </ul>
                        </section>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button onClick={() => setPage(Page.Downloads)} className="px-8 py-4 bg-gray-200 dark:bg-slate-700 text-primary-dark dark:text-white font-bold rounded-full hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                Download Exhibition Profile
                            </button>
                            <button onClick={() => setPage(Page.Projects)} className="px-8 py-4 bg-primary/10 dark:bg-secondary/10 text-primary-dark dark:text-secondary font-bold rounded-full hover:bg-primary/20 dark:hover:bg-secondary/20 transition-colors">
                                View Projects
                            </button>
                        </div>
                    </div>

                    {/* Booking Form Side */}
                    <div>
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-slate-700 sticky top-24">
                            <h2 className="text-2xl font-display font-bold text-primary dark:text-secondary mb-2">Book a Meeting</h2>
                            <p className="text-text-light dark:text-slate-400 mb-8">Schedule a dedicated session with our executives and lead engineers during the exhibition.</p>

                            <AnimatePresence mode="wait">
                                {isSuccess ? (
                                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                                        <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                        </div>
                                        <h3 className="text-xl font-bold text-text-dark dark:text-white mb-2">Meeting Requested</h3>
                                        <p className="text-text-light dark:text-slate-400 mb-6">Our relations team will contact you shortly to confirm the time and booth details.</p>
                                        <button onClick={() => setIsSuccess(false)} className="text-primary dark:text-secondary font-bold hover:underline">Schedule Another</button>
                                    </motion.div>
                                ) : (
                                    <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-text-dark dark:text-slate-300 mb-1">Full Name *</label>
                                                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-text-dark dark:text-white focus:ring-2 focus:ring-primary dark:focus:ring-secondary" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-text-dark dark:text-slate-300 mb-1">Organization *</label>
                                                <input required type="text" value={formData.organization} onChange={e => setFormData({...formData, organization: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-text-dark dark:text-white focus:ring-2 focus:ring-primary dark:focus:ring-secondary" />
                                            </div>
                                        </div>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-text-dark dark:text-slate-300 mb-1">Position</label>
                                                <input type="text" value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-text-dark dark:text-white focus:ring-2 focus:ring-primary dark:focus:ring-secondary" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-text-dark dark:text-slate-300 mb-1">Country *</label>
                                                <input required type="text" value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-text-dark dark:text-white focus:ring-2 focus:ring-primary dark:focus:ring-secondary" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-text-dark dark:text-slate-300 mb-1">Area of Interest</label>
                                            <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-text-dark dark:text-white focus:ring-2 focus:ring-primary dark:focus:ring-secondary">
                                                <option value="">Select an area...</option>
                                                <option value="Investment">Investment & Finance</option>
                                                <option value="Technology Partnership">Technology Partnership</option>
                                                <option value="Rural Deployment">Rural Deployment</option>
                                                <option value="Research & IP">Research & IP</option>
                                                <option value="General Corporate">General Corporate</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-text-dark dark:text-slate-300 mb-1">Preferred Date/Time</label>
                                            <input type="text" placeholder="e.g. Oct 15th, Morning" value={formData.preferredDate} onChange={e => setFormData({...formData, preferredDate: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-text-dark dark:text-white focus:ring-2 focus:ring-primary dark:focus:ring-secondary" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-text-dark dark:text-slate-300 mb-1">Additional Message</label>
                                            <textarea rows={3} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-text-dark dark:text-white focus:ring-2 focus:ring-primary dark:focus:ring-secondary"></textarea>
                                        </div>
                                        <button disabled={isSubmitting} type="submit" className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-secondary transition-all shadow-md active:scale-95 disabled:bg-gray-400">
                                            {isSubmitting ? 'Submitting...' : 'Schedule a Meeting with KKM'}
                                        </button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ExhibitionPage;
