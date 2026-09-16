const fs = require('fs');
let content = fs.readFileSync('types.ts', 'utf8');

const newEnum = `export enum Page {
  Home = 'Home',
  AboutUs = 'About Us',
  Technology = 'Technology',
  Ecosystems = 'KKM Ecosystems',
  Projects = 'Projects',
  RuralStudies = 'Rural & Nomadic Development',
  InnovationHub = 'IP & Innovation',
  Invest = 'Invest & Partner',
  Insights = 'Insights',
  Contact = 'Contact',
  
  // Existing internal pages
  CoreTechnologies = 'Core Technologies',
  DigitalTwinHub = 'Digital Twin Platform',
  DigitalTwinGMEL = 'GMEL Digital Twin',
  DigitalTwinREE = 'River Energy Ecosystem Twin',
  Futures = 'Futures',
  Biomedical = 'Biomedical & Health Innovation',
  SportsManagement = 'Sports Management',
  CarbonCredit = 'Carbon Credits & Offset',
  IntellectualProperty = 'Intellectual Property Office',
  Careers = 'Careers & Engagement',
  News = 'News & Insights',
  Legal = 'Legal & Policies',
  SearchResults = 'Search Results',
  InternalPortal = 'Internal Portal',
  Offline = 'Offline Mode',
}`;

content = content.replace(/export enum Page \{[\s\S]*?\}/, newEnum);
fs.writeFileSync('types.ts', content);
