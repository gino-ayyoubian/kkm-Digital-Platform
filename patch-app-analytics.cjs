const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

// Add import
if (!content.includes('import { trackPageView, parseUTMParams }')) {
    content = content.replace(/(import .*?;[\n\r]+)(?!import)/, "$1import { trackPageView, parseUTMParams } from './lib/analytics';\n");
}

// Add page view tracking
const trackingEffect = `
  React.useEffect(() => {
    trackPageView(currentPage, window.location.href);
  }, [currentPage]);

  React.useEffect(() => {
    parseUTMParams(); // Parse and store UTMs on load
  }, []);
`;

if (!content.includes('trackPageView(currentPage')) {
    content = content.replace(/(const \[currentPage, setCurrentPage\] = React\.useState<Page>\(Page\.Home\);)/, "$1\n" + trackingEffect);
    fs.writeFileSync('App.tsx', content);
}
