import { Search, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useProfile } from '../context/ProfileContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { profile } = useProfile();

  return (
    <header className="bg-card dark:bg-slate-900 shadow-soft px-8 py-4 flex items-center justify-between border-b border-gray-100 dark:border-slate-800 z-10">
      <div className="flex-1 max-w-xl relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400 dark:text-slate-500" />
        </div>
        <input
          type="text"
          placeholder={t.navbar.searchPlaceholder}
          className="block w-full pl-11 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 border-transparent rounded-2xl text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-400 focus:border-primary focus:bg-white dark:focus:bg-slate-900 focus:ring-primary focus:ring-1 transition-all duration-200"
        />
      </div>
      <div className="flex items-center space-x-4">
        <button 
          type="button"
          onClick={() => navigate('/alerts')}
          className="text-gray-400 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors relative cursor-pointer"
        >
          <Bell className="h-6 w-6" />
          <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900"></span>
        </button>

        <button 
          type="button"
          onClick={() => navigate('/profile')}
          className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 text-primary flex items-center justify-center font-bold text-xs transition-colors cursor-pointer border border-primary/20 shadow-2xs"
          title={t.navbar.profileTitle}
        >
          {profile.initials}
        </button>
      </div>
    </header>
  );
}
