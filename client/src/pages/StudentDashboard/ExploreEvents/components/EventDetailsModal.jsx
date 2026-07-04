import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  Calendar,
  Clock,
  MapPin,
  Users,
  X,
  Building2,
  Tag,
  CalendarDays,
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
  const [loading, setLoading] = useState(false);

  const [confirmOpen, setConfirmOpen] =
    useState(false);

  
 
  if (!open || !eventData) return null;

  const event = eventData.event;
  const seatsLeft = eventData.seatsLeft;

const isRegistered = eventData.isRegistered;

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

  const handleLike = async () => {

    try {

      const response =
        await toggleLikeEvent(
          event._id
        );

      setLiked(response.liked);

      setLikes(response.likes);

      toast.success(response.message);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );

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

  return date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

  const infoCard =
    "bg-slate-50 rounded-2xl p-5 border";

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">

  <div className="bg-white w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] overflow-y-auto">

    {/* Header */}

    <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-20">

      <h2 className="text-3xl font-bold">
        Event Details
      </h2>

      <button
        onClick={() => setOpen(false)}
        className="p-2 rounded-full hover:bg-gray-100"
      >
        <X />
      </button>

    </div>

    {/* Banner */}

    <img
      src={
        event.banner
          ? event.banner
          : "https://placehold.co/1200x450/e2e8f0/64748b?text=Event"
      }
      alt={event.title}
      className="w-full h-72 object-cover"
    />

    <div className="p-8 space-y-8">

      {/* Title */}

      <div>

        <div className="flex flex-wrap gap-3 mb-4">

          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">

            {event.category}

          </span>

          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              event.status === "Upcoming"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {event.status}
          </span>

        </div>

        <h1 className="text-4xl font-bold">

          {event.title}

        </h1>

        <p className="text-gray-500 mt-3">

          Organized by

          <span className="font-semibold text-blue-600 ml-2">

            {event.organizer?.societyName}

          </span>

        </p>

      </div>

      {/* Information */}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

        <div className={infoCard}>

          <div className="flex gap-2 items-center">

            <Building2 className="text-blue-600"/>

            <span className="font-semibold">

              Organizer

            </span>

          </div>

          <p className="mt-3">

            {event.organizer?.societyName}

          </p>

        </div>

        <div className={infoCard}>

          <div className="flex gap-2 items-center">

            <MapPin className="text-blue-600"/>

            <span className="font-semibold">

              Venue

            </span>

          </div>

          <p className="mt-3">

            {event.venue}

          </p>

        </div>

        <div className={infoCard}>

          <div className="flex gap-2 items-center">

            <Calendar className="text-blue-600"/>

            <span className="font-semibold">

              Date

            </span>

          </div>

          <p className="mt-3">

            {formatDate(event.date)}

          </p>

        </div>

        <div className={infoCard}>

          <div className="flex gap-2 items-center">

            <Clock className="text-blue-600"/>

            <span className="font-semibold">

              Time

            </span>

          </div>

          <p className="mt-3">

            {formatTime(event.startTime)} - {formatTime(event.endTime)}

          </p>

        </div>

        <div className={infoCard}>

          <div className="flex gap-2 items-center">

            <CalendarDays className="text-blue-600"/>

            <span className="font-semibold">

              Registration Deadline

            </span>

          </div>

          <p className="mt-3">

            {formatDate(event.registrationDeadline)}

          </p>

        </div>

        

        <div className={infoCard}>

          <div className="flex gap-2 items-center">

            <Users className="text-blue-600"/>

            <span className="font-semibold">

              Registered

            </span>

          </div>

          <p className="mt-3">

            {event.totalRegistrations}

          </p>

        </div>

        <div className={infoCard}>

          <div className="flex gap-2 items-center">

            <Users className="text-green-600"/>

            <span className="font-semibold">

              Seats Left

            </span>

          </div>

          <p className="mt-3">

            {seatsLeft ?? "Unlimited"}

          </p>

        </div>

        

      </div>

      {/* Description */}

      <div className="border rounded-2xl p-6">

        <h2 className="text-2xl font-bold mb-4">

          Description

        </h2>

        <p className="text-gray-600 whitespace-pre-wrap leading-8">

          {event.description ||
            "No description available."}

        </p>

      </div>

      {/* Buttons */}
      {!hideRegisterButton && (
      <div className="pt-4">

        
    {event.registrationMode === "Viewer" ? (

  <button
    disabled
    className="w-full bg-gray-300 text-gray-600 py-4 rounded-2xl font-semibold cursor-not-allowed"
  >
    No Registration Required
  </button>

) : isRegistered ? (

  <button
    disabled
    className="w-full bg-green-600 text-white py-4 rounded-2xl font-semibold cursor-not-allowed"
  >
    ✓ Already Registered
  </button>

) : (

  <button
    onClick={() => setConfirmOpen(true)}
    disabled={loading}
    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold transition"
  >
    {loading ? "Registering..." : "Register"}
  </button>

)}
      </div>
    )}
    </div>

  </div>
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