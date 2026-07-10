import { useState } from "react";
import toast from "react-hot-toast";

function Interests({
    student,
    editMode,
    formData,
    setFormData,
}) {

    const [interestInput, setInterestInput] = useState("");

    const addInterest = () => {

        const value = interestInput.trim();

        if (!value) return;

        if (formData.interests.length >= 5) {
            toast.error("Maximum 5 interests allowed");
            return;
        }

        if (
            formData.interests.some(
                (interest) =>
                    interest.toLowerCase() === value.toLowerCase()
            )
        ) {
            toast.error("Interest already added");
            return;
        }

        setFormData({
            ...formData,
            interests: [...formData.interests, value],
        });

        setInterestInput("");

    };

    const removeInterest = (index) => {

        setFormData({
            ...formData,
            interests: formData.interests.filter(
                (_, i) => i !== index
            ),
        });

    };

    return (

        <div className="mt-10">

            <h3 className="text-2xl font-bold text-slate-800 mb-6">
                Interests
            </h3>

            <div className="bg-white border rounded-2xl p-6">

                {editMode ? (

                    <>

                        <input
                            type="text"
                            value={interestInput}
                            placeholder="Example: Web Development, AI, Cricket (Press Enter)"
                            onChange={(e) =>
                                setInterestInput(e.target.value)
                            }
                            onKeyDown={(e) => {

                                if (e.key === "Enter") {

                                    e.preventDefault();

                                    addInterest();

                                }

                            }}
                            className="
                w-full
                border
                rounded-xl
                p-4
                outline-none
                focus:border-blue-600
              "
                        />

                        <p className="text-sm text-gray-500 mt-2">
                            {formData.interests.length}/5 Interests
                        </p>

                        {formData.interests.length > 0 && (

                            <div className="mt-4 flex flex-wrap gap-2">

                                {formData.interests.map((interest, index) => (

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
        "
                                    >

                                        <span>{interest}</span>

                                        <button
                                            type="button"
                                            onClick={() => removeInterest(index)}
                                            className="text-red-600 font-bold"
                                        >
                                            ×
                                        </button>

                                    </div>

                                ))}

                            </div>

                        )}

                    </>

                ) : (

                    student?.interests?.length ? (

                        <div className="flex flex-wrap gap-2">

                            {student.interests.map((interest, index) => (

                                <div
                                    key={index}
                                    className="
        border
        rounded-lg
        px-3
        py-2
      "
                                >
                                    {interest}
                                </div>

                            ))}

                        </div>

                    ) : (

                        <p className="text-gray-500">
                            No interests added.
                        </p>

                    )

                )}

            </div>

        </div>

    );

}

export default Interests;