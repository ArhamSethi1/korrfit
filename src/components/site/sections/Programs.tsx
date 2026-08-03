import {
  Flame,
  Dumbbell,
  Zap,
  Activity,
  HeartPulse,
  Scale,
  UserRound,
  Users,
  Music,
  Timer,
  Hexagon,
  Sparkles,
  Accessibility,
  Apple,
  StretchHorizontal,
} from "lucide-react";
import { Section, SectionHeading } from "../primitives";
import { Reveal } from "../Reveal";
import { programs } from "@/data/content";

const icons = [
  Flame,
  Dumbbell,
  Zap,
  Activity,
  HeartPulse,
  Scale,
  UserRound,
  Users,
  Music,
  Timer,
  Hexagon,
  Sparkles,
  Accessibility,
  Apple,
  StretchHorizontal,
];

export function Programs() {
  return (
    <Section id="programs" tone="raised">
      <SectionHeading
        eyebrow="Programs"
        title="Training built around you, not around a template."
        lead="Whatever brings you in — first gym, a comeback, or a specific goal — there is a path here that starts where you are today."
      />

      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {programs.map((p, i) => {
          const Icon = icons[i % icons.length]!;
          return (
            <Reveal key={p.title} delay={(i % 3) * 70}>
              <article className="group h-full rounded-3xl border border-hairline bg-background/40 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:bg-surface">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-hairline bg-surface-2/60 text-primary transition-colors duration-500 group-hover:border-primary/40">
                  <Icon width={19} height={19} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.note}</p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
