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
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-5">

      <div className="bg-white rounded-3xl w-full max-w-md p-8">

        <div className="flex justify-center">

          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">

            <TriangleAlert
              size={32}
              className="text-red-600"
            />

          </div>

        </div>

        <h2 className="text-2xl font-bold text-center mt-5">

          Delete Society

        </h2>

        <p className="text-gray-500 text-center mt-4">

          This action is permanent and cannot be undone.

        </p>

        <p className="font-semibold text-center mt-2">

          {society.societyName}

        </p>

        <div className="flex gap-4 mt-8">

          <button
            onClick={() => setOpen(false)}
            className="flex-1 border border-gray-300 rounded-xl py-3 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-xl py-3 transition"
          >
            {loading
              ? "Deleting..."
              : "Delete"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteConfirmModal;