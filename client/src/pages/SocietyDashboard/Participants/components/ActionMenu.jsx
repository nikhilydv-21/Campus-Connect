import { useState, useRef, useEffect } from "react";
import {
  MoreVertical,
  Download,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  exportParticipantsCSV,
} from "../../../../services/eventServices";

function ActionMenu({
  eventId,
  event,
  attendanceFilter,
}) {

  const [open, setOpen] =
    useState(false);

  const menuRef = useRef(null);

  useEffect(() => {

    const handleClickOutside = (e) => {

      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {

        setOpen(false);

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

  const handleExportCSV = async () => {

    try {

      const response =
        await exportParticipantsCSV(
          eventId,
          attendanceFilter
        );

      const url =
        window.URL.createObjectURL(
          new Blob([response.data])
        );

      const link =
        document.createElement("a");

      link.href = url;

      link.setAttribute(
        "download",
        `${event?.title || "Participants"}.csv`
      );

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

      toast.success(
        "CSV Exported Successfully"
      );

      setOpen(false);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to export CSV"
      );

    }

  };

  return (

    <div
      ref={menuRef}
      className="relative self-start lg:self-auto"
    >

      <button
        onClick={() => setOpen(!open)}
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          border
          bg-white
          shadow-sm
          transition
          hover:bg-slate-100
        "
      >

        <MoreVertical size={20} />

      </button>

      {open && (

        <div
          className="
            absolute
            right-0
            mt-3
            z-50
            w-52
            max-w-[calc(100vw-2rem)]
            overflow-hidden
            rounded-2xl
            border
            bg-white
            shadow-xl
          "
        >

          <button
            onClick={handleExportCSV}
            className="
              flex
              w-full
              items-center
              gap-3
              px-4
              py-4
              text-left
              text-sm
              transition
              hover:bg-slate-100
              sm:px-5
              sm:text-base
            "
          >

            <Download
              size={18}
              className="shrink-0"
            />

            <span>
              Export CSV
            </span>

          </button>

        </div>

      )}

    </div>

  );

}

export default ActionMenu;