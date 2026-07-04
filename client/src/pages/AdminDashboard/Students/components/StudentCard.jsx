import { useState } from "react";
import toast from "react-hot-toast";

import { Eye, GraduationCap, Users } from "lucide-react";

import { getStudentDetails } from "../../../../services/adminServices";

import StudentDetailsModal from "./StudentDetailsModal";

function StudentCard({
  student,
}) {

  const [open, setOpen] =
    useState(false);

  const [studentData, setStudentData] =
    useState(null);

  const handleView = async () => {

    try {

      const response =
        await getStudentDetails(
          student._id
        );

      setStudentData(
        response.student
      );

      setOpen(true);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to load student details"
      );

    }

  };

  return (
    <>

      <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition overflow-hidden">

        {/* Header */}

        <div className="flex items-center gap-4 p-6">

          <img
            src={
              student.profilePicture
                ? student.profilePicture
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    student.fullName
                  )}&background=2563eb&color=fff`
            }
            alt={student.fullName}
            className="w-20 h-20 rounded-full object-cover border-4 border-blue-100"
          />

          <div className="flex-1">

            <h2 className="text-xl font-bold">
              {student.fullName}
            </h2>

            <p className="text-gray-500">
              {student.rollNumber}
            </p>

          </div>

        </div>

        {/* Info */}

        <div className="px-6 space-y-3">

          <div className="flex items-center gap-2 text-gray-600">

            <GraduationCap size={18} />

            <span>
              {student.branch} • Year {student.year}
            </span>

          </div>

          <div className="flex items-center gap-2 text-gray-600">

            <Users size={18} />

            <span>
              Joined Societies :
              {" "}
              {student.joinedSocieties?.length || 0}
            </span>

          </div>

        </div>

        {/* Button */}

        <div className="p-6">

          <button
            onClick={handleView}
            className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
          >

            <Eye size={18} />

            View Details

          </button>

        </div>

      </div>

      <StudentDetailsModal
        open={open}
        setOpen={setOpen}
        student={studentData}
      />

    </>
  );

}

export default StudentCard;