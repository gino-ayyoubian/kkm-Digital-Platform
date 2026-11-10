import * as React from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion';

interface HolographicTiltContainerProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  glareOpacity?: number;
}

export const HolographicTiltContainer: React.FC<HolographicTiltContainerProps> = ({
  children,
  className = '',
  maxTilt = 4, // Subtle 4-degree maximum tilt
  perspective = 1200,
  glareOpacity = 0.15,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 300, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], shouldReduceMotion ? ['0deg', '0deg'] : [`${maxTilt}deg`, `-${maxTilt}deg`]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], shouldReduceMotion ? ['0deg', '0deg'] : [`-${maxTilt}deg`, `${maxTilt}deg`]);

  const glareX = useTransform(smoothX, [-0.5, 0.5], ['10%', '90%']);
  const glareY = useTransform(smoothY, [-0.5, 0.5], ['10%', '90%']);
  const glareBackground = useMotionTemplate`radial-gradient(400px circle at ${glareX} ${glareY}, rgba(0, 240, 255, ${glareOpacity}), rgba(255, 193, 7, 0.03) 50%, transparent 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / heightCal(rect.height) - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const heightCal = (h: number) => Math.max(h, 1);

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      style={{ perspective }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="w-full h-full relative"
      >
        {/* Holographic Specular Glare */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-30 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl"
          style={{ background: glareBackground }}
        />
        {children}
      </motion.div>
    </div>
  );
};
