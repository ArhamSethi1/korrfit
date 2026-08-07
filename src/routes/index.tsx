import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { LeadProvider } from "@/components/site/LeadDialog";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { Hero } from "@/components/site/sections/Hero";
import { Stats } from "@/components/site/sections/Stats";
import { WhyUs } from "@/components/site/sections/WhyUs";
import { Programs } from "@/components/site/sections/Programs";
import { Amenities } from "@/components/site/sections/Amenities";
import { Pricing } from "@/components/site/sections/Pricing";
import { Trainers } from "@/components/site/sections/Trainers";
import { Schedule } from "@/components/site/sections/Schedule";
import { Offers } from "@/components/site/sections/Offers";
import { Stories } from "@/components/site/sections/Stories";
import { Reviews } from "@/components/site/sections/Reviews";
import { Gallery } from "@/components/site/sections/Gallery";
import { FindUs } from "@/components/site/sections/FindUs";
import { Faq } from "@/components/site/sections/Faq";
import { FinalCta, Footer } from "@/components/site/sections/FinalCta";
import { site } from "@/lib/site";
import { faqs, reviews, stories } from "@/data/content";
import { BackToTop } from "@/components/site/BackToTop";
import { SmoothAnchors } from "@/components/site/SmoothAnchors";

const title = "KORR.fit — Premium Gym in Mansarovar, Jaipur";
const description =
  "KORR.fit is a premium gym in Mansarovar, Jaipur with certified trainers, strength, cardio, functional training, Zumba, steam and personalised plans. Book a free trial.";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>) => ({
    reviews: typeof search["reviews"] === "string" ? (search["reviews"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HealthAndBeautyBusiness",
          "@id": "#korrfit",
          name: site.name,
          description,
          telephone: `+91${site.phone}`,
          address: {
            "@type": "PostalAddress",
            streetAddress: `${site.address.line1}, ${site.address.line2}`,
            addressLocality: site.address.city,
            addressRegion: site.address.state,
            postalCode: site.address.postalCode,
            addressCountry: site.address.country,
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: site.address.latitude,
            longitude: site.address.longitude,
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: site.rating.value,
            reviewCount: site.rating.count,
          },
          sameAs: [site.instagram],
          review: reviews.slice(0, 6).map((r) => ({
            "@type": "Review",
            author: { "@type": "Person", name: r.name },
            reviewBody: r.text,
            reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
            itemReviewed: { "@type": "HealthAndBeautyBusiness", name: site.name },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "KORR.fit member success stories",
          itemListElement: stories.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Review",
              name: `${s.program} transformation`,
              author: { "@type": "Person", name: s.name },
              reviewBody: `${s.quote} (${s.program}, ${s.duration}, ${s.result})`,
              reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
              itemReviewed: { "@type": "HealthAndBeautyBusiness", name: site.name },
            },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <LeadProvider>
      <div className="min-h-screen bg-background text-foreground">
        <SiteNav />
        <main>
          <Hero />
          <Stats />
          <Gallery />
          <Stories />
          <Reviews />
          <Programs />
          <Amenities />
          <Pricing />
          <Trainers />
          <Schedule />
          <Offers />
          <WhyUs />
          <FindUs />
          <Faq />
          <FinalCta />
        </main>
        <Footer />
        <BackToTop />
        <WhatsAppFloat />
        <SmoothAnchors />
      </div>
    </LeadProvider>
  );
}
