const fs = require('fs');

let indexContent = fs.readFileSync('index.tsx', 'utf8');

// Replace the navigator.serviceWorker.register logic
const safeSw = `
try {
  if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      try {
        navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(e => console.warn('SW register failed', e));
      } catch (err) {
        console.warn('SW register sync fail', err);
      }
    });
  }
} catch (e) {
  console.warn('Service Worker access restricted', e);
}
`;

indexContent = indexContent.replace(/try \{\n  if \('serviceWorker' in navigator\) \{[\s\S]*?\} catch \(e\) \{\n  console\.warn\('Service Worker access restricted', e\);\n\}/, safeSw.trim());
fs.writeFileSync('index.tsx', indexContent);

