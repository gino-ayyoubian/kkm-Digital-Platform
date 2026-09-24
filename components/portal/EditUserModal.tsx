import React, { useState } from 'react';
import { UserProfile, OrgRole } from '../../AuthContext';
import { useLanguage } from '../../LanguageContext';
import { Shield, X, Save, AlertCircle, Image, User, Check, RefreshCw } from 'lucide-react';
import { ExecutiveMemberIdentity } from '../common/ExecutiveMemberIdentity';

interface EditUserModalProps {
  user: UserProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (uid: string, updates: Partial<UserProfile>) => Promise<void>;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({
  user,
  isOpen,
  onClose,
  onSave,
}) => {
  const { isFa } = useLanguage();

  const [displayName, setDisplayName] = useState('');
  const [displayNameFa, setDisplayNameFa] = useState('');
  const [title, setTitle] = useState('');
  const [titleFa, setTitleFa] = useState('');
  const [department, setDepartment] = useState('');
  const [role, setRole] = useState<OrgRole>('employee');
  const [clearanceLevel, setClearanceLevel] = useState<UserProfile['clearanceLevel']>('Internal / Standard');
  const [status, setStatus] = useState<'active' | 'leave' | 'suspended'>('active');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [phone, setPhone] = useState('');
  const [permissions, setPermissions] = useState({
    canApproveAll: false,
    canApproveDepartment: false,
    canManageUsers: false,
    canAccessFinancials: false,
    canAccessConfidentialDMS: false,
    canIssueDirectives: false,
    canSubmitRequests: true,
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync state whenever active user changes
  React.useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setDisplayNameFa(user.displayNameFa || '');
      setTitle(user.title || '');
      setTitleFa(user.titleFa || '');
      setDepartment(user.department || '');
      setRole(user.role);
      setClearanceLevel(user.clearanceLevel);
      setStatus(user.status);
      setAvatarUrl(user.avatarUrl || '');
      setPhone(user.phone || '');
      setPermissions(user.permissions || {
        canApproveAll: false,
        canApproveDepartment: false,
        canManageUsers: false,
        canAccessFinancials: false,
        canAccessConfidentialDMS: false,
        canIssueDirectives: false,
        canSubmitRequests: true,
      });
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const handleTogglePermission = (key: keyof typeof permissions) => {
    setPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleRoleChange = (newRole: OrgRole) => {
    setRole(newRole);
    // Apply role-based default baseline permissions
    if (newRole === 'super_admin') {
      setPermissions({
        canApproveAll: true,
        canApproveDepartment: true,
        canManageUsers: true,
        canAccessFinancials: true,
        canAccessConfidentialDMS: true,
        canIssueDirectives: true,
        canSubmitRequests: true,
      });
      setClearanceLevel('Top Secret / Strategic');
    } else if (newRole === 'executive') {
      setPermissions({
        canApproveAll: false,
        canApproveDepartment: true,
        canManageUsers: false,
        canAccessFinancials: true,
        canAccessConfidentialDMS: true,
        canIssueDirectives: true,
        canSubmitRequests: true,
      });
      setClearanceLevel('Confidential / Tier-1');
    } else if (newRole === 'director') {
      setPermissions({
        canApproveAll: false,
        canApproveDepartment: true,
        canManageUsers: false,
        canAccessFinancials: false,
        canAccessConfidentialDMS: true,
        canIssueDirectives: true,
        canSubmitRequests: true,
      });
      setClearanceLevel('Confidential / Tier-1');
    } else if (newRole === 'reviewer') {
      setPermissions({
        canApproveAll: false,
        canApproveDepartment: true,
        canManageUsers: false,
        canAccessFinancials: false,
        canAccessConfidentialDMS: false,
        canIssueDirectives: false,
        canSubmitRequests: true,
      });
      setClearanceLevel('Operational / Tier-2');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await onSave(user.uid, {
        displayName,
        displayNameFa,
        title,
        titleFa,
        department,
        role,
        clearanceLevel,
        status,
        avatarUrl: avatarUrl.trim(),
        phone,
        permissions,
      });
      onClose();
    } catch (err: any) {
      setError(err?.message || (isFa ? 'خطا در ذخیره‌سازی تغییرات' : 'Failed to update user'));
    } finally {
      setSubmitting(false);
    }
  };

  const departmentsList = [
    'Executive Board',
    'R&D & AI Systems',
    'Science & Sustainability',
    'Finance & Investments',
    'Finance & Accounting',
    'Operations & Logistics',
    'Energy Systems',
    'BIM & Simulation',
    'Quality Assurance',
    'Public Relations',
    'Legal & Intellectual Property',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-slate-700 sticky top-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur z-10">
          <div>
            <h3 className="text-lg font-display font-bold text-text-dark dark:text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary dark:text-secondary" />
              {isFa ? 'مدیریت مشخصات، پرتره و دسترسی‌های کاربر' : 'Edit Member Profile, Portrait & Access Matrix'}
            </h3>
            <p className="text-xs text-text-light dark:text-slate-400 mt-0.5">
              {user.displayName} ({user.email}) &bull; <span className="font-mono">{user.employeeId}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Member Visual Identity Preview & Image URL */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center gap-5">
            <div className="shrink-0 flex flex-col items-center">
              <ExecutiveMemberIdentity
                name={displayName || user.displayName}
                nameFa={displayNameFa || user.displayNameFa}
                role={role}
                photoUrl={avatarUrl}
                size="lg"
                showBadge={true}
              />
              <span className="text-[10px] font-mono text-text-light dark:text-slate-400 mt-2">
                {avatarUrl ? (isFa ? 'پرتره تاییدشده' : 'Verified Photo') : (isFa ? 'نشان سازمانی KKM' : 'Corporate Monogram')}
              </span>
            </div>

            <div className="w-full space-y-2 text-xs">
              <label className="block font-bold text-text-dark dark:text-slate-300">
                {isFa ? 'نشانی اینترنتی تصویر پرتره رسمی (اختیاری)' : 'Official Portrait Photo URL (Optional)'}
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://example.com/real-portrait.jpg"
                  className="flex-grow px-3.5 py-2 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-text-dark dark:text-white font-mono text-xs outline-none focus:ring-2 focus:ring-primary"
                />
                {avatarUrl && (
                  <button
                    type="button"
                    onClick={() => setAvatarUrl('')}
                    className="px-3 py-2 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 text-xs font-semibold"
                  >
                    {isFa ? 'حذف (استفاده از نشان)' : 'Clear (Use Crest)'}
                  </button>
                )}
              </div>
              <p className="text-[11px] text-text-light dark:text-slate-400">
                {isFa
                  ? 'در صورت خالی بودن، نشان رسمی سازمانی با حروف اختصاری و درجه حاکمیتی KKM جایگزین می‌شود (عدم استفاده از تصاویر غیرواقعی).'
                  : 'If left empty, the official KKM Executive Directorate monogram & crest seal will be rendered.'}
              </p>
            </div>
          </div>

          {/* Names & Persian Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-text-dark dark:text-slate-300 uppercase tracking-wider mb-1.5">
                {isFa ? 'نام و نام خانوادگی (انگلیسی)' : 'Full Name (English)'}
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-text-dark dark:text-white text-xs font-semibold outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-text-dark dark:text-slate-300 uppercase tracking-wider mb-1.5">
                {isFa ? 'نام و نام خانوادگی (فارسی)' : 'Full Name (Persian)'}
              </label>
              <input
                type="text"
                value={displayNameFa}
                onChange={(e) => setDisplayNameFa(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-text-dark dark:text-white text-xs font-semibold outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Title and Title Fa */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-text-dark dark:text-slate-300 uppercase tracking-wider mb-1.5">
                {isFa ? 'عنوان شغلی (انگلیسی)' : 'Official Title (English)'}
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-text-dark dark:text-white text-xs font-semibold outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-text-dark dark:text-slate-300 uppercase tracking-wider mb-1.5">
                {isFa ? 'عنوان شغلی (فارسی)' : 'Official Title (Persian)'}
              </label>
              <input
                type="text"
                value={titleFa}
                onChange={(e) => setTitleFa(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-text-dark dark:text-white text-xs font-semibold outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Role and Clearance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-text-dark dark:text-slate-300 uppercase tracking-wider mb-1.5">
                {isFa ? 'نقش سازمانی (RBAC Role)' : 'RBAC Role'}
              </label>
              <select
                value={role}
                onChange={(e) => handleRoleChange(e.target.value as OrgRole)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-text-dark dark:text-white text-xs font-semibold outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="super_admin">{isFa ? 'مدیر ارشد سامانه (Super Admin)' : 'Super Admin (Full Access)'}</option>
                <option value="executive">{isFa ? 'مدیر ارشد اجرایی (Executive / C-Level)' : 'Executive (C-Level)'}</option>
                <option value="director">{isFa ? 'مدیر دپارتمان / واحد (Director)' : 'Department Director'}</option>
                <option value="manager">{isFa ? 'مدیر میانی (Manager)' : 'Manager'}</option>
                <option value="reviewer">{isFa ? 'ممیز فنی و کنترل کیفیت (Reviewer)' : 'QA/QC Reviewer'}</option>
                <option value="employee">{isFa ? 'کارشناس سازمانی (Employee / Specialist)' : 'Employee / Specialist'}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-text-dark dark:text-slate-300 uppercase tracking-wider mb-1.5">
                {isFa ? 'سطح حفاظت اطلاعات (Clearance)' : 'Security Clearance Level'}
              </label>
              <select
                value={clearanceLevel}
                onChange={(e) => setClearanceLevel(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-text-dark dark:text-white text-xs font-semibold outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Top Secret / Strategic">{isFa ? 'به کلی سری / راهبردی (Top Secret)' : 'Top Secret / Strategic'}</option>
                <option value="Confidential / Tier-1">{isFa ? 'محرمانه / لایه ۱ (Tier-1)' : 'Confidential / Tier-1'}</option>
                <option value="Operational / Tier-2">{isFa ? 'عملیاتی / لایه ۲ (Tier-2)' : 'Operational / Tier-2'}</option>
                <option value="Internal / Standard">{isFa ? 'درون‌سازمانی / استاندارد' : 'Internal / Standard'}</option>
              </select>
            </div>
          </div>

          {/* Department & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-text-dark dark:text-slate-300 uppercase tracking-wider mb-1.5">
                {isFa ? 'دپارتمان سازمانی' : 'Department'}
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-text-dark dark:text-white text-xs font-semibold outline-none focus:ring-2 focus:ring-primary"
              >
                {departmentsList.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-text-dark dark:text-slate-300 uppercase tracking-wider mb-1.5">
                {isFa ? 'وضعیت حساب پرسنلی' : 'Account Status'}
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-text-dark dark:text-white text-xs font-semibold outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="active">{isFa ? 'فعال (مجاز به تردد و کارتابل)' : 'Active'}</option>
                <option value="leave">{isFa ? 'مرخصی موقت' : 'On Leave'}</option>
                <option value="suspended">{isFa ? 'معلق / مسدود شده' : 'Suspended'}</option>
              </select>
            </div>
          </div>

          {/* Permissions Matrix (ABAC) */}
          <div className="pt-4 border-t border-gray-100 dark:border-slate-700">
            <h4 className="text-xs font-bold text-text-dark dark:text-white uppercase tracking-wider mb-3">
              {isFa ? 'ماتریس دسترسی‌های تفصیلی (Fine-Grained Permissions)' : 'Fine-Grained Permissions Matrix'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                { key: 'canApproveAll', labelEn: 'Global Approval (All Cartable)', labelFa: 'تأیید نهایی تمامی درخواست‌های کارتابل' },
                { key: 'canApproveDepartment', labelEn: 'Department Approval', labelFa: 'تأیید درخواست‌های درون‌دپارتمانی' },
                { key: 'canManageUsers', labelEn: 'Manage Users & RBAC Matrix', labelFa: 'مدیریت پرسنل و تغییر سطوح دسترسی' },
                { key: 'canAccessFinancials', labelEn: 'Access Financial Ledgers & Audits', labelFa: 'مشاهده اسناد مالی و فاکتورهای کلان' },
                { key: 'canAccessConfidentialDMS', labelEn: 'Access Confidential DMS Directives', labelFa: 'دسترسی به اسناد محرمانه و سری DMS' },
                { key: 'canIssueDirectives', labelEn: 'Issue & Publish Directives', labelFa: 'صدور و ابلاغ بخشنامه‌های سازمانی' },
                { key: 'canSubmitRequests', labelEn: 'Submit Cartable Requests', labelFa: 'ثبت و ارسال درخواست در کارتابل' },
              ].map(({ key, labelEn, labelFa }) => {
                const k = key as keyof typeof permissions;
                const checked = permissions[k];
                return (
                  <label
                    key={key}
                    className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none ${
                      checked
                        ? 'bg-primary/5 dark:bg-secondary/10 border-primary/30 dark:border-secondary/30'
                        : 'bg-gray-50 dark:bg-slate-700/30 border-gray-200 dark:border-slate-700'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleTogglePermission(k)}
                      className="mt-0.5 rounded border-gray-300 text-primary focus:ring-primary dark:border-slate-600 dark:bg-slate-800"
                    />
                    <div>
                      <span className="font-semibold text-text-dark dark:text-white block">
                        {isFa ? labelFa : labelEn}
                      </span>
                      <span className="text-[10px] text-text-light dark:text-slate-400 font-mono">
                        {key}
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-text-light dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
            >
              {isFa ? 'انصراف' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 bg-primary hover:bg-primary-dark dark:bg-secondary dark:hover:bg-secondary/90 text-white dark:text-slate-900 rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{submitting ? (isFa ? 'در حال ثبت...' : 'Saving...') : (isFa ? 'ذخیره تغییرات' : 'Save Changes')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
