import * as React from 'react';
import { motion, Variants } from 'motion/react';
import { useTheme } from '../ThemeContext';

interface CardProps {
  title: React.ReactNode;
  description: React.ReactNode | (() => React.ReactNode);
  icon?: React.ReactNode;
  imageUrl?: string;
  actionText?: string;
  onActionClick?: () => void;
}

const Card: React.FC<CardProps> = ({ title, description, icon, imageUrl, actionText, onActionClick }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const descriptionContent = typeof description === 'function' 
    ? (description as () => React.ReactNode)() 
    : description;

  const cardVariants: Variants = {
    rest: {
      scale: 1,
      y: 0,
      boxShadow: isDark ? "none" : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)", // shadow-lg
    },
    hover: {
      scale: 1.02,
      y: -5,
      boxShadow: isDark ? "none" : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)", // shadow-xl
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <motion.div 
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardVariants}
      className="bg-white dark:bg-slate-800 rounded-lg flex flex-col group border border-transparent hover:border-secondary dark:border-slate-700 dark:hover:border-primary"
    >
      {imageUrl && (
        <div className="overflow-hidden rounded-t-lg">
          <img src={imageUrl} alt={typeof title === 'string' ? title : 'Card Image'} loading="lazy" className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        {icon && <div className="text-accent-dark dark:text-accent-yellow h-12 w-12 mb-4">{icon}</div>}
        <h3 className="text-xl font-display font-bold text-primary-dark dark:text-secondary mb-2">{title}</h3>
        <div className="text-sm text-text-light dark:text-slate-400 mb-4 flex-grow">{descriptionContent}</div>
        {actionText && onActionClick && (
          <button onClick={onActionClick} className="font-bold text-accent-dark dark:text-accent-yellow hover:underline self-start">
            {actionText} →
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Card;