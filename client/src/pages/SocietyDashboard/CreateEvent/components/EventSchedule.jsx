function EventSchedule({
  formData,
  setFormData,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">

      <h2 className="text-2xl font-bold text-slate-800 mb-8">
        Event Schedule
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Event Date */}

        <div>

          <label className="block text-sm text-gray-500 mb-2">
            Event Date
          </label>

          <input
            type="date"
            value={formData.date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) =>
              setFormData({
                ...formData,
                date: e.target.value,
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

        {/* Registration Deadline */}

        <div>

          <label className="block text-sm text-gray-500 mb-2">
            Registration Deadline
          </label>

          <input
            type="date"
            value={formData.registrationDeadline}
            min={new Date().toISOString().split("T")[0]}
            max={formData.date || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                registrationDeadline: e.target.value,
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

        {/* Start Time */}

        <div>

          <label className="block text-sm text-gray-500 mb-2">
            Start Time
          </label>

          <input
            type="time"
            value={formData.startTime}
            onChange={(e) =>
              setFormData({
                ...formData,
                startTime: e.target.value,
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

        {/* End Time */}

        <div>

          <label className="block text-sm text-gray-500 mb-2">
            End Time
          </label>

          <input
            type="time"
            value={formData.endTime}
            min={formData.startTime || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                endTime: e.target.value,
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

      </div>

      {/* Validation Message */}

      {formData.date &&
        formData.registrationDeadline &&
        formData.registrationDeadline > formData.date && (
          <p className="text-red-500 mt-4">
            Registration deadline cannot be after the event date.
          </p>
      )}

      {formData.startTime &&
        formData.endTime &&
        formData.endTime <= formData.startTime && (
          <p className="text-red-500 mt-2">
            End time must be later than start time.
          </p>
      )}

    </div>
  );
}

export default EventSchedule;