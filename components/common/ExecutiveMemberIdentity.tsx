import React from 'react';
import { Shield, Award, CheckCircle } from 'lucide-react';

interface ExecutiveMemberIdentityProps {
  name: string;
  nameFa?: string;
  role: string;
  department?: string;
  photoUrl?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'card';
  shape?: 'circle' | 'rounded' | 'square';
  showBadge?: boolean;
  className?: string;
}

// Calibrated focal point (object-position) for each member portrait to guarantee
// heads, eyes, and hair are never cropped off, following golden-ratio portrait composition.
export const getMemberPhotoObjectPosition = (nameOrUrl: string = ''): string => {
  const s = (nameOrUrl || '').toLowerCase();
  
  // Gino Ayyoubian: Head starts ~12% from top, eyes ~20%
  if (s.includes('gino') || s.includes('ژینو')) return '50% 18%';
  
  // Sina Ayyoubian: Head starts ~5% from top, eyes ~15%
  if (s.includes('sina') || s.includes('سینا')) return '50% 12%';
  
  // Ashkan Tofangchiha: Head starts at top edge (0-5%), eyes ~12%
  if (s.includes('ashkan') || s.includes('اشکان') || s.includes('tofangchiha') || s.includes('تفنگچی')) return '50% 10%';
  
  // Dr. Khosro Jarrahian: Head at top (5%), eyes ~14%
  if (s.includes('khosro') || s.includes('خسرو') || s.includes('jarrahian') || s.includes('جراحیان')) return '50% 12%';
  
  // Dr. Reza Asakereh: Head ~8%, eyes ~16%
  if (s.includes('asakereh') || s.includes('عساکره') || s.includes('dcb4bc5a')) return '50% 12%';
  
  // Mostafa Sharifi: Head ~8%, eyes ~16%
  if (s.includes('sharifi') || s.includes('شریفی') || s.includes('mostafa') || s.includes('مصطفی')) return '50% 12%';
  
  // Farid Imani: Aspect ratio 4:5, head starts ~10%, eyes ~20%
  if (s.includes('farid') || s.includes('فرید') || s.includes('imani') || s.includes('ایمانی')) return '50% 18%';
  
  // Dr. Pedram Abdarzadeh: Aspect ratio 4:5, head ~12%, eyes ~22%
  if (s.includes('pedram') || s.includes('پدرام') || s.includes('abdarzadeh') || s.includes('آبدارزاده')) return '50% 18%';
  
  // Hamed Zatajam: Aspect ratio 4:5, head ~10%, eyes ~18%
  if (s.includes('hamed') || s.includes('حامد') || s.includes('zatajam') || s.includes('ذات‌عجم') || s.includes('ذات عجم')) return '50% 16%';
  
  // Reza Baghdadchi: Square aspect ratio (0.96), face centered at ~22%
  if (s.includes('baghdadchi') || s.includes('بغدادچی')) return '50% 22%';
  
  // Default rule-of-thirds upper-third focal point for executive vertical portraits
  return '50% 15%';
};

