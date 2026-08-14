/**
 * Real KORR.fit media (CDN-hosted). Gallery photos, offer posters and
 * walkthrough videos all resolve from these pointers.
 */
import g1 from "@/assets/media/gym-1.png.asset.json";
import g2 from "@/assets/media/gym-2.jpg.asset.json";
import g3 from "@/assets/media/gym-3.webp.asset.json";
import g4 from "@/assets/media/gym-4.webp.asset.json";
import g5 from "@/assets/media/gym-5.webp.asset.json";
import g6 from "@/assets/media/gym-6.webp.asset.json";
import g7 from "@/assets/media/gym-7.webp.asset.json";
import g8 from "@/assets/media/gym-8.webp.asset.json";
import g9 from "@/assets/media/gym-9.webp.asset.json";
import g10 from "@/assets/media/gym-10.webp.asset.json";
import g11 from "@/assets/media/gym-11.webp.asset.json";
import g12 from "@/assets/media/gym-12.webp.asset.json";
import g13 from "@/assets/media/gym-13.webp.asset.json";
import g14 from "@/assets/media/gym-14.png.asset.json";

import o1 from "@/assets/media/offer-1.jpg.asset.json";
import o2 from "@/assets/media/offer-2.jpg.asset.json";
import o3 from "@/assets/media/offer-3.jpg.asset.json";
import o4 from "@/assets/media/offer-4.jpg.asset.json";
import o5 from "@/assets/media/offer-5.webp.asset.json";

import v1 from "@/assets/media/tour-1.mp4.asset.json";
import v2 from "@/assets/media/tour-2.mp4.asset.json";
import v7 from "@/assets/media/tour-7.mp4.asset.json";
import v3 from "@/assets/media/tour-3.mp4.asset.json";
import v4 from "@/assets/media/tour-4.mp4.asset.json";
import v5 from "@/assets/media/tour-5.mp4.asset.json";
import v6 from "@/assets/media/tour-6.mp4.asset.json";
import p1 from "@/assets/media/tour-1.jpg.asset.json";
import p2 from "@/assets/media/tour-2.jpg.asset.json";
import p7 from "@/assets/media/tour-7.jpg.asset.json";
import p3 from "@/assets/media/tour-3.jpg.asset.json";
import p4 from "@/assets/media/tour-4.jpg.asset.json";
import p5 from "@/assets/media/tour-5.jpg.asset.json";
import p6 from "@/assets/media/tour-6.jpg.asset.json";

export type GalleryPhoto = { src: string; alt: string };

/** Hero background — the drone/night floor shot of the gym. */
export const heroBackground = g11.url;

export const galleryPhotos: GalleryPhoto[] = [
  { src: g2.url, alt: "The main training floor at KORR.fit Mansarovar" },
  { src: g1.url, alt: "Night view of the KORR.fit gym floor with members training" },
  { src: g3.url, alt: "Strength equipment and free weights at KORR.fit" },
  { src: g4.url, alt: "Members training on the KORR.fit gym floor" },
  { src: g5.url, alt: "Cardio machines at KORR.fit Mansarovar" },
  { src: g13.url, alt: "Strength racks and free weights on the KORR.fit floor" },
  { src: g14.url, alt: "KORR.fit members celebrating Independence Day at the Mansarovar reception" },
  { src: g7.url, alt: "Coached training session at KORR.fit" },
  { src: g8.url, alt: "Well-maintained equipment at KORR.fit" },
  { src: g9.url, alt: "Inside the KORR.fit gym in Mansarovar, Jaipur" },
  { src: g10.url, alt: "Training zone at KORR.fit" },
  { src: g11.url, alt: "Wide view of the KORR.fit strength floor" },
  { src: g12.url, alt: "Members working out at KORR.fit Jaipur" },
];

/** Every KORR.fit photo, including the ones not shown in the main gallery. */
export const allImages: GalleryPhoto[] = [
  ...galleryPhotos,
  { src: g6.url, alt: "Functional training area at KORR.fit" },
];

export type TourVideo = { src: string; poster: string; alt: string };

export const tourVideos: TourVideo[] = [
  { src: v1.url, poster: p1.url, alt: "Full walkthrough of the KORR.fit gym floor" },
  { src: v7.url, poster: p7.url, alt: "KORR.fit gym walkthrough clip" },
  { src: v2.url, poster: p2.url, alt: "KORR.fit training clip" },
  { src: v3.url, poster: p3.url, alt: "KORR.fit strength zone clip" },
  { src: v4.url, poster: p4.url, alt: "KORR.fit coaching clip" },
  { src: v5.url, poster: p5.url, alt: "KORR.fit workout clip" },
  { src: v6.url, poster: p6.url, alt: "KORR.fit gym atmosphere clip" },
];

export type OfferPoster = {
  image: string;
  badge: string;
  title: string;
  blurb: string;
  cta: string;
};

export const offerPosters: OfferPoster[] = [
  {
    image: o4.url,
    badge: "Valid till 31 Aug 2026",
    title: "Independence Month Offer",
    blurb:
      "Azadi Fitness Challenge: 3 months + 3 months free, 6 months + 6 months free, or 12 months with 1 month PT free. Free diet consultation on every plan.",
    cta: "Claim this offer",
  },
  {
    image: o1.url,
    badge: "Valid till 30 June 2026",
    title: "KORR.fit Turns 1 — Anniversary Offers",
    blurb:
      "3 months + 3 free at ₹7,000, 6 months + 6 free at ₹10,000, 12 months + 6 free at ₹14,000 with free PT sessions, BCA test and gym bag.",
    cta: "Get anniversary pricing",
  },
  {
    image: o3.url,
    badge: "Limited period",
    title: "Monsoon Mega Offer",
    blurb:
      "Lock today's price for just ₹999 and pay the rest later. Up to 8 months free, 20% off personal training and free group classes.",
    cta: "Lock my price",
  },
  {
    image: o5.url,
    badge: "3 days a week",
    title: "Zumba Special Classes",
    blurb:
      "Mon, Wed & Fri at 8 AM — designed for women. Dance, sweat, smile, repeat with our certified Zumba instructor.",
    cta: "Join Zumba",
  },
  {
    image: o2.url,
    badge: "Group energy",
    title: "Zumba Classes — 3 Days A Week",
    blurb: "High-energy Zumba on the studio floor, included with your KORR.fit membership.",
    cta: "Ask about classes",
  },
];

/** Everything shown in the "All Images" popup — gym photos only. */
export const allGalleryImages: GalleryPhoto[] = [...allImages];
