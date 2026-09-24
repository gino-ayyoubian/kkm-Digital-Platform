import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../LanguageContext';
import { X, UserPlus, Shield, AlertCircle, Sparkles, Key } from 'lucide-react';
import { UserProfile, OrgRole } from '../../AuthContext';
import { generateCorporateEmail } from '../../utils/corporateAccount';
import { ExecutiveMemberIdentity } from '../common/ExecutiveMemberIdentity';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (user: Omit<UserProfile, 'uid' | 'createdAt'>) => Promise<UserProfile>;
}

export const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  onClose,
  onAddUser,
}) => {
  const { isFa } = useLanguage();

  const [displayName, setDisplayName] = useState('');
  const [displayNameFa, setDisplayNameFa] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [autoEmail, setAutoEmail] = useState(true);
  const [employeeId, setEmployeeId] = useState(`KKM-${Math.floor(100 + Math.random() * 900)}`);
  const [department, setDepartment] = useState('Energy Systems');
  const [title, setTitle] = useState('');
  const [titleFa, setTitleFa] = useState('');
  const [phone, setPhone] = useState('+98 21 9103 08');
  const [role, setRole] = useState<OrgRole>('employee');
  const [clearanceLevel, setClearanceLevel] = useState<'Top Secret / Strategic' | 'Confidential / Tier-1' | 'Operational / Tier-2' | 'Internal / Standard'>('Operational / Tier-2');
  const [avatarUrl, setAvatarUrl] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-generate corporate email and initial password when displayName changes
  useEffect(() => {
    if (displayName.trim() && autoEmail) {
      const generated = generateCorporateEmail(displayName);
      setEmail(generated);
      if (!password) {
        const cleanName = displayName.replace(/[^a-zA-Z]/g, '');
        setPassword(`kkm!${cleanName || 'User'}2026`);
      }
    }
  }, [displayName, autoEmail]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName || !email || !title) {
      setError(isFa ? 'لطفاً نام، ایمیل سازمانی و عنوان سمت را تکمیل نمایید.' : 'Please enter name, email, and position title.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const isSuper = role === 'super_admin';
      const isExec = role === 'executive';
      const isDir = role === 'director';

      await onAddUser({
        displayName,
        displayNameFa: displayNameFa || displayName,
        email: email.trim().toLowerCase(),
        password: password || 'kkm!Member2026',
        employeeId,
        department,
        title,
        titleFa: titleFa || title,
        phone,
        role,
        clearanceLevel,
        status: 'active',
        avatarUrl: avatarUrl.trim(),
        permissions: {
          canApproveAll: isSuper,
          canApproveDepartment: isSuper || isExec || isDir,
          canManageUsers: isSuper,
          canAccessFinancials: isSuper || isExec,
          canAccessConfidentialDMS: isSuper || isExec || isDir,
          canIssueDirectives: isSuper || isExec || isDir,
          canSubmitRequests: true,
        },
      } as any);

      onClose();
      // Reset
      setDisplayName('');
      setDisplayNameFa('');
      setEmail('');
      setPassword('');
      setTitle('');
      setTitleFa('');
      setAvatarUrl('');
    } catch (err: any) {
      setError(err?.message || (isFa ? 'خطا در ثبت کاربر' : 'Failed to create user'));
    } finally {
      setLoading(false);
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
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 max-w-xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-slate-700 sticky top-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur z-10">
          <div>
            <h3 className="text-lg font-display font-bold text-text-dark dark:text-white flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-primary dark:text-secondary" />
              {isFa ? 'ثبت و انتصاب عضو جدید در سازمان KKM' : 'Add New Organization Member'}
            </h3>
            <p className="text-xs text-text-light dark:text-slate-400 mt-0.5">
              {isFa ? 'تعریف هویت سازمانی، سطح دسترسی و نقش در اتوماسیون' : 'Define organizational identity and RBAC profile'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Member Visual Identity Preview */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center gap-4">
            <ExecutiveMemberIdentity
              name={displayName || 'New Member'}
              nameFa={displayNameFa}
              role={role}
              photoUrl={avatarUrl}
              size="md"
              showBadge={true}
            />
            <div className="flex-grow">
              <label className="block text-xs font-bold text-text-dark dark:text-slate-300 mb-1">
                {isFa ? 'نشانی اینترنتی تصویر پرتره رسمی (اختیاری)' : 'Official Portrait URL (Optional)'}
              </label>
              <input
                type="url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://... (Leave empty for official Directorate Monogram)"
                className="w-full px-3 py-1.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-text-dark dark:text-white text-xs outline-none focus:ring-1 focus:ring-primary font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-text-dark dark:text-slate-300 mb-1">
                {isFa ? 'نام و نام خانوادگی (انگلیسی)' : 'Full Name (EN)'} *
              </label>
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. Dr. Kaveh Moradi"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-text-dark dark:text-white text-xs outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-text-dark dark:text-slate-300 mb-1">
                {isFa ? 'نام و نام خانوادگی (فارسی)' : 'Full Name (FA)'}
              </label>
              <input
                type="text"
                value={displayNameFa}
                onChange={(e) => setDisplayNameFa(e.target.value)}
                placeholder="مثال: دکتر کاوه مرادی"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-text-dark dark:text-white text-xs outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-text-dark dark:text-slate-300">
                  {isFa ? 'پست الکترونیکی سازمانی (یوزرنیم ورود)' : 'Corporate Email (Username)'} *
                </label>
                <span className="text-[10px] font-mono text-primary dark:text-secondary">
                  @kkm-intl.org
                </span>
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setAutoEmail(false);
                }}
                placeholder="f.lastname@kkm-intl.org"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-text-dark dark:text-white text-xs outline-none focus:ring-2 focus:ring-primary font-mono"
              />
              <p className="text-[10px] text-text-light dark:text-slate-400 mt-1">
                {isFa ? 'الگوی استاندارد: حرف اول نام + نقطه + نام خانوادگی' : 'Standard pattern: first_initial.lastname@kkm-intl.org'}
              </p>
            </div>
            <div>
              <label className="block text-xs font-bold text-text-dark dark:text-slate-300 mb-1">
                {isFa ? 'رمز عبور اولیه سازمانی' : 'Initial Corporate Password'} *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="e.g. kkm!Member2026"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-text-dark dark:text-white text-xs font-mono outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <p className="text-[10px] text-text-light dark:text-slate-400 mt-1">
                {isFa ? 'قابل تغییر توسط عضو در اولین ورود یا بازیابی با ایمیل' : 'Can be changed by member or recovered via corporate email'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-text-dark dark:text-slate-300 mb-1">
                {isFa ? 'کد پرسنلی' : 'Employee ID'} *
              </label>
              <input
                type="text"
                required
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-text-dark dark:text-white text-xs font-mono outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-text-dark dark:text-slate-300 mb-1">
                {isFa ? 'شماره تماس مستقیم' : 'Direct Phone'}
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-text-dark dark:text-white text-xs font-mono outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-text-dark dark:text-slate-300 mb-1">
                {isFa ? 'دپارتمان سازمانی' : 'Department'}
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-text-dark dark:text-white text-xs outline-none focus:ring-2 focus:ring-primary"
              >
                {departmentsList.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-text-dark dark:text-slate-300 mb-1">
                {isFa ? 'نقش RBAC' : 'RBAC Role'}
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as OrgRole)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-text-dark dark:text-white text-xs font-bold outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="super_admin">{isFa ? 'مدیر ارشد سامانه (Super Admin)' : 'Super Admin'}</option>
                <option value="executive">{isFa ? 'مدیر ارشد اجرایی (Executive / C-Level)' : 'Executive (C-Level)'}</option>
                <option value="director">{isFa ? 'مدیر دپارتمان (Director)' : 'Department Director'}</option>
                <option value="manager">{isFa ? 'مدیر میانی (Manager)' : 'Manager'}</option>
                <option value="reviewer">{isFa ? 'ممیز فنی و QA/QC' : 'QA/QC Reviewer'}</option>
                <option value="employee">{isFa ? 'کارشناس سازمانی' : 'Employee'}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-text-dark dark:text-slate-300 mb-1">
                {isFa ? 'عنوان سمت رسمی (انگلیسی)' : 'Position Title (EN)'} *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Senior Reservoir Geoscientist"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-text-dark dark:text-white text-xs outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-text-dark dark:text-slate-300 mb-1">
                {isFa ? 'عنوان سمت رسمی (فارسی)' : 'Position Title (FA)'}
              </label>
              <input
                type="text"
                value={titleFa}
                onChange={(e) => setTitleFa(e.target.value)}
                placeholder="مثال: زمین‌شناس ارشد مخزن"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-text-dark dark:text-white text-xs outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-text-light dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
            >
              {isFa ? 'انصراف' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-primary hover:bg-primary-dark dark:bg-secondary dark:text-slate-900 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              <UserPlus className="w-4 h-4" />
              <span>{isFa ? 'ثبت و صدور دسترسی' : 'Create & Provision User'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
