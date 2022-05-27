import React from "react";
import Sidebar from "./Sidebar";

function AppLayout({ children }) {
  return (
    <div className="flex">
      <div className="flex-none bg-slate-800">
        <Sidebar />
      </div>
      <div className="flex-auto">{children}</div>
    </div>
  );
}

export default AppLayout;
