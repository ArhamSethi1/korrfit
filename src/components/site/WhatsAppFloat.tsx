import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { cn } from "@/lib/utils";

export function WhatsAppFloat() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={site.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with KORR.fit on WhatsApp"
      onClick={() => trackEvent("click_whatsapp", { source: "float" })}
      className={cn(
        "group fixed bottom-5 right-5 z-40 inline-flex min-h-11 items-center gap-3 rounded-full border border-[#25D366]/50 bg-surface/90 py-3 pl-3 pr-4 text-sm font-semibold text-foreground shadow-lift backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[#25D366] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-black">
        <WhatsAppIcon size={18} />
      </span>
      <span className="hidden sm:inline">Chat with us</span>
    </a>
  );
}
