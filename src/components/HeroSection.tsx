import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import { Sparkles, CheckCircle, User, Phone, ArrowDown, Shield, Eye, Cpu, Compass, Layers, Zap, Sliders } from "lucide-react";
import auraSpecsTransparent from "../assets/images/download.png";

interface HeroSectionProps {
  onScrollDown: () => void;
}

export default function HeroSection({ onScrollDown }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Minimal lead capture states on Slide 3
  const [slideLeadName, setSlideLeadName] = useState("");
  const [slideLeadPhone, setSlideLeadPhone] = useState("");
  const [isSlideSubmitted, setIsSlideSubmitted] = useState(false);

  // Parallax subtle mouse interaction
  const mouseXSpring = useSpring(0, { damping: 40, stiffness: 60 });
  const mouseYSpring = useSpring(0, { damping: 40, stiffness: 60 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      setMousePosition({ x, y });
      mouseXSpring.set(x);
      mouseYSpring.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseXSpring, mouseYSpring]);

  // Slide Auto-Rotation (only during Hero stage when near top)
  useEffect(() => {
    const timer = setInterval(() => {
      if (currentSlide === 2 && (slideLeadName || slideLeadPhone)) {
        return;
      }
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 7500);
    return () => clearInterval(timer);
  }, [currentSlide, slideLeadName, slideLeadPhone]);

  // 100% Scroll-Driven Animation linked to container scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Hero Text & Controls fading out (0% -> 35%)
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.22, 0.35], [1, 0.8, 0]);
  const heroTextX = useTransform(scrollYProgress, [0, 0.35], [0, -60]);
  const heroTextScale = useTransform(scrollYProgress, [0, 0.35], [1, 0.94]);
  const heroPointerEvents = useTransform(scrollYProgress, (val) => (val < 0.3 ? "auto" : "none"));

  // Floating Specification Badges fading out with spatial depth (0% -> 30%)
  const badgesOpacity = useTransform(scrollYProgress, [0, 0.15, 0.3], [1, 0.75, 0]);
  const badgesScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.2]);

  // Floating Glasses 3D Pop, Perspective, Macro Zoom, Blur & Defocus (0% -> 100%)
  const productScale = useTransform(scrollYProgress, [0, 0.25, 0.55, 0.8, 1], [1, 1.25, 1.75, 2.6, 3.8]);
  const productRotateX = useTransform(scrollYProgress, [0, 0.35, 0.75, 1], [0, 6, 12, 16]);
  const productRotateY = useTransform(scrollYProgress, [0, 0.35, 0.75, 1], [0, -8, -16, -22]);
  const productRotateZ = useTransform(scrollYProgress, [0, 0.35, 0.75, 1], [0, -2, -4.5, -7]);
  const productX = useTransform(scrollYProgress, [0, 0.4, 0.75, 1], ["0%", "-3%", "-8%", "-16%"]);
  const productY = useTransform(scrollYProgress, [0, 0.4, 0.75, 1], ["0%", "2%", "6%", "12%"]);
  
  // Optical Defocus & Lighting Shimmer
  const productBlur = useTransform(
    scrollYProgress,
    [0, 0.45, 0.65, 0.85, 1],
    ["blur(0px)", "blur(0.5px)", "blur(4px)", "blur(12px)", "blur(26px)"]
  );
  const productBrightness = useTransform(scrollYProgress, [0, 0.5, 0.85, 1], [1, 1.06, 1.28, 1.45]);
  const productContrast = useTransform(scrollYProgress, [0, 0.5, 0.85, 1], [1, 1.04, 1.12, 1.2]);

  // Smooth cubic power curve for disappearance
  const productOpacity = useTransform(scrollYProgress, [0, 0.45, 0.68, 0.85, 0.96, 1], [1, 1, 0.82, 0.38, 0.08, 0]);

  // Specs / CAD Blueprint Section Reveal (35% -> 100%)
  const cadOpacity = useTransform(scrollYProgress, [0.35, 0.58, 0.82, 1], [0, 0.4, 0.88, 1]);
  const cadScale = useTransform(scrollYProgress, [0.35, 1], [0.94, 1]);
  const cadY = useTransform(scrollYProgress, [0.35, 1], [40, 0]);
  const cadPointerEvents = useTransform(scrollYProgress, (val) => (val > 0.5 ? "auto" : "none"));

  // Progress HUD Stage Tracker
  const hudProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Mouse spring micro-shift for the hero glasses
  const glassesMouseX = useTransform(mouseXSpring, (val) => val * -15);
  const glassesMouseY = useTransform(mouseYSpring, (val) => val * -15);

  // Helper scroll function
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSlideFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slideLeadName || !slideLeadPhone) {
      return;
    }
    setIsSlideSubmitted(true);
    const waText = `Hi Spectacal Zone! I'm requesting a Home Eye Care appointment via the hero banner form.%0A%0AName: ${slideLeadName}%0APhone: ${slideLeadPhone}`;
    setTimeout(() => {
      window.open(`https://wa.me/919442009991?text=${waText}`, "_blank");
    }, 1500);
  };

  const slidesData = [
    {
      id: 0,
      badge: "ESTABLISHED 1959 : SIX DECADES OF PRECISION",
      title_line1: "AURA PLATINUM",
      title_line2: "TITANIUM ATELIER",
      description: "Custom digital progressive lens design and curated Japanese beta-titanium luxury frames tailored specifically to your ocular anatomy and personal prestige.",
      ctaPrimary: "Explore Specs & CAD",
      ctaPrimaryAction: () => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const targetY = window.scrollY + rect.height * 0.75;
          window.scrollTo({ top: targetY, behavior: "smooth" });
        }
      },
      ctaSecondary: "Shop Collection",
      ctaSecondaryAction: () => scrollToId("opticals-shop"),
      image: auraSpecsTransparent
    },
    {
      id: 1,
      badge: "SARTORIAL EYEWEAR : MILAN & TOKYO CRAFTSMANSHIP",
      title_line1: "HIGH-DEFINITION",
      title_line2: "POLARIZED SHIELD",
      description: "Proprietary 9-layer anti-reflective optics engineered to eliminate blinding solar reflection and filter 100% of high-energy visible blue-violet scatter.",
      ctaPrimary: "View Collection",
      ctaPrimaryAction: () => scrollToId("opticals-shop"),
      ctaSecondary: "Explore Brands",
      ctaSecondaryAction: () => scrollToId("brands"),
      image: auraSpecsTransparent
    },
    {
      id: 2,
      badge: "MOBILE CLINICAL LABORATORY & DIAGNOSTICS",
      title_line1: "ATELIER DOORSTEP",
      title_line2: "CONCIERGE CARE",
      description: "Can't visit our flagship showroom? Schedule a qualified senior optometrist clinical diagnostic evaluation and 100+ frame trials at your residence.",
      ctaPrimary: "",
      ctaPrimaryAction: () => { },
      ctaSecondary: "",
      ctaSecondaryAction: () => { },
      image: auraSpecsTransparent
    }
  ];

  return (
    <div
      ref={containerRef}
      id="hero"
      className="relative bg-[#09090b] text-white h-[280vh] w-full"
    >
      {/* Sticky Fullscreen Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between z-10 [perspective:1200px]">
        
        {/* Luxury Background Canvas (Replaced video with static dark aesthetics & glowing radial aura) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {/* Deep dark canvas gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#06080e] via-[#09090b] to-[#040508]" />

          {/* Glowing Ambient Radial Aura behind the product */}
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 translate-x-1/4 w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(0,102,204,0.14)_0%,rgba(0,102,204,0.03)_45%,transparent_70%)] blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.02)_0%,transparent_60%)] blur-2xl pointer-events-none" />

          {/* High-Precision Technical CAD Matrix Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-70" />

          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.7)_100%)] pointer-events-none" />
          <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#09090b] to-transparent pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#09090b] to-transparent pointer-events-none" />
        </div>

        {/* Decorative Concentric Circular Optics Guide on the top-left */}
        <div
          className="absolute top-0 left-0 w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] pointer-events-none opacity-30 z-0"
          style={{
            transform: `translate(${mousePosition.x * 8}px, ${mousePosition.y * 8}px)`,
            transition: "transform 0.4s ease-out"
          }}
        >
          <svg viewBox="0 0 500 500" className="w-full h-full text-brand-blue">
            <circle cx="0" cy="0" r="450" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" className="opacity-20" />
            <circle cx="0" cy="0" r="350" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-30" />
            <circle cx="0" cy="0" r="230" fill="currentColor" className="opacity-5" />
            <circle cx="0" cy="0" r="120" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-40" />
          </svg>
        </div>

        {/* HUD Top Bar */}
        <div className="relative z-20 px-6 md:px-12 pt-8 flex justify-between items-center max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
            <span className="font-mono text-[9px] text-zinc-400 tracking-[0.25em] uppercase font-bold">
              OCULAR SYSTEM // AURA SERIES 01
            </span>
          </div>

          {/* Live Scroll Phase Telemetry */}
          <div className="flex items-center gap-4 bg-zinc-900/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-lg">
            <span className="font-mono text-[9px] text-brand-blue font-bold tracking-widest uppercase flex items-center gap-1.5">
              <Compass size={11} /> SCROLL SYNC
            </span>
            <span className="w-px h-3 bg-white/10" />
            <span className="font-mono text-[9px] text-zinc-300">
              CAD TRANSITION
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CENTER VIEWPORT: HERO TEXT (LEFT) + FLOATING 3D GLASSES & BADGES (RIGHT) */}
        {/* ========================================================================= */}
        <div className="relative z-10 my-auto flex-1 max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full min-h-[560px]">
          
          {/* LEFT COLUMN: HERO INFORMATION (Fixed minimum height container so slide changes don't shift layout) */}
          <motion.div
            style={{
              opacity: heroTextOpacity,
              x: heroTextX,
              scale: heroTextScale,
              pointerEvents: heroPointerEvents as any
            }}
            className="lg:col-span-6 relative z-20 flex flex-col justify-center text-left py-4 min-h-[460px]"
          >
            <AnimatePresence mode="wait">
              {slidesData.map((slide) => {
                if (slide.id !== currentSlide) return null;
                return (
                  <motion.div
                    key={slide.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="space-y-6"
                  >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/30 backdrop-blur-sm">
                      <Sparkles size={11} className="text-brand-blue" />
                      <span className="font-mono text-[9px] tracking-[0.25em] text-brand-blue uppercase font-bold">
                        {slide.badge}
                      </span>
                    </div>

                    {/* Headline */}
                    <div className="space-y-1">
                      <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-black text-white leading-[0.9] uppercase tracking-tighter">
                        {slide.title_line1} <br />
                        <span className="text-zinc-400 italic font-black">{slide.title_line2}</span>
                      </h1>
                    </div>

                    {/* Description */}
                    <p className="font-sans text-sm md:text-base text-zinc-300 leading-relaxed font-light max-w-lg min-h-[48px]">
                      {slide.description}
                    </p>

                    {/* CTAs or Lead Capture */}
                    {slide.id !== 2 ? (
                      <div className="flex flex-wrap gap-4 pt-2">
                        <button
                          onClick={slide.ctaPrimaryAction}
                          className="px-8 py-4 bg-brand-blue text-white hover:bg-white hover:text-black font-display text-[11px] font-black tracking-widest uppercase rounded-xl transition-all duration-300 shadow-xl shadow-brand-blue/20 cursor-pointer flex items-center gap-2 group"
                        >
                          <span>{slide.ctaPrimary}</span>
                          <ArrowDown size={13} className="group-hover:translate-y-0.5 transition-transform" />
                        </button>
                        <button
                          onClick={slide.ctaSecondaryAction}
                          className="px-8 py-4 bg-zinc-900/60 hover:bg-white/[0.06] text-zinc-200 font-mono text-[10px] tracking-wider uppercase border border-white/10 backdrop-blur-sm rounded-xl transition-all cursor-pointer"
                        >
                          {slide.ctaSecondary}
                        </button>
                      </div>
                    ) : (
                      /* Minimal Concierge Form on Slide 3 */
                      <div className="pt-2 max-w-md w-full">
                        <AnimatePresence mode="wait">
                          {!isSlideSubmitted ? (
                            <form
                              onSubmit={handleSlideFormSubmit}
                              className="bg-zinc-900/80 border border-white/10 backdrop-blur-md shadow-2xl rounded-2xl p-5 space-y-3.5"
                            >
                              <div className="flex gap-2 items-center border-b border-white/5 pb-2">
                                <Sparkles size={12} className="text-brand-blue animate-spin" style={{ animationDuration: "6s" }} />
                                <span className="font-mono text-[9px] text-zinc-300 tracking-widest uppercase font-bold">
                                  REQUEST DOORSTEP CLINICAL ATELIER
                                </span>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                <div className="relative">
                                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-500 pointer-events-none">
                                    <User size={12} />
                                  </span>
                                  <input
                                    type="text"
                                    required
                                    placeholder="Full Name"
                                    value={slideLeadName}
                                    onChange={(e) => setSlideLeadName(e.target.value)}
                                    className="w-full bg-zinc-950/60 border border-white/10 rounded-xl py-2.5 pl-9 pr-3 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-brand-blue transition-all"
                                  />
                                </div>

                                <div className="relative">
                                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-500 pointer-events-none">
                                    <Phone size={12} />
                                  </span>
                                  <input
                                    type="tel"
                                    required
                                    placeholder="Mobile Contact"
                                    value={slideLeadPhone}
                                    onChange={(e) => setSlideLeadPhone(e.target.value)}
                                    className="w-full bg-zinc-950/60 border border-white/10 rounded-xl py-2.5 pl-9 pr-3 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-brand-blue transition-all"
                                  />
                                </div>
                              </div>

                              <button
                                type="submit"
                                className="w-full py-3 rounded-xl bg-brand-blue hover:bg-white hover:text-black text-white font-display text-[10px] font-black tracking-widest uppercase transition-all cursor-pointer"
                              >
                                CONFIRM APPOINTMENT VIA WHATSAPP →
                              </button>
                            </form>
                          ) : (
                            <div className="bg-green-950/30 border border-green-500/30 rounded-2xl p-5 text-center space-y-2.5">
                              <div className="w-8 h-8 rounded-full bg-green-950/80 flex items-center justify-center mx-auto text-green-400 border border-green-800">
                                <CheckCircle size={16} />
                              </div>
                              <h4 className="font-serif text-base font-bold text-white uppercase tracking-tight">VISITATION SCHEDULED</h4>
                              <p className="font-sans text-[11px] text-zinc-300 font-light">
                                Thank you, {slideLeadName}. Initiating wavefront trial preparation...
                              </p>
                            </div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}

                    {/* Carousel Dots */}
                    <div className="flex gap-2.5 pt-2">
                      {[0, 1, 2].map((dotIndex) => (
                        <button
                          key={dotIndex}
                          onClick={() => setCurrentSlide(dotIndex)}
                          className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                            currentSlide === dotIndex ? "w-7 bg-brand-blue" : "w-2 bg-white/20 hover:bg-white/40"
                          }`}
                          aria-label={`Slide ${dotIndex + 1}`}
                        />
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* RIGHT COLUMN: ENLARGED, PERFECTLY CENTERED & ELEVATED 3D PRODUCT VIEWPORT */}
          <div className="lg:col-span-6 relative flex items-center justify-center h-full min-h-[500px] select-none pointer-events-none -translate-y-16 lg:-translate-y-24">
            
            {/* FLOATING SPECIFICATION BADGES AROUND THE GLASSES (Restored around the enlarged frame) */}
            <motion.div
              style={{
                opacity: badgesOpacity,
                scale: badgesScale
              }}
              className="absolute inset-0 z-30 pointer-events-none"
            >
              {/* Badge 1: Top Left - ZEISS Polarized HD */}
              <div className="absolute top-[4%] left-[-4%] md:left-[-1%] flex items-center gap-2 bg-zinc-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 shadow-2xl">
                <div className="w-2 h-2 rounded-full bg-brand-blue animate-ping" />
                <div>
                  <span className="block font-mono text-[8px] text-zinc-400 uppercase tracking-wider">OPTICAL MATRIX</span>
                  <span className="block font-mono text-[10px] text-white font-bold tracking-widest uppercase">ZEISS POLARIZED HD</span>
                </div>
              </div>

              {/* Badge 2: Top Right - UV400 Shield */}
              <div className="absolute top-[6%] right-[-4%] md:right-[-1%] flex items-center gap-2 bg-zinc-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 shadow-2xl">
                <Shield size={13} className="text-brand-blue" />
                <div>
                  <span className="block font-mono text-[8px] text-zinc-400 uppercase tracking-wider">SOLAR RADIATION</span>
                  <span className="block font-mono text-[10px] text-white font-bold tracking-widest uppercase">UV400 SCATTER CUT</span>
                </div>
              </div>

              {/* Badge 3: Middle Right - Japanese Beta-Titanium */}
              <div className="absolute top-[52%] right-[-8%] md:right-[-3%] flex items-center gap-2 bg-zinc-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 shadow-2xl">
                <Cpu size={13} className="text-brand-blue" />
                <div>
                  <span className="block font-mono text-[8px] text-zinc-400 uppercase tracking-wider">MATERIAL GRADE</span>
                  <span className="block font-mono text-[10px] text-white font-bold tracking-widest uppercase">BETA-TITANIUM</span>
                </div>
              </div>

              {/* Badge 4: Bottom Left - 11.2g Aero-Light Weight */}
              <div className="absolute bottom-[4%] left-[-4%] md:left-[0%] flex items-center gap-2 bg-zinc-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 shadow-2xl">
                <Zap size={13} className="text-brand-blue" />
                <div>
                  <span className="block font-mono text-[8px] text-zinc-400 uppercase tracking-wider">TOTAL MASS</span>
                  <span className="block font-mono text-[10px] text-white font-bold tracking-widest uppercase">11.2G AERO-LIGHT</span>
                </div>
              </div>

              {/* Badge 5: Bottom Right - 18mm Keyhole Bridge */}
              <div className="absolute bottom-[2%] right-[-2%] md:right-[3%] flex items-center gap-2 bg-zinc-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 shadow-2xl">
                <Layers size={13} className="text-brand-blue" />
                <div>
                  <span className="block font-mono text-[8px] text-zinc-400 uppercase tracking-wider">ANATOMICAL FIT</span>
                  <span className="block font-mono text-[10px] text-white font-bold tracking-widest uppercase">18MM KEYHOLE BRIDGE</span>
                </div>
              </div>
            </motion.div>

            {/* FLOATING 3D GLASSES PRODUCT HERO (Enlarged, Centered, 100% Transparent Cutout) */}
            <motion.div
              style={{
                scale: productScale,
                rotateX: productRotateX,
                rotateY: productRotateY,
                rotateZ: productRotateZ,
                x: productX,
                y: productY,
                filter: productBlur,
                opacity: productOpacity,
                transformStyle: "preserve-3d",
                willChange: "transform, opacity, filter"
              }}
              className="relative w-full max-w-[760px] flex items-center justify-center z-20"
            >
              {/* High-Resolution Luxury Specs 100% Pure Transparent Cutout */}
              <motion.img
                style={{
                  x: glassesMouseX,
                  y: glassesMouseY,
                }}
                src={auraSpecsTransparent}
                alt="AURA Luxury Geometric Titanium Eyeglasses"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain max-h-[500px] drop-shadow-[0_25px_45px_rgba(0,0,0,0.85)] transition-all duration-75"
              />
            </motion.div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* UNDERLYING SPECS / CAD BLUEPRINT SECTION (REVEALED AS GLASSES ZOOM IN)     */}
        {/* ========================================================================= */}
        <motion.div
          style={{
            opacity: cadOpacity,
            scale: cadScale,
            y: cadY,
            pointerEvents: cadPointerEvents as any
          }}
          className="absolute inset-0 z-30 flex flex-col justify-center items-center px-6 md:px-12 py-16 bg-[#06080e]/95 backdrop-blur-xl"
        >
          <div className="max-w-7xl mx-auto w-full space-y-8 my-auto">
            
            {/* Header: Technical CAD Title */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/10 pb-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/30">
                  <Sliders size={11} className="text-brand-blue" />
                  <span className="font-mono text-[9px] text-brand-blue font-bold tracking-[0.25em] uppercase">
                    [ MIL-SPEC OPTICAL BLUEPRINT // REV 2.4 ]
                  </span>
                </div>
                <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight">
                  PRECISION CAD <span className="text-brand-blue italic">ARCHITECTURE</span>
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                  TOLERANCE: ±0.01mm CNC MILLED
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>

            {/* Core CAD Visualizer + Specification Metric Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Center CAD Blueprint Vector Visualization (7 columns) */}
              <div className="lg:col-span-7 bg-zinc-950/80 border border-brand-blue/30 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl group">
                
                {/* Blueprint Neon Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,102,204,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,102,204,0.06)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />
                
                {/* Crosshairs & Center Point */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-16 h-16 border border-brand-blue/20 rounded-full" />
                  <div className="absolute w-full h-px bg-brand-blue/10" />
                  <div className="absolute h-full w-px bg-brand-blue/10" />
                </div>

                {/* Laser Telemetry Label */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="font-mono text-[8px] text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded border border-brand-blue/20 uppercase tracking-wider font-bold">
                    CAD SCHEMATIC : AURA-01
                  </span>
                </div>

                <div className="absolute top-4 right-4 z-10">
                  <span className="font-mono text-[8px] text-zinc-400 uppercase tracking-widest">
                    ORTHOGRAPHIC PROJECTION
                  </span>
                </div>

                {/* CAD Eyeglasses Vector Wireframe with Dimension Callouts */}
                <div className="relative aspect-[16/9] w-full flex items-center justify-center my-4 z-10">
                  <svg viewBox="0 0 600 320" className="w-full h-full text-brand-blue stroke-brand-blue drop-shadow-[0_0_12px_rgba(0,102,204,0.4)]">
                    {/* Left Frame Rim */}
                    <path
                      d="M 90,90 Q 220,80 230,130 Q 235,210 180,225 Q 90,230 75,160 Q 70,100 90,90 Z"
                      fill="rgba(0, 102, 204, 0.05)"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    {/* Right Frame Rim */}
                    <path
                      d="M 510,90 Q 380,80 370,130 Q 365,210 420,225 Q 510,230 525,160 Q 530,100 510,90 Z"
                      fill="rgba(0, 102, 204, 0.05)"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    {/* Center Keyhole Bridge */}
                    <path
                      d="M 230,120 Q 300,100 370,120 M 235,145 Q 300,125 365,145"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    />
                    {/* Left & Right Temples */}
                    <path d="M 75,110 L 25,100 M 525,110 L 575,100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />

                    {/* Dimension Arrow: Lens Width (54mm) */}
                    <g className="text-white">
                      <line x1="90" y1="60" x2="230" y2="60" stroke="#0066cc" strokeWidth="1" markerEnd="url(#arrow)" />
                      <line x1="90" y1="50" x2="90" y2="70" stroke="#0066cc" strokeWidth="1" />
                      <line x1="230" y1="50" x2="230" y2="70" stroke="#0066cc" strokeWidth="1" />
                      <text x="160" y="52" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">54 mm (LENS WIDTH)</text>
                    </g>

                    {/* Dimension Arrow: Bridge Width (18mm) */}
                    <g className="text-white">
                      <line x1="235" y1="180" x2="365" y2="180" stroke="#0066cc" strokeWidth="1" />
                      <line x1="235" y1="170" x2="235" y2="190" stroke="#0066cc" strokeWidth="1" />
                      <line x1="365" y1="170" x2="365" y2="190" stroke="#0066cc" strokeWidth="1" />
                      <text x="300" y="172" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">18 mm (BRIDGE)</text>
                    </g>

                    {/* Dimension Arrow: Temple Length (145mm) */}
                    <g className="text-white">
                      <line x1="525" y1="60" x2="585" y2="60" stroke="#0066cc" strokeWidth="1" />
                      <text x="555" y="52" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">145 mm</text>
                    </g>

                    {/* Vertical Dimension: Lens Height (38mm) */}
                    <g className="text-white">
                      <line x1="45" y1="90" x2="45" y2="225" stroke="#0066cc" strokeWidth="1" />
                      <line x1="35" y1="90" x2="55" y2="90" stroke="#0066cc" strokeWidth="1" />
                      <line x1="35" y1="225" x2="55" y2="225" stroke="#0066cc" strokeWidth="1" />
                      <text x="40" y="160" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle" transform="rotate(-90 40 160)" fontWeight="bold">38 mm (HEIGHT)</text>
                    </g>
                  </svg>
                </div>

                {/* Bottom Vector Telemetry Bar */}
                <div className="flex justify-between items-center pt-3 border-t border-white/10 font-mono text-[9px] text-zinc-400">
                  <span>PANTOSCOPIC TILT: 9.8°</span>
                  <span>FACE-FORM ANGLE: 5.2°</span>
                  <span>VERTEX DISTANCE: 12.0mm</span>
                </div>
              </div>

              {/* Right Specification Metric Cards Grid (5 columns) */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
                
                {/* Spec 1 */}
                <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-4 flex items-start gap-3.5 hover:border-brand-blue/40 transition-colors">
                  <div className="p-2 rounded-xl bg-brand-blue/10 border border-brand-blue/20 text-brand-blue shrink-0">
                    <Cpu size={16} />
                  </div>
                  <div>
                    <span className="block font-mono text-[8px] text-brand-blue uppercase tracking-widest font-bold">FRAME ARCHITECTURE</span>
                    <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wide">Japanese Beta-Titanium</h4>
                    <p className="font-sans text-xs text-zinc-400 mt-0.5">Aerospace Grade 5 alloy with 0.6mm micro-milled profile. 100% hypoallergenic.</p>
                  </div>
                </div>

                {/* Spec 2 */}
                <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-4 flex items-start gap-3.5 hover:border-brand-blue/40 transition-colors">
                  <div className="p-2 rounded-xl bg-brand-blue/10 border border-brand-blue/20 text-brand-blue shrink-0">
                    <Eye size={16} />
                  </div>
                  <div>
                    <span className="block font-mono text-[8px] text-brand-blue uppercase tracking-widest font-bold">LENS TECHNOLOGY</span>
                    <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wide">ZEISS Polarized HD + 9-Layer AR</h4>
                    <p className="font-sans text-xs text-zinc-400 mt-0.5">Zero-glare wavefront clarity with oleophobic and hydrophobic nano-armor.</p>
                  </div>
                </div>

                {/* Spec 3 */}
                <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-4 flex items-start gap-3.5 hover:border-brand-blue/40 transition-colors">
                  <div className="p-2 rounded-xl bg-brand-blue/10 border border-brand-blue/20 text-brand-blue shrink-0">
                    <Layers size={16} />
                  </div>
                  <div>
                    <span className="block font-mono text-[8px] text-brand-blue uppercase tracking-widest font-bold">HINGE MECHANISM</span>
                    <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wide">Screwless 5-Axis Dual Cam</h4>
                    <p className="font-sans text-xs text-zinc-400 mt-0.5">Friction-calibrated spring mechanism tested to over 50,000 continuous flex cycles.</p>
                  </div>
                </div>

                {/* Spec 4 */}
                <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-4 flex items-start gap-3.5 hover:border-brand-blue/40 transition-colors">
                  <div className="p-2 rounded-xl bg-brand-blue/10 border border-brand-blue/20 text-brand-blue shrink-0">
                    <Zap size={16} />
                  </div>
                  <div>
                    <span className="block font-mono text-[8px] text-brand-blue uppercase tracking-widest font-bold">MASS TELEMETRY</span>
                    <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wide">11.2 Grams Featherweight</h4>
                    <p className="font-sans text-xs text-zinc-400 mt-0.5">Optimum ergonomic gravity distribution preventing pressure on nasal bridge.</p>
                  </div>
                </div>

              </div>

            </div>

            {/* Bottom Actions for Specs Section */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => scrollToId("opticals-shop")}
                  className="px-6 py-3.5 bg-brand-blue hover:bg-white hover:text-black text-white font-display text-[10px] font-black tracking-widest uppercase rounded-xl transition-all duration-300 shadow-xl cursor-pointer"
                >
                  SHOP COMPATIBLE FRAMES →
                </button>
                <button
                  onClick={() => scrollToId("lens-lab")}
                  className="px-6 py-3.5 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 font-mono text-[10px] tracking-wider uppercase border border-white/10 rounded-xl transition-all cursor-pointer"
                >
                  EXPLORE LENS LAB
                </button>
              </div>

              <div className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                [ SPECTACAL ZONE PRECISION LAB // BENGALURU ]
              </div>
            </div>

          </div>
        </motion.div>

        {/* HUD Bottom Scroll Prompt */}
        <div className="relative z-20 px-6 md:px-12 pb-6 flex justify-between items-center max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2 text-zinc-400 font-mono text-[9px] uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
            <span>SCROLL TO DIVE INTO CAD SPECIFICATIONS</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-24 h-1 bg-zinc-900 rounded-full overflow-hidden border border-white/10">
              <motion.div
                style={{ width: useTransform(hudProgress, (v) => `${v}%`) }}
                className="h-full bg-brand-blue"
              />
            </div>
            <span className="font-mono text-[9px] text-zinc-400 font-bold">
              {Math.round(hudProgress.get())}%
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
