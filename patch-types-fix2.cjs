const fs = require('fs');
let content = fs.readFileSync('types.ts', 'utf8');

const targetStr = `  // Business Development Hub
  TechnologyTemplate = 'Technology Template',
  GMELHub = 'GMEL Hub',
  PilotRequest = 'Pilot Request',
  ProjectDevelopment = 'Project Development',
  InvestmentPortal = 'Investment Portal',
  IPCenter = 'IP Center',`;

content = content.replace(targetStr, '');

fs.writeFileSync('types.ts', content);
