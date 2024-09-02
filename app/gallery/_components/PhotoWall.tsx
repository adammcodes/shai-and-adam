"use client";
import { useState } from "react";
import Masonry from "react-masonry-css";
import B2Image from "./B2Image";
import Lightbox from "./Lightbox";

export default function PhotoWall({
  title,
  breakpointCols,
  images,
  eventName,
  pageSize,
  isLoading,
  hasMore,
  handleLoadMore,
}: {
  title: string;
  breakpointCols: { default: number; 1100: number; 700: number };
  images: string[];
  eventName: string;
  pageSize: number;
  isLoading: boolean;
  hasMore: boolean;
  handleLoadMore: () => void;
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<{
    index: number;
    imageName: string;
  }>({ index: 0, imageName: "" });

  const openLightbox = (index: number) => {
    // setCurrentImageIndex(index);
    setCurrentImage({ index, imageName: images[index] });
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const goToPrevious = () => {
    // setCurrentImageIndex(prevIndex => (prevIndex - 1 + images.length) % images.length);
    setCurrentImage(prevImage => {
      const newIndex = (prevImage.index - 1 + images.length) % images.length;
      return { index: newIndex, imageName: images[newIndex] };
    });
  };

  const goToNext = () => {
    // setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    setCurrentImage(prevImage => {
      const newIndex = (prevImage.index + 1) % images.length;
      return { index: newIndex, imageName: images[newIndex] };
    });
  };

  return (
    <div className="container mx-auto md:p-2 lg:p-4 max-w-[1200px] flex flex-col justify-center">
      <h1 className="text-2xl font-bold mb-4 mt-4 text-center">{title}</h1>
      <Masonry
        breakpointCols={breakpointCols}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {images.map((imageName, i) => (
          <B2Image
            key={imageName}
            index={i}
            imageName={imageName}
            alt={`${eventName} photo - ${imageName}`}
            isPriority={i < 10}
            isLightboxOpen={lightboxOpen}
            onClick={openLightbox}
          />
        ))}
        {isLoading &&
          Array.from({ length: pageSize }).map((_, i) => (
            <div key={`placeholder-${i}`} className="h-48 bg-gray-200 animate-pulse"></div>
          ))}
      </Masonry>
      {!isLoading && hasMore && images.length % pageSize === 0 && (
        <button
          onClick={handleLoadMore}
          className="w-36 mx-auto mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Load More
        </button>
      )}
      {!hasMore && <div className="text-center mt-4">That's all we got!</div>}
      {lightboxOpen && (
        <Lightbox
          images={images}
          currentImage={currentImage}
          openLightbox={openLightbox}
          onClose={closeLightbox}
          onPrev={goToPrevious}
          onNext={goToNext}
        />
      )}
    </div>
  );
}
