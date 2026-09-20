import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Eye, ShieldCheck, Sun, Laptop, Droplets, Sparkles, Fingerprint, Shield } from "lucide-react";

// Apple-style cubic-bezier easing for smooth cinematic reveals
const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;

interface LensScenario {
  id: string;
  name: string;
  label: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  content?: React.ReactNode;
  badge: string;
  beforeLabel: string;
  afterLabel: string;
  bgImage: string;
  beforeClasses: string; // Tailored tailwind classes to simulate bad vision/glare
  afterClasses: string;
}

const LENS_SCENARIOS: LensScenario[] = [
  {
    id: "polarized",
    name: "POLARIZED ANTI-REFLECTIVE",
    label: "Antiglare",
    icon: <Sun size={15} />,
    title: "100% POLARIZED GLARE ELIMINATION",
    description: "Anti-reflective (AR) coatings are treatments that are applied to the surface of the lens of glasses that reduce glare and let in more light. By reducing reflections on both sides of the lenses, this coating can make night driving and screen use more comfortable. AR coatings work by applying very thin layers of metal oxides to the lens, increasing the amount of light transmitted. This helps support clearer vision in changing lighting conditions and reduces the visual distractions that can occur when bright light hits the lens.",
    badge: "ULTRA SUN SECURITY",
    beforeLabel: "Standard Lens (Blinded by Reflective Glare)",
    afterLabel: "Oculis Polarized (Zero-Reflection Contrast)",
    bgImage: "/assets/img/antiglare.jpg",
    beforeClasses: "brightness-[1.3] saturate-[0.6] blur-[2px] contrast-[0.9]", // washed out & glaring
    afterClasses: "brightness-100 saturate-100 blur-0 contrast-105"
  },
  {
    id: "waterrepelant",
    name: "HYDROPHOBIC WATER-REPELLENT",
    label: "Water Repellent",
    icon: <Droplets size={15} />,
    title: "Hydrophobic Water-Resistant Coating",
    description: "Features a microscopic hydrophobic top-coat that changes surface tension, forcing water to bead up and roll off instantly. Prevents rain smears, reduces smudge buildup, and makes cleaning effortless.",
    badge: "HYDROPHOBIC SHIELD",
    beforeLabel: "Untreated Lens (Blinding Film & Rain Smears)",
    afterLabel: "Hydrophobic Coating (Instant Water Roll-Off)",
    bgImage: "/assets/img/water-repellent.jpg",
    beforeClasses: "blur-[5px] contrast-[0.85] saturate-[0.9]", // water distorted & smudged
    afterClasses: "blur-0 contrast-100 saturate-100",
    content: (
      <div className="space-y-4">
        {/* Hydrophobic Treated Section */}
        <div className="space-y-2.5">
          <div className="flex items-start gap-2.5 text-zinc-300">
            <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
            <p className="font-sans text-sm leading-relaxed font-light">
              <strong className="text-white font-medium">How they work:</strong> Features a microscopic hydrophobic top-coat that changes surface tension, forcing water to bead up and roll off instantly.
            </p>
          </div>

          <div className="flex items-start gap-2.5 text-zinc-300">
            <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
            <p className="font-sans text-sm leading-relaxed font-light">
              <strong className="text-white font-medium">Benefits:</strong> Prevents rain smears, reduces smudge buildup, and makes cleaning easier. Options like Glasses Direct provide these multi-layer treatments for everyday frames.
            </p>
          </div>
        </div>

        {/* Glasses Without Water-Resistant Coatings */}
        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-2.5">
          <h4 className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">
            Glasses Without Water-Resistant Coatings
          </h4>
          <div className="space-y-2 text-xs text-zinc-400">
            <div className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-zinc-600 mt-1.5 shrink-0" />
              <p className="leading-relaxed">
                <strong className="text-zinc-200 font-medium">How they work:</strong> Standard untreated glass or plastic surfaces attract water via normal adhesion.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-zinc-600 mt-1.5 shrink-0" />
              <p className="leading-relaxed">
                <strong className="text-zinc-200 font-medium">Drawbacks:</strong> Rainwater flattens into a continuous, blinding film or stubborn droplets that distort sight and require constant manual wiping.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-zinc-600 mt-1.5 shrink-0" />
              <p className="leading-relaxed">
                <strong className="text-zinc-200 font-medium">Maintenance:</strong> Demands frequent drying with a microfiber cloth and higher vulnerability to grease and fingerprints.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "dustrepelant",
    name: "ANTI-STATIC DUST REPELLENT",
    label: "Dust Repellent",
    icon: <Sparkles size={15} />,
    title: "Anti-Static Dust-Repellent Shield",
    description: "Features a specialized microscopic anti-static coating that neutralizes charge, preventing airborne particles, lint, and grit from sticking to the lens.",
    badge: "EASY-CLEAN SHIELD",
    beforeLabel: "Untreated Lens (Dust Attraction & Smudge Buildup)",
    afterLabel: "Anti-Static Armor (Instant Dust-Repelling Clarity)",
    bgImage: "/assets/img/dust-rep.png",
    beforeClasses: "blur-[3px] contrast-[0.9] saturate-[0.8] brightness-[0.95]",
    afterClasses: "blur-0 contrast-100 saturate-100",
    content: (
      <div className="space-y-4">
        {/* Specs With Dust Repellent */}
        <div className="space-y-2.5">
          <h4 className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">
            Specs With Dust Repellent
          </h4>
          <div className="space-y-2">
            <div className="flex items-start gap-2.5 text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
              <p className="font-sans text-sm leading-relaxed font-light">
                <strong className="text-white font-medium">Anti-Static Layer:</strong> Features a specialized microscopic coating that neutralizes static charge so particles cannot stick.
              </p>
            </div>
            <div className="flex items-start gap-2.5 text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
              <p className="font-sans text-sm leading-relaxed font-light">
                <strong className="text-white font-medium">Maintenance:</strong> Stays clean much longer; dust simply slides or falls off instead of adhering to the glass.
              </p>
            </div>
            <div className="flex items-start gap-2.5 text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
              <p className="font-sans text-sm leading-relaxed font-light">
                Reduces the need to wipe lenses constantly, lowering the risk of accidental scratch damage from dry rubbing.
              </p>
            </div>
            <div className="flex items-start gap-2.5 text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
              <p className="font-sans text-sm leading-relaxed font-light">
                <strong className="text-white font-medium">Combined Features:</strong> Often paired with anti-reflective, scratch-resistant, water-repellent (hydrophobic), and smudge-resistant (oleophobic) layers.
              </p>
            </div>
          </div>
        </div>

        {/* Specs Without Dust Repellent */}
        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-2.5">
          <h4 className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">
            Specs Without Dust Repellent
          </h4>
          <div className="space-y-2 text-xs text-zinc-400">
            <div className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-zinc-600 mt-1.5 shrink-0" />
              <p className="leading-relaxed">
                <strong className="text-zinc-200 font-medium">Static Charge:</strong> Lenses naturally build up static electricity that attracts airborne dust particles like a magnet.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-zinc-600 mt-1.5 shrink-0" />
              <p className="leading-relaxed">
                <strong className="text-zinc-200 font-medium">Maintenance:</strong> Requires frequent wiping, which can push abrasive dust grit across the glass and cause micro-scratches.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-zinc-600 mt-1.5 shrink-0" />
              <p className="leading-relaxed">
                <strong className="text-zinc-200 font-medium">Visibility:</strong> Dust, lint, and smudges cling quickly to the surface, requiring daily cleaning with water or sprays.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "smudgeresistance",
    name: "OLEOPHOBIC SMUDGE RESISTANCE",
    label: "Smudge Resistance",
    icon: <Fingerprint size={15} />,
    title: "SMUDGE RESISTANCE",
    description: "Features a specialized oleophobic coating engineered to reduce fingerprints, natural skin oils, and everyday smudges from adhering to the lens surface. By altering surface tension, it keeps lenses noticeably cleaner throughout the day and makes cleaning fast, effortless, and streak-free with a standard microfiber cloth.",
    badge: "OLEOPHOBIC SHIELD",
    beforeLabel: "Untreated Lens (Oil & Fingerprint Smudge Buildup)",
    afterLabel: "Oleophobic Barrier (Repels Oils & Wipes Clean Effortlessly)",
    bgImage: "/assets/img/lens3.jpg",
    beforeClasses: "blur-[3.5px] contrast-[0.8] brightness-[0.9] saturate-[0.85]",
    afterClasses: "blur-0 contrast-100 brightness-100 saturate-100"
  },
  {
    id: "scratchresistance",
    name: "HARDENED SCRATCH RESISTANCE",
    label: "Scratch Resistance",
    icon: <ShieldCheck size={15} />,
    title: "SCRATCH RESISTANCE",
    description: "Engineered with a high-density nano-composite hard coating designed to significantly improve resistance to everyday scratches, micro-abrasions, and routine handling wear. While no optical lens is completely scratch-proof, this durable protective shield helps prolong lens clarity and preserves surface performance.",
    badge: "SCRATCH-RESISTANT SHIELD",
    beforeLabel: "Standard Lens (Micro-Scratches & Surface Wear)",
    afterLabel: "Hardened Coating (Reinforced Scratch Resistance)",
    bgImage: "/assets/img/lens2.jpg",
    beforeClasses: "blur-[2.5px] contrast-[0.85] brightness-[0.92] sepia-[0.1]",
    afterClasses: "blur-0 contrast-100 brightness-100 sepia-0"
  },
  {
    id: "blueuvcapture",
    name: "SELECTIVE BLUE UV CAPTURE",
    label: "Blue UV Capture",
    icon: <Laptop size={15} />,
    title: "BLUE UV CAPTURE",
    description: "Utilizes advanced optical filtration technology designed to selectively manage high-energy blue-violet light emitted by digital monitors, smartphones, and harsh artificial LED lighting, while allowing beneficial natural light to pass through. Delivers comfortable, balanced visual contrast for extended screen viewing without distorting natural color perception.",
    badge: "SMART DIGITAL FILTER",
    beforeLabel: "Standard Lens (Harsh Screen Light & Blue Glare)",
    afterLabel: "Blue UV Filter (Selective Screen Light Management)",
    bgImage: "/assets/img/lens6.jpg",
    beforeClasses: "brightness-[1.15] hue-rotate-[15deg] contrast-[0.92] saturate-[1.2]",
    afterClasses: "brightness-100 hue-rotate-0 contrast-100 saturate-100"
  },
  {
    id: "completeuvprotection",
    name: "COMPLETE UV-400 DEFENSE",
    label: "Complete UV Protection",
    icon: <Shield size={15} />,
    title: "COMPLETE UV PROTECTION",
    description: "Incorporates dedicated optical UV absorbers formulated to provide broad-spectrum protection against harmful ultraviolet radiation (UV-A and UV-B) up to 400nm. Designed to reduce daily ocular UV exposure from both direct and reflected sunlight during everyday outdoor activity, maintaining precision defense across diverse lighting environments.",
    badge: "FULL UV-400 SHIELD",
    beforeLabel: "Unprotected Lens (Direct Ultraviolet Exposure)",
    afterLabel: "UV-400 Barrier (Comprehensive Ultraviolet Defense)",
    bgImage: "/assets/img/lens1.jpg",
    beforeClasses: "brightness-[1.25] saturate-[0.7] contrast-[0.88] blur-[1.5px]",
    afterClasses: "brightness-100 saturate-100 contrast-105 blur-0"
  }
];

export default function LensLab() {
  const [activeScenario, setActiveScenario] = useState<LensScenario>(LENS_SCENARIOS[0]);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)
  const [isDragging, setIsDragging] = useState(false);
  const [sweepKey, setSweepKey] = useState(0);

  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(typeof window !== "undefined" ? window.innerWidth < 1024 : false);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Right-side staggered content animation variants
  const rightContainerVariants = {
    hidden: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : (isMobile ? 0 : 40),
      y: shouldReduceMotion ? 0 : (isMobile ? 25 : 0),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.7,
        ease: EASE_PREMIUM,
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const rightItemVariants = {
    hidden: {
      opacity: 0,
      y: 12,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: EASE_PREMIUM,
      },
    },
  };

  const containerRef = useRef<HTMLDivElement>(null);

  const updateSliderFromClientX = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updateSliderFromClientX(e.clientX);
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // safe fallback
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    // Active drag tracking only without any image tilt/shake
    if (isDragging || e.buttons === 1) {
      updateSliderFromClientX(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // safe fallback
    }
  };

  const handlePointerLeave = () => {
    if (!isDragging) {
      setIsDragging(false);
    }
  };

  return (
    <section
      id="lens-lab"
      className="relative pt-10 sm:pt-12 pb-20 px-6 md:px-12 flex flex-col justify-center overflow-hidden border-b border-white/5 text-white"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,102,204,0.04)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10 space-y-6 sm:space-y-8">
        
        {/* Section Title */}
        <div className="flex flex-col items-start justify-start text-left -mt-2 sm:-mt-3">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-[50px] font-black text-white uppercase leading-[0.95] tracking-tight text-left">
            INTERACTIVE <br />
            <span className="text-zinc-500 italic font-black">LENS LAB</span>
          </h2>
        </div>

        {/* Tab Format: Segmented Lens Features Navigation Bar */}
        <div className="w-full max-w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1">
          <div
            role="tablist"
            aria-label="Lens Features"
            className="flex w-full min-w-max md:min-w-0 items-center justify-between rounded-full border border-white/10 bg-[#0c0c0e]/95 p-1 sm:p-1.5 backdrop-blur-xl shadow-2xl shadow-black/60 box-border h-[48px] sm:h-[50px] md:h-[52px] lg:h-[56px]"
          >
            {LENS_SCENARIOS.map((scenario, index) => {
              const isActive = activeScenario.id === scenario.id;
              const isPrevActive = index > 0 && activeScenario.id === LENS_SCENARIOS[index - 1].id;
              const showDivider = index > 0 && !isActive && !isPrevActive;

              return (
                <React.Fragment key={scenario.id}>
                  {/* Subtle vertical divider between inactive tabs */}
                  {index > 0 && (
                    <div
                      className={`h-3.5 sm:h-4 w-[1px] shrink-0 mx-0.5 self-center pointer-events-none transition-opacity duration-200 ${
                        showDivider ? "bg-white/10 opacity-100" : "bg-transparent opacity-0"
                      }`}
                      aria-hidden="true"
                    />
                  )}

                  <motion.button
                    role="tab"
                    id={`tab-${scenario.id}`}
                    aria-selected={isActive}
                    aria-controls={`panel-${scenario.id}`}
                    onClick={() => {
                      if (activeScenario.id !== scenario.id) {
                        setActiveScenario(scenario);
                        setSliderPosition(50); // Reset slider to center
                        setSweepKey((prev) => prev + 1); // Trigger glare reduction sweep
                      }
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className={`relative flex-auto shrink-0 md:shrink h-[38px] sm:h-[40px] md:h-[42px] lg:h-[44px] flex items-center justify-center gap-1 sm:gap-1.5 md:gap-1.5 lg:gap-2 whitespace-nowrap px-1.5 sm:px-2 md:px-2.5 lg:px-3 xl:px-3.5 rounded-full font-sans text-[10px] sm:text-[10.5px] md:text-[11px] lg:text-[11.5px] xl:text-[12px] font-semibold tracking-normal uppercase transition-colors duration-200 cursor-pointer select-none ${
                      isActive
                        ? "text-white"
                        : "text-zinc-300 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    {/* Active Blue Rounded Capsule with Premium Fluid Spring Animation */}
                    {isActive && (
                      <motion.div
                        layoutId="active-lens-tab-capsule"
                        className="absolute inset-0 rounded-full bg-[#2563EB] shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-blue-400/30"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 32,
                        }}
                      >
                        {/* Subtle specular top highlight */}
                        <div className="absolute inset-x-2.5 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent" />
                      </motion.div>
                    )}

                    {/* Icon */}
                    <span
                      className={`relative z-10 shrink-0 transition-colors duration-200 flex items-center justify-center ${
                        isActive ? "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" : "text-zinc-400"
                      }`}
                    >
                      {scenario.icon}
                    </span>

                    {/* Full Tab Label - completely visible with no truncation or overlap */}
                    <span className="relative z-10 font-semibold drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]">
                      {scenario.label.toUpperCase()}
                    </span>
                  </motion.button>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Workspace: Split Slider & Dynamic Spec Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Panel: Dynamic Lens Slider (7 columns) */}
          <div className="lg:col-span-7">
            {/* Scroll-triggered entrance: slides smoothly into place */}
            <motion.div
              initial={{
                opacity: 0,
                x: shouldReduceMotion ? 0 : (isMobile ? 0 : -35),
                y: shouldReduceMotion ? 0 : (isMobile ? 25 : 0),
                scale: shouldReduceMotion ? 1 : 0.98,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
              }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.7,
                ease: EASE_PREMIUM,
              }}
              className="w-full"
            >
              {/* Image Split Slider Container - stable, stationary without hover shake or tilt */}
              <div
                ref={containerRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerLeave}
                className="relative aspect-[16/10] w-full bg-zinc-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl select-none cursor-ew-resize touch-none"
              >
                {/* 400-600ms smooth fade/slide scenario transition for lens preview */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeScenario.id}
                    initial={{ opacity: 0, scale: 0.985 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.015 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 w-full h-full"
                  >
                    {/* Scenario Image Base (Before Layer - Left/Full) */}
                    <div className="absolute inset-0 w-full h-full">
                      <img
                        src={activeScenario.bgImage}
                        alt="Standard Vision Glare"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.src = "/assets/img/lenslab1.jpg";
                        }}
                        className={`w-full h-full object-cover select-none pointer-events-none transition-all duration-300 ${activeScenario.beforeClasses}`}
                      />
                      
                      {/* Simulated glare radial highlight for road-glare to match client's spec */}
                      {activeScenario.id === "polarized" && (
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.7)_0%,transparent_60%)] mix-blend-overlay opacity-90 pointer-events-none" />
                      )}
                      {(activeScenario.id === "bluelight" || activeScenario.id === "blueuvcapture") && (
                        <div className="absolute inset-0 bg-blue-500/10 mix-blend-color pointer-events-none" />
                      )}
                      {activeScenario.id === "completeuvprotection" && (
                        <div className="absolute inset-0 bg-amber-500/10 mix-blend-overlay pointer-events-none" />
                      )}
                    </div>

                    {/* Scenario Image Revealed (After Layer - Revealed precisely up to sliderPosition%) */}
                    <div
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                    >
                      <img
                        src={activeScenario.bgImage}
                        alt="Oculis Precision Vision"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.src = "/assets/img/lenslab1.jpg";
                        }}
                        className={`w-full h-full object-cover select-none pointer-events-none transition-all duration-300 ${activeScenario.afterClasses}`}
                      />
                      
                      {/* Glass tint shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 pointer-events-none" />
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Soft animated light/glare sweep across lens image from left to right demonstrating glare reduction */}
                <motion.div
                  key={`glare-sweep-${activeScenario.id}-${sweepKey}`}
                  initial={{ x: "-150%", opacity: 0 }}
                  animate={{
                    x: ["-150%", "250%"],
                    opacity: [0, 0.85, 0.85, 0]
                  }}
                  transition={{
                    duration: 1.6,
                    ease: [0.25, 1, 0.5, 1],
                    delay: 0.35
                  }}
                  className="absolute inset-y-0 w-2/3 pointer-events-none z-20 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent mix-blend-overlay"
                />

                {/* Luminous Sliding Divider Line & Active Control */}
                <div
                  className="absolute top-0 bottom-0 w-[2px] bg-brand-blue z-30 pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  {/* Subtle vertical light guide pulse */}
                  <motion.div
                    animate={{ opacity: [0.4, 0.75, 0.4] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 w-[4px] -left-[1px] bg-brand-blue blur-sm"
                  />
                  <div className="absolute inset-0 w-[2px] bg-white/70" />

                  {/* Center Control Handle with subtle pulsing highlight */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-brand-blue border-2 border-white flex items-center justify-center shadow-lg shadow-brand-blue/40 z-40 transition-transform duration-200 hover:scale-110 active:scale-95 pointer-events-auto">
                    {/* Concentric Pulsing Highlight Ring 1 */}
                    <motion.div
                      animate={{
                        scale: isDragging ? [1.15, 1.45, 1.15] : [1, 1.35, 1],
                        opacity: isDragging ? [0.8, 0.3, 0.8] : [0.65, 0.15, 0.65]
                      }}
                      transition={{
                        duration: isDragging ? 1.4 : 2.2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute inset-0 rounded-full bg-brand-blue -z-10 blur-sm pointer-events-none"
                    />

                    {/* Concentric Pulsing Highlight Ring 2 */}
                    <motion.div
                      animate={{
                        scale: isDragging ? [1.3, 1.75, 1.3] : [1.1, 1.6, 1.1],
                        opacity: isDragging ? [0.5, 0, 0.5] : [0.35, 0, 0.35]
                      }}
                      transition={{
                        duration: isDragging ? 1.4 : 2.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.35
                      }}
                      className="absolute -inset-1 rounded-full border border-brand-blue/60 -z-10 pointer-events-none"
                    />

                    {/* Handle Icon */}
                    <div className="flex gap-1 items-center justify-center text-white select-none">
                      <span className="font-sans text-xs font-bold font-mono">↔</span>
                    </div>
                  </div>
                </div>

                <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-black/60 backdrop-blur-md rounded-md border border-white/10 pointer-events-none">
                  <span className="font-mono text-[9px] text-brand-blue uppercase tracking-widest font-bold">
                    REVEAL: {Math.round(sliderPosition)}%
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Panel: Feature Info & Premium Details (5 columns) */}
          <motion.div
            variants={rightContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="lg:col-span-5 flex flex-col space-y-6"
          >
            <div className="space-y-6">
              {/* Scenario transition handling with AnimatePresence */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScenario.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: EASE_PREMIUM }}
                  className="space-y-6"
                >
                  <h3 className="font-serif text-xl sm:text-2xl md:text-[26px] font-normal text-white uppercase leading-snug tracking-tight">
                    {activeScenario.title}
                  </h3>

                  {activeScenario.content ? (
                    activeScenario.content
                  ) : (
                    <p className="font-sans text-sm text-zinc-300 leading-relaxed font-light">
                      {activeScenario.description}
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}



