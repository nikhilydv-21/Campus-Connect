import { LogOut } from "lucide-react";

function LogoutModal({
  open,
  setOpen,
  onLogout,
}) {

  if (!open) return null;

  return (

    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl w-[420px] p-8 shadow-2xl">

        <div className="flex justify-center">

          <div className="bg-red-100 p-4 rounded-full">

            <LogOut
              className="text-red-600"
              size={34}
            />

          </div>

        </div>

        <h2 className="text-2xl font-bold text-center mt-5">

          Logout

        </h2>

        <p className="text-gray-500 text-center mt-3">

          Are you sure you want to logout?

        </p>

        <div className="flex gap-4 mt-8">

          <button
            onClick={() => setOpen(false)}
            className="flex-1 border rounded-xl py-3 hover:bg-gray-100"
          >

            Cancel

          </button>

          <button
            onClick={onLogout}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-xl py-3"
          >

            Logout

          </button>

        </div>

      </div>

    </div>

  );

}

export default LogoutModal;