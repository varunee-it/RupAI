export default function TransactionSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-100 shadow-2xs">
          <div className="flex items-center space-x-3">
            {/* Circular icon */}
            <div className="w-10 h-10 bg-slate-200 rounded-full flex-shrink-0" />
            <div className="space-y-1.5">
              {/* Merchant name */}
              <div className="h-4 bg-slate-200 rounded-md w-28" />
              {/* Date */}
              <div className="h-3 bg-slate-200 rounded-md w-16" />
            </div>
          </div>
          <div className="text-right space-y-1.5">
            {/* Amount */}
            <div className="h-4 bg-slate-200 rounded-md w-20 ml-auto" />
            {/* Status badge placeholder */}
            <div className="h-3 bg-slate-200 rounded-full w-14 ml-auto" />
          </div>
        </div>
      ))}
    </div>
  );
}
