import {
  Mail,
  Users,
  Eye,
  CheckCircle,
  XCircle,
} from "lucide-react";

import { useState } from "react";
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

  const [loading, setLoading] =
    useState(false);

  const [openDetails, setOpenDetails] =
    useState(false);

  const [approveOpen, setApproveOpen] =
    useState(false);

  const [rejectOpen, setRejectOpen] =
    useState(false);

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

      <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">

        {/* Header */}

        <div className="p-6 flex items-center gap-4">

          <img
            src={
              society.logo
                ? society.logo
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    society.societyName
                  )}&background=2563eb&color=fff`
            }
            alt={society.societyName}
            className="w-16 h-16 rounded-2xl object-cover"
          />

          <div>

            <h2 className="text-xl font-bold">
              {society.societyName}
            </h2>

            <p className="text-blue-600 font-medium mt-1">
              {society.societyType}
            </p>

          </div>

        </div>

        {/* Body */}

        <div className="px-6 pb-6 space-y-4">

          <div className="flex items-center gap-2 text-gray-600">

            <Users size={18} />

            <span>
              {society.facultyCoordinator}
            </span>

          </div>

          <div className="flex items-center gap-2 text-gray-600">

            <Mail size={18} />

            <span className="truncate">
              {society.email}
            </span>

          </div>

          {/* Buttons */}

          {/* Buttons */}

<div className="grid grid-cols-3 gap-3 pt-5">

  {/* View */}
<button
  onClick={() => setOpenDetails(true)}
  className="flex items-center justify-center gap-2 border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl py-3 transition font-medium"
>
  <Eye size={16} />
  <span className="text-sm">View</span>
</button>
  {/* Approve */}

<button
  onClick={() => setApproveOpen(true)}
  disabled={loading}
  className="flex items-center justify-center gap-2 border border-green-200 bg-green-50 hover:bg-green-100 text-green-600 rounded-xl py-3 transition font-medium"
>
  <CheckCircle size={16} />
  <span className="text-sm">Approve</span>
</button>

{/* Reject */}

<button
  onClick={() => setRejectOpen(true)}
  disabled={loading}
  className="flex items-center justify-center gap-2 border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl py-3 transition font-medium"
>
  <XCircle size={16} />
  <span className="text-sm">Reject</span>
</button>
  

  

</div>

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