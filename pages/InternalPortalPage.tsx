import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { useAuth } from '../AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { Page, AutomationRequest } from '../types';
import type { TranslationKey } from '../translations';
import Accordion from '../components/Accordion';
import { INITIAL_AUTOMATION_REQUESTS, INITIAL_ORG_MEMBERS } from '../data/orgMembers';
import { db } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';

// Subcomponents
import { PortalHeader } from '../components/portal/PortalHeader';
import { AutomationCartable } from '../components/portal/AutomationCartable';
import { UserManagementPanel } from '../components/portal/UserManagementPanel';
import { DmsExplorer } from '../components/portal/DmsExplorer';
import { AttendanceWidget } from '../components/portal/AttendanceWidget';
import { ElectronicDeskModal } from '../components/portal/ElectronicDeskModal';
import { ForgotPasswordModal } from '../components/portal/ForgotPasswordModal';
import { normalizeCorporateUsername } from '../utils/corporateAccount';
import { ExecutiveMemberIdentity } from '../components/common/ExecutiveMemberIdentity';
import { IvrCommunicationsConsole } from '../components/ivr/IvrCommunicationsConsole';
import { EvidenceRegistryModal } from '../components/common/EvidenceRegistryModal';
import { AdminControlPanel } from '../components/portal/AdminControlPanel';
import { InternalDirectoryTab } from '../components/portal/InternalDirectoryTab';
import { InternalCommunicationTab } from '../components/portal/InternalCommunicationTab';

import { 
  Shield, ShieldCheck, ShieldAlert, CheckCircle, XCircle, Clock, ArrowRight, 
  Mail, Calendar, HardDrive, FileText, UserCheck, 
  HelpCircle, ChevronRight, Lock, User, Key, Sparkles, Building, KeyRound, Eye, EyeOff,
  Phone, PhoneCall, Award, ExternalLink
} from 'lucide-react';
import { OrgMemberProfile } from '../types';

// Type definitions for Directory
type OrgMemberCard = {
  name: TranslationKey;
  role: TranslationKey;
  desc: TranslationKey;
  rbac: string;
};

const RoleCard: React.FC<{ 
  member: OrgMemberCard; 
  t: (key: string) => string; 
  isFa: boolean;
  onVerifyClick?: (profile: OrgMemberProfile) => void;
  onCallClick?: (ext: string, profile: OrgMemberProfile) => void;
}> = ({ member, t, isFa, onVerifyClick, onCallClick }) => {
  // Normalize key name to match against INITIAL_ORG_MEMBERS
  const normalizedKey = member.name.toLowerCase().replace(/[^a-z]/g, '');
  const profile = INITIAL_ORG_MEMBERS.find(p => {
    const pKey = p.displayName.toLowerCase().replace(/[^a-z]/g, '');
    return pKey.includes(normalizedKey) || normalizedKey.includes(pKey) || (p.title && member.role && p.title.toLowerCase().includes(member.role.toLowerCase()));
  });

  const memberRole = profile?.role || (member.rbac === 'Admin' ? 'executive' : 'director');

  return (
    <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full group">
      <div>
        <div className="flex items-start gap-3.5 mb-3.5">
          <ExecutiveMemberIdentity
            name={profile?.displayName || t(member.name)}
            nameFa={profile?.displayNameFa}
            role={memberRole}
            photoUrl={profile?.avatarUrl}
            size="md"
            showBadge={true}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1 mb-0.5">
              <h4 className="font-display font-bold text-sm text-text-dark dark:text-white truncate">
                {isFa && profile?.displayNameFa ? profile.displayNameFa : t(member.name)}
              </h4>
              <span className={`px-2 py-0.5 text-[9px] font-bold rounded uppercase tracking-wider shrink-0 ${
                member.rbac === 'Admin' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' : 
                member.rbac === 'Manager' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                'bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-slate-400'
              }`}>
                {member.rbac}
              </span>
            </div>
            <p className="text-xs text-primary dark:text-secondary font-bold truncate">
              {isFa && profile?.titleFa ? profile.titleFa : t(member.role)}
            </p>
            {profile?.employeeId && (
              <p className="text-[10px] font-mono text-text-light dark:text-slate-400 flex items-center gap-1.5 flex-wrap mt-0.5">
                <span>{profile.employeeId}</span>
                <span>&bull;</span>
                <span>{isFa && profile.departmentFa ? profile.departmentFa : profile.department}</span>
              </p>
            )}
          </div>
        </div>

        {/* Verified Member & Extension Bar */}
        {profile && (
          <div className="flex items-center justify-between gap-2 mb-3 px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
            {profile.isVerifiedMember !== false && (
              <button
                onClick={() => onVerifyClick?.(profile)}
                className="flex items-center gap-1 text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
                title={isFa ? 'مشاهده سند اصالت و اعتبارنامه' : 'View Verified Credential'}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                <span>{isFa ? 'عضو تأییدشده' : 'Verified Member'}</span>
              </button>
            )}

            {profile.sipExtension && (
              <button
                onClick={() => onCallClick?.(profile.sipExtension || '', profile)}
                className="flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors ml-auto"
                title={isFa ? `تماس با داخلی ${profile.sipExtension}` : `Call Ext ${profile.sipExtension}`}
              >
                <Phone className="w-3 h-3" />
                <span>{isFa ? `داخلی ${profile.sipExtension}` : `Ext: ${profile.sipExtension}`}</span>
              </button>
            )}
          </div>
        )}

        <p className="text-xs text-text-light dark:text-slate-400 leading-relaxed border-t border-gray-100 dark:border-slate-700/60 pt-2.5">
          {t(member.desc)}
        </p>

        {/* Engineering Domains chips */}
        {profile?.engineeringDomains && profile.engineeringDomains.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1">
            {profile.engineeringDomains.slice(0, 2).map((dom, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700/70 text-slate-700 dark:text-slate-300 text-[9px] font-medium"
              >
                {dom}
              </span>
            ))}
          </div>
        )}
      </div>

      {profile && (
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-slate-700/60 flex items-center justify-between text-[10px] text-text-light dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-mono truncate">{profile.email}</span>
            {profile.linkedInUrl && (
              <a
                href={profile.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 font-mono font-bold hover:underline"
              >
                in
              </a>
            )}
          </div>
          <span className="font-mono px-1.5 py-0.5 rounded bg-gray-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
            {profile.clearanceLevel.split('/')[0].trim()}
          </span>
        </div>
      )}
    </div>
  );
};

