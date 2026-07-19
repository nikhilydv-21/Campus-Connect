import {
  Calendar,
  MapPin,
  Eye,
} from "lucide-react";

import { useState } from "react";
import toast from "react-hot-toast";

import { getEventDetails } from "../../../../services/adminServices";

import EventDetailsModal from "./EventDetailsModal";

function EventCard({
  event,
}) {
  const [open, setOpen] = useState(false);
  const [eventData, setEventData] = useState(null);

  const handleView = async () => {
    try {
      const response =
        await getEventDetails(
          event._id
        );

      setEventData(response);
      setOpen(true);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to load event details"
      );

    }
  };

  return (
    <>
      <div
        className="
          w-full
          bg-white
          rounded-3xl
          shadow-md
          hover:shadow-xl
          transition-all
          duration-300
          overflow-hidden
        "
      >

        {/* Banner */}

        <div className="relative">

          {event.banner ? (

            <img
              src={event.banner}
              alt={event.title}
              className="w-full h-36 sm:h-40 object-cover"
            />

          ) : (

            <div className="w-full h-36 sm:h-40 bg-slate-200 flex items-center justify-center text-gray-500">

              No Banner

            </div>

          )}

          {/* Status */}

          <div className="absolute top-3 right-3">

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold
                ${
                  event.status === "Upcoming"
                    ? "bg-green-100 text-green-700"
                    : event.status === "Ongoing"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
            >
              {event.status}
            </span>

          </div>

        </div>

        {/* Body */}

        <div className="p-4 sm:p-5">

          {/* Title */}

          <h2 className="text-lg sm:text-xl font-bold leading-6 line-clamp-2 break-words">
            {event.title}
          </h2>

          {/* Society */}

          <p className="mt-2 text-sm sm:text-base text-slate-600 font-medium break-words">
            {event.organizer?.societyName}
          </p>

          {/* Venue */}

          <div className="flex items-center gap-2 mt-4 text-gray-600">

            <MapPin
              size={16}
              className="text-red-500 shrink-0"
            />

            <span className="text-sm line-clamp-1 break-words">
              {event.venue}
            </span>

          </div>

          {/* Date */}

          <div className="flex items-center gap-2 mt-2 text-gray-600">

            <Calendar
              size={16}
              className="text-blue-600 shrink-0"
            />

            <span className="text-sm">
              {new Date(event.date).toLocaleDateString(
                "en-IN",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }
              )}
            </span>

          </div>

          {/* View Details */}

          <button
            onClick={handleView}
            className="
              mt-5
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

      <EventDetailsModal
        open={open}
        setOpen={setOpen}
        event={eventData?.event}
        registrations={eventData?.registrations}
        seatsLeft={eventData?.seatsLeft}
      />
    </>
  );
}

export default EventCard;