import { Eye, MoreVertical, LogOut } from "lucide-react";
import { useState, useEffect, useRef } from "react";

function SocietyCard({
  society,
  onView,
  onLeave,
}) {
  const [openMenu, setOpenMenu] =
    useState(false);

  const menuRef = useRef(null);

  // Close menu when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setOpenMenu(false);
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

  return (
    <div
      className="
        relative
        w-full
        bg-white
        rounded-2xl
        sm:rounded-3xl
        border
        border-slate-200
        shadow-sm
        hover:shadow-lg
        transition-all
        duration-300
      "
    >
      {/* Three Dot Menu */}

      <div
        ref={menuRef}
        className="absolute top-4 right-4 z-20"
      >
        <button
          onClick={() =>
            setOpenMenu(!openMenu)
          }
          className="
            p-2
            rounded-full
            hover:bg-slate-100
            transition
          "
        >
          <MoreVertical size={20} />
        </button>

        {openMenu && (
          <div
            className="
              absolute
              right-0
              mt-2
              w-48
              bg-white
              rounded-xl
              shadow-xl
              border
              overflow-hidden
            "
          >
            <button
              onClick={() => {
                setOpenMenu(false);

                onLeave(
                  society._id
                );
              }}
              className="
                w-full
                px-4
                py-3
                flex
                items-center
                gap-3
                text-red-600
                hover:bg-red-50
                transition
              "
            >
              <LogOut
                size={18}
                className="shrink-0"
              />

              Leave Society
            </button>
          </div>
        )}
      </div>

      {/* Logo */}

      <div className="flex justify-center pt-8 sm:pt-10">
        <img
          src={
            society.logo
              ? society.logo
              : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  society.societyName
                )}&background=f8fafc&color=111827`
          }
          alt={society.societyName}
          className="
            w-20
            h-20
            sm:w-24
            sm:h-24
            rounded-full
            object-cover
            border-2
            border-slate-300
            p-1
            bg-white
            shadow-sm
            shrink-0
          "
        />
      </div>

      {/* Content */}

      <div className="p-5 sm:p-6 text-center">
        <h2
          className="
            text-xl
            sm:text-2xl
            font-semibold
            text-slate-700
            tracking-tight
            break-words
          "
        >
          {society.societyName}
        </h2>

        <p
          className="
            mt-3
            text-sm
            sm:text-base
            font-semibold
            text-slate-600
            tracking-wide
            break-words
          "
        >
          {society.societyType}
        </p>

        {/* View Details */}

        <button
          onClick={() =>
            onView(society)
          }
          className="
            mt-6
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
            text-sm
            sm:text-base
            font-semibold
            transition
          "
        >
          <Eye
            size={17}
            className="shrink-0"
          />

          View Details
        </button>
      </div>
    </div>
  );
}

export default SocietyCard;