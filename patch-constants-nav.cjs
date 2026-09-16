const fs = require('fs');
let content = fs.readFileSync('constants.ts', 'utf8');

// Map GMEL to GMELHub page
content = content.replace(/\{ name: "GMEL", id: "gmel" \},/, '{ name: "GMEL", id: "gmel", page: Page.GMELHub },');

// Add ProjectDevelopment before Contact
// Looking for the end of NAV_LINKS, maybe around Page.Contact
content = content.replace(/(  \{\n    name: Page\.Contact\n  \}\n\];)/, "  {\n    name: Page.ProjectDevelopment\n  },\n$1");

fs.writeFileSync('constants.ts', content);
