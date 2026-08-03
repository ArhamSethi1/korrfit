import { Check } from "lucide-react";
import { Section, SectionHeading } from "../primitives";
import { Reveal } from "../Reveal";

const pairs = [
  {
    typical: "One generic plan handed to every new member.",
    korr: "A plan written around your goal, your schedule and your starting point.",
  },
  {
    typical: "Crowded floors and long waits for a rack at peak hours.",
    korr: "Two spacious floors with dedicated zones, so you keep moving.",
  },
  {
    typical: "Trainers who point at a machine and walk away.",
    korr: "Certified coaches who watch your form and adjust as you progress.",
  },
  {
    typical: "Progress measured only by the number on a scale.",
    korr: "Strength, energy, mobility and habits tracked alongside body composition.",
  },
  {
    typical: "Hygiene that slips once the evening rush starts.",
    korr: "Equipment, changing rooms and the steam room cleaned throughout the day.",
  },
];

export function WhyUs() {
  return (
    <Section tone="base">
      <SectionHeading
        eyebrow="Why KORR.fit"
        title="The difference is in how you are looked after."
        lead="We are not trying to be the loudest gym in Mansarovar. We are trying to be the one where people stay, because the training and the environment are both worth staying for."
      />

      <div className="mt-12 grid gap-4">
        {pairs.map((p, i) => (
          <Reveal key={p.korr} delay={i * 70}>
            <div className="grid gap-4 rounded-3xl border border-hairline bg-surface/40 p-6 transition-colors duration-500 hover:bg-surface/70 md:grid-cols-2 md:gap-10 md:p-7">
              <div className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/60" />
                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                  <span className="mr-2 text-xs uppercase tracking-widest text-muted-foreground/70">
                    Typical gym
                  </span>
                  <br />
                  {p.typical}
                </p>
              </div>
              <div className="flex items-start gap-3 border-t border-hairline pt-4 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                <Check
                  width={18}
                  height={18}
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-primary"
                />
                <p className="text-sm leading-relaxed text-foreground md:text-base">
                  <span className="mr-2 text-xs uppercase tracking-widest text-primary">
                    At KORR.fit
                  </span>
                  <br />
                  {p.korr}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
