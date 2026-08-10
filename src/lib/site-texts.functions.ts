import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const saveSchema = z.object({
  passcode: z.string().min(1),
  texts: z.record(z.string(), z.string().max(2000)),
});

export const getSiteTexts = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.from("site_texts").select("key,value");
  if (error) {
    console.error("[site_texts] read failed", error.message);
    return {} as Record<string, string>;
  }
  return Object.fromEntries((data ?? []).map((r) => [r.key, r.value])) as Record<string, string>;
});

export const saveSiteTexts = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => saveSchema.parse(data))
  .handler(async ({ data }) => {
    const expected = process.env["SITE_EDIT_PASSCODE"];
    if (!expected || data.passcode !== expected) {
      throw new Error("Incorrect passcode.");
    }
    const rows = Object.entries(data.texts).map(([key, value]) => ({ key, value }));
    if (!rows.length) return { ok: true as const };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("site_texts").upsert(rows, { onConflict: "key" });
    if (error) {
      console.error("[site_texts] save failed", error.message);
      throw new Error("Could not save the changes. Please try again.");
    }
    return { ok: true as const };
  });
