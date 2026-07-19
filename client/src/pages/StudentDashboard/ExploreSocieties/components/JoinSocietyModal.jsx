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
    <div
      className="
        fixed
        inset-0
        bg-black/60
        backdrop-blur-sm
        flex
        justify-center
        items-center
        z-[60]
        px-4
        py-4
      "
    >
      <div
        className="
          bg-white
          w-full
          max-w-lg
          rounded-2xl
          sm:rounded-3xl
          p-6
          sm:p-8
          shadow-2xl
        "
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 break-words">
          Join Society
        </h2>

        <p className="text-sm sm:text-base text-gray-500 mb-6 leading-7">
          Tell the society why you want to
          become a volunteer.
        </p>

        <textarea
          rows={6}
          value={reason}
          onChange={(e) =>
            setReason(e.target.value)
          }
          placeholder="Write your reason..."
          className="
            w-full
            border
            rounded-xl
            p-4
            text-sm
            sm:text-base
            resize-none
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 mt-8">

          <button
            onClick={() => setOpen(false)}
            className="
              w-full
              sm:w-auto
              px-6
              py-3
              rounded-xl
              border
              font-medium
              hover:bg-gray-50
              transition
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="
              w-full
              sm:w-auto
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-3
              rounded-xl
              font-medium
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
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