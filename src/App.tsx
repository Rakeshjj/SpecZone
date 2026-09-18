import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import BrandTicker from "./components/BrandTicker";
import ShowroomShowcase from "./components/ShowroomShowcase";
import AboutUs from "./components/AboutUs";
import LensLab from "./components/LensLab";
import LocationsSection from "./components/LocationsSection";
import BlogSection from "./components/BlogSection";
import ArticleDetailView from "./components/ArticleDetailView";
import StackedCardsSection from "./components/StackedCardsSection";
import HomeEyeCare from "./components/HomeEyeCare";
import FooterSection from "./components/FooterSection";
import SmoothScroll from "./components/SmoothScroll";
import SpiralFrameMatrix from "./components/SpiralFrameMatrix";
import TrialClassPortal from "./components/TrialClassPortal";
import ConsultationBookingSection from "./components/ConsultationBookingSection";
import { Article } from "./types";

export default function App() {
  const [view, setView] = useState<"home" | "booking" | "trial-form" | "article">("home");
  const [selectedServiceType, setSelectedServiceType] = useState<string>("Transform Your Look");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [highlightedCardId, setHighlightedCardId] = useState<number | null>(null);

  // Prevent background scrolling when full-screen trial-form portal is open
  useEffect(() => {
    if (view === "trial-form") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [view]);

  // Setup elegant scroll progress bar across the screen top
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleOpenBooking = (service?: string) => {
    if (service && typeof service === "string") {
      setSelectedServiceType(service);
    }
    setView("trial-form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenTrialForm = () => {
    setView("trial-form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenArticle = (article: Article) => {
    setSelectedArticle(article);
    setView("article");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToArticles = () => {
    const targetArticleId = selectedArticle?.id;
    if (targetArticleId) {
      setHighlightedCardId(targetArticleId);
      setTimeout(() => {
        setHighlightedCardId(null);
      }, 3500);
    }
    setView("home");

    const scrollTarget = (retriesLeft = 12) => {
      const cardEl = targetArticleId ? document.getElementById(`article-card-${targetArticleId}`) : null;
      const targetEl = cardEl || document.getElementById("blog");

      if (targetEl) {
        const lenis = (window as any).lenis;
        if (lenis && typeof lenis.scrollTo === "function") {
          lenis.scrollTo(targetEl, { offset: -90, immediate: false, duration: 1.2 });
        } else {
          const topPos = targetEl.getBoundingClientRect().top + window.pageYOffset - 90;
          window.scrollTo({ top: topPos, behavior: "smooth" });
        }
      } else if (retriesLeft > 0) {
        setTimeout(() => scrollTarget(retriesLeft - 1), 60);
      }
    };

    // Give React and DOM mounting initial ticks then smoothly navigate
    setTimeout(() => {
      scrollTarget(12);
    }, 70);
  };

  const handleCloseToHome = () => {
    setView("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePreSelectService = (serviceName: string) => {
    if (
      serviceName.toLowerCase().includes("transform") || 
      serviceName.toLowerCase().includes("look") || 
      serviceName.toLowerCase().includes("tyl")
    ) {
      setSelectedServiceType("Transform Your Look");
    } else {
      setSelectedServiceType("Home Eye Check");
    }
    setView("trial-form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Safe window-scrolling callback
  const scrollToSection = (sectionId: string) => {
    const doScroll = (retriesLeft = 8) => {
      const el = document.getElementById(sectionId);
      if (el) {
        const lenis = (window as any).lenis;
        if (lenis && typeof lenis.scrollTo === "function") {
          lenis.scrollTo(el, { offset: -80, immediate: false, duration: 1 });
        } else {
          const topPos = el.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top: topPos, behavior: "smooth" });
        }
      } else if (retriesLeft > 0) {
        setTimeout(() => doScroll(retriesLeft - 1), 60);
      }
    };

    if (view !== "home") {
      setView("home");
      setTimeout(() => doScroll(8), 80);
    } else {
      doScroll(8);
    }
  };

  if (view === "trial-form") {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="trial-class-portal-view"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="w-full h-screen max-h-screen overflow-hidden"
        >
          <TrialClassPortal onBackToMain={handleCloseToHome} initialService={selectedServiceType} />
        </motion.div>
      </AnimatePresence>
    );
  }

  if (view === "article" && selectedArticle) {
    return (
      <div className="relative min-h-screen bg-zinc-950 text-white font-sans selection:bg-brand-blue selection:text-white flex flex-col justify-between">
        <Navbar
          onBookClick={() => handleOpenBooking("Home Eye Care Check")}
          onNavigate={(section) => {
            setView("home");
            setTimeout(() => {
              scrollToSection(section);
            }, 100);
          }}
        />
        <main className="relative pt-[74px] sm:pt-[78px] flex-1 flex flex-col">
          <ArticleDetailView
            article={selectedArticle}
            onBack={handleBackToArticles}
            onBookConsultation={(service) => handleOpenBooking(service || "Myopia Assessment & Consultation")}
          />
        </main>
        <FooterSection
          onBookClick={() => handleOpenBooking("Home Eye Care Check")}
          onNavigate={(section) => {
            setView("home");
            setTimeout(() => {
              scrollToSection(section);
            }, 100);
          }}
        />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white font-sans selection:bg-brand-blue selection:text-white flex flex-col justify-between">
      {/* Top scroll-linked elegant reading progress bar */}
      <motion.div
        id="scroll-progress-indicator"
        className="fixed top-0 left-0 right-0 h-[3px] bg-brand-blue origin-[0%] z-50 shadow-lg shadow-brand-blue/30"
        style={{ scaleX }}
      />

      {/* Primary Sticky Header navigation */}
      <Navbar
        onBookClick={() => handleOpenBooking("Home Eye Care Check")}
        onNavigate={scrollToSection}
      />

      {/* Main Container */}
      <main className="relative pt-[74px] sm:pt-[78px] flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {view === "home" ? (
            <motion.div
              key="home-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
            >
              {/* INTEGRATED HOME EYE CHECKUP PROMOTIONAL & EYEWEAR VIDEO CONSULTATION SECTION (TOP OF PAGE) */}
              <ConsultationBookingSection onSuccessNavigate={() => scrollToSection("locations-section")} />

              {/* AUTOPLAY BRAND TICKER / LOGO MARQUEE (IMMEDIATELY AFTER HOME EYE CHECKUP) */}
              <BrandTicker />

              {/* HERO HEADER */}
              <HeroSection onScrollDown={() => scrollToSection("showroom-showcase")} />

              <SmoothScroll />

              <SpiralFrameMatrix onPreSelectService={handlePreSelectService} />

              <LensLab />
            
              {/* ABOUT US & HERITAGE HISTORICAL STORY */}
              <AboutUs />

              {/* PHYSICAL ATELIER MAPS/GRID */}
              <LocationsSection />

              <ShowroomShowcase />

              {/* BLOG SECTIONS & DIGITAL EYE CARE TIPS */}
              <BlogSection 
                onSelectArticle={handleOpenArticle} 
                highlightedArticleId={highlightedCardId}
              />

              {/* SCROLL-DRIVEN STACKED CARD TRANSITION ARCHIVE */}
              <StackedCardsSection onBookClick={(service) => handleOpenBooking(service || "Atelier Eyewear Consultation")} />
            </motion.div>
          ) : (
            <motion.div
              key="booking-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="flex-1 flex flex-col justify-start px-3 sm:px-6 md:px-8 pt-1 pb-3"
            >
              {/* Dedicated Home Eye Care Portal View */}
              <HomeEyeCare 
                onClose={handleCloseToHome} 
                initialType={selectedServiceType}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER & ACTIONS */}
      <FooterSection
        onBookClick={() => handleOpenBooking("Home Eye Care Check")}
        onNavigate={scrollToSection}
      />
    </div>
  );
}
