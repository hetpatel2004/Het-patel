import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Sparkles, Loader2, Mail, Phone, MapPin } from 'lucide-react';
import { sendContactMessage } from '../api/contactApi';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  initialService = 'MERN Stack Web Application',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: initialService,
    budget: 'Standard Project',
    timeline: '2-4 weeks',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please fill in your name, email, and project details.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      await sendContactMessage(formData);
      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      service: initialService,
      budget: 'Standard Project',
      timeline: '2-4 weeks',
      message: '',
    });
    onClose();
  };

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
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl bg-[#111113] border border-[#2A2E39] rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 text-[#D7E2EA] shadow-[0_20px_60px_rgba(0,0,0,0.8)] z-10 my-8 overflow-hidden"
          >
            {/* Top decorative glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-[#B600A8]/20 to-transparent blur-2xl pointer-events-none" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full text-[#D7E2EA]/60 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#B600A8]/20 flex items-center justify-center mb-6 text-[#BBCCD7] border border-[#B600A8]/40">
                  <CheckCircle2 className="w-9 h-9 text-[#BBCCD7]" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mb-3">
                  Inquiry Received!
                </h3>
                <p className="text-[#D7E2EA]/80 font-light max-w-md mb-8 leading-relaxed">
                  Thank you, <span className="text-white font-medium">{formData.name}</span>! Het Patel has received your message and will review your project requirements promptly.
                </p>
                <button
                  onClick={handleReset}
                  className="rounded-full px-8 py-3 bg-white text-[#0C0C0C] font-semibold uppercase tracking-wider text-sm hover:bg-[#D7E2EA] transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium uppercase tracking-wider text-[#BBCCD7] mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-[#B600A8]" />
                    <span>Get In Touch</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                    Contact Het Patel
                  </h2>
                  <p className="text-sm font-light text-[#D7E2EA]/70 mt-1">
                    Have a full-stack web project, internship, or opportunity in mind? Drop a message below.
                  </p>

                  {/* Direct details bar */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-4 text-xs text-[#D7E2EA]/70">
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#BBCCD7]" />
                      <span>het.patel.imscit21@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#BBCCD7]" />
                      <span>+91 7383539915</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#BBCCD7]" />
                      <span>Ahmedabad, Gujarat</span>
                    </div>
                  </div>
                </div>

                {errorMessage && (
                  <div className="mb-4 p-3 rounded-xl bg-red-900/30 border border-red-500/40 text-red-200 text-xs">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1.5 font-medium">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-3 rounded-2xl bg-[#1A1C23] border border-[#2D313D] text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#BBCCD7] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1.5 font-medium">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 rounded-2xl bg-[#1A1C23] border border-[#2D313D] text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#BBCCD7] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1.5 font-medium">
                        Area of Interest
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-2xl bg-[#1A1C23] border border-[#2D313D] text-white text-sm focus:outline-none focus:border-[#BBCCD7] transition-colors"
                      >
                        <option value="MERN Stack Web Application">MERN Stack Web Application</option>
                        <option value="Frontend Development (React)">Frontend Development (React)</option>
                        <option value="Backend & REST API Development">Backend & REST API Development</option>
                        <option value="UI/UX Design & Prototyping">UI/UX Design & Prototyping</option>
                        <option value="Full-Time / Internship Role">Full-Time / Internship Opportunity</option>
                        <option value="Other Project Inquiry">Other Project Inquiry</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1.5 font-medium">
                        Timeline
                      </label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-2xl bg-[#1A1C23] border border-[#2D313D] text-white text-sm focus:outline-none focus:border-[#BBCCD7] transition-colors"
                      >
                        <option value="Immediately">Immediate (1-2 weeks)</option>
                        <option value="2-4 weeks">2-4 weeks</option>
                        <option value="1-2 months">1-2 months</option>
                        <option value="Flexible">Flexible / Ongoing</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1.5 font-medium">
                      Project or Message Details *
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell Het about your requirements, role, or ideas..."
                      className="w-full px-4 py-3 rounded-2xl bg-[#1A1C23] border border-[#2D313D] text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#BBCCD7] transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                        outline: '2px solid #FFFFFF',
                        outlineOffset: '-3px',
                      }}
                      className="w-full py-3.5 rounded-full text-white font-medium uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
