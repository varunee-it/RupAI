import { NavLink } from 'react-router-dom';
import { Home, MessageSquare, CreditCard, Bell } from 'lucide-react';

export default function Sidebar() {
  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: MessageSquare, label: 'AI Chat', path: '/chat' },
    { icon: CreditCard, label: 'Loan Journey', path: '/loan' },
    { icon: Bell, label: 'Alerts', path: '/alerts' },
  ];

  return (
    <div className="w-64 bg-card shadow-soft flex flex-col h-full border-r border-gray-100">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary tracking-tight">RupAI</h1>
        <p className="text-sm text-gray-500 mt-1">Banking for Bharat</p>
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
                  : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-6 border-t border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
            V
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Varun</p>
            <p className="text-xs text-gray-500">Premium User</p>
          </div>
        </div>
      </div>
    </div>
  );
}
