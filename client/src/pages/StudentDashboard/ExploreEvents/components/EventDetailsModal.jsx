import { useState } from "react";
import toast from "react-hot-toast";

import {
  Calendar,
  Clock,
  MapPin,
  Users,
  X,
  Building2,
  CalendarDays,
  Tag,
} from "lucide-react";

import {
  registerEvent,
} from "../../../../services/studentServices";

import RegisterConfirmModal from "./RegisterConfirmModal";

function EventDetailsModal({
  open,
  setOpen,
  eventData,
  onRegisterSuccess,
  hideRegisterButton = false,
}) {

  const [loading, setLoading] =
    useState(false);

  const [confirmOpen, setConfirmOpen] =
    useState(false);

  if (!open || !eventData) return null;

  const event = eventData.event;

  const seatsLeft =
    eventData.seatsLeft;

  const isRegistered =
    eventData.isRegistered;

  const isDeadlinePassed =
    event.registrationMode === "Participant" &&
    event.registrationDeadline &&
    new Date(event.registrationDeadline) <
      new Date();

  const handleRegister = async () => {

    try {

      setLoading(true);

      const response =
        await registerEvent(event._id);

      toast.success(response.message);

      setConfirmOpen(false);

      setOpen(false);

      if (onRegisterSuccess) {

        onRegisterSuccess();

      }

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Registration failed"
      );

    } finally {

      setLoading(false);

    }

  };

  const formatDate = (date) => {

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

  };

  const formatTime = (time) => {

    if (!time) return "N/A";

    const [hour, minute] = time.split(":");

    const date = new Date();

    date.setHours(Number(hour));

    date.setMinutes(Number(minute));

    return date.toLocaleTimeString(
      "en-IN",
      {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }
    );

  };

  const infoCard =
    "border rounded-2xl p-5 hover:shadow-md transition";

  return (

    <div
      className="
        fixed
        inset-0
        bg-black/60
        backdrop-blur-sm
        flex
        justify-center
        items-center
        z-50
        px-4
        py-4
      "
    >

      <div
        className="
          bg-white
          w-full
          max-w-6xl
          rounded-2xl
          sm:rounded-3xl
          overflow-hidden
          shadow-2xl
          max-h-[95vh]
          overflow-y-auto
        "
      >

        {/* Banner */}

        <div className="relative">

          <img
            src={
              event.banner
                ? event.banner
                : "https://placehold.co/1200x450/e2e8f0/64748b?text=Event"
            }
            alt={event.title}
            className="
              w-full
              h-56
              sm:h-72
              lg:h-80
              object-cover
            "
          />

          {/* Overlay */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/80
              via-black/30
              to-transparent
            "
          />

          {/* Close Button */}

          <button
            onClick={() => setOpen(false)}
            className="
              absolute
              top-4
              right-4
              sm:top-5
              sm:right-5
              h-10
              w-10
              sm:h-11
              sm:w-11
              rounded-full
              bg-white/95
              hover:bg-white
              shadow-lg
              flex
              items-center
              justify-center
              transition
            "
          >

            <X
              size={20}
              className="sm:w-[22px] sm:h-[22px]"
            />

          </button>

          {/* Event Info */}

          <div
            className="
              absolute
              left-5
              right-5
              bottom-5
              sm:left-8
              sm:right-8
              sm:bottom-8
            "
          >

            <h1
              className="
                text-white
                text-2xl
                sm:text-3xl
                lg:text-4xl
                font-bold
                leading-tight
                drop-shadow-xl
                break-words
              "
            >

              {event.title}

            </h1>

            <div className="mt-4">

              <span
                className="
                  inline-flex
                  items-center
                  px-3.5
                  py-1.5
                  rounded-full
                  bg-white/15
                  backdrop-blur-md
                  border
                  border-white/20
                  text-white
                  text-xs
                  font-medium
                  break-words
                "
              >

                <Tag
                  size={14}
                  className="mr-1.5 shrink-0"
                />

                {event.category}

              </span>

            </div>

          </div>

        </div>

        {/* Body */}

        <div className="p-5 sm:p-6 lg:p-8">
                  {/* Information */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

            {/* Organizer */}

            <div className={infoCard}>

              <div className="flex items-center gap-3">

                <Building2
                  size={20}
                  className="text-slate-700 shrink-0"
                />

                <span className="font-semibold text-slate-800">
                  Organizer
                </span>

              </div>

              <p className="mt-4 text-slate-700 break-words">

                {event.organizer?.societyName}

              </p>

            </div>

            {/* Venue */}

            <div className={infoCard}>

              <div className="flex items-center gap-3">

                <MapPin
                  size={20}
                  className="text-red-500 shrink-0"
                />

                <span className="font-semibold text-slate-800">
                  Venue
                </span>

              </div>

              <p className="mt-4 text-slate-700 break-words">

                {event.venue}

              </p>

            </div>

            {/* Event Date */}

            <div className={infoCard}>

              <div className="flex items-center gap-3">

                <Calendar
                  size={20}
                  className="text-blue-600 shrink-0"
                />

                <span className="font-semibold text-slate-800">
                  Event Date
                </span>

              </div>

              <p className="mt-4 text-slate-700">

                {formatDate(event.date)}

              </p>

            </div>

            {/* Time */}

            <div className={infoCard}>

              <div className="flex items-center gap-3">

                <Clock
                  size={20}
                  className="text-orange-500 shrink-0"
                />

                <span className="font-semibold text-slate-800">
                  Time
                </span>

              </div>

              <p className="mt-4 text-slate-700 break-words">

                {formatTime(event.startTime)} -{" "}
                {formatTime(event.endTime)}

              </p>

            </div>

            {/* Category */}

            <div className={infoCard}>

              <div className="flex items-center gap-3">

                <Tag
                  size={20}
                  className="text-indigo-600 shrink-0"
                />

                <span className="font-semibold text-slate-800">
                  Category
                </span>

              </div>

              <p className="mt-4 text-slate-700 break-words">

                {event.category}

              </p>

            </div>

            {/* Registration Deadline */}

            {event.registrationMode === "Participant" &&
              event.status !== "Completed" && (

                <div className={infoCard}>

                  <div className="flex items-center gap-3">

                    <CalendarDays
                      size={20}
                      className="text-purple-600 shrink-0"
                    />

                    <span className="font-semibold text-slate-800">
                      Registration Deadline
                    </span>

                  </div>

                  <p className="mt-4 text-slate-700 break-words">

                    {event.registrationDeadline
                      ? formatDate(
                          event.registrationDeadline
                        )
                      : "Not Available"}

                  </p>

                </div>

              )}

            {/* Registration Mode */}

            <div className={infoCard}>

              <div className="flex items-center gap-3">

                <Users
                  size={20}
                  className="text-emerald-600 shrink-0"
                />

                <span className="font-semibold text-slate-800">
                  Registration Mode
                </span>

              </div>

              <p className="mt-4 text-slate-700 break-words">

                {event.registrationMode}

              </p>

            </div>

          </div>
                    {/* Summary */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">

            {/* Total Registrations */}

            <div className={infoCard}>

              <div className="flex items-center gap-3">

                <Users
                  size={20}
                  className="text-blue-600 shrink-0"
                />

                <span className="font-semibold text-slate-800">
                  Total Registrations
                </span>

              </div>

              <p className="mt-4 text-2xl sm:text-3xl font-bold break-words">

                {event.totalRegistrations}

              </p>

            </div>

            {/* Seats Left */}

            {event.status !== "Completed" && (

              <div className={infoCard}>

                <div className="flex items-center gap-3">

                  <CalendarDays
                    size={20}
                    className="text-purple-600 shrink-0"
                  />

                  <span className="font-semibold text-slate-800">

                    {event.registrationMode === "Viewer"
                      ? "Access"
                      : "Seats Left"}

                  </span>

                </div>

                <p className="mt-4 text-2xl sm:text-3xl font-bold break-words">

                  {event.registrationMode === "Viewer"
                    ? "Unlimited"
                    : seatsLeft}

                </p>

              </div>

            )}

          </div>

          {/* Description */}

          <div className="mt-8 border rounded-2xl p-5 sm:p-6">

            <h2 className="text-xl sm:text-2xl font-bold mb-4">
              About Event
            </h2>

            <p className="text-sm sm:text-base text-gray-600 leading-7 sm:leading-8 whitespace-pre-wrap break-words">

              {event.description ||
                "No description available."}

            </p>

          </div>

          {/* Register Button */}

          {!hideRegisterButton && (

            <div className="mt-8">

              {isRegistered ? (

                <button
                  disabled
                  className="
                    w-full
                    py-4
                    rounded-2xl
                    bg-slate-100
                    border
                    border-slate-300
                    text-slate-600
                    font-semibold
                    cursor-not-allowed
                  "
                >

                  ✓ {event.registrationMode === "Viewer"
                    ? "Already Joined"
                    : "Already Registered"}

                </button>

              ) : isDeadlinePassed ? (

                <button
                  disabled
                  className="
                    w-full
                    py-4
                    rounded-2xl
                    bg-gray-300
                    text-gray-600
                    font-semibold
                    cursor-not-allowed
                  "
                >

                  Registration Closed

                </button>

              ) : (

                <button
                  onClick={() => setConfirmOpen(true)}
                  disabled={loading}
                  className="
                    w-full
                    py-4
                    rounded-2xl
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    font-semibold
                    transition
                  "
                >

                  {loading
                    ? event.registrationMode === "Viewer"
                      ? "Joining..."
                      : "Registering..."
                    : event.registrationMode === "Viewer"
                      ? "Join Event"
                      : "Register Now"}

                </button>

              )}

            </div>

          )}
                  </div>

      </div>

      {/* Register Confirmation Modal */}

      {!hideRegisterButton && (

        <RegisterConfirmModal
          open={confirmOpen}
          setOpen={setConfirmOpen}
          loading={loading}
          onConfirm={handleRegister}
          event={event}
        />

      )}

    </div>

  );

}

export default EventDetailsModal;