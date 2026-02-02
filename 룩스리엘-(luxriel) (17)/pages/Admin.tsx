
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'luxriel_terua_config';
const ADMIN_PASSWORD = '7897*';

const DEFAULT_CONFIG = {
  brandName: 'LuxRiel',
  brandSubName: 'Terua',
  accentColor: '#d4af37',
  home: {
    hero: {
      id: 'hero',
      title: 'LuxRiel\nTerua',
      subtitle: '다정한 기술로 빚는 하이엔드',
      content: '',
      styling: { fontSize: '12rem', color: '#ffffff', fontFamily: 'serif', fontWeight: '700', letterSpacing: '-0.05em' }
    },
    manifesto: {
      id: 'manifesto',
      title: '공간은 당신의 삶을 닮아야 합니다',
      subtitle: '진심을 담은 이야기',
      content: '우리는 단순한 "공사"를 넘어서, 당신의 일상이 더 빛날 수 있는 배경을 만듭니다.',
      styling: { fontSize: '4rem', color: '#ffffff', fontFamily: 'serif', fontWeight: '300', letterSpacing: '-0.02em' }
    },
    engine: {
      id: 'engine',
      title: 'LuxRiel\nTerua Engine',
      subtitle: '지능형 동기화',
      content: '실시간으로 업데이트되는 수만 건의 시공 데이터와 장인들의 노하우를 결합하여, 당신만을 위한 최적의 공간 솔루션을 도출합니다.',
      styling: { fontSize: '8rem', color: '#d4af37', fontFamily: 'luxury-serif', fontWeight: '700', letterSpacing: '-0.03em' }
    }
  },
  services: {
    header: {
      title: '서비스 카테고리',
      subtitle: 'Our Expertise',
      content: '프리미엄 인테리어 랩은 공학적인 접근과 예술적인 감각을 결합합니다.',
      styling: { fontSize: '5rem', color: '#ffffff', fontFamily: 'serif', fontWeight: '300', letterSpacing: '0' }
    }
  },
  portfolio: {
    header: {
      title: 'PROVEN SYSTEMS',
      subtitle: 'Proven Infrastructure',
      content: 'NOT JUST VISUALS.',
      styling: { fontSize: '6rem', color: '#d4af37', fontFamily: 'serif', fontWeight: '300', letterSpacing: '0' }
    }
  },
  pricing: {
    header: {
      title: '거품 없는 AI 견적',
      subtitle: 'Dynamic Pricing',
      content: '모든 공정은 투명하게 공개되며, 인건비와 자재 실비를 제외한 추가 마진을 요구하지 않습니다.',
      styling: { fontSize: '5rem', color: '#ffffff', fontFamily: 'serif', fontWeight: '300', letterSpacing: '0' }
    }
  },
  community: {
    header: {
      title: '당신의 취향을 데이터화 합니다',
      subtitle: 'Preference Intelligence Scanner',
      content: '불필요한 서술 없이, 오직 선택된 데이터만이 당신의 공간을 증명합니다.',
      styling: { fontSize: '4rem', color: '#ffffff', fontFamily: 'serif', fontWeight: '300', letterSpacing: '0' }
    }
  },
  contact: {
    header: {
      title: 'THE DIRECT CONNECTION.',
      subtitle: 'Elite Concierge Direct',
      content: '최고의 공간은 단 한 번의 깊이 있는 대화로부터 시작됩니다.',
      styling: { fontSize: '8rem', color: '#ffffff', fontFamily: 'serif', fontWeight: '300', letterSpacing: '0' }
    },
    info: { phone: '02-1234-5678', address: '서울특별시 강남구 테헤란로 123', operation: 'Mon - Fri: 09:00 - 18:00' }
  }
};

