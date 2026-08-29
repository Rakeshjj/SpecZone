import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import confetti from "canvas-confetti";
import { 
  Sparkles, 
  ChevronDown, 
  User, 
  Mail,
  Phone,
  MapPin,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck, 
  Eye,
  Layers,
  Sparkle,
  ChevronRight,
  ChevronLeft
} from "lucide-react";

interface HomeEyeCareProps {
  onClose?: () => void;
  initialNotes?: string;
  initialType?: string;
}

export type ServiceOption = "Home Eye Care Check" | "Transform Look";

export const SERVICE_CONFIG: Record<
  ServiceOption,
  {
    track: "HEC" | "TYL";
    heading: string;
    description: string;
    buttonText: string;
  }
> = {
  "Home Eye Care Check": {
    track: "HEC",
    heading: "Book Home Eye Care",
    description: "Enter your details below for doorstep eye checkup & free trials.",
    buttonText: "Book Home Eye Care Visit",
  },
  "Transform Look": {
    track: "TYL",
    heading: "Transform Your Look",
    description: "Enter your details below to begin your personalized style transformation.",
    buttonText: "Book Transform Look",
  },
};

export interface ShowcaseItem {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
}

export const SHOWCASE_DATA: Record<"HEC" | "TYL", ShowcaseItem[]> = {
  HEC: [
    {
      id: 1,
      badge: "Stage 01 • Diagnostics",
      title: "Comprehensive Vision & Health Assessment",
      subtitle: "Precision Ophthalmic Screening",
      description: "State-of-the-art diagnostic profiling and computerized digital refraction analysis performed in the comfort of your home.",
      image: "/assets/img/modernoptical.jpeg",
      features: ["Digital Retinal Scan", "Keratometry & Glaucoma Check", "Custom Prescription Mapping"]
    },
    {
      id: 2,
      badge: "Stage 02 • Calibration",
      title: "Precision Lens Crafting & Customization",
      subtitle: "Zeiss & Essilor Optical Engineering",
      description: "Customized multi-focal and blue-light filtration lenses digitally surfaced and coated with anti-reflective nanotech layers.",
      image: "/assets/img/lens2.jpg",
      features: ["Blue-violet Light Protection", "Anti-Scratch Nano Armor", "Harmonized Peripheral Geometry"]
    },
    {
      id: 3,
      badge: "Stage 03 • Fitting & Delivery",
      title: "Doorstep White Glove Delivery & Fit",
      subtitle: "Bespoke Anatomical Adjustment",
      description: "Our certified vision specialist arrives at your residence to conduct anatomical bridge tuning, pantoscopic tilt adjustment, and comfort testing.",
      image: "/assets/img/premiumopticall.jpeg",
      features: ["Ergonomic Nosepad Fitting", "Temple Tension Calibration", "365-Day Vision Care Warranty"]
    }
  ],
  TYL: [
    {
      id: 1,
      badge: "Stage 01 • Geometry",
      title: "Facial Architecture & Style Curating",
      subtitle: "AI-Powered Aesthetic Profiling",
      description: "High-resolution facial topology scan analyzing cheekbone elevation, interpupillary distance, and cranial symmetry.",
      image: "/assets/img/Rayban meta.png",
      features: ["Facial Contour Mapping", "Color Palette Resonance", "Signature Frame Recommendation"]
    },
    {
      id: 2,
      badge: "Stage 02 • Virtual Simulation",
      title: "3D Augmented Reality Projection",
      subtitle: "Real-Time Volumetric Try-On",
      description: "Immersive AR simulation enabling you to inspect luxury designer frames with real-world ray-traced reflections and lighting.",
      image: "/assets/img/oakley meta.jpeg",
      features: ["Sub-Millimeter Frame Scaling", "Dynamic Light Refraction", "Side-by-Side Look Comparison"]
    },
    {
      id: 3,
      badge: "Stage 03 • Final Order",
      title: "Bespoke Handcrafted Curation & Checkout",
      subtitle: "Personalized Luxury Delivery",
      description: "Your selected luxury frames are tailored with custom lenses, engraved with your monogram, and dispatched in presentation packaging.",
      image: "/assets/img/vintageopticals2.jpeg",
      features: ["Engraved Hardcase", "Microfiber Lens Polisher", "Express Doorstep Delivery"]
    }
  ]
};

