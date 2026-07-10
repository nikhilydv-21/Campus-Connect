
import {
    X,
    Calendar,
    Clock,
    MapPin,
    Users,
    CalendarDays,
    Building2,
} from "lucide-react";

function EventDetailsModal({
    open,
    setOpen,
    event,
}) {

    if (!open || !event) return null;

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

    const formatTime = (time) => {

        if (!time) return "";

        const [hour, minute] =
            time.split(":");

        const date = new Date();

        date.setHours(Number(hour));

        date.setMinutes(Number(minute));

        return date.toLocaleTimeString(
            "en-IN",
            {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            }
        );

    };

    const infoCard =
        "bg-slate-50 border rounded-2xl p-5";

    return (

        <div
            onClick={() => setOpen(false)}
            className="
        fixed
        inset-0
        bg-black/60
        z-50
        flex
        justify-center
        items-center
        p-5
      "
        >

            <div
                onClick={(e) => e.stopPropagation()}
                className="
          bg-white
          w-full
          max-w-4xl
          rounded-3xl
          overflow-hidden
          shadow-2xl
          max-h-[92vh]
          overflow-y-auto
        "
            >

                {/* Header */}

                <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-20">

                    <h2 className="text-3xl font-bold">

                        Event Details

                    </h2>

                    <button
                        onClick={() => setOpen(false)}
                        className="p-2 rounded-full hover:bg-slate-100 transition"
                    >

                        <X size={24} />

                    </button>

                </div>

                {/* Banner */}

                {event.banner ? (

                    <img
                        src={event.banner}
                        alt={event.title}
                        className="w-full h-72 object-cover"
                    />

                ) : (

                    <div className="w-full h-72 bg-slate-200 flex items-center justify-center text-gray-500">

                        No Banner Available

                    </div>

                )}

                <div className="p-8 space-y-8">

                    {/* Title */}

                    <div>

                        <h1 className="text-4xl font-bold">

                            {event.title}

                        </h1>

                        <p className="text-gray-500 mt-3">

                            Organized by

                            <span className="text-blue-600 font-semibold ml-2">

                                {event.organizer?.societyName}

                            </span>

                        </p>

                    </div>

                    {/* Info */}

                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">


                        <div className={infoCard}>

                            <div className="flex gap-2 items-center">

                                <MapPin className="text-red-500" />

                                <span className="font-semibold">

                                    Venue

                                </span>

                            </div>

                            <p className="mt-3">

                                {event.venue}

                            </p>

                        </div>
                        <div className={infoCard}>

                            <div className="flex gap-2 items-center">

                                <Building2 className="text-slate-700" />

                                <span className="font-semibold">
                                    Category
                                </span>

                            </div>

                            <p className="mt-3">

                                {event.category}

                            </p>

                        </div>

                        <div className={infoCard}>

                            <div className="flex gap-2 items-center">

                                <Calendar className="text-blue-600" />

                                <span className="font-semibold">

                                    Event Date

                                </span>

                            </div>

                            <p className="mt-3">

                                {formatDate(event.date)}

                            </p>

                        </div>
                        <div className={infoCard}>

                            <div className="flex gap-2 items-center">

                                <Clock className="text-orange-500" />

                                <span className="font-semibold">

                                    Time

                                </span>

                            </div>

                            <p className="mt-3">

                                {formatTime(event.startTime)} -{" "}
                                {formatTime(event.endTime)}

                            </p>

                        </div>

                        <div className={infoCard}>

                            <div className="flex gap-2 items-center">

                                <Users className="text-green-600" />

                                <span className="font-semibold">

                                    Registration Mode

                                </span>

                            </div>

                            <p className="mt-3">

                                {event.registrationMode}

                            </p>

                        </div>

                        {event.registrationMode === "Participant" && (

                            <>

                                <div className={infoCard}>

                                    <div className="flex gap-2 items-center">

                                        <Users className="text-blue-600" />

                                        <span className="font-semibold">

                                            Maximum Participants

                                        </span>

                                    </div>

                                    <p className="mt-3">

                                        {event.maximumParticipants}

                                    </p>

                                </div>

                                <div className={infoCard}>

                                    <div className="flex gap-2 items-center">

                                        <Users className="text-indigo-600" />

                                        <span className="font-semibold">

                                            Total Registrations

                                        </span>

                                    </div>

                                    <p className="mt-3">

                                        {event.totalRegistrations}

                                    </p>

                                </div>

                                <div className={infoCard}>

                                    <div className="flex gap-2 items-center">

                                        <CalendarDays className="text-purple-600" />

                                        <span className="font-semibold">

                                            Registration Deadline

                                        </span>

                                    </div>

                                    <p className="mt-3">

                                        {formatDate(event.registrationDeadline)}

                                    </p>

                                </div>

                            </>

                        )}

                    </div>

                    {/* Description */}

                    <div className="border rounded-2xl p-6">

                        <h2 className="text-2xl font-bold mb-4">

                            Description

                        </h2>

                        <p className="text-gray-600 whitespace-pre-wrap leading-8">

                            {event.description ||
                                "No description available."}

                        </p>

                    </div>

                    {/* Footer */}

                    <div className="flex justify-end">



                    </div>

                </div>

            </div>

        </div>

    );

}

export default EventDetailsModal;