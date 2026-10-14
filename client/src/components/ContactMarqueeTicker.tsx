import React from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';

interface ContactMarqueeTickerProps {
  onOpenContact?: () => void;
}

export const ContactMarqueeTicker: React.FC<ContactMarqueeTickerProps> = ({ onOpenContact }) => {
  // Row 1 items in bold avant-garde Syne font (alternating filled and outline stroke)
  const row1Items = [
    { text: 'CONTACT', isStroke: false },
    { text: "LET'S TALK", isStroke: true },
    { text: 'CONTACT', isStroke: false },
    { text: 'START A PROJECT', isStroke: true },
    { text: 'GET IN TOUCH', isStroke: false },
    { text: 'SAY HELLO', isStroke: true },
    { text: 'CONTACT', isStroke: false },
    { text: 'WORK TOGETHER', isStroke: true },
  ];

  // Row 2 items in flowing cursive script font
  const row2Items = [
    'Contact',
    'Available for Hire',
    'Contact',
    'Full Stack MERN',
    'Contact',
    'Ahmedabad to Global',
    'Contact',
    'High Impact Roles',
  ];

  return (
    <section
      id="contact-marquee"
      onClick={onOpenContact}
      title="Click to open contact form"
      className="relative z-20 w-full bg-[#08080C] text-white pt-12 sm:pt-16 pb-12 sm:pb-16 overflow-hidden select-none border-t border-white/10 group cursor-pointer"
    >
      {/* Background Ambient Radial Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[85vw] h-[350px] pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, #B600A8 0%, rgba(99, 102, 241, 0.25) 45%, transparent 70%)',
        }}
      />

      {/* Top Floating Badge Row */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-24 mb-6 sm:mb-8 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono uppercase tracking-wider text-white/70">
          <span className="w-2 h-2 rounded-full bg-[#B600A8] animate-ping" />
          <span>START A CONVERSATION</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-white/50 group-hover:text-white transition-colors">
          <Sparkles className="w-3.5 h-3.5 text-[#B600A8]" />
          <span>CLICK ANYWHERE TO REACH OUT</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#B600A8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>

      {/* =========================================================================
          ROW 1: AVANT-GARDE DISPLAY FONT (SYNE 800) - MOVING LTR
          Features alternating filled & hollow outline stroke typography
         ========================================================================= */}
      <div className="w-full overflow-hidden mb-3 sm:mb-5">
        <div className="animate-marquee-ltr flex items-center whitespace-nowrap group-hover:[animation-play-state:paused]">
          {/* Loop Set 1 */}
          <div className="flex items-center gap-6 sm:gap-10">
            {row1Items.map((item, idx) => (
              <span key={`row1-set1-${idx}`} className="flex items-center gap-6 sm:gap-10">
                <span
                  className={`font-syne font-extrabold uppercase text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] tracking-tight transition-all duration-300 ${
                    item.isStroke
                      ? 'text-stroke-white group-hover:text-stroke-accent'
                      : 'text-white/85 hover:text-white drop-shadow-lg'
                  }`}
                >
                  {item.text}
                </span>
                <span className="text-[#B600A8] text-3xl sm:text-5xl md:text-6xl font-sans select-none opacity-80">
                  ✦
                </span>
              </span>
            ))}
          </div>

          {/* Loop Set 2 (Duplicate for Seamless Infinite Marquee) */}
          <div className="flex items-center gap-6 sm:gap-10 ml-6 sm:ml-10" aria-hidden="true">
            {row1Items.map((item, idx) => (
              <span key={`row1-set2-${idx}`} className="flex items-center gap-6 sm:gap-10">
                <span
                  className={`font-syne font-extrabold uppercase text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] tracking-tight transition-all duration-300 ${
                    item.isStroke
                      ? 'text-stroke-white group-hover:text-stroke-accent'
                      : 'text-white/85 hover:text-white drop-shadow-lg'
                  }`}
                >
                  {item.text}
                </span>
                <span className="text-[#B600A8] text-3xl sm:text-5xl md:text-6xl font-sans select-none opacity-80">
                  ✦
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================================
          ROW 2: FLOWING CURSIVE SCRIPT DISPLAY FONT (ALEX BRUSH / PINYON) - MOVING RTL
          Contrasting editorial aesthetic with natural flowing loops & curves
         ========================================================================= */}
      <div className="w-full overflow-hidden">
        <div className="animate-marquee-rtl flex items-center whitespace-nowrap group-hover:[animation-play-state:paused]">
          {/* Loop Set 1 */}
          <div className="flex items-center gap-6 sm:gap-10">
            {row2Items.map((text, idx) => (
              <span key={`row2-set1-${idx}`} className="flex items-center gap-6 sm:gap-10">
                <span className="font-serif italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[9rem] tracking-wide text-white/55 group-hover:text-white transition-colors duration-300">
                  {text}
                </span>
                <span className="text-white/30 text-2xl sm:text-4xl md:text-5xl font-serif select-none">
                  —
                </span>
              </span>
            ))}
          </div>

          {/* Loop Set 2 (Duplicate for Seamless Infinite Marquee) */}
          <div className="flex items-center gap-6 sm:gap-10 ml-6 sm:ml-10" aria-hidden="true">
            {row2Items.map((text, idx) => (
              <span key={`row2-set2-${idx}`} className="flex items-center gap-6 sm:gap-10">
                <span className="font-serif italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[9rem] tracking-wide text-white/55 group-hover:text-white transition-colors duration-300">
                  {text}
                </span>
                <span className="text-white/30 text-2xl sm:text-4xl md:text-5xl font-serif select-none">
                  —
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMarqueeTicker;
