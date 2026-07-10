import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getSocietyProfile,
  updateSocietyProfile,
  uploadSocietyLogo,
  removeSocietyLogo,
} from "../../../services/authServices";

import ProfileHeader from "./components/ProfileHeader";
import BasicInformation from "./components/BasicInformation";
import AboutSociety from "./components/AboutSociety";
import VisionMission from "./components/VisionMission";
import Secretaries from "./components/Secretaries";
import Achievements from "./components/Achievements";
import Contacts from "./components/Contacts";
import SocialLinks from "./components/SocialLinks";
import LogoModal from "./components/LogoModal";

function Profile() {

  const [society, setSociety] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [editMode, setEditMode] =
    useState(false);

  const [showLogo, setShowLogo] =
    useState(false);

  const [formData, setFormData] =
    useState({

      societyName: "",

      societyType: "",

      facultyCoordinator: "",

      description: "",

      vision: "",

      mission: "",

      secretaries: [],

      jointSecretaries: [],

      achievements: [],

      contacts: [],

      socialLinks: {

        instagram: "",

        linkedin: "",

        website: "",

      },

    });

  const societyTypes = [

    "Technical",

    "Coding",

    "Robotics",

    "AI/ML",

    "Cultural",

    "Dance",

    "Music",

    "Drama",

    "Photography",

    "Sports",

    "Literary",

    "Entrepreneurship",

    "Social Service",

    "Other",

  ];

  const fetchProfile = async () => {

    try {

      const response =
        await getSocietyProfile();

      setSociety(response.society);

      setFormData({

        societyName:
          response.society.societyName || "",

        societyType:
          response.society.societyType || "",

        facultyCoordinator:
          response.society.facultyCoordinator || "",

        description:
          response.society.description || "",

        vision:
          response.society.vision || "",

        mission:
          response.society.mission || "",

        secretaries:
          response.society.secretaries || [],

        jointSecretaries:
          response.society.jointSecretaries || [],

        achievements:
          response.society.achievements || [],

        contacts:
          response.society.contacts || [],

        socialLinks:
          response.society.socialLinks || {

            instagram: "",

            linkedin: "",

            website: "",

          },

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

  const updateProfile = async () => {
  try {

    const payload = {
  ...formData,

  secretaries: formData.secretaries.filter(
    (item) => item.name.trim() !== ""
  ),

  jointSecretaries: formData.jointSecretaries.filter(
    (item) => item.name.trim() !== ""
  ),

  achievements: formData.achievements.filter(
    (item) =>
      item.title.trim() !== "" ||
      item.description.trim() !== ""
  ),

  contacts: formData.contacts.filter(
    (item) =>
      item.name.trim() !== "" ||
      item.position.trim() !== "" ||
      item.phone.trim() !== ""
  ),
};

    const response = await updateSocietyProfile(payload);

    toast.success(response.message);

    setSociety(response.society);

    setFormData({
      ...payload,
      achievements: response.society.achievements,
    });

    localStorage.setItem(
      "society",
      JSON.stringify(response.society)
    );

    setEditMode(false);

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Profile Update Failed"
    );

  }
};

  const handleLogoUpload = async (e) => {

    try {

      const file =
        e.target.files[0];

      if (!file) return;

      const response =
        await uploadSocietyLogo(file);

      toast.success(
        response.message
      );

      await fetchProfile();

    } catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Logo Upload Failed"

      );

    }

  };

  const handleRemoveLogo = async () => {

    try {

      const response =
        await removeSocietyLogo();

      toast.success(
        response.message
      );

      await fetchProfile();

      setShowLogo(false);

    } catch (error) {

      console.error(error);

      toast.error(

        error.response?.data?.message ||

        "Failed to remove logo"

      );

    }

  };

  if (loading) {

    return (

      <div className="flex justify-center items-center min-h-screen">

        Loading...

      </div>

    );

  }

  return (
    <>
      <div className="bg-slate-100 min-h-screen p-8">

        <h1 className="text-4xl font-bold">
          Society Profile
        </h1>

        <p className="text-gray-500 mt-2 mb-8">
          View and manage your society information.
        </p>

        <ProfileHeader
          society={society}
          editMode={editMode}
          setEditMode={setEditMode}
          updateProfile={updateProfile}
          formData={formData}
          setFormData={setFormData}
          handleLogoUpload={handleLogoUpload}
          handleRemoveLogo={handleRemoveLogo}
          setShowLogo={setShowLogo}
        />

        <BasicInformation
          society={society}
          editMode={editMode}
          formData={formData}
          setFormData={setFormData}
          societyTypes={societyTypes}
        />

        <AboutSociety
          society={society}
          editMode={editMode}
          formData={formData}
          setFormData={setFormData}
        />

        <VisionMission
          society={society}
          editMode={editMode}
          formData={formData}
          setFormData={setFormData}
        />

        <Secretaries
          society={society}
          editMode={editMode}
          formData={formData}
          setFormData={setFormData}
        />

        <Achievements
          society={society}
          editMode={editMode}
          formData={formData}
          setFormData={setFormData}
        />

        <Contacts
          society={society}
          editMode={editMode}
          formData={formData}
          setFormData={setFormData}
        />

        <SocialLinks
          society={society}
          editMode={editMode}
          formData={formData}
          setFormData={setFormData}
        />

      </div>

      <LogoModal
        showLogo={showLogo}
        setShowLogo={setShowLogo}
        society={society}
      />

    </>
  );

}

export default Profile;
    