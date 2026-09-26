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
  GoogleKeep = 'Google Keep Workspace',
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
  EvidenceRegistry = 'Evidence Registry',
  ClaimRegistry = 'Claim Registry',
  Sustainability = 'Sustainability & Governance',
  NotFound = 'Page Not Found',
}

export interface Project {
    name: string;
    client?: string;
    location?: string;
    scope?: string;
    role?: string;
    technology?: string;
    stage?: string;
    startDate?: string;
    currentStatus?: string;
    evidence?: string;
    partners?: string[];
    nextMilestone?: string;
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
    category: 'Technology' | 'Projects' | 'Corporate' | 'Archive' | 'Research' | 'Reports' | 'News' | 'Technical' | 'Sustainability' | 'Events';
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
    // Research & Technology Development fields (Item 15)
    technology?: string;
    problem?: string;
    solution?: string;
    developmentStage?: string;
    evidence?: string;
    performance?: string;
    ip?: string;
    applications?: string[];
    nextMilestone?: string;
}

export type LeadOpportunityType = 'Project' | 'Pilot' | 'Partnership' | 'Investment';
export type LeadSector = 'Energy' | 'Water' | 'Infrastructure' | 'Industrial' | 'Agriculture' | 'Healthcare' | 'Mining' | 'Other';
export type LeadPriority = 'Urgent' | 'High' | 'Medium' | 'Standard';
export type LeadStatus = 'New' | 'Qualified' | 'Meeting Scheduled' | 'Technical Assessment' | 'Concept Note' | 'Pilot/Project' | 'Closed';

