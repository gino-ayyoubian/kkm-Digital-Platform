import * as React from 'react';

interface BlurUpImageProps {
    src: string;
    placeholder: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
    loading?: 'eager' | 'lazy';
}

const BlurUpImage: React.FC<BlurUpImageProps> = ({
    src,
    placeholder,
    alt,
    className = 'w-full h-full object-cover',
    width,
    height,
    loading = 'lazy',
}) => {
    const [isLoaded, setIsLoaded] = React.useState(false);

    React.useEffect(() => {
        setIsLoaded(false);
    }, [src]);

    return (
        <div className="relative overflow-hidden">
            <img
                src={placeholder}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full scale-110 object-cover"
                style={{
                    filter: 'blur(20px)',
                    opacity: isLoaded ? 0 : 1,
                    transition: 'opacity 300ms ease',
                }}
            />
            <img
                src={src}
                alt={alt}
                width={width}
                height={height}
                loading={loading}
                onLoad={() => setIsLoaded(true)}
                className={`relative z-10 ${className}`}
                style={{
                    opacity: isLoaded ? 1 : 0,
                    transition: 'opacity 300ms ease',
                }}
            />
        </div>
    );
};

export default BlurUpImage;
