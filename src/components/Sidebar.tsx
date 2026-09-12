import { NavLink } from 'react-router-dom';
import { Home, MessageSquare, CreditCard, Bell, Settings as SettingsIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useProfile } from '../context/ProfileContext';

export default function Sidebar() {
  const { t } = useLanguage();
  const { profile } = useProfile();

  const navItems = [
    { icon: Home, label: t.sidebar.dashboard, path: '/dashboard' },
    { icon: MessageSquare, label: t.sidebar.chat, path: '/chat' },
    { icon: CreditCard, label: t.sidebar.loan, path: '/loan' },
    { icon: Bell, label: t.sidebar.alerts, path: '/alerts' },
    { icon: SettingsIcon, label: t.sidebar.settings, path: '/settings' },
  ];

  return (
    <div className="w-64 bg-card dark:bg-slate-900 shadow-soft flex flex-col h-full border-r border-gray-100 dark:border-slate-800">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary tracking-tight">RupAI</h1>
        <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">{t.common.appName}</p>
      </div>
      <nav className="flex-1 px-4 mt-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
                isActive
                  ? 'bg-primary text-white shadow-soft'
                  : 'text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-primary'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-100 dark:border-slate-800">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center space-x-3 p-2.5 rounded-2xl transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-primary/10 border border-primary/20'
                : 'hover:bg-gray-50 dark:hover:bg-slate-800'
            }`
          }
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-[#2563EB] text-white flex items-center justify-center font-bold text-sm shadow-xs">
            {profile.initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{profile.firstName}</p>
            <p className="text-[11px] text-primary font-medium">{t.common.verifiedProfile}</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
}
