import React from 'react';
import { Compass } from 'lucide-react';

export default function WhyManduva() {
  const brandPoints = [
    {
      number: "01",
      title: "Timeless Craftsmanship",
      desc: "Furniture designed around traditional Indian woodworking traditions, generational joinery, and enduring physical quality."
    },
    {
      number: "02",
      title: "Authentic Character",
      desc: "Every vintage relic and antique-inspired creation possesses distinct grain variations, hand-carved individuality, and historic personality."
    },
    {
      number: "03",
      title: "Premium Quality",
      desc: "Uncompromising selection of aged solid teakwood, rosewood, pure brass hardware, and non-toxic organic botanical finishes."
    },
    {
      number: "04",
      title: "Curated Collection",
      desc: "Carefully chosen pieces curated for luxury residences, Hyderabad villas, heritage estates, and discerning interior design projects."
    },
    {
      number: "05",
      title: "Hyderabad's Furniture Destination",
      desc: "A celebrated destination for customers across Telangana searching for authentic traditional, antique, and luxury furniture."
    }
  ];

  return (
    <section className="py-20 md:py-28 border-t border-[#EAE5DC] bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-[#8A6738]" />
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#8A6738] font-sans">
                Our Defining Pillars
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1A1715]">
              Why Manduva Logillu
            </h2>
            <p className="text-[#68625A] text-sm sm:text-base font-light">
              We stand apart through our dedication to authentic Indian woodwork, restored architectural relics, and heirloom permanence.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-2.5 text-xs font-sans text-[#8A6738] uppercase tracking-[0.2em] font-semibold">
            <span className="w-6 h-px bg-[#8A6738]" />
            <span>The Benchmark of Hyderabad Antiques</span>
          </div>
        </div>

        {/* 5 Distinct Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {brandPoints.map((item, idx) => (
            <div
              key={idx}
              className="group p-6 sm:p-7 rounded-2xl bg-white border border-[#EAE5DC] shadow-xs hover:border-[#8A6738]/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="text-2xl sm:text-3xl font-serif font-light text-[#8A6738] mb-4 group-hover:text-[#1A1715] transition-colors">
                  {item.number}
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#1A1715] mb-2.5">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#68625A] font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="w-8 h-0.5 bg-[#EAE5DC] group-hover:w-full group-hover:bg-[#8A6738] transition-all duration-500 mt-6" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
