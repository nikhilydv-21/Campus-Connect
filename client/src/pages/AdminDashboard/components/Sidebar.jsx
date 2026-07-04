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
} from "lucide-react";

import LogoutModal from "./LogoutModal";

function Sidebar({
  activePage,
  setActivePage,
}) {

  const [collapsed, setCollapsed] =
    useState(false);

  const [logoutOpen, setLogoutOpen] =
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
            onClick={() =>
              setLogoutOpen(true)
            }
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