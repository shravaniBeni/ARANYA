"use client";
import { Map, FileText, Leaf, BarChart2 } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logout clicked");
  };

  return (
    <>
      <aside
        className={`fixed lg:static top-0 left-0 h-screen w-64 bg-white border-r flex flex-col font-inter transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-1 mt-16 lg:mt-6">
          <NavLink
            to="/dashboard/atlas"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition ${
                isActive
                  ? "bg-[#2E7D32] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <Map className="w-4 h-4" /> Atlas
          </NavLink>

          <NavLink
            to="/dashboard/claims"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition ${
                isActive
                  ? "bg-[#2E7D32] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <FileText className="w-4 h-4" /> Claims
          </NavLink>

          <NavLink
            to="/dashboard/schemes"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition ${
                isActive
                  ? "bg-[#2E7D32] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <Leaf className="w-4 h-4" /> Schemes
          </NavLink>

          <NavLink
            to="/dashboard/analytics"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition ${
                isActive
                  ? "bg-[#2E7D32] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <BarChart2 className="w-4 h-4" /> Analytics
          </NavLink>
        </nav>

        {/* Logout Button */}
        <div className="p-4 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg text-sm hover:bg-red-700 transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Dark overlay on mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
        />
      )}
    </>
  );
}
