import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Calendar, MapPin, Phone, Glasses } from "lucide-react";
import logo from "/assets/logo.png";

interface NavbarProps {
  onBookClick: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ onBookClick, onNavigate }: NavbarProps) {
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
      // Show when scrolling up, hide when scrolling down.
      // We add a minimum scroll threshold (80px) before hiding so the header is stable at the absolute top.
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
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 transform ${isVisible || isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
          } ${isScrolled
            ? "bg-zinc-950/75 backdrop-blur-md border-b border-white/10 py-4 shadow-sm shadow-black/20"
            : "bg-transparent py-6"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          {/* Brand Logo */}
          <button
            id="nav-logo-btn"
            onClick={() => handleMenuClick("hero")}
            className="group flex items-center focus:outline-none"
          >
            <img
              src={logo}
              alt="Spectacal Zone Logo"
              className="h-14 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </button>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-10">
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
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <motion.button
              id="desktop-book-appointment-btn"
              onClick={onBookClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 450, damping: 17 }}
className="flex items-center gap-2 bg-[#605CFF] hover:bg-white hover:text-black text-white font-display text-[10px] tracking-widest font-black px-6 py-3.5 rounded-full shadow-lg transition-all duration-300 cursor-pointer"            >
              <Calendar size={13} className="stroke-[2.5]" />
              BOOK APPOINTMENT
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden gap-4">
            <button
              id="mobile-book-appointment-shortcut"
              onClick={onBookClick}
              className="p-2.5 bg-brand-blue text-white rounded-full hover:bg-white hover:text-black transition-colors cursor-pointer"
              aria-label="Book Appointment"
            >
              <Calendar size={16} className="stroke-[2.5]" />
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-zinc-200 hover:text-brand-blue transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
            className="fixed inset-0 top-[73px] bg-zinc-950/80 backdrop-blur-md z-40 md:hidden flex flex-col justify-between px-6 py-12 border-t border-white/10"
          >
            <div className="flex flex-col space-y-8 items-center text-center">
              {menuItems.map((item) => (
                <button
                  key={item.target}
                  id={`mobile-nav-item-${item.target}`}
                  onClick={() => handleMenuClick(item.target)}
                  className="font-display text-xl tracking-widest text-zinc-200 hover:text-white transition-all py-2"
                >
                  {item.name.toUpperCase()}
                </button>
              ))}

              <button
                id="mobile-book-appointment-btn"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onBookClick();
                }}
                className="w-full max-w-xs flex items-center justify-center gap-3 bg-brand-blue hover:bg-white hover:text-black text-white font-display text-sm tracking-widest font-black py-4 rounded-full shadow-lg transition-colors cursor-pointer"
              >
                <Calendar size={16} className="stroke-[2.5]" />
                BOOK APPOINTMENT
              </button>
            </div>

            {/* Mobile Drawer Footer info */}
            <div className="text-center text-zinc-400 font-sans text-xs space-y-2">
              <p className="flex items-center justify-center gap-1">
                <MapPin size={12} className="text-brand-blue" />
                Chennai & Coimbatore, India
              </p>
              <p className="flex items-center justify-center gap-1">
                <Phone size={12} className="text-brand-blue" />
                04428 200 999
              </p>
              <p className="mt-4 text-[10px] tracking-wider text-zinc-500">VIJAYA OPTICAL HOUSE © 2026</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
