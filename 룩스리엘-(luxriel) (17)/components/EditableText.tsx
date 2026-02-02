
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EditableTextProps {
  configPath: string;
  defaultText: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

const EditableText: React.FC<EditableTextProps> = ({ configPath, defaultText, className, as: Tag = 'p' }) => {
  const [showAuth, setShowAuth] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [idInput, setIdInput] = useState('');
  const [pwInput, setPwInput] = useState('');
  const [currentText, setCurrentText] = useState(defaultText);
  const [tempText, setTempText] = useState('');

  const STORAGE_KEY = 'luxriel_terua_config';
  const TARGET_ID = 'holylux';
  const TARGET_PW = '7897*';

  useEffect(() => {
    const loadValue = () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const config = JSON.parse(saved);
          const val = configPath.split('.').reduce((acc, part) => acc && acc[part], config);
          if (typeof val === 'string') setCurrentText(val);
        } catch (e) {}
      }
    };
    loadValue();
    window.addEventListener('configUpdated', loadValue);
    return () => window.removeEventListener('configUpdated', loadValue);
  }, [configPath]);

  const handleEditTrigger = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (sessionStorage.getItem('lux_auth') === 'true') {
      setTempText(currentText);
      setShowEdit(true);
    } else {
      setShowAuth(true);
    }
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (idInput === TARGET_ID && pwInput === TARGET_PW) {
      sessionStorage.setItem('lux_auth', 'true');
      setShowAuth(false);
      setTempText(currentText);
      setShowEdit(true);
    } else {
      alert('인증 실패');
      setIdInput(''); setPwInput('');
    }
  };

  const handleSave = () => {
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

    setNestedValue(config, configPath, tempText);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    setCurrentText(tempText);
    setShowEdit(false);
    window.dispatchEvent(new Event('configUpdated'));
  };

  return (
    <div className={`relative group/text inline-block ${className}`}>
      <Tag className="whitespace-pre-line">{currentText}</Tag>
      
      {/* 비밀 도트 버튼 - 모바일에서는 조금 더 크게 터치 영역 확보 */}
      <div 
        onClick={handleEditTrigger}
        className="absolute -top-2 -right-6 w-8 h-8 z-40 flex items-center justify-center cursor-pointer opacity-0 group-hover/text:opacity-40 hover:!opacity-100 transition-opacity"
      >
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#FFD700] rounded-full shadow-[0_0_8px_#FFD700]" />
      </div>

      <AnimatePresence>
        {showAuth && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[20000] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
            onClick={() => setShowAuth(false)}
          >
            <motion.div className="bg-[#0a0a0a] border border-[#FFD700]/20 p-8 md:p-10 rounded-[2rem] w-full max-w-sm text-center shadow-2xl" onClick={e => e.stopPropagation()}>
              <h4 className="text-white text-[10px] md:text-xs tracking-widest uppercase mb-6 serif font-bold">Access Restricted</h4>
              <form onSubmit={handleAuth} className="space-y-4">
                <input type="text" placeholder="ID" value={idInput} onChange={e => setIdInput(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-[#FFD700]/40" />
                <input type="password" placeholder="PW" value={pwInput} onChange={e => setPwInput(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-[#FFD700]/40" />
                <button className="w-full py-4 bg-[#FFD700] text-black font-black rounded-xl text-[10px] md:text-xs uppercase tracking-widest">Verify</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showEdit && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[20001] flex items-center justify-center bg-black/95 backdrop-blur-3xl p-4"
            onClick={() => setShowEdit(false)}
          >
            <motion.div className="bg-[#0d0d0d] border border-white/10 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] w-full max-w-lg shadow-2xl" onClick={e => e.stopPropagation()}>
              <h3 className="text-[#FFD700] text-base md:text-lg font-light serif italic mb-6">Edit Text Content</h3>
              <textarea 
                value={tempText} 
                onChange={e => setTempText(e.target.value)}
                className="w-full h-40 md:h-48 bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 text-white text-sm outline-none focus:border-[#FFD700]/50 resize-none mb-6"
              />
              <div className="flex gap-3 md:gap-4">
                <button onClick={() => setShowEdit(false)} className="flex-1 py-4 bg-white/5 text-gray-400 rounded-xl text-[10px] md:text-xs uppercase font-bold tracking-widest">Cancel</button>
                <button onClick={handleSave} className="flex-1 py-4 bg-[#FFD700] text-black rounded-xl text-[10px] md:text-xs uppercase font-black tracking-widest">Apply</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EditableText;
