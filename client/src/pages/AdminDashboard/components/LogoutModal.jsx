import { LogOut } from "lucide-react";

function LogoutModal({
  open,
  setOpen,
  onLogout,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">

      <div className="bg-white rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl">

        {/* Icon */}

        <div className="flex justify-center">
          <div className="bg-red-100 p-4 rounded-full">
            <LogOut
              className="text-red-600"
              size={34}
            />
          </div>
        </div>

        {/* Title */}

        <h2 className="text-xl sm:text-2xl font-bold text-center mt-5">
          Logout
        </h2>

        {/* Message */}

        <p className="text-gray-500 text-center mt-3 text-sm sm:text-base">
          Are you sure you want to logout?
        </p>

        {/* Buttons */}

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8">

          <button
            onClick={() => setOpen(false)}
            className="border rounded-xl py-3 px-4 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 text-white rounded-xl py-3 px-4 transition"
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}

export default LogoutModal;