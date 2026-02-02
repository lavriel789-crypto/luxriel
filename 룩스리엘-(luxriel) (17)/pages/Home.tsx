
import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import AIChatBox from '../components/AIChatBox';
import EditableImage from '../components/EditableImage';
import EditableText from '../components/EditableText';

const GoldenStorm: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let particles: any[] = []; let animationFrameId: number;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    class Particle {
      x: number; y: number; speed: number; opacity: number; length: number;
      constructor() { this.init(); }
      init() {
        this.x = Math.random() * canvas!.width; this.y = Math.random() * canvas!.height;
        this.speed = Math.random() * 1.2 + 0.1; this.opacity = Math.random() * 0.2 + 0.03; this.length = Math.random() * 20 + 5;
      }
      update() { this.y += this.speed; if (this.y > canvas!.height) { this.y = -50; this.x = Math.random() * canvas!.width; } }
      draw() {
        ctx!.beginPath();
        const gradient = ctx!.createLinearGradient(this.x, this.y, this.x, this.y + this.length);
        gradient.addColorStop(0, 'transparent'); gradient.addColorStop(0.5, `rgba(212, 175, 55, ${this.opacity})`); gradient.addColorStop(1, 'transparent');
        ctx!.strokeStyle = gradient; ctx!.lineWidth = 0.5; ctx!.moveTo(this.x, this.y); ctx!.lineTo(this.x, this.y + this.length); ctx!.stroke();
      }
    }
    const init = () => {
      particles = []; const count = window.innerWidth < 768 ? 40 : 120;
      for (let i = 0; i < count; i++) particles.push(new Particle());
    };
    const animate = () => { ctx.clearRect(0, 0, canvas.width, canvas.height); particles.forEach(p => { p.update(); p.draw(); }); animationFrameId = requestAnimationFrame(animate); };
    window.addEventListener('resize', resize); resize(); init(); animate();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrameId); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
};

