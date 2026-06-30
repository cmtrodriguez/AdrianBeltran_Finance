import { useState, useEffect } from "react";
import { PartnerLogo } from "../types";

interface LogoStripProps {
  logos: PartnerLogo[];
  title?: string;
}

export default function LogoStrip({ logos, title = "Trusted Partners & Affiliations" }: LogoStripProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const onChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  const visibleLogos = logos.filter((l) => l.visible);

  if (visibleLogos.length === 0) return null;

  // Render a clean SVG or styled visual card for each partner brand, using elegant SVG shapes and typography
  const renderLogoPlaceholder = (name: string, imageUrl: string) => {
    // Generate styled branding badges for well-known insurance players
    switch (imageUrl.toUpperCase()) {
      case "AIA":
        return (
          <div className="flex items-center space-x-1 font-sans text-rose-600 dark:text-rose-500 font-black tracking-tighter text-lg md:text-xl">
            <span className="bg-rose-600 text-white px-1.5 py-0.5 rounded text-xs">AIA</span>
            <span>PHILIPPINES</span>
          </div>
        );
      case "MDRT":
        return (
          <div className="flex items-center space-x-1.5 text-amber-600 dark:text-amber-500 font-bold tracking-tight text-sm md:text-base">
            <svg className="w-5 h-5 fill-current text-amber-500 shrink-0" viewBox="0 0 24 24">
              <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
            </svg>
            <div>
              <p className="leading-none text-[10px] uppercase font-black tracking-widest text-zinc-500 dark:text-zinc-400">Million Dollar</p>
              <p className="leading-tight font-black uppercase text-amber-600 dark:text-amber-500 tracking-wider">Round Table</p>
            </div>
          </div>
        );
      case "IC":
        return (
          <div className="flex items-center space-x-1.5 font-serif text-emerald-800 dark:text-emerald-500 font-bold tracking-tight text-xs md:text-sm">
            <svg className="w-5 h-5 stroke-current text-emerald-700 shrink-0" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <div className="leading-tight text-left">
              <p className="font-extrabold uppercase font-sans tracking-wide text-zinc-600 dark:text-zinc-300">INSURANCE</p>
              <p className="font-sans text-[9px] uppercase tracking-widest text-zinc-400">Commission PH</p>
            </div>
          </div>
        );
      case "SUN":
        return (
          <div className="flex items-center space-x-1 font-extrabold text-yellow-600 dark:text-yellow-500 text-sm md:text-base tracking-tight">
            <div className="w-5 h-5 rounded-full bg-yellow-500 border-2 border-amber-600 shrink-0" />
            <span className="uppercase text-zinc-700 dark:text-zinc-300">Sun Life</span>
          </div>
        );
      case "AXA":
        return (
          <div className="flex items-center space-x-1 font-black text-blue-700 dark:text-blue-500 tracking-wider text-lg md:text-xl italic font-serif">
            <span className="bg-blue-700 text-white px-1 py-0.5 rounded-sm not-italic font-sans font-black text-xs">AXA</span>
            <span className="text-zinc-700 dark:text-zinc-300 not-italic font-sans">PHILIPPINES</span>
          </div>
        );
      case "BPIAIA":
        return (
          <div className="flex items-center space-x-1 text-red-600 dark:text-red-500 font-bold text-xs md:text-sm">
            <span className="font-black bg-red-700 text-white px-1 rounded">BPI</span>
            <span className="text-rose-600 font-black">AIA</span>
          </div>
        );
      default:
        return (
          <span className="font-bold tracking-wider uppercase text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-full border border-zinc-200/50 dark:border-zinc-700/50">
            {name}
          </span>
        );
    }
  };

  // Duplicate items to ensure smooth continuous marquee loop
  const marqueeItems = [...visibleLogos, ...visibleLogos, ...visibleLogos];

  return (
    <section
      id="logo-strip-section"
      className="w-full bg-zinc-50/70 dark:bg-zinc-900/40 border-y border-zinc-100 dark:border-zinc-800 py-6 overflow-hidden transition-colors duration-300"
    >
      {title && (
        <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
          <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
            {title}
          </h2>
        </div>
      )}

      {/* Styled Inline Keyframes for continuous scroll */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33333%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="relative w-full overflow-hidden flex items-center">
        {/* Shadow overlays for depth */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-zinc-50 dark:from-zinc-900/20 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-zinc-50 dark:from-zinc-900/20 to-transparent z-10 pointer-events-none" />

        <div
          id="marquee-track"
          className={`flex shrink-0 gap-12 md:gap-16 items-center whitespace-nowrap ${
            prefersReducedMotion ? "overflow-x-auto justify-center flex-wrap px-4" : "animate-marquee"
          }`}
          style={prefersReducedMotion ? { animation: "none" } : undefined}
        >
          {marqueeItems.map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className="flex items-center justify-center filter grayscale contrast-125 dark:contrast-100 dark:brightness-90 hover:grayscale-0 hover:contrast-100 hover:brightness-100 transition-all duration-300 cursor-pointer transform hover:scale-105"
              title={logo.name}
            >
              {renderLogoPlaceholder(logo.name, logo.imageUrl)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
