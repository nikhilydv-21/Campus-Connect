import { LogOut } from "lucide-react";

function LogoutModal({
  open,
  setOpen,
  onLogout,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">

      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8">

        {/* Icon */}

        <div className="flex justify-center">

          <div className="rounded-full bg-red-100 p-4">

            <LogOut
              size={34}
              className="text-red-600"
            />

          </div>

        </div>

        {/* Title */}

        <h2 className="mt-5 text-center text-xl font-bold sm:text-2xl">

          Logout

        </h2>

        {/* Message */}

        <p className="mt-3 text-center text-sm text-gray-500 sm:text-base">

          Are you sure you want to logout?

        </p>

        {/* Buttons */}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">

          {/* Logout - Mobile Top | Desktop Right */}

          <button
            onClick={onLogout}
            className="order-1 flex-1 rounded-xl bg-red-600 px-4 py-3 text-white transition hover:bg-red-700 sm:order-2"
          >

            Logout

          </button>

          {/* Cancel - Mobile Bottom | Desktop Left */}

          <button
            onClick={() => setOpen(false)}
            className="order-2 flex-1 rounded-xl border border-gray-300 px-4 py-3 transition hover:bg-gray-100 sm:order-1"
          >

            Cancel

          </button>

        </div>

      </div>

    </div>
  );
}

export default LogoutModal;