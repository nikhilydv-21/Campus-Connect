import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getMyEvents } from "../../../services/eventServices";

import SearchBar from "./components/SearchBar";
import StatusFilter from "./components/StatusFilter";
import EventCard from "./components/EventCard";
import DeleteModal from "./components/DeleteModal";
import EmptyState from "./components/EmptyState";

function ManageEvents({
  setActivePage,
  setSelectedEventId,
}) {
    const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");
  
  const [deleteModal, setDeleteModal] =
    useState(false);

  const [selectedEvent, setSelectedEvent] =
    useState(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);

      const response = await getMyEvents(
        search,
        status
      );

      setEvents(response.events);
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

  const handleEdit = (id) => {
  setSelectedEventId(id);
  setActivePage("edit-event");
};

  const handleDelete = (event) => {
    setSelectedEvent(event);
    setDeleteModal(true);
  };

  return (
    <div className="bg-slate-100 min-h-screen p-8">

      {/* Heading */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-800">
          Manage Events
        </h1>

        <p className="text-gray-500 mt-2">
          View, search, edit and delete your
          events.
        </p>

      </div>

      {/* Search + Filter */}

      <div className="grid md:grid-cols-2 gap-5 mb-8">

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <StatusFilter
          status={status}
          setStatus={setStatus}
        />

      </div>

      {/* Loading */}

      {loading ? (

        <div className="text-center py-20 text-gray-500 text-lg">
          Loading Events...
        </div>

      ) : events.length === 0 ? (

        <EmptyState />

      ) : (

        <div className="grid lg:grid-cols-2 gap-8">

          {events.map((event) => (

            <EventCard
              key={event._id}
              event={event}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

          ))}

        </div>

      )}

      <DeleteModal
        open={deleteModal}
        setOpen={setDeleteModal}
        event={selectedEvent}
        refreshEvents={fetchEvents}
      />

    </div>
  );
}

export default ManageEvents;