import * as Icons from 'lucide-react';

interface AlertCardProps {
  alert: {
    id: number;
    title: string;
    description: string;
    time: string;
    severity: string;
    icon: string;
  };
}

export default function AlertCard({ alert }: AlertCardProps) {
  const IconComponent = (Icons as any)[alert.icon] || Icons.Bell;
  
  const severityColors: Record<string, string> = {
    red: 'bg-red-50 border-red-100 text-red-600',
    orange: 'bg-orange-50 border-orange-100 text-orange-600',
    blue: 'bg-blue-50 border-blue-100 text-blue-600',
    yellow: 'bg-yellow-50 border-yellow-100 text-yellow-600',
  };
  
  const iconColors: Record<string, string> = {
    red: 'text-red-500',
    orange: 'text-orange-500',
    blue: 'text-blue-500',
    yellow: 'text-yellow-500',
  };

  return (
    <div className={`flex items-start space-x-4 p-5 rounded-2xl border ${severityColors[alert.severity]} mb-4 shadow-sm`}>
      <div className="mt-1">
        <IconComponent className={`w-6 h-6 ${iconColors[alert.severity]}`} />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-900">{alert.title}</h4>
          <span className="text-xs text-gray-500">{alert.time}</span>
        </div>
        <p className="text-sm mt-1 text-gray-700">{alert.description}</p>
      </div>
    </div>
  );
}
