import { CalendarDays, MapPin, Users, Eye } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import { getEventDetails } from "../../../../services/adminServices";

import EventDetailsModal from "./EventDetailsModal";

function EventCard({
  event,
}) {

  const [open, setOpen] =
    useState(false);

  const [eventData, setEventData] =
    useState(null);

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

      <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition overflow-hidden">

        {/* Banner */}

        <img
          src={
            event.banner
              ? event.banner
              : "https://placehold.co/600x300?text=Campus+Connect"
          }
          alt={event.title}
          className="w-full h-48 object-cover"
        />

        {/* Content */}

        <div className="p-6">

          <div className="flex justify-between items-start">

            <h2 className="text-xl font-bold">

              {event.title}

            </h2>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                event.status === "Upcoming"
                  ? "bg-blue-100 text-blue-700"
                  : event.status === "Ongoing"
                  ? "bg-green-100 text-green-700"
                  : event.status === "Completed"
                  ? "bg-gray-100 text-gray-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {event.status}
            </span>

          </div>

          <p className="text-blue-600 mt-2 font-medium">

            {event.organizer?.societyName}

          </p>

          <div className="space-y-3 mt-5">

            <div className="flex items-center gap-2 text-gray-600">

              <CalendarDays size={18} />

              <span>

                {new Date(event.date).toLocaleDateString("en-GB")}

              </span>

            </div>

            <div className="flex items-center gap-2 text-gray-600">

              <MapPin size={18} />

              <span>{event.venue}</span>

            </div>

            <div className="flex items-center gap-2 text-gray-600">

              <Users size={18} />

              <span>

                Registrations : {event.totalRegistrations}

              </span>

            </div>

          </div>

          <button
            onClick={handleView}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex justify-center items-center gap-2 transition"
          >

            <Eye size={18} />

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