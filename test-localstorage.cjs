const fs = require('fs');

const files = [
  'pages/CarbonCreditPage.tsx',
  'components/A11yDebugOverlay.tsx',
  'components/CEOSignatureBanner.tsx',
  'App.tsx',
  'ThemeContext.tsx',
  'lib/analytics.ts',
];

for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    // Ensure all localStorage and sessionStorage are prefixed with window. and wrapped
    content = content.replace(/([^a-zA-Z0-9_])localStorage\./g, "$1window.localStorage.");
    content = content.replace(/([^a-zA-Z0-9_])sessionStorage\./g, "$1window.sessionStorage.");
    fs.writeFileSync(file, content);
  }
}
