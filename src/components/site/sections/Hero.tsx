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
import { CountUp } from "../CountUp";
import { useText } from "@/lib/text";
import { heroBackground } from "@/data/media";
import logo from "@/assets/korr-logo.png.asset.json";


const pillClass =
  "inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline bg-background/40 px-4 py-2.5 text-sm font-medium text-muted-foreground backdrop-blur transition-colors hover:border-primary/40 hover:bg-background/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function Hero() {
  const { openLead } = useLead();
  const t = useText();

  return (
    <section id="home" className="gpu relative isolate overflow-hidden">
      {/* Full-bleed hero background — portrait crop on phones, wide on desktop */}
      <img
        src={heroBackgroundMobile}
        alt="The training floor at KORR.fit gym in Mansarovar, Jaipur"
        width={1562}
        height={1920}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center sm:hidden"
      />
      <img
        src={heroBackground}
        alt="The strength training floor at KORR.fit gym in Mansarovar, Jaipur"
        width={1600}
        height={1200}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-20 hidden h-full w-full object-cover object-center sm:block"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,oklch(0.185_0.003_30/0.92)_0%,oklch(0.185_0.003_30/0.78)_45%,oklch(0.185_0.003_30/0.45)_100%)]"
      />


      <div className="mx-auto w-full max-w-7xl px-5 pb-14 pt-7 sm:px-8 sm:pt-24 md:pb-28 md:pt-32">
        <div className="max-w-3xl">
          <span className="eyebrow rise-in">
            <MapPin width={14} height={14} aria-hidden="true" className="text-primary" />
            {t("hero.eyebrow", "Mansarovar, Jaipur")}
          </span>

          <h1 className="mt-5 sm:mt-6">
            <span className="sr-only">
              KORR.fit — premium gym in Mansarovar, Jaipur
            </span>
            <span className="pop-in inline-flex rounded-2xl border border-hairline bg-background/70 px-5 py-4 backdrop-blur-sm md:backdrop-blur-md">
              <img
                src={logo.url}
                alt="KORR.fit"
                width={1920}
                height={427}
                className="h-12 w-auto sm:h-16 md:h-20"
              />
            </span>
          </h1>

          <p
            className="rise-in mt-5 font-display text-2xl font-semibold leading-tight tracking-tight sm:mt-6 sm:text-3xl md:text-4xl"
            style={{ animationDelay: "80ms" }}
          >
            {t("hero.headline", "Train with people who")}{" "}
            <span className="text-primary">{t("hero.headlineAccent", "actually know your name.")}</span>
          </p>

          <p
            className="rise-in mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-5 md:text-lg"
            style={{ animationDelay: "140ms" }}
          >
            {t(
              "hero.paragraph",
              "KORR.fit is a spacious, clean gym in Mansarovar with certified trainers, and everything from strength and functional training to Zumba, steam and nutrition guidance.",
            )}

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
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline bg-background/50 px-6 py-4 text-sm font-semibold backdrop-blur transition-colors hover:bg-background/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-3 rounded-full border border-hairline bg-background/60 px-4 py-2.5 backdrop-blur">
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
                <CountUp to={site.rating.count} suffix="+" /> Google reviews
              </span>
            </div>
            {[
              { k: "Zumba", v: "Alternate days" },
              { k: "Steam", v: "Recovery room" },
            ].map((s) => (
              <div
                key={s.v}
                className="inline-flex items-center gap-2 rounded-full border border-hairline bg-background/60 px-4 py-2.5 backdrop-blur"
              >
                <span className="font-display text-sm font-semibold">{s.k}</span>
                <span className="text-[0.68rem] uppercase tracking-widest text-muted-foreground">
                  {s.v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
