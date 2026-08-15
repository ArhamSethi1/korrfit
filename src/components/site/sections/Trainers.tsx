import { Section, SectionHeading } from "../primitives";
import { Reveal } from "../Reveal";
import { SmartImage } from "../SmartImage";
import { trainers } from "@/data/content";
import { site } from "@/lib/site";

export function Trainers() {
  return (
    <Section id="trainers">
      <SectionHeading
        eyebrow="The team"
        title="Coaches who stay on the floor with you."
        lead="Certified trainers across strength, weight loss, functional training, group fitness and nutrition."
      />

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {trainers.map((t, i) => (
          <Reveal key={t.name} delay={(i % 4) * 80}>
            <article className="group relative h-full overflow-hidden rounded-3xl border border-hairline bg-surface/40 transition-all duration-500 card-hover">
              <SmartImage
                src={t.photo}
                alt={t.name}
                loading="lazy"
                decoding="async"
                wrapperClassName="aspect-[3/4]"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/85 to-transparent px-3 pb-3 pt-8 text-center">
                <span className="block text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
                  Trainer
                </span>
                <h3 className="mt-1 text-sm font-semibold text-primary sm:text-base">{t.name}</h3>
              </div>
            </article>
          </Reveal>
        ))}
      </div>


      <div className="mt-10 hidden rounded-3xl border md:block border-hairline bg-surface/40 p-6 text-center md:p-8">
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
