import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { 
  Sparkles, X, Send, Bot, User, RefreshCw, ChevronRight, 
  Layers, ShieldCheck, BookOpen, AlertCircle, FileText, Check
} from 'lucide-react';
import SimpleMarkdown from './SimpleMarkdown';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const PRESET_QUERIES = [
  {
    labelEn: 'Thermodynamic Exergy of GMEL-CLG',
    labelFa: 'تحلیل اگزرژی و راندمان سیکل GMEL-CLG',
    promptEn: 'Please analyze the thermodynamic cycle of KKM GMEL-CLG closed-loop geothermal network at 4,200m depth, explaining supercritical CO2 exergy efficiency and zero net water consumption.',
    promptFa: 'لطفاً تحلیل ترمودینامیکی و اگزرژی سیکل مداربسته زمین‌گرمایی GMEL-CLG را در عمق ۴۲۰۰ متری با تأکید بر راندمان سیال CO2 فوق‌بحرانی و مصرف صفر آب شرح دهید.',
  },
  {
    labelEn: 'EDO-AI Autonomous Dispatch Policy',
    labelFa: 'خط‌مشی هوش مصنوعی دیسپاچینگ EDO-AI',
    promptEn: 'Explain how the EDO-AI reinforcement learning algorithm coordinates geothermal baseload with solar PV and nomadic demand swings to reduce diesel generation by up to 82%.',
    promptFa: 'توضیح دهید الگوریتم یادگیری تقویتی EDO-AI چگونه تولید پایه زمین‌گرمایی را با نوسانات خورشیدی و بار مصرفی عشایری هماهنگ کرده و مصرف گازوئیل را تا ۸۲٪ کاهش می‌دهد.',
  },
  {
    labelEn: 'Phased Financial Model & Project IRR',
    labelFa: 'مدل مالی ترانش‌های سرمایه‌گذاری و IRR',
    promptEn: 'Provide a breakdown of the phased financial structure (Capex, Opex savings, 24.2% IRR, and 3.6-year payback) for a commercial GMEL multi-utility pilot.',
    promptFa: 'ساختار فازبندی‌شده مالی شامل سهم Capex، صرفه‌جویی Opex، نرخ بازده داخلی ۲۴.۲٪ و دوره بازگشت سرمایه ۳.۶ ساله را برای پایلوت تجاری تشریح نمایید.',
  },
  {
    labelEn: 'Q1 Peer-Reviewed Scientific Basis',
    labelFa: 'پشتوانه علمی در مقالات رتبه Q1',
    promptEn: 'Summarize the peer-reviewed publications in Elsevier Applied Energy and IEEE Transactions on Smart Grid that underpin KKM patented technologies.',
    promptFa: 'خلاصه‌ای از مبانی علمی مندرج در مقالات Q1 الزویر (Applied Energy) و IEEE که پشتیبان پتنت‌های KKM هستند را بیان کنید.',
  },
];

export const KKMAlgorithmicAdvisorModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void;
  onNavigate?: (page: any) => void;
}> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const { isFa, direction } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: isFa
        ? 'درود. من مشاور الگوریتمی و هوش مصنوعی سیستم عامل سازمانی (EAOS) گروه بین‌المللی KKM هستم. آماده‌ام به پرسش‌های فنی، تحلیل‌های ترمودینامیکی، داده‌های پتنت‌ها و مدل‌سازی‌های مالی پروژه‌ها بر مبنای مخازن علمی و اسناد اعتبارسنجی پاسخ دهم.'
        : 'Welcome. I am the KKM Enterprise AI Algorithmic Advisor. I provide real-time deep algorithmic analysis, thermodynamic modeling breakdowns, patent specifications, and phased project financial analyses grounded in KKM technical repositories and Q1 publications.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputValue('');
    setIsLoading(true);

    try {
      const systemContext = `
You are the Principal Enterprise AI Algorithmic Advisor for KKM International Group (EAOS).
You represent an international energy, water, and deep-tech innovation group.
Core facts to adhere strictly to:
- Proprietary closed-loop coaxial geothermal system (GMEL-CLG, Patent PCT/IB2024/059421) operates at 4,200m depth with supercritical CO2 and nanofluids (TRL 7).
- Zero net water withdrawal (unlike fracking EGS). Baseload thermal round-trip conversion efficiency > 22.4%.
- Nano-Engineered Thermofluid (US Patent 18/456,892) has +31.7% thermal conductivity gain under 350 bar.
- Autonomous Micro-Grid Energy Dispatch Optimizer (EDO-AI, SW-REG-2024-118) uses constrained reinforcement learning, slashes diesel runtime by 82% and solar curtailment by 43.8%.
- Multi-effect desalination cascade (GMEL-Desal, PCT/IB2024/061204) consumes only 1.95 kWh/m³.
- Academic grounding: Q1 publications in Elsevier Applied Energy, IEEE Transactions on Smart Grid, Desalination, and International Journal of Heat and Mass Transfer.
- Phased Financial Model: Base IRR 24.2%, Simple Payback 3.6 years, structured in 4 bankable tranches.
Answer in ${isFa ? 'fluent, formal, authoritative Persian' : 'fluent, rigorous, professional English'}.
Keep answers well-structured with clear bullet points and quantitative technical precision.
`;

      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `${systemContext}\n\nStakeholder Query:\n${query}`,
        }),
      });

      if (!res.ok) {
        throw new Error('Analysis service error');
      }

      const data = await res.json();
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.text || (isFa ? 'پاسخی دریافت نشد.' : 'No response generated.'),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        sender: 'assistant',
        text: isFa
          ? 'پوزش می‌طلبم، در ارتباط با سرویس پردازش هوش مصنوعی اختلالی رخ داد. لطفاً چند لحظه بعد مجدداً تلاش فرمایید.'
          : 'I apologize, an error occurred while connecting to the AI analysis service. Please try again shortly.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      dir={direction}
    >
      <div className="w-full max-w-3xl h-[85vh] max-h-[800px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden text-start">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-850/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-primary-dark dark:from-secondary dark:to-primary text-white flex items-center justify-center shadow-md">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-primary dark:text-secondary uppercase">
                  KKM EAOS AI AGENT
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 font-bold">
                  Gemini-2.5-Flash Active
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                {isFa ? 'دستیار الگوریتمی و تحلیلگر انرژی KKM' : 'Algorithmic Advisor & Energy Analysis Agent'}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-95 min-h-[48px] min-w-[48px] flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Prompt Chips Bar */}
        <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0 overflow-x-auto no-scrollbar flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-400 shrink-0">
            {isFa ? 'پرسش‌های پیشنهادی:' : 'Suggested:'}
          </span>
          {PRESET_QUERIES.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(isFa ? item.promptFa : item.promptEn)}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-xl text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 whitespace-nowrap transition-all active:scale-95 border border-slate-200/80 dark:border-slate-700 font-medium shrink-0 disabled:opacity-50"
            >
              {isFa ? item.labelFa : item.labelEn}
            </button>
          ))}
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  isUser 
                    ? 'bg-primary text-white' 
                    : 'bg-slate-100 dark:bg-slate-800 text-primary dark:text-secondary'
                }`}>
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-primary text-white rounded-tr-none'
                    : 'bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-100 rounded-tl-none'
                }`}>
                  <SimpleMarkdown text={msg.text} />
                  <span className={`block text-[10px] mt-2 font-mono ${
                    isUser ? 'text-white/70' : 'text-slate-400'
                  }`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-primary dark:text-secondary flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-primary dark:text-secondary" />
                <span className="text-slate-500 dark:text-slate-400 font-medium">
                  {isFa ? 'در حال تحلیل الگوریتمی و استخراج داده‌های پتنت...' : 'Running algorithmic analysis & patent extraction...'}
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={isFa ? 'پرسش در خصوص ترمودینامیک، الگوریتم‌ها، پتنت‌ها یا مدل مالی...' : 'Ask about thermodynamics, EDO-AI, patents or financial models...'}
              disabled={isLoading}
              className="flex-1 py-3 px-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary min-h-[48px]"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="p-3 rounded-2xl bg-primary hover:bg-primary-dark text-white transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none min-h-[48px] min-w-[48px] flex items-center justify-center shadow-sm"
              aria-label="Send query"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
