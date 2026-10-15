import React from 'react';
import { FadeIn } from './FadeIn';

interface NavbarProps {
  onOpenPrice: () => void;
  onOpenContact?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPrice, onOpenContact }) => {
  const scrollTo = (id: string) => {
    const el =
      document.getElementById(id) ||
      (id === 'projects' ? document.getElementById('work') : null) ||
      (id === 'freelance' ? document.getElementById('freelance') : null);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <FadeIn delay={0} y={-20} className="w-full z-30">
      <nav className="w-full flex items-center justify-between px-6 sm:px-10 md:px-14 lg:px-16 pt-6 md:pt-8">
        {/* Left Navigation Links: About & Projects */}
        <div className="flex items-center gap-5 sm:gap-8 md:gap-12">
          <button
            onClick={() => scrollTo('about')}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.35rem] transition-all duration-200 hover:text-white hover:opacity-100 opacity-80 cursor-pointer"
          >
            About
          </button>

          <button
            onClick={() => scrollTo('projects')}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.35rem] transition-all duration-200 hover:text-white hover:opacity-100 opacity-80 cursor-pointer"
          >
            Projects
          </button>
        </div>

        {/* Center: Het Patel (HP) Monogram Luxury Logo */}
        <button
          onClick={scrollToTop}
          title="Het Patel - Back to top"
          className="group flex items-center justify-center p-1.5 transition-all duration-300 hover:scale-105 cursor-pointer focus:outline-none"
        >
          <div className="relative flex items-center justify-center">
            {/* Ambient subtle backlight glow on hover */}
            <div className="absolute inset-0 bg-[#B600A8]/0 group-hover:bg-[#B600A8]/30 rounded-full blur-md transition-all duration-300 scale-125 pointer-events-none" />
            <img
              src="/hp-logo.png"
              alt="HP - Het Patel"
              className="h-9 sm:h-11 md:h-12 w-auto object-contain filter drop-shadow-[0_2px_12px_rgba(255,255,255,0.25)] group-hover:drop-shadow-[0_0_18px_rgba(255,255,255,0.6)] transition-all duration-300"
            />
          </div>
        </button>

        {/* Right Navigation Links: Freelance & Price */}
        <div className="flex items-center gap-5 sm:gap-8 md:gap-12">
          <button
            onClick={() => scrollTo('freelance')}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.35rem] transition-all duration-200 hover:text-white hover:opacity-100 opacity-80 cursor-pointer"
          >
            Freelance
          </button>

          <button
            onClick={onOpenPrice}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.35rem] transition-all duration-200 hover:text-white hover:opacity-100 opacity-80 cursor-pointer"
          >
            Price
          </button>
        </div>
      </nav>
    </FadeIn>
  );
};

export default Navbar;
