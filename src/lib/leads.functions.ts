import { createServerFn } from "@tanstack/react-start";
import { leadSchema } from "./lead-schema";

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("leads").insert({
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      goal: data.goal,
      preferred_day: data.preferredDay || null,
      preferred_time: data.preferredTime || null,
      message: data.message || null,
      plan: data.plan || null,
      source: data.source,
    });
    if (error) {
      console.error("[leads] insert failed", error.message);
      throw new Error("We could not save your details. Please try WhatsApp or call us.");
    }
    return { ok: true as const };
  });
