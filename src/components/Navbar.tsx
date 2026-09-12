import { Search, Bell } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="bg-card shadow-soft px-8 py-4 flex items-center justify-between border-b border-gray-100 z-10">
      <div className="flex-1 max-w-xl relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search transactions, features..."
          className="block w-full pl-11 pr-4 py-2.5 bg-gray-50 border-transparent rounded-2xl text-sm placeholder-gray-400 focus:border-primary focus:bg-white focus:ring-primary focus:ring-1 transition-all duration-200"
        />
      </div>
      <div className="flex items-center space-x-6">
        <button className="text-gray-400 hover:text-primary transition-colors relative">
          <Bell className="h-6 w-6" />
          <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>
      </div>
    </header>
  );
}
