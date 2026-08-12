import strengthImg from "@/assets/gym-strength.jpg";
import cardioImg from "@/assets/gym-cardio.jpg";
import functionalImg from "@/assets/gym-functional.jpg";
import recoveryImg from "@/assets/gym-recovery.jpg";
import studioImg from "@/assets/gym-studio.jpg";

/**
 * Placeholder-friendly content for KORR.fit.
 * Everything here is plain data — swap in real content or a CMS/API response
 * without touching any layout code.
 */

export type Program = { title: string; note: string };

export const programs: Program[] = [
  { title: "Weight Loss", note: "Structured training and calorie targets you can actually keep up with." },
  { title: "Muscle Gain", note: "Progressive strength blocks built around your recovery and schedule." },
  { title: "Strength Training", note: "Coached compound lifting with form checks every session." },
  { title: "Functional Training", note: "Movement patterns that make everyday life feel lighter." },
  { title: "Fat Loss Programs", note: "Conditioning circuits paired with simple, sustainable habits." },
  { title: "Body Recomposition", note: "Lose fat and build muscle together with careful load management." },
  { title: "Personal Training", note: "One-to-one coaching with a plan written only for you." },
  { title: "Group Training", note: "Small groups, real coaching, and a room that keeps you accountable." },
  { title: "Zumba", note: "High-energy dance sessions in our dedicated studio floor." },
  { title: "Cardio Conditioning", note: "Heart-rate guided work on well-maintained cardio equipment." },
  { title: "Core & Abs", note: "Focused core work that supports your lifts and your posture." },
  { title: "Beginner Onboarding", note: "Your first two weeks are guided step by step. Nothing is assumed." },
  { title: "Senior Fitness", note: "Low-impact strength and mobility with close supervision." },
  { title: "Nutrition Guidance", note: "Practical Indian-diet plans, not restrictive crash menus." },
  { title: "Stretch Therapy", note: "Assisted mobility work to keep you training without niggles." },
];

export type AmenityGroup = { title: string; blurb: string; items: string[] };

export const amenityGroups: AmenityGroup[] = [
  {
    title: "Zumba",
    blurb: "High-energy Zumba on alternate days in a dedicated studio.",
    items: ["Alternate-day classes", "Certified instructor", "Mirrored dance floor", "Sound system", "Beginner friendly", "Weekly schedule"],
  },
  {
    title: "Steam",
    blurb: "Wind down properly — steam is part of the membership, not an add-on.",
    items: ["Steam room", "Post-workout recovery", "Hygienically cleaned", "Towel & locker access", "Changing rooms", "Open all week"],
  },
  {
    title: "Strength Floor",
    blurb: "A full free-weight floor with room to move between sets.",
    items: ["Power racks", "Olympic barbells", "Full dumbbell range", "Benches & platforms", "Cable stations", "Plate-loaded machines"],
  },
  {
    title: "Cardio Zone",
    blurb: "Well-spaced, well-maintained machines that are always ready.",
    items: ["Treadmills", "Cross trainers", "Spin bikes", "Rowing", "Stair climber", "Heart-rate friendly layout"],
  },
  {
    title: "Functional Area",
    blurb: "A dedicated space so functional work never blocks the weights floor.",
    items: ["Turf track", "Kettlebells", "Battle ropes", "Plyo boxes", "Suspension trainers", "Medicine balls"],
  },
  {
    title: "Recovery & Comfort",
    blurb: "The part most gyms skip — and the part that keeps you coming back.",
    items: ["Steam room", "Stretching zone", "Clean changing rooms", "Lockers", "Air-conditioned floors", "Drinking water"],
  },
];

export type Plan = {
  name: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  featured?: boolean;
};

/** Official KORR.fit tariff — all gym memberships include Yoga, Zumba & Steam. */
export const plans: Plan[] = [
  {
    name: "Individual — 3 Months",
    description: "Long enough to build the habit and see the first real change.",
    price: "₹8,000",
    period: "3 months",
    features: ["Full gym access", "Yoga, Zumba & Steam included", "Onboarding session", "Locker access on request"],
  },
  {
    name: "Individual — 6 Months",
    description: "The plan most members choose — steady progress, better value.",
    price: "₹12,000",
    period: "6 months",
    features: [
      "Everything in 3 Months",
      "Personalised training plan",
      "Monthly progress review",
      "Yoga, Zumba & Steam included",
    ],
    featured: true,
  },
  {
    name: "Individual — 12 Months",
    description: "Best value for members who train as part of their routine.",
    price: "₹16,000",
    period: "12 months",
    features: [
      "Everything in 6 Months",
      "Quarterly body assessment",
      "Priority class access",
      "Yoga, Zumba & Steam included",
    ],
  },
];

