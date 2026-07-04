function SocietyDetailsModal({
  open,
  setOpen,
  society,
}) {

  if (!open || !society) return null;

  return (

    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-5">

      <div className="bg-white rounded-3xl w-full max-w-3xl overflow-hidden">

        {/* Header */}

        <div className="flex items-center gap-5 p-8 border-b">

          <img
            src={
              society.logo
                ? society.logo
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    society.societyName
                  )}&background=2563eb&color=fff`
            }
            alt={society.societyName}
            className="w-24 h-24 rounded-2xl object-cover"
          />

          <div>

            <h2 className="text-3xl font-bold">
              {society.societyName}
            </h2>

            <p className="text-blue-600 font-semibold mt-2">
              {society.societyType}
            </p>

          </div>

        </div>

        {/* Body */}

        <div className="p-8 space-y-5">

          <div>

            <h3 className="font-semibold">
              Faculty Coordinator
            </h3>

            <p className="text-gray-600">
              {society.facultyCoordinator}
            </p>

          </div>

          <div>

            <h3 className="font-semibold">
              Email
            </h3>

            <p className="text-gray-600">
              {society.email}
            </p>

          </div>

          <div>

            <h3 className="font-semibold">
              Vision
            </h3>

            <p className="text-gray-600">
              {society.vision || "-"}
            </p>

          </div>

          <div>

            <h3 className="font-semibold">
              Mission
            </h3>

            <p className="text-gray-600">
              {society.mission || "-"}
            </p>

          </div>

          <div>

            <h3 className="font-semibold">
              Description
            </h3>

            <p className="text-gray-600">
              {society.description || "-"}
            </p>

          </div>

          <div className="pt-4">

            <button
              onClick={() =>
                setOpen(false)
              }
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