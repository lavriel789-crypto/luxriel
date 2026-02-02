
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AIChatBox from '../components/AIChatBox';
import EditableImage from '../components/EditableImage';
import EditableText from '../components/EditableText';

const Portfolio: React.FC = () => {
  const [showArchive, setShowArchive] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [siteConfig, setSiteConfig] = useState<any>(null);

  const defaultProjects = [
    { id: '1', title: '한남동 더 힐 60평형', category: 'Residential', imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80' },
    { id: '2', title: '성수동 감성 카페', category: 'Commercial', imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80' },
    { id: '3', title: '청담동 오피스 쇼룸', category: 'Commercial', imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80' },
    { id: '4', title: '트리마제 30평형 미니멀', category: 'Residential', imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80' },
    { id: '5', title: '판교 단독주택 모던키친', category: 'Residential', imageUrl: 'https://images.unsplash.com/photo-1556912177-c54030639a03?auto=format&fit=crop&q=80' },
    { id: '6', title: '제주 호텔 스튜디오', category: 'Hospitality', imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80' },
  ];

  const loadConfig = useCallback(() => {
    const saved = localStorage.getItem('luxriel_terua_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSiteConfig(parsed.portfolio || {});
        const overrides = parsed.portfolio?.projects || {};
        const merged = defaultProjects.map((proj, idx) => {
          const override = overrides[idx];
          return {
            ...proj,
            imageUrl: (override && override.imageUrl) ? override.imageUrl : proj.imageUrl,
            syncTitle: (override && override.description) ? override.description : proj.title
          };
        });
        setProjects(merged);
      } catch (e) {
        setProjects(defaultProjects);
      }
    } else {
      setProjects(defaultProjects);
    }
  }, []);

  useEffect(() => {
    loadConfig();
    window.addEventListener('configUpdated', loadConfig);
    return () => window.removeEventListener('configUpdated', loadConfig);
  }, [loadConfig]);

  return (
    <div className="bg-[#050505] min-h-screen pt-32 md:pt-48 pb-20 px-4 md:px-8 selection:bg-[#FFD700] selection:text-black">
      <div className="container mx-auto">
        <header className="max-w-5xl mb-40">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <EditableText configPath="portfolio.header.sub" defaultText="The Philosophy of Execution" className="text-[#FFD700] text-xs font-bold tracking-[0.8em] uppercase mb-8 block" />
            <h1 className="text-white text-4xl sm:text-6xl md:text-[110px] font-light leading-none serif mb-10 tracking-tighter">
              <EditableText configPath="portfolio.header.title1" defaultText="TRUE" as="span" /> <span className="text-[#FFD700] italic"><EditableText configPath="portfolio.header.title2" defaultText="RESPONSIBILITY" as="span" /></span>
            </h1>
            <EditableText configPath="portfolio.header.desc" defaultText="인테리어 디자인은 이제 상향 평준화되었습니다. 진정으로 중요한 것은 화려한 3D 가안이 아니라, 현장에서의 정직한 이행과 약속된 비용의 투명성입니다." className="text-gray-400 text-lg md:text-2xl leading-relaxed font-light max-w-4xl" />
          </motion.div>
        </header>

        {/* [NEW] RESPONSIBILITY PROTOCOL - 책임감 섹션 */}
        <section className="mb-64 bg-white/[0.02] border border-white/5 rounded-[4rem] p-10 md:p-32 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FFD700]/5 blur-[150px] -mr-96 -mt-96" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center relative z-10">
            <div>
              <EditableText configPath="portfolio.protocol.sub" defaultText="Execution Commitment" className="text-[#FFD700] text-xs font-bold tracking-[0.4em] uppercase mb-8 block" />
              <h2 className="text-3xl md:text-7xl font-light text-white serif mb-12 leading-tight">
                <EditableText configPath="portfolio.protocol.title1" defaultText="누구나 그리지만," as="span" /><br/>
                <EditableText configPath="portfolio.protocol.title2" defaultText="우리는 완성합니다" className="text-[#FFD700]" as="span" />
              </h2>
              <EditableText 
                configPath="portfolio.protocol.desc"
                defaultText="룩스리엘은 시공 지연 제로(Zero) 원칙을 고수합니다. 디자인이 아무리 좋아도 약속된 시공팀이 책임 있게 이행하지 않는다면 공간의 가치는 퇴색됩니다. 우리는 직영 시공팀과의 다이렉트 매칭을 통해 공사 기간과 품질에 대해 실제적인 책임을 집니다."
                className="text-gray-400 text-lg md:text-xl font-light leading-relaxed mb-16"
              />
              <div className="grid grid-cols-2 gap-12">
                <div className="border-l border-[#FFD700]/30 pl-8">
                  <EditableText configPath="portfolio.stat1.val" defaultText="0% Delay" className="text-white text-3xl font-light serif mb-2" />
                  <EditableText configPath="portfolio.stat1.label" defaultText="Strict Schedule Control" className="text-gray-600 text-[10px] uppercase tracking-widest" />
                </div>
                <div className="border-l border-[#FFD700]/30 pl-8">
                  <EditableText configPath="portfolio.stat2.val" defaultText="Direct Team" className="text-white text-3xl font-light serif mb-2" />
                  <EditableText configPath="portfolio.stat2.label" defaultText="Master Craftsmanship" className="text-gray-600 text-[10px] uppercase tracking-widest" />
                </div>
              </div>
            </div>
            <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group">
              <EditableImage 
                src={siteConfig?.protocol?.imageUrl || "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80"}
                alt="Accountability in Action"
                configPath="portfolio.protocol.imageUrl"
                className="w-full h-full"
              />
            </div>
          </div>
        </section>

        {/* [NEW] THE VALUE ENGINEERING - 가격의 정직성 섹션 */}
        <section className="mb-64">
           <div className="flex flex-col lg:flex-row gap-20 items-end mb-32">
              <div className="flex-grow">
                <EditableText configPath="portfolio.value.sub" defaultText="Net-Cost Architecture" className="text-[#FFD700] text-xs font-bold tracking-[0.8em] uppercase mb-8 block" />
                <h2 className="text-4xl md:text-[100px] font-light text-white serif italic leading-none">
                  <EditableText configPath="portfolio.value.title1" defaultText="Price" as="span" /> <span className="text-[#FFD700] not-italic"><EditableText configPath="portfolio.value.title2" defaultText="Over" as="span" /></span> <EditableText configPath="portfolio.value.title3" defaultText="Profit" as="span" />
                </h2>
              </div>
              <div className="max-w-xl">
                 <EditableText 
                  configPath="portfolio.value.desc"
                  defaultText="좋은 자재를 쓰는 것은 당연합니다. 하지만 왜 타사보다 저렴할까요? 우리는 유통 거품과 업체 마진을 제거하고 기술자의 '직영 시공비' 그대로를 적용하기 때문입니다. 테루아에게 실제 시공팀 단가를 물어보세요."
                  className="text-gray-500 text-xl font-light leading-relaxed text-right italic"
                 />
              </div>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="aspect-[16/10] rounded-[4rem] overflow-hidden border border-white/5 relative group">
                <EditableImage 
                  src={siteConfig?.value1?.imageUrl || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"}
                  alt="Material Sourcing"
                  configPath="portfolio.value1.imageUrl"
                  className="w-full h-full"
                />
                <div className="absolute top-10 left-10 bg-black/70 backdrop-blur-xl px-8 py-4 rounded-full border border-[#FFD700]/20">
                   <EditableText configPath="portfolio.value1.label" defaultText="Direct Logistics: Italy" className="text-[#FFD700] text-[10px] font-bold tracking-widest uppercase" />
                </div>
              </div>
              <div className="aspect-[16/10] rounded-[4rem] overflow-hidden border border-white/5 relative group">
                <EditableImage 
                  src={siteConfig?.value2?.imageUrl || "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80"}
                  alt="Team Matching"
                  configPath="portfolio.value2.imageUrl"
                  className="w-full h-full"
                />
                <div className="absolute top-10 left-10 bg-black/70 backdrop-blur-xl px-8 py-4 rounded-full border border-[#FFD700]/20">
                   <EditableText configPath="portfolio.value2.label" defaultText="Master Team Matching" className="text-[#FFD700] text-[10px] font-bold tracking-widest uppercase" />
                </div>
              </div>
           </div>
        </section>

        {/* [AI STRATEGIC SECTION] 테루아 질문 유도 시스템 */}
        <section className="mb-64 py-32 bg-[#080808] rounded-[5rem] border border-[#FFD700]/10 relative overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)]">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFD700]/5 to-transparent pointer-events-none" />
          <div className="container mx-auto px-6 max-w-6xl text-center relative z-10">
            <EditableText configPath="portfolio.ai.sub" defaultText="Strategic Data Consultation" className="text-[#FFD700] text-xs font-bold tracking-[1em] uppercase mb-12 block" />
            <h2 className="text-4xl md:text-8xl font-light text-white serif mb-12">
              <EditableText configPath="portfolio.ai.title1" defaultText="테루아에게" as="span" /> <span className="text-[#FFD700]"><EditableText configPath="portfolio.ai.title2" defaultText="날카롭게" as="span" /></span> <EditableText configPath="portfolio.ai.title3" defaultText="물으세요" as="span" />
            </h2>
            <EditableText 
              configPath="portfolio.ai.desc"
              defaultText="겉모습만 보고 판단하지 마십시오. 시공 지연 시 보상 규정, 공정별 기술자 직영가 좌표, 사후 관리 매뉴얼 등 실제적인 이행과 비용의 가치에 대해 테루아가 데이터로 입증해 드립니다."
              className="text-gray-400 text-lg md:text-2xl font-light leading-relaxed mb-24 max-w-4xl mx-auto"
            />
            
            <div className="mb-24">
              <AIChatBox />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
               <div className="p-10 bg-white/[0.03] rounded-3xl border border-white/5 flex items-center gap-8 group hover:border-[#FFD700]/40 transition-all cursor-help">
                  <div className="w-14 h-14 rounded-full border border-[#FFD700]/30 flex items-center justify-center text-[#FFD700] font-bold text-xl">?</div>
                  <div>
                    <EditableText configPath="portfolio.ai.q1" defaultText="&quot;시공 품질 불량이나 지연 시 어떤 법적/금전적 책임을 지나요?&quot;" className="text-lg text-gray-500 group-hover:text-white transition-colors" />
                    <span className="text-[10px] text-gray-700 uppercase tracking-widest mt-2 block">Direct accountability system</span>
                  </div>
               </div>
               <div className="p-10 bg-white/[0.03] rounded-3xl border border-white/5 flex items-center gap-8 group hover:border-[#FFD700]/40 transition-all cursor-help">
                  <div className="w-14 h-14 rounded-full border border-[#FFD700]/30 flex items-center justify-center text-[#FFD700] font-bold text-xl">?</div>
                  <div>
                    <EditableText configPath="portfolio.ai.q2" defaultText="&quot;시중 하이엔드 업체 대비 직영가 견적의 구체적인 절감 좌표는?&quot;" className="text-lg text-gray-500 group-hover:text-white transition-colors" />
                    <span className="text-[10px] text-gray-700 uppercase tracking-widest mt-2 block">Net-cost data coordinate</span>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* 아카이브 리스트 (수정 가능한 텍스트 적용) */}
        <section className="text-center mb-64">
            <div className="w-px h-32 bg-gradient-to-b from-[#FFD700] to-transparent mx-auto mb-20" />
            <button onClick={() => setShowArchive(!showArchive)} className="px-20 py-8 rounded-full border border-[#FFD700]/40 text-[#FFD700] font-bold uppercase tracking-[0.4em] hover:bg-[#FFD700] hover:text-black transition-all shadow-2xl text-sm">
              {showArchive ? 'Close System Archive' : 'Access System Archive'}
            </button>
            
            <AnimatePresence>
              {showArchive && (
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="mt-40">
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20">
                    {projects.map((project: any, i: number) => (
                      <div key={project.id} className="group text-left">
                        <div className="aspect-[4/5] overflow-hidden rounded-[3rem] mb-10 border border-white/5 relative">
                          <EditableImage 
                            src={project.imageUrl} 
                            alt={project.title} 
                            className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000" 
                            configPath={`portfolio.projects.${i}.imageUrl`}
                          />
                        </div>
                        <div className="px-4">
                          <span className="text-[10px] text-[#FFD700] uppercase tracking-[0.6em] font-black block mb-6 opacity-60">{project.category}</span>
                          <EditableText 
                            configPath={`portfolio.projects.${i}.description`} 
                            defaultText={project.syncTitle} 
                            className="text-2xl md:text-3xl font-light serif text-white group-hover:text-[#FFD700] transition-colors leading-tight"
                            as="h4"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
        </section>
      </div>
    </div>
  );
};

export default Portfolio;