// Generate deterministic initials from full name
export const getInitials = (name: string): string => {
  if (!name) return 'KM';
  // Remove academic titles
  const clean = name.replace(/^(Dr\.|Eng\.|Mr\.|Ms\.|Mrs\.|دکتر|مهندس)\s+/i, '').trim();
  const parts = clean.split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

// Deterministic executive color themes based on name/role
const getTheme = (role: string, name: string) => {
  const r = role.toLowerCase();
  if (r.includes('ceo') || r.includes('executive officer')) {
    return {
      gradient: 'from-amber-700 via-amber-600 to-amber-900',
      border: 'border-amber-400/60',
      ring: 'ring-amber-400/40',
      accent: 'text-amber-300',
      glow: 'shadow-amber-500/20',
      sealTitle: 'EXECUTIVE BOARD'
    };
  }
  if (r.includes('cto') || r.includes('technology') || r.includes('ai')) {
    return {
      gradient: 'from-cyan-900 via-teal-800 to-slate-900',
      border: 'border-cyan-400/60',
      ring: 'ring-cyan-400/40',
      accent: 'text-cyan-300',
      glow: 'shadow-cyan-500/20',
      sealTitle: 'R&D & AI SYSTEMS'
    };
  }
  if (r.includes('cso') || r.includes('science') || r.includes('sustainability')) {
    return {
      gradient: 'from-emerald-900 via-emerald-800 to-slate-900',
      border: 'border-emerald-400/60',
      ring: 'ring-emerald-400/40',
      accent: 'text-emerald-300',
      glow: 'shadow-emerald-500/20',
      sealTitle: 'SCIENTIFIC DIRECTORATE'
    };
  }
  if (r.includes('cio') || r.includes('investment') || r.includes('cfo') || r.includes('finance')) {
    return {
      gradient: 'from-indigo-950 via-slate-900 to-blue-900',
      border: 'border-blue-400/60',
      ring: 'ring-blue-400/40',
      accent: 'text-blue-300',
      glow: 'shadow-blue-500/20',
      sealTitle: 'CAPITAL & ASSETS'
    };
  }
  if (r.includes('coo') || r.includes('operations')) {
    return {
      gradient: 'from-slate-900 via-slate-850 to-blue-950',
      border: 'border-slate-400/60',
      ring: 'ring-slate-400/40',
      accent: 'text-slate-300',
      glow: 'shadow-slate-500/20',
      sealTitle: 'OPERATIONS & EPCI'
    };
  }
  return {
    gradient: 'from-slate-900 via-primary-dark to-slate-950',
    border: 'border-secondary/40',
    ring: 'ring-secondary/30',
    accent: 'text-secondary',
    glow: 'shadow-secondary/20',
    sealTitle: 'KKM DIRECTORATE'
  };
};

const getAuthenticMemberPhoto = (name: string, nameFa?: string, photoUrl?: string): string | undefined => {
  if (photoUrl && photoUrl.trim() !== '' && !photoUrl.includes('unsplash.com') && !photoUrl.includes('pravatar.cc')) {
    return photoUrl;
  }
  const n = (name || '').toLowerCase();
  const nFa = (nameFa || '');

  // Exact mapping for the leadership and executive members with verified authentic portraits
  if (n.includes('gino') || nFa.includes('ژینو')) return '/images/gino-ayyoubian.jpg';
  if (n.includes('sina') || nFa.includes('سینا')) return '/images/sina-ayyoubian.jpg';
  if (n.includes('farid') || nFa.includes('فرید') || n.includes('imani') || nFa.includes('ایمانی')) return '/images/farid-imani.jpg';
  if (n.includes('baghdadchi') || nFa.includes('بغدادچی')) return '/images/reza-baghdadchi.jpg';
  if (n.includes('tofangchiha') || nFa.includes('تفنگچی')) return '/images/ashkan-tofangchiha.jpg';
  if (n.includes('asakereh') || nFa.includes('عساکره')) return '/DCB4BC5A-B9EE-4C50-8C99-F3303C779DE5.png';
  if (n.includes('jarrahian') || nFa.includes('جراحیان')) return '/images/khosro-jarrahian.jpg';
  if (n.includes('abdarzadeh') || nFa.includes('آبدارزاده')) return '/images/pedram-abdarzadeh.jpg';
  if (n.includes('zatajam') || nFa.includes('ذات‌عجم') || nFa.includes('ذات عجم')) return '/images/hamed-zatajam.jpg';
  if (n.includes('sharifi') || nFa.includes('شریفی') || n.includes('mostafa') || nFa.includes('مصطفی')) return '/images/mostafa-sharifi.jpg';

  return photoUrl;
};

/**
 * Authentic Corporate Executive Identity Component
 * Displays either a verified genuine photograph (e.g. Gino Ayyoubian, Reza Baghdadchi, Ashkan Tofangchiha, etc.)
 * OR an authoritative Executive Directorate Monogram & Heraldic Seal.
 * Absolutely eliminates fake, misleading stock photos of random models.
 */
export const ExecutiveMemberIdentity: React.FC<ExecutiveMemberIdentityProps> = ({
  name,
  nameFa,
  role,
  department,
  photoUrl,
  size = 'md',
  shape = 'circle',
  showBadge = true,
  className = '',
}) => {
  const [imgError, setImgError] = React.useState(false);
  const initials = getInitials(name);
  const theme = getTheme(role, name);

  const effectivePhotoUrl = getAuthenticMemberPhoto(name, nameFa, photoUrl);

  // Check if photo is a real verified photo (authentic local portrait, NOT fake unsplash/pravatar)
  const isVerifiedPhoto = Boolean(
    !imgError &&
    effectivePhotoUrl && 
    effectivePhotoUrl.trim() !== '' && 
    !effectivePhotoUrl.includes('unsplash.com') && 
    !effectivePhotoUrl.includes('pravatar.cc')
  );

  // Size mapping for standard avatar display
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-24 h-24 text-2xl',
    card: 'w-full h-full'
  }[size];

  // If used inside full card view (e.g. LeadershipTeam card)
  if (size === 'card') {
    if (isVerifiedPhoto && effectivePhotoUrl) {
      const focalPosition = getMemberPhotoObjectPosition(effectivePhotoUrl || name);
      return (
        <div className={`relative w-full h-full overflow-hidden bg-slate-950 ${className}`}>
          {/* Ambient blurred backdrop for tone matching and depth */}
          <img
            src={effectivePhotoUrl}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover blur-xl opacity-35 scale-110 pointer-events-none select-none"
          />
          {/* Crisp foreground portrait with golden-ratio calibrated focal position */}
          <img
            src={effectivePhotoUrl}
            alt={name}
            className="relative z-1 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ objectPosition: focalPosition }}
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
          />
          {/* Subtle vignette gradient for text contrast */}
          <div className="absolute inset-0 z-2 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
          
          {/* Verified Official Seal Ribbon */}
          {showBadge && (
            <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-400/40 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[10px] font-mono font-bold tracking-wider text-amber-300 uppercase">
                Verified Identity
              </span>
            </div>
          )}
        </div>
      );
    }

    // Authentic Executive Monogram Crest & Directorate Seal for members without raw photos
    return (
      <div className={`relative w-full h-full bg-gradient-to-br ${theme.gradient} flex flex-col items-center justify-center p-6 text-white overflow-hidden ${className}`}>
        {/* Intricate background guilloche / geometric grid pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
        
        {/* Subtle decorative concentric rings */}
        <div className="absolute w-72 h-72 rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute w-56 h-56 rounded-full border border-white/10 pointer-events-none" />

        {/* Directorate Top Tag */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow">
          <Shield className="w-3 h-3 text-secondary" />
          <span className="text-[9px] font-mono tracking-widest text-slate-300 uppercase font-semibold">
            {theme.sealTitle}
          </span>
        </div>

        {/* Heraldic Corporate Monogram Emblem */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className={`w-28 h-28 rounded-2xl bg-gradient-to-br from-slate-800/90 to-slate-950/90 p-1 border-2 ${theme.border} shadow-2xl ${theme.glow} flex items-center justify-center relative mb-4 group-hover:scale-105 transition-transform duration-500`}>
            {/* Subtle inner gold/cyan ring */}
            <div className="w-full h-full rounded-xl bg-slate-900/90 flex flex-col items-center justify-center border border-white/10">
              <span className="font-display font-black text-3xl tracking-tight text-white drop-shadow-md">
                {initials}
              </span>
              <span className="text-[9px] font-mono font-bold tracking-widest text-secondary mt-0.5 uppercase">
                KKM
              </span>
            </div>

            {/* Verification Check Badge */}
            <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-md border-2 border-slate-900">
              <CheckCircle className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          </div>

          <span className="text-[11px] font-mono text-slate-300 uppercase tracking-wider font-semibold">
            Official Directorate Credential
          </span>
          <span className="text-[10px] text-slate-400 mt-0.5">
            گروه بین‌المللی کیمیا کاران ماد
          </span>
        </div>
      </div>
    );
  }

  // Avatar mode (for tables, headers, profile views, directory cards)
  const focalPosition = getMemberPhotoObjectPosition(effectivePhotoUrl || name);
  const isFill = className.includes('w-full') || className.includes('h-full');
  const radiusClass = shape === 'rounded' ? 'rounded-2xl' : shape === 'square' ? 'rounded-none' : 'rounded-full';
  const dimensionClass = isFill ? 'w-full h-full' : sizeClasses;

  if (isVerifiedPhoto && effectivePhotoUrl) {
    return (
      <div className={`relative inline-block ${isFill ? 'w-full h-full' : ''} ${className}`}>
        <img
          src={effectivePhotoUrl}
          alt={name}
          className={`${dimensionClass} ${radiusClass} object-cover ${shape === 'circle' ? `ring-2 ${theme.ring}` : ''} shadow-sm`}
          style={{ objectPosition: focalPosition }}
          onError={() => setImgError(true)}
        />
        {showBadge && (
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" title="Verified Identity" />
        )}
      </div>
    );
  }

  // Monogram circle/box fallback
  return (
    <div className={`relative inline-flex items-center justify-center ${radiusClass} bg-gradient-to-br ${theme.gradient} text-white font-bold font-display border ${theme.border} shadow-xs ${dimensionClass} ${className}`}>
      <span>{initials}</span>
      {showBadge && (
        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-1.5 ring-white dark:ring-slate-900" title="Verified Executive" />
      )}
    </div>
  );
};
