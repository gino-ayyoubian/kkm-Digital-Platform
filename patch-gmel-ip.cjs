const fs = require('fs');
let content = fs.readFileSync('pages/GMELHubPage.tsx', 'utf8');

// Ensure IPBadge is imported
if (!content.includes('import IPBadge')) {
    content = content.replace(/(import .*?;[\n\r]+)(?!import)/, "$1import IPBadge from '../components/IPBadge';\n");
}

const gmelIP = `
          <h1 className="text-4xl md:text-6xl font-display font-black mb-4">GMEL Platform</h1>
          <div className="flex flex-wrap gap-2 mb-6">
              <IPBadge status="Invented by" text="KKM International Group" />
              <IPBadge status="Patent Filed" text="System Architecture" />
              <IPBadge status="Commercialization Rights" text="Global" />
          </div>
          <p className="text-xl text-slate-300 max-w-3xl">
`;

content = content.replace(/<h1 className="text-4xl md:text-6xl font-display font-black mb-4">GMEL Platform<\/h1>\s*<p className="text-xl text-slate-300 max-w-3xl">/, gmelIP);

fs.writeFileSync('pages/GMELHubPage.tsx', content);
