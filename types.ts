export enum Page {
  Exhibition = 'Exhibition',
  Downloads = 'Downloads',
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


  CorporateInfo = 'Corporate Information',


  // Business Development Hub
  TechnologyTemplate = 'Technology Template',
  ProjectTemplate = 'Project Template',
  GMELHub = 'GMEL Hub',
  PilotRequest = 'Pilot Request',
  ProjectDevelopment = 'Project Development',
  InvestmentPortal = 'Investment Portal',
  IPCenter = 'IP Center',

}

export interface Project {
    name: string;
    client?: string;
    location?: string;
    scope?: string;
    role?: string;
    technology?: string;
    stage?: string;
    deliverables?: string[];
    results?: string;
    nextPhase?: string;
    description: string;
    image: string;
    tags: string[];
    coordinates: { lat: number; lng: number };
    googleMapsLink?: string;
    gallery: string[];
    videoUrl?: string;
    detailedContent: string;
    metrics?: {
        budget: {
            total: number;
            currency: string;
            allocation: { name: string; value: number; fill: string; }[];
        };
        timeline: {
            start: string;
            end: string;
            progress: number;
        };
    };
}

export interface NavLink {
  name: Page;
  subLinks?: { name: string; id: string; page?: Page }[];
}

export interface NewsItem {
    title: string;
    date: string;
    excerpt: string;
    image: string;
    content: string;
    category: 'Technology' | 'Projects' | 'Corporate' | 'Archive' | 'Research' | 'Reports' | 'News' | 'Technical';
}

export interface Video {
    title: string;
    description: string;
    thumbnail: string;
    youtubeId: string;
}

export interface GroundingChunk {
  web?: {
    uri?: string;
    title?: string;
  };
  [key: string]: any;
}

export interface SearchMatchedItem {
  id: string;
  type: 'project' | 'technology' | 'news' | 'innovation' | 'job';
  title: string;
  subtitle?: string;
  description: string;
  tags?: string[];
  linkPage?: Page;
  rawItem?: any;
}

export interface SearchResultCategory {
  category: 'all' | 'projects' | 'technologies' | 'news' | 'innovations' | 'jobs';
  label: string;
  count: number;
  items: SearchMatchedItem[];
}

export interface GeminiSearchResult {
  summary: string;
  sources: GroundingChunk[];
  sourceType?: 'internal' | 'web' | 'hybrid';
  matchedItems?: SearchMatchedItem[];
  categories?: SearchResultCategory[];
  totalMatchesCount?: number;
}


export interface Innovation {
    id: string;
    title: string;
    description: string;
    image: string;
    impact: string;
    date: string;
}

export interface MapMarker {
  name: string;
  description: string;
  coordinates: { lat: number; lng: number };
  googleMapsLink?: string;
  imageUrl?: string;
  category?: string;
  type?: 'project' | 'office';
}

export interface JobOpening {
  id: string;
  title: string;
  department: 'Engineering' | 'R&D' | 'Corporate' | 'Operations';
  location: 'Tehran, Iran' | 'Qeshm, Iran' | 'Remote';
  type: 'Full-time' | 'Contract';
  description: string;
  responsibilities: string[];
  qualifications: string[];
}