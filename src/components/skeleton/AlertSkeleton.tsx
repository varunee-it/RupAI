export default function AlertSkeleton() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="h-8 bg-slate-200 rounded-xl w-48 mb-2" />
          <div className="h-4 bg-slate-200 rounded-lg w-64" />
        </div>
        <div className="h-9 bg-slate-200 rounded-xl w-32" />
      </div>

      {/* 6 Alert Cards Placeholders */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-3xl p-5 shadow-xs flex items-start space-x-4">
            {/* Icon circle */}
            <div className="w-11 h-11 bg-slate-200 rounded-2xl flex-shrink-0" />
            {/* Content */}
            <div className="flex-1 space-y-2.5">
              <div className="flex items-center justify-between">
                {/* Title line */}
                <div className="h-4 bg-slate-200 rounded-md w-1/3" />
                {/* Timestamp placeholder */}
                <div className="h-3 bg-slate-200 rounded-md w-16" />
              </div>
              {/* Description line */}
              <div className="h-3 bg-slate-200 rounded-md w-5/6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
