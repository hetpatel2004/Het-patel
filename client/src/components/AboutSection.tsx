import React from 'react';
import { FadeIn } from './FadeIn';

interface AboutSectionProps {
  onOpenContact?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenContact }) => {
  const stats = [
    { number: '1+', label: 'Years Experience' },
    { number: '12+', label: 'Projects Shipped' },
    { number: '8+', label: 'Happy Clients' },
    { number: '100%', label: 'On-time Delivery' },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-28 py-28 md:py-36 bg-[#0C0C0C] border-t border-white/5 overflow-hidden"
    >
      {/* Decorative subtle ambient arc glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[300px] bg-gradient-to-b from-[#B600A8]/10 via-[#7621B0]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col">
        {/* Editorial Headline */}
        <FadeIn delay={0.1} y={30}>
          <div className="flex flex-col leading-none tracking-tight">
            <span className="font-serif italic font-normal text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white">
              I build things
            </span>
            <span className="font-serif italic font-normal text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white mt-1">
              that live
            </span>
            <div className="flex items-baseline gap-3 mt-1 sm:mt-2">
              <span className="font-sans font-black uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#D7E2EA]">
                ON THE WEB
              </span>
              <span className="text-[#B600A8] font-black text-3xl sm:text-5xl md:text-6xl animate-pulse">
                *
              </span>
            </div>
          </div>
        </FadeIn>

        {/* Glowing Pill Matrix Bar (Dharmesh's signature about-pills) */}
        <FadeIn delay={0.2} y={20} className="my-8 sm:my-10">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-2">
            {Array.from({ length: 18 }).map((_, i) => {
              const isLit = i === 3 || i === 8 || i === 13 || i === 17;
              return (
                <div
                  key={i}
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 shrink-0 ${
                    isLit
                      ? 'w-8 sm:w-10 bg-[#B600A8] shadow-[0_0_12px_#B600A8]'
                      : 'w-4 sm:w-6 bg-white/10 hover:bg-white/20'
                  }`}
                />
              );
            })}
          </div>
        </FadeIn>

        {/* Location footnote */}
        <FadeIn delay={0.25} y={15}>
          <p className="text-xs sm:text-sm font-light uppercase tracking-widest text-[#BBCCD7]/60 mb-8 sm:mb-12">
            <span className="text-[#B600A8] font-bold mr-1">*</span>
            Based in Ahmedabad, India — working with teams anywhere.
          </p>
        </FadeIn>

        {/* Bio paragraph with high-legibility typographic scale */}
        <FadeIn delay={0.3} y={20}>
          <p className="text-lg sm:text-2xl md:text-3xl font-light text-[#D7E2EA]/90 leading-relaxed max-w-4xl mb-16 sm:mb-20">
            Software engineer with hands-on professional experience crafting fast, accessible, and visually sharp web applications. I work across the full stack — from pixel-perfect React UIs to scalable Node.js &amp; MongoDB backend APIs. Currently open to full-time engineering roles, internships, and freelance projects.
          </p>
        </FadeIn>

        {/* 4 Stat Boxes Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-t border-white/10 pt-10 sm:pt-14">
          {stats.map((stat, idx) => (
            <FadeIn key={idx} delay={0.35 + idx * 0.08} y={20}>
              <div className="p-5 sm:p-6 rounded-2xl bg-[#111217] border border-white/5 hover:border-[#B600A8]/40 transition-colors duration-300 group">
                <span className="block font-sans font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#BBCCD7]">
                  {stat.number}
                </span>
                <span className="block text-xs uppercase tracking-wider text-[#BBCCD7]/60 font-light mt-2">
                  {stat.label}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
