import { Bot } from 'lucide-react';
import MarkdownMessage from './MarkdownMessage';
import type { ChatMessage } from './types';

interface MessageBubbleProps {
  message: ChatMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div className={`flex justify-${message.isUser ? 'end' : 'start'} mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300`}>
      <div className={`flex items-end space-x-2 max-w-[88%] sm:max-w-xl ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        
        {/* Avatar for AI */}
        {!message.isUser && (
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-[#2563EB] text-white flex items-center justify-center shadow-xs flex-shrink-0 mb-1">
            <Bot className="w-4 h-4" />
          </div>
        )}

        {/* Message Bubble Container */}
        <div>
          <div
            className={`p-4 rounded-3xl text-sm shadow-xs ${
              message.isUser
                ? 'bg-blue-600 text-white rounded-br-xs'
                : 'bg-white border border-slate-100 text-slate-800 rounded-bl-xs'
            }`}
          >
            <MarkdownMessage content={message.text} isUser={message.isUser} />
          </div>

          {/* Timestamp */}
          <p className={`text-[10px] text-slate-400 mt-1 px-2 ${message.isUser ? 'text-right' : 'text-left'}`}>
            {message.timestamp}
          </p>
        </div>

      </div>
    </div>
  );
}
