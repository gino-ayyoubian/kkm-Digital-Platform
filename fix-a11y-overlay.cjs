const fs = require('fs');
let content = fs.readFileSync('components/A11yDebugOverlay.tsx', 'utf8');

content = content.replace(/try \{ try \{ localStorage\.setItem\('kkm_a11y_overlay', next \? 'true' : 'false'\); \} catch \(e\) \{\}/g, "try { localStorage.setItem('kkm_a11y_overlay', next ? 'true' : 'false'); } catch(e) {}");
content = content.replace(/try \{ try \{ localStorage\.setItem\('kkm_a11y_overlay', 'false'\); \} catch \(e\) \{\}/g, "try { localStorage.setItem('kkm_a11y_overlay', 'false'); } catch(e) {}");

fs.writeFileSync('components/A11yDebugOverlay.tsx', content);
