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
    <div className="mt-12">

      <h3 className="text-2xl font-bold text-slate-800 mb-6">
        Personal Information
      </h3>

      <div className="grid md:grid-cols-2 gap-6">

        {editMode ? (
          <div className="border rounded-2xl p-5">

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

        <InfoCard
          icon={<Mail />}
          title="Email"
          value={student?.email}
        />

        <InfoCard
          icon={<BookOpen />}
          title="Roll Number"
          value={student?.rollNumber}
        />

        <InfoCard
          icon={<GraduationCap />}
          title="Branch"
          value={student?.branch}
        />

        {editMode ? (
          <div className="border rounded-2xl p-5">

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
                outline-none
                focus:border-blue-500
              "
            >
              <option value={1}>1st Year</option>
              <option value={2}>2nd Year</option>
              <option value={3}>3rd Year</option>
              <option value={4}>4th Year</option>
            </select>

          </div>
        ) : (
          <InfoCard
            icon={<GraduationCap />}
            title="Year"
            value={`${student?.year} Year`}
          />
        )}

        {editMode ? (
          <div className="border rounded-2xl p-5">

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