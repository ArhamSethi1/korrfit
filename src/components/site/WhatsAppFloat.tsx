import { useEffect, useState } from "react";
import { site } from "@/lib/site";
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
      className={cn(
        "group fixed bottom-5 right-5 z-40 inline-flex items-center gap-3 rounded-full border border-primary/40 bg-surface/90 py-3 pl-3 pr-4 text-sm font-semibold text-foreground shadow-lift backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-primary",
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
          <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15s-.77.96-.94 1.16c-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37s-1.04 1.01-1.04 2.480 1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35z" />
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.26-1.38a9.9 9.9 0 0 0 4.78 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.02h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.17 8.17 0 0 1-1.25-4.35c0-4.53 3.7-8.22 8.24-8.22 2.2 0 4.27.86 5.82 2.41a8.17 8.17 0 0 1 2.41 5.82c0 4.54-3.69 8.2-8.23 8.2z" />
        </svg>
      </span>
      <span className="hidden sm:inline">Chat with us</span>
    </a>
  );
}
