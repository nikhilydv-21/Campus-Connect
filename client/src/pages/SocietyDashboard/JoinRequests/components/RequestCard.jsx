import { useState } from "react";
import toast from "react-hot-toast";
import ConfirmActionModal from "./ConfirmActionModal";

import {
  Check,
  X,
  Hash,
  GraduationCap,
  MessageSquare,
} from "lucide-react";

import {
  acceptJoinRequest,
  rejectJoinRequest,
} from "../../../../services/joinRequestServices";

function RequestCard({
  request,
  refreshRequests,
}) {
  const [showReason, setShowReason] =
    useState(false);

  const [confirmOpen, setConfirmOpen] =
    useState(false);

  const [action, setAction] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleAccept = async () => {
    setLoading(true);

    try {
      const response =
        await acceptJoinRequest(
          request._id
        );

      toast.success(response.message);

      setConfirmOpen(false);

      refreshRequests();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to accept request"
      );

    } finally {

      setLoading(false);

    }
  };

  const handleReject = async () => {
    setLoading(true);

    try {

      const response =
        await rejectJoinRequest(
          request._id
        );

      toast.success(response.message);

      setConfirmOpen(false);

      refreshRequests();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to reject request"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div
      className="
        w-full
        max-w-sm
        bg-white
        rounded-2xl
        sm:rounded-3xl
        border
        shadow-sm
        hover:shadow-lg
        transition-all
        duration-300
        overflow-hidden
      "
    >

      {/* Header */}

      <div className="px-5 py-5 border-b">

        <h2 className="text-lg sm:text-xl font-bold text-slate-800 break-words">
          {request.student?.fullName}
        </h2>

      </div>

      {/* Body */}

      <div className="p-5 space-y-5">

        {/* Roll */}

        <div className="flex items-start gap-3">

          <Hash
            size={18}
            className="text-slate-500 shrink-0 mt-0.5"
          />

          <div className="min-w-0">

            <p className="text-xs text-slate-500">
              Roll Number
            </p>

            <p className="font-semibold text-slate-800 break-words">
              {request.student?.rollNumber}
            </p>

          </div>

        </div>

        {/* Branch */}

        <div className="flex items-start gap-3">

          <GraduationCap
            size={18}
            className="text-slate-500 shrink-0 mt-0.5"
          />

          <div className="min-w-0">

            <p className="text-xs text-slate-500">
              Branch & Year
            </p>

            <p className="font-semibold text-slate-800 break-words">
              {request.student?.branch?.toUpperCase()} • Year{" "}
              {request.student?.year}
            </p>

          </div>

        </div>

        {/* Reason */}

        <div className="bg-slate-50 rounded-2xl p-4">

          <div className="flex items-center gap-2 mb-3">

            <MessageSquare
              size={17}
              className="text-slate-500 shrink-0"
            />

            <span className="font-semibold text-slate-700">
              Reason
            </span>

          </div>

          <p className="text-sm text-slate-600 leading-6 break-words whitespace-pre-wrap">

            {showReason
              ? request.reason
              : request.reason.length >
                80
              ? request.reason.substring(
                  0,
                  80
                ) + "..."
              : request.reason}

          </p>

          {request.reason.length >
            80 && (

            <button
              onClick={() =>
                setShowReason(
                  !showReason
                )
              }
              className="
                mt-3
                text-sm
                font-medium
                text-blue-600
                hover:text-blue-700
              "
            >
              {showReason
                ? "Show Less"
                : "Read More"}
            </button>

          )}

        </div>

      </div>

      {/* Footer */}

      <div className="border-t p-4 flex flex-col sm:flex-row gap-3">

        <button
          onClick={() => {
            setAction("Reject");
            setConfirmOpen(true);
          }}
          className="
            w-full
            sm:flex-1
            py-2.5
            rounded-xl
            border
            border-slate-300
            hover:bg-slate-100
            transition
            flex
            justify-center
            items-center
            gap-2
            font-semibold
          "
        >

          <X size={17} />

          Reject

        </button>

        <button
          onClick={() => {
            setAction("Accept");
            setConfirmOpen(true);
          }}
          className="
            w-full
            sm:flex-1
            py-2.5
            rounded-xl
            border
            border-slate-300
            hover:bg-slate-100
            transition
            flex
            justify-center
            items-center
            gap-2
            font-semibold
          "
        >

          <Check size={17} />

          Accept

        </button>

      </div>

      <ConfirmActionModal
        open={confirmOpen}
        setOpen={setConfirmOpen}
        action={action}
        loading={loading}
        onConfirm={() => {

          if (
            action === "Accept"
          ) {

            handleAccept();

          } else {

            handleReject();

          }

        }}
      />

    </div>
  );
}

export default RequestCard;