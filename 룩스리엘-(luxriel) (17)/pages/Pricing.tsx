
import React from 'react';
import AIChatBox from '../components/AIChatBox';
import EditableText from '../components/EditableText';

const Pricing: React.FC = () => {
  return (
    <div className="pt-48 pb-32 px-6 bg-[#050505] min-h-screen">
      <div className="container mx-auto">
        <header className="mb-32 text-center">
          <EditableText configPath="pricing.header.sub" defaultText="Direct Execution Value" className="text-[#FFD700] font-medium tracking-[0.4em] uppercase text-sm mb-6 block" />
          <h1 className="text-5xl md:text-[100px] font-light serif mb-10 text-white leading-none">
            <EditableText configPath="pricing.header.title1" defaultText="거품 없는" as="span" /> <span className="text-[#FFD700] italic"><EditableText configPath="pricing.header.title2" defaultText="AI 직영가" as="span" /></span>
          </h1>
          <EditableText configPath="pricing.header.desc" defaultText="룩스리엘은 업체의 중간 마진을 믿지 않습니다. 오직 현장 기술자의 실행가(Net-Cost)와 AI 최적화 설계로 실현되는 압도적인 가격 경쟁력을 경험하십시오." className="text-gray-400 max-w-4xl mx-auto text-lg md:text-2xl leading-relaxed font-light" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-48">
          {/* Price Category List */}
          <div className="space-y-12">
            <h3 className="text-4xl font-light serif mb-12 text-white">
              <EditableText configPath="pricing.list.title" defaultText="Direct Team Packages" as="span" />
            </h3>
            {[
              { id: 0, label: '직영 실속형 (Direct Essential)', market: 'Agency Fee: High', lab: 'Direct: Net 실비', desc: '공사 거품을 뺀 시공팀 직거래 시스템' },
              { id: 1, label: '직영 고급형 (Direct Signature)', market: 'Agency Fee: Overpriced', lab: 'Direct: Efficiency Plus', desc: '전문 기술팀과 하이엔드 자재의 다이렉트 매칭' },
              { id: 2, label: '직영 하이엔드 (Direct Elite)', market: 'Agency Fee: Exclusive', lab: 'Direct: Ultimate Value', desc: '최상위 기술자와 직수입 자재로 실현하는 순수 가치' }
            ].map((item) => (
              <div key={item.id} className="p-10 bg-white/[0.03] border border-white/5 rounded-[3rem] relative overflow-hidden group hover:border-[#FFD700]/30 transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <EditableText configPath={`pricing.package${item.id}.label`} defaultText={item.label} className="text-2xl md:text-3xl font-bold text-white mb-3" as="h4" />
                    <EditableText configPath={`pricing.package${item.id}.desc`} defaultText={item.desc} className="text-gray-500 text-base" />
                  </div>
                  <div className="text-right">
                    <EditableText configPath={`pricing.package${item.id}.market`} defaultText={item.market} className="text-[10px] text-gray-600 mb-2 uppercase tracking-widest" />
                    <EditableText configPath={`pricing.package${item.id}.lab`} defaultText={item.lab} className="text-2xl font-black text-[#FFD700] uppercase tracking-tighter" />
                  </div>
                </div>
              </div>
            ))}
            <div className="p-10 bg-[#FFD700]/5 rounded-[2.5rem] border border-[#FFD700]/20 text-lg text-gray-400 leading-relaxed italic">
              <EditableText configPath="pricing.footer.quote" defaultText="&quot;우리는 인테리어 업체가 아닌 실행팀 가격으로 승부합니다. 테루아에게 지금 바로 당신의 공간 좌표를 문의하십시오.&quot;" />
            </div>
          </div>

          {/* AI Estimator Integration */}
          <div className="relative">
            <div className="absolute -inset-10 bg-[#FFD700]/5 blur-[120px] rounded-full opacity-50 pointer-events-none"></div>
            <div className="relative z-10 bg-white/[0.02] border border-white/10 p-10 md:p-20 rounded-[4rem]">
              <h3 className="text-4xl font-light serif mb-8 text-white">
                <EditableText configPath="pricing.chat.title" defaultText="직영가 데이터 좌표 산출" as="span" />
              </h3>
              <EditableText configPath="pricing.chat.desc" defaultText="평수와 원하는 자재를 입력하세요. 테루아가 전국 시공팀의 비공개 데이터베이스를 분석하여 가장 정직한 직영 실행가 좌표를 즉시 제안합니다." className="text-gray-500 text-lg mb-16 leading-relaxed font-light" />
              <AIChatBox />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
