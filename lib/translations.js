export const translations = {
  ko: {
    survey: {
      title: "신발 착용 후기 설문",
      subtitle: "ASICS Novablast 5",
      satisfaction: {
        title: "1. 제품 만족도",
        required: "필수",
        options: ["매우 만족", "만족", "보통", "불만족", "매우 불만족"],
      },
      comfort: {
        title: "2. 착용감은 어떠셨나요?",
        multiple: "복수선택",
        options: ["편안함", "고급스러움", "시원함", "따뜻함", "가벼움"],
      },
      usage: {
        title: "3. 어떤 상황에 신으실 건가요?",
        multiple: "복수선택",
        options: ["데일리", "출근", "데이트", "모임", "액티비티"],
      },
      color: {
        title: "4. 실제 컬러는 사진과 비교해 어떤가요?",
        options: ["사진보다 밝음", "사진과 같음", "사진보다 어두움"],
      },
      button: "리뷰 생성하기",
    },
  },
  zh: {
    survey: {
      title: "鞋类使用体验问卷",
      subtitle: "ASICS Novablast 5",
      satisfaction: {
        title: "1. 产品满意度",
        required: "必填",
        options: ["非常满意", "满意", "一般", "不满意", "非常不满意"],
      },
      comfort: {
        title: "2. 穿着感觉如何？",
        multiple: "多选",
        options: ["舒适", "高级感", "凉爽", "保暖", "轻便"],
      },
      usage: {
        title: "3. 您会在什么场合穿着？",
        multiple: "多选",
        options: ["日常", "上班", "约会", "聚会", "运动"],
      },
      color: {
        title: "4. 实际颜色与照片相比如何？",
        options: ["比照片亮", "与照片相同", "比照片暗"],
      },
      button: "生成评论",
    },
  },
  ja: {
    survey: {
      title: "シューズ着用レビューアンケート",
      subtitle: "ASICS Novablast 5",
      satisfaction: {
        title: "1. 製品満足度",
        required: "必須",
        options: ["非常に満足", "満足", "普通", "不満", "非常に不満"],
      },
      comfort: {
        title: "2. 着用感はいかがでしたか？",
        multiple: "複数選択",
        options: ["快適", "高級感", "涼しい", "暖かい", "軽い"],
      },
      usage: {
        title: "3. どのような場面で履きますか？",
        multiple: "複数選択",
        options: ["デイリー", "出勤", "デート", "集まり", "アクティビティ"],
      },
      color: {
        title: "4. 実際の色は写真と比べてどうですか？",
        options: ["写真より明るい", "写真と同じ", "写真より暗い"],
      },
      button: "レビュー生成",
    },
  },
  en: {
    survey: {
      title: "Shoe Review Survey",
      subtitle: "ASICS Novablast 5",
      satisfaction: {
        title: "1. Product Satisfaction",
        required: "Required",
        options: [
          "Very Satisfied",
          "Satisfied",
          "Neutral",
          "Dissatisfied",
          "Very Dissatisfied",
        ],
      },
      comfort: {
        title: "2. How was the comfort?",
        multiple: "Multiple",
        options: ["Comfortable", "Luxurious", "Cool", "Warm", "Lightweight"],
      },
      usage: {
        title: "3. When will you wear them?",
        multiple: "Multiple",
        options: ["Daily", "Work", "Date", "Social", "Sports"],
      },
      color: {
        title: "4. How is the actual color compared to the photo?",
        options: ["Brighter than photo", "Same as photo", "Darker than photo"],
      },
      button: "Generate Review",
    },
  },
};