const ReviewCard: React.FC<{ index: number }> = ({ index }) => {
  return (
    <motion.div 
      className="min-w-[280px] md:min-w-[450px] h-[320px] md:h-[400px] relative group px-3 md:px-4"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.5, ease: "circOut" }}
    >
      <div className="w-full h-full bg-[#0d0d0d] border border-white/5 rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-10 relative overflow-hidden backdrop-blur-3xl flex flex-col justify-between shadow-2xl">
        <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-[#d4af37]/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="absolute top-4 md:top-8 left-4 md:left-8 text-4xl md:text-6xl text-[#d4af37]/10 serif italic select-none">“</div>
        
        <div className="relative z-10 pt-4 md:pt-6">
          <EditableText 
            configPath={`home.review${index}.content`} 
            defaultText="룩스리엘의 테루아 시스템은 인테리어 업계의 불필요한 마진을 제거하고 오직 실무 데이터에 집중합니다. 제가 경험한 가장 혁신적인 공간 창조 방식이었습니다." 
            className="text-gray-300 text-sm md:text-xl font-light leading-relaxed italic break-keep"
          />
        </div>

        <div className="relative z-10 flex items-center gap-4 md:gap-5 mt-4">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border border-[#d4af37]/30 shadow-xl">
            <EditableImage 
              configPath={`home.review${index}.imageUrl`}
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=LuxUser${index}`}
              alt="Reviewer"
              className="w-full h-full"
            />
          </div>
          <div className="flex flex-col">
            <EditableText 
              configPath={`home.review${index}.author`} 
              defaultText={`Premium Client ${index}`} 
              className="text-white font-bold text-xs md:text-lg tracking-wide mb-0.5" 
            />
            <div className="flex items-center gap-2">
              <span className="text-[#d4af37] text-[8px] md:text-[10px] tracking-[0.2em] uppercase font-black opacity-60">Verified</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, s) => (
                  <span key={s} className="text-[#d4af37] text-[6px] md:text-[8px]">★</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Home: React.FC = () => {
  const [siteConfig, setSiteConfig] = useState<any>(null);

  const loadConfig = () => {
    const saved = localStorage.getItem('luxriel_terua_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSiteConfig(parsed.home || {});
      } catch (e) {
        setSiteConfig({});
      }
    }
  };

  useEffect(() => {
    loadConfig();
    window.addEventListener('configUpdated', loadConfig);
    return () => window.removeEventListener('configUpdated', loadConfig);
  }, []);

  const config = {
    hero: {
      sub: siteConfig?.hero?.sub || "다정한 기술로 빚는 하이엔드",
      title: siteConfig?.hero?.title || "LuxRiel",
      title2: siteConfig?.hero?.title2 || "Terua"
    }
  };

  return (
    <div className="relative z-10 bg-[#050505] overflow-x-hidden selection:bg-[#d4af37] selection:text-black">
      
      {/* 01. HERO SECTION */}
      <section className="relative min-h-[100dvh] w-full flex flex-col items-center justify-start md:justify-center pt-24 pb-12 md:pt-40 md:pb-48 px-4 md:px-5 overflow-hidden">
        <GoldenStorm />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
           <motion.div 
              animate={{ opacity: [0.3, 0.55, 0.3], scale: [0.95, 1.05, 0.95], filter: ["blur(60px)", "blur(100px)", "blur(60px)"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[90%] md:w-[70%] h-[40%] md:h-[50%] bg-[#D4AF37]/10 md:blur-[100px] blur-[60px] rounded-full"
           />
        </div>
        <div className="container mx-auto relative z-20 flex flex-col items-center text-center">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="mb-6 md:mb-20 order-1">
            <span className="text-[#d4af37] text-[9px] md:text-2xl font-light tracking-[0.4em] md:tracking-[2.8em] uppercase block opacity-80">
              {config.hero.sub}
            </span>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} className="mb-12 md:mb-44 relative order-2 mt-2 md:mt-0">
            <div className="relative group">
              <motion.div animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0 bg-[#FFD700]/10 blur-[40px] md:blur-[60px] z-0 rounded-full" />
              <h1 className="leading-[0.9] md:leading-[0.85] tracking-tight relative z-10">
                <span className="text-white block serif font-extralight text-[4.2rem] sm:text-[7rem] md:text-[18rem] lg:text-[20rem] tracking-[-0.05em]">{config.hero.title}</span>
                <span className="text-[#C19A36] italic luxury-serif block text-[3.8rem] sm:text-[6rem] md:text-[14rem] lg:text-[16rem] mt-[-0.1em] glow-text-refined">{config.hero.title2}</span>
              </h1>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1.5, ease: "easeOut" }} className="w-full max-w-6xl z-30 order-3 mt-4 md:mt-8">
            <AIChatBox />
          </motion.div>
        </div>
      </section>

      {/* 02. REAL-TIME COMMUNITY ECHO (IMPROVED REVIEW SLIDER) */}
      <section className="py-20 md:py-48 bg-[#050505] relative overflow-hidden">
        <div className="container mx-auto px-6 mb-12 md:mb-20 relative z-10 text-center">
          <EditableText configPath="home.reviews.sub" defaultText="The Living Voice of Intelligence" className="text-[#d4af37] text-[8px] md:text-xs font-bold tracking-[0.5em] md:tracking-[0.8em] uppercase mb-4 md:mb-8 block" />
          <h2 className="text-3xl md:text-7xl font-light text-white serif mb-6 md:mb-10 leading-tight">
            <EditableText configPath="home.reviews.title1" defaultText="실시간" as="span" /> <span className="text-[#d4af37] italic"><EditableText configPath="home.reviews.title2" defaultText="예상 후기" as="span" /></span>
          </h2>
          <div className="w-16 md:w-24 h-[0.5px] bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent mx-auto" />
        </div>

        <div className="relative flex flex-col gap-6 md:gap-10 select-none overflow-hidden pb-10">
          <motion.div 
            className="flex gap-3 md:gap-6 whitespace-nowrap"
            animate={{ x: [0, -1200] }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          >
            {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((i, idx) => (
              <ReviewCard key={`top-${idx}`} index={i} />
            ))}
          </motion.div>

          <motion.div 
            className="flex gap-3 md:gap-6 whitespace-nowrap"
            animate={{ x: [-1200, 0] }}
            transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
          >
            {[6, 7, 8, 9, 10, 6, 7, 8, 9, 10].map((i, idx) => (
              <ReviewCard key={`bottom-${idx}`} index={i} />
            ))}
          </motion.div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-radial-gradient from-[#d4af37]/3 via-transparent to-transparent pointer-events-none z-0" />
      </section>

      {/* 03. COGNITIVE DESIGN ANALYSIS */}
      <section className="py-20 md:py-60 bg-[#080808] border-t border-white/5 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
             <div className="order-2 lg:order-1 relative">
                <div className="absolute -inset-10 md:-inset-16 bg-[#FFD700]/3 md:bg-[#FFD700]/5 blur-[80px] md:blur-[140px] rounded-full" />
                <div className="relative aspect-square rounded-[2rem] md:rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl">
                  <EditableImage src={siteConfig?.cognitive?.imageUrl || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80"} alt="Cognitive Analysis" configPath="home.cognitive.imageUrl" className="w-full h-full object-cover" />
                </div>
                <div className="absolute top-6 right-6 md:top-12 md:right-12 bg-black/90 backdrop-blur-2xl border border-[#FFD700]/30 p-5 md:p-10 rounded-2xl md:rounded-3xl hidden sm:block shadow-2xl">
                   <div className="text-[#FFD700] text-2xl md:text-4xl font-light serif mb-1 md:mb-2">99.8%</div>
                   <div className="text-gray-500 text-[8px] md:text-[11px] uppercase tracking-widest font-black">Logic Accuracy</div>
                </div>
             </div>
             <div className="order-1 lg:order-2">
                <EditableText configPath="home.cognitive.sub" defaultText="Cognitive Spatial Engine" className="text-[#FFD700] text-[9px] md:text-xs font-bold tracking-[0.4em] md:tracking-[0.8em] uppercase mb-6 md:mb-10 block" />
                <h2 className="text-3xl md:text-8xl font-light text-white serif mb-8 md:mb-12 leading-tight md:leading-none">
                  <EditableText configPath="home.cognitive.title1" defaultText="공간을" as="span" /><br/>
                  <EditableText configPath="home.cognitive.title2" defaultText="연산하다." className="text-[#FFD700]" as="span" />
                </h2>
                <EditableText configPath="home.cognitive.desc" defaultText="테루아(Terua)는 단순한 인테리어를 넘어, 거주자의 동선과 심리적 안정감을 데이터로 환산합니다. 수만 번의 시뮬레이션을 통해 도출된 최적의 레이아웃을 경험하십시오." className="text-gray-400 text-sm md:text-2xl font-light leading-relaxed mb-8 md:mb-16" />
                <div className="w-full h-[0.5px] bg-white/10 mb-8 md:mb-16" />
                <div className="grid grid-cols-3 gap-6 md:gap-10">
                  <div><div className="text-white text-lg md:text-2xl font-light serif mb-1 md:mb-2">Logic</div><div className="text-gray-600 text-[8px] md:text-[10px] uppercase tracking-widest font-bold">Algorithm</div></div>
                  <div><div className="text-white text-lg md:text-2xl font-light serif mb-1 md:mb-2">Vibe</div><div className="text-gray-600 text-[8px] md:text-[10px] uppercase tracking-widest font-bold">Vibe AI</div></div>
                  <div><div className="text-white text-lg md:text-2xl font-light serif mb-1 md:mb-2">Scale</div><div className="text-gray-600 text-[8px] md:text-[10px] uppercase tracking-widest font-bold">Precision</div></div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 04. SPATIAL INTELLIGENCE STATS */}
      <section className="py-20 md:py-60 bg-[#080808] relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="bg-white/[0.01] border border-white/5 rounded-[3rem] md:rounded-[5rem] p-8 md:p-32 backdrop-blur-3xl shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-end">
              <div>
                <EditableText configPath="home.stats.sub" defaultText="Verified Intelligence" className="text-[#FFD700] text-[9px] md:text-xs font-bold tracking-[0.4em] md:tracking-[0.6em] uppercase mb-8 md:mb-14 block" />
                <h2 className="text-3xl md:text-7xl font-light text-white serif mb-8 md:mb-12 leading-tight">
                  <EditableText configPath="home.stats.title1" defaultText="데이터가 증명하는" as="span" /><br/>
                  <EditableText configPath="home.stats.title2" defaultText="하이엔드의 실체" className="text-[#FFD700] italic" as="span" />
                </h2>
                <EditableText configPath="home.stats.desc" defaultText="모든 공정은 투명하게 실시간으로 기록됩니다. 거품을 걷어낸 가격과 정밀한 시공 데이터가 룩스리엘의 정체성입니다." className="text-gray-500 text-sm md:text-2xl font-light leading-relaxed" />
              </div>
              <div className="grid grid-cols-2 gap-8 md:gap-24">
                <div className="space-y-10 md:space-y-16">
                   <div><div className="text-[#FFD700] text-4xl md:text-[100px] font-light serif block mb-2 md:mb-6 leading-none">45%</div><div className="text-gray-600 text-[8px] md:text-[11px] uppercase tracking-widest md:tracking-[0.5em] font-black">Reduction</div></div>
                   <div><div className="text-white text-4xl md:text-[100px] font-light serif block mb-2 md:mb-6 leading-none">0.1mm</div><div className="text-gray-600 text-[8px] md:text-[11px] uppercase tracking-widest md:tracking-[0.5em] font-black">Precision</div></div>
                </div>
                <div className="space-y-10 md:space-y-16 pt-12 md:pt-20">
                   <div><div className="text-white text-4xl md:text-[100px] font-light serif block mb-2 md:mb-6 leading-none">2.4k</div><div className="text-gray-600 text-[8px] md:text-[11px] uppercase tracking-widest md:tracking-[0.5em] font-black">Library</div></div>
                   <div><div className="text-[#FFD700] text-4xl md:text-[100px] font-light serif block mb-2 md:mb-6 leading-none">98%</div><div className="text-gray-600 text-[8px] md:text-[11px] uppercase tracking-widest md:tracking-[0.5em] font-black">Trust</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .bg-radial-gradient { background: radial-gradient(circle at center, var(--tw-gradient-from), var(--tw-gradient-to)); }
        .glow-text-refined { text-shadow: 0 0 15px rgba(193, 154, 54, 0.3), 0 0 30px rgba(193, 154, 54, 0.1); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Home;
