"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import useSWR from "swr";

export type ImageMetadata = {
  url: string;
  width: number;
  height: number;
};

interface B2ImageProps {
  imageName: string;
  index: number;
  alt: string;
  isPriority: boolean;
  showDownloadButton?: boolean;
  isLightboxOpen: boolean;
  onClick: (index: number) => void;
}

export default function B2Image({
  imageName,
  index,
  alt,
  isPriority,
  showDownloadButton = true,
  isLightboxOpen,
  onClick,
}: B2ImageProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { data: imageData, error } = useSWR(
    `image-${imageName}`,
    () =>
      fetch(`/api/getImageUrl?imageName=${encodeURIComponent(imageName)}`, {
        method: "GET",
        headers: { "cache-control": "force-cache" },
      }).then(res => res.json()),
    {
      revalidateOnFocus: false,
      revalidateIfStale: false, // don't revalidate since we know the images won't change very often
    }
  );

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

  const landscape = imageData?.width > imageData?.height;
  const containerClasses = isLightboxOpen
    ? `w-[90%] md:w-1/2  ${landscape ? "lg:w-1/2" : "lg:w-[60vh]"}`
    : "";

  return (
    <div className={`relative ${!isImageLoaded ? "h-36 md:h-48 lg:h-96" : containerClasses}`}>
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
            className={`object-cover cursor-pointer w-full lg:rounded-md shadow-lg ${
              isImageLoaded ? "opacity-100 transition-opacity duration-300" : "opacity-0"
            }`}
            onLoad={() => setIsImageLoaded(true)}
            onClick={() => onClick(index)}
          />
          {showDownloadButton && isImageLoaded && (
            <button
              onClick={downloadImage}
              className={`${isLightboxOpen ? "" : "hidden"} lg:block absolute top-2 right-2 bg-white bg-opacity-75 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all duration-200`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 sm:w-6 sm:h-6"
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
