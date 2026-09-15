import * as React from 'react';

interface ImageGalleryProps {
    images: string[];
    altText: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, altText }) => {
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

    if (!images || images.length === 0) {
        return null;
    }

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };
    
    const selectImage = (e: React.MouseEvent, index: number) => {
        e.stopPropagation();
        setCurrentImageIndex(index);
    }

    return (
        <div className="relative bg-gray-900">
            <div className="relative h-96 flex items-center justify-center">
                <img src={images[currentImageIndex]} alt={`${altText} gallery image ${currentImageIndex + 1}`} loading="lazy" className="max-w-full max-h-full object-contain"/>
            </div>
            
            {images.length > 1 && (
                <>
                    <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition-colors z-10" aria-label="Previous image">‹</button>
                    <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition-colors z-10" aria-label="Next image">›</button>

                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                        <div className="flex justify-center gap-2">
                            {images.map((imgSrc, index) => (
                                <button
                                    key={index}
                                    onClick={(e) => selectImage(e, index)}
                                    aria-label={`View image ${index + 1}`}
                                    className={`w-16 h-10 rounded-md overflow-hidden transition-all duration-200 ${index === currentImageIndex ? 'ring-2 ring-accent-yellow ring-offset-2 ring-offset-black/50' : 'opacity-60 hover:opacity-100'}`}
                                >
                                    <img src={imgSrc} alt={`Thumbnail ${index + 1}`} loading="lazy" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ImageGallery;