import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getAllEvents,
} from "../../../services/adminServices";

import SearchBar from "./components/SearchBar";
import EventCard from "./components/EventCard";
import EmptyState from "./components/EmptyState";

function Events() {

  const [events, setEvents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [status, setStatus] =
    useState("");

  const fetchEvents = async () => {

    try {

      setLoading(true);

      const response =
        await getAllEvents(
          search,
          category,
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

  }, [search, category, status]);

  return (

    <div className="bg-slate-100 min-h-screen">

      {/* Heading */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-800">

          All Events

        </h1>

        <p className="text-gray-500 mt-2">

          View all events organized by societies.

        </p>

      </div>

      <SearchBar

        search={search}
        setSearch={setSearch}

        category={category}
        setCategory={setCategory}

        status={status}
        setStatus={setStatus}

      />

      {loading ? (

        <div className="text-center py-20">

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

            />

          ))}

        </div>

      )}

    </div>

  );

}

export default Events;