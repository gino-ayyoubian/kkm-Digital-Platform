const fs = require('fs');
let content = fs.readFileSync('pages/ContactPage.tsx', 'utf8');

// Update Interface
content = content.replace(/subject: string;/, "inquiryType: string;\n    subject: string;");

// Initial State
content = content.replace(/\{ name: '', email: '', subject: '', message: '', _gotcha: '' \}/, "{ name: '', email: '', inquiryType: 'General Inquiry', subject: '', message: '', _gotcha: '' }");

// Replace Subject Field with InquiryType Select
const selectField = `
                                        <FormField id="inquiryType" label={t('InquiryType')} error={errors.inquiryType}>
                                            <div className="relative">
                                                <select
                                                    id="inquiryType"
                                                    name="inquiryType"
                                                    value={formData.inquiryType}
                                                    onChange={handleChange}
                                                    className={\`\${getInputClass('inquiryType', formData.inquiryType)} appearance-none\`}
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
`;

content = content.replace(/<FormField id="subject" label=\{t\('Subject'\)\} error=\{errors\.subject\}>[\s\S]*?<\/FormField>/, selectField);

// Optional: Add note about internal lead routing
const submitSection = `
                                        <div className="pt-2">
                                            <p className="text-xs text-text-light dark:text-slate-400 mb-4 text-center">
                                                * Inquiries are automatically routed to the appropriate internal department based on the selected inquiry type.
                                            </p>
                                            <button
`;

content = content.replace(/<div className="pt-2">\s*<button/, submitSection);

fs.writeFileSync('pages/ContactPage.tsx', content);
