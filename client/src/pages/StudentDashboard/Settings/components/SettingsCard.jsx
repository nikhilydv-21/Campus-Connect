import { Lock, ChevronRight } from "lucide-react";

function SettingsCard({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-3xl shadow-md hover:shadow-xl transition p-7 flex items-center justify-between"
    >
      <div className="flex items-center gap-5">

        <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">

          <Lock
            className="text-blue-600"
            size={28}
          />

        </div>

        <div className="text-left">

          <h2 className="text-xl font-bold text-slate-800">
            Change Password
          </h2>

          <p className="text-gray-500 mt-1">
            Update your account password securely.
          </p>

        </div>

      </div>

      <ChevronRight
        className="text-gray-400"
        size={24}
      />

    </button>
  );
}

export default SettingsCard;