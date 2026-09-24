import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import { useLanguage } from '../../LanguageContext';
import { 
  X, Mail, Calendar, HardDrive, FileText, UserCheck, 
  HelpCircle, Send, Plus, CheckCircle, Clock, AlertCircle 
} from 'lucide-react';

interface ElectronicDeskModalProps {
  toolId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTab?: (tab: string) => void;
}

export const ElectronicDeskModal: React.FC<ElectronicDeskModalProps> = ({
  toolId,
  isOpen,
  onClose,
  onNavigateToTab,
}) => {
  const { userProfile } = useAuth();
  const { isFa } = useLanguage();

  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('vpn');
  const [ticketDetails, setTicketDetails] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [payStubDownloaded, setPayStubDownloaded] = useState(false);

  const handleDownloadPayStub = () => {
    const content = `=====================================================\n` +
      `  KKM INTERNATIONAL GROUP - OFFICIAL PAYROLL SLIP\n` +
      `  گروه بین‌المللی کیمیا کاران ماد - فیش حقوق و دستمزد الکترونیک\n` +
      `=====================================================\n` +
      `Employee: ${userProfile?.displayName || 'Staff'} (${userProfile?.displayNameFa || ''})\n` +
      `Employee ID: ${userProfile?.employeeId || 'KKM-STAFF'}\n` +
      `Department: ${userProfile?.department || 'Operations'}\n` +
      `Period: Mehr 1405 / September 2026\n` +
      `Payment Status: Disbursed via Central Centralized Automated Wire\n` +
      `Digital Verification Seal: KKM-PAY-VERIFIED-2026-9812\n` +
      `Clearance Tier: Gold Executive Tier\n` +
      `Timestamp: ${new Date().toISOString()}\n` +
      `=====================================================\n`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `KKM_Payroll_Slip_${userProfile?.employeeId || 'STAFF'}_2026.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setPayStubDownloaded(true);
    setTimeout(() => setPayStubDownloaded(false), 4000);
  };

  if (!isOpen || !toolId) return null;

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedMessage(isFa ? 'تیکت پشتیبانی IT با شناسه TKT-8849 ثبت و به کارشناس شبکه ارجاع داده شد.' : 'IT support ticket TKT-8849 submitted successfully.');
    setTimeout(() => {
      setSubmittedMessage(null);
      onClose();
    }, 2000);
  };

  const renderContent = () => {
    switch (toolId) {
      case 'mail':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-primary/5 dark:bg-secondary/5 rounded-xl border border-primary/20 dark:border-secondary/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-primary dark:text-secondary uppercase">
                  {isFa ? 'پست الکترونیک رسمی سازمانی' : 'Corporate Secure Webmail'}
                </span>
                <span className="text-[11px] font-mono text-text-light dark:text-slate-400">
                  {userProfile?.email}
                </span>
              </div>
              <p className="text-xs text-text-light dark:text-slate-300 leading-relaxed">
                {isFa 
                  ? 'صندوق پیام‌های رسمی درون‌سازمانی با رمزنگاری سرتاسری و پروتکل امنیتی SPF/DKIM.'
                  : 'Encrypted organizational email inbox compliant with enterprise security standards.'}
              </p>
            </div>

            <div className="space-y-2">
              {[
                { sender: 'Dr. Reza Asakereh', subject: 'Qeshm Simulation Data Model v3.2', time: '10:45 AM', unread: true },
                { sender: 'Hamed Zatajam (Legal)', subject: 'Consortium NDA Verification', time: 'Yesterday', unread: false },
                { sender: 'Executive Office', subject: 'EAOS Q3 Performance & Safety Review', time: 'Oct 21', unread: false },
              ].map((item, idx) => (
                <div key={idx} className={`p-3 rounded-xl border text-xs flex items-center justify-between transition-colors ${
                  item.unread ? 'bg-primary/5 border-primary/30 font-bold' : 'bg-gray-50 dark:bg-slate-700/40 border-gray-200 dark:border-slate-700'
                }`}>
                  <div>
                    <span className="text-text-dark dark:text-white block">{item.sender}</span>
                    <span className="text-text-light dark:text-slate-400 font-normal">{item.subject}</span>
                  </div>
                  <span className="text-[10px] text-text-light dark:text-slate-400 font-mono">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'calendar':
        return (
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-dark dark:text-slate-300">
              {isFa ? 'جلسات و رویدادهای پیش‌رو' : 'Upcoming Meetings & Board Syncs'}
            </h4>
            <div className="space-y-2">
              {[
                { title: 'Executive Board Technical Steering', time: 'Today 14:00 - 15:30', room: 'Conference Hall A & Google Meet' },
                { title: 'Geothermal Subsurface Simulation Review', time: 'Tomorrow 10:00 - 11:30', room: 'R&D Virtual Lab' },
                { title: 'BIM / GIS Coordination Meeting', time: 'Oct 28 11:00', room: 'Project Management Room' },
              ].map((m, idx) => (
                <div key={idx} className="p-3.5 bg-gray-50 dark:bg-slate-700/40 rounded-xl border border-gray-200 dark:border-slate-700 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-text-dark dark:text-white">{m.title}</span>
                    <span className="text-[10px] bg-primary/10 text-primary dark:bg-secondary/20 dark:text-secondary px-2 py-0.5 rounded font-mono">
                      {m.time}
                    </span>
                  </div>
                  <span className="text-text-light dark:text-slate-400">{m.room}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'drive':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-slate-900/50 rounded-xl border border-gray-200 dark:border-slate-700 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-text-dark dark:text-white block">KKM Secure Cloud Storage</span>
                <span className="text-text-light dark:text-slate-400">142 GB / 1 TB Used (Private S3 Vault)</span>
              </div>
              <span className="font-mono text-primary dark:text-secondary font-bold">14.2%</span>
            </div>

            <div className="space-y-2 text-xs">
              {[
                { name: 'KKM-Qeshm-WellLogs-2026.las', size: '124 MB', modified: 'Oct 20, 2026' },
                { name: 'GMEL-CLG-ThermodynamicReport.pdf', size: '48 MB', modified: 'Oct 18, 2026' },
                { name: 'EAOS-Architecture-Specification-v3.docx', size: '8.4 MB', modified: 'Oct 15, 2026' },
              ].map((f, idx) => (
                <div key={idx} className="p-3 bg-gray-50 dark:bg-slate-700/40 rounded-xl border border-gray-200 dark:border-slate-700 flex items-center justify-between">
                  <span className="font-mono font-medium text-text-dark dark:text-white">{f.name}</span>
                  <div className="flex items-center gap-3 text-[11px] text-text-light dark:text-slate-400">
                    <span>{f.size}</span>
                    <span>&bull;</span>
                    <span>{f.modified}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'hr':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-gray-50 dark:bg-slate-700/40 rounded-xl border border-gray-200 dark:border-slate-700">
                <span className="text-text-light dark:text-slate-400 block mb-1">{isFa ? 'مانده مرخصی استحقاقی' : 'Remaining Leave Days'}</span>
                <span className="text-xl font-bold font-mono text-primary dark:text-secondary">18 {isFa ? 'روز' : 'Days'}</span>
              </div>
              <div className="p-3.5 bg-gray-50 dark:bg-slate-700/40 rounded-xl border border-gray-200 dark:border-slate-700">
                <span className="text-text-light dark:text-slate-400 block mb-1">{isFa ? 'بیمه و پوشش تکمیلی' : 'Health Insurance Tier'}</span>
                <span className="text-sm font-bold text-green-600 dark:text-green-400">{isFa ? 'طرح طلایی KKM' : 'Gold Executive Tier'}</span>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-slate-700/30 rounded-xl border border-gray-200 dark:border-slate-700 text-xs">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-text-dark dark:text-white">{isFa ? 'آخرین فیش حقوقی صادرشده' : 'Latest Payroll Slip'}</span>
                <span className="text-[10px] bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 px-2 py-0.5 rounded font-bold">
                  {isFa ? 'واریز شده' : 'Disbursed'}
                </span>
              </div>
              <p className="text-text-light dark:text-slate-400 mb-2">
                {isFa ? 'ماه مهر ۱۴۰۵ - پرداخت الکترونیکی متمرکز پایا' : 'September 2026 - Central Automated Wire'}
              </p>
              <div className="flex items-center gap-3">
                <button 
                  type="button"
                  onClick={handleDownloadPayStub}
                  className="text-xs text-primary dark:text-secondary font-bold hover:underline flex items-center gap-1.5"
                >
                  {isFa ? 'دریافت نسخه الکترونیک فیش حقوقی &larr;' : 'Download Pay Stub &rarr;'}
                </button>
                {payStubDownloaded && (
                  <span className="text-[11px] text-green-600 dark:text-green-400 font-semibold animate-pulse">
                    {isFa ? '✓ فایل فیش صادر و دانلود شد' : '✓ Pay stub exported'}
                  </span>
                )}
              </div>
            </div>
          </div>
        );

      case 'it':
        return (
          <form onSubmit={handleTicketSubmit} className="space-y-4">
            {submittedMessage && (
              <div className="p-3 bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-300 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>{submittedMessage}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-text-dark dark:text-slate-300 mb-1">
                {isFa ? 'دسته‌بندی درخواست پشتیبانی' : 'Issue Category'}
              </label>
              <select
                value={ticketCategory}
                onChange={(e) => setTicketCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-text-dark dark:text-white text-xs outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="vpn">{isFa ? 'اتصال VPN و شبکه اختصاصی امن' : 'Corporate VPN & Mesh Network'}</option>
                <option value="hardware">{isFa ? 'سخت‌افزار، لپ‌تاپ و تجهیزات' : 'Hardware / Workstation Setup'}</option>
                <option value="access">{isFa ? 'دسترسی به سامانه‌ها و مجوزها' : 'System Access & Credentials'}</option>
                <option value="simulation">{isFa ? 'منابع پردازشی سرور و کلاستر GPU' : 'GPU Cluster Compute Access'}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-text-dark dark:text-slate-300 mb-1">
                {isFa ? 'موضوع تیکت' : 'Ticket Subject'} *
              </label>
              <input
                type="text"
                required
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                placeholder={isFa ? 'مثال: خطای اتصال به شبکه WireGuard در لینوکس' : 'e.g. WireGuard VPN connection timeout'}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-text-dark dark:text-white text-xs outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-text-dark dark:text-slate-300 mb-1">
                {isFa ? 'شرح مشکل یا خطا' : 'Problem Description'} *
              </label>
              <textarea
                required
                rows={3}
                value={ticketDetails}
                onChange={(e) => setTicketDetails(e.target.value)}
                placeholder={isFa ? 'شرح خطا، کد خطا یا پیام نمایش‌داده‌شده...' : 'Details, error messages, and context...'}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-text-dark dark:text-white text-xs outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-5 py-2 bg-primary hover:bg-primary-dark dark:bg-secondary dark:text-slate-900 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isFa ? 'ثبت و ارسال به تیم IT' : 'Submit Ticket to IT Support'}</span>
              </button>
            </div>
          </form>
        );

      default:
        return null;
    }
  };

  const getToolTitle = () => {
    switch (toolId) {
      case 'mail': return isFa ? 'سامانه رایانامه رسمی سازمانی' : 'Corporate Webmail';
      case 'calendar': return isFa ? 'تقویم جلسات و هماهنگی‌ها' : 'Calendar & Schedules';
      case 'drive': return isFa ? 'فضای ابری اختصاصی KKM' : 'KKM Enterprise Cloud Drive';
      case 'hr': return isFa ? 'پرتال امور سرمایه انسانی' : 'Human Resources Self-Service';
      case 'it': return isFa ? 'مرکز پشتیبانی فنی و تیکتینگ IT' : 'IT Service Desk & Ticketing';
      default: return 'Tool';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-slate-700 sticky top-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur z-10">
          <h3 className="text-base font-display font-bold text-text-dark dark:text-white">
            {getToolTitle()}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5">
          {renderContent()}
        </div>

        <div className="p-4 border-t border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-slate-700 text-text-dark dark:text-slate-200 text-xs font-bold rounded-xl hover:bg-gray-300 transition-colors"
          >
            {isFa ? 'بستن پنجره' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
