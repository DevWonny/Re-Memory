"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
// store
import { useAuth } from "@/store/auth";
// Component
import Header from "./components/header";
import Auth from "./components/auth";

export default function ClientLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [authType, setAuthType] = useState("");
  const { session, setSession } = useAuth();

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

  useEffect(() => {
    onGetSession();
  }, []);

  return (
    <div className="client-layout w-screen h-screen">
      <div className={`modal-container ${authType ? "active" : ""}`}>
        {authType && (
          <Auth
            type={authType}
            onCloseClick={onAuthClose}
            onChangeType={(type: string) => onAuthTypeCheck(type)}
          ></Auth>
        )}
      </div>

      <div className={`blur-container ${authType ? "disabled" : ""} h-screen`}>
        <Header
          onRegisterClick={() => onAuthTypeCheck("register")}
          onLoginClick={() => onAuthTypeCheck("login")}
        />
        {children}
      </div>
    </div>
  );
}
