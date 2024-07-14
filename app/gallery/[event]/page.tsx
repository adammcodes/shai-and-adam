// app/gallery/[event]/page.tsx
"use client";

import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import B2Image from "../_components/B2Image";

export default function EventGallery({ params }: { params: { event: string } }) {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch(`/api/getImageList?event=${params.event}`);
        if (!res.ok) throw new Error("Failed to fetch image list");
        const data = await res.json();

        if (data.images.length === 1 && data.images.includes(`${params.event}/.bzEmpty`)) {
          setImages([]);
          setError("No images found for this event");
        }

        setImages(data.images);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchImages();
  }, [params.event]);

  if (isLoading) {
    return <div className="container mx-auto p-4 text-center">Loading gallery...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-center">{error}</div>;
  }

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <div className="container mx-auto p-4 max-w-[1200px]">
      <h1 className="text-2xl font-bold mb-4 mt-4 text-center">
        {params.event.charAt(0).toUpperCase() + params.event.slice(1)}
      </h1>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {images.map((imageName, i) => (
          <B2Image
            key={imageName}
            imageName={imageName}
            alt={`${params.event} photo - ${imageName}`}
            isPriority={i < 3}
          />
        ))}
      </Masonry>
    </div>
  );
}
