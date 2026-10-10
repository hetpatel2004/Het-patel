import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, Zap, ShieldCheck } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTier: (tierName: string) => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  onSelectTier,
}) => {
  const tiers = [
    {
      name: 'Frontend Web App',
      price: 'Custom / Project',
      period: 'or Hourly / Milestone',
      description: 'Modern, high-performance responsive web user interfaces built with React.',
      features: [
        'React.js & TypeScript architecture',
        'Tailwind CSS & fluid responsive layouts',
        'Framer Motion smooth micro-animations',
        'State management & clean reusable components',
        'Mobile-first cross-browser testing',
      ],
      highlight: false,
    },
    {
      name: 'Full MERN Stack Application',
      price: 'End-to-End',
      period: 'Custom Scope / Deliverable',
      description: 'Complete web application from database to dynamic interactive frontend.',
      features: [
        'MongoDB schema design & Mongoose models',
        'Node.js & Express.js RESTful APIs',
        'Secure JWT authentication & bcrypt hashing',
        'Role-based access control (Admin, User, etc.)',
        'Interactive dashboards & data management',
        'API testing with Postman & deployment',
      ],
      highlight: true,
    },
    {
      name: 'Full-Time / Contract Dev',
      price: 'Open for Roles',
      period: 'Internship / Junior Developer',
      description: 'Dedicated developer ready to contribute to engineering teams and products.',
      features: [
        'M.Sc. IT candidate with solid foundational CS',
        'Frameboxx Full Stack training certified',
        'Agile team collaboration & Git workflows',
        'Rapid learning & adaptability to new tech',
        'Immediate availability for high-impact teams',
      ],
      highlight: false,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-[#111113] border border-[#2A2E39] rounded-[32px] sm:rounded-[48px] p-6 sm:p-10 text-[#D7E2EA] shadow-[0_20px_60px_rgba(0,0,0,0.85)] z-10 my-8 overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full text-[#D7E2EA]/60 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close pricing"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium uppercase tracking-wider text-[#BBCCD7] mb-3">
                <Zap className="w-3.5 h-3.5 text-[#B600A8]" />
                Services & Engagement
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
                Work With Het Patel
              </h2>
              <p className="text-sm font-light text-[#D7E2EA]/70 mt-2">
                Flexible engagement models for freelance projects, startup web apps, and full-time software engineering roles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`rounded-[28px] p-6 flex flex-col justify-between transition-all duration-300 relative ${
                    tier.highlight
                      ? 'bg-gradient-to-b from-[#1C1726] to-[#121118] border-2 border-[#B600A8] shadow-[0_0_30px_rgba(182,0,168,0.2)]'
                      : 'bg-[#16171D] border border-[#272B36]'
                  }`}
                >
                  {tier.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#B600A8] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                      Specialization
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-bold uppercase tracking-wider text-white mb-1">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-[#D7E2EA]/60 font-light mb-4 min-h-[32px]">
                      {tier.description}
                    </p>
                    <div className="mb-6">
                      <span className="text-2xl font-black text-white">{tier.price}</span>
                      <span className="text-xs text-[#D7E2EA]/50 block mt-0.5">{tier.period}</span>
                    </div>

                    <ul className="space-y-2.5 mb-8 text-xs font-light text-[#D7E2EA]/80">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#BBCCD7] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => onSelectTier(tier.name)}
                    className={`w-full py-3 rounded-full text-xs font-medium uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      tier.highlight
                        ? 'bg-white text-[#0C0C0C] hover:bg-[#D7E2EA] font-semibold'
                        : 'border border-[#D7E2EA]/40 text-[#D7E2EA] hover:bg-white/10'
                    }`}
                  >
                    <span>Inquire Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#252834] flex flex-col sm:flex-row items-center justify-between text-xs text-[#D7E2EA]/60 gap-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#BBCCD7]" />
                <span>Clean, well-documented source code & Git repository transfer included</span>
              </div>
              <div>Available for on-site (Ahmedabad) or remote opportunities worldwide</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
