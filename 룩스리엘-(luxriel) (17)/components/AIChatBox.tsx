
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponseStream } from '../services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'ai';
  text: string;
  image?: string;
}

interface AIChatBoxProps {
  initialInput?: string;
  onInputSet?: () => void;
  onFocusChange?: (focused: boolean) => void;
  variant?: 'default' | 'minimal';
}

const AIChatBox: React.FC<AIChatBoxProps> = ({ initialInput, onInputSet, onFocusChange, variant = 'default' }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ preview: string; data: string; mimeType: string; fileName: string } | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const suggestions = [
    "한남동 60평 대리석 시공",
    "시중가 절반 절감 원리",
    "미니멀 럭셔리 주방 설계",
    "실무자 직영가 좌표 문의"
  ];

  useEffect(() => {
    if (initialInput) {
      handleSend(initialInput);
      if (onInputSet) onInputSet();
    }
  }, [initialInput]);

  // 스크롤이 자동으로 하단으로 내려가게 설정 (메시지가 업데이트될 때마다)
  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setSelectedImage({
          preview: reader.result as string,
          data: base64String,
          mimeType: file.type,
          fileName: file.name
        });
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  const handleSend = async (text: string) => {
    const trimmed = text.trim();
    const currentImage = selectedImage;
    
    if (!trimmed && !currentImage) {
      if (!hasStarted) {
        setHasStarted(true);
        setIsTyping(true);
        // 환영 인사는 짧으므로 기존 방식 유지
        setTimeout(() => {
          setMessages([{ 
            role: 'ai', 
            text: '반갑습니다. 룩스리엘의 지능형 컨설팅 시스템 **테루아(Terua)**입니다. \n\n가장 투명하고 정밀한 시선으로 당신의 공간을 분석해 드리겠습니다. **실무 데이터**를 기반으로 현실적인 직영가 차이를 확인하시거나, 궁금하신 점을 편하게 말씀해 주십시오.' 
          }]);
          setIsTyping(false);
        }, 800);
      }
      return;
    }

    if (!hasStarted) setHasStarted(true);
    
    const userMsg: Message = { 
      role: 'user', 
      text: trimmed || (currentImage ? "첨부된 비주얼 데이터를 분석하여 룩스리엘의 직영가 견적 비교를 부탁드립니다." : ""),
      image: currentImage?.preview 
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setSelectedImage(null);
    setIsTyping(true);

    // AI 메시지를 미리 하나 비어있는 상태로 추가
    setMessages(prev => [...prev, { role: 'ai', text: "" }]);

    const stream = getGeminiResponseStream(
      userMsg.text, 
      currentImage ? { data: currentImage.data, mimeType: currentImage.mimeType } : undefined
    );

    let fullText = "";
    
    // 스트림 응답 처리
    for await (const chunk of stream) {
      if (chunk) {
        fullText += chunk;
        setIsTyping(false); // 첫 번째 청크가 오면 타이핑 인디케이터 제거
        
        setMessages(prev => {
          const newMessages = [...prev];
          if (newMessages.length > 0) {
            newMessages[newMessages.length - 1].text = fullText;
          }
          return newMessages;
        });
      }
    }
  };

  const renderTable = (tableMarkdown: string) => {
    const lines = tableMarkdown.trim().split('\n');
    if (lines.length < 3) return null;

    const headers = lines[0].split('|').filter(cell => cell.trim() !== '').map(cell => cell.trim());
    const rows = lines.slice(2).map(line => 
      line.split('|').filter(cell => cell.trim() !== '').map(cell => cell.trim())
    );

    return (
      <div className="my-6 md:my-8 overflow-x-auto rounded-2xl md:rounded-3xl border border-[#C19A36]/30 bg-black/40 backdrop-blur-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#C19A36]/10 border-b border-[#C19A36]/30">
              {headers.map((header, i) => (
                <th key={i} className="px-4 md:px-6 py-4 md:py-5 text-[#C19A36] text-[9px] md:text-xs font-black uppercase tracking-widest">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                {row.map((cell, j) => (
                  <td key={j} className={`px-4 md:px-6 py-4 md:py-5 text-xs md:text-lg font-light ${j === 0 ? 'text-white font-bold' : 'text-gray-300'}`}>
                    {cell.includes('**') ? <strong className="text-[#C19A36] font-black">{cell.replace(/\*\*/g, '')}</strong> : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderFormattedText = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(\|[\s\S]*?\|[\s\S]*?\|)/g);
    
    return parts.map((part, idx) => {
      if (part.trim().startsWith('|') && part.includes('\n|')) {
        return <div key={idx}>{renderTable(part)}</div>;
      }

      const lines = part.split('\n');
      return (
        <div key={idx} className="mb-1.5 md:mb-4 last:mb-0">
          {lines.map((line, lIdx) => (
            <div 
              key={lIdx} 
              className="mb-1 md:mb-2 last:mb-0 overflow-hidden min-h-[1.5em]"
            >
              {line.split(/(\*\*.*?\*\*)/g).map((segment, sIdx) => {
                if (segment.startsWith('**') && segment.endsWith('**')) {
                  return (
                    <strong key={sIdx} className="text-[#C19A36] font-bold">
                      {segment.slice(2, -2)}
                    </strong>
                  );
                }
                return (
                  <span key={sIdx} className="inline-block opacity-0 animate-fade-in">
                    {segment === ' ' ? '\u00A0' : segment}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      );
    });
  };

  return (
    <div className="w-full flex flex-col items-center">
      <AnimatePresence>
        {hasStarted && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: window.innerWidth < 768 ? 320 : 580, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="w-full overflow-hidden mb-6 md:mb-10"
          >
            <div 
              ref={scrollRef}
              className="h-full overflow-y-auto p-4 md:p-14 space-y-4 md:space-y-12 custom-scrollbar bg-[#0d0d0d] rounded-[2rem] md:rounded-[3.5rem] border border-[#C19A36]/20 shadow-2xl"
            >
              {messages.map((m, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  {m.image && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }} 
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-3 max-w-[200px] md:max-w-[400px] rounded-2xl overflow-hidden border border-[#C19A36]/50 shadow-xl p-1 bg-black/80 backdrop-blur-xl"
                    >
                      <img src={m.image} alt="User upload" className="w-full h-auto object-cover rounded-xl" />
                    </motion.div>
                  )}
                  <div className={`max-w-[98%] md:max-w-[92%] px-5 md:px-12 py-4 md:py-10 rounded-[1.5rem] md:rounded-[2.8rem] text-[13px] md:text-xl leading-[1.6] md:leading-[1.9] tracking-tight break-keep shadow-xl border ${
                    m.role === 'user' 
                    ? 'bg-[#1a1a1a] text-white border-white/10 font-bold' 
                    : 'bg-[#050505] text-[#f0f0f0] border-[#C19A36]/30 font-medium'
                  }`}>
                    {m.role === 'ai' ? renderFormattedText(m.text) : m.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#1a1a1a] px-4 py-3 rounded-full flex space-x-2 items-center border border-white/5">
                    <div className="w-1.5 h-1.5 bg-[#C19A36] rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-[#C19A36] rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 bg-[#C19A36] rounded-full animate-bounce [animation-delay:-0.3s]" />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-6xl px-1 md:px-0 flex flex-col items-center">
        <AnimatePresence>
          {selectedImage && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }}
              className="relative mb-4 group"
            >
              <div className="p-1.5 bg-[#0d0d0d]/90 backdrop-blur-xl border border-[#C19A36] rounded-[1.5rem] shadow-2xl">
                <img src={selectedImage.preview} className="w-24 h-24 md:w-52 md:h-52 object-cover rounded-xl" alt="Preview" />
              </div>
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-2 -right-2 w-7 h-7 bg-red-600 text-white rounded-full flex items-center justify-center text-xs shadow-xl z-10"
              >✕</button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-full flex flex-col items-center">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
            className={`w-full relative flex items-center bg-[#0d0d0d] border rounded-full p-1 md:p-4 transition-all duration-700 shadow-2xl mb-4 md:mb-10 ${isFocused ? 'border-[#C19A36] shadow-[0_0_30px_rgba(193,154,54,0.2)]' : 'border-white/10'}`}
          >
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
            
            <button 
              type="button"
              onClick={handleImageClick}
              className={`flex items-center gap-1.5 md:gap-4 px-3 md:px-8 py-2.5 md:py-5 rounded-full transition-all border ${
                selectedImage ? 'bg-[#C19A36] border-[#C19A36] text-black' : 'bg-white/5 border-white/10 text-white/40'
              }`}
            >
               <svg className="w-4 h-4 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812-1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
               <span className="text-[10px] md:text-base font-black uppercase tracking-widest hidden sm:inline">Upload</span>
            </button>

            <input 
              type="text"
              value={input}
              onFocus={() => { onFocusChange?.(true); setIsFocused(true); }}
              onBlur={() => { onFocusChange?.(false); setIsFocused(false); }}
              onChange={(e) => setInput(e.target.value)}
              placeholder={window.innerWidth < 768 ? "질문을 입력하세요" : "분석할 공간 사진을 올리거나 궁금한 실무 단가를 문의하십시오."}
              className="flex-grow bg-transparent border-none px-3 md:px-8 py-3 md:py-6 text-[14px] md:text-2xl text-white focus:outline-none placeholder:text-white/20 font-light"
            />
            
            <button 
              type="submit"
              disabled={isTyping}
              className="px-5 md:px-16 py-3 md:py-6 bg-[#C19A36] text-white font-black text-[12px] md:text-2xl rounded-full transition-all hover:bg-[#D4AF37] shadow-xl ml-1 md:ml-2"
            >
              {window.innerWidth < 768 ? "전송" : "AI 분석"}
            </button>
          </form>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="w-full flex justify-center mb-6 md:mb-20"
          >
            <button
              type="button"
              onClick={() => handleSend(input)}
              className="group relative flex items-center justify-center w-full md:w-auto md:px-48 py-4 md:py-10 bg-black/80 border border-[#C19A36]/40 rounded-full transition-all duration-700 hover:border-[#C19A36] shadow-2xl"
            >
              <span className="relative z-10 text-[#C19A36] text-[13px] md:text-2xl font-black tracking-[0.4em] md:tracking-[0.8em] uppercase group-hover:text-white transition-colors">
                AI 질문하기
              </span>
            </button>
          </motion.div>

          {!hasStarted && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center w-full mb-8 md:mb-20 px-2"
            >
              <div className="flex flex-col items-center space-y-2 mb-6 md:mb-12 opacity-40">
                <span className="text-[#C19A36] text-[8px] md:text-sm font-black uppercase tracking-[0.5em] text-center">Data Guide</span>
                <div className="w-10 md:w-16 h-px bg-[#C19A36]/50" />
              </div>
              <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-2 md:gap-5 w-full">
                {suggestions.map((s, idx) => (
                  <button 
                    key={idx} onClick={() => handleSend(s)}
                    className="px-3 py-3 md:px-10 md:py-6 bg-white/[0.02] border border-white/5 rounded-xl md:rounded-full text-[10px] md:text-lg text-white/40 hover:text-[#C19A36] hover:border-[#C19A36]/60 transition-all text-center backdrop-blur-lg"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #050505; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #C19A36; border-radius: 10px; }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(3px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }

        @media (max-width: 768px) {
           input { font-size: 16px !important; }
        }
      `}</style>
    </div>
  );
};

export default AIChatBox;
