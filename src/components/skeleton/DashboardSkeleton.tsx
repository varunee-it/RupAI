export default function DashboardSkeleton() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-pulse">
      {/* Search & Header placeholder */}
      <div className="flex items-center justify-between gap-4">
        <div className="h-10 bg-slate-200 rounded-2xl w-full max-w-sm" />
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-slate-200 rounded-full" />
          <div className="w-10 h-10 bg-slate-200 rounded-full" />
        </div>
      </div>

      {/* Hero Banner Section */}
      <div className="bg-slate-200 h-44 rounded-3xl p-8 relative overflow-hidden" />

      {/* 4 Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-slate-200 rounded-3xl p-5 flex flex-col justify-between" />
        ))}
      </div>

      {/* Main Grid: AI Recommendations & Recent Transactions / Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recommendations & Spending Chart */}
        <div className="lg:col-span-2 space-y-6">
          <div className="h-7 bg-slate-200 rounded-xl w-48 mb-4" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 bg-slate-200 rounded-3xl" />
            ))}
          </div>

          {/* Spending Chart Placeholder */}
          <div className="h-64 bg-slate-200 rounded-3xl mt-6 p-6" />
        </div>

        {/* Right Column: Recent Transactions */}
        <div className="lg:col-span-1 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <div className="h-7 bg-slate-200 rounded-xl w-36" />
            <div className="h-5 bg-slate-200 rounded-xl w-16" />
          </div>
          <div className="bg-slate-200/60 rounded-3xl p-4 space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-slate-200 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
