import { useState } from "react";
import {
  X,
  Mail,
  Phone,
} from "lucide-react";

function StudentDetailsModal({
  open,
  setOpen,
  student,
}) {
  const [showImage, setShowImage] =
    useState(false);

  if (!open || !student) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 px-4 py-4">

        <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl">

          {/* Header */}

          <div className="sticky top-0 bg-white border-b p-5 sm:p-6 flex justify-between items-center z-20">

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Student Details
            </h2>

            <button
              onClick={() => setOpen(false)}
              className="hover:bg-slate-100 p-2 rounded-full transition"
            >
              <X />
            </button>

          </div>

          <div className="p-5 sm:p-8 space-y-8">

            {/* Profile */}

            <div className="flex flex-col items-center">

              <img
                src={
                  student.profilePicture
                    ? student.profilePicture
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        student.fullName
                      )}`
                }
                onClick={() =>
                  setShowImage(true)
                }
                alt={student.fullName}
                className="
                  w-28
                  h-28
                  sm:w-36
                  sm:h-36
                  rounded-full
                  object-cover
                  border-2
                  border-slate-300
                  cursor-pointer
                  hover:scale-105
                  transition
                "
              />

              <h1 className="text-2xl sm:text-4xl font-bold mt-5 text-slate-800 text-center break-words">
                {student.fullName}
              </h1>

              <p className="mt-3 text-base sm:text-lg text-slate-600 font-medium break-words">
                {student.rollNumber}
              </p>

            </div>

            {/* Stats */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

              {/* Branch */}

              <div className="border border-slate-200 rounded-2xl p-5 text-center bg-white">

                <p className="mt-3 text-slate-500">
                  Branch
                </p>

                <h3 className="text-2xl sm:text-3xl font-semibold text-slate-800 break-words">
                  {student.branch}
                </h3>

              </div>

              {/* Year */}

              <div className="border border-slate-200 rounded-2xl p-5 text-center bg-white">

                <p className="mt-2 text-slate-500">
                  Year
                </p>

                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-800">
                  {student.year}
                </h2>

              </div>

              {/* Joined Societies */}

              <div className="border border-slate-200 rounded-2xl p-5 text-center bg-white">

                <p className="mt-2 text-slate-500">
                  Joined Societies
                </p>

                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-800">
                  {student.joinedSocieties?.length || 0}
                </h2>

              </div>

            </div>
                        {/* Contact */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="border border-slate-200 rounded-2xl p-5">

                <div className="flex items-center gap-3 mb-3">

                  <Mail className="text-slate-600 shrink-0" />

                  <h3 className="font-semibold">
                    Email
                  </h3>

                </div>

                <p className="text-slate-700 break-all">
                  {student.email}
                </p>

              </div>

              <div className="border border-slate-200 rounded-2xl p-5">

                <div className="flex items-center gap-3 mb-3">

                  <Phone className="text-slate-600 shrink-0" />

                  <h3 className="font-semibold">
                    Contact Number
                  </h3>

                </div>

                <p className="text-slate-700 break-all">
                  {student.contactNumber}
                </p>

              </div>

            </div>

            {/* About */}

            <div className="border border-slate-200 rounded-2xl p-5 sm:p-6">

              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-slate-800">
                About
              </h2>

              <p className="text-slate-600 leading-7 whitespace-pre-wrap break-words">
                {student.bio || "No bio added."}
              </p>

            </div>

            {/* Skills */}

            <div className="border border-slate-200 rounded-2xl p-5 sm:p-6">

              <h2 className="text-xl sm:text-2xl font-bold mb-5 text-slate-800">
                Skills
              </h2>

              {student.skills?.length ? (

                <div className="flex flex-wrap gap-2">

                  {student.skills.map((skill, index) => (

                    <span
                      key={index}
                      className="
                        border
                        border-slate-300
                        px-4
                        py-2
                        rounded-full
                        text-slate-700
                        text-sm
                        break-words
                      "
                    >
                      {skill}
                    </span>

                  ))}

                </div>

              ) : (

                <p className="text-slate-500">
                  No skills added.
                </p>

              )}

            </div>

            {/* Interests */}

            <div className="border border-slate-200 rounded-2xl p-5 sm:p-6">

              <h2 className="text-xl sm:text-2xl font-bold mb-5 text-slate-800">
                Interests
              </h2>

              {student.interests?.length ? (

                <div className="flex flex-wrap gap-2">

                  {student.interests.map((interest, index) => (

                    <span
                      key={index}
                      className="
                        border
                        border-slate-300
                        px-4
                        py-2
                        rounded-full
                        text-slate-700
                        text-sm
                        break-words
                      "
                    >
                      {interest}
                    </span>

                  ))}

                </div>

              ) : (

                <p className="text-slate-500">
                  No interests added.
                </p>

              )}

            </div>
                        {/* Joined Societies */}

            <div className="border border-slate-200 rounded-2xl p-5 sm:p-6">

              <h2 className="text-xl sm:text-2xl font-bold mb-5 text-slate-800">
                Joined Societies
              </h2>

              {student.joinedSocieties?.length ? (

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">

                  {student.joinedSocieties.map((society) => (

                    <div
                      key={society._id}
                      className="
                        w-full
                        border
                        border-slate-200
                        rounded-xl
                        p-3
                        flex
                        items-center
                        gap-3
                        bg-white
                      "
                    >

                      <img
                        src={
                          society.logo
                            ? society.logo
                            : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                society.societyName
                              )}`
                        }
                        alt={society.societyName}
                        className="
                          w-12
                          h-12
                          sm:w-14
                          sm:h-14
                          rounded-full
                          object-cover
                          border
                          border-slate-300
                          shrink-0
                        "
                      />

                      <div className="min-w-0 flex-1">

                        <h3 className="font-semibold text-slate-800 break-words">
                          {society.societyName}
                        </h3>

                      </div>

                    </div>

                  ))}

                </div>

              ) : (

                <p className="text-slate-500">
                  Student has not joined any society.
                </p>

              )}

            </div>

          </div>

        </div>

      </div>

      {/* Image Preview */}

      {showImage && (

        <div
          onClick={() => setShowImage(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4"
        >

          <img
            src={
              student.profilePicture
                ? student.profilePicture
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    student.fullName
                  )}`
            }
            alt={student.fullName}
            className="
              max-h-[90vh]
              max-w-[95vw]
              object-contain
              rounded-2xl
              sm:rounded-3xl
              border
              border-slate-300
              bg-white
              shadow-2xl
            "
          />

        </div>

      )}

    </>
  );
}

export default StudentDetailsModal;