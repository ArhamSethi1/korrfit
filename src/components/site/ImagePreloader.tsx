import { useEffect } from "react";
import { galleryPhotos, offerPosters, tourRoomImages, tourVideos } from "@/data/media";

// Keep the critical queue intentionally small. Starting every gallery request
// at once on desktop can starve the offer posters directly below the hero.
const startup = offerPosters.map((offer) => offer.image);

const remaining = [
  ...galleryPhotos.map((photo) => photo.src),
  ...tourVideos.map((video) => video.poster),
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
      timers.push(window.setTimeout(() => warm(src, "low"), 500 + index * 120));
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
