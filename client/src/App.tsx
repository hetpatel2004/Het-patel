import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { CraftingIntroSection } from './components/CraftingIntroSection';
import { CurvedAboutSection } from './components/CurvedAboutSection';
import { FeaturedWorkShowcase } from './components/FeaturedWorkShowcase';
import { EditorialStackSection } from './components/EditorialStackSection';
import { EditorialReviewsSection } from './components/EditorialReviewsSection';
import { EditorialContactFooter } from './components/EditorialContactFooter';
import { ContactModal } from './components/ContactModal';
import { PricingModal } from './components/PricingModal';

export const App: React.FC = () => {
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
    <div
      style={{ overflowX: 'clip' }}
      className="bg-[#0C0C0C] min-h-screen text-[#111111] font-sans relative selection:bg-[#B600A8]/30 selection:text-white"
    >
      {/* 1. HERO SECTION (100% UNTOUCHED WITH ORIGINAL PROPS) */}
      <HeroSection
        onOpenPrice={() => setIsPricingOpen(true)}
        onOpenContact={() => handleOpenContact('General Project Inquiry')}
      />

      {/* 2. "CRAFTING DIGITAL EXPERIENCES" (FRAME 001 - 030 CODED IN REACT) */}
      <CraftingIntroSection
        onOpenContact={() => handleOpenContact('Design & Development Inquiry')}
      />

      {/* 3. CURVED CONVEX ARCH REVEAL: "I BUILD THINGS THAT LIVE ON THE WEB *" (FRAME 030 - 110) */}
      <CurvedAboutSection />

      {/* 4. "FEATURED WORK" SHOWCASE: 5 PROJECTS (FRAME 110 - 180) */}
      <FeaturedWorkShowcase />

      {/* 5. "THE TOOLS I THINK IN." STACK SECTION (FRAME 180 - 200) */}
      <EditorialStackSection />

      {/* 6. "WHAT PEOPLE SAY ABOUT MY WORK." TESTIMONIALS (FRAME 200 - 260) */}
      <EditorialReviewsSection />

      {/* 7. CONTACT TICKER & "GET IN TOUCH" FOOTER WITH LIVE IST CLOCK (FRAME 260 - 300) */}
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
  );
};

export default App;
