import React, { useState } from 'react';
import { Star, ShieldCheck, ExternalLink, Quote, Search } from 'lucide-react';
import { verifiedReviews, googleProfileSummary } from '../data/reviewsData';

export default function ReviewsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = searchTerm
    ? verifiedReviews.filter(r => 
        r.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.text.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : verifiedReviews;

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="flex items-center justify-center gap-3">
          <span className="w-8 h-px bg-[#8A6738]/60" />
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#8A6738] font-sans">
            Verified Testimonials
          </span>
          <span className="w-8 h-px bg-[#8A6738]/60" />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#1A1715] leading-tight">
          Customer Reviews
        </h1>
        <p className="text-[#68625A] text-base sm:text-lg font-light leading-relaxed">
          Read genuine feedback from customers who visited Manduva Logillu in Hyderabad.
        </p>
      </div>

      {/* Google Credibility Showcase Box */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#EAE5DC] shadow-sm max-w-2xl mx-auto text-center space-y-6">
        <div className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#EAE5DC] text-[#8A6738] font-bold flex items-center justify-center text-lg">
            G
          </div>
          <div className="text-left">
            <h3 className="font-serif text-xl font-bold text-[#1A1715] leading-tight">Google Business Rating</h3>
            <span className="text-xs text-[#8A6738] font-semibold flex items-center gap-1 font-sans">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Authentic Customer Feedback
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <span className="font-serif text-5xl font-bold text-[#1A1715]">{googleProfileSummary.rating.toFixed(1)}</span>
          <div className="flex text-[#8A6738]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-[#8A6738] text-[#8A6738]" />
            ))}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#68625A]">
          Based on {googleProfileSummary.reviewCount} customer reviews in Hyderabad
        </p>

        <div>
          <a
            href={googleProfileSummary.writeReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1A1715] text-white hover:bg-[#8A6738] text-xs font-semibold shadow-xs transition-colors font-sans"
          >
            <span>Write a Review on Google</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((rev) => (
          <div
            key={rev.id}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EAE5DC] shadow-sm flex flex-col justify-between space-y-6 hover:border-[#8A6738]/50 transition-colors"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex text-[#8A6738]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#8A6738] text-[#8A6738]" />
                  ))}
                </div>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-[#8A6738] font-sans">
                  Google Verified
                </span>
              </div>

              <p className="font-serif text-lg text-[#1A1715] italic font-normal leading-relaxed">
                "{rev.text}"
              </p>
            </div>

            <div className="pt-4 border-t border-[#EAE5DC] flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#EAE5DC] text-[#8A6738] font-serif text-xs font-bold flex items-center justify-center">
                {rev.avatar}
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-[#1A1715]">{rev.author}</h4>
                <span className="text-[11px] text-[#68625A] font-sans">{rev.highlight}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
