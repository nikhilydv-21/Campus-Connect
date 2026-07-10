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
        bg-black/50
        backdrop-blur-sm
        flex
        justify-center
        items-center
        z-[60]
      "
    >

      <div
        className="
          bg-white
          w-full
          max-w-md
          rounded-3xl
          shadow-2xl
          p-8
        "
      >

        <div className="flex justify-center">

          <div
            className="
              h-16
              w-16
              rounded-full
              bg-red-100
              flex
              items-center
              justify-center
            "
          >

            <AlertTriangle
              size={32}
              className="text-red-600"
            />

          </div>

        </div>

        <h2
          className="
            text-2xl
            font-bold
            text-center
            mt-6
          "
        >

          Remove Member

        </h2>

        <p
          className="
            text-center
            text-slate-600
            mt-4
            leading-7
          "
        >

          Are you sure you want to remove

          <br />

          <span className="font-bold">

            {member.student?.fullName}

          </span>

          <br />

          from your society?

        </p>

        <div className="flex gap-3 mt-8">

          <button
            onClick={() => setOpen(false)}
            className="
              flex-1
              py-3
              rounded-xl
              border
              hover:bg-slate-100
            "
          >

            Cancel

          </button>

          <button
            onClick={handleRemove}
            disabled={loading}
            className="
              flex-1
              py-3
              rounded-xl
              bg-red-600
              hover:bg-red-700
              text-white
              font-semibold
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