export const lifetimeMembership = { label: "Life Time Membership Fee", price: "₹1,50,000" };

export const otherFacilities: string[] = [
  "One Day Access: ₹500 (Gym + 1 Yoga/Zumba class)",
  "Dietician Consultation: ₹1,000 (pre-booking only)",
  "Locker: ₹350/month or ₹2,000/year",
  "Steam for non-gym members: ₹350/session (advance booking mandatory)",
  "Couple, group & personal training plans — ask at reception",
];

export const importantNotes: string[] = [
  "No offers or discounts on the one-month membership plan.",
  "No refunds after activation.",
  "Transfer/freeze allowed only under terms mentioned in policy.",
];

export const membershipTerms =
  "By using our services, you agree to abide by all terms and facility rules displayed at the gym.";

export type PtPlan = { label: string; price: string };

export const ptSessionPlans: PtPlan[] = [
  { label: "Per session", price: "₹1,000" },
  { label: "3 sessions", price: "₹2,500" },
  { label: "10 sessions", price: "₹7,000" },
];

export const ptMonthPlans: PtPlan[] = [
  { label: "1 month", price: "₹12,000" },
  { label: "3 months", price: "₹30,000" },
  { label: "6 months", price: "₹50,000" },
  { label: "12 months", price: "₹85,000" },
];

export const ptIncludes: string[] = [
  "Fitness assessment",
  "Customized workout",
  "Nutrition guidance",
  "Form correction",
  "Monthly progress tracking",
  "Motivation & accountability",
];

export const ptIdealFor: string[] = [
  "Fat loss",
  "Muscle gain",
  "Strength",
  "Beginners",
  "Transformation",
];

export const ptTerms =
  "PT fees are non-refundable. Sessions are non-transferable. Valid only within the selected duration. Prior notice required for rescheduling.";

export const ptTagline = "Transform yourself with expert coaching.";


export type Trainer = {
  name: string;
  specialization: string;
  experience: string;
  bio: string;
};

// TODO: replace with real trainer names, photos and bios.
export const trainers: Trainer[] = [
  { name: "Trainer Name", specialization: "Strength & Conditioning", experience: "— years experience", bio: "Short bio placeholder describing coaching style and the members they work best with." },
  { name: "Trainer Name", specialization: "Weight Loss Coaching", experience: "— years experience", bio: "Short bio placeholder describing coaching style and the members they work best with." },
  { name: "Trainer Name", specialization: "Functional Training", experience: "— years experience", bio: "Short bio placeholder describing coaching style and the members they work best with." },
  { name: "Trainer Name", specialization: "Zumba & Group Fitness", experience: "— years experience", bio: "Short bio placeholder describing coaching style and the members they work best with." },
  { name: "Trainer Name", specialization: "Nutrition Guidance", experience: "— years experience", bio: "Short bio placeholder describing coaching style and the members they work best with." },
  { name: "Trainer Name", specialization: "Mobility & Rehab Support", experience: "— years experience", bio: "Short bio placeholder describing coaching style and the members they work best with." },
];

export type Session = { time: string; title: string; coach: string };

