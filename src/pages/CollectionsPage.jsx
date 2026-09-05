import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export default function CollectionsPage({ categories, onSelectCategory }) {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="flex items-center justify-center gap-3">
          <span className="w-8 h-px bg-[#8A6738]/60" />
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#8A6738] font-sans">
            Curated Categories
          </span>
          <span className="w-8 h-px bg-[#8A6738]/60" />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#1A1715] leading-tight">
          Our Collections
        </h1>
        <p className="text-[#68625A] text-base sm:text-lg font-light leading-relaxed">
          Explore handcrafted furniture across distinct aesthetic disciplines, from preserved antique treasures to majestic teak dining and courtyard suites.
        </p>
      </div>

      {/* Categories Detailed Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onSelectCategory(cat.slug)}
            className="group bg-white rounded-3xl overflow-hidden border border-[#EAE5DC] hover:border-[#8A6738]/60 shadow-sm hover:shadow-md cursor-pointer transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div className="relative aspect-[4/3] bg-[#FAF8F5] overflow-hidden img-zoom-container">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-2.5 py-1 bg-white/95 border border-[#EAE5DC] backdrop-blur-md text-[#1A1715] text-[10px] font-semibold uppercase tracking-wider font-sans shadow-xs">
                  {cat.count} {typeof cat.count === 'number' ? 'Pieces' : ''}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-bold block mb-0.5 font-sans">
                  {cat.tagline}
                </span>
                <h3 className="font-serif text-2xl font-normal text-white">
                  {cat.name}
                </h3>
              </div>
            </div>

            <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-[#68625A] font-light leading-relaxed">
                {cat.description}
              </p>

              <div className="pt-3 border-t border-[#EAE5DC] flex items-center justify-between text-xs font-semibold text-[#1A1715] group-hover:text-[#8A6738] font-sans">
                <span>Browse {cat.name}</span>
                <ArrowUpRight className="w-4 h-4 text-[#8A6738] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
