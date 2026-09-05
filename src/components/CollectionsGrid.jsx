import React, { useState, useRef, useLayoutEffect } from 'react';
import { ArrowUpRight, Layers } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CollectionsGrid({ categories = [], onSelectCategory }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const sectionRef = useRef(null);
  const imagesContainerRef = useRef(null);
  const textContentRef = useRef(null);
  const progressBarRef = useRef(null);

  const slides = categories.length > 0 ? categories : [
    {
      id: "antique-furniture",
      name: "Antique Furniture",
      slug: "antique-furniture",
      tagline: "Timeless relics of royal Indian heritage",
      description: "Centuries-old aesthetic carved in dense, aged timber with authentic patina and historic motifs.",
      image: "/images/manduva-antique-1.jpg",
      count: 14
    }
  ];

  // Animate slide transition with seamless crossfade & text lift
  const triggerSlideAnimation = (index) => {
    setActiveSlide(index);

    // 1. Image Crossfade & Subtle Cinematic Zoom
    if (imagesContainerRef.current) {
      const allImgs = imagesContainerRef.current.querySelectorAll('.slide-bg-img');
      allImgs.forEach((img, i) => {
        if (i === index) {
          gsap.killTweensOf(img);
          gsap.set(img, { zIndex: 2 });
          gsap.fromTo(img, 
            { opacity: 0, scale: 1.04 }, 
            { opacity: 1, scale: 1.0, duration: 0.45, ease: 'power2.out' }
          );
        } else {
          gsap.set(img, { zIndex: 1 });
          gsap.to(img, { opacity: 0, duration: 0.35, ease: 'power2.inOut' });
        }
      });
    }

    // 2. Animate Editorial Typography
    if (textContentRef.current) {
      gsap.killTweensOf(textContentRef.current);
      gsap.fromTo(textContentRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }
      );
    }
  };

  // =========================================================================
  // GSAP SCROLLTRIGGER PINNED FULLSCREEN SLIDER - Snappy & Fluid
  // =========================================================================
  useLayoutEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current || slides.length === 0) return;

    let ctx;
    let timerId;

    const initSlider = () => {
      ctx = gsap.context(() => {
        const section = sectionRef.current;
        if (!section) return;

        // Snappy, agile pin distance adjusted for mobile vs desktop
        const multiplier = window.innerWidth < 768 ? 0.25 : 0.35;
        const pinDistance = window.innerHeight * (slides.length * multiplier);

        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: `+=${pinDistance}px`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            
            // Fill vertical progress rail
            if (progressBarRef.current) {
              progressBarRef.current.style.transform = `scaleY(${progress})`;
            }

            // Determine active slide index
            const targetIndex = Math.min(
              slides.length - 1,
              Math.floor(progress * slides.length)
            );

            if (targetIndex !== activeSlide && targetIndex >= 0) {
              triggerSlideAnimation(targetIndex);
            }
          }
        });

      }, sectionRef);

      ScrollTrigger.refresh();
    };

    const rafId = requestAnimationFrame(() => {
      timerId = setTimeout(initSlider, 120);
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (timerId) clearTimeout(timerId);
      if (ctx) ctx.revert();
    };
  }, [slides.length]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#141210] overflow-hidden select-none isolate"
      id="collections-section"
    >
      {/* =========================================================================
          BACKGROUND IMAGES CONTAINER (Seamless Gradient Integration)
         ========================================================================= */}
      <div ref={imagesContainerRef} className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide-bg-img absolute inset-0 w-full h-full ${
              index === 0 ? 'opacity-100 z-2' : 'opacity-0 z-1'
            }`}
          >
            <img
              src={slide.image}
              alt={`${slide.name} - Manduva Logillu Furniture Hyderabad`}
              className="w-full h-full object-cover object-center brightness-[0.98] contrast-[1.04]"
              loading={index === 0 ? "eager" : "lazy"}
            />
            
            {/* Seamless Left-to-Right & Bottom Vignettes */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#141210]/95 via-[#141210]/55 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/90 via-transparent to-[#141210]/30 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* =========================================================================
          TOP NAV OVERLAY / SECTION BADGE
         ========================================================================= */}
      <div className="absolute top-0 inset-x-0 p-6 sm:p-8 lg:p-12 flex items-center justify-between z-20 pointer-events-none">
        <div className="flex items-center gap-3">
          <span className="w-8 h-px bg-[#C49A6C]" />
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#FAF8F5] font-sans">
            Signature Collections
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 bg-[#141210]/80 backdrop-blur-md border border-white/15 text-[#FAF8F5] text-[11px] tracking-[0.2em] uppercase shadow-md font-sans">
          <Layers className="w-3.5 h-3.5 text-[#C49A6C]" />
          <span>{slides.length} Signature Collections</span>
        </div>
      </div>

      {/* =========================================================================
          SEAMLESS EDITORIAL TYPOGRAPHY
         ========================================================================= */}
      <div className="absolute inset-y-0 left-0 p-6 sm:p-10 lg:p-16 flex items-center z-20 pointer-events-none max-w-2xl">
        <div 
          ref={textContentRef}
          className="space-y-4 sm:space-y-6 text-[#FAF8F5] pointer-events-auto"
        >
          {/* Eyebrow Tagline & Count Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-2.5 py-1 bg-white/10 backdrop-blur-md text-[#FAF8F5] border border-white/15 text-[10px] sm:text-xs font-semibold uppercase tracking-wider font-sans">
              {slides[activeSlide]?.count} {typeof slides[activeSlide]?.count === 'number' ? 'Pieces' : 'Custom'}
            </span>
            <span className="text-xs sm:text-sm uppercase tracking-[0.18em] text-[#D5CEBF] font-medium drop-shadow-md">
              {slides[activeSlide]?.tagline}
            </span>
          </div>

          {/* Large Editorial Title */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[#FAF8F5] tracking-tight leading-[1.02] drop-shadow-[0_8px_25px_rgba(0,0,0,0.8)]">
            {slides[activeSlide]?.name}
          </h2>

          {/* Flowing Description */}
          <p className="text-sm sm:text-base md:text-lg text-[#D5CEBF] font-light leading-relaxed max-w-lg drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            {slides[activeSlide]?.description}
          </p>

          {/* Action CTA Button */}
          <div className="pt-2">
            <button
              onClick={() => onSelectCategory(slides[activeSlide]?.slug)}
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-white text-[#1A1715] border border-white/20 text-xs sm:text-sm font-semibold tracking-wider hover:bg-[#FAF8F5] shadow-xl transition-all duration-200 group"
            >
              <span>Explore {slides[activeSlide]?.name}</span>
              <ArrowUpRight className="w-4 h-4 text-[#1A1715] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          RIGHT-SIDE NUMERICAL LADDER & VERTICAL PROGRESS RAIL
         ========================================================================= */}
      <div className="absolute top-1/2 right-4 sm:right-8 lg:right-12 -translate-y-1/2 z-20 flex items-center gap-4 select-none">
        {/* Progress Rail */}
        <div className="relative w-1 h-64 sm:h-80 rounded-full bg-white/10 overflow-hidden border border-white/10">
          <div
            ref={progressBarRef}
            className="w-full h-full bg-[#C49A6C] origin-top will-change-transform"
            style={{ transform: 'scaleY(0)' }}
          />
        </div>

        {/* Index List */}
        <div className="flex flex-col gap-2 sm:gap-2.5 py-2">
          {slides.map((slide, idx) => {
            const isActive = activeSlide === idx;
            const numStr = (idx + 1).toString().padStart(2, '0');

            return (
              <button
                key={slide.id}
                onClick={() => triggerSlideAnimation(idx)}
                className={`group flex items-center gap-2.5 text-left focus:outline-none cursor-pointer py-1 px-3 rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'bg-white/15 border border-white/20 shadow-lg' 
                    : 'hover:bg-white/5'
                }`}
              >
                {/* Indicator Line */}
                <span
                  className={`h-[2px] bg-[#C49A6C] transition-all duration-300 ${
                    isActive ? 'w-4 opacity-100' : 'w-0 opacity-0'
                  }`}
                />

                <span
                  className={`text-xs sm:text-sm font-bold tracking-widest transition-all duration-300 ${
                    isActive ? 'text-[#C49A6C]' : 'text-white/40 group-hover:text-white/80'
                  }`}
                >
                  {numStr}
                </span>

                <span
                  className={`text-[10px] sm:text-[11px] uppercase tracking-wider transition-all duration-300 hidden lg:inline ${
                    isActive ? 'text-[#FAF8F5] font-semibold' : 'text-white/40 group-hover:text-white/80'
                  }`}
                >
                  {slide.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          BOTTOM HELPER BAR
         ========================================================================= */}
      <div className="absolute bottom-6 inset-x-0 px-6 sm:px-12 flex items-center justify-between text-xs text-[#D5CEBF] z-20 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#141210]/80 backdrop-blur-md border border-white/15">
          <span className="w-2 h-2 rounded-full bg-[#8A6738]" />
          <span>SCROLL TO EXPLORE ARCHIVES</span>
        </div>
        <div className="px-3 py-1 rounded-full bg-[#141210]/80 backdrop-blur-md border border-white/15 text-[11px] uppercase tracking-widest text-[#C49A6C]">
          {activeSlide + 1} of {slides.length} COLLECTIONS
        </div>
      </div>

    </section>
  );
}
