import { useState } from "react";

import {
  X,
  Calendar,
  Clock,
  MapPin,
  Users,
  Building2,
  Tag,
} from "lucide-react";

function EventDetailsModal({
  open,
  setOpen,
  event,
  registrations,
  seatsLeft,
}) {

  const [showBanner, setShowBanner] =
    useState(false);

  if (!open || !event) return null;

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

  return (
    <>

      {/* Modal */}

      <div
        onClick={() => setOpen(false)}
        className="
          fixed
          inset-0
          bg-black/60
          backdrop-blur-sm
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
            w-full
            max-w-6xl
            rounded-3xl
            overflow-hidden
            shadow-2xl
            max-h-[94vh]
            overflow-y-auto
          "
        >

          {/* Banner */}

          <div className="relative">

            {event.banner ? (

              <img
                src={event.banner}
                alt={event.title}
                onClick={() => setShowBanner(true)}
                className="
                  w-full
                  h-80
                  object-cover
                  cursor-pointer
                "
              />

            ) : (

              <div
                className="
                  w-full
                  h-80
                  bg-slate-200
                  flex
                  items-center
                  justify-center
                  text-gray-500
                  text-lg
                "
              >

                No Banner Available

              </div>

            )}

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
                top-5
                right-5
                bg-white/90
                p-2
                rounded-full
                hover:bg-white
                transition
              "
            >

              <X size={22} />

            </button>

            {/* Event Name */}

            <div
              className="
                absolute
                bottom-8
                left-8
                text-white
              "
            >

              <h1 className="text-4xl font-bold">

                {event.title}

              </h1>

              {/* Only Category */}

              <div className="mt-5">

                <span
                  className="
                    px-4
                    py-2
                    rounded-full
                    bg-white/20
                    backdrop-blur
                    text-sm
                    font-medium
                  "
                >

                  {event.category}

                </span>

              </div>

            </div>

          </div>

          {/* Body */}

          <div className="p-8">

            {/* Information */}

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                              {/* Organizer */}

              <div className="border rounded-2xl p-5 hover:shadow-md transition">

                <div className="flex items-center gap-3">

                  <Building2
                    size={20}
                    className="text-slate-700"
                  />

                  <span className="font-semibold">
                    Organizer
                  </span>

                </div>

                <p className="mt-4 text-slate-700">
                  {event.organizer?.societyName}
                </p>

              </div>

              {/* Venue */}

              <div className="border rounded-2xl p-5 hover:shadow-md transition">

                <div className="flex items-center gap-3">

                  <MapPin
                    size={20}
                    className="text-red-500"
                  />

                  <span className="font-semibold">
                    Venue
                  </span>

                </div>

                <p className="mt-4 text-slate-700">
                  {event.venue}
                </p>

              </div>

              {/* Event Date */}

              <div className="border rounded-2xl p-5 hover:shadow-md transition">

                <div className="flex items-center gap-3">

                  <Calendar
                    size={20}
                    className="text-blue-600"
                  />

                  <span className="font-semibold">
                    Event Date
                  </span>

                </div>

                <p className="mt-4 text-slate-700">
                  {formatDate(event.date)}
                </p>

              </div>

              {/* Time */}

              <div className="border rounded-2xl p-5 hover:shadow-md transition">

                <div className="flex items-center gap-3">

                  <Clock
                    size={20}
                    className="text-amber-600"
                  />

                  <span className="font-semibold">
                    Time
                  </span>

                </div>

                <p className="mt-4 text-slate-700">
                  {event.startTime} - {event.endTime}
                </p>

              </div>

              {/* Category */}

              <div className="border rounded-2xl p-5 hover:shadow-md transition">

                <div className="flex items-center gap-3">

                  <Tag
                    size={20}
                    className="text-slate-700"
                  />

                  <span className="font-semibold">
                    Category
                  </span>

                </div>

                <p className="mt-4 text-slate-700">
                  {event.category}
                </p>

              </div>

              {/* Total Registrations */}

              <div className="border rounded-2xl p-5 hover:shadow-md transition">

                <div className="flex items-center gap-3">

                  <Users
                    size={20}
                    className="text-emerald-600"
                  />

                  <span className="font-semibold">
                    Total Registrations
                  </span>

                </div>

                <p className="mt-4 text-3xl font-bold text-slate-800">

                  {registrations}

                </p>

              </div>

              {/* Seats Left (Hide when Completed) */}

              {event.status !== "Completed" && (

                <div className="border rounded-2xl p-5 hover:shadow-md transition">

                  <div className="flex items-center gap-3">

                    <Users
                      size={20}
                      className="text-indigo-600"
                    />

                    <span className="font-semibold">
                      Seats Left
                    </span>

                  </div>

                  <p className="mt-4 text-3xl font-bold text-slate-800">

                    {seatsLeft}

                  </p>

                </div>

              )}

            </div>
                        {/* About Event */}

            <div className="mt-10 border rounded-2xl p-6">

              <h2 className="text-2xl font-bold mb-5">
                About Event
              </h2>

              <p className="text-gray-600 leading-7 whitespace-pre-wrap">

                {event.description}

              </p>

            </div>

            {/* Registration Details */}

            <div className="mt-10 border rounded-2xl p-6">

              <h2 className="text-2xl font-bold mb-6">

                Registration Details

              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                <div>

                  <p className="text-gray-500">

                    Registration Mode

                  </p>

                  <h3 className="font-semibold mt-2">

                    {event.registrationMode}

                  </h3>

                </div>

                <div>

                  <p className="text-gray-500">

                    Registration Deadline

                  </p>

                  <h3 className="font-semibold mt-2">

                    {formatDate(
                      event.registrationDeadline
                    )}

                  </h3>

                </div>

                <div>

                  <p className="text-gray-500">

                    Maximum Participants

                  </p>

                  <h3 className="font-semibold mt-2">

                    {event.maximumParticipants ??
                      "Unlimited"}

                  </h3>

                </div>

              </div>

            </div>

            {/* Event Created */}

            <div className="mt-10 border rounded-2xl p-6">

              <p className="text-gray-500">

                Event Created On

              </p>

              <h3 className="font-semibold mt-2">

                {formatDate(event.createdAt)}

              </h3>

            </div>

          </div>

        </div>

      </div>

      {/* Banner Preview */}

      {showBanner && (

        <div
          onClick={() =>
            setShowBanner(false)
          }
          className="
            fixed
            inset-0
            bg-black/80
            flex
            items-center
            justify-center
            z-[100]
          "
        >

          <img
            src={
              event.banner
                ? event.banner
                : "https://placehold.co/1200x700"
            }
            alt={event.title}
            className="
              max-w-[90vw]
              max-h-[90vh]
              rounded-3xl
              shadow-2xl
            "
          />

        </div>

      )}

    </>

  );

}

export default EventDetailsModal;