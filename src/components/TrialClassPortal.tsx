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
  Sparkles
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
    id: "hindustani",
    name: "Hindustani Classical",
    category: "CLASSICAL",
    patron: "Curated by Shubha Mudgal",
    youtubeId: "DXKwrfpX1bw",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1600&q=80",
    maestro: "Shubha Mudgal"
  },
  {
    id: "tamil-film",
    name: "Tamil Film Music",
    category: "TAMIL",
    patron: "Curated by K.S. Chithra",
    youtubeId: "N_G1o_j7s8Q",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&q=80",
    maestro: "K.S. Chithra"
  },
  {
    id: "telugu-film",
    name: "Telugu Film Music",
    category: "TELUGU",
    patron: "Curated by K.S. Chithra & S.P. Charan",
    youtubeId: "w3yCg_dJ9eA",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1600&q=80",
    maestro: "K.S. Chithra & S.P. Charan"
  },
  {
    id: "western-vocal",
    name: "Western Vocal",
    category: "WESTERN",
    patron: "Curated by Ananth Vaidyanathan",
    youtubeId: "5Q8T4xL9z3k",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80",
    maestro: "Ananth Vaidyanathan"
  },
  {
    id: "carnatic",
    name: "Carnatic Classical",
    category: "CLASSICAL",
    patron: "Curated by Aruna Sairam",
    youtubeId: "m0L61Z0K8v8",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1600&q=80",
    maestro: "Aruna Sairam"
  },
  {
    id: "bollywood",
    name: "Hindi Film Music",
    category: "BOLLYWOOD",
    patron: "Curated by Sonu Nigam",
    youtubeId: "fJ9rUzIMcZQ",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1600&q=80",
    maestro: "Sonu Nigam"
  },
  {
    id: "piano",
    name: "Piano & Keyboard",
    category: "PIANO",
    patron: "Curated by Louiz Banks",
    youtubeId: "pA0R_7FzDCE",
    image: "https://images.unsplash.com/photo-1520523839898-5071280540a7?auto=format&fit=crop&w=1600&q=80",
    maestro: "Louiz Banks"
  },
  {
    id: "guitar",
    name: "Acoustic Guitar",
    category: "GUITAR",
    patron: "Curated by Maestro Faculty",
    youtubeId: "0U_3pG5U718",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1600&q=80",
    maestro: "Faculty Maestro"
  },
  {
    id: "tabla",
    name: "Tabla",
    category: "TABLA",
    patron: "Curated by Aneesh Pradhan",
    youtubeId: "W6q1AWjGo58",
    image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=1600&q=80",
    maestro: "Aneesh Pradhan"
  }
];

const STATS = [
  { value: "400+", label: "Certified Indian Music Teachers" },
  { value: "20+", label: "Years of Experience in Teaching Music" },
  { value: "1,46,000+", label: "Hours of Teaching Music Annually" },
  { value: "35,000+", label: "Learners Taught by Artium" }
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
    name: "Tanya Mehra",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    text: "I always wanted to sing Hindi film classics with proper pitch and emotion. The 1:1 sessions gave me the confidence to audition and perform on stage effortlessly."
  },
  {
    id: 2,
    type: "video",
    name: "Rohit Deshmukh",
    location: "Pune",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
    videoId: "q76bS241VnY"
  },
  {
    id: 3,
    type: "image",
    name: "Meera Nambiar",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    text: "Being in California, finding an authentic guru was challenging until Artium. The timezone match is impeccable and classes are structured with real depth."
  },
  {
    id: 4,
    type: "video",
    name: "Devanshi Sarangi",
    location: "Ahmedabad",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
    videoId: "w3yCg_dJ9eA"
  },
  {
    id: 5,
    type: "image",
    name: "Rima",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
    text: "Having trained in Carnatic Music before and after a long break, learning Hindustani Classical music seemed like a fresh start. The teacher's gentle approach made all the difference."
  },
  {
    id: 6,
    type: "image",
    name: "Archana Handoo",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    text: "Artium was a great experience for me. First of all I could choose time slot out of my own choice. For one hour session every week, the mentor gives 100% focused attention."
  }
];

