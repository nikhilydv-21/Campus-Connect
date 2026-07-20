import { Plus, Trash2, Trophy } from "lucide-react";

function Achievements({
  society,
  editMode,
  formData,
  setFormData,
}) {

  const addAchievement = () => {

    if (formData.achievements.length >= 3)
      return;

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

    const updated = [
      ...formData.achievements,
    ];

    updated.splice(index, 1);

    setFormData({
      ...formData,
      achievements: updated,
    });

  };

  const removeEmptyAchievement = (
    index
  ) => {

    const achievement =
      formData.achievements[index];

    if (!achievement) return;

    if (
      achievement.title.trim() === "" &&
      achievement.description.trim() === ""
    ) {

      const updated = [
        ...formData.achievements,
      ];

      updated.splice(index, 1);

      setFormData({
        ...formData,
        achievements: updated,
      });

    }

  };

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

      {/* Header */}

      <div
        className="
          mb-6
          sm:mb-8
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >

        <h2
          className="
            text-xl
            sm:text-2xl
            font-bold
            text-slate-800
          "
        >

          Achievements

        </h2>

        {editMode && (

          <button
            onClick={addAchievement}
            disabled={
              formData.achievements.length >=
              3
            }
            className={`
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              px-4
              py-2
              text-sm
              sm:text-base
              transition
              ${
                formData.achievements.length >=
                3
                  ? "cursor-not-allowed bg-gray-400 text-white"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }
            `}
          >

            <Plus size={18} />

            Add

          </button>

        )}

      </div>

      {editMode &&
        formData.achievements.length >=
          3 && (

          <p
            className="
              mb-5
              text-sm
              text-red-500
            "
          >

            Maximum 3 achievements are
            allowed.

          </p>

        )}

      {editMode ? (

        <div className="space-y-5">

          {formData.achievements.map(
            (
              achievement,
              index
            ) => (

              <div
                key={index}
                tabIndex={-1}
                onBlur={(e) => {

                  if (
                    !e.currentTarget.contains(
                      e.relatedTarget
                    )
                  ) {

                    removeEmptyAchievement(
                      index
                    );

                  }

                }}
                className="
                  rounded-2xl
                  border
                  bg-slate-50
                  p-4
                  sm:p-5
                "
              >

                <input
                  type="text"
                  placeholder="Title"
                  value={
                    achievement.title
                  }
                  onChange={(e) => {

                    const updated = [
                      ...formData.achievements,
                    ];

                    updated[index] = {
                      ...updated[index],
                      title:
                        e.target.value,
                    };

                    setFormData({
                      ...formData,
                      achievements:
                        updated,
                    });

                  }}
                  className="
                    mb-4
                    w-full
                    rounded-xl
                    border
                    px-4
                    py-3
                    text-sm
                    sm:text-base
                    outline-none
                    focus:border-blue-600
                  "
                />

                <textarea
                  rows={4}
                  maxLength={250}
                  placeholder="Description"
                  value={
                    achievement.description
                  }
                  onChange={(e) => {

                    const updated = [
                      ...formData.achievements,
                    ];

                    updated[index] = {
                      ...updated[index],
                      description:
                        e.target.value,
                    };

                    setFormData({
                      ...formData,
                      achievements:
                        updated,
                    });

                  }}
                  className="
                    w-full
                    rounded-xl
                    border
                    p-4
                    text-sm
                    sm:text-base
                    resize-none
                    whitespace-pre-wrap
                    break-words
                    outline-none
                    focus:border-blue-600
                  "
                />

                <button
                  onClick={() =>
                    removeAchievement(
                      index
                    )
                  }
                  className="
                    mt-4
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    bg-red-50
                    text-red-600
                    transition
                    hover:bg-red-100
                  "
                >

                  <Trash2
                    size={18}
                  />

                </button>

              </div>

            )
          )}

        </div>

      ) : (

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
          "
        >

          {society?.achievements
            ?.length ? (

            society.achievements.map(
              (
                achievement,
                index
              ) => (

                <div
                  key={index}
                  className="
                    flex
                    items-start
                    gap-4
                    rounded-2xl
                    border
                    bg-slate-50
                    p-4
                    sm:p-5
                  "
                >

                  <Trophy
                    size={24}
                    className="
                      mt-1
                      shrink-0
                      text-yellow-500
                    "
                  />

                  <div className="flex-1">

                    <h3
                      className="
                        text-base
                        sm:text-lg
                        font-bold
                        break-words
                      "
                    >

                      {achievement.title}

                    </h3>

                    <p
                      className="
                        mt-2
                        text-sm
                        sm:text-base
                        text-slate-700
                        whitespace-pre-wrap
                        break-words
                        [overflow-wrap:anywhere]
                      "
                    >

                      {
                        achievement.description
                      }

                    </p>

                  </div>

                </div>

              )
            )

          ) : (

            <p
              className="
                text-sm
                sm:text-base
                text-gray-500
              "
            >

              No Achievements Added

            </p>

          )}

        </div>

      )}

    </div>

  );

}

export default Achievements;