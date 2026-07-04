import {
  Calendar,
  MapPin,
  ArrowRight,
} from "lucide-react";

function RegistrationCard({
  registration,
  onView,
}) {
  const event = registration.event;

  return (
    <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">

      {/* Banner */}

      <img
        src={
          event.banner
            ? event.banner
            : "https://placehold.co/700x350/e2e8f0/64748b?text=Event"
        }
        alt={event.title}
        className="w-full h-52 object-cover"
      />

      {/* Body */}

      <div className="p-6">

        <div className="flex justify-between items-center">

          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              event.status === "Upcoming"
                ? "bg-green-100 text-green-700"
                : event.status === "Ongoing"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {event.status}
          </span>

          <span className="text-sm text-gray-500">
            Registered
          </span>

        </div>

        <h2 className="text-2xl font-bold text-slate-800 mt-4 line-clamp-2">
          {event.title}
        </h2>

        <p className="text-blue-600 font-semibold mt-2">
          {event.organizer?.societyName}
        </p>

        <div className="mt-5 space-y-3">

          <div className="flex items-center gap-2 text-gray-600">

            <MapPin size={18} />

            <span>{event.venue}</span>

          </div>

          <div className="flex items-center gap-2 text-gray-600">

            <Calendar size={18} />

            <span>
              {new Date(event.date).toLocaleDateString(
                "en-IN",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              )}
            </span>

          </div>

        </div>

        <button
          onClick={() => onView(registration)}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2 transition"
        >

          View Details

          <ArrowRight size={18} />

        </button>

      </div>

    </div>
  );
}

export default RegistrationCard;