const fs = require('fs');
let content = fs.readFileSync('pages/HomePage.tsx', 'utf8');

content = content.replace(/t\('ExploreKKM'\)/, "t('CTA_ExploreTechnology')");
content = content.replace(/t\('PartnerWithUs'\)/, "t('CTA_PartnerWithKKM')");
content = content.replace(/t\('Card_NextStep'\)/, "t('CTA_RequestProjectAssessment')");
content = content.replace(/t\('CTA_Technology'\)/, "t('CTA_RequestTechnicalInfo')");
content = content.replace(/t\('CTA_IP'\)/, "t('CTA_RequestNDA')");
content = content.replace(/t\('CTA_Applications'\)/, "t('CTA_DiscussPilot')");

fs.writeFileSync('pages/HomePage.tsx', content);
