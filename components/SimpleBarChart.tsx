
import * as React from 'react';
import { motion } from 'motion/react';

interface ChartData {
  label: string;
  value: number; // Percentage 0-100
  color: string;
  description?: string;
}

interface SimpleBarChartProps {
  data: ChartData[];
  title?: string;
}

const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ data, title }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-slate-700">
      {title && <h3 className="text-xl font-display font-bold text-primary dark:text-white mb-6">{title}</h3>}
      <div className="space-y-6">
        {data.map((item, index) => {
          const widthValue = item.value !== undefined ? `${item.value}%` : '0%';
          return (
            <div key={index}>
                <div className="flex justify-between items-end mb-1">
                <span className="font-bold text-text-dark dark:text-slate-200">{item.label}</span>
                <span className="font-mono font-semibold text-primary dark:text-secondary">{item.value}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-4 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: widthValue }}
                    transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.color }}
                />
                </div>
                {item.description && (
                <p className="text-xs text-text-light dark:text-slate-400 mt-1">{item.description}</p>
                )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SimpleBarChart;
