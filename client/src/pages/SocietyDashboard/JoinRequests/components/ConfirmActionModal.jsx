import { X } from "lucide-react";

function ConfirmActionModal({
  open,
  setOpen,
  action,
  loading,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/60
        flex
        items-center
        justify-center
        z-50
        p-4
        sm:p-5
      "
    >
      <div
        className="
          w-full
          max-w-md
          bg-white
          rounded-2xl
          sm:rounded-3xl
          p-5
          sm:p-6
        "
      >

        {/* Header */}

        <div className="flex justify-between items-center gap-4">

          <h2 className="text-xl sm:text-2xl font-bold break-words">
            Confirm {action}
          </h2>

          <button
            onClick={() =>
              setOpen(false)
            }
            className="p-1 rounded-lg hover:bg-slate-100 transition shrink-0"
          >
            <X />
          </button>

        </div>

        {/* Message */}

        <p
          className="
            mt-5
            text-sm
            sm:text-base
            text-gray-600
            leading-6
            sm:leading-7
            break-words
          "
        >
          Are you sure you want to

          <span className="font-semibold">
            {" "}
            {action.toLowerCase()}
          </span>

          {" "}this join request?
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
              border
              rounded-xl
              py-3
              hover:bg-slate-100
              transition
            "
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className={`
              w-full
              sm:flex-1
              rounded-xl
              py-3
              text-white
              transition
              ${
                action === "Accept"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              }
            `}
          >
            {loading
              ? "Please wait..."
              : action}
          </button>

        </div>

      </div>
    </div>
  );
}

export default ConfirmActionModal;