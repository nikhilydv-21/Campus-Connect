import { LogOut } from "lucide-react";

function LogoutModal({
  open,
  setOpen,
  onLogout,
}) {

  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/60
        backdrop-blur-sm
        flex
        items-center
        justify-center
        z-50
        px-4
        py-4
      "
    >

      <div
        className="
          bg-white
          w-full
          max-w-md
          rounded-2xl
          sm:rounded-3xl
          p-6
          sm:p-8
          shadow-2xl
        "
      >

        <div className="flex justify-center">

          <div
            className="
              w-16
              h-16
              sm:w-20
              sm:h-20
              rounded-full
              bg-red-100
              flex
              items-center
              justify-center
            "
          >

            <LogOut
              size={32}
              className="text-red-600"
            />

          </div>

        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-center mt-5">
          Logout
        </h2>

        <p className="mt-3 text-sm sm:text-base text-center text-gray-500 leading-7">
          Are you sure you want to logout?
        </p>

        <div
          className="
            mt-8
            flex
            flex-col-reverse
            sm:flex-row
            gap-3
            sm:gap-4
          "
        >

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