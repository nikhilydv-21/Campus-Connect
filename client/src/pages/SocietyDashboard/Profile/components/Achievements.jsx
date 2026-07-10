import { Plus, Trash2, Trophy } from "lucide-react";

function Achievements({
  society,
  editMode,
  formData,
  setFormData,
}) {

  const addAchievement = () => {

    if (formData.achievements.length >= 3) return;

    setFormData({
      ...formData,
      achievements: [
        ...formData.achievements,
        {
          title: "",
          description: "",
        },
      ],
    });

  };

  const removeAchievement = (index) => {

    const updated = [...formData.achievements];

    updated.splice(index, 1);

    setFormData({
      ...formData,
      achievements: updated,
    });

  };

  const removeEmptyAchievement = (index) => {
    const achievement = formData.achievements[index];

    if (!achievement) return;

    if (
      achievement.title.trim() === "" &&
      achievement.description.trim() === ""
    ) {
      const updated = [...formData.achievements];
      updated.splice(index, 1);

      setFormData({
        ...formData,
        achievements: updated,
      });
    }
  };
  return (

    <div className="mt-8 bg-white rounded-3xl shadow-lg p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-2xl font-bold text-slate-800">
          Achievements
        </h2>

        {editMode && (

          <button
            onClick={addAchievement}
            disabled={formData.achievements.length >= 3}
            className={`px-5 py-2 rounded-xl flex items-center gap-2 transition ${formData.achievements.length >= 3
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
          >

            <Plus size={18} />

            Add

          </button>

        )}

      </div>

      {/* Limit Message */}

      {editMode &&
        formData.achievements.length >= 3 && (

          <p className="text-sm text-red-500 mb-5">
            Maximum 3 achievements are allowed.
          </p>

        )}

      {editMode ? (

        <div className="space-y-5">

          {formData.achievements.map((achievement, index) => (

            <div
              key={index}
              tabIndex={-1}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  removeEmptyAchievement(index);
                }
              }}
              className="border rounded-2xl p-5 bg-slate-50"
            >
              <input
                type="text"
                placeholder="Title"
                value={achievement.title}
                onChange={(e) => {
                  const updated = [...formData.achievements];

                  updated[index] = {
                    ...updated[index],
                    title: e.target.value,
                  };

                  setFormData({
                    ...formData,
                    achievements: updated,
                  });
                }}

                className="w-full border rounded-xl px-4 py-3 mb-4 outline-none focus:border-blue-600"
              />

              {/* Description */}

              <textarea
                rows={4}
                maxLength={250}
                placeholder="Description"
                value={achievement.description}
                onChange={(e) => {
                  const updated = [...formData.achievements];

                  updated[index] = {
                    ...updated[index],
                    description: e.target.value,
                  };

                  setFormData({
                    ...formData,
                    achievements: updated,
                  });
                }}

                className="w-full border rounded-xl p-4 resize-none outline-none focus:border-blue-600 whitespace-pre-wrap break-words"
              />

              {/* Delete */}

              <button
                onClick={() => removeAchievement(index)}
                className="mt-4 h-11 w-11 flex items-center justify-center rounded-full bg-red-50 hover:bg-red-100 text-red-600 transition"
              >

                <Trash2 size={18} />

              </button>

            </div>

          ))}

        </div>

      ) : (

        <div className="grid md:grid-cols-2 gap-5">

          {society?.achievements?.length ? (

            society.achievements.map((achievement, index) => (

              <div
                key={index}
                className="border rounded-2xl p-5 bg-slate-50 flex gap-4 items-start"
              >

                <Trophy
                  size={24}
                  className="text-yellow-500 mt-1"
                />

                <div className="flex-1">

                  <h3 className="font-bold text-lg">
                    {achievement.title}
                  </h3>

                  <p className="mt-2 text-slate-700 whitespace-pre-wrap break-words [overflow-wrap:anywhere]">
                    {achievement.description}
                  </p>

                </div>

              </div>

            ))

          ) : (

            <p className="text-gray-500">
              No Achievements Added
            </p>

          )}

        </div>

      )}

    </div>

  );

}

export default Achievements;