import React, { useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ChevronDown,
  CheckCircle2,
  X,
  Sparkles,
  Glasses
} from "lucide-react";
import confetti from "canvas-confetti";

interface TrialClassPortalProps {
  onBackToMain?: () => void;
}

const AGE_GROUPS = ["6–12", "13–21", "22–30", "31–40", "40+"];

const COUNTRY_CODES = [
  { code: "+91", country: "India" },
  { code: "+1", country: "USA / Canada" },
  { code: "+44", country: "UK" },
  { code: "+971", country: "UAE" },
  { code: "+65", country: "Singapore" },
  { code: "+61", country: "Australia" },
  { code: "+49", country: "Germany" },
  { code: "+966", country: "Saudi Arabia" },
];

const CATEGORIES = [
  {
    id: "titanium",
    name: "Titanium & Aero Specs",
    category: "AERO TITANIUM",
    patron: "Japanese Beta-Titanium 3.8g",
    youtubeId: "vB6VbUjD-O0",
    image: "/assets/img/aero-titanium.jpg",
    maestro: "Aero-Craft Precision"
  },
  {
    id: "blue-cut",
    name: "Blue-Cut Digital Specs",
    category: "DIGITAL PROTECTION",
    patron: "Zero-Glare 420nm Blue Block",
    youtubeId: "77nO53wF3fE",
    image: "/assets/img/bluelens.jpg",
    maestro: "BlueCut Optical Shield"
  },
  {
    id: "acetate",
    name: "Handcrafted Acetate Specs",
    category: "CLASSIC ACETATE",
    patron: "Mazzucchelli 1849 Italian Luster",
    youtubeId: "Jk8UfZy5qP8",
    image: "/assets/img/Tortoise.jpg",
    maestro: "Artisanal Frame Maker"
  },
  {
    id: "progressives",
    name: "Progressive & Multifocal",
    category: "HIGH-DEF MULTIFOCAL",
    patron: "Corridor Free-Form Digital Lenses",
    youtubeId: "zX-z2rV4zU8",
    image: "/assets/img/anti-reflections.jpg",
    maestro: "Clinical Optometry Lab"
  },
  {
    id: "designer",
    name: "Luxury Designer Specs",
    category: "ICONIC BRANDS",
    patron: "Ray-Ban, Oakley, Carrera & Vogue",
    youtubeId: "9o9B0R9M4q4",
    image: "/assets/img/Ray-Ban.jpg",
    maestro: "Haute Eyewear Atelier"
  },
  {
    id: "rimless",
    name: "Rimless & Minimalist Specs",
    category: "MINIMALIST SILHOUETTE",
    patron: "Pure Featherweight Ergonomics",
    youtubeId: "K1Jp8u3B4uE",
    image: "/assets/img/stepper.jpg",
    maestro: "Silhouette Master Optic"
  },
  {
    id: "sunglasses",
    name: "Polarized Power Sunglasses",
    category: "POLARIZED SUNWEAR",
    patron: "100% UV400 Clarity & Glare Stop",
    youtubeId: "3e_K2PjV82A",
    image: "/assets/img/Oakley.jpg",
    maestro: "Outdoor Optics Studio"
  },
  {
    id: "kids",
    name: "Flexible Kids & Active Specs",
    category: "ACTIVE & KIDS",
    patron: "Unbreakable TR90 Memory Material",
    youtubeId: "vB6VbUjD-O0",
    image: "/assets/img/seventh street.jpg",
    maestro: "Pediatric Vision Care"
  },
  {
    id: "home-eyecare",
    name: "Home Eyecare & 100+ Specs Trial",
    category: "DOORSTEP TRIAL",
    patron: "Certified Optometrist at Doorstep",
    youtubeId: "77nO53wF3fE",
    image: "/assets/img/opticalstore1.jpg",
    maestro: "Mobile Refraction Suite"
  }
];

const STATS = [
  { value: "2,500+", label: "Designer Spectacles & Sunglasses" },
  { value: "15+", label: "Years of Optical Excellence" },
  { value: "100+", label: "Frames Brought for Home Trial" },
  { value: "19,870+", label: "Happy Customers Served Across India" }
];

const SHOWCASE_SLIDES = [
  {
    left: {
      src: "/assets/img/Ray-Ban.jpg",
      alt: "Premium Designer Spectacles",
      fallback: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=500&q=80"
    },
    center: {
      src: "/assets/img/bluelens.jpg",
      alt: "Blue Cut Anti-Glare Precision Lens",
      fallback: "/assets/img/lens.jpg"
    },
    right: {
      src: "/assets/img/Oakley.jpg",
      alt: "Aero Titanium Optical Specs",
      fallback: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=500&q=80"
    }
  },
  {
    left: {
      src: "/assets/img/Stealth.jpg",
      alt: "Stealth Aviator Luxury Specs",
      fallback: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=500&q=80"
    },
    center: {
      src: "/assets/img/aero-titanium.jpg",
      alt: "Ultralight Aero-Titanium Frame",
      fallback: "/assets/img/lens1.jpg"
    },
    right: {
      src: "/assets/img/carrera.jpg",
      alt: "Carrera Sartorial Eyewear",
      fallback: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=500&q=80"
    }
  },
  {
    left: {
      src: "/assets/img/Tortoise.jpg",
      alt: "Vintage Tortoise Classic Eyewear",
      fallback: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=500&q=80"
    },
    center: {
      src: "/assets/img/anti-reflections.jpg",
      alt: "Anti-Reflection High Index Lens",
      fallback: "/assets/img/lens3.jpg"
    },
    right: {
      src: "/assets/img/vogue.jpeg",
      alt: "Vogue Contemporary Eyewear",
      fallback: "https://images.unsplash.com/photo-1509695503492-413bc5d0fee6?auto=format&fit=crop&w=500&q=80"
    }
  },
  {
    left: {
      src: "/assets/img/Emporio armani.jpg",
      alt: "Emporio Armani Designer Frames",
      fallback: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=500&q=80"
    },
    center: {
      src: "/assets/img/chrono.jpg",
      alt: "Chrono Precision Optometry Focus",
      fallback: "/assets/img/lens4.jpg"
    },
    right: {
      src: "/assets/img/tommy hilfiger.jpeg",
      alt: "Tommy Hilfiger Classic Acetate",
      fallback: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=500&q=80"
    }
  },
  {
    left: {
      src: "/assets/img/Rayban meta.png",
      alt: "Ray-Ban Meta Smart Glasses",
      fallback: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=500&q=80"
    },
    center: {
      src: "/assets/img/hyper.jpg",
      alt: "Hyper HD Digital Progressive Lens",
      fallback: "/assets/img/lens2.jpg"
    },
    right: {
      src: "/assets/img/oakley meta.jpeg",
      alt: "Oakley Performance Meta Eyewear",
      fallback: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=500&q=80"
    }
  }
];

