import { MapPin, Star, ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import heroImg from "@/assets/hero-gym.jpg";

const secondary = [
  { label: "Buy Membership", href: "#pricing" },
  { label: "View Pricing", href: "#pricing" },
  { label: "Amenities", href: "#amenities" },
  { label: "Call Now", href: site.tel },
  { label: "WhatsApp", href: site.whatsapp },
  { label: "Get Directions", href: site.directions },
  { label: "Instagram", href: site.instagram },
];

export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden pt-24 md:pt-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 h-[36rem] w-[36rem] rounded-full bg-primary/12 blur-[140px]"
      />
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 pb-16 pt-6 sm:px-8 md:pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <span className="eyebrow">
            <MapPin width={14} height={14} aria-hidden="true" className="text-primary" />
            Mansarovar, Jaipur
          </span>

          <h1 className="mt-5 text-[2.6rem] font-semibold leading-[1.03] tracking-tight sm:text-6xl lg:text-[4.25rem]">
            Train with people who
            <span className="block text-primary">actually know your name.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            KORR.fit is a spacious, genuinely clean gym in Mansarovar with certified trainers,
            personalised plans and everything from strength and functional training to Zumba, steam
            and nutrition guidance.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground shadow-soft transition-transform duration-300 hover:-translate-y-0.5"
            >
              Book Free Trial
              <ArrowRight
                width={16}
                height={16}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center rounded-full border border-hairline bg-surface/60 px-6 py-4 text-sm font-semibold transition-colors hover:bg-surface"
            >
              Buy Membership
            </a>
          </div>

          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {secondary.slice(2).map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                {s.label}
              </a>
            ))}
          </div>

          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-hairline bg-surface/70 px-4 py-2.5">
            <span className="inline-flex items-center gap-1 text-sm font-semibold">
              <Star
                width={15}
                height={15}
                aria-hidden="true"
                className="fill-[#fbbc04] text-[#fbbc04]"
              />
              {site.rating.value}
            </span>
            <span aria-hidden="true" className="h-4 w-px bg-hairline" />
            <span className="text-sm text-muted-foreground">
              {site.rating.count}+ Google reviews
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="grain overflow-hidden rounded-[2rem] border border-hairline shadow-lift">
            <img
              src={heroImg}
              alt="The strength training floor at KORR.fit gym in Mansarovar, Jaipur"
              width={1600}
              height={1200}
              fetchPriority="high"
              decoding="async"
              className="h-[22rem] w-full object-cover sm:h-[30rem] lg:h-[34rem]"
            />
          </div>
          <div className="absolute -bottom-6 left-4 right-4 grid grid-cols-3 gap-3 rounded-2xl border border-hairline bg-background/90 p-4 backdrop-blur-xl sm:left-8 sm:right-8">
            {[
              { k: "2", v: "Floors" },
              { k: "6", v: "Certified trainers" },
              { k: "15+", v: "Programs" },
            ].map((s) => (
              <div key={s.v} className="text-center">
                <div className="font-display text-xl font-semibold sm:text-2xl">{s.k}</div>
                <div className="mt-0.5 text-[0.68rem] uppercase tracking-widest text-muted-foreground">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
