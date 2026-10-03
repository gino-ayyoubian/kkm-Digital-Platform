import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import { useLanguage } from '../../LanguageContext';
import { 
  Users, UserPlus, Shield, Search, Filter, Lock, CheckCircle, 
  AlertTriangle, Phone, Mail, Building, Key, Edit, RefreshCw, Download
} from 'lucide-react';
import { UserProfile, OrgRole } from '../../AuthContext';
import { EditUserModal } from './EditUserModal';
import { AddUserModal } from './AddUserModal';
import { ExecutiveMemberIdentity } from '../common/ExecutiveMemberIdentity';

export const UserManagementPanel: React.FC = () => {
  const { allUsers, updateUserProfile, addUser, switchPersona, userProfile } = useAuth();
  const { isFa } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const [selectedUserForEdit, setSelectedUserForEdit] = useState<UserProfile | null>(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  const handleExportCSV = () => {
    const headers = ['Employee ID', 'Name', 'Name (FA)', 'Email', 'Role', 'Department', 'Title', 'Clearance', 'Status'];
    const rows = filteredUsers.map(u => [
      u.employeeId,
      `"${u.displayName}"`,
      `"${u.displayNameFa || ''}"`,
      u.email,
      u.role,
      `"${u.department}"`,
      `"${u.title}"`,
      `"${u.clearanceLevel}"`,
      u.status
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `KKM_Personnel_Directory_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter users
  const filteredUsers = allUsers.filter((u) => {
    if (filterDepartment !== 'all' && u.department !== filterDepartment) return false;
    if (filterRole !== 'all' && u.role !== filterRole) return false;
    if (filterStatus !== 'all' && u.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = u.displayName.toLowerCase().includes(q) || (u.displayNameFa && u.displayNameFa.includes(q));
      const matchEmail = u.email.toLowerCase().includes(q);
      const matchId = u.employeeId.toLowerCase().includes(q);
      const matchTitle = u.title.toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchId && !matchTitle) return false;
    }
    return true;
  });

  const getRoleBadge = (role: OrgRole) => {
    switch (role) {
      case 'super_admin':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 border border-purple-200 dark:border-purple-800">Super Admin</span>;
      case 'executive':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 border border-red-200 dark:border-red-800">Executive</span>;
      case 'director':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800">Director</span>;
      case 'reviewer':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800">Reviewer (QA)</span>;
      case 'manager':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300 border border-teal-200 dark:border-teal-800">Manager</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600">Employee</span>;
    }
  };

  const getClearanceBadge = (level: string) => {
    if (level.includes('Top Secret')) {
      return <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300 font-mono">TOP SECRET</span>;
    } else if (level.includes('Confidential')) {
      return <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 font-mono">TIER-1 CONFIDENTIAL</span>;
    } else if (level.includes('Operational')) {
      return <span className="px-2 py-0.5 rounded text-[9px] font-medium bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300 font-mono">TIER-2 OPERATIONAL</span>;
    }
    return <span className="px-2 py-0.5 rounded text-[9px] font-medium bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-300 font-mono">STANDARD</span>;
  };

  const totalMembers = allUsers.length;
  const activeMembers = allUsers.filter(u => u.status === 'active').length;
  const adminMembers = allUsers.filter(u => u.role === 'super_admin' || u.role === 'executive').length;
  const directorMembers = allUsers.filter(u => u.role === 'director').length;

  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-text-light dark:text-slate-400 font-medium">
              {isFa ? 'کل اعضای سازمان' : 'Total Org Members'}
            </p>
            <p className="text-2xl font-bold font-mono text-primary dark:text-secondary mt-1">
              {totalMembers}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-secondary/15 text-primary dark:text-secondary flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-text-light dark:text-slate-400 font-medium">
              {isFa ? 'پرسنل فعال' : 'Active Personnel'}
            </p>
            <p className="text-2xl font-bold font-mono text-green-600 dark:text-green-400 mt-1">
              {activeMembers}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-text-light dark:text-slate-400 font-medium">
              {isFa ? 'مدیران ارشد (Executive/Admin)' : 'Executive / Admin'}
            </p>
            <p className="text-2xl font-bold font-mono text-purple-600 dark:text-purple-400 mt-1">
              {adminMembers}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-text-light dark:text-slate-400 font-medium">
              {isFa ? 'مدیران دپارتمان‌ها' : 'Department Directors'}
            </p>
            <p className="text-2xl font-bold font-mono text-blue-600 dark:text-blue-400 mt-1">
              {directorMembers}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Building className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Control Bar: Search, Filters, Add User */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary dark:text-secondary" />
            <h3 className="text-sm sm:text-base font-bold text-text-dark dark:text-white">
              {isFa ? 'فهرست پرسنل و ماتریس کنترل دسترسی مبتنی بر نقش (RBAC/ABAC)' : 'Personnel Directory & Role-Based Access Matrix'}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-text-dark dark:text-slate-200 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
              title={isFa ? 'دریافت خروجی اکسل و CSV اعضای سازمان' : 'Export Personnel Directory CSV'}
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isFa ? 'خروجی CSV' : 'Export CSV'}</span>
            </button>
            <button
              onClick={() => setIsAddUserModalOpen(true)}
              className="px-4 py-2 bg-primary hover:bg-primary-dark dark:bg-secondary dark:hover:bg-secondary/90 text-white dark:text-slate-900 rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>{isFa ? 'انتصاب و ثبت عضو جدید' : 'Add New Member'}</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2 border-t border-gray-100 dark:border-slate-700/60">
          <div className="relative sm:col-span-1">
            <Search className={`w-4 h-4 absolute ${isFa ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-gray-400`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isFa ? 'جستجو در نام، ایمیل، سمت...' : 'Search name, email, title...'}
              className={`w-full ${isFa ? 'pr-9 pl-3' : 'pl-9 pr-3'} py-2 rounded-xl text-xs bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 outline-none focus:ring-1 focus:ring-primary`}
            />
          </div>

          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 outline-none text-text-dark dark:text-slate-200"
          >
            <option value="all">{isFa ? 'تمامی نقش‌ها' : 'All Roles'}</option>
            <option value="super_admin">Super Admin</option>
            <option value="executive">Executive</option>
            <option value="director">Director</option>
            <option value="manager">Manager</option>
            <option value="reviewer">Reviewer</option>
            <option value="employee">Employee</option>
          </select>

          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 outline-none text-text-dark dark:text-slate-200"
          >
            <option value="all">{isFa ? 'تمامی دپارتمان‌ها' : 'All Departments'}</option>
            <option value="Executive Board">Executive Board</option>
            <option value="R&D & AI Systems">R&D & AI Systems</option>
            <option value="Science & Sustainability">Science & Sustainability</option>
            <option value="Finance & Investments">Finance & Investments</option>
            <option value="Operations & Logistics">Operations & Logistics</option>
            <option value="Energy Systems">Energy Systems</option>
            <option value="BIM & Simulation">BIM & Simulation</option>
            <option value="Quality Assurance">Quality Assurance</option>
            <option value="Public Relations">Public Relations</option>
            <option value="Legal & Intellectual Property">Legal & IP</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 outline-none text-text-dark dark:text-slate-200"
          >
            <option value="all">{isFa ? 'تمامی وضعیت‌ها' : 'All Statuses'}</option>
            <option value="active">{isFa ? 'فعال' : 'Active'}</option>
            <option value="leave">{isFa ? 'مرخصی' : 'On Leave'}</option>
            <option value="suspended">{isFa ? 'معلق' : 'Suspended'}</option>
          </select>
        </div>
      </div>

      {/* Users Table / Grid */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead className="bg-gray-50 dark:bg-slate-900/60 border-b border-gray-200 dark:border-slate-700 text-text-light dark:text-slate-400 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 text-start">{isFa ? 'نام و مشخصات عضو' : 'Member & Title'}</th>
                <th className="px-4 py-3 text-start">{isFa ? 'دپارتمان' : 'Department'}</th>
                <th className="px-4 py-3 text-start">{isFa ? 'نقش RBAC' : 'RBAC Role'}</th>
                <th className="px-4 py-3 text-start">{isFa ? 'سطح حفاظت (Clearance)' : 'Clearance'}</th>
                <th className="px-4 py-3 text-start">{isFa ? 'وضعیت' : 'Status'}</th>
                <th className="px-4 py-3 text-start">{isFa ? 'آخرین حضور' : 'Last Login'}</th>
                <th className="px-4 py-3 text-end">{isFa ? 'عملیات دسترسی' : 'Access Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700/60">
              {filteredUsers.map((member, idx) => {
                const isCurrentUser = member.uid === userProfile?.uid;
                return (
                  <tr key={`user-row-${member.uid}-${idx}`} className={`hover:bg-gray-50/80 dark:hover:bg-slate-700/40 transition-colors ${
                    isCurrentUser ? 'bg-primary/5 dark:bg-secondary/5' : ''
                  }`}>
                    {/* Member & Title */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <ExecutiveMemberIdentity
                          name={member.displayName}
                          nameFa={member.displayNameFa}
                          role={member.role}
                          photoUrl={member.avatarUrl}
                          size="md"
                          showBadge={false}
                          className="shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-text-dark dark:text-white">
                              {isFa && member.displayNameFa ? member.displayNameFa : member.displayName}
                            </span>
                            {isCurrentUser && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-primary/10 text-primary dark:bg-secondary/20 dark:text-secondary font-bold">
                                {isFa ? 'شما' : 'You'}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-text-light dark:text-slate-400">
                            {isFa && member.titleFa ? member.titleFa : member.title} &bull; <span className="font-mono">{member.employeeId}</span>
                          </p>
                          <p className="text-[10px] text-text-light dark:text-slate-500 font-mono">
                            {member.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Department */}
                    <td className="px-4 py-3.5 font-medium text-text-dark dark:text-slate-300">
                      {isFa && member.departmentFa ? member.departmentFa : member.department}
                    </td>

                    {/* Role */}
                    <td className="px-4 py-3.5">
                      {getRoleBadge(member.role)}
                    </td>

                    {/* Clearance */}
                    <td className="px-4 py-3.5">
                      {getClearanceBadge(member.clearanceLevel)}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        member.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-300' :
                        member.status === 'leave' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300' :
                        'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300'
                      }`}>
                        {member.status === 'active' ? (isFa ? 'فعال' : 'Active') :
                         member.status === 'leave' ? (isFa ? 'مرخصی' : 'On Leave') : (isFa ? 'معلق' : 'Suspended')}
                      </span>
                    </td>

                    {/* Last Login */}
                    <td className="px-4 py-3.5 font-mono text-text-light dark:text-slate-400 text-[11px]">
                      {member.lastLogin || 'N/A'}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5 text-end">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Switch Persona button */}
                        <button
                          onClick={() => switchPersona(member.uid)}
                          title={isFa ? 'ورود به عنوان این پرسنل (سوئیچ پرسونای فعال)' : 'Impersonate / Switch Persona'}
                          className="p-1.5 text-primary hover:bg-primary/10 dark:text-secondary dark:hover:bg-secondary/20 rounded-lg transition-colors"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>

                        {/* Edit Role / Permissions */}
                        <button
                          onClick={() => setSelectedUserForEdit(member)}
                          className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-text-dark dark:text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                        >
                          <Edit className="w-3 h-3" />
                          <span>{isFa ? 'ویرایش دسترسی' : 'Edit Access'}</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit User Modal */}
      <EditUserModal
        user={selectedUserForEdit}
        isOpen={Boolean(selectedUserForEdit)}
        onClose={() => setSelectedUserForEdit(null)}
        onSave={updateUserProfile}
      />

      {/* Add User Modal */}
      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        onAddUser={addUser}
      />
    </div>
  );
};
