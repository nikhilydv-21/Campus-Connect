import { ImagePlus, Trash2 } from "lucide-react";

function EventBanner({ formData, setFormData }) {
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
      : typeof formData.banner === "string"
      ? formData.banner
      : URL.createObjectURL(formData.banner);

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        Event Banner
      </h2>

      {bannerPreview ? (
        <div className="relative">
          <img
            src={bannerPreview}
            alt="Event Banner"
            className="w-full h-72 object-cover rounded-2xl border"
          />

          <button
            type="button"
            onClick={removeBanner}
            className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ) : (
        <label
          className="
            w-full
            h-72
            border-2
            border-dashed
            border-gray-300
            rounded-2xl
            flex
            flex-col
            justify-center
            items-center
            cursor-pointer
            hover:border-blue-600
            hover:bg-blue-50
            transition
          "
        >
          <ImagePlus
            size={55}
            className="text-gray-400"
          />

          <p className="mt-4 text-gray-500 font-medium">
            Click to Upload Event Banner
          </p>

          <span className="text-sm text-gray-400 mt-2">
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