export const trackPageView = (page: string, url: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'page_view', {
            page_title: page,
            page_location: url,
            page_path: url,
        });
        
        // Special Engagement Events
        if (page === 'Technology' || page === 'Core Technologies') {
             (window as any).gtag('event', 'technology_page_engagement', { page });
        }
        if (page === 'Exhibition' || page === 'Rural & Nomadic Development') {
             (window as any).gtag('event', 'rural_page_engagement', { page });
        }
    }
};

export const trackConversion = (eventName: string, params: object = {}) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', eventName, params);
    }
    console.log(`[Analytics Tracked] ${eventName}`, params);
};

export const trackFormSubmission = (formId: string, leadCategory: string, utmParams: Record<string, string>) => {
    trackConversion('form_submission', {
        form_id: formId,
        lead_category: leadCategory,
        ...utmParams
    });
};

export const trackDownload = (documentName: string, documentVersion: string) => {
    trackConversion('file_download', {
        file_name: documentName,
        file_version: documentVersion
    });
};

export const trackCTA = (ctaName: string, destination: string) => {
    trackConversion('cta_click', {
        cta_name: ctaName,
        destination: destination
    });
};

export const parseUTMParams = (): Record<string, string> => {
    if (typeof window === 'undefined') return {};
    const params = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    if (params.has('utm_source')) utm.utm_source = params.get('utm_source')!;
    if (params.has('utm_medium')) utm.utm_medium = params.get('utm_medium')!;
    if (params.has('utm_campaign')) utm.utm_campaign = params.get('utm_campaign')!;
    
    
    // Store in localStorage for form submissions
    if (Object.keys(utm).length > 0) {
        try {
            window.localStorage.setItem('kkm_utm', JSON.stringify(utm));
        } catch (e) {
            console.warn('LocalStorage is disabled or restricted:', e);
        }
        
        if (utm.utm_medium === 'qr') {
             trackConversion('qr_scan', utm);
        }
    }
    
    let stored = null;
    try {
        stored = window.localStorage.getItem('kkm_utm');
    } catch (e) {
        console.warn('LocalStorage is disabled or restricted:', e);
    }

    if (!stored) {
        return utm;
    }

    try {
        return JSON.parse(stored);
    } catch (e) {
        console.warn('Invalid stored UTM payload; resetting local copy.', e);
        try {
            window.localStorage.removeItem('kkm_utm');
        } catch {
            // ignore localStorage cleanup failures
        }
        return utm;
    }

};
