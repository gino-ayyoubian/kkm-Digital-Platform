const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

const newImports = `
import TechnologyTemplatePage from './pages/TechnologyTemplatePage';
import GMELHubPage from './pages/GMELHubPage';
import PilotRequestPage from './pages/PilotRequestPage';
import ProjectDevelopmentPage from './pages/ProjectDevelopmentPage';
import InvestmentPortalPage from './pages/InvestmentPortalPage';
import IPCenterPage from './pages/IPCenterPage';
import RuralDevelopmentPage from './pages/RuralDevelopmentPage';
`;

// Inject new imports after last page import
content = content.replace(/(import SearchResultsPage from '\.\/pages\/SearchResultsPage';)/, "$1\n" + newImports);

const newRoutes = `
      case Page.TechnologyTemplate:
        return <TechnologyTemplatePage setPage={setPage} />;
      case Page.GMELHub:
        return <GMELHubPage setPage={setPage} />;
      case Page.PilotRequest:
        return <PilotRequestPage setPage={setPage} />;
      case Page.ProjectDevelopment:
        return <ProjectDevelopmentPage setPage={setPage} />;
      case Page.InvestmentPortal:
      case Page.Invest: // Map Invest to InvestmentPortal
        return <InvestmentPortalPage setPage={setPage} />;
      case Page.IPCenter:
      case Page.InnovationHub: // Map IP to IPCenter
        return <IPCenterPage setPage={setPage} />;
      case Page.RuralStudies:
        return <RuralDevelopmentPage setPage={setPage} />;
`;

// Replace existing fallthroughs or insert into switch statement.
// Find:
/*
      case Page.InnovationHub:
      case Page.CarbonCredit:
*/
// Actually, let's just insert before default:

content = content.replace(/(default:\n        return <HomePage setPage={setPage} \/>;)/, newRoutes + "\n      $1");

// Now we need to remove duplicate cases if they exist. Page.Invest, Page.InnovationHub, Page.RuralStudies are currently mapped to Coming Soon. Let's remove them from the ComingSoon section.

content = content.replace(/case Page\.RuralStudies:\n/g, "");
content = content.replace(/case Page\.Invest:\n/g, "");
content = content.replace(/case Page\.InnovationHub:\n/g, "");

fs.writeFileSync('App.tsx', content);
