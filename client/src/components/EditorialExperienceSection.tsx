import React from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Calendar,
  ArrowUpRight,
  Star,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Quote,
} from 'lucide-react';

interface VerifiedReviewItem {
  id: string;
  num: string;
  projectTitle: string;
  projectSubtitle: string;
  projectType: string;
  clientName: string;
  clientRole: string;
  clientAffiliation: string;
  clientInitials: string;
  clientAvatarBg: string;
  location: string;
  timeline: string;
  liveUrl: string;
  rating: number;
  reviewQuote: string;
  deliverables: string[];
  techStack: string[];
}

const verifiedDeliveries: VerifiedReviewItem[] = [
  {
    id: 'ambika',
    num: '01',
    projectTitle: 'AMBIKA ELECTRIC',
    projectSubtitle: 'Industrial Electrical Engineering & Motor Diagnostic Platform',
    projectType: 'Client Production Platform',
    clientName: 'Visat Patel',
    clientRole: 'Business Owner',
    clientAffiliation: 'Ambika Electric',
    clientInitials: 'VP',
    clientAvatarBg: 'from-amber-500 to-orange-600',
    location: 'Ahmedabad, Gujarat',
    timeline: 'Made in Last 6 Months',
    liveUrl: 'https://ambikaelectric.vercel.app/',
    rating: 5,
    reviewQuote:
      'Het built our complete industrial platform from scratch with incredible precision. The motor rewinding diagnostic UI and custom control panel estimator made it easy for our clients across Ahmedabad and Gujarat to specify heavy electrical machinery needs and reach us directly. Fast, responsive, and delivered with zero downtime.',
    deliverables: [
      'Engineered specialized heavy motor rewinding diagnostic UI supporting up to 500+ HP industrial machinery.',
      'Developed custom electrical control panel estimator (MCC, PCC, APFC) and automated client inquiry funnel.',
      'Delivered 100% mobile-responsive layout and sub-second load times deployed on Vercel.',
    ],
    techStack: ['React.js', 'Tailwind CSS', 'Vercel Deployed', 'REST APIs', 'Lucide Icons', 'SEO Engine'],
  },
  {
    id: 'online-exam',
    num: '02',
    projectTitle: 'ONLINE EXAMINATION SYSTEM',
    projectSubtitle: 'Enterprise Academic Assessment Engine with Live Code Editor',
    projectType: 'Academic University Portal',
    clientName: 'Prof. Risha Tiwari',
    clientRole: 'Professor & Department Faculty',
    clientAffiliation: 'Silver Oak University (SOU)',
    clientInitials: 'RT',
    clientAvatarBg: 'from-indigo-600 to-purple-600',
    location: 'Ahmedabad, Gujarat',
    timeline: 'Made in Last 6 Months',
    liveUrl: 'https://online-examination-sou.pages.dev/',
    rating: 5,
    reviewQuote:
      'Het engineered this comprehensive examination platform for our departmental assessments at Silver Oak University. His implementation of the live multi-language code editor, anti-cheat timed exam sessions, and 3-tier role security handled our student evaluations smoothly and reliably. A standout engineering accomplishment.',
    deliverables: [
      'Implemented robust 3-tier JWT authentication hierarchy (Super Admin, Faculty/Admin, and Student exam rooms).',
      'Engineered real-time online multi-language code editor with automated compilation, test execution, and instant grading.',
      'Constructed anti-cheat exam safeguards, timed sessions, and bulk student CSV enrollment pipelines.',
    ],
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT Auth', 'Cloudflare Pages', 'Code Sandbox'],
  },
  {
    id: 'store-harvest',
    num: '03',
    projectTitle: 'AGRICOLD CONNECT (STORE YOUR HARVEST)',
    projectSubtitle: 'Smart Cold Storage Marketplace & Harvest Preservation Platform',
    projectType: 'SOU Hackathon Platform',
    clientName: 'SOU Hackathon',
    clientRole: 'Hackathon Project & Evaluation Showcase',
    clientAffiliation: 'Silver Oak University Hackathon',
    clientInitials: 'SOU',
    clientAvatarBg: 'from-emerald-600 to-teal-700',
    location: 'Ahmedabad, Gujarat',
    timeline: 'Made in Last 6 Months',
    liveUrl: 'https://store-your-harvest-tq1j.vercel.app/',
    rating: 5,
    reviewQuote:
      'Built and demonstrated during the Silver Oak University Hackathon in Ahmedabad, Het\'s agricultural cold-chain platform tackled post-harvest crop loss with an intuitive marketplace solution. The multi-commodity shelf-life algorithm and interactive storage discovery showed remarkable product thinking under competitive hackathon pressure.',
    deliverables: [
      'Created agricultural cold storage warehouse discovery and temperature-grade filtering across Gujarat.',
      'Built multi-commodity shelf-life calculation tools to prevent harvest spoilage and distress selling.',
      'Designed direct cold storage operator booking requests with instant contact routing.',
    ],
    techStack: ['React.js', 'Tailwind CSS', 'Framer Motion', 'REST APIs', 'Vercel Deployed'],
  },
];

