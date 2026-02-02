
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import EditableImage from '../components/EditableImage';
import EditableText from '../components/EditableText';

const Contact: React.FC = () => {
  const [siteConfig, setSiteConfig] = useState<any>(null);

  const loadConfig = () => {
    const saved = localStorage.getItem('luxriel_terua_config');
    if (saved) {
      try {
        setSiteConfig(JSON.parse(saved).contact || {});
      } catch (e) { setSiteConfig({}); }
    }
  };

  useEffect(() => {
    loadConfig();
    window.addEventListener('configUpdated', loadConfig);
    return () => window.removeEventListener('configUpdated', loadConfig);
  }, []);

  return (
    <div className="pt-24 md:pt-40 pb-20 md:pb-40 px-4 md:px-6 bg-[#0a0a0a] min-h-screen">
      <div className="container mx-auto">
        <header className="mb-12 md:mb-32 text-center relative">
          <EditableText configPath="contact.header.sub" defaultText="Elite Concierge Direct" className="text-[#d4af37] font-bold futuristic text-[8px] md:text-xs uppercase mb-8 tracking-[0.8em]" />
          <h1 className="text-4xl sm:text-6xl md:text-9xl font-light serif text-white mb-12 leading-tight">
            <EditableText configPath="contact.header.title1" defaultText="THE DIRECT" as="span" /> <br/>
            <span className="text-[#d4af37]"><EditableText configPath="contact.header.title2" defaultText="CONNECTION." as="span" /></span>
          </h1>
          <EditableText configPath="contact.header.desc" defaultText="최고의 공간은 단 한 번의 깊이 있는 대화로부터 시작됩니다." className="text-gray-500 text-xs md:text-xl font-light max-w-2xl mx-auto leading-relaxed px-4" />
        </header>

        <section className="mb-16 md:mb-40 text-center px-2">
          <div className="inline-block group">
            <EditableText configPath="contact.info.hotline_label" defaultText="Hot-Line" className="text-gray-600 futuristic text-[10px] tracking-[0.5em] uppercase mb-4 block" />
            <EditableText configPath="contact.info.phone" defaultText="02-1234-5678" className="text-[12vw] md:text-[10rem] font-black text-white glow-text tracking-tighter leading-none hover:text-[#d4af37] transition-all cursor-pointer break-all" as="h3" />
          </div>
        </section>

        <div className="bg-[#050505] rounded-[2rem] md:rounded-[4rem] p-6 md:p-32 border border-white/5 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-24 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-6xl font-light serif text-white mb-6 md:mb-10 leading-tight">
                <EditableText configPath="contact.hq.title1" defaultText="VISIT OUR" as="span" /> <br/>
                <span className="text-[#d4af37]"><EditableText configPath="contact.hq.title2" defaultText="HQ ARCHIVE." as="span" /></span>
              </h2>
              <div className="space-y-6 md:space-y-10 text-sm md:text-lg">
                 <div>
                    <EditableText configPath="contact.hq.loc_label" defaultText="Location" className="text-white text-[11px] font-bold uppercase tracking-widest mb-4 opacity-40" />
                    <EditableText configPath="contact.hq.address" defaultText="서울특별시 강남구 테헤란로 123, LuxRiel Tower 45F" className="text-gray-400 font-light leading-relaxed" />
                 </div>
                 <div>
                    <EditableText configPath="contact.hq.op_label" defaultText="Operation" className="text-white text-[11px] font-bold uppercase tracking-widest mb-4 opacity-40" />
                    <EditableText configPath="contact.hq.hours" defaultText="Mon - Fri: 09:00 - 18:00 (사전 예약 필수)" className="text-gray-400 font-light leading-relaxed" />
                 </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 aspect-square md:aspect-[4/3] rounded-[1.5rem] md:rounded-[3rem] overflow-hidden border border-white/10 relative group bg-black">
                <EditableImage 
                  src={siteConfig?.hqMap?.imageUrl || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"}
                  alt="HQ View"
                  className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000"
                  configPath="contact.hqMap.imageUrl"
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
