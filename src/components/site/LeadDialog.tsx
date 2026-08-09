import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { days, goals, leadSchema, timeSlots, type LeadInput } from "@/lib/lead-schema";
import { submitLead } from "@/lib/leads.functions";
import { trackEvent } from "@/lib/analytics";
import { site } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { cn } from "@/lib/utils";

type OpenOptions = { intent?: "trial" | "membership"; plan?: string; source?: string };

type LeadContextValue = { openLead: (options?: OpenOptions) => void };

const LeadContext = createContext<LeadContextValue | null>(null);

export function useLead() {
  const ctx = useContext(LeadContext);
  if (!ctx) throw new Error("useLead must be used inside <LeadProvider>");
  return ctx;
}

const emptyForm: LeadInput = {
  name: "",
  phone: "",
  email: "",
  goal: goals[0],
  preferredDay: days[0],
  preferredTime: timeSlots[0],
  message: "",
  plan: "",
  source: "hero",
};

const fieldClass =
  "w-full rounded-xl border border-hairline bg-surface/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/** Membership only needs the essentials — nothing is stored on our side. */
const membershipSchema = leadSchema.pick({ name: true, phone: true, email: true, message: true });

function buildWhatsAppLink(lines: string[]) {
  return `${site.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function LeadProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [intent, setIntent] = useState<"trial" | "membership">("trial");
  const [form, setForm] = useState<LeadInput>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof LeadInput, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const send = useServerFn(submitLead);

  const openLead = useCallback((options: OpenOptions = {}) => {
    const nextIntent = options.intent ?? "trial";
    setIntent(nextIntent);
    setForm({
      ...emptyForm,
      plan: options.plan ?? "",
      source: options.source ?? nextIntent,
    });
    setErrors({});
    setServerError(null);
    setStatus("idle");
    setOpen(true);
    trackEvent("lead_open", {
      intent: nextIntent,
      plan: options.plan ?? "",
      source: options.source ?? nextIntent,
    });
  }, []);

  const value = useMemo(() => ({ openLead }), [openLead]);

  const isMembership = intent === "membership";

  const set = (key: keyof LeadInput, v: string) => {
    setForm((f) => ({ ...f, [key]: v }) as LeadInput);
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const membershipMessage = () => {
    const lines = [
      `Hi KORR.fit, I'd like to buy a membership.`,
      "",
      `Name: ${form.name}`,
      `Mobile: ${form.phone}`,
    ];
    if (form.plan) lines.push(`Plan: ${form.plan}`);
    if (form.email) lines.push(`Email: ${form.email}`);
    if (form.message) lines.push("", `Anything else: ${form.message}`);
    return lines;
  };

  const trialMessage = () => {
    const lines = [
      `Hi KORR.fit, I'd like to book my free trial.`,
      "",
      `Name: ${form.name}`,
      `Mobile: ${form.phone}`,
    ];
    if (form.email) lines.push(`Email: ${form.email}`);
    lines.push(
      "",
      `Goal: ${form.goal}`,
      `Preferred day: ${form.preferredDay}`,
      `Preferred time: ${form.preferredTime}`,
    );
    if (form.plan) lines.push("", `Plan: ${form.plan}`);
    if (form.message) lines.push("", `Anything else: ${form.message}`);
    return lines;
  };

  const collectErrors = (error: z.ZodError) => {
    const next: Partial<Record<keyof LeadInput, string>> = {};
    for (const issue of error.issues) {
      const key = issue.path[0] as keyof LeadInput;
      if (!next[key]) next[key] = issue.message;
    }
    setErrors(next);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (isMembership) {
      const parsed = membershipSchema.safeParse(form);
      if (!parsed.success) {
        collectErrors(parsed.error);
        trackEvent("lead_error", { reason: "validation" });
        return;
      }
      // Membership enquiries are handed straight to WhatsApp — nothing stored.
      trackEvent("click_whatsapp", { source: "membership_form", plan: form.plan });
      window.open(buildWhatsAppLink(membershipMessage()), "_blank", "noopener,noreferrer");
      setOpen(false);
      return;
    }

    const parsed = leadSchema.safeParse(form);
    if (!parsed.success) {
      collectErrors(parsed.error);
      trackEvent("lead_error", { reason: "validation" });
      return;
    }

    setStatus("sending");
    trackEvent("lead_submit", { intent, goal: parsed.data.goal, plan: parsed.data.plan });
    try {
      await send({ data: parsed.data });
      trackEvent("lead_success", { intent, goal: parsed.data.goal });
      window.open(buildWhatsAppLink(trialMessage()), "_blank", "noopener,noreferrer");
      setStatus("idle");
      setOpen(false);
    } catch (err) {
      setStatus("idle");
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      trackEvent("lead_error", { reason: "server" });
    }
  };

  return (
    <LeadContext.Provider value={value}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[92dvh] overflow-y-auto border-hairline bg-background sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              {isMembership ? "Buy a membership" : "Book your free trial"}
            </DialogTitle>
            <DialogDescription>
              {isMembership
                ? "Just a few details — we will continue the conversation on WhatsApp."
                : "Leave your details and we will confirm your slot on WhatsApp."}
            </DialogDescription>
          </DialogHeader>

          <form noValidate onSubmit={onSubmit} className="space-y-4">
            <Field id="lead-name" label="Your name" error={errors.name}>
              <input
                id="lead-name"
                name="name"
                autoComplete="name"
                maxLength={80}
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "lead-name-error" : undefined}
                className={fieldClass}
                placeholder="Aarav Sharma"
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="lead-phone" label="Mobile number" error={errors.phone}>
                <input
                  id="lead-phone"
                  name="phone"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  maxLength={10}
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "lead-phone-error" : undefined}
                  className={fieldClass}
                  placeholder="9876543210"
                />
              </Field>
              <Field id="lead-email" label="Email (optional)" error={errors.email}>
                <input
                  id="lead-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={255}
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "lead-email-error" : undefined}
                  className={fieldClass}
                  placeholder="you@example.com"
                />
              </Field>
            </div>

            {isMembership ? null : (
              <>
                <Field id="lead-goal" label="Your main goal">
                  <select
                    id="lead-goal"
                    value={form.goal}
                    onChange={(e) => set("goal", e.target.value)}
                    className={fieldClass}
                  >
                    {goals.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </Field>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="lead-day" label="Preferred day">
                    <select
                      id="lead-day"
                      value={form.preferredDay}
                      onChange={(e) => set("preferredDay", e.target.value)}
                      className={fieldClass}
                    >
                      {days.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field id="lead-time" label="Preferred time">
                    <select
                      id="lead-time"
                      value={form.preferredTime}
                      onChange={(e) => set("preferredTime", e.target.value)}
                      className={fieldClass}
                    >
                      {timeSlots.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
              </>
            )}

            {form.plan ? (
              <p className="text-xs text-muted-foreground">
                Selected plan: <span className="text-foreground">{form.plan}</span>
              </p>
            ) : null}

            <Field id="lead-message" label="Anything we should know? (optional)">
              <textarea
                id="lead-message"
                name="message"
                rows={3}
                maxLength={600}
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                className={cn(fieldClass, "resize-none")}
                placeholder="Injuries, experience level, questions…"
              />
            </Field>

            {serverError ? (
              <p role="alert" className="text-sm text-destructive">
                {serverError}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-black transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60"
            >
              {status === "sending" ? (
                <>
                  <Loader2 width={16} height={16} aria-hidden="true" className="animate-spin" />
                  Opening WhatsApp…
                </>
              ) : (
                <>
                  <WhatsAppIcon size={18} />
                  {isMembership ? "Request this membership on WhatsApp" : "Book my free trial on WhatsApp"}
                </>
              )}
            </button>

            <p className="text-center text-xs text-muted-foreground">
              Prefer talking?{" "}
              <a
                href={site.tel}
                onClick={() => trackEvent("click_call", { source: "lead_dialog" })}
                className="text-foreground underline underline-offset-4"
              >
                Call {site.phoneDisplay}
              </a>
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </LeadContext.Provider>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
