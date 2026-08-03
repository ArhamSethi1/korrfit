import { Section, SectionHeading } from "../primitives";
import { Reveal } from "../Reveal";
import { trainers } from "@/data/content";
import { site } from "@/lib/site";

export function Trainers() {
  return (
    <Section id="trainers">
      <SectionHeading
        eyebrow="The team"
        title="Coaches who stay on the floor with you."
        lead="Six certified trainers across strength, weight loss, functional training, group fitness and nutrition. Names and photos below are placeholders until we add the real team."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {trainers.map((t, i) => (
          <Reveal key={`${t.specialization}-${i}`} delay={(i % 3) * 80}>
            <article className="group h-full overflow-hidden rounded-3xl border border-hairline bg-surface/40 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40">
              <div className="grain relative flex h-52 items-center justify-center bg-surface-2/60">
                <span className="font-display text-5xl font-semibold text-muted-foreground/25">
                  {t.specialization.charAt(0)}
                </span>
                <span className="absolute bottom-3 left-3 rounded-full border border-hairline bg-background/80 px-3 py-1 text-[0.68rem] uppercase tracking-widest text-muted-foreground backdrop-blur">
                  {t.experience}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold">{t.name}</h3>
                <p className="mt-1 text-sm font-medium text-primary">{t.specialization}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.bio}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 rounded-3xl border border-hairline bg-surface/40 p-6 text-center md:p-8">
        <p className="text-base text-muted-foreground">
          Want to train one-to-one with a specific coach?
        </p>
        <a
          href={site.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
        >
          Ask about personal training
        </a>
      </div>
    </Section>
  );
}
