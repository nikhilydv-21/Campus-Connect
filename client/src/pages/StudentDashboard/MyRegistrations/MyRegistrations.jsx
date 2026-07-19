import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getMyEvents,
  getEventDetails,
  downloadCertificate,
} from "../../../services/studentServices";

import SearchBar from "./components/SearchBar";
import RegistrationCard from "./components/RegistrationCard";
import EmptyState from "./components/EmptyState";
import EventDetailsModal from "../ExploreEvents/components/EventDetailsModal";
import FeedbackModal from "./components/FeedbackModal";

function MyRegistrations() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [feedbackOpen, setFeedbackOpen] =
    useState(false);

  const [feedbackRegistration, setFeedbackRegistration] =
    useState(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [selectedEvent, setSelectedEvent] =
    useState(null);

  const [openModal, setOpenModal] =
    useState(false);

  const fetchEvents = async () => {
    try {
      setLoading(true);

      const response =
        await getMyEvents(
          search,
          status
        );

      setEvents(response.events || []);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to load registered events"
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchEvents();
  }, [search, status]);

  const handleView = async (
    registration
  ) => {
    try {

      const response =
        await getEventDetails(
          registration.event._id
        );

      setSelectedEvent(response);

      setOpenModal(true);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to load event details"
      );

    }
  };

  const handleFeedback = (
    registration
  ) => {

    setFeedbackRegistration(
      registration
    );

    setFeedbackOpen(true);

  };

  const handleDownloadCertificate = async (
    registration
  ) => {

    try {

      const response =
        await downloadCertificate(
          registration.event._id
        );

      const link =
        document.createElement("a");

      link.href =
        response.certificateUrl;

      link.download =
        "Certificate.pdf";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to download certificate"
      );

    }

  };

  return (
    <div className="bg-slate-100 min-h-screen p-4 sm:p-6 lg:p-8">

      {/* Heading */}

      <div className="mb-6 sm:mb-8">

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
          My Registrations
        </h1>

        <p className="mt-2 text-sm sm:text-base text-gray-500">
          Manage all your registered events.
        </p>

      </div>

      {/* Search */}

      <div className="mb-6 sm:mb-8">

        <SearchBar
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
        />

      </div>

      {/* Events */}

      {loading ? (

        <div className="flex justify-center items-center h-60 text-base sm:text-lg text-gray-500">
          Loading...
        </div>

      ) : events.length === 0 ? (

        <EmptyState />

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">

          {events.map((registration) => (

            <RegistrationCard
              key={registration._id}
              registration={registration}
              onView={handleView}
              onFeedback={handleFeedback}
              onCertificate={handleDownloadCertificate}
            />

          ))}

        </div>

      )}

      <EventDetailsModal
        open={openModal}
        setOpen={setOpenModal}
        eventData={selectedEvent}
        hideRegisterButton={true}
      />

      <FeedbackModal
        open={feedbackOpen}
        setOpen={setFeedbackOpen}
        registration={feedbackRegistration}
        onSuccess={fetchEvents}
      />

    </div>
  );
}

export default MyRegistrations;