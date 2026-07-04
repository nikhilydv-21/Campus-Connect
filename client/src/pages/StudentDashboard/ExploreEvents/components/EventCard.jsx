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

      // Liked Events page se unlike hote hi remove
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

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300">

      {/* Banner */}

      <div className="relative">

        <img
          src={
            event.banner
              ? event.banner
              : "https://placehold.co/700x350"
          }
          alt={event.title}
          className="w-full h-52 object-cover"
        />

        <div className="absolute top-4 right-4">

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
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

      <div className="p-6">

        <p className="text-sm text-blue-600 font-semibold">
          {event.organizer?.societyName}
        </p>

        <h2 className="text-2xl font-bold mt-2 line-clamp-2">
          {event.title}
        </h2>

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

          {event.registrationMode ===
            "Participant" && (

            <div className="flex items-center gap-2 text-gray-600">

              <Users size={18} />

              <span>
                {event.totalRegistrations} /
                {event.maximumParticipants}
              </span>

            </div>

          )}

        </div>

        {/* Footer */}

        <div className="flex justify-between items-center mt-8">

          <button
            onClick={handleLike}
            className={`flex items-center gap-2 transition ${
              liked
                ? "text-red-500"
                : "text-gray-500 hover:text-red-500"
            }`}
          >

            <Heart
              size={20}
              fill={
                liked
                  ? "currentColor"
                  : "none"
              }
            />

            <span className="font-medium">
              {likes}
            </span>

          </button>

          <button
            onClick={() => onView(event)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl flex items-center gap-2 transition"
          >

            View Details

            <ArrowRight size={18} />

          </button>

        </div>

      </div>

    </div>
  );
}

export default EventCard;