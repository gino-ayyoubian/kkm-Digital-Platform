const fs = require('fs');
let content = fs.readFileSync('firebase.ts', 'utf8');

content = content.replace(/export const perf = getPerformance\(app\);/, "export let perf = null;\ntry {\n  if (typeof window !== 'undefined') {\n    perf = getPerformance(app);\n  }\n} catch(e) {\n  console.warn('Firebase Performance initialization failed (possibly restricted storage):', e);\n}");

fs.writeFileSync('firebase.ts', content);
