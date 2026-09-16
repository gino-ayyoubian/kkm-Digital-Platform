const fs = require('fs');

const pages = [
    { file: 'pages/HomePage.tsx', before: '</>' },
    { file: 'pages/AboutUsPage.tsx', before: '</div>\n        </div>\n    );' },
    { file: 'pages/CoreTechnologiesPage.tsx', before: '</div>\n        </div>\n    );' },
    { file: 'pages/ProjectsPage.tsx', before: '</>\n    );' },
    { file: 'pages/DigitalTwinHubPage.tsx', before: '</div>\n    );' }
];

pages.forEach(p => {
    try {
        let content = fs.readFileSync(p.file, 'utf8');
        
        // Add import if not present
        if (!content.includes('GlobalCTA')) {
            content = content.replace(/(import .*?;[\n\r]+)(?!import)/, "$1import GlobalCTA from '../components/GlobalCTA';\n");
        }
        
        // Find last element insertion point depending on structure
        // Let's do a simple regex for the specific page structure
        if (p.file.includes('HomePage')) {
            content = content.replace(/(<Footer setPage=\{setPage\} \/>)/, "<GlobalCTA setPage={setPage} />\n      $1");
            // Wait, HomePage doesn't render Footer! App.tsx renders Footer!
        }
    } catch (e) {
        console.error(e);
    }
});