// Corporate Login View with Username & Password authentication
const LoginView: React.FC = () => {
  const { t, isFa } = useLanguage();
  const { allUsers, loginWithFirebaseAuth, loginWithGoogle } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  const handleCorporateLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setAuthError(
        isFa 
          ? 'لطفاً نام کاربری سازمانی و رمز عبور را وارد فرمایید.' 
          : 'Please provide corporate username and password.'
      );
      return;
    }

    setLoading(true);
    setAuthError(null);

    try {
      // Real Firebase Authentication & Firestore Credentials Validation
      const res = await loginWithFirebaseAuth(username, password);
      if (!res.success) {
        setAuthError(res.message || (isFa ? 'نام کاربری یا رمز عبور سازمانی اشتباه است.' : 'Invalid credentials.'));
      }
    } catch (err: any) {
      setAuthError(err?.message || (isFa ? 'خطا در برقراری ارتباط با سامانه احراز هویت' : 'Authentication service error'));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setAuthError(null);
    try {
      await loginWithGoogle();
    } catch (err: any) {
      setAuthError(err?.message || (isFa ? 'ورود با حساب گوگل با خطا مواجه شد.' : 'Google authentication failed.'));
    } finally {
      setGoogleLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 py-12 px-4 flex items-center justify-center">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Col: Strict Corporate Authentication Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-7 bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-800 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-dark dark:from-secondary dark:to-primary text-white flex items-center justify-center shadow-lg font-display font-black text-xl tracking-tight">
                KKM
              </div>
              <div>
                <span className="text-[10px] font-mono font-extrabold text-primary dark:text-secondary uppercase tracking-wider">
                  Enterprise AI Operating System &bull; EAOS
                </span>
                <h1 className="text-xl font-display font-bold text-text-dark dark:text-white">
                  {isFa ? 'ورود به پرتال اتوماسیون سازمانی KKM' : 'KKM Enterprise Portal Login'}
                </h1>
              </div>
            </div>

            {/* Corporate Authentication Policy Notice without pattern leak */}
            <div className="bg-primary/5 dark:bg-slate-800/60 p-3.5 rounded-xl border border-primary/10 dark:border-slate-700/60 mb-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-primary dark:text-secondary mb-1">
                <Shield className="w-4 h-4" />
                <span>{isFa ? 'خط‌مشی امنیتی احراز هویت سازمانی' : 'Corporate Authentication Policy'}</span>
              </div>
              <p className="text-xs text-text-dark dark:text-slate-200 font-medium leading-relaxed">
                {isFa 
                  ? 'ورود به پرتال و سامانه اتوماسیون صرفاً با نام‌کاربری و رمز عبور سازمانی انجام می‌شود.'
                  : 'Access to the enterprise portal and automation system is strictly restricted to corporate usernames and passwords.'}
              </p>
            </div>

            {authError && (
              <div className="p-3.5 mb-5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-red-600 dark:text-red-400 text-xs flex items-start gap-2 animate-shake">
                <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="leading-relaxed">{authError}</div>
              </div>
            )}

            <form onSubmit={handleCorporateLogin} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-text-dark dark:text-slate-200">
                    {isFa ? 'نام کاربری سازمانی' : 'Corporate Username'}
                  </label>
                  <span className="text-[10px] font-mono text-primary dark:text-secondary">
                    @kkm-intl.org
                  </span>
                </div>
                <div className="relative">
                  <Mail className={`w-4 h-4 absolute ${isFa ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-gray-400`} />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={isFa ? 'نام کاربری یا ایمیل سازمانی خود را وارد نمایید' : 'Enter your corporate username or email'}
                    className={`w-full ${isFa ? 'pr-9 pl-3' : 'pl-9 pr-3'} py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/80 text-xs text-text-dark dark:text-white font-mono outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary`}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-text-dark dark:text-slate-200">
                    {isFa ? 'رمز عبور سازمانی' : 'Corporate Password'}
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsForgotModalOpen(true)}
                    className="text-[11px] font-semibold text-primary dark:text-secondary hover:underline flex items-center gap-1.5 transition-colors"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{isFa ? 'درخواست پشتیبانی IT / بازیابی رمز' : 'Request IT Support / Recover'}</span>
                  </button>
                </div>
                <div className="relative">
                  <Lock className={`w-4 h-4 absolute ${isFa ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-gray-400`} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className={`w-full ${isFa ? 'pr-9 pl-10' : 'pl-9 pr-10'} py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/80 text-xs text-text-dark dark:text-white outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute ${isFa ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200`}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-primary hover:bg-primary-dark dark:bg-secondary dark:text-slate-950 text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
              >
                {loading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white dark:border-slate-900 border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <Key className="w-4 h-4" />
                )}
                <span>{isFa ? 'ورود امن به پرتال سازمانی (Firebase & Firestore)' : 'Sign In to Enterprise Portal (Firebase & Firestore)'}</span>
              </button>

              {/* Google Workspace SSO Deactivated per Corporate Directive */}
              <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center">
                <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{isFa ? 'ورود با حساب گوگل سازمانی (Google Workspace SSO) غیرفعال است' : 'Google Workspace SSO Deactivated'}</span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {isFa
                    ? 'طبق مصوبه امنیت سایبری و سیاست دسترسی مستقیم، ورود با حساب خارجی گوگل مسدود شده و احراز هویت انحصاراً از طریق شناسه و رمز عبور سازمانی KKM انجام می‌پذیرد.'
                    : 'Per KKM Zero Trust Directive #SEC-2026-09, Google Workspace SSO is deactivated. Please authenticate using authorized corporate credentials.'}
                </p>
              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(true)}
                  className="text-xs text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-secondary inline-flex items-center gap-1.5 transition-colors font-medium"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>{isFa ? 'فراموشی رمز عبور؟ ارسال درخواست به بخش IT' : 'Forgot Password? Request IT Support'}</span>
                </button>
              </div>
            </form>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-text-light dark:text-slate-400">
            <span className="flex items-center gap-1.5 font-mono">
              <Shield className="w-3.5 h-3.5 text-green-500" />
              EAOS Zero Trust Access &bull; ISO/IEC 27001
            </span>
            <span className="font-mono text-[10px] text-slate-500">v3.4 Production</span>
          </div>
        </motion.div>

        {/* Right Col: Enterprise Architecture & Security Governance (No list of usernames) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 p-7 rounded-2xl shadow-2xl border border-slate-800 text-white flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Building className="w-4 h-4 text-secondary" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-secondary font-bold">
                {isFa ? 'امنیت و معماری یکپارچه سازمانی' : 'Enterprise Security Architecture'}
              </span>
            </div>
            
            <h3 className="text-base font-display font-bold mb-2 text-white">
              {isFa ? 'درگاه خدمات اتوماسیون سازمانی KKM' : 'KKM Enterprise Services Gateway'}
            </h3>
            
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              {isFa 
                ? 'پرتال یکپارچه سازمانی گروه بین‌المللی KKM، بستری امن برای مدیریت کارتابل اتوماسیون، اسناد محرمانه DMS، هوش مصنوعی سازمانی و ارتباطات داخلی اعضا می‌باشد.'
                : 'The unified digital operations hub for KKM International Group, providing secure workflow automation, tier-classified DMS, AI governance, and internal communication.'}
            </p>

            <div className="space-y-3.5">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white mb-0.5">
                    {isFa ? 'کنترل دسترسی چندلایه (RBAC / ABAC)' : 'Role-Based Access Control (RBAC)'}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {isFa 
                      ? 'تفکیک دقیق سطوح محرمانگی، ممیزی فرایندها و احراز هویت بدون انتشار عمومی شناسه‌های اعضا.'
                      : 'Zero-trust privilege management with strict segregation of duties and audit capabilities.'}
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                <HardDrive className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white mb-0.5">
                    {isFa ? 'پایگاه داده و بک‌اند توزیع‌شده' : 'Distributed Enterprise Backend'}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {isFa 
                      ? 'همگام‌سازی لحظه‌ای پایگاه داده کارتابل، بخشنامه‌های سازمانی و نظارت بر سلامت زیرساخت.'
                      : 'Real-time synchronization across telemetry, automation cartable, and enterprise document management.'}
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                <KeyRound className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white mb-0.5">
                    {isFa ? 'پشتیبانی و امنیت سایبری' : 'IT Security & Helpdesk'}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {isFa 
                      ? 'در صورت بروز هرگونه مشکل در احراز هویت، مراتب مستقیماً به نشانی it-security@kkm-intl.org ارجاع می‌گردد.'
                      : 'Direct escalation to the IT Security Desk at it-security@kkm-intl.org for credential verification.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
            <span className="font-mono">{isFa ? 'پشتیبانی فنی: it-security@kkm-intl.org' : 'IT Support: it-security@kkm-intl.org'}</span>
            <button
              type="button"
              onClick={() => setIsForgotModalOpen(true)}
              className="text-secondary hover:underline font-bold text-xs"
            >
              {isFa ? 'درخواست پشتیبانی IT / بازیابی' : 'Request IT Support'}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Corporate Password Recovery Modal */}
      <ForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
        allUsers={allUsers}
      />
    </div>
  );
};

