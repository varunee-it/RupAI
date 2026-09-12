import { Bot } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-end space-x-2 max-w-[85%] sm:max-w-md">
        {/* AI Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-[#2563EB] text-white flex items-center justify-center shadow-xs flex-shrink-0 mb-1">
          <Bot className="w-4 h-4" />
        </div>

        {/* Bubble with bouncing dots & status text */}
        <div className="bg-white border border-slate-100 rounded-3xl rounded-bl-xs p-3.5 shadow-sm flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 px-1">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
          <span className="text-xs font-semibold text-slate-500">RupAI is thinking...</span>
        </div>
      </div>
    </div>
  );
}
