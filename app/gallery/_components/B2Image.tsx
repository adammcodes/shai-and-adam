"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface B2ImageProps {
  imageName: string;
  alt: string;
  isPriority: boolean;
}

interface ImageMetadata {
  url: string;
  width: number;
  height: number;
}

export default function B2Image({ imageName, alt, isPriority }: B2ImageProps) {
  const [imageData, setImageData] = useState<ImageMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImageData() {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/getImageUrl?imageName=${encodeURIComponent(imageName)}`);
        if (!response.ok) {
          throw new Error("Failed to fetch image data");
        }
        const data: ImageMetadata = await response.json();
        setImageData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    }

    fetchImageData();
  }, [imageName]);

  if (error) {
    console.log(error);
    return <></>;
  }

  return (
    <div className={`relative ${!isImageLoaded ? "h-96" : ""}`}>
      {!isImageLoaded && (
        <div className="absolute inset-0 bg-gray-300 border border-1 border-silver shadow-lg animate-pulse rounded-md" />
      )}
      {imageData && (
        <Image
          src={imageData.url}
          alt={alt}
          width={imageData.width}
          height={imageData.height}
          priority={isPriority}
          className={`object-cover w-full rounded-md shadow-lg ${
            isImageLoaded ? "opacity-100 transition-opacity duration-300" : "opacity-0"
          }`}
          onLoad={() => setIsImageLoaded(true)}
        />
      )}
    </div>
  );
}
