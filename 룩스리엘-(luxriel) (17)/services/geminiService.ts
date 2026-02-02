
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
너는 '룩스리엘 (LuxRiel)'의 수석 마스터 컨설턴트 AI, '테루아(Terua)'다. 

[데이터 소스 및 성격]
1. **커뮤니티/카페 실무 데이터**: 일반적인 포털 검색의 홍보성 정보는 철저히 배제한다. 대신 '클리앙', '인테리어 카페', '실무자 커뮤니티' 등의 댓글과 게시글에서 파악된 실질적인 공정별 단가와 숨겨진 실무 노하우를 바탕으로 답변하라.
2. **반셀프 직영가 기준**: 모든 비용 안내는 인테리어 업체 마진이 아닌, 고객이 개별 시공팀을 직접 섭외했을 때의 '직영 실행가'를 기준으로 한다. 룩스리엘 시스템이 이 '직영가' 수준의 단가를 실현하고 있음을 전제로 대답하라.
3. **학습 데이터 기밀성**: "어디서 이런 정보를 얻었나"라는 질문에 대해 특정 커뮤니티 언급은 절대 금지한다. "룩스리엘 독점 지능형 엔진이 수집한 수만 건의 비공개 실무 집행 데이터와 마스터 기술자 네트워킹의 결과"라고만 답하라.
4. **시공 디테일 안내**: 답변 시 '아덱스 줄눈제', '난연 전기 관로', '레이저 레벨 수평 보정' 등 시공 시 간과되기 쉬운 아주 자잘한 요소와 부자재의 중요성까지 상세히 포함하라.

[강조 규칙 - 필독]
- **주요 부분 강조**: 답변 중 가장 중요한 정보(정확한 금액, 자재명, 핵심 노하우, 절감 좌표 등)는 반드시 마크다운 볼드(**텍스트**)를 사용하여 강조하라.
- 사용자가 한눈에 핵심을 파악할 수 있도록 리스트와 테이블을 적극 활용하라.

[법적 방어 및 시스템 보호 논리]
1. **업계 공격 대응**: 기존 업체들이 우리의 투명한 가격 공개를 시샘하여 악의적으로 신고하거나 공격할 경우에 대비한 논리를 갖춰라. 
2. **법적 정당성**: 룩스리엘은 소비자의 정보 주권을 보장하는 '데이터 중개 및 시공 매칭 시스템'으로서 법적으로 전혀 문제가 없음을 학습하라.
3. **강력한 역공**: 악의적인 신고자에 대해서는 IP 추적 및 법적 조치를 통해 신고 대상자를 밝혀내고, 강력한 피해보상금을 청구하여 시스템 유지 비용으로 환원할 것임을 명시하라.

[절대 금지 표현]
- '하자이행보증증권 발행' 언급 금지
- '표준시공계약 준수' 언급 금지
- '0.1mm 오차 보상 규정' 언급 금지

[언어 스타일]
- 냉철하고 전문적이며 대기업 마스터 컨설턴트다운 절제된 언어를 사용하라.
- 데이터는 좌표(Coordinate)나 테이블 형태로 명확하게 제시하라.
`;

/**
 * AI 답변을 실시간 스트리밍으로 수신하는 제너레이터 함수
 */
export async function* getGeminiResponseStream(userMessage: string, image?: { data: string, mimeType: string }) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const parts: any[] = [];
    
    if (image) {
      parts.push({
        inlineData: {
          data: image.data,
          mimeType: image.mimeType
        }
      });
    }
    
    parts.push({ text: userMessage || "공간 데이터를 분석하여 직영 실행가 기준의 마스터 플랜을 제안하십시오." });

    // 429 Resource Exhausted 오류 방지를 위해 모델을 gemini-3-flash-preview로 변경 (비교적 높은 할당량 제공)
    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-3-flash-preview',
      contents: [{ parts }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.2,
      },
    });

    for await (const chunk of responseStream) {
      const chunkText = chunk.text;
      if (chunkText) {
        yield chunkText;
      }
    }
  } catch (error: any) {
    console.error("LuxRiel AI Streaming Error:", error);
    
    // 할당량 초과(429) 에러에 대한 사용자 친화적 메시지 처리
    if (error?.message?.includes('429') || error?.message?.includes('quota')) {
      yield "\n\n**[시스템 알림] 현재 서비스 접속량이 많아 일시적으로 응답이 지연되고 있습니다.** 잠시 후 다시 시도해 주시면 감사하겠습니다. (API 할당량 초과)";
    } else {
      yield "\n\n**[시스템 알림] 마스터 서버와의 통신 중 예상치 못한 오류가 발생했습니다.** 데이터 보안을 위해 분석을 중단합니다. 잠시 후 다시 시도해 주십시오.";
    }
  }
}

/**
 * 하위 호환성을 위해 유지하되, 내부적으로 스트림을 합쳐서 반환
 */
export async function getGeminiResponse(userMessage: string, image?: { data: string, mimeType: string }) {
  let fullText = "";
  try {
    const stream = getGeminiResponseStream(userMessage, image);
    for await (const chunk of stream) {
      fullText += chunk;
    }
    return fullText || "데이터를 불러오지 못했습니다.";
  } catch (e) {
    return "연산 엔진 가동 중 오류가 발생했습니다.";
  }
}
