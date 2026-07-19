import {
  ChevronDown,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";

import {
  useState,
  useRef,
  useEffect,
} from "react";

import { useNavigate } from "react-router-dom";
import LogoutModal from "../Settings/components/LogoutModal";

function Navbar({
  setActivePage,
  setSidebarOpen,
}) {

  const [showMenu, setShowMenu] =
    useState(false);

  const [logoutOpen, setLogoutOpen] =
    useState(false);

  const menuRef = useRef(null);

  const navigate = useNavigate();

  const student =
    JSON.parse(localStorage.getItem("student")) || {
      fullName: "Student",
      branch: "",
      profilePicture: "",
    };

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);

  const handleLogout = () => {

    setShowMenu(false);

    setLogoutOpen(true);

  };

  const confirmLogout = () => {

    localStorage.clear();

    navigate("/");

  };

  return (
    <>

      <div className="bg-white shadow-sm h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Left */}

        <div className="flex items-center gap-3">

          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition"
          >
            <Menu size={24} />
          </button>

          <div>

            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
              Student Portal
            </h1>

            <p className="hidden sm:block text-sm text-gray-500">
              Connect with societies and events
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-4 sm:gap-6">

          <div
            className="relative"
            ref={menuRef}
          >

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
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover"
              />

              <div className="hidden sm:block text-left">

                <h3 className="font-semibold break-words">
                  {student.fullName}
                </h3>

                <p className="text-xs text-gray-500 break-words">
                  {student.branch}
                </p>

              </div>

              <ChevronDown
                size={18}
                className="hidden sm:block"
              />

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

      <LogoutModal
        open={logoutOpen}
        setOpen={setLogoutOpen}
        onLogout={confirmLogout}
      />

    </>
  );

}

export default Navbar;