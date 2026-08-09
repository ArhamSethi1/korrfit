import { useCallback, useEffect, useRef, useState } from "react";
import { Quote, MoveHorizontal } from "lucide-react";
import { Section, SectionHeading } from "../primitives";
import { Reveal } from "../Reveal";
import { stories } from "@/data/content";
import beforeImg from "@/assets/gym-stretch.jpg";
import afterImg from "@/assets/gym-strength.jpg";

function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const wrap = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = wrap.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  }, []);

  // Window-level listeners so the drag keeps tracking outside the element and
  // works for both mouse and touch pointers.
  useEffect(() => {
    if (!dragging) return;
    const move = (e: PointerEvent) => {
      e.preventDefault();
      setFromClientX(e.clientX);
    };
    const stop = () => setDragging(false);
    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
    };
  }, [dragging, setFromClientX]);

  return (
    <div
      ref={wrap}
      className="relative touch-none select-none overflow-hidden rounded-3xl border border-hairline"
      onPointerDown={(e) => {
        setDragging(true);
        setFromClientX(e.clientX);
      }}
    >
      <img
        src={afterImg}
        alt="After training consistently at KORR.fit"
        width={1400}
        height={900}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="h-72 w-full object-cover sm:h-96 md:h-[30rem]"
      />
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={beforeImg}
          alt="Before starting at KORR.fit"
          width={1400}
          height={900}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-72 w-full object-cover sm:h-96 md:h-[30rem]"
        />
      </div>

      <span className="pointer-events-none absolute left-4 top-4 rounded-full border border-hairline bg-background/80 px-3 py-1 text-[0.68rem] uppercase tracking-widest backdrop-blur">
        Before
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full border border-primary/50 bg-background/80 px-3 py-1 text-[0.68rem] uppercase tracking-widest text-primary backdrop-blur">
        After
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-primary"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute left-1/2 top-1/2 inline-flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-primary/60 bg-background text-primary shadow-lift">
          <MoveHorizontal width={18} height={18} aria-hidden="true" />
        </span>
      </div>

      <label className="sr-only" htmlFor="ba-range">
        Before and after comparison
      </label>
      <input
        id="ba-range"
        type="range"
        min={0}
        max={100}
        value={Math.round(pos)}
        aria-valuetext={`${Math.round(pos)}% of the before photo shown`}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-x-0 bottom-0 h-10 w-full cursor-ew-resize opacity-0 focus-visible:opacity-100"
      />
    </div>
  );
}

export function Stories() {
  return (
    <Section id="stories" tone="raised">
      <SectionHeading
        eyebrow="Success stories"
        title="Change that shows up in more than the mirror."
        lead="Real transformations go here. The layout is ready — we just drop in photos, numbers and quotes."
      />

      <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3">
        {stories.map((s, i) => (
          <Reveal key={`${s.program}-${i}`} delay={i * 90}>
            <article className="h-full rounded-2xl border border-hairline bg-background/40 p-4 transition-all sm:p-6 md:rounded-3xl duration-500 card-hover">
              <Quote width={18} height={18} aria-hidden="true" className="text-primary" />
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">“{s.quote}”</p>
              <div className="mt-4 border-t border-hairline pt-4">
                <div className="text-sm font-semibold sm:text-base">{s.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {s.program} · {s.duration} · {s.result}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12">
        <div>
          <h3 className="text-xl font-semibold">See the difference for yourself</h3>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Drag the handle to compare. Replace these two images with a real member’s before and
            after photos.
          </p>
          <div className="mt-6">
            <BeforeAfter />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
