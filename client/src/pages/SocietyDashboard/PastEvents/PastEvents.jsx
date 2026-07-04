import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getPastEvents,
  getPastEventDetails,
} from "../../../services/eventServices";

import SearchBar from "./components/SearchBar";
import PastEventCard from "./components/PastEventCard";
import EmptyState from "./components/EmptyState";
import EventDetailsModal from "./components/EventDetailsModal";

function PastEvents() {
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
        await getPastEvents(search);

      setEvents(response.events);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load past events"
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
    const response = await getPastEventDetails(
      event._id
    );

    setSelectedEvent(response.event);

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

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-800">
          Past Events
        </h1>

        <p className="text-gray-500 mt-2">
          View completed events.
        </p>

      </div>

      <div className="mb-8">

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

      </div>

      {loading ? (

        <div className="text-center py-20 text-lg text-gray-500">
          Loading...
        </div>

      ) : events.length === 0 ? (

        <EmptyState />

      ) : (

        <div className="grid lg:grid-cols-2 gap-8">

          {events.map((event) => (

            <PastEventCard
              key={event._id}
              event={event}
              onView={handleView}
            />

          ))}

        </div>

      )}

      <EventDetailsModal
        open={openModal}
        setOpen={setOpenModal}
        event={selectedEvent}
      />

    </div>
  );
}

export default PastEvents;