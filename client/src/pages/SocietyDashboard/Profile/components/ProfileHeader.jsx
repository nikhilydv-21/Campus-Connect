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
  society,
  editMode,
  setEditMode,
  updateProfile,
  formData,
  setFormData,
  handleLogoUpload,
  handleRemoveLogo,
  setShowLogo,
}) {

  const [logoMenu, setLogoMenu] =
    useState(false);

  const menuRef = useRef(null);

  useEffect(() => {

    const handleClickOutside = (e) => {

      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {

        setLogoMenu(false);

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

    setLogoMenu(false);

    setFormData({

      societyName:
        society?.societyName || "",

      societyType:
        society?.societyType || "",

      facultyCoordinator:
        society?.facultyCoordinator || "",

      description:
        society?.description || "",

      vision:
        society?.vision || "",

      mission:
        society?.mission || "",

      secretaries:
        society?.secretaries || [],

      jointSecretaries:
        society?.jointSecretaries || [],

      achievements:
        society?.achievements || [],

      contacts:
        society?.contacts || [],

      socialLinks:
        society?.socialLinks || {
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
              society?.societyName ||
                "Society"
            )}`
          }
          alt="Society Logo"
          onClick={() =>
            setShowLogo(true)
          }
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

        {/* Manage Logo */}

        {editMode && (

          <div
            ref={menuRef}
            className="
              relative
              mt-4
            "
          >

            <button
              onClick={() =>
                setLogoMenu(
                  !logoMenu
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

              Logo

              <ChevronDown
                size={16}
              />

            </button>

            {logoMenu && (
                            <div
                className="
                  absolute
                  top-8
                  left-1/2
                  -translate-x-1/2
                  w-52
                  bg-white
                  rounded-2xl
                  border
                  shadow-xl
                  overflow-hidden
                  z-50
                "
              >

                {/* Change Logo */}

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

                  <Upload size={16} />

                  Change Logo

                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => {
                      handleLogoUpload(e);
                      setLogoMenu(false);
                    }}
                  />

                </label>

                {/* Remove Logo */}

                {society?.logo && (

                  <button
                    type="button"
                    onClick={() => {
                      handleRemoveLogo();
                      setLogoMenu(false);
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

                    <Trash2 size={16} />

                    Remove Logo

                  </button>

                )}

              </div>

            )}

          </div>

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

        <p className="text-slate-700 font-semibold mt-1">

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
              onClick={() =>
                setEditMode(true)
              }
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