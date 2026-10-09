import fs from 'fs';

// Read file
const code = fs.readFileSync('./translations.ts', 'utf8');

// We can load translations via dynamic import / tsx, but here we can clean up AST or object keys
