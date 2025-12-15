/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
interface InputType {
  type: string;
}
export default function CommonInput({ type }: InputType) {
  const [inputValue, setInputValue] = useState("");
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
    }

    if (value.length > maxLength) return;
    setInputValue(value);
  };

  return (
    // * 카테고리 (여행지)-> 텍스트 입력(30자 내로) / 폴더 설명(100자 내로)
    <div className="common-input-container">
      <input
        type="text"
        placeholder={type}
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
