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
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[60]">

      <div className="bg-white rounded-3xl w-full max-w-md p-8">

        <div className="flex justify-between items-center">

          <h2 className="text-2xl font-bold">
            Confirm Registration
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="hover:bg-gray-100 rounded-full p-2"
          >
            <X />
          </button>

        </div>

        <div className="flex justify-center mt-8">

          <div className="bg-blue-100 p-5 rounded-full">

            <CalendarCheck
              size={42}
              className="text-blue-600"
            />

          </div>

        </div>

        <h3 className="text-center text-xl font-bold mt-6">

          {event?.title}

        </h3>

        <p className="text-center text-gray-500 mt-4 leading-7">

          Are you sure you want to register
          for this event?

         
        </p>

        <div className="flex gap-4 mt-10">

          <button
            onClick={() => setOpen(false)}
            className="flex-1 border rounded-xl py-3 font-semibold hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-semibold"
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