"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import PasswordProtection from "../_components/PasswordProtection";
import Link from "next/link";
import PhotoWall from "../_components/PhotoWall";
import GalleryNav from "../_components/GalleryNav";
import { subfolders, events } from "../_constants/links";
import { PAGE_SIZE } from "../_constants/pageSize";

export default function EventGallery({ params }: { params: { event: string } }) {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [continuationToken, setContinuationToken] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  // This is to prevent the initial fetch from being called twice due to React's StrictMode in development
  const initialFetchDone = useRef(false);

  const eventName = params.event;
  const photoWallTitle = events.find(event => event.name.toLowerCase() === eventName)?.label;

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
    1100: 3,
    700: 3,
    500: 3,
  };

  if (error) {
    return <div className="container mx-auto p-4 text-center">{error}</div>;
  }

  if (params.event === "personal") {
    return (
      <PasswordProtection>
        <div className="container mx-auto p-4 max-w-[1200px] flex flex-col justify-center">
          <GalleryNav eventName={eventName} />
          <h1 className="text-2xl font-bold mb-4 mt-4 text-center">Personal Photos</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {subfolders.map(subfolder => (
              <Link
                href={`/gallery/${params.event}/${subfolder.name.toLowerCase()}`}
                key={subfolder.name}
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                  <div className="relative h-96">
                    <img
                      src={subfolder.coverImage}
                      alt={`${subfolder.name} cover`}
                      className="object-cover object-top w-full h-full"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold">{subfolder.label || subfolder.name}</h2>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </PasswordProtection>
    );
  }

  return (
    <PasswordProtection>
      <PhotoWall
        title={photoWallTitle || params.event.charAt(0).toUpperCase() + params.event.slice(1)}
        breakpointCols={breakpointColumnsObj}
        eventName={params.event}
        images={images}
        pageSize={PAGE_SIZE}
        isLoading={isLoading}
        hasMore={hasMore}
        handleLoadMore={handleLoadMore}
      />
    </PasswordProtection>
  );
}
