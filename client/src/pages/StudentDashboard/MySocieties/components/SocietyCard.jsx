import { Users, ArrowRight } from "lucide-react";

function SocietyCard({
  society,
  onView,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">

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
          className="w-28 h-28 rounded-full object-cover border-4 border-blue-100"
        />

      </div>

      {/* Details */}

      <div className="p-6 text-center">

        <h2 className="text-2xl font-bold text-slate-800">
          {society.societyName}
        </h2>

        <p className="text-gray-500 mt-2">
          {society.societyType}
        </p>

       

        {/* Button */}

        <button
          onClick={() => onView(society)}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2 transition"
        >
          View Details

          <ArrowRight size={18} />

        </button>

      </div>

    </div>
  );
}

export default SocietyCard;