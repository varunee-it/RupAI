export default function ChatSkeleton() {
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto bg-white rounded-3xl shadow-soft border border-slate-100 overflow-hidden animate-pulse">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Assistant avatar */}
          <div className="w-10 h-10 bg-slate-200 rounded-full" />
          <div className="space-y-1.5">
            <div className="h-4 bg-slate-200 rounded-md w-28" />
            <div className="h-3 bg-slate-200 rounded-md w-16" />
          </div>
        </div>
        <div className="h-8 bg-slate-200 rounded-lg w-24" />
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-6 space-y-4 bg-slate-50/50">
        {/* Incoming bubble 1 */}
        <div className="flex justify-start">
          <div className="h-16 bg-slate-200 rounded-2xl rounded-tl-sm w-3/4 max-w-md" />
        </div>

        {/* Outgoing bubble 1 */}
        <div className="flex justify-end">
          <div className="h-12 bg-blue-200/60 rounded-2xl rounded-tr-sm w-1/2 max-w-xs" />
        </div>

        {/* Incoming bubble 2 */}
        <div className="flex justify-start">
          <div className="h-20 bg-slate-200 rounded-2xl rounded-tl-sm w-4/5 max-w-lg" />
        </div>

        {/* Outgoing bubble 2 */}
        <div className="flex justify-end">
          <div className="h-12 bg-blue-200/60 rounded-2xl rounded-tr-sm w-2/5 max-w-xs" />
        </div>

        {/* Incoming bubble 3 */}
        <div className="flex justify-start">
          <div className="h-14 bg-slate-200 rounded-2xl rounded-tl-sm w-2/3 max-w-sm" />
        </div>

        {/* Typing indicator with animated dots placeholder */}
        <div className="flex justify-start pt-2">
          <div className="h-10 bg-slate-200 rounded-2xl rounded-tl-sm w-20 flex items-center justify-center space-x-1 px-3">
            <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>

      {/* Suggested prompts placeholder */}
      <div className="px-6 py-3 border-t border-slate-100 flex gap-2 overflow-x-auto">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-8 bg-slate-200 rounded-full w-28 flex-shrink-0" />
        ))}
      </div>

      {/* Input field placeholder */}
      <div className="p-4 border-t border-slate-100">
        <div className="h-12 bg-slate-200 rounded-2xl w-full" />
      </div>
    </div>
  );
}
