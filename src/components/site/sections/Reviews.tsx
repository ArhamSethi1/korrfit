import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { scrollToId } from "@/lib/scroll";
import { ThumbsUp, X, Link2, Check } from "lucide-react";
import { Section, Stars } from "../primitives";
import { ReviewsSkeleton } from "../Skeletons";
import { useTextsLoading } from "@/lib/text";
import { Reveal } from "../Reveal";
import { reviews, reviewTags, type Review } from "@/data/content";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

function GoogleG({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-2.7-.4-3.9H24v7.1h12.1c-.2 1.8-1.6 4.6-4.5 6.5l6.9 5.3c4.1-3.8 6.6-9.3 6.6-15z" />
      <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-6.9-5.3c-1.9 1.3-4.4 2.2-7.6 2.2-5.8 0-10.7-3.8-12.5-9.1l-7.1 5.5C8.1 41.1 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.5 28.5c-.5-1.4-.7-2.9-.7-4.5s.3-3.1.7-4.5l-7.1-5.5C2.9 17 2 20.4 2 24s.9 7 2.4 10z" />
      <path fill="#EA4335" d="M24 10.6c4.1 0 6.9 1.8 8.5 3.3l6.2-6C34.9 4.4 29.9 2 24 2 15.4 2 8.1 6.9 4.4 14l7.1 5.5c1.8-5.3 6.7-8.9 12.5-8.9z" />
    </svg>
  );
}

function ReviewCard({ r }: { r: Review }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-hairline bg-surface/40 p-4 transition-all duration-500 card-hover sm:p-5">
      <div className="flex items-center gap-2.5">
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 font-display text-sm font-semibold text-primary">
          {r.initials}
        </span>
        <div className="min-w-0">
          <div className="truncate text-[0.8rem] font-semibold">{r.name}</div>
          <div className="text-[0.68rem] text-muted-foreground">{r.when}</div>
        </div>
        <span className="ml-auto shrink-0">
          <GoogleG size={15} />
        </span>
      </div>
      <div className="mt-3">
        <Stars size={12} />
      </div>
      <p className="mt-2 flex-1 text-[0.8rem] leading-relaxed text-muted-foreground">{r.text}</p>

      <div className="mt-3 flex items-center gap-2 border-t border-hairline pt-3 text-[0.68rem] text-muted-foreground">
        <ThumbsUp width={12} height={12} aria-hidden="true" />
        {r.helpful} found this helpful
      </div>
    </article>
  );
}


export function Reviews() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { reviews?: string };
  const tag = search.reviews && reviewTags.includes(search.reviews) ? search.reviews : "All";

  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const textsLoading = useTextsLoading();

  const setTag = (t: string) => {
    void navigate({
      to: "/",
      search: (prev: Record<string, unknown>) => ({
        ...prev,
        reviews: t === "All" ? undefined : t,
      }),
      // Push a history entry so browser back/forward restores the filter.
      replace: false,
      resetScroll: false,
    });
  };


  const filtered = useMemo(
    () => (tag === "All" ? reviews : reviews.filter((r) => r.tags.includes(tag))),
    [tag],
  );

  /** In-section preview: 6 reviews on "All", 3 for a specific topic. */
  const preview = useMemo(() => filtered.slice(0, tag === "All" ? 6 : 3), [filtered, tag]);


  const copyLink = async () => {
    const url = new URL(window.location.href);
    if (tag === "All") url.searchParams.delete("reviews");
    else url.searchParams.set("reviews", tag);
    url.hash = "reviews";
    try {
      await navigator.clipboard.writeText(url.toString());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  // Deep link: land directly on the filtered review list.
  useEffect(() => {
    if (!search.reviews) return;
    const t = window.setTimeout(() => scrollToId("reviews"), 250);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <Section id="reviews">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <span className="eyebrow">
            <span aria-hidden="true" className="h-px w-6 bg-primary" />
            Google reviews
          </span>
          <h2 className="mt-4 text-3xl font-semibold leading-[1.08] sm:text-4xl md:text-5xl">
            {site.rating.count}+ reviews. Still {site.rating.value}.
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-6 rounded-3xl border border-hairline bg-surface/40 p-5 sm:p-6">
          <div>
            <div className="font-display text-4xl font-semibold leading-none sm:text-5xl">
              {site.rating.value}
            </div>
            <div className="mt-2">
              <Stars size={14} />
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              {site.rating.count} Google reviews
            </div>
          </div>
          <div className="min-w-[9rem] flex-1 space-y-1.5">
            {[100, 2, 1, 0, 0].map((pct, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-3 text-[0.7rem] text-muted-foreground">{5 - i}</span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
                  <span
                    className="block h-full rounded-full bg-[#fbbc04]"
                    style={{ width: `${pct}%` }}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-2" role="group" aria-label="Filter reviews by topic">
        {reviewTags.map((t) => (
          <Chip key={t} label={t} active={tag === t} onSelect={() => setTag(t)} />
        ))}
        <button
          type="button"
          onClick={copyLink}
          className="ml-auto inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {copied ? (
            <Check width={14} height={14} aria-hidden="true" className="text-primary" />
          ) : (
            <Link2 width={14} height={14} aria-hidden="true" />
          )}
          {copied ? "Link copied" : "Copy link to this filter"}
        </button>
      </div>

      {textsLoading ? (
        <ReviewsSkeleton />
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-3">
          {preview.map((r, i) => (
            <Reveal key={`${r.initials}-${i}`} delay={(i % 3) * 70}>
              <ReviewCard r={r} />
            </Reveal>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">No reviews tagged “{tag}” yet.</p>
      ) : null}

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="min-h-11 rounded-full border border-hairline bg-surface/60 px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          View all reviews
        </button>
        <a
          href={site.googleReviews}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Review us on Google
        </a>
      </div>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="All Google reviews"
          className="backdrop-in fixed inset-0 z-[70] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="pop-in flex max-h-[88dvh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl border border-hairline bg-background sm:rounded-3xl"
          >
            <div className="flex items-center justify-between border-b border-hairline px-6 py-5">
              <div className="flex items-center gap-3">
                <GoogleG size={22} />
                <div>
                  <div className="text-base font-semibold">All reviews</div>
                  <div className="text-xs text-muted-foreground">
                    {site.rating.value} · {site.rating.count} reviews
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close reviews"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-hairline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <X width={17} height={17} aria-hidden="true" />
              </button>
            </div>

            <div
              className="flex flex-wrap gap-2 border-b border-hairline px-6 py-4"
              role="group"
              aria-label="Filter reviews by topic"
            >
              {reviewTags.map((t) => (
                <Chip key={`modal-${t}`} label={t} active={tag === t} onSelect={() => setTag(t)} />
              ))}
            </div>

            <div className="korr-scroll grid grid-cols-2 gap-3 overflow-y-auto p-4 sm:p-6">
              {filtered.map((r, i) => (
                <ReviewCard key={`modal-${i}`} r={r} />
              ))}
              {filtered.length === 0 ? (
                <p className="text-sm text-muted-foreground">No reviews tagged “{tag}” yet.</p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

    </Section>
  );
}

function Chip({
  label,
  active,
  onSelect,
}: {
  label: string;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={cn(
        "min-h-11 rounded-full border px-4 py-2 text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-hairline bg-surface/40 text-muted-foreground hover:bg-surface hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}
