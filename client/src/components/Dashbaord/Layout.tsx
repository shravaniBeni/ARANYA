"use client";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./Header";

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen font-sans bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        <main className="p-6 overflow-y-auto">
          <Outlet /> {/* child routes */}
        </main>
      </div>
    </div>
  );
}
