import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { X, BookOpen, Clock, Calendar, ChevronRight, Share2, Sparkles } from "lucide-react";
import { Article } from "../types";
import ArticleDetailView from "./ArticleDetailView";

const ARTICLES_DATA: Article[] = [
  {
    id: 1,
    title: "Myopia (Short-sightedness)",
    subtitle: "Refractive Error Clinical Overview",
    category: "Clinical Eye Care",
    readTime: "4 min read",
    date: "July 15, 2026",
    thumbnail: "/assets/img/anti-reflections.jpg",
    summary: "A person can see near objects clearly but distant objects appear blurred.",
    clinicalDetails: {
      definition: "A person can see near objects clearly but distant objects appear blurred.",
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
      ]
    },
    content: [
      "Myopia, commonly known as short-sightedness or near-sightedness, is one of the most widespread refractive conditions in the modern optical world. Individuals experiencing myopia enjoy sharp focus when observing nearby digital screens or reading literature, while distant street signs, presentation boards, or road signs appear noticeably blurred.",
      "From an optical physics standpoint, incoming parallel light rays do not focus cleanly on the retinal photoreceptors. Instead, they converge at an early focal plane in front of the retina. This typically occurs because the eyeball's physical axial length is excessively long, or because the curvature of the cornea and crystalline lens bends incoming light with excessive refractive power.",
      "Correction is achieved using concave (minus) lenses, which gently diverge incoming light rays prior to entering the pupil, displacing the optical focus backward directly onto the retina. Modern clinical advancements—including customized wavefront lenses, orthokeratology, and refractive laser correction in eligible adults—provide crisp, high-definition visual resolution and fatigue relief."
    ]
  },
  {
    id: 2,
    title: "Hyperopia (Long-sightedness)",
    subtitle: "Focusing Power Deficit Overview",
    category: "Clinical Eye Care",
    readTime: "4 min read",
    date: "July 18, 2026",
    thumbnail: "/assets/img/hyper.jpg",
    summary: "The eye has insufficient focusing power, often making near vision difficult. Some people may have clear distance vision, especially when young.",
    clinicalDetails: {
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
      ]
    },
    content: [
      "Hyperopia, commonly termed long-sightedness or far-sightedness, is an optical refractive state wherein the eye possesses inadequate natural focusing power. When parallel rays of light enter an unaccommodated hyperopic eye, they project toward a theoretical focal plane located behind the sensory retina instead of focusing directly upon it.",
      "This insufficient convergence occurs either because the physical axial length of the eyeball is too short, or because the refractive curvatures of the cornea and crystalline lens lack sufficient optical power. In younger individuals, constant muscular accommodation by the ciliary body can sometimes overcome mild hyperopia for distance, but this continuous exertion leads to severe eye strain, asthenopia, and frontal headaches after prolonged reading.",
      "Optical management focuses on convex (plus) lenses. Convex lenses converge light rays prior to their entrance into the eye, drawing the focal plane smoothly forward directly onto the retina. Corrective treatment options include precision-crafted convex spectacles, daily and monthly contact lenses, and refractive laser surgery for selected eligible adult patients."
    ]
  },
  {
    id: 3,
    title: "Astigmatism",
    subtitle: "Corneal & Lenticular Curvature Asymmetry",
    category: "Clinical Eye Care",
    readTime: "5 min read",
    date: "July 22, 2026",
    thumbnail: "/assets/img/bluelens.jpg",
    summary: "The cornea or lens has different refractive powers in different meridians, causing light to focus at different points rather than one point.",
    clinicalDetails: {
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
      ]
    },
    content: [
      "Astigmatism is an asymmetrical refractive condition where the front surface of the cornea or the intraocular crystalline lens exhibits unequal curvature across its various meridians—resembling the oblong profile of an American football or rugby ball rather than a uniform spherical soccer ball.",
      "Because light traversing different meridians is refracted at varying degrees of steepness, incoming rays cannot focus at a single, unified focal point. Instead, multiple focal points or focal lines form either in front of, within, or behind the retina. This optical distortion causes image ghosting, shadowing, and visual blurring across both near reading tasks and long-distance horizons.",
      "Correction requires cylindrical or sphero-cylindrical optical lenses ground with specific directional axes to equalize refractive power across all meridians. Modern management pathways include digital free-form cylindrical lenses, stabilized toric contact lenses, specialized scleral and rigid gas-permeable (RGP) lenses for keratoconus, and customized topography-guided refractive procedures."
    ]
  },
  {
    id: 4,
    title: "Presbyopia",
    subtitle: "Age-Related Accommodative Evolution",
    category: "Clinical Eye Care",
    readTime: "5 min read",
    date: "July 25, 2026",
    thumbnail: "/assets/img/lens1.jpg",
    summary: "An age-related reduction in the eye’s ability to focus on near objects, usually noticeable around 40–45 years.",
    clinicalDetails: {
      definition: "An age-related reduction in the eye’s ability to focus on near objects.",
      causes: [
        "Reduced lens elasticity.",
        "Changes in accommodation with age."
      ],
      note: "Usually becomes noticeable around 40–45 years, although the age varies.",
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
      example: "Distance prescription +1.00 DS, near addition +1.50 D."
    },
    content: [
      "Presbyopia is a natural, universal physiological aging process affecting the ocular accommodation system. Beginning noticeably between ages 40 and 45, the natural crystalline lens within the eye gradually loses its innate elasticity, while the surrounding ciliary muscle mechanics experience natural alterations in accommodative amplitude.",
      "Consequently, the crystalline lens can no longer dynamically steepen its curvature to provide sufficient focal power for close-up tasks. Individuals experience typical compensatory habits, such as pushing smartphones, newspapers, and fine print farther away toward arm's length or seeking significantly brighter ambient illumination.",
      "Presbyopic optical correction has reached extraordinary precision. Beyond traditional reading glasses and segmented bifocals, modern digital progressive addition lenses (PALs) provide a seamless, invisible gradient of power covering distance, intermediate computer screens, and close reading zones without visual jump. Prescriptions are tailored with precision near-additions (e.g., Distance prescription +1.00 DS with a near addition of +1.50 D) and multifocal contact lenses."
    ]
  },
  {
    id: 5,
    title: "Understanding Digital Eyestrain & Wavefront Custom Lenses",
    category: "Ocular Health",
    readTime: "5 min read",
    date: "July 10, 2026",
    thumbnail: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=600",
    summary: "As digital screens dominate our daily schedules, learn how custom blue-light filtering and computerized wavefront refractometry relieve fatigue.",
    content: [
      "In our hyper-connected modern era, the average professional spends upwards of 8 to 11 hours daily gazing at digital screens—laptops, smartphones, and tablets. This prolonged exposure triggers a condition known as Computer Vision Syndrome (CVS) or digital eyestrain.",
      "CVS manifests as dry eyes, blurry vision, headaches, and physical neck fatigue. The root culprit is high-energy visible (HEV) blue-light scatter combined with constant close-up focus demand, which forces the ciliary muscles in your eyes to remain permanently tensed.",
      "At Spectacal Zone, we address CVS through personalized Wavefront custom lenses. Unlike standard prescription lenses, wavefront refraction maps the unique physical curves and microscopic imperfections of your eye's surface.",
      "By adding advanced premium anti-reflective coatings and biological blue-light absorption matrices, our wavefront progressive lenses block harmful blue-violet wavelengths while restoring a perfectly relaxed, natural focal point. Experience comfortable, high-definition reading across all screens without strain."
    ]
  },
  {
    id: 6,
    title: "Sartorial Eyewear: Aligning Frame Contours to Your Face Shape",
    category: "Style Styling",
    readTime: "4 min read",
    date: "June 28, 2026",
    thumbnail: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=600",
    summary: "Selecting eyewear is an architectural art. Discover how to balance rectangular, oval, and heart-shaped visages with premium designer frames.",
    content: [
      "Eyewear is the ultimate sartorial punctuation—it sits at the very epicenter of your facial canvas. Selecting the perfect designer frame is not merely about finding a color you like; it is a delicate architectural exercise in balancing geometric proportions.",
      "The golden rule of eyewear styling is to choose a frame shape that directly contrasts your natural facial structure. A round face thrives under sharp rectangular, square, or geometric frames that introduce structured angles and elongate the visage.",
      "Conversely, a strongly rectangular or angular jawline is softened and balanced beautifully by circular, oval, or cat-eye structures. If you possess an oval face, you are blessed with natural symmetry and can boldly pull off oversized pilot frames or unconventional avant-garde shapes.",
      "Our optical styling consultants at Spectacal Zone are trained in bespoke facial-fit adjustments. We evaluate your skin tone, bridge size, and temple lines to curate a matching selection of Balmain Paris, Prada, and Maybach eyewear that accentuates your authentic, dignified persona."
    ]
  },
  {
    id: 7,
    title: "Acoustic Sophistication: The Era of Bluetooth AI Hearing Aids",
    category: "Audiology Tech",
    readTime: "6 min read",
    date: "June 14, 2026",
    thumbnail: "https://images.unsplash.com/photo-1598128558393-70ff21433be0?auto=format&fit=crop&q=80&w=600",
    summary: "Modern hearing aids are microcomputers. Explore how neural background-noise compression and direct smartphone streaming redefine sound.",
    content: [
      "Audiological solutions have undergone an incredible technological renaissance. The heavy, bulky, analog hearing devices of the past have been replaced by state-of-the-art acoustic instruments that act as sophisticated microcomputers.",
      "Today's hearing aids are designed with near-invisible profiles that nestle comfortably within the ear canal. Behind this miniature form factor is high-fidelity sound processing powered by artificial intelligence and custom neural networks.",
      "These modern chips perform real-time acoustic scene analysis—sampling environmental background noise up to 500 times per second to selectively isolate and amplify human conversation while suppressing screeching winds or traffic rumble.",
      "Furthermore, direct Bluetooth connectivity allows you to stream telephone calls, podcast episodes, and televisions directly into your auditory instruments. Visit our dedicated audiology rooms in Chennai and Coimbatore to receive a professional hearing calibration and discover invisible audio refinement."
    ]
  },
  {
    id: 8,
    title: "Premium Frames & Bespoke Luxury Eyewear Craftsmanship",
    category: "Eyewear Collection",
    readTime: "5 min read",
    date: "June 02, 2026",
    thumbnail: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600",
    summary: "Explore the architectural craftsmanship, Japanese titanium hinges, and hand-polished Italian acetates behind our curated luxury designer frames.",
    content: [
      "True luxury eyewear transcends seasonal fashion; it represents a synthesis of precision micro-engineering and artisanal heritage. Our premium frames collection brings together the world's most prestigious optical houses, from Maybach and Cartier to Lindberg and Chrome Hearts.",
      "Each frame begins with carefully sourced raw materials: aerospace-grade beta-titanium from Sabae, Japan, and aged organic cotton-based Mazzucchelli acetate from Varese, Italy. These materials ensure extraordinary lightness, hypoallergenic comfort, and lasting structural integrity.",
      "Our bespoke fitting process takes precise measurements of pantoscopic tilt, vertex distance, and facial symmetry, ensuring your frames rest with weightless perfection while expressing uncompromising elegance and distinctive style."
    ]
  },
  {
    id: 9,
    title: "Advanced Eye Care & Comprehensive Clinical Diagnostics",
    category: "Vision Care",
    readTime: "6 min read",
    date: "May 21, 2026",
    thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600",
    summary: "From high-definition digital retinal topography to automated corneal wave analysis, discover how comprehensive diagnostic evaluations preserve lifelong ocular vitality.",
    content: [
      "Preventive ocular healthcare begins with clinical diagnostic precision. Our flagship eye care centers are equipped with hospital-grade ophthalmic equipment that goes far beyond standard visual acuity charts.",
      "Using non-mydriatic ultra-widefield retinal imaging, automated corneal topography, and optical coherence tomography (OCT), our optometrists can detect subtle early indicators of glaucoma, macular degeneration, and diabetic retinopathy long before physical symptoms appear.",
      "We believe regular ocular wellness checks are an essential pillar of total well-being. Experience a comprehensive 21-point ocular diagnostic examination tailored to your lifestyle and visual demands."
    ]
  },
  {
    id: 10,
    title: "Smart Lens Solutions: High-Index, Transitions & Anti-Glare Optics",
    category: "Lens Technology",
    readTime: "4 min read",
    date: "May 10, 2026",
    thumbnail: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800",
    summary: "Discover the newest generation of transition photochromics, ultra-thin high-index materials, and anti-smudge hydrophobic molecular coatings.",
    content: [
      "Optical science continues to break boundaries in clarity, thinness, and environmental adaptability. Smart lens solutions integrate multi-spectrum nano-coatings directly into high-refractive-index polymers.",
      "Whether you require digital free-form progressive lenses with ultra-wide reading corridors, rapid-response photochromic transitions that darken instantly in sunlight, or oleophobic anti-smudge finishes that repel rain and fingerprints, our optical lab crafts lenses custom-cut to the millimeter.",
      "Experience crystalline edge-to-edge optical resolution, 100% UVA/UVB protection, and zero distortion, no matter how complex or high your optical prescription may be."
    ]
  }
];

