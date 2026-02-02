
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getGeminiResponse } from '../services/geminiService';
import { gsap } from 'gsap';

interface Question {
  id: string;
  category: string;
  label: string;
  options: { value: string; label: string; icon?: string }[];
}

const QUESTIONS: Question[] = [
  {
    id: 'space_type',
    category: '공간 정보',
    label: '현재 고려 중인 공간의 유형은 무엇입니까?',
    options: [
      { value: 'apartment', label: '아파트 / 주거', icon: '🏢' },
      { value: 'cafe', label: '카페 / F&B', icon: '☕' },
      { value: 'office', label: '오피스 / 사무실', icon: '💻' },
      { value: 'studio', label: '오피스텔 / 스튜디오', icon: '🏠' }
    ]
  },
  {
    id: 'pyung_range',
    category: '공간 정보',
    label: '공간의 대략적인 규모(평수)를 선택해 주세요.',
    options: [
      { value: 'under_10', label: '10평 미만' },
      { value: '10_20', label: '10 - 20평' },
      { value: '20_40', label: '20 - 40평' },
      { value: 'over_40', label: '40평 이상' }
    ]
  },
  {
    id: 'budget_mindset',
    category: '예산 성향',
    label: '인테리어 예산에 대한 당신의 관점은?',
    options: [
      { value: 'cost_first', label: '철저한 가성비와 실용성 위주' },
      { value: 'balanced', label: '합리적인 가격 내 최상의 퀄리티' },
      { value: 'quality_first', label: '예산보다는 디자인 완성도 우선' },
      { value: 'unlimited', label: '하이엔드급 최상위 자재 적용 희망' }
    ]
  },
  {
    id: 'style_vibe',
    category: '스타일 성향',
    label: '지향하는 공간의 핵심 무드는 무엇입니까?',
    options: [
      { value: 'minimal', label: '미니멀 & 화이트 (여백의 미)' },
      { value: 'modern_luxury', label: '모던 럭셔리 (대리석 & 금속)' },
      { value: 'natural_wood', label: '내추럴 & 우드 (따뜻한 감성)' },
      { value: 'industrial', label: '인더스트리얼 (거친 질감)' }
    ]
  },
  {
    id: 'priority',
    category: '우선순위',
    label: '가장 많은 비용을 투자하고 싶은 영역은?',
    options: [
      { value: 'kitchen', label: '주방 & 다이닝 (하드웨어 중심)' },
      { value: 'living', label: '거실 (조명 & 바닥재 중심)' },
      { value: 'bathroom', label: '욕실 (프라이빗 힐링 중심)' },
      { value: 'storage', label: '수납 & 공간 효율 (기능 중심)' }
    ]
  },
  {
    id: 'risk_tolerance',
    category: '리스크 성향',
    label: '공사 진행 시 가장 우려되는 부분은?',
    options: [
      { value: 'duration', label: '공사 기간 지연' },
      { value: 'defect', label: '시공 후 하자 발생 및 AS' },
      { value: 'transparency', label: '견적의 투명성 및 마진율' },
      { value: 'communication', label: '디자이너와의 소통 및 피드백' }
    ]
  },
  {
    id: 'visual_preference',
    category: '참고 이미지',
    label: '가장 본능적으로 끌리는 비주얼 그룹은?',
    options: [
      { value: 'group_a', label: 'Group A: 정적이고 차분한 모노톤' },
      { value: 'group_b', label: 'Group B: 화려하고 입체적인 공간' },
      { value: 'group_c', label: 'Group C: 자연친화적이고 유기적인 곡선' },
      { value: 'group_d', label: 'Group D: 실험적이고 기하학적인 디자인' }
    ]
  }
];

