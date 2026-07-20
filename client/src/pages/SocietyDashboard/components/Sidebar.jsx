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
  X,
} from "lucide-react";

import LogoutModal from "../Settings/components/LogoutModal";

function Sidebar({
  activePage,
  setActivePage,
  sidebarOpen,
  setSidebarOpen,
}) {
  const [collapsed, setCollapsed] =
    useState(false);

  const [logoutOpen, setLogoutOpen] =
    useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    setSidebarOpen(false);
    setLogoutOpen(true);
  };

  const confirmLogout = () => {
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
    <>
      <div
        className={`
          fixed lg:static
          top-0 left-0
          z-40
          bg-slate-900
          text-white
          h-screen
          transition-all
          duration-300
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
          ${
            collapsed
              ? "lg:w-20"
              : "w-64"
          }
          flex
          flex-col
        `}
      >
        {/* Header */}

        <div className="flex items-center justify-between p-5 border-b border-slate-800">

          {!collapsed && (
            <h1 className="text-xl font-bold">
              Campus Connect
            </h1>
          )}

          <div className="flex items-center gap-2">

            {/* Mobile Close */}

            <button
              onClick={() =>
                setSidebarOpen(false)
              }
              className="lg:hidden p-2 rounded-lg hover:bg-slate-800 transition"
            >
              <X size={20} />
            </button>

            {/* Desktop Collapse */}

            <button
              onClick={() =>
                setCollapsed(
                  !collapsed
                )
              }
              className="hidden lg:flex p-2 rounded-lg hover:bg-slate-800 transition"
            >
              {collapsed ? (
                <ChevronRight
                  size={20}
                />
              ) : (
                <ChevronLeft
                  size={20}
                />
              )}
            </button>

          </div>

        </div>

        {/* Menu */}

        <div className="flex-1 mt-5 space-y-2 px-2 overflow-y-auto">

          {menus.map((item) => (

            <button
              key={item.key}
              onClick={() => {
                setActivePage(item.key);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                activePage === item.key
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span className="shrink-0">
                {item.icon}
              </span>

              {!collapsed && (
                <span className="font-medium break-words">
                  {item.name}
                </span>
              )}

            </button>

          ))}

        </div>

        {/* Logout */}

        <div className="border-t border-slate-800 p-3">

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-400 hover:bg-red-600 hover:text-white transition-all duration-200"
          >
            <LogOut
              size={22}
              className="shrink-0"
            />

            {!collapsed && (
              <span className="font-medium">
                Logout
              </span>
            )}

          </button>

        </div>

      </div>

      <LogoutModal
        open={logoutOpen}
        setOpen={setLogoutOpen}
        onLogout={confirmLogout}
      />
    </>
  );
}

export default Sidebar;