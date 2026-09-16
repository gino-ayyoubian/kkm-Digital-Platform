const fs = require('fs');

// 1. App.tsx
let appContent = fs.readFileSync('App.tsx', 'utf8');
appContent = appContent.replace(/setPageWrapper/g, "setCurrentPage");
appContent = appContent.replace(/<SEOHead([^>]*)jsonLdSchema=\{/g, "<SEOHead$1customSchema={");
appContent = appContent.replace(/<CoreTechnologiesPage \/>/g, "<CoreTechnologiesPage setPage={setCurrentPage} />");
fs.writeFileSync('App.tsx', appContent);

// 2. SEOHead.tsx (no need if we fix App.tsx, but verify property name)
// In SEOHead.tsx it's `customSchema`.

// 3. ContactPage.tsx
let contactContent = fs.readFileSync('pages/ContactPage.tsx', 'utf8');
contactContent = contactContent.replace(/setFormData\(\{ name: '', email: '', subject: '', message: '', _gotcha: '' \}\);/g, "setFormData({ name: '', email: '', subject: '', message: '', _gotcha: '', inquiryType: 'General Inquiry' });");
contactContent = contactContent.replace(/handleChange = \(e: React.ChangeEvent<HTMLInputElement \| HTMLTextAreaElement>\) => \{/g, "handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {");
fs.writeFileSync('pages/ContactPage.tsx', contactContent);

// 4. CoreTechnologiesPage.tsx
let coreTechContent = fs.readFileSync('pages/CoreTechnologiesPage.tsx', 'utf8');
coreTechContent = coreTechContent.replace(/const CoreTechnologiesPage: React\.FC = \(\) => \{/, "const CoreTechnologiesPage: React.FC<{ setPage?: any }> = ({ setPage }) => {");
fs.writeFileSync('pages/CoreTechnologiesPage.tsx', coreTechContent);

// 5. ExhibitionPage.tsx
let exhibitionContent = fs.readFileSync('pages/ExhibitionPage.tsx', 'utf8');
exhibitionContent = exhibitionContent.replace(/interest: e\.target\.value/g, "category: e.target.value");
fs.writeFileSync('pages/ExhibitionPage.tsx', exhibitionContent);

console.log("All TS errors patched");
