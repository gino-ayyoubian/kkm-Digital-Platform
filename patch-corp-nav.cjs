const fs = require('fs');
let content = fs.readFileSync('constants.ts', 'utf8');

content = content.replace(/\{ name: "Corporate Information", id: "corporate-info" \}/, '{ name: "Corporate Information", id: "corporate-info", page: Page.CorporateInfo }');

fs.writeFileSync('constants.ts', content);
