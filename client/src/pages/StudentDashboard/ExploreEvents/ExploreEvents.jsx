import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getAllEvents,
  getEventDetails,
} from "../../../services/studentServices";

import SearchBar from "./components/SearchBar";
import EventCard from "./components/EventCard";
import EmptyState from "./components/EmptyState";
import EventDetailsModal from "./components/EventDetailsModal";

function ExploreEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [selectedEvent, setSelectedEvent] =
    useState(null);

  const [openModal, setOpenModal] =
    useState(false);

  // Fetch Events

  const fetchEvents = async () => {
    try {
      setLoading(true);

      const response = await getAllEvents(
        search,
        status
      );

      setEvents(response.events || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load events"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [search, status]);

  // View Event

  const handleView = async (event) => {
    try {
      const response =
        await getEventDetails(event._id);

      setSelectedEvent(response);

      setOpenModal(true);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load event details"
      );
    }
  };

  // Refresh Selected Event

  const refreshSelectedEvent = async (
    eventId
  ) => {
    try {
      const response =
        await getEventDetails(eventId);

      setSelectedEvent(response);
    } catch (error) {
      console.error(error);
    }
  };

  // After Register

  const handleRegisterSuccess =
    async () => {
      await fetchEvents();

      if (selectedEvent?.event?._id) {
        await refreshSelectedEvent(
          selectedEvent.event._id
        );
      }
    };

  return (
    <div className="bg-slate-100 min-h-screen">

      <div className="p-4 sm:p-6 lg:p-8">

        {/* Heading */}

        <div className="mb-6 sm:mb-8">

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
            Explore Events
          </h1>

          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Discover upcoming campus events and register with ease.
          </p>

        </div>

        {/* Search */}

        <SearchBar
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
        />

        {/* Loading */}

        {loading ? (

          <div className="flex justify-center items-center h-60 text-lg text-gray-500">
            Loading...
          </div>

        ) : events.length === 0 ? (

          <EmptyState />

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 mt-8">

            {events.map((event) => (

              <EventCard
                key={event._id}
                event={event}
                onView={handleView}
              />

            ))}

          </div>

        )}

      </div>

      {/* Details Modal */}

      <EventDetailsModal
        open={openModal}
        setOpen={setOpenModal}
        eventData={selectedEvent}
        onRegisterSuccess={handleRegisterSuccess}
      />

    </div>
  );
}

export default ExploreEvents;