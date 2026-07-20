function EventSchedule({
  formData,
  setFormData,
}) {
  const today = new Date()
    .toISOString()
    .split("T")[0];

  const currentTime = new Date()
    .toTimeString()
    .slice(0, 5);

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-6 lg:p-8 mb-6 sm:mb-8">

      {/* Heading */}

      <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 sm:mb-8">
        Event Schedule
      </h2>

      {/* Inputs */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">

        {/* Event Date */}

        <div>

          <label className="block mb-2 text-sm sm:text-base text-gray-500">
            Event Date
          </label>

          <input
            type="date"
            value={formData.date}
            min={today}
            onKeyDown={(e) =>
              e.preventDefault()
            }
            onPaste={(e) =>
              e.preventDefault()
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                date: e.target.value,
                registrationDeadline:
                  "",
                startTime: "",
                endTime: "",
              })
            }
            className="w-full border rounded-xl px-4 py-3 text-sm sm:text-base outline-none focus:border-blue-600"
          />

        </div>

        {/* Registration Deadline */}

        <div>

          <label className="block mb-2 text-sm sm:text-base text-gray-500">
            Registration Deadline
          </label>

          <input
            type="date"
            value={
              formData.registrationDeadline
            }
            min={today}
            max={formData.date || ""}
            onKeyDown={(e) =>
              e.preventDefault()
            }
            onPaste={(e) =>
              e.preventDefault()
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                registrationDeadline:
                  e.target.value,
              })
            }
            className="w-full border rounded-xl px-4 py-3 text-sm sm:text-base outline-none focus:border-blue-600"
          />

        </div>

        {/* Start Time */}

        <div>

          <label className="block mb-2 text-sm sm:text-base text-gray-500">
            Start Time
          </label>

          <input
            type="time"
            value={formData.startTime}
            min={
              formData.date === today
                ? currentTime
                : ""
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                startTime:
                  e.target.value,
                endTime: "",
              })
            }
            className="w-full border rounded-xl px-4 py-3 text-sm sm:text-base outline-none focus:border-blue-600"
          />

        </div>

        {/* End Time */}

        <div>

          <label className="block mb-2 text-sm sm:text-base text-gray-500">
            End Time
          </label>

          <input
            type="time"
            value={formData.endTime}
            min={
              formData.startTime
                ? (() => {
                    const [h, m] =
                      formData.startTime
                        .split(":")
                        .map(Number);

                    const date =
                      new Date();

                    date.setHours(h);
                    date.setMinutes(
                      m + 60
                    );

                    return date
                      .toTimeString()
                      .slice(0, 5);
                  })()
                : ""
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                endTime:
                  e.target.value,
              })
            }
            className="w-full border rounded-xl px-4 py-3 text-sm sm:text-base outline-none focus:border-blue-600"
          />

        </div>

      </div>

      {/* Validation Messages */}

      {formData.date &&
        formData.registrationDeadline &&
        formData.registrationDeadline >
          formData.date && (

          <p className="mt-4 text-sm sm:text-base text-red-500 break-words">
            Registration deadline
            cannot be after the
            event date.
          </p>

      )}

      {formData.startTime &&
        formData.endTime &&
        (() => {
          const [sh, sm] =
            formData.startTime
              .split(":")
              .map(Number);

          const [eh, em] =
            formData.endTime
              .split(":")
              .map(Number);

          return (
            eh * 60 +
              em -
              (sh * 60 + sm) <
            60
          );
        })() && (

          <p className="mt-2 text-sm sm:text-base text-red-500 break-words">
            Event duration must be
            at least 1 hour.
          </p>

      )}

    </div>
  );
}

export default EventSchedule;