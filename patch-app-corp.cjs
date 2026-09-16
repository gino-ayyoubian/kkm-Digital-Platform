const fs = require('fs');

// Update types.ts
let types = fs.readFileSync('types.ts', 'utf8');
types = types.replace(/IPCenter = 'IP Center',/, "IPCenter = 'IP Center',\n  CorporateInfo = 'Corporate Information',");
fs.writeFileSync('types.ts', types);

// Update translations.ts
let trans = fs.readFileSync('translations.ts', 'utf8');
trans = trans.replace(/'IP Center': 'IP & Tech Center',/, "'IP Center': 'IP & Tech Center',\n    'Corporate Information': 'Corporate Information',");
trans = trans.replace(/'IP Center': 'مرکز IP و فناوری',/, "'IP Center': 'مرکز IP و فناوری',\n    'Corporate Information': 'اطلاعات شرکتی',");
fs.writeFileSync('translations.ts', trans);

// Update App.tsx
let app = fs.readFileSync('App.tsx', 'utf8');
app = app.replace(/(import IPCenterPage from '\.\/pages\/IPCenterPage';)/, "$1\nimport CorporateInfoPage from './pages/CorporateInfoPage';");
app = app.replace(/(case Page\.IPCenter:[\s\S]*?return <IPCenterPage setPage=\{setPage\} \/>;)/, "$1\n      case Page.CorporateInfo:\n        return <CorporateInfoPage setPage={setPage} />;");
fs.writeFileSync('App.tsx', app);
