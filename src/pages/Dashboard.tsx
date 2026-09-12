import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, PiggyBank, Target, RefreshCw, AlertCircle } from 'lucide-react';
import StatCard from '../components/StatCard';
import TransactionCard from '../components/TransactionCard';
import RecommendationCard from '../components/RecommendationCard';
import { getDashboard, getTransactions, getRecommendations } from '../services/api';
import DashboardSkeleton from '../components/skeleton/DashboardSkeleton';
import { useLanguage } from '../context/LanguageContext';
import { useProfile } from '../context/ProfileContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { profile } = useProfile();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const [dbData, txData, recData] = await Promise.all([
        getDashboard(),
        getTransactions(),
        getRecommendations()
      ]);
      
      setDashboardData(dbData);
      setTransactions(txData);
      setRecommendations(recData);
    } catch (err: any) {
      console.error("Failed to load dashboard data:", err);
      setError(err.message || "Failed to load dashboard data. Please make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 1. Loading State
  if (loading) {
    return <DashboardSkeleton />;
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
          onClick={fetchData}
          className="inline-flex items-center space-x-2 px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-2xl hover:bg-blue-700 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-4 h-4 animate-spin-hover" />
          <span>{t.common.retry}</span>
        </button>
      </div>
    );
  }

  // 3. Success Render
  if (!dashboardData) return null;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="bg-primary rounded-3xl p-8 text-white shadow-soft relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-10"></div>
        <div className="relative z-10 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-light opacity-90 mb-1">{t.dashboard.welcomeBack} {profile.firstName}</h1>
            <p className="text-5xl font-bold tracking-tight">₹{dashboardData.balance?.toLocaleString('en-IN') ?? 0}</p>
            <p className="text-blue-100 mt-2 text-sm">{t.dashboard.totalBalance}</p>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-4 border-success/30 bg-white">
              <span className="text-xl font-bold text-success">{dashboardData.healthScore ?? 90}</span>
            </div>
            <p className="text-blue-100 mt-2 text-sm">{t.dashboard.healthScore}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title={t.dashboard.monthlyIncome} amount={dashboardData.income ?? 0} icon={TrendingUp} trend="+5%" />
        <StatCard title={t.dashboard.monthlyExpense} amount={dashboardData.expenses ?? 0} icon={TrendingDown} trend="-2%" />
        <StatCard title={t.dashboard.savings} amount={dashboardData.savings ?? 0} icon={PiggyBank} trend="+12%" />
        <StatCard title={t.dashboard.emiStatus} amount={"On Track"} icon={Target} isCurrency={false} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recommendations */}
        <div className="lg:col-span-2 space-y-6">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">{t.dashboard.aiInsights}</h3>
            </div>
            <div className="space-y-4">
              {recommendations.map(rec => (
                <RecommendationCard key={rec._id || rec.id} recommendation={rec} />
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Transactions */}
        <div className="lg:col-span-1 space-y-6">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">{t.dashboard.recentTransactions}</h3>
              <button className="text-sm text-primary font-medium">{t.dashboard.viewAll}</button>
            </div>
            <div className="bg-card rounded-3xl p-4 shadow-soft border border-gray-50">
              {transactions.slice(0, 5).map(tx => (
                <TransactionCard key={tx._id || tx.id} transaction={tx} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
