import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getEventById,
  updateEvent,
} from "../../../services/eventServices";

import EventBanner from "../CreateEvent/components/EventBanner";
import EventBasicInfo from "../CreateEvent/components/EventBasicInfo";
import EventSchedule from "../CreateEvent/components/EventSchedule";
import EventRegistration from "../CreateEvent/components/EventRegistration";
import EventPreview from "../CreateEvent/components/EventPreview";

function EditEvent({ eventId, setActivePage }) {
  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [formData, setFormData] =
    useState({
      banner: null,

      title: "",
      description: "",
      category: "Technical",

      venue: "",

      date: "",
      startTime: "",
      endTime: "",

      registrationDeadline: "",

      registrationMode:
        "Participant",

      maximumParticipants: "",
    });

  const categories = [
    "Technical",
    "Workshop",
    "Hackathon",
    "Seminar",
    "Sports",
    "Cultural",
    "Placement",
    "Competition",
    "Other",
  ];

  useEffect(() => {
    loadEvent();
  }, []);

  const loadEvent = async () => {
    try {
      const response =
        await getEventById(eventId);

      const event = response.event;

      setFormData({
        banner: event.banner,

        title: event.title,
        description:
          event.description,
        category: event.category,

        venue: event.venue,

        date:
          event.date.split("T")[0],

        startTime:
          event.startTime,
        endTime: event.endTime,

        registrationDeadline:
          event.registrationDeadline.split(
            "T"
          )[0],

        registrationMode:
          event.registrationMode,

        maximumParticipants:
          event.maximumParticipants ||
          "",
      });
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Failed to load event"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate =
    async () => {
      try {
        setSaving(true);

        const data =
          new FormData();

        data.append(
          "title",
          formData.title
        );

        data.append(
          "description",
          formData.description
        );

        data.append(
          "category",
          formData.category
        );

        data.append(
          "venue",
          formData.venue
        );

        data.append(
          "date",
          formData.date
        );

        data.append(
          "startTime",
          formData.startTime
        );

        data.append(
          "endTime",
          formData.endTime
        );

        data.append(
          "registrationDeadline",
          formData.registrationDeadline
        );

        data.append(
          "registrationMode",
          formData.registrationMode
        );

        data.append(
          "maximumParticipants",
          formData.maximumParticipants
        );

        if (
          formData.banner instanceof
          File
        ) {
          data.append(
            "banner",
            formData.banner
          );
        }

        const response =
          await updateEvent(
            eventId,
            data
          );

        toast.success(
          response.message
        );

        setActivePage(
          "manage-events"
        );

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
            "Failed to update event"
        );

      } finally {

        setSaving(false);

      }
    };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60 text-lg sm:text-xl text-gray-500">
        Loading Event...
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen p-4 sm:p-6 lg:p-8">

      {/* Heading */}

      <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
        Edit Event
      </h1>

      <p className="mt-2 mb-6 sm:mb-8 text-sm sm:text-base text-gray-500">
        Update your event
        details.
      </p>

      {/* Sections */}

      <EventBanner
        formData={formData}
        setFormData={setFormData}
      />

      <EventBasicInfo
        formData={formData}
        setFormData={setFormData}
        categories={categories}
      />

      <EventSchedule
        formData={formData}
        setFormData={setFormData}
      />

      <EventRegistration
        formData={formData}
        setFormData={setFormData}
      />

      <EventPreview
        formData={formData}
      />

      {/* Buttons */}

      <div className="mt-8 flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4">

        <button
          onClick={() =>
            setActivePage(
              "manage-events"
            )
          }
          className="w-full sm:w-auto border border-gray-300 px-6 py-3 rounded-xl hover:bg-gray-100 transition"
        >
          Cancel
        </button>

        <button
          onClick={handleUpdate}
          disabled={saving}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-xl transition"
        >
          {saving
            ? "Updating..."
            : "Update Event"}
        </button>

      </div>

    </div>
  );
}

export default EditEvent;