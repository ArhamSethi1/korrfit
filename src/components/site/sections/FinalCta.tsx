import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { Logo } from "../primitives";
import { navItems } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-y border-hairline py-24 md:py-32">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[150px]"
      />
      <div className="relative mx-auto w-full max-w-3xl px-5 text-center sm:px-8">
        <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
          Ready to start your
          <span className="block text-primary">transformation?</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Come in for a free trial session. Train once with a coach, see the floor for yourself, and
          decide after — no pressure, no paperwork first.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
          >
            Book your free trial
            <ArrowRight
              width={16}
              height={16}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
          <a
            href={site.tel}
            className="inline-flex items-center rounded-full border border-hairline bg-surface/60 px-7 py-4 text-sm font-semibold transition-colors hover:bg-surface"
          >
            Call {site.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="py-14">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A spacious, genuinely clean gym in Mansarovar, Jaipur — with certified trainers,
              personalised plans and a community that keeps you coming back.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-xs uppercase tracking-widest text-muted-foreground">Explore</h2>
            <ul className="mt-4 space-y-2.5">
              {navItems.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs uppercase tracking-widest text-muted-foreground">Visit</h2>
            <address className="mt-4 space-y-2.5 text-sm not-italic text-muted-foreground">
              <p>
                {site.address.line1}, {site.address.line2}, {site.address.city}{" "}
                {site.address.postalCode}
              </p>
              <p>
                <a href={site.tel} className="hover:text-foreground">
                  {site.phoneDisplay}
                </a>
              </p>
              <p>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground"
                >
                  Instagram
                </a>
                {" · "}
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground"
                >
                  WhatsApp
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-hairline pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
          <p>Mansarovar, Jaipur · Rajasthan</p>
        </div>
      </div>
    </footer>
  );
}
