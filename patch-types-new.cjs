const fs = require('fs');
let content = fs.readFileSync('types.ts', 'utf8');

const newEnums = `
  // Business Development Hub
  TechnologyTemplate = 'Technology Template',
  GMELHub = 'GMEL Hub',
  PilotRequest = 'Pilot Request',
  ProjectDevelopment = 'Project Development',
  InvestmentPortal = 'Investment Portal',
  IPCenter = 'IP Center',
`;

content = content.replace(/(InternalPortal = 'Internal Portal',\n  Offline = 'Offline Mode',)/, "$1\n" + newEnums);

fs.writeFileSync('types.ts', content);
