import React from 'react';
import GallerySection from '../components/GallerySection';

export default function GalleryPage() {
  return (
    <div className="pt-32 pb-24 space-y-12">
      <div className="text-center max-w-3xl mx-auto px-4 space-y-4">
        <div className="flex items-center justify-center gap-3">
          <span className="w-8 h-px bg-[#8A6738]/60" />
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#8A6738] font-sans">
            Visual Showroom Archive
          </span>
          <span className="w-8 h-px bg-[#8A6738]/60" />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#1A1715] leading-tight">
          Showroom Gallery
        </h1>
        <p className="text-[#68625A] text-base sm:text-lg font-light leading-relaxed">
          High-resolution photography capturing our Hyderabad showroom arrangements, solid teak wood grain, hand-chiseled relief work, and authentic antiques.
        </p>
      </div>

      <GallerySection />
    </div>
  );
}