// Apple-style cubic-bezier easing for smooth cinematic reveals
const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;

interface BlogSectionProps {
  onSelectArticle?: (article: Article) => void;
}

export default function BlogSection({ onSelectArticle }: BlogSectionProps) {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const cardVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 80 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: EASE_PREMIUM,
        delay: shouldReduceMotion ? 0 : (i % 3) * 0.12,
      },
    }),
  };

  return (
    <section
      id="blog"
      className="relative min-h-screen bg-zinc-950 py-24 px-6 md:px-12 border-b border-white/5 overflow-hidden flex flex-col justify-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(10,100,255,0.01)_0%,transparent_60%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto w-full z-10 space-y-16">
        {/* Section Header with smooth entrance */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8"
        >
          <div className="space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-[50px] font-black text-white uppercase leading-[0.95] tracking-tight">
              EYE CARE <br />
              <span className="text-zinc-500 italic font-black">CHRONICLES</span>
            </h2>
          </div>

          <span className="font-mono text-xs text-zinc-400 tracking-wider uppercase border-b border-white/10 pb-1 hover:text-brand-blue hover:border-brand-blue cursor-pointer transition-colors">
            All Articles →
          </span>
        </motion.div>

        {/* 3-Column Blog Grid with Smooth Scroll-Triggered Slide-Up Animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {ARTICLES_DATA.map((article, index) => (
            <motion.div
              key={article.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={cardVariants}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: -8,
                      scale: 1.025,
                      transition: { type: "spring", stiffness: 400, damping: 25 },
                    }
              }
              className="bg-zinc-900/40 backdrop-blur-sm border border-white/10 hover:border-brand-blue/40 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-brand-blue/10 flex flex-col justify-between group transition-colors duration-300"
            >
              <div>
                {/* Thumbnail */}
                <div className="aspect-[16/10] w-full bg-zinc-950/20 overflow-hidden relative border-b border-white/10">
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800";
                    }}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-95 group-hover:scale-108 transition-all duration-700 ease-out"
                  />
                  <span className="absolute top-4 left-4 bg-zinc-950/60 backdrop-blur-md text-zinc-100 font-mono text-[9px] tracking-widest uppercase px-3 py-1 rounded-full border border-white/10 group-hover:border-brand-blue/30 transition-colors">
                    {article.category}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-3">
                  <div className="flex gap-4 text-zinc-500 font-mono text-[9px] uppercase tracking-widest">
                    <span className="flex items-center gap-1"><Calendar size={10} /> {article.date}</span>
                    <span className="flex items-center gap-1"><Clock size={10} /> {article.readTime}</span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-white uppercase tracking-tight group-hover:text-brand-blue transition-colors duration-300 leading-snug">
                    {article.title}
                  </h3>

                  <p className="font-sans text-xs text-zinc-350 leading-relaxed font-light">
                    {article.summary}
                  </p>
                </div>
              </div>

              {/* Read button CTA */}
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => {
                    if (onSelectArticle) {
                      onSelectArticle(article);
                    } else {
                      setSelectedArticle(article);
                    }
                  }}
                  className="flex items-center gap-1 font-mono text-[10px] text-brand-blue group-hover:text-white font-bold tracking-widest uppercase cursor-pointer transition-colors"
                >
                  <span>Read Article</span>
                  <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full formatted Article Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-zinc-950/75 backdrop-blur-md z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-zinc-900/60 border border-white/10 backdrop-blur-md rounded-2xl overflow-hidden max-w-2xl w-full relative shadow-2xl flex flex-col max-h-[85vh]"
            >
              {/* Header Image cover */}
              <div className="h-48 md:h-64 relative w-full bg-zinc-950 shrink-0">
                <img
                  src={selectedArticle.thumbnail}
                  alt={selectedArticle.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800";
                  }}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent pointer-events-none" />
                
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-zinc-950/40 backdrop-blur-md border border-white/10 hover:border-brand-blue text-zinc-400 hover:text-brand-blue flex items-center justify-center transition-all cursor-pointer shadow-md"
                >
                  <X size={16} />
                </button>

                <div className="absolute bottom-6 left-6 right-6 space-y-1">
                  <span className="bg-brand-blue/10 border border-brand-blue/20 text-brand-blue font-mono text-[9px] tracking-widest uppercase px-3 py-1 rounded-full">
                    {selectedArticle.category}
                  </span>
                  <h4 className="font-serif text-2xl font-black text-white uppercase tracking-tight mt-3">
                    {selectedArticle.title}
                  </h4>
                </div>
              </div>

              {/* Scrollable Article Body Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-4">
                <div className="flex gap-4 text-zinc-400 font-mono text-[9px] uppercase tracking-widest border-b border-white/5 pb-3 font-sans">
                  <span className="flex items-center gap-1 text-zinc-400"><Calendar size={11} /> {selectedArticle.date}</span>
                  <span className="flex items-center gap-1 text-zinc-400"><Clock size={11} /> {selectedArticle.readTime}</span>
                  <span className="flex items-center gap-1 text-zinc-400 ml-auto cursor-pointer hover:text-brand-blue"><Share2 size={11} /> Share</span>
                </div>

                {/* Clinical Details if defined */}
                {selectedArticle.clinicalDetails && (
                  <div className="space-y-3.5 my-4 p-4 rounded-xl bg-white/[0.03] border border-white/10 font-sans">
                    <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
                      <h5 className="font-mono text-[11px] text-brand-blue uppercase font-bold tracking-wider mb-1">
                        Definition
                      </h5>
                      <p className="text-xs sm:text-sm text-zinc-200 font-medium">
                        {selectedArticle.clinicalDetails.definition}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
                        <h5 className="font-mono text-[11px] text-white uppercase font-bold tracking-wider mb-1.5">
                          Cause
                        </h5>
                        <ul className="text-xs text-zinc-300 space-y-1">
                          {selectedArticle.clinicalDetails.causes.map((c, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <span className="text-brand-blue">•</span>
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
                        <h5 className="font-mono text-[11px] text-white uppercase font-bold tracking-wider mb-1.5">
                          Symptoms
                        </h5>
                        <ul className="text-xs text-zinc-300 space-y-1">
                          {selectedArticle.clinicalDetails.symptoms.map((s, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <span className="text-amber-400">•</span>
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
                        <h5 className="font-mono text-[11px] text-white uppercase font-bold tracking-wider mb-1.5">
                          Treatment
                        </h5>
                        <ul className="text-xs text-zinc-300 space-y-1">
                          {selectedArticle.clinicalDetails.treatments.map((t, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <span className="text-emerald-400">•</span>
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Note if defined */}
                    {selectedArticle.clinicalDetails.note && (
                      <div className="p-3 rounded-lg bg-brand-blue/[0.05] border border-brand-blue/20 text-xs text-zinc-200">
                        <span className="font-semibold text-brand-blue">Clinical Progression Note: </span>
                        {selectedArticle.clinicalDetails.note}
                      </div>
                    )}

                    {/* Example if defined */}
                    {selectedArticle.clinicalDetails.example && (
                      <div className="p-3 rounded-lg bg-emerald-500/[0.05] border border-emerald-500/20 text-xs text-zinc-200">
                        <span className="font-semibold text-emerald-400">Prescription Example: </span>
                        <span className="font-mono text-emerald-300">{selectedArticle.clinicalDetails.example}</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-4 font-sans text-xs md:text-sm text-zinc-300 leading-relaxed font-light">
                  {selectedArticle.content.map((paragraph, index) => (
                    <p key={index} className="first-letter:text-lg first-letter:font-serif first-letter:text-brand-blue">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="mt-8 p-5 rounded-2xl bg-brand-blue/[0.03] backdrop-blur-sm border border-brand-blue/20 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                    <BookOpen size={16} />
                  </div>
                  <div>
                    <h5 className="font-display text-[10px] text-brand-blue tracking-widest uppercase font-extrabold">Need custom lens solutions?</h5>
                    <p className="font-sans text-[11px] text-zinc-400 font-light mt-0.5">Book a complimentary ocular fitting diagnostic with our senior optometrist today.</p>
                  </div>
                </div>
              </div>

              {/* Footer Modal Action */}
              <div className="p-6 border-t border-white/5 bg-zinc-950/40 backdrop-blur-sm shrink-0 flex justify-between items-center">
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">VIJAYA OPTICAL HOUSE RESEARCH DEPOT</span>
                <button
                  onClick={() => {
                    setSelectedArticle(null);
                    const el = document.getElementById("solutions");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-6 py-3 rounded-lg bg-brand-blue text-white hover:bg-white hover:text-black font-display text-[10px] font-black tracking-widest uppercase transition-colors cursor-pointer animate-pulse"
                >
                  Explore Ocular Solutions →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
