import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Globe, 
  ShieldCheck, 
  Smartphone, 
  ChevronRight, 
  LogOut,
  Sparkles,
  Edit3,
  CheckCircle,
  RotateCcw
} from 'lucide-react';
import ToggleSwitch from '../components/ToggleSwitch';
import { useProfile } from '../context/ProfileContext';
import { useLanguage } from '../context/LanguageContext';
import type { LanguageCode } from '../context/LanguageContext';

export default function Profile() {
  const navigate = useNavigate();
  const { profile, updateProfile, resetProfile } = useProfile();
  const { language, setLanguage, t } = useLanguage();

  // Form state
  const [formData, setFormData] = useState({
    fullName: profile.fullName,
    email: profile.email,
    phone: profile.phone,
    city: profile.city,
    occupation: profile.occupation
  });

  // Sync form state when profile changes in context (e.g. after reset)
  useEffect(() => {
    setFormData({
      fullName: profile.fullName,
      email: profile.email,
      phone: profile.phone,
      city: profile.city,
      occupation: profile.occupation
    });
  }, [profile]);

  // Toast / Feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Local state for preferences
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);

  // Local state for security toggles
  const [biometric, setBiometric] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!formData.fullName.trim()) {
      setErrorMessage('Full Name is required');
      return;
    }
    if (!formData.email.trim()) {
      setErrorMessage('Email Address is required');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('Phone Number is required');
      return;
    }

    updateProfile(formData);
    setToastMessage('Profile updated successfully');
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleReset = () => {
    resetProfile();
    setErrorMessage(null);
    setToastMessage('Demo profile restored');
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center space-x-2 text-xs font-bold animate-bounce">
          <CheckCircle className="w-4 h-4 text-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2.5xl font-bold text-gray-900 dark:text-white tracking-tight">Profile & Settings</h2>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Manage your account preferences and security options</p>
        </div>
      </div>

      {/* Two Column Desktop Layout (35% / 65%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* LEFT PANEL: Profile Card (35% -> lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-card dark:bg-slate-900 rounded-3xl p-6 shadow-soft border border-gray-50 dark:border-slate-800 text-center flex flex-col items-center">
            {/* Circular Avatar */}
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-[#2563EB] text-white text-3xl font-extrabold flex items-center justify-center shadow-lg border-4 border-white dark:border-slate-800">
                {profile.initials}
              </div>
              <div className="absolute bottom-0 right-0 w-7 h-7 bg-emerald-500 text-white rounded-full flex items-center justify-center border-2 border-white dark:border-slate-800 shadow-xs">
                <CheckCircle className="w-4 h-4" />
              </div>
            </div>

            {/* User Info */}
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{profile.fullName}</h3>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{profile.email}</p>
            <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">+91 {profile.phone}</p>

            {/* Verified Badge */}
            <div className="mt-4 inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-primary dark:text-blue-400 text-xs font-bold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Verified RupAI Member</span>
            </div>

            {/* Edit Avatar Button */}
            <button 
              type="button"
              className="mt-6 w-full py-2.5 px-4 rounded-2xl border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 text-xs font-semibold hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Edit3 className="w-4 h-4 text-gray-500 dark:text-slate-400" />
              <span>Edit Profile Avatar</span>
            </button>
          </div>

          {/* Quick Account Summary Card */}
          <div className="bg-card dark:bg-slate-900 rounded-3xl p-5 shadow-soft border border-gray-50 dark:border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Account Stats</h4>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600 dark:text-slate-400">Member Since</span>
              <span className="font-bold text-gray-900 dark:text-white">Sept 2026</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600 dark:text-slate-400">KYC Status</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">Completed</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600 dark:text-slate-400">Occupation</span>
              <span className="font-bold text-gray-900 dark:text-white">{profile.occupation || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600 dark:text-slate-400">City</span>
              <span className="font-bold text-gray-900 dark:text-white">{profile.city || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Settings Sections (65% -> lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-6">

          {/* SECTION 1: Personal Information */}
          <div className="bg-card dark:bg-slate-900 rounded-3xl p-6 shadow-soft border border-gray-50 dark:border-slate-800">
            <div className="flex items-center space-x-3 mb-5">
              <div className="w-9 h-9 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Personal Information</h3>
                <p className="text-xs text-gray-500 dark:text-slate-400">Update your account identity details</p>
              </div>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-xs font-semibold rounded-2xl">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSaveInfo} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full h-11 rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 px-3.5 text-xs text-gray-900 dark:text-white focus:border-primary focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full h-11 rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 px-3.5 text-xs text-gray-900 dark:text-white focus:border-primary focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full h-11 rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 px-3.5 text-xs text-gray-900 dark:text-white focus:border-primary focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full h-11 rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 px-3.5 text-xs text-gray-900 dark:text-white focus:border-primary focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">Occupation</label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className="w-full h-11 rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 px-3.5 text-xs text-gray-900 dark:text-white focus:border-primary focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2.5 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300 rounded-2xl text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-gray-500 dark:text-slate-400" />
                  <span>Reset Demo Profile</span>
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-primary hover:bg-blue-700 text-white rounded-2xl text-xs font-semibold shadow-soft transition-all cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          {/* SECTION 2: Preferences */}
          <div className="bg-card dark:bg-slate-900 rounded-3xl p-6 shadow-soft border border-gray-50 dark:border-slate-800">
            <div className="flex items-center space-x-3 mb-5">
              <div className="w-9 h-9 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Preferences & Alerts</h3>
                <p className="text-xs text-gray-500 dark:text-slate-400">Configure app language and notification rules</p>
              </div>
            </div>

            <div className="space-y-4 divide-y divide-gray-100 dark:divide-slate-800">
              {/* Language Selector */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">App Language</p>
                  <p className="text-xs text-gray-500 dark:text-slate-400">Select interface language</p>
                </div>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                  className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 dark:text-white focus:outline-none focus:border-primary cursor-pointer"
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi (हिंदी)</option>
                  <option value="gu">Gujarati (ગુજરાતી)</option>
                </select>
              </div>

              {/* Notification Toggles */}
              <div className="pt-3">
                <ToggleSwitch
                  enabled={notifications}
                  onChange={setNotifications}
                  label="Push Notifications"
                  description="Receive instant alerts for transactions and security"
                />
              </div>

              <div className="pt-3">
                <ToggleSwitch
                  enabled={emailAlerts}
                  onChange={setEmailAlerts}
                  label="Email Statements & Alerts"
                  description="Get monthly statements & fraud alerts via email"
                />
              </div>

              <div className="pt-3">
                <ToggleSwitch
                  enabled={smsAlerts}
                  onChange={setSmsAlerts}
                  label="SMS Notifications"
                  description="Standard carrier charges may apply"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: Security */}
          <div className="bg-card dark:bg-slate-900 rounded-3xl p-6 shadow-soft border border-gray-50 dark:border-slate-800">
            <div className="flex items-center space-x-3 mb-5">
              <div className="w-9 h-9 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Security & Authentication</h3>
                <p className="text-xs text-gray-500 dark:text-slate-400">Manage password and login protection</p>
              </div>
            </div>

            <div className="space-y-4 divide-y divide-gray-100 dark:divide-slate-800">
              <div className="flex items-center justify-between pt-2">
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Password</p>
                  <p className="text-xs text-gray-500 dark:text-slate-400">Last changed 30 days ago</p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="px-4 py-2 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300 rounded-xl text-xs font-semibold border border-gray-200 dark:border-slate-700 transition-colors cursor-pointer"
                >
                  Change Password
                </button>
              </div>

              <div className="pt-3">
                <ToggleSwitch
                  enabled={biometric}
                  onChange={setBiometric}
                  label="Biometric / Touch ID Login"
                  description="Fast login using device fingerprint"
                />
              </div>

              <div className="pt-3">
                <ToggleSwitch
                  enabled={twoFactor}
                  onChange={setTwoFactor}
                  label="Two-Factor Authentication (2FA)"
                  description="Require OTP code for every login attempt"
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: App & Legal */}
          <div className="bg-card dark:bg-slate-900 rounded-3xl p-6 shadow-soft border border-gray-50 dark:border-slate-800">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-9 h-9 bg-amber-50 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">App Information</h3>
                <p className="text-xs text-gray-500 dark:text-slate-400">RupAI platform information</p>
              </div>
            </div>

            <div className="space-y-2 divide-y divide-gray-100 dark:divide-slate-800">
              <div className="flex items-center justify-between py-2 text-xs">
                <span className="font-semibold text-gray-700 dark:text-slate-300">App Theme</span>
                <span className="font-bold text-primary dark:text-blue-400">Adaptive Theme</span>
              </div>
              <div className="flex items-center justify-between py-2.5 text-xs">
                <span className="font-semibold text-gray-700 dark:text-slate-300">App Version</span>
                <span className="font-bold text-gray-500 dark:text-slate-400">v1.2.0 (Build 2026)</span>
              </div>
              <a href="/privacy" className="flex items-center justify-between py-2.5 text-xs hover:bg-gray-50 dark:hover:bg-slate-800 rounded-xl px-2 transition-colors">
                <span className="font-semibold text-gray-700 dark:text-slate-300">Privacy Policy</span>
                <ChevronRight className="w-4 h-4 text-gray-400 dark:text-slate-500" />
              </a>
              <a href="/terms" className="flex items-center justify-between py-2.5 text-xs hover:bg-gray-50 dark:hover:bg-slate-800 rounded-xl px-2 transition-colors">
                <span className="font-semibold text-gray-700 dark:text-slate-300">Terms & Conditions</span>
                <ChevronRight className="w-4 h-4 text-gray-400 dark:text-slate-500" />
              </a>
            </div>
          </div>

          {/* BOTTOM SECTION: Full-width Red Outlined Logout Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full py-4 rounded-3xl border-2 border-red-500 dark:border-red-600 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 font-bold text-sm transition-all shadow-sm flex items-center justify-center space-x-2 cursor-pointer"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout Account</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

