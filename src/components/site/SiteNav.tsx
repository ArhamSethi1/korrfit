import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { navItems, site } from "@/lib/site";
import { Logo } from "./primitives";
import { cn } from "@/lib/utils";
import { useLead } from "./LeadDialog";

export function SiteNav() {
  const { openLead } = useLead();
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const hero = document.getElementById("home");
      const threshold = hero ? hero.offsetHeight - 96 : 400;
      setPastHero(window.scrollY > threshold);
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);


  useEffect(() => {
    const ids = navItems.map((n) => n.href.slice(1));
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.15, 0.4] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-hairline bg-background/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8 md:h-20">
          <a href="#home" aria-label="KORR.fit home" className="shrink-0">
            <Logo />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={active === item.href ? "true" : undefined}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active === item.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-4 -bottom-0.5 h-px origin-center bg-primary transition-transform duration-300",
                    active === item.href ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.tel}
              className="hidden items-center gap-2 rounded-full border border-hairline px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface md:inline-flex"
            >
              <Phone width={15} height={15} aria-hidden="true" />
              {site.phoneDisplay}
            </a>
            <button
              type="button"
              onClick={() => openLead({ intent: "trial", source: "nav" })}
              className="hidden min-h-11 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:inline-flex"
            >
              Book Free Trial
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-foreground lg:hidden"
            >
              <Menu width={18} height={18} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="h-0.5 origin-left bg-primary transition-transform duration-150"
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      </header>

      {/* Fullscreen mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-[60] flex flex-col bg-background transition-all duration-400 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <Logo />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-hairline"
          >
            <X width={18} height={18} aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-1 px-6">
          {navItems.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{ animationDelay: open ? `${60 + i * 45}ms` : undefined }}
              className={cn(
                "border-b border-hairline py-4 font-display text-3xl font-semibold tracking-tight",
                open && "float-in",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="grid gap-3 p-6">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              openLead({ intent: "trial", source: "mobile_nav" });
            }}
            className="min-h-11 rounded-full bg-primary px-6 py-4 text-center font-semibold text-primary-foreground"
          >
            Book Free Trial
          </button>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={site.tel}
              className="rounded-full border border-hairline px-4 py-3 text-center text-sm font-medium"
            >
              Call Now
            </a>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-hairline px-4 py-3 text-center text-sm font-medium"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
