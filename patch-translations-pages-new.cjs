const fs = require('fs');
let content = fs.readFileSync('translations.ts', 'utf8');

const enKeys = `
    'Technology Template': 'Technology Portfolio',
    'GMEL Hub': 'GMEL Platform',
    'Pilot Request': 'Propose a Pilot',
    'Project Development': 'Develop a Project',
    'Investment Portal': 'Invest in KKM',
    'IP Center': 'IP & Tech Center',
`;

const faKeys = `
    'Technology Template': 'پورتفولیوی فناوری',
    'GMEL Hub': 'پلتفرم GMEL',
    'Pilot Request': 'درخواست پروژه آزمایشی',
    'Project Development': 'توسعه یک پروژه',
    'Investment Portal': 'سرمایه‌گذاری در KKM',
    'IP Center': 'مرکز IP و فناوری',
`;

// Inject english
content = content.replace(/('Home': 'Home',)/, "$1\n" + enKeys);

// Inject persian
content = content.replace(/('Home': 'خانه',)/, "$1\n" + faKeys);

fs.writeFileSync('translations.ts', content);
