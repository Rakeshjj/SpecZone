//      import React, { useEffect, useRef } from 'react';

// import Lenis from 'lenis';
 
// // Exact original CSS styles embedded directly to match your layout perfectly

// const styles = `

//   * {

//     box-sizing: border-box;

//     margin: 0;

//     padding: 0;

//   }a
 
//   :root {

//     --transition-cubic: cubic-bezier(0.16, 1, 0.3, 1);

//     --bg-color: #0a0a0a;

//     --text-color: #ffffff;

//     --text-muted: #86868b;

//     --accent-color: #c5a880;

//   }
 
//   /* Required CSS helper rules for Lenis Smooth Scroll */

//   html.lenis, html.lenis body {

//     height: auto;

//   }

//   .lenis.lenis-smooth {

//     scroll-behavior: auto !important;

//   }

//   .lenis.lenis-smooth [data-lenis-prevent] {

//     overscroll-behavior: contain;

//   }

//   .lenis.lenis-stopped {

//     overflow: hidden;

//   }

//   .lenis.lenis-scrolling iframe {

//     pointer-events: none;

//   }
 
//   .gallery-wrapper-context {

//     background-color: #0a0a0a;

//     color: #ffffff;

//     font-family: 'Montserrat', sans-serif;

//     overflow-x: hidden;

//     line-height: 1.6;

//     width: 100%;

//   }
 
//   .scroll-spacer {

//     height: 60vh;

//     display: flex;

//     flex-direction: column;

//     justify-content: center;

//     align-items: center;

//     text-align: center;

//     border-bottom: 1px solid rgba(255, 255, 255, 0.05);

//   }
 
//   .scroll-spacer h1 {

//     font-family: 'Playfair Display', serif;

//     font-size: 2.5rem;

//     font-weight: 400;

//     letter-spacing: 2px;

//     margin-bottom: 1rem;

//   }
 
//   .scroll-spacer p {

//     color: var(--text-muted);

//     font-size: 0.9rem;

//     letter-spacing: 4px;

//     text-transform: uppercase;

//   }
 
//   .luxury-gallery {

//     max-width: 100%;

//     margin: auto;

//     height: auto;

//     padding: 0 2rem;

//   }
 
//   .section-header {

//     margin-bottom: 80px;

//     text-align: center;

//     margin-top: 80px;

//   }
 
//   .section-title {

//     font-family: 'Playfair Display', serif;

//     font-size: 3.5rem;

//     font-weight: 400;

//     letter-spacing: -1px;

//     line-height: 1.2;

//     opacity: 0;

//     transform: translateY(50px);

//     transition: opacity 1.6s var(--transition-cubic), transform 1.6s var(--transition-cubic);

//   }
 
//   .section-subtitle {

//     font-size: 0.8rem;

//     letter-spacing: 6px;

//     text-transform: uppercase;

//     color: var(--accent-color);

//     margin-bottom: 15px;

//     display: block;

//     opacity: 0;

//     transform: translateY(30px);

//     transition: opacity 1.6s var(--transition-cubic) 0.1s, transform 1.6s var(--transition-cubic) 0.1s;

//   }
 
//   .grid-container {

//     display: grid;

//     grid-template-columns: repeat(4, 1fr);

//     gap: 2.5rem;

//   }
 
//   .grid-card {

//     position: relative;

//     display: flex;

//     flex-direction: column;

//   }
 
//   .image-wrapper {

//     position: relative;

//     width: 100%;

//     height: 480px;

//     overflow: hidden;

//     background-color: #121212;

//     border: 1px solid rgba(255, 255, 255, 0.03);

//     opacity: 0;

//     transform: translateY(80px);

//     transition: opacity 1.8s var(--transition-cubic), transform 1.8s var(--transition-cubic);

//   }
 
//   .parallax-img {

//     position: absolute;

//     top: -15%;

//     left: 0;

//     width: 100%;

//     height: 170%; 

//     object-fit: cover;

//     filter: grayscale(20%) brightness(90%);

//     will-change: transform;

//     transform: translateY(calc(var(--scroll-y, 0) * 0.18px));

//   }
 
//   .section-header.is-visible .section-title,

//   .section-header.is-visible .section-subtitle {

//     opacity: 1;

//     transform: translateY(0);

//   }
 
//   .grid-card.is-visible .image-wrapper {

//     opacity: 1;

//     transform: translateY(0);

//   }
 
//   .grid-card.is-visible:nth-child(1) .image-wrapper { transition-delay: 0.1s; }

//   .grid-card.is-visible:nth-child(2) .image-wrapper { transition-delay: 0.25s; }

//   .grid-card.is-visible:nth-child(3) .image-wrapper { transition-delay: 0.4s; }

//   .grid-card.is-visible:nth-child(4) .image-wrapper { transition-delay: 0.55s; }

//   .grid-card.is-visible:nth-child(5) .image-wrapper { transition-delay: 0.1s; }

//   .grid-card.is-visible:nth-child(6) .image-wrapper { transition-delay: 0.25s; }

//   .grid-card.is-visible:nth-child(7) .image-wrapper { transition-delay: 0.4s; }

//   .grid-card.is-visible:nth-child(8) .image-wrapper { transition-delay: 0.55s; }
 
//   .footer-spacer {

//     height: 80vh;

//   }
 
//   @media (max-width: 1024px) {

//     .grid-container {

//       grid-template-columns: repeat(2, 1fr);

//       gap: 2rem;

//     }

//     .image-wrapper {

//       height: 380px;

//     }

//   }

//   @media (max-width: 600px) {

