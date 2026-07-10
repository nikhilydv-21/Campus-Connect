import {
  Calendar,
  MapPin,
  Users,
  Heart,
  ArrowRight,
} from "lucide-react";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  toggleLikeEvent,
} from "../../../../services/studentServices";

function EventCard({
  event,
  onView,
  onUnlike,
}) {

  const [likes, setLikes] = useState(
    event.likes || 0
  );

  const [liked, setLiked] = useState(
    event.isLiked || false
  );

  useEffect(() => {

    setLikes(event.likes || 0);

    setLiked(event.isLiked || false);

  }, [event]);

  const handleLike = async () => {

    try {

      const response =
        await toggleLikeEvent(event._id);

      setLiked(response.liked);

      setLikes(response.likes);

      if (!response.liked && onUnlike) {

        onUnlike(event._id);

      }

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Unable to like event"
      );

    }

  };

  const statusColor = {

    Upcoming:
      "bg-green-100 text-green-700",

    Ongoing:
      "bg-yellow-100 text-yellow-700",

    Completed:
      "bg-gray-100 text-gray-700",

  };

  return (

    <div className="w-full max-w-[340px] bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">

      {/* Banner */}

      <div className="relative">

        <img
          src={
            event.banner
              ? event.banner
              : "https://placehold.co/700x350/e2e8f0/64748b?text=Event"
          }
          alt={event.title}
          className="w-full h-36 object-cover"
        />

        {/* Status */}

        <div className="absolute top-3 right-3">

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[event.status]}`}
          >

            {event.status}

          </span>

        </div>

      </div>

      {/* Body */}

      <div className="p-4">

        {/* Society */}

        <p className="text-blue-600 text-sm font-medium">

          {event.organizer?.societyName}

        </p>

        {/* Title */}

        <h2 className="text-lg font-bold leading-6 mt-2 line-clamp-2">

          {event.title}

        </h2>

        {/* Venue */}

        <div className="flex items-center gap-2 mt-4 text-gray-600">

          <MapPin
            size={16}
            className="text-red-500"
          />

          <span className="text-sm line-clamp-1">

            {event.venue}

          </span>

        </div>

        {/* Date */}

        <div className="flex items-center gap-2 mt-2 text-gray-600">

          <Calendar
            size={16}
            className="text-blue-600"
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

        {/* Registration */}

        <div className="mt-4">

          {event.registrationMode ===
          "Participant" ? (

            <span
              className="
                inline-flex
                items-center
                px-3
                py-1
                rounded-full
                text-xs
                font-semibold
                bg-emerald-100
                text-emerald-700
              "
            >

              {event.totalRegistrations} / {event.maximumParticipants} Registered

            </span>

          ) : (

            <span
              className="
                inline-flex
                items-center
                px-3
                py-1
                rounded-full
                text-xs
                font-semibold
                bg-blue-100
                text-blue-700
              "
            >

              👀 View Only Event

            </span>

          )}

        </div>
                {/* Footer */}

        <div className="flex justify-between items-center mt-6">

          {/* Like */}

          <button
            onClick={handleLike}
            className={`flex items-center gap-2 transition ${
              liked
                ? "text-red-500"
                : "text-gray-500 hover:text-red-500"
            }`}
          >

            <Heart
              size={19}
              fill={
                liked
                  ? "currentColor"
                  : "none"
              }
            />

            <span className="font-medium text-sm">

              {likes}

            </span>

          </button>

          {/* View Details */}

          <button
            onClick={() => onView(event)}
            className="
              bg-white
              border
              border-slate-300
              hover:bg-slate-100
              text-slate-800
              px-4
              py-2.5
              rounded-xl
              flex
              items-center
              gap-2
              font-semibold
              transition
            "
          >

            View Details

            <ArrowRight size={17} />

          </button>

        </div>

      </div>

    </div>

  );

}

export default EventCard;