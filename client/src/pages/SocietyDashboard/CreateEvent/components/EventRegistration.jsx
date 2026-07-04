function EventRegistration({
  formData,
  setFormData,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">

      <h2 className="text-2xl font-bold text-slate-800 mb-8">
        Registration Settings
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Registration Mode */}

        <div>

          <label className="block text-sm text-gray-500 mb-2">
            Registration Mode
          </label>

          <select
            value={formData.registrationMode}
            onChange={(e) =>
              setFormData({
                ...formData,
                registrationMode: e.target.value,
                maximumParticipants:
                  e.target.value === "Viewer"
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

            <label className="block text-sm text-gray-500 mb-2">
              Maximum Participants
            </label>

            <input
              type="number"
              min="1"
              placeholder="Enter Maximum Participants"
              value={formData.maximumParticipants}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  maximumParticipants: e.target.value,
                })
              }
              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
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
          mt-8
          rounded-2xl
          bg-blue-50
          border
          border-blue-200
          p-5
        "
      >

        <h3 className="font-semibold text-blue-700 mb-2">
          Registration Information
        </h3>

        {formData.registrationMode ===
        "Participant" ? (
          <p className="text-gray-700 leading-7">
            Students will register as participants.
            Registration will automatically close once
            the maximum participant limit is reached.
          </p>
        ) : (
          <p className="text-gray-700 leading-7">
            This event is open for viewers only.
            No participant limit will be applied.
          </p>
        )}

      </div>

    </div>
  );
}

export default EventRegistration;