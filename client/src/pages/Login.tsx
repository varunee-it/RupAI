import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import bgImage from '../assets/bg.png';
import { login } from '../services/api';
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

// Full i18n Translations Dictionary for English, Hindi, Gujarati
const translations = {
  en: {
    langName: 'English',
    // Left panel
    brandHeadline1: 'Your AI',
    brandHeadline2: 'Financial Companion',
    brandHeadline3: 'for Bharat',
    brandDesc: 'Smarter Insights. Better Decisions. A Brighter Tomorrow.',
    leftFeature1Title: 'AI-Powered Insights',
    leftFeature1Desc: 'Personalized for your goals',
    leftFeature2Title: 'Bank-grade Security',
    leftFeature2Desc: 'Your data, always protected',
    leftFeature3Title: 'Made for Bharat',
    leftFeature3Desc: 'Multiple languages, real solutions',
    leftFooterTag: 'BANKING FOR A BRIGHTER BHARAT',

    // Center Login Card
    welcomeTitle: 'Welcome Back',
    welcomeSubtitle: 'Sign in to continue your financial journey',
    
    // Blue Card Banner
    cardTitle: 'RupAI Smart Banking',
    cardDesc: 'Experience intelligent banking powered by AI and designed for every Indian.',
    pillLoan: 'Smart Loan Eligibility',
    pillAssistant: 'Multilingual AI Assistant',
    pillAlerts: 'Fraud & EMI Smart Alerts',
    cardFooterAi: 'AI Powered',
    cardFooterSecurity: 'Private & RBI Ready',

    // Form
    emailLabel: 'Email address',
    emailPlaceholder: 'you@example.com',
    passwordLabel: 'Password',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    continueBtn: 'Continue',
    demoBtn: 'Explore RupAI Demo',

    // Bottom badges
    badgeSecurity: 'Bank-grade Security',
    badgeLanguages: 'Gujarati • Hindi and more',
    badgeAi: 'AI Personalized'
  },
  hi: {
    langName: 'हिंदी (Hindi)',
    // Left panel
    brandHeadline1: 'आपका एआई',
    brandHeadline2: 'वित्तीय साथी',
    brandHeadline3: 'भारत के लिए',
    brandDesc: 'स्मार्ट अंतर्दृष्टि। बेहतर फैसले। एक उज्ज्वल भविष्य।',
    leftFeature1Title: 'एआई-संचालित अंतर्दृष्टि',
    leftFeature1Desc: 'आपके लक्ष्यों के लिए व्यक्तिगत',
    leftFeature2Title: 'बैंक-स्तरीय सुरक्षा',
    leftFeature2Desc: 'आपका डेटा, हमेशा सुरक्षित',
    leftFeature3Title: 'भारत के लिए निर्मित',
    leftFeature3Desc: 'अनेक भाषाएं, वास्तविक समाधान',
    leftFooterTag: 'उज्ज्वल भारत के लिए बैंकिंग',

    // Center Login Card
    welcomeTitle: 'वापसी पर स्वागत है',
    welcomeSubtitle: 'अपनी वित्तीय यात्रा जारी रखने के लिए साइन इन करें',
    
    // Blue Card Banner
    cardTitle: 'रूपएआई स्मार्ट बैंकिंग',
    cardDesc: 'एआई द्वारा संचालित और हर भारतीय के लिए डिज़ाइन की गई बुद्धिमान बैंकिंग का अनुभव करें।',
    pillLoan: 'स्मार्ट ऋण पात्रता',
    pillAssistant: 'बहुभाषी एआई सहायक',
    pillAlerts: 'धोखाधड़ी और ईएमआई स्मार्ट अलर्ट',
    cardFooterAi: 'एआई संचालित',
    cardFooterSecurity: 'निजी और आरबीआई तैयार',

    // Form
    emailLabel: 'ईमेल पता',
    emailPlaceholder: 'you@example.com',
    passwordLabel: 'पासवर्ड',
    rememberMe: 'मुझे याद रखें',
    forgotPassword: 'पासवर्ड भूल गए?',
    continueBtn: 'आगे बढ़ें',
    demoBtn: 'रूपएआई डेमो देखें',

    // Bottom badges
    badgeSecurity: 'बैंक-स्तरीय सुरक्षा',
    badgeLanguages: 'गुजराती • हिंदी और अधिक',
    badgeAi: 'एआई व्यक्तिगत'
  },
  gu: {
    langName: 'ગુજરાતી (Gujarati)',
    // Left panel
    brandHeadline1: 'તમારું એઆઈ',
    brandHeadline2: 'નાણાકીય સાથી',
    brandHeadline3: 'ભારત માટે',
    brandDesc: 'સ્માર્ટ આંતરદ્રષ્ટિ. વધુ સારા નિર્ણયો. એક તજસ્વી ભવિષ્ય.',
    leftFeature1Title: 'એઆઈ-સંચાલિત આંતરદ્રષ્ટિ',
    leftFeature1Desc: 'તમારા લક્ષ્યો માટે વ્યક્તિગત',
    leftFeature2Title: 'બેંક-સ્તરની સુરક્ષા',
    leftFeature2Desc: 'તમારો ડેટા, હંમેશા સુરક્ષિત',
    leftFeature3Title: 'ભારત માટે બનાવેલ',
    leftFeature3Desc: 'અનેક ભાષાઓ, વાસ્તવિક ઉકેલો',
    leftFooterTag: 'ઉજ્જવળ ભારત માટે બેંકિંગ',

    // Center Login Card
    welcomeTitle: 'પાછા સ્વાગત છે',
    welcomeSubtitle: 'તમારી નાણાકીય મુસાફરી ચાલુ રાખવા માટે સાઇન ઇન કરો',
    
    // Blue Card Banner
    cardTitle: 'રૂપએઆઈ સ્માર્ટ બેંકિંગ',
    cardDesc: 'એઆઈ દ્વારા સંચાલિત અને દરેક ભારતીય માટે રચાયેલ બુદ્ધિશાળી બેંકિંગનો અનુભવ કરો.',
    pillLoan: 'સ્માર્ટ લોન પાત્રતા',
    pillAssistant: 'બહુભાષી એઆઈ સહાયક',
    pillAlerts: 'છેતરપિંડી અને ઈએમઆઈ સ્માર્ટ એલર્ટ',
    cardFooterAi: 'એઆઈ સંચાલિત',
    cardFooterSecurity: 'ખાનગી અને આરબીઆઈ તૈયાર',

    // Form
    emailLabel: 'ઈમેઇલ સરનામું',
    emailPlaceholder: 'you@example.com',
    passwordLabel: 'પાસવર્ડ',
    rememberMe: 'મને યાદ રાખો',
    forgotPassword: 'પાસવર્ડ ભૂલી ગયા છો?',
    continueBtn: 'આગળ વધો',
    demoBtn: 'રૂપએઆઈ ડેમો જુઓ',

    // Bottom badges
    badgeSecurity: 'બેંક-સ્તરની સુરક્ષા',
    badgeLanguages: 'ગુજરાતી • હિન્દી અને વધુ',
    badgeAi: 'એઆઈ વ્યક્તિગત'
  }
};

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('demo@rupai.com');
  const [password, setPassword] = useState('123456');
  const [errorMsg, setErrorMsg] = useState('');
  const [langKey, setLangKey] = useState<'en' | 'hi' | 'gu'>('en');
  const [isLangOpen, setIsLangOpen] = useState(false);

  const t = translations[langKey];

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

  const handleDemoLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    setEmail('demo@rupai.com');
    setPassword('123456');
    setIsLoading(true);
    setErrorMsg('');
    try {
      const data = await login('demo@rupai.com', '123456');
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      navigate('/dashboard');
    } catch (err: any) {
      console.error("Demo login error:", err);
      // Fallback navigation for offline mode
      navigate('/dashboard');
    } finally {
      setIsLoading(false);
    }
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
              <a href="#" className="font-semibold text-[#2563EB] hover:text-blue-700 transition-colors">
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

          {/* Bottom Feature Badges */}
          <div className="mt-4 grid grid-cols-3 gap-2 pt-3 border-t border-slate-200/50">
            <div className="h-[56px] flex flex-col items-center justify-center text-center p-1 rounded-xl bg-white/80 border border-slate-100 shadow-2xs">
              <div className="w-4.5 h-4.5 rounded-full bg-emerald-100/80 flex items-center justify-center text-[#10B981] mb-0.5">
                <Shield className="w-3 h-3" />
              </div>
              <span className="text-[9.5px] font-semibold text-slate-700 leading-tight">{t.badgeSecurity}</span>
            </div>

            <div className="h-[56px] flex flex-col items-center justify-center text-center p-1 rounded-xl bg-white/80 border border-slate-100 shadow-2xs">
              <div className="w-4.5 h-4.5 rounded-full bg-blue-100/80 flex items-center justify-center text-[#2563EB] mb-0.5">
                <Languages className="w-3 h-3" />
              </div>
              <span className="text-[9.5px] font-semibold text-slate-700 leading-tight">{t.badgeLanguages}</span>
            </div>

            <div className="h-[56px] flex flex-col items-center justify-center text-center p-1 rounded-xl bg-white/80 border border-slate-100 shadow-2xs">
              <div className="w-4.5 h-4.5 rounded-full bg-amber-100/80 flex items-center justify-center text-[#F59E0B] mb-0.5">
                <Sparkles className="w-3 h-3" />
              </div>
              <span className="text-[9.5px] font-semibold text-slate-700 leading-tight">{t.badgeAi}</span>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
