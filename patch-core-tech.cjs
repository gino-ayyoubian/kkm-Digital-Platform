const fs = require('fs');
let content = fs.readFileSync('pages/CoreTechnologiesPage.tsx', 'utf8');

content = content.replace(/actionText=\{t\('LearnMore'\)\}/g, "actionText={t('CTA_ExploreTechnology')}");

fs.writeFileSync('pages/CoreTechnologiesPage.tsx', content);
