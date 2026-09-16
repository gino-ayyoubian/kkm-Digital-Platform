const fs = require('fs');
let content = fs.readFileSync('pages/DownloadsPage.tsx', 'utf8');

content = content.replace(/onClick=\{\(\) => trackDownload\(doc\.title, doc\.version\); alert\('Download initiated for ' \+ doc\.title\)\}/g, "onClick={() => { trackDownload(doc.title, doc.version); alert('Download initiated for ' + doc.title); }}");

fs.writeFileSync('pages/DownloadsPage.tsx', content);
