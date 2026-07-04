import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LogoutModal from "./LogoutModal";

function Navbar({ setActivePage }) {

  const [showMenu, setShowMenu] =
    useState(false);

  const [logoutOpen, setLogoutOpen] =
    useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.clear();

    navigate("/");

  };

  return (

    <>

      <div className="bg-white shadow-sm h-20 px-8 flex items-center justify-between">

        {/* Left */}

        <div>

          <h1 className="text-2xl font-bold text-slate-800">
            Admin Portal
          </h1>

        </div>

        {/* Right */}

        <div className="relative">

          <button
            onClick={() =>
              setShowMenu(!showMenu)
            }
            className="flex items-center gap-3"
          >

            <img
              src="https://ui-avatars.com/api/?name=Admin&background=2563eb&color=fff"
              alt="Admin"
              className="w-11 h-11 rounded-full"
            />

            <div className="text-left">

              <h3 className="font-semibold">
                Administrator
              </h3>

              <p className="text-xs text-gray-500">
                System Admin
              </p>

            </div>

            <ChevronDown size={18} />

          </button>

          {showMenu && (

            <div className="absolute right-0 mt-3 bg-white rounded-xl shadow-xl border w-52 overflow-hidden z-50">

              <button
                onClick={() => {

                  setShowMenu(false);

                  setLogoutOpen(true);

                }}
                className="w-full text-left px-5 py-3 text-red-600 hover:bg-red-50 transition"
              >

                Logout

              </button>

            </div>

          )}

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

export default Navbar;