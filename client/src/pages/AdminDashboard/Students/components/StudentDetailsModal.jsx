import { useState } from "react";
import {
  X,
  Mail,
  Phone,
  GraduationCap,
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
      <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-5">

        <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl">

          {/* Header */}

          <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-20">

            <h2 className="text-3xl font-bold">
              Student Details
            </h2>

            <button
              onClick={() => setOpen(false)}
              className="hover:bg-gray-100 p-2 rounded-full"
            >
              <X />
            </button>

          </div>

          <div className="p-8 space-y-8">

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
                className="w-36 h-36 rounded-full object-cover border-4 border-blue-100 cursor-pointer hover:scale-105 transition"
              />

              <h1 className="text-4xl font-bold mt-5">
                {student.fullName}
              </h1>

              <span className="mt-3 bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold">

                {student.rollNumber}

              </span>

            </div>

            {/* Stats */}

            <div className="grid md:grid-cols-3 gap-5">

              <div className="bg-blue-50 rounded-2xl p-5 text-center">

                <GraduationCap
                  className="mx-auto text-blue-600"
                />

                <p className="mt-3 text-gray-500">
                  Branch
                </p>

                <h3 className="font-bold mt-1">
                  {student.branch}
                </h3>

              </div>

              <div className="bg-green-50 rounded-2xl p-5 text-center">

                <h2 className="text-4xl font-bold text-green-600">
                  {student.year}
                </h2>

                <p className="mt-2 text-gray-500">
                  Year
                </p>

              </div>

              <div className="bg-purple-50 rounded-2xl p-5 text-center">

                <h2 className="text-4xl font-bold text-purple-600">

                  {student.joinedSocieties?.length || 0}

                </h2>

                <p className="mt-2 text-gray-500">

                  Joined Societies

                </p>

              </div>

            </div>

            {/* Contact */}

            <div className="grid md:grid-cols-2 gap-6">

              <div className="bg-slate-50 rounded-2xl p-5">

                <div className="flex items-center gap-3 mb-3">

                  <Mail className="text-blue-600"/>

                  <h3 className="font-bold">
                    Email
                  </h3>

                </div>

                <p>{student.email}</p>

              </div>

              <div className="bg-slate-50 rounded-2xl p-5">

                <div className="flex items-center gap-3 mb-3">

                  <Phone className="text-blue-600"/>

                  <h3 className="font-bold">
                    Contact Number
                  </h3>

                </div>

                <p>{student.contactNumber}</p>

              </div>

            </div>
                        {/* About */}

            <div className="bg-white border rounded-2xl p-6">

              <h2 className="text-2xl font-bold mb-4">
                About
              </h2>

              <p className="text-gray-600 leading-7 whitespace-pre-wrap">

                {student.bio || "No bio added."}

              </p>

            </div>

            {/* Skills */}

            <div className="bg-white border rounded-2xl p-6">

              <h2 className="text-2xl font-bold mb-5">
                Skills
              </h2>

              {student.skills?.length ? (

                <div className="flex flex-wrap gap-3">

                  {student.skills.map((skill, index) => (

                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium"
                    >
                      {skill}
                    </span>

                  ))}

                </div>

              ) : (

                <p className="text-gray-500">
                  No skills added.
                </p>

              )}

            </div>

            {/* Interests */}

            <div className="bg-white border rounded-2xl p-6">

              <h2 className="text-2xl font-bold mb-5">
                Interests
              </h2>

              {student.interests?.length ? (

                <div className="flex flex-wrap gap-3">

                  {student.interests.map((interest, index) => (

                    <span
                      key={index}
                      className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium"
                    >
                      {interest}
                    </span>

                  ))}

                </div>

              ) : (

                <p className="text-gray-500">
                  No interests added.
                </p>

              )}

            </div>

            {/* Joined Societies */}

            <div className="bg-white border rounded-2xl p-6">

              <h2 className="text-2xl font-bold mb-5">
                Joined Societies
              </h2>

              {student.joinedSocieties?.length ? (

                <div className="grid md:grid-cols-2 gap-4">

                  {student.joinedSocieties.map((society) => (

                    <div
                      key={society._id}
                      className="border rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition"
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
                        className="w-14 h-14 rounded-full object-cover"
                      />

                      <div>

                        <h3 className="font-bold">
                          {society.societyName}
                        </h3>

                      </div>

                    </div>

                  ))}

                </div>

              ) : (

                <p className="text-gray-500">
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
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100]"
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
            className="max-h-[85vh] max-w-[85vw] rounded-3xl shadow-2xl"
          />

        </div>

      )}

    </>

  );

}

export default StudentDetailsModal;