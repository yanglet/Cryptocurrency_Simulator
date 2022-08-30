import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

function MainLayout({ children }) {
  return (
    // 
    <div className="h-full">
      {/* <div className="min-h-full relative "> */}
        <Navbar />
        <div className="flex-auto">{children}</div>
      {/* </div> */}
      {/* <Footer /> */}
    </div>
  );
}

export default MainLayout;
