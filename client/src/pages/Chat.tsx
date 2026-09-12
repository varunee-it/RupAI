import { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles } from 'lucide-react';
import ChatBubble from '../components/ChatBubble';
import { sendMessage } from '../services/api';

export default function Chat() {
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([
    { text: "Hi Varun! I'm your RupAI assistant. How can I help you manage your finances today?", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi' | 'gu'>('en');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "I need education loan",
    "Show my EMI",
    "Start SIP",
    "Check balance"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { text, isUser: true }]);
    setInput('');
    setIsTyping(true);
    
    try {
      const response: any = await sendMessage(text, language);
      setMessages(prev => [...prev, { text: response.reply, isUser: false }]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto bg-card rounded-3xl shadow-soft border border-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">RupAI Assistant</h3>
            <p className="text-xs text-success flex items-center"><span className="w-2 h-2 rounded-full bg-success mr-1"></span> Online</p>
          </div>
        </div>
        <div>
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'en' | 'hi' | 'gu')}
            className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="gu">Gujarati</option>
          </select>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} message={msg} />
        ))}
        {isTyping && (
          <div className="flex justify-start mb-4">
             <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm p-4 flex space-x-1 items-center h-12 shadow-sm">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      <div className="px-6 py-3 bg-white border-t border-gray-100 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {suggestedPrompts.map((prompt, idx) => (
          <button 
            key={idx}
            onClick={() => handleSend(prompt)}
            className="flex items-center space-x-1 px-4 py-2 bg-gray-50 hover:bg-primary/5 text-gray-700 text-xs font-medium rounded-full border border-gray-200 transition-colors"
          >
            <Sparkles className="w-3 h-3 text-primary" />
            <span>{prompt}</span>
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <form 
          className="flex items-center space-x-4 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all"
          onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-transparent border-none focus:outline-none py-2 text-sm text-gray-700 placeholder-gray-400"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isTyping}
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-primary transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
