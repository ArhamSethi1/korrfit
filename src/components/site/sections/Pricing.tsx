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

      <div className="mt-14 grid grid-cols-2 items-start gap-3 lg:grid-cols-3 lg:gap-5">
        {plans.map((plan, i) => (
          <Reveal key={plan.name} delay={i * 90}>
            <div
              className={cn(
                "relative flex h-full flex-col rounded-2xl border p-4 transition-all duration-500 hover:-translate-y-1 sm:p-6 md:rounded-3xl",
                plan.featured
                  ? "border-primary/50 bg-surface shadow-lift lg:-mt-4 lg:pb-12"
                  : "border-hairline bg-background/40",
              )}
            >
              {plan.featured ? (
                <span className="absolute -top-3 left-4 sm:left-6 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-widest text-primary-foreground">
                  <Sparkles width={12} height={12} aria-hidden="true" />
                  Most popular
                </span>
              ) : null}

              <h3 className="text-base font-semibold sm:text-lg">{plan.name}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">{plan.description}</p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">{plan.price}</span>
                <span className="text-xs text-muted-foreground">{plan.period}</span>
              </div>

              <ul className="mt-5 flex-1 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground sm:text-sm">
                    <Check width={15} height={15} aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() =>
                  openLead({ intent: "membership", plan: plan.name, source: "pricing" })
                }
                className={cn(
                  "mt-8 inline-flex min-h-11 items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  plan.featured
                    ? "bg-primary text-primary-foreground"
                    : "border border-hairline bg-surface/60 text-foreground hover:bg-surface",
                )}
              >
                Get this plan
              </button>
            </div>
          </Reveal>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Not sure which plan fits?{" "}
        <a
          href={site.tel}
          onClick={() => trackEvent("click_call", { source: "pricing" })}
          className="text-foreground underline underline-offset-4"
        >
          Call {site.phoneDisplay}
        </a>{" "}
        and we will tell you honestly.
      </p>
    </Section>
  );
}
