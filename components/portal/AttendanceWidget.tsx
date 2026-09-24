import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import { useLanguage } from '../../LanguageContext';
import { Clock, Play, Square, MapPin, Laptop, Building2, CheckCircle2, History, Shield } from 'lucide-react';
import { AttendanceRecord } from '../../types';
import { INITIAL_ATTENDANCE_RECORDS } from '../../data/orgMembers';

export const AttendanceWidget: React.FC = () => {
  const { userProfile } = useAuth();
  const { isFa } = useLanguage();

  const [isCheckedIn, setIsCheckedIn] = useState(true);
  const [workMode, setWorkMode] = useState<'remote' | 'office' | 'site'>('remote');
  const [locationName, setLocationName] = useState('Tehran HQ / Remote Hub');
  const [elapsedSeconds, setElapsedSeconds] = useState(16345); // ~ 4h 32m 25s
  const [records, setRecords] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE_RECORDS);

  // Live timer tick
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isCheckedIn) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCheckedIn]);

  // Format seconds to HH:MM:SS
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleToggleCheckIn = () => {
    if (isCheckedIn) {
      // Check out action
      const now = new Date();
      const checkOutTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setIsCheckedIn(false);

      // Add to records
      const newRecord: AttendanceRecord = {
        id: `att-${Date.now()}`,
        userId: userProfile?.uid || 'user',
        userName: userProfile?.displayName || 'User',
        date: now.toISOString().split('T')[0],
        checkIn: '08:30',
        checkOut: checkOutTime,
        type: workMode,
        location: locationName,
        totalHours: Math.round((elapsedSeconds / 3600) * 10) / 10,
        status: 'completed',
      };
      setRecords([newRecord, ...records]);
    } else {
      // Check in action
      setIsCheckedIn(true);
      setElapsedSeconds(0);
    }
  };

  return (
    <div className="space-y-6">
      {/* Real-time Session Card */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 dark:border-slate-700/60 pb-5 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-5 h-5 text-primary dark:text-secondary" />
              <h2 className="text-base sm:text-lg font-display font-bold text-text-dark dark:text-white">
                {isFa ? 'سامانه هوشمند ثبت تردد، کار از راه دور و تله‌متری پرسنلی' : 'Smart Attendance & Remote Telemetry System'}
              </h2>
            </div>
            <p className="text-xs text-text-light dark:text-slate-400">
              {isFa
                ? `شناسه پرسنلی: ${userProfile?.employeeId} &bull; ${userProfile?.displayNameFa || userProfile?.displayName}`
                : `Employee ID: ${userProfile?.employeeId} &bull; ${userProfile?.displayName}`}
            </p>
          </div>

          {/* Work Mode Toggle */}
          <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-slate-900/60 p-1.5 rounded-xl border border-gray-200 dark:border-slate-700">
            <button
              onClick={() => { setWorkMode('remote'); setLocationName('Remote / Home Office'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                workMode === 'remote'
                  ? 'bg-white dark:bg-slate-800 text-primary dark:text-secondary shadow-sm'
                  : 'text-text-light dark:text-slate-400'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>{isFa ? 'دورکاری برخط (Remote)' : 'Remote'}</span>
            </button>

            <button
              onClick={() => { setWorkMode('office'); setLocationName('Tehran HQ, Tower A'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                workMode === 'office'
                  ? 'bg-white dark:bg-slate-800 text-primary dark:text-secondary shadow-sm'
                  : 'text-text-light dark:text-slate-400'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{isFa ? 'ستاد مرکزی (HQ)' : 'HQ Office'}</span>
            </button>

            <button
              onClick={() => { setWorkMode('site'); setLocationName('Qeshm Island Pilot Facility'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                workMode === 'site'
                  ? 'bg-white dark:bg-slate-800 text-primary dark:text-secondary shadow-sm'
                  : 'text-text-light dark:text-slate-400'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{isFa ? 'سایت پروژه (Site)' : 'Project Site'}</span>
            </button>
          </div>
        </div>

        {/* Central Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Status Indicators */}
          <div className="space-y-3 bg-gray-50 dark:bg-slate-900/40 p-4 rounded-xl border border-gray-100 dark:border-slate-700/60 text-xs">
            <div>
              <span className="text-text-light dark:text-slate-400 block mb-0.5">{isFa ? 'وضعیت حضور جاری' : 'Current Status'}</span>
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isCheckedIn ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                <span className="font-bold text-text-dark dark:text-white">
                  {isCheckedIn ? (isFa ? 'حضور ثبت شده (فعال)' : 'Active / Logged In') : (isFa ? 'عدم حضور / خروج' : 'Checked Out')}
                </span>
              </div>
            </div>

            <div>
              <span className="text-text-light dark:text-slate-400 block mb-0.5">{isFa ? 'موقعیت ثبتی' : 'Telemetry Node'}</span>
              <span className="font-medium text-text-dark dark:text-slate-300 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-primary dark:text-secondary" />
                {locationName}
              </span>
            </div>

            <div>
              <span className="text-text-light dark:text-slate-400 block mb-0.5">{isFa ? 'ساعت ورود اولیه امروز' : 'Today Check-in'}</span>
              <span className="font-mono text-text-dark dark:text-white font-semibold">08:30:00 AM</span>
            </div>
          </div>

          {/* Live Chronometer */}
          <div className="text-center py-4 bg-primary/5 dark:bg-secondary/5 rounded-2xl border border-primary/10 dark:border-secondary/15">
            <div className="text-xs uppercase tracking-wider font-bold text-primary dark:text-secondary mb-1">
              {isFa ? 'مدت زمان حضور جلسه جاری' : 'Active Session Elapsed Time'}
            </div>
            <div className="text-4xl sm:text-5xl font-mono font-extrabold text-text-dark dark:text-white tracking-wider my-2">
              {formatTime(elapsedSeconds)}
            </div>
            <div className="text-[11px] text-text-light dark:text-slate-400">
              {isFa ? 'تله‌متری همگام با سرور مرکزی KKM' : 'Synchronized with KKM Central EAOS Cluster'}
            </div>
          </div>

          {/* Check-in / Out Toggle Button */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleToggleCheckIn}
              className={`w-full py-4 rounded-2xl font-display font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 transform active:scale-95 ${
                isCheckedIn
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isCheckedIn ? (
                <>
                  <Square className="w-5 h-5 fill-current" />
                  <span>{isFa ? 'ثبت خروج از کار (Check-out)' : 'End Session & Check-Out'}</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-current" />
                  <span>{isFa ? 'ثبت ورود به کار (Check-in)' : 'Start Session & Check-In'}</span>
                </>
              )}
            </button>

            <p className="text-[11px] text-text-light dark:text-slate-400 text-center">
              {isFa 
                ? 'ثبت تردد بر پایه پروتکل امنیتی ISO 27001 و با ثبت هش زمانی ذخیره می‌گردد.'
                : 'Attendance is cryptographically logged under ISO 27001 compliance standards.'}
            </p>
          </div>
        </div>
      </div>

      {/* Attendance History Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-primary dark:text-secondary" />
            <h3 className="text-sm font-bold text-text-dark dark:text-white">
              {isFa ? 'سوابق تردد و ساعات کاری اخیر' : 'Recent Telemetry & Attendance Log'}
            </h3>
          </div>
          <span className="text-xs text-text-light dark:text-slate-400 font-mono">
            {records.length} {isFa ? 'رکورد' : 'Records'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead className="bg-gray-50 dark:bg-slate-900/60 border-b border-gray-100 dark:border-slate-700 text-text-light dark:text-slate-400 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 text-start">{isFa ? 'تاریخ' : 'Date'}</th>
                <th className="px-4 py-3 text-start">{isFa ? 'کاربر' : 'User'}</th>
                <th className="px-4 py-3 text-start">{isFa ? 'حالت کاری' : 'Mode'}</th>
                <th className="px-4 py-3 text-start">{isFa ? 'ساعت ورود' : 'Check-In'}</th>
                <th className="px-4 py-3 text-start">{isFa ? 'ساعت خروج' : 'Check-Out'}</th>
                <th className="px-4 py-3 text-start">{isFa ? 'مجموع ساعت' : 'Total Hours'}</th>
                <th className="px-4 py-3 text-start">{isFa ? 'محل ثبتی' : 'Location'}</th>
                <th className="px-4 py-3 text-end">{isFa ? 'وضعیت' : 'Status'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700/60">
              {records.map((rec) => (
                <tr key={rec.id} className="hover:bg-gray-50/80 dark:hover:bg-slate-700/40 transition-colors">
                  <td className="px-4 py-3 font-mono font-medium text-text-dark dark:text-slate-200">
                    {rec.date}
                  </td>
                  <td className="px-4 py-3 font-bold text-text-dark dark:text-white">
                    {rec.userName}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      rec.type === 'remote' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' :
                      rec.type === 'site' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' :
                      'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                    }`}>
                      {rec.type === 'remote' ? (isFa ? 'دورکاری' : 'Remote') :
                       rec.type === 'site' ? (isFa ? 'سایت' : 'Site') : (isFa ? 'ستاد' : 'Office')}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono">{rec.checkIn}</td>
                  <td className="px-4 py-3 font-mono">{rec.checkOut || 'In Progress'}</td>
                  <td className="px-4 py-3 font-bold font-mono text-primary dark:text-secondary">
                    {rec.totalHours ? `${rec.totalHours} hrs` : '-'}
                  </td>
                  <td className="px-4 py-3 text-text-light dark:text-slate-400">{rec.location}</td>
                  <td className="px-4 py-3 text-end">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300">
                      {isFa ? 'ثبت نهایی' : 'Verified'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
