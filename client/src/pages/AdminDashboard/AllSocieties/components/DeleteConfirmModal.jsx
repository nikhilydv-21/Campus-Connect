import { TriangleAlert } from "lucide-react";

function DeleteConfirmModal({
  open,
  setOpen,
  society,
  loading,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl">

        {/* Icon */}

        <div className="flex justify-center">

          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">

            <TriangleAlert
              size={32}
              className="text-red-600"
            />

          </div>

        </div>

        {/* Title */}

        <h2 className="text-xl sm:text-2xl font-bold text-center mt-5">
          Delete Society
        </h2>

        {/* Description */}

        <p className="text-sm sm:text-base text-gray-500 text-center mt-4 leading-6">
          This action is permanent and cannot be undone.
        </p>

        {/* Society Name */}

        <p className="font-semibold text-center mt-3 text-slate-800 break-words">
          {society.societyName}
        </p>

        {/* Buttons */}

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8">

          <button
            onClick={() => setOpen(false)}
            className="border border-gray-300 rounded-xl py-3 px-4 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white rounded-xl py-3 px-4 transition disabled:opacity-70"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteConfirmModal;