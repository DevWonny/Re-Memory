"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
// store
import { useAuth } from "@/store/auth";
import { useModalStore } from "@/store/modal";
// service
import { withdrawUser } from "@/services/withdraw";
// Component
import Header from "./components/header";
import Auth from "./components/auth";
import CommonModal from "./components/commonModal";

export default function ClientLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [authType, setAuthType] = useState("");
  const setSession = useAuth((state) => state.setSession);
  const session = useAuth((state) => state.session);
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
  const onModalConfirm = () => {
    if (modalType === "SIGNUP_COMPLETE" || modalType === "WITHDRAW_COMPLETE") {
      closeModal();
      return;
    }
    if (modalType === "WITHDRAW_WARNING") {
      withdrawUser(session?.user.id);
      openModal("WITHDRAW_COMPLETE");
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
        className={`modal-container ${authType || isModalOpen ? "active" : ""}`}
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
      </div>

      <div
        className={`blur-container ${authType || isModalOpen ? "disabled" : ""} h-screen`}
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
