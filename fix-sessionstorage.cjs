const fs = require('fs');
let content = fs.readFileSync('components/CEOSignatureBanner.tsx', 'utf8');

content = content.replace(/const cached = sessionStorage\.getItem\('kkm-ceo-insight'\);/, "let cached = null; try { cached = sessionStorage.getItem('kkm-ceo-insight'); } catch(e) {}");
content = content.replace(/sessionStorage\.setItem\('kkm-ceo-insight', text\);/, "try { sessionStorage.setItem('kkm-ceo-insight', text); } catch(e) {}");

fs.writeFileSync('components/CEOSignatureBanner.tsx', content);
