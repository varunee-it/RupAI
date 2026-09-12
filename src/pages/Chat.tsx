import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot } from 'lucide-react';
import MessageBubble from '../components/chat/MessageBubble';
import type { ChatMessage } from '../components/chat/types';
import TypingIndicator from '../components/chat/TypingIndicator';
import SuggestedPrompt from '../components/chat/SuggestedPrompt';
import ChatInput from '../components/chat/ChatInput';
import EmptyChat from '../components/chat/EmptyChat';
import ChatSkeleton from '../components/skeleton/ChatSkeleton';
import { streamResponse } from '../components/chat/streamUtil';
import { sendMessage } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { useProfile } from '../context/ProfileContext';

export default function Chat() {
  const navigate = useNavigate();
  const { t, currentLanguage } = useLanguage();
  const { profile } = useProfile();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    t.chat.prompts.balance,
    t.chat.prompts.emi,
    t.chat.prompts.sip,
    t.chat.prompts.loan,
    t.chat.prompts.credit
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Initial load simulation
    const timer = setTimeout(() => {
      const formattedWelcome = t.chat.welcomeMessage.replace('Varun', profile.firstName);
      setMessages([
        {
          id: 'welcome-msg',
          text: formattedWelcome,
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsInitialLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [navigate, profile.firstName, t.chat.welcomeMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isStreaming]);

  // Handle User Sending a Message
  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping || isStreaming) return;

    const userTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: userTimestamp
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // AI Responses repository based on prompts
    let replyText = "Based on your financial profile, your balance is **₹1,25,000** and your monthly savings are on track. You are eligible for an instant **₹5,00,000** pre-approved personal loan at **10.5% p.a.**";

    if (text.toLowerCase().includes('balance') || text.includes('બેલેન્સ') || text.includes('बैलेंस')) {
      replyText = "Your current total account balance is **₹1,25,000** across your savings and investment wallets. You have saved **₹23,000** this month! 📈";
    } else if (text.toLowerCase().includes('emi') || text.includes('ઈએમઆઈ') || text.includes('ईएमआई')) {
      replyText = "You have **1 active EMI**:\n- **Home Loan EMI**: ₹15,000 due on **15th Sept 2026**.\nStatus: **On Track** ✅";
    } else if (text.toLowerCase().includes('sip') || text.includes('એસઆઈપી') || text.includes('एसआईपी')) {
      replyText = "Starting a Mutual Fund SIP of **₹5,00,000/month** could grow your wealth to **₹8.2 Lakhs** in 5 years at an estimated 12% annual return. Would you like to review recommended funds?";
    } else if (text.toLowerCase().includes('loan') || text.includes('લોન') || text.includes('लोन')) {
      replyText = "Great news! You are eligible for an **Education / Personal Loan** up to **₹5,00,000** with instant 100% digital verification. Navigate to the **Loan Journey** tab to apply!";
    } else if (text.toLowerCase().includes('credit') || text.includes('ક્રેડિટ') || text.includes('क्रेडिट')) {
      replyText = "Your current Credit Score is **785 (Excellent)**. You belong to the **top 18%** of creditworthy users in Bharat! 🏆";
    }

    // Optional API call attempt with fallback
    try {
      const apiRes: any = await sendMessage(text, currentLanguage);
      if (apiRes && apiRes.reply) {
        replyText = apiRes.reply;
      }
    } catch (e) {
      console.log("Using local AI engine for chat streaming:", e);
    }

    // 1. Show Typing Indicator for 1.2s
    setTimeout(() => {
      setIsTyping(false);
      setIsStreaming(true);

      const aiMsgId = (Date.now() + 1).toString();
      const aiTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      // Add empty placeholder AI message
      setMessages((prev) => [
        ...prev,
        { id: aiMsgId, text: '', isUser: false, timestamp: aiTimestamp }
      ]);

      // 2. Character-by-character Streaming
      streamResponse(
        replyText,
        (currentChunk) => {
          setMessages((prev) =>
            prev.map((msg) => (msg.id === aiMsgId ? { ...msg, text: currentChunk } : msg))
          );
        },
        () => {
          setIsStreaming(false);
        },
        20 // speed ms per char
      );
    }, 1200);
  };

  if (isInitialLoading) {
    return <ChatSkeleton />;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-7.5rem)] max-w-4xl mx-auto bg-white rounded-3xl shadow-soft border border-slate-100 overflow-hidden">
      
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-slate-100 flex items-center justify-between flex-shrink-0 z-10">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-[#2563EB] text-white flex items-center justify-center shadow-xs">
              <Bot className="w-5 h-5" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">{t.chat.assistantTitle}</h3>
            <p className="text-[11px] text-emerald-600 font-medium flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
              {t.chat.onlineBadge}
            </p>
          </div>
        </div>
      </div>

      {/* Middle Scrollable Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/40">
        {messages.length === 0 ? (
          <EmptyChat prompts={suggestedPrompts} onSelectPrompt={handleSend} />
        ) : (
          <>
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Suggested Prompt Chips */}
      {messages.length > 0 && (
        <div className="px-4 sm:px-6 py-2.5 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide flex-shrink-0">
          {suggestedPrompts.map((prompt, idx) => (
            <SuggestedPrompt key={idx} prompt={prompt} onClick={handleSend} />
          ))}
        </div>
      )}

      {/* Bottom Multiline Input */}
      <div className="flex-shrink-0">
        <ChatInput 
          input={input} 
          setInput={setInput} 
          onSend={handleSend} 
          disabled={isTyping || isStreaming} 
        />
      </div>

    </div>
  );
}
