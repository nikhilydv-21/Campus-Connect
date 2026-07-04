import {
  Calendar,
  Clock,
  Users,
  Edit,
  Trash2,
} from "lucide-react";

function EventCard({
  event,
  onEdit,
  onDelete,
}) {
  const statusColor = {
    Upcoming: "bg-blue-100 text-blue-700",
    Ongoing: "bg-green-100 text-green-700",
    Completed: "bg-gray-200 text-gray-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition">

      {/* Banner */}

      {event.banner ? (
        <img
          src={event.banner}
          alt={event.title}
          className="w-full h-56 object-cover"
        />
      ) : (
        <div className="w-full h-56 bg-slate-200 flex items-center justify-center text-gray-500">
          No Banner Available
        </div>
      )}

      <div className="p-6">

        {/* Title */}

        <div className="flex justify-between items-start gap-4">

          <h2 className="text-2xl font-bold break-words">
            {event.title}
          </h2>

          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              statusColor[event.status]
            }`}
          >
            {event.status}
          </span>

        </div>

        {/* Date */}

        <div className="flex items-center gap-3 mt-6">

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

        {/* Time */}

        <div className="flex items-center gap-3 mt-3">

          <Clock
            size={18}
            className="text-orange-500"
          />

          <span>
            {event.startTime} - {event.endTime}
          </span>

        </div>

        {/* Registration */}

        <div className="flex items-center gap-3 mt-3">

          <Users
            size={18}
            className="text-green-600"
          />

          <span>
            {event.registrationMode}
          </span>

        </div>

        {/* Statistics */}

        <div className="mt-6 border rounded-2xl p-4 bg-slate-50">

          <div className="flex justify-between">

            <span>Total Registrations</span>

            <span className="font-semibold">
              {event.totalRegistrations}
            </span>

          </div>

          <div className="flex justify-between mt-2">

            <span>Registration</span>

            <span
              className={
                event.isRegistrationOpen
                  ? "text-green-600 font-semibold"
                  : "text-red-600 font-semibold"
              }
            >
              {event.isRegistrationOpen
                ? "Open"
                : "Closed"}
            </span>

          </div>

        </div>

        {/* Buttons */}

        <div className="grid grid-cols-2 gap-4 mt-6">

          <button
            onClick={() => onEdit(event._id)}
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              py-3
              rounded-xl
              flex
              justify-center
              items-center
              gap-2
            "
          >
            <Edit size={18} />
            Edit
          </button>

          <button
            onClick={() => onDelete(event)}
            className="
              bg-red-600
              hover:bg-red-700
              text-white
              py-3
              rounded-xl
              flex
              justify-center
              items-center
              gap-2
            "
          >
            <Trash2 size={18} />
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default EventCard;