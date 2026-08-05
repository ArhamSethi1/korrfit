import { useRef, useState } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Section, SectionHeading } from "../primitives";
import { Reveal } from "../Reveal";
import { tourRooms } from "@/data/content";
import { cn } from "@/lib/utils";
import strength from "@/assets/gym-strength.jpg";
import cardio from "@/assets/gym-cardio.jpg";
import functional from "@/assets/gym-functional.jpg";
import recovery from "@/assets/gym-recovery.jpg";
import studio from "@/assets/gym-studio.jpg";
import reception from "@/assets/gym-reception.jpg";
import stretch from "@/assets/gym-stretch.jpg";
import hero from "@/assets/hero-gym.jpg";

const grid = [
  { src: strength, alt: "Strength training floor", span: "row-span-2" },
  { src: cardio, alt: "Cardio zone with treadmills", span: "" },
  { src: studio, alt: "Group fitness and Zumba studio", span: "" },
  { src: functional, alt: "Functional training turf area", span: "" },
  { src: recovery, alt: "Steam room and recovery lounge", span: "row-span-2" },
  { src: reception, alt: "KORR.fit reception area", span: "" },
];

const marquee = [hero, stretch, cardio, studio, functional, reception, strength, recovery];

const tourImages = [reception, strength, cardio, functional, recovery, stretch, reception];

export function Gallery() {
  const [room, setRoom] = useState(0);

  return (
    <Section id="gallery" tone="raised">
      <SectionHeading
        eyebrow="Gallery"
        title="Have a look around before you walk in."
        lead="Photography placeholders for now — swap in real gym photos and videos any time."
      />

      <div className="mt-12 grid auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[13rem] lg:grid-cols-3">
        {grid.map((g, i) => (
          <Reveal key={g.alt} delay={(i % 3) * 70} className={cn("h-full", g.span)}>
            <div className="group h-full overflow-hidden rounded-2xl border border-hairline">
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </Reveal>
        ))}
      </div>

      <MoreMoments images={marquee} />

      <h3 className="mt-16 text-xl font-semibold">Video walkthroughs</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Placeholder tiles — drop in gym reels or trainer clips here.
      </p>
      <div className="korr-scroll mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
        {[hero, studio, functional, cardio].map((src, i) => (
          <div
            key={i}
            className="group relative aspect-[9/14] w-56 shrink-0 snap-start overflow-hidden rounded-2xl border border-hairline sm:w-64"
          >
            <img
              src={src}
              alt={`Video placeholder ${i + 1}`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <span className="absolute bottom-4 left-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Play width={16} height={16} aria-hidden="true" className="fill-current" />
            </span>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <h3 className="text-xl font-semibold">Take the interactive tour</h3>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Step through the gym room by room, exactly as you would on your first visit.
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="flex flex-wrap gap-2 lg:flex-col">
            {tourRooms.map((r, i) => (
              <button
                key={r.name}
                type="button"
                onClick={() => setRoom(i)}
                aria-pressed={room === i}
                className={cn(
                  "rounded-2xl border px-4 py-3 text-left text-sm transition-all duration-300 lg:w-full",
                  room === i
                    ? "border-primary/50 bg-surface text-foreground"
                    : "border-hairline bg-background/40 text-muted-foreground hover:text-foreground",
                )}
              >
                <span className="font-semibold">{r.name}</span>
              </button>
            ))}
          </div>

          <div className="overflow-hidden rounded-3xl border border-hairline bg-background/40">
            <img
              key={room}
              src={tourImages[room]}
              alt={`${tourRooms[room]!.name} at KORR.fit`}
              loading="lazy"
              decoding="async"
              className="float-in h-60 w-full object-cover sm:h-80"
            />
            <div className="p-6">
              <div className="text-xs uppercase tracking-widest text-primary">
                Stop {room + 1} of {tourRooms.length}
              </div>
              <h4 className="mt-2 text-lg font-semibold">{tourRooms[room]!.name}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {tourRooms[room]!.blurb}
              </p>
              <div className="mt-5 flex gap-2">
                <button
                  type="button"
                  onClick={() => setRoom((r) => (r - 1 + tourRooms.length) % tourRooms.length)}
                  className="rounded-full border border-hairline px-5 py-2.5 text-sm font-medium transition-colors hover:bg-surface"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => setRoom((r) => (r + 1) % tourRooms.length)}
                  className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
                >
                  Next room
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function MoreMoments({ images }: { images: string[] }) {
  const track = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(280, el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-semibold">More moments</h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Scroll gallery left"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-background/40 transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <ChevronLeft width={18} height={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Scroll gallery right"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-background/40 transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <ChevronRight width={18} height={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={track}
        className="korr-scroll mt-5 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8"
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Inside KORR.fit gym, view ${i + 1}`}
            loading="lazy"
            decoding="async"
            className="h-40 w-64 shrink-0 snap-start rounded-2xl border border-hairline object-cover sm:h-48 sm:w-80"
          />
        ))}
      </div>
    </div>
  );
}
