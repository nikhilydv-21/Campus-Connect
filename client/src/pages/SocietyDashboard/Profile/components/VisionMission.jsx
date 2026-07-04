function VisionMission({
  society,
  editMode,
  formData,
  setFormData,
}) {
  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">

      {/* Vision */}

      <div className="bg-white rounded-3xl shadow-lg p-8">

        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Vision
        </h2>

        {editMode ? (

          <textarea
            rows={8}
            value={formData.vision}
            placeholder="Write Society Vision..."
            onChange={(e) =>
              setFormData({
                ...formData,
                vision: e.target.value,
              })
            }
            className="
              w-full
              min-h-[220px]
              border
              border-gray-300
              rounded-2xl
              p-5
              resize-y
              outline-none
              focus:border-blue-600
              focus:ring-2
              focus:ring-blue-200
              text-slate-700
              leading-8
              whitespace-pre-wrap
              break-words
              overflow-hidden
            "
          />

        ) : (

          <div
            className="
              w-full
              border
              border-gray-200
              rounded-2xl
              bg-slate-50
              p-6
              overflow-hidden
            "
          >

            <p
              className="
                text-slate-700
                text-[16px]
                leading-8
                whitespace-pre-wrap
                break-words
                [overflow-wrap:anywhere]
                hyphens-auto
                max-w-full
              "
            >
              {society?.vision?.trim()
                ? society.vision
                : "No Vision Added"}
            </p>

          </div>

        )}

      </div>

      {/* Mission */}

      <div className="bg-white rounded-3xl shadow-lg p-8">

        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Mission
        </h2>

        {editMode ? (

          <textarea
            rows={8}
            value={formData.mission}
            placeholder="Write Society Mission..."
            onChange={(e) =>
              setFormData({
                ...formData,
                mission: e.target.value,
              })
            }
            className="
              w-full
              min-h-[220px]
              border
              border-gray-300
              rounded-2xl
              p-5
              resize-y
              outline-none
              focus:border-blue-600
              focus:ring-2
              focus:ring-blue-200
              text-slate-700
              leading-8
              whitespace-pre-wrap
              break-words
              overflow-hidden
            "
          />

        ) : (

          <div
            className="
              w-full
              border
              border-gray-200
              rounded-2xl
              bg-slate-50
              p-6
              overflow-hidden
            "
          >

            <p
              className="
                text-slate-700
                text-[16px]
                leading-8
                whitespace-pre-wrap
                break-words
                [overflow-wrap:anywhere]
                hyphens-auto
                max-w-full
              "
            >
              {society?.mission?.trim()
                ? society.mission
                : "No Mission Added"}
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default VisionMission;