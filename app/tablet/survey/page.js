"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SurveyPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState({
    satisfaction: "",
    comfort: [],
    usage: [],
    color: "",
  });

  const toggleMultiSelect = (category, value) => {
    setAnswers((prev) => {
      const current = prev[category];
      if (current.includes(value)) {
        return { ...prev, [category]: current.filter((v) => v !== value) };
      } else {
        return { ...prev, [category]: [...current, value] };
      }
    });
  };

  const handleSubmit = () => {
    if (!answers.satisfaction) {
      alert("만족도를 선택해주세요.");
      return;
    }

    localStorage.setItem("surveyAnswers", JSON.stringify(answers));
    router.push("/tablet/generating");
  };

  const TagButton = ({ selected, onClick, children }) => (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
        selected
          ? "bg-pink-600 text-white shadow-md"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* 헤더 */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex items-center justify-between bg-white px-6 py-4 rounded-xl shadow-sm">
          <h1 className="text-xl font-bold text-gray-900">롯데백화점</h1>
          <div className="flex gap-3">
            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              👤
            </button>
            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              ⚙️
            </button>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {/* 탭 */}
        <div className="flex gap-4 mb-8 border-b">
          <button className="px-6 py-3 text-gray-500">상품</button>
          <button className="px-6 py-3 text-pink-600 border-b-2 border-pink-600 font-semibold">
            리뷰
          </button>
          <button className="px-6 py-3 text-gray-500">게시</button>
        </div>

        {/* 상품 정보 (간단히) */}
        <div className="flex items-center gap-4 mb-8 pb-6 border-b">
          <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-3xl">👟</div>
          </div>
          <div>
            <h2 className="font-bold text-gray-900">아식스</h2>
            <p className="text-sm text-gray-600">
              노바블라스트 5 아식스 트랙클럽
            </p>
            <p className="text-lg font-bold text-gray-900">169,000원</p>
          </div>
        </div>

        {/* 설문 */}
        <div className="space-y-8">
          {/* 만족도 */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              리뷰 생성하기
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              오늘 구매하신 상품에 만족하셨나요? (1점-5점)
            </p>
            <div className="flex gap-3">
              {["매우 불만족", "불만족", "보통", "만족", "매우 만족"].map(
                (item) => (
                  <TagButton
                    key={item}
                    selected={answers.satisfaction === item}
                    onClick={() =>
                      setAnswers((prev) => ({ ...prev, satisfaction: item }))
                    }
                  >
                    {item}
                  </TagButton>
                )
              )}
            </div>
          </div>

          {/* 착용감 */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-3">
              착용감
            </h3>
            <div className="flex flex-wrap gap-3">
              {["편안함", "고급스러움", "시원함", "따뜻함", "가벼움"].map(
                (item) => (
                  <TagButton
                    key={item}
                    selected={answers.comfort.includes(item)}
                    onClick={() => toggleMultiSelect("comfort", item)}
                  >
                    {item}
                  </TagButton>
                )
              )}
            </div>
          </div>

          {/* 상황별 활용도 */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-3">
              상황별 활용도
            </h3>
            <div className="flex flex-wrap gap-3">
              {["데일리", "출근", "데이트", "모임", "액티비티"].map((item) => (
                <TagButton
                  key={item}
                  selected={answers.usage.includes(item)}
                  onClick={() => toggleMultiSelect("usage", item)}
                >
                  {item}
                </TagButton>
              ))}
            </div>
          </div>

          {/* 컬러감 */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-3">
              컬러감
            </h3>
            <div className="flex flex-wrap gap-3">
              {["사진보다 밝음", "사진과 같음", "사진보다 어두움"].map(
                (item) => (
                  <TagButton
                    key={item}
                    selected={answers.color === item}
                    onClick={() =>
                      setAnswers((prev) => ({ ...prev, color: item }))
                    }
                  >
                    {item}
                  </TagButton>
                )
              )}
            </div>
          </div>
        </div>

        {/* 제출 버튼 */}
        <button
          onClick={handleSubmit}
          className="w-full mt-8 bg-black text-white font-semibold py-4 rounded-xl text-lg hover:bg-gray-800 transition-colors"
        >
          AI 리뷰 등록하기
        </button>
      </div>
    </div>
  );
}
