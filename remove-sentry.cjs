const fs = require('fs');
let content = fs.readFileSync('index.tsx', 'utf8');

// Completely disable Sentry in dev/preview
content = content.replace(/Sentry\.init\(\{[\s\S]*?\}\);/, "/* Sentry Init Disabled to prevent iframe security errors */");

fs.writeFileSync('index.tsx', content);
