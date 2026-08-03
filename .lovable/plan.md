## KORR.fit — Premium Single-Page Website (Parts 1–4)

A single scrolling landing page at `/`, mobile-first, built as one continuous premium experience. Explicitly single-page per your brief, so section anchors are used for in-page navigation.

---

### Brand system (derived from the logo)

Read from the mark: near-black charcoal ground, one confident brand red, white type, geometric single-weight sans with open letter-spacing, minimal line-built figure icon (circle, barbell bar, chevron).

Tokens in `src/styles.css`:
- `background` deep graphite, `surface` slightly lifted, `surface-2` for insets
- `primary` the logo red — rich and slightly desaturated, never neon; used sparingly as accent, not as flood
- `foreground` white, `muted-foreground` warm gray; hairline borders at low white opacity
- Card radius ~1.5rem, pill buttons with generous padding, soft layered shadows
- Type: geometric grotesk display face matching the logo's letterforms for headings (tight tracking, large sizes) + clean neutral sans for body, loaded via `<link>` in `__root.tsx`
- Motion utilities: fade-up reveal, gentle lift, image zoom, count-up. No bounce, spin, or glow. `prefers-reduced-motion` honored throughout.

Logo enters via a Lovable asset pointer; a square padded `public/favicon.png` is generated from it and wired into `__root.tsx`.

---

### Navigation & scroll chrome
- Sticky nav: transparent over the hero, solidifying to blurred charcoal on scroll. Logo left, links (Home, Programs, Amenities, Pricing, Reviews, Gallery, Contact) center/right, "Book Free Trial" pill at the end.
- Mobile: fullscreen overlay menu with staggered item reveal and a contact block at the base.
- Thin red scroll-progress bar at the very top; active section highlighting driven by an IntersectionObserver spy; smooth scrolling with scroll-margin so anchors never land under the nav.
- Floating WhatsApp button: brand-styled (charcoal disc, red ring), fades in after the hero, lifts on hover, sits clear of the mobile CTA zone.

---

### Sections in order

**1. Hero** — Location eyebrow "Mansarovar, Jaipur" → large headline → one short supporting paragraph → primary CTA (Book Free Trial) → secondary row (Buy Membership, Pricing, Call, WhatsApp, Directions, Amenities, Instagram, weighted so not all shout equally) → Google badge ★ 5.0 · 105+ Reviews, visible without scrolling. Full-bleed rounded image, soft gradient, subtle parallax; two-column on desktop.

**2. Trust Statistics** — Six elegant count-up cards: 5.0 Google Rating, 105+ Reviews, 6 Certified Trainers, 2 Floors, High Quality Equipment, Spacious Workout Zones.

**3. Why Choose KORR.fit** — Paired comparison rows: muted "Typical gym" line above, red-accented "At KORR.fit" line below. Five pairs (plans, space, trainers, lifestyle, hygiene). Positive framing, never attacking.

**4. Training Built Around You** — 15 program cards (Weight Loss → Stretch Therapy), each with a line icon and one real sentence on how KORR.fit delivers it. No lorem.

**5. Amenities & Facilities** — Five grouped feature blocks (Strength, Cardio, Functional, Recovery & Comfort, Group Activities) with item lists — not a flat icon grid.

**6. Membership Plans** — Three cards, center elevated with red border. Clearly-marked price placeholder blocks and placeholder feature lines. No invented prices.

**7. Meet Our Trainers** — Exactly six cards: photo placeholder, name, Certified Trainer badge, specialization, experience, short bio — all placeholders.

**8. Weekly Schedule** — Day rail (mobile chips / desktop seven columns) revealing placeholder sessions. Not a table.

**9. Offers** — Horizontal showcase: large image placeholder, title, short placeholder line, CTA.

**10. Success Stories** — Transformation cards (before/after placeholders, name, program, duration, result, short story) plus one large draggable Before/After comparison slider as the visual highlight.

**11. Google Reviews** — Original design, Google's UX as inspiration only. Large 5.0 summary with stars and 105+ reviews; scrollable display-only category chips (All, Zumba, Trainers, Cleanliness, Equipment, Hygiene, and the rest); premium review cards (avatar, name, Google glyph, stars, time, text, helpful count, like icon). "View All Reviews" opens a full modal with title, rating summary, non-functional search field, chips, scrollable list, load-more pagination, close button.

**12. Gallery** — Masonry grid of varied-size placeholders, rounded corners, gentle hover zoom. Below it "More Moments": a continuously scrolling horizontal marquee of different placeholders. Then a horizontal video showcase with clear play overlays.

**13. Explore Our Space** — Tour shell: room selector (Reception, Strength, Cardio, Functional, Steam, Stretch, Changing Rooms) driving a large viewer panel with placeholder imagery and hotspot markers, structured for real panoramas later.

**14. Find Us** — Rounded, shadowed Google Map embed with a large Get Directions button beneath it (your Maps link), beside a contact card: address (51/12 Shipra Path, opposite Neerja Modi School, Ward 27, Mansarovar Sector 5, Jaipur 302020), phone 9116668292, placeholder email, opening hours placeholder, 5.0 Google rating, social links. Mobile stacks map first.

**15. FAQ** — Premium accordion, smooth height/opacity transitions, red indicator on the open row. Ten questions as listed, with realistic editable answers.

**16. Final CTA** — Bold emotional close ("Ready To Start Your Transformation?") over a dark textured panel with a red accent field. Primary Book Free Trial; secondary Buy Membership, WhatsApp, Call Now.

**17. Footer** — Logo, short brand line, quick links (Programs, Amenities, Gallery, Reviews, Pricing, Contact), contact block, Instagram/Facebook, copyright, Privacy Policy and Terms placeholders.

---

### Copy
Confident, warm, specific. No "beast mode", "no pain no gain", or hype. Every claim tied to your real differentiators: spacious, less crowded, certified trainers, personalized guidance, hygiene, comfort, community.

### SEO
Route `head()` with a local-intent title and description targeting gym in Mansarovar / Jaipur, premium gym, personal training, Zumba, steam, functional training, weight loss, muscle gain — worked naturally into headings and body copy too. Open Graph + Twitter card tags, relative canonical (no domain yet), and JSON-LD combining LocalBusiness/HealthClub + Gym: name, address, geo, phone, hours, 5.0 aggregate rating over 105 reviews, sameAs Instagram.

### Performance & accessibility
Lazy-loaded below-fold images with width/height set to prevent layout shift; hero image preloaded; transform/opacity-only animations; observers shared via one hook and disconnected after reveal; no heavy animation libraries. Semantic landmarks, single H1, correct heading order, visible focus rings, keyboard-operable accordion/modal/slider/tour, alt text on every image, AA contrast on charcoal.

### Structure & future-proofing
Sections as focused components under `src/components/sections/`, composed in `src/routes/index.tsx`. All placeholder content lives in typed data arrays in `src/data/` — pricing, trainers, reviews, gallery, offers, stories, schedule, FAQ — so real content or a CMS/API swaps in without touching layout. Alternating charcoal / lifted / red-accented grounds keep adjacent sections from repeating.

Live throughout: tel & WhatsApp 9116668292, instagram.com/korr.fit, your Google Maps link.
