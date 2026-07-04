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
    <div className="bg-slate-100 min-h-screen p-8">

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-800">
          Settings
        </h1>

        <p className="text-gray-500 mt-2">
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
            rounded-3xl
            shadow-lg
            p-6
            flex
            justify-between
            items-center
            hover:shadow-xl
            transition
          "
        >

          <div className="flex items-center gap-4">

            <div className="bg-blue-100 p-4 rounded-full">

              <Lock
                className="text-blue-600"
                size={24}
              />

            </div>

            <div className="text-left">

              <h2 className="text-xl font-semibold">
                Change Password
              </h2>

              <p className="text-gray-500">
                Update your account password
              </p>

            </div>

          </div>

          <ChevronRight />

        </button>

      </div>

    </div>
  );
}

export default Settings;