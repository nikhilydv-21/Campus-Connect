import {
    Calendar,
    MapPin,
    Users,
    Star,
    MessageSquare,
    Tag,
    X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { getEventFeedback } from "../../../../services/authServices";
import FeedbackModal from "./FeedbackModal";
function EventDetailsModal({
    open,
    setOpen,
    event,
}) {
    const [feedbackOpen, setFeedbackOpen] = useState(false);

    const [allFeedback, setAllFeedback] = useState([]);

    const [loadingFeedback, setLoadingFeedback] = useState(false);
    const navigate = useNavigate();
    if (!open || !event) return null;

    const {
        event: details,
        counts,
        averageRating,
        feedbackCount,
        recentFeedback,
    } = event;

    const formatDate = (date) => {

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "long",
                year: "numeric",
            }
        );

    };
    const handleViewFeedback = async () => {
        try {
            setLoadingFeedback(true);

            const response = await getEventFeedback(details._id);

            setAllFeedback(response.feedbacks);

            setFeedbackOpen(true);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load feedback"
            );

        } finally {

            setLoadingFeedback(false);

        }
    };

    return (
        <>

            <div
                onClick={() => setOpen(false)}
                className="
        fixed
        inset-0
        bg-black/60
        backdrop-blur-sm
        flex
        justify-center
        items-center
        z-50
        p-5
      "
            >

                <div
                    onClick={(e) => e.stopPropagation()}
                    className="
          bg-white
          w-full
          max-w-6xl
          rounded-3xl
          overflow-hidden
          shadow-2xl
          max-h-[94vh]
          overflow-y-auto
        "
                >

                    {/* Banner */}

                    <div className="relative">

                        {details.banner ? (

                            <img
                                src={details.banner}
                                alt={details.title}
                                className="w-full h-80 object-cover"
                            />

                        ) : (

                            <div
                                className="
                w-full
                h-80
                bg-slate-200
                flex
                items-center
                justify-center
                text-gray-500
                text-lg
              "
                            >

                                No Banner Available

                            </div>

                        )}

                        {/* Overlay */}

                        <div
                            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/80
              via-black/20
              to-transparent
            "
                        />

                        {/* Close */}

                        <button
                            onClick={() => setOpen(false)}
                            className="
              absolute
              top-5
              right-5
              bg-white/90
              backdrop-blur
              p-2
              rounded-full
              hover:bg-white
              transition
            "
                        >

                            <X size={22} />

                        </button>

                        {/* Title */}

                        <div
                            className="
              absolute
              bottom-8
              left-8
              text-white
            "
                        >

                            <h1 className="text-4xl font-bold">

                                {details.title}

                            </h1>

                            <div
                                className="
                flex
                gap-3
                mt-4
                flex-wrap
              "
                            >

                                <span
                                    className="
                  px-4
                  py-1.5
                  rounded-full
                  bg-white/20
                  backdrop-blur
                  text-sm
                  font-medium
                "
                                >

                                    {details.category}

                                </span>



                            </div>

                        </div>

                    </div>

                    {/* Body */}

                    <div className="p-8">
                        {/* Information */}

                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

                            {/* Venue */}

                            <div className="border rounded-2xl p-5 hover:shadow-md transition">

                                <div className="flex items-center gap-3">

                                    <MapPin
                                        size={20}
                                        className="text-red-500"
                                    />

                                    <span className="font-semibold text-slate-800">
                                        Venue
                                    </span>

                                </div>

                                <p className="mt-4 text-slate-700 text-[15px] leading-6">

                                    {details.venue}

                                </p>

                            </div>

                            {/* Date */}

                            <div className="border rounded-2xl p-5 hover:shadow-md transition">

                                <div className="flex items-center gap-3">

                                    <Calendar
                                        size={20}
                                        className="text-blue-600"
                                    />

                                    <span className="font-semibold text-slate-800">
                                        Event Date
                                    </span>

                                </div>

                                <p className="mt-4 text-slate-700 text-[15px]">

                                    {formatDate(details.date)}

                                </p>

                            </div>

                            {/* Category */}

                            <div className="border rounded-2xl p-5 hover:shadow-md transition">

                                <div className="flex items-center gap-3">

                                    <Tag
                                        size={20}
                                        className="text-slate-700"
                                    />

                                    <span className="font-semibold text-slate-800">
                                        Category
                                    </span>

                                </div>

                                <p className="mt-4 text-slate-700 text-[15px]">

                                    {details.category}

                                </p>

                            </div>

                            {/* Registration */}

                            <div className="border rounded-2xl p-5 hover:shadow-md transition">

                                <div className="flex items-center gap-3">

                                    <Users
                                        size={20}
                                        className="text-emerald-600"
                                    />

                                    <span className="font-semibold text-slate-800">
                                        Registration Mode
                                    </span>

                                </div>

                                <p className="mt-4 text-slate-700 text-[15px]">

                                    {details.registrationMode}

                                </p>

                            </div>

                            {/* Total Registrations */}

                            <div className="border rounded-2xl p-5 hover:shadow-md transition">

                                <div className="flex items-center gap-3">

                                    <Users
                                        size={20}
                                        className="text-indigo-600"
                                    />

                                    <span className="font-semibold text-slate-800">
                                        Total Registrations
                                    </span>

                                </div>

                                <p className="mt-4 text-3xl font-bold text-slate-800">

                                    {counts?.registered ?? details.totalRegistrations ?? 0}

                                </p>

                            </div>

                        </div>
                        {/* Statistics */}

                        <div className="mt-10">

                            <div className="flex items-center justify-between mb-6">

                                <h2 className="text-2xl font-bold text-slate-800">

                                    Event Statistics

                                </h2>

                                <span className="text-sm text-gray-500">

                                    Event Overview

                                </span>

                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

                                {/* Average Rating */}

                                <div
                                    className="
                  border
                  rounded-2xl
                  p-6
                  hover:shadow-md
                  transition
                  bg-white
                "
                                >

                                    <Star
                                        size={26}
                                        className="text-yellow-500 mb-5"
                                    />

                                    <p className="text-sm text-gray-500">

                                        Average Rating

                                    </p>

                                    <h2 className="text-3xl font-bold text-slate-800 mt-2">

                                        {averageRating > 0
                                            ? averageRating.toFixed(1)
                                            : "--"}

                                    </h2>

                                </div>

                                {/* Feedback */}

                                <div
                                    className="
                  border
                  rounded-2xl
                  p-6
                  hover:shadow-md
                  transition
                  bg-white
                "
                                >

                                    <MessageSquare
                                        size={26}
                                        className="text-indigo-600 mb-5"
                                    />

                                    <p className="text-sm text-gray-500">

                                        Feedback Received

                                    </p>

                                    <h2 className="text-3xl font-bold text-slate-800 mt-2">

                                        {feedbackCount}

                                    </h2>

                                </div>

                                {/* Attended */}

                                <div
                                    className="
                  border
                  rounded-2xl
                  p-6
                  hover:shadow-md
                  transition
                  bg-white
                "
                                >

                                    <Users
                                        size={26}
                                        className="text-green-600 mb-5"
                                    />

                                    <p className="text-sm text-gray-500">

                                        Attended

                                    </p>

                                    <h2 className="text-3xl font-bold text-slate-800 mt-2">

                                        {details.registrationMode === "Participant"
                                            ? counts?.attended ?? 0
                                            : "--"}

                                    </h2>

                                </div>

                                {/* Absent */}

                                <div
                                    className="
                  border
                  rounded-2xl
                  p-6
                  hover:shadow-md
                  transition
                  bg-white
                "
                                >

                                    <Users
                                        size={26}
                                        className="text-red-500 mb-5"
                                    />

                                    <p className="text-sm text-gray-500">

                                        Absent

                                    </p>

                                    <h2 className="text-3xl font-bold text-slate-800 mt-2">

                                        {details.registrationMode === "Participant"
                                            ? counts?.absent ?? 0
                                            : "--"}

                                    </h2>

                                </div>

                            </div>

                        </div>
                        {/* Recent Feedback */}

                        <div className="mt-12">

                            <div className="flex justify-between items-center mb-6">

                                <div>

                                    <h2 className="text-2xl font-bold text-slate-800">

                                        Recent Feedback

                                    </h2>

                                    <p className="text-gray-500 mt-1 text-sm">

                                        Latest responses submitted by participants.

                                    </p>

                                </div>

                                <button
                                    onClick={handleViewFeedback}
                                    className="text-blue-600 hover:text-blue-700 font-semibold"
                                >
                                    {loadingFeedback
                                        ? "Loading..."
                                        : "View All Feedback →"}
                                </button>
                            </div>

                            {recentFeedback.length === 0 ? (

                                <div
                                    className="
                  border
                  rounded-2xl
                  py-12
                  text-center
                  text-gray-500
                  bg-slate-50
                "
                                >

                                    <MessageSquare
                                        size={42}
                                        className="mx-auto mb-4 text-gray-400"
                                    />

                                    <h3 className="text-lg font-semibold">

                                        No Feedback Yet

                                    </h3>

                                    <p className="mt-2">

                                        Participants haven't submitted feedback yet.

                                    </p>

                                </div>

                            ) : (

                                <div className="space-y-4">

                                    {recentFeedback
                                        .slice(0, 3)
                                        .map((item, index) => (

                                            <div
                                                key={index}
                                                className="
                        border
                        rounded-2xl
                        p-5
                        hover:shadow-md
                        transition
                        bg-white
                      "
                                            >

                                                <div className="flex justify-between items-center">

                                                    <div className="font-semibold text-slate-800">

                                                        {item.student}

                                                    </div>

                                                    <div className="flex items-center gap-1">

                                                        <Star
                                                            size={18}
                                                            className="text-yellow-500 fill-yellow-400"
                                                        />

                                                        <span className="font-semibold">

                                                            {item.rating}/5

                                                        </span>

                                                    </div>

                                                </div>

                                                <p className="mt-4 text-gray-600 leading-7">

                                                    {item.comment}

                                                </p>

                                            </div>

                                        ))}

                                </div>

                            )}

                        </div>

                    </div>

                </div>

            </div>
            <FeedbackModal

                open={feedbackOpen}

                setOpen={setFeedbackOpen}

                feedbacks={allFeedback}

            />
        </>
    );

}

export default EventDetailsModal;