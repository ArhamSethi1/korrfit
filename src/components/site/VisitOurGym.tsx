import { Navigation } from "lucide-react";
import { site } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/** Prominent red call-to-action that opens directions to the gym. */
export function VisitOurGym({
  className,
  source = "section",
}: {
  className?: string;
  source?: string;
}) {
  return (
    <div className={cn("mt-10 flex justify-center", className)}>
      <a
        href={site.directions}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackEvent("click_directions", { source })}
        className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-lift transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-base"
      >
        <Navigation width={17} height={17} aria-hidden="true" />
        Visit Our Gym
      </a>
    </div>
  );
}
