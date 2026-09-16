const fs = require('fs');
let content = fs.readFileSync('translations.ts', 'utf8');

const enKeys = `
    'Stat_BuildingCapability': 'Building Capability',
    'Stat_DevelopingTech': 'Developing Technology',
    'Stat_CreatingProjects': 'Creating Projects',
`;

const faKeys = `
    'Stat_BuildingCapability': 'ایجاد توانمندی',
    'Stat_DevelopingTech': 'توسعه فناوری',
    'Stat_CreatingProjects': 'خلق پروژه‌ها',
`;

content = content.replace(/('HeroDesc': 'Developing integrated solutions across energy, water, infrastructure, industrial technology, AI, and sustainable development.',)/, "$1\n" + enKeys);
content = content.replace(/('HeroDesc': 'توسعه راه‌حل‌های یکپارچه در حوزه‌های انرژی، آب، زیرساخت، فناوری صنعتی، هوش مصنوعی و توسعه پایدار.',)/, "$1\n" + faKeys);

fs.writeFileSync('translations.ts', content);
