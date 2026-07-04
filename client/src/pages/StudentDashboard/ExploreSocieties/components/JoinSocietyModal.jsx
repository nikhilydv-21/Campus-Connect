import { useState } from "react";
import toast from "react-hot-toast";

import {
  joinSociety,
} from "../../../../services/studentServices";

function JoinSocietyModal({
  open,
  setOpen,
  societyId,
  onSuccess,
}) {
  const [reason, setReason] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  if (!open) return null;

  const handleSubmit = async () => {
    if (!reason.trim()) {
      return toast.error(
        "Please enter a reason"
      );
    }

    try {
      setLoading(true);

      const response =
        await joinSociety(
          societyId,
          reason
        );

      toast.success(response.message);

      setReason("");

      setOpen(false);

      if (onSuccess) {
        onSuccess();
      }

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to send request"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-[60]">

      <div className="bg-white rounded-3xl p-8 w-[550px]">

        <h2 className="text-3xl font-bold mb-3">
          Join Society
        </h2>

        <p className="text-gray-500 mb-6">
          Tell the society why you want to
          become a volunteer.
        </p>

        <textarea
          rows="6"
          value={reason}
          onChange={(e) =>
            setReason(e.target.value)
          }
          className="w-full border rounded-xl p-4 resize-none outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your reason..."
        />

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={() => setOpen(false)}
            className="px-6 py-3 rounded-xl border"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
          >
            {loading
              ? "Sending..."
              : "Send Request"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default JoinSocietyModal;