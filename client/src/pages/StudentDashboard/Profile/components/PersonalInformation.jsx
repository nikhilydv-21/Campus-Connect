import {
  User,
  Mail,
  Phone,
  GraduationCap,
  BookOpen,
} from "lucide-react";

import InfoCard from "./InfoCard";

function PersonalInformation({
  student,
  editMode,
  formData,
  handleChange,
}) {
  return (
    <div className="mt-10 sm:mt-12">

      <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-5 sm:mb-6">
        Personal Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">

        {/* Full Name */}

        {editMode ? (
          <div className="border rounded-2xl p-5 sm:p-6">

            <label className="text-sm text-gray-500">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="
                w-full
                mt-2
                border
                rounded-xl
                px-4
                py-3
                text-sm
                sm:text-base
                outline-none
                focus:border-blue-500
              "
            />

          </div>
        ) : (
          <InfoCard
            icon={<User />}
            title="Full Name"
            value={student?.fullName}
          />
        )}

        {/* Email */}

        <InfoCard
          icon={<Mail />}
          title="Email"
          value={student?.email}
        />

        {/* Roll Number */}

        <InfoCard
          icon={<BookOpen />}
          title="Roll Number"
          value={student?.rollNumber}
        />

        {/* Branch */}

        <InfoCard
          icon={<GraduationCap />}
          title="Branch"
          value={student?.branch}
        />

        {/* Year */}

        {editMode ? (
          <div className="border rounded-2xl p-5 sm:p-6">

            <label className="text-sm text-gray-500">
              Year
            </label>

            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="
                w-full
                mt-2
                border
                rounded-xl
                px-4
                py-3
                text-sm
                sm:text-base
                outline-none
                focus:border-blue-500
              "
            >
              <option value={1}>
                1st Year
              </option>

              <option value={2}>
                2nd Year
              </option>

              <option value={3}>
                3rd Year
              </option>

              <option value={4}>
                4th Year
              </option>

            </select>

          </div>
        ) : (
          <InfoCard
            icon={<GraduationCap />}
            title="Year"
            value={`${student?.year} Year`}
          />
        )}

        {/* Contact Number */}

        {editMode ? (
          <div className="border rounded-2xl p-5 sm:p-6">

            <label className="text-sm text-gray-500">
              Contact Number
            </label>

            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="
                w-full
                mt-2
                border
                rounded-xl
                px-4
                py-3
                text-sm
                sm:text-base
                outline-none
                focus:border-blue-500
              "
            />

          </div>
        ) : (
          <InfoCard
            icon={<Phone />}
            title="Contact Number"
            value={student?.contactNumber}
          />
        )}

      </div>

    </div>
  );
}

export default PersonalInformation;