import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "../primitives";
import { Reveal } from "../Reveal";
import { offers } from "@/data/content";
import { site } from "@/lib/site";

export function Offers() {
  return (
    <Section id="offers">
      <SectionHeading
        eyebrow="Current offers"
        title="Reasons to start this week."
        lead="Offer content is fully editable — swap these in and out whenever a promotion changes."
      />

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {offers.map((o, i) => (
          <Reveal key={o.title} delay={i * 90}>
            <article className="group relative h-full overflow-hidden rounded-3xl border border-hairline bg-surface/40 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition-opacity duration-500 group-hover:opacity-160"
              />
              <span className="inline-flex rounded-full border border-primary/40 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-widest text-primary">
                {o.badge}
              </span>
              <h3 className="mt-5 text-xl font-semibold">{o.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{o.blurb}</p>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground underline-offset-4 hover:underline"
              >
                {o.cta}
                <ArrowUpRight
                  width={15}
                  height={15}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
