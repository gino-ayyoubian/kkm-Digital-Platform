const fs = require('fs');
let content = fs.readFileSync('constants.ts', 'utf8');

content = content.replace(/"2023-10-26"/g, '"2026-08-15"');
content = content.replace(/"2023-09-15"/g, '"2026-07-22"');
content = content.replace(/"2023-08-01"/g, '"2026-06-10"');
content = content.replace(/"2023-07-20"/g, '"2026-05-05"');

fs.writeFileSync('constants.ts', content);
