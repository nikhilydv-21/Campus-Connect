import { Trash2, X } from "lucide-react";

function DeleteModal({
  open,
  onClose,
  onDelete,
  loading = false,
  title = "Delete Event",
  message = "Are you sure you want to delete this event? This action cannot be undone.",
}) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="
        fixed
        inset-0
        bg-black/60
        flex
        items-center
        justify-center
        z-50
        p-4
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          bg-white
          rounded-3xl
          shadow-2xl
          w-full
          max-w-md
          overflow-hidden
        "
      >
        {/* Header */}

        <div className="flex justify-between items-center p-6 border-b">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <Trash2 className="text-red-600" size={24} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800">
                {title}
              </h2>
            </div>

          </div>

          <button
            onClick={onClose}
            className="
              p-2
              rounded-lg
              hover:bg-gray-100
            "
          >
            <X size={20} />
          </button>

        </div>

        {/* Body */}

        <div className="p-6">

          <p className="text-gray-600 leading-7">
            {message}
          </p>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-4 p-6 border-t">

          <button
            onClick={onClose}
            disabled={loading}
            className="
              px-6
              py-3
              rounded-xl
              border
              hover:bg-gray-100
              disabled:opacity-50
            "
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            disabled={loading}
            className="
              px-6
              py-3
              rounded-xl
              bg-red-600
              hover:bg-red-700
              text-white
              disabled:bg-gray-400
            "
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default DeleteModal;