import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getStudentProfile,
  updateStudentProfile,
  uploadProfilePicture,
  removeProfilePicture,
} from "../../../services/authServices";

import ProfileHeader from "./components/ProfileHeader";
import PersonalInformation from "./components/PersonalInformation";
import AboutMe from "./components/AboutMe";
import Skills from "./components/Skills";
import Interests from "./components/Interests";
import ImagePreviewModal from "./components/ImagePreviewModal";

function Profile() {
  const [showImage, setShowImage] =
    useState(false);

  const [student, setStudent] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [editMode, setEditMode] =
    useState(false);

  const [formData, setFormData] =
    useState({
      fullName: "",
      year: "",
      contactNumber: "",
      bio: "",
      skills: [],
      interests: [],
    });

  const fetchProfile = async () => {
    try {
      const response =
        await getStudentProfile();

      setStudent(response.student);

      setFormData({
        fullName:
          response.student.fullName || "",
        year:
          response.student.year || "",
        contactNumber:
          response.student
            .contactNumber || "",
        bio:
          response.student.bio || "",
        skills:
          response.student.skills || [],
        interests:
          response.student.interests ||
          [],
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

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "bio"
          ? value.slice(0, 500)
          : value,
    }));
  };

  const updateProfile = async () => {
    try {
      const response =
        await updateStudentProfile(
          formData
        );

      toast.success(
        response.message
      );

      setStudent(response.student);

      localStorage.setItem(
        "student",
        JSON.stringify(
          response.student
        )
      );

      setEditMode(false);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to update profile"
      );

    }
  };

  const handleImageUpload =
    async (e) => {
      try {
        const file =
          e.target.files[0];

        if (!file) return;

        const response =
          await uploadProfilePicture(
            file
          );

        toast.success(
          response.message
        );

        fetchProfile();

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
            "Upload Failed"
        );

      }
    };

  const handleRemovePicture =
    async () => {
      try {
        const response =
          await removeProfilePicture();

        toast.success(
          response.message
        );

        await fetchProfile();

        setShowImage(false);

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
            "Failed to remove picture"
        );

      }
    };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen p-4 sm:p-6 lg:p-8">

      {/* Heading */}

      <div className="mb-6 sm:mb-8">

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
          My Profile
        </h1>

        <p className="mt-2 text-sm sm:text-base text-gray-500">
          View and manage your personal information.
        </p>

      </div>

      {/* Profile Card */}

      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-6 lg:p-8">

        <ProfileHeader
          student={student}
          editMode={editMode}
          setEditMode={setEditMode}
          updateProfile={updateProfile}
          formData={formData}
          setFormData={setFormData}
          handleImageUpload={handleImageUpload}
          handleRemovePicture={handleRemovePicture}
          setShowImage={setShowImage}
        />

        <PersonalInformation
          student={student}
          editMode={editMode}
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
        />

        <AboutMe
          student={student}
          editMode={editMode}
          formData={formData}
          handleChange={handleChange}
        />

        <Skills
          editMode={editMode}
          formData={formData}
          setFormData={setFormData}
          student={student}
        />

        <Interests
          editMode={editMode}
          formData={formData}
          setFormData={setFormData}
          student={student}
        />

      </div>

      <ImagePreviewModal
        show={showImage}
        setShow={setShowImage}
        student={student}
      />

    </div>
  );
}

export default Profile;