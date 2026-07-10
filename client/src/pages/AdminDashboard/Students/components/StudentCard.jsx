import { useState } from "react";
import toast from "react-hot-toast";

import { Eye, GraduationCap } from "lucide-react";

import { getStudentDetails } from "../../../../services/adminServices";

import StudentDetailsModal from "./StudentDetailsModal";

function StudentCard({
  student,
}) {

  const [open, setOpen] = useState(false);

  const [studentData, setStudentData] =
    useState(null);

  const handleView = async () => {

    try {

      const response =
        await getStudentDetails(
          student._id
        );

      setStudentData(response.student);

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

      <div
        className="
          w-full
          bg-white
          rounded-3xl
          border
          border-slate-200
          shadow-sm
          hover:shadow-lg
          transition-all
          duration-300
        "
      >

        {/* Profile Picture */}

        <div className="flex justify-center pt-10">

          <img
            src={
              student.profilePicture
                ? student.profilePicture
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    student.fullName
                  )}&background=f8fafc&color=111827`
            }
            alt={student.fullName}
            className="
              w-24
              h-24
              rounded-full
              object-cover
              border-2
              border-slate-300
              p-1
              bg-white
              shadow-sm
            "
          />

        </div>

        {/* Content */}

        <div className="p-6 text-center">

          <h2
            className="
              text-2xl
              font-semibold
              text-slate-700
              tracking-tight
            "
          >
            {student.fullName}
          </h2>

          <p
            className="
              mt-2
              text-sm
              text-slate-500
            "
          >
            {student.rollNumber}
          </p>

          <div
            className="
              flex
              justify-center
              items-center
              gap-2
              mt-4
              text-slate-600
              font-medium
            "
          >

            <GraduationCap size={18} />

            <span>
              {student.branch} • Year {student.year}
            </span>

          </div>

          {/* View Button */}

          <button
            onClick={handleView}
            className="
              mt-6
              w-full
              bg-white
              border
              border-slate-300
              hover:bg-slate-100
              text-slate-800
              py-2.5
              rounded-xl
              flex
              justify-center
              items-center
              gap-2
              font-semibold
              transition
            "
          >

            <Eye size={17} />

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