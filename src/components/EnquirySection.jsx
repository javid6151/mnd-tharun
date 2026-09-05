import React, { useState } from 'react';
import { Send, MessageSquare, Phone, CheckCircle2, AlertCircle } from 'lucide-react';
import { openWhatsApp } from '../utils/whatsapp';

export default function EnquirySection({ preselectedPiece = "", storeConfig }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interest: preselectedPiece ? `Enquiry for: ${preselectedPiece}` : 'Antique & Vintage Furniture',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const interestOptions = [
    'Antique & Vintage Furniture',
    'Courtyard Jhula & Traditional Swings',
    'Solid Teakwood Dining Suites',
    'Luxury Handcarved Living Room Sofas',
    'Canopy & Four-Poster Master Beds',
    'Architectural Doors & Teak Pillars',
    'Complete Villa / Resort Interior Project',
    'Bespoke Custom Commission'
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your full name';
    
    // Validate phone (10+ digits)
    const phoneClean = formData.phone.replace(/[^0-9]/g, '');
    if (!phoneClean || phoneClean.length < 10) {
      newErrors.phone = 'Please provide a valid 10-digit phone number';
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleForwardWhatsApp = () => {
    const customMsg = `*New Customer Enquiry*\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email}\n*Interest:* ${formData.interest}\n*Message:* ${formData.message || 'I would like to receive catalog details and pricing.'}`;
    openWhatsApp({ customMessage: customMsg });
  };

  return (
    <section className="py-20 md:py-28 bg-[#FAF8F5] border-t border-[#EAE5DC]" id="enquiry-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Editorial Prompt */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-[#8A6738]" />
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#8A6738] font-sans">
                Bespoke Consultation
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1A1715] leading-tight">
              Find the Piece <br />
              <span className="italic font-light text-[#8A6738]">for Your Space</span>
            </h2>

            <p className="text-[#68625A] text-sm sm:text-base font-light leading-relaxed">
              Whether you are seeking an authentic antique focal point, furnishing a heritage villa in Hyderabad, or requiring custom-sized teakwood woodwork, our design consultants are at your service.
            </p>

            <div className="space-y-4 pt-4 border-t border-[#EAE5DC]">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-[#1A1715]">
                <div className="w-8 h-8 rounded-full bg-[#1B5E43]/10 border border-[#1B5E43]/30 text-[#1B5E43] flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold block text-[#1A1715]">Prefer Instant WhatsApp?</span>
                  <button
                    onClick={() => openWhatsApp({ intent: 'general' })}
                    className="text-[#1B5E43] font-bold hover:underline"
                  >
                    Start chat with Showroom Specialist →
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-sm text-[#1A1715]">
                <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#EAE5DC] text-[#8A6738] flex items-center justify-center shrink-0 shadow-xs">
                  <Phone className="w-4 h-4 text-[#8A6738]" />
                </div>
                <div>
                  <span className="font-semibold block text-[#1A1715]">Direct Showroom Helpline</span>
                  <a href={`tel:${storeConfig.phoneNumber}`} className="text-[#8A6738] font-bold hover:underline">
                    {storeConfig.displayPhone}
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Interactive Form Box */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-[#EAE5DC] shadow-sm">
            
            {submitted ? (
              <div className="text-center py-10 space-y-5">
                <div className="w-16 h-16 rounded-full bg-[#1B5E43]/10 border border-[#1B5E43]/30 text-[#1B5E43] mx-auto flex items-center justify-center shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1715]">
                  Thank You, {formData.name}
                </h3>
                <p className="text-[#68625A] text-sm sm:text-base font-light max-w-md mx-auto">
                  Your enquiry for <strong>{formData.interest}</strong> has been received. Our Hyderabad showroom specialist will connect with you shortly.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleForwardWhatsApp}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#1B5E43] text-white text-xs font-semibold hover:bg-[#154b35] flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>Send directly via WhatsApp</span>
                  </button>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', phone: '', email: '', interest: interestOptions[0], message: '' });
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] text-[#1A1715] text-xs font-semibold hover:bg-[#EAE5DC] transition-colors"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-[#1A1715] uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Rajesh Reddy"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.name ? 'border-red-500 bg-red-50' : 'border-[#EAE5DC]'
                      } bg-[#FAF8F5] text-[#1A1715] placeholder-[#8E867D] text-sm focus:outline-none focus:border-[#8A6738] transition-colors`}
                    />
                    {errors.name && (
                      <div className="flex items-center gap-1 text-[11px] text-red-600 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-[#1A1715] uppercase tracking-wider mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g., +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.phone ? 'border-red-500 bg-red-50' : 'border-[#EAE5DC]'
                      } bg-[#FAF8F5] text-[#1A1715] placeholder-[#8E867D] text-sm focus:outline-none focus:border-[#8A6738] transition-colors`}
                    />
                    {errors.phone && (
                      <div className="flex items-center gap-1 text-[11px] text-red-600 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.phone}</span>
                      </div>
                    )}
                  </div>

                </div>

                {/* Email & Interest */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#1A1715] uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="e.g., rajesh@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.email ? 'border-red-500 bg-red-50' : 'border-[#EAE5DC]'
                      } bg-[#FAF8F5] text-[#1A1715] placeholder-[#8E867D] text-sm focus:outline-none focus:border-[#8A6738] transition-colors`}
                    />
                    {errors.email && (
                      <div className="flex items-center gap-1 text-[11px] text-red-600 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.email}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A1715] uppercase tracking-wider mb-2">
                      Furniture Interest
                    </label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#EAE5DC] text-[#1A1715] text-sm focus:outline-none focus:border-[#8A6738] transition-colors bg-[#FAF8F5]"
                    >
                      {interestOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-white text-[#1A1715]">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-[#1A1715] uppercase tracking-wider mb-2">
                    Message / Custom Dimensions (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your room size, preferred wood finish, or any specific pieces you have in mind..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] text-[#1A1715] placeholder-[#8E867D] text-sm focus:outline-none focus:border-[#8A6738] transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-[#1A1715] text-[#FAF8F5] text-xs sm:text-sm font-semibold tracking-wider hover:bg-[#332D28] shadow-xs transition-colors flex items-center justify-center gap-2 group"
                >
                  <Send className="w-4 h-4 text-[#C49A6C] group-hover:translate-x-1 transition-transform" />
                  <span>{isSubmitting ? 'Sending Request...' : 'Send Enquiry to Manduva Logillu'}</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
