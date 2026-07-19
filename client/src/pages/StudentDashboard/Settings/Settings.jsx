import { useState } from "react";

import SettingsCard from "./components/SettingsCard";
import ChangePasswordModal from "./components/ChangePasswordModal";

function Settings() {

  const [openPasswordModal, setOpenPasswordModal] =
    useState(false);

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

      {/* Settings Cards */}

      <div className="w-full max-w-3xl">

        <SettingsCard
          onClick={() =>
            setOpenPasswordModal(true)
          }
        />

      </div>

      {/* Change Password Modal */}

      <ChangePasswordModal
        open={openPasswordModal}
        setOpen={setOpenPasswordModal}
      />

    </div>
  );
}

export default Settings;