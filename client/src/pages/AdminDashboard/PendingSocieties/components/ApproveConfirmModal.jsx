function ApproveConfirmModal({
  open,
  setOpen,
  onConfirm,
  loading,
  society,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl">

        <h2 className="text-xl sm:text-2xl font-bold text-center text-green-600">
          Approve Society
        </h2>

        <p className="text-sm sm:text-base text-center text-gray-500 mt-4">
          Are you sure you want to approve
        </p>

        <p className="text-center font-semibold text-slate-800 mt-3 break-words">
          {society.societyName} ?
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">

          <button
            onClick={onConfirm}
            disabled={loading}
            className="order-1 sm:order-2 w-full sm:w-40 bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 transition disabled:opacity-70"
          >
            {loading ? "Approving..." : "Approve"}
          </button>

          <button
            onClick={() => setOpen(false)}
            className="order-2 sm:order-1 w-full sm:w-40 border border-gray-300 rounded-xl py-3 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

        </div>
      </div>

    </div>
  );
}

export default ApproveConfirmModal;