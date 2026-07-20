import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Tag,
} from "lucide-react";

function EventPreview({ formData }) {
  const [showBanner, setShowBanner] =
    useState(false);

  return (
    <>
      <div className="mt-6 sm:mt-8 bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden">

        {/* Banner */}

        {formData.banner ? (
          <img
            src={
              typeof formData.banner ===
              "string"
                ? formData.banner
                : URL.createObjectURL(
                    formData.banner
                  )
            }
            alt="Banner Preview"
            onClick={() =>
              setShowBanner(true)
            }
            className="
              w-full
              h-52
              sm:h-64
              lg:h-72
              object-cover
              cursor-pointer
              hover:opacity-90
              transition
            "
          />
        ) : (
          <div className="w-full h-52 sm:h-64 lg:h-72 bg-slate-200 flex items-center justify-center text-gray-500 text-base sm:text-xl">
            Event Banner Preview
          </div>
        )}

        {/* Content */}

        <div className="p-5 sm:p-6 lg:p-8">

          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 break-words">
            {formData.title ||
              "Event Title"}
          </h2>

          <p className="mt-4 text-sm sm:text-base text-gray-600 whitespace-pre-wrap break-words leading-6 sm:leading-7">
            {formData.description ||
              "Event description will appear here."}
          </p>

          {/* Details */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mt-6 sm:mt-8">

            <div className="flex items-center gap-3 min-w-0">

              <Tag
                className="text-blue-600 shrink-0"
                size={20}
              />

              <span className="break-words">
                {formData.category}
              </span>

            </div>

            <div className="flex items-center gap-3 min-w-0">

              <MapPin
                className="text-red-500 shrink-0"
                size={20}
              />

              <span className="break-words">
                {formData.venue ||
                  "Venue"}
              </span>

            </div>

            <div className="flex items-center gap-3 min-w-0">

              <Calendar
                className="text-green-600 shrink-0"
                size={20}
              />

              <span className="break-words">
                {formData.date ||
                  "Date"}
              </span>

            </div>

            <div className="flex items-center gap-3 min-w-0">

              <Clock
                className="text-orange-500 shrink-0"
                size={20}
              />

              <span className="break-words">
                {formData.startTime ||
                  "--:--"}{" "}
                -{" "}
                {formData.endTime ||
                  "--:--"}
              </span>

            </div>

          </div>

          {/* Registration */}

          <div className="mt-6 sm:mt-8 p-4 sm:p-5 rounded-2xl bg-slate-50 border">

            <h3 className="mb-4 text-base sm:text-lg font-semibold">
              Registration
            </h3>

            <div className="space-y-4">

              <div className="flex justify-between items-start gap-4">

                <span className="text-sm sm:text-base text-gray-500">
                  Mode
                </span>

                <span className="text-sm sm:text-base font-medium text-right break-words">
                  {
                    formData.registrationMode
                  }
                </span>

              </div>

              <div className="flex justify-between items-start gap-4">

                <span className="text-sm sm:text-base text-gray-500">
                  Deadline
                </span>

                <span className="text-sm sm:text-base font-medium text-right break-words">
                  {formData.registrationDeadline ||
                    "Not Selected"}
                </span>

              </div>

              {formData.registrationMode ===
                "Participant" && (

                <div className="flex justify-between items-start gap-4">

                  <span className="flex items-center gap-2 text-sm sm:text-base text-gray-500">

                    <Users
                      size={18}
                      className="shrink-0"
                    />

                    Maximum Participants

                  </span>

                  <span className="text-sm sm:text-base font-medium text-right break-words">
                    {formData.maximumParticipants ||
                      "Unlimited"}
                  </span>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

      {/* Full Screen Banner Modal */}

      {showBanner &&
        formData.banner && (

        <div
          onClick={() =>
            setShowBanner(false)
          }
          className="
            fixed
            inset-0
            z-50
            bg-black/80
            flex
            items-center
            justify-center
            p-4
          "
        >

          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            className="relative"
          >

            <button
              onClick={() =>
                setShowBanner(false)
              }
              className="
                absolute
                -top-3
                -right-3
                sm:-top-4
                sm:-right-4
                w-9
                h-9
                sm:w-10
                sm:h-10
                rounded-full
                bg-white
                shadow-lg
                text-lg
                sm:text-xl
                hover:bg-gray-200
              "
            >
              ✕
            </button>

            <img
              src={
                typeof formData.banner ===
                "string"
                  ? formData.banner
                  : URL.createObjectURL(
                      formData.banner
                    )
              }
              alt="Event Banner"
              className="
                max-w-[90vw]
                max-h-[90vh]
                rounded-2xl
                sm:rounded-3xl
                object-contain
                shadow-2xl
              "
            />

          </div>

        </div>

      )}
    </>
  );
}

export default EventPreview;