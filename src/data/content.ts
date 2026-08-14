import t1 from "@/assets/team/t1.jpg.asset.json";
import t2 from "@/assets/team/t2.jpg.asset.json";
import t3 from "@/assets/team/t3.jpg.asset.json";
import t4 from "@/assets/team/t4.jpg.asset.json";
import t5 from "@/assets/team/t5.jpg.asset.json";
import t6 from "@/assets/team/t6.jpg.asset.json";

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


export type Trainer = { name: string; photo: string };

export const trainers: Trainer[] = [
  { name: "Vijendra Saharan", photo: t1.url },
  { name: "Adarsh Kant", photo: t2.url },
  { name: "Vikas Chopra", photo: t3.url },
  { name: "Lekhraj Meena", photo: t4.url },
  { name: "Wasim Khan", photo: t5.url },
  { name: "Kapil Jatav", photo: t6.url },
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
};

export const reviewTags = [
  "All",
  "Trainers",
  "Zumba",
  "Spacious",
  "Clean Space",
  "Hygiene",
  "Helpful Staff",
  "Proper Guidance",
  "Quality Equipment",
  "Well Maintained",
];

/** Real Google reviews for KORR.fit Mansarovar, grouped by topic. */
export const reviews: Review[] = [
  {
    name: "Pawan Saini",
    initials: "P",
    when: "4 months ago",
    helpful: 1,
    tags: ["Trainers", "Hygiene", "Quality Equipment", "Well Maintained"],
    text: "I've been training at this gym for a while now, and overall it's been a really solid experience. The equipment is well maintained and covers everything from basic strength training to more advanced workouts. The trainers are knowledgeable and approachable — always ready to guide you, correct your form and give helpful tips without being overbearing. Cleanliness is another strong point: the gym is kept tidy and machines are regularly cleaned. Definitely recommended for anyone serious about fitness.",
  },
  {
    name: "Yash Garg",
    initials: "Y",
    when: "3 months ago",
    helpful: 1,
    tags: ["Trainers", "Spacious", "Hygiene", "Quality Equipment"],
    text: "Excellent gym with outstanding training support. The facility is well maintained, spacious and equipped with all the machines and free weights needed for both beginners and advanced workouts. The environment is motivating, clean and never feels overcrowded. A special mention goes to head trainer Adarsh, who truly stands out — his knowledge, professionalism and dedication make a huge difference.",
  },
  {
    name: "Ashutosh",
    initials: "A",
    when: "3 months ago",
    helpful: 1,
    tags: ["Zumba", "Proper Guidance", "Helpful Staff", "Well Maintained"],
    text: "I've been working out at this gym for some time now and my experience has been really great. The coaches are very friendly and always ready to help — they guide properly during exercises and make sure you perform them the right way, which is very helpful especially for beginners. The gym has two floors: the ground floor is mainly for heavy weight training, while the upper floor is dedicated to strength training, Zumba sessions and cardio. Highly recommended.",
  },
  {
    name: "Sparsh Singhal",
    initials: "S",
    when: "2 months ago",
    helpful: 2,
    tags: ["Zumba", "Proper Guidance", "Spacious", "Clean Space"],
    text: "Excellent gym with top-notch maintenance and plenty of workout space. The environment is clean, filled with positive energy and highly motivating. There is separate space for cardio and weight training, and regular Zumba classes are held here. Special thanks to Coach Wasim for all his help — he doesn't just watch, he actively corrects form, offers great advice and keeps everyone motivated.",
  },
  {
    name: "AK 51",
    initials: "A",
    when: "3 years ago",
    helpful: 3,
    tags: ["Quality Equipment", "Hygiene", "Spacious", "Trainers"],
    text: "It was a very nice place to work out. Very much space so it never looks crowded. All equipment is in good condition and the cleanliness and hygiene are also on top. Trainers are available to guide you and keep an eye on your workout for any correction. One more thing — you don't need to wait for your turn, there is sufficient equipment.",
  },
  {
    name: "Jigya Khatri",
    initials: "J",
    when: "10 months ago",
    helpful: 4,
    tags: ["Clean Space", "Quality Equipment", "Trainers"],
    text: "Great gym with good vibes! Clean space, quality equipment and supportive trainers. Perfect for daily workouts.",
  },
  {
    name: "Minu Yadav",
    initials: "M",
    when: "8 months ago",
    helpful: 2,
    tags: ["Trainers", "Spacious", "Well Maintained", "Helpful Staff"],
    text: "I have been going to this gym for more than a month now, and it is definitely one of the best gyms I have come across in Jaipur. I've trained at various other facilities before, and this one stands out. The trainers are really helpful, approachable and always open to answering questions. The facility overall is clean, well maintained and fully equipped with everything you need.",
  },
  {
    name: "Khushi Rawat",
    initials: "K",
    when: "2 months ago",
    helpful: 1,
    tags: ["Trainers", "Hygiene"],
    text: "Best gym in Mansarovar, trainers are too good, best environment, very hygienic place to gain your dream physique.",
  },
  {
    name: "Sachin Upadhyay",
    initials: "S",
    when: "10 months ago",
    helpful: 3,
    tags: ["Trainers", "Spacious", "Clean Space"],
    text: "I absolutely love working out at KORR.fit! The trainers are supportive and the overall vibe is so welcoming. It doesn't matter if you're a beginner or advanced — everyone here helps and motivates each other. The gym is always clean, spacious and has everything you need for a complete workout. Honestly, it feels like a fitness family here.",
  },
  {
    name: "Sunil Singh",
    initials: "S",
    when: "10 months ago",
    helpful: 2,
    tags: ["Trainers", "Helpful Staff"],
    text: "I'm absolutely loving my fitness journey at this gym in Mansarovar! The ambience is top-notch and the trainers are more like family — super supportive and motivating. Adarsh sir, Veer sir and Vijendra sir are my personal favourites; their guidance and energy are infectious. Highly recommended.",
  },
  {
    name: "Anjana Sharma",
    initials: "A",
    when: "3 years ago",
    helpful: 4,
    tags: ["Trainers", "Hygiene", "Quality Equipment"],
    text: "If you want to work out in peace, then this is the place for you. The trainers are very supportive and helpful. They have all kinds of machines and they keep the place neat. It was my best decision to join this gym.",
  },
  {
    name: "Mahesh Kothariya",
    initials: "M",
    when: "a year ago",
    helpful: 2,
    tags: ["Trainers", "Well Maintained", "Clean Space"],
    text: "Great gym with excellent trainers! I've been training at KORR.fit and it's been a really good experience so far. The equipment is well maintained, the environment is clean and the overall vibe is very motivating.",
  },
  {
    name: "Ravi Saharan",
    initials: "R",
    when: "3 years ago",
    helpful: 3,
    tags: ["Trainers", "Proper Guidance"],
    text: "If you're looking for personalised fitness training that delivers results, I highly recommend Mr. Vijender. Whether you're a beginner or looking to push your limits, he tailors each workout to suit your specific goals. What sets him apart is his dedication to form and technique, making sure you're not just lifting weights but doing so in a way that minimises injury risk and maximises results.",
  },
  {
    name: "Rajveer Singh Rajpurohit",
    initials: "R",
    when: "10 months ago",
    helpful: 2,
    tags: ["Quality Equipment", "Trainers", "Well Maintained"],
    text: "The one and only gym jaha jaake lagta h ki haan body ban sakti h. Best quality equipment, nice management and trainers. Best gym in Jaipur.",
  },
  {
    name: "Virat Agarwal",
    initials: "V",
    when: "3 years ago",
    helpful: 2,
    tags: ["Trainers", "Proper Guidance"],
    text: "Greatly improved gym in Mansarovar under new management, good facilities overall. Aadarsh sir is an amazing personal trainer — contact him for all your body goals and transformation.",
  },
  {
    name: "Yogesh Joshi",
    initials: "Y",
    when: "10 months ago",
    helpful: 1,
    tags: ["Trainers", "Quality Equipment"],
    text: "The gym equipment is highly advanced, the trainers are helpful and the environment is energetic.",
  },
  {
    name: "Ravina Chahar",
    initials: "R",
    when: "10 months ago",
    helpful: 1,
    tags: ["Trainers"],
    text: "Great gym with amazing vibes and supportive trainers.",
  },
  {
    name: "Amit Thakar",
    initials: "A",
    when: "10 months ago",
    helpful: 1,
    tags: ["Trainers"],
    text: "Trainers are super helpful and guide well. Love working out here.",
  },
  {
    name: "Hotel Surya Palace",
    initials: "H",
    when: "10 months ago",
    helpful: 2,
    tags: ["Trainers", "Hygiene", "Clean Space"],
    text: "Best gym in Mansarovar. Knowledgeable trainers. Clean and hygienic gym.",
  },
  {
    name: "Prekshit Dave",
    initials: "P",
    when: "10 months ago",
    helpful: 1,
    tags: ["Trainers"],
    text: "Great gym and a very supportive trainer.",
  },
  {
    name: "Khushi Mathur",
    initials: "K",
    when: "3 years ago",
    helpful: 2,
    tags: ["Trainers", "Well Maintained"],
    text: "Good crowd, helpful trainers — especially Adarsh and Veer sir. Well managed place.",
  },
  {
    name: "Anshumaan",
    initials: "A",
    when: "3 years ago",
    helpful: 1,
    tags: ["Trainers", "Clean Space"],
    text: "Great music, good trainers, and an awesome steam room.",
  },
  {
    name: "Shersingh Gurjar",
    initials: "S",
    when: "3 years ago",
    helpful: 1,
    tags: ["Trainers", "Helpful Staff"],
    text: "Good crowd, helpful trainers, and a well managed place.",
  },
  {
    name: "Anant Sethi",
    initials: "A",
    when: "3 years ago",
    helpful: 1,
    tags: ["Well Maintained", "Trainers"],
    text: "Superb and well maintained, and good trainers.",
  },
  {
    name: "Mahipal Solanki",
    initials: "M",
    when: "10 months ago",
    helpful: 1,
    tags: ["Trainers"],
    text: "Good trainers and environment.",
  },
  {
    name: "Aayush Sau",
    initials: "A",
    when: "10 months ago",
    helpful: 1,
    tags: ["Trainers"],
    text: "Very good trainers.",
  },
  {
    name: "Deepu Banna",
    initials: "D",
    when: "3 years ago",
    helpful: 2,
    tags: ["Trainers", "Proper Guidance"],
    text: "Trainers here actually care about your goals.",
  },
  {
    name: "Ishq Adhura",
    initials: "I",
    when: "10 months ago",
    helpful: 1,
    tags: ["Helpful Staff", "Quality Equipment"],
    text: "Best gym in Jaipur, all advanced equipment and helping-nature staff.",
  },
  {
    name: "Rajendra Bandhkar",
    initials: "R",
    when: "2 years ago",
    helpful: 2,
    tags: ["Helpful Staff"],
    text: "Best gym vibes in town. Staff bhi kaafi supportive hai.",
  },
  {
    name: "Lakhan Sonwal",
    initials: "L",
    when: "3 years ago",
    helpful: 2,
    tags: ["Helpful Staff", "Clean Space"],
    text: "Friendly staff and a very positive atmosphere.",
  },
  {
    name: "Sunil Kumar",
    initials: "S",
    when: "3 months ago",
    helpful: 1,
    tags: ["Hygiene", "Trainers"],
    text: "Gym is very nice and hygienic. Trainers are very humble and knowledgeable.",
  },
  {
    name: "Ajay Sihag",
    initials: "A",
    when: "3 years ago",
    helpful: 7,
    tags: ["Hygiene", "Quality Equipment"],
    text: "Best gym in Mansarovar — modern equipment and very hygienic.",
  },
  {
    name: "Surya Pratap Singh",
    initials: "S",
    when: "3 years ago",
    helpful: 2,
    tags: ["Hygiene", "Well Maintained", "Quality Equipment"],
    text: "Fully equipped gym. Plans are quite practically priced. 10/10 for management and hygiene. Take my word and give it a try.",
  },
  {
    name: "Rashi Ramawat",
    initials: "R",
    when: "10 months ago",
    helpful: 1,
    tags: ["Well Maintained", "Quality Equipment"],
    text: "The place is good, well maintained with good machines.",
  },
  {
    name: "Google user",
    initials: "G",
    when: "3 years ago",
    helpful: 2,
    tags: ["Clean Space", "Trainers"],
    text: "KORR.fit is the best gym I've joined so far — great energy and clean space. Trainers are super helpful and guide well. Love working out here!",
  },
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
