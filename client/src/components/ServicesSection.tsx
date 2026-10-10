import React from 'react';
import { servicesData } from '../data/services';
import { FadeIn } from './FadeIn';

export const ServicesSection: React.FC = () => {
  return (
    <section className="bg-white text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-0">
      <div className="max-w-5xl mx-auto w-full">
        {/* Heading */}
        <FadeIn delay={0} y={40} className="w-full text-center">
          <h2
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            className="text-[#0C0C0C] font-black uppercase text-center leading-none tracking-tight mb-16 sm:mb-20 md:mb-28"
          >
            Services
          </h2>
        </FadeIn>

        {/* 5 Service Items */}
        <div className="divide-y divide-[rgba(12,12,12,0.15)] border-t border-b border-[rgba(12,12,12,0.15)]">
          {servicesData.map((service, index) => (
            <FadeIn key={service.number} delay={index * 0.1} y={30}>
              <div className="py-8 sm:py-10 md:py-12 flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-12 transition-colors duration-300 hover:bg-black/[0.02] px-2 sm:px-4 rounded-2xl">
                {/* Number on the left */}
                <div className="shrink-0 md:w-1/3">
                  <span
                    style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
                    className="font-black text-[#0C0C0C] leading-none block tracking-tighter"
                  >
                    {service.number}
                  </span>
                </div>

                {/* Name & description stacked vertically on the right */}
                <div className="md:w-2/3 flex flex-col gap-2 pt-1 md:pt-4">
                  <h3
                    style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                    className="font-medium uppercase text-[#0C0C0C] tracking-wide"
                  >
                    {service.title}
                  </h3>
                  <p
                    style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                    className="font-light leading-relaxed max-w-2xl text-[#0C0C0C] opacity-60"
                  >
                    {service.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
