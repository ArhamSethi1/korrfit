import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
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
import { faqs } from "@/data/content";

const title = "KORR.fit — Premium Gym in Mansarovar, Jaipur";
const description =
  "KORR.fit is a premium gym in Mansarovar, Jaipur with certified trainers, strength, cardio, functional training, Zumba, steam and personalised plans. Book a free trial.";

export const Route = createFileRoute("/")({
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
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <Hero />
        <Stats />
        <WhyUs />
        <Programs />
        <Amenities />
        <Pricing />
        <Trainers />
        <Schedule />
        <Offers />
        <Stories />
        <Reviews />
        <Gallery />
        <FindUs />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
