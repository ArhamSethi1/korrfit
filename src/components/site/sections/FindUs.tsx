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
            <li className="flex gap-4">
              <MapPin width={18} height={18} aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
              <div className="text-sm leading-relaxed text-muted-foreground">
                {site.address.line1}
                <br />
                {site.address.line2}
                <br />
                {site.address.city}, {site.address.state} {site.address.postalCode}
              </div>
            </li>
            <li className="flex gap-4">
              <Phone width={18} height={18} aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
              <a href={site.tel} className="text-sm text-muted-foreground hover:text-foreground">
                {site.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-4">
              <Mail width={18} height={18} aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
              <a href={`mailto:${site.email}`} className="text-sm text-muted-foreground hover:text-foreground">
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
              Get directions
            </a>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-hairline bg-background/40 px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-surface"
            >
              Message on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
