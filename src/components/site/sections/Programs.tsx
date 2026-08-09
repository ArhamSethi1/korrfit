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

      <div className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-3">
        {programs.map((p, i) => {
          const Icon = icons[i % icons.length]!;
          return (
            <Reveal key={p.title} delay={(i % 3) * 70}>
              <article className="group h-full rounded-2xl border border-hairline bg-background/40 p-4 transition-all sm:p-5 md:rounded-3xl duration-500 card-hover hover:bg-surface">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-hairline bg-surface-2/60 text-primary transition-colors duration-500 group-hover:border-primary/40">
                  <Icon width={17} height={17} aria-hidden="true" />
                </span>
                <h3 className="mt-3.5 text-sm font-semibold sm:text-base">{p.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-[0.8rem]">{p.note}</p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
