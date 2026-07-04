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
    <div className="mt-8 bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-bold text-slate-800 mb-8">
        Social Links
      </h2>

      {editMode ? (

        <div className="space-y-6">

          {/* Instagram */}

          <div>
            <label className="block text-sm text-gray-500 mb-2">
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
              className="w-full border rounded-xl px-4 py-3 outline-none focus:border-pink-500"
            />
          </div>

          {/* LinkedIn */}

          <div>
            <label className="block text-sm text-gray-500 mb-2">
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
              className="w-full border rounded-xl px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          {/* Website */}

          <div>
            <label className="block text-sm text-gray-500 mb-2">
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
              className="w-full border rounded-xl px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

        </div>

      ) : (

        <div className="space-y-5">

          {society?.socialLinks?.instagram && (
            <a
              href={society.socialLinks.instagram}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 border rounded-2xl p-5 hover:bg-pink-50 transition"
            >
              <FaInstagram className="text-pink-600 text-2xl flex-shrink-0" />

              <span className="break-all">
                {society.socialLinks.instagram}
              </span>
            </a>
          )}

          {society?.socialLinks?.linkedin && (
            <a
              href={society.socialLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 border rounded-2xl p-5 hover:bg-blue-50 transition"
            >
              <FaLinkedin className="text-blue-700 text-2xl flex-shrink-0" />

              <span className="break-all">
                {society.socialLinks.linkedin}
              </span>
            </a>
          )}

          {society?.socialLinks?.website && (
            <a
              href={society.socialLinks.website}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 border rounded-2xl p-5 hover:bg-green-50 transition"
            >
              <FaGlobe className="text-green-700 text-2xl flex-shrink-0" />

              <span className="break-all">
                {society.socialLinks.website}
              </span>
            </a>
          )}

          {!society?.socialLinks?.instagram &&
            !society?.socialLinks?.linkedin &&
            !society?.socialLinks?.website && (
              <div className="text-center py-8 text-gray-500">
                No Social Links Added
              </div>
            )}

        </div>

      )}

    </div>
  );
}

export default SocialLinks;