import {
  Calendar,
  MapPin,
  ArrowRight,
  MoreVertical,
  Award,
  MessageSquare,
} from "lucide-react";

import { useState, useRef, useEffect } from "react";

function RegistrationCard({
  registration,
  onView,
  onCertificate,
  onFeedback,
}) {
  const event = registration.event;

  const [menuOpen, setMenuOpen] =
    useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const statusColor = {
    Upcoming:
      "bg-green-100 text-green-700",

    Ongoing:
      "bg-yellow-100 text-yellow-700",

    Completed:
      "bg-gray-100 text-gray-700",
  };

  return (
    <div
      className="
        w-full
        bg-white
        rounded-2xl
        sm:rounded-3xl
        shadow-md
        hover:shadow-xl
        transition-all
        duration-300
        overflow-hidden
      "
    >
      {/* Banner */}

      <div className="relative">

        <img
          src={
            event.banner
              ? event.banner
              : "https://placehold.co/700x350/e2e8f0/64748b?text=Event"
          }
          alt={event.title}
          className="
            w-full
            h-36
            sm:h-40
            object-cover
          "
        />

        {/* Status */}

        <div className="absolute top-3 right-3">

          <span
            className={`
              px-3
              py-1
              rounded-full
              text-xs
              font-semibold
              ${statusColor[event.status]}
            `}
          >
            {event.status}
          </span>

        </div>

      </div>

      {/* Body */}

      <div className="p-4 sm:p-5">

        <div className="flex justify-between items-start gap-2">

          <h2
            className="
              flex-1
              text-lg
              sm:text-xl
              font-bold
              leading-6
              line-clamp-2
              break-words
            "
          >
            {event.title}
          </h2>

          {event.status === "Completed" && (

            <div
              className="relative shrink-0"
              ref={menuRef}
            >

              <button
                onClick={() =>
                  setMenuOpen(!menuOpen)
                }
                className="
                  p-2
                  rounded-lg
                  hover:bg-slate-100
                  transition
                "
              >
                <MoreVertical size={18} />
              </button>

              {menuOpen && (

                <div
                  className="
                    absolute
                    right-0
                    mt-2
                    w-56
                    bg-white
                    rounded-2xl
                    shadow-xl
                    border
                    overflow-hidden
                    z-50
                  "
                >

                  {event.registrationMode ===
                    "Participant" &&
                    registration.status ===
                      "Attended" &&
                    registration.certificateGenerated && (

                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          onCertificate(
                            registration
                          );
                        }}
                        className="
                          w-full
                          flex
                          items-center
                          gap-3
                          px-4
                          py-3
                          hover:bg-slate-100
                          transition
                          text-sm
                        "
                      >

                        <Award
                          size={18}
                          className="shrink-0"
                        />

                        Download Certificate

                      </button>

                    )}

                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onFeedback(
                        registration
                      );
                    }}
                    className="
                      w-full
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3
                      hover:bg-slate-100
                      transition
                      text-sm
                    "
                  >

                    <MessageSquare
                      size={18}
                      className="shrink-0"
                    />

                    Give Feedback

                  </button>

                </div>

              )}

            </div>

          )}

        </div>

        {/* Society */}

        <p
          className="
            mt-2
            text-blue-600
            text-sm
            font-medium
            break-words
          "
        >
          {event.organizer?.societyName}
        </p>

        {/* Venue */}

        <div className="flex items-center gap-2 mt-4 text-gray-600">

          <MapPin
            size={16}
            className="text-red-500 shrink-0"
          />

          <span
            className="
              text-sm
              line-clamp-1
              break-words
            "
          >
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

            {new Date(
              event.date
            ).toLocaleDateString(
              "en-IN",
              {
                day: "numeric",
                month: "short",
                year: "numeric",
              }
            )}

          </span>

        </div>

        {/* View */}

        <button
          onClick={() =>
            onView(registration)
          }
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
            text-sm
            sm:text-base
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
  );
}

export default RegistrationCard;