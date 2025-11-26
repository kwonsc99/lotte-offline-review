import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">롯데백화점</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-8">
          오프라인 간편 리뷰 시스템
        </h2>
        <p className="text-gray-600 mb-12 text-lg">
          프로토타입 데모를 선택해주세요
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/tablet/product"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-6 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg"
          >
            <div className="text-2xl mb-2">📱</div>
            <div>태블릿 화면</div>
            <div className="text-sm opacity-80 mt-2">(오프라인 매장)</div>
          </Link>

          <Link
            href="/mobile/review"
            className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-6 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg"
          >
            <div className="text-2xl mb-2">📲</div>
            <div>모바일 화면</div>
            <div className="text-sm opacity-80 mt-2">(온라인 리뷰 확인)</div>
          </Link>
        </div>
      </div>
    </main>
  );
}