// TODO: replace with the live weekly timetable.
export const schedule: { day: string; short: string; sessions: Session[] }[] = [
  { day: "Monday", short: "Mon", sessions: [
    { time: "6:30 AM", title: "Strength Basics", coach: "Trainer" },
    { time: "7:30 AM", title: "Functional Circuit", coach: "Trainer" },
    { time: "6:30 PM", title: "Zumba", coach: "Trainer" },
  ]},
  { day: "Tuesday", short: "Tue", sessions: [
    { time: "6:30 AM", title: "Cardio Conditioning", coach: "Trainer" },
    { time: "7:00 PM", title: "Core & Abs", coach: "Trainer" },
  ]},
  { day: "Wednesday", short: "Wed", sessions: [
    { time: "6:30 AM", title: "Strength Basics", coach: "Trainer" },
    { time: "6:30 PM", title: "Zumba", coach: "Trainer" },
    { time: "8:00 PM", title: "Mobility & Stretch", coach: "Trainer" },
  ]},
  { day: "Thursday", short: "Thu", sessions: [
    { time: "7:00 AM", title: "Functional Circuit", coach: "Trainer" },
    { time: "7:00 PM", title: "Group HIIT", coach: "Trainer" },
  ]},
  { day: "Friday", short: "Fri", sessions: [
    { time: "6:30 AM", title: "Strength Basics", coach: "Trainer" },
    { time: "6:30 PM", title: "Zumba", coach: "Trainer" },
  ]},
  { day: "Saturday", short: "Sat", sessions: [
    { time: "8:00 AM", title: "Weekend Conditioning", coach: "Trainer" },
    { time: "6:00 PM", title: "Open Floor Coaching", coach: "Trainer" },
  ]},
  { day: "Sunday", short: "Sun", sessions: [
    { time: "8:00 AM", title: "Mobility & Recovery", coach: "Trainer" },
  ]},
];

export type Offer = { title: string; blurb: string; badge: string; cta: string };

// TODO: replace with live promotions (admin-managed later).
export const offers: Offer[] = [
  { badge: "Limited period", title: "Free Trial Session", blurb: "Walk in, train once with a coach, and decide afterwards. No pressure, no sign-up first.", cta: "Book Free Trial" },
  { badge: "New members", title: "Joining Offer Placeholder", blurb: "Offer details go here — discount, duration and terms are fully editable.", cta: "Talk To Us" },
  { badge: "Refer a friend", title: "Bring Someone With You", blurb: "Reward details placeholder for members who refer a friend to KORR.fit.", cta: "Ask On WhatsApp" },
];

export type Story = {
  name: string;
  program: string;
  duration: string;
  result: string;
  quote: string;
};

// TODO: replace with real member transformations and photos.
export const stories: Story[] = [
  { name: "Member Name", program: "Weight Loss", duration: "6 months", result: "Result placeholder", quote: "Placeholder story about how training at KORR.fit changed their routine, energy and confidence." },
  { name: "Member Name", program: "Muscle Gain", duration: "8 months", result: "Result placeholder", quote: "Placeholder story about how training at KORR.fit changed their routine, energy and confidence." },
  { name: "Member Name", program: "Body Recomposition", duration: "4 months", result: "Result placeholder", quote: "Placeholder story about how training at KORR.fit changed their routine, energy and confidence." },
];

export type ReviewMedia = {
  type: "image" | "video";
  /** Image, or the poster frame when this is a video. */
  src: string;
  /** Playable video file, when available. */
  videoSrc?: string;
  alt: string;
};


export type Review = {
  name: string;
  initials: string;
  when: string;
  text: string;
  helpful: number;
  tags: string[];
  /** Optional highlighted photos/clips attached to the review. */
  media?: ReviewMedia[];
};

export const reviewTags = [
  "All",
  "Trainers",
  "Cleanliness",
  "Equipment",
  "Zumba",
  "Personal Training",
  "Space",
  "Hygiene",
  "Value",
];