// Main Portal Page Component
const InternalPortalPage: React.FC = () => {
  const { t, isFa } = useLanguage();
  const { currentUser, userProfile, logout, isSuperAdmin, isAdmin } = useAuth();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [requests, setRequests] = useState<AutomationRequest[]>(INITIAL_AUTOMATION_REQUESTS);
  const [activeDeskModal, setActiveDeskModal] = useState<string | null>(null);

  // Evidence Registry & IVR State
  const [selectedEvidenceMember, setSelectedEvidenceMember] = useState<OrgMemberProfile | null>(null);
  const [isIvrModalOpen, setIsIvrModalOpen] = useState(false);
  const [ivrExtension, setIvrExtension] = useState('101');
  const [ivrMember, setIvrMember] = useState<OrgMemberProfile | null>(null);

  const handleCallMember = (ext: string, member: OrgMemberProfile) => {
    setIvrExtension(ext);
    setIvrMember(member);
    setIsIvrModalOpen(true);
  };

  // Load requests from Backend API & Firestore
  useEffect(() => {
    const fetchRequests = async () => {
      // 1. Try real backend API
      try {
        const res = await fetch('/api/portal/cartable/requests');
        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.requests) && data.requests.length > 0) {
            setRequests(data.requests);
            return;
          }
        }
      } catch (e) {
        // Continue to Firestore or local fallback
      }

      // 2. Try Firestore if available
      if (db) {
        try {
          const snap = await getDocs(collection(db, 'automationRequests'));
          if (!snap.empty) {
            const list: AutomationRequest[] = [];
            snap.forEach((d) => {
              list.push({ id: d.id, ...d.data() } as AutomationRequest);
            });
            setRequests(list);
            return;
          }
        } catch (err) {
          console.warn('Using local automation requests:', err);
        }
      }
    };
    fetchRequests();
  }, []);

  // Handler for creating a new request
  const handleCreateRequest = async (newReqData: Omit<AutomationRequest, 'id' | 'createdAt' | 'updatedAt' | 'approvals'>) => {
    const now = new Date().toISOString();
    const generatedId = `REQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRequest: AutomationRequest = {
      ...newReqData,
      id: generatedId,
      approvals: [],
      createdAt: now,
      updatedAt: now,
    };

    // 1. Post to real Backend API
    try {
      await fetch('/api/portal/cartable/requests', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRequest)
      });
    } catch (e) {
      console.warn('Backend API request dispatch failed:', e);
    }

    // 2. Save to Firestore if available
    if (db) {
      try {
        await addDoc(collection(db, 'automationRequests'), newRequest);
      } catch (e) {
        console.warn('Firestore write failed, falling back to local state:', e);
      }
    }

    setRequests((prev) => [newRequest, ...prev]);
  };

  // Handler for approving a request
  const handleApproveRequest = async (requestId: string, comments: string) => {
    const now = new Date();
    const timestampStr = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    setRequests((prev) =>
      prev.map((req) => {
        if (req.id !== requestId) return req;

        const isFinalApproval = req.status === 'pending_finance' || isSuperAdmin || isAdmin;
        const nextStatus = isFinalApproval ? 'approved' : 'pending_finance';

        const updatedApprovals = [
          ...(req.approvals || []),
          {
            step: userProfile?.title || 'Management Review',
            approverName: userProfile?.displayName || 'User',
            approverRole: userProfile?.role || 'Director',
            action: 'approved' as const,
            timestamp: timestampStr,
            comments: comments || (isFa ? 'تایید شد' : 'Approved'),
          },
        ];

        return {
          ...req,
          status: nextStatus,
          approvals: updatedApprovals,
          updatedAt: now.toISOString(),
        };
      })
    );

    // Sync with backend API
    try {
      await fetch(`/api/portal/cartable/requests/${requestId}/status`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'approved',
          comments,
          approverName: userProfile?.displayName,
          approverRole: userProfile?.role
        })
      });
    } catch (e) {
      // ignore
    }

    // Update in Firestore
    if (db) {
      try {
        await updateDoc(doc(db, 'automationRequests', requestId), {
          status: 'approved',
          updatedAt: now.toISOString(),
        });
      } catch (e) {
        console.warn('Firestore updateDoc note:', e);
      }
    }
  };

  // Handler for rejecting a request
  const handleRejectRequest = async (requestId: string, comments: string) => {
    const now = new Date();
    const timestampStr = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    setRequests((prev) =>
      prev.map((req) => {
        if (req.id !== requestId) return req;

        const updatedApprovals = [
          ...(req.approvals || []),
          {
            step: userProfile?.title || 'Management Review',
            approverName: userProfile?.displayName || 'User',
            approverRole: userProfile?.role || 'Director',
            action: 'rejected' as const,
            timestamp: timestampStr,
            comments: comments || (isFa ? 'رد درخواست' : 'Rejected'),
          },
        ];

        return {
          ...req,
          status: 'rejected',
          approvals: updatedApprovals,
          updatedAt: now.toISOString(),
        };
      })
    );

    // Sync with backend API
    try {
      await fetch(`/api/portal/cartable/requests/${requestId}/status`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'rejected',
          comments,
          approverName: userProfile?.displayName,
          approverRole: userProfile?.role
        })
      });
    } catch (e) {
      // ignore
    }

    if (db) {
      try {
        await updateDoc(doc(db, 'automationRequests', requestId), {
          status: 'rejected',
          updatedAt: now.toISOString(),
        });
      } catch (e) {
        console.warn('Firestore updateDoc note:', e);
      }
    }
  };

  // Calculate pending count for badge
  const pendingInboxCount = requests.filter(
    (r) =>
      (r.status === 'pending_manager' || r.status === 'pending_finance') &&
      (isSuperAdmin || isAdmin || r.department === userProfile?.department)
  ).length;

  // Directory Tabs data
  const [activeOrgTab, setActiveOrgTab] = useState('ExecutiveLeadership');
  const executiveLeadership: OrgMemberCard[] = [
    { name: 'GinoAyyoubian', role: 'CEO', desc: 'CEODesc', rbac: 'Admin' },
    { name: 'DrRezaAsakereh', role: 'CTO', desc: 'CTODesc', rbac: 'Admin' },
    { name: 'DrKhosroJarrahian', role: 'CSO', desc: 'CSODesc', rbac: 'Manager' },
    { name: 'FaridImani', role: 'CIO', desc: 'CIODesc', rbac: 'Manager' },
    { name: 'DrPedramAbdarzadeh', role: 'CFO', desc: 'CFODesc', rbac: 'Manager' },
    { name: 'HeidarYarveicy', role: 'COO', desc: 'COODesc', rbac: 'Manager' },
  ];

  const seniorManagement: OrgMemberCard[] = [
    { name: 'DrSalarHashemi', role: 'DirectorOfEnergySystems', desc: 'EnergySystemsDesc', rbac: 'Manager' },
    { name: 'MahdiGhiasy', role: 'DirectorOfBIM', desc: 'BIMDesc', rbac: 'Manager' },
    { name: 'AshkanTofangchiha', role: 'QAQCManager', desc: 'QAQCDesc', rbac: 'Reviewer' },
  ];

  const corporateFunctions: OrgMemberCard[] = [
    { name: 'MasoumehMoshar', role: 'DirectorOfPR', desc: 'PRDesc', rbac: 'Manager' },
    { name: 'HamedZatajam', role: 'DirectorOfLegal', desc: 'LegalDesc', rbac: 'Manager' },
  ];

  const directoryTabs = [
    { id: 'ExecutiveLeadership', label: 'ExecutiveLeadership', data: executiveLeadership },
    { id: 'SeniorManagement', label: 'SeniorManagement', data: seniorManagement },
    { id: 'CorporateFunctions', label: 'CorporateFunctions', data: corporateFunctions },
  ];

  // If user is not authenticated, show LoginView
  if (!userProfile && !currentUser) {
    return <LoginView />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pb-20 sm:pb-12 transition-colors">
      {/* Universal Top Header with Persona Switcher & Tab Navigation */}
      <PortalHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingCount={pendingInboxCount}
      />

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* TAB 1: DASHBOARD & WORKSTATION */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Top Row: Pending Tasks Widget, Electronic Desk, Policy Alerts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Widget 1: Pending Tasks & Cartable Quick Action */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-slate-700 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary dark:text-secondary" />
                      <h3 className="font-display font-bold text-sm text-text-dark dark:text-white">
                        {t('PendingTasks')}
                      </h3>
                    </div>
                    {pendingInboxCount > 0 ? (
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                        {pendingInboxCount} {isFa ? 'نیازمند اقدام' : 'Action Required'}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">
                        {isFa ? 'کارتابل تسویه' : 'All Clear'}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2.5">
                    {requests
                      .filter((r) => r.status === 'pending_manager' || r.status === 'pending_finance')
                      .slice(0, 3)
                      .map((req) => (
                        <div
                          key={req.id}
                          className="p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-between gap-3 text-xs"
                        >
                          <div className="space-y-0.5 overflow-hidden">
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono text-[10px] font-bold text-primary dark:text-secondary">
                                {req.id}
                              </span>
                              <span className="font-bold text-text-dark dark:text-white truncate">
                                {req.title}
                              </span>
                            </div>
                            <p className="text-[11px] text-text-light dark:text-slate-400">
                              {req.requesterName} &bull; {req.department}
                            </p>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => handleApproveRequest(req.id, isFa ? 'تایید سریع از داشبورد' : 'Approved from Dashboard')}
                              className="p-1.5 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/40 rounded-lg transition-colors"
                              title={t('Approve')}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleRejectRequest(req.id, isFa ? 'رد سریع از داشبورد' : 'Rejected from Dashboard')}
                              className="p-1.5 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition-colors"
                              title={t('Reject')}
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('cartable')}
                  className="w-full mt-4 py-2 bg-primary/5 hover:bg-primary/10 text-primary dark:bg-secondary/10 dark:hover:bg-secondary/20 dark:text-secondary font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <span>{isFa ? 'مشاهده تمامی درخواست‌های کارتابل' : 'View Full Automation Cartable'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 ${isFa ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Widget 2: Electronic Desk Tools (Clickable!) */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-slate-700 mb-4">
                    <div className="flex items-center gap-2">
                      <HardDrive className="w-5 h-5 text-primary dark:text-secondary" />
                      <h3 className="font-display font-bold text-sm text-text-dark dark:text-white">
                        {t('ElectronicDesk')}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono text-text-light dark:text-slate-400">
                      7 {isFa ? 'ابزار متصل' : 'Tools'}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    <button
                      onClick={() => setActiveTab('ivr')}
                      className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 transition-all text-center flex flex-col items-center justify-center gap-1.5 group border border-emerald-200 dark:border-emerald-800/60"
                      title={isFa ? 'تلفن گویا و سافت‌فون VoIP' : 'IVR Softphone'}
                    >
                      <PhoneCall className="w-5 h-5 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span className="text-[11px] font-bold">{isFa ? 'تلفن گویا' : 'IVR VoIP'}</span>
                    </button>
                    <button
                      onClick={() => setActiveDeskModal('mail')}
                      className="p-3 rounded-xl bg-gray-50 dark:bg-slate-700/50 hover:bg-primary/10 dark:hover:bg-secondary/15 transition-all text-center flex flex-col items-center justify-center gap-1.5 group"
                    >
                      <Mail className="w-5 h-5 text-primary dark:text-secondary group-hover:scale-110 transition-transform" />
                      <span className="text-[11px] font-bold text-text-dark dark:text-slate-200">{t('Tool_Mail')}</span>
                    </button>

                    <button
                      onClick={() => setActiveDeskModal('calendar')}
                      className="p-3 rounded-xl bg-gray-50 dark:bg-slate-700/50 hover:bg-primary/10 dark:hover:bg-secondary/15 transition-all text-center flex flex-col items-center justify-center gap-1.5 group"
                    >
                      <Calendar className="w-5 h-5 text-primary dark:text-secondary group-hover:scale-110 transition-transform" />
                      <span className="text-[11px] font-bold text-text-dark dark:text-slate-200">{t('Tool_Calendar')}</span>
                    </button>

                    <button
                      onClick={() => setActiveDeskModal('drive')}
                      className="p-3 rounded-xl bg-gray-50 dark:bg-slate-700/50 hover:bg-primary/10 dark:hover:bg-secondary/15 transition-all text-center flex flex-col items-center justify-center gap-1.5 group"
                    >
                      <HardDrive className="w-5 h-5 text-primary dark:text-secondary group-hover:scale-110 transition-transform" />
                      <span className="text-[11px] font-bold text-text-dark dark:text-slate-200">{t('Tool_Drive')}</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('dms')}
                      className="p-3 rounded-xl bg-gray-50 dark:bg-slate-700/50 hover:bg-primary/10 dark:hover:bg-secondary/15 transition-all text-center flex flex-col items-center justify-center gap-1.5 group"
                    >
                      <FileText className="w-5 h-5 text-primary dark:text-secondary group-hover:scale-110 transition-transform" />
                      <span className="text-[11px] font-bold text-text-dark dark:text-slate-200">{t('Tool_DMS')}</span>
                    </button>

                    <button
                      onClick={() => setActiveDeskModal('hr')}
                      className="p-3 rounded-xl bg-gray-50 dark:bg-slate-700/50 hover:bg-primary/10 dark:hover:bg-secondary/15 transition-all text-center flex flex-col items-center justify-center gap-1.5 group"
                    >
                      <UserCheck className="w-5 h-5 text-primary dark:text-secondary group-hover:scale-110 transition-transform" />
                      <span className="text-[11px] font-bold text-text-dark dark:text-slate-200">{t('Tool_HR')}</span>
                    </button>

                    <button
                      onClick={() => setActiveDeskModal('it')}
                      className="p-3 rounded-xl bg-gray-50 dark:bg-slate-700/50 hover:bg-primary/10 dark:hover:bg-secondary/15 transition-all text-center flex flex-col items-center justify-center gap-1.5 group"
                    >
                      <HelpCircle className="w-5 h-5 text-primary dark:text-secondary group-hover:scale-110 transition-transform" />
                      <span className="text-[11px] font-bold text-text-dark dark:text-slate-200">{t('Tool_IT')}</span>
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-slate-700 text-[11px] text-text-light dark:text-slate-400 text-center">
                  {isFa ? 'متصل به کلاستر اختصاصی ابری KKM' : 'Connected to Private KKM Cloud Gateway'}
                </div>
              </div>

              {/* Widget 3: Compliance & Official Decrees */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-slate-700 mb-4">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary dark:text-secondary" />
                      <h3 className="font-display font-bold text-sm text-text-dark dark:text-white">
                        {t('ComplianceDirectives')}
                      </h3>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                      EAOS v3.2
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div
                      onClick={() => setActiveTab('dms')}
                      className="p-2.5 rounded-xl border-s-4 border-s-primary bg-gray-50 dark:bg-slate-700/40 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                    >
                      <p className="font-bold text-text-dark dark:text-white">{t('PolicyUpdate_Tax')}</p>
                      <div className="flex justify-between items-center text-[10px] text-text-light dark:text-slate-400 mt-1">
                        <span>Oct 24, 2026</span>
                        <span className="bg-gray-200 dark:bg-slate-600 px-1.5 py-0.2 rounded font-mono">Finance</span>
                      </div>
                    </div>

                    <div
                      onClick={() => setActiveTab('dms')}
                      className="p-2.5 rounded-xl border-s-4 border-s-secondary bg-gray-50 dark:bg-slate-700/40 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                    >
                      <p className="font-bold text-text-dark dark:text-white">{t('PolicyUpdate_Env')}</p>
                      <div className="flex justify-between items-center text-[10px] text-text-light dark:text-slate-400 mt-1">
                        <span>Oct 10, 2026</span>
                        <span className="bg-gray-200 dark:bg-slate-600 px-1.5 py-0.2 rounded font-mono">HSE / EPA</span>
                      </div>
                    </div>

                    <div
                      onClick={() => setActiveTab('dms')}
                      className="p-2.5 rounded-xl border-s-4 border-s-red-500 bg-gray-50 dark:bg-slate-700/40 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                    >
                      <p className="font-bold text-text-dark dark:text-white">{t('PolicyUpdate_IT')}</p>
                      <div className="flex justify-between items-center text-[10px] text-text-light dark:text-slate-400 mt-1">
                        <span>Sep 28, 2026</span>
                        <span className="bg-gray-200 dark:bg-slate-600 px-1.5 py-0.2 rounded font-mono">Zero Trust</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('dms')}
                  className="w-full mt-4 text-xs text-primary dark:text-secondary font-bold hover:underline text-center"
                >
                  {isFa ? 'ورود به مرکز اسناد و بخشنامه‌ها &larr;' : 'Access Full DMS Repository &rarr;'}
                </button>
              </div>
            </div>

            {/* Operational Workflows & Governance Directives Accordion */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
              <h3 className="font-display font-bold text-base sm:text-lg text-primary-dark dark:text-secondary mb-4 border-b dark:border-slate-700 pb-3">
                {isFa ? 'فرآیندهای عملیاتی و پروتکل‌های اجرایی سازمانی' : 'Operational Workflows & Execution Protocols'}
              </h3>
              <div className="space-y-2">
                <Accordion title={t('OperationalModelFunctions')}>
                  <p className="text-text-light dark:text-slate-300 text-xs sm:text-sm leading-relaxed">{t('OperationalModelContent')}</p>
                </Accordion>
                <Accordion title={t('Tier1Workflow')}>
                  <p className="text-text-light dark:text-slate-300 text-xs sm:text-sm leading-relaxed">{t('Tier1WorkflowContent')}</p>
                </Accordion>
                <Accordion title={t('Tier2Workflow')}>
                  <p className="text-text-light dark:text-slate-300 text-xs sm:text-sm leading-relaxed">{t('Tier2WorkflowContent')}</p>
                </Accordion>
                <Accordion title={t('Tier3Workflow')}>
                  <p className="text-text-light dark:text-slate-300 text-xs sm:text-sm leading-relaxed">{t('Tier3WorkflowContent')}</p>
                </Accordion>
                <Accordion title={t('IVREscalationProtocol')}>
                  <p className="text-text-light dark:text-slate-300 text-xs sm:text-sm leading-relaxed">{t('IVREscalationContent')}</p>
                </Accordion>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: AUTOMATION CARTABLE & WORKFLOWS */}
        {activeTab === 'cartable' && (
          <AutomationCartable
            requests={requests}
            onRequestCreated={handleCreateRequest}
            onApprove={handleApproveRequest}
            onReject={handleRejectRequest}
          />
        )}

        {/* TAB 3: DMS & POLICIES */}
        {activeTab === 'dms' && <DmsExplorer />}

        {/* TAB 4: ATTENDANCE & TELEMETRY */}
        {activeTab === 'attendance' && <AttendanceWidget />}

        {/* TAB: GMEL TELEMETRY & PORTAL CMS (ADMIN CONTROL PANEL) */}
        {activeTab === 'adminControl' && <AdminControlPanel />}

        {/* TAB 5: USERS & RBAC ACCESS CONTROL */}
        {activeTab === 'users' && <UserManagementPanel />}

        {/* TAB 6: ORGANIZATIONAL DIRECTORY */}
        {activeTab === 'orgchart' && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 space-y-6">
            <div className="border-b dark:border-slate-700 pb-4">
              <h3 className="font-display font-bold text-lg sm:text-xl text-primary-dark dark:text-secondary">
                {t('OrgStructureTitle')}
              </h3>
              <p className="text-xs text-text-light dark:text-slate-400 mt-1">
                {isFa 
                  ? 'ساختار حاکمیت شرکتی، زنجیره فرماندهی و تفکیک وظایف ارکان گروه بین‌المللی کیمیا کاران ماد.' 
                  : 'Corporate governance structure, command chain, and organizational segregation of duties.'}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {directoryTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveOrgTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                    activeOrgTab === tab.id
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-gray-100 dark:bg-slate-700 text-text-dark dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {t(tab.label as TranslationKey)}
                </button>
              ))}
            </div>

            <div className="bg-gray-50 dark:bg-slate-900/50 p-4 rounded-xl min-h-[200px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeOrgTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                    {directoryTabs
                      .find((t) => t.id === activeOrgTab)
                      ?.data.map((member, index) => (
                        <RoleCard 
                          key={`${member.name}-${index}`} 
                          member={member} 
                          t={t} 
                          isFa={isFa} 
                          onVerifyClick={setSelectedEvidenceMember}
                          onCallClick={handleCallMember}
                        />
                      ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* TAB: INTERNAL DIRECTORY */}
        {activeTab === 'internalDirectory' && (
          <InternalDirectoryTab
            onCallMember={handleCallMember}
            onVerifyMember={setSelectedEvidenceMember}
          />
        )}

        {/* TAB: INTERNAL COMMUNICATION & IVR ARCHITECTURE */}
        {activeTab === 'internalCommunication' && (
          <InternalCommunicationTab
            onOpenSoftphone={(ext) => {
              setIvrExtension(ext || '101');
              setIsIvrModalOpen(true);
            }}
          />
        )}

        {/* TAB 7: IVR & SOFTPHONE COMMUNICATIONS */}
        {activeTab === 'ivr' && (
          <IvrCommunicationsConsole
            isOpen={true}
            initialExtension={ivrExtension}
            initialMember={ivrMember}
          />
        )}
      </main>

      {/* Electronic Desk Modal */}
      <ElectronicDeskModal
        toolId={activeDeskModal}
        isOpen={Boolean(activeDeskModal)}
        onClose={() => setActiveDeskModal(null)}
        onNavigateToTab={(tab) => {
          setActiveDeskModal(null);
          setActiveTab(tab);
        }}
      />

      {/* Verified Member Evidence Registry Modal */}
      <EvidenceRegistryModal
        member={selectedEvidenceMember}
        isOpen={Boolean(selectedEvidenceMember)}
        onClose={() => setSelectedEvidenceMember(null)}
      />

      {/* Quick IVR Softphone Pop-up Modal */}
      {isIvrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <IvrCommunicationsConsole
              isOpen={isIvrModalOpen}
              onClose={() => setIsIvrModalOpen(false)}
              initialExtension={ivrExtension}
              initialMember={ivrMember}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default InternalPortalPage;
