import { Check, Sparkles } from "lucide-react";
import { Section, SectionHeading } from "../primitives";
import { Reveal } from "../Reveal";
import { useLead } from "../LeadDialog";
import { plans } from "@/data/content";
import { site } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function Pricing() {
  const { openLead } = useLead();

  return (
    <Section id="pricing" tone="raised">
      <SectionHeading
        eyebrow="Membership"
        title="Simple plans. No hidden add-ons."
        lead="Pick the length that suits you — everything on the floor is included either way. Final pricing is confirmed at the front desk or over WhatsApp."
        align="center"
      />

      <div className="mt-14 grid items-start gap-5 lg:grid-cols-3">
        {plans.map((plan, i) => (
          <Reveal key={plan.name} delay={i * 90}>
            <div
              className={cn(
                "relative flex h-full flex-col rounded-3xl border p-7 transition-all duration-500 hover:-translate-y-1 md:p-8",
                plan.featured
                  ? "border-primary/50 bg-surface shadow-lift lg:-mt-4 lg:pb-12"
                  : "border-hairline bg-background/40",
              )}
            >
              {plan.featured ? (
                <span className="absolute -top-3 left-7 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-widest text-primary-foreground">
                  <Sparkles width={12} height={12} aria-hidden="true" />
                  Most popular
                </span>
              ) : null}

              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{plan.description}</p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-4xl font-semibold tracking-tight">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Check width={15} height={15} aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "mt-8 inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5",
                  plan.featured
                    ? "bg-primary text-primary-foreground"
                    : "border border-hairline bg-surface/60 text-foreground hover:bg-surface",
                )}
              >
                Get this plan
              </a>
            </div>
          </Reveal>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Not sure which plan fits?{" "}
        <a href={site.tel} className="text-foreground underline underline-offset-4">
          Call {site.phoneDisplay}
        </a>{" "}
        and we will tell you honestly.
      </p>
    </Section>
  );
}
