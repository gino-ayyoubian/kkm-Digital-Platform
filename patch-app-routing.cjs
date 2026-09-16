const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

// Add imports
if (!content.includes('import ExhibitionPage')) {
    content = content.replace(/(import .*?;[\n\r]+)(?!import)/, "$1import ExhibitionPage from './pages/ExhibitionPage';\nimport DownloadsPage from './pages/DownloadsPage';\n");
}

// Add to renderPage switch
const exhibitionRoute = `      case Page.Exhibition:
        return <ExhibitionPage setPage={setPageWrapper} />;
      case Page.Downloads:
        return <DownloadsPage setPage={setPageWrapper} />;`;

if (!content.includes('case Page.Exhibition:')) {
    content = content.replace(/(switch\s*\(currentPage\)\s*\{)/, "$1\n" + exhibitionRoute);
}

fs.writeFileSync('App.tsx', content);
