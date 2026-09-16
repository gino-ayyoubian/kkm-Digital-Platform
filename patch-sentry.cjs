const fs = require('fs');
let content = fs.readFileSync('index.tsx', 'utf8');

content = content.replace(/Sentry\.replayIntegration\(\),/, "// Sentry.replayIntegration(), // Disabled due to iframe security constraints");
content = content.replace(/replaysSessionSampleRate: 0\.1,/, "// replaysSessionSampleRate: 0.1,");
content = content.replace(/replaysOnErrorSampleRate: 1\.0,/, "// replaysOnErrorSampleRate: 1.0,");

fs.writeFileSync('index.tsx', content);
