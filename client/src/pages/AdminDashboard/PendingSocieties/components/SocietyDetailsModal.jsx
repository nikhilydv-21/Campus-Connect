function SocietyDetailsModal({
  open,
  setOpen,
  society,
}) {
  if (!open || !society) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4 py-4">

      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl">

        {/* Header */}

        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-5 p-5 sm:p-8 border-b">

          <img
            src={
              society.logo
                ? society.logo
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    society.societyName
                  )}&background=2563eb&color=fff`
            }
            alt={society.societyName}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover"
          />

          <div className="text-center sm:text-left flex-1">

            <h2 className="text-2xl sm:text-3xl font-bold break-words">
              {society.societyName}
            </h2>

            <p className="text-blue-600 font-semibold mt-2 break-words">
              {society.societyType}
            </p>

          </div>

        </div>

        {/* Body */}

        <div className="p-5 sm:p-8 space-y-5">

          <div>

            <h3 className="font-semibold">
              Faculty Coordinator
            </h3>

            <p className="text-gray-600 break-words">
              {society.facultyCoordinator || "-"}
            </p>

          </div>

          <div>

            <h3 className="font-semibold">
              Email
            </h3>

            <p className="text-gray-600 break-all">
              {society.email || "-"}
            </p>

          </div>

          <div>

            <h3 className="font-semibold">
              Vision
            </h3>

            <p className="text-gray-600 break-words whitespace-pre-wrap">
              {society.vision || "-"}
            </p>

          </div>

          <div>

            <h3 className="font-semibold">
              Mission
            </h3>

            <p className="text-gray-600 break-words whitespace-pre-wrap">
              {society.mission || "-"}
            </p>

          </div>

          <div>

            <h3 className="font-semibold">
              Description
            </h3>

            <p className="text-gray-600 break-words whitespace-pre-wrap">
              {society.description || "-"}
            </p>

          </div>

          <div className="pt-4">

            <button
              onClick={() => setOpen(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Close
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default SocietyDetailsModal;