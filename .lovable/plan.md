# KORR.fit — Interactions, Lead Flow & Accessibility Pass

## 1. Working lead & booking flows

A single reusable **Lead dialog** (accessible shadcn Dialog) opens from "Book Free Trial" and "Buy Membership".

- Fields: name, phone (10-digit Indian), optional email, goal (select: Weight loss / Muscle gain / General fitness / Personal training / Zumba), preferred day+time slot, message.
- Validation with zod + inline error messages, length limits, trimmed input; submit disabled while sending.
- Membership variant pre-selects the plan when opened from a pricing card.
- On submit the lead is saved to Lovable Cloud (a `leads` table with RLS: anyone may insert, only admins read), then a success state offers a one-tap WhatsApp handoff with the details pre-filled.
- "Call Now" and "WhatsApp" stay direct `tel:` / `wa.me` links but fire tracking events; WhatsApp links get a prefilled message.
- Tracking: a small `trackEvent(name, props)` helper that logs to console in dev and pushes to `window.dataLayer` when present. Events: `lead_open`, `lead_submit`, `lead_success`, `lead_error`, `click_call`, `click_whatsapp`, `click_directions`, `click_instagram`.

## 2. Hero polish

- Add a Lucide icon to every hero action: Buy Membership (CreditCard), View Pricing (Tag), Amenities (Dumbbell), Call Now (Phone), WhatsApp (brand glyph), Get Directions (Navigation), Instagram (Instagram). Secondary links become icon+label pills instead of plain text links.
- Book Free Trial and Buy Membership open the lead dialog.

## 3. Section order

Move **Success Stories** above **Programs** (order becomes: Hero, Stats, Why Us, Success Stories, Programs, Amenities, …). Nav links and section tones adjusted so alternating backgrounds still read correctly.

## 4. Before/After slider fix

Rewrite the drag handling: pointer capture on the container plus a real draggable handle, `touch-action: none` so mobile drag isn't stolen by page scroll, pointer move tracked while pressed (including moves that leave the element), and keyboard support via the range input with visible focus. Works with mouse drag, touch drag, click-to-jump and arrow keys.

## 5. Reviews

- Category chips also rendered inside the "View all reviews" modal, filtering the modal list with the same placeholder data; chip state is shared so the modal opens on the current filter.
- Chips get `aria-pressed`, focus rings, and a live count ("12 reviews").
- "Review us on Google" points at the real Google reviews URL you provided.

## 6. Gallery — More moments

Replace the auto-scrolling marquee with a Kalash-style horizontal slider: snap-scrolling track, prev/next arrow buttons, drag/swipe scroll, keyboard arrow support, and hidden scrollbar. Every image in the current marquee set is included.

## 7. Accessibility QA pass

Audit and fix across all sections:
- Visible `focus-visible` rings on every link, button, chip and accordion trigger.
- Heading order (single h1, no skipped levels), one `<main>`, proper landmarks.
- Icon-only buttons get `aria-label`; decorative icons/images `aria-hidden` / `alt=""`.
- Dialog focus trap, Escape close, focus return to trigger (Radix Dialog handles this).
- Contrast check on muted text over surfaces; bump the muted token if any pair falls under AA.
- Tap targets ≥44px on mobile; `h-dvh` instead of `h-screen` where used.

## 8. WhatsApp floating button

Use official WhatsApp green (#25D366) for the button fill with white glyph, keeping the site's shape language and shadow.

## Technical notes

- New: `src/components/site/LeadDialog.tsx`, `src/lib/analytics.ts`, `src/lib/leads.functions.ts` (server function insert), a Cloud migration for `leads` with grants + RLS.
- Edited: Hero, Reviews, Gallery, Stories, WhatsAppFloat, Pricing, FinalCta, SiteNav, routes/index.tsx.
- Lovable Cloud is enabled as part of this work so trial/membership enquiries are actually stored rather than lost.
