export function generateReviewFromSurvey(surveyData) {
  const { satisfaction, comfort, usage, color } = surveyData;

  // 만족도에 따른 시작 문장
  const satisfactionTexts = {
    "매우 만족": "이번에 구매한 아식스 노바블라스트 5, 정말 만족스럽습니다!",
    만족: "아식스 노바블라스트 5 구매했는데 전반적으로 만족해요.",
    보통: "아식스 노바블라스트 5 구매했습니다. 평범하지만 무난한 것 같아요.",
    불만족: "아식스 노바블라스트 5 구매했는데 조금 아쉬운 부분이 있네요.",
    "매우 불만족":
      "아식스 노바블라스트 5를 구매했는데 기대에 미치지 못했습니다.",
  };

  // 착용감 텍스트
  const comfortTexts = {
    편안함: "착용감이 정말 편안해서",
    고급스러움: "고급스러운 느낌이 나서",
    시원함: "통풍이 잘 되어 시원해서",
    따뜻함: "보온성이 좋아서",
    가벼움: "가벼워서",
  };

  // 용도 텍스트
  const usageTexts = {
    데일리: "일상적으로 신기",
    출근: "출근할 때 신기",
    데이트: "데이트할 때 신기",
    모임: "모임 갈 때 신기",
    액티비티: "운동할 때 신기",
  };

  // 컬러 텍스트
  const colorTexts = {
    "사진보다 밝음": "실제로 보니 사진보다 더 밝은 색상이에요.",
    "사진과 같음": "실제 컬러도 사진과 똑같아서 기대했던 그대로예요.",
    "사진보다 어두움": "실제로는 사진보다 약간 어두운 톤이네요.",
  };

  // 리뷰 조합
  let review =
    satisfactionTexts[satisfaction] || "아식스 노바블라스트 5를 구매했습니다.";

  if (comfort.length > 0) {
    const comfortParts = comfort.map((c) => comfortTexts[c]).filter(Boolean);
    if (comfortParts.length > 0) {
      review += ` ${comfortParts.join(", ")} 좋았어요.`;
    }
  }

  if (usage.length > 0) {
    const usageParts = usage.map((u) => usageTexts[u]).filter(Boolean);
    if (usageParts.length === 1) {
      review += ` ${usageParts[0]} 딱 좋을 것 같습니다.`;
    } else if (usageParts.length > 1) {
      const last = usageParts.pop();
      review += ` ${usageParts.join(
        ", "
      )}에도 좋고 ${last}에도 좋을 것 같아요.`;
    }
  }

  if (color) {
    review += ` ${colorTexts[color]}`;
  }

  // 마무리 문장
  if (satisfaction === "매우 만족" || satisfaction === "만족") {
    review += " 추천합니다!";
  }

  return review;
}
