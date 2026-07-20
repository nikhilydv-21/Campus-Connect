function EventBasicInfo({
  formData,
  setFormData,
  categories,
}) {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-6 lg:p-8 mb-6 sm:mb-8">

      {/* Heading */}

      <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 sm:mb-8">
        Basic Information
      </h2>

      {/* Form */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">

        {/* Event Title */}

        <div className="md:col-span-2">

          <label className="block mb-2 text-sm sm:text-base text-gray-500">
            Event Title
          </label>

          <input
            type="text"
            placeholder="Event Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
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
          />

        </div>

        {/* Category */}

        <div>

          <label className="block mb-2 text-sm sm:text-base text-gray-500">
            Category
          </label>

          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({
                ...formData,
                category: e.target.value,
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
            {categories.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>

        </div>

        {/* Venue */}

        <div>

          <label className="block mb-2 text-sm sm:text-base text-gray-500">
            Venue
          </label>

          <input
            type="text"
            placeholder="Event Venue"
            value={formData.venue}
            onChange={(e) =>
              setFormData({
                ...formData,
                venue: e.target.value,
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
          />

        </div>

        {/* Description */}

        <div className="md:col-span-2">

          <label className="block mb-2 text-sm sm:text-base text-gray-500">
            Description
          </label>

          <textarea
            rows={7}
            maxLength={500}
            placeholder="Write Event Description..."
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
            className="
              w-full
              border
              rounded-2xl
              p-4
              text-sm
              sm:text-base
              resize-y
              outline-none
              focus:border-blue-600
              whitespace-pre-wrap
              break-words
            "
          />

        </div>

      </div>

    </div>
  );
}

export default EventBasicInfo;