export function generateReviewFromSurvey(surveyData, language = "ko") {
  const { satisfaction, comfort, usage, color } = surveyData;

  const reviews = {
    ko: {
      satisfaction: {
        "매우 만족":
          "이번에 구매한 아식스 노바블라스트 5, 정말 만족스럽습니다!",
        만족: "아식스 노바블라스트 5 구매했는데 전반적으로 만족해요.",
        보통: "아식스 노바블라스트 5 구매했습니다. 평범하지만 무난한 것 같아요.",
        불만족: "아식스 노바블라스트 5 구매했는데 조금 아쉬운 부분이 있네요.",
        "매우 불만족":
          "아식스 노바블라스트 5를 구매했는데 기대에 미치지 못했습니다.",
      },
      comfort: {
        편안함: "착용감이 정말 편안해서",
        고급스러움: "고급스러운 느낌이 나서",
        시원함: "통풍이 잘 되어 시원해서",
        따뜻함: "보온성이 좋아서",
        가벼움: "가벼워서",
      },
      usage: {
        데일리: "일상적으로 신기",
        출근: "출근할 때 신기",
        데이트: "데이트할 때 신기",
        모임: "모임 갈 때 신기",
        액티비티: "운동할 때 신기",
      },
      color: {
        "사진보다 밝음": "실제로 보니 사진보다 더 밝은 색상이에요.",
        "사진과 같음": "실제 컬러도 사진과 똑같아서 기대했던 그대로예요.",
        "사진보다 어두움": "실제로는 사진보다 약간 어두운 톤이네요.",
      },
      ending: {
        positive: " 추천합니다!",
        neutral: "",
      },
    },
    zh: {
      satisfaction: {
        非常满意: "这次购买的亚瑟士Novablast 5，真的非常满意！",
        满意: "购买了亚瑟士Novablast 5，整体上很满意。",
        一般: "购买了亚瑟士Novablast 5。虽然普通但还算不错。",
        不满意: "购买了亚瑟士Novablast 5，有些地方不太满意。",
        非常不满意: "购买了亚瑟士Novablast 5，没有达到期待。",
      },
      comfort: {
        舒适: "穿着非常舒适",
        高级感: "很有高级感",
        凉爽: "透气性好很凉爽",
        保暖: "保暖性很好",
        轻便: "很轻便",
      },
      usage: {
        日常: "日常穿着",
        上班: "上班时穿",
        约会: "约会时穿",
        聚会: "聚会时穿",
        运动: "运动时穿",
      },
      color: {
        比照片亮: "实际颜色比照片更亮。",
        与照片相同: "实际颜色和照片一样，符合预期。",
        比照片暗: "实际颜色比照片稍暗。",
      },
      ending: {
        positive: " 推荐购买！",
        neutral: "",
      },
    },
    ja: {
      satisfaction: {
        非常に満足: "今回購入したアシックスNovablast 5、本当に満足しています！",
        満足: "アシックスNovablast 5を購入しましたが、全体的に満足です。",
        普通: "アシックスNovablast 5を購入しました。普通ですが無難だと思います。",
        不満: "アシックスNovablast 5を購入しましたが、少し残念な部分があります。",
        非常に不満:
          "アシックスNovablast 5を購入しましたが、期待に届きませんでした。",
      },
      comfort: {
        快適: "着用感が本当に快適で",
        高級感: "高級感があって",
        涼しい: "通気性が良くて涼しくて",
        暖かい: "保温性が良くて",
        軽い: "軽くて",
      },
      usage: {
        デイリー: "日常的に履く",
        出勤: "出勤時に履く",
        デート: "デート時に履く",
        集まり: "集まりに行く時に履く",
        アクティビティ: "運動時に履く",
      },
      color: {
        写真より明るい: "実際は写真より明るい色です。",
        写真と同じ: "実際の色も写真と同じで期待通りです。",
        写真より暗い: "実際は写真より少し暗いトーンです。",
      },
      ending: {
        positive: " おすすめです！",
        neutral: "",
      },
    },
    en: {
      satisfaction: {
        "Very Satisfied":
          "I purchased the ASICS Novablast 5 and I'm very satisfied!",
        Satisfied: "I bought the ASICS Novablast 5 and overall I'm satisfied.",
        Neutral: "I purchased the ASICS Novablast 5. It's average but decent.",
        Dissatisfied:
          "I bought the ASICS Novablast 5 but there are some disappointing aspects.",
        "Very Dissatisfied":
          "I purchased the ASICS Novablast 5 but it didn't meet my expectations.",
      },
      comfort: {
        Comfortable: "very comfortable to wear",
        Luxurious: "has a luxurious feel",
        Cool: "breathable and cool",
        Warm: "good insulation",
        Lightweight: "lightweight",
      },
      usage: {
        Daily: "for daily wear",
        Work: "for work",
        Date: "for dates",
        Social: "for social gatherings",
        Sports: "for sports activities",
      },
      color: {
        "Brighter than photo": "The actual color is brighter than the photo.",
        "Same as photo": "The actual color matches the photo perfectly.",
        "Darker than photo": "The actual color is darker than the photo.",
      },
      ending: {
        positive: " Highly recommended!",
        neutral: "",
      },
    },
  };

  const lang = reviews[language] || reviews.ko;
  let review =
    lang.satisfaction[satisfaction] ||
    lang.satisfaction["보통"] ||
    lang.satisfaction["Neutral"];

  if (comfort && comfort.length > 0) {
    const comfortParts = comfort.map((c) => lang.comfort[c]).filter(Boolean);
    if (comfortParts.length > 0) {
      if (language === "en") {
        review += ` The shoes are ${comfortParts.join(", ")}.`;
      } else {
        review += ` ${comfortParts.join(", ")} 좋았어요.`;
      }
    }
  }

  if (usage && usage.length > 0) {
    const usageParts = usage.map((u) => lang.usage[u]).filter(Boolean);
    if (usageParts.length > 0) {
      if (language === "en") {
        review += ` Perfect ${usageParts.join(" and ")}.`;
      } else if (language === "zh") {
        review += ` 适合${usageParts.join("、")}。`;
      } else if (language === "ja") {
        const last = usageParts.pop();
        review +=
          usageParts.length > 0
            ? ` ${usageParts.join("、")}のにも、${last}のにも良いと思います。`
            : ` ${last}のに良いと思います。`;
      } else {
        const last = usageParts.pop();
        review +=
          usageParts.length > 0
            ? ` ${usageParts.join(", ")}에도 좋고 ${last}에도 좋을 것 같아요.`
            : ` ${last} 딱 좋을 것 같습니다.`;
      }
    }
  }

  if (color) {
    review += ` ${lang.color[color]}`;
  }

  const isPositive =
    satisfaction === "매우 만족" ||
    satisfaction === "만족" ||
    satisfaction === "非常满意" ||
    satisfaction === "满意" ||
    satisfaction === "非常に満足" ||
    satisfaction === "満足" ||
    satisfaction === "Very Satisfied" ||
    satisfaction === "Satisfied";

  review += isPositive ? lang.ending.positive : lang.ending.neutral;

  return review;
}
