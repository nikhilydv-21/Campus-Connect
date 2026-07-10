import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LogoutModal from "./LogoutModal";

function Navbar({ setActivePage }) {

    const [showMenu, setShowMenu] = useState(false);
    const [logoutOpen, setLogoutOpen] = useState(false);

    const navigate = useNavigate();

    const menuRef = useRef(null);

    // Open Logout Modal
    const openLogoutModal = () => {
        setShowMenu(false);
        setLogoutOpen(true);
    };

    // Confirm Logout
    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    // Close dropdown on outside click
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
                        Admin Portal
                    </h1>

                    <p className="text-sm text-gray-500">
                        Monitor and manage the Campus Connect platform
                    </p>

                </div>

                {/* Right */}

                <div
                    className="relative"
                    ref={menuRef}
                >

                    <button
                        onClick={() => setShowMenu(!showMenu)}
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
                                onClick={openLogoutModal}
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