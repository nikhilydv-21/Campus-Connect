import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Clock3,
  Building2,
  Users,
  CalendarDays,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

import LogoutModal from "./LogoutModal";

function Sidebar({
  activePage,
  setActivePage,
  sidebarOpen,
  setSidebarOpen,
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

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
      key: "pending-societies",
      icon: <Clock3 size={22} />,
      name: "Pending Societies",
    },
    {
      key: "societies",
      icon: <Building2 size={22} />,
      name: "All Societies",
    },
    {
      key: "students",
      icon: <Users size={22} />,
      name: "Students",
    },
    {
      key: "events",
      icon: <CalendarDays size={22} />,
      name: "Events",
    },
  ];

  return (
    <>
      <div
        className={`
        fixed lg:static
        inset-y-0 left-0
        z-40
        bg-slate-900
        text-white
        h-screen
        flex
        flex-col
        transition-all
        duration-300
        transform
        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }
        ${collapsed ? "lg:w-20" : "lg:w-64"}
        w-64
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

            {/* Desktop Collapse */}

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex p-2 rounded-lg hover:bg-slate-800 transition"
            >
              {collapsed ? (
                <ChevronRight size={20} />
              ) : (
                <ChevronLeft size={20} />
              )}
            </button>

            {/* Mobile Close */}

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-800"
            >
              <X size={20} />
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
              {item.icon}

              {!collapsed && (
                <span className="font-medium">
                  {item.name}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Logout */}

        <div className="border-t border-slate-800 p-3">

          <button
            onClick={() => setLogoutOpen(true)}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-400 hover:bg-red-600 hover:text-white transition-all duration-200"
          >
            <LogOut size={22} />

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
        onLogout={handleLogout}
      />
    </>
  );
}

export default Sidebar;