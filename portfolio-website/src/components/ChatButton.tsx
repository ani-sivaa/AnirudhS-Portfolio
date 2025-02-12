'use client';

import { Bot } from "lucide-react"
import { useLanguage } from '@/contexts/LanguageContext';

export default function ChatButton({ onClick }: { onClick: () => void }) {
  const { language } = useLanguage();

  return (
    <button
      onClick={onClick}
      className="fixed right-6 bottom-6 flex items-center gap-2 
        bg-gradient-to-r from-[#0FF0FC] to-[#0082FF]
        hover:from-[#0082FF] hover:to-[#0FF0FC]
        px-6 py-3 rounded-full text-white
        shadow-[0_0_15px_rgba(15,240,252,0.3)]
        hover:shadow-[0_0_20px_rgba(15,240,252,0.5)]
        transform transition-all duration-300
        hover:scale-105 active:scale-95
        z-50"
    >
      <Bot className="w-5 h-5" />
      <span className="font-medium">
        {language === 'ko' 
          ? 'AI 남경인에게 물어보세요!' 
          : 'Ask AI Kyoungin!'}
      </span>
    </button>
  )
} 