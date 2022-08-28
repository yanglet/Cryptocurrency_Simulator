import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

function MainLayout({ children }) {
  return (
    <div>
      <Navbar />

      <div className="flex-auto">{children}</div>
      <Footer />
    </div>
  );
}

export default MainLayout;
