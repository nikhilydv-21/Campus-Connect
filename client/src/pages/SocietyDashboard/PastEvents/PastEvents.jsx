import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getPastEvents,
  getPastEventDetails,
  generateCertificates,
} from "../../../services/eventServices";

import SearchBar from "./components/SearchBar";
import PastEventCard from "./components/PastEventCard";
import EmptyState from "./components/EmptyState";
import EventDetailsModal from "./components/EventDetailsModal";

function PastEvents() {

  const [loadingCertificate, setLoadingCertificate] =
    useState(false);

  const [events, setEvents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

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

      const response =
        await getPastEventDetails(
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

  const handleGenerateCertificates = async (id) => {

    try {

      setLoadingCertificate(true);

      await generateCertificates(id);

      toast.success(
        "Certificates generated successfully."
      );

      fetchEvents();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );

    } finally {

      setLoadingCertificate(false);

    }

  };

  return (

    <div className="bg-slate-100 min-h-screen p-4 sm:p-6 lg:p-8">

      {/* Heading */}

      <div className="mb-6 sm:mb-8">

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">

          Past Events

        </h1>

        <p className="mt-2 text-sm sm:text-base text-gray-500">

          View completed events.

        </p>

      </div>

      {/* Search */}

      <div className="mb-6 sm:mb-8">

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

      </div>

      {/* Content */}

      {loading ? (

        <div className="py-16 sm:py-20 text-center text-base sm:text-lg text-gray-500">

          Loading...

        </div>

      ) : events.length === 0 ? (

        <EmptyState />

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 justify-items-center">

          {events.map((event) => (

            <PastEventCard
              key={event._id}
              event={event}
              onView={handleView}
              onGenerateCertificates={handleGenerateCertificates}
              loadingCertificate={loadingCertificate}
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