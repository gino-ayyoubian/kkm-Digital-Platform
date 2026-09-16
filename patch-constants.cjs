const fs = require('fs');
let content = fs.readFileSync('constants.ts', 'utf8');

const newNav = `export const NAV_LINKS: NavLink[] = [
  { name: Page.Home },
  { 
    name: Page.AboutUs, 
    subLinks: [
      { name: "Who We Are", id: "who-we-are" },
      { name: "Vision & Mission", id: "vision-mission" },
      { name: "Leadership", id: "leadership" },
      { name: "Organization", id: "organization" },
      { name: "Capabilities", id: "capabilities" },
      { name: "Corporate Information", id: "corporate-info" }
    ]
  },
  {
    name: Page.Technology,
    subLinks: [
      { name: "Energy", id: "energy" },
      { name: "Water", id: "water" },
      { name: "Infrastructure", id: "infrastructure" },
      { name: "Industrial Technology", id: "industrial" },
      { name: "AI & Digital", id: "ai-digital" },
      { name: "Agriculture & Food", id: "agriculture" },
      { name: "Materials", id: "materials" }
    ]
  },
  {
    name: Page.Ecosystems,
    subLinks: [
      { name: "GMEL", id: "gmel" },
      { name: "KKM-IEH", id: "kkm-ieh" },
      { name: "GILT", id: "gilt" },
      { name: "GNOVA", id: "gnova" },
      { name: "KKM Digitalization", id: "kkm-digitalization", page: Page.DigitalTwinHub }
    ]
  },
  {
    name: Page.Projects,
    subLinks: [
      { name: "Flagship Projects", id: "flagship" },
      { name: "Pilots", id: "pilots" },
      { name: "Project Pipeline", id: "pipeline" },
      { name: "Case Studies", id: "case-studies" }
    ]
  },
  {
    name: Page.RuralStudies,
    subLinks: [
      { name: "Integrated Rural Model", id: "integrated-model" },
      { name: "Energy", id: "rural-energy" },
      { name: "Water", id: "rural-water" },
      { name: "Agriculture", id: "rural-agriculture" },
      { name: "Infrastructure", id: "rural-infrastructure" },
      { name: "AI / Digital", id: "rural-ai" },
      { name: "Investment", id: "rural-investment" }
    ]
  },
  {
    name: Page.InnovationHub,
    subLinks: [
      { name: "Patents", id: "patents" },
      { name: "Technology Portfolio", id: "tech-portfolio" },
      { name: "R&D", id: "rnd" },
      { name: "Innovation Hub", id: "innovation-hub" },
      { name: "Commercialization", id: "commercialization" }
    ]
  },
  {
    name: Page.Invest,
    subLinks: [
      { name: "Investment Opportunities", id: "invest-opps" },
      { name: "Strategic Partnerships", id: "strategic-partnerships" },
      { name: "Technology Licensing", id: "tech-licensing" },
      { name: "EPC / EPCM", id: "epc-epcm" },
      { name: "Become a Partner", id: "become-partner" }
    ]
  },
  {
    name: Page.Insights,
    subLinks: [
      { name: "News", id: "news", page: Page.News },
      { name: "Research", id: "research" },
      { name: "Technical Papers", id: "tech-papers" },
      { name: "Reports", id: "reports" }
    ]
  },
  {
    name: Page.Contact,
    subLinks: [
      { name: "Contact KKM", id: "contact-kkm" },
      { name: "Project Inquiry", id: "project-inquiry" },
      { name: "Partnership Inquiry", id: "partnership-inquiry" },
      { name: "Investment Inquiry", id: "investment-inquiry" }
    ]
  }
];`;

content = content.replace(/export const NAV_LINKS: NavLink\[\] = \[[\s\S]*?\];/, newNav);
fs.writeFileSync('constants.ts', content);
