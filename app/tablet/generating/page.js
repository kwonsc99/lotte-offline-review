"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { generateReviewFromSurvey } from "@/lib/generateReview";

export default function GeneratingPage() {
  const router = useRouter();
  const [status, setStatus] = useState("analyzing"); // analyzing -> generating -> complete -> preview
  const [generatedReview, setGeneratedReview] = useState("");

  useEffect(() => {
    const generateReview = async () => {
      try {
        // 1단계: 분석 중
        setStatus("analyzing");
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // 2단계: 생성 중
        setStatus("generating");
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const surveyAnswers = JSON.parse(
          localStorage.getItem("surveyAnswers") || "{}"
        );
        const review = generateReviewFromSurvey(surveyAnswers);

        setGeneratedReview(review);
        localStorage.setItem("generatedReview", review);

        // 3단계: 완료
        setStatus("complete");
        await new Promise((resolve) => setTimeout(resolve, 800));

        // 4단계: 미리보기
        setStatus("preview");
      } catch (error) {
        console.error("리뷰 생성 오류:", error);
        setTimeout(() => router.push("/tablet/complete"), 2000);
      }
    };

    generateReview();
  }, [router]);

  const handleConfirm = () => {
    router.push("/tablet/complete");
  };

  if (status === "preview") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-8">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-12">
          {/* 성공 헤더 */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-green-600"
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              리뷰가 생성되었습니다!
            </h2>
            <p className="text-gray-600">생성된 리뷰를 확인해주세요</p>
          </div>

          {/* 생성된 리뷰 카드 */}
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-8 mb-6 border-2 border-pink-200">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                AI
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-gray-900">
                    AI 생성 리뷰
                  </span>
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                    자동 생성
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {generatedReview}
                </p>
              </div>
            </div>

            {/* 별점 (임의) */}
            <div className="flex items-center gap-1 mt-4 pt-4 border-t border-pink-200">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
              <span className="ml-2 text-sm text-gray-600">
                만족도 기반 평점
              </span>
            </div>
          </div>

          {/* 안내 메시지 */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="text-xl">ℹ️</div>
              <div className="text-sm text-gray-700">
                <p className="font-semibold mb-1">리뷰 수정 안내</p>
                <p>
                  SMS로 발송된 링크를 통해 언제든지 리뷰를 수정하거나 삭제할 수
                  있습니다.
                </p>
              </div>
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex gap-3">
            <button
              onClick={() => router.push("/tablet/survey")}
              className="flex-1 bg-gray-100 text-gray-700 font-semibold py-4 rounded-xl hover:bg-gray-200 transition-colors"
            >
              다시 작성
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold py-4 rounded-xl hover:from-pink-700 hover:to-purple-700 transition-colors shadow-lg"
            >
              확인 및 등록
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-12 text-center">
        {/* 로딩 애니메이션 */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto relative">
            <div className="absolute inset-0 border-8 border-pink-200 rounded-full"></div>
            <div className="absolute inset-0 border-8 border-pink-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
        </div>

        {/* 텍스트 */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          AI가 리뷰를 생성하고 있습니다
        </h2>
        <p className="text-gray-600 mb-2">고객님의 소중한 의견을 바탕으로</p>
        <p className="text-gray-600">자연스러운 리뷰를 작성하고 있습니다</p>

        {/* 진행 상태 */}
        <div className="mt-8 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">설문 분석 중</span>
            <span
              className={`font-semibold ${
                status === "analyzing" ? "text-gray-400" : "text-pink-600"
              }`}
            >
              {status === "analyzing" ? (
                <div className="w-4 h-4 border-2 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "✓"
              )}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">리뷰 생성 중</span>
            {status === "generating" ? (
              <div className="w-4 h-4 border-2 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
            ) : status === "complete" || status === "preview" ? (
              <span className="text-pink-600 font-semibold">✓</span>
            ) : (
              <span className="text-gray-400">⋯</span>
            )}
          </div>
          <div className="flex items-center justify-between text-sm">
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
              <div className="w-4 h-4 border-2 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
            ) : status === "preview" ? (
              <span className="text-pink-600 font-semibold">✓</span>
            ) : (
              <span className="text-gray-400">⋯</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
