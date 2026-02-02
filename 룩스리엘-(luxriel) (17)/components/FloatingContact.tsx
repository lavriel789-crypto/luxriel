
import React, { useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import EditableText from './EditableText';

const FloatingContact: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [isHovered, setIsHovered] = useState(false);
  
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const smoothY = useSpring(yOffset, { stiffness: 60, damping: 20 });

  return (
    <motion.div
      style={{ y: smoothY }}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.5, delay: 2, ease: "circOut" }} 
      className="fixed bottom-8 right-6 md:bottom-16 md:right-16 z-[100] pointer-events-auto scale-90 md:scale-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative flex items-center group">
        {/* Living Pulse - 로고와 동일한 위치 보정 */}
        <div className="absolute -top-1 -left-1 z-20 pointer-events-none">
          <div className="w-2.5 h-2.5 bg-[#d4af37] rounded-full animate-ping opacity-40" />
          <div className="absolute inset-0 w-2.5 h-2.5 bg-[#d4af37] rounded-full shadow-[0_0_12px_#d4af37]" />
        </div>

        {/* Floating Diamond Body - 브랜드 로고 아이덴티티 적용 */}
        <motion.div 
          animate={{ 
            width: isHovered ? 'auto' : 'unset',
            paddingRight: isHovered ? '2.2rem' : '0.8rem',
            backgroundColor: isHovered ? 'rgba(5, 5, 5, 0.98)' : 'rgba(5, 5, 5, 0.85)'
          }}
          className="flex items-center gap-4 md:gap-7 pl-1.5 py-1.5 md:pl-2 md:py-2 backdrop-blur-3xl border border-[#d4af37]/20 rounded-xl md:rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] transition-all duration-700 hover:border-[#d4af37]/50"
        >
          {/* Logo Diamond Emblem - 회전된 다이아몬드 프레임 */}
          <motion.div 
            animate={{ rotate: isHovered ? 225 : 45 }}
            transition={{ duration: 0.8, ease: "anticipate" }}
            className="flex items-center justify-center w-10 h-10 md:w-16 md:h-16 border border-[#d4af37]/40 bg-black shadow-lg"
          >
            <span className="text-[10px] md:text-2xl font-light text-[#d4af37] -rotate-45 serif tracking-tighter">LR</span>
          </motion.div>

          {/* Contact Details - 프리미엄 컨시어지 룩 */}
          <div className="flex flex-col pr-3 md:pr-5 overflow-hidden">
            <motion.span 
              animate={{ opacity: isHovered ? 1 : 0.7, x: isHovered ? 0 : 5 }}
              className="text-[8px] md:text-[11px] font-black text-[#d4af37] uppercase tracking-[0.4em] mb-1 futuristic"
            >
              Elite Concierge
            </motion.span>
            <EditableText 
              configPath="contact.info.phone" 
              defaultText="02.1234.5678" 
              className="text-sm md:text-3xl font-light text-white tracking-[0.08em] serif leading-none"
              as="span"
            />
          </div>
          
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-[#d4af37] hidden sm:block"
              >
                <svg className="w-5 h-5 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Outer Glow Effect */}
        <div className="absolute inset-0 bg-[#d4af37]/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
      </div>
    </motion.div>
  );
};

export default FloatingContact;
