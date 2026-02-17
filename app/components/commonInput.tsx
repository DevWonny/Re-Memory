/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
// style
import "@/styles/components/commonInput.scss";

// * type === id -> 영어 대소문자 + 숫자만 입력 가능 + 12자리까지 입력 가능 => 이메일로 변경....(26.2.2)
// * type === password -> 영어 대소문자 + 숫자 + 특수문자 입력 가능 + 20자리까지 입력 가능
// * type === category -> 30자까지 입력 가능
// * type === description -> 100자까지 입력 가능

// type
interface InputType {
  type: string;
  inputVal: string;
  onChangeVal: (value: string) => void;
}
export default function CommonInput({
  type,
  inputVal,
  onChangeVal,
}: InputType) {
  const [inputPlaceHolder, setInputPlaceHolder] = useState("");

  useEffect(() => {
    if (type === "category") setInputPlaceHolder("여행지를 입력해주세요");
    else if (type === "description") {
      setInputPlaceHolder("여행지에서의 추억을 입력해주세요.");
    }
  }, []);

  return (
    // * 카테고리 (여행지)-> 텍스트 입력(30자 내로) / 폴더 설명(100자 내로)
    <div className={`common-input-container w-full`}>
      <input
        id={type}
        className="w-full"
        type="text"
        placeholder={inputPlaceHolder}
        value={inputVal}
        onChange={(e) => onChangeVal(e.target.value)}
      />
    </div>
  );
}