const Admin: React.FC = () => {
  const [isLocked, setIsLocked] = useState(true);
  const [passwordInput, setPasswordInput] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { setConfig(JSON.parse(saved)); } catch (e) { setConfig(DEFAULT_CONFIG); }
    } else setConfig(DEFAULT_CONFIG);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) setIsLocked(false);
    else { alert('접근이 거부되었습니다.'); setPasswordInput(''); }
  };

  const saveConfig = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    alert('설정이 성공적으로 저장되었습니다. 홈페이지에 즉시 반영됩니다.');
  };

  const updateStyling = (page: string, section: string, key: string, value: string) => {
    const newConfig = { ...config };
    newConfig[page][section].styling[key] = value;
    setConfig(newConfig);
  };

  const updateContent = (page: string, section: string, key: string, value: string) => {
    const newConfig = { ...config };
    newConfig[page][section][key] = value;
    setConfig(newConfig);
  };

  if (isLocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-white/[0.02] border border-white/10 p-12 rounded-[3rem] backdrop-blur-3xl text-center shadow-2xl">
          <div className="w-20 h-20 border border-[#d4af37]/40 flex items-center justify-center mx-auto mb-10 rotate-45">
            <span className="text-4xl font-light text-[#d4af37] -rotate-45 serif">LR</span>
          </div>
          <h2 className="text-xl font-light text-white mb-8 tracking-[0.4em] uppercase">Control Center</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" 
              value={passwordInput} 
              onChange={(e) => setPasswordInput(e.target.value)} 
              className="w-full bg-white/[0.05] border border-white/10 rounded-2xl px-6 py-5 text-white text-center text-4xl tracking-widest outline-none focus:border-[#d4af37]/50 transition-colors" 
              placeholder="••••" 
              autoFocus 
            />
            <button className="w-full py-6 bg-[#d4af37] text-black font-black uppercase tracking-widest rounded-2xl hover:bg-white transition-all shadow-lg shadow-[#d4af37]/20">Verify Identity</button>
          </form>
        </motion.div>
      </div>
    );
  }

  if (!config) return null;

  const PageEditor = ({ pageKey }: { pageKey: string }) => {
    const pageData = config[pageKey];
    return (
      <div className="space-y-12">
        {Object.entries(pageData).map(([sectionKey, section]: [string, any]) => (
          <div key={sectionKey} className="bg-white/[0.03] border border-white/10 p-8 md:p-12 rounded-[3rem] space-y-10 relative overflow-hidden group">
            <div className="flex justify-between items-center border-b border-white/5 pb-6">
              <h3 className="text-[#d4af37] text-sm font-bold uppercase tracking-widest flex items-center gap-3">
                <span className="w-2 h-2 bg-[#d4af37] rounded-full" />
                {sectionKey.toUpperCase()} SECTION
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Content Edit */}
              <div className="space-y-6">
                <label className="text-gray-500 text-[10px] uppercase font-black tracking-widest">Text Content</label>
                <div className="space-y-4">
                  <div>
                    <span className="text-gray-600 text-[10px] block mb-2">Title</span>
                    <input 
                      type="text" 
                      value={section.title} 
                      onChange={(e) => updateContent(pageKey, sectionKey, 'title', e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white font-medium focus:border-[#d4af37]/40 outline-none"
                    />
                  </div>
                  {section.subtitle !== undefined && (
                    <div>
                      <span className="text-gray-600 text-[10px] block mb-2">Subtitle</span>
                      <input 
                        type="text" 
                        value={section.subtitle} 
                        onChange={(e) => updateContent(pageKey, sectionKey, 'subtitle', e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white font-medium focus:border-[#d4af37]/40 outline-none"
                      />
                    </div>
                  )}
                  {section.content !== undefined && (
                    <div>
                      <span className="text-gray-600 text-[10px] block mb-2">Description</span>
                      <textarea 
                        value={section.content} 
                        onChange={(e) => updateContent(pageKey, sectionKey, 'content', e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white h-32 focus:border-[#d4af37]/40 outline-none resize-none"
                      />
                    </div>
                  )}
                  {section.imageUrl !== undefined && (
                    <div>
                      <span className="text-gray-600 text-[10px] block mb-2">Image URL</span>
                      <input 
                        type="text" 
                        value={section.imageUrl} 
                        onChange={(e) => updateContent(pageKey, sectionKey, 'imageUrl', e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white text-xs font-mono focus:border-[#d4af37]/40 outline-none"
                        placeholder="https://..."
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Styling Edit */}
              <div className="space-y-6 bg-white/[0.02] p-8 rounded-2xl border border-white/5">
                <label className="text-gray-500 text-[10px] uppercase font-black tracking-widest">Visual Styling</label>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <span className="text-gray-600 text-[10px] block mb-2">Font Size</span>
                    <input 
                      type="text" 
                      value={section.styling.fontSize} 
                      onChange={(e) => updateStyling(pageKey, sectionKey, 'fontSize', e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm"
                    />
                  </div>
                  <div>
                    <span className="text-gray-600 text-[10px] block mb-2">Text Color</span>
                    <div className="flex items-center gap-3">
                      <input 
                        type="color" 
                        value={section.styling.color} 
                        onChange={(e) => updateStyling(pageKey, sectionKey, 'color', e.target.value)}
                        className="w-10 h-10 bg-transparent border-none"
                      />
                      <input 
                        type="text" 
                        value={section.styling.color} 
                        onChange={(e) => updateStyling(pageKey, sectionKey, 'color', e.target.value)}
                        className="flex-grow bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-xs font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 text-[10px] block mb-2">Font Family</span>
                    <select 
                      value={section.styling.fontFamily} 
                      onChange={(e) => updateStyling(pageKey, sectionKey, 'fontFamily', e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm"
                    >
                      <option value="serif">Classic Serif (Bodoni)</option>
                      <option value="luxury-serif">Luxury Serif (Playfair)</option>
                      <option value="sans">Modern Sans (Noto)</option>
                      <option value="futuristic">Futuristic (Orbitron)</option>
                    </select>
                  </div>
                  <div>
                    <span className="text-gray-600 text-[10px] block mb-2">Letter Spacing</span>
                    <input 
                      type="text" 
                      value={section.styling.letterSpacing} 
                      onChange={(e) => updateStyling(pageKey, sectionKey, 'letterSpacing', e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#d4af37] selection:text-black pt-24 pb-40">
      <div className="container mx-auto px-6 max-w-7xl">
        <header className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-white/[0.03] border border-white/10 rounded-2xl">
              <h1 className="text-2xl font-light serif italic">LuxRiel <span className="text-[#d4af37] not-italic font-bold">Studio Engine</span></h1>
            </div>
            <div className="h-10 w-px bg-white/10 hidden md:block" />
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-gray-500">v2.5 Enterprise Edition</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => window.location.href = '/'} className="px-6 py-3 border border-white/10 rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-white/5 transition-all">Preview Site</button>
            <button onClick={saveConfig} className="px-8 py-3 bg-[#d4af37] text-black rounded-xl text-xs font-black tracking-widest uppercase hover:bg-white transition-all shadow-xl shadow-[#d4af37]/20">Sync & Publish</button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar Nav */}
          <nav className="lg:col-span-3 space-y-2">
            {[
              { id: 'home', label: 'Home Page', icon: '🏠' },
              { id: 'services', label: 'Services', icon: '💎' },
              { id: 'portfolio', label: 'Portfolio', icon: '📐' },
              { id: 'pricing', label: 'Pricing', icon: '💰' },
              { id: 'community', label: 'Community', icon: '🤖' },
              { id: 'contact', label: 'Contact', icon: '📞' }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl transition-all border ${activeTab === tab.id ? 'bg-[#d4af37] border-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20 font-black' : 'bg-white/[0.02] border-white/5 text-gray-400 hover:bg-white/5 hover:text-white'}`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span className="text-xs tracking-widest uppercase">{tab.label}</span>
              </button>
            ))}
          </nav>

          {/* Editor Area */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "circOut" }}
              >
                <PageEditor pageKey={activeTab} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
