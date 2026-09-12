import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  amount: number | string;
  icon: LucideIcon;
  trend?: string;
  isCurrency?: boolean;
}

export default function StatCard({ title, amount, icon: Icon, trend, isCurrency = true }: StatCardProps) {
  return (
    <div className="bg-card p-6 rounded-2xl shadow-soft hover:-translate-y-1 transition-transform duration-250 cursor-pointer border border-gray-50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="p-2 bg-primary/10 rounded-xl">
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </div>
      <div className="flex items-baseline space-x-2">
        <h2 className="text-2xl font-bold text-gray-900">
          {isCurrency && '₹'}{typeof amount === 'number' ? amount.toLocaleString('en-IN') : amount}
        </h2>
        {trend && (
          <span className={`text-xs font-medium ${trend.startsWith('+') ? 'text-success' : 'text-red-500'}`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
