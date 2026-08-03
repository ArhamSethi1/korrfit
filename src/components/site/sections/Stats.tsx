import { useEffect, useRef, useState } from "react";
import { Star, MessageSquare, Users, Layers, Dumbbell, Maximize } from "lucide-react";
import { Reveal } from "../Reveal";
import { site } from "@/lib/site";

const stats = [
  { icon: Star, value: 5, suffix: ".0", label: "Google rating", decimals: true },
  { icon: MessageSquare, value: site.rating.count, suffix: "+", label: "Member reviews" },
  { icon: Users, value: 6, suffix: "", label: "Certified trainers" },
  { icon: Layers, value: 2, suffix: "", label: "Training floors" },
  { icon: Dumbbell, value: 100, suffix: "%", label: "Maintained equipment" },
  { icon: Maximize, value: 5, suffix: "", label: "Dedicated zones" },
];

function CountUp({ to, suffix, decimals }: { to: number; suffix: string; decimals?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(to);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / 1100, 1);
          setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <span ref={ref}>
      {n}
      {decimals ? suffix : suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative border-y border-hairline bg-surface/30 py-16 md:py-20">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 60}>
              <div className="hairline-card h-full p-5 transition-transform duration-500 hover:-translate-y-1">
                <s.icon width={18} height={18} aria-hidden="true" className="text-primary" />
                <div className="mt-4 font-display text-3xl font-semibold tracking-tight">
                  <CountUp to={s.value} suffix={s.suffix} decimals={s.decimals} />
                </div>
                <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
