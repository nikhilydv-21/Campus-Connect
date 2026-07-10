import {
  ChevronDown,
} from "lucide-react";

import {
  useState,
  useRef,
  useEffect,
} from "react";

import { useNavigate } from "react-router-dom";

import LogoutModal from "../Settings/components/LogoutModal";

function Navbar({ setActivePage }) {

  const [showMenu, setShowMenu] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const navigate = useNavigate();

  const menuRef = useRef(null);

  const society =
    JSON.parse(localStorage.getItem("society")) || {
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

  // Close dropdown when clicked outside

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

  return (

    <>

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

        

          {/* Profile */}

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

      <LogoutModal
        open={logoutOpen}
        setOpen={setLogoutOpen}
        onLogout={confirmLogout}
      />

    </>

  );

}

export default Navbar;