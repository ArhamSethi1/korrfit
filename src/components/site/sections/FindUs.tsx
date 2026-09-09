import { MapPin, Phone, Clock, Mail, Navigation } from "lucide-react";
import { Section, SectionHeading } from "../primitives";
import { site } from "@/lib/site";

export function FindUs() {
  return (
    <Section id="contact">
      <SectionHeading
        eyebrow="Find us"
        title="We are on Shipra Path, Mansarovar."
        lead="Opposite Neerja Modi School — easy to reach from anywhere in Mansarovar, with parking right outside."
      />

      <div className="mt-12 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="overflow-hidden rounded-3xl border border-hairline">
          <iframe
            src={site.mapEmbed}
            title="KORR.fit location on Google Maps"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-80 w-full border-0 md:h-full md:min-h-[26rem]"
          />
        </div>

        <div className="rounded-3xl border border-hairline bg-surface/40 p-7">
          <ul className="space-y-6">
            <li>
              <a
                href={site.directions}
                target="_blank"
                rel="noreferrer"
                className="flex gap-4 rounded-2xl border border-primary/30 bg-primary/5 p-3 transition-colors hover:border-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <MapPin width={18} height={18} aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
                <span className="text-sm font-medium leading-relaxed text-foreground">
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                  <br />
                  {site.address.city}, {site.address.state} {site.address.postalCode}
                </span>
              </a>
            </li>
            <li>
              <a
                href={site.tel}
                className="flex gap-4 rounded-2xl border border-primary/30 bg-primary/5 p-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Phone width={18} height={18} aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="flex gap-4 rounded-2xl border border-primary/30 bg-primary/5 p-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Mail width={18} height={18} aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
                {site.email}
              </a>
            </li>
            <li className="flex gap-4">
              <Clock width={18} height={18} aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
              <div className="space-y-1 text-sm text-muted-foreground">
                {site.hours.map((h) => (
                  <div key={h.days}>
                    <span className="text-foreground">{h.days}</span> · {h.time}
                  </div>
                ))}
              </div>
            </li>
          </ul>

          <div className="mt-8 grid gap-3">
            <a
              href={site.directions}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
            >
              <Navigation width={15} height={15} aria-hidden="true" />
              Visit Our Gym
            </a>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-black transition-transform duration-300 hover:-translate-y-0.5"
            >
              Message on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
