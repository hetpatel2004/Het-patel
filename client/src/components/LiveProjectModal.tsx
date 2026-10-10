import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Globe, Layers, Award, CheckCircle } from 'lucide-react';
import type { ProjectItem } from '../data/projects';

interface LiveProjectModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const LiveProjectModal: React.FC<LiveProjectModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  if (!project) return null;

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

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-[#111113] border border-[#2A2E39] rounded-[32px] sm:rounded-[48px] p-6 sm:p-10 text-[#D7E2EA] shadow-[0_20px_60px_rgba(0,0,0,0.85)] z-10 my-8 overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full text-[#D7E2EA]/60 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="text-4xl sm:text-5xl font-black text-white">
                {project.number}
              </span>
              <div>
                <span className="text-xs uppercase tracking-widest text-[#BBCCD7] block font-medium">
                  {project.category} &bull; {project.year}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                  {project.title}
                </h2>
              </div>
            </div>

            {/* Tech Stack Pills */}
            {project.techStack && (
              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[#BBCCD7]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            <p className="text-[#D7E2EA]/80 font-light text-sm sm:text-base mb-8 max-w-3xl leading-relaxed">
              {project.description}
            </p>

            {/* Video Walkthrough / Demo Player */}
            {project.videoUrl && (
              <div className="mb-8 rounded-[24px] sm:rounded-[32px] overflow-hidden border border-white/15 bg-black/80 shadow-2xl">
                <video
                  src={project.videoUrl}
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full max-h-[420px] object-contain bg-black"
                />
              </div>
            )}

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="space-y-4">
                <div className="rounded-[24px] sm:rounded-[32px] overflow-hidden border border-white/10 bg-[#16171D] group">
                  <img
                    src={project.col1Image1}
                    alt={`${project.title} UI preview 1`}
                    className="w-full h-[220px] object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="rounded-[24px] sm:rounded-[32px] overflow-hidden border border-white/10 bg-[#16171D] group">
                  <img
                    src={project.col1Image2}
                    alt={`${project.title} UI preview 2`}
                    className="w-full h-[260px] object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="rounded-[24px] sm:rounded-[32px] overflow-hidden border border-white/10 bg-[#16171D] group">
                <img
                  src={project.col2Image}
                  alt={`${project.title} featured preview`}
                  className="w-full h-full min-h-[340px] md:min-h-[496px] object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-6 border-t border-[#252834] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-xs text-[#D7E2EA]/70">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#BBCCD7]" />
                  MERN Stack Architecture
                </span>
                <span className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#BBCCD7]" />
                  Production Ready
                </span>
              </div>

              {project.liveUrl && project.liveUrl !== '#' ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-white text-[#0C0C0C] font-semibold uppercase tracking-wider text-xs hover:bg-[#D7E2EA] transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span>Launch Live Project</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              ) : (
                <a
                  href="https://github.com/hetpatel2004"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-white text-[#0C0C0C] font-semibold uppercase tracking-wider text-xs hover:bg-[#D7E2EA] transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span>View on GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
