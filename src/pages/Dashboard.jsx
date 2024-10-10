import React, { useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import FilterButton from "../components/DropdownFilter";
import Datepicker from "../components/Datepicker";

import DashboardCard07 from "../partials/dashboard/DashboardCard07";

import DashboardCard10 from "../partials/dashboard/DashboardCard10";

import { useAuth } from "../hooks/AuthProvider";
import Banner from "../partials/Banner";
import { useNavigate } from "react-router-dom";
import DashboardCard6 from "../partials/dashboard/DashboardCard06";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <div
          className="flex justify-center items-center py-4"
          style={{ borderWidth: 1, justifyContent: "flex-end" }}
        >
          {/* Centering the button */}
          <button
            className="bg-red-500 text-white font-bold py-2 px-4 rounded"
            style={{ padding: 10, margin: 10 }}
            onClick={() => (setIsAuthenticated(false), navigate("/login"))}
          >
            Logout
          </button>
        </div>
        {/*  Site header */}
        {/* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                  Dashboard
                </h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2"></div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-20 gap-6">
              {/* Line chart (Real Time Value) */}

              {/* Doughnut chart (Top Countries) */}
              {/* <DashboardCard10 /> */}
              {/* Table (Top Channels) */}
              <DashboardCard07 />
              {/* Line chart (Sales Over Time) */}
            </div>

            <div className="grid grid-cols-12" style={{ marginTop: 20 }}>
              {/* <DashboardCard6 /> */}
              {/* Line chart (Real Time Value) */}

              {/* Doughnut chart (Top Countries) */}

              {/* Table (Top Channels) */}

              {/* Line chart (Sales Over Time) */}
            </div>
          </div>
        </main>
        <Banner />
      </div>
    </div>
  );
}

export default Dashboard;
