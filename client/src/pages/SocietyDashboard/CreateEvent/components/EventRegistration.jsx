function EventRegistration({
  formData,
  setFormData,
}) {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-6 lg:p-8 mb-6 sm:mb-8">

      {/* Heading */}

      <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 sm:mb-8">
        Registration Settings
      </h2>

      {/* Form */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">

        {/* Registration Mode */}

        <div>

          <label className="block mb-2 text-sm sm:text-base text-gray-500">
            Registration Mode
          </label>

          <select
            value={formData.registrationMode}
            onChange={(e) =>
              setFormData({
                ...formData,
                registrationMode: e.target.value,
                maximumParticipants:
                  e.target.value ===
                  "Viewer"
                    ? ""
                    : formData.maximumParticipants,
              })
            }
            className="
              w-full
              border
              rounded-xl
              px-4
              py-3
              text-sm
              sm:text-base
              outline-none
              focus:border-blue-600
            "
          >
            <option value="Participant">
              Participant
            </option>

            <option value="Viewer">
              Viewer
            </option>

          </select>

        </div>

        {/* Maximum Participants */}

        {formData.registrationMode ===
          "Participant" && (

          <div>

            <label className="block mb-2 text-sm sm:text-base text-gray-500">
              Maximum Participants
            </label>

            <input
              type="text"
              inputMode="numeric"
              placeholder="Enter Maximum Participants"
              value={
                formData.maximumParticipants
              }
              onChange={(e) => {
                const value =
                  e.target.value.replace(
                    /\D/g,
                    ""
                  );

                setFormData({
                  ...formData,
                  maximumParticipants:
                    value,
                });
              }}
              onKeyDown={(e) => {
                if (
                  [
                    "e",
                    "E",
                    "+",
                    "-",
                    ".",
                    ",",
                  ].includes(e.key)
                ) {
                  e.preventDefault();
                }
              }}
              onPaste={(e) => {
                e.preventDefault();

                const pasted =
                  e.clipboardData
                    .getData("text")
                    .replace(
                      /\D/g,
                      ""
                    );

                setFormData({
                  ...formData,
                  maximumParticipants:
                    pasted,
                });
              }}
              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
                text-sm
                sm:text-base
                outline-none
                focus:border-blue-600
              "
            />

          </div>

        )}

      </div>

      {/* Info Box */}

      <div
        className="
          mt-6
          sm:mt-8
          rounded-2xl
          bg-blue-50
          border
          border-blue-200
          p-4
          sm:p-5
        "
      >

        <h3 className="mb-2 text-base sm:text-lg font-semibold text-blue-700">
          Registration Information
        </h3>

        {formData.registrationMode ===
        "Participant" ? (

          <p className="text-sm sm:text-base text-gray-700 leading-6 sm:leading-7 break-words">
            Students will register as
            participants. Registration
            will automatically close
            once the maximum
            participant limit is
            reached.
          </p>

        ) : (

          <p className="text-sm sm:text-base text-gray-700 leading-6 sm:leading-7 break-words">
            This event is open for
            viewers only. No
            participant limit will be
            applied.
          </p>

        )}

      </div>

    </div>
  );
}

export default EventRegistration;