"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CompletePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-8">
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
        <p className="text-gray-600 mb-8">
          고객님의 휴대폰으로 확인 링크가 발송되었습니다
        </p>

        {/* SMS 안내 */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <div className="text-2xl">📱</div>
            <div className="text-left">
              <p className="font-semibold text-gray-900 mb-2">SMS 발송 완료</p>
              <p className="text-sm text-gray-600">
                010-****-5678로 리뷰 확인 링크가 발송되었습니다. 언제든지
                수정하거나 삭제할 수 있습니다.
              </p>
            </div>
          </div>
        </div>

        {/* QR 코드 (시뮬레이션) */}
        <div className="mb-8">
          <p className="text-sm text-gray-600 mb-4">
            또는 QR코드를 스캔하여 바로 확인하세요
          </p>
          <div className="w-40 h-40 mx-auto bg-gray-100 rounded-xl flex items-center justify-center">
            <div className="text-4xl">📲</div>
          </div>
        </div>

        {/* 버튼들 */}
        <div className="space-y-3">
          <Link
            href="/mobile/review"
            className="block w-full bg-pink-600 text-white font-semibold py-4 rounded-xl hover:bg-pink-700 transition-colors"
          >
            온라인 리뷰 미리보기
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
            🎁 리뷰 작성 감사 포인트{" "}
            <span className="font-bold text-pink-600">500P</span> 적립 완료!
          </p>
        </div>
      </div>
    </div>
  );
}
