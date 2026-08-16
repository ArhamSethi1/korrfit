import { useEffect, useRef, useState } from "react";
import { Play, ChevronLeft, ChevronRight, X, Images } from "lucide-react";
import { Section, SectionHeading } from "../primitives";
import { Reveal } from "../Reveal";
import { tourRooms, type ReviewMedia } from "@/data/content";
import { galleryPhotos, tourVideos, allGalleryImages, tourRoomImages } from "@/data/media";
import { MediaLightbox } from "../MediaLightbox";
import { SmartImage } from "../SmartImage";
import { cn } from "@/lib/utils";

/**
 * The first `GRID_COUNT` photos build the masonry grid; the rest fill the
 * marquee rail. Portrait shots claim a tall (two-row) tile so they are never
 * cropped into a letterbox, and the grid uses dense flow so no holes are left.
 */
const grid = galleryPhotos.slice(0, GRID_COUNT);
const marquee = galleryPhotos.slice(GRID_COUNT).concat(galleryPhotos.slice(0, GRID_COUNT));

const gridMedia: ReviewMedia[] = grid.map((g) => ({ type: "image", src: g.src, alt: g.alt }));
const marqueeMedia: ReviewMedia[] = marquee.map((p) => ({
  type: "image",
  src: p.src,
  alt: p.alt,
}));
const videoMedia: ReviewMedia[] = tourVideos.map((v) => ({
  type: "video",
  src: v.poster,
  videoSrc: v.src,
  alt: v.alt,
}));
const allMedia: ReviewMedia[] = allGalleryImages.map((p) => ({
  type: "image",
  src: p.src,
  alt: p.alt,
}));

const tourImages = tourRoomImages;

/** Masonry tile that measures the photo and picks a square or tall frame. */
function GridTile({
  photo,
  index,
  onOpen,
}: {
  photo: { src: string; alt: string };
  index: number;
  onOpen: (i: number) => void;
}) {
  const [tall, setTall] = useState(false);

  return (
    <Reveal delay={(index % 3) * 70} className={cn("h-full", tall && "row-span-2")}>
      <button
        type="button"
        onClick={() => onOpen(index)}
        aria-label={`Open photo: ${photo.alt}`}
        className="group block h-full w-full overflow-hidden rounded-2xl border border-hairline transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <SmartImage
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          decoding="async"
          onLoad={(e) => {
            const img = e.currentTarget;
            setTall(img.naturalHeight > img.naturalWidth * 1.15);
          }}
          className="object-cover group-hover:scale-105"
        />
      </button>
    </Reveal>
  );
}


