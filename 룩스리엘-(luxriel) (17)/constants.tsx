
import React from 'react';
import { Project, Review, ServiceItem } from './types';

export const COLORS = {
  black: '#0a0a0a',
  gold: '#d4af37',
  goldDark: '#b8860b',
  gray: '#1a1a1a',
  white: '#ffffff',
};

export const SERVICES: ServiceItem[] = [
  {
    id: '1',
    title: '아파트 전체 리모델링',
    description: '공간의 가치를 극대화하는 올인원 턴키 서비스. 최신 트렌드를 반영한 고품격 디자인.',
    icon: '🏢',
    price: 'AI 맞춤 견적 확인'
  },
  {
    id: '2',
    title: '상업 공간 인테리어',
    description: '카페, 오피스, 브랜드 쇼룸 등 비즈니스 성공을 위한 감각적인 공간 창출.',
    icon: '☕',
    price: 'AI 상권별 최적가'
  },
  {
    id: '3',
    title: '주방 & 욕실 부분 시공',
    description: '핵심 공간의 집중적인 업그레이드. 가성비 최고의 프리미엄 마감.',
    icon: '🛁',
    price: '실시간 AI 산출'
  },
  {
    id: '4',
    title: 'AI 최적화 공간 설계',
    description: '최첨단 AI 알고리즘을 통한 자재 로스율 0%, 동선 최적화 3D 모델링.',
    icon: '🤖',
    price: '무료 컨설팅 포함'
  }
];

export const PORTFOLIO_DATA: Project[] = [
  { 
    id: '1', 
    title: '한남동 더 힐 60평형', 
    category: 'Residential', 
    imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80', 
    pricePerPyung: 0, 
    totalCost: 'AI 최적화 견적 적용',
    location: '서울 용산구 한남동',
    area: '200㎡ (60평)',
    period: '8주',
    concept: 'Modern Minimal Luxury',
    description: '전체적으로 화이트와 베이지 톤의 대리석을 사용하여 확장감과 개방감을 극대화했습니다. 거실은 무몰딩 공법과 라인 조명을 적용하여 군더더기 없는 미니멀리즘의 정수를 보여줍니다. 주방은 이탈리아산 최고급 세라믹 상판을 적용한 대형 아일랜드를 배치하여 요리와 소통이 동시에 이루어지는 공간으로 재탄생했습니다.',
    gallery: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&q=80'
    ],
    features: ['이탈리아 천연 대리석 바닥', 'Hidden Door 공법', '전체 라인 조명 제어', 'AI 스마트 홈 통합']
  },
  { 
    id: '2', 
    title: '성수동 감성 카페 루프탑', 
    category: 'Commercial', 
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80', 
    pricePerPyung: 0, 
    totalCost: '상업 공간 AI 가이드가',
    location: '서울 성동구 성수동',
    area: '45평',
    concept: 'Industrial Chic',
    description: '성수동의 거친 매력을 살리면서도 세련된 인더스트리얼 무드를 연출했습니다. 노출 콘크리트와 빈티지 우드를 조합하고, 스테인리스 스틸 소재를 포인트로 사용하여 차가우면서도 따뜻한 느낌을 공존시켰습니다. 루프탑 공간은 사계절 이용이 가능한 전동 어닝과 따뜻한 조명 설계를 통해 공간 효율을 극대화했습니다.',
    gallery: [
      'https://images.unsplash.com/photo-1559925393-8be0ec41b50b?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80'
    ],
    features: ['노출 콘크리트 샌딩', '수제작 원목 가구', '맞춤형 조명 시스템', '냉난방 공조 최적화']
  },
  { 
    id: '3', 
    title: '청담동 오피스 쇼룸', 
    category: 'Commercial', 
    imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80', 
    pricePerPyung: 0, 
    totalCost: '비즈니스 팩 최적가',
    location: '서울 강남구 청담동',
    description: '브랜드 가치를 시각적으로 전달하는 프리미엄 오피스입니다. 업무 공간과 전시 공간의 경계를 허무는 유연한 레이아웃을 채택했습니다.',
    gallery: [
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80'
    ]
  },
  { id: '4', title: '트리마제 30평형 미니멀', category: 'Residential', imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80', pricePerPyung: 0, totalCost: 'AI 리모델링 솔루션' },
  { id: '5', title: '판교 단독주택 모던키친', category: 'Residential', imageUrl: 'https://images.unsplash.com/photo-1556912177-c54030639a03?auto=format&fit=crop&q=80', pricePerPyung: 0, totalCost: '부분 시공 AI 최적가' },
  { id: '6', title: '제주 호텔 스튜디오', category: 'Hospitality', imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80', pricePerPyung: 0, totalCost: '하이엔드 AI 컨설팅' },
];

export const REVIEWS: Review[] = [
  { id: '1', author: '클리앙_닉네임', content: 'AI가 잡아준 견적이 일반 턴키보다 40% 이상 저렴해서 놀랐습니다. 자재 퀄리티는 말할 것도 없고요.', date: '2025-05-12', source: 'Clien', rating: 5 },
  { id: '2', author: '펨코인테리어장인', content: '거품 싹 뺀 가격 맞습니다. AI 상담으로 받은 가이드라인이 실제 계약까지 투명하게 이어졌어요.', date: '2025-06-01', source: 'FMKorea', rating: 5 },
  { id: '3', author: '카페사장님', content: '상가 인테리어 견적 받기 너무 힘들었는데, AI 상담으로 1분 만에 현실적인 가격대를 알아냈습니다.', date: '2025-06-20', source: 'Naver Cafe', rating: 4 },
];
