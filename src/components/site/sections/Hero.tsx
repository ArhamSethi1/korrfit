import {
  MapPin,
  Star,
  ArrowRight,
  CreditCard,
  Tag,
  Dumbbell,
  Phone,
  Navigation,
  Instagram,
} from "lucide-react";
import { site } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import { useLead } from "../LeadDialog";
import { WhatsAppIcon } from "../WhatsAppIcon";
import heroImg from "@/assets/hero-gym.jpg";

const pillClass =
  "inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline bg-surface/50 px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-surface hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function Hero() {
  const { openLead } = useLead();

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
            <button
              type="button"
              onClick={() => openLead({ intent: "trial", source: "hero" })}
              className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground shadow-soft transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Book Free Trial
              <ArrowRight
                width={16}
                height={16}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
            <button
              type="button"
              onClick={() => openLead({ intent: "membership", source: "hero" })}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline bg-surface/60 px-6 py-4 text-sm font-semibold transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <CreditCard width={16} height={16} aria-hidden="true" />
              Buy Membership
            </button>
          </div>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <a href="#pricing" className={pillClass}>
              <Tag width={15} height={15} aria-hidden="true" className="text-primary" />
              View Pricing
            </a>
            <a href="#amenities" className={pillClass}>
              <Dumbbell width={15} height={15} aria-hidden="true" className="text-primary" />
              Amenities
            </a>
            <a
              href={site.tel}
              onClick={() => trackEvent("click_call", { source: "hero" })}
              className={pillClass}
            >
              <Phone width={15} height={15} aria-hidden="true" className="text-primary" />
              Call Now
            </a>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("click_whatsapp", { source: "hero" })}
              className={pillClass}
            >
              <WhatsAppIcon size={15} className="text-[#25D366]" />
              WhatsApp
            </a>
            <a
              href={site.directions}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("click_directions", { source: "hero" })}
              className={pillClass}
            >
              <Navigation width={15} height={15} aria-hidden="true" className="text-primary" />
              Get Directions
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("click_instagram", { source: "hero" })}
              className={pillClass}
            >
              <Instagram width={15} height={15} aria-hidden="true" className="text-primary" />
              Instagram
            </a>
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
