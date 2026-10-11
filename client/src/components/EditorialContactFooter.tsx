import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface EditorialContactFooterProps {
  onOpenContact: (service?: string) => void;
}

export const EditorialContactFooter: React.FC<EditorialContactFooterProps> = ({ onOpenContact }) => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now);
      setCurrentTime(formatted);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const marqueeWords = Array(10).fill('CONTACT –');

  return (
    <footer id="contact" className="relative w-full bg-[#ECEBE6] text-[#111111] pt-16 pb-14 overflow-hidden select-none border-t border-black/10">
      {/* Top Header Watermark & Navigation */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-28 mb-12 flex items-center justify-between text-xs font-mono text-black/50">
        <div className="flex flex-col leading-none font-sans font-bold text-lg text-black">
          <span>D</span>
          <span>V</span>
        </div>

        <div className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
        </div>

        <button
          onClick={() => onOpenContact('Direct Consultation')}
          className="uppercase tracking-widest hover:text-black transition-colors cursor-pointer"
        >
          MENU
        </button>
      </div>

      {/* Dual Big Animated Marquee Banners */}
      <div className="w-full overflow-hidden mb-16 sm:mb-24 opacity-90 group">
        {/* Row 1: Bold Sans LTR */}
        <div className="animate-marquee-ltr flex items-center whitespace-nowrap mb-2 group-hover:[animation-play-state:paused]">
          <div className="flex items-center">
            {marqueeWords.map((word, idx) => (
              <span
                key={`footer-sans-1-${idx}`}
                className="font-sans font-black uppercase text-6xl sm:text-8xl md:text-9xl tracking-tight text-black/15 hover:text-black/35 transition-colors mr-8 cursor-default"
              >
                {word}
              </span>
            ))}
          </div>
          <div className="flex items-center" aria-hidden="true">
            {marqueeWords.map((word, idx) => (
              <span
                key={`footer-sans-2-${idx}`}
                className="font-sans font-black uppercase text-6xl sm:text-8xl md:text-9xl tracking-tight text-black/15 hover:text-black/35 transition-colors mr-8 cursor-default"
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Row 2: Italic Serif RTL */}
        <div className="animate-marquee-rtl flex items-center whitespace-nowrap group-hover:[animation-play-state:paused]">
          <div className="flex items-center">
            {marqueeWords.map((word, idx) => (
              <span
                key={`footer-serif-1-${idx}`}
                className="font-serif italic font-normal text-6xl sm:text-8xl md:text-9xl tracking-tight text-black/15 hover:text-black/35 transition-colors mr-8 cursor-default"
              >
                {word}
              </span>
            ))}
          </div>
          <div className="flex items-center" aria-hidden="true">
            {marqueeWords.map((word, idx) => (
              <span
                key={`footer-serif-2-${idx}`}
                className="font-serif italic font-normal text-6xl sm:text-8xl md:text-9xl tracking-tight text-black/15 hover:text-black/35 transition-colors mr-8 cursor-default"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Interactive Contact Strip */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-28">
        {/* Category & Ampersand */}
        <div className="flex items-center gap-6 mb-4">
          <span className="font-sans font-bold text-lg sm:text-2xl md:text-3xl uppercase tracking-wider text-black">
            FULL STACK
          </span>
          <span className="font-serif italic font-normal text-5xl sm:text-7xl md:text-8xl text-black leading-none">
            &amp;
          </span>
          <span className="font-sans font-bold text-lg sm:text-2xl md:text-3xl uppercase tracking-wider text-black">
            AGENTIC SOLUTIONS
          </span>
        </div>

        {/* Giant Clickable Callout: GET IN TOUCH ↗ */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-4 pb-16 border-b border-black/15">
          <button
            onClick={() => onOpenContact('General Project Inquiry')}
            className="group flex items-baseline gap-4 sm:gap-6 font-sans font-black uppercase text-5xl sm:text-7xl md:text-8xl lg:text-[10vw] tracking-tight text-black hover:text-[#B600A8] transition-colors leading-none text-left cursor-pointer"
          >
            <span>GET IN TOUCH</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-3 group-hover:-translate-y-3 font-light">
              &#8599;
            </span>
          </button>

          {/* Right Status & Live Time */}
          <div className="flex flex-col items-start md:items-end gap-2 font-mono text-xs sm:text-sm text-black/70">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="uppercase tracking-wider">AVAILABLE FOR NEW WORK</span>
            </div>

            <div className="text-black font-semibold tracking-wider">
              <span>{currentTime || '01:29:52'}</span>
              <span className="text-black/50 ml-2">AHMEDABAD, IST</span>
            </div>
          </div>
        </div>

        {/* Bottom Social & Action Pills */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="mailto:het.patel.imscit21@gmail.com"
              className="px-5 py-2.5 rounded-full bg-white hover:bg-black hover:text-white border border-black/15 text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>EMAIL</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://linkedin.com/in/het-patel"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-full bg-white hover:bg-black hover:text-white border border-black/15 text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>LINKEDIN</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://github.com/hetpatel2004"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-full bg-white hover:bg-black hover:text-white border border-black/15 text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>GITHUB</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="text-xs font-mono text-black/50 uppercase tracking-widest">
            &copy; 2025 HET PATEL &bull; ALL RIGHTS RESERVED
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EditorialContactFooter;
