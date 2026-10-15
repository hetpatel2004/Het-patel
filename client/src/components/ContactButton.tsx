import React from 'react';
import { FileText, Download, ArrowUpRight } from 'lucide-react';

interface ContactButtonProps {
  onClick?: () => void;
  className?: string;
  label?: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  onClick: _onClick,
  className = '',
  label,
}) => {
  // If a custom label is provided (other than the old default "Contact Me"), use it; otherwise show "SEE RESUME"
  const displayLabel = label && label !== 'Contact Me' ? label : 'SEE RESUME';

  return (
    <div className={`relative inline-flex items-center gap-2 sm:gap-2.5 z-20 ${className}`}>
      {/* Primary Action: View Resume in New Tab */}
      <a
        href="/het-patel-resume.pdf"
        target="_blank"
        rel="noreferrer"
        style={{
          background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
          boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
          outline: '2px solid #FFFFFF',
          outlineOffset: '-3px',
        }}
        className="relative inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full text-white font-medium uppercase tracking-widest px-5 py-2.5 sm:px-7 sm:py-3 md:px-9 md:py-3.5 text-[11px] sm:text-xs md:text-sm lg:text-base cursor-pointer select-none transition-all duration-300 hover:brightness-110 active:scale-95 hover:shadow-[0_0_25px_rgba(182,0,168,0.6)] group"
        title="Open Het Patel's Resume (PDF) in new tab"
      >
        <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 transition-transform group-hover:scale-110" />
        <span>{displayLabel}</span>
        <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </a>

      {/* Direct One-Click Download Button */}
      <a
        href="/het-patel-resume.pdf"
        download="Het-Patel-Resume.pdf"
        title="Download Het Patel's Resume (PDF)"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))',
          boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
          outline: '1.5px solid rgba(255,255,255,0.3)',
          outlineOffset: '-2px',
        }}
        className="relative inline-flex items-center justify-center p-2.5 sm:p-3 md:p-3.5 rounded-full text-white hover:text-[#B600A8] hover:bg-white/20 transition-all duration-300 active:scale-95 cursor-pointer group"
      >
        <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 transition-transform group-hover:translate-y-0.5" />
      </a>
    </div>
  );
};

export default ContactButton;
