import React from 'react';
import { Navbar } from './Navbar';
import { ContactButton } from './ContactButton';
import { Magnet } from './Magnet';
import { FadeIn } from './FadeIn';

interface HeroSectionProps {
  onOpenPrice: () => void;
  onOpenContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenPrice,
  onOpenContact,
}) => {
  return (
    <section className="relative h-screen w-full flex flex-col justify-between overflow-x-clip bg-[#0C0C0C] select-none">
      {/* 1. Navbar */}
      <Navbar onOpenPrice={onOpenPrice} onOpenContact={onOpenContact} />

      {/* 2. Massive Hero Heading: "Hi, i'm het" */}
      <div className="w-full overflow-hidden text-center z-0">
        <FadeIn delay={0.15} y={40} className="w-full">
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-6 sm:mt-4 md:-mt-5 select-none pointer-events-none">
            Hi, i&apos;m het
          </h1>
        </FadeIn>
      </div>

      {/* 3. Hero Portrait (Centered Absolutely with Magnet Effect & Het Patel's Transparent 3D Face Cutout) */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[240px] sm:w-[320px] md:w-[400px] lg:w-[460px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 flex justify-center pointer-events-none sm:pointer-events-auto">
        <FadeIn delay={0.6} y={30} className="w-full flex justify-center">
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="w-full flex justify-center"
          >
            <div className="relative group w-full flex justify-center">
              {/* Soft purple/cyan ambient lighting glow behind the head */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gradient-to-tr from-[#B600A8]/25 to-[#4299E1]/20 rounded-full blur-3xl opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Pure Transparent 3D Face Cutout with 55% max-width */}
              <img
                src="/het-3d-face.png"
                alt="Het Patel - 3D Face"
                style={{ maxWidth: '55%', height: 'auto' }}
                className="max-w-[55%] w-auto h-auto object-contain filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.9)] drop-shadow-[0_0_30px_rgba(182,0,168,0.3)] transition-transform duration-500 group-hover:scale-105 pointer-events-auto select-none mx-auto"
                draggable={false}
              />
            </div>
          </Magnet>
        </FadeIn>
      </div>

      {/* 4. Bottom bar */}
      <div className="w-full flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 z-20">
        <FadeIn delay={0.35} y={20}>
          <p
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[280px]"
          >
            a full stack mern developer driven by crafting striking, scalable and unforgettable digital experiences
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton onClick={onOpenContact} />
        </FadeIn>
      </div>
    </section>
  );
};
