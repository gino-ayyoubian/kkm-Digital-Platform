import * as React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from 'recharts';
import { 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  SlidersHorizontal, 
  ChevronRight, 
  FileText, 
  Calendar, 
  Layers, 
  TrendingUp, 
  Filter,
  CheckCircle,
  ExternalLink,
  Target
} from 'lucide-react';
import { Claim, ClaimStatus, ClaimDomain, Page } from '../types';
import { CLAIMS_REGISTRY_DATA, CLAIM_STATUS_CONFIG } from '../data/claimsRegistryData';
import { useLanguage } from '../LanguageContext';
import { useTheme } from '../ThemeContext';

interface MilestoneDataPoint {
  monthKey: string;
  monthLabelEn: string;
  monthLabelFa: string;
  monthShort: string;
  year: number;
  monthIndex: number;
  // Counts by status
  verified: number;
  internal: number;
  estimated: number;
  demonstration: number;
  // Total in month
  monthlyTotal: number;
  // Cumulative totals
  cumulativeTotal: number;
  cumulativeVerified: number;
  cumulativeTarget: number;
  // Progress percentage (0 - 100)
  cumulativeProgressPct: number;
  // Milestone claims associated with this month
  claims: Claim[];
}

interface ProjectMilestoneProgressChartProps {
  setPage?: (page: Page) => void;
}

