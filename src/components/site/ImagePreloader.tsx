import { useEffect } from "react";
import { galleryPhotos, offerPosters, tourRoomImages, tourVideos } from "@/data/media";

const startup = [
  ...offerPosters.map((offer) => offer.image),
  ...tourVideos.map((video) => video.poster),
  ...galleryPhotos.slice(0, 8).map((photo) => photo.src),
];

const remaining = [
  ...galleryPhotos.slice(8).map((photo) => photo.src),
  ...tourRoomImages,
];


/**
 * Warm the Offers and opening Gallery assets as soon as the app starts. The
 * rest continue at low priority after that first useful group is requested.
 */
export function ImagePreloader() {
  useEffect(() => {
    let cancelled = false;
    const timers: number[] = [];
    const images: HTMLImageElement[] = [];

    const warm = (src: string, priority: "high" | "low") => {
      if (cancelled) return;
      const img = new Image();
      img.decoding = "async";
      img.fetchPriority = priority;
      img.src = src;
      images.push(img);
    };

    // Do not wait for window.load: that event itself waits for important page
    // assets and caused the website to appear unfinished for several seconds.
    startup.forEach((src) => warm(src, "high"));

    remaining.forEach((src, index) => {
      timers.push(window.setTimeout(() => warm(src, "low"), 150 + index * 80));
    });

    return () => {
      cancelled = true;
      timers.forEach(window.clearTimeout);
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, []);

  return null;
}
