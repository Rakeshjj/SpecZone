import { CheckCircle, Star, Award, Shield, Truck } from "lucide-react";
import { motion } from "motion/react";

export default function TrustStrip() {
  const trustItems = [
    {
      icon: <CheckCircle className="text-brand-blue" size={20} />,
      title: "100% Authentic Ateliers",
      subtitle: "Authorized Premium Partner"
    },
    {
      icon: <Star className="text-brand-blue" size={20} />,
      title: "5-Star Ocular Rating",
      subtitle: "10,000+ Happy Eyes served"
    },
    {
      icon: <Award className="text-brand-blue" size={20} />,
      title: "Custom Lens Sculptors",
      subtitle: "In-house Zeiss & Essilor lab"
    },
    {
      icon: <Shield className="text-brand-blue" size={20} />,
      title: "Complimentary Lifetime Care",
      subtitle: "Free adjustments & cleaning"
    },
    {
      icon: <Truck className="text-brand-blue" size={20} />,
      title: "Express Home Delivery",
      subtitle: "Direct to Chennai & Coimbatore"
    }
  ];

  return (
    <section 
      id="trust-strip" 
      className="bg-zinc-950/60 border-y border-white/5 py-10 px-6 md:px-12 relative overflow-hidden backdrop-blur-md"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/[0.01] via-transparent to-brand-blue/[0.01] pointer-events-none" />
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-8 md:gap-4 relative z-10">
        {trustItems.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: idx * 0.15 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="flex items-center gap-4 group min-w-[200px] flex-1 cursor-pointer"
          >
            <motion.div 
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="w-12 h-12 rounded-full bg-zinc-900/40 backdrop-blur-sm flex items-center justify-center border border-white/10 group-hover:border-brand-blue/50 group-hover:bg-brand-blue/10 group-hover:shadow-[0_0_15px_rgba(10,100,255,0.4)] transition-all duration-300"
            >
              {item.icon}
            </motion.div>
            <div className="flex flex-col">
              <span className="font-display text-xs tracking-wider text-white font-bold uppercase group-hover:text-brand-blue transition-colors duration-300">
                {item.title}
              </span>
              <span className="font-sans text-[10px] text-zinc-400 tracking-wide mt-0.5 uppercase">
                {item.subtitle}
              </span>
            </div>
            {idx < trustItems.length - 1 && (
              <div className="hidden xl:block h-8 w-px bg-white/5 ml-auto" />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
