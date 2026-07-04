import { useState } from "react";

import {
  X,
  CalendarDays,
  Clock,
  MapPin,
  Users,
  Building2,
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

  return (
    <>

      <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-5">

        <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl">

          {/* Header */}

          <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-20">

            <h2 className="text-3xl font-bold">

              Event Details

            </h2>

            <button
              onClick={() => setOpen(false)}
              className="hover:bg-gray-100 p-2 rounded-full"
            >

              <X />

            </button>

          </div>

          <div className="p-8 space-y-8">

            {/* Banner */}

            <img
              src={
                event.banner
                  ? event.banner
                  : "https://placehold.co/1000x500?text=Campus+Connect"
              }
              onClick={() =>
                setShowBanner(true)
              }
              className="w-full h-72 object-cover rounded-3xl cursor-pointer hover:scale-[1.01] transition"
            />

            {/* Title */}

            <div>

              <div className="flex justify-between items-start">

                <div>

                  <h1 className="text-4xl font-bold">

                    {event.title}

                  </h1>

                  <p className="text-blue-600 mt-2 font-semibold">

                    {event.organizer?.societyName}

                  </p>

                </div>

                <span
                  className={`px-5 py-2 rounded-full font-semibold ${
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

            </div>

            {/* Stats */}

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

              <div className="bg-blue-50 rounded-2xl p-5 text-center">

                <CalendarDays
                  className="mx-auto text-blue-600"
                />

                <p className="mt-2">

                  {new Date(event.date).toLocaleDateString("en-GB")}

                </p>

              </div>

              <div className="bg-green-50 rounded-2xl p-5 text-center">

                <Clock
                  className="mx-auto text-green-600"
                />

                <p className="mt-2">

                  {event.startTime} - {event.endTime}

                </p>

              </div>

              <div className="bg-orange-50 rounded-2xl p-5 text-center">

                <Users
                  className="mx-auto text-orange-600"
                />

                <p className="mt-2">

                  {registrations}

                </p>

              </div>

              <div className="bg-purple-50 rounded-2xl p-5 text-center">

                <Users
                  className="mx-auto text-purple-600"
                />

                <p className="mt-2">

                  {seatsLeft}

                </p>

              </div>

            </div>
                        {/* Description */}

            <div className="bg-white border rounded-2xl p-6">

              <h2 className="text-2xl font-bold mb-4">
                Description
              </h2>

              <p className="text-gray-600 leading-7 whitespace-pre-wrap">

                {event.description}

              </p>

            </div>

            {/* Event Information */}

            <div className="grid md:grid-cols-2 gap-6">

              <div className="bg-slate-50 rounded-2xl p-5">

                <div className="flex items-center gap-3 mb-3">

                  <MapPin className="text-blue-600" />

                  <h3 className="font-bold">
                    Venue
                  </h3>

                </div>

                <p>{event.venue}</p>

              </div>

              <div className="bg-slate-50 rounded-2xl p-5">

                <div className="flex items-center gap-3 mb-3">

                  <Building2 className="text-blue-600" />

                  <h3 className="font-bold">
                    Category
                  </h3>

                </div>

                <p>{event.category}</p>

              </div>

            </div>

            {/* Registration Details */}

            <div className="bg-white border rounded-2xl p-6">

              <h2 className="text-2xl font-bold mb-5">
                Registration Details
              </h2>

              <div className="grid md:grid-cols-2 gap-5">

                <div>

                  <p className="text-gray-500">
                    Registration Mode
                  </p>

                  <h3 className="font-semibold mt-1">
                    {event.registrationMode}
                  </h3>

                </div>

                <div>

                  <p className="text-gray-500">
                    Registration Deadline
                  </p>

                  <h3 className="font-semibold mt-1">
                    {new Date(
                      event.registrationDeadline
                    ).toLocaleDateString("en-GB")}
                  </h3>

                </div>

                <div>

                  <p className="text-gray-500">
                    Maximum Participants
                  </p>

                  <h3 className="font-semibold mt-1">
                    {event.maximumParticipants ??
                      "Unlimited"}
                  </h3>

                </div>

                <div>

                  <p className="text-gray-500">
                    Registration Status
                  </p>

                  <h3 className="font-semibold mt-1">
                    {event.isRegistrationOpen
                      ? "Open"
                      : "Closed"}
                  </h3>

                </div>

              </div>

            </div>

            {/* Organizer */}

            <div className="bg-white border rounded-2xl p-6">

              <h2 className="text-2xl font-bold mb-5">
                Organizer
              </h2>

              <div className="flex items-center gap-5">

                <img
                  src={
                    event.organizer?.logo
                      ? event.organizer.logo
                      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          event.organizer?.societyName
                        )}`
                  }
                  alt={event.organizer?.societyName}
                  className="w-20 h-20 rounded-full object-cover"
                />

                <div>

                  <h3 className="text-xl font-bold">
                    {event.organizer?.societyName}
                  </h3>

                  <p className="text-gray-500 mt-1">
                    {event.organizer?.facultyCoordinator}
                  </p>

                  <p className="text-blue-600 mt-1">
                    {event.organizer?.email}
                  </p>

                </div>

              </div>

            </div>

            {/* Created Date */}

            <div className="bg-slate-50 rounded-2xl p-5">

              <p className="text-gray-500">
                Event Created On
              </p>

              <h3 className="font-semibold mt-2">
                {new Date(
                  event.createdAt
                ).toLocaleDateString("en-GB")}
              </h3>

            </div>

          </div>

        </div>

      </div>

      {/* Banner Preview */}

      {showBanner && (

        <div
          onClick={() => setShowBanner(false)}
          className="fixed inset-0 bg-black/80 flex justify-center items-center z-[100]"
        >

          <img
            src={
              event.banner
                ? event.banner
                : "https://placehold.co/1000x500?text=Campus+Connect"
            }
            alt={event.title}
            className="max-w-[90vw] max-h-[90vh] rounded-3xl shadow-2xl"
          />

        </div>

      )}

    </>

  );

}

export default EventDetailsModal;