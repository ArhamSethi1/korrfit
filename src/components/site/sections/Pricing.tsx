import { Check, Sparkles, Info, Dot } from "lucide-react";
import { Section, SectionHeading } from "../primitives";
import { Reveal } from "../Reveal";
import { useLead } from "../LeadDialog";
import {
  plans,
  lifetimeMembership,
  otherFacilities,
  importantNotes,
  membershipTerms,
  ptSessionPlans,
  ptMonthPlans,
  ptIncludes,
  ptIdealFor,
  ptTerms,
  ptTagline,
} from "@/data/content";
import { site } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

function MiniList({ title, items, accent }: { title: string; items: string[]; accent?: boolean }) {
  return (
    <div className="rounded-2xl border border-hairline bg-background/40 p-4">
      <h4
        className={cn(
          "text-[0.68rem] font-semibold uppercase tracking-widest",
          accent ? "text-primary" : "text-muted-foreground",
        )}
      >
        {title}
      </h4>
      <ul className="mt-2 space-y-1">
        {items.map((t) => (
          <li key={t} className="flex gap-1.5 text-[0.72rem] leading-snug text-muted-foreground">
            <Dot width={12} height={12} aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Pricing() {
  const { openLead } = useLead();

  return (
    <Section id="pricing" tone="raised">
      <SectionHeading
        eyebrow="Membership"
        title="Simple plans. No hidden add-ons."
        lead="All gym memberships include access to Yoga, Zumba & Steam. Final pricing is confirmed at the front desk or over WhatsApp."
        align="center"
      />

      <div className="mt-14 grid grid-cols-2 items-start gap-3 lg:grid-cols-3 lg:gap-5">
        {plans.map((plan, i) => (
          <Reveal key={plan.name} delay={i * 90}>
            <div
              className={cn(
                "relative flex h-full flex-col rounded-2xl border p-4 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift sm:p-6 md:rounded-3xl",
                plan.featured
                  ? "border-primary/50 bg-surface shadow-lift lg:-mt-4 lg:pb-12"
                  : "border-hairline bg-background/40 hover:border-primary/40",
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

      <Reveal delay={80}>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-primary/40 bg-primary/10 px-5 py-3.5 text-center">
          <span className="font-display text-sm font-semibold uppercase tracking-widest text-primary">
            {lifetimeMembership.label}
          </span>
          <span className="font-display text-lg font-semibold">{lifetimeMembership.price}</span>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <MiniList title="Other facilities & services" items={otherFacilities} />
          <MiniList title="Important notes" items={importantNotes} accent />
        </div>
      </Reveal>

      <p className="mt-3 flex items-start justify-center gap-1.5 text-center text-[0.68rem] leading-snug text-muted-foreground">
        <Info width={12} height={12} aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
        {membershipTerms}
      </p>

      {/* ---------- Personal training ---------- */}
      <Reveal delay={60}>
        <div id="personal-training" className="mt-14 rounded-3xl border border-hairline bg-background/40 p-5 sm:p-7">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="eyebrow">
                <span aria-hidden="true" className="h-px w-6 bg-primary" />
                Personal training
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight sm:text-2xl">
                One-to-one coaching plans
              </h3>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                All PT plans include a personalised workout plus ongoing guidance.
              </p>
            </div>
            <button
              type="button"
              onClick={() => openLead({ intent: "membership", plan: "Personal Training", source: "pt" })}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Enquire about PT
            </button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              { title: "Session wise", rows: ptSessionPlans },
              { title: "Month wise", rows: ptMonthPlans },
            ].map((block) => (
              <div key={block.title} className="rounded-2xl border border-hairline bg-surface/50 p-4">
                <h4 className="text-[0.68rem] font-semibold uppercase tracking-widest text-primary">
                  {block.title}
                </h4>
                <ul className="mt-3 divide-y divide-hairline">
                  {block.rows.map((r) => (
                    <li key={r.label} className="flex items-baseline justify-between gap-3 py-2">
                      <span className="text-xs text-muted-foreground sm:text-sm">{r.label}</span>
                      <span className="font-display text-sm font-semibold sm:text-base">{r.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <MiniList title="Every program includes" items={ptIncludes} />
            <MiniList title="Ideal for" items={ptIdealFor} accent />
          </div>

          <p className="mt-3 text-center text-[0.68rem] leading-snug text-muted-foreground">
            {ptTerms}
          </p>
          <p className="mt-1 text-center text-[0.68rem] italic text-muted-foreground/80">{ptTagline}</p>
        </div>
      </Reveal>

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
