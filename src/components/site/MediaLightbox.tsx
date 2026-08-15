import { useCallback, useEffect, useRef, useState } from "react";
import { X, Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import type { ReviewMedia } from "@/data/content";
import { cn } from "@/lib/utils";

type Props = {
  items: ReviewMedia[];
  index: number;
  onIndexChange: (i: number) => void;
  onClose: () => void;
  title?: string;
  /** Wording for the popup header, e.g. "Member" or "Gym". */
  kind?: string;
};

function fmt(t: number) {
  if (!Number.isFinite(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

/** Minimal video player: play/pause and a timeline, nothing else. */
function VideoPlayer({ src, poster, label }: { src: string; poster?: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) void v.play().catch(() => {});
    else v.pause();
  };

  // Start playing the moment the clip is enlarged, and make absolutely sure
  // the element is torn down on unmount so audio never keeps running.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    setTime(0);
    setDuration(0);
    const start = () => void v.play().catch(() => {});
    if (v.readyState >= 2) start();
    else v.addEventListener("loadeddata", start, { once: true });

    return () => {
      v.removeEventListener("loadeddata", start);
      try {
        v.pause();
        v.removeAttribute("src");
        v.load();
      } catch {
        /* nothing to clean up */
      }
    };
  }, [src]);


  return (
    <div className="flex max-h-[92dvh] w-full flex-col items-center">
      <video
        ref={ref}
        src={src}
        poster={poster}
        autoPlay
        playsInline
        preload="auto"
        aria-label={label}
        onClick={toggle}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        className="max-h-[82dvh] w-auto max-w-[96vw] cursor-pointer object-contain"
      />
      <div className="mt-3 flex w-full max-w-xl items-center gap-3 rounded-full border border-hairline bg-background/70 px-4 py-2.5 backdrop-blur">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause video" : "Play video"}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {playing ? (
            <Pause width={16} height={16} className="fill-current" aria-hidden="true" />
          ) : (
            <Play width={16} height={16} className="fill-current" aria-hidden="true" />
          )}
        </button>
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={time}
          aria-label="Video timeline"
          onChange={(e) => {
            const v = ref.current;
            if (!v) return;
            v.currentTime = Number(e.target.value);
            setTime(Number(e.target.value));
          }}
          className="korr-range h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-surface-2 accent-primary"
        />
        <span className="w-20 shrink-0 text-right text-xs tabular-nums text-muted-foreground">
          {fmt(time)} / {fmt(duration)}
        </span>
      </div>
    </div>
  );
}

/**
 * Frameless media popup: the photo/video fills the screen at its own aspect
 * ratio. Esc or the mobile back button closes it, arrows move between items.
 */
export function MediaLightbox({ items, index, onIndexChange, onClose, title }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const item = items[index];

  // Keep the latest handlers in refs so the history/keyboard effects can run
  // exactly once per mount — re-running them on every index change used to
  // pop history (closing the popup) when the arrows were used.
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const goRef = useRef<(dir: number) => void>(() => {});

  // Reset the lightweight placeholder whenever the active item changes, and
  // warm the neighbouring photos so arrow navigation feels instant on mobile.
  useEffect(() => {
    setLoaded(false);
    if (items.length < 2 || typeof Image === "undefined") return;
    for (const dir of [1, -1]) {
      const next = items[(index + dir + items.length) % items.length];
      if (!next || next.videoSrc) continue;
      const img = new Image();
      img.decoding = "async";
      img.src = next.src;
    }
  }, [index, items]);

  const go = useCallback(
    (dir: number) => {
      if (items.length < 2) return;
      onIndexChange((index + dir + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );
  goRef.current = go;

  // Mobile back button should dismiss the media, not leave the site.
  // The router patches history.pushState and echoes a popstate of its own, so
  // ignore anything that fires immediately after our own push.
  useEffect(() => {
    const pushedAt = Date.now();
    // (disabled test)
    let popped = false;
    const onPop = () => {
      if (Date.now() - pushedAt < 600) return;
      popped = true;
      closeRef.current();
    };
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      if (!popped && window.history.state?.korrLightbox) window.history.back();
    };
  }, []);


  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        closeRef.current();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goRef.current(1);
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goRef.current(-1);
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables?.length) return;
      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey, true);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey, true);
      document.body.style.overflow = prevOverflow;
      // Return focus to the thumbnail that opened the popup.
      previouslyFocused?.focus?.();
    };
  }, []);


  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title ? `Media from ${title}` : "Media viewer"}
      className="backdrop-in fixed inset-0 z-[90] grid place-items-center bg-black/95 p-0 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="pop-in relative flex max-h-[100dvh] w-full items-center justify-center focus:outline-none"
      >
        {item.videoSrc ? (
          <VideoPlayer key={item.videoSrc} src={item.videoSrc} poster={item.src} label={item.alt} />
        ) : (
          <>
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute inset-x-8 inset-y-16 rounded-2xl transition-opacity duration-500",
                loaded ? "opacity-0" : "skeleton-shimmer opacity-60",
              )}
            />
            <img
              key={item.src}
              src={item.src}
              alt={item.alt}
              decoding="async"
              fetchPriority="high"
              onLoad={() => setLoaded(true)}
              className={cn(
                "max-h-[100dvh] max-w-[100vw] object-contain transition-opacity duration-500",
                loaded ? "opacity-100" : "opacity-0",
              )}
            />
          </>
        )}

        <button
          type="button"
          onClick={onClose}
          aria-label="Close media"
          className="absolute right-3 top-3 inline-flex h-12 w-12 items-center justify-center rounded-full border border-hairline bg-background/70 backdrop-blur transition-transform duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <X width={22} height={22} aria-hidden="true" />
        </button>

        {items.length > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous media"
              className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-hairline bg-background/70 backdrop-blur transition-transform duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ChevronLeft width={18} height={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next media"
              className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-hairline bg-background/70 backdrop-blur transition-transform duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ChevronRight width={18} height={18} aria-hidden="true" />
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
