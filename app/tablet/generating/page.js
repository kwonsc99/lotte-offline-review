"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function GeneratingPage() {
  const router = useRouter();
  const [status, setStatus] = useState("analyzing");
  const [generatedReview, setGeneratedReview] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const generateReview = async () => {
      try {
        // 1단계: 분석 중
        setStatus("analyzing");
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // 2단계: 생성 중
        setStatus("generating");

        const surveyAnswers = JSON.parse(
          localStorage.getItem("surveyAnswers") || "{}"
        );

        // Gemini API 호출
        const response = await fetch("/api/generate-review", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            surveyData: surveyAnswers,
            language: surveyAnswers.language || "ko",
          }),
        });

        if (!response.ok) {
          throw new Error("리뷰 생성에 실패했습니다.");
        }

        const data = await response.json();
        const review = data.review;

        setGeneratedReview(review);
        localStorage.setItem("generatedReview", review);

        // 3단계: 완료
        setStatus("complete");
        await new Promise((resolve) => setTimeout(resolve, 800));

        // 4단계: 미리보기
        setStatus("preview");
      } catch (error) {
        console.error("리뷰 생성 오류:", error);
        setError(error.message);

        // 에러 발생 시 폴백 리뷰 생성
        const surveyAnswers = JSON.parse(
          localStorage.getItem("surveyAnswers") || "{}"
        );
        const fallbackReview = generateFallbackReview(surveyAnswers);
        setGeneratedReview(fallbackReview);
        localStorage.setItem("generatedReview", fallbackReview);

        setTimeout(() => setStatus("preview"), 2000);
      }
    };

    generateReview();
  }, [router]);

  // 폴백 리뷰 생성 함수 (API 실패 시)
  const generateFallbackReview = (surveyData) => {
    const { satisfaction, comfort, usage, color, language, size } = surveyData;

    const templates = {
      ko: {
        start:
          satisfaction === "매우 만족" || satisfaction === "만족"
            ? "아식스 노바블라스트 5 정말 만족스럽습니다!"
            : "아식스 노바블라스트 5 구매했습니다.",
        comfort:
          comfort?.length > 0 ? ` ${comfort.join(", ")} 느낌이 좋았어요.` : "",
        usage:
          usage?.length > 0
            ? ` ${usage.join(", ")}할 때 신기 좋을 것 같습니다.`
            : "",
        color: color ? ` ${color}이에요.` : "",
      },
    };

    const lang = templates[language] || templates.ko;
    return lang.start + lang.comfort + lang.usage + lang.color;
  };

  const handleConfirm = () => {
    router.push("/tablet/complete");
  };

  if (status === "preview") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-12">
          {/* 성공 헤더 */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              리뷰가 생성되었습니다!
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              AI가 생성한 리뷰를 확인하고, 등록해보세요!
            </p>
          </div>

          {/* 생성된 리뷰 카드 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border-2 border-gray-200">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="font-semibold text-gray-900 text-sm sm:text-base">
                    AI 생성 리뷰
                  </span>
                  <span className="px-2 py-0.5 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs rounded-full font-medium">
                    Gemini AI
                  </span>
                </div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                  {generatedReview}
                </p>
              </div>
            </div>

            {/* 별점 */}
            <div className="flex items-center gap-1 mt-4 pt-4 border-t border-gray-200">
              <span className="ml-2 text-xs sm:text-sm text-gray-600">
                별점:
              </span>
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
          </div>

          {/* 안내 메시지 */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="text-xs sm:text-sm text-gray-700">
                <p>
                  작성된 리뷰는 온라인 앱을 통해 수정하거나 삭제할 수 있습니다.
                </p>
              </div>
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => router.push("/tablet/survey")}
              className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 sm:py-4 rounded-xl hover:bg-gray-200 active:bg-gray-300 transition-colors text-sm sm:text-base"
            >
              다시 작성
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 bg-black text-white font-semibold py-3 sm:py-4 rounded-xl hover:bg-gray-800 active:bg-gray-900 transition-colors shadow-lg text-sm sm:text-base"
            >
              확인 및 등록
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 sm:p-12 text-center">
        {/* 로딩 애니메이션 */}
        <div className="mb-8">
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto relative">
            <div className="absolute inset-0 border-8 border-gray-200 rounded-full"></div>
            <div className="absolute inset-0 border-8 border-gradient-to-r from-purple-600 to-pink-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
        </div>

        {/* 텍스트 */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
          Gemini AI가 리뷰를 생성하고 있습니다
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mb-2">
          고객님의 소중한 의견을 바탕으로
        </p>
        <p className="text-sm sm:text-base text-gray-600">
          자연스러운 리뷰를 작성하고 있습니다
        </p>

        {/* 진행 상태 */}
        <div className="mt-8 space-y-3">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-gray-600">설문 분석 중</span>
            <span
              className={`font-semibold ${
                status === "analyzing" ? "text-gray-400" : "text-purple-600"
              }`}
            >
              {status === "analyzing" ? (
                <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "✓"
              )}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-gray-600">AI 리뷰 생성 중</span>
            {status === "generating" ? (
              <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            ) : status === "complete" || status === "preview" ? (
              <span className="text-purple-600 font-semibold">✓</span>
            ) : (
              <span className="text-gray-400">⋯</span>
            )}
          </div>
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span
              className={
                status === "complete" || status === "preview"
                  ? "text-gray-600"
                  : "text-gray-400"
              }
            >
              온라인몰 반영 준비
            </span>
            {status === "complete" ? (
              <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            ) : status === "preview" ? (
              <span className="text-purple-600 font-semibold">✓</span>
            ) : (
              <span className="text-gray-400">⋯</span>
            )}
          </div>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800">
              AI 생성 중 문제가 발생하여 기본 템플릿으로 생성합니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
