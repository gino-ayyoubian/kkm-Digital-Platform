import React from 'react';
import { useAuth } from '../../AuthContext';
import { useLanguage } from '../../LanguageContext';
import { Shield, UserCheck, LogOut, ChevronDown, Bell, Building2, Lock, Users } from 'lucide-react';
import { OrgRole } from '../../types';
import { ExecutiveMemberIdentity } from '../common/ExecutiveMemberIdentity';

interface PortalHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  pendingCount: number;
}

export const PortalHeader: React.FC<PortalHeaderProps> = ({
  activeTab,
  setActiveTab,
  pendingCount,
}) => {
  const { userProfile, allUsers, switchPersona, logout, isSuperAdmin, isAdmin } = useAuth();
  const { t, isFa } = useLanguage();
  const [showPersonaMenu, setShowPersonaMenu] = React.useState(false);

  const getRoleBadgeColor = (role?: OrgRole) => {
    switch (role) {
      case 'super_admin':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 border-purple-300';
      case 'executive':
        return 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 border-red-300';
      case 'director':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-300';
      case 'reviewer':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-300';
      case 'manager':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300 border-teal-300';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300 border-slate-300';
    }
  };

  const getRoleLabel = (role?: OrgRole) => {
    switch (role) {
      case 'super_admin':
        return isFa ? 'مدیر ارشد سامانه (Super Admin)' : 'Super Admin';
      case 'executive':
        return isFa ? 'مدیر ارشد اجرایی (C-Level)' : 'Executive (C-Level)';
      case 'director':
        return isFa ? 'مدیر دپارتمان' : 'Director';
      case 'reviewer':
        return isFa ? 'ممیز و کنترل کیفیت (QA/QC)' : 'QA/QC Reviewer';
      case 'manager':
        return isFa ? 'مدیر میانی' : 'Manager';
      default:
        return isFa ? 'کارشناس سازمانی' : 'Employee / Specialist';
    }
  };

  const navItems = [
    { id: 'dashboard', labelEn: 'Dashboard & Desk', labelFa: 'میز کار و داشبورد' },
    { id: 'cartable', labelEn: 'Automation Cartable', labelFa: 'کارتابل اتوماسیون', badge: pendingCount },
    { id: 'dms', labelEn: 'DMS & Policies', labelFa: 'مرکز اسناد و بخشنامه‌ها' },
    { id: 'attendance', labelEn: 'Attendance & Telemetry', labelFa: 'ثبت تردد و دورکاری' },
    ...(userProfile?.permissions.canManageUsers || isAdmin ? [
      { id: 'adminControl', labelEn: 'GMEL Telemetry & CMS', labelFa: 'کنترل پنل تله‌متری GMEL و CMS' },
      { id: 'users', labelEn: 'Users & RBAC', labelFa: 'مدیریت کاربران و دسترسی‌ها' }
    ] : []),
    { id: 'orgchart', labelEn: 'Org Directory', labelFa: 'ارکان و چارت سازمانی' },
    { id: 'ivr', labelEn: 'IVR & VoIP Telephony', labelFa: 'تلفن گویا و ارتباطات VoIP' },
  ];


  return (
    <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 shadow-sm sticky top-0 z-30 transition-colors">
      <div className="container mx-auto px-4 py-3">
        {/* Top Bar: Brand, Current User Info, Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark dark:from-secondary dark:to-primary text-white flex items-center justify-center shadow-md font-display font-extrabold text-lg">
              KKM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary dark:text-secondary">
                  {isFa ? 'گروه بین‌المللی کیمیا کاران ماد' : 'KKM International Group'}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 font-mono">
                  EAOS v3.2
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-display font-bold text-text-dark dark:text-white flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-primary dark:text-secondary" />
                {isFa ? 'پرتال جامع اتوماسیون و حاکمیت سازمانی' : 'Enterprise Automation & Operating Portal'}
              </h1>
            </div>
          </div>

          {/* User Profile & Persona Switcher */}
          <div className="flex items-center gap-3">
            {/* Active User Card */}
            <div className="flex items-center gap-3 bg-gray-50 dark:bg-slate-900/60 p-1.5 sm:px-3 sm:py-2 rounded-xl border border-gray-200 dark:border-slate-700">
              <ExecutiveMemberIdentity
                name={userProfile?.displayName || 'User'}
                nameFa={userProfile?.displayNameFa}
                role={userProfile?.role || 'employee'}
                photoUrl={userProfile?.avatarUrl}
                size="md"
                showBadge={false}
              />
              <div className="hidden sm:block text-start">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-bold text-text-dark dark:text-white leading-tight">
                    {isFa && userProfile?.displayNameFa ? userProfile.displayNameFa : userProfile?.displayName}
                  </p>
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-semibold border ${getRoleBadgeColor(userProfile?.role)}`}>
                    {getRoleLabel(userProfile?.role)}
                  </span>
                </div>
                <p className="text-[11px] text-text-light dark:text-slate-400">
                  {isFa && userProfile?.titleFa ? userProfile.titleFa : userProfile?.title} &bull; <span className="font-mono">{userProfile?.employeeId}</span>
                </p>
              </div>

              {/* Persona Switcher Dropdown (Available for Super Admins / Executives) */}
              {(isSuperAdmin || userProfile?.role === 'executive') && (
                <div className="relative">
                  <button
                    onClick={() => setShowPersonaMenu(!showPersonaMenu)}
                    title={isFa ? 'تغییر پرسونای فعال سازمانی (ویژه مدیران ارشد)' : 'Switch Active Organizational Persona (Executive Audit)'}
                    className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 text-text-light dark:text-slate-300 transition-colors flex items-center gap-1 text-xs"
                  >
                    <Users className="w-4 h-4 text-primary dark:text-secondary" />
                    <ChevronDown className="w-3 h-3" />
                  </button>

                  {showPersonaMenu && (
                    <div className={`absolute ${isFa ? 'left-0' : 'right-0'} mt-2 w-72 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700 py-2 z-50 text-start`}>
                      <div className="px-3 py-1.5 border-b border-gray-100 dark:border-slate-700 text-[11px] font-semibold text-text-light dark:text-slate-400">
                        {isFa ? 'شبیه‌ساز و ممیزی نقش‌ها (ویژه مدیران)' : 'Audit & Persona Switch (Admins)'}
                      </div>
                      <div className="max-h-64 overflow-y-auto divide-y divide-gray-50 dark:divide-slate-700/50">
                        {allUsers.map((member, idx) => (
                          <button
                            key={`persona-${member.uid}-${idx}`}
                            onClick={() => {
                              switchPersona(member.uid);
                              setShowPersonaMenu(false);
                            }}
                            className={`w-full px-3 py-2 text-start flex items-center justify-between hover:bg-primary/5 dark:hover:bg-secondary/10 transition-colors ${
                              userProfile?.uid === member.uid ? 'bg-primary/10 dark:bg-secondary/20' : ''
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <ExecutiveMemberIdentity
                                name={member.displayName}
                                nameFa={member.displayNameFa}
                                role={member.role}
                                photoUrl={member.avatarUrl}
                                size="sm"
                                showBadge={false}
                              />
                              <div>
                                <p className="text-xs font-bold text-text-dark dark:text-white">
                                  {isFa && member.displayNameFa ? member.displayNameFa : member.displayName}
                                </p>
                                <p className="text-[10px] text-text-light dark:text-slate-400">
                                  {isFa && member.titleFa ? member.titleFa : member.title}
                                </p>
                              </div>
                            </div>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${getRoleBadgeColor(member.role)}`}>
                              {member.role}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="p-2 sm:px-3 sm:py-2 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl border border-red-200 dark:border-red-900/50 transition-colors flex items-center gap-1.5"
              title={isFa ? 'خروج امن از حساب' : 'Logout'}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">{isFa ? 'خروج' : 'Logout'}</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex items-center gap-1 sm:gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-primary text-white dark:bg-secondary dark:text-slate-900 shadow-sm'
                    : 'text-text-light dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700/60'
                }`}
              >
                <span>{isFa ? item.labelFa : item.labelEn}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-white text-primary dark:bg-slate-900 dark:text-secondary' : 'bg-red-500 text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
