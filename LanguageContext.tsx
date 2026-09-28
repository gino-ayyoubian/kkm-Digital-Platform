import * as React from 'react';
import { translations } from './translations';
import type { TranslationKey } from './translations';

export type Language = 'EN' | 'FA' | 'KU' | 'AR' | 'RU';
type Direction = 'ltr' | 'rtl';

export interface LanguageInfo {
  code: Language;
  label: string;
  nativeName: string;
  direction: Direction;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'EN', label: 'English', nativeName: 'English', direction: 'ltr', flag: '🇬🇧' },
  { code: 'FA', label: 'Persian', nativeName: 'فارسی', direction: 'rtl', flag: '🇮🇷' },
  { code: 'AR', label: 'Arabic', nativeName: 'العربية', direction: 'rtl', flag: '🇦🇪' },
  { code: 'KU', label: 'Kurdish', nativeName: 'کوردی', direction: 'rtl', flag: '☀️' },
  { code: 'RU', label: 'Russian', nativeName: 'Русский', direction: 'ltr', flag: '🇷🇺' },
];

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey, options?: { [key: string]: string | number }) => string;
  direction: Direction;
  isFa: boolean;
  availableLanguages: LanguageInfo[];
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = React.useState<Language>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = window.localStorage.getItem('kkm_language');
        if (saved && ['EN', 'FA', 'KU', 'AR', 'RU'].includes(saved)) {
          return saved as Language;
        }
      } catch (_) {}
    }
    return 'EN';
  });

  const direction: Direction = ['FA', 'AR', 'KU'].includes(language) ? 'rtl' : 'ltr';
  const isFa = language === 'FA';

  const setLanguage = React.useCallback((newLang: Language) => {
    setLanguageState(newLang);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem('kkm_language', newLang);
      } catch (_) {}
    }
  }, []);

  const toggleLanguage = React.useCallback(() => {
    setLanguageState((prevLang: Language) => {
      const nextLang: Language = prevLang === 'EN' ? 'FA' : 'EN';
      if (typeof window !== 'undefined') {
        try {
          window.localStorage.setItem('kkm_language', nextLang);
        } catch (_) {}
      }
      return nextLang;
    });
  }, []);

  // Synchronize document direction and lang attribute whenever language changes
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.dir = direction;
      const langCodes: Record<Language, string> = {
        EN: 'en',
        FA: 'fa',
        AR: 'ar',
        KU: 'ku',
        RU: 'ru',
      };
      document.documentElement.lang = langCodes[language] || 'en';
    }
  }, [language, direction]);

  const t = React.useCallback((key: TranslationKey, options?: { [key: string]: string | number }): string => {
    const langTranslations = translations[language];
    const fallbackTranslations = translations['EN'];

    // Safe access using optional chaining and nullish coalescing
    const text = langTranslations?.[key] ?? fallbackTranslations?.[key] ?? key;
    
    if (options) {
        let processedText = text;
        Object.keys(options).forEach(placeholder => {
            processedText = processedText.replace(`{{${placeholder}}}`, String(options[placeholder]));
        });
        return processedText;
    }
    return text;
  }, [language]);

  const value = React.useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t,
      direction,
      isFa,
      availableLanguages: SUPPORTED_LANGUAGES,
    }),
    [language, setLanguage, toggleLanguage, t, direction, isFa]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};