export function Gallery() {
  const [room, setRoom] = useState(0);
  const [allOpen, setAllOpen] = useState(false);
  const [lightbox, setLightbox] = useState<{ items: ReviewMedia[]; index: number } | null>(null);

  const openLightbox = (items: ReviewMedia[], index: number) => setLightbox({ items, index });

  // Lock the page and close the "All Images" popup on Escape.
  useEffect(() => {
    if (!allOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !lightbox) setAllOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [allOpen, lightbox]);


  return (
    <Section id="gallery" tone="raised">
      <SectionHeading
        eyebrow="Gallery"
        title="Have a look around before you walk in."
        lead="Real footage and photos from the KORR.fit floor in Mansarovar — videos first, then the photo tour."
      />

      {/* Videos come first so visitors see the gym in motion before the stills. */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold">Video walkthroughs</h3>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Tap a clip to play it full screen with sound.
        </p>

        <div className="korr-scroll mt-5 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8">
          {tourVideos.map((v, i) => (
            <Reveal key={v.src} delay={(i % 4) * 80} className="shrink-0">
              <button
                type="button"
                onClick={() => openLightbox(videoMedia, i)}
                aria-label={`Play walkthrough video: ${v.alt}`}
                className="group relative aspect-[9/14] w-56 shrink-0 snap-start overflow-hidden rounded-2xl border border-hairline transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:w-64"
              >
                <SmartImage
                  src={v.poster}
                  alt={v.alt}
                  loading="lazy"
                  decoding="async"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-4 left-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:scale-110"
                >
                  <Play width={16} height={16} className="fill-current" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-16 grid auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[13rem] lg:grid-cols-3">
        {grid.map((g, i) => (
          <Reveal key={g.src} delay={(i % 3) * 70} className={cn("h-full", g.span)}>
            <button
              type="button"
              onClick={() => openLightbox(gridMedia, i)}
              aria-label={`Open photo: ${g.alt}`}
              className="group block h-full w-full overflow-hidden rounded-2xl border border-hairline transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <SmartImage
                src={g.src}
                alt={g.alt}
                loading="lazy"
                decoding="async"
                className="object-cover group-hover:scale-105"
              />
            </button>
          </Reveal>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={() => setAllOpen(true)}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline bg-surface/60 px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Images width={16} height={16} aria-hidden="true" />
          View all images
        </button>
      </div>

      <MoreMoments images={marquee} onOpen={(i) => openLightbox(marqueeMedia, i)} />


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
            <SmartImage
              key={room}
              src={tourImages[room % tourImages.length]!}
              alt={`${tourRooms[room]!.name} at KORR.fit`}
              loading="lazy"
              decoding="async"
              wrapperClassName="h-60 sm:h-80"
              className="swap-in object-cover"
            />
            <div key={`copy-${room}`} className="swap-in p-6">
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

      {allOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="All Images"
          className="backdrop-in fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-2 backdrop-blur-sm sm:p-6"
          onClick={() => setAllOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="pop-in flex h-[96dvh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-hairline bg-background sm:rounded-3xl"
          >
            <div className="flex items-center justify-between gap-4 border-b border-hairline px-5 py-4">
              <div>
                <h3 className="text-lg font-semibold sm:text-xl">All Images</h3>
                <p className="text-xs text-muted-foreground">
                  {allGalleryImages.length} photos from KORR.fit Mansarovar
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAllOpen(false)}
                aria-label="Close all images"
                className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-hairline bg-surface/60 transition-transform duration-200 hover:bg-surface active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <X width={26} height={26} aria-hidden="true" />
              </button>
            </div>

            <div className="korr-scroll grid flex-1 auto-rows-min grid-cols-2 content-start gap-5 overflow-y-auto p-5 sm:grid-cols-3 sm:gap-6 sm:p-7 lg:grid-cols-4 lg:gap-7">
              {allGalleryImages.map((p, i) => (
                <button
                  key={`${p.src}-${i}`}
                  type="button"
                  onClick={() => openLightbox(allMedia, i)}
                  aria-label={`Open photo: ${p.alt}`}
                  className="group w-full overflow-hidden rounded-xl border border-hairline transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <SmartImage
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    decoding="async"
                    sizes="(min-width: 1024px) 220px, 45vw"
                    width={320}
                    height={320}
                    wrapperClassName="aspect-square"
                    className="object-cover group-hover:scale-105"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}


      {lightbox ? (
        <MediaLightbox
          items={lightbox.items}
          index={lightbox.index}
          onIndexChange={(i) => setLightbox((l) => (l ? { ...l, index: i } : l))}
          onClose={() => setLightbox(null)}
          title="the KORR.fit gallery"
          kind="Gym"
        />
      ) : null}
    </Section>
  );
}

function MoreMoments({
  images,
  onOpen,
}: {
  images: { src: string; alt: string }[];
  onOpen: (i: number) => void;
}) {
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
        {images.map((img, i) => (
          <button
            key={`${img.src}-${i}`}
            type="button"
            onClick={() => onOpen(i)}
            aria-label={`Open photo: ${img.alt}`}
            className="group h-40 w-64 shrink-0 snap-start overflow-hidden rounded-2xl border border-hairline transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:h-48 sm:w-80"
          >
            <SmartImage
              src={img.src}
              alt={img.alt}
              loading="lazy"
              decoding="async"
              className="object-cover group-hover:scale-105"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
