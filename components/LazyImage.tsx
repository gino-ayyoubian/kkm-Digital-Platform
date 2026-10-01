import React, { useState, useEffect, useRef } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  rootMargin?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  rootMargin = '100px',
  className = '',
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    width,
    height,
    loading,
    decoding,
    style,
    ...imgProps
  } = props;
  const aspectRatio =
    typeof width === 'number' &&
    typeof height === 'number' &&
    width > 0 &&
    height > 0
      ? `${width} / ${height}`
      : style?.aspectRatio;

  useEffect(() => {
    const currentRef = containerRef.current;
    
    // Fallback for older browsers
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (currentRef) {
            observer.unobserve(currentRef);
          }
        }
      },
      { rootMargin }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [rootMargin]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full bg-gray-200 dark:bg-slate-700 animate-pulse relative"
      style={{
        animationPlayState: isLoaded ? 'paused' : 'running',
        backgroundColor: isLoaded ? 'transparent' : style?.backgroundColor,
        ...(aspectRatio ? { aspectRatio } : null),
      }}
    >
      {isVisible && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loading ?? 'lazy'}
          decoding={decoding ?? 'async'}
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-all`}
          style={style}
          onLoad={() => setIsLoaded(true)}
          {...imgProps}
        />
      )}
    </div>
  );
};

export default LazyImage;
