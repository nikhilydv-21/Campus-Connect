import { Trophy } from "lucide-react";

function PopularEventCard({ event }) {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-6">

      {/* Header */}

      <div className="flex items-center gap-3 mb-5">

        <div className="bg-yellow-100 p-3 rounded-full shrink-0">

          <Trophy
            size={26}
            className="text-yellow-600"
          />

        </div>

        <h2 className="text-lg sm:text-xl font-bold text-slate-800 break-words">
          Most Popular Event
        </h2>

      </div>

      {/* Content */}

      <div className="space-y-3">

        <p className="text-base sm:text-lg font-semibold text-slate-700 break-words">
          {event?.title || "N/A"}
        </p>

        <p className="text-sm sm:text-base text-gray-500 break-words">
          Registrations :
          <span className="ml-2 font-bold text-blue-600">
            {event?.registrations || 0}
          </span>
        </p>

      </div>

    </div>
  );
}

export default PopularEventCard;