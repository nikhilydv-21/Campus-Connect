import {
  Bell,
  ChevronDown,
  Settings,
  LogOut,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ setActivePage }) {

  const [showMenu, setShowMenu] =
    useState(false);

  const navigate = useNavigate();

  const student =
    JSON.parse(localStorage.getItem("student")) || {
      fullName: "Student",
      branch: "",
      profilePicture: "",
    };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="bg-white shadow-sm h-20 px-8 flex items-center justify-between">

      {/* Left */}

      <div>

        <h1 className="text-2xl font-bold text-slate-800">
          Student Portal
        </h1>

        <p className="text-sm text-gray-500">
          Welcome back, {student.fullName}
        </p>

      </div>

      {/* Right */}

      <div className="flex items-center gap-6">

        {/* Notification */}

        <button
          onClick={() => setActivePage("notifications")}
          className="relative hover:scale-110 transition"
        >

          <Bell
            size={24}
            className="text-gray-700"
          />

          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] h-5 w-5 rounded-full flex items-center justify-center">

            0

          </span>

        </button>

        {/* Profile */}

        <div className="relative">

          <button
            onClick={() =>
              setShowMenu(!showMenu)
            }
            className="flex items-center gap-3"
          >

            <img
              src={
                student.profilePicture
                  ? student.profilePicture
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      student.fullName
                    )}&background=2563eb&color=fff`
              }
              alt="Student"
              className="w-11 h-11 rounded-full object-cover"
            />

            <div className="text-left">

              <h3 className="font-semibold">
                {student.fullName}
              </h3>

              <p className="text-xs text-gray-500">
                {student.branch}
              </p>

            </div>

            <ChevronDown size={18} />

          </button>

          {showMenu && (

            <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border overflow-hidden z-50">

              <button
                onClick={() => {
                  setActivePage("settings");
                  setShowMenu(false);
                }}
                className="flex items-center gap-3 w-full px-5 py-4 hover:bg-gray-100 transition"
              >

                <Settings size={18} />

                Settings

              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-5 py-4 text-red-600 hover:bg-red-50 transition"
              >

                <LogOut size={18} />

                Logout

              </button>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Navbar;