import React from "react";
import Navbar from "./Navbar";

function MainLayout({ children }) {
  return (
    <div className="h-full">
        <Navbar />
        <div className="flex-auto">{children}</div>
    </div>
  );
}

export default MainLayout;
