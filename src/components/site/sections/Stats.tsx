import { useEffect, useRef, useState } from "react";
import { Star, MessageSquare, Users, Layers, Music, Waves } from "lucide-react";
import { Reveal } from "../Reveal";
import { site } from "@/lib/site";

const stats = [
  { icon: Star, value: 5, suffix: ".0", label: "Google rating", decimals: true },
  { icon: MessageSquare, value: site.rating.count, suffix: "+", label: "Member reviews" },
  { icon: Users, value: 6, suffix: "", label: "Certified trainers" },
  { icon: Layers, value: 2, suffix: "", label: "Training floors" },
  { icon: Music, text: "Zumba", label: "On alternate days" },
  { icon: Waves, text: "Steam", label: "Recovery room" },
] as {
  icon: typeof Star;
  value?: number;
  suffix?: string;
  label: string;
  decimals?: boolean;
  text?: string;
}[];

function CountUp({ to, suffix, decimals }: { to: number; suffix: string; decimals?: boolean | undefined }) {
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
    <section className="relative border-y border-hairline bg-surface/30 py-10 md:py-14">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 60}>
              <div className="hairline-card h-full p-3.5 transition-transform duration-500 hover:-translate-y-1 sm:p-4">
                <s.icon width={16} height={16} aria-hidden="true" className="text-primary" />
                <div className="mt-2.5 font-display text-xl font-semibold tracking-tight sm:text-2xl">
                  {s.text ? (
                    s.text
                  ) : (
                    <CountUp to={s.value ?? 0} suffix={s.suffix ?? ""} decimals={s.decimals} />
                  )}
                </div>
                <div className="mt-0.5 text-[0.6rem] uppercase tracking-widest text-muted-foreground sm:text-[0.65rem]">
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
