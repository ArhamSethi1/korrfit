import { useEffect } from "react";
import { galleryPhotos, offerPosters, tourVideos } from "@/data/media";

const deferred = [
  ...offerPosters.map((o) => o.image),
  ...galleryPhotos.map((p) => p.src),
  ...tourVideos.map((v) => v.poster),
];


/**
 * Once the hero image has painted, quietly warm every other photo on the page
 * so gallery/amenity images are already in cache by the time they scroll in.
 */
export function ImagePreloader() {
  useEffect(() => {
    let cancelled = false;

    const warm = () => {
      if (cancelled) return;
      for (const src of deferred) {
        const img = new Image();
        img.decoding = "async";
        img.src = src;
      }
    };

    // Start warming right away so gallery/offer thumbnails are cached long
    // before the visitor scrolls to them.
    warm();
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