export const EditorialExperienceSection: React.FC = () => {
  return (
    <section
      id="reviews"
      className="relative z-20 w-full bg-[#ECEBE6] text-[#111111] py-20 sm:py-28 md:py-32 px-6 sm:px-12 md:px-16 lg:px-24 select-none border-t border-black/10"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col mb-12 sm:mb-16">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3 py-1 rounded-full bg-black/5 border border-black/15 text-[11px] font-mono uppercase tracking-wider font-bold text-black/75 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#B600A8]" />
              <span>CLIENT REVIEWS &amp; VERIFIED DELIVERIES</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono uppercase tracking-wider font-semibold text-emerald-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>ALL FROM AHMEDABAD, GUJARAT</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-[#B600A8]/10 border border-[#B600A8]/20 text-[11px] font-mono uppercase tracking-wider font-semibold text-[#B600A8] flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-[#B600A8]" />
              <span>MADE IN LAST 6 MONTHS</span>
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-baseline gap-3 sm:gap-5 leading-none">
            <span className="font-sans font-black uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#111111]">
              WHAT PEOPLE
            </span>
            <span className="font-serif italic font-normal text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#111111] capitalize">
              Say about my work.
            </span>
          </div>

          <p className="font-sans font-light text-sm sm:text-base md:text-lg text-black/70 max-w-3xl mt-4 leading-relaxed">
            3 real-world production platforms engineered and shipped in the last 6 months across Ahmedabad, Gujarat — backed by direct client, faculty, and hackathon endorsements.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-black/10">
            <div className="p-4 rounded-2xl bg-white/70 border border-black/8">
              <div className="text-2xl sm:text-3xl font-black font-sans text-black">3 / 3</div>
              <div className="text-xs font-mono uppercase tracking-wider text-black/60 mt-1">Live Platforms Shipped</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/70 border border-black/8">
              <div className="text-2xl sm:text-3xl font-black font-sans text-black">Ahmedabad</div>
              <div className="text-xs font-mono uppercase tracking-wider text-black/60 mt-1">Gujarat, India Base</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/70 border border-black/8">
              <div className="text-2xl sm:text-3xl font-black font-sans text-emerald-700">&lt; 6 Mos</div>
              <div className="text-xs font-mono uppercase tracking-wider text-black/60 mt-1">Recent Production Delivery</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/70 border border-black/8">
              <div className="text-2xl sm:text-3xl font-black font-sans text-[#B600A8]">5.0 ★</div>
              <div className="text-xs font-mono uppercase tracking-wider text-black/60 mt-1">Client &amp; Mentor Rating</div>
            </div>
          </div>
        </div>

        {/* The 3 Verified Deliveries & Reviews Cards */}
        <div className="space-y-8 sm:space-y-10">
          {verifiedDeliveries.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="p-6 sm:p-10 md:p-12 rounded-[28px] sm:rounded-[36px] bg-white border border-black/10 hover:border-black/30 shadow-[0_6px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-300 group"
            >
              {/* Card Header: Number, Title, Type, Location, Timeline */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-black/8 mb-8">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-mono text-xs font-bold text-black/40">
                      #{item.num}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-black/5 text-[10px] font-mono uppercase tracking-wider font-semibold text-black/70">
                      {item.projectType}
                    </span>
                  </div>

                  <h3 className="font-sans font-black uppercase text-2xl sm:text-3xl md:text-4xl text-[#111111] tracking-tight group-hover:text-[#B600A8] transition-colors">
                    {item.projectTitle}
                  </h3>
                  <p className="font-caveat font-semibold text-base sm:text-lg text-black/80 mt-0.5 tracking-wide">
                    {item.projectSubtitle}
                  </p>
                </div>

                <div className="flex flex-wrap lg:flex-col lg:items-end gap-2 shrink-0">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono font-bold text-emerald-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{item.timeline}</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-xs font-mono font-semibold text-black/75">
                    <MapPin className="w-3.5 h-3.5 text-[#B600A8]" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>

              {/* Card Body: 2 Columns on Desktop */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                {/* Left Column: Direct Customer / Mentor Review & Quote (6 cols) */}
                <div className="lg:col-span-6 flex flex-col justify-between bg-[#FBFBFA] p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-black/6">
                  <div>
                    {/* Stars and Verified Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(item.rating)].map((_, sIdx) => (
                          <Star key={sIdx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                        <span className="text-xs font-mono font-bold text-black/70 ml-1.5">
                          5.0 / 5.0
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified Review</span>
                      </span>
                    </div>

                    {/* Quotation Icon and Quote Text */}
                    <Quote className="w-7 h-7 text-[#B600A8]/40 mb-2 rotate-180" />
                    <blockquote className="font-sans font-light text-sm sm:text-base text-black/85 leading-relaxed mb-6 italic">
                      &ldquo;{item.reviewQuote}&rdquo;
                    </blockquote>
                  </div>

                  {/* Reviewer Profile */}
                  <div className="pt-4 border-t border-black/8 flex items-center gap-3.5">
                    <div
                      className={`w-11 h-11 rounded-full bg-gradient-to-br ${item.clientAvatarBg} flex items-center justify-center font-mono font-bold text-xs text-white shadow-sm shrink-0`}
                    >
                      {item.clientInitials}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-black tracking-tight leading-snug">
                        {item.clientName}
                      </h4>
                      <p className="text-xs font-mono text-black/60">
                        {item.clientRole} • <span className="font-semibold text-black/80">{item.clientAffiliation}</span>
                      </p>
                      <p className="text-[11px] font-mono text-black/45 mt-0.5">
                        {item.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Engineering Deliverables & Tech Stack (6 cols) */}
                <div className="lg:col-span-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <ShieldCheck className="w-4 h-4 text-[#B600A8]" />
                      <h4 className="font-sans font-black text-xs uppercase tracking-wider text-black/80">
                        ENGINEERING DELIVERABLES &amp; IMPACT
                      </h4>
                    </div>

                    <div className="space-y-3 mb-6">
                      {item.deliverables.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-black/75">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#B600A8] mt-2 shrink-0" />
                          <span className="leading-relaxed">{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack Chips & Live Action Link */}
                  <div className="pt-5 border-t border-black/8">
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5">
                      {item.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg bg-[#F6F5F0] hover:bg-black hover:text-white border border-black/8 font-mono text-[11px] sm:text-xs text-black/80 transition-colors cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="text-[11px] font-mono text-black/50">
                        Live Deployed &amp; Fully Verified
                      </span>

                      <a
                        href={item.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white hover:bg-[#B600A8] transition-colors font-mono text-xs uppercase tracking-wider font-bold shadow-sm group/btn"
                      >
                        <span>VISIT LIVE DEPLOYMENT</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-btn-hover:translate-x-0.5 group-btn-hover:-translate-y-0.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EditorialExperienceSection;
