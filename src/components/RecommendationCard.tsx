interface RecommendationCardProps {
  recommendation: {
    id: number;
    title: string;
    description: string;
    score: string;
    type: string;
  };
}

export default function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const isPositive = recommendation.type === 'positive';
  
  return (
    <div className="bg-gradient-to-br from-card to-gray-50 p-5 rounded-2xl shadow-soft border border-gray-100 flex items-start space-x-4 mb-4">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-gray-900">{recommendation.title}</h4>
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${isPositive ? 'bg-success/10 text-success' : 'bg-red-100 text-red-600'}`}>
            {recommendation.score} Health Score
          </span>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">{recommendation.description}</p>
      </div>
    </div>
  );
}
