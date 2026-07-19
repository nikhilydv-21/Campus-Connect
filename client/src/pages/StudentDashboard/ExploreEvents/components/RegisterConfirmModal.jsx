import { X, CalendarCheck } from "lucide-react";

function RegisterConfirmModal({
  open,
  setOpen,
  loading,
  onConfirm,
  event,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[60] px-4 py-4">

      <div className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-md p-6 sm:p-8">

        {/* Header */}

        <div className="flex justify-between items-center gap-3">

          <h2 className="text-xl sm:text-2xl font-bold break-words">
            Confirm Registration
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="hover:bg-gray-100 rounded-full p-2 shrink-0 transition"
          >
            <X size={22} />
          </button>

        </div>

        {/* Icon */}

        <div className="flex justify-center mt-6 sm:mt-8">

          <div className="bg-blue-100 p-4 sm:p-5 rounded-full">

            <CalendarCheck
              size={36}
              className="sm:w-[42px] sm:h-[42px] text-blue-600"
            />

          </div>

        </div>

        {/* Title */}

        <h3 className="text-center text-lg sm:text-xl font-bold mt-5 sm:mt-6 break-words">

          {event?.title}

        </h3>

        {/* Message */}

        <p className="text-center text-sm sm:text-base text-gray-500 mt-4 leading-7">

          Are you sure you want to register for this event?

        </p>

        {/* Buttons */}

        <div className="flex flex-col sm:flex-row gap-4 mt-8 sm:mt-10">

          <button
            onClick={() => setOpen(false)}
            className="w-full sm:flex-1 border rounded-xl py-3 font-semibold hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-semibold transition"
          >
            {loading
              ? "Registering..."
              : "Confirm"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default RegisterConfirmModal;