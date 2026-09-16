const fs = require('fs');
let rules = fs.readFileSync('firestore.rules', 'utf8');

const leadsMatch = `
    match /leads/{leadId} {
      allow create: if true; // Public can create leads (forms)
      allow read, update, delete: if isAdmin();
    }
    
    match /contentArticles/{articleId} {
      allow read: if resource.data.status == 'Publish' || isAuthenticated();
      allow create, update: if isAuthenticated(); // Internal portal logic
      allow delete: if isAdmin();
    }
`;

rules = rules.replace(/}\s*$/, leadsMatch + "\n  }\n");
fs.writeFileSync('firestore.rules', rules);
