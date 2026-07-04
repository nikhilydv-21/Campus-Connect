import {
  Calendar,
  MapPin,
  Users,
  X,
} from "lucide-react";

function EventDetailsModal({
  open,
  setOpen,
  event,
}) {
  if (!open || !event) return null;

  return (
    <div
      onClick={() => setOpen(false)}
      className="
        fixed
        inset-0
        bg-black/50
        flex
        justify-center
        items-center
        z-50
        p-5
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          bg-white
          rounded-3xl
          max-w-3xl
          w-full
          overflow-hidden
        "
      >
        {/* Banner */}

        {event.banner ? (
          <img
            src={event.banner}
            alt={event.title}
            className="w-full h-72 object-cover"
          />
        ) : (
          <div className="w-full h-72 bg-slate-200 flex items-center justify-center">
            No Banner
          </div>
        )}

        <div className="p-8">

          <div className="flex justify-between items-start">

            <h2 className="text-3xl font-bold">
              {event.title}
            </h2>

            <button
              onClick={() => setOpen(false)}
            >
              <X size={28} />
            </button>

          </div>

          <div className="space-y-5 mt-8">

            <div className="flex items-center gap-3">
              <MapPin className="text-red-500" />
              <span>{event.venue}</span>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="text-blue-600" />
              <span>
                {new Date(
                  event.date
                ).toLocaleDateString()}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Users className="text-green-600" />
              <span>
                Total Registrations :
                {" "}
                {event.totalRegistrations}
              </span>
            </div>

            <div className="flex justify-between">

              <span className="font-medium">
                Registration Mode
              </span>

              <span>
                {event.registrationMode}
              </span>

            </div>

          </div>

          <div className="flex justify-end mt-8">

            <button
              onClick={() => setOpen(false)}
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-8
                py-3
                rounded-xl
              "
            >
              Close
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default EventDetailsModal;