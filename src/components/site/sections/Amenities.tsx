import { useState } from "react";
import { Check } from "lucide-react";
import { Section, SectionHeading } from "../primitives";
import { Reveal } from "../Reveal";
import { amenityGroups } from "@/data/content";
import { cn } from "@/lib/utils";
import strength from "@/assets/gym-strength.jpg";
import cardio from "@/assets/gym-cardio.jpg";
import functional from "@/assets/gym-functional.jpg";
import recovery from "@/assets/gym-recovery.jpg";
import studio from "@/assets/gym-studio.jpg";

const images = [strength, cardio, functional, recovery, studio];

export function Amenities() {
  const [active, setActive] = useState(0);
  const group = amenityGroups[active]!;

  return (
    <Section id="amenities">
      <SectionHeading
        eyebrow="Amenities"
        title="Five zones, each with a job to do."
        lead="Space is the reason our floor never feels like a queue. Every kind of training has somewhere it belongs."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <div>
          <div
            role="tablist"
            aria-label="Amenity categories"
            className="flex flex-col gap-2"
          >
            {amenityGroups.map((g, i) => (
              <button
                key={g.title}
                role="tab"
                type="button"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border px-5 py-4 text-left transition-all duration-400",
                  active === i
                    ? "border-primary/50 bg-surface"
                    : "border-hairline bg-surface/30 hover:bg-surface/60",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-y-0 left-0 w-0.5 origin-top bg-primary transition-transform duration-400",
                    active === i ? "scale-y-100" : "scale-y-0",
                  )}
                />
                <span className="block text-base font-semibold">{g.title}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{g.blurb}</span>
              </button>
            ))}
          </div>
        </div>

        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-hairline bg-surface/40">
            <img
              key={active}
              src={images[active]}
              alt={`${group.title} at KORR.fit`}
              width={1400}
              height={900}
              loading="lazy"
              decoding="async"
              className="float-in hidden h-56 w-full object-cover md:block md:h-80"
            />
            <div className="p-6 md:p-7">
              <h3 className="text-xl font-semibold">{group.title}</h3>
              <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <Check width={15} height={15} aria-hidden="true" className="shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
