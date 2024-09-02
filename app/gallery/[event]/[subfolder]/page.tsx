"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import PasswordProtection from "../../_components/PasswordProtection";
import PhotoWall from "../../_components/PhotoWall";

const PAGE_SIZE = 60;

export default function PersonalSubfolder({
  params,
}: {
  params: { event: string; subfolder: string };
}) {
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
        url.searchParams.append("event", `${params.event}/${params.subfolder}`);

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
    [params.event, params.subfolder]
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
    1100: 3,
    700: 3,
    500: 3,
  };

  if (error) {
    return (
      <PasswordProtection>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-8 text-center">
            {params.subfolder.charAt(0).toUpperCase() + params.subfolder.slice(1)}
          </h1>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <h2 className="text-xl font-semibold">{error}</h2>
          </div>
        </div>
      </PasswordProtection>
    );
  }

  return (
    <PasswordProtection>
      <PhotoWall
        title={params.subfolder.charAt(0).toUpperCase() + params.subfolder.slice(1)}
        breakpointCols={breakpointColumnsObj}
        images={images}
        eventName={params.subfolder}
        pageSize={PAGE_SIZE}
        isLoading={isLoading}
        hasMore={hasMore}
        handleLoadMore={handleLoadMore}
      />
    </PasswordProtection>
  );
}
