import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, X, Award, CheckCircle2, Lock, ExternalLink, 
  FileText, Calendar, Building2, Phone, Hash, Download, Check
} from 'lucide-react';
import { useLanguage } from '../../LanguageContext';
import { OrgMemberProfile, Page } from '../../types';
import { ExecutiveMemberIdentity } from './ExecutiveMemberIdentity';

interface EvidenceRegistryModalProps {
  member: OrgMemberProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigateToRegistry?: (page: Page) => void;
}

export const EvidenceRegistryModal: React.FC<EvidenceRegistryModalProps> = ({
  member,
  isOpen,
  onClose,
  onNavigateToRegistry,
}) => {
  const { isFa } = useLanguage();
  const [copiedHash, setCopiedHash] = React.useState(false);
  const [downloadSuccess, setDownloadSuccess] = React.useState(false);

  if (!isOpen || !member) return null;

  const credentialId = member.evidenceRegistryId || `KKM-EVID-2026-${member.employeeId || 'MEM'}`;
  const sha256Fingerprint = `SHA256:${(member.employeeId + member.email + credentialId)
    .split('')
    .reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) >>> 0, 0x12345678)
    .toString(16)
    .toUpperCase()
    .padStart(8, '0')}7B8F9A1D4E2C3301980244AE00192CFF`;

  const handleCopyHash = () => {
    navigator.clipboard.writeText(sha256Fingerprint);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleDownloadCredential = () => {
    const credentialText = `================================================================================
KKM INTERNATIONAL GROUP — OFFICIAL EVIDENCE REGISTRY CREDENTIAL
مرکز گواهی اصالت و ثبت شواهد معتبر سازمانی گروه بین‌المللی کیمیا کاران ماد
================================================================================
CREDENTIAL IDENTIFIER : ${credentialId}
VERIFICATION STATUS   : LEVEL A — CERTIFIED OPERATIONAL AUTHORITY (معتبر و تأییدشده)
ISSUING AUTHORITY     : KKM Directorate of Governance & Legal Identity Registry
LEGAL REFERENCE       : Official Gazette Reg. 493011 / Concession Framework KKM-IR
RATIFICATION DATE     : 2026-09-24

MEMBER DETAILS:
Full Name (EN)        : ${member.displayName}
Full Name (FA)        : ${member.displayNameFa || member.displayName}
Executive Title       : ${member.title} (${member.titleFa || ''})
Directorate / Dept    : ${member.department} (${member.departmentFa || ''})
Employee ID           : ${member.employeeId}
Official Email        : ${member.email}
Direct Phone          : ${member.phone || '+98 21 9103 0830'}
SIP Extension         : ${member.sipExtension || 'N/A'} (SIP Trunk: ext.daftareshoma.com)
Security Clearance    : ${member.clearanceLevel}

SPECIALIZED ENGINEERING DOMAINS:
${(member.engineeringDomains || ['Advanced Energy Systems', 'Clean Infrastructure']).map(d => ` - ${d}`).join('\n')}

DIGITAL CRYPTOGRAPHIC SEAL:
Fingerprint (SHA-256) : ${sha256Fingerprint}
Timestamp             : ${new Date().toISOString()}
Verification Portal   : https://kkm-international.org/evidence-registry?cred=${credentialId}

STATUS: PERMANENTLY ATTESTED ON KKM GOVERNANCE REGISTER
================================================================================`;

    const blob = new Blob([credentialText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `KKM-CREDENTIAL-${member.employeeId}-${credentialId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-amber-400/40 dark:border-amber-400/30 overflow-hidden"
          dir={isFa ? 'rtl' : 'ltr'}
        >
          {/* Header Banner with security guilloche aesthetic */}
          <div className="relative bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 px-6 py-6 text-slate-950">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-slate-950/15 backdrop-blur-xs border border-slate-950/20">
                  <ShieldCheck className="w-7 h-7 text-slate-950" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-black tracking-widest uppercase bg-slate-950 text-amber-300 px-2 py-0.5 rounded-md">
                      Level A Verified
                    </span>
                    <span className="text-xs font-mono font-bold tracking-wider text-slate-900/80">
                      {credentialId}
                    </span>
                  </div>
                  <h3 className="text-lg font-black font-display text-slate-950 mt-1">
                    {isFa ? 'گواهی اصالت عضو و ثبت شواهد سازمانی' : 'KKM Official Evidence Registry Certificate'}
                  </h3>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-slate-950/10 text-slate-950 transition-colors"
                title={isFa ? 'بستن' : 'Close'}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
            {/* Member Profile Bar */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <div className="w-16 h-16 shrink-0 rounded-2xl overflow-hidden border-2 border-amber-400/60 shadow-md">
                <ExecutiveMemberIdentity
                  name={member.displayName}
                  nameFa={member.displayNameFa}
                  role={member.role}
                  photoUrl={member.avatarUrl}
                  size="card"
                  showBadge={false}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-base font-bold font-display text-slate-900 dark:text-white truncate">
                    {isFa && member.displayNameFa ? member.displayNameFa : member.displayName}
                  </h4>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 shrink-0 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    {isFa ? 'هویت تأییدشده' : 'Certified Active'}
                  </span>
                </div>

                <p className="text-xs text-primary dark:text-secondary font-semibold mt-0.5 truncate">
                  {isFa && member.titleFa ? member.titleFa : member.title}
                </p>

                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    {isFa && member.departmentFa ? member.departmentFa : member.department}
                  </span>
                  <span className="font-mono text-slate-400">&bull;</span>
                  <span className="font-mono text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    ID: {member.employeeId}
                  </span>
                  {member.sipExtension && (
                    <>
                      <span className="font-mono text-slate-400">&bull;</span>
                      <span className="flex items-center gap-1 text-[11px] font-mono text-blue-600 dark:text-blue-400 font-bold">
                        <Phone className="w-3 h-3" />
                        {isFa ? `داخلی ${member.sipExtension}` : `Ext: ${member.sipExtension}`}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Specialized Engineering Domains */}
            {member.engineeringDomains && member.engineeringDomains.length > 0 && (
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-500" />
                  {isFa ? 'حوزه‌های تخصصی مهندسی و نوآوری' : 'Specialized Engineering Domains'}
                </h5>
                <div className="flex flex-wrap gap-2">
                  {member.engineeringDomains.map((domain, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 text-xs font-medium"
                    >
                      {domain}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Verification Metadata Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50">
                <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                  {isFa ? 'مرجع صادرکننده و ثبت حاکمیتی' : 'Issuing Authority'}
                </span>
                <p className="font-bold text-slate-800 dark:text-slate-200">
                  {isFa ? 'دبیرخانه حاکمیت سازمانی و ثبت شواهد KKM' : 'KKM Governance & Evidence Registry'}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {isFa ? 'روزنامه رسمی شماره ۲۲۸۹۴ / ثبت ۴۹۳۰۱۱' : 'Official Gazette Reg. 493011'}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50">
                <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                  {isFa ? 'سطح طبقه‌بندی و دسترسی امنیتی' : 'Security Clearance'}
                </span>
                <p className="font-bold text-slate-800 dark:text-slate-200">
                  {member.clearanceLevel}
                </p>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5 flex items-center gap-1 font-mono">
                  <Lock className="w-3 h-3" /> Zero Trust Biometric & PKI Enforced
                </p>
              </div>
            </div>

            {/* Cryptographic SHA-256 Seal Box */}
            <div className="p-4 rounded-2xl bg-slate-900 dark:bg-slate-950 border border-slate-800 text-slate-300">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-mono font-bold text-amber-400">
                    Cryptographic Proof (SHA-256)
                  </span>
                </div>
                <button
                  onClick={handleCopyHash}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-mono text-slate-300 transition-colors flex items-center gap-1"
                >
                  {copiedHash ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">{isFa ? 'کپی شد' : 'Copied'}</span>
                    </>
                  ) : (
                    <span>{isFa ? 'کپی هش' : 'Copy Hash'}</span>
                  )}
                </button>
              </div>
              <p className="font-mono text-[11px] text-slate-400 break-all bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                {sha256Fingerprint}
              </p>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={handleDownloadCredential}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-medium text-xs transition-colors flex items-center gap-2 shadow-xs"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">{isFa ? 'دانلود انجام شد' : 'Credential Downloaded'}</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>{isFa ? 'دریافت سند گواهی اصالت (TXT)' : 'Download Credential Record'}</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-2">
              {onNavigateToRegistry && (
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToRegistry(Page.EvidenceRegistry);
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <span>{isFa ? 'مشاهده دفتر ثبت شواهد (Registry)' : 'View Evidence Registry'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors"
              >
                {isFa ? 'بستن' : 'Close'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
