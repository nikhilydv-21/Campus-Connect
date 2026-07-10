function AboutMe({
  student,
  editMode,
  formData,
  handleChange,
}) {
  return (

    <div className="mt-10">

      <h3 className="text-2xl font-bold text-slate-800 mb-6">
        About Me
      </h3>

      <div className="bg-white border rounded-2xl p-6">

        {
          editMode ? (

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
                  p-4
                  outline-none
                  resize-none
                  focus:border-blue-600
                "
              />

            
            </>

          ) : (

            <p className="text-gray-700 leading-7 whitespace-pre-wrap break-words">

              {
                student?.bio?.trim()
                  ? student.bio
                  : "No bio added yet."
              }

            </p>

          )
        }

      </div>

    </div>

  );
}

export default AboutMe;