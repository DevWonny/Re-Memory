"use client";
// style
import "@/styles/components/header.scss";

// * login / register / logout button
// * 로그인시 유저 이메일 + logout 버튼 표출
// * 비로그인시 login + register 버튼 표출

export default function Header() {
  return (
    <div className="header-container flex items-center justify-between w-full fixed">
      <div className="logo-container">Re-Memory</div>
      <div className="button-container flex items-center">
        <button>회원가입</button>
        <button>로그인</button>
        {/* <p className="user-email cursor-default">cjfdnjs1994@naver.com</p>
        <button>로그아웃</button> */}
      </div>
    </div>
  );
}
