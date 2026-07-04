function DisableConfirmModal({
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

        <h2 className="text-2xl font-bold text-center text-slate-800">

          {society.isDisabled
            ? "Enable Society"
            : "Disable Society"}

        </h2>

        <p className="text-gray-500 text-center mt-4">

          {society.isDisabled
            ? "This society will be able to login again."
            : "This society won't be able to login until enabled."}

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
            className={`flex-1 rounded-xl py-3 text-white transition ${
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