function AboutMe({
  student,
  editMode,
  formData,
  handleChange,
}) {
  return (
    <div className="mt-8 sm:mt-10">

      <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-5 sm:mb-6">
        About Me
      </h3>

      <div className="bg-white border rounded-2xl p-5 sm:p-6">

        {editMode ? (
          <>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={5}
              maxLength={500}
              placeholder="Tell us about yourself"
              className="
                w-full
                border
                rounded-xl
                p-3
                sm:p-4
                text-sm
                sm:text-base
                outline-none
                resize-none
                focus:border-blue-600
              "
            />

            <div className="mt-2 text-right text-xs sm:text-sm text-gray-500">
              {formData.bio.length}/500
            </div>

          </>
        ) : (
          <p
            className="
              text-sm
              sm:text-base
              text-gray-700
              leading-7
              sm:leading-8
              whitespace-pre-wrap
              break-words
            "
          >
            {student?.bio?.trim()
              ? student.bio
              : "No bio added yet."}
          </p>
        )}

      </div>

    </div>
  );
}

export default AboutMe;