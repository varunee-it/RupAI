import { Bot } from 'lucide-react';
import SuggestedPrompt from './SuggestedPrompt';

interface EmptyChatProps {
  prompts: string[];
  onSelectPrompt: (prompt: string) => void;
}

export default function EmptyChat({ prompts, onSelectPrompt }: EmptyChatProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-6 animate-in fade-in zoom-in-95 duration-500">
      {/* AI Illustration Badge */}
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-[#2563EB] text-white flex items-center justify-center shadow-xl">
          <Bot className="w-10 h-10" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
        </div>
      </div>

      {/* Hero Title & Subtitle */}
      <div className="space-y-2 max-w-sm">
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Ask RupAI Anything</h2>
        <p className="text-xs text-slate-500 leading-relaxed font-medium">
          Your multilingual AI financial companion for Bharat. Get smart guidance on loans, EMI, investments, and savings.
        </p>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="w-full max-w-md pt-2">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Popular Prompts</p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {prompts.map((prompt, idx) => (
            <SuggestedPrompt key={idx} prompt={prompt} onClick={onSelectPrompt} />
          ))}
        </div>
      </div>
    </div>
  );
}
