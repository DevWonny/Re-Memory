"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
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
        alert("탈퇴 중 오류 발생!");
      }
    }

    if (modalType === "WITHDRAW_COMPLETE") {
      closeModal();
      router.replace("/");
      setSession(null);
      return;
    }
  };

  const onModalCancel = () => {
    closeModal();
  };

  useEffect(() => {
    onGetSession();
  }, []);

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
