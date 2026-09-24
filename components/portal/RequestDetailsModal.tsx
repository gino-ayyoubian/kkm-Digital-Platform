import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import { useLanguage } from '../../LanguageContext';
import { X, CheckCircle, XCircle, Clock, User, Calendar, MapPin, DollarSign, Building, AlertCircle, FileText } from 'lucide-react';
import { AutomationRequest } from '../../types';

interface RequestDetailsModalProps {
  request: AutomationRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (requestId: string, comments: string) => Promise<void>;
  onReject: (requestId: string, comments: string) => Promise<void>;
}

export const RequestDetailsModal: React.FC<RequestDetailsModalProps> = ({
  request,
  isOpen,
  onClose,
  onApprove,
  onReject,
}) => {
  const { userProfile, isSuperAdmin, isAdmin } = useAuth();
  const { isFa } = useLanguage();
  const [comments, setComments] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  if (!isOpen || !request) return null;

  // Determine if current user can approve this request:
  // - Super admin or executive can approve anything
  // - Director can approve requests from their department or technical reviews
  // - Reviewer can sign off technical reviews
  const canApprove = Boolean(
    isSuperAdmin ||
    isAdmin ||
    userProfile?.permissions.canApproveAll ||
    (userProfile?.permissions.canApproveDepartment && userProfile.department === request.department) ||
    (userProfile?.role === 'reviewer' && request.type === 'technical_review')
  );

  const handleAction = async (action: 'approve' | 'reject') => {
    setSubmitting(true);
    setActionError(null);
    try {
      if (action === 'approve') {
        await onApprove(request.id, comments.trim());
      } else {
        await onReject(request.id, comments.trim());
      }
      setComments('');
      onClose();
    } catch (err: any) {
      setActionError(err?.message || (isFa ? 'خطا در ثبت دستور' : 'Action failed'));
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 rounded-full text-xs font-bold flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5" />
            {isFa ? 'تصویب و ابلاغ شده' : 'Approved & Executed'}
          </span>
        );
      case 'rejected':
        return (
          <span className="px-3 py-1 bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 rounded-full text-xs font-bold flex items-center gap-1.5">
            <XCircle className="w-3.5 h-3.5" />
            {isFa ? 'رد شده' : 'Rejected'}
          </span>
        );
      case 'pending_finance':
        return (
          <span className="px-3 py-1 bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 rounded-full text-xs font-bold flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {isFa ? 'در انتظار تایید مالی / مدیر ارشد' : 'Pending Finance / Executive'}
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 rounded-full text-xs font-bold flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {isFa ? 'در انتظار بررسی مدیر واحد' : 'Pending Manager Review'}
          </span>
        );
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <span className="px-2.5 py-0.5 rounded bg-red-500 text-white text-[11px] font-bold">{isFa ? 'اضطراری و آنی' : 'Urgent / Critical'}</span>;
      case 'high':
        return <span className="px-2.5 py-0.5 rounded bg-amber-500 text-white text-[11px] font-bold">{isFa ? 'فوری' : 'High Priority'}</span>;
      case 'medium':
        return <span className="px-2.5 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 text-[11px] font-medium">{isFa ? 'متوسط' : 'Medium'}</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-300 text-[11px] font-medium">{isFa ? 'عادی' : 'Normal'}</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-100 dark:border-slate-700 sticky top-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold text-primary dark:text-secondary bg-primary/10 dark:bg-secondary/15 px-2 py-0.5 rounded">
                {request.id}
              </span>
              {getPriorityBadge(request.priority)}
              {getStatusBadge(request.status)}
            </div>
            <h3 className="text-lg font-display font-bold text-text-dark dark:text-white leading-snug">
              {request.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-gray-50 dark:bg-slate-900/50 p-4 rounded-xl text-xs border border-gray-100 dark:border-slate-700/60">
            <div>
              <span className="text-text-light dark:text-slate-400 block mb-0.5">{isFa ? 'درخواست‌دهنده' : 'Requester'}</span>
              <span className="font-bold text-text-dark dark:text-white flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-primary dark:text-secondary" />
                {request.requesterName}
              </span>
            </div>
            <div>
              <span className="text-text-light dark:text-slate-400 block mb-0.5">{isFa ? 'دپارتمان سازمانی' : 'Department'}</span>
              <span className="font-semibold text-text-dark dark:text-white flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-primary dark:text-secondary" />
                {request.department}
              </span>
            </div>
            <div>
              <span className="text-text-light dark:text-slate-400 block mb-0.5">{isFa ? 'زمان ثبت' : 'Created Date'}</span>
              <span className="font-mono text-text-dark dark:text-slate-300">
                {request.createdAt ? new Date(request.createdAt).toLocaleString() : 'N/A'}
              </span>
            </div>

            {request.amount !== undefined && (
              <div>
                <span className="text-text-light dark:text-slate-400 block mb-0.5">{isFa ? 'مبلغ برآوردی' : 'Amount'}</span>
                <span className="font-bold text-green-600 dark:text-green-400 flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5" />
                  {request.amount.toLocaleString()} USD
                </span>
              </div>
            )}

            {request.startDate && (
              <div>
                <span className="text-text-light dark:text-slate-400 block mb-0.5">{isFa ? 'بازه زمانی' : 'Duration'}</span>
                <span className="font-semibold text-text-dark dark:text-slate-300 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {request.startDate} {request.endDate ? `→ ${request.endDate}` : ''}
                </span>
              </div>
            )}

            {request.destination && (
              <div>
                <span className="text-text-light dark:text-slate-400 block mb-0.5">{isFa ? 'سایت / مقصد' : 'Destination'}</span>
                <span className="font-semibold text-text-dark dark:text-slate-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {request.destination}
                </span>
              </div>
            )}
          </div>

          {/* Description Section */}
          <div>
            <h4 className="text-xs font-bold text-text-dark dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-primary dark:text-secondary" />
              {isFa ? 'شرح و توجیه اداری درخواست' : 'Request Description & Scope'}
            </h4>
            <div className="p-4 bg-gray-50 dark:bg-slate-700/40 rounded-xl text-sm text-text-dark dark:text-slate-200 leading-relaxed border border-gray-100 dark:border-slate-700">
              {request.description}
            </div>
          </div>

          {/* Approval Workflow & Audit Trail */}
          <div>
            <h4 className="text-xs font-bold text-text-dark dark:text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary dark:text-secondary" />
              {isFa ? 'سوابق گردش کار و امضاهای سازمانی (Audit Trail)' : 'Workflow & Approval Audit Trail'}
            </h4>

            {request.approvals && request.approvals.length > 0 ? (
              <div className="space-y-2.5">
                {request.approvals.map((step, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border flex items-start justify-between gap-3 ${
                      step.action === 'approved'
                        ? 'bg-green-50/70 border-green-200 dark:bg-green-950/20 dark:border-green-900/50'
                        : 'bg-red-50/70 border-red-200 dark:bg-red-950/20 dark:border-red-900/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-text-dark dark:text-white">
                          {step.step}: {step.approverName}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-white dark:bg-slate-800 text-text-light dark:text-slate-400 font-mono">
                          {step.approverRole}
                        </span>
                      </div>
                      {step.comments && (
                        <p className="text-xs text-text-dark dark:text-slate-300 mt-1 italic">
                          &ldquo;{step.comments}&rdquo;
                        </p>
                      )}
                    </div>
                    <div className="text-end shrink-0">
                      <span className={`text-xs font-bold ${
                        step.action === 'approved' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        {step.action === 'approved' ? (isFa ? 'تایید شد' : 'Approved') : (isFa ? 'رد شد' : 'Rejected')}
                      </span>
                      <p className="text-[10px] text-text-light dark:text-slate-400 font-mono mt-0.5">
                        {step.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-gray-50 dark:bg-slate-700/30 rounded-xl text-center text-xs text-text-light dark:text-slate-400 border border-dashed border-gray-200 dark:border-slate-700">
                {isFa ? 'هنوز امضا یا بررسی نهایی روی این درخواست انجام نشده است.' : 'No approvals recorded yet. Waiting in queue.'}
              </div>
            )}
          </div>

          {/* Action Box for Approvers */}
          {canApprove && (request.status === 'pending_manager' || request.status === 'pending_finance') && (
            <div className="p-5 bg-primary/5 dark:bg-secondary/5 rounded-2xl border border-primary/20 dark:border-secondary/20 space-y-4">
              <h4 className="text-xs font-bold text-primary dark:text-secondary uppercase tracking-wider">
                {isFa ? 'پنل تصمیم‌گیری و ثبت دستور اداری' : 'Executive Action & Decision'}
              </h4>

              {actionError && (
                <div className="p-2.5 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-lg text-xs flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  <span>{actionError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-text-dark dark:text-slate-300 mb-1">
                  {isFa ? 'توضیحات، شروط تایید یا علت رد درخواست' : 'Remarks, Conditions or Rejection Reason'}
                </label>
                <textarea
                  rows={2}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder={isFa ? 'یادداشت اداری خود را یادداشت نمایید...' : 'Enter formal remarks or notes...'}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-text-dark dark:text-white text-xs outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => handleAction('reject')}
                  className="px-4 py-2 rounded-xl border border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 text-xs font-bold transition-all flex items-center gap-1.5 disabled:opacity-50"
                >
                  <XCircle className="w-4 h-4" />
                  <span>{isFa ? 'رد درخواست' : 'Reject'}</span>
                </button>
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => handleAction('approve')}
                  className="px-5 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 disabled:opacity-50"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>{isFa ? 'تایید و تصویب' : 'Approve Request'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end p-4 border-t border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/40">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-200 dark:bg-slate-700 text-text-dark dark:text-slate-200 hover:bg-gray-300 dark:hover:bg-slate-600 font-bold text-xs rounded-xl transition-colors"
          >
            {isFa ? 'بستن' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
