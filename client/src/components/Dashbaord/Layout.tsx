"use client";
import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./Header";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen font-sans bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 overflow-y-auto">
          <Outlet /> {/* <-- Child routes render here */}
        </main>
      </div>
    </div>
  );
}