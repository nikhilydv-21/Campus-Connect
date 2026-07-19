import { useState } from "react";
import toast from "react-hot-toast";

function Skills({
  student,
  editMode,
  formData,
  setFormData,
}) {
  const [skillInput, setSkillInput] =
    useState("");

  const addSkill = () => {
    const value = skillInput.trim();

    if (!value) return;

    if (formData.skills.length >= 5) {
      toast.error("Maximum 5 skills allowed");
      return;
    }

    if (
      formData.skills.some(
        (skill) =>
          skill.toLowerCase() ===
          value.toLowerCase()
      )
    ) {
      toast.error("Skill already added");
      return;
    }

    setFormData({
      ...formData,
      skills: [
        ...formData.skills,
        value,
      ],
    });

    setSkillInput("");
  };

  const removeSkill = (index) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(
        (_, i) => i !== index
      ),
    });
  };

  return (
    <div className="mt-8 sm:mt-10">

      <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-5 sm:mb-6">
        Skills
      </h3>

      <div className="bg-white border rounded-2xl p-5 sm:p-6">

        {editMode ? (
          <>
            <input
              type="text"
              value={skillInput}
              placeholder="Example: React, Node.js, SQL (Press Enter)"
              onChange={(e) =>
                setSkillInput(
                  e.target.value
                )
              }
              onKeyDown={(e) => {
                if (
                  e.key === "Enter"
                ) {
                  e.preventDefault();
                  addSkill();
                }
              }}
              className="
                w-full
                border
                rounded-xl
                p-3
                sm:p-4
                text-sm
                sm:text-base
                outline-none
                focus:border-blue-600
              "
            />

            <p className="mt-2 text-xs sm:text-sm text-gray-500">
              {formData.skills.length}/5
              Skills
            </p>

            {formData.skills.length >
              0 && (
              <div className="mt-4 flex flex-wrap gap-2">

                {formData.skills.map(
                  (
                    skill,
                    index
                  ) => (
                    <div
                      key={index}
                      className="
                        flex
                        items-center
                        gap-2
                        border
                        rounded-lg
                        px-3
                        py-2
                        text-sm
                        sm:text-base
                        break-words
                      "
                    >
                      <span className="break-words">
                        {skill}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          removeSkill(
                            index
                          )
                        }
                        className="text-red-600 font-bold shrink-0"
                      >
                        ×
                      </button>
                    </div>
                  )
                )}

              </div>
            )}

          </>
        ) : student?.skills
            ?.length ? (

          <div className="flex flex-wrap gap-2">

            {student.skills.map(
              (
                skill,
                index
              ) => (
                <div
                  key={index}
                  className="
                    border
                    rounded-lg
                    px-3
                    py-2
                    text-sm
                    sm:text-base
                    break-words
                  "
                >
                  {skill}
                </div>
              )
            )}

          </div>

        ) : (

          <p className="text-sm sm:text-base text-gray-500">
            No skills added.
          </p>

        )}

      </div>

    </div>
  );
}

export default Skills;