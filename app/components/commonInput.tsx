"use client";

interface InputType {
  type: string;
}
export default function CommonInput({ type }: InputType) {
  return (
    // * 카테고리 (여행지)-> 텍스트 입력(30자 내로) / 폴더 설명(100자 내로)
    <div className="common-input-container">
      <input type="text" placeholder={type} />
    </div>
  );
}
