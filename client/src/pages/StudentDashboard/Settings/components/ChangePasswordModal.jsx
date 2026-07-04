import { useState } from "react";
import toast from "react-hot-toast";
import { X } from "lucide-react";

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
            onClick={() =>
              setOpen(false)
            }
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X size={22} />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >

          <div>

            <label className="block mb-2 font-medium">
              Current Password
            </label>

            <input
              type="password"
              name="oldPassword"
              value={
                formData.oldPassword
              }
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              New Password
            </label>

            <input
              type="password"
              name="newPassword"
              value={
                formData.newPassword
              }
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={
                formData.confirmPassword
              }
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

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
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-semibold transition"
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