// TODO: connect to the Google Reviews API later — the card layout stays the same.
export const reviews: Review[] = [
  { name: "Reviewer Name", initials: "R", when: "2 weeks ago", helpful: 4, tags: ["Trainers", "Personal Training"], media: [{ type: "image", src: strengthImg, alt: "Coached lifting on the strength floor" }, { type: "video", src: functionalImg, alt: "Clip from a functional training session" }], text: "The trainers actually watch your form and correct it. I never felt lost as a beginner, and the plan was adjusted to what I could handle." },
  { name: "Reviewer Name", initials: "A", when: "a month ago", helpful: 7, tags: ["Space", "Equipment"], media: [{ type: "image", src: cardioImg, alt: "The cardio zone at KORR.fit" }], text: "Really spacious floor. Even in the evening rush I never had to wait long for a rack or a machine, which was my problem at my last gym." },
  { name: "Reviewer Name", initials: "S", when: "a month ago", helpful: 3, tags: ["Cleanliness", "Hygiene"], media: [{ type: "image", src: recoveryImg, alt: "Steam room and recovery lounge" }], text: "Easily the cleanest gym I have been to in Mansarovar. Equipment is wiped down, changing rooms are maintained, and the steam room is spotless." },
  { name: "Reviewer Name", initials: "P", when: "2 months ago", helpful: 9, tags: ["Zumba"], media: [{ type: "video", src: studioImg, alt: "Clip from a Zumba class in the studio" }], text: "The Zumba sessions are so much fun. Great music, a proper studio floor, and the instructor keeps everyone included regardless of fitness level." },
  { name: "Reviewer Name", initials: "N", when: "2 months ago", helpful: 5, tags: ["Trainers", "Value"], text: "Genuinely helpful staff. They checked on my progress every few weeks and adjusted my diet suggestions instead of giving one generic chart." },
  { name: "Reviewer Name", initials: "K", when: "3 months ago", helpful: 2, tags: ["Equipment", "Value"], text: "Good range of machines and free weights for the price. Everything is well maintained and nothing has been out of order during my membership." },
  { name: "Reviewer Name", initials: "M", when: "3 months ago", helpful: 6, tags: ["Personal Training"], text: "Started personal training after a long break from fitness. The progression was slow and safe, which is exactly what I needed." },
  { name: "Reviewer Name", initials: "D", when: "4 months ago", helpful: 1, tags: ["Space", "Cleanliness"], text: "Two floors means the cardio area never feels crowded. Air conditioning works well even during peak evening hours." },
  { name: "Reviewer Name", initials: "V", when: "5 months ago", helpful: 8, tags: ["Trainers", "Zumba"], text: "Friendly community. The trainers remember your name and your goals, which makes showing up much easier on low-motivation days." },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  { q: "Do you offer a free trial?", a: "Yes. You can book a free trial session and train with a coach before deciding on a membership. Message us on WhatsApp or call to pick a slot that suits you." },
  { q: "Are beginners welcome?", a: "Absolutely. A large share of our members start with little or no gym experience. Your first sessions are guided step by step, from machine setup to warm-up and form." },
  { q: "Do you provide personal training?", a: "Yes. Personal training is available with a written plan, regular progress reviews and one-to-one attention throughout your session." },
  { q: "Are trainers certified?", a: "Yes, our coaching team is certified and experienced across strength, functional training, weight loss and group fitness." },
  { q: "Is Zumba included?", a: "Zumba runs in our dedicated studio on scheduled days. Inclusion depends on your membership plan — the front desk will confirm what your plan covers." },
  { q: "Are steam sessions available?", a: "Yes. The steam room is available for recovery after your session, and it is cleaned and maintained daily." },
  { q: "Is nutrition guidance available?", a: "Yes. We provide practical nutrition guidance built around everyday Indian meals rather than restrictive crash diets." },
  { q: "What are your gym timings?", a: "We are open early morning through late evening on weekdays and Saturdays, with shorter Sunday hours. Current timings are listed in the Find Us section." },
  { q: "Do you have separate areas for functional training?", a: "Yes. Functional training has its own dedicated area with turf, kettlebells, ropes and boxes, so it never blocks the free-weights floor." },
  { q: "How do I choose the right membership?", a: "Tell us your goal and how many days a week you can train. We will recommend the plan that fits — and we will say so if a shorter plan makes more sense for you." },
];

export const tourRooms = [
  { name: "Reception", blurb: "Where every visit starts — check in, ask questions, meet a coach." },
  { name: "Strength Floor", blurb: "Racks, barbells and a full dumbbell range with space between stations." },
  { name: "Cardio Zone", blurb: "Treadmills, bikes and cross trainers arranged for airflow and comfort." },
  { name: "Functional Area", blurb: "Turf track, kettlebells, ropes and boxes in a dedicated zone." },
  { name: "Steam Room", blurb: "Recovery after training, cleaned and maintained every day." },
  { name: "Stretch Zone", blurb: "Mats, rollers and space to work on mobility without rushing." },
  { name: "Changing Rooms", blurb: "Lockers, showers and clean facilities for before and after." },
];
