import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../LanguageContext';
import { ROUTE_METADATA, resolveMetaForPath, PageMeta, CANONICAL_HOST } from '../../lib/seoMetadata';
import { 
  Share2, Eye, ExternalLink, Copy, Check, RefreshCw, 
  Layers, Smartphone, Monitor, ShieldCheck, AlertCircle, 
  Sparkles, Globe, ThumbsUp, MessageSquare, Repeat, Send,
  Bookmark, Heart, CheckCircle2, ChevronDown, ZoomIn, ZoomOut
} from 'lucide-react';

interface SocialPreviewDebuggerProps {
  initialPath?: string;
  onNavigatePath?: (path: string) => void;
}

export const SocialPreviewDebugger: React.FC<SocialPreviewDebuggerProps> = ({
  initialPath = '/',
  onNavigatePath,
}) => {
  const { isFa, direction } = useLanguage();
  const isRtl = direction === 'rtl';

  // Selected route state
  const [selectedPath, setSelectedPath] = useState<string>(initialPath);
  const [customPathInput, setCustomPathInput] = useState<string>('');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);

  // Active preview tab: 'linkedin' | 'twitter' | 'whatsapp' | 'canvas'
  const [activePlatform, setActivePlatform] = useState<'linkedin' | 'twitter' | 'whatsapp' | 'canvas'>('linkedin');

  // Display mode: 'fit' | 'native'
  const [zoomMode, setZoomMode] = useState<'fit' | 'native'>('fit');

  // Copy feedbacks
  const [copiedType, setCopiedType] = useState<string | null>(null);

  // Cache buster timestamp
  const [cacheBuster, setCacheBuster] = useState<number>(Date.now());

  // Resolved metadata for current path
  const currentMeta: PageMeta = useMemo(() => {
    const pathToResolve = isCustomMode && customPathInput ? customPathInput : selectedPath;
    return resolveMetaForPath(pathToResolve);
  }, [selectedPath, customPathInput, isCustomMode]);

  // Image URL with optional cache busting
  const previewImageUrl = useMemo(() => {
    if (!currentMeta.ogImage) return '';
    return currentMeta.ogImage;
  }, [currentMeta.ogImage]);

  // Live test link with cache buster
  const testUrlWithCacheBuster = useMemo(() => {
    return `${currentMeta.canonicalUrl}?v=${cacheBuster}`;
  }, [currentMeta.canonicalUrl, cacheBuster]);

  // Copy helper
  const handleCopy = (text: string, type: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2200);
    }
  };

  // Grouped route options for selector
  const routeOptions = useMemo(() => {
    return Object.entries(ROUTE_METADATA).map(([path, meta]) => ({
      path,
      label: meta.label || path,
      category: meta.category || 'Core',
      meta,
    }));
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    routeOptions.forEach(opt => set.add(opt.category));
    return Array.from(set);
  }, [routeOptions]);

  // Raw HTML snippet for copy
  const rawHtmlSnippet = useMemo(() => {
    return `<!-- OpenGraph / Facebook / LinkedIn / WhatsApp -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${currentMeta.canonicalUrl}" />
<meta property="og:title" content="${currentMeta.title}" />
<meta property="og:description" content="${currentMeta.description}" />
<meta property="og:image" content="${currentMeta.ogImage}" />
<meta property="og:image:secure_url" content="${currentMeta.ogImage}" />
<meta property="og:image:type" content="${currentMeta.ogImage.endsWith('.jpg') ? 'image/jpeg' : 'image/png'}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:locale" content="en_US" />
<meta property="og:locale:alternate" content="fa_IR" />

<!-- Twitter / X Cards -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content="${currentMeta.canonicalUrl}" />
<meta name="twitter:title" content="${currentMeta.title}" />
<meta name="twitter:description" content="${currentMeta.description}" />
<meta name="twitter:image" content="${currentMeta.ogImage}" />

<!-- Canonical -->
<link rel="canonical" href="${currentMeta.canonicalUrl}" />`;
  }, [currentMeta]);

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 py-6 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Title & Status Bar */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="p-2 rounded-xl bg-primary/10 dark:bg-secondary/15 text-primary dark:text-secondary">
                  <Share2 className="w-5 h-5" />
                </span>
                <h1 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
                  {isFa ? 'شبیه‌ساز و عیب‌یاب پیش‌نمایش شبکه‌های اجتماعی (OpenGraph & Twitter)' : 'Social Share & OpenGraph Preview Simulator'}
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {isFa 
                  ? 'نمایش واقعی کارت‌های اشتراک لینک در اندازه استاندارد ۱۲۰۰×۶۳۰ پیکسل برای لینکدین، توییتر/X و پیام‌رسان‌ها به همراه اعتبارسنجی متاتگ‌های سئو'
                  : 'Realistic 1200×630px social media card rendering and live metadata validation engine across LinkedIn, X (Twitter), and messaging platforms.'}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setCacheBuster(Date.now())}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                title={isFa ? 'تولید شناسه جدید برای بازنشانی کش سرورها' : 'Refresh cache-buster timestamp'}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{isFa ? 'تولید شناسه کش جدید' : 'Bust Cache'}</span>
              </button>

              <button
                onClick={() => handleCopy(rawHtmlSnippet, 'html')}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-primary/10 hover:bg-primary/20 text-primary dark:text-secondary dark:hover:bg-secondary/20 transition-colors"
              >
                {copiedType === 'html' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedType === 'html' ? (isFa ? 'کپی شد!' : 'Copied!') : (isFa ? 'کپی کدهای HTML' : 'Copy Meta Tags')}</span>
              </button>
            </div>
          </div>

          {/* Route Selector Bar */}
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80 flex flex-col md:flex-row items-stretch md:items-center gap-3">
            <div className="flex-1 min-w-0">
              <label htmlFor="route-picker" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                {isFa ? 'انتخاب صفحه یا مسیر جهت بررسی پیش‌نمایش:' : 'Select Route or Page to Inspect:'}
              </label>
              <div className="relative">
                <select
                  id="route-picker"
                  value={selectedPath}
                  onChange={(e) => {
                    setSelectedPath(e.target.value);
                    setIsCustomMode(false);
                    if (onNavigatePath) onNavigatePath(e.target.value);
                  }}
                  className="w-full appearance-none bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary pe-10"
                >
                  {categories.map((category) => (
                    <optgroup key={category} label={category}>
                      {routeOptions
                        .filter((opt) => opt.category === category)
                        .map((opt) => (
                          <option key={opt.path} value={opt.path}>
                            {opt.path} — {opt.label}
                          </option>
                        ))}
                    </optgroup>
                  ))}
                </select>
                <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none text-slate-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Platform Quick Inspector Links */}
            <div className="flex items-end gap-2 shrink-0">
              <a
                href={`https://www.linkedin.com/post-inspector/inspect/${encodeURIComponent(testUrlWithCacheBuster)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                title="LinkedIn Post Inspector"
              >
                <span>LinkedIn Inspector</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>

              <a
                href={`https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(testUrlWithCacheBuster)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                title="Facebook Sharing Debugger"
              >
                <span>FB Debugger</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Platform Simulator Canvas */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          
          {/* Simulator Toolbar */}
          <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-900/50">
            {/* Platform Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-200/60 dark:bg-slate-800 rounded-xl">
              <button
                onClick={() => setActivePlatform('linkedin')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activePlatform === 'linkedin'
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                LinkedIn Feed
              </button>
              <button
                onClick={() => setActivePlatform('twitter')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activePlatform === 'twitter'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                X / Twitter Card
              </button>
              <button
                onClick={() => setActivePlatform('whatsapp')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activePlatform === 'whatsapp'
                    ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                WhatsApp / Telegram
              </button>
              <button
                onClick={() => setActivePlatform('canvas')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activePlatform === 'canvas'
                    ? 'bg-white dark:bg-slate-900 text-primary dark:text-secondary shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                1200×630 Canvas Audit
              </button>
            </div>

            {/* Zoom / View Mode Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 hidden sm:inline">
                {isFa ? 'حالت نمایش:' : 'View Scale:'}
              </span>
              <div className="flex items-center gap-1 p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <button
                  onClick={() => setZoomMode('fit')}
                  className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                    zoomMode === 'fit'
                      ? 'bg-white dark:bg-slate-900 text-primary dark:text-secondary shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                  title={isFa ? 'مقیاس متناسب با صفحه' : 'Fit to container'}
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setZoomMode('native')}
                  className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                    zoomMode === 'native'
                      ? 'bg-white dark:bg-slate-900 text-primary dark:text-secondary shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                  title={isFa ? 'اندازه ۱۰۰٪ واقعی (۱۲۰۰ پیکسل)' : '100% Native 1200px size'}
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Preview Viewport Container */}
          <div className="p-4 sm:p-8 bg-slate-100/70 dark:bg-slate-950/70 overflow-x-auto min-h-[480px] flex items-center justify-center">
            
            {/* PLATFORM 1: LINKEDIN FEED SIMULATION */}
            {activePlatform === 'linkedin' && (
              <div 
                className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg overflow-hidden transition-all duration-200 ${
                  zoomMode === 'native' ? 'w-[1200px] shrink-0' : 'w-full max-w-2xl'
                }`}
                style={{ direction: 'ltr' }}
              >
                {/* LinkedIn Author Header */}
                <div className="p-4 flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg bg-slate-900 p-1 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700 shadow-xs">
                    <img
                      src="/assets/aistudio/kkm-app-icon-preview-v2_2adbeb24.png"
                      alt="KKM Mark"
                      className="w-10 h-10 object-contain rounded"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-slate-900 dark:text-white truncate">
                        KKM International Group
                      </span>
                      <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded font-medium">
                        Promoted
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      Multi-Disciplinary Engineering &amp; Energy Infrastructure &bull; 14,280 followers
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                      <span>1h &bull; Edited</span>
                      <span>&bull;</span>
                      <Globe className="w-3 h-3" />
                    </p>
                  </div>
                </div>

                {/* LinkedIn Post Copy */}
                <div className="px-4 pb-3 text-xs sm:text-sm text-slate-800 dark:text-slate-200 space-y-1">
                  <p>
                    Advancing closed-loop geothermal energy (GMEL), thermal desalination, and resilient infrastructure systems for regional and global industrial transformation.
                  </p>
                </div>

                {/* LinkedIn Link Card (The 1200x630 simulation) */}
                <div className="border-t border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
                  {/* Aspect Ratio 1.91:1 / 1200x630 banner */}
                  <div className="relative w-full aspect-[1.905/1] overflow-hidden bg-slate-900">
                    {previewImageUrl ? (
                      <img
                        src={previewImageUrl}
                        alt={currentMeta.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 text-slate-400 p-6 text-center">
                        <Layers className="w-12 h-12 mb-2 text-slate-500" />
                        <span className="text-xs font-mono">1200 × 630 OG Banner Image Slot</span>
                      </div>
                    )}
                    
                    {/* Dimension Badge */}
                    <div className="absolute top-2.5 start-2.5 bg-black/75 backdrop-blur-sm text-white text-[10px] font-mono px-2 py-0.5 rounded shadow-sm">
                      1200 × 630 &bull; 1.91:1
                    </div>
                  </div>

                  {/* LinkedIn Bottom Text Panel */}
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-900/90 hover:bg-slate-100/70 dark:hover:bg-slate-800/70 transition-colors cursor-pointer">
                    <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 truncate">
                      kkm-intl.org &bull; 3 min read
                    </p>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white line-clamp-2 leading-snug mb-1">
                      {currentMeta.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {currentMeta.description}
                    </p>
                  </div>
                </div>

                {/* LinkedIn Engagement Bar */}
                <div className="p-3 px-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px] font-bold">
                      &bull;
                    </span>
                    <span>428 &bull; 62 comments &bull; 19 reposts</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-semibold">
                    <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span>Like</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      <span>Comment</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                      <Repeat className="w-4 h-4" />
                      <span>Repost</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                      <Send className="w-4 h-4" />
                      <span>Send</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* PLATFORM 2: X (TWITTER) SUMMARY LARGE IMAGE */}
            {activePlatform === 'twitter' && (
              <div 
                className={`bg-white dark:bg-black border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg p-4 sm:p-5 transition-all duration-200 ${
                  zoomMode === 'native' ? 'w-[1200px] shrink-0' : 'w-full max-w-xl'
                }`}
                style={{ direction: 'ltr' }}
              >
                {/* Author row */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-slate-900 p-1 flex items-center justify-center shrink-0 border border-slate-700">
                    <img
                      src="/assets/aistudio/kkm-app-icon-preview-v2_2adbeb24.png"
                      alt="KKM Mark"
                      className="w-8 h-8 object-contain rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-slate-900 dark:text-white truncate">
                        KKM International Group
                      </span>
                      <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold" title="Verified Organization">
                        &#10003;
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        @KKM_Group &bull; 2h
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 mt-1">
                      Explore official specifications, engineering blueprints, and pilot data from KKM International Group. #Geothermal #CleanTech #Infrastructure
                    </p>
                  </div>
                </div>

                {/* Twitter Large Image Summary Card */}
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 transition-colors cursor-pointer bg-slate-50 dark:bg-slate-900/50">
                  <div className="relative w-full aspect-[1.905/1] overflow-hidden bg-slate-900">
                    {previewImageUrl ? (
                      <img
                        src={previewImageUrl}
                        alt={currentMeta.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 text-slate-400">
                        <Layers className="w-10 h-10 mb-2" />
                        <span className="text-xs font-mono">1200×630 Large Card</span>
                      </div>
                    )}
                    <div className="absolute bottom-2.5 start-2.5 bg-black/80 backdrop-blur-sm text-white text-[10px] font-mono px-2 py-0.5 rounded">
                      kkm-intl.org
                    </div>
                  </div>

                  <div className="p-3.5 space-y-1">
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate font-mono">
                      {currentMeta.canonicalUrl.replace('https://', '')}
                    </p>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                      {currentMeta.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {currentMeta.description}
                    </p>
                  </div>
                </div>

                {/* Twitter Metric Bar */}
                <div className="mt-3.5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-2">
                  <span className="hover:text-blue-500 flex items-center gap-1 cursor-pointer">
                    <MessageSquare className="w-4 h-4" /> 24
                  </span>
                  <span className="hover:text-green-500 flex items-center gap-1 cursor-pointer">
                    <Repeat className="w-4 h-4" /> 18
                  </span>
                  <span className="hover:text-pink-500 flex items-center gap-1 cursor-pointer">
                    <Heart className="w-4 h-4" /> 194
                  </span>
                  <span className="hover:text-blue-500 flex items-center gap-1 cursor-pointer">
                    <Bookmark className="w-4 h-4" /> 42
                  </span>
                  <span className="hover:text-blue-500 flex items-center gap-1 cursor-pointer">
                    <Share2 className="w-4 h-4" />
                  </span>
                </div>
              </div>
            )}

            {/* PLATFORM 3: WHATSAPP / TELEGRAM CHAT UNURL SIMULATION */}
            {activePlatform === 'whatsapp' && (
              <div 
                className={`bg-[#e5ddd5] dark:bg-[#0b141a] p-4 sm:p-6 rounded-2xl shadow-inner transition-all duration-200 ${
                  zoomMode === 'native' ? 'w-[1200px] shrink-0' : 'w-full max-w-md'
                }`}
                style={{ direction: 'ltr' }}
              >
                {/* Chat Bubble */}
                <div className="bg-white dark:bg-[#1f2c34] rounded-2xl rounded-tl-xs p-2.5 shadow-md border border-slate-200/50 dark:border-slate-800 space-y-2">
                  <p className="text-xs text-blue-600 dark:text-blue-400 break-all px-1">
                    {currentMeta.canonicalUrl}
                  </p>

                  {/* Card Container */}
                  <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700/60 bg-slate-50 dark:bg-[#111b21]">
                    <div className="relative w-full aspect-[1.905/1] overflow-hidden bg-slate-900">
                      {previewImageUrl ? (
                        <img
                          src={previewImageUrl}
                          alt={currentMeta.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-400 text-xs">
                          1200×630
                        </div>
                      )}
                    </div>
                    <div className="p-3 space-y-1">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-2">
                        {currentMeta.title}
                      </h4>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2">
                        {currentMeta.description}
                      </p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-mono pt-1">
                        kkm-intl.org
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-1 text-[10px] text-slate-400 pe-1">
                    <span>12:45 PM</span>
                    <span className="text-blue-500 font-bold">&#10003;&#10003;</span>
                  </div>
                </div>
              </div>
            )}

            {/* PLATFORM 4: 1200x630 PIXEL-ACCURATE CANVAS AUDIT */}
            {activePlatform === 'canvas' && (
              <div 
                className={`bg-slate-900 rounded-2xl p-4 sm:p-6 shadow-2xl border border-slate-800 transition-all duration-200 ${
                  zoomMode === 'native' ? 'w-[1240px] shrink-0' : 'w-full max-w-4xl'
                }`}
                style={{ direction: 'ltr' }}
              >
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3 px-1">
                  <span>CANVAS DIMENSION: 1200px &times; 630px</span>
                  <span>ASPECT RATIO: 1.905:1 (Standard OpenGraph)</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>HTTPS Verified</span>
                  </span>
                </div>

                <div className="relative w-full aspect-[1.905/1] rounded-xl overflow-hidden border-2 border-dashed border-primary/60 bg-black">
                  {previewImageUrl ? (
                    <img
                      src={previewImageUrl}
                      alt={currentMeta.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      No Image Configured
                    </div>
                  )}

                  {/* Safe Zone Grid Overlay */}
                  <div className="absolute inset-0 pointer-events-none border border-emerald-500/30">
                    {/* Centered Safe Zone Box (1000x525 safe area) */}
                    <div className="absolute inset-[8.33%] border border-dashed border-amber-400/40 rounded flex flex-col justify-between p-2">
                      <span className="text-[9px] font-mono text-amber-300/80 bg-black/60 px-1 py-0.5 rounded self-start">
                        Mobile Safe Zone (Crucial Content Area)
                      </span>
                      <span className="text-[9px] font-mono text-amber-300/80 bg-black/60 px-1 py-0.5 rounded self-end">
                        1000 &times; 525 Safe Area
                      </span>
                    </div>

                    {/* Center Crosshair */}
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-white/20 -translate-y-1/2" />
                    <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20 -translate-x-1/2" />
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono">
                  <div className="p-2 rounded-lg bg-slate-800/80 text-slate-300">
                    <div className="text-[10px] text-slate-400 uppercase">Width</div>
                    <div className="font-bold text-white">1200 px</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-800/80 text-slate-300">
                    <div className="text-[10px] text-slate-400 uppercase">Height</div>
                    <div className="font-bold text-white">630 px</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-800/80 text-slate-300">
                    <div className="text-[10px] text-slate-400 uppercase">Format</div>
                    <div className="font-bold text-white">{previewImageUrl.endsWith('.png') ? 'PNG' : 'JPEG'}</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-800/80 text-slate-300">
                    <div className="text-[10px] text-slate-400 uppercase">Crawler Status</div>
                    <div className="font-bold text-emerald-400">Prerender Ready</div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Detailed Metadata Audit Matrix Table */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {isFa ? 'جدول بررسی دقیق متاتگ‌های سئو و OpenGraph' : 'OpenGraph & SEO Metadata Verification Matrix'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isFa 
                  ? 'بررسی متاتگ‌های تزریق‌شده در سرور برای کراولر تلگرام، واتساپ، فیسبوک، لینکدین و گوگل'
                  : 'Live audit of tags injected into initial HTML headers for search engine and crawler validation.'}
              </p>
            </div>
            <button
              onClick={() => handleCopy(testUrlWithCacheBuster, 'url')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
            >
              {copiedType === 'url' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedType === 'url' ? (isFa ? 'کپی شد!' : 'Copied!') : (isFa ? 'کپی لینک تست' : 'Copy Test URL')}</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-start" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3 px-4 text-start font-mono">{isFa ? 'ویژگی متاتگ' : 'Property / Tag'}</th>
                  <th className="py-3 px-4 text-start">{isFa ? 'محتوای مقداردهی‌شده' : 'Current Value'}</th>
                  <th className="py-3 px-4 text-start font-mono">{isFa ? 'طول کاراکتر / وضعیت' : 'Status / Target'}</th>
                  <th className="py-3 px-4 text-center">{isFa ? 'عملیات' : 'Action'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                
                {/* og:title */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-mono font-semibold text-primary dark:text-secondary whitespace-nowrap">
                    og:title
                  </td>
                  <td className="py-3 px-4 max-w-md font-medium text-slate-900 dark:text-white">
                    {currentMeta.title}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded ${
                      currentMeta.title.length <= 70 
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                    }`}>
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{currentMeta.title.length} chars (Optimal 40-70)</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleCopy(currentMeta.title, 'og:title')}
                      className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500"
                      title="Copy og:title"
                    >
                      {copiedType === 'og:title' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </td>
                </tr>

                {/* og:description */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-mono font-semibold text-primary dark:text-secondary whitespace-nowrap">
                    og:description
                  </td>
                  <td className="py-3 px-4 max-w-md text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    {currentMeta.description}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded ${
                      currentMeta.description.length <= 165
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                    }`}>
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{currentMeta.description.length} chars (Optimal 120-160)</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleCopy(currentMeta.description, 'og:desc')}
                      className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500"
                      title="Copy og:description"
                    >
                      {copiedType === 'og:desc' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </td>
                </tr>

                {/* og:image */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-mono font-semibold text-primary dark:text-secondary whitespace-nowrap">
                    og:image (1200x630)
                  </td>
                  <td className="py-3 px-4 max-w-md font-mono text-xs text-slate-600 dark:text-slate-400 truncate">
                    {currentMeta.ogImage}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>1200 &times; 630 &bull; HTTPS</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleCopy(currentMeta.ogImage, 'og:image')}
                      className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500"
                      title="Copy og:image URL"
                    >
                      {copiedType === 'og:image' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </td>
                </tr>

                {/* canonical & og:url */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-mono font-semibold text-primary dark:text-secondary whitespace-nowrap">
                    canonical / og:url
                  </td>
                  <td className="py-3 px-4 max-w-md font-mono text-xs text-slate-600 dark:text-slate-400 truncate">
                    {currentMeta.canonicalUrl}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Canonical Absolute</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleCopy(currentMeta.canonicalUrl, 'canonical')}
                      className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500"
                      title="Copy Canonical URL"
                    >
                      {copiedType === 'canonical' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </td>
                </tr>

                {/* twitter:card */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-mono font-semibold text-primary dark:text-secondary whitespace-nowrap">
                    twitter:card
                  </td>
                  <td className="py-3 px-4 max-w-md font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
                    summary_large_image
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Large Visual Showcase</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleCopy('summary_large_image', 'twitter:card')}
                      className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500"
                      title="Copy Twitter card type"
                    >
                      {copiedType === 'twitter:card' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </td>
                </tr>

                {/* og:locale */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-mono font-semibold text-primary dark:text-secondary whitespace-nowrap">
                    og:locale / alternate
                  </td>
                  <td className="py-3 px-4 max-w-md font-mono text-xs text-slate-800 dark:text-slate-200">
                    en_US &bull; fa_IR
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Bilingual Auto-Detect</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleCopy('en_US, fa_IR', 'og:locale')}
                      className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500"
                      title="Copy locale codes"
                    >
                      {copiedType === 'og:locale' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

        {/* Crawler Instructions & Debugging Guide */}
        <div className="bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary dark:text-secondary" />
            <span>{isFa ? 'نکات مهم عیب‌یابی و پاک‌سازی کش در شبکه‌های اجتماعی:' : 'Social Crawler Cache Refresh Guidance:'}</span>
          </h3>
          <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-disc list-inside">
            <li>
              <strong>Telegram &amp; WhatsApp:</strong> {isFa ? 'پس از اولین اشتراک‌گذاری، پیش‌نمایش در سرورهای تلگرام و واتساپ کش می‌شود. برای دیدن تغییرات، از پارامتر شناسه کش مانند ' : 'Previews are cached heavily after the first share. Use query params like '} <code className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono">?v=2</code> {isFa ? 'استفاده کنید.' : 'to force Telegram/WhatsApp to re-scrape.'}
            </li>
            <li>
              <strong>LinkedIn Post Inspector:</strong> {isFa ? 'برای رفرش آنی لینک در لینکدین، لینک بالا را در Post Inspector وارد کنید تا کش کلیر شود.' : 'Use LinkedIn Post Inspector to purge and refresh LinkedIn card cache instantly.'}
            </li>
            <li>
              <strong>Facebook Sharing Debugger:</strong> {isFa ? 'دکمه Scrape Again را در فیسبوک دیباگر بزنید تا تصویر جدید ثبت شود.' : 'Click "Scrape Again" in Facebook Sharing Debugger to register updated 1200x630 cards.'}
            </li>
            <li>
              <strong>Server-Side Prerendering:</strong> {isFa ? 'تمامی تگ‌های بالا توسط سرویس سرور KKM در اولین بایت HTML تزریق شده و برای کراولرها بدون نیاز به اجرای جاوااسکریپت در دسترس هستند.' : 'All tags are injected by KKM backend engine directly into initial HTML responses, ensuring instant rendering for all bots.'}
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};
