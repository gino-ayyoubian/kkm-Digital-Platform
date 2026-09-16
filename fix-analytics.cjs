const fs = require('fs');
let content = fs.readFileSync('lib/analytics.ts', 'utf8');

const replacement = `
    // Store in localStorage for form submissions
    if (Object.keys(utm).length > 0) {
        try {
            localStorage.setItem('kkm_utm', JSON.stringify(utm));
        } catch (e) {
            console.warn('LocalStorage is disabled or restricted:', e);
        }
        
        if (utm.utm_medium === 'qr') {
             trackConversion('qr_scan', utm);
        }
    }
    
    let stored = null;
    try {
        stored = localStorage.getItem('kkm_utm');
    } catch (e) {
        console.warn('LocalStorage is disabled or restricted:', e);
    }
    
    return stored ? JSON.parse(stored) : utm;
`;

content = content.replace(/\/\/ Store in localStorage for form submissions[\s\S]*?return stored \? JSON\.parse\(stored\) : \{\};/, replacement);

fs.writeFileSync('lib/analytics.ts', content);