interface TestimonialItem {
  id: number | string;
  type: "image" | "video";
  name: string;
  image: string;
  text?: string;
  location?: string;
  videoId?: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    type: "image",
    name: "Vikram Malhotra",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    text: "Booking Home Eyecare was effortless. The optometrist brought over 100 frames directly to my home. I found the perfect Japanese titanium spectacles and the blue-cut lenses eliminated my computer screen fatigue."
  },
  {
    id: 2,
    type: "video",
    name: "Pooja Hegde",
    location: "Mumbai",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80",
    videoId: "3e_K2PjV82A"
  },
  {
    id: 3,
    type: "image",
    name: "Dr. Ananya Rao",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    text: "As an ophthalmologist, optical precision is non-negotiable. The Spectacle Zone's progressive digital lenses are calibrated with zero distortion. Seamless reading and driving vision."
  },
  {
    id: 4,
    type: "video",
    name: "Arjun Verma",
    location: "Bengaluru",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
    videoId: "9o9B0R9M4q4"
  },
  {
    id: 5,
    type: "image",
    name: "Sunita Deshpande",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
    text: "I needed new progressive glasses for my elderly father who cannot travel. The home eye exam was thorough, gentle, and punctual. The frames fit him comfortably without slipping down."
  },
  {
    id: 6,
    type: "image",
    name: "Karan Singhal",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    text: "The acetate finish and temple balance on their handcrafted frames rival European luxury boutiques. Quick 48-hour delivery with spot-on prescription accuracy."
  }
];

const EXTENDED_TESTIMONIALS = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

const FAQS = [
  {
    q: "How does the Home Eyecare & Spectacles Trial work?",
    a: "Our certified optometrist arrives at your doorstep at your chosen time with portable clinical eye-testing equipment and a curated collection of 100+ premium spectacle frames. You get a thorough 14-step digital eye test and can try on frames in your home lighting with zero purchase obligation."
  },
  {
    q: "What types of spectacle lenses do you offer?",
    a: "We offer single vision lenses, zero-glare blue-cut digital lenses, high-index ultra-thin lenses (1.67 & 1.74), photochromic transitions, anti-fatigue lenses, and advanced free-form progressive lenses crafted with German optical technology."
  },
  {
    q: "Are the frames genuine and covered by warranty?",
    a: "Yes! 100% of our frames and sunglasses are certified authentic. Every pair comes with a 1-year comprehensive warranty covering manufacturing defects, plus lifetime complimentary ultrasonic cleaning and alignment servicing."
  },
  {
    q: "Can you put new lenses into my existing spectacle frames?",
    a: "Absolutely! If you already have frames you love, our optometrist will inspect the frame structure, measure your pupillary distance, and custom-cut new precision prescription lenses in our automated optical lab."
  },
  {
    q: "How accurate is the home eye examination compared to a clinic?",
    a: "Our mobile diagnostic kit includes hospital-grade computerized auto-refractometers, trial lens sets, and digital visual acuity charts. The examination matches the diagnostic accuracy of hospital eye clinics and is conducted by certified optometrists."
  },
  {
    q: "What is the delivery timeline for custom prescription glasses?",
    a: "Single-vision and blue-cut glasses are typically crafted and delivered within 48 to 72 hours. Customized high-index and digital progressive lenses are delivered within 4 to 6 business days after multi-point laser verification."
  }
];

