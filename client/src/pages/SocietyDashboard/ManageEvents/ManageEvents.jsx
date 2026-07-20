import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getMyEvents } from "../../../services/eventServices";

import SearchBar from "./components/SearchBar";
import StatusFilter from "./components/StatusFilter";
import EventCard from "./components/EventCard";
import DeleteModal from "./components/DeleteModal";
import EmptyState from "./components/EmptyState";
import EventDetailsModal from "./components/EventDetailsModal";

function ManageEvents({
  setActivePage,
  setSelectedEventId,
}) {
  const [events, setEvents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [deleteModal, setDeleteModal] =
    useState(false);

  const [selectedEvent, setSelectedEvent] =
    useState(null);

  const [viewModal, setViewModal] =
    useState(false);

  const fetchEvents = async () => {
    try {
      setLoading(true);

      const response =
        await getMyEvents(
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

  const handleParticipants = (id) => {
    setSelectedEventId(id);
    setActivePage("participants");
  };

  const handleDelete = (event) => {
    setSelectedEvent(event);
    setDeleteModal(true);
  };

  const handleView = (event) => {
    setSelectedEvent(event);
    setViewModal(true);
  };

  return (
    <div className="bg-slate-100 min-h-screen p-4 sm:p-6 lg:p-8">

      {/* Heading */}

      <div className="mb-6 sm:mb-8">

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
          Manage Events
        </h1>

        <p className="mt-2 text-sm sm:text-base text-gray-500">
          View, search, edit and manage your events.
        </p>

      </div>

      {/* Search & Filter */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8">

        <div className="md:col-span-3">

          <SearchBar
            search={search}
            setSearch={setSearch}
          />

        </div>

        <div className="md:col-span-1">

          <StatusFilter
            status={status}
            setStatus={setStatus}
          />

        </div>

      </div>

      {/* Content */}

      {loading ? (

        <div className="text-center py-16 sm:py-20 text-base sm:text-lg text-gray-500">

          Loading Events...

        </div>

      ) : events.length === 0 ? (

        <EmptyState />

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 justify-items-center">

          {events.map((event) => (

            <EventCard
              key={event._id}
              event={event}
              onView={handleView}
              onEdit={handleEdit}
              onParticipants={handleParticipants}
              onDelete={handleDelete}
            />

          ))}

        </div>

      )}

      {/* Delete Modal */}

      <DeleteModal
        open={deleteModal}
        setOpen={setDeleteModal}
        event={selectedEvent}
        refreshEvents={fetchEvents}
      />

      {/* View Modal */}

      <EventDetailsModal
        open={viewModal}
        setOpen={setViewModal}
        event={selectedEvent}
      />

    </div>
  );
}

export default ManageEvents;