import { perf } from './firebase';
import { trace } from 'firebase/performance';

/**
 * Retries dynamic module imports to gracefully handle network drops,
 * Vite development server updates, and temporary chunk hash mismatches.
 */
async function retryImport<T>(
  importFunc: () => Promise<T>,
  retriesLeft = 3,
  interval = 350
): Promise<T> {
  try {
    return await importFunc();
  } catch (error: any) {
    const errorMsg = String(error?.message || error || '').toLowerCase();
    const isModuleFailure =
      errorMsg.includes('importing a module script failed') ||
      errorMsg.includes('failed to fetch dynamically imported module') ||
      errorMsg.includes('error loading dynamically imported module') ||
      errorMsg.includes('mime type') ||
      errorMsg.includes('text/html') ||
      errorMsg.includes('load failed') ||
      error?.name === 'TypeError';

    if (retriesLeft > 0 && isModuleFailure) {
      await new Promise((resolve) => setTimeout(resolve, interval));
      return retryImport(importFunc, retriesLeft - 1, interval * 2);
    }

    // If retries are exhausted and this is a module script failure in a browser,
    // trigger a single controlled page reload to fetch the latest module manifest.
    if (typeof window !== 'undefined' && isModuleFailure) {
      try {
        const reloadKey = 'kkm_chunk_retry_ts';
        const lastReload = window.sessionStorage.getItem(reloadKey);
        const now = Date.now();
        if (!lastReload || now - parseInt(lastReload, 10) > 15000) {
          window.sessionStorage.setItem(reloadKey, String(now));
          window.location.reload();
        }
      } catch (_) {
        // Ignore sessionStorage restrictions in private/sandboxed mode
      }
    }

    throw error;
  }
}

export const trackLazyLoad = (name: string, importFunc: () => Promise<any>) => {
  return async () => {
    if (!perf) {
      return retryImport(importFunc);
    }
    
    const lazyLoadTrace = trace(perf, `lazy_load_${name}`);
    lazyLoadTrace.start();
    try {
      const result = await retryImport(importFunc);
      lazyLoadTrace.stop();
      return result;
    } catch (error) {
      lazyLoadTrace.putAttribute('error', 'true');
      lazyLoadTrace.stop();
      throw error;
    }
  };
};

