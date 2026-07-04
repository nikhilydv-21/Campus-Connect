import { Building2, Eye } from "lucide-react";

function SocietyCard({
  society,
  onView,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition">

      {/* Logo */}

      <div className="flex justify-center pt-8">

        <img
          src={
            society.logo
              ? society.logo
              : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  society.societyName
                )}&background=2563eb&color=fff`
          }
          alt={society.societyName}
          className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
        />

      </div>

      {/* Content */}

      <div className="p-6 text-center">

        <h2 className="text-2xl font-bold text-slate-800">
          {society.societyName}
        </h2>

        <div className="flex justify-center mt-3">

          <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium">
            {society.societyType}
          </span>

        </div>

        <div className="mt-8">

          <button
            onClick={() => onView(society)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex justify-center items-center gap-2 transition"
          >

            <Eye size={18} />

            View Details

          </button>

        </div>

      </div>

    </div>
  );
}

export default SocietyCard;