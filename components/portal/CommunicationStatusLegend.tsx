import * as React from 'react';
import { 
  PhoneCall, PhoneOff, PhoneForwarded, Info, 
  CheckCircle2, Clock, ChevronDown, ChevronUp, Radio 
} from 'lucide-react';
import { useLanguage } from '../../LanguageContext';
import { StaffExtensionStatus } from '../../types';

interface CommunicationStatusLegendProps {
  className?: string;
  compact?: boolean;
  activeFilter?: 'ALL' | StaffExtensionStatus;
  onSelectStatus?: (status: StaffExtensionStatus | 'ALL') => void;
}

export const CommunicationStatusLegend: React.FC<CommunicationStatusLegendProps> = ({
  className = '',
  compact = false,
  activeFilter,
  onSelectStatus,
}) => {
  const { isFa } = useLanguage();
  const [isExpanded, setIsExpanded] = React.useState<boolean>(!compact);

  const statusDefinitions = [
    {
      status: StaffExtensionStatus.Active,
      key: 'active',
      labelFa: 'آماده پاسخگویی (Active)',
      labelEn: 'Active (Available)',
      colorBg: 'bg-emerald-50 dark:bg-emerald-950/40',
      colorBorder: 'border-emerald-200 dark:border-emerald-800',
      colorText: 'text-emerald-800 dark:text-emerald-300',
      dotColor: 'bg-emerald-500',
      ping: true,
      icon: PhoneCall,
      summaryFa: 'حضور پشت میز یا آنلاین روی سافت‌فون VoIP',
      summaryEn: 'Online on SIP softphone or at desk phone',
      detailFa: 'خط آزاد و آماده دریافت تماس است. تماس‌های ورودی و انتقالی مستقیماً و بدون معطلی روی میز همکار زنگ می‌خورند.',
      detailEn: 'Line is available for immediate connection. Inbound and transferred calls ring staff workstation directly with zero latency.',
      routingNoteFa: 'هدایت: اتصال بلادرنگ به داخلی (Direct Connect)',
      routingNoteEn: 'Routing: Direct connection to extension',
    },
    {
      status: StaffExtensionStatus.Busy,
      key: 'busy',
      labelFa: 'در حال مکالمه (Busy)',
      labelEn: 'Busy (On Call)',
      colorBg: 'bg-rose-50 dark:bg-rose-950/40',
      colorBorder: 'border-rose-200 dark:border-rose-800',
      colorText: 'text-rose-800 dark:text-rose-300',
      dotColor: 'bg-rose-500',
      ping: false,
      icon: PhoneOff,
      summaryFa: 'در حال گفتگو روی خط یا جلسه صوتی فعال',
      summaryEn: 'Currently engaged in an active phone call',
      detailFa: 'کانال ترانک داخلی در حال استفاده است. تماس‌گیرنده پشت خط بوق انتظار می‌شنود یا تماس به نفر دوم گروه پاسخگویی (Hunt Group) منتقل می‌شود.',
      detailEn: 'Channel is occupied by an ongoing call. Callers hear waiting tone or flow to secondary queue member.',
      routingNoteFa: 'هدایت: انتظار مکالمه یا نفر جانشین (Queue Overflow)',
      routingNoteEn: 'Routing: Call waiting or queue overflow',
    },
    {
      status: StaffExtensionStatus.Away,
      key: 'away',
      labelFa: 'دور از میز (Away)',
      labelEn: 'Away (Out of Office)',
      colorBg: 'bg-amber-50 dark:bg-amber-950/40',
      colorBorder: 'border-amber-200 dark:border-amber-800',
      colorText: 'text-amber-800 dark:text-amber-300',
      dotColor: 'bg-amber-500',
      ping: false,
      icon: PhoneForwarded,
      summaryFa: 'عدم حضور موقت، ماموریت یا خارج از شیفت',
      summaryEn: 'Temporarily away from desk or on mission',
      detailFa: 'همکار پشت میز نیست. در صورت فعال بودن فوروارد، تماس به شماره همراه کاری دایورت می‌شود، در غیر این صورت به صندوق صوتی (*99) هدایت می‌گردد.',
      detailEn: 'Staff is away. If mobile forwarding is enabled, call diverts to corporate mobile; otherwise directs to voicemail (*99).',
      routingNoteFa: 'هدایت: دایورت به همراه یا صندوق صوتی (*99)',
      routingNoteEn: 'Routing: Divert to mobile or voicemail (*99)',
    },
  ];

  return (
    <div 
      className={`rounded-2xl border border-slate-200 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-850/60 p-4 transition-all ${className}`}
      aria-label={isFa ? 'راهنمای وضعیت‌های خطوط داخلی' : 'Extension status legend'}
    >
      {/* Legend Header with Collapse/Expand Toggle */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-primary dark:text-secondary shrink-0" />
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">
              {isFa ? 'راهنمای وضعیت آیکون‌های خطوط داخلی (Extension Status Legend)' : 'Extension Status Legend & IVR Behavior'}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {isFa 
                ? 'تعریف دقیق معانی نشانگرهای فعال، مشغول و دور از میز و نحوه رفتار سانترال دفتر شما'
                : 'Defines what each staff status icon represents and how the Daftar-e-Shoma PBX routes inbound calls'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
          aria-expanded={isExpanded}
        >
          <span>{isExpanded ? (isFa ? 'بستن راهنما' : 'Collapse') : (isFa ? 'مشاهده توضیحات' : 'Expand')}</span>
          {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </button>
      </div>

      {/* Expanded Descriptive Content Grid */}
      {isExpanded && (
        <div className="mt-3.5 grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-slate-200/60 dark:border-slate-800">
          {statusDefinitions.map((item) => {
            const isSelected = activeFilter === item.status;
            const Icon = item.icon;

            return (
              <div
                key={item.key}
                onClick={() => onSelectStatus?.(item.status)}
                className={`rounded-xl border p-3.5 transition-all flex flex-col justify-between ${item.colorBorder} ${item.colorBg} ${
                  onSelectStatus ? 'cursor-pointer hover:shadow-xs hover:border-slate-400 dark:hover:border-slate-600' : ''
                } ${isSelected ? 'ring-2 ring-primary dark:ring-secondary shadow-xs' : ''}`}
                role={onSelectStatus ? 'button' : undefined}
                tabIndex={onSelectStatus ? 0 : undefined}
                onKeyDown={(e) => {
                  if (onSelectStatus && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    onSelectStatus(item.status);
                  }
                }}
              >
                <div>
                  {/* Status Indicator Pill Header */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="relative flex h-2.5 w-2.5 shrink-0">
                        {item.ping && (
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        )}
                        <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${item.dotColor}`} />
                      </span>
                      <span className={`text-xs font-bold ${item.colorText}`}>
                        {isFa ? item.labelFa : item.labelEn}
                      </span>
                    </div>

                    <Icon className={`h-3.5 w-3.5 ${item.colorText} shrink-0`} />
                  </div>

                  {/* Summary */}
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {isFa ? item.summaryFa : item.summaryEn}
                  </p>

                  {/* Detailed Description */}
                  <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                    {isFa ? item.detailFa : item.detailEn}
                  </p>
                </div>

                {/* Footer Technical Routing Behavior */}
                <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-800/80 text-[10px] font-mono font-medium text-slate-500 dark:text-slate-400 flex items-center justify-between">
                  <span>{isFa ? item.routingNoteFa : item.routingNoteEn}</span>
                  {onSelectStatus && (
                    <span className="text-primary dark:text-secondary underline hover:no-underline">
                      {isSelected 
                        ? (isFa ? '✓ انتخاب‌شده' : '✓ Selected') 
                        : (isFa ? 'فیلتر این وضعیت' : 'Filter')}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quick Interactive Status Filter Action when collapsed */}
      {!isExpanded && (
        <div className="mt-2.5 flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-800 text-xs">
          <span className="text-[11px] text-slate-500 font-medium">
            {isFa ? 'علائم وضعیت:' : 'Quick Indicators:'}
          </span>
          {statusDefinitions.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => onSelectStatus?.(item.status)}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-semibold transition-colors ${item.colorBorder} ${item.colorBg} ${item.colorText}`}
            >
              <span className={`h-2 w-2 rounded-full ${item.dotColor}`} />
              <span>{isFa ? item.labelFa.split(' ')[0] : item.labelEn.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunicationStatusLegend;
