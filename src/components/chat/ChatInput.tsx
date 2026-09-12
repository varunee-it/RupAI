import React, { useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSend: (text: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ input, setInput, onSend, disabled }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !disabled) {
        onSend(input);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input);
    }
  };

  return (
    <div className="p-3 sm:p-4 bg-white border-t border-slate-100">
      <form 
        onSubmit={handleSubmit}
        className="flex items-end space-x-3 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all"
      >
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask RupAI about your finances... (Shift + Enter for new line)"
          disabled={disabled}
          className="flex-1 bg-transparent border-none focus:outline-none text-xs sm:text-sm text-slate-800 placeholder-slate-400 resize-none max-h-32 py-1 leading-relaxed"
        />

        <button 
          type="submit"
          disabled={!input.trim() || disabled}
          className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center disabled:opacity-40 disabled:hover:bg-blue-600 transition-colors shadow-sm cursor-pointer flex-shrink-0 mb-0.5"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
