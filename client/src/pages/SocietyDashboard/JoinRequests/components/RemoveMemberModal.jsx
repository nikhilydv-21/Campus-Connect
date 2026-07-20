import { useState } from "react";
import toast from "react-hot-toast";
import {
  AlertTriangle,
} from "lucide-react";

import {
  removeMember,
} from "../../../../services/authServices";

function RemoveMemberModal({
  open,
  setOpen,
  member,
  refreshMembers,
}) {
  const [loading, setLoading] =
    useState(false);

  if (!open || !member) return null;

  const handleRemove = async () => {
    try {
      setLoading(true);

      const response =
        await removeMember(
          member._id
        );

      toast.success(
        response.message
      );

      setOpen(false);

      refreshMembers();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to remove member"
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
        z-[60]
        bg-black/50
        backdrop-blur-sm
        flex
        justify-center
        items-center
        p-4
      "
    >

      <div
        className="
          w-full
          max-w-md
          bg-white
          rounded-2xl
          sm:rounded-3xl
          shadow-2xl
          p-5
          sm:p-8
        "
      >

        {/* Icon */}

        <div className="flex justify-center">

          <div
            className="
              w-14
              h-14
              sm:w-16
              sm:h-16
              rounded-full
              bg-red-100
              flex
              items-center
              justify-center
            "
          >

            <AlertTriangle
              size={30}
              className="text-red-600 sm:w-8 sm:h-8"
            />

          </div>

        </div>

        {/* Title */}

        <h2
          className="
            mt-5
            sm:mt-6
            text-xl
            sm:text-2xl
            font-bold
            text-center
          "
        >
          Remove Member
        </h2>

        {/* Message */}

        <p
          className="
            mt-4
            text-sm
            sm:text-base
            text-center
            text-slate-600
            leading-6
            sm:leading-7
            break-words
          "
        >
          Are you sure you want to remove

          <br />

          <span className="font-bold break-words">
            {member.student?.fullName}
          </span>

          <br />

          from your society?
        </p>

        {/* Buttons */}

        <div className="mt-6 sm:mt-8 flex flex-col-reverse sm:flex-row gap-3">

          <button
            onClick={() =>
              setOpen(false)
            }
            className="
              w-full
              sm:flex-1
              py-3
              rounded-xl
              border
              hover:bg-slate-100
              transition
            "
          >
            Cancel
          </button>

          <button
            onClick={handleRemove}
            disabled={loading}
            className="
              w-full
              sm:flex-1
              py-3
              rounded-xl
              bg-red-600
              hover:bg-red-700
              text-white
              font-semibold
              transition
            "
          >
            {loading
              ? "Removing..."
              : "Remove"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default RemoveMemberModal;