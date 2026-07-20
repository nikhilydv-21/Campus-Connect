import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";
import toast from "react-hot-toast";
import { getEventFeedback } from "../../../services/authServices";

function Feedback() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [feedbacks, setFeedbacks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const res =
        await getEventFeedback(id);

      setFeedbacks(res.feedbacks);

    } catch (err) {

      toast.error(
        "Unable to load feedback"
      );

    } finally {

      setLoading(false);

    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60 text-lg sm:text-xl text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">

      {/* Back Button */}

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 sm:mb-8 text-blue-600 hover:text-blue-700 transition"
      >
        <ArrowLeft
          size={18}
          className="shrink-0"
        />
        Back
      </button>

      {/* Heading */}

      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
        Event Feedback
      </h1>

      {feedbacks.length === 0 ? (

        <div className="bg-white rounded-2xl shadow p-8 sm:p-10 text-center text-sm sm:text-base">
          No Feedback Found
        </div>

      ) : (

        <div className="space-y-4 sm:space-y-5">

          {feedbacks.map((item) => (

            <div
              key={item._id}
              className="bg-white rounded-2xl shadow p-5 sm:p-6"
            >

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

                {/* Student Info */}

                <div className="min-w-0">

                  <h2 className="text-base sm:text-lg font-bold break-words">
                    {item.student.fullName}
                  </h2>

                  <p className="text-sm sm:text-base text-gray-500 break-words">
                    {item.student.rollNumber}
                  </p>

                </div>

                {/* Rating */}

                <div className="flex items-center gap-1 shrink-0">

                  <Star
                    size={18}
                    className="fill-yellow-400 text-yellow-500"
                  />

                  <span className="font-semibold text-sm sm:text-base">
                    {item.rating}/5
                  </span>

                </div>

              </div>

              {/* Comment */}

              <p className="mt-4 sm:mt-5 text-sm sm:text-base text-gray-700 break-words whitespace-pre-wrap">
                {item.comment}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Feedback;