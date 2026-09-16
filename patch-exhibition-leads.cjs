const fs = require('fs');
let content = fs.readFileSync('pages/ExhibitionPage.tsx', 'utf8');

// Update imports
if (!content.includes('import { trackFormSubmission, parseUTMParams }')) {
    content = content.replace(/(import .*?;[\n\r]+)(?!import)/, "$1import { trackFormSubmission, parseUTMParams } from '../lib/analytics';\n");
}

// Ensure the form state has category mapping
content = content.replace(/name: '', organization: '', position: '', country: '', interest: '', preferredDate: '', message: ''/g, "name: '', organization: '', position: '', country: '', category: 'Government', preferredDate: '', message: ''");
content = content.replace(/formData\.interest/g, "formData.category");

// Replace collection and schema
const submissionCode = `
            const utms = parseUTMParams();
            const leadData = {
                name: formData.name,
                organization: formData.organization,
                country: formData.country,
                category: formData.category,
                status: 'New',
                source: 'Exhibition Page QR',
                message: \`Position: \${formData.position}\\nPreferred Date: \${formData.preferredDate}\\nMessage: \${formData.message}\`,
                utmData: utms,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            };
            await addDoc(collection(db, 'leads'), leadData);
            trackFormSubmission('exhibition_booking', formData.category, utms);
`;
content = content.replace(/await addDoc\(collection\(db, 'meetingBookings'\), \{\s*\.\.\.formData,\s*createdAt: serverTimestamp\(\)\s*\}\);/, submissionCode);

// Update dropdown
const dropdown = `
                                            <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-text-dark dark:text-white focus:ring-2 focus:ring-primary dark:focus:ring-secondary">
                                                <option value="Government">Government</option>
                                                <option value="Investor">Investor</option>
                                                <option value="Industrial Partner">Industrial Partner</option>
                                                <option value="Village / Municipality">Village / Municipality</option>
                                                <option value="Research">Research</option>
                                                <option value="Customer">Customer</option>
                                                <option value="Media">Media</option>
                                            </select>
`;
content = content.replace(/<select value=\{formData\.category\} onChange=\{e => setFormData\(\{\.\.\.formData, category: e\.target\.value\}\)\} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-text-dark dark:text-white focus:ring-2 focus:ring-primary dark:focus:ring-secondary">[\s\S]*?<\/select>/, dropdown);

fs.writeFileSync('pages/ExhibitionPage.tsx', content);
