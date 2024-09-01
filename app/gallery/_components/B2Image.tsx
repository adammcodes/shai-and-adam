"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface B2ImageProps {
  imageName: string;
  alt: string;
  isPriority: boolean;
  showDownloadButton?: boolean;
}

interface ImageMetadata {
  url: string;
  width: number;
  height: number;
}

export default function B2Image({
  imageName,
  alt,
  isPriority,
  showDownloadButton = true,
}: B2ImageProps) {
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

  const downloadImage = useCallback(async () => {
    if (!imageData) return;

    try {
      const response = await fetch(`/api/downloadImage?imageName=${encodeURIComponent(imageName)}`);
      if (!response.ok) throw new Error("Download failed");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = imageName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  }, [imageData, imageName]);

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
        <>
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
          {showDownloadButton && isImageLoaded && (
            <button
              onClick={downloadImage}
              className="absolute top-2 right-2 bg-white bg-opacity-75 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </button>
          )}
        </>
      )}
    </div>
  );
}
