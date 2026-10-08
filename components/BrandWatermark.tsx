import React from 'react';

export interface BrandWatermarkProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'center';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Official KKM Project Media Watermark
 * Compliance with Brand Implementation Rules:
 * "High-resolution industrial photography (e.g., geothermal systems) must feature
 *  a subtle, translucent logo icon overlay (opacity-10 to opacity-15)."
 */
export const BrandWatermark: React.FC<BrandWatermarkProps> = ({
  position = 'bottom-right',
  className = '',
  size = 'md',
}) => {
  const positionClasses = {
    'bottom-right': 'bottom-3 right-3',
    'bottom-left': 'bottom-3 left-3',
    'top-right': 'top-3 right-3',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  }[position];

  const sizeDimensions = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }[size];

  return (
    <div
      className={`absolute ${positionClasses} pointer-events-none select-none z-10 opacity-[0.14] transition-opacity duration-300 ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${sizeDimensions} object-contain filter drop-shadow-sm`}
      >
        <defs>
          <linearGradient id="watermarkGrad" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#4C9AFE" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>
        </defs>

        {/* Outer Droplet Swoosh (Upward Flow) */}
        <path
          d="M95 18C100 28 85 45 76 60C62 83 55 106 58 132C62 161 86 182 116 182C138 182 158 169 168 150C164 163 151 176 132 181C110 186 85 180 68 165C45 144 40 112 48 84C55 58 74 34 95 18Z"
          fill="url(#watermarkGrad)"
        />

        {/* Inner Wave Swoosh */}
        <path
          d="M102 38C108 50 96 68 89 82C79 101 76 122 83 143C88 158 100 169 116 172C134 175 152 167 163 152C169 144 172 133 172 122C172 102 162 82 147 69C152 82 153 97 149 111C144 129 130 144 112 147C96 150 83 140 80 125C76 108 83 91 92 76C98 66 104 52 102 38Z"
          fill="#FFFFFF"
        />

        {/* Sun Gold Core */}
        <circle cx="126" cy="132" r="26" fill="#F9A826" />
      </svg>
    </div>
  );
};

export default BrandWatermark;
