
import React from 'react';
import { Link } from 'react-router-dom';
import EditableText from './EditableText';
import EditableImage from './EditableImage';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] pt-32 pb-16 border-t border-white/5 relative overflow-hidden">
      {/* Decorative gradient background */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#d4af37]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-6 mb-10">
              <div className="w-14 h-14 border border-[#d4af37]/40 flex items-center justify-center rotate-45">
                <span className="text-2xl font-light text-[#d4af37] -rotate-45 serif">LR</span>
              </div>
              <div className="flex flex-col">
                <h2 className="text-3xl font-light serif text-white tracking-[0.3em]">LUXRIEL</h2>
                <span className="text-[9px] text-[#d4af37] tracking-[0.5em] uppercase futuristic opacity-60">Architectural Interior Studio</span>
              </div>
            </div>
            <p className="text-gray-500 max-w-md mb-12 leading-relaxed text-sm font-light">
              룩스리엘은 공간의 경제학을 재정의하는 하이엔드 테크니컬 스튜디오입니다. 
              우리는 인테리어 시장의 불투명성을 제거하고, AI 최적화를 통해 
              진정한 럭셔리의 가치를 시중가 절반의 혁신적인 비용으로 실현합니다.
            </p>
            <div className="flex space-x-10">
              {['Instagram', 'Youtube', 'Pinterest'].map(social => (
                <a key={social} href="#" className="text-[10px] text-gray-600 hover:text-[#d4af37] transition-all tracking-widest uppercase font-bold">{social}</a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-[#d4af37] font-bold mb-10 uppercase tracking-[0.3em] text-[10px]">Navigational Index</h3>
            <ul className="space-y-6">
              {[
                { name: '홈', path: '/' },
                { name: '서비스 스코프', path: '/services' },
                { name: '마스터 포트폴리오', path: '/portfolio' },
                { name: 'AI 견적 시스템', path: '/price' },
                { name: '인텔리전스 커뮤니티', path: '/community' },
                { name: '다이렉트 컨시어지', path: '/contact' }
              ].map(item => (
                <li key={item.name}>
                  <Link to={item.path} className="text-gray-500 hover:text-white transition-all text-xs font-light tracking-wide">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-[#d4af37] font-bold mb-10 uppercase tracking-[0.3em] text-[10px]">Headquarters</h3>
            
            {/* HQ Image Asset - 수정 가능하도록 유지 */}
            <div className="w-full aspect-video rounded-2xl overflow-hidden border border-white/5 mb-8 shadow-2xl">
              <EditableImage 
                configPath="footer.hq.imageUrl" 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" 
                alt="Headquarters"
                className="w-full h-full"
              />
            </div>

            <ul className="space-y-6 text-gray-500 text-xs font-light leading-relaxed">
              <li className="tracking-wide">
                <EditableText configPath="footer.hq.address1" defaultText="서울특별시 강남구 테헤란로 123" as="span" /><br/>
                <EditableText configPath="footer.hq.address2" defaultText="LuxRiel Tower 45-50F" as="span" />
              </li>
              <li className="text-white font-medium">
                T. <EditableText configPath="contact.info.phone" defaultText="02-1234-5678" as="span" />
              </li>
              <li>
                E. <EditableText configPath="footer.hq.email" defaultText="concierge@luxriel.co.kr" as="span" />
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-pulse" />
                Kakao. <EditableText configPath="footer.hq.kakao" defaultText="@luxriel_official" as="span" />
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-gray-600 text-[10px] tracking-widest uppercase">
          <p>© 2025 LUXRIEL STUDIO. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center space-x-10 mt-8 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Legal</a>
            <Link to="/admin" className="px-4 py-1.5 border border-[#d4af37]/30 text-[#d4af37] rounded-full hover:bg-[#d4af37] hover:text-black transition-all font-bold">SYSTEM LOG</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
