import { cn } from "@/lib/utils";

function Bar({ className }: { className?: string }) {
  return <div className={cn("skeleton-shimmer rounded-lg", className)} />;
}

/** Placeholder for the membership plan cards while copy loads. */
export function PricingSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading membership plans"
      className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rounded-3xl border border-hairline bg-background/40 p-5">
          <Bar className="h-4 w-24" />
          <Bar className="mt-3 h-3 w-full" />
          <Bar className="mt-2 h-3 w-2/3" />
          <Bar className="mt-6 h-8 w-32" />
          <div className="mt-5 space-y-2.5">
            {Array.from({ length: 4 }).map((_, j) => (
              <Bar key={j} className="h-3 w-full" />
            ))}
          </div>
          <Bar className="mt-8 h-11 w-full rounded-full" />
        </div>
      ))}
    </div>
  );
}

/** Placeholder for the reviews grid while copy loads. */
export function ReviewsSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading reviews"
      className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-hairline bg-surface/40 p-4">
          <div className="flex items-center gap-3">
            <Bar className="h-9 w-9 rounded-full" />
            <div className="flex-1">
              <Bar className="h-3 w-24" />
              <Bar className="mt-2 h-2.5 w-16" />
            </div>
          </div>
          <Bar className="mt-4 h-3 w-full" />
          <Bar className="mt-2 h-3 w-full" />
          <Bar className="mt-2 h-3 w-3/4" />
        </div>
      ))}
    </div>
  );
}
