const fs = require('node:fs');

const replace = (file, replacements) => {
  let source = fs.readFileSync(file, 'utf8');
  for (const [pattern, value] of replacements) source = source.replace(pattern, value);
  fs.writeFileSync(file, source);
};

// Keep all generated and client-managed SEO metadata on the scanned origin.
for (const file of ['App.tsx', 'components/SEOHead.tsx', 'pages/RuralDevelopmentPage.tsx', 'pages/ClaimRegistryPage.tsx']) {
  if (fs.existsSync(file)) replace(file, [[/https:\/\/www\.kkm-intl\.com/g, 'https://kkm-intl.org']]);
}

// Correct the two h2 -> h4 jumps reported by the audit.
replace('pages/HomePage.tsx', [[
  /<h4 className="font-bold text-sm sm:text-base mb-2 text-slate-900 dark:text-white">/g,
  '<h3 className="font-bold text-sm sm:text-base mb-2 text-slate-900 dark:text-white">'
], [
  /<\/h4>(\s*\n\s*<\/div>\s*\n\s*\)\)}/g,
  '</h3>$1'
]]);
replace('components/CEOSignatureBanner.tsx', [[
  /<h4 className="font-display font-extrabold text-xl text-primary-dark dark:text-white leading-tight whitespace-nowrap">/,
  '<h3 className="font-display font-extrabold text-xl text-primary-dark dark:text-white leading-tight whitespace-nowrap">'
], [
  /<\/h4>(\s*\n\s*<p className="text-xs text-primary)/,
  '</h3>$1'
]]);

// Ensure the production build uses an absolute, valid preview asset.
replace('components/SEOHead.tsx', [[
  /image = 'https:\/\/storage\.googleapis\.com\/aistudio-chat-prod-gemini-image-serving\/e0cfcd0b2fb249f3906371f4b3df36c7'/,
  "image = 'https://kkm-intl.org/social-preview.svg'"
]]);
