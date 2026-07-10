import { LogOut } from "lucide-react";

function LogoutModal({
  open,
  setOpen,
  onLogout,
}) {

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl">

        <div className="flex justify-center">

          <div className="bg-red-100 p-4 rounded-full">

            <LogOut
              size={36}
              className="text-red-600"
            />

          </div>

        </div>

        <h2 className="text-2xl font-bold text-center mt-5">
          Logout
        </h2>

        <p className="text-center text-gray-500 mt-3">
          Are you sure you want to logout?
        </p>

        <div className="flex gap-4 mt-8">

          <button
            onClick={() => setOpen(false)}
            className="flex-1 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition font-medium"
          >
            Cancel
          </button>

          <button
            onClick={onLogout}
            className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white transition font-medium"
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}

export default LogoutModal;