export default function TrialClassPortal({ onBackToMain }: TrialClassPortalProps) {
  // Form State
  const [studentName, setStudentName] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [selectedAge, setSelectedAge] = useState("13–21");
  const [selectedCourseId, setSelectedCourseId] = useState("hindustani");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Active Category & Carousel State
  const [activeTabId, setActiveTabId] = useState("hindustani");
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  // Video Player Modal / Active Video State
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [isHeroVideoPlaying, setIsHeroVideoPlaying] = useState(false);

  // FAQ State (1st item expanded by default)
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Read More Testimonial Modal State
  const [expandedTestimonial, setExpandedTestimonial] = useState<{
    name: string;
    text: string;
  } | null>(null);

  // Testimonial Horizontal Carousel State
  const totalTestimonials = TESTIMONIALS.length;
  const [testimonialSlideIndex, setTestimonialSlideIndex] = useState(totalTestimonials); // Starts at middle cloned set (index 6)
  const [activeTestimonialDot, setActiveTestimonialDot] = useState(0);
  const [isTestimonialTransitioning, setIsTestimonialTransitioning] = useState(true);

  // Optical Showcase Triptych Carousel State
  const [showcaseSlideIndex, setShowcaseSlideIndex] = useState(0);
  const [showcaseDirection, setShowcaseDirection] = useState(1);
  const [isShowcasePaused, setIsShowcasePaused] = useState(false);

  useEffect(() => {
    if (isShowcasePaused) return;
    const timer = setInterval(() => {
      setShowcaseDirection(1);
      setShowcaseSlideIndex((prev) => (prev + 1) % SHOWCASE_SLIDES.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [isShowcasePaused]);

  const handlePrevShowcase = () => {
    setShowcaseDirection(-1);
    setShowcaseSlideIndex((prev) => (prev - 1 + SHOWCASE_SLIDES.length) % SHOWCASE_SLIDES.length);
  };

  const handleNextShowcase = () => {
    setShowcaseDirection(1);
    setShowcaseSlideIndex((prev) => (prev + 1) % SHOWCASE_SLIDES.length);
  };

  const handleNextTestimonial = () => {
    setIsTestimonialTransitioning(true);
    setTestimonialSlideIndex((prev) => prev + 1);
    setActiveTestimonialDot((prev) => (prev + 1) % totalTestimonials);
  };

  const handlePrevTestimonial = () => {
    setIsTestimonialTransitioning(true);
    setTestimonialSlideIndex((prev) => prev - 1);
    setActiveTestimonialDot((prev) => (prev - 1 + totalTestimonials) % totalTestimonials);
  };

  const handleTestimonialTransitionEnd = () => {
    if (testimonialSlideIndex >= 2 * totalTestimonials) {
      setIsTestimonialTransitioning(false);
      setTestimonialSlideIndex(testimonialSlideIndex - totalTestimonials);
    } else if (testimonialSlideIndex < totalTestimonials) {
      setIsTestimonialTransitioning(false);
      setTestimonialSlideIndex(testimonialSlideIndex + totalTestimonials);
    }
  };

  const handleTestimonialDotClick = (targetIndex: number) => {
    const diff = targetIndex - activeTestimonialDot;
    if (diff === 0) return;
    setIsTestimonialTransitioning(true);
    setTestimonialSlideIndex((prev) => prev + diff);
    setActiveTestimonialDot(targetIndex);
  };

  const handleCategoryArrow = (direction: "prev" | "next") => {
    const currentIndex = CATEGORIES.findIndex((c) => c.id === activeTabId);
    let newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    if (newIndex >= CATEGORIES.length) newIndex = 0;
    if (newIndex < 0) newIndex = CATEGORIES.length - 1;

    const nextCat = CATEGORIES[newIndex];
    setActiveTabId(nextCat.id);
    setSelectedCourseId(nextCat.id);
    setIsHeroVideoPlaying(false);

    // Scroll active tab into view in the carousel
    const tabEl = document.getElementById(`tab-${nextCat.id}`);
    if (tabEl && tabsContainerRef.current) {
      tabEl.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  };

  const handleTabSelect = (id: string) => {
    setActiveTabId(id);
    setSelectedCourseId(id);
    setIsHeroVideoPlaying(false);

    const tabEl = document.getElementById(`tab-${id}`);
    if (tabEl && tabsContainerRef.current) {
      tabEl.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) {
      alert("Please enter the student's name");
      return;
    }
    if (!phoneNumber.trim()) {
      alert("Please enter WhatsApp phone number");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 700);
  };

  const currentCategory = CATEGORIES.find((c) => c.id === activeTabId) || CATEGORIES[0];

  return (
    <div className="w-full h-full bg-[#05070B] text-white flex flex-col font-sans overflow-hidden">
      {/* Top Main Navigation Bar on Mobile / Header */}
      {onBackToMain && (
        <div className="lg:hidden bg-[#090D16] border-b border-[#1E293B] px-4 py-3 flex items-center justify-between z-40">
          <button
            onClick={onBackToMain}
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors"
          >
            <ChevronLeft size={16} />
            <span>Back to Site</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-[#0066FF] to-[#38BDF8] flex items-center justify-center text-white text-xs font-bold shadow-md shadow-blue-500/30">
              <Glasses size={14} />
            </div>
            <span className="text-sm font-bold text-white tracking-wide">The Spectacle Zone</span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DUAL PANEL LAYOUT: LEFT SIDEBAR (28%) & RIGHT CONTENT (72%)               */}
      {/* ========================================================================= */}
      <div className="app-dual-layout w-full flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* ========================================================================= */}
        {/* 1. LEFT SIDEBAR (28% desktop width, luxury midnight navy, fixed in viewable area) */}
        {/* ========================================================================= */}
        <aside
          id="left-form-sidebar"
          className="sidebar-panel w-full lg:w-[28%] lg:max-w-[28%] lg:h-full lg:max-h-full overflow-y-auto overflow-x-hidden shrink-0 min-h-0 sidebar-dark-scroll bg-gradient-to-b from-[#0A0E17] via-[#080B12] to-[#04060A] text-white relative flex flex-col justify-between border-r border-[#1E293B] shadow-2xl z-30 font-sans"
        >
          {/* Technical Optics Glow & Precision Matrix Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {/* Ambient Radial Sapphire Glow */}
            <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(0,102,255,0.18)_0%,rgba(0,102,255,0.03)_55%,transparent_75%)] blur-2xl" />
            <div className="absolute top-1/2 -right-16 w-56 h-56 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.12)_0%,transparent_70%)] blur-2xl" />

            {/* Subtle Technical CAD Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-60" />

            {/* Concentric Optics Guide Circles */}
            <div className="absolute -top-10 -right-10 w-48 h-48 opacity-20 pointer-events-none">
              <svg viewBox="0 0 200 200" className="w-full h-full text-blue-400">
                <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" />
                <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
              </svg>
            </div>
          </div>

          <div className="relative px-3.5 sm:px-5 lg:px-4 py-2.5 sm:py-3 flex flex-col flex-1 justify-between z-10 min-h-full">
            {/* Top Bar with Optional Back Link */}
            <div>
              {onBackToMain && (
                <div className="flex items-center justify-start mb-1.5">
                  <button
                    type="button"
                    onClick={onBackToMain}
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <ChevronLeft size={14} />
                    <span>Back to Site</span>
                  </button>
                </div>
              )}

              {/* Booking Headline */}
              <div className="text-center mb-2 sm:mb-2.5">
                <h1 className="text-[20px] sm:text-[22px] lg:text-[24px] font-bold text-white leading-tight tracking-tight">
                  Book Home Eyecare
                </h1>
              </div>
            </div>

            {/* Form */}
            {!isSubmitted ? (
              <form onSubmit={handleFormSubmit} className="flex-1 flex flex-col justify-between pt-1">
                {/* 5 Input Fields with Strict Equal Vertical Spacing */}
                <div className="space-y-3 sm:space-y-3.5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-2 text-left">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full h-8.5 sm:h-9 px-3 rounded-lg bg-[#0C111C]/95 border border-[#1E293B] text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]/40 transition-all"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-2 text-left">
                      Phone Number
                    </label>
                    <div className="flex gap-1.5">
                      <div className="relative w-20 shrink-0">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="w-full h-8.5 sm:h-9 px-2 pr-6 rounded-lg bg-[#0C111C]/95 border border-[#1E293B] text-slate-200 text-xs font-medium focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]/40 transition-all appearance-none cursor-pointer"
                        >
                          {COUNTRY_CODES.map((c) => (
                            <option key={c.code} value={c.code} className="bg-[#0C111C] text-white">
                              {c.code}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={12}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                        />
                      </div>
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Enter WhatsApp number"
                        className="flex-1 h-8.5 sm:h-9 px-3 rounded-lg bg-[#0C111C]/95 border border-[#1E293B] text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]/40 transition-all"
                      />
                    </div>
                  </div>

                  {/* Email (optional) */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-2 text-left">
                      <span>Email</span>{" "}
                      <span className="font-normal text-slate-400 text-[11px] ml-0.5">(optional)</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full h-8.5 sm:h-9 px-3 rounded-lg bg-[#0C111C]/95 border border-[#1E293B] text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]/40 transition-all"
                    />
                  </div>

                  {/* Select Age Group */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-2 text-left">
                      Select Age Group
                    </label>
                    <div className="flex items-center justify-between gap-1 w-full">
                      {AGE_GROUPS.map((age) => (
                        <button
                          key={age}
                          type="button"
                          onClick={() => setSelectedAge(age)}
                          className={`h-7 sm:h-7.5 flex-1 rounded-md text-[11px] font-semibold transition-all flex items-center justify-center cursor-pointer border ${
                            selectedAge === age
                              ? "bg-gradient-to-r from-[#0052D4] to-[#0099FF] text-white border-cyan-400/80 shadow-md shadow-[#0052D4]/35 font-bold"
                              : "bg-[#0C111C]/90 text-slate-300 border-[#1E293B] hover:border-slate-600 hover:text-white"
                          }`}
                        >
                          {age}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Select Specs / Eyecare Service */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-2 text-left">
                      Select Specs / Eyecare Service
                    </label>
                    <div className="relative">
                      <select
                        value={selectedCourseId}
                        onChange={(e) => {
                          setSelectedCourseId(e.target.value);
                          setActiveTabId(e.target.value);
                        }}
                        className="w-full h-8.5 sm:h-9 px-3 pr-7 rounded-lg bg-[#0C111C]/95 border border-[#1E293B] text-slate-200 text-xs font-medium focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]/40 transition-all appearance-none cursor-pointer truncate"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat.id} value={cat.id} className="bg-[#0C111C] text-white">
                            {cat.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={13}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit CTA Button & Trust Badge */}
                <div className="pt-2.5 sm:pt-3 space-y-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-9.5 sm:h-10 rounded-full bg-gradient-to-r from-[#0052D4] via-[#2A6DF5] to-[#00C2FF] hover:from-[#0041B8] hover:via-[#1D5AD8] hover:to-[#00A8E0] text-white font-bold text-xs sm:text-sm tracking-wide transition-all flex items-center justify-center cursor-pointer shadow-lg shadow-[#0052D4]/40 hover:shadow-cyan-500/25 active:scale-[0.99] border border-cyan-300/40"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <span className="flex items-center gap-1.5 font-bold drop-shadow-sm">
                        <span>Book Home Eyecare</span>
                        <span className="text-xs">→</span>
                      </span>
                    )}
                  </button>

                  {/* Trust Ratings & Frames Served - Combined Single Line Badge */}
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-[#0B1324] border border-blue-500/30 text-white text-[10px] sm:text-[10.5px] font-medium tracking-tight shadow-xs whitespace-nowrap">
                      {/* Google Rating */}
                      <div className="inline-flex items-center gap-1 shrink-0">
                        <svg className="w-3 h-3" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                        </svg>
                        <span className="font-bold text-white">4.8</span>
                        <span className="text-[#FBBC05] text-[9.5px] leading-none">★</span>
                      </div>

                      <span className="text-slate-600 font-light">•</span>

                      {/* Trustpilot Rating */}
                      <div className="inline-flex items-center gap-1 shrink-0">
                        <svg className="w-3 h-3 fill-[#00E676]" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <span className="text-slate-300 hidden xs:inline text-[9.5px]">Trustpilot:</span>
                        <span className="font-bold text-white">4.7</span>
                      </div>

                      <span className="text-slate-600 font-light">•</span>

                      {/* 19870+ frames and glasses served */}
                      <div className="inline-flex items-center gap-1 shrink-0">
                        <Glasses size={12} className="text-[#0066FF] shrink-0" />
                        <span className="text-emerald-400 font-bold">19870+</span>
                        <span className="text-slate-300">frames served</span>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center bg-[#0B1220]/95 rounded-2xl p-6 border border-[#1E293B]"
              >
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 size={26} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Home Eyecare Reserved!</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Thank you <span className="font-semibold text-white">{studentName}</span>. Your Home Eyecare session for{" "}
                  <span className="text-blue-400 font-semibold">{currentCategory.name}</span> has been confirmed. Our specialist team will share your appointment details & WhatsApp reminder shortly to {countryCode} {phoneNumber}.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="w-full py-2 bg-gradient-to-r from-[#0066FF] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md shadow-blue-500/30"
                >
                  Book Another Session
                </button>
              </motion.div>
            )}
          </div>
        </aside>

        {/* ========================================================================= */}
        {/* 2. RIGHT MAIN CONTENT (72% desktop width, white bg, independent scroll)  */}
        {/* ========================================================================= */}
        <main
          id="right-course-content"
          className="main-content-panel w-full lg:w-[72%] lg:flex-1 lg:h-full lg:max-h-full overflow-y-auto overflow-x-hidden min-w-0 min-h-0 overscroll-contain bg-white text-zinc-900 flex flex-col content-light-scroll"
        >
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 flex flex-col space-y-12 sm:space-y-14 md:space-y-16">
            
            {/* ========================================================================= */}
            {/* SECTION 1: RIGHT HERO HEADER & SHOWCASE                                   */}
            {/* ========================================================================= */}
            <section id="section-hero-showcase" className="w-full">
              <div className="text-center w-full max-w-4xl mx-auto mb-4 sm:mb-5">
                <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-bold text-neutral-900 tracking-tight leading-[1.2] text-center whitespace-normal md:whitespace-nowrap">
                  Designer Spectacles & Precision Eyewear
                </h2>
              </div>

            {/* ========================================================================= */}
            {/* SECTION 4: COURSE CATEGORY CAROUSEL                                       */}
            {/* ========================================================================= */}
            <div className="w-full flex items-center justify-between gap-2 sm:gap-2.5 relative mb-4 sm:mb-5">
              {/* Left Circular Arrow Button (Selects Previous Category) */}
              <button
                type="button"
                id="cat-carousel-prev"
                onClick={() => handleCategoryArrow("prev")}
                aria-label="Previous Category"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 shadow-2xs flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Horizontal Category Carousel Navigation */}
              <div
                ref={tabsContainerRef}
                className="flex-1 flex items-center gap-2.5 sm:gap-3 overflow-x-auto scrollbar-none scroll-smooth py-1 px-1"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {CATEGORIES.map((cat) => {
                  const isActive = cat.id === activeTabId;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      id={`tab-${cat.id}`}
                      onClick={() => handleTabSelect(cat.id)}
                      className={`h-10 sm:h-11 md:h-12 px-5 sm:px-6 md:px-7 rounded-full text-[14px] sm:text-[15px] font-semibold whitespace-nowrap transition-all flex items-center shrink-0 cursor-pointer ${
                        isActive
                          ? "bg-[#ff1375] text-white shadow-md shadow-[#ff1375]/30 border border-[#ff1375]"
                          : "bg-white text-zinc-800 hover:text-zinc-950 border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"
                      }`}
                    >
                      {cat.name}
                    </button>
                  );
                })}
              </div>

              {/* Right Circular Arrow Button (Selects Next Category) */}
              <button
                type="button"
                id="cat-carousel-next"
                onClick={() => handleCategoryArrow("next")}
                aria-label="Next Category"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 shadow-2xs flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* ========================================================================= */}
            {/* SECTION 5: MAIN HERO VIDEO CARD (Dynamic Maestro on sofa, Play Button)     */}
            {/* ========================================================================= */}
            <div className="relative w-full rounded-[22px] sm:rounded-[24px] overflow-hidden bg-neutral-950 shadow-xl border border-zinc-200 group">
              <div className="relative aspect-[16/9] sm:aspect-[21/10] md:aspect-[16/8.5] w-full overflow-hidden flex items-center justify-center bg-zinc-900">
                {isHeroVideoPlaying ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${currentCategory.youtubeId}?autoplay=1&rel=0`}
                    title={`${currentCategory.name} Spectacle Showcase`}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <>
                    {/* Hero Thumbnail for Active Category */}
                    <img
                      src={currentCategory.image}
                      alt={`${currentCategory.maestro} ${currentCategory.name} Eyewear Collection`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                    />

                    {/* Realistic Optical & Spectacles Decorative Overlay */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.2) 100%), url('/assets/img/modernoptical.jpeg')`,
                        backgroundBlendMode: "multiply",
                        opacity: 0.12
                      }}
                    />

                    {/* Top Badges (Category + Specs Description) */}
                    <div className="absolute top-4 sm:top-5 left-4 sm:left-6 flex items-center gap-2">
                      <span className="bg-[#ff1375] text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                        {currentCategory.category}
                      </span>
                      <span className="bg-black/70 backdrop-blur-sm text-white text-xs font-medium px-3.5 py-1 rounded-full border border-white/20 flex items-center gap-1.5">
                        <Sparkles size={12} className="text-amber-400" />
                        {currentCategory.patron}
                      </span>
                    </div>

                    {/* Large Center Circular Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <button
                        type="button"
                        onClick={() => setIsHeroVideoPlaying(true)}
                        aria-label={`Play ${currentCategory.name} Video`}
                        className="pointer-events-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full border-[2.5px] border-white/90 bg-black/35 hover:bg-[#ff1375]/90 backdrop-blur-xs flex items-center justify-center text-white shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
                      >
                        <Play size={28} className="fill-white text-white ml-1" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 2: CERTIFIED MASTER OPTOMETRISTS & STYLISTS                       */}
          {/* ========================================================================= */}
          <section id="section-optometrists" className="w-full text-center">
            <h3 className="text-[26px] sm:text-[30px] font-bold text-neutral-900 tracking-tight">
              Certified Master Optometrists & Stylists
            </h3>
              <p className="text-[14px] sm:text-[15px] text-zinc-600 mt-1">
                Hospital-grade 14-step eye evaluation, precise pupil distance measurement & bespoke frame styling
              </p>

              {/* 3 Specs & Lens Group Composition with bottom fade - Interactive Carousel */}
              <div 
                className="relative w-full max-w-[480px] sm:max-w-[560px] mx-auto mt-6 flex items-center justify-between gap-2 sm:gap-4 select-none"
                onMouseEnter={() => setIsShowcasePaused(true)}
                onMouseLeave={() => setIsShowcasePaused(false)}
              >
                {/* Carousel Left Navigation Arrow (At outer left end) */}
                <button
                  type="button"
                  onClick={handlePrevShowcase}
                  aria-label="Previous optical frames"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-zinc-200 bg-white text-zinc-700 hover:text-zinc-950 flex items-center justify-center hover:bg-zinc-50 shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0 z-20"
                >
                  <ChevronLeft size={18} />
                </button>

                {/* Center Triptych Frame Showcase */}
                <div className="relative flex-1 max-w-[340px] sm:max-w-[420px] mx-auto">
                  <AnimatePresence mode="wait" custom={showcaseDirection}>
                    <motion.div
                      key={showcaseSlideIndex}
                      custom={showcaseDirection}
                      initial={{ opacity: 0, x: showcaseDirection > 0 ? 25 : -25 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: showcaseDirection > 0 ? -25 : 25 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="relative flex items-end justify-center"
                    >
                      {/* Left Specs / Optical Frame */}
                      <div 
                        onClick={handlePrevShowcase}
                        title="Click to view previous pair"
                        className="w-[120px] sm:w-[145px] -mr-5 z-10 transition-transform duration-300 hover:scale-105 hover:z-30 cursor-pointer"
                      >
                        <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-md border border-purple-200/80 bg-zinc-100">
                          <img
                            src={SHOWCASE_SLIDES[showcaseSlideIndex].left.src}
                            alt={SHOWCASE_SLIDES[showcaseSlideIndex].left.alt}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = SHOWCASE_SLIDES[showcaseSlideIndex].left.fallback;
                            }}
                          />
                        </div>
                      </div>

                      {/* Center Optical Precision Lens / Specs (Standing in front) */}
                      <div className="w-[140px] sm:w-[170px] z-20 transition-transform duration-300 hover:scale-105">
                        <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border-2 border-purple-300 bg-white">
                          <img
                            src={SHOWCASE_SLIDES[showcaseSlideIndex].center.src}
                            alt={SHOWCASE_SLIDES[showcaseSlideIndex].center.alt}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = SHOWCASE_SLIDES[showcaseSlideIndex].center.fallback;
                            }}
                          />
                        </div>
                      </div>

                      {/* Right Luxury Frame / Specs */}
                      <div 
                        onClick={handleNextShowcase}
                        title="Click to view next pair"
                        className="w-[120px] sm:w-[145px] -ml-5 z-10 transition-transform duration-300 hover:scale-105 hover:z-30 cursor-pointer"
                      >
                        <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-md border border-purple-200/80 bg-zinc-100">
                          <img
                            src={SHOWCASE_SLIDES[showcaseSlideIndex].right.src}
                            alt={SHOWCASE_SLIDES[showcaseSlideIndex].right.alt}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = SHOWCASE_SLIDES[showcaseSlideIndex].right.fallback;
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Bottom White Gradient Fade */}
                  <div className="absolute bottom-4 left-0 right-0 h-10 bg-gradient-to-t from-white via-white/70 to-transparent pointer-events-none z-10" />

                  {/* Subtle Carousel Dots */}
                  <div className="flex items-center justify-center gap-1.5 mt-2.5 relative z-20">
                    {SHOWCASE_SLIDES.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setShowcaseDirection(idx > showcaseSlideIndex ? 1 : -1);
                          setShowcaseSlideIndex(idx);
                        }}
                        aria-label={`View frame group ${idx + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          idx === showcaseSlideIndex
                            ? "w-5 bg-[#ff1375]"
                            : "w-1.5 bg-purple-200 hover:bg-purple-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Carousel Right Navigation Arrow (At outer right end) */}
                <button
                  type="button"
                  onClick={handleNextShowcase}
                  aria-label="Next optical frames"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-zinc-200 bg-white text-zinc-700 hover:text-zinc-950 flex items-center justify-center hover:bg-zinc-50 shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0 z-20"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </section>

            {/* ========================================================================= */}
            {/* SECTION 3: STATISTICS CARDS (4 in one row, light lavender bg, short)      */}
            {/* ========================================================================= */}
            <section id="section-statistics" className="w-full">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
              {STATS.map((st) => (
                <motion.div
                  key={st.value}
                  whileHover={{
                    scale: 1.06,
                    y: -4,
                    transition: { type: "spring", stiffness: 450, damping: 18 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#F8F6FD] border border-[#EDE8F8] hover:border-[#FF1375]/40 rounded-xl p-3 sm:p-3.5 flex flex-col items-center justify-center text-center h-[76px] sm:h-[82px] shadow-2xs hover:shadow-xl hover:shadow-[#FF1375]/15 transition-colors cursor-pointer select-none group"
                >
                  <span className="text-[20px] sm:text-[22px] font-bold text-[#FF1375] leading-none mb-1 transition-transform duration-200 group-hover:scale-110 origin-center inline-block">
                    {st.value}
                  </span>
                  <span className="text-[11px] sm:text-[12px] font-medium text-zinc-800 leading-tight">
                    {st.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 4: WHY CHOOSE THE SPECTACLE ZONE? (Dark charcoal-purple #39364B)  */}
          {/* ========================================================================= */}
          <section id="section-why-choose" className="w-full bg-[#39364B] rounded-2xl p-6 sm:p-8 md:p-10 text-white text-center shadow-lg">
            <h3 className="text-[24px] sm:text-[28px] font-bold text-white tracking-tight">
                Why Choose The Spectacle Zone?
              </h3>
              <p className="text-[13px] sm:text-[14px] text-zinc-300 mt-1 mb-8">
                India's trusted destination for precision spectacles, digital lenses & doorstep home trials
              </p>

              {/* 3 Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
                {/* Card 1: 100+ Frames Doorstep Home Trial */}
                <div className="bg-white rounded-xl p-5 text-zinc-900 flex flex-col items-center text-center shadow-md">
                  <div className="w-full h-36 rounded-lg bg-zinc-50 overflow-hidden flex items-center justify-center p-1 mb-4 border border-zinc-100">
                    <img
                      src="/assets/img/Rayban meta.png"
                      alt="Ray-Ban Meta AI Smart Glasses"
                      className="w-full h-full object-contain rounded-md transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = "/assets/img/oakley meta.jpeg";
                      }}
                    />
                  </div>
                  <h4 className="text-[16px] font-bold text-zinc-900 leading-tight mb-2">
                    100+ Frames Doorstep Home Trial
                  </h4>
                  <p className="text-[12px] text-zinc-600 leading-relaxed">
                    Try our curated collection of 100+ designer frames at home with face-shape styling assistance.
                  </p>
                </div>

                {/* Card 2: Advanced Optical Lens & Anti-Glare Tech */}
                <div className="bg-white rounded-xl p-5 text-zinc-900 flex flex-col items-center text-center shadow-md">
                  <div className="w-full h-36 rounded-lg bg-zinc-50 overflow-hidden flex items-center justify-center mb-4 border border-zinc-100">
                    <img
                      src="/assets/img/anti-reflections.jpg"
                      alt="Advanced Anti-Reflective Optical Lens"
                      className="w-full h-full object-cover rounded-md transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = "/assets/img/bluelens.jpg";
                      }}
                    />
                  </div>
                  <h4 className="text-[16px] font-bold text-zinc-900 leading-tight mb-2">
                    German Precision Blue-Cut Optics
                  </h4>
                  <p className="text-[12px] text-zinc-600 leading-relaxed">
                    Advanced anti-reflective, zero-glare blue-cut lenses with multi-layer hydrophobic coatings.
                  </p>
                </div>

                {/* Card 3: Certified Optometrist & Free Adjustments */}
                <div className="bg-white rounded-xl p-5 text-zinc-900 flex flex-col items-center text-center shadow-md">
                  <div className="w-full h-36 rounded-lg bg-zinc-50 overflow-hidden flex items-center justify-center p-1 mb-4 border border-zinc-100">
                    <img
                      src="/assets/img/oakley meta.jpeg"
                      alt="Oakley Meta AI Smart Specs"
                      className="w-full h-full object-cover rounded-md transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = "/assets/img/lenslab1.jpg";
                      }}
                    />
                  </div>
                  <h4 className="text-[16px] font-bold text-zinc-900 leading-tight mb-2">
                    Certified Optometrist & Free Adjustments
                  </h4>
                  <p className="text-[12px] text-zinc-600 leading-relaxed">
                    Complete 14-step digital eye examination, prescription guarantee, and free lifetime frame servicing.
                  </p>
                </div>
              </div>
            </section>

            {/* ========================================================================= */}
            {/* SECTION 5: OUR HAPPY SPECTACLE WEARERS (Horizontal Sliding Carousel)      */}
            {/* ========================================================================= */}
            <section id="section-testimonials" className="w-full text-center">
              <h3 className="text-[26px] sm:text-[30px] font-bold text-neutral-900 tracking-tight mb-6">
                Our Happy Spectacle Wearers
              </h3>

              <div className="relative flex items-center justify-between gap-2 sm:gap-3 w-full">
                {/* Left Arrow Button */}
                <button
                  type="button"
                  id="testimonial-prev-arrow"
                  onClick={handlePrevTestimonial}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-zinc-200 bg-white text-zinc-700 hover:text-zinc-950 flex items-center justify-center hover:bg-zinc-50 shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0 z-10"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft size={18} />
                </button>

                {/* Carousel Viewport */}
                <div className="testimonial-carousel flex-1 overflow-hidden w-full py-1">
                  <div
                    className="testimonial-track flex items-stretch"
                    style={{
                      ["--slide-index" as string]: testimonialSlideIndex,
                      transition: isTestimonialTransitioning
                        ? "transform 0.45s ease-in-out"
                        : "none"
                    } as React.CSSProperties}
                    onTransitionEnd={handleTestimonialTransitionEnd}
                  >
                    {EXTENDED_TESTIMONIALS.map((item, idx) => (
                      <div
                        key={`${item.id}-${idx}`}
                        className="testimonial-slide shrink-0"
                      >
                        {item.type === "video" ? (
                          /* Video Testimonial Card */
                          <div className="bg-black rounded-2xl overflow-hidden relative group h-[255px] flex flex-col justify-between p-4 text-center shadow-md border border-zinc-200/60">
                            <img
                              src={item.image}
                              alt={`${item.name} Video Review`}
                              className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />

                            {/* Center Play Button */}
                            <div className="relative z-10 my-auto flex items-center justify-center">
                              <button
                                type="button"
                                onClick={() => setActiveVideoUrl(item.videoId || "3e_K2PjV82A")}
                                className="w-12 h-12 rounded-full border-2 border-white bg-black/40 hover:bg-[#FF1375] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
                                aria-label={`Play ${item.name} Video Testimonial`}
                              >
                                <Play size={20} className="fill-white text-white ml-0.5" />
                              </button>
                            </div>

                            <div className="relative z-10 mt-auto">
                              <h4 className="text-[15px] sm:text-[16px] font-bold text-white leading-tight">
                                {item.name}
                              </h4>
                              {item.location && (
                                <p className="text-[11px] sm:text-[12px] text-zinc-300 mt-0.5">
                                  {item.location}
                                </p>
                              )}
                            </div>
                          </div>
                        ) : (
                          /* Image Testimonial Card */
                          <div className="bg-[#FAF8FF] border border-[#EDE8F8] rounded-2xl p-5 h-[255px] flex flex-col items-center text-center shadow-2xs hover:shadow-xs transition-shadow">
                            <img
                              src={item.image}
                              alt={`${item.name} Eyewear Customer`}
                              className="w-[74px] h-[74px] rounded-full object-cover mb-2 border-2 border-purple-200/80 shadow-xs shrink-0"
                            />
                            <h4 className="text-[15px] sm:text-[16px] font-bold text-zinc-900 mb-1 leading-tight">
                              {item.name}
                            </h4>
                            <p className="text-[12px] text-zinc-600 leading-relaxed mb-2 line-clamp-3 px-1">
                              {item.text}
                            </p>
                            <button
                              type="button"
                              onClick={() =>
                                setExpandedTestimonial({
                                  name: item.name,
                                  text: item.text || ""
                                })
                              }
                              className="text-[#FF1375] text-[12px] font-semibold underline hover:text-pink-700 cursor-pointer mt-auto"
                            >
                              Read More
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Arrow Button */}
                <button
                  type="button"
                  id="testimonial-next-arrow"
                  onClick={handleNextTestimonial}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-zinc-200 bg-white text-zinc-700 hover:text-zinc-950 flex items-center justify-center hover:bg-zinc-50 shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0 z-10"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Bottom Indicators (dots/bars) */}
              <div className="flex items-center justify-center gap-2 mt-5">
                {TESTIMONIALS.map((_, idx) => {
                  const isActive = activeTestimonialDot === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleTestimonialDotClick(idx)}
                      className={`transition-all duration-300 rounded-full cursor-pointer ${
                        isActive
                          ? "w-7 h-2 bg-[#FF1375]"
                          : "w-2 h-2 bg-zinc-300 hover:bg-zinc-400"
                      }`}
                      aria-label={`Go to testimonial slide ${idx + 1}`}
                    />
                  );
                })}
              </div>
            </section>

            {/* ========================================================================= */}
            {/* SECTION 6: THE SPECTACLE ZONE ADVANTAGE (3 Cards)                        */}
            {/* ========================================================================= */}
            <section id="section-advantage" className="w-full">
              <div className="text-center max-w-2xl mx-auto mb-6">
                <h3 className="text-[26px] sm:text-[30px] font-bold text-neutral-900 tracking-tight">
                  The Spectacle Zone Advantage
                </h3>
                <p className="text-[13px] sm:text-[14px] text-zinc-600 mt-1">
                  Enjoy bespoke optical advantages including 100+ frames home trial, custom digital lens edging, and complimentary lifetime frame adjustments.
                </p>
              </div>

              {/* 3 Edge Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Card 1: 100+ Frames Home Try-On */}
                <div className="bg-[#FAF8FF] border border-[#EDE8F8] rounded-xl overflow-hidden shadow-2xs hover:shadow-xs transition-all flex flex-col">
                  <div className="relative h-40 bg-zinc-900 group">
                    <img
                      src="/assets/img/opticalstore5.jpg"
                      alt="100+ Frames Doorstep Try-On Showcase"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => setActiveVideoUrl("3e_K2PjV82A")}
                        className="w-10 h-10 rounded-full border-2 border-white bg-black/40 hover:bg-[#FF1375] text-white flex items-center justify-center shadow-md transition-transform hover:scale-110 cursor-pointer"
                        aria-label="Play Home Trial Preview"
                      >
                        <Play size={16} className="fill-white text-white ml-0.5" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h4 className="text-[16px] font-bold text-zinc-900 mb-1">100+ Frames Home Try-On</h4>
                    <p className="text-[12px] text-zinc-600 leading-relaxed">
                      Touch, feel, and try genuine designer specs in natural light from the comfort of your living room.
                    </p>
                  </div>
                </div>

                {/* Card 2: High-Index Digital Optics */}
                <div className="bg-[#FAF8FF] border border-[#EDE8F8] rounded-xl overflow-hidden shadow-2xs hover:shadow-xs transition-all flex flex-col">
                  <div className="relative h-40 bg-zinc-900 group">
                    <img
                      src="/assets/img/bluelens.jpg"
                      alt="High-Index Digital Precision Lenses"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => setActiveVideoUrl("77nO53wF3fE")}
                        className="w-10 h-10 rounded-full border-2 border-white bg-black/40 hover:bg-[#FF1375] text-white flex items-center justify-center shadow-md transition-transform hover:scale-110 cursor-pointer"
                        aria-label="Play Optical Precision Showcase"
                      >
                        <Play size={16} className="fill-white text-white ml-0.5" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h4 className="text-[16px] font-bold text-zinc-900 mb-1">High-Index Digital Optics</h4>
                    <p className="text-[12px] text-zinc-600 leading-relaxed">
                      Ultra-thin, featherweight lenses customized for high cylinder and sphere powers with zero distortion.
                    </p>
                  </div>
                </div>

                {/* Card 3: 1-Year Warranty & Lifetime Care */}
                <div className="bg-[#FAF8FF] border border-[#EDE8F8] rounded-xl overflow-hidden shadow-2xs hover:shadow-xs transition-all flex flex-col">
                  <div className="relative h-40 bg-zinc-900 group">
                    <img
                      src="/assets/img/atelier.jpg"
                      alt="Artisanal Handcrafted Eyewear Atelier"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => setActiveVideoUrl("9o9B0R9M4q4")}
                        className="w-10 h-10 rounded-full border-2 border-white bg-black/40 hover:bg-[#FF1375] text-white flex items-center justify-center shadow-md transition-transform hover:scale-110 cursor-pointer"
                        aria-label="Play Atelier Craft Video"
                      >
                        <Play size={16} className="fill-white text-white ml-0.5" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h4 className="text-[16px] font-bold text-zinc-900 mb-1">1-Year Warranty & Lifetime Care</h4>
                    <p className="text-[12px] text-zinc-600 leading-relaxed">
                      Comprehensive 12-month breakage warranty with free nose-pad, screw, and alignment adjustments.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ========================================================================= */}
            {/* SECTION 7: FREQUENTLY ASKED QUESTIONS (Dark Purple #292637 / #302D40)     */}
            {/* ========================================================================= */}
            <section id="section-faq" className="w-full bg-[#292637] rounded-2xl p-6 sm:p-8 text-white shadow-xl">
              <h3 className="text-[24px] sm:text-[28px] font-bold text-white tracking-tight text-center mb-6">
                Frequently Asked Questions
              </h3>

              <div className="space-y-2 max-w-3xl mx-auto">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={faq.q}
                      className="bg-[#383449] border border-[#48425C] rounded-lg overflow-hidden transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full px-4 py-3 text-left font-medium text-[13px] sm:text-[14px] text-white flex items-center justify-between gap-3 hover:bg-[#423c56] transition-colors cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          size={16}
                          className={`text-zinc-400 transition-transform duration-200 shrink-0 ${
                            isOpen ? "rotate-180 text-[#FF1375]" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="px-4 pb-3.5 pt-1 text-[12px] sm:text-[13px] text-zinc-300 leading-relaxed border-t border-[#48425C]">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </section>

          </div>
        </main>
      </div>

      {/* ========================================================================= */}
      {/* VIDEO POPUP MODAL (YouTube Video Player)                                  */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeVideoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActiveVideoUrl(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-3xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-zinc-800"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideoUrl(null)}
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/70 text-white hover:bg-[#FF1375] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close Video"
              >
                <X size={20} />
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoUrl}?autoplay=1&rel=0`}
                title="The Spectacle Zone Eyewear Showcase"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* TESTIMONIAL READ MORE MODAL                                               */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {expandedTestimonial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setExpandedTestimonial(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md bg-white text-zinc-900 rounded-2xl p-6 shadow-2xl border border-zinc-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setExpandedTestimonial(null)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-800 transition-colors cursor-pointer"
                aria-label="Close Testimonial"
              >
                <X size={20} />
              </button>
              <h4 className="text-lg font-bold text-zinc-900 mb-2">{expandedTestimonial.name}</h4>
              <p className="text-sm text-zinc-600 leading-relaxed">
                "{expandedTestimonial.text}"
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
