import {
  ChevronDown,
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

  const navigate = useNavigate();

  const menuRef = useRef(null);

  const society =
    JSON.parse(
      localStorage.getItem("society")
    ) || {
      societyName: "Society",
      societyType: "Society",
      logo: "",
    };

  const handleLogout = () => {
    setShowMenu(false);
    setLogoutOpen(true);
  };

  const confirmLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (
      event
    ) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target
        )
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

  return (
    <>
      <div className="bg-white shadow-sm h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Left */}

        <div className="flex items-center gap-3">

          <button
            onClick={() =>
              setSidebarOpen(true)
            }
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Menu size={24} />
          </button>

          <div>

            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
              Society Portal
            </h1>

            <p className="hidden sm:block text-sm text-gray-500">
              Manage your society
              activities
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
                setShowMenu(
                  !showMenu
                )
              }
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
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover shrink-0"
              />

              <div className="hidden sm:block text-left">

                <h3 className="font-semibold break-words">
                  {
                    society.societyName
                  }
                </h3>

                <p className="text-xs text-gray-500">
                  {society.societyType ||
                    "Society"}
                </p>

              </div>

              <ChevronDown
                size={18}
              />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-3 bg-white rounded-xl shadow-xl border w-52 overflow-hidden z-50">

                <button
                  onClick={() => {
                    setActivePage(
                      "settings"
                    );
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-5 py-3 hover:bg-gray-100 transition"
                >
                  Settings
                </button>

                <button
                  onClick={
                    handleLogout
                  }
                  className="w-full text-left px-5 py-3 text-red-600 hover:bg-red-50 transition"
                >
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