const fs = require('fs');
let content = fs.readFileSync('types.ts', 'utf8');

const regex = /\/\/ Business Development Hub[\s\S]*?IPCenter = 'IP Center',\n\}/;
content = content.replace(regex, '}');

fs.writeFileSync('types.ts', content);
