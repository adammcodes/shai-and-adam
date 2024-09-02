// components/Lightbox.tsx
import React, { useEffect, useCallback } from "react";
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

  // detect side scrolling and trigger prev/next while debouncing
  // useEffect(() => {
  //   const handleWheel = (e: WheelEvent) => {
  //     if (e.deltaY > 0) onNext();
  //     if (e.deltaY < 0) onPrev();
  //   };

  //   document.addEventListener("wheel", handleWheel);
  //   return () => document.removeEventListener("wheel", handleWheel);
  // }, [onNext, onPrev]);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    let lastWheelTime = 0;
    const wheelDelay = 100; // Adjust this value to fine-tune the debounce delay

    const handleWheel = (e: WheelEvent) => {
      const currentTime = new Date().getTime();

      if (currentTime - lastWheelTime < wheelDelay) {
        // If the wheel event is triggered within the delay, clear the previous timeout
        if (timeoutId) clearTimeout(timeoutId);
      } else {
        // If it's a new wheel action, update the last wheel time
        lastWheelTime = currentTime;
      }

      // Set a new timeout
      timeoutId = setTimeout(() => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
          // Horizontal scrolling
          if (e.deltaX > 0) onNext();
          else if (e.deltaX < 0) onPrev();
        } else {
          // Vertical scrolling
          if (e.deltaY > 0) onNext();
          else if (e.deltaY < 0) onPrev();
        }
      }, wheelDelay);
    };

    document.addEventListener("wheel", handleWheel, { passive: true });
    return () => {
      document.removeEventListener("wheel", handleWheel);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [onNext, onPrev]);

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
      <div className="flex items-center justify-center w-full">
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
