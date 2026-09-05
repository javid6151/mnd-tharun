import React, { useRef, useLayoutEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollWipeReveal() {
  const sectionRef = useRef(null);
  const imageRevealRef = useRef(null);
  const headlineRef = useRef(null);
  const progressBadgeRef = useRef(null);

  useLayoutEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return;

    let ctx;
    let timerId;

    const initWipe = () => {
      ctx = gsap.context(() => {
        const section = sectionRef.current;
        const imgReveal = imageRevealRef.current;
        const headline = headlineRef.current;
        const badge = progressBadgeRef.current;
        if (!section || !imgReveal) return;

        // Master Timeline pinned with ScrollTrigger - Snappy & Clean
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=75%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (badge) {
                badge.innerText = `SCROLL REVEAL // ${Math.round(self.progress * 100)}%`;
              }
            }
          }
        });

        // 1. Upward wipe animation from bottom edge to top edge
        tl.fromTo(imgReveal,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', duration: 1 },
          0
        );

        // 2. Headline inverts and slowly fades out towards the end of reveal
        if (headline) {
          tl.to(headline, {
            opacity: 0,
            y: -20,
            ease: 'power2.in',
            duration: 0.35
          }, 0.65);
        }

      }, sectionRef);

      ScrollTrigger.refresh();
    };

    const rafId = requestAnimationFrame(() => {
      timerId = setTimeout(initWipe, 100);
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (timerId) clearTimeout(timerId);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#141210] overflow-hidden select-none isolate flex items-center justify-center"
      id="statement-wipe-stage"
    >
      {/* =========================================================================
          LAYER 1: Deep Ground with Architectural Context
         ========================================================================= */}
      <div className="absolute inset-0 bg-[#141210] flex flex-col justify-between p-6 sm:p-10 lg:p-16 pointer-events-none">
        <div className="flex justify-between items-start text-xs font-sans tracking-[0.2em] text-[#9C948A] uppercase font-semibold">
          <span>// ARCHITECTURAL FOLD 02</span>
          <span>HYDERABAD HEIRLOOM ARCHIVE</span>
        </div>
        <div className="text-center space-y-2 opacity-40">
          <span className="font-serif text-2xl sm:text-4xl text-white/90 italic">
            Manduva Courtyard Heritage
          </span>
        </div>
        <div className="flex justify-between items-end text-xs font-sans tracking-[0.2em] text-[#9C948A] uppercase font-semibold">
          <span>EST. TELANGANA • SOUTH INDIA</span>
          <span className="flex items-center gap-1.5 text-[#C49B66]">
            <span>SCROLL TO UNVEIL</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </span>
        </div>
      </div>

      {/* =========================================================================
          LAYER 2: Full-Bleed Photograph Wiping Upward from Bottom Edge
         ========================================================================= */}
      <div
        ref={imageRevealRef}
        className="absolute inset-0 w-full h-full will-change-[clip-path] z-10"
        style={{
          clipPath: 'inset(100% 0% 0% 0%)',
        }}
      >
        <img
          src="/images/manduva-antique-1.jpg"
          alt="Handcrafted Antique Heritage Furniture Manduva Logillu"
          className="w-full h-full object-cover object-center brightness-[0.92] contrast-[1.08]"
          loading="eager"
        />
        {/* Warm Vignette Overlay with gentle bottom blend into next section */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/80 via-transparent to-[#141210]/30 pointer-events-none" />
      </div>

      {/* =========================================================================
          LAYER 3: Inverting Headline (mix-blend-mode: difference in white)
         ========================================================================= */}
      <div
        ref={headlineRef}
        className="absolute inset-0 flex items-center justify-center p-6 text-center pointer-events-none z-20 mix-blend-difference"
      >
        <div className="max-w-5xl mx-auto space-y-4">
          <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-medium tracking-tight leading-[0.95] text-white">
            CRAFTED TO <br />
            <span className="italic font-light">OUTLIVE TIME</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm md:text-base uppercase tracking-[0.35em] sm:tracking-[0.45em] font-medium text-white/90">
            Dense Teakwood • Generational Joinery • Hyderabad
          </p>
        </div>
      </div>

      {/* Top-Right Progress Badge */}
      <div className="absolute top-8 right-6 sm:top-12 sm:right-12 z-30 pointer-events-none text-right font-sans text-[10px] sm:text-xs font-semibold tracking-widest uppercase">
        <span 
          ref={progressBadgeRef}
          className="px-3.5 py-1.5 bg-[#1A1715]/90 backdrop-blur-md text-[#C49B66] border border-white/20 shadow-md tracking-[0.2em] font-medium"
        >
          SCROLL REVEAL // 0%
        </span>
      </div>

    </section>
  );
}
