import { useLanguage } from '../LanguageContext';
import { useCallback } from 'react';

export const useFormatters = () => {
    const { language } = useLanguage();

    const formatCurrency = useCallback((value: number, currency = 'USD') => {
        return new Intl.NumberFormat(language === 'FA' ? 'fa-IR' : 'en-US', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 0
        }).format(value);
    }, [language]);

    const formatLargeMetric = useCallback((value: number, unit?: string) => {
        const formatted = new Intl.NumberFormat(language === 'FA' ? 'fa-IR' : 'en-US', {
            maximumFractionDigits: 2,
            notation: value > 1000000 ? "compact" : "standard",
            compactDisplay: "short"
        }).format(value);
        
        return unit ? `${formatted} ${unit}` : formatted;
    }, [language]);

    return { formatCurrency, formatLargeMetric };
};
