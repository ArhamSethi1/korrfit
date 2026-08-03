import { useState } from "react";
import { Clock } from "lucide-react";
import { Section, SectionHeading } from "../primitives";
import { Reveal } from "../Reveal";
import { schedule } from "@/data/content";
import { cn } from "@/lib/utils";

export function Schedule() {
  const [day, setDay] = useState(0);
  const current = schedule[day]!;

  return (
    <Section tone="raised">
      <SectionHeading
        eyebrow="Weekly schedule"
        title="Know exactly what is running before you arrive."
        lead="A sample timetable across the week. Timings are placeholders and can be updated any time."
      />

      <div className="mt-10 flex flex-wrap gap-2">
        {schedule.map((d, i) => (
          <button
            key={d.day}
            type="button"
            onClick={() => setDay(i)}
            aria-pressed={day === i}
            className={cn(
              "rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300",
              day === i
                ? "border-primary bg-primary text-primary-foreground"
                : "border-hairline bg-surface/40 text-muted-foreground hover:bg-surface hover:text-foreground",
            )}
          >
            <span className="sm:hidden">{d.short}</span>
            <span className="hidden sm:inline">{d.day}</span>
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {current.sessions.map((s, i) => (
          <Reveal key={`${current.day}-${s.time}-${i}`} delay={i * 70}>
            <div className="float-in flex h-full items-start gap-4 rounded-2xl border border-hairline bg-background/40 p-5 transition-colors duration-500 hover:border-primary/40">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-2/60 text-primary">
                <Clock width={17} height={17} aria-hidden="true" />
              </span>
              <div>
                <div className="text-sm font-semibold text-primary">{s.time}</div>
                <div className="mt-1 text-base font-semibold">{s.title}</div>
                <div className="mt-0.5 text-sm text-muted-foreground">with {s.coach}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
