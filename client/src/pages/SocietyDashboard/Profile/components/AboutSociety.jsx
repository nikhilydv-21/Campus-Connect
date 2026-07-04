function AboutSociety({
  society,
  editMode,
  formData,
  setFormData,
}) {
  return (
    <div className="mt-8 bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        About Society
      </h2>

      {editMode ? (

        <textarea
          rows={8}
          placeholder="Write about your society..."
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
          className="
            w-full
            min-h-[220px]
            border
            border-gray-300
            rounded-2xl
            p-5
            outline-none
            resize-y
            focus:border-blue-600
            focus:ring-2
            focus:ring-blue-200
            leading-7
            text-slate-700
          "
        />

      ) : (

        <div
          className="
            bg-slate-50
            border
            border-gray-200
            rounded-2xl
            p-6
            w-full
            overflow-hidden
          "
        >

          <p
            className="
              text-slate-700
              leading-8
              whitespace-pre-wrap
              break-words
              [overflow-wrap:anywhere]
              max-w-full
            "
          >
            {society?.description?.trim()
              ? society.description
              : "No description added yet."}
          </p>

        </div>

      )}

    </div>
  );
}

export default AboutSociety;