export interface CRMLead {
    id: string; // Lead ID (e.g. LEAD-2026-09-001)
    date: string; // ISO date string
    organization: string;
    person: string;
    position?: string;
    country: string;
    province?: string;
    opportunityType: LeadOpportunityType;
    sector: LeadSector;
    projectLocation?: string;
    problem: string;
    requiredTechnology?: string;
    estimatedScale?: string;
    investmentPotential?: string;
    decisionAuthority?: string;
    priority: LeadPriority;
    owner: string;
    nextAction: string;
    nextActionDate?: string;
    status: LeadStatus;
    email?: string;
    phone?: string;
    source?: string;
    createdAt?: any;
    updatedAt?: any;
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

export type EvidenceLevel = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'Level A' | 'Level B' | 'Level C' | 'Level D' | 'Level E' | 'Level F' | 'Level G';
export type ClaimStatus = 'Verified' | 'Internal' | 'Estimated' | 'Demonstration';
export type ClaimDomain = 'Performance' | 'Technical' | 'ESG' | 'Corporate' | 'IP';

export interface Claim {
  id: string;
  statementEn: string;
  statementFa: string;
  domain: ClaimDomain;
  status: ClaimStatus;
  verificationStatusType?: 'Verified' | 'Target' | 'Estimate' | 'Demonstration';
  evidenceLevel: EvidenceLevel;
  evidenceRefId: string;
  evidenceFile?: string;
  ownerDepartment: string;
  verifiedBy?: string;
  verificationDate?: string;
  lastReviewDate?: string;
  sourceMethodologyEn?: string;
  sourceMethodologyFa?: string;
  reviewCycleMonths: number;
  metricValue?: string;
  baselineComparison?: string;
  qualificationNotesEn?: string;
  qualificationNotesFa?: string;
  p013Compliant: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type OrgRole = 'super_admin' | 'executive' | 'director' | 'manager' | 'reviewer' | 'employee';

export interface OrgUserPermissions {
  canApproveAll: boolean;
  canApproveDepartment: boolean;
  canManageUsers: boolean;
  canAccessFinancials: boolean;
  canAccessConfidentialDMS: boolean;
  canIssueDirectives: boolean;
  canSubmitRequests: boolean;
  [key: string]: boolean;
}

export interface OrgMemberProfile {
  uid: string;
  email: string;
  username?: string; // Standard corporate username (e.g. g.ayyoubian@kkm-intl.org or g.ayyoubian)
  displayName: string;
  displayNameFa?: string;
  role: OrgRole;
  title: string;
  titleFa?: string;
  department: string;
  departmentFa?: string;
  employeeId: string;
  avatarUrl?: string;
  phone?: string;
  sipExtension?: string; // Direct internal telephone extension (e.g. '101', '206962')
  sipUsername?: string; // SIP Trunk extension username (e.g. '206962' on ext.daftareshoma.com)
  isVerifiedMember?: boolean; // Verified Member status indicator
  evidenceRegistryId?: string; // ID in KKM Evidence Registry (e.g. 'KKM-EVID-2026-CEO-001')
  engineeringDomains?: string[]; // Specialized engineering domains
  linkedInUrl?: string; // Professional profile link
  shortBio?: string;
  shortBioFa?: string;
  clearanceLevel: 'Top Secret / Strategic' | 'Confidential / Tier-1' | 'Operational / Tier-2' | 'Internal / Standard';
  permissions: OrgUserPermissions;
  status: 'active' | 'leave' | 'suspended';
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type AutomationRequestType = 'leave' | 'purchase' | 'mission' | 'technical_review' | 'it_access' | 'memo';
export type AutomationPriority = 'low' | 'medium' | 'high' | 'urgent';
export type AutomationStatus = 'pending_manager' | 'pending_finance' | 'pending_ceo' | 'approved' | 'rejected' | 'draft';

export interface AutomationApprovalStep {
  step: string;
  approverName: string;
  approverRole: string;
  action: 'approved' | 'rejected';
  timestamp: string;
  comments?: string;
}

export interface AutomationRequest {
  id: string;
  title: string;
  type: AutomationRequestType;
  description: string;
  requesterId: string;
  requesterName: string;
  requesterRole: string;
  department: string;
  priority: AutomationPriority;
  status: AutomationStatus;
  amount?: number;
  startDate?: string;
  endDate?: string;
  destination?: string;
  approvals: AutomationApprovalStep[];
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DmsDocument {
  id: string;
  code: string;
  title: string;
  titleFa: string;
  category: 'Directive' | 'Policy' | 'Standard' | 'Legal' | 'Technical' | 'Form';
  securityClearance: 'Top Secret' | 'Confidential' | 'Operational' | 'Internal';
  department: string;
  summary: string;
  summaryFa: string;
  version: string;
  releaseDate: string;
  fileUrl?: string;
  createdAt?: string;
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  userName: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  checkInTime?: string;
  checkOutTime?: string;
  isRemote?: boolean;
  type?: 'remote' | 'office' | 'site';
  location?: string;
  totalHours?: number;
  durationSeconds?: number;
  status: 'checked_in' | 'checked_out' | 'completed';
  createdAt?: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface EvidenceRegistryItem {
  id: string;
  registryCode: string;
  title: string;
  titleFa?: string;
  evidenceLevel: EvidenceLevel;
  domain: string;
  domainFa?: string;
  certificationDate: string;
  certifyingAuthority: string;
  cryptographicHash?: string;
  fileUri?: string;
  description?: string;
  descriptionFa?: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface ProjectMilestone {
  id: string;
  projectId: string;
  projectTitle: string;
  projectTitleFa?: string;
  milestoneCode: string;
  title: string;
  titleFa?: string;
  targetDate: string;
  completionDate?: string;
  status: 'planned' | 'in_progress' | 'completed' | 'delayed';
  evidenceLevelRequired: EvidenceLevel;
  evidenceId?: string;
  assignedLead?: string;
  department?: string;
  departmentFa?: string;
  createdAt: string;
}

export interface KeepNote {
  id: string;
  title: string;
  content: string;
  color: 'default' | 'amber' | 'emerald' | 'blue' | 'purple' | 'rose';
  pinned: boolean;
  archived: boolean;
  tags?: string[];
  isChecklist?: boolean;
  checklistItems?: ChecklistItem[];
  userId?: string;
  userEmail?: string;
  authorName?: string;
  createdAt?: any;
  updatedAt?: any;
  // Backward compatibility alias
  isPinned?: boolean;
  isArchived?: boolean;
  isTrash?: boolean;
  labels?: string[];
  checklist?: ChecklistItem[];
}