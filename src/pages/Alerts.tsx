import { useEffect, useState } from 'react';
import AlertCard from '../components/AlertCard';
import { getAlerts } from '../services/api';

export default function Alerts() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      const data = await getAlerts();
      setAlerts(data);
      setLoading(false);
    };
    fetchAlerts();
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Notifications & Alerts</h2>
          <p className="text-sm text-gray-500 mt-1">Stay updated with your financial activity.</p>
        </div>
        <button className="text-sm font-medium text-primary hover:text-blue-700 bg-primary/10 px-4 py-2 rounded-xl transition-colors">
          Mark all as read
        </button>
      </div>
      
      <div className="space-y-4">
        {alerts.length > 0 ? (
          alerts.map(alert => (
            <AlertCard key={alert.id} alert={alert} />
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-gray-100">
            <p className="text-gray-500">No new alerts.</p>
          </div>
        )}
      </div>
    </div>
  );
}
