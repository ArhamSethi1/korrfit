import { Star } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useText } from "@/lib/text";
import { Reveal } from "./Reveal";
import logo from "@/assets/korr-logo.png.asset.json";

export function Logo({ className }: { className?: string }) {
  return (
    <img
      src={logo.url}
      alt="KORR.fit"
      width={1920}
      height={427}
      className={cn("h-8 w-auto md:h-9", className)}
    />
  );
}

export function Stars({ size = 16, value = 5 }: { size?: number; value?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          width={size}
          height={size}
          aria-hidden="true"
          className={i < value ? "fill-[#fbbc04] text-[#fbbc04]" : "text-muted-foreground"}
        />
      ))}
    </span>
  );
}

export function Section({
  id,
  children,
  className,
  tone = "base",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "base" | "raised" | "deep";
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full overflow-hidden py-20 md:py-28",
        tone === "raised" && "bg-surface/40",
        tone === "deep" && "bg-[oklch(0.155_0.003_30)]",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tkey,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  align?: "left" | "center";
  /** When set, the copy can be overridden from the /edit page (keys: `${tkey}.eyebrow|title|lead`). */
  tkey?: string;
}) {
  const t = useText();
  const resolvedEyebrow = tkey ? t(`${tkey}.eyebrow`, eyebrow) : eyebrow;
  const resolvedTitle = tkey ? t(`${tkey}.title`, typeof title === "string" ? title : "") || title : title;
  const resolvedLead = tkey && lead ? t(`${tkey}.lead`, lead) : lead;

  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <span className="eyebrow">
        <span aria-hidden="true" className="h-px w-6 bg-primary" />
        {resolvedEyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-semibold leading-[1.08] sm:text-4xl md:text-5xl">
        {resolvedTitle}
      </h2>
      {resolvedLead ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">{resolvedLead}</p>
      ) : null}
    </Reveal>
  );
}
