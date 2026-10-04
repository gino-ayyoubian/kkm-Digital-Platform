
import * as React from 'react';
import { Page } from '../types';
import type { MapMarker } from '../types';
import { useLanguage } from '../LanguageContext';
import PageHeader from '../components/PageHeader';
import Accordion from '../components/Accordion';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, PhoneCall, Globe } from 'lucide-react';
import { IvrCommunicationsConsole } from '../components/ivr/IvrCommunicationsConsole';

import { trackFormSubmission, parseUTMParams } from '../lib/analytics';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// Types
interface ContactFormData {
    name: string;
    email: string;
    inquiryType: string;
    subject: string;
    message: string;
    _gotcha: string; // Honeypot
}

interface FormErrors {
    [key: string]: string | undefined;
}

const MAX_MESSAGE_LENGTH = 1000;

const FormField: React.FC<{
    id: string;
    label: string;
    children: React.ReactNode;
    error?: string;
    helperText?: string;
}> = ({ id, label, children, error, helperText }) => (
    <div className="relative mb-4">
        <div className="flex justify-between items-baseline mb-1">
            <label htmlFor={id} className="block text-sm font-semibold text-text-light dark:text-slate-300">{label}</label>
            {helperText && <span className="text-xs text-text-light dark:text-slate-400 opacity-80">{helperText}</span>}
        </div>
        {children}
        <AnimatePresence>
            {error && (
                <motion.p
                    id={`${id}-error`}
                    role="alert"
                    aria-live="polite"
                    className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1 absolute -bottom-5 left-0"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                >
                    <span aria-hidden="true">⚠️</span> {error}
                </motion.p>
            )}
        </AnimatePresence>
    </div>
);

