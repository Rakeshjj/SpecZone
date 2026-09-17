import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useInView, MotionValue } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export interface StackedCardData {
  id: string;
  step: string;
  category: string;
  title: string;
  tagline: string;
  price: string;
  badge: string;
  origin: string;
  image: string;
  definition: string;
  causes: string[];
  symptoms: string[];
  treatments: string[];
  example?: {
    distance: string;
    nearAdd: string;
  };
  ctaLabel?: string;
  ctaAction?: string;
}

export const STACKED_CARDS_DATA: StackedCardData[] = [
  {
    id: "spec-01",
    step: "01",
    category: "CLINICAL EYE CARE // REFRACTIVE ERROR",
    title: "MYOPIA",
    tagline: "Short-sightedness",
    price: "Clinical Assessment",
    badge: "REFRACTIVE CONDITION",
    origin: "Axial & Curvature",
    image: "/assets/img/anti-reflections.jpg",
    definition: "A person can see near objects clearly, but distant objects appear blurred.",
    causes: [
      "Eyeball is too long (axial myopia).",
      "Cornea or lens has excessive refractive power."
    ],
    symptoms: [
      "Blurred distance vision.",
      "Squinting to see distant objects.",
      "Eye strain.",
      "Headache."
    ],
    treatments: [
      "Concave (minus) lens.",
      "Contact lenses.",
      "Refractive surgery in suitable adults."
    ],
    ctaLabel: "Book Myopia Consultation",
    ctaAction: "Myopia Assessment & Consultation"
  },
  {
    id: "spec-02",
    step: "02",
    category: "CLINICAL EYE CARE // REFRACTIVE ERROR",
    title: "HYPEROPIA",
    tagline: "Long-sightedness",
    price: "Clinical Assessment",
    badge: "REFRACTIVE CONDITION",
    origin: "Axial & Curvature",
    image: "/assets/img/hyper.jpg",
    definition: "The eye has insufficient focusing power, often making near vision difficult. Some people may have clear distance vision, especially when young.",
    causes: [
      "Eyeball is too short.",
      "Cornea or lens has insufficient refractive power."
    ],
    symptoms: [
      "Near vision difficulty.",
      "Eye strain.",
      "Headache after reading.",
      "Blurred vision, particularly at near."
    ],
    treatments: [
      "Convex (plus) lens.",
      "Contact lenses.",
      "Refractive surgery in selected patients."
    ],
    ctaLabel: "Book Hyperopia Consultation",
    ctaAction: "Hyperopia Assessment & Consultation"
  },
  {
    id: "spec-03",
    step: "03",
    category: "CLINICAL EYE CARE // REFRACTIVE ERROR",
    title: "ASTIGMATISM",
    tagline: "Meridional Refractive Variation",
    price: "Clinical Assessment",
    badge: "REFRACTIVE CONDITION",
    origin: "Corneal & Lenticular",
    image: "/assets/img/bluelens.jpg",
    definition: "The cornea or lens has different refractive powers in different meridians, causing light to focus at different points rather than one point.",
    causes: [
      "Irregular or unequal corneal curvature.",
      "Lenticular astigmatism.",
      "Corneal conditions such as keratoconus."
    ],
    symptoms: [
      "Blurred vision at distance and near.",
      "Distorted vision.",
      "Headache.",
      "Eye strain."
    ],
    treatments: [
      "Cylindrical or sphero-cylindrical spectacles.",
      "Toric contact lenses.",
      "Refractive surgery in suitable patients.",
      "Specialty contact lenses for irregular astigmatism."
    ],
    ctaLabel: "Book Astigmatism Consultation",
    ctaAction: "Astigmatism Assessment & Consultation"
  },
  {
    id: "spec-04",
    step: "04",
    category: "CLINICAL EYE CARE // ACCOMMODATION",
    title: "PRESBYOPIA",
    tagline: "Age-Related Accommodation Loss",
    price: "Clinical Assessment",
    badge: "ACCOMMODATION LOSS",
    origin: "Crystalline Lens",
    image: "/assets/img/Heritage.jpg",
    definition: "An age-related reduction in the eye's ability to focus on near objects.",
    causes: [
      "Reduced lens elasticity.",
      "Changes in accommodation with age.",
      "Usually becomes noticeable around 40–45 years, although the age varies."
    ],
    symptoms: [
      "Difficulty reading small print.",
      "Holding books farther away.",
      "Need for brighter light.",
      "Near vision blur."
    ],
    treatments: [
      "Reading glasses.",
      "Bifocal glasses.",
      "Progressive addition lenses.",
      "Multifocal contact lenses."
    ],
    example: {
      distance: "+1.00 DS",
      nearAdd: "+1.50 D"
    },
    ctaLabel: "Book Presbyopia Consultation",
    ctaAction: "Presbyopia Assessment & Consultation"
  }
];

