import React, { useState, useEffect } from 'react';
import { Search, Phone, MessageSquare, Menu, X, Sliders, ChevronRight, Home, Grid, MapPin, Compass, BookOpen, Star } from 'lucide-react';
import { openWhatsApp } from '../utils/whatsapp';

export default function Navbar({ 
  currentRoute, 
  setCurrentRoute, 
  storeConfig, 
  onOpenSearch, 
  onOpenAdmin,
  onOpenEnquiry 
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', route: 'home', icon: Home },
    { label: 'Collections', route: 'collections', icon: Compass },
    { label: 'Furniture', route: 'furniture', icon: Grid },
    { label: 'About', route: 'about', icon: BookOpen },
    { label: 'Gallery', route: 'gallery', icon: Grid },
    { label: 'Reviews', route: 'reviews', icon: Star },
    { label: 'Contact', route: 'contact', icon: MapPin },
  ];

  const handleNavClick = (route) => {
    setCurrentRoute(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* =========================================================================
          TOP NAVBAR (Responsive across Desktop, Tablet & Mobile)
         ========================================================================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/92 backdrop-blur-xl py-3 border-b border-[#EAE5DC] shadow-sm'
            : 'bg-[#FAF8F5]/75 backdrop-blur-md py-4 border-b border-[#EAE5DC]/60'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* =========================================================================
              LEFT: Brand Crest & Title (Editorial Agency Treatment)
             ========================================================================= */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none shrink-0 min-w-0"
            aria-label="Manduva Logillu Furniture Home"
          >
            <div className="h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-lg p-0.5 bg-white border border-[#EAE5DC] shadow-xs shrink-0">
              <img
                src="/images/manduva-logo.png"
                alt="Manduva Logillu Crest"
                className="h-full w-auto object-contain rounded group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="flex flex-col justify-center min-w-0">
              <span className="font-serif text-base sm:text-lg xl:text-xl font-semibold tracking-[0.06em] sm:tracking-[0.08em] text-[#1A1715] group-hover:text-[#8A6738] transition-colors leading-tight truncate">
                MANDUVA LOGILLU
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.18em] text-[#68625A] font-medium hidden sm:block truncate">
                Resort & Farmhouse Furniture • Hyderabad
              </span>
            </div>
          </button>

          {/* =========================================================================
              CENTER: Desktop Navigation Links (Clean & Minimal Editorial)
             ========================================================================= */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.route;
              return (
                <button
                  key={link.route}
                  onClick={() => handleNavClick(link.route)}
                  className={`relative px-3.5 py-2 text-xs uppercase tracking-[0.14em] transition-colors duration-200 ${
                    isActive
                      ? 'text-[#1A1715] font-semibold'
                      : 'text-[#68625A] font-medium hover:text-[#1A1715]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#8A6738] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* =========================================================================
              RIGHT: Action Group (High-Contrast Professional Agency Controls)
             ========================================================================= */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Quick Search */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#68625A] hover:text-[#1A1715] hover:bg-stone-100/70 rounded-full transition-colors focus:outline-none"
              aria-label="Search Collection"
              title="Search Collection"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* WhatsApp Quick Chat */}
            <button
              onClick={() => openWhatsApp({ intent: 'general' })}
              className="px-3.5 py-1.5 rounded-full bg-[#1B5E43] text-white hover:bg-[#154b35] transition-colors text-xs font-semibold shadow-xs flex items-center gap-1.5"
              aria-label="WhatsApp Us"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span className="hidden md:inline">WhatsApp</span>
            </button>

            {/* Direct Phone Helpline (Desktop) */}
            <a
              href={`tel:${storeConfig.phoneNumber}`}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#68625A] hover:text-[#1A1715] transition-colors"
              title="Call Showroom"
            >
              <Phone className="w-3.5 h-3.5 text-[#8A6738]" />
              <span>{storeConfig.displayPhone}</span>
            </a>

            {/* Enquire Now (Tablet & Desktop) */}
            <button
              onClick={onOpenEnquiry}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#1A1715] text-[#FAF8F5] hover:bg-[#332D28] text-xs font-medium tracking-wider uppercase transition-all duration-200 shadow-xs"
            >
              <span>Enquire</span>
            </button>

            {/* Admin CMS Trigger (Desktop) */}
            <button
              onClick={onOpenAdmin}
              className="hidden sm:flex p-2 text-[#8E867D] hover:text-[#1A1715] hover:bg-stone-100/70 transition-colors rounded-full"
              title="CMS Catalog Admin"
              aria-label="Admin CMS Settings"
            >
              <Sliders className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="xl:hidden p-2 rounded-lg text-[#1A1715] hover:bg-stone-100/70 transition-colors focus:outline-none flex items-center justify-center shrink-0"
              aria-label="Open Mobile Menu"
              title="Navigation Menu"
            >
              <Menu className="w-5 h-5 stroke-[2]" />
            </button>
          </div>

        </div>
      </header>

      {/* =========================================================================
          MOBILE SLIDE-OVER DRAWER (Editorial Gallery Canvas)
         ========================================================================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-[#1A1715]/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)} 
          />

          <div className="relative w-full max-w-sm bg-[#FAF8F5] text-[#1A1715] h-full shadow-2xl flex flex-col justify-between p-6 z-10 overflow-y-auto border-r border-[#EAE5DC]">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-5 border-b border-[#EAE5DC]">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg p-1 bg-white border border-[#EAE5DC] flex items-center justify-center shadow-xs">
                    <img
                      src="/images/manduva-logo.png"
                      alt="Manduva Logillu Logo"
                      className="h-full w-auto object-contain rounded"
                    />
                  </div>
                  <div>
                    <div className="font-serif text-base font-bold text-[#1A1715]">MANDUVA LOGILLU</div>
                    <div className="text-[10px] tracking-widest text-[#68625A] uppercase font-medium">Hyderabad Showroom</div>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-[#68625A] hover:text-[#1A1715] hover:bg-stone-100 transition-colors"
                  aria-label="Close Mobile Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="py-6 space-y-1">
                {navLinks.map((link) => {
                  const isActive = currentRoute === link.route;
                  const Icon = link.icon;
                  return (
                    <button
                      key={link.route}
                      onClick={() => handleNavClick(link.route)}
                      className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-left text-sm uppercase tracking-wider transition-all ${
                        isActive
                          ? 'text-[#1A1715] font-semibold bg-[#F3EFE8]'
                          : 'text-[#68625A] hover:text-[#1A1715] hover:bg-stone-100/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-[#8A6738]' : 'text-[#8E867D]'}`} />
                        <span>{link.label}</span>
                      </div>
                      <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#8A6738]' : 'text-stone-300'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="pt-6 border-t border-[#EAE5DC] space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openWhatsApp({ intent: 'general' });
                  }}
                  className="w-full py-3 px-3 rounded-xl bg-[#1B5E43] hover:bg-[#154b35] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>WhatsApp</span>
                </button>
                <a
                  href={`tel:${storeConfig.phoneNumber}`}
                  className="w-full py-3 px-3 rounded-xl bg-[#F3EFE8] hover:bg-[#EAE5DC] border border-[#EAE5DC] text-[#1A1715] text-xs font-semibold flex items-center justify-center gap-2 text-center transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#8A6738]" />
                  <span>Call Store</span>
                </a>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry();
                }}
                className="w-full py-3 rounded-xl bg-[#1A1715] text-[#FAF8F5] hover:bg-[#332D28] text-xs font-semibold tracking-wider uppercase transition-colors shadow-sm"
              >
                Request Custom Piece Enquiry
              </button>

              <div className="pt-2 text-center text-[10px] text-[#68625A] tracking-wider uppercase">
                Hyderabad Showroom • Solid Teakwood & Antiques
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
