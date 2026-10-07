import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../LanguageContext';
import { OrgMemberProfile } from '../../types';
import { INITIAL_ORG_MEMBERS } from '../../data/orgMembers';
import { ExecutiveMemberIdentity } from '../common/ExecutiveMemberIdentity';
import { buildInternalDirectory, type ExtensionAvailability } from '../../data/internalDirectory';
import { 
  Search, Phone, Mail, Copy, Check, PhoneForwarded, 
  Building2, ShieldCheck, Download, Filter, UserCheck, 
  ExternalLink, Hash, ArrowUpDown, Smartphone, X, User, Briefcase, PhoneCall
} from 'lucide-react';

interface InternalDirectoryTabProps {
  onCallMember?: (extension: string, member: OrgMemberProfile) => void;
  onVerifyMember?: (member: OrgMemberProfile) => void;
}

export type SearchFilterMode = 'all' | 'name' | 'role' | 'extension';

export const InternalDirectoryTab: React.FC<InternalDirectoryTabProps> = ({
  onCallMember,
  onVerifyMember
}) => {
  const { isFa, direction } = useLanguage();
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [filterMode, setFilterMode] = React.useState<SearchFilterMode>('all');
  const [selectedDept, setSelectedDept] = React.useState<string>('all');
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);
  const [viewLayout, setViewLayout] = React.useState<'table' | 'cards'>('table');
  const [extensions, setExtensions] = React.useState<ExtensionAvailability[]>([]);
  const [isExtensionStatusSynced, setIsExtensionStatusSynced] = React.useState(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const isRtl = direction === 'rtl';

  React.useEffect(() => {
    let isMounted = true;
    const syncExtensions = async () => {
      try {
        const response = await fetch('/api/telephony/extensions');
        if (!response.ok) throw new Error('Unable to fetch extension statuses');
        const payload = await response.json();
        if (!Array.isArray(payload?.data)) throw new Error('Invalid extension status response');
        if (isMounted) {
          setExtensions(payload.data);
          setIsExtensionStatusSynced(true);
        }
      } catch {
        if (isMounted) {
          setExtensions([]);
          setIsExtensionStatusSynced(false);
        }
      }
    };

    void syncExtensions();
    const interval = window.setInterval(() => void syncExtensions(), 30_000);
    return () => {
      isMounted = false;
      window.clearInterval(interval);
    };
  }, []);

  const directoryEntries = React.useMemo(
    () => buildInternalDirectory(INITIAL_ORG_MEMBERS, extensions),
    [extensions],
  );
  const directoryEntryByUid = React.useMemo(
    () => new Map(directoryEntries.map(entry => [entry.profile.uid, entry])),
    [directoryEntries],
  );

  // Copy to clipboard helper
  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Departments list for filter
  const departments = React.useMemo(() => {
    const set = new Set<string>();
    INITIAL_ORG_MEMBERS.forEach(m => {
      if (m.departmentFa) set.add(m.departmentFa);
      else if (m.department) set.add(m.department);
    });
    return Array.from(set);
  }, []);

  // Filtered members list with mode-specific filtering
  const filteredMembers = React.useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return directoryEntries.filter(({ profile: member }) => {
      // 1. Department filter
      if (selectedDept !== 'all') {
        const d = member.departmentFa || member.department;
        if (d !== selectedDept) return false;
      }

      // 2. Search query filter based on filterMode
      if (!q) return true;

      // Mode: Name only
      if (filterMode === 'name') {
        return (
          member.displayName.toLowerCase().includes(q) ||
          (member.displayNameFa && member.displayNameFa.toLowerCase().includes(q))
        );
      }

      // Mode: Role only
      if (filterMode === 'role') {
        return (
          member.title.toLowerCase().includes(q) ||
          (member.titleFa && member.titleFa.toLowerCase().includes(q))
        );
      }

      // Mode: Extension only
      if (filterMode === 'extension') {
        return (
          (member.sipExtension && member.sipExtension.toLowerCase().includes(q)) ||
          (member.phone && member.phone.replace(/[\s-]/g, '').includes(q.replace(/[\s-]/g, '')))
        );
      }

      // Mode: All fields
      return (
        member.displayName.toLowerCase().includes(q) ||
        (member.displayNameFa && member.displayNameFa.toLowerCase().includes(q)) ||
        member.title.toLowerCase().includes(q) ||
        (member.titleFa && member.titleFa.toLowerCase().includes(q)) ||
        (member.sipExtension && member.sipExtension.includes(q)) ||
        (member.phone && member.phone.includes(q)) ||
        member.email.toLowerCase().includes(q) ||
        member.employeeId.toLowerCase().includes(q) ||
        (member.departmentFa && member.departmentFa.toLowerCase().includes(q)) ||
        member.department.toLowerCase().includes(q)
      );
    }).map(entry => entry.profile);
  }, [directoryEntries, searchQuery, filterMode, selectedDept]);

  // Substring highlight helper
  const renderHighlighted = (text?: string) => {
    if (!text) return null;
    if (!searchQuery.trim()) return text;

    const q = searchQuery.trim();
    const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, i) =>
      part.toLowerCase() === q.toLowerCase() ? (
        <mark
          key={i}
          className="bg-amber-200 dark:bg-amber-900/60 dark:text-amber-200 text-amber-900 px-0.5 rounded font-bold"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const renderAvailability = (memberUid: string) => {
    const availability = directoryEntryByUid.get(memberUid)?.deskAvailability || 'unknown';
    const labels = {
      active: isFa ? 'فعال' : 'Available',
      busy: isFa ? 'مشغول' : 'Busy',
      away: isFa ? 'دور' : 'Away',
      unknown: isFa ? 'نامشخص' : 'Unknown',
    };
    const colors = {
      active: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
      busy: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300',
      away: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
      unknown: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
    };
    const dots = {
      active: 'bg-emerald-500',
      busy: 'bg-rose-500',
      away: 'bg-amber-500',
      unknown: 'bg-slate-400',
    };

    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] font-bold ${colors[availability]}`} title={isFa ? 'وضعیت همگام‌سازی‌شده داخلی' : 'Synced extension availability'}>
        <span className={`h-1.5 w-1.5 rounded-full ${dots[availability]}`} />
        {labels[availability]}
      </span>
    );
  };

  // Export CSV
  const handleExportCsv = () => {
    const headers = 'Employee ID,Name,Name FA,Title,Department,Desk Phone,SIP Extension,SIP Username,Email\n';
    const rows = filteredMembers.map(m => 
      `"${m.employeeId}","${m.displayName}","${m.displayNameFa || ''}","${m.title}","${m.departmentFa || m.department}","${m.phone || ''}","${m.sipExtension || ''}","${m.sipUsername || ''}","${m.email}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kkm-internal-directory-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header and Quick Stats */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/30">
              Corporate Communications Gateway
            </span>
            <span className="text-xs font-mono text-slate-400">
              Active Line: +98 21 9103 0830
            </span>
            <span className={`text-[10px] font-semibold ${isExtensionStatusSynced ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
              {isExtensionStatusSynced ? (isFa ? 'وضعیت داخلی‌ها همگام است' : 'Extension status synced') : (isFa ? 'وضعیت داخلی‌ها همگام نیست' : 'Extension status unavailable')}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-display font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Phone className="w-5 h-5 text-primary dark:text-secondary" />
            <span>{isFa ? 'دفترچه تلفن و خطوط ارتباطی داخلی پرسنل' : 'Internal Directory & Extension Registry'}</span>
          </h2>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            {isFa 
              ? 'فهرست جامع شماره‌های داخلی (Extension)، تلفن‌های مستقیم ثابت و اطلاعات ارتباطی پرسنل گروه بین‌المللی کیمیا کاران ماد متصل به سانترال ابری دفتر شما.' 
              : 'Official internal directory of personnel extensions, desk phones, and SIP channels integrated with Daftare Shoma PBX.'}
          </p>
        </div>

        {/* Action button */}
        <button
          onClick={handleExportCsv}
          className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors flex items-center gap-2 border border-slate-300 dark:border-slate-600 shadow-2xs min-h-[44px]"
        >
          <Download className="w-4 h-4" />
          <span>{isFa ? 'خروجی اکسل / CSV' : 'Export Directory'}</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* REAL-TIME FILTERABLE SEARCH BAR & CONTROLS                                */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        
        {/* Top Search Controls Row */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          
          {/* Real-time Search Input */}
          <div className="relative flex-1">
            <Search className={`w-4 h-4 absolute top-3.5 text-slate-400 ${isRtl ? 'right-3.5' : 'left-3.5'}`} />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                filterMode === 'name' 
                  ? (isFa ? 'جستجو بر اساس نام همکار (مثلاً: رضوانی، عساکره، ایوبیان)...' : 'Search by colleague name...')
                  : filterMode === 'role'
                  ? (isFa ? 'جستجو بر اساس سمت سازمانی (مثلاً: مدیر، متخصص، CTO، BIM)...' : 'Search by organizational role / title...')
                  : filterMode === 'extension'
                  ? (isFa ? 'جستجو بر اساس شماره داخلی (مثلاً: 101, 107, 210)...' : 'Search by 3-digit extension (101-211)...')
                  : (isFa ? 'جستجوی بلادرنگ بر اساس نام همکار، سمت سازمانی یا شماره داخلی...' : 'Real-time search by name, role, or extension number...')
              }
              className={`w-full py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:outline-hidden transition-all min-h-[48px] ${
                isRtl ? 'pr-10 pl-10' : 'pl-10 pr-10'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  searchInputRef.current?.focus();
                }}
                className={`absolute top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 min-h-[36px] min-w-[36px] flex items-center justify-center ${
                  isRtl ? 'left-2' : 'right-2'
                }`}
                title={isFa ? 'پاک کردن جستجو' : 'Clear search'}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Department Filter & Layout Switcher */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="relative">
              <Filter className={`w-3.5 h-3.5 absolute top-3.5 text-slate-400 ${isRtl ? 'right-3' : 'left-3'}`} />
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className={`py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-primary focus:outline-hidden text-slate-700 dark:text-slate-300 font-bold min-h-[48px] ${
                  isRtl ? 'pr-8 pl-3' : 'pl-8 pr-3'
                }`}
              >
                <option value="all">{isFa ? 'تمامی دپارتمان‌ها' : 'All Departments'}</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Table / Cards View Toggle */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-900/80 p-1 rounded-xl border border-slate-200 dark:border-slate-700 min-h-[48px]">
              <button
                type="button"
                onClick={() => setViewLayout('table')}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-all min-h-[38px] ${
                  viewLayout === 'table' ? 'bg-primary text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {isFa ? 'جدول' : 'Table'}
              </button>
              <button
                type="button"
                onClick={() => setViewLayout('cards')}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-all min-h-[38px] ${
                  viewLayout === 'cards' ? 'bg-primary text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {isFa ? 'کارت‌ها' : 'Cards'}
              </button>
            </div>
          </div>
        </div>

        {/* Filter Scope Pills: Name, Role, Extension */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-750 text-xs">
          
          {/* Target Specific Fields Filter Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold text-slate-400 me-1">
              {isFa ? 'دامنه فیلتر:' : 'Filter Field:'}
            </span>

            <button
              type="button"
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[36px] flex items-center gap-1.5 ${
                filterMode === 'all'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Search className="w-3 h-3" />
              <span>{isFa ? 'همه موارد' : 'All Fields'}</span>
            </button>

            <button
              type="button"
              onClick={() => setFilterMode('name')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[36px] flex items-center gap-1.5 ${
                filterMode === 'name'
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <User className="w-3 h-3" />
              <span>{isFa ? 'نام همکار' : 'Name'}</span>
            </button>

            <button
              type="button"
              onClick={() => setFilterMode('role')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[36px] flex items-center gap-1.5 ${
                filterMode === 'role'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Briefcase className="w-3 h-3" />
              <span>{isFa ? 'سمت سازمانی / نقش' : 'Role'}</span>
            </button>

            <button
              type="button"
              onClick={() => setFilterMode('extension')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[36px] flex items-center gap-1.5 ${
                filterMode === 'extension'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Phone className="w-3 h-3" />
              <span>{isFa ? 'شماره داخلی (Extension)' : 'Extension'}</span>
            </button>
          </div>

          {/* Matches Counter Badge */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold">
              {isFa ? `${filteredMembers.length} از ${INITIAL_ORG_MEMBERS.length} همکار` : `${filteredMembers.length} of ${INITIAL_ORG_MEMBERS.length} staff`}
            </span>
          </div>
        </div>

        {/* Quick Shortcut Keyword Chips */}
        <div className="flex items-center gap-1.5 flex-wrap text-[11px] text-slate-400">
          <span className="font-semibold">{isFa ? 'فیلتر سریع:' : 'Quick Tags:'}</span>
          {[
            { label: isFa ? 'مدیران ارشد' : 'Executives', q: 'Director' },
            { label: isFa ? 'دفتر فنی و مهندسی' : 'Engineering', q: 'Engineering' },
            { label: isFa ? 'داخلی ۱۰۱' : 'Ext 101', q: '101' },
            { label: isFa ? 'داخلی ۱۰۲' : 'Ext 102', q: '102' },
            { label: isFa ? 'داخلی ۱۰۷' : 'Ext 107', q: '107' },
            { label: isFa ? 'داخلی ۱۰۸' : 'Ext 108', q: '108' },
            { label: isFa ? 'داخلی ۲۱۰' : 'Ext 210', q: '210' },
          ].map((tag, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSearchQuery(tag.q)}
              className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/60 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-mono transition-colors"
            >
              {tag.label}
            </button>
          ))}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: TABLE LAYOUT                                                      */}
      {/* ========================================================================= */}
      {viewLayout === 'table' && (
        <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-4">{isFa ? 'همکار سازمانی' : 'Personnel'}</th>
                <th className="p-4">{isFa ? 'سمت / عنوان رسمی' : 'Official Role / Title'}</th>
                <th className="p-4">{isFa ? 'دپارتمان' : 'Department'}</th>
                <th className="p-4">{isFa ? 'داخلی تلفن (Extension)' : 'Extension'}</th>
                <th className="p-4">{isFa ? 'تلفن مستقیم میز کار' : 'Desk Phone'}</th>
                <th className="p-4">{isFa ? 'رایانامه سازمانی' : 'Corporate Email'}</th>
                <th className="p-4 text-center">{isFa ? 'اقدام ارتباطی' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {filteredMembers.map((member, idx) => (
                <tr key={`dir-row-${member.uid}-${idx}`} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40 transition-colors">
                  
                  {/* Member Name & Photo */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700">
                        <ExecutiveMemberIdentity
                          name={member.displayName}
                          nameFa={member.displayNameFa}
                          role={member.role}
                          photoUrl={member.avatarUrl}
                          size="sm"
                          showBadge={false}
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span>
                            {isFa && member.displayNameFa ? renderHighlighted(member.displayNameFa) : renderHighlighted(member.displayName)}
                          </span>
                          {member.isVerifiedMember && (
                            <span title="Verified Member">
                              <ShieldCheck className="w-3.5 h-3.5 text-primary dark:text-secondary shrink-0" />
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {member.employeeId}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Official Title / Role */}
                  <td className="p-4 font-medium text-slate-700 dark:text-slate-200 max-w-[220px]">
                    <div className="truncate">
                      {isFa && member.titleFa ? renderHighlighted(member.titleFa) : renderHighlighted(member.title)}
                    </div>
                  </td>

                  {/* Department */}
                  <td className="p-4 text-slate-600 dark:text-slate-300">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium text-[11px]">
                      {isFa && member.departmentFa ? member.departmentFa : member.department}
                    </span>
                  </td>

                  {/* Extension with Copy and Dial Action */}
                  <td className="p-4">
                    <div className="flex flex-col items-start gap-1.5">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-mono font-black text-xs border border-emerald-200 dark:border-emerald-800">
                          {renderHighlighted(member.sipExtension || 'N/A')}
                        </span>
                        {member.sipExtension && (
                          <button
                            type="button"
                            onClick={() => copyToClipboard(member.sipExtension || '', `ext-${member.uid}`)}
                            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 transition-colors min-h-[32px] min-w-[32px] flex items-center justify-center"
                            title={isFa ? 'کپی شماره داخلی' : 'Copy extension number'}
                          >
                            {copiedKey === `ext-${member.uid}` ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        )}
                      </div>
                      {renderAvailability(member.uid)}
                    </div>
                  </td>

                  {/* Desk Phone with Copy */}
                  <td className="p-4 font-mono text-slate-600 dark:text-slate-300" dir="ltr">
                    <div className="flex items-center gap-1.5">
                      <span>{renderHighlighted(member.phone || '+98 21 9103 0830')}</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(member.phone || '+98 21 9103 0830', `ph-${member.uid}`)}
                        className="p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 transition-colors"
                        title={isFa ? 'کپی شماره مستقیم' : 'Copy direct line'}
                      >
                        {copiedKey === `ph-${member.uid}` ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </td>

                  {/* Email with Copy */}
                  <td className="p-4 font-mono text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1.5 truncate max-w-[170px]">
                      <span className="truncate">{member.email}</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(member.email, `mail-${member.uid}`)}
                        className="p-1 text-slate-400 hover:text-slate-600"
                        title={isFa ? 'کپی ایمیل' : 'Copy email'}
                      >
                        {copiedKey === `mail-${member.uid}` ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </td>

                  {/* Actions Column */}
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-1.5">
                      {member.sipExtension && onCallMember && (
                        <button
                          type="button"
                          onClick={() => onCallMember(member.sipExtension || '', member)}
                          className="px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors flex items-center gap-1 min-h-[38px] shadow-xs"
                          title={isFa ? `تماس با داخلی ${member.sipExtension}` : `Dial Extension ${member.sipExtension}`}
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          <span className="hidden xl:inline">{isFa ? 'تماس' : 'Dial'}</span>
                        </button>
                      )}

                      {onVerifyMember && (
                        <button
                          type="button"
                          onClick={() => onVerifyMember(member)}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center"
                          title={isFa ? 'مشاهده پرونده ثبتی' : 'View dossier'}
                        >
                          <UserCheck className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: CARDS GRID LAYOUT                                                 */}
      {/* ========================================================================= */}
      {viewLayout === 'cards' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMembers.map((member, idx) => (
            <div
              key={`dir-card-${member.uid}-${idx}`}
              className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700">
                    <ExecutiveMemberIdentity
                      name={member.displayName}
                      nameFa={member.displayNameFa}
                      role={member.role}
                      photoUrl={member.avatarUrl}
                      size="md"
                      showBadge={false}
                    />
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-mono font-black text-xs flex items-center gap-1 border border-emerald-200 dark:border-emerald-800">
                      <Phone className="w-3 h-3" />
                      <span>{isFa ? `داخلی ${member.sipExtension || 'N/A'}` : `Ext: ${member.sipExtension || 'N/A'}`}</span>
                    </span>
                    {member.sipExtension && (
                      <button
                        type="button"
                        onClick={() => copyToClipboard(member.sipExtension || '', `ext-card-${member.uid}`)}
                        className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 transition-colors"
                        title={isFa ? 'کپی داخلی' : 'Copy extension'}
                      >
                        {copiedKey === `ext-card-${member.uid}` ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    )}
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  {isFa && member.displayNameFa ? renderHighlighted(member.displayNameFa) : renderHighlighted(member.displayName)}
                </h3>
                <p className="text-xs text-primary dark:text-secondary font-medium mt-0.5">
                  {isFa && member.titleFa ? renderHighlighted(member.titleFa) : renderHighlighted(member.title)}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  {isFa && member.departmentFa ? member.departmentFa : member.department}
                </p>
                <div className="mt-2">{renderAvailability(member.uid)}</div>

                {/* Contact Badges */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                    <span className="text-[10px] text-slate-400">{isFa ? 'تلفن مستقیم:' : 'Direct Phone:'}</span>
                    <div className="flex items-center gap-1" dir="ltr">
                      <span>{renderHighlighted(member.phone || '+98 21 9103 0830')}</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(member.phone || '+98 21 9103 0830', `ph-card-${member.uid}`)}
                        className="p-1 text-slate-400 hover:text-slate-600"
                      >
                        {copiedKey === `ph-card-${member.uid}` ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                    <span className="text-[10px] text-slate-400">{isFa ? 'ایمیل:' : 'Email:'}</span>
                    <div className="flex items-center gap-1 truncate max-w-[170px]">
                      <span className="truncate">{member.email}</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(member.email, `mail-card-${member.uid}`)}
                        className="p-1 text-slate-400 hover:text-slate-600 shrink-0"
                      >
                        {copiedKey === `mail-card-${member.uid}` ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => onVerifyMember?.(member)}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors flex items-center gap-1.5 min-h-[44px]"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>{isFa ? 'پرونده ثبتی' : 'Dossier'}</span>
                </button>

                {member.sipExtension && onCallMember && (
                  <button
                    type="button"
                    onClick={() => onCallMember(member.sipExtension || '', member)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs min-h-[44px]"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{isFa ? 'تماس فوری' : 'Dial Now'}</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredMembers.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700">
          <Phone className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
            {isFa ? `همکاری با مشخصات یا شماره «${searchQuery}» یافت نشد.` : `No staff member matched your criteria "${searchQuery}".`}
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setFilterMode('all');
              setSelectedDept('all');
            }}
            className="mt-3 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-colors inline-flex items-center gap-1.5 min-h-[44px]"
          >
            <X className="w-3.5 h-3.5" />
            <span>{isFa ? 'پاک کردن فیلترها و نمایش کامل' : 'Reset search filters'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
