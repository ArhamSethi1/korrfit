CREATE TABLE public.offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  storage_path text,
  eyebrow text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  cta_text text NOT NULL,
  cta_action text NOT NULL,
  sort_order integer NOT NULL,
  mobile_visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT offers_sort_order_unique UNIQUE (sort_order)
);

GRANT SELECT ON public.offers TO anon;
GRANT SELECT ON public.offers TO authenticated;
GRANT ALL ON public.offers TO service_role;

ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Offers are publicly readable"
  ON public.offers FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE OR REPLACE FUNCTION public.set_offers_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_offers_updated_at
  BEFORE UPDATE ON public.offers
  FOR EACH ROW
  EXECUTE FUNCTION public.set_offers_updated_at();

INSERT INTO public.offers
  (image_url, storage_path, eyebrow, title, description, cta_text, cta_action, sort_order, mobile_visible)
VALUES
  ('/__l5e/assets-v1/22cb34ac-3791-4673-9e4f-120423aaeea1/membership-special-offer.png', null, 'Limited period offer', 'Membership Special Offer', 'Get 4 months for ₹5,999, 8 months for ₹8,999, or 15 months for ₹11,999. Every plan includes gym, yoga, Zumba and steam access.', 'Claim this offer', 'https://wa.me/919116668292', 0, true),
  ('/__l5e/assets-v1/73e0fa9f-80c8-4527-9e63-85193d2d3495/offer-1.jpg', null, 'Valid till 30 June 2026', 'KORR.fit Turns 1 — Anniversary Offers', '3 months + 3 free at ₹7,000, 6 months + 6 free at ₹10,000, 12 months + 6 free at ₹14,000 with free PT sessions, BCA test and gym bag.', 'Get anniversary pricing', 'https://wa.me/919116668292', 1, true),
  ('/__l5e/assets-v1/743f78a7-14d2-4490-bc78-5542b2aa0eda/zumba-free-trial.png', null, 'Free trial available', 'Zumba — Fitness for a Happier You', 'Join certified Zumba trainer Salonee Purohit every Monday, Wednesday and Friday from 7:30 to 8:30 AM at no extra cost.', 'Book a free trial', 'https://wa.me/919116668292', 2, true),
  ('/__l5e/assets-v1/ac68670b-bda2-47bb-b200-ae285572fabf/membership-personal-training.png', null, 'Expert guidance', 'Membership + Personal Training', 'Choose 3 months for ₹40,000, 6 months for ₹70,000, or 12 months for ₹1,00,000 with customised workouts, nutrition guidance and progress tracking.', 'Start personal training', 'https://wa.me/919116668292', 3, true),
  ('/__l5e/assets-v1/b28b3447-d221-4d0d-b4ba-733448ca0805/offer-2.jpg', null, 'Group energy', 'Zumba Classes — 3 Days A Week', 'High-energy Zumba on the studio floor, included with your KORR.fit membership.', 'Ask about classes', 'https://wa.me/919116668292', 4, false);