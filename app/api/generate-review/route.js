import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function POST(request) {
  try {
    const { surveyData, language } = await request.json();

    // ✅ 모델명 변경: gemini-pro → gemini-1.5-flash
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // 언어별 프롬프트 생성
    const prompts = {
      ko: `당신은 자연스러운 쇼핑 리뷰를 작성하는 AI입니다. 다음 설문조사 결과를 바탕으로 아식스 노바블라스트 5 운동화에 대한 자연스럽고 진솔한 리뷰를 작성해주세요.

설문 결과:
- 만족도: ${surveyData.satisfaction}
- 착용감: ${surveyData.comfort?.join(", ") || "없음"}
- 활용도: ${surveyData.usage?.join(", ") || "없음"}
- 컬러감: ${surveyData.color || "없음"}
- 사이즈: ${surveyData.size || "없음"}

리뷰 작성 가이드라인:
1. 2-4문장으로 작성
2. 구매자의 실제 경험처럼 자연스럽게 작성
3. 과도한 광고 문구는 피하고 진솔하게 작성
4. 설문 결과를 자연스럽게 녹여서 작성
5. 존댓말 사용

리뷰만 작성해주세요:`,

      zh: `您是一位撰写自然购物评论的AI。请根据以下调查结果，为亚瑟士Novablast 5运动鞋撰写自然真诚的评论。

调查结果:
- 满意度: ${surveyData.satisfaction}
- 穿着感: ${surveyData.comfort?.join(", ") || "无"}
- 使用场合: ${surveyData.usage?.join(", ") || "无"}
- 颜色: ${surveyData.color || "无"}
- 尺码: ${surveyData.size || "无"}

评论撰写指南:
1. 2-4句话
2. 像真实购买者的体验一样自然地撰写
3. 避免过度的广告用语，真诚撰写
4. 自然地融入调查结果
5. 使用礼貌用语

请只撰写评论:`,

      ja: `あなたは自然なショッピングレビューを書くAIです。以下のアンケート結果に基づいて、アシックスNovablast 5シューズについて自然で誠実なレビューを書いてください。

アンケート結果:
- 満足度: ${surveyData.satisfaction}
- 着用感: ${surveyData.comfort?.join(", ") || "なし"}
- 活用度: ${surveyData.usage?.join(", ") || "なし"}
- カラー: ${surveyData.color || "なし"}
- サイズ: ${surveyData.size || "なし"}

レビュー作成ガイドライン:
1. 2-4文で作成
2. 実際の購入者の体験のように自然に作成
3. 過度な広告文句は避けて誠実に作成
4. アンケート結果を自然に盛り込む
5. 丁寧語を使用

レビューのみを作成してください:`,

      en: `You are an AI that writes natural shopping reviews. Please write a natural and sincere review for ASICS Novablast 5 shoes based on the following survey results.

Survey Results:
- Satisfaction: ${surveyData.satisfaction}
- Comfort: ${surveyData.comfort?.join(", ") || "none"}
- Usage: ${surveyData.usage?.join(", ") || "none"}
- Color: ${surveyData.color || "none"}
- Size: ${surveyData.size || "none"}

Review Writing Guidelines:
1. Write in 2-4 sentences
2. Write naturally like a real buyer's experience
3. Avoid excessive advertising phrases and write sincerely
4. Naturally incorporate survey results
5. Use polite language

Please write only the review:`,
    };

    const prompt = prompts[language] || prompts.ko;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const review = response.text().trim();

    return NextResponse.json({ review });
  } catch (error) {
    console.error("리뷰 생성 오류:", error);
    return NextResponse.json(
      { error: "리뷰 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
