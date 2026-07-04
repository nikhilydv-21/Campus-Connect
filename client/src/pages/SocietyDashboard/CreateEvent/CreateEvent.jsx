import { useState } from "react";
import toast from "react-hot-toast";

import EventBanner from "./components/EventBanner";
import EventBasicInfo from "./components/EventBasicInfo";
import EventSchedule from "./components/EventSchedule";
import EventRegistration from "./components/EventRegistration";
import EventPreview from "./components/EventPreview";

import { createEvent } from "../../../services/eventServices";

function CreateEvent() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    banner: null,

    title: "",
    description: "",
    category: "Technical",

    venue: "",

    date: "",
    startTime: "",
    endTime: "",

    registrationDeadline: "",

    registrationMode: "Participant",
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

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (
        !formData.title ||
        !formData.description ||
        !formData.venue ||
        !formData.date ||
        !formData.startTime ||
        !formData.endTime ||
        !formData.registrationDeadline
      ) {
        toast.error("Please fill all required fields.");
        return;
      }

      if (
        formData.registrationMode === "Participant" &&
        !formData.maximumParticipants
      ) {
        toast.error("Enter Maximum Participants");
        return;
      }

      // FormData for multipart upload
      const data = new FormData();

      if (formData.banner) {
        data.append("banner", formData.banner);
      }

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("venue", formData.venue);

      data.append("date", formData.date);
      data.append("startTime", formData.startTime);
      data.append("endTime", formData.endTime);

      data.append(
        "registrationDeadline",
        formData.registrationDeadline
      );

      data.append(
        "registrationMode",
        formData.registrationMode
      );

      if (formData.registrationMode === "Participant") {
        data.append(
          "maximumParticipants",
          formData.maximumParticipants
        );
      }

      const response = await createEvent(data);

      toast.success(response.message);

      setFormData({
        banner: null,
        title: "",
        description: "",
        category: "Technical",

        venue: "",

        date: "",
        startTime: "",
        endTime: "",

        registrationDeadline: "",

        registrationMode: "Participant",
        maximumParticipants: "",
      });

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to create event"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen p-8">

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-800">
          Create Event
        </h1>

        <p className="text-gray-500 mt-2">
          Fill all event details to publish a new event.
        </p>

      </div>

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

      <div className="flex justify-end mt-10">

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="
            bg-blue-600
            hover:bg-blue-700
            disabled:bg-gray-400
            text-white
            px-8
            py-3
            rounded-xl
            font-semibold
            transition
          "
        >
          {loading ? "Creating..." : "Create Event"}
        </button>

      </div>

    </div>
  );
}

export default CreateEvent;