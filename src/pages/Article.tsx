import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import DashboardCard6 from "../partials/dashboard/DashboardCard06";
import Article1 from "../partials/articles/Article1";

export default function Article() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden" style={{marginLeft:10, marginRight:10}}>
      <Article1/>
      </div>
    </div>
  );
}
