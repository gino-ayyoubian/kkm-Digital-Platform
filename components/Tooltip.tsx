import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface TooltipProps {
  text: string;
  tooltipContent: string;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ text, tooltipContent, className = '' }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const tooltipId = React.useId();

  return (
    <span 
      className={`relative inline-block border-b border-dotted border-text-light dark:border-slate-400 cursor-help ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      tabIndex={0}
      aria-describedby={isVisible ? tooltipId : undefined}
    >
      {text}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            id={tooltipId}
            role="tooltip"
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-900 text-slate-50 text-xs rounded shadow-lg z-50 text-center pointer-events-none"
          >
            {tooltipContent}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

export default Tooltip;