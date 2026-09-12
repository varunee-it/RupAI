import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  User, 
  Moon, 
  ShieldCheck, 
  LogOut, 
  CheckCircle,
  Sparkles,
  Smartphone,
  ChevronRight,
  Bell,
  Fingerprint,
  Clock,
  Sliders,
  Shield,
  HelpCircle,
  Star,
  FileText,
  Lock,
  Edit3,
  Zap,
  Check
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useProfile } from '../context/ProfileContext';
import { useTheme } from '../context/ThemeContext';
import ToggleSwitch from '../components/ToggleSwitch';

type LanguageCode = 'en' | 'hi' | 'gu';

export default function Settings() {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const { profile } = useProfile();
  const { theme, matchSystem, setTheme, setMatchSystem } = useTheme();

  // Skeleton state simulation
  const [loading, setLoading] = useState(true);

  // Appearance state
  const [compactMode, setCompactMode] = useState(() => localStorage.getItem('rupai-compact') === 'true');
  const [reduceAnim, setReduceAnim] = useState(() => localStorage.getItem('rupai-[#reduceanim]') === 'true');

  // Security & Privacy state
  const [biometric, setBiometric] = useState(() => localStorage.getItem('rupai-biometric') !== 'false');
  const [pushNotif, setPushNotif] = useState(() => localStorage.getItem('rupai-[#pushnotif]') !== 'false');
  const [emailAlerts, setEmailAlerts] = useState(() => localStorage.getItem('rupai-emailalerts') !== 'false');
  const [sessionTimeout, setSessionTimeout] = useState(() => localStorage.getItem('rupai-timeout') || '30');

  // Personalization pills state
  const [pills, setPills] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('rupai-pills');
    return saved ? JSON.parse(saved) : { tips: true, emi: true, invest: true, budget: true };
  });

  // Logout & Sub-modals State
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showRateModal, setShowRateModal] = useState(false);
  const [showAppInfoModal, setShowAppInfoModal] = useState(false);

  // Rating Modal Local State
  const [starRating, setStarRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  const getEmojiForRating = (rating: number) => {
    switch(rating) {
      case 1: return '😔 Disappointed';
      case 2: return '😐 Needs Improvement';
      case 3: return '🙂 Good';
      case 4: return '😃 Great!';
      case 5: return '🤩 Loved it! Superb!';
      default: return 'Tap a star to rate';
    }
  };

  const handleRatingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (starRating === 0) return;
    localStorage.setItem('rupai-user-rating', JSON.stringify({
      rating: starRating,
      feedback: feedbackText,
      timestamp: new Date().toISOString()
    }));
    setRatingSubmitted(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  // Save Appearance
  const handleDarkMode = (val: boolean) => {
    if (matchSystem) return;
    setTheme(val ? 'dark' : 'light');
  };
  const handleSystemTheme = (val: boolean) => {
    setMatchSystem(val);
  };
  const handleCompactMode = (val: boolean) => {
    setCompactMode(val);
    localStorage.setItem('rupai-compact', String(val));
  };
  const handleReduceAnim = (val: boolean) => {
    setReduceAnim(val);
    localStorage.setItem('rupai-[#reduceanim]', String(val));
  };

  // Save Security
  const handleBiometric = (val: boolean) => {
    setBiometric(val);
    localStorage.setItem('rupai-biometric', String(val));
  };
  const handlePushNotif = (val: boolean) => {
    setPushNotif(val);
    localStorage.setItem('rupai-[#pushnotif]', String(val));
  };
  const handleEmailAlerts = (val: boolean) => {
    setEmailAlerts(val);
    localStorage.setItem('rupai-emailalerts', String(val));
  };
  const handleTimeoutChange = (val: string) => {
    setSessionTimeout(val);
    localStorage.setItem('rupai-timeout', val);
  };

  // Save Pills
  const togglePill = (key: string) => {
    const updated = { ...pills, [key]: !pills[key] };
    setPills(updated);
    localStorage.setItem('rupai-pills', JSON.stringify(updated));
  };

  // Confirm Logout
  const confirmLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const languagesList = [
    { code: 'en' as LanguageCode, flag: '🇬🇧', name: t.settings.englishOption, desc: 'Default Language' },
    { code: 'hi' as LanguageCode, flag: '🇮🇳', name: t.settings.hindiOption, desc: 'भारतीय राष्ट्रीय भाषा' },
    { code: 'gu' as LanguageCode, flag: '🇮🇳', name: t.settings.gujaratiOption, desc: 'પ્રાદેશિક ભાષા' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <h2 className="text-2.5xl font-bold text-slate-900 tracking-tight">{t.settings.title}</h2>
        <p className="text-xs text-slate-500 mt-1 font-medium">{t.settings.subtitle}</p>
      </div>

      {/* 1. HERO PROFILE CARD */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 rounded-[28px] p-6 sm:p-7 text-white shadow-xl relative overflow-hidden">
        {/* Decorative ambient lighting */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-48 h-48 rounded-full bg-blue-400/20 blur-xl pointer-events-none" />

        {loading ? (
          <div className="flex items-center space-x-5 animate-pulse">
            <div className="w-20 h-20 rounded-full bg-white/20" />
            <div className="space-y-2 flex-1">
              <div className="h-5 w-40 bg-white/20 rounded-lg" />
              <div className="h-3.5 w-56 bg-white/20 rounded-lg" />
              <div className="h-4 w-32 bg-white/20 rounded-full" />
            </div>
          </div>
        ) : (
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-5">
              {/* Circular avatar with initials */}
              <div className="relative group cursor-pointer">
                <div className="w-20 h-20 rounded-full bg-white text-blue-700 font-extrabold text-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300 border-4 border-white/30">
                  {profile.initials}
                </div>
                <span className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-400 border-2 border-white rounded-full flex items-center justify-center text-[10px] text-slate-900 font-bold shadow-xs">
                  ✓
                </span>
              </div>

              {/* User Meta */}
              <div className="text-center sm:text-left space-y-1">
                <div className="flex items-center justify-center sm:justify-start space-x-2">
                  <h3 className="text-xl font-extrabold text-white tracking-tight">{profile.fullName}</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/90 text-slate-950 shadow-2xs flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-slate-950" /> Premium Member
                  </span>
                </div>
                <p className="text-xs text-blue-100/90 font-medium">{profile.email} • +91 {profile.phone}</p>
                <div className="flex items-center justify-center sm:justify-start space-x-3 pt-1 text-[11px] text-blue-200">
                  <span className="flex items-center gap-1 bg-white/10 px-2.5 py-0.5 rounded-lg border border-white/15">
                    <CheckCircle className="w-3 h-3 text-emerald-300" /> {t.common.verifiedProfile}
                  </span>
                  <span>Member since Sept 2026</span>
                </div>
              </div>
            </div>

            {/* Action button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/profile')}
              className="px-5 py-2.5 bg-white text-blue-700 font-bold text-xs rounded-2xl shadow-md hover:bg-blue-50 transition-all flex items-center space-x-2 cursor-pointer flex-shrink-0"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Profile</span>
            </motion.button>
          </div>
        )}
      </div>

      {/* 2. GLOBAL LANGUAGE PREFERENCES */}
      <div className="bg-white dark:bg-slate-900 rounded-[24px] p-6 shadow-soft border border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-3.5 mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center text-primary flex-shrink-0 shadow-xs">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">{t.settings.languageSectionTitle}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t.settings.languageSectionSub}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {languagesList.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <motion.button
                key={lang.code}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setLanguage(lang.code)}
                className={`relative p-4 rounded-2xl text-left border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 shadow-md shadow-blue-500/10'
                    : 'border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{lang.flag}</span>
                  {isSelected && (
                    <span className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs shadow-2xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <div>
                  <p className={`text-sm font-bold ${isSelected ? 'text-blue-700 dark:text-blue-400' : 'text-slate-900 dark:text-white'}`}>
                    {lang.name}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">{lang.desc}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* 3. APPEARANCE CARD */}
      <div className="bg-white dark:bg-slate-900 rounded-[24px] p-6 shadow-soft border border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-3.5 mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0 shadow-xs">
            <Moon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">{t.settings.appearanceTitle}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t.settings.appearanceSub}</p>
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          <ToggleSwitch 
            label="Dark Mode"
            description={matchSystem ? "Managed automatically by system theme" : "Switch UI theme to dark mode"}
            enabled={theme === 'dark'}
            onChange={handleDarkMode}
            disabled={matchSystem}
          />
          <ToggleSwitch 
            label="Match System Theme"
            description="Sync appearance with system settings"
            enabled={matchSystem}
            onChange={handleSystemTheme}
          />
          <ToggleSwitch 
            label="Compact Interface"
            description="Reduce padding and increase data density"
            enabled={compactMode}
            onChange={handleCompactMode}
          />
          <ToggleSwitch 
            label="Reduce Animations"
            description="Minimize transition motions for performance"
            enabled={reduceAnim}
            onChange={handleReduceAnim}
          />
        </div>
      </div>

      {/* 4. SECURITY & PRIVACY */}
      <div className="bg-white dark:bg-slate-900 rounded-[24px] p-6 shadow-soft border border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-3.5 mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 flex-shrink-0 shadow-xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">{t.settings.securityTitle}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Manage authentication, biometrics, and active session limits</p>
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          <ToggleSwitch 
            label="Biometric / FaceID Login"
            description="Require fingerprint or facial scan to open sensitive screens"
            enabled={biometric}
            onChange={handleBiometric}
          />
          <ToggleSwitch 
            label="Push Notifications"
            description="Receive immediate alerts for transactions and smart EMI reminders"
            enabled={pushNotif}
            onChange={handlePushNotif}
          />
          <ToggleSwitch 
            label="Email Statements & Security Alerts"
            description="Receive weekly summaries and unexpected login attempt notifications"
            enabled={emailAlerts}
            onChange={handleEmailAlerts}
          />

          <div className="py-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Session Timeout</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Auto log out inactive sessions</p>
            </div>
            <select
              value={sessionTimeout}
              onChange={(e) => handleTimeoutChange(e.target.value)}
              className="text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-600 text-slate-700 dark:text-slate-200 cursor-pointer"
            >
              <option value="15">15 Minutes</option>
              <option value="30">30 Minutes</option>
              <option value="60">60 Minutes</option>
            </select>
          </div>
        </div>
      </div>

      {/* 5. PERSONALIZATION */}
      <div className="bg-white dark:bg-slate-900 rounded-[24px] p-6 shadow-soft border border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-3.5 mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="w-10 h-10 bg-amber-50 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center text-amber-600 dark:text-amber-400 flex-shrink-0 shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">AI & Feed Personalization</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Customize what smart cards appear on your RupAI feed</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {[
            { key: 'tips', label: 'AI Financial Tips' },
            { key: 'emi', label: 'Smart EMI Reminders' },
            { key: 'invest', label: 'Investment Suggestions' },
            { key: 'budget', label: 'Budget Insights' }
          ].map((item) => {
            const active = pills[item.key];
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => togglePill(item.key)}
                className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all duration-200 flex items-center space-x-2 cursor-pointer border ${
                  active
                    ? 'bg-blue-50 dark:bg-blue-900/40 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 shadow-2xs'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200/80 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/80'
                }`}
              >
                <span>{item.label}</span>
                {active && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. ABOUT SECTION */}
      <div className="bg-white dark:bg-slate-900 rounded-[24px] p-6 shadow-soft border border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-3.5 mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="w-10 h-10 bg-sky-50 dark:bg-sky-900/30 rounded-2xl flex items-center justify-center text-sky-600 dark:text-sky-400 flex-shrink-0 shadow-xs">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">About & Support</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">App details, policies, and support resources</p>
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <div 
            onClick={() => setShowAppInfoModal(true)}
            className="py-3 flex items-center justify-between cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <span className="flex items-center gap-2"><Smartphone className="w-4 h-4 text-slate-400 dark:text-slate-500" /> App Version</span>
            <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-lg text-[11px] font-mono">v2.4.0 (Bharat Edition)</span>
          </div>
          <div 
            onClick={() => navigate('/privacy')}
            className="py-3 flex items-center justify-between cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <span className="flex items-center gap-2"><FileText className="w-4 h-4 text-slate-400 dark:text-slate-500" /> Privacy Policy</span>
            <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          </div>
          <div 
            onClick={() => navigate('/terms')}
            className="py-3 flex items-center justify-between cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-slate-400 dark:text-slate-500" /> Terms of Service</span>
            <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          </div>
          <div 
            onClick={() => navigate('/help')}
            className="py-3 flex items-center justify-between cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <span className="flex items-center gap-2"><HelpCircle className="w-4 h-4 text-slate-400 dark:text-slate-500" /> Help & Support</span>
            <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          </div>
          <div 
            onClick={() => setShowRateModal(true)}
            className="py-3 flex items-center justify-between cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <span className="flex items-center gap-2"><Star className="w-4 h-4 text-amber-500 fill-amber-400" /> Rate RupAI App</span>
            <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          </div>
        </div>
      </div>

      {/* 7. LOGOUT DANGER CARD */}
      <div className="bg-red-50/50 dark:bg-red-950/20 rounded-[24px] p-6 border border-red-100 dark:border-red-900/40 shadow-soft">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 bg-red-100 dark:bg-red-900/40 rounded-2xl flex items-center justify-center text-red-600 dark:text-red-400 flex-shrink-0 shadow-xs">
              <LogOut className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">Sign out of RupAI</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Securely log out of your session on this device</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowLogoutModal(true)}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-2xl shadow-sm transition-all cursor-pointer flex-shrink-0"
          >
            {t.settings.logoutBtn}
          </button>
        </div>
      </div>

      {/* CONFIRMATION LOGOUT MODAL */}
      <AnimatePresence>
        {showLogoutModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[28px] max-w-md w-full p-6 shadow-2xl border border-slate-100 text-center space-y-4"
            >
              <div className="w-14 h-14 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <LogOut className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Are you sure you want to sign out?</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  You will need to enter your credentials or use local demo session to access your account again.
                </p>
              </div>
              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmLogout}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-2xl transition-colors shadow-md cursor-pointer"
                >
                  Yes, Sign Out
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* RATE RUPAI MODAL */}
      <AnimatePresence>
        {showRateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-[28px] max-w-md w-full p-6 shadow-2xl border border-slate-100 relative overflow-hidden"
            >
              <button 
                type="button"
                onClick={() => { setShowRateModal(false); setRatingSubmitted(false); }}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold text-sm w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"
              >
                ✕
              </button>

              {ratingSubmitted ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto text-2xl shadow-inner">
                    🎉
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900">Thank You for Your Feedback!</h3>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                    Your rating helps us improve RupAI for millions of users across Bharat.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setShowRateModal(false); setRatingSubmitted(false); }}
                    className="mt-4 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-2xl shadow-md transition-all cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRatingSubmit} className="space-y-4 text-center">
                  <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                    <Star className="w-6 h-6 fill-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900">Rate RupAI Smart Banking</h3>
                    <p className="text-xs text-slate-500 mt-1">How has your financial experience been?</p>
                  </div>

                  {/* Interactive 5 Stars */}
                  <div className="flex justify-center items-center space-x-2 py-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setStarRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                      >
                        <Star 
                          className={`w-8 h-8 ${
                            (hoverRating || starRating) >= star 
                              ? 'text-amber-400 fill-amber-400 drop-shadow-xs' 
                              : 'text-slate-200 fill-slate-100'
                          }`} 
                        />
                      </button>
                    ))}
                  </div>

                  <p className="text-xs font-bold text-blue-600 h-5">
                    {getEmojiForRating(hoverRating || starRating)}
                  </p>

                  <div className="relative text-left">
                    <textarea
                      rows={3}
                      maxLength={200}
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      placeholder="Share your thoughts or suggest a feature (optional)..."
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-3 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none transition-all resize-none"
                    />
                    <span className="absolute bottom-2.5 right-3 text-[10px] text-slate-400 font-mono">
                      {feedbackText.length}/200
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={starRating === 0}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs rounded-2xl shadow-md transition-all cursor-pointer"
                  >
                    Submit Feedback
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* APP INFO MODAL */}
      <AnimatePresence>
        {showAppInfoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-[28px] max-w-md w-full p-6 shadow-2xl border border-slate-100 relative text-center space-y-4"
            >
              <button 
                type="button"
                onClick={() => setShowAppInfoModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold text-sm w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"
              >
                ✕
              </button>

              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-blue-600 to-blue-700 text-white flex items-center justify-center mx-auto text-2xl font-black shadow-lg">
                R
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">RupAI Smart Banking</h3>
                <p className="text-xs text-blue-600 font-bold mt-0.5">Banking for Bharat • Bharat Edition</p>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left space-y-2.5 text-xs text-slate-600 font-medium">
                <div className="flex justify-between">
                  <span className="text-slate-400">App Version</span>
                  <span className="font-bold text-slate-900">v2.4.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Build Number</span>
                  <span className="font-mono text-slate-700">2026.09.12-release</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">React Core</span>
                  <span className="font-mono text-slate-700">v18.3.1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Vite Engine</span>
                  <span className="font-mono text-slate-700">v8.3.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Environment</span>
                  <span className="text-emerald-600 font-bold">Client Local Ready</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 pt-1">
                © 2026 RupAI Technologies Private Limited. All rights reserved.
              </p>

              <button
                type="button"
                onClick={() => setShowAppInfoModal(false)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
