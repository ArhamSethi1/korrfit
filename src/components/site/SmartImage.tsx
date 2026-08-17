import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  /** Extra classes for the skeleton placeholder wrapper. */
  wrapperClassName?: string;
  /** Rounding applied to the skeleton so it matches the image frame. */
  skeletonClassName?: string;
  /** Fires with the intrinsic size once known (also for cached images). */
  onMeasure?: (width: number, height: number) => void;
};

/**
 * Image that shows a branded shimmer skeleton until the file has decoded.
 * Keeps layout stable and makes slow connections feel intentional.
 */
export function SmartImage({ className, wrapperClassName, skeletonClassName, onLoad, onMeasure, ...props }: Props) {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  // Cached images can finish before React attaches the load handler.
  useEffect(() => {
    const img = ref.current;
    if (img?.complete) {
      setLoaded(true);
      if (img.naturalWidth) onMeasure?.(img.naturalWidth, img.naturalHeight);
    }
  }, [onMeasure, props.src]);

  return (
    <span className={cn("relative block h-full w-full overflow-hidden", wrapperClassName)}>
      <span
        aria-hidden="true"
        className={cn(
          "skeleton-shimmer absolute inset-0 transition-opacity duration-500",
          skeletonClassName,
          loaded ? "opacity-0" : "opacity-100",
        )}
      />
      <img
        ref={ref}
        {...props}
        onLoad={(e) => {
          setLoaded(true);
          onMeasure?.(e.currentTarget.naturalWidth, e.currentTarget.naturalHeight);
          onLoad?.(e);
        }}
        className={cn(
          "relative h-full w-full transition-[opacity,transform] duration-700 ease-out",
          loaded ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]",
          className,
        )}
      />
    </span>
  );
}
