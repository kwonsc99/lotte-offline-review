"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MobileReviewPage() {
  const router = useRouter();
  const [reviewData, setReviewData] = useState(null);

  useEffect(() => {
    const phoneNumber = localStorage.getItem("phoneNumber") || "010-0000-0000";
    const surveyAnswers = JSON.parse(
      localStorage.getItem("surveyAnswers") || "{}"
    );
    const generatedReview = localStorage.getItem("generatedReview") || "";

    // 전화번호 마스킹 (010-1234-5678 -> 010-****-5678)
    const maskedPhone = phoneNumber.replace(
      /(\d{3})-(\d{4})-(\d{4})/,
      "$1-****-$3"
    );

    // 만족도를 별점으로 변환
    const satisfactionToRating = {
      "매우 만족": 5,
      만족: 4,
      보통: 3,
      불만족: 2,
      "매우 불만족": 1,
    };
    const rating = satisfactionToRating[surveyAnswers.satisfaction] || 5;

    setReviewData({
      phoneNumber: maskedPhone,
      review: generatedReview,
      rating: rating,
      surveyAnswers: surveyAnswers,
      date: new Date().toISOString().split("T")[0].replace(/-/g, "."),
    });
  }, []);

  if (!reviewData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  // 태그 생성
  const getTags = () => {
    const tags = [];
    const { comfort, usage, color, size } = reviewData.surveyAnswers;

    if (comfort && comfort.length > 0) {
      comfort.forEach((item) => {
        tags.push(`착용감: ${item}`);
      });
    }

    if (usage && usage.length > 0) {
      usage.forEach((item) => {
        tags.push(`상황별 활용도: ${item}`);
      });
    }

    if (color) {
      tags.push(`컬러감: ${color}`);
    }

    return tags;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="flex items-center px-4 py-4">
          <button onClick={() => router.back()} className="p-2 -ml-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="flex-1 text-center text-lg font-bold pr-10">
            고객 리뷰 보기
          </h1>
        </div>
      </header>

      {/* 평점 요약 */}
      <div className="px-6 py-8 border-b-8 border-gray-100">
        <div className="flex items-start gap-6">
          {/* 별점 */}
          <div className="flex items-center gap-2">
            <svg
              className="w-10 h-10 text-yellow-400 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            <span className="text-4xl font-bold">{reviewData.rating}.0</span>
          </div>

          {/* 평점 분포 */}
          <div className="flex-1 space-y-1.5">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2 text-sm">
                <span className="w-8 text-gray-700">{star}점</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      star === reviewData.rating ? "bg-red-500" : "bg-gray-100"
                    }`}
                    style={{
                      width: star === reviewData.rating ? "100%" : "0%",
                    }}
                  ></div>
                </div>
                <span className="w-12 text-right text-gray-500">
                  {star === reviewData.rating ? "100%" : "0%"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 운영정책 */}
        <div className="mt-6 text-right">
          <button className="text-sm text-gray-400 underline">운영정책</button>
        </div>
      </div>

      {/* 리뷰 리스트 헤더 */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200">
        <span className="font-bold text-base">총 1건</span>
        <button className="flex items-center gap-1 text-sm text-gray-700">
          <span>랭킹순</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* 리뷰 카드 */}
      <div className="px-6 py-6">
        {/* 리뷰 헤더 */}
        <div className="flex items-start gap-3 mb-4">
          {/* 프로필 아이콘 */}
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                {/* 별점 */}
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < reviewData.rating
                          ? "text-yellow-400"
                          : "text-gray-200"
                      } fill-current`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="font-bold">{reviewData.rating}</span>
                <span className="text-sm text-gray-400">{reviewData.date}</span>
              </div>
              <button className="text-sm text-gray-400">신고</button>
            </div>

            {/* 사용자 정보 */}
            <div className="text-sm text-gray-700 mb-1">
              {reviewData.phoneNumber}
            </div>

            {/* AI 리뷰 안내 배지 */}
            <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-full px-3 py-1 mb-3">
              <svg
                className="w-3.5 h-3.5 text-purple-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M13 7H7v6h6V7z" />
                <path
                  fillRule="evenodd"
                  d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs font-medium text-purple-700">
                실제 오프라인 만족도 조사 기반 AI 리뷰입니다
              </span>
            </div>

            {/* 옵션 정보 */}
            {reviewData.surveyAnswers.size && (
              <div className="text-sm text-gray-500 mb-3">
                옵션 : {reviewData.surveyAnswers.size}
              </div>
            )}

            {/* 리뷰 내용 */}
            <div className="text-base text-gray-900 leading-relaxed mb-4 whitespace-pre-wrap">
              {reviewData.review}
            </div>

            {/* 태그들 */}
            {getTags().length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {getTags().map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-gray-50 text-gray-700 text-sm rounded-full border border-gray-200"
                  >
                    · {tag}
                  </span>
                ))}
              </div>
            )}

            {/* 하단 액션 */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button className="flex items-center gap-2 text-gray-500">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span className="text-sm">0</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-50">
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
                <span className="text-sm">도움돼요</span>
                <span className="text-sm text-red-500 font-semibold">0</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
