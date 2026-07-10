import {
    useState,
    useEffect,
    useRef,
} from "react";
import { Heart } from "lucide-react";
import {
    Calendar,
    Clock,
    Users,
    Edit,
    Trash2,
    Eye,
    MoreVertical,
} from "lucide-react";
import { toggleEventLike } from "../../../../services/eventServices";
function EventCard({
    event,
    onView,
    onEdit,
    onParticipants,
    onDelete,
}) {

    const [menuOpen, setMenuOpen] =
        useState(false);
    const [liked, setLiked] = useState(event.isLiked);

    const [likes, setLikes] = useState(event.likes);
    useEffect(() => {
        setLiked(event.isLiked);
        setLikes(event.likes);
    }, [event]);

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

    const formatTime = (time) => {

        if (!time) return "";

        const [hour, minute] =
            time.split(":");

        const date = new Date();

        date.setHours(hour);

        date.setMinutes(minute);

        return date.toLocaleTimeString(
            "en-US",
            {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            }
        );

    };

    const statusColor = {

        Upcoming:
            "bg-green-100 text-green-700",

        Ongoing:
            "bg-yellow-100 text-yellow-700",

        Completed:
            "bg-gray-100 text-gray-700",

        Cancelled:
            "bg-red-100 text-red-700",

    };

    const handleLike = async () => {

        try {

            const response =
                await toggleEventLike(event._id);

            setLiked(response.liked);

            setLikes(response.likes);

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="w-full max-w-[340px] bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">

            {/* Banner */}

            <div className="relative">

                {event.banner ? (

                    <img
                        src={event.banner}
                        alt={event.title}
                        className="w-full h-36 object-cover"
                    />

                ) : (

                    <div className="w-full h-36 bg-slate-200 flex items-center justify-center">

                        No Banner

                    </div>

                )}

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

                    <h2 className="text-lg font-bold leading-6 line-clamp-2 pr-3">

                        {event.title}

                    </h2>

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
                  w-48
                  bg-white
                  rounded-2xl
                  shadow-xl
                  border
                  overflow-hidden
                  z-50
                "
                            >

                                <button
                                    onClick={() => {

                                        setMenuOpen(false);

                                        onView(event);

                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-100 transition"
                                >

                                    <Eye size={18} />

                                    View Details

                                </button>

                                <button
                                    onClick={() => {

                                        setMenuOpen(false);

                                        onEdit(event._id);

                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-100 transition"
                                >

                                    <Edit size={18} />

                                    Edit Event

                                </button>

                                <button
                                    onClick={() => {

                                        setMenuOpen(false);

                                        onDelete(event);

                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition"
                                >

                                    <Trash2 size={18} />

                                    Delete Event

                                </button>

                            </div>

                        )}

                    </div>

                </div>

                {/* Date */}

                <div className="flex items-center gap-2 mt-4 text-gray-600">

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

                {/* Time */}

                <div className="flex items-center gap-2 mt-2 text-gray-600">

                    <Clock
                        size={16}
                        className="text-orange-500"
                    />

                    <span className="text-sm">

                        {formatTime(
                            event.startTime
                        )}{" "}

                        -

                        {" "}

                        {formatTime(
                            event.endTime
                        )}

                    </span>

                </div>

                {/* Registration & Likes */}

                <div className="mt-4 flex items-center justify-between">


                    <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${event.registrationMode === "Participant"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                    >
                        {event.registrationMode === "Participant" ? (
                            <>
                                <Users size={13} className="mr-1" />
                                {event.totalRegistrations}/{event.maximumParticipants ?? "∞"}
                            </>
                        ) : (
                            "View Only Event"
                        )}
                    </span>
                    <button
                        onClick={handleLike}
                        className="flex items-center gap-1.5"
                    >

                        <Heart
                            size={16}
                            className={
                                liked
                                    ? "text-red-500 fill-red-500"
                                    : "text-gray-400"
                            }
                        />

                        <span className="text-sm font-medium text-slate-700">

                            {likes}

                        </span>

                    </button>

                </div>

                {/* Participants */}

                <button
                    onClick={() =>
                        onParticipants(
                            event._id
                        )
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

                    <Users size={17} />

                    Manage Attendees

                </button>

            </div>

        </div>

    );

}

export default EventCard;