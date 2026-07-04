import { Trophy } from "lucide-react";

function PopularEventCard({ event }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">

      <div className="flex items-center gap-3 mb-5">

        <div className="bg-yellow-100 p-3 rounded-full">
          <Trophy
            size={26}
            className="text-yellow-600"
          />
        </div>

        <h2 className="text-xl font-bold text-slate-800">
          Most Popular Event
        </h2>

      </div>

      <div className="space-y-3">

        <p className="text-lg font-semibold text-slate-700">
          {event?.title || "N/A"}
        </p>

        <p className="text-gray-500">
          Registrations :
          <span className="font-bold text-blue-600 ml-2">
            {event?.registrations || 0}
          </span>
        </p>

      </div>

    </div>
  );
}

export default PopularEventCard;