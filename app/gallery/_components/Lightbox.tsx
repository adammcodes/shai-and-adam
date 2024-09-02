// components/Lightbox.tsx
import React, { useEffect, useCallback, use } from "react";
import B2Image from "./B2Image";

interface LightboxProps {
  images: string[];
  currentImage: { index: number; imageName: string };
  openLightbox: (index: number) => void;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({
  // images,
  currentImage,
  openLightbox,
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

  useEffect(() => {
    // prevent scrolling up and down while the lightbox is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <button onClick={onClose} className="absolute top-4 right-4 text-white text-5xl">
        &times;
      </button>
      <button onClick={onPrev} className="absolute bottom-4 left-4 md:left-4 text-white text-4xl">
        &larr;
      </button>
      <button onClick={onNext} className="absolute bottom-4 right-4 md:right-4 text-white text-4xl">
        &rarr;
      </button>
      <div className="flex items-center justify-center">
        <B2Image
          imageName={currentImage.imageName}
          index={currentImage.index}
          alt={`Lightbox image - ${currentImage.imageName}`}
          onClick={openLightbox}
          isPriority={true}
          isLightboxOpen={true}
        />
      </div>
    </div>
  );
};

export default Lightbox;
