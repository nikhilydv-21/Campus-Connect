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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">

      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8">

        {/* Icon */}

        <div className="flex justify-center">

          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">

            <TriangleAlert
              size={32}
              className="text-red-600"
            />

          </div>

        </div>

        {/* Title */}

        <h2 className="mt-5 text-center text-xl font-bold sm:text-2xl">

          Delete Society

        </h2>

        {/* Description */}

        <p className="mt-4 text-center text-sm leading-6 text-gray-500 sm:text-base">

          This action is permanent and cannot be undone.

        </p>

        {/* Society Name */}

        <p className="mt-3 break-words text-center font-semibold text-slate-800">

          {society.societyName}

        </p>

        {/* Buttons */}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">

          {/* Delete - Mobile Top | Desktop Right */}

          <button
            onClick={onConfirm}
            disabled={loading}
            className="order-1 flex-1 rounded-xl bg-red-600 px-4 py-3 text-white transition hover:bg-red-700 disabled:opacity-70 sm:order-2"
          >

            {loading ? "Deleting..." : "Delete"}

          </button>

          {/* Cancel - Mobile Bottom | Desktop Left */}

          <button
            onClick={() => setOpen(false)}
            className="order-2 flex-1 rounded-xl border border-gray-300 px-4 py-3 transition hover:bg-gray-100 sm:order-1"
          >

            Cancel

          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteConfirmModal;