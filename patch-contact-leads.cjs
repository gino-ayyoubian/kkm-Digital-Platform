const fs = require('fs');
let content = fs.readFileSync('pages/ContactPage.tsx', 'utf8');

// Update imports
if (!content.includes('import { trackFormSubmission, parseUTMParams }')) {
    content = content.replace(/(import .*?;[\n\r]+)(?!import)/, "$1import { trackFormSubmission, parseUTMParams } from '../lib/analytics';\nimport { db } from '../firebase';\nimport { collection, addDoc, serverTimestamp } from 'firebase/firestore';\n");
}

const submissionLogic = `
        if (isValid) {
            setIsSubmitting(true);
            try {
                const utms = parseUTMParams();
                const leadData = {
                    name: formData.name,
                    organization: 'N/A', // Assuming not in form
                    country: 'N/A',
                    category: 'Customer', // Default mapping
                    status: 'New',
                    source: 'Contact Page - ' + formData.inquiryType,
                    message: \`Email: \${formData.email}\\nSubject: \${formData.subject}\\nMessage: \${formData.message}\`,
                    utmData: utms,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp()
                };
                
                await addDoc(collection(db, 'leads'), leadData);
                trackFormSubmission('contact_inquiry', formData.inquiryType, utms);
                
                setFormStatus('success');
            } catch (err) {
                console.error("Submission failed", err);
                setFormStatus('error');
            } finally {
                setIsSubmitting(false);
            }
        }
`;

content = content.replace(/if \(isValid\) \{\s*setIsSubmitting\(true\);\s*setTimeout\(\(\) => \{\s*setIsSubmitting\(false\);\s*setFormStatus\('success'\);\s*\}, 1500\);\s*\}/, submissionLogic);

fs.writeFileSync('pages/ContactPage.tsx', content);
