# Offers Editor / Management Page

## Goal
Add a simple password-protected `/offers-edit` page where KORR.fit staff can manage the public Offers section without changing unrelated website content or styling.

## What will be built
- A dedicated Offers Editor page using the existing charcoal, red, white, and gray visual system.
- Password access using the new server-only passcode `KorrOfferEdit123@`.
- A list of every current offer, each with only:
  - a small Edit icon
  - a small Delete/Trash icon
  - drag-and-drop ordering
- Delete confirmation before an offer is removed.
- A prominent `+ Add New Offer` action opening a focused form for:
  - offer image upload
  - eyebrow text
  - title
  - caption/description
  - CTA button text
  - CTA link/action
- Preview and Save actions for new and edited offers.
- A live website preview matching the existing text editor’s side-by-side preview.
- Immediate public-site updates after adding, editing, deleting, or reordering offers.
- Persistent data and images that remain after refresh.

## Data and image handling
- Add an `offers` table in Lovable Cloud with stable IDs, text fields, image URL/path, display order, and timestamps.
- Seed the table with the five offers currently defined in the website so nothing disappears when management moves to the editor.
- Add a public image bucket dedicated to offer posters.
- Public visitors receive read-only access to ordered offers; all write and upload operations remain server-side and require the editor passcode.
- Uploaded files will be validated as images with a sensible size limit and unique storage names.
- Deleting an offer will also remove its uploaded image when that image belongs to the managed offer bucket.

## Website integration
- Replace the static offer list used by the Offers section with persisted ordered offer data.
- Preserve the current offer-card design, poster popup, WhatsApp fallback behavior, loading treatment, and responsive layout.
- Keep the current mobile visibility behavior for seeded offers by storing visibility flags during migration; newly added offers default to visible everywhere.
- Update the image preloader to use the managed offer images without delaying the rest of the page.

## Editor behavior
- Require the password before loading or changing managed offer data.
- Use one add/edit form so editing updates the same offer rather than creating a duplicate.
- Show the selected or newly uploaded image in the existing offer-card style before saving.
- Reordering will use accessible drag handles and persist the complete order immediately after a successful drop.
- Refresh the list and live preview after every successful change; show concise success or error messages.
- Keep the page animation-free and include no controls beyond the requested management actions and live preview.

## Technical details
- Use TanStack Start server functions for list/create/update/delete/reorder/upload operations.
- Validate all inputs with Zod and compare the password only on the server.
- Apply the database change through one migration with explicit grants, row-level security, public read-only policy, and literal seed rows.
- Use the existing design-system Button, dialog/confirmation components, SmartImage, toast system, and semantic color tokens.
- Add unique page metadata for the new editor route and mark it `noindex, nofollow`.
- Record the persisted-offers architecture in `AGENTS.md`.

## Verification
- Confirm all five current offers appear in their existing order on both the editor and public page.
- Verify add, image upload, preview, edit-in-place, delete confirmation, and drag reorder.
- Refresh both pages to confirm persistence.
- Verify public cards and poster popup on desktop and mobile.
- Verify incorrect passwords cannot read management data or mutate offers.
- Check the current build log and browser console for errors.
