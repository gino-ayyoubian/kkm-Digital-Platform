const fs = require('fs');
let content = fs.readFileSync('components/Header.tsx', 'utf8');

content = content.replace(/{subLink\.name}/g, '{t(subLink.name)}');
fs.writeFileSync('components/Header.tsx', content);
