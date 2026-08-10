/**
 * Registry of website copy that can be edited from the /edit page.
 * Add a key here and it automatically shows up in the editor.
 */
export const textGroups: { group: string; keys: { key: string; label: string; multiline?: boolean; value: string }[] }[] = [
  {
    group: "Hero",
    keys: [
      { key: "hero.eyebrow", label: "Location eyebrow", value: "Mansarovar, Jaipur" },
      { key: "hero.headline", label: "Headline", value: "Train with people who" },
      { key: "hero.headlineAccent", label: "Headline (red part)", value: "actually know your name." },
      {
        key: "hero.paragraph",
        label: "Intro paragraph",
        multiline: true,
        value:
          "KORR.fit is a spacious, clean gym in Mansarovar with certified trainers, and everything from strength and functional training to Zumba, steam and nutrition guidance.",
      },
    ],
  },
  {
    group: "Current offers",
    keys: [
      { key: "offers.eyebrow", label: "Eyebrow", value: "Current offers" },
      { key: "offers.title", label: "Title", value: "Reasons to start this week." },
      {
        key: "offers.lead",
        label: "Lead paragraph",
        multiline: true,
        value: "Offer content is fully editable — swap these in and out whenever a promotion changes.",
      },
    ],
  },
  {
    group: "Programs section",
    keys: [
      { key: "programs.eyebrow", label: "Eyebrow", value: "Programs" },
      { key: "programs.title", label: "Title", value: "Five zones, each with a job to do." },
      {
        key: "programs.lead",
        label: "Lead paragraph",
        multiline: true,
        value:
          "Space is the reason our floor never feels like a queue. Every kind of training has somewhere it belongs.",
      },
    ],
  },
  {
    group: "Amenities section",
    keys: [
      { key: "amenities.eyebrow", label: "Eyebrow", value: "Amenities" },
      { key: "amenities.title", label: "Title", value: "Training built around you, not around a template." },
      {
        key: "amenities.lead",
        label: "Lead paragraph",
        multiline: true,
        value:
          "Whatever brings you in — first gym, a comeback, or a specific goal — there is a path here that starts where you are today.",
      },
    ],
  },
  {
    group: "Membership & pricing",
    keys: [
      { key: "pricing.eyebrow", label: "Eyebrow", value: "Membership" },
      { key: "pricing.title", label: "Title", value: "Simple plans. No hidden add-ons." },
      {
        key: "pricing.lead",
        label: "Lead paragraph",
        multiline: true,
        value:
          "All gym memberships include access to Yoga, Zumba & Steam. Final pricing is confirmed at the front desk or over WhatsApp.",
      },
      { key: "pricing.ptTitle", label: "Personal training title", value: "One-to-one coaching plans" },
      {
        key: "pricing.ptLead",
        label: "Personal training lead",
        multiline: true,
        value: "All PT plans include a personalised workout plus ongoing guidance.",
      },
    ],
  },
];

export const defaultTexts: Record<string, string> = Object.fromEntries(
  textGroups.flatMap((g) => g.keys.map((k) => [k.key, k.value] as const)),
);

export type TextKey = keyof typeof defaultTexts;
