import {
  Calendar,
  MapPin,
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
    <div className="w-full bg-white rounded-2xl sm:rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">

      {/* Banner */}

      <div className="relative">

        <img
          src={
            event.banner
              ? event.banner
              : "https://placehold.co/700x350/e2e8f0/64748b?text=Event"
          }
          alt={event.title}
          className="w-full h-36 sm:h-40 object-cover"
        />

        <div className="absolute top-3 right-3">

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[event.status]}`}
          >
            {event.status}
          </span>

        </div>

      </div>

      {/* Body */}

      <div className="p-4 sm:p-5">

        {/* Society */}

        <p className="text-blue-600 text-sm font-medium break-words">
          {event.organizer?.societyName}
        </p>

        {/* Title */}

        <h2 className="text-lg sm:text-xl font-bold leading-6 mt-2 line-clamp-2 break-words">
          {event.title}
        </h2>

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
                break-words
              "
            >
              {event.totalRegistrations} /{" "}
              {event.maximumParticipants} Registered
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

        <div className="flex justify-between items-center mt-6 gap-4">

          {/* Like */}

          <button
            onClick={handleLike}
            className={`flex items-center gap-2 transition shrink-0 ${
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
              flex-1
              sm:flex-none
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
              justify-center
              gap-2
              font-semibold
              transition
            "
          >
            View Details

            <ArrowRight
              size={17}
              className="shrink-0"
            />

          </button>

        </div>

      </div>

    </div>
  );
}

export default EventCard;