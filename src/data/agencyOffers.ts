/**
 * Prebuilt systems the agency can sell to non-tech-savvy local businesses
 * (travel agencies, beauty/aesthetic clinics, plumbers, electricians, dentists,
 * gyms, salons, maintenance, real estate, clinics, restaurants...).
 *
 * Pricing is in RM and reflects realistic 2025–2026 SMB deal sizes for a lean
 * two-person agency. `deployFee` is one-off; `retainer` is monthly recurring.
 * `demand` (1–5) = how badly the average non-tech SMB needs it.
 * `margin` (1–5) = profitability once the build is templatized and reused.
 * `effort` (1–5) = build + delivery effort per client (lower is easier).
 */

export interface AgencyOffer {
  id: string
  name: string
  tagline: string
  icon: string
  /** What it actually does for the business, in plain terms. */
  what: string
  /** The pain it removes / money it makes or saves. */
  outcome: string
  /** Best-fit business types. */
  bestFor: string[]
  deployFee: [number, number]
  retainer: [number, number]
  setupTime: string
  /** Headline impact stat to show on a tile. */
  impact: string
  buildStack: string[]
  demand: number
  margin: number
  effort: number
  /** Flagship / lead offer to open the conversation with. */
  flagship?: boolean
}

export const agencyOffers: AgencyOffer[] = [
  {
    id: 'ai-receptionist',
    name: 'AI Voice Receptionist',
    tagline: 'Never miss another call',
    icon: 'phone-call',
    what: 'A 24/7 AI phone agent that answers calls in a natural voice, answers FAQs, quotes prices, and books jobs straight into the calendar — including after hours and when staff are busy on a job.',
    outcome: 'Missed calls are lost revenue. For trades and clinics, 25–40% of calls go unanswered; recovering even half of those pays the retainer many times over.',
    bestFor: ['Plumbers', 'Electricians', 'Maintenance', 'Dental / clinics', 'Salons'],
    deployFee: [1500, 5000],
    retainer: [400, 1200],
    setupTime: '3–5 days',
    impact: 'Recovers 25–40% of missed calls',
    buildStack: ['Vapi', 'Retell AI', 'Twilio', 'n8n'],
    demand: 5,
    margin: 4,
    effort: 3,
    flagship: true,
  },
  {
    id: 'appointment-booker',
    name: 'AI Appointment Booker',
    tagline: 'Self-serve booking, zero back-and-forth',
    icon: 'calendar-check',
    what: 'A chat + web booking agent that qualifies the customer, shows real availability, books, takes a deposit, and sends automatic reminders to cut no-shows.',
    outcome: 'Eliminates phone-tag scheduling and slashes no-shows with automated SMS/WhatsApp reminders — directly protects revenue for appointment-based businesses.',
    bestFor: ['Beauty & aesthetic clinics', 'Barbers / salons', 'Dentists', 'Travel agencies', 'Gyms'],
    deployFee: [1200, 4000],
    retainer: [300, 900],
    setupTime: '2–4 days',
    impact: 'Cuts no-shows ~30% with reminders',
    buildStack: ['Cal.com', 'GoHighLevel', 'n8n', 'Stripe'],
    demand: 5,
    margin: 5,
    effort: 2,
    flagship: true,
  },
  {
    id: 'whatsapp-marketing',
    name: 'WhatsApp & SMS Marketing Agent',
    tagline: 'Turn the contact list into repeat sales',
    icon: 'message-circle',
    what: 'Connects to the business\'s existing customer list and runs automated WhatsApp/SMS campaigns: promotions, seasonal offers, birthday deals, and drip sequences — with AI replies handling the responses.',
    outcome: 'Most local businesses sit on hundreds of past customers they never message. Broadcasting offers to an owned list is the cheapest revenue on earth.',
    bestFor: ['Beauty clinics', 'Restaurants', 'Travel agencies', 'Gyms', 'Retail'],
    deployFee: [1000, 3500],
    retainer: [400, 1500],
    setupTime: '3–6 days',
    impact: 'Owned-list campaigns at near-zero CPM',
    buildStack: ['WhatsApp Business API', 'respond.io', 'n8n', 'Twilio'],
    demand: 5,
    margin: 5,
    effort: 3,
    flagship: true,
  },
  {
    id: 'database-reactivation',
    name: 'Database Reactivation Campaign',
    tagline: 'Wake up dormant customers',
    icon: 'refresh-cw',
    what: 'A one-shot-then-recurring AI campaign that messages every old lead and past customer with a tailored win-back offer, then books the responders automatically.',
    outcome: 'The fastest way to prove ROI on day one — reactivating an existing database routinely books appointments within 48 hours, making it the perfect foot-in-the-door offer.',
    bestFor: ['Any business with a customer list', 'Clinics', 'Gyms', 'Auto services'],
    deployFee: [800, 2500],
    retainer: [0, 600],
    setupTime: '1–3 days',
    impact: 'Books appointments within 48 hrs',
    buildStack: ['GoHighLevel', 'n8n', 'WhatsApp API'],
    demand: 4,
    margin: 5,
    effort: 2,
    flagship: true,
  },
  {
    id: 'website-aeo',
    name: 'Website + AEO/SEO System',
    tagline: 'Get found on Google and AI search',
    icon: 'globe',
    what: 'A fast, modern, mobile-first site built in days, with local SEO and answer-engine optimization so the business shows up in Google Maps, Google search, and AI assistants like ChatGPT.',
    outcome: 'Many local businesses have no site or a broken one. A conversion-focused site + local SEO is the classic entry deploy that everything else attaches to.',
    bestFor: ['Any business with no / weak site', 'Trades', 'Clinics', 'Travel agencies'],
    deployFee: [1500, 6000],
    retainer: [200, 800],
    setupTime: '4–7 days',
    impact: 'Ships in a week vs weeks with legacy agencies',
    buildStack: ['Claude Code', 'Next.js', 'Vercel', 'Google Business Profile'],
    demand: 4,
    margin: 4,
    effort: 3,
  },
  {
    id: 'review-engine',
    name: 'Review & Reputation Engine',
    tagline: 'More 5-star reviews on autopilot',
    icon: 'star',
    what: 'Automatically requests reviews from happy customers after each job/visit, routes unhappy ones to private feedback first, and posts AI-drafted replies to every Google review.',
    outcome: 'Star rating and review count are the #1 driver of local click-through. Automating the ask lifts review volume dramatically with near-zero owner effort.',
    bestFor: ['Restaurants', 'Clinics', 'Trades', 'Salons', 'Any Google Maps business'],
    deployFee: [800, 2500],
    retainer: [200, 600],
    setupTime: '2–3 days',
    impact: 'Multiplies monthly review volume',
    buildStack: ['GoHighLevel', 'n8n', 'Google Business API'],
    demand: 4,
    margin: 5,
    effort: 2,
  },
  {
    id: 'lead-capture-chat',
    name: 'Website Lead-Capture Chatbot',
    tagline: 'Convert visitors into booked jobs',
    icon: 'bot',
    what: 'An on-site AI chat widget that answers questions instantly, captures name/number, qualifies the enquiry, and hands hot leads to WhatsApp or the booking system 24/7.',
    outcome: 'Visitors who get an instant answer are far likelier to convert than those left waiting for a callback. Captures leads that would otherwise bounce.',
    bestFor: ['Travel agencies', 'Real estate', 'Clinics', 'Service businesses'],
    deployFee: [900, 3000],
    retainer: [250, 700],
    setupTime: '2–4 days',
    impact: 'Instant replies lift conversion',
    buildStack: ['Claude API', 'Botpress', 'n8n'],
    demand: 4,
    margin: 4,
    effort: 2,
  },
  {
    id: 'email-nurture',
    name: 'Automated Email Marketing',
    tagline: 'Set-and-forget nurture & offers',
    icon: 'mail',
    what: 'Branded email flows: welcome series, post-visit follow-ups, monthly newsletters and promo blasts to the customer list — all AI-drafted and scheduled.',
    outcome: 'Complements WhatsApp for higher-ticket and B2B-leaning businesses; keeps the brand top-of-mind and recycles customers cheaply.',
    bestFor: ['Travel agencies', 'Real estate', 'B2B services', 'Clinics'],
    deployFee: [700, 2500],
    retainer: [250, 800],
    setupTime: '2–4 days',
    impact: 'Recurring revenue from existing list',
    buildStack: ['Kit / ConvertKit', 'n8n', 'Claude API'],
    demand: 3,
    margin: 4,
    effort: 2,
  },
  {
    id: 'social-content',
    name: 'AI Social Content Engine',
    tagline: 'Always-on posts & UGC ads',
    icon: 'clapperboard',
    what: 'A monthly pipeline of branded social posts and AI-UGC video ads, scheduled across the business\'s channels — reusing the AI UGC scheme internally.',
    outcome: 'Local businesses want a steady social presence but have no time. Productizes your UGC capability into a recurring retainer add-on.',
    bestFor: ['Beauty clinics', 'Restaurants', 'Gyms', 'Travel agencies'],
    deployFee: [600, 2000],
    retainer: [500, 1800],
    setupTime: '3–5 days',
    impact: 'Consistent presence, hands-off',
    buildStack: ['Arcads', 'HeyGen', 'CapCut', 'Buffer'],
    demand: 3,
    margin: 4,
    effort: 3,
  },
]

/** Bundle presets — how to package the systems into a single anchored proposal. */
export interface OfferBundle {
  name: string
  positioning: string
  includes: string[]
  deployFee: [number, number]
  retainer: [number, number]
}

export const offerBundles: OfferBundle[] = [
  {
    name: 'Foot-in-the-Door',
    positioning: 'Low-risk first yes. Prove ROI fast, then expand.',
    includes: ['database-reactivation', 'review-engine'],
    deployFee: [1200, 3500],
    retainer: [200, 900],
  },
  {
    name: 'Never Miss a Customer',
    positioning: 'Capture and convert every inbound — the core system.',
    includes: ['ai-receptionist', 'appointment-booker', 'lead-capture-chat'],
    deployFee: [3000, 9000],
    retainer: [900, 2500],
  },
  {
    name: 'Full Growth Engine',
    positioning: 'Complete acquisition + retention stack on a retainer.',
    includes: ['website-aeo', 'ai-receptionist', 'appointment-booker', 'whatsapp-marketing', 'review-engine', 'social-content'],
    deployFee: [6000, 18000],
    retainer: [1800, 5000],
  },
]
