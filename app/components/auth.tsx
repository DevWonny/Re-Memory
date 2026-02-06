/* eslint-disable @typescript-eslint/no-unused-expressions */
// * 로그인 및 회원가입 모달
// * 해당 컴포넌트 열린 상태에서는 모든 페이지는 활성화 안되도록.
// * 해당 모달 외 영역 클릭 시 해당 모달 닫힘.
// * 회원가입 완료 시 모달 닫힘 + 로그인 안되어 있는 상태로.

// * 아이디를 유저 닉네임으로 활용
// * 회원가입 -> 아이디(영어 대소문자, 숫자만 가능) / 비밀번호(영어 대소문자 + 숫자 + 특수기호 + 8자리 이상 + 20자리 이하) / 비밀번호 체크
// *        -> 하단에 로그인 버튼 + 닫기 버튼 + 회원가입 버튼
// * 로그인 -> 아이디 / 비밀번호 + 하단에 회원가입 버튼 + 닫기 버튼 + 로그인 버튼
"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
// store
import { useAuth } from "@/store/auth";
// style
import "@/styles/components/auth.scss";

// type
interface AuthType {
  type: string;
  onCloseClick: () => void;
  onChangeType: (type: string) => void;
}

export default function Auth({ type, onCloseClick, onChangeType }: AuthType) {
  const [idValue, setIdValue] = useState("");
  const [pwValue, setPwValue] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const { setSession } = useAuth();

  const onChangeTypeClick = (type: string) => {
    onChangeType(type);
    setIdValue("");
    setPwValue("");
    setPwCheck("");
  };

  // 회원가입 및 로그인 로직
  const onConfirmClick = async (type: string) => {
    if (type === "register") {
      // * 닉네임은 email의 앞부분 활용.
      if (!idValue || !pwValue || !pwCheck) {
        alert("아이디 및 비밀번호를 입력해주세요.");
        return;
      }
      if (pwValue && pwCheck && pwValue !== pwCheck) {
        alert("비밀번호를 확인해주세요.");
        return;
      }

      const { error } = await supabase.auth.signUp({
        email: idValue,
        password: pwValue,
      });
      if (error) {
        console.log("Auth Register Error - ", error);
        return;
      } else {
        alert("회원가입 성공!");
        onCloseClick();
      }
    } else if (type === "login") {
      if (!idValue || !pwValue) {
        alert("아이디 및 비밀번호를 입력해주세요.");
        return;
      }
      const { data, error } = await supabase.auth.signInWithPassword({
        email: idValue,
        password: pwValue,
      });

      if (error) {
        alert("이메일 및 비밀번호를 확인해주세요.");
        console.log(`Login Error(auth.tsx) - `, error.message);
        return;
      } else {
        alert("로그인 성공!");
        setSession(data);
        onCloseClick();
      }
    }
  };

  return (
    <div className="auth-modal-container fixed flex flex-col items-center justify-between">
      <div className="input-container flex flex-col w-full">
        <div className="input-content">
          <p className="label">ID</p>
          <input
            className="w-full auth-input"
            type="text"
            placeholder={`아이디를 입력해주세요.`}
            value={idValue}
            onChange={(e) => setIdValue(e.target.value)}
          />
        </div>

        <div className="input-content">
          <p className="label">PASSWORD</p>
          <input
            className="w-full auth-input"
            type="text"
            placeholder={`패스워드를 입력해주세요.`}
            value={pwValue}
            onChange={(e) => setPwValue(e.target.value)}
          />
        </div>
        {type === "register" && (
          <div className="input-content">
            <p className="label">PASSWORD CHECK</p>
            <input
              className="w-full auth-input"
              type="text"
              placeholder={`패스워드를 한번 더 입력해주세요.`}
              value={pwCheck}
              onChange={(e) => setPwCheck(e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="button-content w-full flex  flex-col items-center ">
        <div className="button-container flex items-center w-full">
          <button
            className="confirm-button flex-1"
            onClick={() => onConfirmClick(type)}
          >
            {`${type === "register" ? "회원가입" : "로그인"}`}
          </button>

          <button className="close-button flex-1" onClick={onCloseClick}>
            닫기
          </button>
        </div>

        <button
          className="change-button flex-1 cursor-pointer"
          onClick={() => {
            type === "register"
              ? onChangeTypeClick("login")
              : onChangeTypeClick("register");
          }}
        >
          {`${type === "register" ? "로그인" : "회원가입"}으로 이동`}
        </button>
      </div>
    </div>
  );
}
