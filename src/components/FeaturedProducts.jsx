import React, { useState, useRef, useLayoutEffect } from 'react';
import { Eye, MessageSquare, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { openWhatsApp } from '../utils/whatsapp';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FeaturedProducts({ 
  products = [], 
  onSelectProduct, 
  onOpenEnquiryWithPiece, 
  onViewAllClick 
}) {
  const [activeTab, setActiveTab] = useState('all');
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const trackRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressTextRef = useRef(null);

  const tabs = [
    { id: 'all', label: 'All Featured' },
    { id: 'traditional-furniture', label: 'Courtyard & Traditional' },
    { id: 'antique-furniture', label: 'Antiques & Heirlooms' },
    { id: 'luxury-furniture', label: 'Luxury & Living' },
    { id: 'dining', label: 'Dining & Suites' },
  ];

  const filteredProducts = activeTab === 'all'
    ? products.filter(p => p.featured)
    : products.filter(p => p.categorySlug === activeTab || (p.tags && p.tags.includes(activeTab)));

  // =========================================================================
  // GSAP SCROLLTRIGGER PINNED HORIZONTAL SCROLL ANIMATION
  // =========================================================================
  useLayoutEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current || !trackRef.current) return;

    let ctx;
    let timerId;

    const initScroll = () => {
      ctx = gsap.context(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;

        const getScrollAmount = () => {
          const trackWidth = track.scrollWidth;
          const viewportWidth = window.innerWidth;
          return -(trackWidth - viewportWidth + 60);
        };

        const totalScroll = getScrollAmount();
        if (totalScroll >= 0) return;

        // Animate track horizontally on vertical page scroll
        gsap.to(track, {
          x: totalScroll,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            start: 'top top',
            end: () => `+=${Math.abs(totalScroll) * 0.85}px`,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressBarRef.current) {
                progressBarRef.current.style.width = `${Math.round(self.progress * 100)}%`;
              }
              if (progressTextRef.current) {
                progressTextRef.current.innerText = `${Math.round(self.progress * 100)}%`;
              }
            },
          },
        });
      }, sectionRef);

      ScrollTrigger.refresh();
    };

    const rafId = requestAnimationFrame(() => {
      timerId = setTimeout(initScroll, 120);
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (timerId) clearTimeout(timerId);
      if (ctx) ctx.revert();
    };
  }, [activeTab, filteredProducts.length]);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen bg-[#FAF8F5] border-t border-[#EAE5DC] overflow-hidden select-none isolate"
      id="featured-showcase-pinned"
    >
      {/* Pinned Stage Container */}
      <div 
        ref={stageRef}
        className="h-full w-full flex flex-col justify-between py-5 sm:py-7 lg:py-8 px-4 sm:px-8 lg:px-12"
      >
        
        {/* =========================================================================
            HEADER BAR: Section Title & Filter Tabs
           ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pb-3 border-b border-[#EAE5DC] shrink-0">
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <span className="w-8 h-px bg-[#8A6738]" />
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#8A6738] font-sans">
                Curated Masterpieces
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#1A1715]">
              Pieces Worth Keeping
            </h2>
            <p className="text-[#68625A] text-xs font-light mt-0.5 hidden sm:block">
              Explore handcrafted solid teakwood suites, carved courtyard jhulas, and rare preserved antiques.
            </p>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-[#1A1715] text-[#FAF8F5] border border-[#1A1715] shadow-xs'
                    : 'bg-white text-[#68625A] hover:text-[#1A1715] hover:bg-[#F3EFE8] border border-[#EAE5DC]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* =========================================================================
            HORIZONTAL SCROLLING TRACK: Product Cards with GSAP Scrub
           ========================================================================= */}
        <div className="relative w-full flex-grow flex items-center overflow-visible my-auto">
          <div
            ref={trackRef}
            className="flex items-center gap-5 sm:gap-7 pl-1 pr-24 will-change-transform"
          >
            {filteredProducts.map((product) => {
              const imageSrc = (product.images && product.images[0]) || product.image || '/images/manduva-hero.jpg';
              const productName = product.name || product.title || 'Manduva Heirloom Furniture';
              const priceText = product.price || product.priceDisplay || 'Enquire for Price';
              const materialText = (product.materials && product.materials.split(',')[0]) || product.woodType || product.badge || 'Solid Teakwood';
              const dimensionText = product.dimensions || 'Dimensions on Enquiry';
              const availabilityText = product.availability || product.leadTime || 'In Showroom Display';

              return (
                <div
                  key={product.id}
                  className="w-[280px] sm:w-[320px] md:w-[360px] shrink-0 bg-white rounded-2xl overflow-hidden border border-[#EAE5DC] shadow-xs hover:border-[#8A6738]/60 hover:shadow-md transition-all duration-300 flex flex-col group"
                >
                  {/* Product Image Area */}
                  <div 
                    onClick={() => onSelectProduct(product)}
                    className="relative aspect-[4/3] w-full overflow-hidden bg-[#F3EFE8] cursor-pointer img-zoom-lux"
                  >
                    <img
                      src={imageSrc}
                      alt={`${productName} - Manduva Logillu Furniture Hyderabad`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                      <span className="px-2.5 py-1 bg-white/95 backdrop-blur-md text-[#1A1715] border border-[#EAE5DC] text-[10px] font-semibold uppercase tracking-wider shadow-xs font-sans">
                        {materialText}
                      </span>
                      {product.badge && (
                        <span className="px-2 py-0.5 bg-[#8A6738] text-white text-[9px] font-medium tracking-wider uppercase shadow-xs font-sans">
                          {product.badge}
                        </span>
                      )}
                    </div>

                    {/* Quick View Hover Button */}
                    <div className="absolute inset-0 bg-[#1A1715]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 pointer-events-none">
                      <span className="px-4 py-2 rounded-full bg-white text-[#1A1715] border border-[#EAE5DC] text-xs font-semibold tracking-wider uppercase shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-[#8A6738]" />
                        <span>Quick View</span>
                      </span>
                    </div>
                  </div>

                  {/* Product Information Body */}
                  <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow space-y-2.5">
                    <div className="space-y-1">
                      <div className="text-[10px] uppercase tracking-widest text-[#8A6738] font-semibold">
                        {product.category}
                      </div>
                      <h3 
                        onClick={() => onSelectProduct(product)}
                        className="font-serif text-lg font-semibold text-[#1A1715] group-hover:text-[#8A6738] transition-colors cursor-pointer line-clamp-1"
                      >
                        {productName}
                      </h3>
                      <p className="text-xs text-[#68625A] line-clamp-2 font-light leading-relaxed">
                        {product.shortDescription || product.description}
                      </p>
                    </div>

                    {/* Dimensions & Availability */}
                    <div className="pt-2 border-t border-[#EAE5DC] flex items-center justify-between text-[11px] text-[#68625A]">
                      <span className="line-clamp-1 max-w-[170px]">{dimensionText}</span>
                      <span className="font-medium text-[#1A1715] shrink-0">{availabilityText}</span>
                    </div>

                    {/* Price & Action Buttons */}
                    <div className="pt-2 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-[#8E867D] block">Price</span>
                        <span className="font-serif text-base sm:text-lg font-bold text-[#1A1715]">{priceText}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openWhatsApp({
                            intent: 'product',
                            productName: productName,
                            productCode: product.id
                          })}
                          className="p-2 rounded-full bg-[#1B5E43] text-white hover:bg-[#154b35] transition-colors shadow-xs"
                          title="Enquire on WhatsApp"
                          aria-label="WhatsApp Enquiry"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-white fill-current" />
                        </button>

                        <button
                          onClick={() => onOpenEnquiryWithPiece(productName)}
                          className="px-3.5 py-1.5 rounded-full bg-[#F3EFE8] text-[#1A1715] border border-[#EAE5DC] hover:border-[#8A6738] hover:bg-[#EAE5DC] text-xs font-semibold transition-colors shadow-xs"
                        >
                          Enquire
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            BOTTOM PROGRESS BAR & CONTROLS
           ========================================================================= */}
        <div className="flex items-center justify-between pt-2.5 border-t border-[#EAE5DC] shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-widest text-[#68625A] font-semibold">
              SCROLL PROGRESS
            </span>
            <div className="w-28 sm:w-44 h-1.5 rounded-full bg-[#F3EFE8] border border-[#EAE5DC] overflow-hidden">
              <div
                ref={progressBarRef}
                className="h-full bg-[#8A6738] rounded-full transition-all duration-75"
                style={{ width: '0%' }}
              />
            </div>
            <span 
              ref={progressTextRef}
              className="text-[11px] font-bold text-[#1A1715] min-w-[32px]"
            >
              0%
            </span>
          </div>

          <button
            onClick={onViewAllClick}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#1A1715] hover:text-[#8A6738] transition-colors group"
          >
            <span>View All Pieces</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}
