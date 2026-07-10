import { useState } from "react";
import toast from "react-hot-toast";
import {
  X,
  Eye,
  EyeOff,
} from "lucide-react";

import { changePassword } from "../../../../services/studentServices";

function ChangePasswordModal({
  open,
  setOpen,
}) {

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

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
    uppercase:
      /[A-Z]/.test(formData.newPassword),
    lowercase:
      /[a-z]/.test(formData.newPassword),
    number:
      /\d/.test(formData.newPassword),
    special:
      /[@$!%*?&#^()_+=-]/.test(
        formData.newPassword
      ),
  };

  if (!open) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !formData.oldPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      return toast.error(
        "Please fill all fields"
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
        await changePassword(formData);

      toast.success(response.message);

      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setOpen(false);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to change password"
      );

    } finally {

      setLoading(false);

    }

  };
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">

      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}

        <div className="flex justify-between items-center p-6 border-b">

          <h2 className="text-2xl font-bold">
            Change Password
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X size={22} />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >

          {/* Current Password */}

          <div>

            <label className="block mb-2 font-medium">
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
                value={formData.oldPassword}
                onChange={handleChange}
                placeholder="Enter current password"
                className="w-full border rounded-xl px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowOld(!showOld)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showOld ? (
                  <Eye size={20} />
                ) : (
                  <EyeOff size={20} />
                )}
              </button>

            </div>

          </div>

          {/* New Password */}

          <div>

            <label className="block mb-2 font-medium">
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
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full border rounded-xl px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowNew(!showNew)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showNew ? (
                  <Eye size={20} />
                ) : (
                  <EyeOff size={20} />
                )}
              </button>

            </div>

            {formData.newPassword && (

              <div className="mt-3 space-y-1 text-sm">

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

            <label className="block mb-2 font-medium">
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
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="w-full border rounded-xl px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
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
                  <EyeOff size={20} />
                )}
              </button>

            </div>

            {formData.confirmPassword && (

              <p
                className={`mt-2 text-sm ${formData.newPassword ===
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

          {/* Buttons */}

          <div className="flex gap-4 pt-2">

            <button
              type="button"
              onClick={() =>
                setOpen(false)
              }
              className="flex-1 border border-gray-300 rounded-xl py-3 font-semibold hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl py-3 font-semibold transition"
            >
              {loading
                ? "Changing..."
                : "Change Password"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}
export default ChangePasswordModal;