const CommTierCard: React.FC<{ title: string; description: string; icon: React.ReactNode; color: string }> = ({ title, description, icon, color }) => (
    <div className={`bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border-t-4 ${color} flex flex-col h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
        <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-gray-50 dark:bg-slate-700 shadow-inner">
                {icon}
            </div>
            <h3 className="font-display font-bold text-lg text-primary-dark dark:text-white leading-tight">{title}</h3>
        </div>
        <p className="text-sm text-text-light dark:text-slate-300 leading-relaxed flex-grow text-justify">{description}</p>
    </div>
);

const ContactPage: React.FC = () => {
    const { t } = useLanguage();
    
    // State
    const [formData, setFormData] = React.useState<ContactFormData>({ name: '', email: '', inquiryType: 'General Inquiry', subject: '', message: '', _gotcha: '' });
    const [captcha, setCaptcha] = React.useState({ a: 0, b: 0, operator: '+', answer: '' });
    const [errors, setErrors] = React.useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [formStatus, setFormStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
    const [submitError, setSubmitError] = React.useState<string | null>(null);
    const [isIvrConsoleOpen, setIsIvrConsoleOpen] = React.useState<boolean>(false);
    const [leadReference, setLeadReference] = React.useState<{ id: string; routedDepartment?: string } | null>(null);
    const formRenderTimeRef = React.useRef<number>(Date.now());

    // Memoized Data
    const officeLocations: MapMarker[] = React.useMemo(() => [
        {
            name: t('HeadOffice'),
            description: t('TehranOfficeAddress'),
            coordinates: { lat: 35.7646896, lng: 51.4163221 },
            category: 'Head Office',
            type: 'office',
            googleMapsLink: 'https://maps.app.goo.gl/tbE3Hg1VrWThWFnY8?g_st=ic'
        },
        {
            name: t('BranchOffice'),
            description: t('QeshmAddress'),
            coordinates: { lat: 26.9583, lng: 56.2722 },
            category: 'Branch Office',
            type: 'office',
        },
    ], [t]);
    
    // Effects
    React.useEffect(() => {
        generateCaptcha();
    }, [formStatus]); // Regenerate on form reset/success

    const generateCaptcha = () => {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        const operator = Math.random() > 0.5 ? '+' : '-';
        // Ensure positive result for subtraction
        const finalA = operator === '-' && b > a ? b : a;
        const finalB = operator === '-' && b > a ? a : b;
        
        setCaptcha({
            a: finalA,
            b: finalB,
            operator,
            answer: ''
        });
    };

    // Validation Logic
    const validateField = React.useCallback((name: string, value: string): string => {
        switch (name) {
            case 'name':
                return !value.trim() ? t('ValidationRequired', { field: t('FullName') }) : '';
            case 'email':
                if (!value.trim()) return t('ValidationRequired', { field: t('EmailAddress') });
                // Strict RFC 5322 regex for email format
                if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(value.trim())) {
                    return t('ValidationInvalid', { field: t('EmailAddress') }) || 'Please enter a valid email address (e.g. name@domain.com)';
                }
                return '';
            case 'subject':
                return !value.trim() ? t('ValidationRequired', { field: t('Subject') }) : '';
            case 'message':
                if (!value.trim()) return t('ValidationRequired', { field: t('Message') });
                if (value.length > MAX_MESSAGE_LENGTH) return t('ValidationMaxLength', { max: MAX_MESSAGE_LENGTH });
                return '';
            default:
                return '';
        }
    }, [t]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        if (name === 'captcha') {
            setCaptcha(prev => ({ ...prev, answer: value }));
            setErrors(prev => ({ ...prev, captcha: undefined }));
            return;
        }

        if (name === '_gotcha') {
            setFormData(prev => ({ ...prev, [name]: value }));
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Debounced validation could be added here for better performance, 
        // but immediate feedback is requested.
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (formData._gotcha) {
            setFormStatus('success');
            return;
        }

        const formErrors: FormErrors = {};
        let isValid = true;

        // Validate all fields
        (['name', 'email', 'subject', 'message'] as const).forEach(field => {
            const error = validateField(field, formData[field]);
            if (error) {
                formErrors[field] = error;
                isValid = false;
            }
        });

        // Captcha Check
        const expectedAnswer = captcha.operator === '+' ? captcha.a + captcha.b : captcha.a - captcha.b;
        if (!captcha.answer.trim()) {
            formErrors.captcha = t('ValidationRequired', { field: t('SecurityQuestion') });
            isValid = false;
        } else if (parseInt(captcha.answer) !== expectedAnswer) {
            formErrors.captcha = t('ValidationCaptcha');
            isValid = false;
        }

        setErrors(formErrors);

        if (isValid) {
            setIsSubmitting(true);
            setFormStatus('idle');
            setSubmitError(null);
            
            try {
                const utms = parseUTMParams();
                const leadOpportunityType = 
                    formData.inquiryType.includes('Project') ? 'Project' :
                    formData.inquiryType.includes('Partnership') ? 'Partnership' :
                    formData.inquiryType.includes('Investment') ? 'Investment' :
                    formData.inquiryType.includes('Pilot') ? 'Pilot' : 'Project';

                // Call backend validated contact pipeline (TKT-010, TKT-011)
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        inquiryType: formData.inquiryType,
                        subject: formData.subject,
                        message: formData.message,
                        _gotcha: formData._gotcha,
                        renderedAt: formRenderTimeRef.current,
                        utmData: utms
                    })
                });

                const data = await response.json();

                if (!response.ok || !data.ok) {
                    throw new Error(data.message || data.error || 'Failed to submit inquiry.');
                }

                setLeadReference({
                    id: data.id,
                    routedDepartment: data.routedDepartment
                });

                if (db) {
                    try {
                        await addDoc(collection(db, 'leads'), {
                            name: formData.name,
                            email: formData.email,
                            inquiryType: formData.inquiryType,
                            opportunityType: leadOpportunityType,
                            subject: formData.subject,
                            message: formData.message,
                            leadId: data.id,
                            status: 'New',
                            priority: 'High',
                            source: 'Contact Page Inquiry',
                            utmData: utms,
                            createdAt: serverTimestamp(),
                            updatedAt: serverTimestamp()
                        });
                    } catch (_) {}
                }
                trackFormSubmission('contact_inquiry', formData.inquiryType, utms);

                setIsSubmitting(false);
                setFormStatus('success');
            } catch (err: any) {
                console.warn("Contact submission error:", err);
                setIsSubmitting(false);
                setSubmitError(err?.message || 'Failed to submit inquiry. Please verify your details and retry.');
                setFormStatus('error');
            }
        }
    };
    
    const resetForm = () => {
        setFormData({ name: '', email: '', subject: '', message: '', _gotcha: '', inquiryType: 'General Inquiry' });
        generateCaptcha();
        setErrors({});
        setFormStatus('idle');
        setSubmitError(null);
        setLeadReference(null);
        formRenderTimeRef.current = Date.now();
    }
    
    const getInputClass = (fieldName: string, value: string) => {
        const baseClass = "w-full px-4 py-3 border rounded-lg bg-white dark:bg-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 transition-all duration-200 shadow-sm";
        const error = errors[fieldName];
        
        if (error) {
            return `${baseClass} border-red-500 dark:border-red-500 focus:ring-red-500 bg-red-50 dark:bg-red-900/10`;
        } else if (value.trim().length > 0) {
            return `${baseClass} border-green-500 dark:border-green-600 focus:ring-green-500 dark:focus:ring-green-600`;
        } else {
            return `${baseClass} border-gray-300 dark:border-slate-600 focus:ring-secondary focus:border-secondary`;
        }
    };

    return (
        <div>
            <PageHeader title={t(Page.Contact)} subtitle={t('ContactSubtitle')} />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Form Section */}
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 relative overflow-hidden">
                         <AnimatePresence mode="wait">
                            {formStatus === 'success' ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="text-center flex flex-col items-center justify-center h-full min-h-[500px]"
                                >
                                    <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 shadow-inner">
                                        <svg className="w-12 h-12 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <motion.path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={3} 
                                                d="M5 13l4 4L19 7" 
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                            />
                                        </svg>
                                    </div>
                                    <h2 className="text-3xl font-display font-bold text-primary dark:text-secondary mb-3">{t('ContactFormSuccessTitle')}</h2>
                                    <p className="text-text-light dark:text-slate-300 mb-6 max-w-sm mx-auto leading-relaxed">{t('ContactFormSuccess')}</p>
                                    
                                    {leadReference && (
                                        <div className="mb-8 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-center max-w-md w-full">
                                            <p className="text-xs uppercase font-mono tracking-wider text-slate-500 dark:text-slate-400 mb-1">Inquiry Tracking Code</p>
                                            <p className="font-mono text-lg font-bold text-primary dark:text-secondary select-all">{leadReference.id}</p>
                                            {leadReference.routedDepartment && (
                                                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
                                                    Routed to: <span className="font-semibold text-primary-dark dark:text-white">{leadReference.routedDepartment}</span>
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    <button onClick={resetForm} className="px-8 py-3 font-bold text-white bg-primary rounded-full hover:bg-secondary transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1">
                                        {t('SendAnotherMessage')}
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <h2 className="text-2xl font-display font-bold text-primary dark:text-secondary mb-2">{t('SendMessage')}</h2>
                                    <p className="text-sm text-text-light dark:text-slate-400 mb-8">We usually respond within 24 hours.</p>
                                    
                                    <AnimatePresence>
                                        {formStatus === 'error' && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                                                animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                                                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                                    <div className="flex items-center gap-3">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <p className="text-sm text-red-700 dark:text-red-400 font-semibold">{submitError}</p>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => setFormStatus('idle')}
                                                        className="px-3 py-1 bg-red-100 hover:bg-red-200 dark:bg-red-800 dark:hover:bg-red-700 text-red-800 dark:text-red-100 text-xs font-bold rounded transition-colors self-end sm:self-auto"
                                                    >
                                                        Dismiss / Edit
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    
                                    <form onSubmit={handleSubmit} noValidate className="space-y-6">
                                        <div className="hidden opacity-0 h-0 w-0 overflow-hidden">
                                            <input type="text" name="_gotcha" value={formData._gotcha} onChange={handleChange} tabIndex={-1} autoComplete="off" />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <FormField id="name" label={t('FullName')} error={errors.name}>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className={getInputClass('name', formData.name)}
                                                    aria-invalid={!!errors.name}
                                                />
                                            </FormField>
                                            <FormField id="email" label={t('EmailAddress')} error={errors.email}>
                                                <div className="relative">
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        className={`${getInputClass('email', formData.email)} pe-10`}
                                                        aria-invalid={!!errors.email}
                                                        placeholder="name@company.com"
                                                    />
                                                    {formData.email && !errors.email && (
                                                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-500 font-bold text-sm pointer-events-none" title="Valid email format">
                                                            ✓
                                                        </span>
                                                    )}
                                                </div>
                                            </FormField>
                                        </div>

                                        
                                        <FormField id="inquiryType" label={t('InquiryType')} error={errors.inquiryType}>
                                            <div className="relative">
                                                <select
                                                    id="inquiryType"
                                                    name="inquiryType"
                                                    value={formData.inquiryType}
                                                    onChange={handleChange}
                                                    className={`${getInputClass('inquiryType', formData.inquiryType)} appearance-none`}
                                                >
                                                    <option value="General Inquiry">{t('CTA_GeneralInquiry')}</option>
                                                    <option value="Project Inquiry">{t('CTA_ProjectInquiry')}</option>
                                                    <option value="Technology Partnership">{t('CTA_TechnologyPartnership')}</option>
                                                    <option value="Investment">{t('CTA_Investment')}</option>
                                                    <option value="Research Collaboration">{t('CTA_ResearchCollaboration')}</option>
                                                    <option value="Media">{t('CTA_Media')}</option>
                                                    <option value="Rural Pilot">{t('CTA_RuralPilot')}</option>
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center px-4 text-gray-500">
                                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                </div>
                                            </div>
                                        </FormField>


                                        <FormField 
                                            id="message" 
                                            label={t('Message')} 
                                            error={errors.message} 
                                            helperText={`${MAX_MESSAGE_LENGTH - formData.message.length} chars left`}
                                        >
                                            <div>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    rows={5}
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    className={getInputClass('message', formData.message)}
                                                    maxLength={MAX_MESSAGE_LENGTH}
                                                    placeholder="Provide details regarding your project, inquiry, or partnership scope..."
                                                />
                                                <div className="flex items-center justify-between mt-1.5 px-0.5">
                                                    <div className="w-1/2 bg-gray-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                                                        <div 
                                                            className={`h-full transition-all duration-150 ${
                                                                formData.message.length > 900 
                                                                    ? 'bg-red-500' 
                                                                    : formData.message.length > 750 
                                                                    ? 'bg-amber-500' 
                                                                    : 'bg-primary'
                                                            }`}
                                                            style={{ width: `${(formData.message.length / MAX_MESSAGE_LENGTH) * 100}%` }}
                                                        />
                                                    </div>
                                                    <span className={`text-[11px] font-mono ${
                                                        formData.message.length > 900 
                                                        ? 'text-red-500 font-bold' 
                                                        : formData.message.length > 750 
                                                        ? 'text-amber-500 font-semibold' 
                                                        : 'text-text-light dark:text-slate-400'
                                                    }`}>
                                                        {formData.message.length} / {MAX_MESSAGE_LENGTH}
                                                    </span>
                                                </div>
                                            </div>
                                        </FormField>

                                        <FormField id="captcha" label={t('SecurityQuestion')} error={errors.captcha}>
                                            <div className="flex items-center gap-4">
                                                <div className="bg-gray-100 dark:bg-slate-700 px-4 py-3 rounded-lg font-mono font-bold text-text-dark dark:text-white select-none border border-gray-300 dark:border-slate-600">
                                                    {captcha.a} {captcha.operator} {captcha.b} = ?
                                                </div>
                                                <input
                                                    type="number"
                                                    name="captcha"
                                                    value={captcha.answer}
                                                    onChange={handleChange}
                                                    placeholder="?"
                                                    className={`w-24 text-center font-bold ${getInputClass('captcha', captcha.answer)}`}
                                                />
                                            </div>
                                        </FormField>

                                        
                                        <div className="pt-2">
                                            <p className="text-xs text-text-light dark:text-slate-400 mb-4 text-center">
                                                * Inquiries are automatically routed to the appropriate internal department based on the selected inquiry type.
                                            </p>
                                            <button

                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full px-8 py-4 font-bold text-white bg-primary rounded-xl hover:bg-secondary transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                        {t('Submitting')}
                                                    </>
                                                ) : t('SubmitInquiry')}
                                            </button>
                                        </div>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Info & Map Section */}
                    <div className="space-y-8">
                         <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-slate-700">
                            <h2 className="text-xl font-display font-bold text-primary dark:text-secondary mb-6 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                {t('ContactInformation')}
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4 mb-6">
                                {officeLocations.map(loc => (
                                    <div key={loc.name} className="p-4 rounded-lg bg-gray-50 dark:bg-slate-700/30 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
                                        <h3 className="font-bold text-text-dark dark:text-slate-200 mb-1">{loc.name}</h3>
                                        <p className="text-xs text-text-light dark:text-slate-400 leading-relaxed mb-3">{loc.description}</p>
                                        {loc.category === 'Head Office' && (
                                            <div className="flex gap-2">
                                                <a href="https://waze.com/ul/htnke6nf0q" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-text-dark dark:text-white text-[10px] px-2 py-1 rounded transition-colors">
                                                    Waze
                                                </a>
                                                <a href="https://maps.app.goo.gl/tbE3Hg1VrWThWFnY8?g_st=ic" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-text-dark dark:text-white text-[10px] px-2 py-1 rounded transition-colors">
                                                    Google Maps
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                             <div className="p-4 rounded-lg bg-primary/5 dark:bg-secondary/5 border border-primary/10 dark:border-secondary/10">
                                <h3 className="font-bold text-text-dark dark:text-slate-200 mb-3">{t('PhoneLines')}</h3>
                                <div className="space-y-2">
                                    <a href={`tel:${t('CompanyPhone').replace(/\s/g, '')}`} className="flex items-center gap-3 text-sm text-text-light dark:text-slate-300 hover:text-primary dark:hover:text-secondary transition-colors group">
                                        <span className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm group-hover:shadow-md transition-shadow">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                        </span>
                                        <span dir="ltr">{t('CompanyPhone')}</span>
                                    </a>
                                    <div className="flex items-center gap-3 text-sm text-text-light dark:text-slate-300">
                                        <span className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                                        </span>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-xs opacity-70">{t('IVRLabel')}</span>
                                            <a href={`tel:${t('IVRPhone').replace(/\s/g, '')}`} className="hover:text-primary dark:hover:text-secondary transition-colors" dir="ltr">{t('IVRPhone')}</a>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-2 mt-3">
                                        <button
                                            type="button"
                                            onClick={() => setIsIvrConsoleOpen(true)}
                                            className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                                        >
                                            <PhoneCall className="w-3.5 h-3.5" />
                                            <span>{t('IVRLabel') || 'تلفن گویا و سافت‌فون (IVR)'}</span>
                                        </button>

                                        <a
                                            href="https://my.dartamas.com/directLink/61be6882-8824-4c31-8903-aaf074248aa5"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
                                            title="تماس رایگان اینترنتی از طریق پلتفرم درتماس (دفتر شما)"
                                        >
                                            <Globe className="w-3.5 h-3.5" />
                                            <span>تماس اینترنتی درتماس</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Interactive Map */}
                        <div className="relative h-80 rounded-xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-700">
                            <div className="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 flex-col"><MapPin className="w-12 h-12 mb-2 text-primary" /><span>Interactive Map Disabled in Preview</span></div>
                        </div>
                    </div>
                </div>

                {/* Matrix Section */}
                <div className="mt-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-display font-extrabold text-primary-dark dark:text-white mb-6">{t('CommMatrixTitle')}</h2>
                        <p className="text-lg text-text-light dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">{t('CommMatrixSubtitle')}</p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <CommTierCard 
                            title={t('CommTier1Title')} 
                            description={t('CommTier1Desc')} 
                            color="border-accent-dark dark:border-accent-yellow"
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent-dark dark:text-accent-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
                        />
                        <CommTierCard 
                            title={t('CommTier2Title')} 
                            description={t('CommTier2Desc')} 
                            color="border-primary"
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>}
                        />
                        <CommTierCard 
                            title={t('CommTier3Title')} 
                            description={t('CommTier3Desc')} 
                            color="border-green-500"
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
                        />
                    </div>

                    <div className="bg-gray-50 dark:bg-slate-900 rounded-2xl p-8 md:p-12 border border-gray-200 dark:border-slate-800">
                        <div className="grid lg:grid-cols-12 gap-12">
                            <div className="lg:col-span-5">
                                <h3 className="text-2xl font-display font-bold text-primary-dark dark:text-white mb-6">{t('CommFlowTitle')}</h3>
                                <div className="relative pl-8 border-l-2 border-dashed border-gray-300 dark:border-slate-700 space-y-8">
                                    <div className="relative">
                                        <div className="absolute -left-[41px] top-0 w-6 h-6 bg-primary rounded-full border-4 border-gray-50 dark:border-slate-900"></div>
                                        <h4 className="font-bold text-text-dark dark:text-white mb-1">{t('CommFlowInput')}</h4>
                                        <p className="text-sm text-text-light dark:text-slate-400" dir="ltr">{t('GlobalAccessPhone')}</p>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute -left-[41px] top-0 w-6 h-6 bg-secondary rounded-full border-4 border-gray-50 dark:border-slate-900"></div>
                                        <h4 className="font-bold text-text-dark dark:text-white mb-1">{t('CommFlowProcess')}</h4>
                                        <p className="text-sm text-text-light dark:text-slate-400">AI-Driven IVR & Auth Gateway</p>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute -left-[41px] top-0 w-6 h-6 bg-green-500 rounded-full border-4 border-gray-50 dark:border-slate-900"></div>
                                        <h4 className="font-bold text-text-dark dark:text-white mb-1">{t('CommFlowOutput')}</h4>
                                        <p className="text-sm text-text-light dark:text-slate-400">Strategic / Ops / Support</p>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-7">
                                <Accordion title={t('OperationalModelFunctions')} defaultOpen>
                                     <p>{t('OperationalModelContent')}</p>
                                </Accordion>
                                <Accordion title={t('Tier1Workflow')}>
                                     <p>{t('Tier1WorkflowContent')}</p>
                                </Accordion>
                                 <Accordion title={t('Tier2Workflow')}>
                                     <p>{t('Tier2WorkflowContent')}</p>
                                </Accordion>
                                 <Accordion title={t('Tier3Workflow')}>
                                     <p>{t('Tier3WorkflowContent')}</p>
                                </Accordion>
                                <Accordion title={t('IVREscalationProtocol')}>
                                     <p>{t('IVREscalationContent')}</p>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* IVR Communications Console Modal */}
            {isIvrConsoleOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
                    <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <IvrCommunicationsConsole
                            isOpen={isIvrConsoleOpen}
                            onClose={() => setIsIvrConsoleOpen(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactPage;
