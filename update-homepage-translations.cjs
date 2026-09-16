const fs = require('fs');
let content = fs.readFileSync('translations.ts', 'utf8');

const enKeys = `
    // Home Redesign
    'HeroDesc': 'Developing integrated solutions across energy, water, infrastructure, industrial technology, AI, and sustainable development.',
    'ExploreKKM': 'Explore KKM',
    
    'WhatWeDoTitle': 'What KKM Does',
    'SectorEnergy': 'Energy',
    'SectorWater': 'Water',
    'SectorInfrastructure': 'Infrastructure',
    'SectorIndustrial': 'Industrial Technology',
    'SectorAIDigital': 'AI & Digital',
    'SectorSustainable': 'Sustainable Development',

    'ValueChainTitle': 'Integrated Value Chain',
    'VC_Evidence': 'Evidence',
    'VC_Technology': 'Technology',
    'VC_IP': 'IP',
    'VC_Prototype': 'Prototype',
    'VC_Pilot': 'Pilot',
    'VC_Product': 'Product',
    'VC_Project': 'Project',
    'VC_Platform': 'Platform',
    'VC_Scale': 'Scale',
    'VC_Internationalization': 'Internationalization',

    'FlagshipTechTitle': 'Flagship Technology',
    'GMEL_Intro': 'GMEL is a decentralized, intelligent micro-grid architecture integrating renewable generation, advanced thermal management, and robust energy storage. It forms the backbone of KKM’s sustainable infrastructure solutions.',
    'CTA_Technology': 'Technology',
    'CTA_IP': 'IP',
    'CTA_Applications': 'Applications',

    'RuralDevTitle': 'KKM Rural & Nomadic Development Platform',
    'Rural_Agriculture': 'Agriculture',
    'Rural_Investment': 'Investment',
    'ExploreRuralDev': 'Explore Rural Development',

    'FlagshipProjectsTitle': 'Flagship Projects',
    'Card_Problem': 'Problem',
    'Card_Solution': 'Solution',
    'Card_Technology': 'Technology',
    'Card_Stage': 'Stage',
    'Card_Location': 'Location',
    'Card_Role': 'KKM Role',
    'Card_NextStep': 'Next Step',
`;

const faKeys = `
    // Home Redesign
    'HeroDesc': 'توسعه راه‌حل‌های یکپارچه در حوزه‌های انرژی، آب، زیرساخت، فناوری صنعتی، هوش مصنوعی و توسعه پایدار.',
    'ExploreKKM': 'کشف KKM',
    
    'WhatWeDoTitle': 'کارهایی که KKM انجام می‌دهد',
    'SectorEnergy': 'انرژی',
    'SectorWater': 'آب',
    'SectorInfrastructure': 'زیرساخت',
    'SectorIndustrial': 'فناوری صنعتی',
    'SectorAIDigital': 'هوش مصنوعی و دیجیتال',
    'SectorSustainable': 'توسعه پایدار',

    'ValueChainTitle': 'زنجیره ارزش یکپارچه',
    'VC_Evidence': 'شواهد',
    'VC_Technology': 'فناوری',
    'VC_IP': 'مالکیت فکری',
    'VC_Prototype': 'نمونه اولیه',
    'VC_Pilot': 'پایلوت',
    'VC_Product': 'محصول',
    'VC_Project': 'پروژه',
    'VC_Platform': 'پلتفرم',
    'VC_Scale': 'مقیاس',
    'VC_Internationalization': 'بین‌المللی‌سازی',

    'FlagshipTechTitle': 'فناوری پرچمدار',
    'GMEL_Intro': 'GMEL یک معماری ریزشبکه غیرمتمرکز و هوشمند است که تولید تجدیدپذیر، مدیریت حرارتی پیشرفته و ذخیره انرژی قوی را ادغام می‌کند. این پلتفرم ستون فقرات راه‌حل‌های زیرساخت پایدار KKM را تشکیل می‌دهد.',
    'CTA_Technology': 'فناوری',
    'CTA_IP': 'مالکیت فکری',
    'CTA_Applications': 'کاربردها',

    'RuralDevTitle': 'پلتفرم توسعه روستایی و عشایری KKM',
    'Rural_Agriculture': 'کشاورزی',
    'Rural_Investment': 'سرمایه‌گذاری',
    'ExploreRuralDev': 'کشف توسعه روستایی',

    'FlagshipProjectsTitle': 'پروژه‌های پرچمدار',
    'Card_Problem': 'چالش',
    'Card_Solution': 'راه‌حل',
    'Card_Technology': 'فناوری',
    'Card_Stage': 'مرحله',
    'Card_Location': 'مکان',
    'Card_Role': 'نقش KKM',
    'Card_NextStep': 'گام بعدی',
`;

content = content.replace(/(\[Page\.Offline\]: 'Offline Mode',)/, "$1\n" + enKeys);
content = content.replace(/(\[Page\.Offline\]: 'حالت آفلاین',)/, "$1\n" + faKeys);

fs.writeFileSync('translations.ts', content);
