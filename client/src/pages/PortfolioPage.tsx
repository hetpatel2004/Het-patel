import React, { useState } from 'react';
import { HeroSection } from '../components/HeroSection';
import { CraftingIntroSection } from '../components/CraftingIntroSection';
import { CurvedAboutSection } from '../components/CurvedAboutSection';
import { FeaturedWorkShowcase } from '../components/FeaturedWorkShowcase';
import { EditorialStackSection } from '../components/EditorialStackSection';
import { EditorialExperienceSection } from '../components/EditorialExperienceSection';
import { EditorialFreelanceSection } from '../components/EditorialFreelanceSection';
import { ContactMarqueeTicker } from '../components/ContactMarqueeTicker';
import { EditorialContactFooter } from '../components/EditorialContactFooter';
import { ContactModal } from '../components/ContactModal';
import { PricingModal } from '../components/PricingModal';
import { SmoothScroll } from '../components/SmoothScroll';

export const PortfolioPage: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [initialServiceForContact, setInitialServiceForContact] = useState('MERN Stack Web Application');

  const handleOpenContact = (service = 'MERN Stack Web Application') => {
    setInitialServiceForContact(service);
    setIsContactOpen(true);
  };

  const handleSelectPricingTier = (tierName: string) => {
    setIsPricingOpen(false);
    handleOpenContact(tierName);
  };

  return (
    <SmoothScroll>
      <div
        className="bg-[#0C0C0C] min-h-screen text-[#111111] font-sans relative selection:bg-[#B600A8]/30 selection:text-white"
      >
        {/* 1. HERO SECTION (100% UNTOUCHED WITH ORIGINAL PROPS) */}
        <HeroSection
          onOpenPrice={() => setIsPricingOpen(true)}
          onOpenContact={() => handleOpenContact('General Project Inquiry')}
        />

        {/* 2 & 3: SECTION 2 STAYS STATIC STICKY UNTIL SECTION 3 ENDS */}
        <div className="relative w-full">
          {/* 2. "CRAFTING DIGITAL EXPERIENCES" (FRAME 001 - 030 CODED IN REACT) */}
          <CraftingIntroSection />

          {/* Scroll runway so Section 2 stays full screen and sticky before Section 3 rises */}
          <div className="h-[75vh] pointer-events-none" />

          {/* 3. CURVED CONVEX ARCH REVEAL: "I BUILD THINGS THAT LIVE ON THE WEB *" (FRAME 030 - 110) */}
          <CurvedAboutSection />
        </div>

        {/* 4. "FEATURED WORK" SHOWCASE: 5 PROJECTS (FRAME 110 - 180) */}
        <FeaturedWorkShowcase />

        {/* 5. "THE TOOLS I THINK IN." STACK SECTION (FRAME 180 - 200) */}
        <EditorialStackSection />

        {/* 6. VERIFIED CLIENT REVIEWS & DELIVERIES (MADE IN LAST 6 MONTHS • AHMEDABAD, GUJARAT) */}
        <EditorialExperienceSection />

        {/* 7. OPEN FOR FREELANCE & CONTRACT ENGINEERING (EDITORIAL DARK LUXURY) */}
        <EditorialFreelanceSection
          onOpenContact={handleOpenContact}
          onOpenPrice={() => setIsPricingOpen(true)}
        />

        {/* CONTACT TEXT SCROLLING MARQUEE TICKER (BETWEEN LAST SECTION AND FOOTER) */}
        <ContactMarqueeTicker
          onOpenContact={() => handleOpenContact('General Project Inquiry')}
        />

        {/* 8. CONTACT TICKER & "GET IN TOUCH" FOOTER WITH LIVE IST CLOCK (FRAME 260 - 300) */}
        <EditorialContactFooter
          onOpenContact={handleOpenContact}
        />

        {/* Interactive Modals */}
        <ContactModal
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
          initialService={initialServiceForContact}
        />

        <PricingModal
          isOpen={isPricingOpen}
          onClose={() => setIsPricingOpen(false)}
          onSelectTier={handleSelectPricingTier}
        />
      </div>
    </SmoothScroll>
  );
};

export default PortfolioPage;
