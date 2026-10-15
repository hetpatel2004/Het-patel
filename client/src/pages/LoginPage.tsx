import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, ShieldCheck, AlertCircle, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { apiLogin, apiVerifyToken } from '../services/api';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('hetpatel');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // If already logged in, redirect straight to dashboard
  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await apiVerifyToken();
      if (isValid) {
        navigate('/admin/dashboard', { replace: true });
      }
    };
    checkAuth();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!username.trim() || !password.trim()) {
      setErrorMessage('Please enter both your static ID and password.');
      return;
    }

    setIsLoading(true);
    try {
      await apiLogin(username.trim(), password.trim());
      navigate('/admin/dashboard', { replace: true });
    } catch (err: any) {
      setErrorMessage(err.message || 'Invalid static ID or password. Access denied.');
    } finally {
      setIsLoading(false);
    }
  };

  // const handleQuickFill = () => {
  //   setUsername('hetpatel');
  //   setPassword('hetpatel2026');
  // };

  return (
    <div className="min-h-screen w-full bg-[#07070A] text-white flex flex-col justify-between items-center relative overflow-hidden select-none px-4 py-8">
      {/* Background Ambient Violet / Magenta Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none opacity-25 blur-[120px] rounded-full"
        style={{
          background: 'radial-gradient(circle, #B600A8 0%, rgba(99, 102, 241, 0.4) 50%, transparent 80%)',
        }}
      />

      {/* Top Header Row with Return Link */}
      <header className="w-full max-w-5xl flex items-center justify-between z-10">
        <a
          href="/"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white/70 hover:text-white transition-all duration-200"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>PORTFOLIO HOME</span>
        </a>

        <div className="flex items-center gap-2 text-xs font-mono text-white/40">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>PORTFOLIO CMS v2.6</span>
        </div>
      </header>

      {/* Center Auth Card */}
      <main className="w-full max-w-md z-10 my-auto">
        <div className="rounded-[32px] bg-[#111116]/80 backdrop-blur-2xl border border-white/10 p-8 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.85)] relative">
          {/* Top Logo & Status Badge */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-[#B600A8]/20 rounded-full blur-xl scale-125" />
              <img
                src="/hp-logo.png"
                alt="HP"
                className="h-12 w-auto object-contain relative filter drop-shadow-[0_2px_12px_rgba(255,255,255,0.3)]"
              />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono tracking-widest uppercase text-white/70 mb-3">
              <Lock className="w-3 h-3 text-[#B600A8]" />
              <span>PRIVATE ADMIN STUDIO</span>
            </div>

            <h1 className="font-sans font-black text-2xl sm:text-3xl text-white tracking-tight uppercase">
              Dashboard Login
            </h1>
            <p className="font-sans font-light text-xs sm:text-sm text-white/60 mt-1 max-w-xs">
              Direct administrative URL access for Het Patel to manage details, projects, and skills.
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-300 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2">
                Static Admin ID / Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="hetpatel"
                  required
                  className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 focus:border-[#B600A8] focus:bg-white/[0.07] text-white text-sm outline-none transition-all duration-200 font-mono"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-white/60">
                  Admin Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[11px] font-mono text-white/40 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  <span>{showPassword ? 'Hide' : 'Show'}</span>
                </button>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 focus:border-[#B600A8] focus:bg-white/[0.07] text-white text-sm outline-none transition-all duration-200 font-mono tracking-wider"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-2xl bg-[#B600A8] hover:bg-[#99008c] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_10px_30px_rgba(182,0,168,0.4)] hover:shadow-[0_15px_40px_rgba(182,0,168,0.6)] cursor-pointer flex items-center justify-center gap-2 group mt-6 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>AUTHENTICATING...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>ENTER DASHBOARD</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Quick Static Credentials Hint Helper */}
          {/* <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
            <span className="font-mono text-[11px]">Static credentials:</span>
            <button
              type="button"
              onClick={handleQuickFill}
              className="inline-flex items-center gap-1 text-[11px] font-mono text-[#B600A8] hover:text-[#d33bc7] transition-colors cursor-pointer"
            >
              <Sparkles className="w-3 h-3" />
              <span>Fill: hetpatel / hetpatel2026</span>
            </button>
          </div> */}
        </div>
      </main>

      {/* Footer copyright */}
      <footer className="text-center z-10 text-xs font-mono text-white/30">
        &copy; {new Date().getFullYear()} Het Patel &bull; Private Administrative Environment
      </footer>
    </div>
  );
};

export default LoginPage;
