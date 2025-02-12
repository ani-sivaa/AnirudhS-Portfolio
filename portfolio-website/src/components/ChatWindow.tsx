'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { ChatMessage, sendMessage } from '@/lib/api';
import { Bot } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ChatWindowProps {
  onClose: () => void;
}

// 추천 질문 목록 정의
const suggestedQuestions = {
  ko: [
    "남경인은 어떤 자격증이 있니?",
    "남경인은 어떤 대학교를 나왔니?",
    "남경인은 취미가 뭐니?"
  ],
  en: [
    "What certifications does Kyoungin have?",
    "Which university did Kyoungin graduate from?",
    "What are Kyoungin's hobbies?"
  ]
};

export default function ChatWindow({ onClose }: ChatWindowProps) {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: language === 'ko' 
        ? '안녕하세요! 저는 AI 남경인입니다. 무엇이든 물어보세요!'
        : 'Hello! I am AI Kyoungin. Feel free to ask me anything!'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | undefined>();
  const [showSuggestions, setShowSuggestions] = useState(true); // 추천 질문 표시 상태
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    console.log('메시지 전송 시도:', userMessage);

    try {
      const response = await sendMessage(userMessage, language, sessionId);
      console.log('서버 응답:', response);
      setSessionId(response.session_id);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response.response
      }]);
    } catch (error) {
      console.error('API 요청 실패:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: language === 'ko' 
          ? "죄송합니다. 오류가 발생했습니다. 잠시 후 다시 시도해주세요." 
          : "Sorry, an error occurred. Please try again later."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');
    setShowSuggestions(false); // 첫 메시지 전송 후 추천 질문 숨기기
    setIsLoading(true);

    try {
      const response = await sendMessage(text, language, sessionId);
      setSessionId(response.session_id);
      setMessages(prev => [...prev, { role: 'assistant', content: response.response }]);
    } catch (error) {
      console.error('메시지 전송 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-[#2B2B2B] w-full max-w-2xl h-[600px] rounded-lg shadow-lg flex flex-col border border-[#0FF0FC]/30"
      >
        {/* Header - 새로운 디자인 */}
        <div className="relative p-4 border-b border-[#0FF0FC]/30">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-[#0FF0FC]/10 via-transparent to-[#5856D6]/10"
            style={{ maskImage: 'linear-gradient(to right, transparent, black, transparent)' }}
          />
          <div className="relative flex items-center justify-between">
            <h3 className="text-xl font-bold">
              <span className="bg-gradient-to-r from-[#0FF0FC] to-[#5856D6] bg-clip-text text-transparent">
                {language === 'ko' ? 'AI 남경인과의 대화' : 'Chat with AI Kyoungin'}
              </span>
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#555555]/20 rounded-full transition-colors text-[#0FF0FC]"
            >
              <span className="sr-only">Close</span>
              ✕
            </button>
          </div>
        </div>

        {/* Messages - 나머지 부분은 동일 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-[#0FF0FC]/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-[#0FF0FC]" />
                </div>
              )}
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-[#0FF0FC]/10 text-[#0FF0FC]'
                    : 'bg-[#555555]/20 text-[#E0E0E0]'
                }`}
              >
                {message.content}
              </div>
            </motion.div>
          ))}

          {/* 추천 질문 목록 */}
          <AnimatePresence>
            {showSuggestions && messages.length === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-wrap gap-2 mt-4"
              >
                {suggestedQuestions[language].map((question, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleSendMessage(question)}
                    className="flex-shrink-0 px-4 py-2 rounded-full 
                             bg-[#0FF0FC]/10 text-[#0FF0FC] text-sm
                             border border-[#0FF0FC]/20 hover:border-[#0FF0FC]/60
                             shadow-[0_0_10px_rgba(15,240,252,0.1)]
                             hover:shadow-[0_0_15px_rgba(15,240,252,0.2)]
                             transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {question}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start items-end gap-2"
            >
              <div className="w-8 h-8 rounded-full bg-[#0FF0FC]/10 flex items-center justify-center">
                <Bot className="w-5 h-5 text-[#0FF0FC]" />
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-[#0FF0FC]/30 bg-gradient-to-r from-[#0FF0FC]/5 to-[#5856D6]/5">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={language === 'ko' ? "메시지를 입력하세요..." : "Type your message..."}
              className="flex-1 bg-[#555555]/20 text-[#E0E0E0] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0FF0FC]/50"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-gradient-to-r from-[#0FF0FC] to-[#5856D6] text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 font-medium"
            >
              {language === 'ko' ? '전송' : 'Send'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
} 