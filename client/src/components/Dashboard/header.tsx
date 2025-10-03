// Header.tsx
"use client";
import { Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full h-16 bg-white border-b flex items-center justify-end px-6 font-inter">
      {/* Notification Bell */}
      <div className="relative cursor-pointer mr-6">
        <Bell className="w-6 h-6 text-gray-600" />
        <span className="absolute -top-1 -right-2 w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full flex items-center justify-center">
          3
        </span>
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-2 cursor-pointer">
        <img
          src="https://randomuser.me/api/portraits/women/45.jpg"
          alt="Admin"
          className="w-8 h-8 rounded-full"
        />
        <span className="text-sm font-medium text-gray-700">Admin</span>
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </header>
  );
}
