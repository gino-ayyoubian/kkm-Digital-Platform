import * as React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, Phone, Mail, ExternalLink, Award, 
  GraduationCap, Briefcase, ChevronRight, CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { OrgMemberProfile } from '../types';
import { ExecutiveMemberIdentity } from './common/ExecutiveMemberIdentity';

interface TeamCardProps {
  member: OrgMemberProfile;
  onVerifyClick?: (member: OrgMemberProfile) => void;
  onCallClick?: (extension: string, member: OrgMemberProfile) => void;
  onSelectMember?: (member: OrgMemberProfile) => void;
}

export const TeamCard: React.FC<TeamCardProps> = ({
  member,
  onVerifyClick,
  onCallClick,
  onSelectMember,
}) => {
  const { isFa } = useLanguage();
  const [isHovered, setIsHovered] = React.useState(false);

  const displayName = isFa && member.displayNameFa ? member.displayNameFa : member.displayName;
  const displayTitle = isFa && member.titleFa ? member.titleFa : member.title;
  const displayDepartment = isFa && member.departmentFa ? member.departmentFa : member.department;
  const displayBio = isFa && member.shortBioFa ? member.shortBioFa : member.shortBio;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-2xl hover:border-amber-400/50 dark:hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between overflow-hidden"
      dir={isFa ? 'rtl' : 'ltr'}
    >
      {/* Top Media / Photo Section */}
      <div className="relative w-full h-72 overflow-hidden bg-slate-950">
        <ExecutiveMemberIdentity
          name={member.displayName}
          nameFa={member.displayNameFa}
          role={member.role}
          photoUrl={member.avatarUrl}
          size="card"
          showBadge={false}
          className="w-full h-full"
        />

        {/* Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

        {/* Verified Member Badge (Clickable to Evidence Registry) */}
        {member.isVerifiedMember !== false && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onVerifyClick?.(member);
            }}
            className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-amber-400/60 shadow-lg hover:bg-amber-400 hover:text-slate-950 text-amber-300 transition-all duration-200 group/badge cursor-pointer"
            title={isFa ? 'مشاهده سند اصالت در رجیستری شواهد KKM' : 'View Verified Credential in KKM Evidence Registry'}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400 group-hover/badge:text-slate-950" />
            <span className="text-[10px] font-mono font-bold tracking-wider uppercase">
              {isFa ? 'عضو تأییدشده' : 'Verified Member'}
            </span>
          </button>
        )}

        {/* SIP Direct Extension Pill */}
        {member.sipExtension && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCallClick?.(member.sipExtension || '', member);
            }}
            className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/80 text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all text-[11px] font-mono font-bold shadow-md cursor-pointer"
            title={isFa ? `تماس با داخلی ${member.sipExtension}` : `Call Ext ${member.sipExtension}`}
          >
            <Phone className="w-3 h-3" />
            <span>{member.sipExtension}</span>
          </button>
        )}

        {/* Bottom Banner inside Image: Name & Role */}
        <div className="absolute bottom-4 inset-x-4 z-10">
          <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block mb-1">
            {displayDepartment}
          </span>
          <h3 className="text-lg font-bold font-display text-white drop-shadow-sm group-hover:text-amber-200 transition-colors">
            {displayName}
          </h3>
          <p className="text-xs text-slate-300 font-medium line-clamp-1 mt-0.5">
            {displayTitle}
          </p>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        {/* Brief Bio */}
        {displayBio && (
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
            {displayBio}
          </p>
        )}

        {/* Specialized Engineering Domains */}
        {member.engineeringDomains && member.engineeringDomains.length > 0 && (
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2 flex items-center gap-1">
              <Award className="w-3 h-3 text-secondary" />
              {isFa ? 'حوزه‌های تخصصی مهندسی' : 'Specialized Engineering Domains'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {member.engineeringDomains.slice(0, 3).map((domain, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-medium border border-slate-200/80 dark:border-slate-700/60"
                >
                  {domain}
                </span>
              ))}
              {member.engineeringDomains.length > 3 && (
                <span className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-mono font-bold">
                  +{member.engineeringDomains.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Controls Footer */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
          {/* Quick Actions (Call, LinkedIn, Email) */}
          <div className="flex items-center gap-1.5">
            {member.sipExtension && (
              <button
                onClick={() => onCallClick?.(member.sipExtension || '', member)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 text-slate-600 dark:text-slate-300 transition-colors"
                title={isFa ? `تماس با داخلی ${member.sipExtension}` : `Call Ext ${member.sipExtension}`}
              >
                <Phone className="w-3.5 h-3.5" />
              </button>
            )}

            {member.linkedInUrl && (
              <a
                href={member.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-slate-600 dark:text-slate-300 transition-colors font-bold text-xs"
                title="LinkedIn Profile"
              >
                <span className="font-mono text-[11px]">in</span>
              </a>
            )}

            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-primary hover:text-white text-slate-600 dark:text-slate-300 transition-colors"
                title={member.email}
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* Evidence Registry Trigger Button */}
          <button
            onClick={() => onVerifyClick?.(member)}
            className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-400 hover:text-slate-950 text-amber-800 dark:text-amber-300 text-[11px] font-bold transition-all border border-amber-300 dark:border-amber-700/60 flex items-center gap-1 cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
            <span>{isFa ? 'شواهد اصالت' : 'Evidence'}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
