"use client";

import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./Header";

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen font-sans bg-gray-50 overflow-hidden">
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <div className="flex-1 flex flex-col">
        <Header onMenuClick={() => setIsOpen(true)} />
        <main className="p-4 sm:p-6 overflow-y-auto pb-24 lg:pb-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}