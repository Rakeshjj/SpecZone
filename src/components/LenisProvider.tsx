import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import Lenis from "lenis";
import { frame, cancelFrame, useMotionValue, motionValue, MotionValue } from "motion/react";
 
const LenisContext = createContext<Lenis | null>(null);
// Fallback used only if <LenisProvider> was never mounted, or a filename-casing
// mismatch caused the bundler to create a duplicate module instance (this is a
// real gotcha on case-insensitive filesystems — double check every
// `import ... from "./LenisProvider"` matches the actual file's casing exactly).
// Falling back here means the app degrades to "no parallax" instead of a hard crash.
const fallbackRawScroll = motionValue(0);
const RawScrollContext = createContext<MotionValue<number> | null>(null);
 
/** Use this anywhere you'd normally call element.scrollIntoView() or window.scrollTo(). */
export function useLenis() {
  return useContext(LenisContext);
}
 
/** Use this to drive parallax / scroll-linked transforms with ZERO input lag,
 *  independent of Lenis's easing tail on the page's actual scroll position. */
export function useRawScrollY() {
  const value = useContext(RawScrollContext);
  if (!value) {
    if (typeof window !== "undefined") {
      console.warn(
        "[useRawScrollY] No <LenisProvider> found above this component — " +
          "parallax will be static. Check that your root component is wrapped " +
          "in <LenisProvider>, and that every import of it uses the exact same " +
          "filename casing as LenisProvider.tsx."
      );
    }
    return fallbackRawScroll;
  }
  return value;
}
 
const LENIS_CSS = `
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
.lenis.lenis-stopped { overflow: hidden; }
.lenis.lenis-scrolling iframe { pointer-events: none; }
`;
 
export default function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const rawScrollY = useMotionValue(0);
  const styleInjected = useRef(false);
 
  useEffect(() => {
    if (!styleInjected.current) {
      const styleEl = document.createElement("style");
      styleEl.setAttribute("data-lenis-required-css", "true");
      styleEl.textContent = LENIS_CSS;
      document.head.appendChild(styleEl);
      styleInjected.current = true;
    }
 
    const instance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
 
    setLenis(instance);
 
    function update(data: { timestamp: number }) {
      instance.raf(data.timestamp);
      // targetScroll = raw destination, set instantly on wheel/touch input,
      // BEFORE Lenis eases toward it. Reading this instead of instance.scroll
      // (the eased value) is what removes the "keeps drifting after I stop" lag.
      rawScrollY.set(instance.targetScroll);
    }
 
    frame.update(update, true);
 
    return () => {
      cancelFrame(update);
      instance.destroy();
      setLenis(null);
    };
  }, [rawScrollY]);
 
  return (
    <LenisContext.Provider value={lenis}>
      <RawScrollContext.Provider value={rawScrollY}>{children}</RawScrollContext.Provider>
    </LenisContext.Provider>
  );
}
 