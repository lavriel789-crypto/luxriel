
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EditableImageProps {
  src: string;
  alt: string;
  className?: string;
  configPath: string; // 예: 'home.artisan1.imageUrl'
  onUpdate?: (newUrl: string, newText: string) => void;
}

const EditableImage: React.FC<EditableImageProps> = ({ src, alt, className, configPath, onUpdate }) => {
  const [showAuth, setShowAuth] = useState(false);
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [idInput, setIdInput] = useState('');
  const [pwInput, setPwInput] = useState('');
  
  const [currentText, setCurrentText] = useState('');
  const [tempText, setTempText] = useState('');
  const [tempImage, setTempImage] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const STORAGE_KEY = 'luxriel_terua_config';
  const TARGET_ID = 'holylux';
  const TARGET_PW = '7897*';

  // 초기 데이터 로드 (이미지와 텍스트 세트)
  useEffect(() => {
    const loadValue = () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const config = JSON.parse(saved);
          const descPath = configPath.replace('.imageUrl', '.description');
          
          const getNestedValue = (obj: any, path: string) => {
            return path.split('.').reduce((acc, part) => acc && acc[part], obj);
          };
          
          const val = getNestedValue(config, descPath);
          if (typeof val === 'string') setCurrentText(val);
        } catch (e) {}
      }
    };
    loadValue();
    window.addEventListener('configUpdated', loadValue);
    return () => window.removeEventListener('configUpdated', loadValue);
  }, [configPath]);

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (sessionStorage.getItem('lux_auth') === 'true') {
      openEditPanel();
    } else {
      setShowAuth(true);
    }
  };

  const openEditPanel = () => {
    setTempText(currentText);
    setTempImage(null);
    setShowEditPanel(true);
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (idInput === TARGET_ID && pwInput === TARGET_PW) {
      sessionStorage.setItem('lux_auth', 'true');
      setShowAuth(false);
      openEditPanel();
    } else {
      alert('인증 정보가 일치하지 않습니다.');
      setIdInput('');
      setPwInput('');
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const finalImage = tempImage || src;
    const finalText = tempText;

    updateGlobalConfig(finalImage, finalText);
    setCurrentText(finalText);
    if (onUpdate) onUpdate(finalImage, finalText);
    setShowEditPanel(false);
  };

  const updateGlobalConfig = (newUrl: string, newText: string) => {
    const saved = localStorage.getItem(STORAGE_KEY);
    let config = saved ? JSON.parse(saved) : {};
    
    const setNestedValue = (obj: any, path: string, value: any) => {
      const parts = path.split('.');
      let current = obj;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) current[parts[i]] = {};
        current = current[parts[i]];
      }
      current[parts[parts.length - 1]] = value;
    };

    setNestedValue(config, configPath, newUrl);
    setNestedValue(config, configPath.replace('.imageUrl', '.description'), newText);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    window.dispatchEvent(new Event('configUpdated'));
  };

  return (
    <>
      <div className={`relative group overflow-hidden ${className}`}>
        <img src={tempImage || src} alt={alt} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
        
        <AnimatePresence>
          {currentText && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-0 left-0 w-full z-10 pointer-events-none"
            >
              <div className="w-full h-[0.5px] bg-gradient-to-r from-transparent via-[#FFD700]/40 to-transparent" />
              <div className="bg-black/75 backdrop-blur-lg px-4 py-3 md:px-8 md:py-6 flex items-center justify-between">
                <p className="text-white text-[11px] md:text-lg font-light tracking-wide leading-snug md:leading-relaxed serif italic border-l-[0.5px] border-[#FFD700]/30 pl-3 md:pl-4">
                  {currentText}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 비밀 도트 버튼 - 더 밝은 금색으로 변경 */}
        <div 
          onClick={handleImageClick}
          className="absolute top-1 right-1 w-8 h-8 z-30 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-40 hover:!opacity-100 transition-opacity duration-500"
        >
           <div className="w-1.5 h-1.5 bg-[#FFD700] rounded-full shadow-[0_0_10px_#FFD700,0_0_20px_#FFD700]" />
        </div>
      </div>

      <AnimatePresence>
        {showAuth && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/98 backdrop-blur-2xl p-4 md:p-6"
            onClick={() => setShowAuth(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-[#0a0a0a] border border-[#FFD700]/10 p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] w-full max-w-sm shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-center mb-8 md:mb-10">
                <h3 className="text-white text-lg md:text-xl font-light tracking-[0.3em] uppercase serif">Master Access</h3>
              </div>
              <form onSubmit={handleAuth} className="space-y-4 md:space-y-5">
                <input 
                  type="text" placeholder="IDENTITY" value={idInput} onChange={e => setIdInput(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#FFD700]/40"
                />
                <input 
                  type="password" placeholder="SECURITY KEY" value={pwInput} onChange={e => setPwInput(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#FFD700]/40"
                />
                <button className="w-full py-4 md:py-5 bg-[#FFD700] text-black font-black uppercase tracking-widest rounded-xl md:rounded-2xl text-[10px] md:text-xs hover:bg-white transition-all">Verify Credentials</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showEditPanel && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/98 backdrop-blur-3xl p-4 md:p-6"
            onClick={() => setShowEditPanel(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 30 }}
              className="bg-[#0d0d0d] border border-white/5 p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] w-full max-w-3xl shadow-2xl overflow-hidden relative max-h-[90dvh] flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6 md:mb-10 border-b border-white/5 pb-4 md:pb-6">
                <h3 className="text-white text-lg md:text-2xl font-light serif tracking-widest uppercase italic">Asset <span className="text-[#FFD700]">Configurator</span></h3>
                <button onClick={() => setShowEditPanel(false)} className="text-gray-500 hover:text-white transition-colors text-xs md:text-sm">✕ CLOSE</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 overflow-y-auto custom-scrollbar pr-1">
                <div className="space-y-4 md:space-y-6">
                  <label className="text-[9px] md:text-[10px] text-gray-500 font-black tracking-widest uppercase">Visual Preview</label>
                  <div className="aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden border border-white/10 bg-black relative group">
                    <img src={tempImage || src} className="w-full h-full object-cover" alt="Preview" />
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center text-[10px] font-bold text-[#FFD700] uppercase tracking-widest"
                    >
                      Update Media
                    </button>
                  </div>
                  <input type="file" ref={fileInputRef} onChange={onFileChange} accept="image/*" className="hidden" />
                </div>

                <div className="space-y-4 md:space-y-6 flex flex-col">
                  <label className="text-[9px] md:text-[10px] text-gray-500 font-black tracking-widest uppercase">Caption Text</label>
                  <textarea 
                    value={tempText}
                    onChange={(e) => setTempText(e.target.value)}
                    placeholder="이미지 하단 캡션을 입력하세요"
                    className="flex-grow w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 text-white text-xs md:text-sm outline-none focus:border-[#FFD700]/40 transition-colors resize-none h-[120px] md:h-[220px]"
                  />
                </div>
              </div>

              <div className="mt-8 md:mt-12 flex gap-3 md:gap-4 shrink-0">
                <button 
                  onClick={() => setShowEditPanel(false)}
                  className="flex-1 py-4 md:py-5 bg-white/5 text-gray-500 font-bold uppercase tracking-widest rounded-xl md:rounded-2xl text-[9px] md:text-[10px]"
                >
                  Discard
                </button>
                <button 
                  onClick={handleSave}
                  className="flex-[2] py-4 md:py-5 bg-[#FFD700] text-black font-black uppercase tracking-widest rounded-xl md:rounded-2xl text-[9px] md:text-[10px] shadow-lg shadow-[#FFD700]/20"
                >
                  Apply Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EditableImage;
