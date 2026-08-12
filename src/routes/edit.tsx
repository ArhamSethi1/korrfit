import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { getSiteTexts, saveSiteTexts } from "@/lib/site-texts.functions";
import { textGroups, defaultTexts } from "@/data/editable-text";

const title = "Edit website text — KORR.fit";
const description = "Passcode-protected editor for the KORR.fit website copy.";

export const Route = createFileRoute("/edit")({
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
  component: EditPage,
});

function EditPage() {
  const load = useServerFn(getSiteTexts);
  const save = useServerFn(saveSiteTexts);
  const [values, setValues] = useState<Record<string, string>>(defaultTexts);
  const [passcode, setPasscode] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    load()
      .then((data) => setValues({ ...defaultTexts, ...(data ?? {}) }))
      .catch(() => undefined)
      .finally(() => setLoading(false));
  }, [load]);

  // Broadcast the draft so the live preview (and any other open tab) updates
  // instantly as you type — no reload, no save required.
  useEffect(() => {
    if (typeof BroadcastChannel === "undefined") return;
    const ch = new BroadcastChannel("korr-text-draft");
    const id = window.setTimeout(() => ch.postMessage(values), 150);
    return () => {
      window.clearTimeout(id);
      ch.close();
    };
  }, [values]);

  const onSave = async () => {
    if (!passcode.trim()) {
      toast.error("Enter the editor passcode first.");
      return;
    }
    setSaving(true);
    try {
      await save({ data: { passcode: passcode.trim(), texts: values } });
      toast.success("Published — the live website now shows your new text.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-background px-5 py-12 text-foreground sm:px-8">
      <Toaster />
      <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="min-w-0">

          <h1 className="font-display text-3xl font-semibold tracking-tight">Edit website text</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Type below and the live preview updates instantly. Enter your passcode and publish when
            you are happy — no chat required.
          </p>

          <div className="sticky top-4 z-10 mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-hairline bg-surface/90 p-3 backdrop-blur">
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Editor passcode"
              aria-label="Editor passcode"
              className="min-h-11 flex-1 rounded-full border border-hairline bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
            <button
              type="button"
              onClick={onSave}
              disabled={saving}
              className="inline-flex min-h-11 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60"
            >
              {saving ? "Publishing…" : "Publish changes"}
            </button>
            <button
              type="button"
              onClick={() => setShowPreview((p) => !p)}
              aria-pressed={showPreview}
              className="inline-flex min-h-11 items-center rounded-full border border-hairline px-5 text-sm font-semibold lg:hidden"
            >
              {showPreview ? "Hide preview" : "Show preview"}
            </button>
          </div>

          {loading ? (
            <div className="mt-8 space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="skeleton-shimmer h-16 rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="mt-8 space-y-8">
              {textGroups.map((group) => (
                <section
                  key={group.group}
                  className="rounded-2xl border border-hairline bg-surface/40 p-4 sm:p-5"
                >
                  <h2 className="text-sm font-semibold uppercase tracking-widest text-primary">
                    {group.group}
                  </h2>
                  <div className="mt-4 space-y-4">
                    {group.keys.map((field) => (
                      <label key={field.key} className="block">
                        <span className="text-xs uppercase tracking-widest text-muted-foreground">
                          {field.label}
                        </span>
                        {field.multiline ? (
                          <textarea
                            rows={3}
                            value={values[field.key] ?? ""}
                            onChange={(e) =>
                              setValues((v) => ({ ...v, [field.key]: e.target.value }))
                            }
                            className="mt-1.5 w-full rounded-xl border border-hairline bg-background p-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          />
                        ) : (
                          <input
                            value={values[field.key] ?? ""}
                            onChange={(e) =>
                              setValues((v) => ({ ...v, [field.key]: e.target.value }))
                            }
                            className="mt-1.5 min-h-11 w-full rounded-xl border border-hairline bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          />
                        )}
                      </label>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>

        <div className={showPreview ? "block" : "hidden lg:block"}>
          <div className="sticky top-4 overflow-hidden rounded-3xl border border-hairline bg-surface/40">
            <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Live preview
              </p>
              <span className="text-xs text-muted-foreground">Updates as you type</span>
            </div>
            <iframe
              src="/"
              title="Live preview of the KORR.fit website"
              className="h-[70dvh] w-full bg-background"
            />
          </div>
        </div>
      </div>
    </main>

  );
}
