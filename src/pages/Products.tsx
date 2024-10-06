import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Product_1 from "../partials/products/Product_1";


export default function Products() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Product_1/>
      </div>
    </div>
  );
}
