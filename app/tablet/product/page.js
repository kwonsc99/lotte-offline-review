"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
    <div className="min-h-screen bg-gray-50 p-8">
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

      {/* 메인 컨텐츠 */}
      <div className="max-w-2xl mx-auto bg-white shadow-lg p-8">
        {/* 탭 */}

        {/* 휴대폰 번호 입력 */}
        <div className="space-y-4">
          <label className="block">
            <span className="text-lg font-semibold text-gray-900 mb-2 block">
              휴대폰 번호
            </span>
            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="고객 휴대폰 번호를 입력해주세요."
              maxLength="13"
              className="w-full px-4 py-4 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </label>

          <button
            onClick={handleSubmit}
            className="w-full bg-black text-white font-semibold py-4 rounded-xl text-lg hover:bg-gray-800 transition-colors"
          >
            입력하기
          </button>
        </div>
      </div>
    </div>
  );
}
