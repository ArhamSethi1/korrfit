import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const BUCKET = "offer-posters";
const MAX_IMAGE_BYTES = 8 * 1024 * 1024;

const ctaActionSchema = z
  .string()
  .trim()
  .min(1, "CTA link or action is required.")
  .max(1000)
  .refine(
    (value) => /^(https?:\/\/|tel:|mailto:|#|\/)/i.test(value),
    "Enter a valid website, WhatsApp, phone, email, or page link.",
  );

const offerFieldsSchema = z.object({
  eyebrow: z.string().trim().min(1, "Eyebrow text is required.").max(100),
  title: z.string().trim().min(1, "Title is required.").max(160),
  description: z.string().trim().min(1, "Caption is required.").max(1200),
  ctaText: z.string().trim().min(1, "CTA button text is required.").max(80),
  ctaAction: ctaActionSchema,
});

const saveOfferSchema = offerFieldsSchema.extend({
  passcode: z.string().min(1),
  id: z.string().uuid().optional(),
  imageData: z.string().max(12_000_000).optional(),
  imageName: z.string().max(255).optional(),
});

const passcodeSchema = z.object({ passcode: z.string().min(1) });
const deleteSchema = passcodeSchema.extend({ id: z.string().uuid() });
const reorderSchema = passcodeSchema.extend({ ids: z.array(z.string().uuid()).min(1).max(100) });

type OfferRow = {
  id: string;
  image_url: string;
  storage_path: string | null;
  eyebrow: string;
  title: string;
  description: string;
  cta_text: string;
  cta_action: string;
  sort_order: number;
  mobile_visible: boolean;
};

export type ManagedOffer = {
  id: string;
  image: string;
  storagePath: string | null;
  badge: string;
  title: string;
  blurb: string;
  cta: string;
  action: string;
  order: number;
  mobileVisible: boolean;
};

function requirePasscode(passcode: string) {
  const expected = process.env["SITE_OFFER_EDIT_PASSCODE"];
  if (!expected || passcode !== expected) throw new Error("Incorrect passcode.");
}

async function mapOffers(rows: OfferRow[]): Promise<ManagedOffer[]> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return Promise.all(
    rows.map(async (row) => {
      let image = row.image_url;
      if (row.storage_path) {
        const { data } = await supabaseAdmin.storage.from(BUCKET).createSignedUrl(row.storage_path, 3600);
        if (data?.signedUrl) image = data.signedUrl;
      }
      return {
        id: row.id,
        image,
        storagePath: row.storage_path,
        badge: row.eyebrow,
        title: row.title,
        blurb: row.description,
        cta: row.cta_text,
        action: row.cta_action,
        order: row.sort_order,
        mobileVisible: row.mobile_visible,
      };
    }),
  );
}

async function readOffers() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("offers")
    .select("id,image_url,storage_path,eyebrow,title,description,cta_text,cta_action,sort_order,mobile_visible")
    .order("sort_order", { ascending: true });
  if (error) throw new Error("Could not load offers.");
  return mapOffers((data ?? []) as OfferRow[]);
}

export const getPublicOffers = createServerFn({ method: "GET" }).handler(readOffers);

export const getManagedOffers = createServerFn({ method: "POST" })
  .validator((data: unknown) => passcodeSchema.parse(data))
  .handler(async ({ data }) => {
    requirePasscode(data.passcode);
    return readOffers();
  });

function parseImage(dataUrl: string) {
  const match = /^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/.exec(dataUrl);
  if (!match?.[1] || !match[2]) throw new Error("Choose a JPG, PNG, or WebP image.");
  const bytes = Uint8Array.from(Buffer.from(match[2], "base64"));
  if (bytes.byteLength > MAX_IMAGE_BYTES) throw new Error("The image must be 8 MB or smaller.");
  return { bytes, contentType: match[1] };
}

export const saveOffer = createServerFn({ method: "POST" })
  .validator((data: unknown) => saveOfferSchema.parse(data))
  .handler(async ({ data }) => {
    requirePasscode(data.passcode);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    let imageUrl: string | undefined;
    let storagePath: string | undefined;
    if (data.imageData) {
      const image = parseImage(data.imageData);
      const extension = image.contentType === "image/jpeg" ? "jpg" : image.contentType.split("/")[1];
      storagePath = `${crypto.randomUUID()}.${extension}`;
      const { error: uploadError } = await supabaseAdmin.storage
        .from(BUCKET)
        .upload(storagePath, image.bytes, { contentType: image.contentType, upsert: false });
      if (uploadError) throw new Error("Could not upload the offer image.");
      imageUrl = storagePath;
    }

    if (data.id) {
      const { data: current, error: currentError } = await supabaseAdmin
        .from("offers")
        .select("storage_path,image_url")
        .eq("id", data.id)
        .single();
      if (currentError || !current) throw new Error("This offer no longer exists.");
      const { error } = await supabaseAdmin
        .from("offers")
        .update({
          eyebrow: data.eyebrow,
          title: data.title,
          description: data.description,
          cta_text: data.ctaText,
          cta_action: data.ctaAction,
          ...(storagePath ? { storage_path: storagePath, image_url: imageUrl ?? storagePath } : {}),
        })
        .eq("id", data.id);
      if (error) throw new Error("Could not save this offer.");
      if (storagePath && current.storage_path) {
        await supabaseAdmin.storage.from(BUCKET).remove([current.storage_path]);
      }
    } else {
      if (!storagePath || !imageUrl) throw new Error("Choose an offer image.");
      const { data: last } = await supabaseAdmin
        .from("offers")
        .select("sort_order")
        .order("sort_order", { ascending: false })
        .limit(1)
        .maybeSingle();
      const { error } = await supabaseAdmin.from("offers").insert({
        image_url: imageUrl,
        storage_path: storagePath,
        eyebrow: data.eyebrow,
        title: data.title,
        description: data.description,
        cta_text: data.ctaText,
        cta_action: data.ctaAction,
        sort_order: (last?.sort_order ?? -1) + 1,
        mobile_visible: true,
      });
      if (error) {
        await supabaseAdmin.storage.from(BUCKET).remove([storagePath]);
        throw new Error("Could not add this offer.");
      }
    }
    return { ok: true as const };
  });

export const deleteOffer = createServerFn({ method: "POST" })
  .validator((data: unknown) => deleteSchema.parse(data))
  .handler(async ({ data }) => {
    requirePasscode(data.passcode);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: current, error: currentError } = await supabaseAdmin
      .from("offers")
      .select("storage_path")
      .eq("id", data.id)
      .single();
    if (currentError || !current) throw new Error("This offer no longer exists.");
    const { error } = await supabaseAdmin.from("offers").delete().eq("id", data.id);
    if (error) throw new Error("Could not delete this offer.");
    if (current.storage_path) await supabaseAdmin.storage.from(BUCKET).remove([current.storage_path]);
    const { data: remaining } = await supabaseAdmin.from("offers").select("id").order("sort_order");
    if (remaining?.length) await supabaseAdmin.rpc("reorder_offers", { _ids: remaining.map((row) => row.id) });
    return { ok: true as const };
  });

export const reorderOffers = createServerFn({ method: "POST" })
  .validator((data: unknown) => reorderSchema.parse(data))
  .handler(async ({ data }) => {
    requirePasscode(data.passcode);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.rpc("reorder_offers", { _ids: data.ids });
    if (error) throw new Error("Could not save the offer order.");
    return { ok: true as const };
  });