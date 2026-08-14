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

      <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6">
        {trainers.map((t, i) => (
          <Reveal key={t.name} delay={(i % 3) * 80}>
            <article className="group h-full overflow-hidden rounded-3xl border border-hairline bg-surface/40 transition-all duration-500 card-hover">
              <SmartImage
                src={t.photo}
                alt={t.name}
                loading="lazy"
                decoding="async"
                wrapperClassName="aspect-[3/4]"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="p-4 text-center sm:p-5">
                <h3 className="text-sm font-semibold sm:text-lg">{t.name}</h3>
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
