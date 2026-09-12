import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface LegalLayoutProps {
  title: string;
  subtitle: string;
  lastUpdated?: string;
  icon: React.ElementType;
  children: React.ReactNode;
  headerContent?: React.ReactNode;
  scrollProgress?: number;
}

export default function LegalLayout({
  title,
  subtitle,
  lastUpdated,
  icon: Icon,
  children,
  headerContent,
  scrollProgress,
}: LegalLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16 animate-in fade-in duration-300 relative">
      
      {/* Scroll Progress Bar */}
      {typeof scrollProgress === 'number' && (
        <div className="fixed top-0 left-0 w-full h-1 bg-slate-200 z-50">
          <div 
            className="h-full bg-blue-600 transition-all duration-150 ease-out" 
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      )}

      {/* 2. STICKY TOP BAR */}
      <div className="flex items-center justify-between bg-white/90 backdrop-blur-md sticky top-0 z-30 py-3.5 px-4 sm:px-6 -mx-4 sm:-mx-6 border-b border-slate-100/90 shadow-2xs">
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center space-x-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to App</span>
          </button>
          <span className="font-extrabold text-slate-900 text-sm hidden sm:block truncate max-w-[200px] md:max-w-none">
            {title}
          </span>
        </div>

        {lastUpdated && (
          <span className="text-[11px] font-semibold text-blue-700 bg-blue-50/90 border border-blue-100 px-3 py-1 rounded-full flex-shrink-0">
            Last Updated: {lastUpdated}
          </span>
        )}
      </div>

      {/* 1. HERO SECTION */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 rounded-3xl p-5 sm:p-8 text-white shadow-xl relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="w-12 h-12 bg-white/20 border border-white/30 rounded-2xl flex items-center justify-center text-white mb-2">
              <Icon className="w-6 h-6 stroke-[2.2] text-white" />
            </div>
            <h1 className="text-2.5xl sm:text-3xl font-black text-white tracking-tight">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-2xl leading-relaxed font-medium">
              {subtitle}
            </p>
          </div>

          {lastUpdated && (
            <div className="hidden sm:block text-right flex-shrink-0">
              <div className="px-3.5 py-1.5 rounded-xl bg-white/15 border border-white/30 text-white font-mono text-[11px]">
                Last Updated: {lastUpdated}
              </div>
            </div>
          )}
        </div>

        {headerContent && <div className="mt-5">{headerContent}</div>}
      </div>

      {/* MAIN CONTENT AREA */}
      <div>{children}</div>

    </div>
  );
}
