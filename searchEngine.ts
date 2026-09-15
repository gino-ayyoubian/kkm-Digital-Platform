import { GoogleGenAI } from '@google/genai';
import { Page } from './types';
import type { 
  Project, 
  NewsItem, 
  Innovation, 
  JobOpening, 
  GeminiSearchResult, 
  SearchMatchedItem, 
  SearchResultCategory 
} from './types';
import { 
  PROJECTS, 
  NEWS_ITEMS, 
  GMEL_TECHNOLOGIES, 
  OTHER_CORE_AREAS, 
  RECENT_INNOVATIONS, 
  JOB_OPENINGS 
} from './constants';
import { translations } from './translations';

/**
 * Text normalizer for multi-lingual fuzzy search (EN, FA, AR, KU)
 */
function normalizeText(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    // Persian/Arabic normalization
    .replace(/[يى]/g, 'ی')
    .replace(/[ك]/g, 'ک')
    .replace(/[ة]/g, 'ه')
    .replace(/[إأآا]/g, 'ا')
    .replace(/[ؤ]/g, 'و')
    .replace(/[ئ]/g, 'ی')
    // Remove diacritics
    .replace(/[\u064B-\u065F\u0670]/g, '')
    // Strip punctuation to whitespace
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'«»]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Helper to collect all localized strings for a translation key across all languages
 */
function getLocalizedStrings(key: string): string[] {
  const values: string[] = [key];
  for (const lang of Object.keys(translations)) {
    const val = translations[lang]?.[key];
    if (val && !values.includes(val)) {
      values.push(val);
    }
  }
  return values;
}

/**
 * Checks if any term in the query matches in the target text
 */
function matchesQuery(targetTexts: string[], queryTerms: string[]): boolean {
  if (queryTerms.length === 0) return false;
  const combined = normalizeText(targetTexts.join(' '));
  
  // Direct full phrase check
  const fullPhrase = queryTerms.join(' ');
  if (combined.includes(fullPhrase)) return true;

  // Partial terms match: if majority of query terms are found
  let matchedCount = 0;
  for (const term of queryTerms) {
    if (combined.includes(term)) {
      matchedCount++;
    }
  }
  return matchedCount > 0 && (matchedCount / queryTerms.length >= 0.5);
}

/**
 * Performs deep semantic & keyword search across KKM enterprise catalog
 */
export async function performDeepSearch(
  query: string,
  activeLanguage: string = 'EN'
): Promise<GeminiSearchResult> {
  const trimmed = query.trim();
  if (!trimmed) {
    return {
      summary: 'Please enter a search term to query the KKM International Group database.',
      sources: [],
      matchedItems: [],
      categories: [],
      totalMatchesCount: 0,
      sourceType: 'internal'
    };
  }

  const normQuery = normalizeText(trimmed);
  const queryTerms = normQuery.split(/\s+/).filter(t => t.length > 1);
  if (queryTerms.length === 0) {
    queryTerms.push(normQuery);
  }

  const matchedProjects: SearchMatchedItem[] = [];
  const matchedTech: SearchMatchedItem[] = [];
  const matchedNews: SearchMatchedItem[] = [];
  const matchedInnovations: SearchMatchedItem[] = [];
  const matchedJobs: SearchMatchedItem[] = [];

  const langTranslations = translations[activeLanguage] || translations['EN'];
  const getDisplay = (key: string) => langTranslations[key] || translations['EN'][key] || key;

  // 1. Search PROJECTS
  for (const proj of PROJECTS) {
    const nameTexts = getLocalizedStrings(proj.name);
    const descTexts = getLocalizedStrings(proj.description);
    const contentTexts = getLocalizedStrings(proj.detailedContent);
    const tagTexts = proj.tags.flatMap(t => getLocalizedStrings(t));

    if (matchesQuery([...nameTexts, ...descTexts, ...contentTexts, ...tagTexts], queryTerms)) {
      matchedProjects.push({
        id: proj.name,
        type: 'project',
        title: getDisplay(proj.name),
        subtitle: proj.tags.map(t => getDisplay(t)).slice(0, 3).join(' • '),
        description: getDisplay(proj.description),
        tags: proj.tags.map(t => getDisplay(t)),
        linkPage: Page.Projects,
        rawItem: proj
      });
    }
  }

  // 2. Search CORE TECHNOLOGIES & GMEL
  const allTech = [...GMEL_TECHNOLOGIES, ...OTHER_CORE_AREAS];
  for (const tech of allTech) {
    const nameTexts = getLocalizedStrings(tech.name);
    const descTexts = getLocalizedStrings(tech.description);

    if (matchesQuery([...nameTexts, ...descTexts], queryTerms)) {
      matchedTech.push({
        id: tech.name,
        type: 'technology',
        title: getDisplay(tech.name),
        subtitle: 'GMEL Eco-Technology Suite',
        description: getDisplay(tech.description),
        linkPage: Page.CoreTechnologies,
        rawItem: tech
      });
    }
  }

  // 2b. Digital Twin & Shader Pilot Entry
  const dtKeywords = ['digital twin', 'shader', 'pilot', 'webgl', 'gpu', 'glsl', 'telemetry', 'thermodynamic simulation', 'دوقلو', 'شیدر', 'پایلوت', 'شبیه سازی'];
  if (matchesQuery(dtKeywords, queryTerms)) {
    matchedTech.unshift({
      id: 'digital-twin-shader-pilot',
      type: 'technology',
      title: getDisplay('DigitalTwinTitle'),
      subtitle: 'GPU-Accelerated WebGL 2.0 Simulation Lab',
      description: getDisplay('DigitalTwinSubtitle'),
      linkPage: Page.DigitalTwinHub,
      rawItem: { name: 'DigitalTwinTitle' }
    });
  }

  // 3. Search NEWS & INSIGHTS
  for (const news of NEWS_ITEMS) {
    const titleTexts = getLocalizedStrings(news.title);
    const excerptTexts = getLocalizedStrings(news.excerpt);
    const contentTexts = getLocalizedStrings(news.content);

    if (matchesQuery([...titleTexts, ...excerptTexts, ...contentTexts, news.category], queryTerms)) {
      matchedNews.push({
        id: news.title,
        type: 'news',
        title: getDisplay(news.title),
        subtitle: `${news.date} • ${news.category}`,
        description: getDisplay(news.excerpt),
        tags: [news.category],
        linkPage: Page.News,
        rawItem: news
      });
    }
  }

  // 4. Search INNOVATIONS
  for (const inn of RECENT_INNOVATIONS) {
    const titleTexts = getLocalizedStrings(inn.title);
    const descTexts = getLocalizedStrings(inn.description);
    const impactTexts = getLocalizedStrings(inn.impact);

    if (matchesQuery([...titleTexts, ...descTexts, ...impactTexts], queryTerms)) {
      matchedInnovations.push({
        id: inn.id,
        type: 'innovation',
        title: getDisplay(inn.title),
        subtitle: `${inn.date} • Impact: ${getDisplay(inn.impact)}`,
        description: getDisplay(inn.description),
        linkPage: Page.InnovationHub,
        rawItem: inn
      });
    }
  }

  // 5. Search JOB OPENINGS
  for (const job of JOB_OPENINGS) {
    const titleTexts = getLocalizedStrings(job.title);
    const descTexts = getLocalizedStrings(job.description);
    const respTexts = job.responsibilities.flatMap(r => getLocalizedStrings(r));
    const qualTexts = job.qualifications.flatMap(q => getLocalizedStrings(q));

    if (matchesQuery([...titleTexts, ...descTexts, ...respTexts, ...qualTexts, job.department, job.location], queryTerms)) {
      matchedJobs.push({
        id: job.id,
        type: 'job',
        title: getDisplay(job.title),
        subtitle: `${job.department} • ${job.location} • ${job.type}`,
        description: getDisplay(job.description),
        linkPage: Page.Careers,
        rawItem: job
      });
    }
  }

  const allMatchedItems = [
    ...matchedProjects,
    ...matchedTech,
    ...matchedNews,
    ...matchedInnovations,
    ...matchedJobs
  ];

  const rawCategories: SearchResultCategory[] = [
    { category: 'all', label: getDisplay('SearchTabAll'), count: allMatchedItems.length, items: allMatchedItems },
    { category: 'projects', label: getDisplay('SearchTabProjects'), count: matchedProjects.length, items: matchedProjects },
    { category: 'technologies', label: getDisplay('SearchTabTechnologies'), count: matchedTech.length, items: matchedTech },
    { category: 'news', label: getDisplay('SearchTabNews'), count: matchedNews.length, items: matchedNews },
    { category: 'innovations', label: getDisplay('SearchTabInnovations'), count: matchedInnovations.length, items: matchedInnovations },
    { category: 'jobs', label: getDisplay('SearchTabCareers'), count: matchedJobs.length, items: matchedJobs },
  ];

  const categories: SearchResultCategory[] = rawCategories.filter(c => c.category === 'all' || c.count > 0);

  // Check for available Gemini API Key
  const apiKey = 
    (typeof process !== 'undefined' && process.env && (process.env.API_KEY || process.env.GEMINI_API_KEY)) ||
    (typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env.VITE_GEMINI_API_KEY) ||
    '';

  let summary = '';
  let sources: any[] = [];
  let sourceType: 'internal' | 'web' | 'hybrid' = 'internal';

  // If Gemini API Key is present, leverage AI generation
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });

      if (allMatchedItems.length > 0) {
        let internalContext = 'INTERNAL KKM INTERNATIONAL GROUP KNOWLEDGE BASE:\n\n';
        for (const item of allMatchedItems.slice(0, 10)) {
          internalContext += `[${item.type.toUpperCase()}] ${item.title}\nDescription: ${item.description}\nDetails: ${item.subtitle || ''}\n\n`;
        }

        const prompt = `You are the executive AI intelligence assistant for KKM International Group.
Based on the following internal corporate documentation, provide an authoritative, clear, and structured synthesis answering the user query.
Emphasize engineering excellence, sustainability impact, and project status where relevant.
Respond in the language matching the query (default to ${activeLanguage === 'FA' ? 'Persian' : 'English'}).

User Query: "${query}"

${internalContext}`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt
        });

        summary = response.text || '';
        sourceType = 'internal';
      } else {
        // Fallback to web search grounding
        const prompt = `You are an AI assistant for KKM International Group (a global leader in sustainable energy, geothermal systems GMEL, and infrastructure).
The user searched for: "${query}".
Search for verifiable current information about KKM International Group, its energy projects (such as Qeshm, closed-loop geothermal, biomedical, ICOFC, Assaluyeh, or clean technologies) or related regional developments.
Provide a concise, professional summary with citations where available.`;

        let response: any;
        try {
          response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
              tools: [{ googleSearch: {} }]
            }
          });
        } catch (e) {
          response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
          });
        }

        summary = response.text || 'No external results found.';
        sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        sourceType = 'web';
      }
    } catch (err) {
      console.warn('Gemini API call failed, using intelligent local synthesis:', err);
    }
  }

  // If no summary was generated by Gemini (e.g., no key, offline, or fallback), construct instant client-side executive synthesis
  if (!summary) {
    if (allMatchedItems.length > 0) {
      const isFa = activeLanguage === 'FA';
      const projectNames = matchedProjects.map(p => p.title).slice(0, 3).join('، ');
      const techNames = matchedTech.map(t => t.title).slice(0, 3).join('، ');

      if (isFa) {
        summary = `### یافته‌های پایگاه دانش سازمانی KKM\n\nبرای عبارت **«${query}»**، تعداد **${allMatchedItems.length}** رکورد مرتبط در مستندات و پورتال‌های فعال گروه شناسایی گردید:\n\n` +
          (matchedProjects.length > 0 ? `- **پروژه‌ها و پایلوت‌ها (${matchedProjects.length}):** ${projectNames}\n` : '') +
          (matchedTech.length > 0 ? `- **فناوری‌های بنیادین GMEL (${matchedTech.length}):** ${techNames}\n` : '') +
          (matchedNews.length > 0 ? `- **اخبار و بینش‌های راهبردی:** ${matchedNews.length} مقاله\n` : '') +
          (matchedJobs.length > 0 ? `- **فرصت‌های استخدامی مرتبط:** ${matchedJobs.length} موقعیت شغلی\n` : '') +
          `\nمی‌توانید جهت دسترسی به جزئیات فنی و مشاهده مستندات کامل، روی کارت‌های زیر کلیک فرمایید.`;
      } else {
        summary = `### KKM Enterprise Knowledge Synthesis\n\nFound **${allMatchedItems.length}** verified record(s) matching **"${query}"** across KKM International Group's active portfolio:\n\n` +
          (matchedProjects.length > 0 ? `- **Projects & Pilots (${matchedProjects.length}):** ${matchedProjects.map(p => p.title).slice(0, 3).join(', ')}\n` : '') +
          (matchedTech.length > 0 ? `- **Core Technologies & GMEL (${matchedTech.length}):** ${matchedTech.map(t => t.title).slice(0, 3).join(', ')}\n` : '') +
          (matchedNews.length > 0 ? `- **News & Strategic Insights:** ${matchedNews.length} article(s)\n` : '') +
          (matchedJobs.length > 0 ? `- **Career Opportunities:** ${matchedJobs.length} active position(s)\n` : '') +
          `\nSelect any category or card below to explore technical specifications, project metrics, or direct portals.`;
      }
      sourceType = 'internal';
    } else {
      const isFa = activeLanguage === 'FA';
      summary = isFa
        ? `هیچ نتیجه مستقیمی برای عبارت **«${query}»** در کاتالوگ فعلی یافت نشد. پیشنهاد می‌شود از کلیدواژه‌هایی مانند **زمین‌گرمایی**، **قشم**، **بیومدیکال**، **حفاری**، **آب‌شیرین‌کن**، یا **GMEL** استفاده نمایید.`
        : `No direct records found for **"${query}"** in the current catalog. Try exploring key technological domains such as **Geothermal**, **Qeshm Green Energy**, **Biomedical**, **Desalination**, or **GMEL Ecosystem**.`;
      sourceType = 'internal';
    }
  }

  return {
    summary,
    sources,
    sourceType,
    matchedItems: allMatchedItems,
    categories,
    totalMatchesCount: allMatchedItems.length
  };
}
