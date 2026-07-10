import {
    Calendar,
    MapPin,
    ArrowRight,
    MoreVertical,
    Award,
    MessageSquare,
} from "lucide-react";

import { useState, useRef, useEffect } from "react";

function RegistrationCard({
    registration,
    onView,
    onCertificate,
    onFeedback,
}) {

    const event = registration.event;

    const [menuOpen, setMenuOpen] =
        useState(false);

    const menuRef = useRef(null);

    useEffect(() => {

        const handleClickOutside = (e) => {

            if (
                menuRef.current &&
                !menuRef.current.contains(e.target)
            ) {

                setMenuOpen(false);

            }

        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

    }, []);

    const statusColor = {

        Upcoming:
            "bg-green-100 text-green-700",

        Ongoing:
            "bg-yellow-100 text-yellow-700",

        Completed:
            "bg-gray-100 text-gray-700",

    };

    return (

        <div className="w-full max-w-[340px] bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">

            {/* Banner */}

            <div className="relative">

                <img
                    src={
                        event.banner
                            ? event.banner
                            : "https://placehold.co/700x350/e2e8f0/64748b?text=Event"
                    }
                    alt={event.title}
                    className="w-full h-36 object-cover"
                />

                {/* Status */}

                <div className="absolute top-3 right-3">

                    <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[event.status]}`}
                    >
                        {event.status}
                    </span>

                </div>

            </div>

            {/* Body */}

            <div className="p-4">

                <div className="flex justify-between items-start">

                    <h2 className="text-lg font-bold leading-6 line-clamp-2 pr-2">

                        {event.title}

                    </h2>

                    {event.status === "Completed" && (

                        <div
                            className="relative"
                            ref={menuRef}
                        >

                            <button
                                onClick={() =>
                                    setMenuOpen(!menuOpen)
                                }
                                className="p-1.5 rounded-lg hover:bg-slate-100 transition"
                            >

                                <MoreVertical size={18} />

                            </button>

                            {menuOpen && (

                                <div
                                    className="
                    absolute
                    right-0
                    mt-2
                    w-56
                    bg-white
                    rounded-2xl
                    shadow-xl
                    border
                    overflow-hidden
                    z-50
                  "
                                >
                                    {
                                        event.registrationMode ===
                                        "Participant" &&
                                        registration.status ===
                                        "Attended" &&
                                        registration.certificateGenerated && (

                                            <button
                                                onClick={() => {

                                                    setMenuOpen(false);

                                                    onCertificate(
                                                        registration
                                                    );

                                                }}
                                                className="
                        w-full
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        hover:bg-slate-100
                        transition
                      "
                                            >

                                                <Award size={18} />

                                                Download Certificate

                                            </button>

                                        )}

                                    <button
                                        onClick={() => {

                                            setMenuOpen(false);

                                            onFeedback(
                                                registration
                                            );

                                        }}
                                        className="
                      w-full
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3
                      hover:bg-slate-100
                      transition
                    "
                                    >

                                        <MessageSquare
                                            size={18}
                                        />

                                        Give Feedback

                                    </button>

                                </div>

                            )}

                        </div>

                    )}

                </div>

                {/* Society */}

                <p className="text-blue-600 text-sm font-medium mt-2">

                    {event.organizer?.societyName}

                </p>

                {/* Venue */}

                <div className="flex items-center gap-2 mt-4 text-gray-600">

                    <MapPin
                        size={16}
                        className="text-red-500"
                    />

                    <span className="text-sm line-clamp-1">

                        {event.venue}

                    </span>

                </div>

                {/* Date */}

                <div className="flex items-center gap-2 mt-2 text-gray-600">

                    <Calendar
                        size={16}
                        className="text-blue-600"
                    />

                    <span className="text-sm">

                        {new Date(
                            event.date
                        ).toLocaleDateString(
                            "en-IN",
                            {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            }
                        )}

                    </span>

                </div>

                {/* View */}

                <button
                    onClick={() =>
                        onView(registration)
                    }
                    className="
            mt-5
            w-full
            bg-white
            border
            border-slate-300
            hover:bg-slate-100
            text-slate-800
            py-2.5
            rounded-xl
            flex
            justify-center
            items-center
            gap-2
            font-semibold
            transition
          "
                >

                    View Details

                    <ArrowRight size={17} />

                </button>

            </div>

        </div>

    );

}

export default RegistrationCard;