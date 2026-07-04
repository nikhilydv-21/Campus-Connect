import {
  Bell,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ setActivePage }) {
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();

  const society =
    JSON.parse(localStorage.getItem("society")) || {
      societyName: "Society",
      societyType: "Society",
      logo: "",
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
          Society Portal
        </h1>

        <p className="text-sm text-gray-500">
          Manage your society activities
        </p>

      </div>

      {/* Right */}

      <div className="flex items-center gap-6">

        {/* Notification */}

        <button className="relative hover:scale-110 transition">

          <Bell
            size={24}
            className="text-gray-700"
          />

          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] h-5 w-5 rounded-full flex items-center justify-center">
            3
          </span>

        </button>

        {/* Profile */}

        <div className="relative">

          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-3"
          >

            <img
              src={
                society.logo
                  ? society.logo
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      society.societyName
                    )}&background=2563eb&color=fff`
              }
              alt="Society Logo"
              className="w-11 h-11 rounded-full object-cover"
            />

            <div className="text-left">

              <h3 className="font-semibold">
                {society.societyName}
              </h3>

              <p className="text-xs text-gray-500">
                {society.societyType || "Society"}
              </p>

            </div>

            <ChevronDown size={18} />

          </button>

          {showMenu && (

            <div className="absolute right-0 mt-3 bg-white rounded-xl shadow-xl border w-52 overflow-hidden z-50">

              <button
                onClick={() => {
                  setActivePage("settings");
                  setShowMenu(false);
                }}
                className="w-full text-left px-5 py-3 hover:bg-gray-100 transition"
              >
                Settings
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left px-5 py-3 text-red-600 hover:bg-red-50 transition"
              >
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