import * as React from 'react';

interface ShimmerBlockProps {
  className?: string;
}

export const ShimmerBlock: React.FC<ShimmerBlockProps> = ({ className = '' }) => (
  <div className={`shimmer-box ${className}`} />
);

/**
 * High-fidelity shimmer skeleton mirroring the NewsCard component layout
 */
export const NewsCardSkeleton: React.FC<{ imageHeight?: string }> = ({ imageHeight = 'h-64' }) => (
  <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden flex flex-col border border-gray-100 dark:border-slate-700/60 transition-all">
    {/* Media Placeholder with Category Tag */}
    <div className={`relative w-full ${imageHeight} bg-slate-200 dark:bg-slate-700/50 overflow-hidden`}>
      <ShimmerBlock className="w-full h-full" />
      <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4">
        <ShimmerBlock className="w-20 h-5 rounded-full" />
      </div>
    </div>

    {/* Content Area */}
    <div className="p-6 flex flex-col flex-grow">
      {/* Date */}
      <ShimmerBlock className="h-3 w-28 rounded mb-3" />

      {/* Title (2 lines) */}
      <div className="space-y-2 mb-4">
        <ShimmerBlock className="h-5 w-4/5 rounded" />
        <ShimmerBlock className="h-5 w-3/5 rounded" />
      </div>

      {/* Excerpt Body (3 lines) */}
      <div className="space-y-2 flex-grow mb-6">
        <ShimmerBlock className="h-3.5 w-full rounded" />
        <ShimmerBlock className="h-3.5 w-11/12 rounded" />
        <ShimmerBlock className="h-3.5 w-3/4 rounded" />
      </div>

      {/* Read More Link */}
      <div className="mt-auto pt-2">
        <ShimmerBlock className="h-4 w-24 rounded" />
      </div>
    </div>
  </div>
);

/**
 * High-fidelity shimmer skeleton mirroring the SearchResultsPage layout
 */
export const SearchResultSkeleton: React.FC = () => (
  <div className="space-y-8 animate-fadeIn">
    {/* Main AI / Knowledge Synthesis Box Skeleton */}
    <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-md border border-gray-100 dark:border-slate-700 space-y-6">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 dark:border-slate-700/80 pb-4">
        <div className="flex items-center gap-2">
          <ShimmerBlock className="w-5 h-5 rounded-md" />
          <ShimmerBlock className="h-5 w-48 rounded-lg" />
        </div>
        <ShimmerBlock className="h-4 w-32 rounded" />
      </div>

      {/* Synthesis Paragraphs & Structured Points */}
      <div className="space-y-3 pt-2">
        <ShimmerBlock className="h-4 w-full rounded" />
        <ShimmerBlock className="h-4 w-11/12 rounded" />
        <ShimmerBlock className="h-4 w-full rounded" />
        <ShimmerBlock className="h-4 w-4/5 rounded" />
      </div>

      {/* Key Insight Bullets */}
      <div className="space-y-2.5 pl-2 rtl:pl-0 rtl:pr-2 py-2">
        <div className="flex items-center gap-3">
          <ShimmerBlock className="w-2 h-2 rounded-full shrink-0" />
          <ShimmerBlock className="h-3.5 w-5/6 rounded" />
        </div>
        <div className="flex items-center gap-3">
          <ShimmerBlock className="w-2 h-2 rounded-full shrink-0" />
          <ShimmerBlock className="h-3.5 w-4/5 rounded" />
        </div>
        <div className="flex items-center gap-3">
          <ShimmerBlock className="w-2 h-2 rounded-full shrink-0" />
          <ShimmerBlock className="h-3.5 w-3/4 rounded" />
        </div>
      </div>

      {/* Conclusion Line */}
      <div className="space-y-2 pt-1">
        <ShimmerBlock className="h-4 w-full rounded" />
        <ShimmerBlock className="h-4 w-3/5 rounded" />
      </div>

      {/* Grounding Sources Skeleton */}
      <div className="mt-8 border-t border-gray-100 dark:border-slate-700/80 pt-6">
        <ShimmerBlock className="h-4 w-36 rounded mb-4" />
        <div className="space-y-2.5">
          <div className="flex items-center gap-2.5">
            <ShimmerBlock className="w-4 h-4 rounded-full shrink-0" />
            <ShimmerBlock className="h-3.5 w-64 rounded" />
          </div>
          <div className="flex items-center gap-2.5">
            <ShimmerBlock className="w-4 h-4 rounded-full shrink-0" />
            <ShimmerBlock className="h-3.5 w-48 rounded" />
          </div>
        </div>
      </div>
    </div>

    {/* Filter Pills Skeleton */}
    <div className="flex items-center gap-2 overflow-x-auto pb-1">
      <ShimmerBlock className="h-9 w-24 rounded-full shrink-0" />
      <ShimmerBlock className="h-9 w-32 rounded-full shrink-0" />
      <ShimmerBlock className="h-9 w-28 rounded-full shrink-0" />
      <ShimmerBlock className="h-9 w-24 rounded-full shrink-0" />
    </div>

    {/* Matched Items Cards Grid Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <ShimmerBlock className="h-5 w-20 rounded-md" />
              <ShimmerBlock className="h-4 w-12 rounded" />
            </div>
            <ShimmerBlock className="h-5 w-4/5 rounded" />
            <div className="space-y-1.5 pt-1">
              <ShimmerBlock className="h-3.5 w-full rounded" />
              <ShimmerBlock className="h-3.5 w-11/12 rounded" />
              <ShimmerBlock className="h-3.5 w-2/3 rounded" />
            </div>
          </div>
          <div className="mt-5 pt-3 border-t border-gray-50 dark:border-slate-700/50 flex justify-end">
            <ShimmerBlock className="h-4 w-24 rounded" />
          </div>
        </div>
      ))}
    </div>
  </div>
);
