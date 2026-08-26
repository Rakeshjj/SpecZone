import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { 
  Sparkles, 
  ChevronDown, 
  UserCheck, 
  Play, 
  ShieldCheck, 
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Eye,
  Layers,
  Sparkle
} from "lucide-react";

interface HomeEyeCareProps {
  onClose?: () => void;
  initialNotes?: string;
  initialType?: string;
}

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

// Premium slide animation variants (Right -> Left on scroll forward, Left -> Right on scroll backward)
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: "0%",
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
    scale: 0.96,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function HomeEyeCare({ onClose, initialType = "HEC" }: HomeEyeCareProps) {
  const [selectedTrack, setSelectedTrack] = useState<"HEC" | "TYL">(
    initialType?.toLowerCase().includes("transform") || initialType === "TYL" ? "TYL" : "HEC"
  );
  const [custRefId, setCustRefId] = useState("CUST-98420");
  const [stepState, setStepState] = useState<{ step: number; direction: number }>({
    step: 1,
    direction: 1,
  });
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  const activeStep = stepState.step;
  const direction = stepState.direction;

  const containerRef = useRef<HTMLDivElement>(null);
  const stepTriggerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync initial type prop
  useEffect(() => {
    if (initialType?.toLowerCase().includes("transform") || initialType === "TYL") {
      setSelectedTrack("TYL");
    }
  }, [initialType]);

  const items = SHOWCASE_DATA[selectedTrack];

  // Scroll detection with Intersection Observer
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stepTriggerRefs.current.forEach((el, index) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isAutoPlaying) {
              const newStep = index + 1;
              setStepState((prev) => {
                if (prev.step === newStep) return prev;
                return {
                  step: newStep,
                  direction: newStep > prev.step ? 1 : -1,
                };
              });
            }
          });
        },
        {
          root: null,
          rootMargin: "-25% 0px -40% 0px",
          threshold: 0.2
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [selectedTrack, isAutoPlaying]);

  // Handle auto playback when Re-animate Timeline or Submit is pressed
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
        // Scroll the trigger into view smoothly if applicable
        const targetEl = stepTriggerRefs.current[step - 1];
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    }, 1400);
  };

  useEffect(() => {
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, []);

  const handleTrackChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value as "HEC" | "TYL";
    setSelectedTrack(val);
    setStepState({ step: 1, direction: 1 });
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
    setStepState((prev) => ({
      step: stepNum,
      direction: stepNum >= prev.step ? 1 : -1,
    }));
    const targetEl = stepTriggerRefs.current[stepNum - 1];
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const activeItem = items[activeStep - 1] || items[0];

  return (
    <section 
      id="home-eye-care"
      ref={containerRef}
      className="text-slate-100 font-sans min-h-screen py-10 px-4 md:px-8 relative antialiased selection:bg-indigo-500 selection:text-white"
    >
      {/* BACKGROUND GLOW EFFECTS */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* MAIN CONTAINER: TWO COLUMN LAYOUT */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">

        {/* LEFT COLUMN: SERVICE REQUEST FORM (STICKY ON DESKTOP - DO NOT CHANGE) */}
        <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28 z-20">
          <div className="bg-slate-900/80 backdrop-blur-2xl border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-indigo-950/30 flex flex-col justify-between">
            <div>
              {/* Header & Back Action */}
              <div className="flex items-center justify-between mb-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" /> Workflow Manager
                </div>

                {onClose && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-indigo-400 text-xs font-medium transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">Service Request</h1>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Select your service package to initiate the 5-stage sequential roadmap.
              </p>

              <form onSubmit={handleSubmit}>
                {/* Dropdown Field */}
                <div className="space-y-2 mb-6">
                  <label htmlFor="track-select" className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Select Service Process
                  </label>
                  <div className="relative">
                    <select
                      id="track-select"
                      value={selectedTrack}
                      onChange={handleTrackChange}
                      className="w-full appearance-none bg-slate-950/80 border border-slate-700/80 text-slate-200 text-sm rounded-xl px-4 py-3.5 pr-10 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all cursor-pointer font-medium"
                    >
                      <option value="HEC">Health Evaluation Checkup (HEC)</option>
                      <option value="TYL">Try Your Look (TYL)</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Input Field */}
                <div className="space-y-2 mb-8">
                  <label htmlFor="cust-ref-input" className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Customer Reference ID
                  </label>
                  <div className="relative">
                    <input
                      id="cust-ref-input"
                      type="text"
                      value={custRefId}
                      onChange={(e) => setCustRefId(e.target.value)}
                      placeholder="e.g., CUST-98420"
                      className="w-full bg-slate-950/80 border border-slate-700/80 text-slate-200 text-sm rounded-xl px-4 py-3.5 pr-10 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600 font-medium"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-500">
                      <UserCheck className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  id="trigger-btn"
                  className="w-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-indigo-600/30 transition-all duration-200 flex items-center justify-center gap-2 group active:scale-[0.99] cursor-pointer"
                >
                  <span>Re-animate Timeline</span>
                  <Play className="w-4 h-4 transition-transform group-hover:translate-x-0.5 fill-white" />
                </button>
              </form>

              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2.5 shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Workflow request for <strong>{custRefId}</strong> initialized successfully!</span>
                </motion.div>
              )}
            </div>

            {/* Footer Info */}
            <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between text-slate-400 text-xs mt-8">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Dynamic real-time execution</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-indigo-400 bg-indigo-950/40 px-2.5 py-1 rounded-md border border-indigo-500/20">
                <span>STAGE 0{activeStep}/03</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SCROLL-BASED STICKY 3-IMAGE SHOWCASE */}
        <div className="lg:col-span-7 xl:col-span-8 relative">

          {/* STICKY IMAGE VIEWER CARD */}
          <div className="lg:sticky lg:top-28 z-10 w-full mb-8 lg:mb-0">
            <div className="bg-slate-900/80 backdrop-blur-2xl border border-slate-800/90 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-950/30">
              
              {/* STAGE HEADER WITH ACTIVE STEP CHIPS */}
              <div className="p-4 sm:p-6 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4 bg-slate-950/40">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Eye className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white tracking-wide uppercase flex items-center gap-2">
                      Experience Preview
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    </h2>
                    <p className="text-slate-400 text-xs">Scroll to navigate through stages</p>
                  </div>
                </div>

                {/* 3 Step Selectors */}
                <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-2xl border border-slate-800">
                  {items.map((it, idx) => {
                    const stepNum = idx + 1;
                    const isActive = activeStep === stepNum;
                    return (
                      <button
                        key={it.id}
                        type="button"
                        onClick={() => handleSelectStepManually(stepNum)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                          isActive 
                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/40 scale-105" 
                            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                        }`}
                      >
                        <span>0{stepNum}</span>
                        {isActive && <span className="hidden sm:inline text-[11px] opacity-90">Active</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ACTIVE IMAGE & CONTENT PRESENTATION */}
              <div className="p-6 sm:p-8">
                <div className="relative h-[320px] sm:h-[380px] md:h-[420px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/80 shadow-inner group">
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

                      {/* Multi-gradient Backdrop Overlays for High Legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-slate-950/30" />
                      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-slate-950/60 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                        <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-indigo-500/30 text-indigo-300 text-xs font-semibold shadow-lg">
                          {activeItem.badge}
                        </span>

                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-slate-300 text-xs">
                          <Layers className="w-3.5 h-3.5 text-indigo-400" />
                          <span>0{activeStep} of 03</span>
                        </div>
                      </div>

                      {/* Bottom Content Information Overlay */}
                      <div className="relative z-10 p-5 sm:p-7">
                        <div className="flex items-center gap-2 mb-1.5 text-indigo-400 text-xs font-semibold tracking-wider uppercase">
                          <Sparkle className="w-3.5 h-3.5" />
                          <span>{activeItem.subtitle}</span>
                        </div>

                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight mb-2 sm:mb-3 leading-tight">
                          {activeItem.title}
                        </h3>

                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl mb-4 line-clamp-3 sm:line-clamp-none">
                          {activeItem.description}
                        </p>

                        {/* Interactive Feature Tags */}
                        <div className="flex flex-wrap gap-2 pt-1">
                          {activeItem.features.map((feat, idx) => (
                            <span 
                              key={idx}
                              className="px-2.5 py-1 rounded-lg bg-indigo-950/60 border border-indigo-500/20 text-indigo-200 text-[11px] font-medium backdrop-blur-sm"
                            >
                              {feat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* BOTTOM PROGRESS TRACKER BAR */}
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-indigo-500 via-indigo-400 to-violet-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.8)]"
                      initial={false}
                      animate={{ width: `${(activeStep / 3) * 100}%` }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    <span className="text-white font-bold">0{activeStep}</span>
                    <span>/</span>
                    <span>03</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* INVISIBLE SCROLL TRIGGER OBSERVER TRACKS (DRIVES VERTICAL SCROLL TRANSITIONS WITHOUT DUPLICATE CARDS) */}
          <div className="relative w-full pointer-events-none" aria-hidden="true">
            {items.map((_, idx) => (
              <div
                key={`scroll-trigger-${idx}`}
                ref={(el) => { stepTriggerRefs.current[idx] = el; }}
                className="h-[75vh] w-full"
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
