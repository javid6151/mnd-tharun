import React, { useState } from 'react';
import { X, MessageSquare, ShieldCheck, Check, ArrowRight, Share2, Compass, Layers } from 'lucide-react';
import { openWhatsApp } from '../utils/whatsapp';

export default function ProductDetailModal({ 
  product, 
  onClose, 
  onOpenEnquiryWithPiece, 
  onSelectRelatedProduct,
  allProducts 
}) {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const relatedPieces = allProducts
    .filter(p => p.id !== product.id && (p.categorySlug === product.categorySlug || p.room === product.room))
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Background click */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-[#EAE5DC] overflow-hidden z-10 my-8 flex flex-col max-h-[92vh]">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EAE5DC] bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-widest font-bold text-[#8A6738] font-sans">
              {product.category}
            </span>
            <span className="text-[#68625A] text-xs">•</span>
            <span className="text-xs text-[#68625A]">{product.room}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-[#F3EFE8] text-[#68625A] hover:text-[#1A1715] text-xs flex items-center gap-1.5 transition-colors"
              title="Share Link"
            >
              {copied ? <Check className="w-4 h-4 text-[#176B57]" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
            </button>
            
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#F3EFE8] text-[#1A1715] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 md:p-10 overflow-y-auto space-y-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
            
            {/* Left: Multi-Angle Gallery */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Main Image Frame */}
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] bg-[#FAF8F5] border border-[#EAE5DC] shadow-sm">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails Row */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`rounded-xl overflow-hidden aspect-[4/3] border-2 transition-all ${
                        activeImageIndex === idx
                          ? 'border-[#8A6738] shadow-sm scale-105'
                          : 'border-[#EAE5DC] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`${product.name} angle ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Verified Material Seal */}
              <div className="p-4 rounded-2xl bg-[#F3EFE8] border border-[#EAE5DC] flex items-center gap-3 text-xs text-[#1A1715]">
                <ShieldCheck className="w-5 h-5 text-[#8A6738] shrink-0" />
                <span>
                  <strong>Manduva Authenticity Guarantee:</strong> Solid timber inspection and natural oil polish. No synthetic veneer.
                </span>
              </div>

            </div>

            {/* Right: Specifications & Action */}
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
              
              <div className="space-y-4">
                {product.badge && (
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-px bg-[#8A6738]" />
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8A6738] font-sans">
                      {product.badge}
                    </span>
                  </div>
                )}

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#1A1715] font-normal leading-tight">
                  {product.name}
                </h2>

                <p className="text-sm sm:text-base text-[#68625A] font-light leading-relaxed">
                  {product.description}
                </p>

                {/* Technical Specifications Table */}
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] space-y-3 text-xs">
                  <div className="flex justify-between pb-2 border-b border-[#EAE5DC]">
                    <span className="text-[#68625A] font-medium">Materials</span>
                    <span className="font-semibold text-[#1A1715] text-right max-w-[65%]">{product.materials}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-[#EAE5DC]">
                    <span className="text-[#68625A] font-medium">Dimensions</span>
                    <span className="font-semibold text-[#1A1715] text-right">{product.dimensions}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-[#EAE5DC]">
                    <span className="text-[#68625A] font-medium">Availability</span>
                    <span className="font-semibold text-[#176B57] text-right">{product.availability}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-[#68625A] font-medium">Pricing</span>
                    <span className="font-serif text-lg font-bold text-[#1A1715]">{product.price}</span>
                  </div>
                </div>

                {product.priceNote && (
                  <div className="text-[11px] text-[#68625A] italic">
                    * {product.priceNote}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-[#EAE5DC]">
                <button
                  onClick={() => {
                    openWhatsApp({
                      pieceName: product.name,
                      category: product.category,
                      intent: 'piece'
                    });
                  }}
                  className="w-full py-4 rounded-2xl bg-[#176B57] border border-[#2B806A] hover:bg-[#135746] text-white text-xs sm:text-sm font-semibold tracking-wider transition-all shadow-sm flex items-center justify-center gap-2.5 font-sans"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enquire on WhatsApp</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onOpenEnquiryWithPiece(product.name);
                  }}
                  className="w-full py-3.5 rounded-2xl bg-[#FAF8F5] hover:bg-[#F3EFE8] text-[#1A1715] border border-[#EAE5DC] hover:border-[#8A6738] text-xs sm:text-sm font-semibold tracking-wider transition-colors shadow-xs text-center font-sans"
                >
                  Send Detailed Custom Enquiry Form
                </button>
              </div>

            </div>

          </div>

          {/* Related Furniture Section */}
          {relatedPieces.length > 0 && (
            <div className="pt-8 border-t border-[#EAE5DC] space-y-4">
              <h3 className="font-serif text-xl sm:text-2xl text-[#1A1715] font-normal">
                Complements This Piece
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedPieces.map(piece => (
                  <div
                    key={piece.id}
                    onClick={() => onSelectRelatedProduct(piece)}
                    className="p-3 rounded-2xl bg-[#FAF8F5] hover:bg-white hover:border-[#8A6738] border border-[#EAE5DC] cursor-pointer transition-all group shadow-xs"
                  >
                    <img
                      src={piece.images[0]}
                      alt={piece.name}
                      className="w-full h-32 rounded-xl object-cover mb-2.5"
                    />
                    <div className="text-[10px] uppercase tracking-wider text-[#8A6738] font-bold font-sans">
                      {piece.category}
                    </div>
                    <h4 className="font-serif text-sm font-semibold text-[#1A1715] group-hover:text-[#8A6738] truncate">
                      {piece.name}
                    </h4>
                    <span className="text-xs text-[#68625A]">{piece.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