const AIResponseView: React.FC<{ result: string; onRestart: () => void }> = ({ result, onRestart }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current.querySelectorAll('.char-animate'), 
        { opacity: 0, y: 50, rotateX: -90 },
        { opacity: 1, y: 0, rotateX: 0, stagger: 0.02, duration: 1, ease: 'back.out(1.7)' }
      );
    }
  }, [result]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto py-20 px-6"
    >
      <div className="text-center mb-16">
        <div className="futuristic text-[#d4af37] text-xs tracking-[1em] mb-4 uppercase animate-pulse">Analysis Complete</div>
        <h2 className="text-5xl md:text-7xl font-light serif text-white mb-6">당신의 공간 <span className="text-[#d4af37]">알고리즘</span></h2>
        <div className="w-24 h-px bg-[#d4af37]/30 mx-auto" />
      </div>

      <div 
        ref={containerRef}
        className="bg-white/[0.03] border border-white/10 rounded-[3rem] p-12 md:p-20 backdrop-blur-3xl relative overflow-hidden group shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 blur-[100px] pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-10 border border-[#d4af37] flex items-center justify-center rotate-45">
              <span className="text-xs font-bold text-[#d4af37] -rotate-45">AI</span>
            </div>
            <span className="futuristic text-[10px] text-gray-400 tracking-[0.4em] uppercase">Executive Consultant Feedback</span>
          </div>

          <div className="space-y-8 leading-relaxed text-xl md:text-2xl font-light text-gray-200 montserrat">
            {result.split('\n').map((line, i) => (
              <p key={i} className="perspective-1000">
                {line.split('').map((char, j) => (
                  <span key={j} className="char-animate inline-block">{char === ' ' ? '\u00A0' : char}</span>
                ))}
              </p>
            ))}
          </div>

          <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
             <div className="flex gap-4">
                <div className="w-3 h-3 bg-[#d4af37] rounded-full animate-ping" />
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Verified Professional Insight</span>
             </div>
             <button 
              onClick={onRestart}
              className="px-10 py-4 bg-[#d4af37] text-black font-bold futuristic text-xs tracking-widest uppercase rounded-xl hover:bg-white transition-all shadow-lg shadow-[#d4af37]/20"
             >
               Start New Analysis
             </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Community: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);

  const handleSelect = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    if (step < QUESTIONS.length - 1) {
      setStep(prev => prev + 1);
    } else {
      triggerAnalysis();
    }
  };

  const triggerAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Format the choices into a descriptive prompt
    const prompt = `사용자가 선택한 데이터 기반 인테리어 분석 요청:
    ${QUESTIONS.map(q => `- ${q.category}: ${q.options.find(o => o.value === answers[q.id])?.label}`).join('\n')}
    
    이 데이터를 바탕으로 사용자의 인테리어 심리, 현실적인 공사 가이드, 그리고 프리미엄 랩만의 반값 솔루션이 어떻게 적용될지 아주 전문적이고 통찰력 있게 설명해줘.`;

    const response = await getGeminiResponse(prompt);
    setAiResult(response);
    setIsAnalyzing(false);
  };

  const progress = ((step + 1) / QUESTIONS.length) * 100;

  if (aiResult) {
    return <AIResponseView result={aiResult} onRestart={() => { setAiResult(null); setStep(0); setAnswers({}); }} />;
  }

  return (
    <div className="pt-40 pb-20 px-6 min-h-screen bg-[#0a0a0a] overflow-hidden">
      <div className="container mx-auto">
        <header className="mb-24 text-center max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 border border-[#d4af37]/30 flex items-center justify-center mx-auto mb-10 rotate-45 relative"
          >
            <div className="absolute inset-0 border border-[#d4af37] animate-ping opacity-20" />
            <span className="futuristic text-2xl font-bold text-[#d4af37] -rotate-45">AI</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#d4af37] font-bold futuristic text-xs tracking-[0.6em] uppercase mb-6"
          >
            Preference Intelligence Scanner
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-light serif text-white mb-10"
          >
            당신의 취향을 <br/><span className="text-[#d4af37]">데이터화</span> 합니다
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-500 text-lg leading-relaxed font-light"
          >
            프리미엄 인테리어 랩의 AI는 단 몇 개의 선택만으로 당신의 내면적 기준을 읽어냅니다. <br/>
            불필요한 서술 없이, 오직 선택된 데이터만이 당신의 공간을 증명합니다.
          </motion.p>
        </header>

        <div className="max-w-3xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-16">
            <div className="flex justify-between items-end mb-4">
              <span className="futuristic text-[10px] text-[#d4af37] tracking-[0.3em] font-bold">SCANNING PROGRESS</span>
              <span className="futuristic text-[10px] text-white font-bold">{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[#d4af37]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!isAnalyzing ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-12"
              >
                <div className="mb-12">
                   <span className="text-[10px] font-bold text-[#d4af37] uppercase tracking-[0.4em] mb-2 block">{QUESTIONS[step].category}</span>
                   <h3 className="text-3xl md:text-4xl font-light text-white serif">{QUESTIONS[step].label}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {QUESTIONS[step].options.map((opt) => (
                    <motion.button
                      key={opt.value}
                      whileHover={{ scale: 1.02, backgroundColor: 'rgba(212, 175, 55, 0.05)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelect(QUESTIONS[step].id, opt.value)}
                      className="p-8 text-left border border-white/10 rounded-2xl bg-white/[0.02] hover:border-[#d4af37] transition-all group flex items-center justify-between"
                    >
                      <div className="flex items-center gap-6">
                        {opt.icon && <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{opt.icon}</span>}
                        <span className="text-lg font-light text-gray-300 group-hover:text-white transition-colors">{opt.label}</span>
                      </div>
                      <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#d4af37] transition-all">
                        <div className="w-2 h-2 bg-[#d4af37] rounded-full scale-0 group-hover:scale-100 transition-transform" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 space-y-10"
              >
                <div className="relative">
                  <div className="w-32 h-32 border-2 border-[#d4af37]/20 rounded-full animate-spin-slow" />
                  <div className="absolute inset-0 w-32 h-32 border-t-2 border-[#d4af37] rounded-full animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center futuristic text-[#d4af37] text-xs font-bold animate-pulse">AI</div>
                </div>
                <div className="text-center space-y-4">
                  <h3 className="futuristic text-white tracking-[0.5em] text-sm animate-pulse">ANALYZING CORE DATASET</h3>
                  <p className="text-gray-500 text-sm font-light">최적화된 전문가 연계 시스템 가동 중...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default Community;
