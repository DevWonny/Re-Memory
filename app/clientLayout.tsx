"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
// store
import { useAuth } from "@/store/auth";
import { useModalStore } from "@/store/modal";
import { useLoading } from "@/store/loading";
// service
// Component
import Header from "./components/header";
import Auth from "./components/auth";
import CommonModal from "./components/commonModal";
import Loading from "./components/loading";

export default function ClientLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [authType, setAuthType] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const setSession = useAuth((state) => state.setSession);
  const { isLoading } = useLoading();
  const {
    isOpen: isModalOpen,
    closeModal,
    type: modalType,
    openModal,
  } = useModalStore();

  const onAuthTypeCheck = (type: string) => {
    setAuthType(type);
  };

  const onAuthClose = () => {
    setAuthType("");
  };

  const onGetSession = async () => {
    const { data } = await supabase.auth.getSession();
    if (data) {
      setSession(data.session);
    }
  };

  // Common Modal Close
  const onModalConfirm = async () => {
    if (modalType === "SIGNUP_COMPLETE") {
      closeModal();
      return;
    }

    if (modalType === "WITHDRAW_WARNING") {
      const res = await fetch("/api/withdraw", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        openModal("WITHDRAW_COMPLETE");
      } else {
        openModal("WITHDRAWAL_ERROR");
      }
    }

    if (modalType === "WITHDRAW_COMPLETE") {
      closeModal();
      router.replace("/");
      setSession(null);
      return;
    }

    if (modalType === "POST_COMPLETE") {
      closeModal();
      router.replace("/");
    }

    if (modalType === "MODIFY_VALIDATION") {
      closeModal();
    }

    if (modalType === "MODIFY_COMPLETE") {
      closeModal();
      router.replace(`/detail/${params.id}`);
    }

    if (modalType === "LOGIN_CHECK") {
      closeModal();
      setAuthType("login");
    }
  };

  const onModalCancel = () => {
    closeModal();
  };

  useEffect(() => {
    onGetSession();
    // 화면 너비 or UserAgent로 모바일 판단 -> 반응형 작업 되면 지울 예정
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = [
        "android",
        "webos",
        "iphone",
        "ipad",
        "ipod",
        "blackberry",
        "iemobile",
        "opera mini",
      ];
      const isMobileSize = window.innerWidth < 1024;

      const isMobileDevice =
        mobileKeywords.some((keyword) => userAgent.includes(keyword)) ||
        isMobileSize;
      setIsMobile(isMobileDevice);
    };
    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="mobile-container w-full h-screen flex flex-col items-center justify-center">
        <p className="text-main">{`추억을 보여주기에는 화면이 너무 좁아요.\n더 넒은 시야에서 당신의 기억을 기록해 보아요.`}</p>
        <p className="text-sub">{`(추후 업데이트 예정)`}</p>
      </div>
    );
  }

  return (
    <div className="client-layout w-screen h-screen">
      <div
        className={`modal-container ${authType || isModalOpen || isLoading ? "active" : ""}`}
      >
        {authType && (
          <Auth
            type={authType}
            onCloseClick={onAuthClose}
            onChangeType={(type: string) => onAuthTypeCheck(type)}
          ></Auth>
        )}
        {isModalOpen && (
          <CommonModal
            onConfirmClick={onModalConfirm}
            onCancelClick={onModalCancel}
          />
        )}
        {isLoading && <Loading />}
      </div>

      <div
        className={`blur-container ${authType || isModalOpen || isLoading ? "disabled" : ""} h-screen`}
      >
        <Header
          onRegisterClick={() => onAuthTypeCheck("register")}
          onLoginClick={() => onAuthTypeCheck("login")}
        />
        {children}
      </div>
    </div>
  );
}
