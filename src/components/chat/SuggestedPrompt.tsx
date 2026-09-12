import { Sparkles } from 'lucide-react';

interface SuggestedPromptProps {
  prompt: string;
  onClick: (prompt: string) => void;
}

export default function SuggestedPrompt({ prompt, onClick }: SuggestedPromptProps) {
  return (
    <button 
      type="button"
      onClick={() => onClick(prompt)}
      className="flex items-center space-x-1.5 px-4 py-2 bg-white hover:bg-blue-50/80 text-slate-700 hover:text-blue-600 text-xs font-semibold rounded-full border border-slate-200/80 hover:border-blue-200 transition-all shadow-2xs hover:shadow-xs flex-shrink-0 cursor-pointer"
    >
      <Sparkles className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
      <span>{prompt}</span>
    </button>
  );
}
