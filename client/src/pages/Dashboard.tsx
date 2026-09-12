import { useEffect, useState } from 'react';
import { Wallet, TrendingUp, TrendingDown, PiggyBank, Target } from 'lucide-react';
import StatCard from '../components/StatCard';
import TransactionCard from '../components/TransactionCard';
import RecommendationCard from '../components/RecommendationCard';
import { getDashboard, getTransactions, getRecommendations } from '../services/api';

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const dbData = await getDashboard();
      const txData = await getTransactions();
      const recData = await getRecommendations();
      
      setDashboardData(dbData);
      setTransactions(txData);
      setRecommendations(recData);
    };
    fetchData();
  }, []);

  if (!dashboardData) return <div className="p-8">Loading...</div>;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="bg-primary rounded-3xl p-8 text-white shadow-soft relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-10"></div>
        <div className="relative z-10 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-light opacity-90 mb-1">Welcome back, Varun</h1>
            <p className="text-5xl font-bold tracking-tight">₹{dashboardData.balance.toLocaleString('en-IN')}</p>
            <p className="text-blue-100 mt-2 text-sm">Total Balance</p>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-4 border-success/30 bg-white">
              <span className="text-xl font-bold text-success">{dashboardData.healthScore}</span>
            </div>
            <p className="text-blue-100 mt-2 text-sm">Health Score</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Monthly Income" amount={dashboardData.income} icon={TrendingUp} trend="+5%" />
        <StatCard title="Monthly Expense" amount={dashboardData.expenses} icon={TrendingDown} trend="-2%" />
        <StatCard title="Savings" amount={dashboardData.savings} icon={PiggyBank} trend="+12%" />
        <StatCard title="EMI Status" amount={"On Track"} icon={Target} isCurrency={false} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recommendations */}
        <div className="lg:col-span-2 space-y-6">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">AI Insights & Recommendations</h3>
            </div>
            <div className="space-y-4">
              {recommendations.map(rec => (
                <RecommendationCard key={rec.id} recommendation={rec} />
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Transactions */}
        <div className="lg:col-span-1 space-y-6">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>
              <button className="text-sm text-primary font-medium">View All</button>
            </div>
            <div className="bg-card rounded-3xl p-4 shadow-soft border border-gray-50">
              {transactions.slice(0, 5).map(tx => (
                <TransactionCard key={tx.id} transaction={tx} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
