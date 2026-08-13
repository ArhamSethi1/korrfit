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
    if (v.paused) void v.play();
    else v.pause();
  };

  return (
    <div className="relative w-full bg-black">
      <video
        ref={ref}
        src={src}
        poster={poster}
        autoPlay
        playsInline
        preload="metadata"
        aria-label={label}
        onClick={toggle}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        className="mx-auto max-h-[78dvh] w-auto max-w-full cursor-pointer bg-black object-contain"
      />
      <div className="flex items-center gap-3 border-t border-hairline bg-background px-4 py-3">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause video" : "Play video"}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
 * Standalone media popup: Esc to close, focus trap, arrow keys to move
 * between the photos/videos attached to a review.
 */
export function MediaLightbox({ items, index, onIndexChange, onClose, title, kind = "Member" }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const item = items[index];

  // Reset the lightweight placeholder whenever the active item changes, and
  // warm the neighbours so arrow navigation feels instant on mobile.
  useEffect(() => {
    setLoaded(false);
    if (items.length < 2 || typeof Image === "undefined") return;
    for (const dir of [1, -1]) {
      const next = items[(index + dir + items.length) % items.length];
      if (!next) continue;
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

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
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
      previouslyFocused?.focus?.();
    };
  }, [go, onClose]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title ? `Media from ${title}` : "Review media"}
      className="backdrop-in fixed inset-0 z-[90] grid place-items-center bg-black/90 p-2 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="pop-in relative flex max-h-[96dvh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-hairline bg-background focus:outline-none sm:rounded-3xl"
      >
        <div className="flex items-center justify-between gap-4 border-b border-hairline px-4 py-3 sm:px-5">
          <p className="min-w-0 truncate text-sm font-semibold">
            {item.type === "video" ? `${kind} video` : `${kind} photo`}
            {items.length > 1 ? (
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                {index + 1} / {items.length}
              </span>
            ) : null}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close media"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-hairline transition-transform duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <X width={17} height={17} aria-hidden="true" />
          </button>
        </div>

        <div className="relative flex-1 bg-black/40">
          {item.videoSrc ? (
            <VideoPlayer key={item.videoSrc} src={item.videoSrc} poster={item.src} label={item.alt} />
          ) : (
            <>
              {/* Skeleton + blurred preview keep the popup instant on mobile */}
              <span
                aria-hidden="true"
                className={cn(
                  "skeleton-shimmer absolute inset-0 transition-opacity duration-500",
                  loaded ? "opacity-0" : "opacity-100",
                )}
              />
              <img
                key={`${item.src}-preview`}
                src={item.src}
                alt=""
                aria-hidden="true"
                className={cn(
                  "absolute inset-0 h-full w-full scale-105 object-contain blur-xl transition-opacity duration-500",
                  loaded ? "opacity-0" : "opacity-70",
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
                  "relative mx-auto max-h-[88dvh] w-auto max-w-full object-contain transition-opacity duration-500",
                  loaded ? "opacity-100" : "opacity-0",
                )}
              />
            </>
          )}


          {items.length > 1 ? (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous media"
                className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-hairline bg-background/80 backdrop-blur transition-transform duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <ChevronLeft width={18} height={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next media"
                className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-hairline bg-background/80 backdrop-blur transition-transform duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <ChevronRight width={18} height={18} aria-hidden="true" />
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