const EXTENDED_TESTIMONIALS = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

const FAQS = [
  {
    q: "What will I learn in Artium's online Hindustani music classes as a beginner?",
    a: "In Artium Academy's online Hindustani music classes for beginners, you start from the absolute basics of Indian classical singing like swara, naad, sargam and alankar, so you build a strong foundation in pitch and control. You gradually learn Hindustani music essentials like simple swargeet, introductory raag structures, aaroh-avroh and the role of taal, along with basic voice culture and breathing exercises."
  },
  {
    q: "Are Artium's Indian classical singing classes suitable for both kids and adults?",
    a: "Yes! Our courses are custom-tailored for all age groups starting from age 6 to senior adults. The pedagogy adapts seamlessly to the student's pace, learning style, and vocal capabilities."
  },
  {
    q: "Does the Hindustani classical music course cover raag, alap, bandish, swar, and taal?",
    a: "Yes, comprehensively. The curriculum encompasses systematically graded modules covering swar sadhana, raag characteristics, bandish with proper laya, alap improvisation, taans, and classical taal accompaniment."
  },
  {
    q: "How does Artium's structured curriculum progress from beginner to advanced Hindustani vocal training?",
    a: "The curriculum is divided into progressive graded levels (Preparatory, Foundation, Intermediate, and Advanced). Each level builds foundational precision, voice modulation, complex raags, and performance mastery."
  },
  {
    q: "How are Artium's 1:1 live classes different from a regular music class or local academy?",
    a: "Artium delivers 1:1 dedicated live instruction from India's top 1% certified maestros using our proprietary Artium Studio with in-browser digital tanpura, metronome, pitch detection, and structured performance assessments."
  },
  {
    q: "What is the benefit of learning Hindustani music?",
    a: "Hindustani music instills unmatched pitch accuracy, vocal flexibility, breath control, emotional expression, and deep theoretical understanding that forms the cornerstone for singing any genre in the world."
  },
  {
    q: "Do you provide Indian classical singing lessons for students living outside India?",
    a: "Yes, we teach students in over 30 countries across the US, UK, Canada, UAE, Singapore, Australia, and Europe with flexible scheduling across all global time zones."
  },
  {
    q: "Is there a certificate provided upon completion of the Hindustani classical music course?",
    a: "Yes. Students receive globally verified certifications backed by our Academic Board and Faculty Patrons like Shubha Mudgal upon completing each grade level assessment."
  },
  {
    q: "Does Artium Academy offer offline Hindustani vocal classes, or are they strictly online?",
    a: "Artium classes are conducted 100% online through our purpose-built live video studio platform, enabling students anywhere to learn directly from premier maestros without travel constraints."
  },
  {
    q: "Will I receive a structured curriculum in my online Hindustani singing classes?",
    a: "Yes. Every student receives digital access to notation sheets, audio practice tracks, riyaz assignments, and a clear step-by-step roadmap designed by legendary maestros."
  },
  {
    q: "Is Artium the right music academy for a complete Hindustani singing course?",
    a: "With over 35,000+ happy learners and curricula designed by Padma Shri Shubha Mudgal, Artium is recognized as the premier global destination for authentic online Indian classical music education."
  },
  {
    q: "How are Artium's Hindustani music lessons designed differently for kids and adults?",
    a: "Lessons for children incorporate engaging gamified ear training, interactive story-based swar games, and gentle pacing, while adult lessons focus on vocal health, voice culture, deep classical theory, and personal musical goals."
  },
  {
    q: "Are there online Hindustani music classes for NRIs and students living outside India?",
    a: "Yes, we have thousands of NRI students worldwide. We offer convenient weekend and evening slots matching USA (PST/EST), UK (GMT), Gulf (GST), and Australia (AEST) time zones."
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
    <div className="w-full h-full bg-[#080019] text-white flex flex-col font-sans overflow-hidden">
      {/* Top Main Navigation Bar on Mobile / Header */}
      {onBackToMain && (
        <div className="lg:hidden bg-[#16052F] border-b border-[#2b1050] px-4 py-3 flex items-center justify-between z-40">
          <button
            onClick={onBackToMain}
            className="flex items-center gap-1.5 text-xs text-purple-200 hover:text-white"
          >
            <ChevronLeft size={16} />
            <span>Back</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-[#9333ea] to-[#ec4899] flex items-center justify-center font-serif italic text-white text-xs font-bold">
              a
            </div>
            <span className="text-sm font-bold text-white">Artium Academy</span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DUAL PANEL LAYOUT: LEFT SIDEBAR (28%) & RIGHT CONTENT (72%)               */}
      {/* ========================================================================= */}
      <div className="app-dual-layout w-full flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* ========================================================================= */}
        {/* 1. LEFT SIDEBAR (28% desktop width, dark purple, independent scroll)      */}
        {/* ========================================================================= */}
        <aside
          id="left-form-sidebar"
          className="sidebar-panel w-full lg:w-[28%] lg:max-w-[28%] lg:h-full lg:max-h-full overflow-y-auto overflow-x-hidden shrink-0 overscroll-contain min-h-0 sidebar-dark-scroll bg-[#16052F] text-white relative flex flex-col justify-between border-r border-[#261447] shadow-2xl z-30 font-sans"
        >
          {/* Subtle Darker Flowing Wave Accent at Top */}
          <div className="absolute top-0 left-0 right-0 h-44 overflow-hidden pointer-events-none opacity-30 z-0">
            <svg
              viewBox="0 0 500 200"
              preserveAspectRatio="none"
              className="w-full h-full object-cover"
            >
              <path
                d="M0,70 C150,150 300,10 500,90 L500,0 L0,0 Z"
                fill="url(#purpleWaveGradient)"
              />
              <defs>
                <linearGradient id="purpleWaveGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#3b0764" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#701a75" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="relative px-5 sm:px-6 md:px-7 pt-9 pb-8 flex flex-col flex-1 z-10">
            {/* Artium Academy Logo */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#9333ea] via-[#c026d3] to-[#ec4899] flex items-center justify-center shadow-md">
                <span className="font-serif italic font-black text-white text-lg leading-none select-none">
                  a
                </span>
              </div>
              <div className="flex flex-col text-left leading-[1.05]">
                <span className="text-[17px] font-extrabold tracking-tight text-white font-sans">
                  artium
                </span>
                <span className="text-[11px] font-medium tracking-normal text-white font-sans">
                  academy
                </span>
              </div>
            </div>

            {/* Trial Headline */}
            <div className="text-center mb-2">
              <h1 className="text-[22px] sm:text-[24px] lg:text-[26px] font-bold text-[#F47BC5] leading-tight tracking-tight">
                Book Your Free 1:1 Trial Class
              </h1>
            </div>

            {/* Limited Slot Notification Banner */}
            <div className="mb-4 py-1.5 px-3 rounded-xl bg-[#1f0a3d] border border-[#FFD66B]/60 flex items-center justify-center gap-2 text-center shadow-xs">
              <div className="w-4 h-4 rounded-full border border-[#FFD66B] flex items-center justify-center text-[#FFD66B] text-[10px] font-bold shrink-0 leading-none">
                !
              </div>
              <span className="text-[13px] sm:text-[14px] text-[#FFD66B] font-medium tracking-tight truncate">
                Only 5 demo slots left today
              </span>
            </div>

            {/* Form */}
            {!isSubmitted ? (
              <form onSubmit={handleFormSubmit} className="space-y-3.5">
                {/* Student Name */}
                <div>
                  <label className="block text-[14px] font-semibold text-[#E7E5EA] mb-1 text-left">
                    Student Name
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Enter the student's name"
                    className="w-full h-11 px-3.5 rounded-lg bg-[#1A1529] border border-[#4A4554] text-white placeholder-[#B8B4BE] text-sm focus:outline-none focus:border-[#F47BC5] transition-all"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-[14px] font-semibold text-[#E7E5EA] mb-1 text-left">
                    Phone Number
                  </label>
                  <div className="flex gap-2">
                    <div className="relative w-24 shrink-0">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="w-full h-11 px-2.5 pr-7 rounded-lg bg-[#1A1529] border border-[#4A4554] text-[#E7E5EA] text-sm font-medium focus:outline-none focus:border-[#F47BC5] transition-all appearance-none cursor-pointer"
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.code} value={c.code} className="bg-[#1A1529] text-white">
                            {c.code}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={14}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#B8B4BE] pointer-events-none"
                      />
                    </div>
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Enter WhatsApp number"
                      className="flex-1 h-11 px-3.5 rounded-lg bg-[#1A1529] border border-[#4A4554] text-white placeholder-[#B8B4BE] text-sm focus:outline-none focus:border-[#F47BC5] transition-all"
                    />
                  </div>
                </div>

                {/* Email (optional) */}
                <div>
                  <label className="block text-[14px] mb-1 text-left">
                    <span className="font-semibold text-[#E7E5EA]">Email</span>{" "}
                    <span className="font-normal text-[#B8B4BE]">(optional)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full h-11 px-3.5 rounded-lg bg-[#1A1529] border border-[#4A4554] text-white placeholder-[#B8B4BE] text-sm focus:outline-none focus:border-[#F47BC5] transition-all"
                  />
                </div>

                {/* Select Age Group */}
                <div>
                  <label className="block text-[14px] font-semibold text-[#E7E5EA] mb-1 text-left">
                    Select Age Group
                  </label>
                  <div className="flex items-center justify-between gap-1.5 w-full">
                    {AGE_GROUPS.map((age) => (
                      <button
                        key={age}
                        type="button"
                        onClick={() => setSelectedAge(age)}
                        className={`h-9 flex-1 rounded-lg text-xs font-semibold transition-all flex items-center justify-center cursor-pointer border ${
                          selectedAge === age
                            ? "bg-[#251d3b] text-white border-[#F47BC5] shadow-xs"
                            : "bg-[#1A1529] text-[#E7E5EA] border-[#4A4554] hover:border-[#716a80]"
                        }`}
                      >
                        {age}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Select Course */}
                <div>
                  <label className="block text-[14px] font-semibold text-[#E7E5EA] mb-1 text-left">
                    Select Course
                  </label>
                  <div className="relative">
                    <select
                      value={selectedCourseId}
                      onChange={(e) => {
                        setSelectedCourseId(e.target.value);
                        setActiveTabId(e.target.value);
                      }}
                      className="w-full h-11 px-3.5 pr-8 rounded-lg bg-[#1A1529] border border-[#4A4554] text-[#E7E5EA] text-sm font-medium focus:outline-none focus:border-[#F47BC5] transition-all appearance-none cursor-pointer truncate"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.id} className="bg-[#1A1529] text-white">
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B8B4BE] pointer-events-none"
                    />
                  </div>
                </div>

                {/* Referral Code Link */}
                <div className="text-center pt-1">
                  <p className="text-[13px] text-[#B8B4BE]">
                    If you have a referral code then please{" "}
                    <button
                      type="button"
                      onClick={() => {
                        const code = prompt("Enter Referral / Coupon Code:");
                        if (code) alert(`Referral code "${code}" applied successfully!`);
                      }}
                      className="text-[#F47BC5] underline hover:text-[#ff9cd6] font-medium transition-colors cursor-pointer"
                    >
                      click here
                    </button>
                  </p>
                </div>

                {/* Submit CTA Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-full bg-[#A6A6A6] hover:bg-[#b5b5b5] text-white font-bold text-base tracking-normal transition-all flex items-center justify-center cursor-pointer shadow-md active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>Book Your Free Trial</span>
                  )}
                </button>

                {/* Already Registered Link */}
                <div className="text-center pt-0.5">
                  <p className="text-[13px] text-white font-medium">
                    Already registered?{" "}
                    <button
                      type="button"
                      onClick={() => alert("Redirecting to Artium Student Login...")}
                      className="text-[#F47BC5] underline hover:text-[#ff9cd6] font-medium transition-colors cursor-pointer"
                    >
                      Login here
                    </button>
                  </p>
                </div>

                {/* Trust Review Rating Badges */}
                <div className="flex items-center justify-center gap-3 pt-2">
                  {/* Google Rating Badge */}
                  <div className="px-3.5 py-1.5 rounded-full border border-[#00E676] bg-[#0c1626]/60 flex items-center justify-center gap-1.5 text-white font-semibold text-xs shrink-0">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    <span>4.8</span>
                    <span className="text-[#FBBC05] text-xs leading-none">★</span>
                  </div>

                  {/* Trustpilot Rating Badge */}
                  <div className="px-3.5 py-1.5 rounded-full border border-[#00E676] bg-[#0c1c20]/60 flex items-center justify-center gap-1.5 text-white font-semibold text-xs shrink-0">
                    <svg className="w-3.5 h-3.5 fill-[#00E676]" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span>Trustpilot : 4.7</span>
                  </div>
                </div>

                {/* Terms and Conditions Footer */}
                <div className="text-center pt-2">
                  <p className="text-[12px] text-[#B8B4BE]">
                    Continue and agree to{" "}
                    <button
                      type="button"
                      onClick={() => alert("Artium Academy Terms & Conditions")}
                      className="underline text-[#B8B4BE] hover:text-white transition-colors cursor-pointer"
                    >
                      Terms & Conditions
                    </button>
                  </p>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center bg-[#1A1529]/90 rounded-2xl p-6 border border-[#4A4554]"
              >
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 size={26} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Demo Session Reserved!</h3>
                <p className="text-xs text-purple-200 leading-relaxed mb-4">
                  Thank you <span className="font-semibold text-white">{studentName}</span>. Your 1:1 Free Trial Class for{" "}
                  <span className="text-[#F47BC5] font-semibold">{currentCategory.name}</span> has been confirmed. Our team will share your live video link & WhatsApp reminder shortly to {countryCode} {phoneNumber}.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="w-full py-2 bg-purple-900/60 hover:bg-purple-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Book Another Demo
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
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-6 sm:pt-7 pb-12 flex flex-col">
            
            {/* ========================================================================= */}
            {/* SECTION 3: RIGHT HERO HEADER                                              */}
            {/* ========================================================================= */}
            <div className="text-center w-full max-w-4xl mx-auto mb-4 sm:mb-5">
              <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-bold text-neutral-900 tracking-tight leading-[1.2] text-center whitespace-normal md:whitespace-nowrap">
                Online Music Courses Curated By Maestros
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
            <div className="relative w-full rounded-[22px] sm:rounded-[24px] overflow-hidden bg-neutral-950 shadow-xl border border-zinc-200 group mb-14">
              <div className="relative aspect-[16/9] sm:aspect-[21/10] md:aspect-[16/8.5] w-full overflow-hidden flex items-center justify-center bg-zinc-900">
                {isHeroVideoPlaying ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${currentCategory.youtubeId}?autoplay=1&rel=0`}
                    title={`${currentCategory.name} Artium Academy Masterclass`}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <>
                    {/* Hero Thumbnail for Active Category */}
                    <img
                      src={currentCategory.image}
                      alt={`${currentCategory.maestro} ${currentCategory.name} Masterclass`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                    />

                    {/* Realistic Sofa & Maestro Decorative Overlay */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.2) 100%), url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1600&q=80')`,
                        backgroundBlendMode: "multiply",
                        opacity: 0.12
                      }}
                    />

                    {/* Top Badges (Classical + Curated by Maestro) */}
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

            {/* ========================================================================= */}
            {/* SECTION 6: WORLD CLASS MUSIC EDUCATORS (3 Female Teachers in Uniform)     */}
            {/* ========================================================================= */}
            <div className="text-center pt-2">
              <h3 className="text-[26px] sm:text-[30px] font-bold text-neutral-900 tracking-tight">
                World Class Music Educators
              </h3>
              <p className="text-[14px] sm:text-[15px] text-zinc-600 mt-1">
                Learn 1:1 online music from certified music teachers - personalized for you
              </p>

              {/* 3 Specs & Lens Group Composition with bottom fade */}
              <div className="relative max-w-[340px] sm:max-w-[420px] mx-auto mt-6">
                <div className="relative flex items-end justify-center">
                  {/* Left Specs / Optical Frame */}
                  <div className="w-[120px] sm:w-[145px] -mr-5 z-10 transition-transform duration-300 hover:scale-105 hover:z-30">
                    <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-md border border-purple-200/80 bg-zinc-100">
                      <img
                        src="/assets/img/Ray-Ban.jpg"
                        alt="Premium Designer Spectacles"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to high-res optical specs image if needed
                          e.currentTarget.src = "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=500&q=80";
                        }}
                      />
                    </div>
                  </div>

                  {/* Center Optical Precision Lens / Specs (Standing in front) */}
                  <div className="w-[140px] sm:w-[170px] z-20 transition-transform duration-300 hover:scale-105">
                    <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border-2 border-purple-300 bg-white">
                      <img
                        src="/assets/img/bluelens.jpg"
                        alt="Blue Cut Anti-Glare Precision Lens"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/assets/img/lens.jpg";
                        }}
                      />
                    </div>
                  </div>

                  {/* Right Luxury Frame / Specs */}
                  <div className="w-[120px] sm:w-[145px] -ml-5 z-10 transition-transform duration-300 hover:scale-105 hover:z-30">
                    <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-md border border-purple-200/80 bg-zinc-100">
                      <img
                        src="/assets/img/Oakley.jpg"
                        alt="Aero Titanium Optical Specs"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=500&q=80";
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom White Gradient Fade */}
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white via-white/70 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* ========================================================================= */}
            {/* SECTION 7: STATISTICS CARDS (4 in one row, light lavender bg, short)      */}
            {/* ========================================================================= */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
              {STATS.map((st) => (
                <div
                  key={st.value}
                  className="bg-[#F8F6FD] border border-[#EDE8F8] rounded-lg p-3 sm:p-3.5 flex flex-col items-center justify-center text-center h-[76px] sm:h-[82px] shadow-2xs hover:shadow-xs transition-shadow"
                >
                  <span className="text-[20px] sm:text-[22px] font-bold text-[#FF1375] leading-none mb-1">
                    {st.value}
                  </span>
                  <span className="text-[11px] sm:text-[12px] font-medium text-zinc-800 leading-tight">
                    {st.label}
                  </span>
                </div>
              ))}
            </div>

            {/* ========================================================================= */}
            {/* SECTION 8: WHY CHOOSE ARTIUM ACADEMY? (Dark charcoal-purple #39364B)     */}
            {/* ========================================================================= */}
            <div className="bg-[#39364B] rounded-2xl p-6 sm:p-8 md:p-10 text-white text-center shadow-lg">
              <h3 className="text-[24px] sm:text-[28px] font-bold text-white tracking-tight">
                Why Choose Artium Academy?
              </h3>
              <p className="text-[13px] sm:text-[14px] text-zinc-300 mt-1 mb-8">
                Online music lessons delivered through advanced cutting-edge technology
              </p>

              {/* 3 Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
                {/* Card 1: AI Smart Glasses & Precision Specs */}
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
                    Live 1:1 Personalized Music Lessons
                  </h4>
                  <p className="text-[12px] text-zinc-600 leading-relaxed">
                    Online music lessons from experienced teachers, tailored to your unique needs.
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
                    Globally Recognised Music Programme
                  </h4>
                  <p className="text-[12px] text-zinc-600 leading-relaxed">
                    Certifications aligned with Trinity, ABRSM, RSL, Gandharva Mahavidyalaya & Kalakshetra.
                  </p>
                </div>

                {/* Card 3: AI Smart Specs & Precision Engineering */}
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
                    Structured Curriculum
                  </h4>
                  <p className="text-[12px] text-zinc-600 leading-relaxed">
                    Developed by our music maestros, bringing decades of experience directly to your screen.
                  </p>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* SECTION 9: OUR HAPPY LEARNERS (Horizontal Sliding Carousel)               */}
            {/* ========================================================================= */}
            <div className="text-center pt-2">
              <h3 className="text-[26px] sm:text-[30px] font-bold text-neutral-900 tracking-tight mb-6">
                Our Happy Learners
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
                                onClick={() => setActiveVideoUrl(item.videoId || "q76bS241VnY")}
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
                              alt={`${item.name} Music Learner`}
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
            </div>

            {/* ========================================================================= */}
            {/* SECTION 10: THE ARTIUM EDGE (3 Cards: Originals, Masterclass, Superstar) */}
            {/* ========================================================================= */}
            <div className="pt-2">
              <div className="text-center max-w-2xl mx-auto mb-6">
                <h3 className="text-[26px] sm:text-[30px] font-bold text-neutral-900 tracking-tight">
                  The Artium Edge
                </h3>
                <p className="text-[13px] sm:text-[14px] text-zinc-600 mt-1">
                  Artium learners get exclusive perks, like creating their own Artium Originals and showcasing their musical talent in front of our Maestros.
                </p>
              </div>

              {/* 3 Edge Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Card 1: Artium Originals */}
                <div className="bg-[#FAF8FF] border border-[#EDE8F8] rounded-xl overflow-hidden shadow-2xs hover:shadow-xs transition-all flex flex-col">
                  <div className="relative h-40 bg-zinc-900 group">
                    <img
                      src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=400&q=80"
                      alt="Artium Originals Music Release"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => setActiveVideoUrl("sWqG2V0gBzg")}
                        className="w-10 h-10 rounded-full border-2 border-white bg-black/40 hover:bg-[#FF1375] text-white flex items-center justify-center shadow-md transition-transform hover:scale-110 cursor-pointer"
                        aria-label="Play Artium Originals Trailer"
                      >
                        <Play size={16} className="fill-white text-white ml-0.5" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h4 className="text-[16px] font-bold text-zinc-900 mb-1">Artium Originals</h4>
                    <p className="text-[12px] text-zinc-600 leading-relaxed">
                      Career launch-pad for our music learners in association with Warner Music.
                    </p>
                  </div>
                </div>

                {/* Card 2: Artium Masterclass */}
                <div className="bg-[#FAF8FF] border border-[#EDE8F8] rounded-xl overflow-hidden shadow-2xs hover:shadow-xs transition-all flex flex-col">
                  <div className="relative h-40 bg-zinc-900 group">
                    <img
                      src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80"
                      alt="Artium Live Masterclass with Legends"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => setActiveVideoUrl("DXKwrfpX1bw")}
                        className="w-10 h-10 rounded-full border-2 border-white bg-black/40 hover:bg-[#FF1375] text-white flex items-center justify-center shadow-md transition-transform hover:scale-110 cursor-pointer"
                        aria-label="Play Masterclass Preview"
                      >
                        <Play size={16} className="fill-white text-white ml-0.5" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h4 className="text-[16px] font-bold text-zinc-900 mb-1">Artium Masterclass</h4>
                    <p className="text-[12px] text-zinc-600 leading-relaxed">
                      Free live & interactive masterclass with music maestros for our learners.
                    </p>
                  </div>
                </div>

                {/* Card 3: Artium Superstar */}
                <div className="bg-[#FAF8FF] border border-[#EDE8F8] rounded-xl overflow-hidden shadow-2xs hover:shadow-xs transition-all flex flex-col">
                  <div className="relative h-40 bg-zinc-900 group">
                    <img
                      src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=400&q=80"
                      alt="Artium Superstar National Music Talent Hunt"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => setActiveVideoUrl("4_o_Dk_KxEQ")}
                        className="w-10 h-10 rounded-full border-2 border-white bg-black/40 hover:bg-[#FF1375] text-white flex items-center justify-center shadow-md transition-transform hover:scale-110 cursor-pointer"
                        aria-label="Play Superstar Video"
                      >
                        <Play size={16} className="fill-white text-white ml-0.5" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h4 className="text-[16px] font-bold text-zinc-900 mb-1">Artium Superstar</h4>
                    <p className="text-[12px] text-zinc-600 leading-relaxed">
                      Opportunity to perform in the biggest music talent hunt.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* SECTION 12: FREQUENTLY ASKED QUESTIONS (Dark Purple #292637 / #302D40)   */}
            {/* ========================================================================= */}
            <div className="bg-[#292637] rounded-2xl p-6 sm:p-8 text-white shadow-xl">
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
            </div>

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
                title="Artium Academy Video Showcase"
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
