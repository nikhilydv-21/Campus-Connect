import { Pencil } from "lucide-react";

function ProfileHeader({
  society,
  editMode,
  setEditMode,
  updateProfile,
  formData,
  setFormData,
  handleLogoUpload,
  setShowLogo,
}) {
  const handleCancel = () => {
    setEditMode(false);

    setFormData({
      societyName: society?.societyName || "",
      societyType: society?.societyType || "",
      facultyCoordinator: society?.facultyCoordinator || "",

      description: society?.description || "",
      vision: society?.vision || "",
      mission: society?.mission || "",

      secretaries: society?.secretaries || [],
      jointSecretaries: society?.jointSecretaries || [],
      achievements: society?.achievements || [],
      contacts: society?.contacts || [],

      socialLinks: society?.socialLinks || {
        instagram: "",
        linkedin: "",
        website: "",
      },
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">

      <div className="flex flex-col items-center">

        {/* Logo */}

        <img
          src={
            society?.logo ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              society?.societyName || "Society"
            )}`
          }
          alt="Society Logo"
          onClick={() => setShowLogo(true)}
          className="
            w-36
            h-36
            rounded-full
            object-cover
            border-4
            border-blue-600
            cursor-pointer
            hover:scale-105
            transition
          "
        />

        {/* Upload Button */}

        {editMode && (
          <label
            className="
              mt-5
              bg-slate-800
              hover:bg-slate-900
              text-white
              px-5
              py-2
              rounded-xl
              cursor-pointer
              transition
            "
          >
            Change Logo

            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleLogoUpload}
            />
          </label>
        )}

        {/* Society Name */}

        <h2 className="text-3xl font-bold mt-6 text-center break-words">
          {editMode
            ? formData.societyName
            : society?.societyName}
        </h2>

        {/* Email */}

        <p className="text-gray-500 mt-2 break-all">
          {society?.email}
        </p>

        {/* Society Type */}

        <p className="text-blue-600 font-semibold mt-1">
          {editMode
            ? formData.societyType
            : society?.societyType || "Not Added"}
        </p>

        {/* Buttons */}

        <div className="flex gap-4 mt-8">

          {editMode ? (
            <>
              <button
                onClick={updateProfile}
                className="
                  bg-green-600
                  hover:bg-green-700
                  text-white
                  px-6
                  py-3
                  rounded-xl
                  transition
                "
              >
                Save Changes
              </button>

              <button
                onClick={handleCancel}
                className="
                  bg-gray-500
                  hover:bg-gray-600
                  text-white
                  px-6
                  py-3
                  rounded-xl
                  transition
                "
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-6
                py-3
                rounded-xl
                transition
              "
            >
              <Pencil
                size={18}
                className="inline mr-2"
              />

              Edit Profile
            </button>
          )}

        </div>

      </div>

    </div>
  );
}

export default ProfileHeader;