/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
// store
import { useAuth } from "@/store/auth";
// style
import "@/styles/components/header.scss";

// interface
interface HeaderType {
  onLoginClick?: (e: any) => void;
  onRegisterClick?: (e: any) => void;
}

export default function Header({ onLoginClick, onRegisterClick }: HeaderType) {
  const router = useRouter();
  const pathName = usePathname();
  const { setSession, session } = useAuth((state) => ({
    setSession: state.setSession,
    session: state.session,
  }));

  const onLogoClick = () => {
    console.log(pathName);
    if (pathName === "/") {
      return;
    }

    router.push("/");
  };

  const onLogoutClick = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("Logout Fail! - ", error.message);
      return;
    }

    router.replace("/");
    setSession(null);
  };

  return (
    <div className="header-container flex items-center justify-between w-full fixed">
      <div className="logo-container cursor-pointer" onClick={onLogoClick}>
        Re:Memory
      </div>
      <div className="button-container flex items-center">
        {session ? (
          <>
            <p className="user-email cursor-default">
              {session.user.user_metadata.displayName}
            </p>
            <button onClick={onLogoutClick}>로그아웃</button>
          </>
        ) : (
          <>
            <button onClick={onRegisterClick}>회원가입</button>
            <button onClick={onLoginClick}>로그인</button>
          </>
        )}
      </div>
    </div>
  );
}
