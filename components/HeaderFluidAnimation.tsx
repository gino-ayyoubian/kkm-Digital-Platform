import React, { Suspense, lazy } from 'react';
import animationData from '../data/kkmHeaderLottie.json';

const Lottie = lazy(async () => {
  const mod = (await import('lottie-react')) as any;
  const Component = mod.default || mod.Lottie || mod;
  return { default: Component as React.ComponentType<any> };
});

interface HeaderFluidAnimationProps {
  className?: string;
  opacity?: number;
}

export const HeaderFluidAnimation: React.FC<HeaderFluidAnimationProps> = ({
  className = '',
  opacity = 0.45,
}) => {
  return (
    <div
      className={`absolute inset-x-0 bottom-0 h-[28px] overflow-hidden pointer-events-none select-none z-0 ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <Suspense
        fallback={
          <svg
            viewBox="0 0 800 60"
            className="w-full h-full object-cover opacity-60"
            preserveAspectRatio="none"
          >
            <path
              d="M0 30 Q200 10 400 30 T800 30"
              fill="none"
              stroke="#4C9AFE"
              strokeWidth="2"
              className="node-connector"
            />
            <path
              d="M0 35 Q200 45 400 25 T800 35"
              fill="none"
              stroke="#F9A826"
              strokeWidth="1.5"
              className="node-connector"
            />
          </svg>
        }
      >
        <Lottie
          src={animationData}
          loop={true}
          autoplay={true}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Suspense>
    </div>
  );
};

export default HeaderFluidAnimation;
