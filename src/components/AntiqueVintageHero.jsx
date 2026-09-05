import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function AntiqueVintageHero({ onExploreVintage }) {
  return (
    <section className="relative py-24 md:py-36 bg-white text-[#1A1715] border-t border-[#EAE5DC] overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Editorial Narrative */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <span className="w-8 h-px bg-[#8A6738]" />
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#8A6738] font-sans">
                The Antique & Vintage Vault
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-normal leading-[1.15] text-[#1A1715]">
              Where Heritage Finds <br />
              <span className="italic font-light text-[#8A6738]">a Place at Home</span>
            </h2>

            <p className="text-base sm:text-lg text-[#68625A] font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
              Vintage pieces, antique-inspired furniture and traditional craftsmanship brought together for modern spaces. Each object carries the quiet grace of bygone eras, ready to anchor your sanctuary.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onExploreVintage}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#1A1715] text-[#FAF8F5] hover:bg-[#332D28] text-sm font-semibold tracking-wider transition-colors duration-200 shadow-sm flex items-center justify-center gap-3 group"
              >
                <span>Explore Vintage Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 text-[#C49A6C] transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Dual Visual Showcase */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 sm:gap-6">
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-[#EAE5DC] shadow-sm aspect-[3/4] img-zoom-container bg-[#F3EFE8]">
              <img
                src="/images/manduva-antique-1.jpg"
                alt="Antique Furniture Collection Hyderabad Manduva Logillu"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-[#EAE5DC] shadow-sm aspect-[3/4] pt-6 img-zoom-container bg-[#F3EFE8]">
              <img
                src="/images/manduva-vintage-carved.jpg"
                alt="Vintage Handcarved Teakwood Furniture Manduva Logillu"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
