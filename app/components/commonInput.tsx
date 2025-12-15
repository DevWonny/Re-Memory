"use client";

interface InputType {
  type: string;
}
export default function CommonInput({ type }: InputType) {
  const onInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let MAX_LENGTH;
    if (type === "category") {
      MAX_LENGTH = 30;
    } else if (type === "description") {
      MAX_LENGTH = 100;
    }
    const value = e.target.value;

    if (value.length === MAX_LENGTH) {
      return;
    }
  };
  return (
    // * 카테고리 (여행지)-> 텍스트 입력(30자 내로) / 폴더 설명(100자 내로)
    <div className="common-input-container">
      <input type="text" placeholder={type} onChange={onInputChangeHandler} />
    </div>
  );
}
