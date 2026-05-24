import { Outlet } from "react-router-dom";

import { useState } from "react";

import Sidebar from "../components/Sidebar";

import Navbar from "../components/Navbar";

export default function DashboardLayout() {

  const [collapsed, setCollapsed] =
    useState(false);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f8f6f2",
      }}
    >

      {/* SIDEBAR */}
      <Sidebar
        collapsed={collapsed}
      />

      {/* MAIN */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >

        {/* TOP NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <main
          style={{
            flex: 1,
            padding: "90px 24px 24px",
            overflowX: "hidden",
          }}
        >
          <Outlet />
        </main>

      </div>
    </div>
  );
}
