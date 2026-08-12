import { useState } from "react";
import { ArrowUpRight, Expand } from "lucide-react";
import { Section, SectionHeading } from "../primitives";
import { Reveal } from "../Reveal";
import { SmartImage } from "../SmartImage";
import { MediaLightbox } from "../MediaLightbox";
import { offerPosters } from "@/data/media";
import type { ReviewMedia } from "@/data/content";
import { site } from "@/lib/site";

const posterMedia: ReviewMedia[] = offerPosters.map((o) => ({
  type: "image",
  src: o.image,
  alt: `${o.title} — KORR.fit offer poster`,
}));

export function Offers() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Section id="offers">
      <SectionHeading
        tkey="offers"
        eyebrow="Current offers"
        title="Reasons to start this week."
        lead="Tap any poster to see the full offer, then grab it on WhatsApp."
      />

      <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {offerPosters.map((o, i) => (
          <Reveal key={o.title} delay={(i % 3) * 90}>
            <article className="card-hover group relative flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-surface/40 transition-all duration-500 md:rounded-3xl">
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`View full poster: ${o.title}`}
                className="relative block w-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <SmartImage
                  src={o.image}
                  alt={`${o.title} poster`}
                  loading="lazy"
                  decoding="async"
                  wrapperClassName="aspect-[4/5]"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-hairline bg-background/70 opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100"
                >
                  <Expand width={15} height={15} />
                </span>
                <span className="absolute bottom-3 left-3 inline-flex rounded-full border border-primary/40 bg-background/80 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-widest text-primary backdrop-blur sm:text-[0.68rem]">
                  {o.badge}
                </span>
              </button>

              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <h3 className="text-sm font-semibold sm:text-lg">{o.title}</h3>
                <p className="mt-2 line-clamp-4 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {o.blurb}
                </p>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-flex items-center gap-1.5 pt-4 text-xs font-semibold text-foreground underline-offset-4 hover:underline sm:text-sm"
                >
                  {o.cta}
                  <ArrowUpRight
                    width={15}
                    height={15}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {open !== null ? (
        <MediaLightbox
          items={posterMedia}
          index={open}
          onIndexChange={(i) => setOpen(i)}
          onClose={() => setOpen(null)}
          title="KORR.fit offers"
          kind="Offer"
        />
      ) : null}
    </Section>
  );
}
