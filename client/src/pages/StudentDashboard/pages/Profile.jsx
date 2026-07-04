import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  BookOpen,
  Pencil,
} from "lucide-react";
import toast from "react-hot-toast";

import { getStudentProfile } from "../../../services/authServices";
import { updateStudentProfile } from "../../../services/authServices";
import {
  uploadProfilePicture,
} from "../../../services/authServices";
function Profile() {
const [student, setStudent] = useState(null);
const [editMode, setEditMode] = useState(false);
const [showLogo, setShowLogo] = useState(false);
const [formData, setFormData] = useState({
  fullName: "",
  year: "",
  contactNumber: "",
  bio: "",
  skills: [],
  interests: [],
});
const updateProfile = async () => {
  try {
    const response = await updateStudentProfile(formData);

    toast.success(response.message);

    setStudent(response.student);
    localStorage.setItem(
    "student",
    JSON.stringify(response.student)
);

    setEditMode(false);

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Failed to update profile"
    );

  }
};
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const [loading, setLoading] = useState(true);
const fetchProfile = async () => {
  try {
    const response = await getStudentProfile();

    setStudent(response.student);
    setFormData({
  fullName: response.student.fullName,
  year: response.student.year,
  contactNumber: response.student.contactNumber,
  bio: response.student.bio || "",
  skills: response.student.skills || [],
  interests: response.student.interests || [],
});

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Failed to load profile"
    );

  } finally {

    setLoading(false);

  }
};
const handleImageUpload = async (e) => {
  try {

    const file = e.target.files[0];

    if (!file) return;

    const response =
      await uploadProfilePicture(file);

    toast.success(response.message);

    fetchProfile();

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Upload Failed"
    );

  }
};
useEffect(() => {
  fetchProfile();
}, []);
if (loading) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h2 className="text-xl font-semibold text-slate-700">
        Loading Profile...
      </h2>
    </div>
  );
}

  return (
    <div className="bg-slate-100 min-h-screen p-8">

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          My Profile
        </h1>

        <p className="text-gray-500 mt-2">
          View and manage your personal information.
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-3xl shadow-lg p-8">

        {/* Top Section */}
        <div className="flex flex-col items-center">

          <img
            src={
              student?.profilePicture ||
              "https://ui-avatars.com/api/?name=" +
                encodeURIComponent(student?.fullName || "Student")
            }
            alt="profile"
            className="w-36 h-36 rounded-full object-cover border-4 border-blue-600"
          />
          {
  editMode && (
    <label className="mt-4 cursor-pointer bg-slate-800 text-white px-4 py-2 rounded-xl hover:bg-slate-900 transition">

      Change Picture

      <input
        type="file"
        accept="image/*"
        hidden
        onChange={handleImageUpload}
      />

    </label>
  )
}

          <h2 className="text-3xl font-bold mt-5 text-slate-800">
            {student?.fullName}
          </h2>

          <p className="text-gray-500 mt-1">
            {student?.rollNumber}
          </p>

    <div className="flex gap-4 mt-5">

  {
    editMode ? (
      <>
        <button
          onClick={updateProfile}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition"
        >
          Save Changes
        </button>

        <button
          onClick={() => {
            setEditMode(false);

            setFormData({
              fullName: student.fullName,
              year: student.year,
              contactNumber: student.contactNumber,
              bio: student.bio || "",
              skills: student.skills || [],
              interests: student.interests || [],
            });
          }}
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl transition"
        >
          Cancel
        </button>
      </>
    ) : (
      <button
        onClick={() => setEditMode(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
      >
        <Pencil size={18} className="inline mr-2" />
        Edit Profile
      </button>
    )
  }

</div>     

        </div>

        {/* Personal Info */}
        <div className="mt-12">

          <h3 className="text-2xl font-bold text-slate-800 mb-6">
            Personal Information
          </h3>

          <div className="grid md:grid-cols-2 gap-6">

           {
  editMode ? (
    <div className="border rounded-2xl p-5">
      <label className="text-sm text-gray-500">
        Full Name
      </label>

      <input
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:border-blue-500"
      />
    </div>
    
    
  ) : (
    <InfoCard
      icon={<User />}
      title="Full Name"
      value={student?.fullName}
    />
  )
}
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

            {
  editMode ? (
    <div className="border rounded-2xl p-5">
      <label className="text-sm text-gray-500">
        Year
      </label>

      <select
        name="year"
        value={formData.year}
        onChange={handleChange}
        className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:border-blue-500"
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
  )
}

            {
  editMode ? (
    <div className="border rounded-2xl p-5">
      <label className="text-sm text-gray-500">
        Contact Number
      </label>

      <input
        type="text"
        name="contactNumber"
        value={formData.contactNumber}
        onChange={handleChange}
        className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:border-blue-500"
      />
    </div>
  ) : (
    <InfoCard
      icon={<Phone />}
      title="Contact Number"
      value={student?.contactNumber}
    />
  )
}
          </div>

        </div>
{/* About */}
<div className="mt-10">

  <h3 className="text-2xl font-bold text-slate-800 mb-6">
    About Me
  </h3>

  <div className="bg-white border rounded-2xl p-6">

    {
      editMode ? (

        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={5}
          placeholder="Tell us about yourself..."
          className="
          w-full
          border
          rounded-xl
          p-4
          outline-none
          resize-none
          focus:border-blue-600
          "
        />

      ) : (

        <p className="text-gray-700 leading-7">

          {
            student?.bio
              ? student.bio
              : "No bio added yet."
          }

        </p>

      )
    }

  </div>

</div>
<div className="mt-10">

<h3 className="text-2xl font-bold text-slate-800 mb-6">
Skills
</h3>

<div className="bg-white border rounded-2xl p-6">

{

editMode ?

<input
type="text"
name="skills"
value={formData.skills.join(", ")}
onChange={(e)=>
setFormData({
...formData,
skills:e.target.value
.split(",")
.map((skill)=>skill.trim())
})
}
placeholder="Add your skills."
className="
w-full
border
rounded-xl
p-4
outline-none
focus:border-blue-600
"
/>


:

<div className="flex flex-wrap gap-3">

{
student?.skills?.length ?

student.skills.map((skill,index)=>(

<span
key={index}
className="
bg-blue-100
text-blue-700
px-4
py-2
rounded-full
font-medium
"
>
{skill}
</span>

))

:

<p>No skills added.</p>

}

</div>

}

</div>
{
  formData.skills.length > 0 && (
    <div className="flex flex-wrap gap-2 mt-4">

      {
        formData.skills.map((skill, index) => (

          <span
            key={index}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
          >
            {skill}
          </span>

        ))
      }

    </div>
  )
}
</div>
<div className="mt-10">

<h3 className="text-2xl font-bold text-slate-800 mb-6">
Interests
</h3>

<div className="bg-white border rounded-2xl p-6">

{

editMode ?

<input
type="text"
name="interests"
value={formData.interests.join(", ")}
onChange={(e)=>
setFormData({
...formData,
interests:e.target.value
.split(",")
.map((interest)=>interest.trim())
})
}
placeholder="Add your interests."
className="
w-full
border
rounded-xl
p-4
outline-none
focus:border-blue-600
"
/>

:

<div className="flex flex-wrap gap-3">

{
student?.interests?.length ?

student.interests.map((interest,index)=>(

<span
key={index}
className="
bg-green-100
text-green-700
px-4
py-2
rounded-full
font-medium
"
>
{interest}
</span>

))

:

<p>No interests added.</p>

}

</div>

}

</div>

</div>
      </div>

    </div>
  );
}

function InfoCard({ icon, title, value }) {
  return (
    <div className="border rounded-2xl p-5 flex items-start gap-4 hover:shadow-md transition">

      <div className="text-blue-600">
        {icon}
      </div>

      <div>

        <p className="text-sm text-gray-500">
          {title}
        </p>

        <p className="font-semibold text-slate-800 mt-1">
          {value || "Not Available"}
        </p>

      </div>

    </div>
  );
}

export default Profile;