//     .grid-container {

//       grid-template-columns: 1fr;

//     }

//     .section-title {

//       font-size: 2.5rem;

//     }

//   }

// `;
 
// export const LuxuryGallery: React.FC = () => {

//   const containerRef = useRef<HTMLDivElement>(null);
 
//   useEffect(() => {

//     const currentContainer = containerRef.current;

//     if (!currentContainer) return;
 
//     // 1. Initialize Lenis Smooth Scroll

//     const lenis = new Lenis({

//       duration: 1.2,

//       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),

//       orientation: 'vertical',

//       gestureOrientation: 'vertical',

//       smoothWheel: true,

//     });
 
//     let lenisRafId: number;

//     function lenisRaf(time: number) {

//       lenis.raf(time);

//       lenisRafId = requestAnimationFrame(lenisRaf);

//     }

//     lenisRafId = requestAnimationFrame(lenisRaf);
 
//     // 2. Intersection Observer for Reveal Animations

//     const observerOptions = {

//       root: null,

//       threshold: 0.12,

//       rootMargin: "0px 0px -80px 0px"

//     };
 
//     const scrollRevealObserver = new IntersectionObserver((entries) => {

//       entries.forEach(entry => {

//         if (entry.isIntersecting) {

//           entry.target.classList.add("is-visible");

//           scrollRevealObserver.unobserve(entry.target); 

//         }

//       });

//     }, observerOptions);
 
//     const sectionHeader = currentContainer.querySelector(".section-header");

//     if (sectionHeader) scrollRevealObserver.observe(sectionHeader);
 
//     const gridCards = currentContainer.querySelectorAll(".grid-card");

//     gridCards.forEach(card => scrollRevealObserver.observe(card));
 
//     // 3. Perfect Sync GPU Parallax Loop

//     const parallaxImages = currentContainer.querySelectorAll(".parallax-img") as NodeListOf<HTMLImageElement>;

//     let parallaxRafId: number;
 
//     function updateParallax() {

//       const viewportHeight = window.innerHeight;
 
//       parallaxImages.forEach(img => {

//         const parent = img.parentElement;

//         if (!parent) return;

//         const parentRect = parent.getBoundingClientRect();
 
//         // Safe tracking calculations execution only when target bounds hit view thresholds

//         if (parentRect.top < viewportHeight && parentRect.bottom > 0) {

//           const distanceOffset = parentRect.top - viewportHeight;

//           img.style.setProperty('--scroll-y', `${distanceOffset}`);

//         }

//       });
 
//       parallaxRafId = requestAnimationFrame(updateParallax);

//     }

//     parallaxRafId = requestAnimationFrame(updateParallax);
 
//     // 4. Memory Leak Protection & Component Cleanups

//     return () => {

//       cancelAnimationFrame(lenisRafId);

//       cancelAnimationFrame(parallaxRafId);

//       scrollRevealObserver.disconnect();

//       lenis.destroy();

//     };

//   }, []);
 
//   return (
// <div ref={containerRef} className="gallery-wrapper-context">
// <style dangerouslySetInnerHTML={{ __html: styles }} />
 
//       <header class="scroll-spacer">
// <p>The Art of Motion</p>
// <h1>Scroll Down Smoothly</h1>
// </header>
 
//       <section class="luxury-gallery">
// <div class="section-header">
// <span class="section-subtitle">Exquisite Editorial</span>
// <h2 class="section-title">The Summer Edit</h2>
// </div>
// <div class="grid-container">
// <div class="grid-card">
// <div class="image-wrapper">
// <img src="https://www.vohopticians.com/assets/imgs/specification/SUNGLASSES.jpg" alt="Minimalist Object" class="parallax-img" />
// </div>
// </div>
// <div class="grid-card">
// <div class="image-wrapper">
// <img src="https://www.vohopticians.com/assets/imgs/specification/OPTICALFRAME.jpg" alt="Warm Florals" class="parallax-img" />
// </div>
// </div>
// <div class="grid-card">
// <div class="image-wrapper">
// <img src="https://www.vohopticians.com/assets/imgs/specification/OPTICALLENS.jpg" alt="Glass bottle design" class="parallax-img" />
// </div>
// </div>
// <div class="grid-card">
// <div class="image-wrapper">
// <img src="https://www.vohopticians.com/assets/imgs/specification/CONTACTLENS.jpg" alt="Luxury sunglasses" class="parallax-img" />
// </div>
// </div>
 
//           <div class="grid-card">
// <div class="image-wrapper">
// <img src="https://www.vohopticians.com/assets/imgs/specification/KIDSEYEWEAR.jpg" alt="Minimalist Object" class="parallax-img" />
// </div>
// </div>
// <div class="grid-card">
// <div class="image-wrapper">
// <img src="https://www.vohopticians.com/assets/imgs/specification/READYREADERS.jpg" alt="Warm Florals" class="parallax-img" />
// </div>
// </div>
// <div class="grid-card">
// <div class="image-wrapper">
// <img src="https://www.vohopticians.com/assets/imgs/specification/EYEWEARACCESSORIES.jpg" alt="Glass bottle design" class="parallax-img" />
// </div>
// </div>
// <div class="grid-card">
// <div class="image-wrapper">
// <img src="https://i.pinimg.com/736x/2e/43/5e/2e435e98cb104c688c21c0f9aa2f2b0f.jpg" alt="Luxury sunglasses" class="parallax-img" />
// </div>
// </div>
// </div>
// </section>
 
//       <div class="footer-spacer"></div>
// </div>

//   );

// };
 