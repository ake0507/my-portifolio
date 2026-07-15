export const siteConfig = {
  name: "Aklilu Desalegn",
  title: "Full-Stack Developer, Graphic Designer, Virtual Assistant",
  tagline: "Building modern web experiences with creative design and reliable support",
  experience: "2+ years of experience",
  email: "akliludesalegn3@gmail.com",
  linkedin:
    "https://www.linkedin.com/in/aklilu-desalegn-29557b365?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  github: "https://github.com/ake0507",
  twitter: "https://twitter.com/akliludesalegn",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export const skills = [
  { name: "JavaScript", category: "Development" },
  { name: "TypeScript", category: "Development" },
  { name: "React", category: "Development" },
  { name: "Next.js", category: "Development" },
  { name: "Node.js", category: "Development" },
  { name: "Python", category: "Development" },
  { name: "PostgreSQL", category: "Development" },
  { name: "Figma", category: "Design" },
  { name: "Adobe Illustrator", category: "Design" },
  { name: "Adobe Photoshop", category: "Design" },
  { name: "Canva", category: "Design" },
  { name: "Google Workspace", category: "VA" },
];

export const services = [
  {
    id: "development",
    title: "Full-Stack Development",
    icon: "code",
    description:
      "Custom web and mobile apps, RESTful APIs, and responsive front-ends built for scale and optimized UX.",
    items: [
      "Web App Development",
      "Front-end Design",
      "Back-end APIs",
      "Database Design",
    ],
  },
  {
    id: "design",
    title: "Graphic Design",
    icon: "palette",
    description:
      "Visual assets that strengthen your brand across digital and print channels.",
    items: [
      "Logo & Branding",
      "Social Media Posts",
      "Instagram Posts",
      "YouTube Thumbnails",
      "Flyers & Business Cards",
      "Banners",
    ],
  },
  {
    id: "va",
    title: "Virtual Assistant",
    icon: "calendar",
    description:
      "Administrative support that keeps your business organized and your schedule on track.",
    items: [
      "Email Management",
      "Scheduling",
      "Calendar Management",
      "Data Entry",
    ],
  },
];

export const problems = [
  {
    title: "Outdated Website",
    problem:
      "Legacy site with slow load times and poor SEO — visitors leave immediately.",
    solution:
      "Redesigned with a modern stack (optimized React front-end and Node.js backend), improving performance and search ranking.",
  },
  {
    title: "Inconsistent Branding",
    problem: "Inconsistent branding across marketing materials.",
    solution:
      "Created a cohesive logo, color palette, and templates for social posts and print, yielding a unified brand image.",
  },
  {
    title: "Overwhelmed Entrepreneur",
    problem: "Entrepreneur overwhelmed by email and scheduling tasks.",
    solution:
      "Provided VA services to organize the inbox, schedule meetings, and manage calendar, saving hours per week.",
  },
  {
    title: "Low Social Engagement",
    problem: "Low social media engagement due to amateur graphics.",
    solution:
      "Designed eye-catching Instagram and YouTube graphics using brand assets, boosting audience interaction.",
  },
];

export const caseStudies = [
  {
    title: "Project Alpha: Revamping Logo & Site",
    problem: "Outdated brand identity and slow website hurting conversions.",
    solution:
      "Delivered a new logo system, brand guidelines, and a performant Next.js site with CMS integration.",
    impact: "Site load time cut in half; brand recall increased across channels.",
    beforeLabel: "Before: outdated logo and cluttered layout",
    beforeImage: "/images/before-logo.png",
    afterLabel: "After: modern brand identity and clean responsive site",
    afterImage: "/images/after1-logo.png",
  },
  {
    title: "Project Beta: E-Commerce Platform",
    problem: "Manual order processing and no online storefront.",
    solution:
      "Built a full-stack e-commerce app with payment integration, inventory management, and admin dashboard.",
    impact: "Online sales doubled within three months of launch.",
    beforeLabel: "Before: spreadsheet-based order tracking",
    beforeImage: "/images/before-ecommerce.png",
    afterLabel: "After: automated e-commerce platform",
    afterImage: "/images/after-ecommerce.png",
  },
  {
    title: "Project Gamma: VA Operations",
    problem: "Founder spending 15+ hours weekly on admin tasks.",
    solution:
      "Set up email workflows, calendar automation, and data entry systems to streamline daily operations.",
    impact: "Saved 12+ hours per week; improved response times by 60%.",
    beforeLabel: "Before: disorganized inbox and missed meetings",
    beforeImage: "/images/project-gamma-before.png",
    afterLabel: "After: structured workflows and proactive scheduling",
    afterImage: "/images/project-gamma-after.png",
  },
];

export const pricingPackages = [
  {
    name: "Basic",
    price: "$250",
    description: "Ideal for startups and small projects getting started online.",
    features: {
      development: "1–2 page website",
      design: "Logo + 2 social posts",
      va: "10 hrs/month support",
    },
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$500",
    description: "Best for growing businesses that need a complete digital presence.",
    features: {
      development: "Multi-page site + CMS",
      design: "Branding set + 5 social posts",
      va: "20 hrs/month support",
    },
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom quote",
    description: "Tailored solutions for complex projects and ongoing partnerships.",
    features: {
      development: "Custom web app (API, DB)",
      design: "Full brand kit + 10 assets",
      va: "40 hrs/month support",
    },
    highlighted: false,
  },
];

export const testimonials = [
  {
    quote:
      "Aklilu turned our vision into reality. The new website loads fast, looks professional, and our leads have increased significantly.",
    name: "Jane Doe",
    role: "CEO",
    company: "TechStart Inc.",
    result: "Leads increased 40% after redesign",
  },
  {
    quote:
      "The branding package gave us a cohesive identity we use everywhere — from social media to business cards. Highly recommend.",
    name: "Michael Chen",
    role: "Founder",
    company: "Bloom Studio",
    result: "Unified brand across 8 marketing channels",
  },
  {
    quote:
      "His VA support freed up my time to focus on growth. Email management and scheduling are now completely handled.",
    name: "Sarah Williams",
    role: "Entrepreneur",
    company: "Williams Consulting",
    result: "Saved 12+ hours per week",
  },
];

export const projectFlow = [
  {
    phase: "Discovery & Planning",
    description: "Requirements gathering, goals, and project scope",
  },
  {
    phase: "Design",
    description: "Wireframes, mockups, and design approval",
  },
  {
    phase: "Development",
    description: "Front-end and back-end coding",
  },
  {
    phase: "Testing & QA",
    description: "Bug fixes, optimization, and quality assurance",
  },
  {
    phase: "Launch",
    description: "Deployment, training, and handoff",
  },
];
