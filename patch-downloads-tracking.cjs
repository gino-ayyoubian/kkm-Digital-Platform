const fs = require('fs');
let content = fs.readFileSync('pages/DownloadsPage.tsx', 'utf8');

if (!content.includes('import { trackDownload }')) {
    content = content.replace(/(import .*?;[\n\r]+)(?!import)/, "$1import { trackDownload } from '../lib/analytics';\n");
    content = content.replace(/alert\('Download initiated for ' \+ doc\.title\)/g, "trackDownload(doc.title, doc.version); alert('Download initiated for ' + doc.title)");
    fs.writeFileSync('pages/DownloadsPage.tsx', content);
}
