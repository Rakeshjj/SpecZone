import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import { Eye, ShieldCheck, Sun, Laptop, Droplets, Sparkles } from "lucide-react";

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
    icon: <Sun size={14} />,
    title: "100% Polarized Glare Elimination",
    description: "Anti-reflective (AR) coatings are treatments that are applied to the surface of the lens of glasses that reduce glare and let in more light. By reducing reflections on both sides of the lenses, this coating can make night driving and screen use more comfortable. AR coatings work by applying very thin layers of metal oxides to the lens, increasing the amount of light transmitted. This helps support clearer vision in changing lighting conditions and reduces the visual distractions that can occur when bright light hits the lens.",
    badge: "ULTRA SUN SECURITY",
    beforeLabel: "Standard Lens (Blinded by Reflective Glare)",
    afterLabel: "Oculis Polarized (Zero-Reflection Contrast)",
    bgImage: "/assets/img/lenslab1.jpg",
    beforeClasses: "brightness-[1.3] saturate-[0.6] blur-[2px] contrast-[0.9]", // washed out & glaring
    afterClasses: "brightness-100 saturate-100 blur-0 contrast-105"
  },
  {
    id: "waterrepelant",
    name: "HYDROPHOBIC WATER-REPELLENT",
    label: "Water Repelant",
    icon: <Droplets size={14} />,
    title: "Hydrophobic Water-Resistant Coating",
    description: "Features a microscopic hydrophobic top-coat that changes surface tension, forcing water to bead up and roll off instantly. Prevents rain smears, reduces smudge buildup, and makes cleaning effortless.",
    badge: "HYDROPHOBIC SHIELD",
    beforeLabel: "Untreated Lens (Blinding Film & Rain Smears)",
    afterLabel: "Hydrophobic Coating (Instant Water Roll-Off)",
    bgImage: "/assets/img/anti-reflections.jpg",
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
    label: "Dust Repelant",
    icon: <Sparkles size={14} />,
    title: "Anti-Static Dust-Repellent Shield",
    description: "Features a specialized microscopic anti-static coating that neutralizes charge, preventing airborne particles, lint, and grit from sticking to the lens.",
    badge: "EASY-CLEAN SHIELD",
    beforeLabel: "Untreated Lens (Dust Attraction & Smudge Buildup)",
    afterLabel: "Anti-Static Armor (Instant Dust-Repelling Clarity)",
    bgImage: "/assets/img/bluelens.jpg",
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

  // Parallax motion values with silky spring damping for smooth 60fps GPU transforms
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 26, stiffness: 130, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Gentle 3D tilt and translation - subtle, refined, no extreme angles
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [3.5, -3.5]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-3.5, 3.5]);
  const translateX = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);
  const translateY = useTransform(smoothY, [-0.5, 0.5], [-6, 6]);

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
    // Parallax tracking relative to container center (-0.5 to 0.5)
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(Math.max(-0.5, Math.min(0.5, normX)));
      mouseY.set(Math.max(-0.5, Math.min(0.5, normY)));
    }

    // Active drag tracking
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
    // Return gently to neutral without jump
    mouseX.set(0);
    mouseY.set(0);
    if (!isDragging) {
      setIsDragging(false);
    }
  };

  return (
    <section
      id="lens-lab"
      className="relative pt-16 sm:pt-20 pb-20 px-6 md:px-12 flex flex-col justify-center overflow-hidden border-b border-white/5 text-white"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,102,204,0.04)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10 space-y-16">
        
        {/* Elegant Section Title */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-6 border-b border-white/5">
          <div className="space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-[50px] font-black text-white uppercase leading-[0.95] tracking-tight">
              INTERACTIVE <br />
              <span className="text-zinc-500 italic font-black">LENS LAB</span>
            </h2>
            <p className="font-sans text-sm text-zinc-400 max-w-xl font-light leading-relaxed">
              Drag the premium lens slider below to preview how our proprietary optical coatings eliminate blinding glare, block harmful blue light, and resist moisture.
            </p>
          </div>

          {/* Scenario Tab Selectors */}
          <div className="flex flex-wrap gap-2 shrink-0 bg-zinc-900/60 p-1.5 rounded-xl border border-white/5 backdrop-blur-sm">
            {LENS_SCENARIOS.map((scenario) => {
              const isActive = activeScenario.id === scenario.id;
              return (
                <button
                  key={scenario.id}
                  onClick={() => {
                    if (activeScenario.id !== scenario.id) {
                      setActiveScenario(scenario);
                      setSliderPosition(50); // Reset slider to center
                      setSweepKey((prev) => prev + 1); // Trigger glare reduction sweep
                    }
                  }}
                  className={`relative px-4 py-2.5 rounded-lg font-mono text-[10px] tracking-wider uppercase transition-colors duration-300 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? "text-white font-bold"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeScenarioGlow"
                      className="absolute inset-0 rounded-lg bg-brand-blue shadow-md shadow-brand-blue/30 -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {scenario.icon}
                    <span>{scenario.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white/90 animate-pulse" />
                    )}
                  </span>
                </button>
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
              style={{ perspective: 1200 }}
              className="w-full"
            >
              {/* Parallax Container: gentle 3D tilt & smooth GPU translation based on mouse movement */}
              <motion.div
                ref={containerRef}
                style={{
                  rotateX,
                  rotateY,
                  x: translateX,
                  y: translateY,
                  transformStyle: "preserve-3d",
                  willChange: "transform"
                }}
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
                      {activeScenario.id === "bluelight" && (
                        <div className="absolute inset-0 bg-blue-500/10 mix-blend-color pointer-events-none" />
                      )}
                      
                      {/* HUD Glare Label Overlay */}
                      <div className="absolute bottom-4 left-6 z-10 px-3 py-1 bg-black/60 backdrop-blur-md rounded-md border border-white/5 pointer-events-none">
                        <span className="font-mono text-[9px] text-red-400 font-bold uppercase tracking-widest">
                          {activeScenario.beforeLabel}
                        </span>
                      </div>
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

                      {/* HUD Crisp Label Overlay */}
                      <div className="absolute bottom-4 left-6 z-10 px-3 py-1 bg-black/60 backdrop-blur-md rounded-md border border-white/5 whitespace-nowrap pointer-events-none">
                        <span className="font-mono text-[9px] text-brand-blue font-bold uppercase tracking-widest">
                          {activeScenario.afterLabel}
                        </span>
                      </div>
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

                {/* HUD Sensor Scanner indicators */}
                <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-black/60 backdrop-blur-md rounded-md border border-white/10 flex items-center gap-2 pointer-events-none">
                  <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-ping" />
                  <span className="font-mono text-[9px] text-zinc-300 uppercase tracking-widest">
                    COATING ANALYZER // ACTIVE
                  </span>
                </div>

                <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-black/60 backdrop-blur-md rounded-md border border-white/10 pointer-events-none">
                  <span className="font-mono text-[9px] text-brand-blue uppercase tracking-widest font-bold">
                    REVEAL: {Math.round(sliderPosition)}%
                  </span>
                </div>
              </motion.div>
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



