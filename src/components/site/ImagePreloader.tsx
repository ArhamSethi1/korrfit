import { useEffect } from "react";
import { galleryPhotos, tourVideos } from "@/data/media";

const deferred = [
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
    let timer = 0;
    let idleCallback = 0;

    const warmNext = (index = 0) => {
      if (cancelled) return;
      const src = deferred[index];
      if (!src) return;

      const img = new Image();
      img.decoding = "async";
      img.fetchPriority = "low";
      img.src = src;

      // One request at a time prevents off-screen media from competing with
      // the first screen, fonts, navigation and form code on slower phones.
      timer = window.setTimeout(() => warmNext(index + 1), 350);
    };

    const start = () => {
      if ("requestIdleCallback" in window) {
        idleCallback = window.requestIdleCallback(() => warmNext(), { timeout: 1800 });
      } else {
        timer = window.setTimeout(() => warmNext(), 1200);
      }
    };

    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", start);
      window.clearTimeout(timer);
      if (idleCallback && "cancelIdleCallback" in window) window.cancelIdleCallback(idleCallback);
    };
  }, []);

  return null;
}
