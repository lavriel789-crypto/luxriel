
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const IntroLoader: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const brandingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // 전체 브랜딩 그룹 애니메이션
    tl.fromTo(brandingRef.current, 
      { scale: 0.95, opacity: 0, filter: 'blur(10px)' },
      { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.5, ease: "expo.out" }
    )
    .to(containerRef.current, {
      opacity: 0,
      duration: 1.2,
      delay: 1.0,
      ease: "expo.inOut"
    });
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center overflow-hidden h-[100dvh]"
    >
      {/* 정중앙 정렬을 위한 컨테이너 (모바일 수직 중앙 보정) */}
      <div ref={brandingRef} className="flex flex-col items-center justify-center text-center mt-[-2rem] md:mt-0">
        
        {/* LR 로고 심볼 */}
        <div className="relative mb-8 md:mb-14">
            <div className="w-20 h-20 md:w-32 md:h-32 border border-[#d4af37]/40 flex items-center justify-center rotate-45 group bg-black/50">
                <span className="text-3xl md:text-5xl font-light text-[#d4af37] -rotate-45 friendly tracking-tighter">LR</span>
                <div className="absolute inset-0 border border-[#d4af37] animate-ping opacity-10" />
            </div>
            {/* 고급스러운 장식 요소 */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="w-1.5 h-1.5 bg-[#C19A36] rotate-45 shadow-[0_0_10px_rgba(193,154,54,0.8)]" />
            </div>
        </div>

        {/* 브랜드 네임 및 슬로건 */}
        <div className="space-y-4 md:space-y-6">
          <h1 className="text-4xl md:text-8xl font-light tracking-[0.5em] md:tracking-[0.6em] text-white uppercase luxury-serif glow-text leading-none">
            LuxRiel
          </h1>
          <div className="flex flex-col items-center space-y-2">
            <div className="w-10 md:w-20 h-px bg-gradient-to-r from-transparent via-[#C19A36]/50 to-transparent" />
            <p className="text-[#C19A36] tracking-[0.4em] md:tracking-[0.5em] text-[8px] md:text-xs uppercase friendly font-bold opacity-80">
              The Masterpiece of Intelligence
            </p>
          </div>
        </div>
      </div>
      
      {/* 배경 황금빛 파티클 효과 */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-gradient-to-t from-[#C19A36] to-white/10 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `-20px`,
              width: `${Math.random() * 1.5}px`,
              height: `${Math.random() * 10}px`,
              animationDuration: `${4 + Math.random() * 6}s`,
              animationDelay: `${Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 0.8; }
          100% { transform: translateY(-100vh) scale(0.5); opacity: 0; }
        }
        .animate-float {
          animation: float linear infinite;
        }
        .glow-text {
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
};

export default IntroLoader;
