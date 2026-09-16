const fs = require('fs');
let content = fs.readFileSync('components/usePWAInstall.ts', 'utf8');

content = content.replace(/window\.addEventListener\('beforeinstallprompt', handleBeforeInstallPrompt\);/g, "try { window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt); } catch(e) {}");
content = content.replace(/window\.addEventListener\('appinstalled', handleAppInstalled\);/g, "try { window.addEventListener('appinstalled', handleAppInstalled); } catch(e) {}");

content = content.replace(/window\.removeEventListener\('beforeinstallprompt', handleBeforeInstallPrompt\);/g, "try { window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt); } catch(e) {}");
content = content.replace(/window\.removeEventListener\('appinstalled', handleAppInstalled\);/g, "try { window.removeEventListener('appinstalled', handleAppInstalled); } catch(e) {}");

fs.writeFileSync('components/usePWAInstall.ts', content);