// Slide animation variants (Vertical Y-axis transitions)
const slideVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    y: "0%",
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: (direction: number) => ({
    y: direction > 0 ? "-100%" : "100%",
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function HomeEyeCare({ onClose, initialType = "Home Eye Care Check" }: HomeEyeCareProps) {
  const [selectedService, setSelectedService] = useState<ServiceOption>(() => {
    if (initialType?.toLowerCase().includes("transform") || initialType === "TYL" || initialType === "Transform Look") {
      return "Transform Look";
    }
    return "Home Eye Care Check";
  });

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: ""
  });

  const [stepState, setStepState] = useState<{ step: number; direction: number }>({
    step: 1,
    direction: 1,
  });
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  const activeStep = stepState.step;
  const direction = stepState.direction;

  const experiencePanelRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const activeStepRef = useRef<number>(activeStep);

  // Keep activeStepRef in sync with state
  useEffect(() => {
    activeStepRef.current = activeStep;
  }, [activeStep]);

  // Synchronize stages with natural page scroll progress
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isAutoPlaying) return;
    let targetStep = 1;
    if (latest >= 0.66) {
      targetStep = 3;
    } else if (latest >= 0.33) {
      targetStep = 2;
    } else {
      targetStep = 1;
    }

    setStepState((prev) => {
      if (prev.step === targetStep) return prev;
      return {
        step: targetStep,
        direction: targetStep > prev.step ? 1 : -1,
      };
    });
  });

  // Sync initial type prop
  useEffect(() => {
    if (initialType?.toLowerCase().includes("transform") || initialType === "TYL" || initialType === "Transform Look") {
      setSelectedService("Transform Look");
    } else if (initialType?.toLowerCase().includes("home") || initialType === "HEC") {
      setSelectedService("Home Eye Care Check");
    }
  }, [initialType]);

  const selectedTrack = SERVICE_CONFIG[selectedService].track;
  const items = SHOWCASE_DATA[selectedTrack];

  // Handle auto playback when submitted or timeline re-animated
  const runSequence = () => {
    if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    setIsAutoPlaying(true);
    setStepState({ step: 1, direction: 1 });

    let step = 1;
    autoPlayTimerRef.current = setInterval(() => {
      step++;
      if (step > 3) {
        if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
        setIsAutoPlaying(false);
      } else {
        setStepState({ step, direction: 1 });
      }
    }, 1400);
  };

  useEffect(() => {
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, []);

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newService = e.target.value as ServiceOption;
    setSelectedService(newService);
    setStepState({ step: 1, direction: 1 });
    setIsSuccess(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    runSequence();

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#6366f1", "#4f46e5", "#8b5cf6", "#a855f7"]
      });
    } catch (err) {
      console.warn("Confetti failed", err);
    }
  };

  const handleSelectStepManually = (stepNum: number) => {
    setIsAutoPlaying(false);
    if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    const current = activeStepRef.current;
    if (current === stepNum) return;
    
    setStepState({
      step: stepNum,
      direction: stepNum >= current ? 1 : -1,
    });

    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const start = scrollTop + rect.top;
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable > 0) {
        const fraction = stepNum === 1 ? 0.05 : stepNum === 2 ? 0.48 : 0.85;
        window.scrollTo({
          top: start + totalScrollable * fraction,
          behavior: "smooth"
        });
      }
    }
  };

  const activeItem = items[activeStep - 1] || items[0];
  const activeConfig = SERVICE_CONFIG[selectedService];

  return (
    <div 
      ref={wrapperRef}
      id="home-eye-care-scroll-wrapper"
      className="relative w-full h-[280vh] selection:bg-indigo-500 selection:text-white"
    >
      <div className="sticky top-[86px] sm:top-[92px] w-full flex flex-col justify-start pt-2 pb-6">
        {/* SINGLE UNIFIED CONTAINER CONNECTING FORM + EXPERIENCE */}
        <main className="w-full max-w-7xl mx-auto bg-slate-900/90 backdrop-blur-2xl border border-slate-800/90 rounded-2xl sm:rounded-3xl shadow-2xl shadow-indigo-950/40 overflow-hidden flex flex-col lg:flex-row gap-0 p-0 m-0 min-h-[540px] lg:h-[calc(100vh-175px)] lg:max-h-[740px]">
        
        {/* =========================================================================
            LEFT PANEL — STATIONARY FORM (NO SCROLLBAR, OVERFLOW HIDDEN, RESPONSIVELY COMPACT)
           ========================================================================= */}
        <section 
          id="booking-form-panel"
          className="w-full lg:w-[35%] xl:w-[32%] shrink-0 h-full border-b lg:border-b-0 lg:border-r border-slate-800/90 bg-slate-950/60 p-4 sm:p-5 flex flex-col justify-between overflow-hidden relative z-20 m-0"
        >
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            <div>
              {/* Dynamic Centered Heading & Full Subtitle */}
              <motion.div
                key={selectedService}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="mb-3 text-center"
              >
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1 leading-snug">
                  {activeConfig.heading}
                </h1>
                <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed max-w-sm mx-auto">
                  {activeConfig.description}
                </p>
              </motion.div>

              {/* Single Unified Form with Compact Dynamic Fields */}
              <form onSubmit={handleSubmit} className="space-y-2">
                {/* 1. FULL NAME */}
                <div className="space-y-0.5">
                  <label 
                    htmlFor="fullName" 
                    className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider"
                  >
                    FULL NAME *
                  </label>
                  <div className="relative">
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-slate-950/90 border border-slate-700/80 text-slate-100 text-xs rounded-lg px-3 py-1.5 pr-8 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600 font-medium"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-slate-500">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* 2. EMAIL ADDRESS */}
                <div className="space-y-0.5">
                  <label 
                    htmlFor="email" 
                    className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider"
                  >
                    EMAIL ADDRESS *
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. rahul@example.com"
                      className="w-full bg-slate-950/90 border border-slate-700/80 text-slate-100 text-xs rounded-lg px-3 py-1.5 pr-8 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600 font-medium"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-slate-500">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* 3. PHONE NUMBER */}
                <div className="space-y-0.5">
                  <label 
                    htmlFor="phone" 
                    className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider"
                  >
                    PHONE NUMBER *
                  </label>
                  <div className="relative">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 98404 00561"
                      className="w-full bg-slate-950/90 border border-slate-700/80 text-slate-100 text-xs rounded-lg px-3 py-1.5 pr-8 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600 font-medium"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-slate-500">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* 4. DOORSTEP ADDRESS */}
                <div className="space-y-0.5">
                  <label 
                    htmlFor="address" 
                    className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider"
                  >
                    DOORSTEP ADDRESS *
                  </label>
                  <div className="relative">
                    <textarea
                      id="address"
                      name="address"
                      required
                      rows={2}
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="e.g. Flat 302, Green Avenue, Avadi, Chennai - 600054"
                      className="w-full bg-slate-950/90 border border-slate-700/80 text-slate-100 text-xs rounded-lg px-3 py-1.5 pr-8 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600 font-medium resize-none"
                    />
                    <div className="absolute top-2 right-2.5 pointer-events-none text-slate-500">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* 5. SELECT SERVICE DROPDOWN */}
                <div className="space-y-0.5">
                  <label 
                    htmlFor="service-select" 
                    className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider"
                  >
                    SELECT SERVICE
                  </label>
                  <div className="relative">
                    <select
                      id="service-select"
                      value={selectedService}
                      onChange={handleServiceChange}
                      className="w-full appearance-none bg-slate-950/90 border border-slate-700/80 text-slate-100 text-xs rounded-lg px-3 py-1.5 pr-8 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all cursor-pointer font-medium"
                    >
                      <option value="Home Eye Care Check">Home Eye Care Check</option>
                      <option value="Transform Look">Transform Look</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-slate-400">
                      <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Dynamic Submit Button */}
                <button
                  type="submit"
                  id="booking-submit-btn"
                  className="w-full mt-1 bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-semibold py-2 px-3.5 rounded-lg shadow-md shadow-indigo-600/30 transition-all duration-200 flex items-center justify-center gap-1.5 group active:scale-[0.99] cursor-pointer text-xs"
                >
                  <span>{activeConfig.buttonText}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </form>

              {/* Dynamic Success Card */}
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 p-2 rounded-lg bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-[11px] flex items-start gap-2 shadow-sm"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400 mt-0.5" />
                  <div>
                    <p className="font-semibold text-emerald-200 text-[11px]">
                      Confirmed for {formData.fullName || "Guest"}!
                    </p>
                    <p className="text-emerald-400/90 text-[10px]">
                      {selectedService} registered.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer Info */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-slate-400 text-[11px] mt-2">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[10px]">Real-time execution</span>
              </div>
              <div className="flex items-center gap-1 font-mono text-[10px] text-indigo-400 bg-indigo-950/50 px-1.5 py-0.5 rounded border border-indigo-500/20">
                <span>STAGE 0{activeStep}/03</span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            RIGHT PANEL — EXISTING ANIMATED EXPERIENCE (APPROX 65-68% WIDTH)
           ========================================================================= */}
        <section 
          id="experience-panel"
          className="w-full lg:w-[65%] xl:w-[68%] flex-1 h-full flex flex-col justify-between relative bg-slate-950/30 overflow-hidden m-0 p-0 select-none"
        >
          {/* TOP BAR / STAGE SELECTOR HEADER */}
          <div className="p-3 sm:p-3.5 md:p-4 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-2 bg-slate-950/60 shrink-0 m-0">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-sm">
                <Eye className="w-3.5 h-3.5" />
              </div>
              <div>
                <h2 className="text-xs font-bold text-white tracking-wide uppercase flex items-center gap-1.5">
                  Experience Preview
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </h2>
                <p className="text-slate-400 text-[10px]">Scroll or select stages to inspect details</p>
              </div>
            </div>


          </div>

          {/* MAIN INTERACTIVE VISUAL DISPLAY AREA */}
          <div className="flex-1 relative w-full h-full min-h-[260px] overflow-hidden bg-slate-950 flex flex-col justify-end group m-0 p-0">
            <AnimatePresence custom={direction} initial={false} mode="popLayout">
              <motion.div
                key={`${selectedTrack}-${activeItem.id}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 w-full h-full flex flex-col justify-end"
              >
                {/* Background Image */}
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Multi-gradient Backdrop Overlays for Maximum Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/30" />
                <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-slate-950/60 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-3 left-4 right-4 flex items-center justify-between z-10">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-indigo-500/30 text-indigo-300 text-[11px] font-semibold shadow-lg">
                    {activeItem.badge}
                  </span>

                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-slate-700 text-slate-300 text-[10px]">
                    <Layers className="w-3 h-3 text-indigo-400" />
                    <span>0{activeStep} of 03</span>
                  </div>
                </div>

                {/* Bottom Content Information Overlay */}
                <div className="relative z-10 p-4 sm:p-5 md:p-6">
                  <div className="flex items-center gap-1.5 mb-1 text-indigo-400 text-[11px] font-semibold tracking-wider uppercase">
                    <Sparkle className="w-3 h-3" />
                    <span>{activeItem.subtitle}</span>
                  </div>

                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight mb-1.5 leading-tight">
                    {activeItem.title}
                  </h3>

                  <p className="text-slate-300 text-xs leading-relaxed max-w-2xl mb-2.5 line-clamp-2 sm:line-clamp-3">
                    {activeItem.description}
                  </p>

                  {/* Interactive Feature Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {activeItem.features.map((feat, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-indigo-950/70 border border-indigo-500/25 text-indigo-200 text-[10px] font-medium backdrop-blur-sm shadow-sm"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* BOTTOM PROGRESS BAR & STAGE STEPPING BAR */}
          <div className="p-2.5 sm:p-3 border-t border-slate-800/80 bg-slate-950/60 flex items-center justify-between gap-3 shrink-0 m-0">
            <div className="flex-1 flex items-center gap-2.5">
              <div className="flex-1 h-1.5 bg-slate-800/90 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-indigo-500 via-indigo-400 to-violet-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.8)]"
                  initial={false}
                  animate={{ width: `${(activeStep / 3) * 100}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>

              <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                <span className="text-white font-bold">0{activeStep}</span>
                <span>/</span>
                <span>03</span>
              </div>
            </div>

            {/* Quick Next/Prev Step Controls */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={activeStep <= 1}
                onClick={() => handleSelectStepManually(activeStep - 1)}
                className="px-2 py-1 text-[11px] font-semibold rounded-md bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors flex items-center gap-0.5"
              >
                <ChevronLeft className="w-3 h-3" />
                <span>Prev</span>
              </button>
              <button
                type="button"
                disabled={activeStep >= 3}
                onClick={() => handleSelectStepManually(activeStep + 1)}
                className="px-2 py-1 text-[11px] font-semibold rounded-md bg-indigo-600/30 border border-indigo-500/40 text-indigo-200 hover:bg-indigo-600/50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors flex items-center gap-0.5"
              >
                <span>Next</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </section>

      </main>
      </div>
    </div>
  );
}