interface StackedCardItemProps {
  key?: string | number;
  card: StackedCardData;
  index: number;
  total: number;
  scrollProgress: MotionValue<number>;
  isActive: boolean;
  onSelect: (title: string) => void;
}

const contentContainerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.02,
    },
  },
};

const slideRightPopVariants = {
  hidden: {
    opacity: 0,
    x: 20,
    y: 12,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.38,
      ease: [0.16, 1, 0.3, 1], // Smooth, responsive cubic-bezier ease out
    },
  },
};

function StackedCardItem({
  card,
  index,
  total,
  scrollProgress,
  isActive,
  onSelect
}: StackedCardItemProps) {
  // Card Motion transforms
  let input: number[];
  let yValues: number[];
  let scaleValues: number[];
  let opacityValues: number[];
  let dimValues: number[];

  // Image scroll-driven mask/clip reveal & vertical parallax transforms
  let imgInput: number[];
  let imgYValues: string[];
  let imgScaleValues: number[];
  let imgClipValues: string[];
  let imgOpacityValues: number[];

  if (index === 0) {
    // Card 1 (Myopia) starts active at progress = 0, moves up from 0.03 to 0.33
    input = [0, 0.03, 0.22, 0.33, 1.0];
    yValues = [0, 0, -350, -850, -850];
    scaleValues = [1, 1, 0.98, 0.95, 0.95];
    opacityValues = [1, 1, 0.9, 0, 0];
    dimValues = [0, 0, 0, 0, 0];

    // Card 1 image starts fully visible in frame, moves upward and leaves during transition
    imgInput = [0, 0.03, 0.18, 0.33, 1.0];
    imgYValues = ["0%", "0%", "-10%", "-20%", "-20%"];
    imgScaleValues = [1.0, 1.0, 0.98, 0.96, 0.96];
    imgClipValues = [
      "inset(0% 0% 0% 0%)",
      "inset(0% 0% 0% 0%)",
      "inset(0% 0% 12% 0%)",
      "inset(0% 0% 25% 0%)",
      "inset(0% 0% 25% 0%)"
    ];
    imgOpacityValues = [1.0, 1.0, 0.75, 0.2, 0.2];
  } else if (index === 1) {
    // Card 2 (Hyperopia) rests underneath at progress 0, becomes active at 0.33, leaves at 0.66
    input = [0, 0.03, 0.33, 0.36, 0.55, 0.66, 1.0];
    yValues = [48, 48, 0, 0, -350, -850, -850];
    scaleValues = [0.94, 0.94, 1, 1, 0.98, 0.95, 0.95];
    opacityValues = [0.75, 0.75, 1, 1, 0.9, 0, 0];
    dimValues = [0.35, 0.35, 0, 0, 0, 0, 0];

    // Card 2 image starts below frame, reveals upward into frame during transition 1 (0.03 -> 0.33),
    // rests active (0.33 -> 0.36), then moves upward and leaves during transition 2 (0.36 -> 0.66)
    imgInput = [0, 0.03, 0.18, 0.33, 0.36, 0.51, 0.66, 1.0];
    imgYValues = ["14%", "14%", "7%", "0%", "0%", "-10%", "-20%", "-20%"];
    imgScaleValues = [1.08, 1.08, 1.04, 1.0, 1.0, 0.98, 0.96, 0.96];
    imgClipValues = [
      "inset(18% 0% 0% 0%)",
      "inset(18% 0% 0% 0%)",
      "inset(8% 0% 0% 0%)",
      "inset(0% 0% 0% 0%)",
      "inset(0% 0% 0% 0%)",
      "inset(0% 0% 12% 0%)",
      "inset(0% 0% 25% 0%)",
      "inset(0% 0% 25% 0%)"
    ];
    imgOpacityValues = [0.3, 0.3, 0.7, 1.0, 1.0, 0.75, 0.2, 0.2];
  } else if (index === 2) {
    // Card 3 (Astigmatism) emerges underneath at 0.33, becomes active at 0.66, leaves at 1.00
    input = [0, 0.22, 0.33, 0.66, 0.69, 0.88, 1.0];
    yValues = [56, 56, 48, 0, 0, -350, -850];
    scaleValues = [0.91, 0.91, 0.94, 1, 1, 0.98, 0.95];
    opacityValues = [0, 0, 0.75, 1, 1, 0.9, 0];
    dimValues = [0.35, 0.35, 0.35, 0, 0, 0, 0];

    // Card 3 image starts below frame, reveals upward during transition 2 (0.36 -> 0.66),
    // rests active (0.66 -> 0.69), then moves upward and leaves during transition 3 (0.69 -> 0.97)
    imgInput = [0, 0.36, 0.51, 0.66, 0.69, 0.83, 0.97, 1.0];
    imgYValues = ["14%", "14%", "7%", "0%", "0%", "-10%", "-20%", "-20%"];
    imgScaleValues = [1.08, 1.08, 1.04, 1.0, 1.0, 0.98, 0.96, 0.96];
    imgClipValues = [
      "inset(18% 0% 0% 0%)",
      "inset(18% 0% 0% 0%)",
      "inset(8% 0% 0% 0%)",
      "inset(0% 0% 0% 0%)",
      "inset(0% 0% 0% 0%)",
      "inset(0% 0% 12% 0%)",
      "inset(0% 0% 25% 0%)",
      "inset(0% 0% 25% 0%)"
    ];
    imgOpacityValues = [0.3, 0.3, 0.7, 1.0, 1.0, 0.75, 0.2, 0.2];
  } else {
    // Card 4 (Presbyopia) emerges underneath at 0.66, becomes active at 0.97, remains active
    input = [0, 0.55, 0.66, 0.97, 1.0];
    yValues = [56, 56, 48, 0, 0];
    scaleValues = [0.91, 0.91, 0.94, 1, 1];
    opacityValues = [0, 0, 0.75, 1, 1];
    dimValues = [0.35, 0.35, 0.35, 0, 0];

    // Card 4 image starts below frame, reveals upward during transition 3 (0.66 -> 0.97),
    // remains active in frame
    imgInput = [0, 0.66, 0.82, 0.97, 1.0];
    imgYValues = ["14%", "14%", "7%", "0%", "0%"];
    imgScaleValues = [1.08, 1.08, 1.04, 1.0, 1.0];
    imgClipValues = [
      "inset(18% 0% 0% 0%)",
      "inset(18% 0% 0% 0%)",
      "inset(8% 0% 0% 0%)",
      "inset(0% 0% 0% 0%)",
      "inset(0% 0% 0% 0%)"
    ];
    imgOpacityValues = [0.3, 0.3, 0.7, 1.0, 1.0];
  }

  // Card motion transforms
  const y = useTransform(scrollProgress, input, yValues);
  const scale = useTransform(scrollProgress, input, scaleValues);
  const opacity = useTransform(scrollProgress, input, opacityValues);
  const dim = useTransform(scrollProgress, input, dimValues);
  const pointerEvents = useTransform(opacity, (op) => (op > 0.4 ? "auto" : "none"));

  // Image scroll-driven mask & parallax transforms
  const imageY = useTransform(scrollProgress, imgInput, imgYValues);
  const imageScale = useTransform(scrollProgress, imgInput, imgScaleValues);
  const imageClipPath = useTransform(scrollProgress, imgInput, imgClipValues);
  const imageOpacity = useTransform(scrollProgress, imgInput, imgOpacityValues);

  // Descending z-index: Card 0 is on top (40), Card 1 (30), Card 2 (20), Card 3 (10)
  const zIndex = (total - index) * 10;

  return (
    <motion.div
      id={`stacked-card-${card.id}`}
      style={{
        y,
        scale,
        opacity,
        zIndex,
        pointerEvents,
      }}
      className="absolute inset-x-0 mx-auto w-full max-w-4xl lg:max-w-5xl rounded-2xl sm:rounded-3xl bg-[#111115]/95 border border-white/15 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden will-change-transform"
    >
      {/* Depth shading overlay when card is positioned underneath active card */}
      <motion.div
        style={{ opacity: dim }}
        className="absolute inset-0 bg-black pointer-events-none z-30 transition-opacity duration-300"
      />

      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[460px] sm:min-h-[490px] md:min-h-[510px]">
        {/* Left Side: Editorial Image & Status Badges */}
        <div className="image-wrapper md:col-span-5 relative h-[140px] sm:h-[180px] md:h-auto overflow-hidden bg-zinc-950 flex items-center justify-center group">
          <motion.img
            src={card.image}
            alt={card.title}
            style={{
              y: imageY,
              scale: imageScale,
              clipPath: imageClipPath,
              opacity: imageOpacity,
              willChange: "transform, clip-path, opacity",
            }}
            className="image w-full h-full object-cover object-center"
            loading="lazy"
          />

          {/* Cinematic Vignette & Light Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111115] via-transparent to-black/30 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />

          {/* Bottom Floating Status & Origin Pill */}
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 flex items-center gap-2">
            <div className="px-3 py-1 rounded-full bg-black/75 border border-white/20 backdrop-blur-md flex items-center gap-1.5 shadow-lg">
              <span className="text-zinc-400 text-[10px] uppercase font-mono">Status:</span>
              <span className="text-white font-semibold text-xs sm:text-sm tracking-tight">{card.price}</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-400 bg-black/50 px-2 py-1 rounded-full border border-white/10 backdrop-blur-md">
              {card.origin}
            </span>
          </div>
        </div>

        {/* Right Side: Specifications & Clinical Narrative Details */}
        <motion.div
          variants={contentContainerVariants}
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
          className="md:col-span-7 p-4 sm:p-5 md:p-6 flex flex-col justify-between space-y-2.5 sm:space-y-3 bg-gradient-to-b from-[#15151a] to-[#101013]"
        >
          {/* Header */}
          <motion.div variants={slideRightPopVariants} className="space-y-0.5 sm:space-y-1">
            <div className="flex items-center justify-end">
              <span className="text-[11px] font-mono text-zinc-500 tracking-wider">
                {card.step} / 0{total}
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
              {card.title}
            </h3>

            <p className="text-xs sm:text-sm font-serif italic text-zinc-400 tracking-wide font-normal">
              {card.tagline}
            </p>
          </motion.div>

          {/* Section: Definition */}
          <motion.div variants={slideRightPopVariants} className="p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
            <h4 className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-white font-bold mb-0.5 sm:mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              Definition
            </h4>
            <p className="text-xs sm:text-[13px] text-zinc-400 leading-relaxed font-sans">
              {card.definition}
            </p>
          </motion.div>

          {/* Sections: Cause, Symptoms, Treatment in 3 organized columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
            {/* Cause */}
            <motion.div variants={slideRightPopVariants} className="p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors flex flex-col justify-start">
              <h4 className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-white font-bold mb-1 sm:mb-1.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                Cause
              </h4>
              <ul className="space-y-1 text-[11px] sm:text-xs text-zinc-400 font-sans leading-snug">
                {card.causes.map((cause, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-white font-bold text-sm leading-none mt-0.5">•</span>
                    <span>{cause}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Symptoms */}
            <motion.div variants={slideRightPopVariants} className="p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors flex flex-col justify-start">
              <h4 className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-white font-bold mb-1 sm:mb-1.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                Symptoms
              </h4>
              <ul className="space-y-1 text-[11px] sm:text-xs text-zinc-400 font-sans leading-snug">
                {card.symptoms.map((symptom, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-white font-bold text-sm leading-none mt-0.5">•</span>
                    <span>{symptom}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Treatment */}
            <motion.div variants={slideRightPopVariants} className="p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors flex flex-col justify-start">
              <h4 className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-white font-bold mb-1 sm:mb-1.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                Treatment
              </h4>
              <ul className="space-y-1 text-[11px] sm:text-xs text-zinc-400 font-sans leading-snug">
                {card.treatments.map((treatment, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-white font-bold text-sm leading-none mt-0.5">•</span>
                    <span>{treatment}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Optional Example Banner (Presbyopia) */}
          {card.example && (
            <motion.div variants={slideRightPopVariants} className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/15 flex flex-wrap items-center justify-between gap-1.5 text-[11px] font-mono">
              <span className="text-white font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                Example:
              </span>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-zinc-400">
                <span>Distance prescription: <strong className="text-zinc-200 font-semibold">{card.example.distance}</strong></span>
                <span className="text-zinc-600 hidden sm:inline">•</span>
                <span>Near addition: <strong className="text-zinc-200 font-semibold">{card.example.nearAdd}</strong></span>
              </div>
            </motion.div>
          )}

          {/* Bottom Action Strip */}
          <motion.div variants={slideRightPopVariants} className="pt-2 sm:pt-2.5 border-t border-white/10 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => onSelect(card.ctaAction || `${card.title} Consultation`)}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-all duration-300 font-sans text-xs sm:text-sm font-semibold tracking-wide shadow-[0_4px_16px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.45)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>{card.ctaLabel || `Book ${card.title} Consultation`}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

interface StackedCardsSectionProps {
  onBookClick?: (serviceName?: string) => void;
}

export default function StackedCardsSection({ onBookClick }: StackedCardsSectionProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const isSectionInView = useInView(containerRef, { amount: 0.05, once: false });

  // Monitor scroll progress across the pinned container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.22) {
      setActiveCardIndex(0);
    } else if (latest < 0.52) {
      setActiveCardIndex(1);
    } else if (latest < 0.82) {
      setActiveCardIndex(2);
    } else {
      setActiveCardIndex(3);
    }
  });

  const handleSelectService = (title: string) => {
    if (onBookClick) {
      onBookClick(title);
    } else {
      const el = document.getElementById("home-eye-care");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      id="stacked-cards-archive"
      className="relative bg-[#09090b] text-white border-t border-white/10"
      style={{ height: "350vh" }}
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-blue/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* STICKY PINNED VIEWPORT */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-12 z-20">
        {/* Central Card Stacking Arena */}
        <div className="relative w-full max-w-4xl lg:max-w-5xl mx-auto flex items-center justify-center min-h-[480px]">
          {STACKED_CARDS_DATA.map((card, index) => (
            <StackedCardItem
              key={card.id}
              card={card}
              index={index}
              total={STACKED_CARDS_DATA.length}
              scrollProgress={scrollYProgress}
              isActive={isSectionInView && activeCardIndex === index}
              onSelect={handleSelectService}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
