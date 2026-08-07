import { useState } from "react";
import { Plus } from "lucide-react";
import { Section, SectionHeading } from "../primitives";
import { faqs } from "@/data/content";
import { cn } from "@/lib/utils";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section tone="raised">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions people ask before joining."
          lead="Still unsure about something? Call or message us — we answer honestly, even when the answer is no."
        />

        <div className="divide-y divide-hairline border-y border-hairline">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-start justify-between gap-6 py-5 text-left transition-colors duration-300 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <span
                      className={cn(
                        "text-base font-medium transition-transform duration-400 ease-out",
                        isOpen && "translate-x-1 text-primary",
                      )}
                    >
                      {f.q}
                    </span>
                    <Plus
                      width={18}
                      height={18}
                      aria-hidden="true"
                      className={cn(
                        "mt-0.5 shrink-0 text-primary transition-transform duration-500 ease-out group-hover:scale-110",
                        isOpen && "rotate-[135deg]",
                      )}
                    />
                  </button>
                </h3>
                <div
                  className={cn(
                    "grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p
                      className={cn(
                        "pb-6 pr-10 text-sm leading-relaxed text-muted-foreground transition-transform duration-500 ease-out",
                        isOpen ? "translate-y-0" : "-translate-y-1",
                      )}
                    >
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>

            );
          })}
        </div>
      </div>
    </Section>
  );
}
