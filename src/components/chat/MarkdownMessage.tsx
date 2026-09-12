import React from 'react';

interface MarkdownMessageProps {
  content: string;
  isUser?: boolean;
}

export default function MarkdownMessage({ content, isUser }: MarkdownMessageProps) {
  // Simple, fast Markdown parser supporting bold, bullet lists, numbered lists, inline code, and links
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    
    return lines.map((line, lineIdx) => {
      // Bullet list item
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const bulletContent = line.trim().substring(2);
        return (
          <li key={lineIdx} className="ml-4 list-disc my-0.5">
            {formatInline(bulletContent, isUser)}
          </li>
        );
      }

      // Numbered list item
      const numMatch = line.trim().match(/^(\d+)\.\s+(.*)/);
      if (numMatch) {
        return (
          <li key={lineIdx} className="ml-4 list-decimal my-0.5">
            {formatInline(numMatch[2], isUser)}
          </li>
        );
      }

      // Empty line -> break
      if (!line.trim()) {
        return <div key={lineIdx} className="h-2" />;
      }

      // Normal paragraph line
      return (
        <p key={lineIdx} className="my-1 leading-relaxed">
          {formatInline(line, isUser)}
        </p>
      );
    });
  };

  const formatInline = (text: string, isUser?: boolean) => {
    // Regex for bold **text**, inline `code`, and links [text](url)
    const parts = text.split(/(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g);
    
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code 
            key={i} 
            className={`px-1.5 py-0.5 rounded text-xs font-mono ${
              isUser ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-800 border border-slate-200'
            }`}
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        return (
          <a
            key={i}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className={`underline font-semibold ${isUser ? 'text-white' : 'text-blue-600 hover:text-blue-800'}`}
          >
            {linkMatch[1]}
          </a>
        );
      }
      return part;
    });
  };

  return <div className="markdown-content text-sm">{renderFormattedText(content)}</div>;
}
