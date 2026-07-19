import { Lock, ChevronRight } from "lucide-react";

function SettingsCard({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        w-full
        bg-white
        rounded-2xl
        sm:rounded-3xl
        shadow-md
        hover:shadow-xl
        transition
        p-5
        sm:p-7
        flex
        items-center
        justify-between
        gap-4
      "
    >
      <div className="flex items-center gap-4 sm:gap-5 flex-1 min-w-0">

        <div
          className="
            w-12
            h-12
            sm:w-14
            sm:h-14
            rounded-2xl
            bg-blue-100
            flex
            items-center
            justify-center
            shrink-0
          "
        >
          <Lock
            className="text-blue-600"
            size={24}
          />
        </div>

        <div className="text-left min-w-0">

          <h2 className="text-lg sm:text-xl font-bold text-slate-800 break-words">
            Change Password
          </h2>

          <p className="mt-1 text-sm sm:text-base text-gray-500 break-words">
            Update your account password securely.
          </p>

        </div>

      </div>

      <ChevronRight
        className="text-gray-400 shrink-0"
        size={22}
      />

    </button>
  );
}

export default SettingsCard;