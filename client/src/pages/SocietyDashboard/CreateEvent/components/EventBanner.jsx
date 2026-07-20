import { ImagePlus, Trash2 } from "lucide-react";

function EventBanner({
  formData,
  setFormData,
}) {
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData({
      ...formData,
      banner: file,
    });
  };

  const removeBanner = () => {
    setFormData({
      ...formData,
      banner: null,
    });
  };

  // Banner Preview
  const bannerPreview =
    !formData.banner
      ? null
      : typeof formData.banner ===
        "string"
      ? formData.banner
      : URL.createObjectURL(
          formData.banner
        );

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-6 lg:p-8 mb-6 sm:mb-8">

      {/* Heading */}

      <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-5 sm:mb-6">
        Event Banner
      </h2>

      {bannerPreview ? (

        <div className="relative">

          <img
            src={bannerPreview}
            alt="Event Banner"
            className="w-full h-52 sm:h-64 lg:h-72 object-cover rounded-2xl border"
          />

          <button
            type="button"
            onClick={removeBanner}
            className="
              absolute
              top-3
              right-3
              sm:top-4
              sm:right-4
              bg-red-600
              hover:bg-red-700
              text-white
              p-2.5
              sm:p-3
              rounded-full
              transition
            "
          >
            <Trash2 size={18} />
          </button>

        </div>

      ) : (

        <label
          className="
            w-full
            h-52
            sm:h-64
            lg:h-72
            border-2
            border-dashed
            border-gray-300
            rounded-2xl
            flex
            flex-col
            justify-center
            items-center
            text-center
            px-4
            cursor-pointer
            hover:border-blue-600
            hover:bg-blue-50
            transition
          "
        >

          <ImagePlus
            size={48}
            className="text-gray-400 sm:w-[55px] sm:h-[55px]"
          />

          <p className="mt-4 text-base sm:text-lg font-medium text-gray-500 break-words">
            Click to Upload Event Banner
          </p>

          <span className="mt-2 text-xs sm:text-sm text-gray-400">
            JPG, JPEG, PNG
          </span>

          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImage}
          />

        </label>

      )}

    </div>
  );
}

export default EventBanner;