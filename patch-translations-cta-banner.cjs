const fs = require('fs');
let content = fs.readFileSync('translations.ts', 'utf8');

const en = `
    'ReadyToInnovate': 'Ready to Engineer the Future?',
    'ReadyToInnovateDesc': 'Partner with KKM International Group to deploy transformative engineering solutions for your next giga-project.',
`;
const fa = `
    'ReadyToInnovate': 'آماده مهندسی آینده هستید؟',
    'ReadyToInnovateDesc': 'برای استقرار راه‌حل‌های مهندسی تحول‌آفرین در پروژه کلان بعدی خود با گروه بین‌المللی KKM مشارکت کنید.',
`;

content = content.replace(/('InquiryType': 'Inquiry Type',)/, "$1" + en);
content = content.replace(/('InquiryType': 'نوع درخواست',)/, "$1" + fa);

fs.writeFileSync('translations.ts', content);
