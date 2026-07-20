function AboutSociety({
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

        About Society

      </h2>

      {editMode ? (

        <textarea
          rows={8}
          maxLength={500}
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
            min-h-[180px]
            sm:min-h-[220px]
            rounded-2xl
            border
            border-gray-300
            p-4
            sm:p-5
            text-sm
            sm:text-base
            leading-7
            sm:leading-8
            text-slate-700
            resize-y
            outline-none
            focus:border-blue-600
            focus:ring-2
            focus:ring-blue-200
          "
        />

      ) : (

        <div
          className="
            w-full
            overflow-hidden
            rounded-2xl
            border
            border-gray-200
            bg-slate-50
            p-4
            sm:p-6
          "
        >

          <p
            className="
              max-w-full
              whitespace-pre-wrap
              break-words
              [overflow-wrap:anywhere]
              text-sm
              sm:text-base
              leading-7
              sm:leading-8
              text-slate-700
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