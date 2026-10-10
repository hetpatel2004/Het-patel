import React from 'react';
import { reviewsRow1, reviewsRow2 } from '../data/reviewsData';
import { FadeIn } from './FadeIn';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="relative w-full py-24 sm:py-32 md:py-40 bg-[#0C0C0C] border-t border-white/5 overflow-hidden">
      {/* Background Number Watermark */}
      <div className="absolute right-6 top-10 text-[18vw] font-black text-white/[0.025] select-none pointer-events-none leading-none font-mono">
        03
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-12 md:px-16 lg:px-20 mb-14 sm:mb-18 relative z-10">
        <FadeIn delay={0.1} y={20}>
          <span className="text-xs uppercase tracking-widest text-[#BBCCD7]/60 font-mono block mb-4">
            03 / TESTIMONIALS
          </span>
        </FadeIn>

        <FadeIn delay={0.15} y={30}>
          <div className="flex flex-col leading-none">
            <span className="font-sans font-black uppercase text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight">
              WHAT PEOPLE
            </span>
            <span className="font-sans font-black uppercase text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight mt-1 sm:mt-2">
              SAY ABOUT
            </span>
            <span className="font-serif italic font-normal text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#BBCCD7] mt-1 sm:mt-2">
              MY WORK.
            </span>
          </div>
        </FadeIn>
      </div>

      {/* Marquee Row 1 (LTR) with Pause on Hover */}
      <div className="w-full mb-6 overflow-hidden py-2 group">
        <div className="animate-marquee-ltr flex items-stretch gap-5 group-hover:[animation-play-state:paused]">
          {/* Track 1 */}
          <div className="flex items-stretch gap-5">
            {reviewsRow1.map((item, idx) => (
              <article
                key={`r1-1-${idx}`}
                className="w-[340px] sm:w-[420px] shrink-0 p-6 sm:p-8 rounded-[28px] sm:rounded-[32px] bg-[#121319] border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:-translate-y-1.5"
              >
                <div>
                  <span className="text-3xl sm:text-4xl font-serif text-[#B600A8] block mb-2 leading-none">
                    &ldquo;
                  </span>
                  <p className="text-xs sm:text-sm font-light leading-relaxed text-[#D7E2EA]/90 mb-6">
                    {item.quote}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#B600A8]/30 to-white/10 border border-white/15 flex items-center justify-center font-bold text-xs text-white">
                      {item.initials}
                    </div>
                    <div>
                      <h5 className="font-bold text-xs sm:text-sm text-white tracking-tight">
                        {item.author}
                      </h5>
                      <span className="text-[10px] sm:text-xs font-mono text-[#BBCCD7]/60 block mt-0.5">
                        {item.role}
                      </span>
                    </div>
                  </div>

                  <div className="text-amber-400 text-xs sm:text-sm tracking-wider">
                    ★★★★★
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Track 2 Repeat for seamless loop */}
          <div className="flex items-stretch gap-5" aria-hidden="true">
            {reviewsRow1.map((item, idx) => (
              <article
                key={`r1-2-${idx}`}
                className="w-[340px] sm:w-[420px] shrink-0 p-6 sm:p-8 rounded-[28px] sm:rounded-[32px] bg-[#121319] border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:-translate-y-1.5"
              >
                <div>
                  <span className="text-3xl sm:text-4xl font-serif text-[#B600A8] block mb-2 leading-none">
                    &ldquo;
                  </span>
                  <p className="text-xs sm:text-sm font-light leading-relaxed text-[#D7E2EA]/90 mb-6">
                    {item.quote}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#B600A8]/30 to-white/10 border border-white/15 flex items-center justify-center font-bold text-xs text-white">
                      {item.initials}
                    </div>
                    <div>
                      <h5 className="font-bold text-xs sm:text-sm text-white tracking-tight">
                        {item.author}
                      </h5>
                      <span className="text-[10px] sm:text-xs font-mono text-[#BBCCD7]/60 block mt-0.5">
                        {item.role}
                      </span>
                    </div>
                  </div>

                  <div className="text-amber-400 text-xs sm:text-sm tracking-wider">
                    ★★★★★
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee Row 2 (RTL) with Pause on Hover */}
      <div className="w-full overflow-hidden py-2 group">
        <div className="animate-marquee-rtl flex items-stretch gap-5 group-hover:[animation-play-state:paused]">
          {/* Track 1 */}
          <div className="flex items-stretch gap-5">
            {reviewsRow2.map((item, idx) => (
              <article
                key={`r2-1-${idx}`}
                className="w-[340px] sm:w-[420px] shrink-0 p-6 sm:p-8 rounded-[28px] sm:rounded-[32px] bg-[#121319] border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:-translate-y-1.5"
              >
                <div>
                  <span className="text-3xl sm:text-4xl font-serif text-[#B600A8] block mb-2 leading-none">
                    &ldquo;
                  </span>
                  <p className="text-xs sm:text-sm font-light leading-relaxed text-[#D7E2EA]/90 mb-6">
                    {item.quote}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#7621B0]/30 to-white/10 border border-white/15 flex items-center justify-center font-bold text-xs text-white">
                      {item.initials}
                    </div>
                    <div>
                      <h5 className="font-bold text-xs sm:text-sm text-white tracking-tight">
                        {item.author}
                      </h5>
                      <span className="text-[10px] sm:text-xs font-mono text-[#BBCCD7]/60 block mt-0.5">
                        {item.role}
                      </span>
                    </div>
                  </div>

                  <div className="text-amber-400 text-xs sm:text-sm tracking-wider">
                    ★★★★★
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Track 2 Repeat for seamless loop */}
          <div className="flex items-stretch gap-5" aria-hidden="true">
            {reviewsRow2.map((item, idx) => (
              <article
                key={`r2-2-${idx}`}
                className="w-[340px] sm:w-[420px] shrink-0 p-6 sm:p-8 rounded-[28px] sm:rounded-[32px] bg-[#121319] border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:-translate-y-1.5"
              >
                <div>
                  <span className="text-3xl sm:text-4xl font-serif text-[#B600A8] block mb-2 leading-none">
                    &ldquo;
                  </span>
                  <p className="text-xs sm:text-sm font-light leading-relaxed text-[#D7E2EA]/90 mb-6">
                    {item.quote}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#7621B0]/30 to-white/10 border border-white/15 flex items-center justify-center font-bold text-xs text-white">
                      {item.initials}
                    </div>
                    <div>
                      <h5 className="font-bold text-xs sm:text-sm text-white tracking-tight">
                        {item.author}
                      </h5>
                      <span className="text-[10px] sm:text-xs font-mono text-[#BBCCD7]/60 block mt-0.5">
                        {item.role}
                      </span>
                    </div>
                  </div>

                  <div className="text-amber-400 text-xs sm:text-sm tracking-wider">
                    ★★★★★
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
