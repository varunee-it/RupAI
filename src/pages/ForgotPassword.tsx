import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import bgImage from '../assets/bg.png';
import { useLanguage } from '../context/LanguageContext';
import { 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  BarChart3, 
  Eye, 
  EyeOff, 
  Globe, 
  ChevronDown,
  CheckCircle2,
  Lock,
  Mail,
  RotateCcw
} from 'lucide-react';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { t, currentLanguage, setLanguage } = useLanguage();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Language selector state
  const [isLangOpen, setIsLangOpen] = useState(false);

  // Form State
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [timer, setTimer] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Errors State
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Refs for OTP input auto-focus
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer Countdown Effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

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

  const strength = getPasswordStrength(newPassword);

  // Step 1: Send OTP
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setErrors({ email: 'Email is required' });
      return;
    } else if (!emailRegex.test(email)) {
      setErrors({ email: 'Enter a valid email address' });
      return;
    }

    setErrors({});
    setStep(2);
    setTimer(60);
    setIsTimerActive(true);
  };

  // OTP Input handlers
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (errors.otp) setErrors((prev) => ({ ...prev, otp: '' }));

    // Move focus to next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOtp = () => {
    setOtp(Array(6).fill(''));
    setTimer(60);
    setIsTimerActive(true);
    setErrors({});
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length < 6) {
      setErrors({ otp: 'Please enter all 6 digits of the OTP' });
      return;
    }
    setErrors({});
    setStep(3);
  };

  // Step 3: Reset Password
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!newPassword) {
      newErrors.newPassword = 'Password is required';
    } else if (newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStep(4);
  };

  return (
    <div 
      className="min-h-screen w-full font-sans text-[#0F172A] relative bg-cover bg-center bg-no-repeat flex items-center justify-start p-4 sm:p-6 lg:p-10"
      style={{
        backgroundImage: `url(${bgImage})`
      }}
    >
      {/* Top Right Language Selector */}
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
                Secure<br />
                <span className="text-[#2563EB]">Password Recovery</span><br />
                for your Account
              </h1>
              
              {/* Description */}
              <p className="mt-4 text-xs text-slate-600 leading-relaxed font-medium">
                Reset your password safely with 256-bit encrypted OTP verification.
              </p>
            </div>

            {/* Feature Items */}
            <div className="mt-7 space-y-5">
              <div className="flex items-center space-x-3">
                <div className="w-8.5 h-8.5 rounded-full bg-blue-100/70 border border-blue-200/60 flex items-center justify-center text-[#2563EB] flex-shrink-0 shadow-2xs">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Instant OTP</h4>
                  <p className="text-[10.5px] text-slate-500">Sent to registered email</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8.5 h-8.5 rounded-full bg-emerald-100/70 border border-emerald-200/60 flex items-center justify-center text-[#10B981] flex-shrink-0 shadow-2xs">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Protected Account</h4>
                  <p className="text-[10.5px] text-slate-500">Your data stays 100% safe</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8.5 h-8.5 rounded-full bg-indigo-100/70 border border-indigo-200/60 flex items-center justify-center text-indigo-600 flex-shrink-0 shadow-2xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">RBI Compliant</h4>
                  <p className="text-[10.5px] text-slate-500">Bank-grade security standards</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Accent */}
          <div className="mt-8 pt-5 border-t border-slate-200/60">
            <p className="text-[10.5px] font-bold text-slate-600 tracking-wider uppercase">
              BANKING FOR A BRIGHTER BHARAT
            </p>
            <div className="flex items-center space-x-1.5 mt-2">
              <div className="h-1 w-6 bg-[#F97316] rounded-full" />
              <div className="h-1 w-6 bg-[#10B981] rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* 2. CENTER FORGOT PASSWORD CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-[480px] lg:w-[480px] flex-shrink-0 bg-white/80 backdrop-blur-2xl border border-white/80 rounded-[32px] p-6 lg:p-7 shadow-2xl flex flex-col justify-between"
        >
          <AnimatePresence mode="wait">
            
            {/* STEP 1: Enter Email */}
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center">
                  <h2 className="text-2xl lg:text-2.5xl font-extrabold text-[#0F172A] tracking-tight">Forgot Password</h2>
                  <p className="text-xs text-slate-500 mt-1.5 font-medium">Enter your registered email to receive an OTP.</p>
                </div>

                <form className="mt-6 space-y-4" onSubmit={handleSendOtp} noValidate>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setErrors({}); }}
                      placeholder="you@example.com"
                      className={`w-full h-[50px] rounded-[16px] border ${errors.email ? 'border-red-500 bg-red-50/20' : 'border-slate-200 bg-white/90'} px-3.5 text-xs text-[#0F172A] placeholder-slate-400 focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-xs transition-all`}
                    />
                    {errors.email && <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.email}</p>}
                  </div>

                  <div className="pt-2">
                    <motion.button
                      whileHover={{ y: -1 }}
                      whileTap={{ y: 0 }}
                      type="submit"
                      className="w-full h-[50px] rounded-[16px] bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <span>Send OTP</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </form>

                <div className="mt-6 text-center pt-4 border-t border-slate-200/50 text-xs">
                  <Link to="/login" className="text-[#2563EB] font-bold hover:underline">
                    ← Back to Login
                  </Link>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Verify OTP */}
            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center">
                  <h2 className="text-2xl lg:text-2.5xl font-extrabold text-[#0F172A] tracking-tight">Verify OTP</h2>
                  <p className="text-xs text-slate-500 mt-1.5 font-medium">
                    We sent a 6-digit code to <strong className="text-slate-800">{email}</strong>
                  </p>
                </div>

                <form className="mt-6 space-y-5" onSubmit={handleVerifyOtp}>
                  {/* 6 OTP Boxes */}
                  <div className="flex justify-between space-x-2">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => (otpInputRefs.current[idx] = el)}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        className={`w-11 h-13 text-center text-lg font-extrabold rounded-xl border ${errors.otp ? 'border-red-500 bg-red-50/20' : 'border-slate-200 bg-white'} focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 focus:outline-none shadow-xs transition-all`}
                      />
                    ))}
                  </div>
                  {errors.otp && <p className="text-[10px] text-red-500 text-center font-medium">{errors.otp}</p>}

                  {/* Countdown Timer & Resend */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-500 font-medium">
                      {isTimerActive ? (
                        <>Resend OTP in <strong className="text-slate-800">{timer}s</strong></>
                      ) : (
                        "Didn't receive code?"
                      )}
                    </span>
                    <button
                      type="button"
                      disabled={isTimerActive}
                      onClick={handleResendOtp}
                      className={`font-bold transition-colors ${isTimerActive ? 'text-slate-400 cursor-not-allowed' : 'text-[#2563EB] hover:underline cursor-pointer'}`}
                    >
                      Resend OTP
                    </button>
                  </div>

                  {/* Verify Button */}
                  <div className="pt-2">
                    <motion.button
                      whileHover={{ y: -1 }}
                      whileTap={{ y: 0 }}
                      type="submit"
                      className="w-full h-[50px] rounded-[16px] bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <span>Verify OTP</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </form>

                <div className="mt-6 text-center pt-4 border-t border-slate-200/50 text-xs">
                  <button 
                    type="button" 
                    onClick={() => setStep(1)} 
                    className="text-slate-500 hover:text-slate-800 font-medium transition-colors"
                  >
                    Change Email Address
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Reset Password */}
            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center">
                  <h2 className="text-2xl lg:text-2.5xl font-extrabold text-[#0F172A] tracking-tight">Reset Password</h2>
                  <p className="text-xs text-slate-500 mt-1.5 font-medium">Create a strong new password for your account.</p>
                </div>

                <form className="mt-6 space-y-4" onSubmit={handleResetPassword} noValidate>
                  {/* New Password */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">New Password</label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => { setNewPassword(e.target.value); setErrors({}); }}
                        placeholder="Minimum 8 characters"
                        className={`w-full h-[50px] rounded-[16px] border ${errors.newPassword ? 'border-red-500 bg-red-50/20' : 'border-slate-200 bg-white/90'} px-3.5 pr-11 text-xs text-[#0F172A] placeholder-slate-400 focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-xs transition-all`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Password Strength */}
                    {newPassword && (
                      <div className="mt-1.5 flex items-center space-x-2">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden flex space-x-1">
                          <div className={`h-full flex-1 transition-all duration-300 ${strength.score >= 1 ? strength.color : 'bg-slate-200'}`} />
                          <div className={`h-full flex-1 transition-all duration-300 ${strength.score >= 2 ? strength.color : 'bg-slate-200'}`} />
                          <div className={`h-full flex-1 transition-all duration-300 ${strength.score >= 3 ? strength.color : 'bg-slate-200'}`} />
                        </div>
                        <span className="text-[10px] font-bold text-slate-600 uppercase">{strength.label}</span>
                      </div>
                    )}
                    {errors.newPassword && <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.newPassword}</p>}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => { setConfirmPassword(e.target.value); setErrors({}); }}
                        placeholder="Re-enter new password"
                        className={`w-full h-[50px] rounded-[16px] border ${errors.confirmPassword ? 'border-red-500 bg-red-50/20' : 'border-slate-200 bg-white/90'} px-3.5 pr-11 text-xs text-[#0F172A] placeholder-slate-400 focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-xs transition-all`}
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

                  <div className="pt-2">
                    <motion.button
                      whileHover={{ y: -1 }}
                      whileTap={{ y: 0 }}
                      type="submit"
                      className="w-full h-[50px] rounded-[16px] bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <span>Reset Password</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* STEP 4: Success Screen */}
            {step === 4 && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center py-4 space-y-4"
              >
                <div className="w-16 h-16 bg-emerald-100/80 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <h2 className="text-2xl font-extrabold text-[#0F172A]">Password Reset Successfully</h2>
                  <p className="text-xs text-slate-500 mt-1.5 font-medium max-w-xs mx-auto">
                    Your password has been updated. You can now log in using your new credentials.
                  </p>
                </div>

                <div className="pt-4">
                  <motion.button
                    whileHover={{ y: -1 }}
                    whileTap={{ y: 0 }}
                    type="button"
                    onClick={() => navigate('/login')}
                    className="w-full h-[50px] rounded-[16px] bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Continue to Login</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}
