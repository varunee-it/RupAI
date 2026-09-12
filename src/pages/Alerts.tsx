import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, AlertCircle } from 'lucide-react';
import AlertCard from '../components/AlertCard';
import { getAlerts } from '../services/api';
import AlertSkeleton from '../components/skeleton/AlertSkeleton';
import { useLanguage } from '../context/LanguageContext';

export default function Alerts() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlerts = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await getAlerts();
      setAlerts(data);
    } catch (err: any) {
      console.error("Failed to load alerts:", err);
      setError(err.message || "Failed to load notifications. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  // 1. Loading State
  if (loading) {
    return <AlertSkeleton />;
  }

  // 2. Error State
  if (error) {
    return (
      <div className="max-w-xl mx-auto my-12 p-8 bg-white rounded-3xl border border-red-100 shadow-soft text-center space-y-4">
        <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">{t.common.errorTitle}</h3>
        <p className="text-sm text-gray-500">{error}</p>
        <button
          onClick={fetchAlerts}
          className="inline-flex items-center space-x-2 px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-2xl hover:bg-blue-700 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>{t.common.retry}</span>
        </button>
      </div>
    );
  }

  // 3. Success Render
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t.alerts.title}</h1>
          <p className="text-sm text-gray-500 mt-1">{t.alerts.subtitle}</p>
        </div>
        <button className="text-sm font-medium text-primary hover:text-blue-700 bg-primary/10 px-4 py-2 rounded-xl transition-colors">
          Mark all as read
        </button>
      </div>
      
      <div className="space-y-4">
        {alerts.length > 0 ? (
          alerts.map(alert => (
            <AlertCard key={alert._id || alert.id} alert={alert} />
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
