import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import { useLanguage } from '../../LanguageContext';
import { X, Send, AlertCircle, FileText, ShoppingCart, Calendar, MapPin, ShieldCheck, Key } from 'lucide-react';
import { AutomationRequest, AutomationRequestType, AutomationPriority } from '../../types';

interface NewRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (request: Omit<AutomationRequest, 'id' | 'createdAt' | 'updatedAt' | 'approvals'>) => Promise<void>;
}

export const NewRequestModal: React.FC<NewRequestModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const { userProfile } = useAuth();
  const { isFa } = useLanguage();

  const [type, setType] = useState<AutomationRequestType>('leave');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<AutomationPriority>('medium');
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError(isFa ? 'لطفاً عنوان و شرح کامل درخواست را وارد فرمایید.' : 'Please enter title and full description.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await onSubmit({
        title: title.trim(),
        type,
        description: description.trim(),
        requesterId: userProfile?.uid || 'anonymous',
        requesterName: userProfile?.displayName || 'User',
        requesterRole: userProfile?.title || 'Employee',
        department: userProfile?.department || 'General',
        priority,
        status: 'pending_manager',
        amount: type === 'purchase' ? Number(amount) || 0 : undefined,
        startDate: (type === 'leave' || type === 'mission') ? startDate : undefined,
        endDate: (type === 'leave' || type === 'mission') ? endDate : undefined,
        destination: type === 'mission' ? destination : undefined,
      });

      onClose();
      // Reset form
      setTitle('');
      setDescription('');
      setAmount(undefined);
      setStartDate('');
      setEndDate('');
      setDestination('');
    } catch (err: any) {
      setError(err?.message || (isFa ? 'خطا در ثبت درخواست' : 'Failed to submit request'));
    } finally {
      setLoading(false);
    }
  };

  const requestTypes: { id: AutomationRequestType; labelEn: string; labelFa: string; icon: React.ReactNode }[] = [
    { id: 'leave', labelEn: 'Leave Request', labelFa: 'مرخصی اداری / استعلاجی', icon: <Calendar className="w-4 h-4" /> },
    { id: 'purchase', labelEn: 'Purchase Order', labelFa: 'خرید و تدارکات کالا', icon: <ShoppingCart className="w-4 h-4" /> },
    { id: 'mission', labelEn: 'Site Mission / Travel', labelFa: 'ماموریت اداری و بازدید سایت', icon: <MapPin className="w-4 h-4" /> },
    { id: 'technical_review', labelEn: 'Technical Sign-off', labelFa: 'تاییدیه فنی و مهندسی', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'it_access', labelEn: 'IT & System Access', labelFa: 'دسترسی فناوری اطلاعات و VPN', icon: <Key className="w-4 h-4" /> },
    { id: 'memo', labelEn: 'Official Internal Memo', labelFa: 'مکاتبه و یادداشت سازمانی', icon: <FileText className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-slate-700 sticky top-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur z-10">
          <div>
            <h3 className="text-lg font-display font-bold text-text-dark dark:text-white">
              {isFa ? 'ثبت درخواست جدید در اتوماسیون اداری' : 'Create New Automation Workflow Request'}
            </h3>
            <p className="text-xs text-text-light dark:text-slate-400 mt-0.5">
              {isFa 
                ? `درخواست‌دهنده: ${userProfile?.displayNameFa || userProfile?.displayName} (${userProfile?.departmentFa || userProfile?.department})`
                : `Requester: ${userProfile?.displayName} (${userProfile?.department})`}
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
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Type Selection */}
          <div>
            <label className="block text-xs font-bold text-text-dark dark:text-slate-300 uppercase tracking-wider mb-2">
              {isFa ? 'نوع فرآیند و درخواست' : 'Request Workflow Type'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {requestTypes.map((rt) => {
                const isSelected = type === rt.id;
                return (
                  <button
                    key={rt.id}
                    type="button"
                    onClick={() => setType(rt.id)}
                    className={`p-3 rounded-xl border text-start flex items-center gap-2.5 transition-all text-xs font-medium ${
                      isSelected
                        ? 'border-primary bg-primary/10 text-primary dark:border-secondary dark:bg-secondary/15 dark:text-secondary font-bold shadow-sm'
                        : 'border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50 text-text-dark dark:text-slate-300'
                    }`}
                  >
                    <span className={isSelected ? 'text-primary dark:text-secondary' : 'text-gray-400'}>
                      {rt.icon}
                    </span>
                    <span>{isFa ? rt.labelFa : rt.labelEn}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-text-dark dark:text-slate-300 mb-1">
              {isFa ? 'عنوان رسمی درخواست' : 'Official Request Title'} *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={isFa ? 'مثال: تایید پیش‌فاکتور خرید سرور شبیه‌سازی یا ماموریت جزیره قشم' : 'e.g. Purchase Order for Computing Node'}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-text-dark dark:text-white text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Priority & Dynamic Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-text-dark dark:text-slate-300 mb-1">
                {isFa ? 'اولویت فوریت اداری' : 'Priority Level'}
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as AutomationPriority)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-text-dark dark:text-white text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              >
                <option value="low">{isFa ? 'عادی (Low)' : 'Low'}</option>
                <option value="medium">{isFa ? 'متوسط (Medium)' : 'Medium'}</option>
                <option value="high">{isFa ? 'فوری (High)' : 'High'}</option>
                <option value="urgent">{isFa ? 'بسیار فوری و اضطراری (Urgent)' : 'Urgent / Critical'}</option>
              </select>
            </div>

            {/* Type Specific Fields */}
            {type === 'purchase' && (
              <div>
                <label className="block text-xs font-bold text-text-dark dark:text-slate-300 mb-1">
                  {isFa ? 'مبلغ برآوردی (دلار / ارز پایه)' : 'Estimated Amount (USD)'}
                </label>
                <input
                  type="number"
                  min="0"
                  value={amount || ''}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  placeholder="e.g. 5000"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-text-dark dark:text-white text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>
            )}

            {type === 'mission' && (
              <div>
                <label className="block text-xs font-bold text-text-dark dark:text-slate-300 mb-1">
                  {isFa ? 'محل ماموریت و سایت هدف' : 'Mission Destination / Site'}
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder={isFa ? 'مثال: جزیره قشم - مرکز نوآوری' : 'e.g. Qeshm Island Pilot Site'}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-text-dark dark:text-white text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>
            )}
          </div>

          {(type === 'leave' || type === 'mission') && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-text-dark dark:text-slate-300 mb-1">
                  {isFa ? 'تاریخ آغاز' : 'Start Date'}
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-text-dark dark:text-white text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-text-dark dark:text-slate-300 mb-1">
                  {isFa ? 'تاریخ پایان' : 'End Date'}
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-text-dark dark:text-white text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
          )}

          {/* Detailed Description */}
          <div>
            <label className="block text-xs font-bold text-text-dark dark:text-slate-300 mb-1">
              {isFa ? 'شرح کامل، توجیه اداری و مستندات' : 'Detailed Justification & Scope'} *
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={isFa ? 'دلایل، اهداف، افراد جانشین یا مشخصات فنی مورد نیاز را به تفصیل شرح دهید...' : 'Describe scope, justification, specifications, and handover personnel...'}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-text-dark dark:text-white text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-text-light dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
            >
              {isFa ? 'انصراف' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-primary hover:bg-secondary text-white dark:bg-secondary dark:text-slate-900 font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <Send className="w-4 h-4" />
              )}
              <span>{isFa ? 'ثبت و ارسال به کارتابل' : 'Submit to Cartable'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
