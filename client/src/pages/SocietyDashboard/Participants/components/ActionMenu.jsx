import { useState, useRef, useEffect } from "react";
import {
  MoreVertical,
  Download,
  Award,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  exportParticipantsCSV,
  generateCertificates,
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

  const handleCertificates = async () => {

    try {

      await generateCertificates(
        eventId
      );

      toast.success(
        "Certificates Generated"
      );

      setOpen(false);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to generate certificates"
      );

    }

  };

  return (

    <div
      className="relative self-start lg:self-auto"
      ref={menuRef}
    >

      <button
        onClick={() =>
          setOpen(!open)
        }
        className="
          bg-white
          border
          rounded-2xl
          p-3
          shadow-sm
          hover:bg-slate-100
          transition
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
            onClick={handleExportCSV}
            className="
              w-full
              px-4
              sm:px-5
              py-4
              flex
              items-center
              gap-3
              text-sm
              sm:text-base
              hover:bg-slate-100
              transition
            "
          >

            <Download
              size={18}
              className="shrink-0"
            />

            <span className="break-words">
              Export CSV
            </span>

          </button>

          <button
            onClick={handleCertificates}
            className="
              w-full
              px-4
              sm:px-5
              py-4
              flex
              items-center
              gap-3
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

            <span className="break-words">
              Generate Certificates
            </span>

          </button>

        </div>

      )}

    </div>

  );

}

export default ActionMenu;