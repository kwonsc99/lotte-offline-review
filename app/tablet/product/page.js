"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();

  const formatPhoneNumber = (value) => {
    const numbers = value.replace(/[^\d]/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7)
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(
      7,
      11
    )}`;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  const handleSubmit = () => {
    if (phoneNumber.replace(/[^\d]/g, "").length === 11) {
      localStorage.setItem("phoneNumber", phoneNumber);
      router.push("/tablet/survey");
    } else {
      alert("올바른 휴대폰 번호를 입력해주세요.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      {/* 헤더 */}
      <div className="max-w-2xl mx-auto shadow-lg">
        <div className="flex items-center justify-between bg-white px-4 sm:px-6 py-3 sm:py-4 shadow-lg rounded-t-xl">
          <h1 className="text-lg sm:text-xl font-bold text-gray-900">
            롯데백화점 리뷰
          </h1>
          <div className="flex gap-2 sm:gap-3">
            <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
              👤
            </button>
            <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
              ⚙️
            </button>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="max-w-2xl mx-auto bg-white shadow-lg p-6 sm:p-8 rounded-b-xl">
        {/* 휴대폰 번호 입력 */}
        <div className="space-y-4 sm:space-y-6">
          <label className="block">
            <span className="text-base sm:text-lg font-semibold text-gray-900 mb-2 block">
              휴대폰 번호
            </span>
            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="고객 휴대폰 번호를 입력해주세요."
              maxLength="13"
              className="w-full px-4 py-3 sm:py-4 border-2 border-gray-300 rounded-xl text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </label>

          <button
            onClick={handleSubmit}
            className="w-full bg-black text-white font-semibold py-3 sm:py-4 rounded-xl text-base sm:text-lg hover:bg-gray-800 active:bg-gray-900 transition-colors shadow-md"
          >
            입력하기
          </button>
        </div>
      </div>
    </div>
  );
}
