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

    const startAfterHero = () => {
      const hero = document.querySelector<HTMLImageElement>("#home img");
      if (!hero || hero.complete) {
        schedule();
        return;
      }
      hero.addEventListener("load", schedule, { once: true });
      hero.addEventListener("error", schedule, { once: true });
    };

    const schedule = () => {
      const ric = (window as unknown as { requestIdleCallback?: (cb: () => void) => number })
        .requestIdleCallback;
      if (ric) ric(warm);
      else window.setTimeout(warm, 300);
    };

    startAfterHero();
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
