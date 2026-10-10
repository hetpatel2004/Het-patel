import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { StackSection } from './components/StackSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FooterSection } from './components/FooterSection';
import { ContactModal } from './components/ContactModal';
import { PricingModal } from './components/PricingModal';
import { LiveProjectModal } from './components/LiveProjectModal';
import type { ProjectItem } from './data/projects';

export const App: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [selectedLiveProject, setSelectedLiveProject] = useState<ProjectItem | null>(null);
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
      className="bg-[#0C0C0C] min-h-screen text-[#D7E2EA] font-sans relative selection:bg-[#B600A8]/30 selection:text-white"
    >
      {/* 1. HERO SECTION (100% UNTOUCHED WITH ORIGINAL PROPS) */}
      <HeroSection
        onOpenPrice={() => setIsPricingOpen(true)}
        onOpenContact={() => handleOpenContact('General Project Inquiry')}
      />

      {/* 2. FEATURED WORK SECTION (FULL-WIDTH CINEMATIC CARDS) */}
      <ProjectsSection
        onOpenLiveProject={(proj) => setSelectedLiveProject(proj)}
      />

      {/* 4. STACK MATRIX & MARQUEE SECTION */}
      <StackSection />

      {/* 5. TESTIMONIALS DUAL AUTO-SCROLLING MARQUEE SECTION */}
      <ReviewsSection />

      {/* 6. CONTACT FOOTER WITH DUAL MARQUEE & LIVE CLOCK */}
      <FooterSection onOpenContact={handleOpenContact} />

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

      <LiveProjectModal
        isOpen={selectedLiveProject !== null}
        project={selectedLiveProject}
        onClose={() => setSelectedLiveProject(null)}
      />
    </div>
  );
};

export default App;
