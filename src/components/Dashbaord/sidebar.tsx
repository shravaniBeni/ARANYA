"use client";

import { Map, FileText, Leaf, BarChart2, X } from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navItems = [
    { to: "/dashboard/atlas", label: "Atlas", icon: Map },
    { to: "/dashboard/claims", label: "Claims", icon: FileText },
    { to: "/dashboard/schemes", label: "Schemes", icon: Leaf },
    { to: "/dashboard/analytics", label: "Analytics", icon: BarChart2 },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-screen w-64 bg-white border-r flex-col font-inter z-50 transform transition-transform duration-300 ease-in-out shadow-lg lg:shadow-none
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        hidden lg:flex`}
      >
        {/* Logo + Title */}
        <div className="flex items-center gap-2 px-6 py-4 border-b">
          <div className="w-9 h-9 rounded-md bg-[#2E7D32] flex items-center justify-center">
            <Leaf className="text-white w-5 h-5" />
          </div>
          <div className="leading-tight flex-1">
            <h3 className="text-lg font-semibold text-gray-900">Aranya</h3>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-[#2E7D32] text-white"
                    : "text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                }`
              }
            >
              <Icon className="w-4 h-4" /> {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile Slide-out Sidebar */}
      <aside
        className={`lg:hidden fixed top-0 left-0 h-screen w-64 bg-white border-r flex flex-col font-inter z-50 transform transition-transform duration-300 ease-in-out shadow-lg
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Logo + Title */}
        <div className="flex items-center gap-2 px-6 py-4 border-b">
          <div className="w-9 h-9 rounded-md bg-[#2E7D32] flex items-center justify-center">
            <Leaf className="text-white w-5 h-5" />
          </div>
          <div className="leading-tight flex-1">
            <h3 className="text-lg font-semibold text-gray-900">Aranya</h3>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-gray-100 active:bg-gray-200 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-[#2E7D32] text-white"
                    : "text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                }`
              }
            >
              <Icon className="w-4 h-4" /> {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile Bottom Menu Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50 font-inter safe-area-pb">
        <div className="flex items-center justify-around px-2 py-3">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className="flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition min-w-[70px]"
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`p-2 rounded-lg transition ${
                      isActive ? "bg-[#2E7D32]/10" : ""
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        isActive ? "text-[#2E7D32]" : "text-gray-600"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-xs font-medium truncate max-w-full ${
                      isActive ? "text-[#2E7D32]" : "text-gray-600"
                    }`}
                  >
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Overlay for mobile slide-out */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
    </>
  );
}