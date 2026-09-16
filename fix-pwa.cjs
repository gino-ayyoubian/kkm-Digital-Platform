const fs = require('fs');
let config = fs.readFileSync('vite.config.ts', 'utf8');

config = config.replace(/registerType: 'autoUpdate',/, "registerType: 'autoUpdate',\n          injectRegister: false,");
fs.writeFileSync('vite.config.ts', config);

let indexContent = fs.readFileSync('index.tsx', 'utf8');
const swCode = `
try {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(e => console.warn('SW register failed', e));
    });
  }
} catch (e) {
  console.warn('Service Worker access restricted', e);
}
`;

if (!indexContent.includes('serviceWorker')) {
    indexContent += "\n" + swCode;
    fs.writeFileSync('index.tsx', indexContent);
}
