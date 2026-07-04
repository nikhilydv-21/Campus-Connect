function ApproveConfirmModal({
  open,
  setOpen,
  onConfirm,
  loading,
  society,
}) {

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-3xl w-full max-w-md p-8">

        <h2 className="text-2xl font-bold text-center">
          Approve Society
        </h2>

        <p className="text-center text-gray-500 mt-4">
          Are you sure you want to approve
        </p>

        <p className="text-center font-semibold text-lg mt-2">
          {society.societyName} ?
        </p>

        <div className="flex gap-4 mt-8">

          <button
            onClick={() => setOpen(false)}
            className="flex-1 border rounded-xl py-3 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 transition"
          >
            {loading
              ? "Approving..."
              : "Approve"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default ApproveConfirmModal;