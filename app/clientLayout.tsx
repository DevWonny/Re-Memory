"use client";
// Component
import Header from "./components/header";
import Auth from "./components/auth";

export default function ClientLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="client-layout">
      <Auth type="register"></Auth>

      <Header />
      {children}
    </div>
  );
}
