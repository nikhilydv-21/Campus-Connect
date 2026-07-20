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
        z-50
        bg-black/60
        flex
        items-center
        justify-center
        p-4
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full
          max-w-md
          bg-white
          rounded-2xl
          sm:rounded-3xl
          shadow-2xl
          overflow-hidden
        "
      >
        {/* Header */}

        <div className="flex items-center justify-between p-5 sm:p-6 border-b">

          <div className="flex items-center gap-3 min-w-0">

            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">

              <Trash2
                className="text-red-600"
                size={22}
              />

            </div>

            <div className="min-w-0">

              <h2 className="text-lg sm:text-xl font-bold text-slate-800 break-words">
                {title}
              </h2>

            </div>

          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition shrink-0"
          >
            <X size={20} />
          </button>

        </div>

        {/* Body */}

        <div className="p-5 sm:p-6">

          <p className="text-sm sm:text-base text-gray-600 leading-6 sm:leading-7 break-words">
            {message}
          </p>

        </div>

        {/* Footer */}

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 p-5 sm:p-6 border-t">

          <button
            onClick={onClose}
            disabled={loading}
            className="
              w-full
              sm:w-auto
              px-6
              py-3
              rounded-xl
              border
              hover:bg-gray-100
              disabled:opacity-50
              transition
            "
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            disabled={loading}
            className="
              w-full
              sm:w-auto
              px-6
              py-3
              rounded-xl
              bg-red-600
              hover:bg-red-700
              text-white
              disabled:bg-gray-400
              transition
            "
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

export default DeleteModal;