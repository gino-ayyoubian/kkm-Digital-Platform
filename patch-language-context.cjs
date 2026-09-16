const fs = require('fs');
let content = fs.readFileSync('LanguageContext.tsx', 'utf8');

content = content.replace(/export type Language = 'EN' | 'FA' | 'KU' | 'AR';/, "export type Language = 'EN' | 'FA' | 'KU' | 'AR' | 'RU';");

fs.writeFileSync('LanguageContext.tsx', content);
