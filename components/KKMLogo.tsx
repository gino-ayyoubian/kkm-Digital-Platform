import * as React from 'react';

export interface KKMLogoProps {
  variant?: 'full' | 'icon' | 'mark';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
}

/**
 * Official KKM International Group Logo
 * Faithfully incorporates the Official Brand Book (google_labs Pomelli):
 * - Primary Palette:
 *   - Jet Black: #020617 (RGB: 2, 6, 23)
 *   - Azure Blue: #0A92EF (RGB: 10, 146, 239)
 *   - Baby Blue: #89CFF0 (RGB: 137, 207, 240)
 *   - Pure White: #FFFFFF (RGB: 255, 255, 255)
 *   - Golden-Amber Planetary Core: #F59E0B / #D97706
 * - Primary Typeface: Montserrat (Bold 800 & Semi-Bold 600)
 * - Clear Space: 30 px clear space
 * - Minimum Digital Scale: 80 px width (0.83 inch)
 */
export const KKMLogo: React.FC<KKMLogoProps> = ({
  variant = 'full',
  className = '',
  size = 'md',
  animated = true,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  // Official Brand Book: Minimum size is 80px width
  const sizeClasses = {
    sm: variant === 'icon' ? 'w-20 h-20 min-w-[80px] min-h-[80px]' : 'h-14 min-h-[56px] min-w-[80px] w-auto',
    md: variant === 'icon' ? 'w-20 h-20 min-w-[80px] min-h-[80px]' : 'h-16 md:h-20 min-h-[64px] min-w-[80px] w-auto',
    lg: variant === 'icon' ? 'w-24 h-24 min-w-[80px] min-h-[80px]' : 'h-24 md:h-28 min-h-[80px] min-w-[100px] w-auto',
    xl: variant === 'icon' ? 'w-32 h-32 min-w-[80px] min-h-[80px]' : 'h-36 min-h-[80px] min-w-[120px] w-auto',
  }[size];

  // If icon variant (Inverse on Jet Black / Azure Blue background)
  if (variant === 'icon') {
    return (
      <div
        className={`inline-flex items-center justify-center rounded-2xl bg-[#020617] border border-slate-800 shadow-md overflow-hidden p-2.5 min-h-[80px] min-w-[80px] transition-all duration-300 ${
          isHovered ? 'scale-105 shadow-xl ring-2 ring-[#0A92EF]/50' : ''
        } ${sizeClasses} ${className}`}
        role="img"
        aria-label="KKM International Emblem"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-contain"
        >
          <defs>
            <linearGradient id="iconWaveGrad" x1="40" y1="20" x2="160" y2="180" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0A92EF" />
              <stop offset="100%" stopColor="#89CFF0" />
            </linearGradient>
            <radialGradient id="iconGoldOrbGrad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="35%" stopColor="#F59E0B" />
              <stop offset="75%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#9A3412" />
            </radialGradient>
          </defs>

          {/* Outer sweeping crescent arc in pure white & Baby Blue */}
          <path
            d="M95 18C100 28 85 45 76 60C62 83 55 106 58 132C62 161 86 182 116 182C138 182 158 169 168 150C164 163 151 176 132 181C110 186 85 180 68 165C45 144 40 112 48 84C55 58 74 34 95 18Z"
            fill="#FFFFFF"
            className={animated && isHovered ? 'transition-all duration-300 opacity-95 filter drop-shadow(0 0 6px #FFFFFF)' : 'opacity-100'}
          />

          {/* Inner wave swoosh in Azure Blue #0A92EF */}
          <path
            d="M102 38C108 50 96 68 89 82C79 101 76 122 83 143C88 158 100 169 116 172C134 175 152 167 163 152C169 144 172 133 172 122C172 102 162 82 147 69C152 82 153 97 149 111C144 129 130 144 112 147C96 150 83 140 80 125C76 108 83 91 92 76C98 66 104 52 102 38Z"
            fill="#0A92EF"
            className={animated && isHovered ? 'transition-all duration-300 scale-105 origin-center' : ''}
          />

          {/* Radiant Golden-Amber Core Sphere */}
          <circle
            cx="126"
            cy="132"
            r="28"
            fill="url(#iconGoldOrbGrad)"
            className={animated && isHovered ? 'transition-all duration-300 scale-110 origin-[126px_132px] filter drop-shadow(0 0 10px #F59E0B)' : ''}
          />
        </svg>
      </div>
    );
  }

  // Full Corporate Logo (Official Brand Book: Azure Blue Arc + Golden Core + Montserrat Typography)
  return (
    <div
      className={`inline-flex items-center justify-center select-none cursor-pointer group min-h-[56px] min-w-[80px] ${sizeClasses} ${className}`}
      role="img"
      aria-label="KKM International Group Official Logo"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        viewBox="0 0 320 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto max-h-full object-contain min-h-[56px] min-w-[80px]"
      >
        <defs>
          {/* Azure Blue Gradient (#0A92EF to #020617) */}
          <linearGradient id="kkmOuterDropletGrad" x1="20" y1="10" x2="220" y2="230" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#89CFF0" />
            <stop offset="45%" stopColor="#0A92EF" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          {/* Inner Wave Gradient: Baby Blue (#89CFF0) to Azure Blue (#0A92EF) */}
          <linearGradient id="kkmInnerWaveGrad" x1="160" y1="20" x2="80" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#BAE6FD" />
            <stop offset="50%" stopColor="#89CFF0" />
            <stop offset="100%" stopColor="#0A92EF" />
          </linearGradient>

          {/* Synchronized Wave Stream Gradient */}
          <linearGradient id="kkmSynchronizedWaveGrad" x1="100" y1="30" x2="220" y2="210" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0A92EF" />
            <stop offset="70%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#FEF08A" />
          </linearGradient>

          {/* Golden-Amber Planetary Core with 3D Depth */}
          <radialGradient id="kkmSunGoldGrad" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="35%" stopColor="#F59E0B" />
            <stop offset="75%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#9A3412" />
          </radialGradient>

          {/* Subtle Institutional Drop Shadow */}
          <filter id="kkmShadow" x="-15%" y="-15%" width="130%" height="130%" filterUnits="userSpaceOnUse">
            <feDropShadow dx="1" dy="4" stdDeviation="4" floodColor="#020617" floodOpacity="0.28" />
          </filter>
        </defs>

        <g filter="url(#kkmShadow)">
          {/* 1. Outer Swirling Arc */}
          <path
            d="M162 24C168 36 150 56 140 73C122 101 114 130 119 162C124 195 152 220 186 219C211 218 233 203 243 181C238 196 223 211 202 217C177 223 148 216 128 198C101 173 96 135 106 102C115 72 138 43 162 24Z"
            fill="url(#kkmOuterDropletGrad)"
            className={animated && isHovered ? 'transition-all duration-300 filter drop-shadow(0 0 8px #0A92EF)' : 'transition-all duration-300'}
          />

          {/* 2. Inner Wave Swoosh */}
          <path
            d="M169 46C176 60 162 82 153 98C142 120 138 144 146 168C152 186 166 198 185 201C206 204 227 195 240 178C247 169 250 156 250 144C250 120 238 97 221 82C226 97 228 114 223 130C218 151 202 168 181 172C163 175 148 164 144 146C140 126 148 107 158 90C165 78 172 62 169 46Z"
            fill="url(#kkmInnerWaveGrad)"
            className={animated && isHovered ? 'transition-all duration-500 scale-[1.02] origin-center' : 'transition-all duration-300'}
          />

          {/* 3. Synchronized Wave Pattern Droplet Illumination Lines */}
          {animated && (
            <g className={isHovered ? 'opacity-100 transition-opacity duration-300' : 'opacity-0 transition-opacity duration-300'}>
              <path
                d="M152 38C136 65 118 98 122 138C126 174 154 198 186 198"
                stroke="url(#kkmSynchronizedWaveGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                className="animate-droplet-wave"
                style={{ animationDelay: '0s' }}
              />
              <path
                d="M164 62C154 84 148 110 154 136C158 154 172 168 190 168"
                stroke="#FEF08A"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                className="animate-droplet-wave"
                style={{ animationDelay: '0.4s' }}
              />
              <path
                d="M178 86C172 104 168 122 172 142"
                stroke="#0A92EF"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
                className="animate-droplet-wave"
                style={{ animationDelay: '0.8s' }}
              />
            </g>
          )}

          {/* 4. Glowing Planetary Sphere (Amber/Gold Orb #F59E0B) */}
          <circle 
            cx="196" 
            cy="156" 
            r="33" 
            fill="url(#kkmSunGoldGrad)" 
            className={animated && isHovered ? 'transition-all duration-300 scale-105 origin-[196px_156px] filter drop-shadow(0 0 10px #F59E0B)' : 'transition-all duration-300'}
          />
        </g>

        {/* Brand Typography (Official Brand Book: Montserrat Bold & Semi-Bold) */}
        {variant !== 'mark' && (
          <g id="kkmTypography">
            {/* "K.K.M." in Montserrat 800 */}
            <text
              x="160"
              y="272"
              textAnchor="middle"
              fill="#020617"
              className="dark:fill-slate-100 transition-colors"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
                fontSize: '34px',
                letterSpacing: '0.1em',
              }}
            >
              K.K.M.
            </text>

            {/* "INTERNATIONAL" in Montserrat 600 */}
            <text
              x="160"
              y="302"
              textAnchor="middle"
              fill="#0A92EF"
              className="dark:fill-[#89CFF0] transition-colors"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                fontSize: '17px',
                letterSpacing: '0.28em',
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
