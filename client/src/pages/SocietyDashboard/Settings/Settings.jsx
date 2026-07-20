import { useState } from "react";
import { Lock, ChevronRight } from "lucide-react";

import ChangePassword from "./components/ChangePassword";

function Settings() {
  const [activeOption, setActiveOption] =
    useState("");

  if (activeOption === "change-password") {
    return (
      <ChangePassword
        goBack={() => setActiveOption("")}
      />
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen p-4 sm:p-6 lg:p-8">

      {/* Heading */}

      <div className="mb-6 sm:mb-8">

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
          Settings
        </h1>

        <p className="mt-2 text-sm sm:text-base text-gray-500">
          Manage your account settings.
        </p>

      </div>

      <div className="max-w-2xl">

        <button
          onClick={() =>
            setActiveOption("change-password")
          }
          className="
            w-full
            bg-white
            rounded-2xl
            sm:rounded-3xl
            shadow-lg
            p-5
            sm:p-6
            flex
            items-center
            justify-between
            gap-4
            hover:shadow-xl
            transition
          "
        >

          <div className="flex items-center gap-4 min-w-0">

            <div className="bg-blue-100 p-3 sm:p-4 rounded-full shrink-0">

              <Lock
                className="text-blue-600"
                size={24}
              />

            </div>

            <div className="text-left min-w-0">

              <h2 className="text-lg sm:text-xl font-semibold break-words">
                Change Password
              </h2>

              <p className="text-sm sm:text-base text-gray-500 break-words">
                Update your account password
              </p>

            </div>

          </div>

          <ChevronRight
            className="shrink-0"
            size={22}
          />

        </button>

      </div>

    </div>
  );
}

export default Settings;