import toast from "react-hot-toast";
import { Check, X } from "lucide-react";

import {
  acceptJoinRequest,
  rejectJoinRequest,
} from "../../../../services/joinRequestServices";

function RequestCard({
  request,
  refreshRequests,
}) {
  const handleAccept = async () => {
    try {
      const response = await acceptJoinRequest(
        request._id
      );

      toast.success(response.message);

      refreshRequests();

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to accept request"
      );
    }
  };

  const handleReject = async () => {
    try {
      const response = await rejectJoinRequest(
        request._id
      );

      toast.success(response.message);

      refreshRequests();

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to reject request"
      );
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-5">
        Join Request
      </h2>

      <div className="space-y-3">

        <p>
          <span className="font-semibold">
            Student Name :
          </span>{" "}
          {request.student?.fullName}
        </p>

        <p>
          <span className="font-semibold">
            Roll Number :
          </span>{" "}
          {request.student?.rollNumber}
        </p>

        <p>
          <span className="font-semibold">
            Branch :
          </span>{" "}
          {request.student?.branch}
        </p>

        <p>
          <span className="font-semibold">
            Year :
          </span>{" "}
          {request.student?.year}
        </p>

        <p>
          <span className="font-semibold">
            Reason :
          </span>{" "}
          {request.reason}
        </p>

      </div>

      <div className="flex gap-4 mt-8">

        <button
          onClick={handleAccept}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl flex justify-center items-center gap-2"
        >
          <Check size={18} />
          Accept
        </button>

        <button
          onClick={handleReject}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl flex justify-center items-center gap-2"
        >
          <X size={18} />
          Reject
        </button>

      </div>

    </div>
  );
}

export default RequestCard;