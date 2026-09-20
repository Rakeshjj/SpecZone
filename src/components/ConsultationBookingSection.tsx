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

    let observer: IntersectionObserver | null = null;

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!videoRef.current) return;

            if (entry.isIntersecting) {
              if (videoRef.current.paused) {
                videoRef.current.play().catch(() => { });
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

    window.open(
      `https://wa.me/919442009991?text=${message}`,
      "_blank"
    );
  };

  const shouldReduceMotion = useReducedMotion();

  // Container animation
  const containerVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  // Heading animation
  const lineVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 40 },

    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: "easeOut",
      },
    },
  };

  // Subtitle animation
  const textVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 25 },

    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: "easeOut",
      },
    },
  };

  // Button animation
  const buttonVariants = {
    hidden: shouldReduceMotion
      ? {
        opacity: 1,
        y: 0,
        scale: 1,
      }
      : {
        opacity: 0,
        y: 25,
        scale: 0.95,
      },

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
      className="
        relative
        w-full
        min-h-[calc(100svh-74px)]
        sm:min-h-[calc(100svh-78px)]
        bg-zinc-950
        overflow-hidden
        flex
        items-start
      "
    >
      {/* ========================================================================= */}
      {/* 1. SEAMLESS MERGED BACKGROUND + EYEWEAR VIDEO                            */}
      {/* ========================================================================= */}

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Eyewear Video */}
        <div
          className="
            absolute
            top-0
            bottom-0
            right-0
            w-full
            lg:w-[54%]
            xl:w-[50%]
            h-full
          "
        >
          <video
            ref={videoRef}
            id="eyewear-consultation-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster=""
            className="
              w-full
              h-full
              object-cover
              object-center
            "
          >
            <source
              src="/videos/eyewear-craftsmanship.mp4"
              type="video/mp4"
            />
          </video>

          {/* Left edge gradient */}
          <div
            className="
              hidden
              lg:block
              absolute
              inset-y-0
              -left-1
              w-[260px]
              lg:w-[320px]
              xl:w-[380px]
              pointer-events-none
              z-[1]
            "
            style={{
              background:
                "linear-gradient(to right, #09090b 0%, #09090b 6%, rgba(9, 9, 11, 0.92) 20%, rgba(9, 9, 11, 0.65) 45%, rgba(9, 9, 11, 0.3) 72%, rgba(9, 9, 11, 0.08) 88%, rgba(9, 9, 11, 0) 100%)",
            }}
          />

          {/* Soft radial feathering */}
          <div
            className="
              hidden
              lg:block
              absolute
              inset-y-0
              -left-4
              w-[280px]
              lg:w-[350px]
              xl:w-[420px]
              pointer-events-none
              z-[2]
            "
            style={{
              background:
                "radial-gradient(ellipse 85% 65% at 0% 50%, rgba(9, 9, 11, 0.85) 0%, rgba(9, 9, 11, 0.45) 45%, rgba(9, 9, 11, 0.1) 75%, rgba(9, 9, 11, 0) 100%)",
            }}
          />
        </div>

        {/* Desktop left black area */}
        <div
          className="
            hidden
            lg:block
            absolute
            inset-y-0
            left-0
            right-[54%]
            xl:right-[50%]
            bg-zinc-950
            z-[1]
          "
        />

        {/* Mobile / Tablet overlay */}
        <div
          className="
            lg:hidden
            absolute
            inset-0
            bg-gradient-to-t
            from-zinc-950
            via-zinc-950/90
            to-zinc-950/50
            z-[1]
          "
        />

        <div
          className="
            lg:hidden
            absolute
            inset-0
            bg-gradient-to-r
            from-zinc-950/95
            via-zinc-950/80
            to-transparent
            z-[2]
          "
        />

        {/* Top feather */}
        <div
          className="
            absolute
            top-0
            left-0
            right-0
            h-12
            sm:h-16
            bg-gradient-to-b
            from-zinc-950
            to-transparent
            z-[3]
          "
        />

        {/* Bottom feather */}
        <div
          className="
            absolute
            bottom-0
            left-0
            right-0
            h-16
            sm:h-20
            bg-gradient-to-t
            from-zinc-950
            to-transparent
            z-[3]
          "
        />

        {/* Ambient glow */}
        <div
          className="
            absolute
            -left-16
            top-1/3
            -translate-y-1/2
            w-96
            h-96
            bg-brand-blue/10
            rounded-full
            blur-[120px]
            pointer-events-none
            z-[2]
          "
        />
      </div>

      {/* ========================================================================= */}
      {/* 2. FOREGROUND PROMOTIONAL CONTENT                                       */}
      {/* ========================================================================= */}

      <div
        className="
    relative
    z-10
    w-full
    max-w-none
    mx-0
    px-4
    sm:px-5
    lg:px-6
    xl:px-8
    pt-2
    sm:pt-4
    md:pt-5
    lg:pt-6
    pb-8
    sm:pb-12
  "
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="w-full max-w-[900px]"
        >
          {/* ===================================================================== */}
          {/* MAIN HEADING                                                          */}
          {/* ===================================================================== */}
          <h2
            className="
        text-4xl
        sm:text-5xl
        md:text-6xl
        lg:text-[4.4rem]
        xl:text-[5rem]
        2xl:text-[5.5rem]
        font-bold
        tracking-tight
        text-white
        leading-[1.05]
        sm:leading-[1.02]
        mb-3.5
        sm:mb-4
      "
          >
            <motion.span
              variants={lineVariants}
              className="block"
            >
              Ungal Veetla
            </motion.span>

            <motion.span
              variants={lineVariants}
              className="block"
            >
              Ellarukum{" "}
              <span className="text-[#2563eb]">
                Eye
              </span>
            </motion.span>

            <motion.span
              variants={lineVariants}
              className="block"
            >
              <span className="text-[#38bdf8]">
                Checkup
              </span>{" "}
              Pannanum
            </motion.span>

            <motion.span
              variants={lineVariants}
              className="block"
            >
              ah!
            </motion.span>
          </h2>

          {/* ===================================================================== */}
          {/* SUBTITLE                                                              */}
          {/* ===================================================================== */}

          <motion.p
            variants={textVariants}
            className="
              text-base
              sm:text-lg
              md:text-xl
              lg:text-[1.4rem]
              text-zinc-300
              font-medium
              leading-snug
              mb-4
              sm:mb-5
              whitespace-pre-line
            "
          >
            Innaike Home Eye Checkup{"\n"}
            Book Pannuga!
          </motion.p>

          {/* ===================================================================== */}
          {/* BOOK NOW BUTTON                                                       */}
          {/* ===================================================================== */}

          <motion.div variants={buttonVariants}>
            <button
              id="btn-book-home-eye-checkup"
              type="button"
              onClick={handleBookNow}
              className="
                inline-flex
                items-center
                justify-center
                gap-2.5
                px-6
                sm:px-8
                py-2.5
                sm:py-3.5
                rounded-full
                bg-brand-blue
                hover:bg-blue-600
                text-white
                font-bold
                text-xs
                sm:text-sm
                md:text-base
                tracking-wider
                uppercase
                transition-all
                duration-300
                shadow-lg
                shadow-brand-blue/30
                hover:shadow-brand-blue/50
                hover:scale-[1.03]
                active:scale-[0.98]
                group
                cursor-pointer
                w-full
                sm:w-auto
              "
            >
              <span>BOOK NOW</span>

              <ArrowRight
                className="
                  w-4
                  h-4
                  transition-transform
                  duration-300
                  group-hover:translate-x-1.5
                "
              />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}