import {
  useState,
  useRef,
  useEffect,
} from "react";

import {
  Pencil,
  Upload,
  Trash2,
  ChevronDown,
} from "lucide-react";

function ProfileHeader({
  student,
  editMode,
  setEditMode,
  updateProfile,
  formData,
  setFormData,
  handleImageUpload,
  handleRemovePicture,
  setShowImage,
}) {
  const [pictureMenu, setPictureMenu] =
    useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setPictureMenu(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleCancel = () => {
    setEditMode(false);

    setPictureMenu(false);

    setFormData({
      fullName:
        student?.fullName || "",

      year:
        student?.year || "",

      contactNumber:
        student?.contactNumber || "",

      bio:
        student?.bio || "",

      skills:
        student?.skills || [],

      interests:
        student?.interests || [],
    });
  };

  return (
    <div className="flex flex-col items-center">

      {/* Profile Picture */}

      <img
        src={
          student?.profilePicture ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            student?.fullName ||
              "Student"
          )}`
        }
        alt="Profile"
        onClick={() =>
          setShowImage(true)
        }
        className="
          w-28
          h-28
          sm:w-36
          sm:h-36
          rounded-full
          object-cover
          border-4
          border-blue-600
          cursor-pointer
          hover:scale-105
          transition
          shrink-0
        "
      />

      {/* Manage Picture */}

      {editMode && (
        <div
          ref={menuRef}
          className="relative mt-4"
        >
          <button
            onClick={() =>
              setPictureMenu(
                !pictureMenu
              )
            }
            className="
              flex
              items-center
              gap-1
              text-sm
              text-gray-700
              hover:text-black
              transition
            "
          >
            Picture

            <ChevronDown
              size={16}
            />
          </button>

          {pictureMenu && (
            <div
              className="
                absolute
                top-8
                left-1/2
                -translate-x-1/2
                w-56
                bg-white
                rounded-2xl
                border
                shadow-xl
                overflow-hidden
                z-50
              "
            >
              {/* Change Picture */}

              <label
                className="
                  flex
                  items-center
                  gap-3
                  px-5
                  py-3
                  text-sm
                  cursor-pointer
                  hover:bg-slate-100
                  transition
                "
              >
                <Upload
                  size={16}
                  className="shrink-0"
                />

                Change Picture

                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    handleImageUpload(e);
                    setPictureMenu(false);
                  }}
                />
              </label>

              {/* Remove Picture */}

              {student?.profilePicture && (
                <button
                  type="button"
                  onClick={() => {
                    handleRemovePicture();
                    setPictureMenu(false);
                  }}
                  className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-5
                    py-3
                    text-sm
                    text-red-600
                    hover:bg-red-50
                    transition
                  "
                >
                  <Trash2
                    size={16}
                    className="shrink-0"
                  />

                  Remove Picture
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Name */}

      <h2 className="mt-5 sm:mt-6 text-2xl sm:text-3xl font-bold text-center break-words">
        {editMode
          ? formData.fullName
          : student?.fullName}
      </h2>

      {/* Roll Number */}

      <p className="mt-2 text-sm sm:text-base text-gray-500 break-all text-center">
        {student?.rollNumber}
      </p>

      {/* Buttons */}

      <div
        className="
          flex
          flex-col
          sm:flex-row
          gap-3
          sm:gap-4
          mt-5
          w-full
          sm:w-auto
        "
      >
        {editMode ? (
          <>
            <button
              onClick={
                updateProfile
              }
              className="
                w-full
                sm:w-auto
                bg-green-600
                hover:bg-green-700
                text-white
                px-6
                py-3
                rounded-xl
                transition
                font-semibold
              "
            >
              Save Changes
            </button>

            <button
              onClick={
                handleCancel
              }
              className="
                w-full
                sm:w-auto
                bg-gray-500
                hover:bg-gray-600
                text-white
                px-6
                py-3
                rounded-xl
                transition
                font-semibold
              "
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() =>
              setEditMode(true)
            }
            className="
              w-full
              sm:w-auto
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-3
              rounded-xl
              transition
              font-semibold
              flex
              items-center
              justify-center
              gap-2
            "
          >
            <Pencil
              size={18}
              className="shrink-0"
            />

            Edit Profile
          </button>
        )}
      </div>

    </div>
  );
}

export default ProfileHeader;