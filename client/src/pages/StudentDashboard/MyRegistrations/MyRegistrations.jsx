import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getMyEvents,
  getEventDetails,
} from "../../../services/studentServices";

import SearchBar from "./components/SearchBar";
import RegistrationCard from "./components/RegistrationCard";
import EmptyState from "./components/EmptyState";
import EventDetailsModal from "../ExploreEvents/components/EventDetailsModal";

function MyRegistrations() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="bg-slate-100 min-h-screen p-8">

      {/* Heading */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-800">
          My Registrations
        </h1>

        <p className="text-gray-500 mt-2">
          Manage all your registered events.
        </p>

      </div>

      {/* Search */}

      <SearchBar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      {/* Events */}

      {loading ? (

        <div className="text-center py-20 text-lg text-gray-500">
          Loading...
        </div>

      ) : events.length === 0 ? (

        <EmptyState />

      ) : (

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">

          {events.map((registration) => (

            <RegistrationCard
              key={registration._id}
              registration={registration}
              onView={handleView}
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

    </div>
  );
}

export default MyRegistrations;