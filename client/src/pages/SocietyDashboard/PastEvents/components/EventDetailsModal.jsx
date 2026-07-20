import {
  Calendar,
  MapPin,
  Users,
  Star,
  MessageSquare,
  Tag,
  X,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

import { getEventFeedback } from "../../../../services/authServices";

import FeedbackModal from "./FeedbackModal";

function EventDetailsModal({
  open,
  setOpen,
  event,
}) {

  const [feedbackOpen, setFeedbackOpen] =
    useState(false);

  const [allFeedback, setAllFeedback] =
    useState([]);

  const [loadingFeedback, setLoadingFeedback] =
    useState(false);

  const navigate = useNavigate();

  if (!open || !event) return null;

  const {
    event: details,
    counts,
    averageRating,
    feedbackCount,
    recentFeedback,
  } = event;

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

  const handleViewFeedback = async () => {

    try {

      setLoadingFeedback(true);

      const response =
        await getEventFeedback(details._id);

      setAllFeedback(response.feedbacks);

      setFeedbackOpen(true);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to load feedback"
      );

    } finally {

      setLoadingFeedback(false);

    }

  };

  return (
    <>

      <div
        onClick={() => setOpen(false)}
        className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          bg-black/60
          backdrop-blur-sm
          p-3
          sm:p-5
        "
      >

        <div
          onClick={(e) =>
            e.stopPropagation()
          }
          className="
            w-full
            max-w-6xl
            max-h-[94vh]
            overflow-y-auto
            overflow-x-hidden
            rounded-2xl
            sm:rounded-3xl
            bg-white
            shadow-2xl
          "
        >

          {/* Banner */}

          <div className="relative">

            {details.banner ? (

              <img
                src={details.banner}
                alt={details.title}
                className="
                  h-56
                  sm:h-72
                  lg:h-80
                  w-full
                  object-cover
                "
              />

            ) : (

              <div
                className="
                  flex
                  h-56
                  sm:h-72
                  lg:h-80
                  w-full
                  items-center
                  justify-center
                  bg-slate-200
                  text-base
                  sm:text-lg
                  text-gray-500
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
                via-black/20
                to-transparent
              "
            />

            {/* Close */}

            <button
              onClick={() => setOpen(false)}
              className="
                absolute
                top-3
                right-3
                sm:top-5
                sm:right-5
                rounded-full
                bg-white/90
                p-2
                backdrop-blur
                transition
                hover:bg-white
              "
            >

              <X size={22} />

            </button>

            {/* Title */}

            <div
              className="
                absolute
                bottom-5
                left-5
                sm:bottom-8
                sm:left-8
                text-white
              "
            >

              <h1
                className="
                  text-2xl
                  sm:text-3xl
                  lg:text-4xl
                  font-bold
                  break-words
                "
              >

                {details.title}

              </h1>

              <div
                className="
                  mt-4
                  flex
                  flex-wrap
                  gap-3
                "
              >

                <span
                  className="
                    rounded-full
                    bg-white/20
                    px-4
                    py-1.5
                    text-xs
                    sm:text-sm
                    font-medium
                    backdrop-blur
                  "
                >

                  {details.category}

                </span>

              </div>

            </div>

          </div>

          {/* Body */}

          <div className="p-4 sm:p-6 lg:p-8">

            {/* Information */}

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3
                gap-4
                sm:gap-5
              "
            >
                              {/* Venue */}

              <div className="border rounded-2xl p-4 sm:p-5 hover:shadow-md transition">

                <div className="flex items-center gap-3">

                  <MapPin
                    size={20}
                    className="text-red-500 shrink-0"
                  />

                  <span className="font-semibold text-slate-800">

                    Venue

                  </span>

                </div>

                <p className="mt-4 text-sm sm:text-[15px] leading-6 text-slate-700 break-words">

                  {details.venue}

                </p>

              </div>

              {/* Date */}

              <div className="border rounded-2xl p-4 sm:p-5 hover:shadow-md transition">

                <div className="flex items-center gap-3">

                  <Calendar
                    size={20}
                    className="text-blue-600 shrink-0"
                  />

                  <span className="font-semibold text-slate-800">

                    Event Date

                  </span>

                </div>

                <p className="mt-4 text-sm sm:text-[15px] text-slate-700">

                  {formatDate(details.date)}

                </p>

              </div>

              {/* Category */}

              <div className="border rounded-2xl p-4 sm:p-5 hover:shadow-md transition">

                <div className="flex items-center gap-3">

                  <Tag
                    size={20}
                    className="text-slate-700 shrink-0"
                  />

                  <span className="font-semibold text-slate-800">

                    Category

                  </span>

                </div>

                <p className="mt-4 text-sm sm:text-[15px] text-slate-700 break-words">

                  {details.category}

                </p>

              </div>

              {/* Registration */}

              <div className="border rounded-2xl p-4 sm:p-5 hover:shadow-md transition">

                <div className="flex items-center gap-3">

                  <Users
                    size={20}
                    className="text-emerald-600 shrink-0"
                  />

                  <span className="font-semibold text-slate-800">

                    Registration Mode

                  </span>

                </div>

                <p className="mt-4 text-sm sm:text-[15px] text-slate-700">

                  {details.registrationMode}

                </p>

              </div>

              {/* Total Registrations */}

              <div className="border rounded-2xl p-4 sm:p-5 hover:shadow-md transition">

                <div className="flex items-center gap-3">

                  <Users
                    size={20}
                    className="text-indigo-600 shrink-0"
                  />

                  <span className="font-semibold text-slate-800">

                    Total Registrations

                  </span>

                </div>

                <p className="mt-4 text-2xl sm:text-3xl font-bold text-slate-800">

                  {counts?.registered ??
                    details.totalRegistrations ??
                    0}

                </p>

              </div>

            </div>

            {/* Statistics */}

            <div className="mt-10">

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6">

                <h2 className="text-xl sm:text-2xl font-bold text-slate-800">

                  Event Statistics

                </h2>

                <span className="text-sm text-gray-500">

                  Event Overview

                </span>

              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">

                {/* Average Rating */}

                <div
                  className="
                    border
                    rounded-2xl
                    p-5
                    sm:p-6
                    bg-white
                    hover:shadow-md
                    transition
                  "
                >

                  <Star
                    size={26}
                    className="text-yellow-500 mb-4 sm:mb-5"
                  />

                  <p className="text-sm text-gray-500">

                    Average Rating

                  </p>

                  <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-800">

                    {averageRating > 0
                      ? averageRating.toFixed(1)
                      : "--"}

                  </h2>

                </div>

                {/* Feedback */}

                <div
                  className="
                    border
                    rounded-2xl
                    p-5
                    sm:p-6
                    bg-white
                    hover:shadow-md
                    transition
                  "
                >

                  <MessageSquare
                    size={26}
                    className="text-indigo-600 mb-4 sm:mb-5"
                  />

                  <p className="text-sm text-gray-500">

                    Feedback Received

                  </p>

                  <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-800">

                    {feedbackCount}

                  </h2>

                </div>

                {/* Attended */}

                <div
                  className="
                    border
                    rounded-2xl
                    p-5
                    sm:p-6
                    bg-white
                    hover:shadow-md
                    transition
                  "
                >

                  <Users
                    size={26}
                    className="text-green-600 mb-4 sm:mb-5"
                  />

                  <p className="text-sm text-gray-500">

                    Attended

                  </p>

                  <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-800">

                    {details.registrationMode === "Participant"
                      ? counts?.attended ?? 0
                      : "--"}

                  </h2>

                </div>

                {/* Absent */}

                <div
                  className="
                    border
                    rounded-2xl
                    p-5
                    sm:p-6
                    bg-white
                    hover:shadow-md
                    transition
                  "
                >

                  <Users
                    size={26}
                    className="text-red-500 mb-4 sm:mb-5"
                  />

                  <p className="text-sm text-gray-500">

                    Absent

                  </p>

                  <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-800">

                    {details.registrationMode === "Participant"
                      ? counts?.absent ?? 0
                      : "--"}

                  </h2>

                </div>

              </div>

            </div>

            {/* Recent Feedback */}

            <div className="mt-12">
                              <div
                className="
                  mb-6
                  flex
                  flex-col
                  gap-3
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >

                <div>

                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800">

                    Recent Feedback

                  </h2>

                  <p className="mt-1 text-sm text-gray-500">

                    Latest responses submitted by participants.

                  </p>

                </div>

                <button
                  onClick={handleViewFeedback}
                  className="
                    self-start
                    sm:self-auto
                    font-semibold
                    text-blue-600
                    transition
                    hover:text-blue-700
                  "
                >

                  {loadingFeedback
                    ? "Loading..."
                    : "View All Feedback →"}

                </button>

              </div>

              {recentFeedback.length === 0 ? (

                <div
                  className="
                    rounded-2xl
                    border
                    bg-slate-50
                    py-10
                    sm:py-12
                    text-center
                    text-gray-500
                  "
                >

                  <MessageSquare
                    size={42}
                    className="mx-auto mb-4 text-gray-400"
                  />

                  <h3 className="text-base sm:text-lg font-semibold">

                    No Feedback Yet

                  </h3>

                  <p className="mt-2 text-sm sm:text-base">

                    Participants haven't submitted feedback yet.

                  </p>

                </div>

              ) : (

                <div className="space-y-4">

                  {recentFeedback
                    .slice(0, 3)
                    .map((item, index) => (

                      <div
                        key={index}
                        className="
                          rounded-2xl
                          border
                          bg-white
                          p-4
                          sm:p-5
                          transition
                          hover:shadow-md
                        "
                      >

                        <div
                          className="
                            flex
                            flex-col
                            gap-2
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                          "
                        >

                          <div className="font-semibold text-slate-800 break-words">

                            {item.student}

                          </div>

                          <div
                            className="
                              flex
                              items-center
                              gap-1
                              shrink-0
                            "
                          >

                            <Star
                              size={18}
                              className="fill-yellow-400 text-yellow-500"
                            />

                            <span className="font-semibold">

                              {item.rating}/5

                            </span>

                          </div>

                        </div>

                        <p
                          className="
                            mt-4
                            break-words
                            text-sm
                            sm:text-base
                            leading-6
                            sm:leading-7
                            text-gray-600
                          "
                        >

                          {item.comment}

                        </p>

                      </div>

                    ))}

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

      <FeedbackModal
        open={feedbackOpen}
        setOpen={setFeedbackOpen}
        feedbacks={allFeedback}
      />

    </>

  );

}

export default EventDetailsModal;