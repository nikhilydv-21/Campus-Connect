function DisableConfirmModal({
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

        <h2 className="text-xl sm:text-2xl font-bold text-center text-slate-800">

          {society.isDisabled
            ? "Enable Society"
            : "Disable Society"}

        </h2>

        <p className="text-sm sm:text-base text-gray-500 text-center mt-4 leading-6">

          {society.isDisabled
            ? "This society will be able to login again."
            : "This society won't be able to login until enabled."}

        </p>

        <p className="font-semibold text-center mt-3 text-slate-800 break-words">

          {society.societyName}

        </p>

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
            className={`rounded-xl py-3 px-4 text-white transition ${
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

        </div>

      </div>

    </div>
  );
}

export default DisableConfirmModal;