/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRouter, usePathname } from "next/navigation";
// style
import "@/styles/components/header.scss";

// * login / register / logout button
// * 로그인시 유저 이메일 + logout 버튼 표출
// * 비로그인시 login + register 버튼 표출

// interface
interface HeaderType {
  onLoginClick?: (e: any) => void;
  onRegisterClick?: (e: any) => void;
}

export default function Header({ onLoginClick, onRegisterClick }: HeaderType) {
  const router = useRouter();
  const pathName = usePathname();

  const onLogoClick = () => {
    console.log(pathName);
    if (pathName === "/") {
      return;
    }

    router.push("/");
  };
  return (
    <div className="header-container flex items-center justify-between w-full fixed">
      <div className="logo-container cursor-pointer" onClick={onLogoClick}>
        Re-Memory
      </div>
      <div className="button-container flex items-center">
        <button onClick={onRegisterClick}>회원가입</button>
        <button onClick={onLoginClick}>로그인</button>
        {/* <p className="user-email cursor-default">cjfdnjs1994@naver.com</p>
        <button>로그아웃</button> */}
      </div>
    </div>
  );
}
