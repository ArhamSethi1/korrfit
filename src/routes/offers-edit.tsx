import { useRef, useState, type FormEvent, type PointerEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { GripVertical, ImagePlus, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { SmartImage } from "@/components/site/SmartImage";
import {
  deleteOffer,
  getManagedOffers,
  reorderOffers,
  saveOffer,
  type ManagedOffer,
} from "@/lib/offers.functions";

const title = "Offers Editor — KORR.fit";
const description = "Password-protected offer management for the KORR.fit website.";

export const Route = createFileRoute("/offers-edit")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: OffersEditPage,
});

type OfferDraft = {
  id?: string;
  image: string;
  imageData?: string;
  imageName?: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaText: string;
  ctaAction: string;
};

const emptyDraft: OfferDraft = {
  image: "",
  eyebrow: "",
  title: "",
  description: "",
  ctaText: "",
  ctaAction: "",
};

function draftFromOffer(offer: ManagedOffer): OfferDraft {
  return {
    id: offer.id,
    image: offer.image,
    eyebrow: offer.badge,
    title: offer.title,
    description: offer.blurb,
    ctaText: offer.cta,
    ctaAction: offer.action,
  };
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong. Please try again.";
}

function OffersEditPage() {
  const loadOffers = useServerFn(getManagedOffers);
  const save = useServerFn(saveOffer);
  const remove = useServerFn(deleteOffer);
  const reorder = useServerFn(reorderOffers);
  const [passcode, setPasscode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [offers, setOffers] = useState<ManagedOffer[]>([]);
  const [draft, setDraft] = useState<OfferDraft | null>(null);
  const [previewing, setPreviewing] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ManagedOffer | null>(null);
  const [busy, setBusy] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);
  const dragId = useRef<string | null>(null);
  const pointerTargetId = useRef<string | null>(null);

  const refresh = async (password = passcode) => {
    const next = await loadOffers({ data: { passcode: password } });
    setOffers(next);
    return next;
  };

  const unlock = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!passcode.trim()) return;
    setBusy(true);
    try {
      await refresh(passcode.trim());
      setPasscode(passcode.trim());
      setUnlocked(true);
    } catch (error) {
      toast.error(errorMessage(error));
    } finally {
      setBusy(false);
    }
  };

  const onImage = (file?: File) => {
    if (!file) return;
    if (!new Set(["image/jpeg", "image/png", "image/webp"]).has(file.type)) {
      toast.error("Choose a JPG, PNG, or WebP image.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast.error("The image must be 8 MB or smaller.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") return;
      setDraft((current) =>
        current ? { ...current, image: reader.result as string, imageData: reader.result as string, imageName: file.name } : current,
      );
    };
    reader.readAsDataURL(file);
  };

  const submitDraft = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!draft) return;
    setBusy(true);
    try {
      await save({
        data: {
          passcode,
          id: draft.id,
          imageData: draft.imageData,
          imageName: draft.imageName,
          eyebrow: draft.eyebrow,
          title: draft.title,
          description: draft.description,
          ctaText: draft.ctaText,
          ctaAction: draft.ctaAction,
        },
      });
      await refresh();
      setDraft(null);
      setPreviewing(false);
      setPreviewKey((key) => key + 1);
      toast.success(draft.id ? "Offer updated." : "Offer added.");
    } catch (error) {
      toast.error(errorMessage(error));
    } finally {
      setBusy(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setBusy(true);
    try {
      await remove({ data: { passcode, id: deleteTarget.id } });
      await refresh();
      setPreviewKey((key) => key + 1);
      toast.success("Offer deleted.");
    } catch (error) {
      toast.error(errorMessage(error));
    } finally {
      setBusy(false);
      setDeleteTarget(null);
    }
  };

  const moveOffer = async (targetId: string) => {
    const sourceId = dragId.current;
    dragId.current = null;
    if (!sourceId || sourceId === targetId) return;
    const from = offers.findIndex((offer) => offer.id === sourceId);
    const to = offers.findIndex((offer) => offer.id === targetId);
    if (from < 0 || to < 0) return;
    const next = [...offers];
    const [moved] = next.splice(from, 1);
    if (!moved) return;
    next.splice(to, 0, moved);
    setOffers(next);
    try {
      await reorder({ data: { passcode, ids: next.map((offer) => offer.id) } });
      setPreviewKey((key) => key + 1);
      toast.success("Offer order updated.");
    } catch (error) {
      setOffers(offers);
      toast.error(errorMessage(error));
    }
  };

  if (!unlocked) {
    return (
      <main className="grid min-h-screen place-items-center bg-background px-5 text-foreground">
        <Toaster />
        <form onSubmit={unlock} className="w-full max-w-sm rounded-lg border border-hairline bg-surface p-6">
          <h1 className="font-display text-2xl font-semibold">Offers Editor</h1>
          <Label htmlFor="offers-passcode" className="mt-6 block text-xs uppercase text-muted-foreground">
            Editor password
          </Label>
          <Input
            id="offers-passcode"
            type="password"
            autoComplete="current-password"
            value={passcode}
            onChange={(event) => setPasscode(event.target.value)}
            className="mt-2 h-11 bg-background"
            autoFocus
          />
          <Button type="submit" className="mt-4 h-11 w-full" disabled={busy || !passcode.trim()}>
            {busy ? "Opening…" : "Open editor"}
          </Button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-5 py-10 text-foreground sm:px-8">
      <Toaster />
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="font-display text-3xl font-semibold">Manage offers</h1>
            <Button
              type="button"
              onClick={() => {
                setDraft({ ...emptyDraft });
                setPreviewing(false);
              }}
            >
              <Plus aria-hidden="true" /> Add New Offer
            </Button>
          </div>

          {draft ? (
            <form onSubmit={submitDraft} className="mt-6 space-y-5 rounded-lg border border-hairline bg-surface p-5">
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-display text-xl font-semibold">{draft.id ? "Edit offer" : "New offer"}</h2>
                <Button type="button" variant="ghost" size="sm" onClick={() => setDraft(null)}>Cancel</Button>
              </div>
              <div>
                <Label htmlFor="offer-image">Offer image</Label>
                <label
                  htmlFor="offer-image"
                  className="mt-2 flex min-h-28 cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-input bg-background text-sm text-muted-foreground focus-within:ring-1 focus-within:ring-ring"
                >
                  <ImagePlus aria-hidden="true" /> {draft.image ? "Replace image" : "Upload image"}
                  <input
                    id="offer-image"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="sr-only"
                    onChange={(event) => onImage(event.target.files?.[0])}
                  />
                </label>
              </div>
              <div>
                <Label htmlFor="offer-eyebrow">Eyebrow text</Label>
                <Input id="offer-eyebrow" className="mt-2 bg-background" value={draft.eyebrow} onChange={(event) => setDraft({ ...draft, eyebrow: event.target.value })} required />
              </div>
              <div>
                <Label htmlFor="offer-title">Title</Label>
                <Input id="offer-title" className="mt-2 bg-background" value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} required />
              </div>
              <div>
                <Label htmlFor="offer-description">Caption / description</Label>
                <Textarea id="offer-description" rows={4} className="mt-2 bg-background" value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} required />
              </div>
              <div>
                <Label htmlFor="offer-cta">CTA button text</Label>
                <Input id="offer-cta" className="mt-2 bg-background" value={draft.ctaText} onChange={(event) => setDraft({ ...draft, ctaText: event.target.value })} required />
              </div>
              <div>
                <Label htmlFor="offer-action">CTA link / action</Label>
                <Input id="offer-action" className="mt-2 bg-background" value={draft.ctaAction} onChange={(event) => setDraft({ ...draft, ctaAction: event.target.value })} placeholder="https://wa.me/..." required />
              </div>
              <div className="flex flex-wrap gap-3">
                <Button type="button" variant="outline" onClick={() => setPreviewing((value) => !value)} disabled={!draft.image}>
                  Preview offer
                </Button>
                <Button type="submit" disabled={busy || !draft.image}>{busy ? "Saving…" : "Save offer"}</Button>
              </div>

              {previewing && draft.image ? <OfferPreview draft={draft} /> : null}
            </form>
          ) : null}

          <div className="mt-6 space-y-3">
            {offers.map((offer) => (
              <article
                key={offer.id}
                data-offer-id={offer.id}
                className="flex items-center gap-3 rounded-lg border border-hairline bg-surface p-3"
              >
                <span
                  className="cursor-grab touch-none text-muted-foreground active:cursor-grabbing"
                  aria-label={`Drag ${offer.title} to reorder`}
                  onPointerDown={(event: PointerEvent<HTMLSpanElement>) => {
                    dragId.current = offer.id;
                    pointerTargetId.current = offer.id;
                    event.currentTarget.setPointerCapture(event.pointerId);
                  }}
                  onPointerMove={(event: PointerEvent<HTMLSpanElement>) => {
                    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
                    const row = document.elementFromPoint(event.clientX, event.clientY)?.closest<HTMLElement>("[data-offer-id]");
                    if (row?.dataset.offerId) pointerTargetId.current = row.dataset.offerId;
                  }}
                  onPointerUp={(event: PointerEvent<HTMLSpanElement>) => {
                    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                      event.currentTarget.releasePointerCapture(event.pointerId);
                    }
                    const targetId = pointerTargetId.current;
                    pointerTargetId.current = null;
                    if (targetId) void moveOffer(targetId);
                  }}
                  onPointerCancel={() => {
                    dragId.current = null;
                    pointerTargetId.current = null;
                  }}
                >
                  <GripVertical aria-hidden="true" />
                </span>
                <img src={offer.image} alt="" className="h-16 w-14 shrink-0 rounded object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs uppercase text-primary">{offer.badge}</p>
                  <h2 className="truncate text-sm font-semibold">{offer.title}</h2>
                </div>
                <Button type="button" variant="ghost" size="icon" aria-label={`Edit ${offer.title}`} onClick={() => { setDraft(draftFromOffer(offer)); setPreviewing(false); }}>
                  <Pencil aria-hidden="true" />
                </Button>
                <Button type="button" variant="ghost" size="icon" aria-label={`Delete ${offer.title}`} onClick={() => setDeleteTarget(offer)}>
                  <Trash2 aria-hidden="true" />
                </Button>
              </article>
            ))}
          </div>
        </div>

        <div className="min-w-0">
          <div className="sticky top-4 overflow-hidden rounded-lg border border-hairline bg-surface">
            <div className="border-b border-hairline px-4 py-3 text-xs font-semibold uppercase text-primary">Live website preview</div>
            <iframe key={previewKey} src="/" title="Live preview of the KORR.fit website" className="h-[78dvh] w-full bg-background" />
          </div>
        </div>
      </div>

      <AlertDialog open={Boolean(deleteTarget)} onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this offer?</AlertDialogTitle>
            <AlertDialogDescription>This permanently removes “{deleteTarget?.title}” from the public website.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={busy}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => void confirmDelete()} disabled={busy} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {busy ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}

function OfferPreview({ draft }: { draft: OfferDraft }) {
  return (
    <article className="max-w-sm overflow-hidden rounded-lg border border-hairline bg-background">
      <SmartImage src={draft.image} alt={`${draft.title || "Offer"} preview`} wrapperClassName="aspect-[4/5]" className="object-cover" />
      <div className="p-4">
        <p className="text-xs uppercase text-primary">{draft.eyebrow || "Eyebrow"}</p>
        <h3 className="mt-2 font-display text-lg font-semibold">{draft.title || "Offer title"}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{draft.description || "Offer description"}</p>
        <p className="mt-4 text-sm font-semibold">{draft.ctaText || "CTA button"}</p>
      </div>
    </article>
  );
}