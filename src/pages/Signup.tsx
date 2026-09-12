import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import bgImage from '../assets/bg.png';
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
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function Signup() {
  const navigate = useNavigate();
  const { t, currentLanguage, setLanguage } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Form fields state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  // Errors state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLangOpen, setIsLangOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for that field as user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Password strength calculation
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: '', color: 'bg-slate-200' };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-red-500' };
    if (score === 2 || score === 3) return { score: 2, label: 'Medium', color: 'bg-amber-500' };
    return { score: 3, label: 'Strong', color: 'bg-emerald-500' };
  };

  const strength = getPasswordStrength(formData.password);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the Terms & Conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Demo validation pass without backend call
      alert('Signup form validated successfully! Redirecting to login...');
      navigate('/login');
    }
  };

  return (
    <div 
      className="min-h-screen w-full font-sans text-[#0F172A] relative bg-cover bg-center bg-no-repeat flex items-center justify-start p-4 sm:p-6 lg:p-10"
      style={{
        backgroundImage: `url(${bgImage})`
      }}
    >
      {/* Language Selector */}
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

      {/* Main Container */}
      <div className="w-full max-w-[1240px] flex flex-col lg:flex-row items-center lg:items-start justify-start gap-6 lg:gap-8 relative z-10 lg:pl-8 xl:pl-12 my-6">

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
                Join the<br />
                <span className="text-[#2563EB]">AI Banking Revolution</span><br />
                in Bharat
              </h1>
              
              {/* Description */}
              <p className="mt-4 text-xs text-slate-600 leading-relaxed font-medium">
                Create your account in 2 minutes. Experience zero-fee intelligent banking.
              </p>
            </div>

            {/* Feature Items */}
            <div className="mt-7 space-y-5">
              <div className="flex items-center space-x-3">
                <div className="w-8.5 h-8.5 rounded-full bg-blue-100/70 border border-blue-200/60 flex items-center justify-center text-[#2563EB] flex-shrink-0 shadow-2xs">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Instant Setup</h4>
                  <p className="text-[10.5px] text-slate-500">100% digital KYC</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8.5 h-8.5 rounded-full bg-emerald-100/70 border border-emerald-200/60 flex items-center justify-center text-[#10B981] flex-shrink-0 shadow-2xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">RBI Compliant</h4>
                  <p className="text-[10.5px] text-slate-500">Bank-level 256-bit encryption</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8.5 h-8.5 rounded-full bg-indigo-100/70 border border-indigo-200/60 flex items-center justify-center text-indigo-600 flex-shrink-0 shadow-2xs">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Multilingual AI</h4>
                  <p className="text-[10.5px] text-slate-500">Assistant in Hindi, Gujarati & more</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Accent */}
          <div className="mt-8 pt-5 border-t border-slate-200/60">
            <p className="text-[10.5px] font-bold text-slate-600 tracking-wider uppercase">
              POWERING A BRIGHTER BHARAT
            </p>
            <div className="flex items-center space-x-1.5 mt-2">
              <div className="h-1 w-6 bg-[#F97316] rounded-full" />
              <div className="h-1 w-6 bg-[#10B981] rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* 2. CENTER SIGNUP CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-[500px] lg:w-[500px] flex-shrink-0 bg-white/80 backdrop-blur-2xl border border-white/80 rounded-[32px] p-6 lg:p-7 shadow-2xl flex flex-col justify-between"
        >
          {/* Header Title */}
          <div className="text-center">
            <h2 className="text-2xl lg:text-2.5xl font-extrabold text-[#0F172A] tracking-tight">Create Account</h2>
            <p className="text-xs text-slate-500 mt-1 font-medium">Get started with RupAI Smart Banking</p>
          </div>

          {/* Form */}
          <form className="mt-5 space-y-3.5" onSubmit={handleSubmit} noValidate>
            
            {/* First Name & Last Name */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Rahul"
                  className={`w-full h-[46px] rounded-[16px] border ${errors.firstName ? 'border-red-500 bg-red-50/20' : 'border-slate-200 bg-white/90'} px-3.5 text-xs text-[#0F172A] placeholder-slate-400 focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-xs transition-all`}
                />
                {errors.firstName && <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Sharma"
                  className={`w-full h-[46px] rounded-[16px] border ${errors.lastName ? 'border-red-500 bg-red-50/20' : 'border-slate-200 bg-white/90'} px-3.5 text-xs text-[#0F172A] placeholder-slate-400 focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-xs transition-all`}
                />
                {errors.lastName && <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.lastName}</p>}
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="rahul.sharma@example.com"
                className={`w-full h-[46px] rounded-[16px] border ${errors.email ? 'border-red-500 bg-red-50/20' : 'border-slate-200 bg-white/90'} px-3.5 text-xs text-[#0F172A] placeholder-slate-400 focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-xs transition-all`}
              />
              {errors.email && <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.email}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">+91</span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={10}
                  placeholder="9876543210"
                  className={`w-full h-[46px] rounded-[16px] border ${errors.phone ? 'border-red-500 bg-red-50/20' : 'border-slate-200 bg-white/90'} pl-12 pr-3.5 text-xs text-[#0F172A] placeholder-slate-400 focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-xs transition-all`}
                />
              </div>
              {errors.phone && <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.phone}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimum 8 characters"
                  className={`w-full h-[46px] rounded-[16px] border ${errors.password ? 'border-red-500 bg-red-50/20' : 'border-slate-200 bg-white/90'} px-3.5 pr-11 text-xs text-[#0F172A] placeholder-slate-400 focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-xs transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-1.5 flex items-center space-x-2">
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden flex space-x-1">
                    <div className={`h-full flex-1 transition-all duration-300 ${strength.score >= 1 ? strength.color : 'bg-slate-200'}`} />
                    <div className={`h-full flex-1 transition-all duration-300 ${strength.score >= 2 ? strength.color : 'bg-slate-200'}`} />
                    <div className={`h-full flex-1 transition-all duration-300 ${strength.score >= 3 ? strength.color : 'bg-slate-200'}`} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 uppercase">{strength.label}</span>
                </div>
              )}
              {errors.password && <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  className={`w-full h-[46px] rounded-[16px] border ${errors.confirmPassword ? 'border-red-500 bg-red-50/20' : 'border-slate-200 bg-white/90'} px-3.5 pr-11 text-xs text-[#0F172A] placeholder-slate-400 focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-xs transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.confirmPassword}</p>}
            </div>

            {/* Terms Checkbox */}
            <div>
              <label className="flex items-start space-x-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="h-4 w-4 mt-0.5 rounded border-slate-300 text-[#2563EB] focus:ring-blue-500/20"
                />
                <span className="text-[11px] text-slate-600 leading-snug">
                  I agree to the <a href="#" className="text-blue-600 font-semibold hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 font-semibold hover:underline">Privacy Policy</a>
                </span>
              </label>
              {errors.agreeTerms && <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.agreeTerms}</p>}
            </div>

            {/* Create Account Button */}
            <div className="pt-1">
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
                type="submit"
                className="w-full h-[48px] rounded-[16px] bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Continue with Google Button */}
            <div>
              <button
                type="button"
                className="w-full h-[48px] rounded-[16px] border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-all shadow-xs flex items-center justify-center space-x-2.5 cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>
          </form>

          {/* Already have an account link */}
          <div className="mt-4 text-center pt-3 border-t border-slate-200/50 text-xs">
            <span className="text-slate-500 font-medium">Already have an account? </span>
            <Link to="/login" className="text-[#2563EB] font-bold hover:underline">
              Sign In
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
