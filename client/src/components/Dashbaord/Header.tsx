"use client";
import { useState } from "react";
import { Bell, Leaf, Menu, X, LogOut } from "lucide-react";

export default function Header({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="w-full h-16 bg-white border-b flex items-center justify-between px-4 sm:px-6 font-inter relative">
      {/* Left: Brand + Hamburger */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-md bg-[#2E7D32] flex items-center justify-center">
          <Leaf className="text-white w-5 h-5" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 hidden sm:block">
          Aranya
        </h3>

        {/* Hamburger toggle (mobile only) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="ml-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 lg:hidden"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Right: Notifications + Profile */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <div className="relative cursor-pointer">
          <Bell className="w-6 h-6 text-gray-600" />
          <span className="absolute -top-1 -right-2 w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full flex items-center justify-center">
            3
          </span>
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img
              src="https://randomuser.me/api/portraits/women/45.jpg"
              alt="Admin"
              className="w-8 h-8 rounded-full"
            />
            <span className="hidden sm:block text-sm font-medium text-gray-700">
              Admin
            </span>
            <svg
              className="hidden sm:block w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-2 z-50">
              <button
                onClick={() => {
                  setProfileOpen(false);
                  alert("Logging out..."); // replace with actual logout logic
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <LogOut className="w-4 h-4 text-gray-600" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
