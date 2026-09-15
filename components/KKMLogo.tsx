import * as React from 'react';

export interface KKMLogoProps {
  variant?: 'full' | 'icon' | 'mark';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Official KKM International Group Logo
 * Faithfully incorporates the unaltered corporate design:
 * - The iconic blue curved flame/droplet swoosh (deep ocean blue outer, vibrant sky blue inner)
 * - The radiant golden spherical sun in the center
 * - The crisp corporate typography "K.K.M. INTERNATIONAL"
 * - In icon variant: the white silhouette emblem on deep navy blue background
 */
export const KKMLogo: React.FC<KKMLogoProps> = ({
  variant = 'full',
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: variant === 'icon' ? 'w-8 h-8' : 'h-10 w-auto',
    md: variant === 'icon' ? 'w-12 h-12' : 'h-14 md:h-16 w-auto',
    lg: variant === 'icon' ? 'w-16 h-16' : 'h-20 md:h-24 w-auto',
    xl: variant === 'icon' ? 'w-24 h-24' : 'h-32 w-auto'
  }[size];

  // If icon variant (matching KKM Icon.png: white emblem on deep navy background)
  if (variant === 'icon') {
    return (
      <div
        className={`inline-flex items-center justify-center rounded-xl bg-[#002D56] shadow-md overflow-hidden ${sizeClasses} ${className}`}
        role="img"
        aria-label="KKM International Emblem"
      >
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4/5 h-4/5 object-contain"
        >
          {/* Outer white swoosh */}
          <path
            d="M95 18C100 28 85 45 76 60C62 83 55 106 58 132C62 161 86 182 116 182C138 182 158 169 168 150C164 163 151 176 132 181C110 186 85 180 68 165C45 144 40 112 48 84C55 58 74 34 95 18Z"
            fill="#FFFFFF"
          />
          {/* Inner white wave */}
          <path
            d="M102 38C108 50 96 68 89 82C79 101 76 122 83 143C88 158 100 169 116 172C134 175 152 167 163 152C169 144 172 133 172 122C172 102 162 82 147 69C152 82 153 97 149 111C144 129 130 144 112 147C96 150 83 140 80 125C76 108 83 91 92 76C98 66 104 52 102 38Z"
            fill="#FFFFFF"
          />
          {/* White center circle */}
          <circle cx="126" cy="132" r="28" fill="#FFFFFF" />
        </svg>
      </div>
    );
  }

  // Full unaltered corporate logo (matching IMG_7316.png)
  return (
    <div
      className={`inline-flex items-center justify-center select-none ${sizeClasses} ${className}`}
      role="img"
      aria-label="KKM International Group Logo"
    >
      <svg
        viewBox="0 0 320 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto max-h-full object-contain"
      >
        <defs>
          {/* Enhanced Outer Swoosh Gradient */}
          <linearGradient id="kkmOuterGradient" x1="20" y1="0" x2="210" y2="230" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0EA5E9" />
            <stop offset="50%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#001B3A" />
          </linearGradient>

          {/* Enhanced Inner Wave Gradient */}
          <linearGradient id="kkmInnerGradient" x1="160" y1="20" x2="80" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7DD3FC" />
            <stop offset="30%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>

          {/* Enhanced Sun Sphere 3D Glow */}
          <radialGradient id="kkmSunGradient" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="30%" stopColor="#F59E0B" />
            <stop offset="70%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#92400E" />
          </radialGradient>

          {/* Refined Drop Glow */}
          <filter id="kkmGlow" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
            <feDropShadow dx="2" dy="6" stdDeviation="5" floodColor="#001B3A" floodOpacity="0.25" />
          </filter>
        </defs>

        <g filter="url(#kkmGlow)">
          {/* 1. Outer Flame / Droplet Swoosh */}
          <path
            d="M162 24C168 36 150 56 140 73C122 101 114 130 119 162C124 195 152 220 186 219C211 218 233 203 243 181C238 196 223 211 202 217C177 223 148 216 128 198C101 173 96 135 106 102C115 72 138 43 162 24Z"
            fill="url(#kkmOuterGradient)"
          />

          {/* 2. Inner Wave Swoosh */}
          <path
            d="M169 46C176 60 162 82 153 98C142 120 138 144 146 168C152 186 166 198 185 201C206 204 227 195 240 178C247 169 250 156 250 144C250 120 238 97 221 82C226 97 228 114 223 130C218 151 202 168 181 172C163 175 148 164 144 146C140 126 148 107 158 90C165 78 172 62 169 46Z"
            fill="url(#kkmInnerGradient)"
          />

          {/* 3. Glowing Radiant Sun Sphere */}
          <circle cx="196" cy="156" r="33" fill="url(#kkmSunGradient)" />
        </g>

        {/* If mark only, stop here */}
        {variant !== 'mark' && (
          <g id="kkmTypography">
            {/* "K.K.M." text */}
            <text
              x="160"
              y="272"
              textAnchor="middle"
              fill="#002D56"
              className="dark:fill-slate-100"
              style={{
                fontFamily: "'Montserrat', 'Open Sans', system-ui, sans-serif",
                fontWeight: 900,
                fontSize: '34px',
                letterSpacing: '0.08em'
              }}
            >
              K.K.M.
            </text>

            {/* "INTERNATIONAL" text */}
            <text
              x="160"
              y="302"
              textAnchor="middle"
              fill="#002D56"
              className="dark:fill-slate-200"
              style={{
                fontFamily: "'Montserrat', 'Open Sans', system-ui, sans-serif",
                fontWeight: 800,
                fontSize: '18px',
                letterSpacing: '0.22em'
              }}
            >
              INTERNATIONAL
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

export default KKMLogo;
