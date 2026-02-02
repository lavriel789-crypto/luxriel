
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants';
import AIChatBox from '../components/AIChatBox';
import EditableImage from '../components/EditableImage';

const Services: React.FC = () => {
  const chatSectionRef = useRef<HTMLDivElement>(null);
  const [activePrompt, setActivePrompt] = useState<string | undefined>(undefined);
  const [siteConfig, setSiteConfig] = useState<any>(null);

  const loadConfig = () => {
    const saved = localStorage.getItem('luxriel_terua_config');
    if (saved) {
      try {
        setSiteConfig(JSON.parse(saved).services || {});
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

  const handleConsultClick = (serviceTitle: string) => {
    setActivePrompt(`${serviceTitle}에 대한 상세 견적과 진행 과정이 궁금해요.`);
    chatSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const images = {
    deep1: siteConfig?.deep1?.imageUrl || "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80",
    deep2: siteConfig?.deep2?.imageUrl || "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80",
    deep3: siteConfig?.deep3?.imageUrl || "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80",
    deep4: siteConfig?.deep4?.imageUrl || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80",
  };

  return (
    <div className="pt-40 pb-20 px-6 bg-[#0a0a0a]">
      <div className="container mx-auto">
        <header className="mb-20">
          <h2 className="text-[#d4af37] font-medium tracking-[0.4em] uppercase text-sm mb-4 text-center md:text-left">Our Expertise</h2>
          <h1 className="text-5xl md:text-7xl font-light serif mb-8 text-white text-center md:text-left">서비스 <span className="text-[#d4af37]">카테고리</span></h1>
          <p className="text-gray-400 max-w-2xl leading-relaxed text-center md:text-left mx-auto md:mx-0">
            프리미엄 인테리어 랩은 단순히 예쁜 공간을 넘어, 
            공학적인 접근과 예술적인 감각을 결합하여 최상의 거주 환경을 창조합니다. 모든 견적은 AI 최적화를 거쳐 산출됩니다.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {SERVICES.map((service, i) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 p-10 rounded-3xl group hover:border-[#d4af37] transition-all relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#d4af37]/5 rounded-bl-full translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform"></div>
                <div className="text-5xl mb-8 group-hover:scale-110 transition-transform">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
                <p className="text-gray-400 mb-8 text-sm leading-relaxed">{service.description}</p>
              </div>
              
              <div className="pt-6 border-t border-white/10">
                <button 
                  onClick={() => handleConsultClick(service.title)}
                  className="w-full py-3 bg-[#d4af37]/10 hover:bg-[#d4af37] text-[#d4af37] hover:text-black font-bold text-xs tracking-widest uppercase transition-all rounded-xl border border-[#d4af37]/20"
                >
                  AI 상담 시작하기
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div ref={chatSectionRef} className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-[#d4af37] font-medium tracking-[0.4em] uppercase text-sm mb-4">Instant Consultation</h2>
            <h3 className="text-4xl md:text-5xl font-light serif text-white mb-6">AI에게 <span className="text-[#d4af37]">직접 물어보세요</span></h3>
            <p className="text-gray-500 max-w-xl mx-auto">선택하신 서비스에 대한 현실적인 견적과 커뮤니티 후기 기반의 정보를 AI가 즉시 답변해 드립니다.</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <AIChatBox 
              initialInput={activePrompt} 
              onInputSet={() => setActivePrompt(undefined)} 
            />
          </div>
        </div>

        <div className="bg-[#0d0d0d] rounded-[3rem] p-12 md:p-24 border border-white/5 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/5 blur-[120px] -mr-48 -mt-48" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-light serif mb-10 text-white">AI 공정 최적화 시스템</h2>
              <div className="space-y-10">
                {[
                  { title: "자재 산출 알고리즘", text: "시공 면적 대비 필요 자재를 99% 정확도로 예측하여 폐기물 처리 비용을 30% 절감합니다." },
                  { title: "실시간 공정 모니터링", text: "현장 상황을 실시간으로 분석하여 지연 요소를 사전에 차단하고 인건비 효율을 극대화합니다." },
                  { title: "스마트 소싱 네트워킹", text: "국내외 주요 자재 브랜드와 직결된 네트워크를 통해 유통 거품을 완전히 제거했습니다." }
                ].map((item, i) => (
                  <div key={i} className="group">
                    <h4 className="text-[#d4af37] font-bold mb-3 flex items-center gap-3">
                        <span className="text-xs font-mono opacity-40">0{i+1}</span>
                        {item.title}
                    </h4>
                    <p className="text-gray-500 leading-relaxed group-hover:text-gray-300 transition-colors">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <EditableImage src={images.deep1} alt="AI design" className="rounded-2xl aspect-[3/4]" configPath="services.deep1.imageUrl" />
                <EditableImage src={images.deep2} alt="AI tech" className="rounded-2xl aspect-square" configPath="services.deep2.imageUrl" />
              </div>
              <div className="space-y-6 pt-12">
                <EditableImage src={images.deep3} alt="AI labor" className="rounded-2xl aspect-square" configPath="services.deep3.imageUrl" />
                <EditableImage src={images.deep4} alt="AI material" className="rounded-2xl aspect-[3/4]" configPath="services.deep4.imageUrl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
