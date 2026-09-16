const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

// Modify the mount effect
const replacement = `
  React.useEffect(() => {
    try {
        const path = window.location.pathname;
        const params = new URLSearchParams(window.location.search);
        const pageParam = params.get('page');
        
        if (path === '/rural' || path === '/rural-development') {
             setCurrentPage(Page.Exhibition);
             return;
        }

        if (pageParam) {
          const pageEnum = Object.values(Page).find(p => p.replace(/\\s/g, '') === pageParam);
          if (pageEnum) {
            setCurrentPage(pageEnum);
          }
        }
    } catch (e) {
        console.warn("Failed to parse URL parameters:", e);
    }
  }, []);
`;

content = content.replace(/React\.useEffect\(\(\) => \{\s*try \{\s*const params = new URLSearchParams\(window\.location\.search\);[\s\S]*?\}, \[\]\);/, replacement);

fs.writeFileSync('App.tsx', content);
