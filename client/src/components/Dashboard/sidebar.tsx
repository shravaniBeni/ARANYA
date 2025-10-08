// Sidebar.tsx
"use client";
import { Map, FileText, Leaf, BarChart2 } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-white border-r flex flex-col font-inter">
      {/* Logo + Title */}
      <div className="flex items-center gap-2 px-6 py-4 border-b">
        {/* Smaller logo box */}
        <div className="w-9 h-9 rounded-md bg-[#2E7D32] flex items-center justify-center mb-10">
          <Leaf className="text-white w-5 h-5 " />
        </div>
        <div className="leading-tight">
          <h3 className="text-lg font-semibold text-gray-900 mb-14">Aranya</h3>
        </div>
       
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-1">
        <NavLink
          to="/dashboard/atlas"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition ${
              isActive ? "bg-[#2E7D32] text-white" : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <Map className="w-4 h-4" /> Atlas
        </NavLink>

        <NavLink
          to="/dashboard/claims"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition ${
              isActive ? "bg-[#2E7D32] text-white" : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <FileText className="w-4 h-4" /> Claims
        </NavLink>

        <NavLink
          to="/dashboard/schemes"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition ${
              isActive ? "bg-[#2E7D32] text-white" : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <Leaf className="w-4 h-4" /> Schemes
        </NavLink>

        <NavLink
          to="/dashboard/analytics"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition ${
              isActive ? "bg-[#2E7D32] text-white" : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <BarChart2 className="w-4 h-4" /> Analytics
        </NavLink>
      </nav>
    </aside>
  );
}
