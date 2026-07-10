import { Eye } from "lucide-react";

function SocietyCard({
    society,
    onView,
}) {
    return (

        <div
            className="
    w-full
    bg-white
    rounded-3xl
    border
    border-slate-200
    shadow-sm
    hover:shadow-lg
    transition-all
    duration-300
  "
        >

            {/* Logo */}

            <div className="flex justify-center pt-10">
                <img
                    src={
                        society.logo
                            ? society.logo
                            : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                society.societyName
                            )}&background=f8fafc&color=111827`
                    }
                    alt={society.societyName}
                    className="
  w-24
  h-24
  rounded-full
  object-cover
  border-2
  border-slate-300
  p-1
  bg-white
  shadow-sm
"
                />
            </div>

            {/* Content */}

            <div className="p-6 text-center">

                <h2
                    className="
    text-2xl
    font-semibold
    text-slate-700
    tracking-tight
  "
                >
                    {society.societyName}
                </h2>

                <p
                    className="
    mt-3
    text-base
    font-semibold
    text-slate-600
    tracking-wide
  "
                >
                    {society.societyType}
                </p>

                {/* Button */}

                <button
                    onClick={() => onView(society)}
                    className="
            mt-6
            w-full
            bg-white
            border
            border-slate-300
            hover:bg-slate-100
            text-slate-800
            py-2.5
            rounded-xl
            flex
            justify-center
            items-center
            gap-2
            font-semibold
            transition
          "
                >
                    <Eye size={17} />
                    View Details
                </button>

            </div>
        </div>
    );
}

export default SocietyCard;