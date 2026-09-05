import React from 'react';
import { MapPin, Phone, MessageSquare, Clock, Navigation, ExternalLink } from 'lucide-react';
import { openWhatsApp } from '../utils/whatsapp';

export default function LocationSection({ storeConfig }) {
  return (
    <section className="py-20 md:py-28 bg-white border-t border-[#EAE5DC]" id="location-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-[#8A6738]/60" />
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#8A6738] font-sans">
              Hyderabad Showroom
            </span>
            <span className="w-8 h-px bg-[#8A6738]/60" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1A1715]">
            Visit Manduva Logillu
          </h2>
          <p className="text-[#68625A] text-sm sm:text-base font-light leading-relaxed">
            Discover our collection of traditional, vintage and luxury furniture in Hyderabad. Experience the tangible weight of seasoned timber and discuss bespoke projects with our specialists.
          </p>
        </div>

        {/* Showroom & Map Dual Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Store Info Card */}
          <div className="lg:col-span-5 bg-[#FAF8F5] p-7 sm:p-9 rounded-3xl border border-[#EAE5DC] shadow-xs flex flex-col justify-between space-y-8">
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#EAE5DC] text-[#8A6738] flex items-center justify-center shrink-0 shadow-xs">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1A1715]">
                    Hyderabad Showroom
                  </h3>
                  <p className="text-xs sm:text-sm text-[#68625A] font-light mt-1">
                    {storeConfig.fullAddress}
                  </p>
                </div>
              </div>

              {/* Showroom Hours */}
              <div className="p-4 rounded-2xl bg-white border border-[#EAE5DC] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1A1715] uppercase tracking-wider">
                  <Clock className="w-4 h-4 text-[#8A6738]" />
                  <span>Showroom Visiting Hours</span>
                </div>
                <div className="text-xs text-[#1A1715] space-y-1 pt-1">
                  <div className="flex justify-between">
                    <span className="text-[#68625A]">Monday – Friday:</span>
                    <span className="font-medium">{storeConfig.showroomHours.weekdays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#68625A]">Saturday – Sunday:</span>
                    <span className="font-medium">{storeConfig.showroomHours.weekends}</span>
                  </div>
                  <div className="text-[11px] text-[#8A6738] font-medium pt-1 border-t border-[#EAE5DC]">
                    • {storeConfig.showroomHours.note}
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-[#EAE5DC]">
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${storeConfig.phoneNumber}`}
                  className="py-3 px-4 rounded-xl bg-white border border-[#EAE5DC] text-[#1A1715] hover:border-[#8A6738] text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors text-center"
                >
                  <Phone className="w-3.5 h-3.5 text-[#8A6738]" />
                  <span>Call Store</span>
                </a>

                <button
                  onClick={() => openWhatsApp({ intent: 'visit' })}
                  className="py-3 px-4 rounded-xl bg-[#1B5E43] text-white hover:bg-[#154b35] text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Us</span>
                </button>
              </div>

              <a
                href={storeConfig.socials.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-white border border-[#EAE5DC] text-[#1A1715] hover:border-[#8A6738] text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <Navigation className="w-4 h-4 text-[#8A6738]" />
                <span>Get Driving Directions on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#8E867D]" />
              </a>
            </div>

          </div>

          {/* Right Interactive Map / Visual Card */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-[#EAE5DC] shadow-xs relative bg-[#F3EFE8] min-h-[350px]">
            <iframe
              title="Manduva Logillu Furniture Showroom Location Hyderabad"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.3169822452!2d78.2679585675402!3d17.41229980126588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale-[15%] contrast-[1.03]"
            />
            
            {/* Map Overlay Badge */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-xs border border-[#EAE5DC] flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#8A6738]" />
              <span className="text-xs font-semibold text-[#1A1715]">Manduva Logillu • Hyderabad</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
