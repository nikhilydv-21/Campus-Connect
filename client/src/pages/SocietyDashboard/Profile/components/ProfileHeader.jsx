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

    <div
      className="
        mb-6
        sm:mb-8
        rounded-2xl
        sm:rounded-3xl
        bg-white
        shadow-lg
        p-5
        sm:p-8
      "
    >

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
            h-28
            w-28
            sm:h-36
            sm:w-36
            rounded-full
            border-4
            border-blue-600
            object-cover
            cursor-pointer
            transition
            hover:scale-105
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
                setLogoMenu(!logoMenu)
              }
              className="
                flex
                items-center
                gap-1
                text-sm
                text-gray-700
                transition
                hover:text-black
              "
            >

              Logo

              <ChevronDown size={16} />

            </button>

            {logoMenu && (

              <div
                className="
                  absolute
                  left-1/2
                  top-8
                  z-50
                  w-48
                  sm:w-52
                  -translate-x-1/2
                  overflow-hidden
                  rounded-2xl
                  border
                  bg-white
                  shadow-xl
                "
              >

                {/* Change Logo */}

                <label
                  className="
                    flex
                    cursor-pointer
                    items-center
                    gap-3
                    px-4
                    sm:px-5
                    py-3
                    text-sm
                    transition
                    hover:bg-slate-100
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
                      flex
                      w-full
                      items-center
                      gap-3
                      px-4
                      sm:px-5
                      py-3
                      text-sm
                      text-red-600
                      transition
                      hover:bg-red-50
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

        <h2
          className="
            mt-6
            text-center
            text-2xl
            sm:text-3xl
            font-bold
            break-words
          "
        >

          {editMode
            ? formData.societyName
            : society?.societyName}

        </h2>

        {/* Email */}

        <p
          className="
            mt-2
            break-all
            text-sm
            sm:text-base
            text-gray-500
          "
        >

          {society?.email}

        </p>

        {/* Society Type */}

        <p
          className="
            mt-1
            text-sm
            sm:text-base
            font-semibold
            text-slate-700
          "
        >

          {editMode
            ? formData.societyType
            : society?.societyType ||
              "Not Added"}

        </p>

        {/* Buttons */}

        <div
          className="
            mt-8
            flex
            w-full
            flex-col
            gap-3
            sm:w-auto
            sm:flex-row
            sm:gap-4
          "
        >
                    {editMode ? (

            <>

              <button
                onClick={updateProfile}
                className="
                  w-full
                  sm:w-auto
                  rounded-xl
                  bg-green-600
                  px-6
                  py-3
                  text-sm
                  sm:text-base
                  text-white
                  transition
                  hover:bg-green-700
                "
              >

                Save Changes

              </button>

              <button
                onClick={handleCancel}
                className="
                  w-full
                  sm:w-auto
                  rounded-xl
                  bg-gray-500
                  px-6
                  py-3
                  text-sm
                  sm:text-base
                  text-white
                  transition
                  hover:bg-gray-600
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
                rounded-xl
                bg-blue-600
                px-6
                py-3
                text-sm
                sm:text-base
                text-white
                transition
                hover:bg-blue-700
              "
            >

              <Pencil
                size={18}
                className="mr-2 inline"
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