import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

import {
    getEventParticipants,
} from "../../../services/eventServices";

import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import SearchBar from "./components/SearchBar";
import ParticipantsTable from "./components/ParticipantsTable";
import ActionMenu from "./components/ActionMenu";

function Participants({
    eventId,
    setActivePage,
}) {

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    const [attendanceFilter, setAttendanceFilter] =
        useState("");

    const [event, setEvent] =
        useState(null);

    const [participants, setParticipants] =
        useState([]);

    const [counts, setCounts] =
        useState({
            registered: 0,
            attended: 0,
            absent: 0,
        });

    const fetchParticipants = async () => {

        try {

            setLoading(true);

            const response =
                await getEventParticipants(
                    eventId,
                    search,
                    attendanceFilter
                );

            setEvent(response.event);

            setParticipants(
                response.participants
            );

            setCounts(response.counts);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load participants"
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        if (eventId) {

            fetchParticipants();

        }

    }, [
        eventId,
        search,
        attendanceFilter,
    ]);

    return (

        <div className="bg-slate-100 min-h-screen p-8">

            {/* Back */}

            <button
                onClick={() =>
                    setActivePage("manage-events")
                }
                className="
          flex
          items-center
          gap-2
          text-blue-600
          font-semibold
          mb-6
          hover:text-blue-700
          transition
        "
            >

                <ArrowLeft size={20} />

                Back

            </button>

            {/* Heading */}

            <Header event={event} />

            {/* Summary */}

            <SummaryCards counts={counts} />

            {/* Search + Filter + Actions */}

            <div className="flex flex-col lg:flex-row justify-between gap-5 mt-8 mb-6">

                <SearchBar
                    search={search}
                    setSearch={setSearch}
                    attendanceFilter={attendanceFilter}
                    setAttendanceFilter={setAttendanceFilter}
                />

                <ActionMenu
                    eventId={eventId}
                    event={event}
                    attendanceFilter={attendanceFilter}
                />
            </div>

            {/* Table */}

            <ParticipantsTable
                loading={loading}
                participants={participants}
                counts={counts}
                eventId={eventId}
                refresh={fetchParticipants}
                setCounts={setCounts}
                setParticipants={setParticipants}
            />

        </div>

    );

}

export default Participants;