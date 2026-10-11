import React from 'react';
import { reviewsRow1, reviewsRow2 } from '../data/reviewsData';

export const EditorialReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="relative w-full bg-[#ECEBE6] text-[#111111] py-24 sm:py-32 overflow-hidden select-none border-t border-black/10">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-28 mb-16 sm:mb-20">
        <div className="flex items-center justify-between text-xs font-mono text-black/50 mb-10">
          <span className="uppercase tracking-widest font-semibold">05 / REVIEWS</span>
          <div className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
          </div>
          <span className="uppercase tracking-widest">ENDORSEMENTS</span>
        </div>

        <div className="flex flex-col leading-[0.92] tracking-tight">
          <span className="font-sans font-black uppercase text-5xl sm:text-7xl md:text-8xl text-[#111111]">
            WHAT PEOPLE
          </span>
          <span className="font-sans font-black uppercase text-5xl sm:text-7xl md:text-8xl text-[#111111] mt-1 sm:mt-2">
            SAY ABOUT
          </span>
          <span className="font-serif italic font-normal text-5xl sm:text-7xl md:text-8xl text-[#111111] mt-1 sm:mt-2">
            MY WORK.
          </span>
        </div>
      </div>

      {/* Row 1: Marquee LTR */}
      <div className="w-full mb-6 overflow-hidden py-2 group">
        <div className="animate-marquee-ltr flex items-stretch gap-6 group-hover:[animation-play-state:paused]">
          {/* Loop Set 1 */}
          <div className="flex items-stretch gap-6">
            {reviewsRow1.map((item, idx) => (
              <article
                key={`rev-1-${idx}`}
                className="w-[360px] sm:w-[440px] shrink-0 p-8 sm:p-10 rounded-[28px] bg-white border border-black/10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-serif text-[#FF5500] font-black block mb-3 leading-none select-none">
                    &ldquo;&ldquo;
                  </span>
                  <p className="font-sans font-light text-sm sm:text-base leading-relaxed text-black/85 mb-8">
                    {item.quote}
                  </p>
                </div>

                <div className="pt-5 border-t border-black/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-black/5 border border-black/10 flex items-center justify-center font-mono font-bold text-xs text-black">
                      {item.initials}
                    </div>
                    <div>
                      <h5 className="font-bold text-xs sm:text-sm text-black tracking-tight">
                        {item.author}
                      </h5>
                      <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-black/50 block mt-0.5">
                        {item.role}
                      </span>
                    </div>
                  </div>

                  <div className="text-[#FF5500] text-sm tracking-wider">
                    ★★★★★
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Loop Set 2 for seamless ticker */}
          <div className="flex items-stretch gap-6" aria-hidden="true">
            {reviewsRow1.map((item, idx) => (
              <article
                key={`rev-1-dup-${idx}`}
                className="w-[360px] sm:w-[440px] shrink-0 p-8 sm:p-10 rounded-[28px] bg-white border border-black/10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-serif text-[#FF5500] font-black block mb-3 leading-none select-none">
                    &ldquo;&ldquo;
                  </span>
                  <p className="font-sans font-light text-sm sm:text-base leading-relaxed text-black/85 mb-8">
                    {item.quote}
                  </p>
                </div>

                <div className="pt-5 border-t border-black/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-black/5 border border-black/10 flex items-center justify-center font-mono font-bold text-xs text-black">
                      {item.initials}
                    </div>
                    <div>
                      <h5 className="font-bold text-xs sm:text-sm text-black tracking-tight">
                        {item.author}
                      </h5>
                      <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-black/50 block mt-0.5">
                        {item.role}
                      </span>
                    </div>
                  </div>

                  <div className="text-[#FF5500] text-sm tracking-wider">
                    ★★★★★
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Marquee RTL */}
      <div className="w-full overflow-hidden py-2 group">
        <div className="animate-marquee-rtl flex items-stretch gap-6 group-hover:[animation-play-state:paused]">
          {/* Loop Set 1 */}
          <div className="flex items-stretch gap-6">
            {reviewsRow2.map((item, idx) => (
              <article
                key={`rev-2-${idx}`}
                className="w-[360px] sm:w-[440px] shrink-0 p-8 sm:p-10 rounded-[28px] bg-white border border-black/10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-serif text-[#FF5500] font-black block mb-3 leading-none select-none">
                    &ldquo;&ldquo;
                  </span>
                  <p className="font-sans font-light text-sm sm:text-base leading-relaxed text-black/85 mb-8">
                    {item.quote}
                  </p>
                </div>

                <div className="pt-5 border-t border-black/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-black/5 border border-black/10 flex items-center justify-center font-mono font-bold text-xs text-black">
                      {item.initials}
                    </div>
                    <div>
                      <h5 className="font-bold text-xs sm:text-sm text-black tracking-tight">
                        {item.author}
                      </h5>
                      <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-black/50 block mt-0.5">
                        {item.role}
                      </span>
                    </div>
                  </div>

                  <div className="text-[#FF5500] text-sm tracking-wider">
                    ★★★★★
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Loop Set 2 */}
          <div className="flex items-stretch gap-6" aria-hidden="true">
            {reviewsRow2.map((item, idx) => (
              <article
                key={`rev-2-dup-${idx}`}
                className="w-[360px] sm:w-[440px] shrink-0 p-8 sm:p-10 rounded-[28px] bg-white border border-black/10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-serif text-[#FF5500] font-black block mb-3 leading-none select-none">
                    &ldquo;&ldquo;
                  </span>
                  <p className="font-sans font-light text-sm sm:text-base leading-relaxed text-black/85 mb-8">
                    {item.quote}
                  </p>
                </div>

                <div className="pt-5 border-t border-black/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-black/5 border border-black/10 flex items-center justify-center font-mono font-bold text-xs text-black">
                      {item.initials}
                    </div>
                    <div>
                      <h5 className="font-bold text-xs sm:text-sm text-black tracking-tight">
                        {item.author}
                      </h5>
                      <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-black/50 block mt-0.5">
                        {item.role}
                      </span>
                    </div>
                  </div>

                  <div className="text-[#FF5500] text-sm tracking-wider">
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

export default EditorialReviewsSection;
