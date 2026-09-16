const fs = require('fs');
let content = fs.readFileSync('types.ts', 'utf8');

content = content.replace(/(export enum Page \{)/, "$1\n  Exhibition = 'Exhibition',\n  Downloads = 'Downloads',");

fs.writeFileSync('types.ts', content);
