import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Calendar, MapPin, Phone, Glasses, Music } from "lucide-react";
import logo from "/assets/logo.png";

interface NavbarProps {
  onBookClick: () => void;
  onTrialClassClick: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ onBookClick, onTrialClassClick, onNavigate }: NavbarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Toggle scrolled state
      setIsScrolled(currentScrollY > 50);

      // Auto-hide navigation logic:
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false); // Scrolling Down -> Hide
      } else {
        setIsVisible(true); // Scrolling Up or At Top -> Show
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Opticals Shop", target: "opticals-shop" },
    { name: "Home Care", target: "home-eye-care" },
    { name: "About Us", target: "about" },
    { name: "Care Blog", target: "blog" },
    { name: "Ateliers", target: "locations" },
  ];

  const handleMenuClick = (target: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(target);
  };

  return (
    <>
      <motion.header
        id="navbar-header"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 transform ${
          isVisible || isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled
            ? "bg-zinc-950/85 backdrop-blur-md border-b border-white/10 py-3.5 shadow-sm shadow-black/20"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            id="nav-logo-btn"
            onClick={() => handleMenuClick("hero")}
            className="group flex items-center focus:outline-none cursor-pointer"
          >
            <img
              src={logo}
              alt="Spectacal Zone Logo"
              className="h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </button>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden lg:flex items-center space-x-7">
            {menuItems.map((item) => (
              <motion.button
                key={item.target}
                id={`nav-item-${item.target}`}
                onClick={() => handleMenuClick(item.target)}
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="font-display text-xs tracking-widest text-zinc-300 hover:text-brand-blue transition-colors duration-300 relative focus:outline-none cursor-pointer"
              >
                {item.name.toUpperCase()}
              </motion.button>
            ))}

            {/* Dedicated Trial Form Menu Button */}
            <motion.button
              id="nav-item-trial-class-link"
              onClick={onTrialClassClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff1375]/15 border border-[#ff1375]/40 text-[#ff1375] hover:bg-[#ff1375] hover:text-white font-display text-xs tracking-wider font-bold transition-all cursor-pointer"
            >
              <Music size={12} />
              <span>1:1 TRIAL CLASS</span>
            </motion.button>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Trial Class Form Button */}
            <motion.button
              id="desktop-trial-class-btn"
              onClick={onTrialClassClick}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 bg-gradient-to-r from-[#ff1375] to-[#f43f5e] hover:from-[#e10b65] hover:to-[#e11d48] text-white font-display text-[10px] tracking-widest font-black px-4.5 py-3 rounded-full shadow-lg shadow-[#ff1375]/25 transition-all duration-300 cursor-pointer"
            >
              <Music size={13} className="stroke-[2.5]" />
              TRIAL FORM
            </motion.button>

            {/* Standard Book Appointment */}
            <motion.button
              id="desktop-book-appointment-btn"
              onClick={onBookClick}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 450, damping: 17 }}
              className="flex items-center gap-2 bg-[#605CFF] hover:bg-white hover:text-black text-white font-display text-[10px] tracking-widest font-black px-4.5 py-3 rounded-full shadow-lg transition-all duration-300 cursor-pointer"
            >
              <Calendar size={13} className="stroke-[2.5]" />
              BOOK APPOINTMENT
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden gap-2.5">
            <button
              id="mobile-trial-shortcut-btn"
              onClick={onTrialClassClick}
              className="flex items-center gap-1 px-3 py-2 bg-[#ff1375] text-white text-[11px] font-bold rounded-full shadow-sm cursor-pointer"
              aria-label="Trial Form"
            >
              <Music size={13} />
              <span>Trial Form</span>
            </button>
            <button
              id="mobile-book-appointment-shortcut"
              onClick={onBookClick}
              className="p-2.5 bg-brand-blue text-white rounded-full hover:bg-white hover:text-black transition-colors cursor-pointer"
              aria-label="Book Appointment"
            >
              <Calendar size={15} className="stroke-[2.5]" />
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-zinc-200 hover:text-brand-blue transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[68px] bg-zinc-950/90 backdrop-blur-lg z-40 md:hidden flex flex-col justify-between px-6 py-8 border-t border-white/10"
          >
            <div className="flex flex-col space-y-5 items-center text-center">
              {menuItems.map((item) => (
                <button
                  key={item.target}
                  id={`mobile-nav-item-${item.target}`}
                  onClick={() => handleMenuClick(item.target)}
                  className="font-display text-lg tracking-widest text-zinc-200 hover:text-white transition-all py-1.5"
                >
                  {item.name.toUpperCase()}
                </button>
              ))}

              {/* Mobile 1:1 Trial Class Form Button */}
              <button
                id="mobile-drawer-trial-btn"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onTrialClassClick();
                }}
                className="w-full max-w-xs flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#ff1375] to-[#f43f5e] text-white font-display text-xs tracking-widest font-black py-3.5 rounded-full shadow-lg shadow-[#ff1375]/30 cursor-pointer"
              >
                <Music size={16} />
                FREE 1:1 TRIAL CLASS FORM
              </button>

              <button
                id="mobile-book-appointment-btn"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onBookClick();
                }}
                className="w-full max-w-xs flex items-center justify-center gap-2.5 bg-brand-blue hover:bg-white hover:text-black text-white font-display text-xs tracking-widest font-black py-3.5 rounded-full shadow-lg transition-colors cursor-pointer"
              >
                <Calendar size={16} className="stroke-[2.5]" />
                BOOK APPOINTMENT
              </button>
            </div>

            {/* Mobile Drawer Footer info */}
            <div className="text-center text-zinc-400 font-sans text-xs space-y-2 pt-4">
              <p className="flex items-center justify-center gap-1 text-zinc-300">
                <MapPin size={12} className="text-brand-blue" />
                Chennai & Coimbatore, India
              </p>
              <p className="flex items-center justify-center gap-1 text-zinc-300">
                <Phone size={12} className="text-brand-blue" />
                04428 200 999
              </p>
              <p className="mt-2 text-[10px] tracking-wider text-zinc-500">VIJAYA OPTICAL HOUSE © 2026</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
