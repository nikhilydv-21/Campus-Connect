function DisableConfirmModal({
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

        {/* Title */}

        <h2 className="text-center text-xl font-bold text-slate-800 sm:text-2xl">

          {society.isDisabled
            ? "Enable Society"
            : "Disable Society"}

        </h2>

        {/* Description */}

        <p className="mt-4 text-center text-sm leading-6 text-gray-500 sm:text-base">

          {society.isDisabled
            ? "This society will be able to login again."
            : "This society won't be able to login until enabled."}

        </p>

        {/* Society Name */}

        <p className="mt-3 break-words text-center font-semibold text-slate-800">

          {society.societyName}

        </p>

        {/* Buttons */}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">

          {/* Enable / Disable - Mobile Top | Desktop Right */}

          <button
            onClick={onConfirm}
            disabled={loading}
            className={`order-1 flex-1 rounded-xl px-4 py-3 text-white transition disabled:opacity-70 sm:order-2 ${
              society.isDisabled
                ? "bg-green-600 hover:bg-green-700"
                : "bg-yellow-500 hover:bg-yellow-600"
            }`}
          >

            {loading
              ? "Please Wait..."
              : society.isDisabled
              ? "Enable"
              : "Disable"}

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

export default DisableConfirmModal;