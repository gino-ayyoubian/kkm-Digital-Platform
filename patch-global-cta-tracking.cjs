const fs = require('fs');
let content = fs.readFileSync('components/GlobalCTA.tsx', 'utf8');

if (!content.includes('import { trackCTA }')) {
    content = content.replace(/(import .*?;[\n\r]+)(?!import)/, "$1import { trackCTA } from '../lib/analytics';\n");
    
    // Replace onClick logic to include tracking
    content = content.replace(/onClick=\{\(\) => setPage\(primaryActionUrl\)\}/g, "onClick={() => { trackCTA(primaryActionKey, primaryActionUrl); setPage(primaryActionUrl); }}");
    content = content.replace(/onClick=\{\(\) => setPage\(secondaryActionUrl\)\}/g, "onClick={() => { trackCTA(secondaryActionKey, secondaryActionUrl); setPage(secondaryActionUrl); }}");
    
    fs.writeFileSync('components/GlobalCTA.tsx', content);
}
