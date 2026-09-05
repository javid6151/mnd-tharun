import React from 'react';
import { MapPin, Phone, MessageSquare, Star, ArrowUp, ShieldCheck } from 'lucide-react';
import { openWhatsApp } from '../utils/whatsapp';
import { googleProfileSummary } from '../data/reviewsData';

export default function Footer({ currentRoute, setCurrentRoute, storeConfig, onOpenAdmin }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', route: 'home' },
    { label: 'Collections', route: 'collections' },
    { label: 'Furniture Catalog', route: 'furniture' },
    { label: 'About Our Heritage', route: 'about' },
    { label: 'Visual Gallery', route: 'gallery' },
    { label: 'Customer Reviews (5.0)', route: 'reviews' },
    { label: 'Contact & Showroom', route: 'contact' },
  ];

  return (
    <footer className="bg-[#141210] text-[#FAF8F5] pt-20 pb-12 border-t border-[#25201C] relative overflow-hidden">
      
      {/* Soft warm ambient depth */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#201A16]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#25201C]">
          
          {/* Col 1: Brand Lore */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3.5">
              <img
                src="/images/manduva-logo.png"
                alt="Manduva Logillu Logo"
                className="h-14 w-auto object-contain brightness-105 drop-shadow-md"
              />
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold tracking-wider text-white">
                  MANDUVA LOGILLU
                </h3>
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#C49B66] font-semibold block font-sans">
                  Resort & Farmhouse Furniture
                </span>
              </div>
            </div>

            <p className="text-sm text-[#9C948A] font-light leading-relaxed">
              Hyderabad's premier destination for handcrafted traditional, antique, and vintage teakwood furniture. Crafted for homes, grand villas, and heritage resort retreats across India.
            </p>

            {/* Google Rating Trust Tag */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#1C1815] border border-[#2B241F] text-xs">
              <div className="flex text-[#C49B66]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#C49B66] text-[#C49B66]" />
                ))}
              </div>
              <span className="font-bold text-white">{googleProfileSummary.rating.toFixed(1)}</span>
              <span className="text-[#9C948A]">({googleProfileSummary.reviewCount} Reviews on Google)</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-[#C49B66] font-bold font-sans">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm font-light text-[#9C948A]">
              {navLinks.map((link) => (
                <li key={link.route}>
                  <button
                    onClick={() => {
                      setCurrentRoute(link.route);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Categories & Collections */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-[#C49B66] font-bold font-sans">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-light text-[#9C948A]">
              <li><button onClick={() => setCurrentRoute('collections')} className="hover:text-white transition-colors">Antique Furniture</button></li>
              <li><button onClick={() => setCurrentRoute('collections')} className="hover:text-white transition-colors">Vintage Furniture</button></li>
              <li><button onClick={() => setCurrentRoute('collections')} className="hover:text-white transition-colors">Traditional Courtyards</button></li>
              <li><button onClick={() => setCurrentRoute('collections')} className="hover:text-white transition-colors">Solid Teak Dining</button></li>
              <li><button onClick={() => setCurrentRoute('collections')} className="hover:text-white transition-colors">Carved Sofa Suites</button></li>
              <li><button onClick={() => setCurrentRoute('collections')} className="hover:text-white transition-colors">Custom Architecture</button></li>
            </ul>
          </div>

          {/* Col 4: Hyderabad Store & Contact */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-[#C49B66] font-bold font-sans">
              Hyderabad Destination
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-[#9C948A] font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C49B66] shrink-0 mt-0.5" />
                <span>{storeConfig.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C49B66] shrink-0" />
                <a href={`tel:${storeConfig.phoneNumber}`} className="hover:text-white transition-colors">
                  {storeConfig.displayPhone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-[#C49B66] shrink-0" />
                <button onClick={() => openWhatsApp({ intent: 'general' })} className="hover:text-white transition-colors">
                  Instant WhatsApp Support
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => openWhatsApp({ intent: 'visit' })}
                className="w-full py-2.5 px-4 rounded-xl bg-[#1C1815] hover:bg-[#25201C] text-white text-xs font-semibold border border-[#2B241F] hover:border-[#C49B66] transition-colors text-center"
              >
                Schedule Private Showroom Visit
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9C948A]/80">
          <div>
            © {new Date().getFullYear()} Manduva Logillu Furniture's, Hyderabad. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="text-[#9C948A]/60 hover:text-white transition-colors"
            >
              CMS Catalog Admin
            </button>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#C49B66] hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
