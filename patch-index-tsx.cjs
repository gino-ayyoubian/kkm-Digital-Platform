const fs = require('fs');
let content = fs.readFileSync('index.tsx', 'utf8');

content = content.replace(/(import \{ AuthProvider \} from '\.\/AuthContext';)/, "$1\nimport { HelmetProvider } from 'react-helmet-async';");

content = content.replace(/(<React\.StrictMode>)/, "$1\n    <HelmetProvider>");
content = content.replace(/(<\/React\.StrictMode>)/, "    </HelmetProvider>\n$1");

fs.writeFileSync('index.tsx', content);
