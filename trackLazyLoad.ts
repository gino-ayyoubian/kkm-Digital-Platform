import { perf } from './firebase';
import { trace } from 'firebase/performance';

export const trackLazyLoad = (name: string, importFunc: () => Promise<any>) => {
  return async () => {
    if (!perf) return importFunc();
    
    const lazyLoadTrace = trace(perf, `lazy_load_${name}`);
    lazyLoadTrace.start();
    try {
      const result = await importFunc();
      lazyLoadTrace.stop();
      return result;
    } catch (error) {
      lazyLoadTrace.putAttribute('error', 'true');
      lazyLoadTrace.stop();
      throw error;
    }
  };
};
