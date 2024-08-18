"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Masonry from "react-masonry-css";
import B2Image from "../_components/B2Image";
import PasswordProtection from "../_components/PasswordProtection";

const PAGE_SIZE = 20; // Make sure this matches the PAGE_SIZE in the API route

export default function EventGallery({ params }: { params: { event: string } }) {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [continuationToken, setContinuationToken] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  // This is to prevent the initial fetch from being called twice due to React's StrictMode in development
  const initialFetchDone = useRef(false);

  const fetchImages = useCallback(
    async (token: string | null) => {
      try {
        setIsLoading(true);
        const url = new URL(`/api/getImageList`, window.location.origin);
        url.searchParams.append("event", params.event);
        if (token) {
          url.searchParams.append("continuationToken", token);
        }

        console.log(`Fetching images with token: ${token}`);

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error("Failed to fetch image list");
        const data = await res.json();

        console.log(
          `Received ${data.images.length} images, nextContinuationToken: ${data.nextContinuationToken}`
        );

        if (data.images.length === 0 && !token) {
          setError("No images found for this event");
        } else {
          setImages(prevImages => {
            const newImages = token ? [...prevImages, ...data.images] : data.images;
            console.log(`Total images after update: ${newImages.length}`);
            return newImages;
          });
          setContinuationToken(data.nextContinuationToken);
          setHasMore(data.hasMore);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
        setError("Failed to load images");
      } finally {
        setIsLoading(false);
      }
    },
    [params.event]
  );

  useEffect(() => {
    if (!initialFetchDone.current) {
      fetchImages(null);
      initialFetchDone.current = true;
    }
  }, [fetchImages]);

  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMore && continuationToken) {
      fetchImages(continuationToken);
    }
  }, [isLoading, hasMore, continuationToken, fetchImages]);

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  if (error) {
    return <div className="container mx-auto p-4 text-center">{error}</div>;
  }

  return (
    <PasswordProtection>
      <div className="container mx-auto p-4 max-w-[1200px] flex flex-col justify-center">
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
          {isLoading &&
            Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <div key={`placeholder-${i}`} className="h-48 bg-gray-200 animate-pulse"></div>
            ))}
        </Masonry>
        {!isLoading && hasMore && images.length % PAGE_SIZE === 0 && (
          <button
            onClick={handleLoadMore}
            className="w-36 mx-auto mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Load More
          </button>
        )}
        {!hasMore && <div className="text-center mt-4">That's all for now!</div>}
      </div>
    </PasswordProtection>
  );
}
