import React, { useState, useEffect, useCallback, useRef } from 'react';
import { runAccessibilityAudit, logA11yViolationsToConsole } from '../utils/a11yChecker';
import type { A11yAuditResult, ContrastViolation, FocusViolation } from '../utils/a11yChecker';

declare global {
  interface Window {
    __toggleA11yOverlay?: () => void;
    __runA11yAudit?: () => A11yAuditResult;
  }
}

export const A11yDebugOverlay: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.has('a11y') || urlParams.has('debug_a11y') || (() => { try { return window.localStorage.getItem('kkm_a11y_overlay') === 'true'; } catch(e) { return false; } })();
  });

  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'all' | 'contrast' | 'focus'>('all');
  const [highlightInPage, setHighlightInPage] = useState<boolean>(false);
  const [auditResult, setAuditResult] = useState<A11yAuditResult | null>(null);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  // Run audit and optionally log to console
  const executeAudit = useCallback((logToConsole: boolean = false) => {
    // Wait for DOM paint
    setTimeout(() => {
      const res = runAccessibilityAudit();
      setAuditResult(res);
      if (logToConsole) {
        logA11yViolationsToConsole(res);
      }
    }, 100);
  }, []);

  // Keyboard shortcut listener: Alt + Shift + A or Ctrl + Shift + A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey || e.ctrlKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsOpen(prev => {
          const next = !prev;
          try { window.localStorage.setItem('kkm_a11y_overlay', next ? 'true' : 'false'); } catch(e) {}
          if (next) {
            executeAudit(true);
          }
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Global console hooks
    window.__toggleA11yOverlay = () => {
      setIsOpen(prev => {
        const next = !prev;
        try { window.localStorage.setItem('kkm_a11y_overlay', next ? 'true' : 'false'); } catch(e) {}
        if (next) executeAudit(true);
        return next;
      });
    };

    window.__runA11yAudit = () => {
      const res = runAccessibilityAudit();
      logA11yViolationsToConsole(res);
      setAuditResult(res);
      return res;
    };

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      delete window.__toggleA11yOverlay;
      delete window.__runA11yAudit;
    };
  }, [executeAudit]);

  // Initial audit when opened
  useEffect(() => {
    if (isOpen) {
      executeAudit(true);
    }
  }, [isOpen, executeAudit]);

  // Apply visual highlight rings directly onto violating elements
  useEffect(() => {
    if (!highlightInPage || !auditResult) {
      // Remove any existing highlight classes
      document.querySelectorAll('.a11y-debug-highlight-contrast, .a11y-debug-highlight-focus').forEach(el => {
        el.classList.remove('a11y-debug-highlight-contrast', 'a11y-debug-highlight-focus');
      });
      return;
    }

    // Apply contrast highlights
    auditResult.contrastViolations.forEach(v => {
      v.element.classList.add('a11y-debug-highlight-contrast');
    });

    // Apply focusability highlights
    auditResult.focusViolations.forEach(v => {
      v.element.classList.add('a11y-debug-highlight-focus');
    });

    return () => {
      document.querySelectorAll('.a11y-debug-highlight-contrast, .a11y-debug-highlight-focus').forEach(el => {
        el.classList.remove('a11y-debug-highlight-contrast', 'a11y-debug-highlight-focus');
      });
    };
  }, [highlightInPage, auditResult]);

  // Scroll to element & flash
  const handleScrollToElement = (el: HTMLElement, id: string) => {
    setHighlightedId(id);
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Add pulse ring
    const origOutline = el.style.outline;
    const origTransition = el.style.transition;
    el.style.transition = 'all 0.3s ease';
    el.style.outline = '4px solid #f43f5e';
    el.style.outlineOffset = '3px';

    setTimeout(() => {
      el.style.outline = origOutline;
      el.style.transition = origTransition;
      setHighlightedId(null);
    }, 2000);
  };

  if (!isOpen) return null;

  const contrastCount = auditResult?.contrastViolations.length || 0;
  const focusCount = auditResult?.focusViolations.length || 0;
  const totalViolations = contrastCount + focusCount;

  return (
    <>
      {/* Global CSS for in-page visual highlights */}
      <style>{`
        .a11y-debug-highlight-contrast {
          outline: 2px dashed #ef4444 !important;
          outline-offset: 2px !important;
          background-color: rgba(239, 68, 68, 0.08) !important;
        }
        .a11y-debug-highlight-focus {
          outline: 2px dotted #f59e0b !important;
          outline-offset: 2px !important;
          background-color: rgba(245, 158, 11, 0.08) !important;
        }
      `}</style>

      {/* Floating A11y HUD Panel */}
      <aside
        id="a11y-debug-overlay-panel"
        aria-label="Accessibility Diagnostic Debugger"
        className={`fixed bottom-5 right-5 z-[99999] bg-slate-900/95 text-slate-100 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-700/80 transition-all duration-200 font-sans ${
          isMinimized ? 'w-auto' : 'w-[420px] max-w-[calc(100vw-40px)] max-h-[85vh] flex flex-col'
        }`}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950/60 rounded-t-2xl">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${totalViolations === 0 ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${totalViolations === 0 ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
            </span>
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold tracking-wide">
              <span>♿ A11Y DEBUG OVERLAY</span>
              {auditResult && (
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${auditResult.score >= 90 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                  {auditResult.score}%
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <button
              type="button"
              onClick={() => setIsMinimized(!isMinimized)}
              aria-label={isMinimized ? 'Expand overlay' : 'Minimize overlay'}
              className="p-1 rounded hover:bg-slate-800 hover:text-white transition-colors"
              title={isMinimized ? 'Expand' : 'Minimize'}
            >
              {isMinimized ? '⤢' : '—'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                try { window.localStorage.setItem('kkm_a11y_overlay', 'false'); } catch(e) {}
              }}
              aria-label="Close accessibility debug overlay"
              className="p-1 rounded hover:bg-rose-900/60 hover:text-white transition-colors"
              title="Close (Press Alt+Shift+A to reopen)"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Minimized Quick Badge */}
        {isMinimized && (
          <div className="p-3 text-xs flex items-center gap-3">
            <span className="font-mono text-slate-300">
              Violations: <strong className={totalViolations > 0 ? 'text-amber-400' : 'text-emerald-400'}>{totalViolations}</strong>
            </span>
            <button
              type="button"
              onClick={() => executeAudit(true)}
              className="px-2 py-1 bg-primary text-white rounded text-[11px] font-bold hover:bg-secondary hover:text-slate-950 transition-colors"
            >
              🔄 Re-Audit
            </button>
          </div>
        )}

        {/* Full Overlay Content */}
        {!isMinimized && (
          <>
            {/* Top Metrics Row */}
            <div className="p-3 grid grid-cols-3 gap-2 bg-slate-950/40 text-center border-b border-slate-800 text-xs">
              <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
                <div className="text-[10px] uppercase text-slate-400 font-semibold">Contrast</div>
                <div className={`text-base font-bold font-mono ${contrastCount > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {contrastCount > 0 ? `${contrastCount} Issues` : 'Passed'}
                </div>
              </div>

              <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
                <div className="text-[10px] uppercase text-slate-400 font-semibold">Tab Focus</div>
                <div className={`text-base font-bold font-mono ${focusCount > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {focusCount > 0 ? `${focusCount} Issues` : 'Passed'}
                </div>
              </div>

              <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
                <div className="text-[10px] uppercase text-slate-400 font-semibold">Scanned</div>
                <div className="text-base font-bold font-mono text-cyan-400">
                  {auditResult?.totalElementsScanned || 0}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="p-3 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => executeAudit(true)}
                  className="px-2.5 py-1.5 bg-primary hover:bg-secondary hover:text-slate-950 text-white rounded-lg font-bold transition-all shadow-sm flex items-center gap-1"
                >
                  <span>🔄</span> Re-Audit
                </button>
                <button
                  type="button"
                  onClick={() => auditResult && logA11yViolationsToConsole(auditResult)}
                  className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-semibold transition-all border border-slate-700 flex items-center gap-1"
                  title="Output formatted violation tables to DevTools Console"
                >
                  <span>📋</span> Log Console
                </button>
              </div>

              <label className="flex items-center gap-1.5 cursor-pointer select-none text-[11px] text-slate-300">
                <input
                  type="checkbox"
                  checked={highlightInPage}
                  onChange={(e) => setHighlightInPage(e.target.checked)}
                  className="rounded bg-slate-800 border-slate-700 text-primary focus:ring-0 cursor-pointer"
                />
                <span>Highlight in page</span>
              </label>
            </div>

            {/* Filter Tabs */}
            <div className="flex px-3 pt-2 border-b border-slate-800 gap-1 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-t-lg font-semibold border-b-2 transition-colors ${
                  activeTab === 'all'
                    ? 'border-secondary text-secondary bg-slate-800/60'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                All ({totalViolations})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('contrast')}
                className={`px-3 py-1.5 rounded-t-lg font-semibold border-b-2 transition-colors ${
                  activeTab === 'contrast'
                    ? 'border-rose-400 text-rose-300 bg-slate-800/60'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Contrast ({contrastCount})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('focus')}
                className={`px-3 py-1.5 rounded-t-lg font-semibold border-b-2 transition-colors ${
                  activeTab === 'focus'
                    ? 'border-amber-400 text-amber-300 bg-slate-800/60'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Focus ({focusCount})
              </button>
            </div>

            {/* Violations List (Scrollable) */}
            <div className="overflow-y-auto p-3 space-y-2.5 flex-grow text-xs max-h-[420px] custom-scrollbar">
              {totalViolations === 0 ? (
                <div className="p-6 text-center text-slate-400 space-y-2">
                  <div className="text-3xl">🎉</div>
                  <div className="font-bold text-white text-sm">No Accessibility Violations Found!</div>
                  <p className="text-[11px] leading-relaxed">
                    All audited elements pass WCAG AA color contrast (4.5:1 / 3:1) and all interactive controls have valid accessible names and tab navigation semantics.
                  </p>
                </div>
              ) : (
                <>
                  {/* Contrast Violations */}
                  {(activeTab === 'all' || activeTab === 'contrast') &&
                    auditResult?.contrastViolations.map((v) => (
                      <div
                        key={v.id}
                        className={`p-2.5 rounded-xl border transition-all ${
                          highlightedId === v.id
                            ? 'border-rose-500 bg-rose-950/40 ring-2 ring-rose-500/50'
                            : 'border-rose-900/40 bg-slate-950/60 hover:border-rose-700/60'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="font-mono text-[11px] text-rose-400 font-bold truncate max-w-[240px]">
                            {v.selector}
                          </div>
                          <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-mono font-bold whitespace-nowrap">
                            {v.contrastRatio}:1 (req {v.requiredRatio}:1)
                          </span>
                        </div>

                        <div className="text-slate-300 text-[11px] mt-1 font-medium italic truncate">
                          "{v.textSnippet || '<Text Content>'}"
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 pt-1.5 border-t border-slate-800/80">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1">
                              <span className="w-2.5 h-2.5 rounded border border-slate-600" style={{ backgroundColor: v.textColor }} />
                              <span>{v.textColor}</span>
                            </span>
                            <span>on</span>
                            <span className="inline-flex items-center gap-1">
                              <span className="w-2.5 h-2.5 rounded border border-slate-600" style={{ backgroundColor: v.bgColor }} />
                              <span>{v.bgColor}</span>
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleScrollToElement(v.element, v.id)}
                            className="text-cyan-400 hover:text-cyan-300 font-bold hover:underline"
                          >
                            Find ↗
                          </button>
                        </div>
                      </div>
                    ))}

                  {/* Focus Violations */}
                  {(activeTab === 'all' || activeTab === 'focus') &&
                    auditResult?.focusViolations.map((v) => (
                      <div
                        key={v.id}
                        className={`p-2.5 rounded-xl border transition-all ${
                          highlightedId === v.id
                            ? 'border-amber-500 bg-amber-950/40 ring-2 ring-amber-500/50'
                            : 'border-amber-900/40 bg-slate-950/60 hover:border-amber-700/60'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="font-mono text-[11px] text-amber-400 font-bold truncate max-w-[240px]">
                            {v.selector}
                          </div>
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase whitespace-nowrap ${
                              v.severity === 'error' ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                            }`}
                          >
                            {v.type.replace(/-/g, ' ')}
                          </span>
                        </div>

                        <div className="text-slate-300 text-[11px] mt-1 leading-snug">
                          {v.message}
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 pt-1.5 border-t border-slate-800/80">
                          <span className="font-mono">tabIndex: {v.tabIndex}</span>
                          <button
                            type="button"
                            onClick={() => handleScrollToElement(v.element, v.id)}
                            className="text-cyan-400 hover:text-cyan-300 font-bold hover:underline"
                          >
                            Find ↗
                          </button>
                        </div>
                      </div>
                    ))}
                </>
              )}
            </div>

            {/* Footer Shortcut Helper */}
            <div className="p-2.5 bg-slate-950 text-slate-400 text-[10px] border-t border-slate-800 flex items-center justify-between rounded-b-2xl">
              <span>Shortcut: <kbd className="px-1 py-0.5 bg-slate-800 text-slate-300 rounded font-mono border border-slate-700">Alt+Shift+A</kbd></span>
              <span className="font-mono text-slate-500">KKM DevSecOps / EAOS</span>
            </div>
          </>
        )}
      </aside>
    </>
  );
};

export default A11yDebugOverlay;
