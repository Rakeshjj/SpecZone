import { useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

interface ConsultationBookingSectionProps {
  onSuccessNavigate?: () => void;
}

export default function ConsultationBookingSection({
  onSuccessNavigate,
}: ConsultationBookingSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Smooth reliable autoplay without jitter
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      if (video.paused) {
        video.play().catch(() => {
          // Autoplay policy fallback
        });
      }
    };

    playVideo();

    // IntersectionObserver to keep playback efficient and stable
    let observer: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!videoRef.current) return;
            if (entry.isIntersecting) {
              if (videoRef.current.paused) {
                videoRef.current.play().catch(() => {});
              }
            } else {
              if (!videoRef.current.paused) {
                videoRef.current.pause();
              }
            }
          });
        },
        { rootMargin: "100px 0px" }
      );
      observer.observe(video);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  const handleBookNow = () => {
    if (onSuccessNavigate) {
      onSuccessNavigate();
    }
    const message = encodeURIComponent(
      "Hi Spectacal Zone! Ungal Veetla Ellarukum Eye checkup Pananum ah! Innaike Home Eye Checkup Book Pannuga - I would like to book a Home Eye Checkup."
    );
    window.open(`https://wa.me/919442009991?text=${message}`, "_blank");
  };

  const shouldReduceMotion = useReducedMotion();

  // Container variants with stagger of ~120ms between elements
  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  // Heading lines: fade in + upward slide from 40px below
  const lineVariants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: "easeOut",
      },
    },
  };

  // Supporting text: slight fade + upward movement
  const textVariants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: "easeOut",
      },
    },
  };

  // CTA button: fade in + upward slide and scale from 0.95 to 1
  const buttonVariants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 25, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="consultation-booking"
      className="relative w-full h-[calc(100svh-74px)] sm:h-[calc(100svh-78px)] min-h-[460px] max-h-[720px] bg-zinc-950 overflow-hidden flex items-center"
    >
      {/* ========================================================================= */}
      {/* 1. SEAMLESS MERGED BACKGROUND & CLEAR EYEWEAR VIDEO LAYER (RIGHT 55-60%)   */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Eyewear / Specs Video: Clear, stable, autoplay, loop, object-fit cover */}
        <div className="absolute top-0 bottom-0 right-0 w-full lg:w-[58%] xl:w-[60%] h-full">
          <video
            ref={videoRef}
            id="eyewear-consultation-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/videos/eyewear-video-poster.jpg"
            className="w-full h-full object-cover object-center lg:object-center"
          >
            <source src="/videos/eyewear-craftsmanship.mp4" type="video/mp4" />
          </video>
        </div>

        {/* ======================================================================= */}
        {/* 2. SMOOTH DARK GRADIENT BLENDING LEFT CONTENT & RIGHT VIDEO AS ONE       */}
        {/* ======================================================================= */}
        {/* Desktop deep-black coverage on left transitioning seamlessly into video */}
        <div className="hidden lg:block absolute inset-y-0 left-0 w-[42%] bg-zinc-950 z-[1]" />
        <div className="hidden lg:block absolute inset-y-0 left-[41%] w-36 xl:w-48 bg-gradient-to-r from-zinc-950 via-zinc-950/85 to-transparent z-[2]" />

        {/* Mobile & Tablet Gradient Overlay so video shows cleanly while text remains 100% legible */}
        <div className="lg:hidden absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/85 to-zinc-950/50 z-[1]" />
        <div className="lg:hidden absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/70 to-transparent z-[2]" />

        {/* Subtle top and bottom feathering */}
        <div className="absolute top-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-b from-zinc-950 to-transparent z-[3]" />
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-t from-zinc-950 to-transparent z-[3]" />

        {/* Ambient optics glow */}
        <div className="absolute -left-16 top-1/2 -translate-y-1/2 w-96 h-96 bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none z-[2]" />
      </div>

      {/* ========================================================================= */}
      {/* 3. FOREGROUND PROMOTIONAL CONTENT LAYER                                   */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-6 sm:py-8 lg:py-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="max-w-xl lg:max-w-lg xl:max-w-xl"
        >
          {/* Main Large Bold Heading Matching Design */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] xl:text-[2.9rem] font-bold tracking-tight text-white leading-[1.1] sm:leading-[1.08] mb-3.5 sm:mb-4">
            <motion.span variants={lineVariants} className="block">
              Ungal Veetla
            </motion.span>
            <motion.span variants={lineVariants} className="block">
              Ellarukum <span className="text-[#2563eb]">Eye</span>
            </motion.span>
            <motion.span variants={lineVariants} className="block">
              <span className="text-[#38bdf8]">Checkup</span> Pannanum
            </motion.span>
            <motion.span variants={lineVariants} className="block">
              ah!
            </motion.span>
          </h2>

          {/* Supporting Text Underneath */}
          <motion.p
            variants={textVariants}
            className="text-base sm:text-lg md:text-xl text-zinc-300 font-medium leading-snug mb-6 sm:mb-7 whitespace-pre-line"
          >
            Innaike Home Eye Checkup{"\n"}Book Pannuga!
          </motion.p>

          {/* ONLY ONE CTA Button: BOOK NOW */}
          <motion.div variants={buttonVariants}>
            <button
              id="btn-book-home-eye-checkup"
              type="button"
              onClick={handleBookNow}
              className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-brand-blue hover:bg-blue-600 text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-xl shadow-brand-blue/30 hover:shadow-brand-blue/50 hover:scale-[1.03] active:scale-[0.98] group cursor-pointer w-full sm:w-auto"
            >
              <span>BOOK NOW</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