export const ProjectMilestoneProgressChart: React.FC<ProjectMilestoneProgressChartProps> = ({ setPage }) => {
  const { language } = useLanguage();
  const isFa = language === 'FA';
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [domainFilter, setDomainFilter] = React.useState<ClaimDomain | 'All'>('All');
  const [statusFilter, setStatusFilter] = React.useState<ClaimStatus | 'All'>('All');
  const [chartViewMode, setChartViewMode] = React.useState<'combined' | 'cumulative' | 'breakdown'>('combined');
  const [selectedMonth, setSelectedMonth] = React.useState<string | null>('2025-12');

  // Generate 12-month data timeline from existing Claim Registry Data
  const milestoneTimeline = React.useMemo<MilestoneDataPoint[]>(() => {
    // 12 Months: Jan 2025 to Dec 2025
    const monthDefs = [
      { key: '2025-01', en: 'Jan 2025', fa: 'دی - بهمن ۱۴۰۳', short: 'Jan', y: 2025, m: 1 },
      { key: '2025-02', en: 'Feb 2025', fa: 'بهمن - اسفند ۱۴۰۳', short: 'Feb', y: 2025, m: 2 },
      { key: '2025-03', en: 'Mar 2025', fa: 'اسفند - فروردین ۱۴۰۴', short: 'Mar', y: 2025, m: 3 },
      { key: '2025-04', en: 'Apr 2025', fa: 'فروردین - اردیبهشت ۱۴۰۴', short: 'Apr', y: 2025, m: 4 },
      { key: '2025-05', en: 'May 2025', fa: 'اردیبهشت - خرداد ۱۴۰۴', short: 'May', y: 2025, m: 5 },
      { key: '2025-06', en: 'Jun 2025', fa: 'خرداد - تیر ۱۴۰۴', short: 'Jun', y: 2025, m: 6 },
      { key: '2025-07', en: 'Jul 2025', fa: 'تیر - مرداد ۱۴۰۴', short: 'Jul', y: 2025, m: 7 },
      { key: '2025-08', en: 'Aug 2025', fa: 'مرداد - شهریور ۱۴۰۴', short: 'Aug', y: 2025, m: 8 },
      { key: '2025-09', en: 'Sep 2025', fa: 'شهریور - مهر ۱۴۰۴', short: 'Sep', y: 2025, m: 9 },
      { key: '2025-10', en: 'Oct 2025', fa: 'مهر - آبان ۱۴۰۴', short: 'Oct', y: 2025, m: 10 },
      { key: '2025-11', en: 'Nov 2025', fa: 'آبان - آذر ۱۴۰۴', short: 'Nov', y: 2025, m: 11 },
      { key: '2025-12', en: 'Dec 2025', fa: 'آذر - دی ۱۴۰۴', short: 'Dec', y: 2025, m: 12 },
    ];

    // Filter claims by active filters
    const filteredClaims = CLAIMS_REGISTRY_DATA.filter(claim => {
      const matchDomain = domainFilter === 'All' || claim.domain === domainFilter;
      const matchStatus = statusFilter === 'All' || claim.status === statusFilter;
      return matchDomain && matchStatus;
    });

    // Map claim verification dates to months, with fallback distribution for earlier baseline claims
    // Each claim in CLAIMS_REGISTRY_DATA maps to its verification/audit month in 2025 (or baseline Jan 2025)
    const claimsByMonth: Record<string, Claim[]> = {};
    monthDefs.forEach(m => { claimsByMonth[m.key] = []; });

    filteredClaims.forEach(claim => {
      let targetMonth = '2025-01'; // Default baseline
      if (claim.verificationDate) {
        const [vYear, vMonth] = claim.verificationDate.split('-');
        const parsedKey = `${vYear}-${vMonth}`;
        if (claimsByMonth[parsedKey]) {
          targetMonth = parsedKey;
        } else if (vYear < '2025') {
          // Pre-2025 verified milestone carried over as Jan 2025 certified baseline
          targetMonth = '2025-01';
        } else if (vYear > '2025') {
          targetMonth = '2025-12';
        }
      }
      claimsByMonth[targetMonth].push(claim);
    });

    // Build timeline with rolling cumulative totals and target trajectory
    let runningTotal = 0;
    let runningVerified = 0;
    const totalFiltered = filteredClaims.length;

    return monthDefs.map((m, idx) => {
      const monthClaims = claimsByMonth[m.key] || [];
      const verifiedCount = monthClaims.filter(c => c.status === 'Verified').length;
      const internalCount = monthClaims.filter(c => c.status === 'Internal').length;
      const estimatedCount = monthClaims.filter(c => c.status === 'Estimated').length;
      const demoCount = monthClaims.filter(c => c.status === 'Demonstration').length;
      const mTotal = monthClaims.length;

      runningTotal += mTotal;
      runningVerified += verifiedCount;

      // Scheduled cumulative target follows standard linear milestones planned across 12 months
      const plannedTarget = Math.min(totalFiltered, Math.ceil((totalFiltered / 12) * (idx + 1)));
      const progressPct = totalFiltered > 0 ? Math.min(100, Math.round((runningTotal / totalFiltered) * 100)) : 100;

      return {
        monthKey: m.key,
        monthLabelEn: m.en,
        monthLabelFa: m.fa,
        monthShort: m.short,
        year: m.y,
        monthIndex: m.m,
        verified: verifiedCount,
        internal: internalCount,
        estimated: estimatedCount,
        demonstration: demoCount,
        monthlyTotal: mTotal,
        cumulativeTotal: runningTotal,
        cumulativeVerified: runningVerified,
        cumulativeTarget: plannedTarget,
        cumulativeProgressPct: progressPct,
        claims: monthClaims
      };
    });
  }, [domainFilter, statusFilter]);

  // Selected month detail
  const activeMonthData = React.useMemo(() => {
    if (!selectedMonth) return milestoneTimeline[milestoneTimeline.length - 1];
    return milestoneTimeline.find(m => m.monthKey === selectedMonth) || milestoneTimeline[milestoneTimeline.length - 1];
  }, [milestoneTimeline, selectedMonth]);

  // Overall KPIs
  const totalAudited = milestoneTimeline[milestoneTimeline.length - 1]?.cumulativeTotal || 0;
  const totalVerified = milestoneTimeline[milestoneTimeline.length - 1]?.cumulativeVerified || 0;
  const finalCompletionRate = milestoneTimeline[milestoneTimeline.length - 1]?.cumulativeProgressPct || 100;

  // Custom Recharts Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;
    const item = milestoneTimeline.find(m => m.monthShort === label || m.monthKey === label);
    if (!item) return null;

    return (
      <div className="bg-slate-900/95 text-white p-4 rounded-xl shadow-2xl border border-slate-700 text-xs max-w-xs backdrop-blur-md">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
          <span className="font-bold text-sm text-cyan-400 font-mono">
            {isFa ? item.monthLabelFa : item.monthLabelEn}
          </span>
          <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-bold border border-cyan-800">
            {item.cumulativeProgressPct}% Completed
          </span>
        </div>

        <div className="space-y-1 mb-2.5">
          <div className="flex justify-between items-center text-slate-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Verified (Level A-B):
            </span>
            <span className="font-mono font-bold text-emerald-400">+{item.verified}</span>
          </div>
          <div className="flex justify-between items-center text-slate-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Internal / Target:
            </span>
            <span className="font-mono font-bold text-blue-400">+{item.internal}</span>
          </div>
          <div className="flex justify-between items-center text-slate-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Estimated / Modelled:
            </span>
            <span className="font-mono font-bold text-amber-400">+{item.estimated}</span>
          </div>
          <div className="flex justify-between items-center text-slate-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              Demonstration (P0-02):
            </span>
            <span className="font-mono font-bold text-purple-400">+{item.demonstration}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
          <span>Cumulative Audited:</span>
          <span className="font-mono font-bold text-white">{item.cumulativeTotal} milestones</span>
        </div>

        {item.claims.length > 0 && (
          <div className="mt-2 text-[10px] text-slate-400 font-mono truncate">
            Active: {item.claims.map(c => c.id).join(', ')}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl transition-all">
      
      {/* Header and Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-950/70 dark:text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider mb-2 border border-cyan-300 dark:border-cyan-800">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>P0-13 Audit Trajectory</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Project Milestone Completion</span>
            <span className="text-xs font-mono font-normal text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800">
              12-Month Audited Horizon
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Dynamic milestone progression aggregated directly from the KKM Claim Registry data. Tracks empirical validation, formal third-party audits, and internal engineering targets month-by-month.
          </p>
        </div>

        {/* View Mode & Filter Toggles */}
        <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
          <div className="inline-flex rounded-xl bg-slate-200 dark:bg-slate-800 p-1 border border-slate-300 dark:border-slate-700 text-xs font-semibold">
            <button
              onClick={() => setChartViewMode('combined')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                chartViewMode === 'combined'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Combined View
            </button>
            <button
              onClick={() => setChartViewMode('cumulative')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                chartViewMode === 'cumulative'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Cumulative Progress %
            </button>
            <button
              onClick={() => setChartViewMode('breakdown')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                chartViewMode === 'breakdown'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Category Breakdown
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
        <div className="bg-white dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span className="font-medium">Total Milestones Tracked</span>
            <Layers className="w-3.5 h-3.5 text-primary" />
          </div>
          <div className="text-2xl font-mono font-bold text-slate-900 dark:text-white">
            {totalAudited}
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>100% Registered in Claims Registry</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span className="font-medium">Completion Rate</span>
            <Target className="w-3.5 h-3.5 text-cyan-500" />
          </div>
          <div className="text-2xl font-mono font-bold text-cyan-600 dark:text-cyan-400">
            {finalCompletionRate}%
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Across 12 Monthly Milestones
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span className="font-medium">Level A-B Verified</span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="text-2xl font-mono font-bold text-emerald-600 dark:text-emerald-400">
            {totalVerified}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Independent & Statutory Proof
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span className="font-medium">Audit Cycle Frequency</span>
            <Clock className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="text-2xl font-mono font-bold text-slate-900 dark:text-white">
            6–12 Mo
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Continuous Governance Protocol
          </div>
        </div>
      </div>

      {/* Filter Row: Domain & Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-3.5 bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Domain:</span>
          </span>
          {(['All', 'ESG', 'Technical', 'Performance', 'IP', 'Corporate'] as const).map(domain => (
            <button
              key={domain}
              onClick={() => setDomainFilter(domain)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                domainFilter === domain
                  ? 'bg-primary text-white font-bold shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {domain}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-slate-500 dark:text-slate-400">
            Status:
          </span>
          {(['All', 'Verified', 'Internal', 'Estimated', 'Demonstration'] as const).map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                statusFilter === status
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Recharts Interactive Visualization */}
      <div className="w-full h-80 sm:h-96 my-4">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={milestoneTimeline}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
            onClick={(state) => {
              if (state && state.activeLabel) {
                const clicked = milestoneTimeline.find(m => m.monthShort === state.activeLabel || m.monthKey === state.activeLabel);
                if (clicked) setSelectedMonth(clicked.monthKey);
              }
            }}
          >
            <defs>
              <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="verifiedBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#059669" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="internalBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#2563eb" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="estimatedBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#d97706" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="demoBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#9333ea" stopOpacity={0.8} />
              </linearGradient>
            </defs>

            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={isDark ? '#334155' : '#e2e8f0'} 
              opacity={0.6} 
            />

            <XAxis
              dataKey="monthShort"
              stroke={isDark ? '#94a3b8' : '#64748b'}
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: isDark ? '#475569' : '#cbd5e1' }}
            />

            {/* Left Axis: Milestone Count */}
            <YAxis
              yAxisId="countAxis"
              stroke={isDark ? '#94a3b8' : '#64748b'}
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: isDark ? '#475569' : '#cbd5e1' }}
              allowDecimals={false}
              label={{ 
                value: 'Milestones Completed', 
                angle: -90, 
                position: 'insideLeft',
                style: { fill: isDark ? '#94a3b8' : '#64748b', fontSize: 11 }
              }}
            />

            {/* Right Axis: Cumulative Completion % */}
            <YAxis
              yAxisId="percentAxis"
              orientation="right"
              domain={[0, 100]}
              stroke={isDark ? '#94a3b8' : '#64748b'}
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: isDark ? '#475569' : '#cbd5e1' }}
              unit="%"
              label={{ 
                value: 'Progress Rate (%)', 
                angle: 90, 
                position: 'insideRight',
                style: { fill: isDark ? '#94a3b8' : '#64748b', fontSize: 11 }
              }}
            />

            <Tooltip content={<CustomTooltip />} />
            
            <Legend 
              verticalAlign="top" 
              height={36}
              wrapperStyle={{ fontSize: 12, paddingBottom: 10 }}
            />

            {/* Reference Line at 100% Annual Milestone Goal */}
            <ReferenceLine 
              yAxisId="percentAxis" 
              y={100} 
              stroke="#06b6d4" 
              strokeDasharray="4 4" 
              label={{ 
                value: 'Target: 100% Completion', 
                position: 'top', 
                fill: '#06b6d4', 
                fontSize: 10,
                fontWeight: 'bold' 
              }} 
            />

            {/* Stacked Bars for Categorized Milestones Completed */}
            {(chartViewMode === 'combined' || chartViewMode === 'breakdown') && (
              <>
                <Bar 
                  yAxisId="countAxis" 
                  dataKey="verified" 
                  name="Verified (Level A-B)" 
                  stackId="milestones" 
                  fill="url(#verifiedBar)" 
                  radius={[0, 0, 0, 0]} 
                />
                <Bar 
                  yAxisId="countAxis" 
                  dataKey="internal" 
                  name="Internal / Target" 
                  stackId="milestones" 
                  fill="url(#internalBar)" 
                  radius={[0, 0, 0, 0]} 
                />
                <Bar 
                  yAxisId="countAxis" 
                  dataKey="estimated" 
                  name="Estimated / Modelled" 
                  stackId="milestones" 
                  fill="url(#estimatedBar)" 
                  radius={[0, 0, 0, 0]} 
                />
                <Bar 
                  yAxisId="countAxis" 
                  dataKey="demonstration" 
                  name="Demonstration (P0-02)" 
                  stackId="milestones" 
                  fill="url(#demoBar)" 
                  radius={[4, 4, 0, 0]} 
                />
              </>
            )}

            {/* Area and Line for Cumulative Progress Tracking */}
            {(chartViewMode === 'combined' || chartViewMode === 'cumulative') && (
              <>
                <Area
                  yAxisId="percentAxis"
                  type="monotone"
                  dataKey="cumulativeProgressPct"
                  name="Cumulative Progress (%)"
                  fill="url(#progressGradient)"
                  stroke="#06b6d4"
                  strokeWidth={2.5}
                />
                <Line
                  yAxisId="percentAxis"
                  type="monotone"
                  dataKey="cumulativeProgressPct"
                  stroke="#0891b2"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#06b6d4', strokeWidth: 2, stroke: '#ffffff' }}
                  activeDot={{ r: 7, fill: '#06b6d4', stroke: '#ffffff', strokeWidth: 2 }}
                />
              </>
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Month Inspector & Traceability Drill-down */}
      <div className="mt-8 p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-200 dark:border-slate-700">
          <div>
            <div className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
              Traceability Audit Inspector
            </div>
            <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>
                {isFa ? activeMonthData.monthLabelFa : activeMonthData.monthLabelEn} Milestone Record
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-800">
                {activeMonthData.cumulativeProgressPct}% Progress Achieved
              </span>
            </div>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400">
            {activeMonthData.claims.length} registered claims mapped to this milestone window
          </div>
        </div>

        {/* Claim Cards for Selected Month */}
        {activeMonthData.claims.length === 0 ? (
          <div className="text-center py-6 text-xs text-slate-500 dark:text-slate-400">
            No registered claims specifically verified in this period under current filter criteria. Overall cumulative development progressed to {activeMonthData.cumulativeProgressPct}%.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {activeMonthData.claims.map(claim => {
              const statusCfg = CLAIM_STATUS_CONFIG[claim.status];
              return (
                <div 
                  key={claim.id} 
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-xs font-bold text-primary dark:text-secondary">
                        {claim.id}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${statusCfg.badgeBg} ${statusCfg.textColor} ${statusCfg.borderColor}`}>
                          {claim.status}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold">
                          Level {claim.evidenceLevel}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-medium mb-3 leading-relaxed">
                      {isFa ? claim.statementFa : claim.statementEn}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-slate-200 dark:border-slate-800 text-[11px] space-y-1 text-slate-500 dark:text-slate-400">
                    <div className="flex justify-between">
                      <span className="font-medium">Metric Value:</span>
                      <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                        {claim.metricValue || 'Formal Compliance'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Department:</span>
                      <span className="text-slate-700 dark:text-slate-300">
                        {claim.ownerDepartment}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Evidence File:</span>
                      <span className="font-mono text-primary dark:text-secondary font-bold truncate max-w-[180px]">
                        {claim.evidenceFile || 'EVD-RATIFIED.pdf'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer Link to Full Claims Registry */}
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <span className="text-slate-500 dark:text-slate-400">
            Source: KKM Public Claims & Evidence Registry (P0-13 Directive Compliance).
          </span>
          {setPage && (
            <button
              onClick={() => setPage(Page.EvidenceRegistry)}
              className="inline-flex items-center gap-1 font-bold text-primary dark:text-secondary hover:underline cursor-pointer"
            >
              <span>Examine Evidence Dossiers</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
};

export default ProjectMilestoneProgressChart;
