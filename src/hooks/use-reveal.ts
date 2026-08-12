import { useEffect, useRef, useState } from "react";

/**
 * Reveals an element once when it scrolls into view, then disconnects.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(rootMargin = "0px 0px -8% 0px") {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    let raf1 = 0;
    let raf2 = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        // Wait two frames so the hidden state paints first — otherwise
        // elements already in view on load (very common on desktop) snap in
        // without ever running the transition.
        raf1 = window.requestAnimationFrame(() => {
          raf2 = window.requestAnimationFrame(() => setShown(true));
        });
      },
      { rootMargin, threshold: 0.01 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
    };
  }, [rootMargin, shown]);


  return { ref, shown };
}
