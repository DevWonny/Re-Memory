"use client";
import { useState } from "react";
// Component
import Header from "./components/header";
import Auth from "./components/auth";

export default function ClientLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [authType, setAuthType] = useState("");

  const onAuthTypeCheck = (type: string) => {
    setAuthType(type);
  };

  const onAuthClose = () => {
    setAuthType("");
  };

  return (
    <div className="client-layout w-screen h-screen">
      <div className={`modal-container ${authType ? "active" : ""}`}>
        {authType && <Auth type={authType} onCloseClick={onAuthClose}></Auth>}
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
