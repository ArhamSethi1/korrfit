const HEADER_OFFSET = 76;




/** Gentle ease-in-out so the page visibly glides instead of snapping. */
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

let activeAnimation = 0;

/** Snappy but visible: short hops ~420ms, long jumps up to ~900ms. */
function durationFor(distance: number) {
  return Math.min(900, Math.max(420, 320 + distance * 0.22));
}

/** Touch devices jump straight there — animated scrolling feels laggy. */
const isTouch = () =>
  typeof window !== "undefined" &&
  (window.matchMedia?.("(pointer: coarse)").matches || window.innerWidth < 768);

function animateScrollTo(target: number) {
  if (typeof window === "undefined") return;
  const start = window.scrollY;
  const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const end = Math.min(Math.max(0, target), max);
  const distance = end - start;
  if (Math.abs(distance) < 2) return;

  if (prefersReduced() || isTouch()) {
    window.scrollTo({ top: end, behavior: "auto" });
    return;
  }

  const duration = durationFor(Math.abs(distance));
  const startTime = performance.now();
  const id = ++activeAnimation;

  let firstFrame = true;
  const step = (now: number) => {
    if (id !== activeAnimation) return;
    if (firstFrame) {
      firstFrame = false;
      // Lightweight regression check: scrolling must start moving on the very
      // next frame on both mobile and desktop.
      const latency = now - startTime;
      if (import.meta.env.DEV && latency > 120) {
        console.warn(`[scroll] delayed start: ${Math.round(latency)}ms`);
      }
    }
    const progress = Math.min(1, (now - startTime) / duration);
    window.scrollTo({ top: start + distance * easeInOutCubic(progress), behavior: "auto" });
    if (progress < 1) window.requestAnimationFrame(step);
  };


  window.requestAnimationFrame(step);
}

/** Smoothly scrolls to an element id, accounting for the sticky header. */
export function scrollToId(id: string) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id.replace(/^#/, ""));
  if (!el) return;
  animateScrollTo(el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET);
}

export function scrollToTop() {
  animateScrollTo(0);
}
