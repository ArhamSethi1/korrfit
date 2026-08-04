/**
 * Single source of truth for KORR.fit business information.
 * Replace any placeholder marked TODO with real details — no layout changes needed.
 */
export const site = {
  name: "KORR.fit",
  legalName: "KORR.fit Gym",
  tagline: "Premium fitness in Mansarovar, Jaipur",
  phone: "9116668292",
  phoneDisplay: "+91 91166 68292",
  tel: "tel:+919116668292",
  whatsapp: "https://wa.me/919116668292",
  email: "hello@korr.fit", // TODO: replace with the real email address
  instagram: "https://www.instagram.com/korr.fit",
  facebook: "https://www.facebook.com/", // TODO: replace with the real page
  maps: "https://maps.app.goo.gl/",
  googleReviews:
    "https://www.google.com/search?sca_esv=b59435e14644ce34&rlz=1C1CHBF_enIN1082IN1082&sxsrf=APpeQnvoCXezBgldsI6oIeryRBge2ukQrw:1785863055247&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_88MRfSimQReKFtcObpJ28OnP2dJ9Tj3VxBhOySWQZL7k_1xqe_5WEAF4F9CIqSYug4Cygpb1vmpcpXiLiay9UF1pWhUUj2vgYTzkk0HzqAsu8lEzA%3D%3D&q=KORR.fit+Mansarovar,+Jaipur+Reviews&sa=X&ved=2ahUKEwju4ZmouoeWAxUimeEIHXb-C24Q0bkNegQIKBAI",
  directions:
    "https://www.google.com/maps/dir/?api=1&destination=KORR.fit+Gym+51%2F12+Shipra+Path+Mansarovar+Jaipur",
  mapEmbed:
    "https://www.google.com/maps?q=51%2F12%20Shipra%20Path%2C%20Mansarovar%20Sector%205%2C%20Jaipur%20302020&output=embed",
  address: {
    line1: "51/12 Shipra Path, opposite Neerja Modi School",
    line2: "Ward 27, Mansarovar Sector 5",
    city: "Jaipur",
    state: "Rajasthan",
    postalCode: "302020",
    country: "IN",
    latitude: 26.8505,
    longitude: 75.7628,
  },
  rating: { value: "5.0", count: 105 },
  hours: [
    { days: "Monday – Saturday", time: "5:30 AM – 10:30 PM" }, // TODO: confirm timings
    { days: "Sunday", time: "7:00 AM – 12:00 PM" },
  ],
} as const;

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "Programs", href: "#programs" },
  { label: "Amenities", href: "#amenities" },
  { label: "Pricing", href: "#pricing" },
  { label: "Reviews", href: "#reviews" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
] as const;
