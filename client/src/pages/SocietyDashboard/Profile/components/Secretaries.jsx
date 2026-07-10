import { Plus, Trash2 } from "lucide-react";

function Secretaries({
  society,
  editMode,
  formData,
  setFormData,
}) {
  // Add Secretary
  const addSecretary = () => {
    if (formData.secretaries.length >= 5) return;

    setFormData({
      ...formData,
      secretaries: [
        ...formData.secretaries,
        { name: "" },
      ],
    });
  };

  // Remove Secretary
  const removeSecretary = (index) => {
    const updated = [...formData.secretaries];
    updated.splice(index, 1);

    setFormData({
      ...formData,
      secretaries: updated,
    });
  };

  // Add Joint Secretary
  const addJointSecretary = () => {
    if (formData.jointSecretaries.length >= 5) return;

    setFormData({
      ...formData,
      jointSecretaries: [
        ...formData.jointSecretaries,
        { name: "" },
      ],
    });
  };

  // Remove Joint Secretary
  const removeJointSecretary = (index) => {
    const updated = [...formData.jointSecretaries];
    updated.splice(index, 1);

    setFormData({
      ...formData,
      jointSecretaries: updated,
    });
  };

  return (
    <div className="mt-8 grid lg:grid-cols-2 gap-8">

      {/* Secretaries */}

      <div className="bg-white rounded-3xl shadow-lg p-8">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Secretaries
          </h2>

          {editMode && (
            <button
              onClick={addSecretary}
              disabled={formData.secretaries.length >= 5}
              className={`px-4 py-2 rounded-xl flex items-center gap-2 text-white transition
                ${
                  formData.secretaries.length >= 5
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              <Plus size={18} />
              Add
            </button>
          )}

        </div>

        {editMode ? (
          <>
            {formData.secretaries.map((item, index) => (
              <div
                key={index}
                className="flex gap-3 mb-4"
              >
                <input
                  type="text"
                  placeholder="Secretary Name"
                  value={item.name}
                  onChange={(e) => {
                    const updated = [...formData.secretaries];

                    updated[index].name = e.target.value;

                    setFormData({
                      ...formData,
                      secretaries: updated,
                    });
                  }}
                  className="flex-1 border rounded-xl px-4 py-3 outline-none focus:border-blue-600"
                />

                <button
                  onClick={() => removeSecretary(index)}
                className="mt-4 h-11 w-11 flex items-center justify-center rounded-full bg-red-50 hover:bg-red-100 text-red-600 transition"
                 > 
                 <Trash2 size={18} />
                </button>
              </div>
            ))}

            {formData.secretaries.length >= 5 && (
              <p className="text-red-500 text-sm">
                Maximum 5 Secretaries Allowed
              </p>
            )}
          </>
        ) : (
          <div className="space-y-3">

            {society?.secretaries?.length ? (
              society.secretaries.map((item, index) => (
                <div
                  key={index}
                  className="border rounded-xl p-4 bg-slate-50 break-words"
                >
                  {item.name}
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                No Secretaries Added
              </p>
            )}

          </div>
        )}

      </div>

      {/* Joint Secretaries */}

      <div className="bg-white rounded-3xl shadow-lg p-8">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Joint Secretaries
          </h2>

          {editMode && (
            <button
              onClick={addJointSecretary}
              disabled={formData.jointSecretaries.length >= 5}
              className={`px-4 py-2 rounded-xl flex items-center gap-2 text-white transition
                ${
                  formData.jointSecretaries.length >= 5
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              <Plus size={18} />
              Add
            </button>
          )}

        </div>

        {editMode ? (
          <>
            {formData.jointSecretaries.map((item, index) => (
              <div
                key={index}
                className="flex gap-3 mb-4"
              >
                <input
                  type="text"
                  placeholder="Joint Secretary Name"
                  value={item.name}
                  onChange={(e) => {
                    const updated = [
                      ...formData.jointSecretaries,
                    ];

                    updated[index].name = e.target.value;

                    setFormData({
                      ...formData,
                      jointSecretaries: updated,
                    });
                  }}
                  className="flex-1 border rounded-xl px-4 py-3 outline-none focus:border-blue-600"
                />

                <button
                  onClick={() =>
                    removeJointSecretary(index)
                  }
                  className="mt-4 h-11 w-11 flex items-center justify-center rounded-full bg-red-50 hover:bg-red-100 text-red-600 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}

            {formData.jointSecretaries.length >= 5 && (
              <p className="text-red-500 text-sm">
                Maximum 5 Joint Secretaries Allowed
              </p>
            )}
          </>
        ) : (
          <div className="space-y-3">

            {society?.jointSecretaries?.length ? (
              society.jointSecretaries.map(
                (item, index) => (
                  <div
                    key={index}
                    className="border rounded-xl p-4 bg-slate-50 break-words"
                  >
                    {item.name}
                  </div>
                )
              )
            ) : (
              <p className="text-gray-500">
                No Joint Secretaries Added
              </p>
            )}

          </div>
        )}

      </div>

    </div>
  );
}

export default Secretaries;