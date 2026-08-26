import { Brand, Solution, Location } from "./types";

export const BRANDS_DATA: Brand[] = [
  {
    id: 1,
    name: "Balmain Paris",
    tagline: "The Epitome of Elegance",
    description: "Architectural shapes, bold details, and the legendary craftsmanship of the French fashion house. Combining historic Parisian couture heritage with daring modern contours.",
    image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 2,
    name: "Chopard",
    tagline: "Jewelry of Outstanding Beauty",
    description: "Precious metals, sparkling details, and timeless design. Eyewear crafted like fine jewelry, reflecting the passion, glamour, and precision of Swiss horology masters.",
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 3,
    name: "Maybach",
    tagline: "The Best or Nothing",
    description: "Exquisite materials like fine woods, natural horn, titanium, and 18-karat gold. A supreme expression of prestige and handcrafted German engineering for the discerning individual.",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 4,
    name: "Lindberg",
    tagline: "Redefining Elegance with Minimalism",
    description: "Sleek, screwless, titanium eyewear from Denmark. Renowned for architectural lightness, modular customization, and award-winning Scandinavian design aesthetics.",
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 5,
    name: "Prada",
    tagline: "Symbol of Creativity",
    description: "Avant-garde geometries, rich color palettes, and unconventional style. Redefining trends with Italian sophistication and a luxury intellectual appeal.",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 6,
    name: "Tom Ford",
    tagline: "Vision of Modern Luxury",
    description: "Timeless vintage inspired structures with the iconic metallic 'T' temple detail. Bold, sleek, and glamorous eyewear that commands an effortless, confident presence.",
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=1000"
  }
];

export const SOLUTIONS_DATA: Solution[] = [
  {
    id: 1,
    title: "Sunglasses",
    tagline: "High-Fashion Protection",
    description: "Shield your eyes in style. Explore our curation of the world's most coveted luxury sunglasses designed with premium UV400 lenses and striking silhouettes.",
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 2,
    title: "Optical Frames",
    tagline: "Sartorial Spectacles",
    description: "Elevate your daily look. Handcrafted titanium, custom acetate, and timeless frame shapes curated from premier global design studios.",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 3,
    title: "Optical Lenses",
    tagline: "Tailored Visual Clarity",
    description: "Sculpted precision lenses for high-definition vision. Advanced anti-glare, blue-light blocking, and customized progressive solutions.",
    image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 4,
    title: "Contact Lenses",
    tagline: "Invisible Comfort",
    description: "High-oxygen permeable daily, weekly, and monthly contact lenses from leading global brands. Perfect fit and moisturizing protection.",
    image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 5,
    title: "Hearing Aids",
    tagline: "Acoustic Sophistication",
    description: "State-of-the-art audiology solutions. Micro-sized, rechargeable, and Bluetooth-enabled hearing devices calibrated to your lifestyle.",
    image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 6,
    title: "Kids Eyewear",
    tagline: "Resilient & Playful",
    description: "Lightweight, flexible, and ultra-durable frames built to withstand recess. Vibrant designs children love to wear with certified shatter-proof lenses.",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 7,
    title: "Ready Readers",
    tagline: "Instant Refinement",
    description: "Chic, lightweight reading spectacles designed for immediate clarity. Keep them in your pocket, study, or briefcase for seamless reading.",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 8,
    title: "Eyewear Accessories",
    tagline: "The Finishing Touch",
    description: "Premium leather cases, optical-grade cleaning solutions, elegant eyewear chains, and storage collectors' boxes to preserve your visual investment.",
    image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=1000"
  }
];

export const LOCATIONS_DATA: Location[] = [
  {
    id: 1,
    name: "Avadi",
    city: "Chennai",
    image: "/assets/img/opticalstore1.jpg ",
    address: "No 617, TNHB Mig V Block, Avadi, Chennai, Tamil Nadu 600054",
    phone: "098404 00561",
    hours: "10:00 AM - 10:00 PM (Everyday)"
  },
  {
    id: 2,
    name: "Choolaimedu",
    city: "Chennai",
    image: "/assets/img/opticalshop2.jpg",
    address: "29, Anna Nedum Pathai, Choolaimedu, Chennai, Tamil Nadu 600094",
    phone: "098404 00643",
    hours: "10:00 AM - 10:00 PM (Everyday)"
  },
  {
    id: 3,
    name: "Nungambakkam",
    city: "Chennai",
    image: "/assets/img/opticalshop3.jpg",
    address: "No 146C, Raju Building, Kodambakkam High Rd, Mahalingapuram, Nungambakkam, Chennai, Greater Chennai, Tamil Nadu 600034",
    phone: "098404 00561",
    hours: "10:00 AM - 10:00 PM (Everyday)"
  },
  {
    id: 4,
    name: "Arumbakkam",
    city: "Chennai",
    image: "/assets/img/opticalshop4.jpg",
    address: "No:2/4, D-Block, oppt Arumbakkam Post Office, Annish Nagar, Q Block, MMDA Colony, Arumbakkam, Chennai, Greater Chennai, Tamil Nadu 600106",
    phone: "098404 00561",
    hours: "10:00 AM - 10:00 PM (Everyday)"
  },
  {
    id: 5,
    name: "T. Nagar",
    city: "Chennai",
    image: "/assets/img/opticalstore5.jpg",
    address: "52, S Usman Road, Kannammapet, T.Nagar, Chennai, Greater Chennai, Tamil Nadu 600017",
    phone: "098404 00395",
    hours: "10:00 AM - 10:00 PM (Everyday)"
  }
];

