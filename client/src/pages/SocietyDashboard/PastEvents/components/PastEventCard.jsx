import {
  Calendar,
  MapPin,
  Eye,
  Heart,
  MoreVertical,
  Award,
} from "lucide-react";
import GenerateCertificateModal from "./GenerateCertificateModal";
import { useState, useRef, useEffect } from "react";

function PastEventCard({
  event,
  onView,
  onGenerateCertificates,
  loadingCertificate,
}) {

  const [confirmOpen, setConfirmOpen] =
    useState(false);

  const [openMenu, setOpenMenu] =
    useState(false);

  const menuRef = useRef(null);

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {

        setOpenMenu(false);

      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);

  return (

    <div
      className="
        w-full
        max-w-sm
        bg-white
        rounded-2xl
        sm:rounded-3xl
        shadow-md
        hover:shadow-xl
        transition-all
        duration-300
        overflow-hidden
      "
    >

      {/* Banner */}

      <div
        className="relative"
        ref={menuRef}
      >

        {event.banner ? (

          <img
            src={event.banner}
            alt={event.title}
            className="
              w-full
              h-40
              sm:h-36
              object-cover
            "
          />

        ) : (

          <div
            className="
              w-full
              h-40
              sm:h-36
              bg-slate-200
              flex
              items-center
              justify-center
              text-sm
              text-gray-500
            "
          >

            No Banner

          </div>

        )}

        {/* Three Dot Menu */}

        <div className="absolute top-3 right-3">

          <div className="relative">

            <button
              onClick={() =>
                setOpenMenu(!openMenu)
              }
              className="
                bg-white
                rounded-full
                p-2
                shadow
                hover:bg-slate-100
                transition
              "
            >

              <MoreVertical size={18} />

            </button>

            {openMenu && (

              <div
                className="
                  absolute
                  right-0
                  mt-2
                  w-56
                  sm:w-60
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

                    setOpenMenu(false);

                    onView(event);

                  }}
                  className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    text-sm
                    sm:text-base
                    hover:bg-slate-100
                    transition
                  "
                >

                  <Eye
                    size={18}
                    className="shrink-0"
                  />

                  View Report

                </button>

                {event.registrationMode ===
                  "Participant" && (

                  event.certificateGenerated ? (

                    <button
                      disabled
                      className="
                        w-full
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        bg-slate-50
                        text-slate-700
                        font-semibold
                        border-t
                        text-sm
                        sm:text-base
                        cursor-default
                      "
                    >

                      <Award
                        size={18}
                        className="text-amber-500 shrink-0"
                      />

                      Certificates Generated

                    </button>

                  ) : (

                    <button
                      onClick={() => {

                        setOpenMenu(false);

                        setConfirmOpen(true);

                      }}
                      className="
                        w-full
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        text-sm
                        sm:text-base
                        hover:bg-slate-100
                        transition
                      "
                    >

                      <Award
                        size={18}
                        className="shrink-0"
                      />

                      Generate Certificates

                    </button>

                  )

                )}

              </div>

            )}

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="p-4 sm:p-5">

        <h2
          className="
            text-lg
            font-bold
            leading-6
            line-clamp-2
            break-words
          "
        >

          {event.title}

        </h2>

        <div className="flex items-center gap-2 mt-4 text-gray-600">

          <MapPin
            size={16}
            className="text-red-500 shrink-0"
          />

          <span className="text-sm line-clamp-1">

            {event.venue}

          </span>

        </div>

        <div className="flex items-center gap-2 mt-2 text-gray-600">

          <Calendar
            size={16}
            className="text-blue-600 shrink-0"
          />

          <span className="text-sm">

            {new Date(event.date).toLocaleDateString(
              "en-IN",
              {
                day: "numeric",
                month: "short",
                year: "numeric",
              }
            )}

          </span>

        </div>

        {/* Registration Mode + Likes */}

        <div className="mt-4 flex items-start justify-between gap-3">

          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold break-words ${
              event.registrationMode ===
              "Participant"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >

            {event.registrationMode}

          </span>

          <div className="flex items-center gap-1.5 text-slate-600 shrink-0">

            <Heart
              size={16}
              className={
                event.likes > 0
                  ? "text-red-500 fill-red-500"
                  : "text-gray-400"
              }
            />

            <span className="text-sm font-medium">

              {event.likes}

            </span>

          </div>

        </div>

        <GenerateCertificateModal
          open={confirmOpen}
          setOpen={setConfirmOpen}
          loading={loadingCertificate}
          onConfirm={async () => {

            await onGenerateCertificates(
              event._id
            );

            setConfirmOpen(false);

          }}
        />

      </div>

    </div>

  );

}

export default PastEventCard;