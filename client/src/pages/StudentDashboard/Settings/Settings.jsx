import { useState } from "react";

import SettingsCard from "./components/SettingsCard";
import ChangePasswordModal from "./components/ChangePasswordModal";

function Settings() {

  const [openPasswordModal, setOpenPasswordModal] =
    useState(false);

  return (
    <div className="bg-slate-100 min-h-screen p-8">

      {/* Heading */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-800">
          Settings
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your account settings.
        </p>

      </div>

      {/* Settings Cards */}

      <div className="max-w-3xl">

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