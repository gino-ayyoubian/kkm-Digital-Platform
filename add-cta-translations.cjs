const fs = require('fs');
let content = fs.readFileSync('translations.ts', 'utf8');

const enCTAs = `
    'CTA_RequestProjectAssessment': 'Request a Project Assessment',
    'CTA_DiscussPilot': 'Discuss a Pilot',
    'CTA_PartnerWithKKM': 'Partner With KKM',
    'CTA_InvestWithKKM': 'Invest With KKM',
    'CTA_RequestTechnicalInfo': 'Request Technical Information',
    'CTA_RequestNDA': 'Request NDA',
    'CTA_ExploreTechnology': 'Explore Technology',
    'CTA_GeneralInquiry': 'General Inquiry',
    'CTA_ProjectInquiry': 'Project Inquiry',
    'CTA_TechnologyPartnership': 'Technology Partnership',
    'CTA_Investment': 'Investment',
    'CTA_ResearchCollaboration': 'Research Collaboration',
    'CTA_Media': 'Media',
    'CTA_RuralPilot': 'Rural Pilot',
    'InquiryType': 'Inquiry Type',
`;

const faCTAs = `
    'CTA_RequestProjectAssessment': 'درخواست ارزیابی پروژه',
    'CTA_DiscussPilot': 'مذاکره برای پایلوت',
    'CTA_PartnerWithKKM': 'شراکت با KKM',
    'CTA_InvestWithKKM': 'سرمایه‌گذاری با KKM',
    'CTA_RequestTechnicalInfo': 'درخواست اطلاعات فنی',
    'CTA_RequestNDA': 'درخواست توافق‌نامه محرمانگی (NDA)',
    'CTA_ExploreTechnology': 'بررسی فناوری',
    'CTA_GeneralInquiry': 'پرسش عمومی',
    'CTA_ProjectInquiry': 'پرسش درباره پروژه',
    'CTA_TechnologyPartnership': 'شراکت فناوری',
    'CTA_Investment': 'سرمایه‌گذاری',
    'CTA_ResearchCollaboration': 'همکاری پژوهشی',
    'CTA_Media': 'رسانه',
    'CTA_RuralPilot': 'پایلوت توسعه روستایی',
    'InquiryType': 'نوع درخواست',
`;

content = content.replace(/('ExploreKKM': 'Explore KKM',)/, "$1" + enCTAs);
content = content.replace(/('ExploreTech': 'کشف فناوری‌های ما',)/, "$1" + faCTAs);

fs.writeFileSync('translations.ts', content);
