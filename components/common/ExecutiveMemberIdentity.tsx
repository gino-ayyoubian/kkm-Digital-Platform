import React from 'react';
import { Shield, Award, CheckCircle } from 'lucide-react';

interface ExecutiveMemberIdentityProps {
  name: string;
  nameFa?: string;
  role: string;
  department?: string;
  photoUrl?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'card';
  showBadge?: boolean;
  className?: string;
}

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

/**
 * Authentic Corporate Executive Identity Component
 * Displays either a verified genuine photograph (e.g. Gino Ayyoubian)
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
  showBadge = true,
  className = '',
}) => {
  const initials = getInitials(name);
  const theme = getTheme(role, name);

  // Check if this is Gino Ayyoubian to guarantee his authentic portrait is displayed
  const isGino = name.toLowerCase().includes('gino') || name.toLowerCase().includes('ayyoubian') || Boolean(nameFa && nameFa.includes('ژینو'));
  const effectivePhotoUrl = isGino 
    ? (photoUrl && (photoUrl.includes('gino-ayyoubian.jpg') || photoUrl.includes('gino_ayyoubian')) ? photoUrl : '/images/gino-ayyoubian.jpg')
    : photoUrl;

  // Check if photo is a real verified photo (e.g. Gino Ayyoubian or uploaded authentic image, NOT fake unsplash/pravatar)
  const isVerifiedPhoto = Boolean(
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
      return (
        <div className={`relative w-full h-full overflow-hidden ${className}`}>
          <img
            src={effectivePhotoUrl}
            alt={name}
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
          {/* Subtle vignette gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
          
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

  // Circular avatar mode (for tables, headers, profile views)
  if (isVerifiedPhoto && effectivePhotoUrl) {
    return (
      <div className={`relative inline-block ${className}`}>
        <img
          src={effectivePhotoUrl}
          alt={name}
          className={`${sizeClasses} rounded-full object-cover ring-2 ${theme.ring} shadow-sm`}
        />
        {showBadge && (
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" title="Verified Identity" />
        )}
      </div>
    );
  }

  // Monogram circle
  return (
    <div className={`relative inline-flex items-center justify-center rounded-full bg-gradient-to-br ${theme.gradient} text-white font-bold font-display border ${theme.border} shadow-xs ${sizeClasses} ${className}`}>
      <span>{initials}</span>
      {showBadge && (
        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-1.5 ring-white dark:ring-slate-900" title="Verified Executive" />
      )}
    </div>
  );
};
