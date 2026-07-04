function BasicInformation({
  society,
  editMode,
  formData,
  setFormData,
  societyTypes,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

      <h2 className="text-2xl font-bold text-slate-800 mb-8">
        Basic Information
      </h2>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Society Name */}

        <div className="border rounded-2xl p-5">

          <label className="text-sm text-gray-500 block mb-2">
            Society Name
          </label>

          {editMode ? (
            <input
              type="text"
              placeholder="Enter Society Name"
              value={formData.societyName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  societyName: e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3 outline-none focus:border-blue-600"
            />
          ) : (
            <p className="font-semibold text-slate-800 break-words">
              {society?.societyName || "Not Added"}
            </p>
          )}

        </div>

        {/* Email */}

        <div className="border rounded-2xl p-5">

          <label className="text-sm text-gray-500 block mb-2">
            Official Email
          </label>

          <p className="font-semibold text-slate-800 break-all">
            {society?.email}
          </p>

        </div>

        {/* Society Type */}

        <div className="border rounded-2xl p-5">

          <label className="text-sm text-gray-500 block mb-2">
            Society Type
          </label>

          {editMode ? (
            <>
              <select
                value={
                  societyTypes.includes(formData.societyType)
                    ? formData.societyType
                    : "Other"
                }
                onChange={(e) => {
                  if (e.target.value === "Other") {
                    setFormData({
                      ...formData,
                      societyType: "",
                    });
                  } else {
                    setFormData({
                      ...formData,
                      societyType: e.target.value,
                    });
                  }
                }}
                className="w-full border rounded-xl px-4 py-3 outline-none focus:border-blue-600"
              >
                <option value="">
                  Select Society Type
                </option>

                {societyTypes.map((type) => (
                  <option
                    key={type}
                    value={type}
                  >
                    {type}
                  </option>
                ))}

              </select>

              {(!societyTypes.includes(formData.societyType) ||
                formData.societyType === "") && (

                <input
                  type="text"
                  placeholder="Enter Society Type"
                  value={formData.societyType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      societyType: e.target.value,
                    })
                  }
                  className="w-full mt-4 border rounded-xl px-4 py-3 outline-none focus:border-blue-600"
                />

              )}

            </>
          ) : (
            <p className="font-semibold text-slate-800 break-words">
              {society?.societyType || "Not Added"}
            </p>
          )}

        </div>

        {/* Faculty Coordinator */}

        <div className="border rounded-2xl p-5">

          <label className="text-sm text-gray-500 block mb-2">
            Faculty Coordinator
          </label>

          {editMode ? (
            <input
              type="text"
              placeholder="Faculty Coordinator Name"
              value={formData.facultyCoordinator}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  facultyCoordinator: e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3 outline-none focus:border-blue-600"
            />
          ) : (
            <p className="font-semibold text-slate-800 break-words">
              {society?.facultyCoordinator || "Not Added"}
            </p>
          )}

        </div>

      </div>

    </div>
  );
}

export default BasicInformation;