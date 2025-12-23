// * 로그인 및 회원가입 모달
// * 해당 컴포넌트 열린 상태에서는 모든 페이지는 활성화 안되도록.
// * 해당 모달 외 영역 클릭 시 해당 모달 닫힘.
// * 회원가입 완료 시 모달 닫힘 + 로그인 안되어 있는 상태로.

// * 아이디를 유저 닉네임으로 활용
// * 회원가입 -> 아이디(영어 대소문자, 숫자만 가능) / 비밀번호(영어 대소문자 + 숫자 + 특수기호 + 8자리 이상 + 20자리 이하) / 비밀번호 체크
// *        -> 하단에 로그인 버튼 + 닫기 버튼 + 회원가입 버튼
// * 로그인 -> 아이디 / 비밀번호 + 하단에 회원가입 버튼 + 닫기 버튼 + 로그인 버튼
"use client";
// component
import CommonInput from "./commonInput";
// style
import "@/styles/components/auth.scss";

// type
interface AuthType {
  type: string;
}

export default function Auth({ type }: AuthType) {
  return (
    <div className="auth-modal-container fixed flex flex-col">
      <div className="input-content">
        <p className="label">ID</p>
        <CommonInput type="id"></CommonInput>
      </div>
      <div className="input-content">
        <p className="label">PASSWORD</p>
        <CommonInput type="password"></CommonInput>
      </div>
      {type === "register" && (
        <div className="input-content">
          <p className="label">PASSWORD CHECK</p>
          <CommonInput type="password"></CommonInput>
        </div>
      )}

      <div className="button-content flex items-center">
        <button className="change-button flex-1">
          {`${type === "register" ? "로그인" : "회원가입"}`}
        </button>

        <button className="confirm-button flex-1">
          {`${type === "register" ? "회원가입" : "로그인"}`}
        </button>

        <button className="close-button flex-1">닫기</button>
      </div>
    </div>
  );
}
