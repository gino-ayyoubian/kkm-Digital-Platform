import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import { useLanguage } from '../../LanguageContext';
import { 
  Inbox, Send, Plus, Filter, Search, CheckCircle, XCircle, Clock, 
  AlertTriangle, Calendar, ShoppingCart, MapPin, ShieldCheck, Key, FileText, ChevronRight
} from 'lucide-react';
import { AutomationRequest, AutomationRequestType, AutomationPriority, AutomationStatus } from '../../types';
import { NewRequestModal } from './NewRequestModal';
import { RequestDetailsModal } from './RequestDetailsModal';

interface AutomationCartableProps {
  requests: AutomationRequest[];
  onRequestCreated: (req: Omit<AutomationRequest, 'id' | 'createdAt' | 'updatedAt' | 'approvals'>) => Promise<void>;
  onApprove: (requestId: string, comments: string) => Promise<void>;
  onReject: (requestId: string, comments: string) => Promise<void>;
}

export const AutomationCartable: React.FC<AutomationCartableProps> = ({
  requests,
  onRequestCreated,
  onApprove,
  onReject,
}) => {
  const { userProfile, isSuperAdmin, isAdmin } = useAuth();
  const { isFa } = useLanguage();

  const [activeCartableTab, setActiveCartableTab] = useState<'inbox' | 'my_requests' | 'all'>('inbox');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<AutomationRequest | null>(null);

  // Cartable Filtering Logic
  const filteredRequests = requests.filter((req) => {
    // Tab filter:
    if (activeCartableTab === 'inbox') {
      // Items pending action:
      // If super_admin / executive, they can see all pending items
      // If director, they see items pending for their department
      // If reviewer, they see pending technical reviews
      if (req.status === 'approved' || req.status === 'rejected') return false;
      if (isSuperAdmin || isAdmin || userProfile?.permissions.canApproveAll) return true;
      if (userProfile?.role === 'director' && req.department === userProfile.department) return true;
      if (userProfile?.role === 'reviewer' && req.type === 'technical_review') return true;
      return false;
    } else if (activeCartableTab === 'my_requests') {
      return req.requesterId === userProfile?.uid || req.requesterName === userProfile?.displayName;
    }

    // Tab 'all' -> returns all requests
    return true;
  }).filter((req) => {
    // Type filter
    if (filterType !== 'all' && req.type !== filterType) return false;
    // Priority filter
    if (filterPriority !== 'all' && req.priority !== filterPriority) return false;
    // Status filter
    if (filterStatus !== 'all' && req.status !== filterStatus) return false;
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = req.title.toLowerCase().includes(q);
      const matchId = req.id.toLowerCase().includes(q);
      const matchRequester = req.requesterName.toLowerCase().includes(q);
      const matchDept = req.department.toLowerCase().includes(q);
      if (!matchTitle && !matchId && !matchRequester && !matchDept) return false;
    }
    return true;
  });

  // Stats calculation
  const pendingInboxCount = requests.filter(r => 
    (r.status === 'pending_manager' || r.status === 'pending_finance') &&
    (isSuperAdmin || isAdmin || r.department === userProfile?.department)
  ).length;

  const myActiveCount = requests.filter(r => 
    (r.requesterId === userProfile?.uid || r.requesterName === userProfile?.displayName) &&
    (r.status === 'pending_manager' || r.status === 'pending_finance')
  ).length;

  const approvedMonthCount = requests.filter(r => r.status === 'approved').length;
  const urgentCount = requests.filter(r => r.priority === 'urgent' && r.status !== 'approved').length;

  const getTypeIcon = (type: AutomationRequestType) => {
    switch (type) {
      case 'leave': return <Calendar className="w-4 h-4 text-emerald-500" />;
      case 'purchase': return <ShoppingCart className="w-4 h-4 text-purple-500" />;
      case 'mission': return <MapPin className="w-4 h-4 text-blue-500" />;
      case 'technical_review': return <ShieldCheck className="w-4 h-4 text-amber-500" />;
      case 'it_access': return <Key className="w-4 h-4 text-teal-500" />;
      default: return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeLabel = (type: AutomationRequestType) => {
    switch (type) {
      case 'leave': return isFa ? 'مرخصی' : 'Leave';
      case 'purchase': return isFa ? 'خرید و تدارکات' : 'Purchase Order';
      case 'mission': return isFa ? 'ماموریت اداری' : 'Site Mission';
      case 'technical_review': return isFa ? 'تاییدیه فنی' : 'Technical Sign-off';
      case 'it_access': return isFa ? 'دسترسی IT' : 'IT Access';
      default: return isFa ? 'مکاتبه سازمانی' : 'Memo';
    }
  };

  const getPriorityBadge = (priority: AutomationPriority) => {
    switch (priority) {
      case 'urgent':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300">{isFa ? 'خیلی فوری' : 'Urgent'}</span>;
      case 'high':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">{isFa ? 'فوری' : 'High'}</span>;
      case 'medium':
        return <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">{isFa ? 'متوسط' : 'Medium'}</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-300">{isFa ? 'عادی' : 'Low'}</span>;
    }
  };

  const getStatusBadge = (status: AutomationStatus) => {
    switch (status) {
      case 'approved':
        return (
          <span className="px-2 py-0.5 bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 rounded text-[10px] font-bold flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            {isFa ? 'تصویب شده' : 'Approved'}
          </span>
        );
      case 'rejected':
        return (
          <span className="px-2 py-0.5 bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 rounded text-[10px] font-bold flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            {isFa ? 'رد شده' : 'Rejected'}
          </span>
        );
      case 'pending_finance':
        return (
          <span className="px-2 py-0.5 bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 rounded text-[10px] font-medium flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {isFa ? 'در انتظار مالی / مدیر ارشد' : 'Pending Finance'}
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 rounded text-[10px] font-medium flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {isFa ? 'در انتظار تایید مدیر' : 'Pending Manager'}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-text-light dark:text-slate-400 font-medium">
              {isFa ? 'کارتابل دریافتی (نیازمند اقدام)' : 'Inbox Action Items'}
            </p>
            <p className="text-2xl font-bold font-mono text-primary dark:text-secondary mt-1">
              {pendingInboxCount}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-secondary/15 text-primary dark:text-secondary flex items-center justify-center">
            <Inbox className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-text-light dark:text-slate-400 font-medium">
              {isFa ? 'درخواست‌های در جریان من' : 'My Active Requests'}
            </p>
            <p className="text-2xl font-bold font-mono text-blue-600 dark:text-blue-400 mt-1">
              {myActiveCount}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Send className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-text-light dark:text-slate-400 font-medium">
              {isFa ? 'مصوب و ابلاغ شده' : 'Approved Requests'}
            </p>
            <p className="text-2xl font-bold font-mono text-green-600 dark:text-green-400 mt-1">
              {approvedMonthCount}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-text-light dark:text-slate-400 font-medium">
              {isFa ? 'موارد بسیار فوری (Urgent)' : 'Critical / Urgent'}
            </p>
            <p className="text-2xl font-bold font-mono text-red-600 dark:text-red-400 mt-1">
              {urgentCount}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Cartable Control Bar */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Main Tabs */}
          <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-slate-900/60 p-1 rounded-xl">
            <button
              onClick={() => setActiveCartableTab('inbox')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeCartableTab === 'inbox'
                  ? 'bg-white dark:bg-slate-800 text-primary dark:text-secondary shadow-sm'
                  : 'text-text-light dark:text-slate-400 hover:text-text-dark'
              }`}
            >
              <Inbox className="w-3.5 h-3.5" />
              <span>{isFa ? 'کارتابل دریافتی (نیازمند اقدام)' : 'Inbox (Action Items)'}</span>
              {pendingInboxCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {pendingInboxCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveCartableTab('my_requests')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeCartableTab === 'my_requests'
                  ? 'bg-white dark:bg-slate-800 text-primary dark:text-secondary shadow-sm'
                  : 'text-text-light dark:text-slate-400 hover:text-text-dark'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isFa ? 'درخواست‌های ارسالی من' : 'My Requests'}</span>
            </button>

            {(isAdmin || isSuperAdmin || userProfile?.role === 'director') && (
              <button
                onClick={() => setActiveCartableTab('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeCartableTab === 'all'
                    ? 'bg-white dark:bg-slate-800 text-primary dark:text-secondary shadow-sm'
                    : 'text-text-light dark:text-slate-400 hover:text-text-dark'
                }`}
              >
                <span>{isFa ? 'همه درخواست‌ها / بایگانی' : 'All / Archive'}</span>
              </button>
            )}
          </div>

          {/* New Request Button */}
          <button
            onClick={() => setIsNewModalOpen(true)}
            className="px-4 py-2 bg-primary hover:bg-primary-dark dark:bg-secondary dark:hover:bg-secondary/90 text-white dark:text-slate-900 rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>{isFa ? 'ثبت درخواست جدید' : 'New Request'}</span>
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2 border-t border-gray-100 dark:border-slate-700/60">
          {/* Search */}
          <div className="relative sm:col-span-1">
            <Search className={`w-4 h-4 absolute ${isFa ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-gray-400`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isFa ? 'جستجو در عنوان، شناسه، فرد...' : 'Search title, ID, requester...'}
              className={`w-full ${isFa ? 'pr-9 pl-3' : 'pl-9 pr-3'} py-2 rounded-xl text-xs bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 outline-none focus:ring-1 focus:ring-primary`}
            />
          </div>

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 outline-none text-text-dark dark:text-slate-200"
          >
            <option value="all">{isFa ? 'تمامی انواع درخواست‌ها' : 'All Types'}</option>
            <option value="leave">{isFa ? 'مرخصی' : 'Leave'}</option>
            <option value="purchase">{isFa ? 'خرید و تدارکات' : 'Purchase Order'}</option>
            <option value="mission">{isFa ? 'ماموریت اداری' : 'Site Mission'}</option>
            <option value="technical_review">{isFa ? 'تاییدیه فنی مهندسی' : 'Technical Review'}</option>
            <option value="it_access">{isFa ? 'دسترسی IT و سیستم‌ها' : 'IT Access'}</option>
            <option value="memo">{isFa ? 'مکاتبه سازمانی' : 'Memo'}</option>
          </select>

          {/* Priority Filter */}
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 outline-none text-text-dark dark:text-slate-200"
          >
            <option value="all">{isFa ? 'تمامی اولویت‌ها' : 'All Priorities'}</option>
            <option value="urgent">{isFa ? 'خیلی فوری و اضطراری' : 'Urgent'}</option>
            <option value="high">{isFa ? 'فوری' : 'High'}</option>
            <option value="medium">{isFa ? 'متوسط' : 'Medium'}</option>
            <option value="low">{isFa ? 'عادی' : 'Low'}</option>
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 outline-none text-text-dark dark:text-slate-200"
          >
            <option value="all">{isFa ? 'تمامی وضعیت‌ها' : 'All Statuses'}</option>
            <option value="pending_manager">{isFa ? 'در انتظار تایید مدیر' : 'Pending Manager'}</option>
            <option value="pending_finance">{isFa ? 'در انتظار تایید مالی / ارشد' : 'Pending Finance'}</option>
            <option value="approved">{isFa ? 'تصویب شده' : 'Approved'}</option>
            <option value="rejected">{isFa ? 'رد شده' : 'Rejected'}</option>
          </select>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-3">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((req) => {
            const canUserApprove = Boolean(
              isSuperAdmin ||
              isAdmin ||
              userProfile?.permissions.canApproveAll ||
              (userProfile?.permissions.canApproveDepartment && userProfile.department === req.department) ||
              (userProfile?.role === 'reviewer' && req.type === 'technical_review')
            );
            const isActionable = canUserApprove && (req.status === 'pending_manager' || req.status === 'pending_finance');

            return (
              <div
                key={req.id}
                className="bg-white dark:bg-slate-800 p-4 sm:p-5 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Left side: Type Icon, Title, Requester, Metadata */}
                <div className="flex items-start gap-3.5 flex-1">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    {getTypeIcon(req.type)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-primary dark:text-secondary bg-primary/10 dark:bg-secondary/15 px-2 py-0.5 rounded">
                        {req.id}
                      </span>
                      <span className="text-[11px] font-medium text-text-light dark:text-slate-400">
                        {getTypeLabel(req.type)}
                      </span>
                      {getPriorityBadge(req.priority)}
                      {getStatusBadge(req.status)}
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-text-dark dark:text-white leading-snug">
                      {req.title}
                    </h4>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-text-light dark:text-slate-400 pt-0.5">
                      <span>
                        {isFa ? 'درخواست‌دهنده:' : 'Requester:'} <strong className="text-text-dark dark:text-slate-300">{req.requesterName}</strong> ({req.department})
                      </span>
                      {req.amount !== undefined && (
                        <span>
                          &bull; {isFa ? 'مبلغ:' : 'Amount:'} <strong className="text-green-600 dark:text-green-400">{req.amount.toLocaleString()} USD</strong>
                        </span>
                      )}
                      {req.destination && (
                        <span>
                          &bull; {isFa ? 'مقصد:' : 'Dest:'} <strong>{req.destination}</strong>
                        </span>
                      )}
                      <span>
                        &bull; {new Date(req.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right side: Action Buttons */}
                <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100 dark:border-slate-700">
                  {isActionable && (
                    <>
                      <button
                        onClick={() => onApprove(req.id, isFa ? 'تایید مستقیم از کارتابل' : 'Approved directly from Cartable')}
                        className="px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 dark:bg-green-950/40 dark:hover:bg-green-900/50 dark:text-green-300 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 border border-green-200 dark:border-green-800"
                        title={isFa ? 'تایید سریع' : 'Quick Approve'}
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>{isFa ? 'تایید' : 'Approve'}</span>
                      </button>

                      <button
                        onClick={() => onReject(req.id, isFa ? 'رد درخواست از کارتابل' : 'Rejected from Cartable')}
                        className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 dark:bg-red-950/40 dark:hover:bg-red-900/50 dark:text-red-300 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 border border-red-200 dark:border-red-800"
                        title={isFa ? 'رد درخواست' : 'Quick Reject'}
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>{isFa ? 'رد' : 'Reject'}</span>
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => setSelectedRequest(req)}
                    className="px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-text-dark dark:text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
                  >
                    <span>{isFa ? 'مشاهده جزئیات و امضاها' : 'Details & Audit'}</span>
                    <ChevronRight className={`w-3.5 h-3.5 ${isFa ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white dark:bg-slate-800 p-12 rounded-2xl border border-gray-200 dark:border-slate-700 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-slate-700 text-gray-400 flex items-center justify-center mx-auto">
              <Inbox className="w-7 h-7" />
            </div>
            <h4 className="text-base font-bold text-text-dark dark:text-white">
              {isFa ? 'هیچ درخواستی در این بخش یافت نشد' : 'No requests found'}
            </h4>
            <p className="text-xs text-text-light dark:text-slate-400 max-w-md mx-auto">
              {isFa 
                ? 'در حال حاضر هیچ فرآیند اداری یا کارتابلی مطابق با فیلترهای انتخابی شما وجود ندارد.' 
                : 'There are currently no automation workflow items matching your active filter criteria.'}
            </p>
          </div>
        )}
      </div>

      {/* New Request Modal */}
      <NewRequestModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onSubmit={onRequestCreated}
      />

      {/* Request Details & Approval Modal */}
      <RequestDetailsModal
        request={selectedRequest}
        isOpen={Boolean(selectedRequest)}
        onClose={() => setSelectedRequest(null)}
        onApprove={onApprove}
        onReject={onReject}
      />
    </div>
  );
};
