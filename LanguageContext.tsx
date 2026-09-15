import * as React from 'react';
import { translations } from './translations';
import type { TranslationKey } from './translations';

export type Language = 'EN' | 'FA' | 'KU' | 'AR';
type Direction = 'ltr' | 'rtl';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey, options?: { [key: string]: string | number }) => string;
  direction: Direction;
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = React.useState<Language>('EN');

  const direction: Direction = ['FA', 'AR', 'KU'].includes(language) ? 'rtl' : 'ltr';

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

  const value = React.useMemo(() => ({ language, setLanguage, t, direction }), [language, t, direction]);

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