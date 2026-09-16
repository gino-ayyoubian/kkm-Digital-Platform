const fs = require('fs');
let content = fs.readFileSync('pages/NewsPage.tsx', 'utf8');

content = content.replace(/t\('News'\)/, "t('NewsInsightsTitle') || t('News')");

fs.writeFileSync('pages/NewsPage.tsx', content);
