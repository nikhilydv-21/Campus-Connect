import { LogOut } from "lucide-react";

function LogoutModal({
  open,
  setOpen,
  onLogout,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4 py-4">

      <div className="w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8">

        {/* Icon */}

        <div className="flex justify-center">

          <div className="bg-red-100 p-3 sm:p-4 rounded-full">

            <LogOut
              size={36}
              className="text-red-600"
            />

          </div>

        </div>

        {/* Heading */}

        <h2 className="mt-5 text-xl sm:text-2xl font-bold text-center">
          Logout
        </h2>

        {/* Description */}

        <p className="mt-3 text-sm sm:text-base text-center text-gray-500">
          Are you sure you want to logout?
        </p>

        {/* Buttons */}

        <div className="mt-8 flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">

          <button
            onClick={() => setOpen(false)}
            className="
              w-full
              sm:flex-1
              py-3
              rounded-xl
              border
              border-gray-300
              hover:bg-gray-100
              transition
              font-medium
            "
          >
            Cancel
          </button>

          <button
            onClick={onLogout}
            className="
              w-full
              sm:flex-1
              py-3
              rounded-xl
              bg-red-600
              hover:bg-red-700
              text-white
              transition
              font-medium
            "
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}

export default LogoutModal;