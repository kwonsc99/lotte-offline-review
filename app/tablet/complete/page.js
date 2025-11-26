"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CompletePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-12 text-center">
        {/* 성공 아이콘 */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-green-600"
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
        </div>

        {/* 텍스트 */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          리뷰가 등록되었습니다!
        </h2>

        {/* SMS 안내 */}

        <div>
          <p className="text-sm text-gray-600 mb-4">
            고객님의 휴대폰 번호로 리워드를 보내드렸어요!
          </p>
        </div>

        {/* 버튼들 */}
        <div className="space-y-3">
          <Link
            href="/mobile/review"
            className="block w-full bg-pink-600 text-white font-semibold py-4 rounded-xl hover:bg-pink-700 transition-colors"
          >
            내 리뷰 보러가기
          </Link>

          <button
            onClick={() => router.push("/tablet/product")}
            className="block w-full bg-gray-100 text-gray-700 font-semibold py-4 rounded-xl hover:bg-gray-200 transition-colors"
          >
            새 리뷰 작성하기
          </button>
        </div>

        {/* 혜택 안내 */}
        <div className="mt-8 pt-6 border-t">
          <p className="text-sm text-gray-600">
            🎁 리뷰 작성 감사 L.POINT{" "}
            <span className="font-bold text-pink-600">1500P</span> 적립 완료!
          </p>
        </div>
      </div>
    </div>
  );
}
