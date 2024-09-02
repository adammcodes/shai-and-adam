// components/Lightbox.tsx
import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import type { ImageMetadata } from "./B2Image";

interface LightboxProps {
  images: string[];
  currentImageData: ImageMetadata | null;
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentImageData,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <button onClick={onClose} className="absolute top-4 right-4 text-white text-2xl">
        &times;
      </button>
      <button onClick={onPrev} className="absolute left-4 text-white text-4xl">
        &larr;
      </button>
      <button onClick={onNext} className="absolute right-4 text-white text-4xl">
        &rarr;
      </button>
      <div className="flex items-center justify-center w-full h-full">
        {currentImageData && (
          <Image
            src={currentImageData.url}
            alt={`Image ${currentIndex + 1}`}
            width={currentImageData.width}
            height={currentImageData.height}
            className={`w-[90%] lg:w-1/2 shadow-lg`}
            objectFit="contain"
          />
        )}
      </div>
    </div>
  );
};

export default Lightbox;
