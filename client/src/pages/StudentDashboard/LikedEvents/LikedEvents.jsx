import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getLikedEvents,
  getEventDetails,
} from "../../../services/studentServices";

import SearchBar from "./components/SearchBar";
import EmptyState from "./components/EmptyState";

import EventCard from "../ExploreEvents/components/EventCard";
import EventDetailsModal from "../ExploreEvents/components/EventDetailsModal";

function LikedEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedEvent, setSelectedEvent] =
    useState(null);

  const [openModal, setOpenModal] =
    useState(false);

  const fetchEvents = async () => {
    try {

      setLoading(true);

      const response =
        await getLikedEvents(search);

      setEvents(response.events || []);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to load liked events"
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchEvents();
  }, [search]);

  const handleView = async (event) => {
    try {

      const response =
        await getEventDetails(
          event._id
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
          Liked Events
        </h1>

        <p className="text-gray-500 mt-2">
          All the events you've liked.
        </p>

      </div>

      {/* Search */}

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      {/* Cards */}

      {loading ? (

        <div className="text-center py-20 text-lg text-gray-500">
          Loading...
        </div>

      ) : events.length === 0 ? (

        <EmptyState />

      ) : (

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">

          {events.map((event) => (

            <EventCard
              key={event._id}
              event={event}
              onView={handleView}
               onUnlike={(id) =>
                setEvents((prev) =>
                 prev.filter((event) => event._id !== id)
            )
        }
            />

          ))}

        </div>

      )}

      <EventDetailsModal
        open={openModal}
        setOpen={setOpenModal}
        eventData={selectedEvent}
        onRegisterSuccess={fetchEvents}
      />

    </div>
  );
}

export default LikedEvents;