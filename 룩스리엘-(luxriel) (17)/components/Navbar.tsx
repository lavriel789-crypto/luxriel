
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on location change only
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Handle body scroll lock
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const navLinks = [
    { name: '홈', path: '/', sub: 'MAIN ARCHIVE', icon: '🏠' },
    { name: '서비스', path: '/services', sub: 'EXPERT SCOPE', icon: '💎' },
    { name: '포트폴리오', path: '/portfolio', sub: 'MASTER WORKS', icon: '📐' },
    { name: '가격·견적', path: '/price', sub: 'AI ESTIMATE', icon: '💰' },
    { name: '커뮤니티', path: '/community', sub: 'DATA INTELLIGENCE', icon: '🤖' },
    { name: '다이렉트', path: '/contact', sub: 'CONCIERGE', icon: '📞' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled || isMenuOpen ? 'bg-black/95 backdrop-blur-2xl py-4 border-b border-[#d4af37]/20 shadow-2xl' : 'bg-transparent py-6 md:py-10'}`}>
      <div className="container mx-auto px-5 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 md:space-x-6 group relative z-[60]">
          <div className="relative">
            <div className="w-10 h-10 md:w-12 md:h-12 border border-[#d4af37]/40 flex items-center justify-center rotate-45 transition-all duration-700 group-hover:rotate-[225deg] bg-black/40">
                <span className="text-lg md:text-xl font-light text-[#d4af37] -rotate-45 group-hover:-rotate-[225deg] transition-all duration-700 serif tracking-tighter">LR</span>
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#d4af37] rotate-45" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-light tracking-[0.3em] md:tracking-[0.4em] text-white serif group-hover:text-[#d4af37] transition-colors leading-none uppercase">
              LUXRIEL
            </span>
            <span className="text-[7px] md:text-[8px] tracking-[0.4em] md:tracking-[0.5em] text-[#d4af37] uppercase futuristic mt-1.5 opacity-50 font-bold">The Elite Atelier</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-12">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-[11px] uppercase tracking-[0.4em] transition-all hover:text-[#d4af37] relative group ${location.pathname === link.path ? 'text-[#d4af37] font-bold' : 'text-gray-400'}`}
            >
              {link.name}
              <span className={`absolute -bottom-2 left-0 w-0 h-px bg-[#d4af37] transition-all duration-500 group-hover:w-full ${location.pathname === link.path ? 'w-full' : ''}`} />
            </Link>
          ))}
          <Link
            to="/admin"
            className="px-6 py-2.5 border border-[#d4af37]/30 text-[#d4af37] text-[10px] tracking-[0.3em] font-bold hover:bg-[#d4af37] hover:text-black transition-all rounded-sm uppercase"
          >
            Access
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden relative z-[60] text-[#d4af37] w-12 h-12 flex items-center justify-center bg-white/5 rounded-full border border-white/10"
          aria-label="Toggle Menu"
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <motion.span 
              animate={isMenuOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
              className="w-full h-0.5 bg-[#d4af37] origin-center"
            />
            <motion.span 
              animate={isMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              className="w-full h-0.5 bg-[#d4af37]"
            />
            <motion.span 
              animate={isMenuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
              className="w-full h-0.5 bg-[#d4af37] origin-center"
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay - Dashboard Style */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="lg:hidden fixed inset-0 bg-black pt-[100px] px-6 pb-12 z-[50] overflow-y-auto h-screen"
          >
            <div className="container mx-auto">
              <div className="mb-12">
                <span className="text-[#d4af37] text-[9px] font-black uppercase tracking-[0.5em] block mb-2 opacity-50">Digital Concierge</span>
                <h3 className="text-3xl font-light text-white serif tracking-tight">룩스리엘 <span className="text-[#d4af37]">내비게이션</span></h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 + 0.2 }}
                  >
                    <Link
                      to={link.path}
                      className={`flex flex-col h-32 p-5 rounded-2xl border transition-all ${
                        location.pathname === link.path 
                        ? 'bg-[#d4af37] border-[#d4af37] text-black shadow-[0_10px_30px_rgba(212,175,55,0.3)]' 
                        : 'bg-white/5 border-white/10 text-white active:bg-white/10'
                      }`}
                    >
                      <span className="text-2xl mb-auto">{link.icon}</span>
                      <div className="flex flex-col">
                        <span className={`text-[9px] font-black uppercase tracking-widest mb-1 futuristic ${location.pathname === link.path ? 'opacity-60' : 'opacity-30'}`}>{link.sub}</span>
                        <span className="text-base font-bold tracking-tight">{link.name}</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 pt-12 border-t border-white/10 grid grid-cols-1 gap-4">
                <Link
                  to="/admin"
                  className="w-full py-5 bg-white/5 border border-white/10 text-[#d4af37] text-center text-[10px] font-black tracking-[0.4em] uppercase rounded-2xl"
                >
                  System Root Access
                </Link>
                <a 
                  href="tel:02-1234-5678"
                  className="w-full py-5 bg-[#d4af37]/10 border border-[#d4af37]/30 text-white text-center text-sm font-bold tracking-widest uppercase rounded-2xl"
                >
                  Concierge Call
                </a>
              </div>
              
              <div className="mt-12 text-center">
                <p className="text-gray-600 text-[9px] uppercase tracking-widest">© 2025 LUXRIEL ELITE INTERIORS</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
