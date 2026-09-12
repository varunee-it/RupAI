interface ChatBubbleProps {
  message: {
    text: string;
    isUser: boolean;
  };
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const { text, isUser } = message;
  
  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[75%] rounded-2xl p-4 shadow-sm ${isUser ? 'bg-primary text-white rounded-tr-sm' : 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm'}`}>
        <p className="text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
