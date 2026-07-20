import {
  FaInstagram,
  FaLinkedin,
  FaGlobe,
} from "react-icons/fa";

function SocialLinks({
  society,
  editMode,
  formData,
  setFormData,
}) {

  return (

    <div
      className="
        mt-6
        sm:mt-8
        rounded-2xl
        sm:rounded-3xl
        bg-white
        shadow-lg
        p-5
        sm:p-8
      "
    >

      <h2
        className="
          mb-6
          sm:mb-8
          text-xl
          sm:text-2xl
          font-bold
          text-slate-800
        "
      >

        Social Links

      </h2>

      {editMode ? (

        <div className="space-y-5 sm:space-y-6">

          {/* Instagram */}

          <div>

            <label className="mb-2 block text-sm text-gray-500">

              Instagram

            </label>

            <input
              type="url"
              placeholder="https://instagram.com/yourpage"
              value={formData.socialLinks?.instagram || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialLinks: {
                    ...formData.socialLinks,
                    instagram: e.target.value,
                  },
                })
              }
              className="
                w-full
                rounded-xl
                border
                px-4
                py-3
                text-sm
                sm:text-base
                outline-none
                focus:border-pink-500
              "
            />

          </div>

          {/* LinkedIn */}

          <div>

            <label className="mb-2 block text-sm text-gray-500">

              LinkedIn

            </label>

            <input
              type="url"
              placeholder="https://linkedin.com/company/..."
              value={formData.socialLinks?.linkedin || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialLinks: {
                    ...formData.socialLinks,
                    linkedin: e.target.value,
                  },
                })
              }
              className="
                w-full
                rounded-xl
                border
                px-4
                py-3
                text-sm
                sm:text-base
                outline-none
                focus:border-blue-600
              "
            />

          </div>

          {/* Website */}

          <div>

            <label className="mb-2 block text-sm text-gray-500">

              Website

            </label>

            <input
              type="url"
              placeholder="https://yourwebsite.com"
              value={formData.socialLinks?.website || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialLinks: {
                    ...formData.socialLinks,
                    website: e.target.value,
                  },
                })
              }
              className="
                w-full
                rounded-xl
                border
                px-4
                py-3
                text-sm
                sm:text-base
                outline-none
                focus:border-green-600
              "
            />

          </div>

        </div>

      ) : (

        <div className="space-y-4 sm:space-y-5">

          {society?.socialLinks?.instagram && (

            <a
              href={society.socialLinks.instagram}
              target="_blank"
              rel="noreferrer"
              className="
                flex
                items-center
                gap-3
                sm:gap-4
                rounded-2xl
                border
                p-4
                sm:p-5
                transition
                hover:bg-pink-50
              "
            >

              <FaInstagram
                className="
                  shrink-0
                  text-xl
                  sm:text-2xl
                  text-pink-600
                "
              />

              <span
                className="
                  break-all
                  text-sm
                  sm:text-base
                "
              >

                {society.socialLinks.instagram}

              </span>

            </a>

          )}

          {society?.socialLinks?.linkedin && (

            <a
              href={society.socialLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              className="
                flex
                items-center
                gap-3
                sm:gap-4
                rounded-2xl
                border
                p-4
                sm:p-5
                transition
                hover:bg-blue-50
              "
            >

              <FaLinkedin
                className="
                  shrink-0
                  text-xl
                  sm:text-2xl
                  text-blue-700
                "
              />

              <span
                className="
                  break-all
                  text-sm
                  sm:text-base
                "
              >

                {society.socialLinks.linkedin}

              </span>

            </a>

          )}

          {society?.socialLinks?.website && (

            <a
              href={society.socialLinks.website}
              target="_blank"
              rel="noreferrer"
              className="
                flex
                items-center
                gap-3
                sm:gap-4
                rounded-2xl
                border
                p-4
                sm:p-5
                transition
                hover:bg-green-50
              "
            >

              <FaGlobe
                className="
                  shrink-0
                  text-xl
                  sm:text-2xl
                  text-green-700
                "
              />

              <span
                className="
                  break-all
                  text-sm
                  sm:text-base
                "
              >

                {society.socialLinks.website}

              </span>

            </a>

          )}

          {!society?.socialLinks?.instagram &&
            !society?.socialLinks?.linkedin &&
            !society?.socialLinks?.website && (

              <div
                className="
                  py-8
                  text-center
                  text-sm
                  sm:text-base
                  text-gray-500
                "
              >

                No Social Links Added

              </div>

            )}

        </div>

      )}

    </div>

  );

}

export default SocialLinks;