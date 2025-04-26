import React from "react";
import AdminHeader from "../components/header/AdminHeader";
import Footer from "../components/footer/Footer";

export default function AdminLayout({ children }) {
  return (
    <div>
      <AdminHeader />
      {children}
      <Footer />
    </div>
  );
}
