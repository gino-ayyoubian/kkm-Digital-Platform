import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import { OrgMemberProfile, Page } from '../types';
import { INITIAL_ORG_MEMBERS } from '../data/orgMembers';
import { TeamCard } from './TeamCard';
import { EvidenceRegistryModal } from './common/EvidenceRegistryModal';
import { D3OrganizationalTree } from './about/D3OrganizationalTree';
import { 
  Award, ShieldCheck, Phone, Search, Filter, 
  ExternalLink, Sparkles, Building2, CheckCircle2, Network, LayoutGrid 
} from 'lucide-react';

interface LeadershipTeamProps {
  onNavigate?: (page: Page) => void;
}

export const LeadershipTeam: React.FC<LeadershipTeamProps> = ({ onNavigate }) => {
  const { isFa } = useLanguage();
  
  // View Mode: Grid Cards or D3 Interactive Hierarchy Tree
  const [viewMode, setViewMode] = React.useState<'grid' | 'tree'>('grid');
  
  // State for Modals
  const [selectedEvidenceMember, setSelectedEvidenceMember] = React.useState<OrgMemberProfile | null>(null);

  // Filter & Search
  const [activeFilter, setActiveFilter] = React.useState<string>('all');
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  // Handle Verified Member Click
  const handleVerifyMember = (member: OrgMemberProfile) => {
    setSelectedEvidenceMember(member);
  };

  // Filtered list of members, deduplicated by uid and profile identity
  const filteredMembers = React.useMemo(() => {
    const seenUids = new Set<string>();
    const seenNames = new Set<string>();
    const seenEmails = new Set<string>();
    return INITIAL_ORG_MEMBERS.filter(member => {
      const normalizedName = member.displayName.normalize('NFKC').trim().replace(/\s+/g, ' ').toLowerCase();
      const normalizedEmail = (member.email || '').trim().toLowerCase();
      if (
        seenUids.has(member.uid) ||
        seenNames.has(normalizedName) ||
        (normalizedEmail && seenEmails.has(normalizedEmail))
      ) return false;
      seenUids.add(member.uid);
      seenNames.add(normalizedName);
      if (normalizedEmail) seenEmails.add(normalizedEmail);

      // Category filter
      let matchesFilter = true;
      if (activeFilter === 'executive') {
        matchesFilter = member.role === 'super_admin' || member.role === 'executive';
      } else if (activeFilter === 'tech') {
        matchesFilter = 
          member.department.includes('AI') || 
          member.department.includes('Energy') || 
          member.department.includes('BIM') ||
          member.department.includes('Quality');
      } else if (activeFilter === 'corporate') {
        matchesFilter = 
          member.department.includes('Finance') || 
          member.department.includes('Legal') || 
          member.department.includes('Public Relations');
      }

      // Search filter
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch = !q || 
        member.displayName.toLowerCase().includes(q) ||
        (member.displayNameFa && member.displayNameFa.includes(q)) ||
        member.title.toLowerCase().includes(q) ||
        (member.titleFa && member.titleFa.includes(q)) ||
        member.department.toLowerCase().includes(q) ||
        (member.engineeringDomains && member.engineeringDomains.some(d => d.toLowerCase().includes(q)));

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);


  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors" dir={isFa ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span>{isFa ? 'هیئت مدیره، مدیریت ارشد و اعضای تأییدشده KKM' : 'Executive Directorate & Verified Leaders'}</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 dark:text-white tracking-tight">
            {isFa ? 'کادر رهبری، دانشمندان و مهندسان ارشد سازمان' : 'KKM Leadership Team & Engineering Directorate'}
          </h2>

          <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            {isFa
              ? 'پیشگامان مهندسی ترمودینامیک، مگاپروژه‌های EPCI، سامانه‌های ژئومتا (GMEL)، هوش مصنوعی شناختی و دیپلماسی انرژی پاک. تمامی مشخصات و مدارک اعضا در رجیستری شواهد سازمانی KKM ممهور و تأییدشده هستند.'
              : 'Pioneers in deep geothermal thermodynamics, turnkey EPCI mega-projects, cognitive AI twins, and sovereign clean energy systems. All team credentials are permanently certified on the KKM Evidence Registry.'}
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', labelFa: 'تمامی اعضا', labelEn: 'All Leadership' },
              { id: 'executive', labelFa: 'هیئت مدیره و مدیران ارشد', labelEn: 'Executive Board' },
              { id: 'tech', labelFa: 'فناوری، هوش مصنوعی و مهندسی', labelEn: 'AI & Engineering' },
              { id: 'corporate', labelFa: 'مالی، حقوقی و بین‌الملل', labelEn: 'Corporate & Legal' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeFilter === tab.id
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {isFa ? tab.labelFa : tab.labelEn}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute top-3 right-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isFa ? 'جستجوی نام، دپارتمان یا حوزه تخصصی...' : 'Search leader, department or domain...'}
                className="w-full pr-9 pl-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-primary focus:outline-hidden"
              />
            </div>

            {/* View Mode Toggle: Grid vs D3 Collapsible Tree */}
            <div className="flex items-center bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === 'grid'
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
                title={isFa ? 'نمای کارت‌های پرسنلی' : 'Grid View'}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{isFa ? 'کارت‌ها' : 'Cards'}</span>
              </button>

              <button
                onClick={() => setViewMode('tree')}
                className={`p-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === 'tree'
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
                title={isFa ? 'چارت درختی تعاملی D3.js' : 'Interactive D3 Tree'}
              >
                <Network className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{isFa ? 'چارت درختی D3' : 'D3 Tree'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* View Mode 1: D3 Interactive Tree */}
        {viewMode === 'tree' && (
          <div className="mb-12">
            <D3OrganizationalTree onSelectMember={handleVerifyMember} />
          </div>
        )}

        {/* View Mode 2: Team Cards Grid */}
        {viewMode === 'grid' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMembers.map((member, index) => (
                <TeamCard
                  key={`leadership-card-${member.uid}-${index}`}
                  member={member}
                  onVerifyClick={handleVerifyMember}
                />
              ))}
            </div>

            {/* Empty state */}
            {filteredMembers.length === 0 && (
              <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
                <ShieldCheck className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  {isFa ? 'عضوی با مشخصات جستجویافته یافت نشد.' : 'No team member matched your query.'}
                </p>
                <button
                  onClick={() => {
                    setActiveFilter('all');
                    setSearchQuery('');
                  }}
                  className="mt-3 text-xs text-primary dark:text-secondary font-bold hover:underline"
                >
                  {isFa ? 'نمایش مجدد همه اعضا' : 'Reset filters'}
                </button>
              </div>
            )}

            {/* Central Corporate Switchboard & Inquiries Banner */}
            <div className="mt-12 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-start">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 dark:bg-secondary/10 flex items-center justify-center text-primary dark:text-secondary shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {isFa ? 'ارتباط با کادر رهبری و دپارتمان‌های سازمانی KKM' : 'Corporate Communications & Directorate Inquiries'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
                    {isFa 
                      ? 'بازدیدکنندگان گرامی؛ جهت برقراری ارتباط با اعضای هیئت مدیره و مدیریت‌های اجرایی، لطفاً با خط ارتباطی تلفن مرکزی تماس حاصل فرمایید تا از طریق تلفن گویای هوشمند به واحد مربوطه متصل گردید.'
                      : 'To contact our executive leadership or specific directorates, please dial our central corporate switchboard for automated department routing.'}
                  </p>
                </div>
              </div>
              <a
                href="tel:+982191030830"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark dark:bg-secondary dark:text-slate-950 text-white font-mono font-bold text-xs shadow-md transition-all shrink-0 cursor-pointer"
                dir="ltr"
              >
                <Phone className="w-4 h-4" />
                <span>+98 21 9103 0830</span>
              </a>
            </div>
          </>
        )}
      </div>

      {/* Verified Member Evidence Registry Modal */}
      <EvidenceRegistryModal
        member={selectedEvidenceMember}
        isOpen={Boolean(selectedEvidenceMember)}
        onClose={() => setSelectedEvidenceMember(null)}
        onNavigateToRegistry={onNavigate}
      />
    </section>
  );
};

export default LeadershipTeam;
