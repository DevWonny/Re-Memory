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
  onTyping?: (value: string, type: string) => void;
}
export default function CommonInput({ type, onTyping }: InputType) {
  const [inputValue, setInputValue] = useState("");
  const [inputPlaceHolder, setInputPlaceHolder] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [maxLength, setMaxLength] = useState(0);

  const onInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isComposing) {
      setInputValue(value);
      return;
    }

    if (type === "category") {
      setMaxLength(30);
    } else if (type === "description") {
      setMaxLength(100);
    } else {
      setMaxLength(500);
    }

    if (value.length > maxLength) return;
    setInputValue(value);
  };

  useEffect(() => {
    if (onTyping) {
      onTyping(inputValue, type);
    }
  }, [inputValue]);

  useEffect(() => {
    if (type === "category") setInputPlaceHolder("여행지를 입력해주세요");
    else if (type === "description")
      setInputPlaceHolder("여행지에서의 추억을 입력해주세요.");
    else if (type === "id") setInputPlaceHolder("아이디를 입력해주세요.");
    else if (type === "password")
      setInputPlaceHolder("패스워드를 입력해주세요.");
  }, []);

  return (
    // * 카테고리 (여행지)-> 텍스트 입력(30자 내로) / 폴더 설명(100자 내로)
    <div
      className={`common-input-container ${
        (type === "category" || type === "description") && "w-full"
      }`}
    >
      <input
        className="w-full"
        type="text"
        placeholder={inputPlaceHolder}
        value={inputValue}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={(e) => {
          setIsComposing(false);
          if ((e.target as any).value.length <= maxLength) {
            setInputValue((e.target as any).value);
          }
        }}
        onChange={onInputChangeHandler}
      />
    </div>
  );
}
