"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { translations } from "@/lib/translations";

export default function SurveyPage() {
  const router = useRouter();
  const [language, setLanguage] = useState("ko");
  const [satisfaction, setSatisfaction] = useState("");
  const [comfort, setComfort] = useState([]);
  const [usage, setUsage] = useState([]);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  const t = translations[language].survey;

  const languages = [
    { code: "ko", name: "한국어", flag: "🇰🇷" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "en", name: "English", flag: "🇺🇸" },
  ];

  // 사이즈 옵션
  const sizeOptions = [
    "230mm",
    "235mm",
    "240mm",
    "245mm",
    "250mm",
    "255mm",
    "260mm",
    "265mm",
    "270mm",
    "275mm",
    "280mm",
  ];

  const toggleComfort = (value) => {
    setComfort((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const toggleUsage = (value) => {
    setUsage((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = () => {
    if (!satisfaction) {
      alert(
        language === "ko"
          ? "만족도를 선택해주세요."
          : language === "zh"
          ? "请选择满意度。"
          : language === "ja"
          ? "満足度を選択してください。"
          : "Please select satisfaction level."
      );
      return;
    }

    const surveyData = {
      satisfaction,
      comfort,
      usage,
      color,
      size,
      language,
    };

    localStorage.setItem("surveyAnswers", JSON.stringify(surveyData));
    router.push("/tablet/generating");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* 헤더 */}
      <div className="max-w-2xl mx-auto shadow-lg">
        <div className="flex items-center justify-between bg-white px-6 py-4 shadow-lg">
          <h1 className="text-xl font-bold text-gray-900">롯데백화점 리뷰</h1>
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
      <div className="max-w-2xl mx-auto bg-white shadow-2xl p-8">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 max-w-md mx-auto">
            <div className="flex-1 text-center">
              <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold">
                ✓
              </div>
              <p className="text-xs text-gray-500">상품</p>
            </div>

            <div className="flex-1 h-px bg-black mt-[-20px]"></div>

            <div className="flex-1 text-center">
              <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold shadow-lg">
                2
              </div>
              <p className="text-xs font-bold text-black">리뷰</p>
            </div>

            <div className="flex-1 h-px bg-gray-300 mt-[-20px]"></div>

            <div className="flex-1 text-center">
              <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center text-sm font-bold">
                3
              </div>
              <p className="text-xs text-gray-400">게시</p>
            </div>
          </div>
        </div>
        {/* 언어 선택 */}
        <div className="mb-8 flex justify-end gap-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                language === lang.code
                  ? "bg-black text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {lang.flag} {lang.name}
            </button>
          ))}
        </div>

        {/* 상품 정보 */}
        <div className="mb-8">
          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-64 aspect-square bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
              <img
                src="https://contents.lotteon.com/itemimage/20251107100950/LE/12/20/40/52/54/_1/32/28/27/92/9/LE1220405254_1322827929_1.jpg/dims/resizef/554X554/format/webp/optimize"
                alt="ASICS Novablast 5"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="flex-1 flex flex-col justify-between py-1"
              style={{ minHeight: "256px" }}
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  아식스
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  [아식스 본사] 노바블라스트 5 아식스 트랙클럽 112530225-100
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  169,000원
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  월간구매 200 · 리뷰 82
                </p>
                {/* 사이즈 드롭다운 */}
                <div className="relative">
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-base font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent appearance-none cursor-pointer"
                  >
                    <option value="">사이즈 선택</option>
                    {sizeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                    <svg
                      className="fill-current h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 1. 만족도 */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {t.satisfaction.title}
            </h3>
            <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full font-medium">
              {t.satisfaction.required}
            </span>
          </div>

          <div className="flex flex-col items-center gap-4 p-8 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
            <div className="flex gap-3">
              {[1, 2, 3, 4, 5].map((rating) => {
                const ratingToSatisfaction = {
                  1: t.satisfaction.options[4], // 매우 불만족
                  2: t.satisfaction.options[3], // 불만족
                  3: t.satisfaction.options[2], // 보통
                  4: t.satisfaction.options[1], // 만족
                  5: t.satisfaction.options[0], // 매우 만족
                };

                const selectedRating = Object.entries(
                  ratingToSatisfaction
                ).find(([_, value]) => value === satisfaction)?.[0];

                return (
                  <button
                    key={rating}
                    onClick={() =>
                      setSatisfaction(ratingToSatisfaction[rating])
                    }
                    className="transition-all hover:scale-110 focus:outline-none"
                  >
                    <svg
                      className={`w-14 h-14 transition-colors ${
                        selectedRating && rating <= Number(selectedRating)
                          ? "text-yellow-400 fill-current drop-shadow-lg"
                          : "text-gray-300 fill-current hover:text-gray-400"
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2. 착용감 */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {t.comfort.title}
            </h3>
            <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full">
              {t.comfort.multiple}
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            {t.comfort.options.map((option, index) => (
              <button
                key={index}
                onClick={() => toggleComfort(option)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  comfort.includes(option)
                    ? "bg-pink-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* 3. 활용도 */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {t.usage.title}
            </h3>
            <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full">
              {t.usage.multiple}
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            {t.usage.options.map((option, index) => (
              <button
                key={index}
                onClick={() => toggleUsage(option)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  usage.includes(option)
                    ? "bg-pink-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* 4. 컬러감 */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t.color.title}
          </h3>
          <div className="flex flex-wrap gap-3">
            {t.color.options.map((option, index) => (
              <button
                key={index}
                onClick={() => setColor(option)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  color === option
                    ? "bg-pink-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* 제출 버튼 */}
        <button
          onClick={handleSubmit}
          disabled={!satisfaction}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
            satisfaction
              ? "bg-black text-white hover:from-pink-700 hover:to-purple-700 shadow-lg"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {t.button}
        </button>
      </div>
    </div>
  );
}
