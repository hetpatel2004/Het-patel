import React from 'react';
import { FadeIn } from './FadeIn';

interface NavbarProps {
  onOpenPrice: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPrice, onOpenContact }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <FadeIn delay={0} y={-20} className="w-full z-30">
      <nav className="w-full flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8">
        <button
          onClick={() => scrollTo('about')}
          className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70 cursor-pointer"
        >
          About
        </button>

        <button
          onClick={onOpenPrice}
          className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70 cursor-pointer"
        >
          Price
        </button>

        <button
          onClick={() => scrollTo('projects')}
          className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70 cursor-pointer"
        >
          Projects
        </button>

        <button
          onClick={onOpenContact}
          className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70 cursor-pointer"
        >
          Contact
        </button>
      </nav>
    </FadeIn>
  );
};
