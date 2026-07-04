import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Tag,
} from "lucide-react";

function EventPreview({ formData }) {
  const [showBanner, setShowBanner] = useState(false);

  return (
    <>
      <div className="mt-8 bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Banner */}

        {formData.banner ? (
          <img
            src={
           typeof formData.banner === "string"
          ? formData.banner
         : URL.createObjectURL(formData.banner)
        }
            alt="Banner Preview"
            onClick={() => setShowBanner(true)}
            className="
              w-full
              h-72
              object-cover
              cursor-pointer
              hover:opacity-90
              transition
            "
          />
        ) : (
          <div className="w-full h-72 bg-slate-200 flex items-center justify-center text-gray-500 text-xl">
            Event Banner Preview
          </div>
        )}

        <div className="p-8">
          <h2 className="text-3xl font-bold text-slate-800">
            {formData.title || "Event Title"}
          </h2>

          <p className="text-gray-600 mt-4 whitespace-pre-wrap break-words leading-7">
            {formData.description ||
              "Event description will appear here."}
          </p>

          <div className="grid md:grid-cols-2 gap-5 mt-8">
            <div className="flex items-center gap-3">
              <Tag className="text-blue-600" size={20} />
              <span>{formData.category}</span>
            </div>

            <div className="flex items-center gap-3">
              <MapPin
                className="text-red-500"
                size={20}
              />
              <span>
                {formData.venue || "Venue"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Calendar
                className="text-green-600"
                size={20}
              />
              <span>
                {formData.date || "Date"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Clock
                className="text-orange-500"
                size={20}
              />
              <span>
                {formData.startTime || "--:--"} -{" "}
                {formData.endTime || "--:--"}
              </span>
            </div>
          </div>

          {/* Registration */}

          <div className="mt-8 p-5 rounded-2xl bg-slate-50 border">
            <h3 className="font-semibold text-lg mb-4">
              Registration
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">
                  Mode
                </span>

                <span className="font-medium">
                  {formData.registrationMode}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Deadline
                </span>

                <span className="font-medium">
                  {formData.registrationDeadline ||
                    "Not Selected"}
                </span>
              </div>

              {formData.registrationMode ===
                "Participant" && (
                <div className="flex justify-between">
                  <span className="text-gray-500 flex items-center gap-2">
                    <Users size={18} />
                    Maximum Participants
                  </span>

                  <span className="font-medium">
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

      {showBanner && formData.banner && (
        <div
          onClick={() => setShowBanner(false)}
          className="
            fixed
            inset-0
            bg-black/80
            flex
            items-center
            justify-center
            z-50
            p-5
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
                -top-4
                -right-4
                w-10
                h-10
                rounded-full
                bg-white
                shadow-lg
                text-xl
                hover:bg-gray-200
              "
            >
              ✕
            </button>

            <img
             src={
             typeof formData.banner === "string"
            ? formData.banner
           : URL.createObjectURL(formData.banner)
             }
              alt="Event Banner"
              className="
                max-w-[90vw]
                max-h-[90vh]
                rounded-3xl
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