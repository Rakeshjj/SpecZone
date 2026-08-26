import { useState, useRef, MouseEvent } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Sparkles, Eye, Compass, ArrowRight } from "lucide-react";

export default function ShowroomShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax zoom and translation effects as we scroll past
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);
  const textTranslate = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlightPos({ x, y });
  };

  return (
    <section
      ref={containerRef}
      id="showroom-showcase"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative min-h-screen bg-zinc-950 flex flex-col justify-center py-20 px-6 md:px-12 overflow-hidden border-b border-white/5"
    >
      {/* Interactive Ambient Spotlight Backlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700 ease-out"
        style={{
          opacity: isHovered ? 0.45 : 0.25,
          background: `radial-gradient(circle 500px at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(10, 100, 255, 0.12) 0%, transparent 100%)`,
        }}
      />

      <motion.div
        style={{ scale, opacity }}
        className="max-w-7xl mx-auto w-full z-10"
      >
        {/* Full-Bleed 100% Width Flagship Video Showcase */}
        <div className="relative group w-full aspect-[16/10] md:aspect-[21/9] bg-zinc-900/40 rounded-2xl overflow-hidden border border-white/10 hover:border-brand-blue/40 backdrop-blur-sm transition-all duration-500 shadow-xl">
          {/* Embedded YouTube video playing seamlessly as ambient background */}
          <iframe
            src="https://www.youtube.com/embed/qFLCx8naQqE?autoplay=1&mute=1&loop=1&playlist=qFLCx8naQqE&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1"
            title="Showroom Showcase Video"
            className="absolute inset-0 w-full h-full object-cover scale-[1.15] opacity-90 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />

          {/* Futuristic Reflective gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/10 via-transparent to-transparent pointer-events-none" />
        </div>
      </motion.div>

      {/* High-Impact Glowing Blue Accent Bar at the Bottom - commented out as requested */}
      {/*
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-brand-blue shadow-[0_-8px_30px_rgba(10,100,255,0.85)] z-20 flex justify-between items-center px-6 md:px-12 pointer-events-none">
        <span className="hidden md:inline font-mono text-[8px] text-white/50 tracking-widest uppercase">
          [ SPECSZONE ATELIER REVEAL v1.959 ]
        </span>
        <span className="hidden md:inline font-mono text-[8px] text-white/50 tracking-widest uppercase">
          SYSTEM_RENDER_ACTIVE
        </span>
      </div>
      */}
    </section>
  );
}
