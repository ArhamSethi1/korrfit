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
                    className="flex w-full items-start justify-between gap-6 py-5 text-left"
                  >
                    <span className="text-base font-medium">{f.q}</span>
                    <Plus
                      width={18}
                      height={18}
                      aria-hidden="true"
                      className={cn(
                        "mt-0.5 shrink-0 text-primary transition-transform duration-400",
                        isOpen && "rotate-45",
                      )}
                    />
                  </button>
                </h3>
                <div
                  className={cn(
                    "grid transition-all duration-400 ease-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 pr-10 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
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
