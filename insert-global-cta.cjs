const fs = require('fs');

const insertCTA = (file) => {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('GlobalCTA')) {
        content = content.replace(/(import .*?;[\n\r]+)(?!import)/, "$1import GlobalCTA from '../components/GlobalCTA';\n");
    }
    
    // Most pages have a main div wrapper, we can just replace the last closing div before the return statement finishes.
    // However, finding the last closing div might be tricky. Let's use regex to find the very end of the component return.
    const regex = /<\/div>\s*\)\s*;\s*\}\s*;/;
    if (regex.test(content) && !content.includes('<GlobalCTA')) {
        content = content.replace(/<\/div>(\s*\)\s*;\s*\}\s*;)/, "\n      <GlobalCTA setPage={setPage} />\n    </div>$1");
        fs.writeFileSync(file, content);
        console.log(`Patched ${file}`);
    } else {
        // Handle ProjectsPage which returns </>
        const regexFragment = /<\/>(\s*\)\s*;\s*\}\s*;)/;
        if (regexFragment.test(content) && !content.includes('<GlobalCTA')) {
            content = content.replace(/<\/>(\s*\)\s*;\s*\}\s*;)/, "\n      <GlobalCTA setPage={setPage} />\n    </>$1");
            fs.writeFileSync(file, content);
            console.log(`Patched ${file} (Fragment)`);
        }
    }
}

['pages/HomePage.tsx', 'pages/AboutUsPage.tsx', 'pages/CoreTechnologiesPage.tsx', 'pages/DigitalTwinHubPage.tsx', 'pages/ProjectsPage.tsx'].forEach(insertCTA);
