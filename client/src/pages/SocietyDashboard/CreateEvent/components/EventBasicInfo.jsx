function EventBasicInfo({
  formData,
  setFormData,
  categories,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">

      <h2 className="text-2xl font-bold text-slate-800 mb-8">
        Basic Information
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Event Title */}

        <div className="md:col-span-2">

          <label className="block text-sm text-gray-500 mb-2">
            Event Title
          </label>

          <input
            type="text"
            placeholder="Enter Event Title"
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
              outline-none
              focus:border-blue-600
            "
          />

        </div>

        {/* Category */}

        <div>

          <label className="block text-sm text-gray-500 mb-2">
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

          <label className="block text-sm text-gray-500 mb-2">
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
              outline-none
              focus:border-blue-600
            "
          />

        </div>

        {/* Description */}

        <div className="md:col-span-2">

          <label className="block text-sm text-gray-500 mb-2">
            Description
          </label>

          <textarea
            rows={7}
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