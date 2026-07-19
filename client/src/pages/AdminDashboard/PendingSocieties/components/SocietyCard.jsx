import {
  MoreVertical,
  CheckCircle,
  XCircle,
} from "lucide-react";

import {
  useState,
  useRef,
  useEffect,
} from "react";

import toast from "react-hot-toast";

import {
  approveSociety,
  rejectSociety,
} from "../../../../services/adminServices";

import SocietyDetailsModal from "./SocietyDetailsModal";
import ApproveConfirmModal from "./ApproveConfirmModal";
import RejectConfirmModal from "./RejectConfirmModal";

function SocietyCard({
  society,
  refresh,
}) {
  const menuRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [approveOpen, setApproveOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const handleApprove = async () => {
    try {
      setLoading(true);

      const response =
        await approveSociety(
          society._id
        );

      toast.success(response.message);

      setApproveOpen(false);

      refresh();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Approval failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    try {
      setLoading(true);

      const response =
        await rejectSociety(
          society._id
        );

      toast.success(response.message);

      setRejectOpen(false);

      refresh();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Rejection failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="
          relative
          w-full
          bg-white
          rounded-3xl
          border
          border-slate-200
          shadow-sm
          hover:shadow-lg
          transition-all
          duration-300
          p-5
          sm:p-6
        "
      >
        {/* Logo */}

        <div className="flex justify-center pt-2 sm:pt-4">

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
            className="
              inline-flex
              mt-4
              px-3
              py-1
              rounded-full
              text-xs
              font-medium
              bg-slate-100
              text-slate-700
            "
          >
            Pending
          </span>

        </div>

        {/* Three Dots */}

        <div
          ref={menuRef}
          className="absolute top-4 right-4 sm:top-5 sm:right-5"
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
                onClick={() => {
                  setMenuOpen(false);
                  setApproveOpen(true);
                }}
                className="
                  w-full
                  flex
                  items-center
                  gap-3
                  px-5
                  py-3
                  hover:bg-slate-100
                  transition
                  text-slate-700
                "
              >
                <CheckCircle size={17} />
                Approve Society
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  setRejectOpen(true);
                }}
                className="
                  w-full
                  flex
                  items-center
                  gap-3
                  px-5
                  py-3
                  hover:bg-red-50
                  transition
                  text-red-600
                "
              >
                <XCircle size={17} />
                Reject Society
              </button>
            </div>

          )}

        </div>

      </div>

      <SocietyDetailsModal
        open={openDetails}
        setOpen={setOpenDetails}
        society={society}
      />

      <ApproveConfirmModal
        open={approveOpen}
        setOpen={setApproveOpen}
        onConfirm={handleApprove}
        loading={loading}
        society={society}
      />

      <RejectConfirmModal
        open={rejectOpen}
        setOpen={setRejectOpen}
        onConfirm={handleReject}
        loading={loading}
        society={society}
      />
    </>
  );
}

export default SocietyCard;