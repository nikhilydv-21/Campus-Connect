import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  User,
  CalendarPlus,
  CalendarDays,
  History,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function Sidebar({ activePage, setActivePage }) {
  const [collapsed, setCollapsed] =
    useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const menus = [
    {
      key: "dashboard",
      icon: <LayoutDashboard size={22} />,
      name: "Dashboard",
    },
    {
      key: "profile",
      icon: <User size={22} />,
      name: "Society Profile",
    },
    {
      key: "create-event",
      icon: <CalendarPlus size={22} />,
      name: "Create Event",
    },
    {
      key: "manage-events",
      icon: <CalendarDays size={22} />,
      name: "Manage Events",
    },
    {
      key: "past-events",
      icon: <History size={22} />,
      name: "Past Events",
    },
    {
      key: "join-requests",
      icon: <Users size={22} />,
      name: "Join Requests",
    },
    {
      key: "analytics",
      icon: <BarChart3 size={22} />,
      name: "Analytics",
    },
    {
      key: "settings",
      icon: <Settings size={22} />,
      name: "Settings",
    },
  ];

  return (
    <div
      className={`bg-slate-900 text-white h-screen transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      } flex flex-col`}
    >
      {/* Header */}

      <div className="flex items-center justify-between p-5 border-b border-slate-800">

        {!collapsed && (
          <h1 className="text-xl font-bold">
            Campus Connect
          </h1>
        )}

        <button
          onClick={() =>
            setCollapsed(!collapsed)
          }
          className="p-2 rounded-lg hover:bg-slate-800 transition"
        >
          {collapsed ? (
            <ChevronRight size={20} />
          ) : (
            <ChevronLeft size={20} />
          )}
        </button>

      </div>

      {/* Menu */}

      <div className="flex-1 mt-5 space-y-2 px-2">

        {menus.map((item) => (

          <button
            key={item.key}
            onClick={() =>
              setActivePage(item.key)
            }
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
              activePage === item.key
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-800 text-gray-200"
            }`}
          >
            {item.icon}

            {!collapsed && (
              <span>{item.name}</span>
            )}

          </button>

        ))}

      </div>

      {/* Logout */}

      <div className="border-t border-slate-800 p-2">

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-400 hover:bg-red-600 hover:text-white transition"
        >
          <LogOut size={22} />

          {!collapsed && (
            <span>Logout</span>
          )}

        </button>

      </div>

    </div>
  );
}

export default Sidebar;