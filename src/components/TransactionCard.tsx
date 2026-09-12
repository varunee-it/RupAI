interface TransactionCardProps {
  transaction: {
    id: number;
    title: string;
    amount: number;
    date: string;
    category: string;
  };
}

export default function TransactionCard({ transaction }: TransactionCardProps) {
  const isPositive = transaction.amount > 0;
  const initial = transaction.title.charAt(0);

  return (
    <div className="flex items-center justify-between p-4 bg-card rounded-2xl mb-3 shadow-sm hover:shadow-soft transition-shadow duration-200">
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold ${isPositive ? 'bg-success/10 text-success' : 'bg-gray-100 text-gray-600'}`}>
          {initial}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{transaction.title}</h4>
          <p className="text-xs text-gray-500">{new Date(transaction.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })} • {transaction.category}</p>
        </div>
      </div>
      <div className={`font-bold ${isPositive ? 'text-success' : 'text-gray-900'}`}>
        {isPositive ? '+' : '-'}₹{Math.abs(transaction.amount).toLocaleString('en-IN')}
      </div>
    </div>
  );
}
