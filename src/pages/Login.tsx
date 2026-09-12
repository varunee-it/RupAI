import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import bgImage from '../assets/bg.png';
import { login } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  BarChart3, 
  Eye, 
  EyeOff, 
  Shield,
  Globe,
  ChevronDown,
  Languages
} from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { t, currentLanguage, setLanguage } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('demo@rupai.com');
  const [password, setPassword] = useState('123456');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLangOpen, setIsLangOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    try {
      const data = await login(email, password);
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      navigate('/dashboard');
    } catch (err: any) {
      console.error("Login error:", err);
      setErrorMsg(err.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Store demo session locally without backend API call
    localStorage.setItem('token', 'demo-token');
    localStorage.setItem('user', JSON.stringify({
      id: "demo-user",
      name: "Varun",
      email: "demo@rupai.com",
      isDemo: true
    }));

    navigate('/dashboard');
  };

  return (
    <div 
      className="min-h-screen w-full font-sans text-[#0F172A] relative bg-cover bg-center bg-no-repeat flex items-center justify-start p-4 sm:p-6 lg:p-10"
      style={{
        backgroundImage: `url(${bgImage})`
      }}
    >
      {/* Top Right User-Friendly Interactive Language Selector */}
      <div className="absolute top-6 right-8 z-30">
        <div className="relative">
          <button 
            type="button"
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-white/80 text-xs font-semibold text-slate-800 shadow-sm hover:bg-white transition-all cursor-pointer"
          >
            <Globe className="w-4 h-4 text-blue-600" />
            <span>{langKey === 'en' ? 'English' : langKey === 'hi' ? 'हिंदी' : 'ગુજરાતી'}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
          </button>

          {isLangOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-40 animate-in fade-in zoom-in-95 duration-150">
              {[
                { code: 'en', label: 'English' },
                { code: 'hi', label: 'हिंदी (Hindi)' },
                { code: 'gu', label: 'ગુજરાતી (Gujarati)' }
              ].map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => { setLangKey(lang.code as 'en' | 'hi' | 'gu'); setIsLangOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors ${langKey === lang.code ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-700 hover:bg-slate-50'}`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Container - Left & Center Panels positioned to reveal background artwork on right */}
      <div className="w-full max-w-[1240px] flex flex-col lg:flex-row items-center lg:items-start justify-start gap-6 lg:gap-8 relative z-10 lg:pl-8 xl:pl-12">

        {/* 1. LEFT BRANDING PANEL */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-[260px] xl:w-[280px] flex-shrink-0 flex flex-col justify-between bg-white/45 backdrop-blur-md rounded-[32px] p-6 border border-white/60 shadow-sm mb-6 lg:mb-0"
        >
          <div>
            {/* Logo */}
            <motion.div 
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-center space-x-3.5"
            >
              <div className="relative w-11 h-11 bg-gradient-to-br from-blue-600 to-[#2563EB] rounded-2xl flex items-center justify-center shadow-md">
                <span className="text-2xl font-extrabold text-white">₹</span>
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-[#F59E0B] drop-shadow animate-pulse" />
              </div>
              <span className="text-2.5xl font-extrabold text-[#0F172A] tracking-tight">RupAI</span>
            </motion.div>

            {/* Heading */}
            <div className="mt-7">
              <h1 className="text-xl lg:text-2xl font-bold leading-snug tracking-tight text-[#0F172A]">
                {t.brandHeadline1}<br />
                <span className="text-[#2563EB]">{t.brandHeadline2}</span><br />
                {t.brandHeadline3}
              </h1>
              
              {/* Description */}
              <p className="mt-4 text-xs text-slate-600 leading-relaxed font-medium">
                {t.brandDesc}
              </p>
            </div>

            {/* Feature Items */}
            <div className="mt-7 space-y-5">
              <div className="flex items-center space-x-3">
                <div className="w-8.5 h-8.5 rounded-full bg-blue-100/70 border border-blue-200/60 flex items-center justify-center text-[#2563EB] flex-shrink-0 shadow-2xs">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{t.leftFeature1Title}</h4>
                  <p className="text-[10.5px] text-slate-500">{t.leftFeature1Desc}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8.5 h-8.5 rounded-full bg-emerald-100/70 border border-emerald-200/60 flex items-center justify-center text-[#10B981] flex-shrink-0 shadow-2xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{t.leftFeature2Title}</h4>
                  <p className="text-[10.5px] text-slate-500">{t.leftFeature2Desc}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8.5 h-8.5 rounded-full bg-indigo-100/70 border border-indigo-200/60 flex items-center justify-center text-indigo-600 flex-shrink-0 shadow-2xs">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{t.leftFeature3Title}</h4>
                  <p className="text-[10.5px] text-slate-500">{t.leftFeature3Desc}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Tricolor Accent - Positioned naturally after features with divider */}
          <div className="mt-8 pt-5 border-t border-slate-200/60">
            <p className="text-[10.5px] font-bold text-slate-600 tracking-wider uppercase">
              {t.leftFooterTag}
            </p>
            <div className="flex items-center space-x-1.5 mt-2">
              <div className="h-1 w-6 bg-[#F97316] rounded-full" />
              <div className="h-1 w-6 bg-[#10B981] rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* 2. CENTER LOGIN CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-[480px] lg:w-[480px] flex-shrink-0 bg-white/80 backdrop-blur-2xl border border-white/80 rounded-[32px] p-6 lg:p-7 shadow-2xl flex flex-col justify-between"
        >
          {/* Welcome Title */}
          <div className="text-center">
            <h2 className="text-2xl lg:text-2.5xl font-extrabold text-[#0F172A] tracking-tight">{t.welcomeTitle}</h2>
            <p className="text-xs text-slate-500 mt-1 font-medium">{t.welcomeSubtitle}</p>
          </div>



          {/* Login Form */}
          <form className="mt-4.5" onSubmit={handleSubmit}>
            {errorMsg && (
              <div className="mb-3 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-semibold">
                {errorMsg}
              </div>
            )}
            <div className="space-y-3.5">
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.emailLabel}
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[50px] rounded-[16px] border border-slate-200 bg-white/90 px-3.5 text-xs text-[#0F172A] placeholder-slate-400 focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-xs transition-all"
                  placeholder={t.emailPlaceholder}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.passwordLabel}
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-[50px] rounded-[16px] border border-slate-200 bg-white/90 px-3.5 pr-11 text-xs text-[#0F172A] placeholder-slate-400 focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-xs transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11.5px] mt-2.5">
              <label className="flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 rounded border-slate-300 text-[#2563EB] focus:ring-blue-500/20"
                />
                <span className="ml-1.5 font-medium text-slate-600">{t.rememberMe}</span>
              </label>
              <a 
                href="/forgot-password" 
                onClick={(e) => { e.preventDefault(); navigate('/forgot-password'); }}
                className="font-semibold text-[#2563EB] hover:text-blue-700 transition-colors"
              >
                {t.forgotPassword}
              </a>
            </div>

            {/* Continue Button */}
            <div className="mt-3.5">
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
                type="submit"
                disabled={isLoading}
                className="w-full h-[50px] rounded-[16px] bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-60 cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-4.5 h-4.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{t.continueBtn}</span>
                    <ArrowRight className="w-4.5 h-4.5" />
                  </>
                )}
              </motion.button>
            </div>

            {/* Demo Button */}
            <div className="mt-3">
              <motion.button
                whileHover={{ y: -1 }}
                type="button"
                onClick={handleDemoLogin}
                className="w-full h-[50px] rounded-[16px] border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-all shadow-xs flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>{t.demoBtn}</span>
                <ArrowRight className="w-4.5 h-4.5 text-slate-400 transition-colors" />
              </motion.button>
            </div>
          </form>

          {/* Bottom Feature Badges & Sign Up Link */}
          <div className="mt-4 pt-3 border-t border-slate-200/50 space-y-3">
            <div className="text-center text-xs">
              <span className="text-slate-500 font-medium">Don't have an account? </span>
              <a href="/signup" onClick={(e) => { e.preventDefault(); navigate('/signup'); }} className="text-[#2563EB] font-bold hover:underline">
                Sign Up
              </a>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="h-[52px] flex flex-col items-center justify-center text-center p-1 rounded-xl bg-white/80 border border-slate-100 shadow-2xs">
                <div className="w-4 h-4 rounded-full bg-emerald-100/80 flex items-center justify-center text-[#10B981] mb-0.5">
                  <Shield className="w-2.5 h-2.5" />
                </div>
                <span className="text-[9px] font-semibold text-slate-700 leading-tight">{t.badgeSecurity}</span>
              </div>

              <div className="h-[52px] flex flex-col items-center justify-center text-center p-1 rounded-xl bg-white/80 border border-slate-100 shadow-2xs">
                <div className="w-4 h-4 rounded-full bg-blue-100/80 flex items-center justify-center text-[#2563EB] mb-0.5">
                  <Languages className="w-2.5 h-2.5" />
                </div>
                <span className="text-[9px] font-semibold text-slate-700 leading-tight">{t.badgeLanguages}</span>
              </div>

              <div className="h-[52px] flex flex-col items-center justify-center text-center p-1 rounded-xl bg-white/80 border border-slate-100 shadow-2xs">
                <div className="w-4 h-4 rounded-full bg-amber-100/80 flex items-center justify-center text-[#F59E0B] mb-0.5">
                  <Sparkles className="w-2.5 h-2.5" />
                </div>
                <span className="text-[9px] font-semibold text-slate-700 leading-tight">{t.badgeAi}</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
