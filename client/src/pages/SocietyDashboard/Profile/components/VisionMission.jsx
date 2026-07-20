function VisionMission({
  society,
  editMode,
  formData,
  setFormData,
}) {

  return (

    <div
      className="
        mt-6
        sm:mt-8
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-5
        sm:gap-8
      "
    >

      {/* Vision */}

      <div
        className="
          rounded-2xl
          sm:rounded-3xl
          bg-white
          shadow-lg
          p-5
          sm:p-8
        "
      >

        <h2
          className="
            mb-5
            sm:mb-6
            text-xl
            sm:text-2xl
            font-bold
            text-slate-800
          "
        >

          Vision

        </h2>

        {editMode ? (

          <textarea
            rows={8}
            maxLength={250}
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
              min-h-[180px]
              sm:min-h-[220px]
              rounded-2xl
              border
              border-gray-300
              p-4
              sm:p-5
              resize-y
              outline-none
              focus:border-blue-600
              focus:ring-2
              focus:ring-blue-200
              text-sm
              sm:text-base
              text-slate-700
              leading-7
              sm:leading-8
              whitespace-pre-wrap
              break-words
              overflow-hidden
            "
          />

        ) : (

          <div
            className="
              w-full
              rounded-2xl
              border
              border-gray-200
              bg-slate-50
              p-4
              sm:p-6
              overflow-hidden
            "
          >

            <p
              className="
                text-sm
                sm:text-base
                text-slate-700
                leading-7
                sm:leading-8
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

      <div
        className="
          rounded-2xl
          sm:rounded-3xl
          bg-white
          shadow-lg
          p-5
          sm:p-8
        "
      >

        <h2
          className="
            mb-5
            sm:mb-6
            text-xl
            sm:text-2xl
            font-bold
            text-slate-800
          "
        >

          Mission

        </h2>

        {editMode ? (

          <textarea
            rows={8}
            maxLength={250}
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
              min-h-[180px]
              sm:min-h-[220px]
              rounded-2xl
              border
              border-gray-300
              p-4
              sm:p-5
              resize-y
              outline-none
              focus:border-blue-600
              focus:ring-2
              focus:ring-blue-200
              text-sm
              sm:text-base
              text-slate-700
              leading-7
              sm:leading-8
              whitespace-pre-wrap
              break-words
              overflow-hidden
            "
          />

        ) : (

          <div
            className="
              w-full
              rounded-2xl
              border
              border-gray-200
              bg-slate-50
              p-4
              sm:p-6
              overflow-hidden
            "
          >

            <p
              className="
                text-sm
                sm:text-base
                text-slate-700
                leading-7
                sm:leading-8
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