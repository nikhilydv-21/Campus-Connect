import {
  Calendar,
  MapPin,
  Users,
  Eye,
} from "lucide-react";

function PastEventCard({
  event,
  onView,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition">

      {/* Banner */}

      {event.banner ? (
        <img
          src={event.banner}
          alt={event.title}
          className="
            w-full
            h-56
            object-cover
          "
        />
      ) : (
        <div
          className="
            w-full
            h-56
            bg-slate-200
            flex
            items-center
            justify-center
            text-gray-500
          "
        >
          No Banner
        </div>
      )}

      <div className="p-6">

        {/* Title */}

        <h2
          className="
            text-2xl
            font-bold
            text-slate-800
            break-words
          "
        >
          {event.title}
        </h2>

        {/* Venue */}

        <div
          className="
            flex
            items-center
            gap-3
            mt-5
          "
        >
          <MapPin
            size={18}
            className="text-red-500"
          />

          <span>
            {event.venue}
          </span>

        </div>

        {/* Date */}

        <div
          className="
            flex
            items-center
            gap-3
            mt-3
          "
        >
          <Calendar
            size={18}
            className="text-blue-600"
          />

          <span>
            {new Date(
              event.date
            ).toLocaleDateString()}
          </span>

        </div>

        {/* Registration */}

        <div
          className="
            flex
            justify-between
            mt-6
            p-4
            rounded-2xl
            bg-slate-50
          "
        >
          <div>

            <p className="text-gray-500 text-sm">
              Mode
            </p>

            <p className="font-semibold">
              {event.registrationMode}
            </p>

          </div>

          <div className="text-right">

            <p className="text-gray-500 text-sm">
              Registered
            </p>

            <p
              className="
                font-semibold
                flex
                items-center
                gap-2
                justify-end
              "
            >
              <Users size={18} />

              {event.totalRegistrations}

            </p>

          </div>

        </div>

        {/* Button */}

        <button
          onClick={() => onView(event)}
          className="
            w-full
            mt-6
            bg-blue-600
            hover:bg-blue-700
            text-white
            py-3
            rounded-xl
            flex
            items-center
            justify-center
            gap-2
          "
        >
          <Eye size={18} />

          View Details

        </button>

      </div>

    </div>
  );
}

export default PastEventCard;