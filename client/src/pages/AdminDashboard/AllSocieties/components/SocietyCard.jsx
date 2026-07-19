import {
  MoreVertical,
  Eye,
  Trash2,
  Ban,
  CheckCircle,
} from "lucide-react";

import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";

import {
  disableSociety,
  deleteSociety,
  getSocietyDetails,
} from "../../../../services/adminServices";

import SocietyDetailsModal from "./SocietyDetailsModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import DisableConfirmModal from "./DisableConfirmModal";

function SocietyCard({
  society,
  refresh,
}) {
  const menuRef = useRef(null);

  const [selectedSociety, setSelectedSociety] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [openDetails, setOpenDetails] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [disableOpen, setDisableOpen] =
    useState(false);

  const [menuOpen, setMenuOpen] =
    useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
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

  const handleView = async () => {
    try {
      const response =
        await getSocietyDetails(
          society._id
        );

      setSelectedSociety({
        ...response.society,
        totalMembers: response.totalMembers,
      });

      setOpenDetails(true);
      setMenuOpen(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load society details"
      );
    }
  };

  const handleDisable = async () => {
    try {
      setLoading(true);

      const response =
        await disableSociety(
          society._id
        );

      toast.success(response.message);

      setDisableOpen(false);

      refresh();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Operation Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);

      const response =
        await deleteSociety(
          society._id
        );

      toast.success(response.message);

      setDeleteOpen(false);

      refresh();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Delete Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="
          w-full
          bg-white
          rounded-3xl
          border
          border-slate-200
          shadow-sm
          hover:shadow-lg
          transition-all
          duration-300
          relative
          p-5 sm:p-6
        "
      >
        {/* Three Dots */}

        <div
          ref={menuRef}
          className="absolute top-4 right-4"
        >
          <button
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="
              h-10
              w-10
              rounded-full
              hover:bg-slate-100
              flex
              items-center
              justify-center
              transition
            "
          >
            <MoreVertical size={20} />
          </button>

          {menuOpen && (
            <div
              className="
                absolute
                right-0
                mt-2
                w-52
                bg-white
                border
                border-slate-200
                rounded-2xl
                shadow-xl
                overflow-hidden
                z-50
              "
            >
              <button
                onClick={handleView}
                className="w-full flex items-center gap-3 px-5 py-3 hover:bg-slate-100 transition text-slate-700"
              >
                <Eye size={17} />
                View Details
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  setDisableOpen(true);
                }}
                className="w-full flex items-center gap-3 px-5 py-3 hover:bg-slate-100 transition text-slate-700"
              >
                {society.isDisabled ? (
                  <CheckCircle size={17} />
                ) : (
                  <Ban size={17} />
                )}

                {society.isDisabled
                  ? "Enable Society"
                  : "Disable Society"}
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  setDeleteOpen(true);
                }}
                className="w-full flex items-center gap-3 px-5 py-3 hover:bg-red-50 transition text-red-600"
              >
                <Trash2 size={17} />
                Delete Society
              </button>
            </div>
          )}
        </div>

        {/* Logo */}

        <div className="flex justify-center pt-3">
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
            "
          />
        </div>

        {/* Content */}

        <div className="text-center mt-5 sm:mt-6">

          <h2 className="text-xl sm:text-2xl font-semibold text-slate-700 break-words">
            {society.societyName}
          </h2>

          <p className="mt-2 text-sm sm:text-base text-slate-500 font-medium break-words">
            {society.societyType}
          </p>

          <span
            className={`
              inline-flex
              mt-4
              px-3
              py-1
              rounded-full
              text-xs
              font-medium
              ${
                society.isDisabled
                  ? "bg-slate-300 text-slate-700"
                  : "bg-slate-100 text-slate-700"
              }
            `}
          >
            {society.isDisabled
              ? "Disabled"
              : "Active"}
          </span>

        </div>
      </div>

      <SocietyDetailsModal
        open={openDetails}
        setOpen={setOpenDetails}
        society={selectedSociety}
      />

      <DisableConfirmModal
        open={disableOpen}
        setOpen={setDisableOpen}
        society={society}
        loading={loading}
        onConfirm={handleDisable}
      />

      <DeleteConfirmModal
        open={deleteOpen}
        setOpen={setDeleteOpen}
        society={society}
        loading={loading}
        onConfirm={handleDelete}
      />
    </>
  );
}

export default SocietyCard;