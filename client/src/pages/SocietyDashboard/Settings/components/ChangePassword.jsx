import { useState } from "react";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
} from "lucide-react";
import toast from "react-hot-toast";

import { changePassword } from "../../../../services/settingsServices";

function ChangePassword({ goBack }) {
  const [formData, setFormData] =
    useState({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  const [loading, setLoading] =
    useState(false);

  const [showOld, setShowOld] =
    useState(false);

  const [showNew, setShowNew] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+=-])[A-Za-z\d@$!%*?&#^()_+=-]{8,}$/;

  const passwordChecks = {
    length:
      formData.newPassword.length >= 8,
    uppercase: /[A-Z]/.test(
      formData.newPassword
    ),
    lowercase: /[a-z]/.test(
      formData.newPassword
    ),
    number: /\d/.test(
      formData.newPassword
    ),
    special:
      /[@$!%*?&#^()_+=-]/.test(
        formData.newPassword
      ),
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async () => {
      if (
        !formData.oldPassword ||
        !formData.newPassword ||
        !formData.confirmPassword
      ) {
        return toast.error(
          "All fields are required"
        );
      }

      if (
        formData.newPassword !==
        formData.confirmPassword
      ) {
        return toast.error(
          "Passwords do not match"
        );
      }

      if (
        !passwordRegex.test(
          formData.newPassword
        )
      ) {
        return toast.error(
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character."
        );
      }

      if (
        formData.oldPassword ===
        formData.newPassword
      ) {
        return toast.error(
          "New password cannot be same as old password"
        );
      }

      try {
        setLoading(true);

        const response =
          await changePassword(
            formData
          );

        toast.success(
          response.message
        );

        setFormData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });

        goBack();

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
            "Failed to change password"
        );

      } finally {

        setLoading(false);

      }
    };

  return (
    <div className="bg-slate-100 min-h-screen p-4 sm:p-6 lg:p-8">

      {/* Back Button */}

      <button
        onClick={goBack}
        className="flex items-center gap-2 text-blue-600 font-semibold mb-6 sm:mb-8 hover:text-blue-700 transition"
      >
        <ArrowLeft
          size={20}
          className="shrink-0"
        />
        Back
      </button>

      {/* Card */}

      <div className="max-w-2xl mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-6 lg:p-8">

        {/* Header */}

        <div className="flex items-center gap-3 mb-6 sm:mb-8">

          <div className="bg-blue-100 p-3 rounded-full shrink-0">
            <Lock
              className="text-blue-600"
              size={24}
            />
          </div>

          <div className="min-w-0">

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 break-words">
              Change Password
            </h2>

            <p className="mt-1 text-sm sm:text-base text-gray-500 break-words">
              Update your account password securely.
            </p>

          </div>

        </div>

        <div className="space-y-5 sm:space-y-6">

          {/* Current Password */}

          <div>

            <label className="block mb-2 font-semibold text-sm sm:text-base">
              Current Password
            </label>

            <div className="relative">

              <input
                type={
                  showOld
                    ? "text"
                    : "password"
                }
                name="oldPassword"
                value={
                  formData.oldPassword
                }
                onChange={handleChange}
                placeholder="Enter current password"
                className="w-full border rounded-xl px-4 py-3 pr-12 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowOld(
                    !showOld
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showOld ? (
                  <Eye size={20} />
                ) : (
                  <EyeOff
                    size={20}
                  />
                )}
              </button>

            </div>

          </div>

          {/* New Password */}

          <div>

            <label className="block mb-2 font-semibold text-sm sm:text-base">
              New Password
            </label>

            <div className="relative">

              <input
                type={
                  showNew
                    ? "text"
                    : "password"
                }
                name="newPassword"
                value={
                  formData.newPassword
                }
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full border rounded-xl px-4 py-3 pr-12 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowNew(
                    !showNew
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showNew ? (
                  <Eye size={20} />
                ) : (
                  <EyeOff
                    size={20}
                  />
                )}
              </button>

            </div>

            {formData.newPassword && (
              <div className="mt-3 space-y-1 text-xs sm:text-sm">

                <p className={passwordChecks.length ? "text-green-600" : "text-red-500"}>
                  {passwordChecks.length ? "✅" : "❌"} Minimum 8 characters
                </p>

                <p className={passwordChecks.uppercase ? "text-green-600" : "text-red-500"}>
                  {passwordChecks.uppercase ? "✅" : "❌"} One uppercase letter
                </p>

                <p className={passwordChecks.lowercase ? "text-green-600" : "text-red-500"}>
                  {passwordChecks.lowercase ? "✅" : "❌"} One lowercase letter
                </p>

                <p className={passwordChecks.number ? "text-green-600" : "text-red-500"}>
                  {passwordChecks.number ? "✅" : "❌"} One number
                </p>

                <p className={passwordChecks.special ? "text-green-600" : "text-red-500"}>
                  {passwordChecks.special ? "✅" : "❌"} One special character
                </p>

              </div>
            )}

          </div>

          {/* Confirm Password */}

          <div>

            <label className="block mb-2 font-semibold text-sm sm:text-base">
              Confirm Password
            </label>

            <div className="relative">

              <input
                type={
                  showConfirm
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                value={
                  formData.confirmPassword
                }
                onChange={handleChange}
                placeholder="Confirm new password"
                className="w-full border rounded-xl px-4 py-3 pr-12 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirm(
                    !showConfirm
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirm ? (
                  <Eye size={20} />
                ) : (
                  <EyeOff
                    size={20}
                  />
                )}
              </button>

            </div>

            {formData.confirmPassword && (
              <p
                className={`mt-2 text-xs sm:text-sm ${
                  formData.newPassword ===
                  formData.confirmPassword
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {formData.newPassword ===
                formData.confirmPassword
                  ? "✅ Passwords match"
                  : "❌ Passwords do not match"}
              </p>
            )}

          </div>

          {/* Button */}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-xl font-semibold transition"
          >
            {loading
              ? "Updating Password..."
              : "Change Password"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default ChangePassword;